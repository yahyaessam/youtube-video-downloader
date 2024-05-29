const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ytdl = require('ytdl-core');

const app = express();
app.use(bodyParser.json());

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/download', async (req, res) => {
  const videoURL = req.body.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
    const links = formats.map(format => ({
      format: format.qualityLabel,
      url: format.url
    }));
    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video details' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
