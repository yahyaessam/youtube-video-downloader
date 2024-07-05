
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ytdl = require('ytdl-core');
const puppeteer = require('puppeteer');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/download', async (req, res) => {
  const videoURLs = req.body.urls;

  if (!Array.isArray(videoURLs) || videoURLs.length === 0) {
    return res.status(400).json({ error: 'No YouTube URLs provided' });
  }

  try {
    const results = await Promise.all(videoURLs.map(async (videoURL) => {
      if (!ytdl.validateURL(videoURL)) {
        return { videoURL, error: 'Invalid URL' };
      }

      try {
        const info = await ytdl.getInfo(videoURL);
        const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
        const links = formats.map(format => ({
          format: format.qualityLabel,
          url: format.url,
          title: info.videoDetails.title,
          info: info.videoDetails
        }));
        return { videoURL, title: info.videoDetails.title, links };
      } catch (error) {
        return { videoURL, error: 'Failed to fetch video details' };
      }
    }));

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process URLs' });
  }
});

app.post('/fetch-urls', async (req, res) => {
  let { channelUrl } = req.body;
  
  if (!channelUrl) {
    return res.status(400).json({ error: 'No channel URL provided' });
  }
  if (!(channelUrl.includes('videos'))) channelUrl += '/videos';
  try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(channelUrl, { waitUntil: 'networkidle2', timeout: 30000 });

        await page.evaluate(async () => {
          let previousHeight = 0;
          let currentHeight = document.body.scrollHeight;

          while (previousHeight !== currentHeight) {
            previousHeight = currentHeight;
            window.scrollTo(0, currentHeight);
            await new Promise(resolve => setTimeout(resolve, 1000));
            currentHeight = document.body.scrollHeight;
          }
        });

    const videoUrls = await page.evaluate(() => {
        let videosArr = [];
        document.querySelectorAll('a#thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail').forEach(el => {
            if (el && el.href) {
                let url = el.href.split('&')[0]
                videosArr.push(url)
            }
        })
        return [...new Set(videosArr)];
    });

    await browser.close();
    res.json({ videoUrls: videoUrls.join(',') });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video URLs' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
