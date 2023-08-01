const puppeteer = require('puppeteer-extra');
// const puppeteer = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const url = 'https://www.rabota.ru/';

async function start() {


  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--proxy-server=78.110.195.242:7080']
  });


  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // как собрать информацию - на примере видео
  const vacancyList = await page.evaluate(() => {
    const vacancies = [];
    document.querySelectorAll('.vacancy-preview-card__wrapper').forEach((card) => {
      vacancies.push({
        title: card.querySelector('.vacancy-preview-card__title a')?.innerHTML,
        salary: card.querySelector('.vacancy-preview-card__salary a')?.innerHTML,
      });
    });

    return vacancies;
  });


  console.log(vacancyList);

  // поиск
  page.type('.vacancy-search-form .r-suggester__input input', 'Javascript программист');


  // Wait 1s
  await new Promise((resolve) => setTimeout(resolve, 1000));

  page.click('.vacancy-search-form__btn-wrapper button');

  // Wait 5s
  await new Promise((resolve) => setTimeout(resolve, 5000)); 

  await browser.close();
}


start();