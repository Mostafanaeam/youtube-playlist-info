# YouTube Playlist Info Fetcher

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📜 Overview

A simple and robust Node.js script that uses the YouTube Data API v3 to fetch essential information from any public YouTube playlist. It extracts the **video titles** and **duration** for every video in the list and outputs them to the console.

## ✨ Features

- **Accurate Data**: Fetches precise titles and durations.
- **Large Playlist Support**: Automatically handles playlists with more than 50 videos using token-based pagination.
- **Simple Setup**: Minimal dependencies (only `googleapis`).
- **Clean Output**: Displays a numbered list of videos with their details.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- NPM (included with Node.js)
- A **Google Cloud Project** with the **YouTube Data API v3** enabled.
- A valid **API Key**.

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mostafanaeam/youtube-playlist-info.git
   cd youtube-playlist-info
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🚀 Configuration & Usage

The project currently requires manual configuration in the source code.

### 1. Configure API Key

Open `getYoutubePlaylistInfo.js` and locate line 4:

```javascript
const YOUTUBE_API_KEY = "ضع مفتاحك هنا"; // REPLACE with your actual API Key
```

Replace the placeholder text with your generated Google API Key.

### 2. Configure Playlist URL

Open `getYoutubePlaylistInfo.js` and scroll to the bottom (line 107):

```javascript
const playlistUrl =
  "https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_oWSCw2d6XCgj6nS1i-";
```

Replace the URL with the link to the YouTube playlist you want to analyze.

### 3. Run the Script

Execute the script using Node.js:

```bash
node getYoutubePlaylistInfo.js
```

### Output Example

The script will output the data in the console (note: default logging text is in Arabic):

```text
بيانات الفيديوهات في قائمة التشغيل:
1. اسم الفيديو: Video Title 1 | مدة الفيديو: 10:05
2. اسم الفيديو: Video Title 2 | مدة الفيديو: 05:30
...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
