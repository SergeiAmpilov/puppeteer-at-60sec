const puppeteer = require('puppeteer');

const url = 'https://www.youtube.com/';

async function start() {


  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });


  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // как собрать информацию - на примере видео
  const videosList = await page.evaluate(() => {
    const videos = [];
    document.querySelectorAll('ytd-rich-item-renderer').forEach((card) => {
      videos.push({
        title: card.querySelector('#video-title').innerHTML,
        author: card.querySelector('.ytd-channel-name a').innerHTML,
      });
    });

    return videos;
  });

  await browser.close();

  console.log(videosList);



}


start();