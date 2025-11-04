const { google } = require('googleapis');

// استبدل 'YOUR_API_KEY' بمفتاح الـ API الخاص بك
const YOUTUBE_API_KEY = 'ضع مفتاحك هنا';

// استبدل 'YOUR_PLAYLIST_ID' بمعرف قائمة التشغيل الخاصة بك
const PLAYLIST_ID = 'YOUR_PLAYLIST_ID';

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
});

async function getPlaylistData(playlistId) {
  let allVideoIds = [];
  let nextPageToken = null;

  try {
    // ---- بداية: حلقة لجلب كل صفحات قائمة التشغيل ----
    do {
      const playlistItemsResponse = await youtube.playlistItems.list({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 50,
        pageToken: nextPageToken, // استخدام التوكن لجلب الصفحة التالية
      });

      const currentVideoIds = playlistItemsResponse.data.items.map(item => item.snippet.resourceId.videoId);
      allVideoIds = allVideoIds.concat(currentVideoIds);

      nextPageToken = playlistItemsResponse.data.nextPageToken; // الحصول على توكن الصفحة التالية

    } while (nextPageToken);
    // ---- نهاية: حلقة جلب الصفحات ----


    // ---- بداية: جلب تفاصيل كل الفيديوهات التي تم تجميعها ----
    let allVideoDetails = [];
    // API يوتيوب يسمح بجلب تفاصيل 50 فيديو كحد أقصى في كل مرة
    // لذلك، سنقوم بتقسيم الطلبات إذا كان لدينا أكثر من 50 فيديو
    for (let i = 0; i < allVideoIds.length; i += 50) {
        const videoIdsChunk = allVideoIds.slice(i, i + 50);

        const videosResponse = await youtube.videos.list({
            part: 'contentDetails,snippet',
            id: videoIdsChunk.join(','),
        });

        const videoDetailsChunk = videosResponse.data.items.map(video => {
            const title = video.snippet.title;
            const duration = parseDuration(video.contentDetails.duration);
            return { title, duration };
        });

        allVideoDetails = allVideoDetails.concat(videoDetailsChunk);
    }
    // ---- نهاية: جلب تفاصيل الفيديوهات ----

    return allVideoDetails;

  } catch (error) {
    console.error('حدث خطأ أثناء جلب بيانات قائمة التشغيل:', error.message);
    return null;
  }
}


// دالة لتحويل مدة الفيديو من صيغة ISO 8601 إلى صيغة قابلة للقراءة
function parseDuration(duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function(x) {
    if (x != null) {
      return x.replace(/\D/, '');
    }
  });

  const hours = (parseInt(match[0]) || 0);
  const minutes = (parseInt(match[1]) || 0);
  const seconds = (parseInt(match[2]) || 0);

  let result = '';
  if (hours > 0) {
    result += `${hours}:`;
  }
  result += `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return result;
}

// دالة لاستخراج معرف قائمة التشغيل من الرابط
function getPlaylistIdFromUrl(url) {
     try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('list');
    } catch (error) {
        console.error("رابط قائمة التشغيل غير صالح:", url);
        return null;
    }
}


// --==||==--//
//   التنفيذ
// --==||==--//

// ضع رابط قائمة التشغيل هنا
const playlistUrl = 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_oWSCw2d6XCgj6nS1i-';
const playlistIdFromUrl = getPlaylistIdFromUrl(playlistUrl);


if (playlistIdFromUrl) {
    getPlaylistData(playlistIdFromUrl).then(data => {
      if (data) {
        console.log('بيانات الفيديوهات في قائمة التشغيل:');
        data.forEach((video, index) => {
          console.log(`${index + 1}. اسم الفيديو: ${video.title} | مدة الفيديو: ${video.duration}`);
        });
      }
    });
} else {
    console.error('لم يتم العثور على معرف قائمة التشغيل في الرابط.');
}