const puppeteer = require("puppeteer")
const rp = require("request-promise");
const cheer = require('cheerio');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const AmazonScrape = require("./scrapingAmazon")
const writeToJson = require("./writing_to_json.js")
const writArrayToJson = require("./writing_empty_array_to_json.js")
/*
This file scraped links that failed to scrape any thing
from scarping_using_peppeteer.js file, all logic still rmain the same
jus that the result have been replaced with an array, 
rather than getting the result from a function that fetch 
all the links.
*/
/* array to store every link fetched */
const link_array = [];


const AmazonScraper = {};
/*
Puppeteer use chrome browser to load the page
*/
const empty_arrays = [];
const successful_arrays = [];

const downloadDir = './downloaded_images';
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }


const scrapeREDDIT = async () => {
var results;
/*
we are using puppeteer package 
we call the function that get all the links on a page, links
for each product listed
*/

results = [
  "https://www.amazon.com//Motorola-Stylus-Battery-Unlocked-Emerald/dp/B0BFYRV4CD/ref=sr_1_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-1",
  "https://www.amazon.com//Motorola-Stylus-Battery-Unlocked-Emerald/dp/B0BFYRV4CD/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-1",
  "https://www.amazon.com//Motorola-Stylus-Battery-Unlocked-Emerald/dp/B0C5BMB1WB/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-1",
  "https://www.amazon.com//Motorola-Stylus-Battery-Unlocked-Emerald/dp/B09SM6GR4B/ref=cs_sr_dp_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-1",
  "https://www.amazon.com//Motorola-Stylus-Battery-Unlocked-Emerald/dp/B09TZ5ZBJT/ref=cs_sr_dp_4?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-1",
  "https://www.amazon.com//SAMSUNG-Factory-Unlocked-Android-Smartphone/dp/B0BLP3ZZXT/ref=sr_1_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-2",
  "https://www.amazon.com//SAMSUNG-Factory-Unlocked-Android-Smartphone/dp/B0BLP3ZZXT/ref=vo_sr_l_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-2",
  "https://www.amazon.com//SAMSUNG-Factory-Unlocked-Android-Smartphone/dp/B0BLP3ZZXT/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-2",
  "https://www.amazon.com//SAMSUNG-Factory-Unlocked-Android-Smartphone/dp/B0BLP18HMC/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-2",
  "https://www.amazon.com//SAMSUNG-Factory-Unlocked-Android-Smartphone/dp/B0BLP46C86/ref=cs_sr_dp_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-2",
  "https://www.amazon.com//Google-Pixel-7a-Unlocked-Smartphone/dp/B0BZ9T8R41/ref=sr_1_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-3",
  "https://www.amazon.com//Google-Pixel-7a-Unlocked-Smartphone/dp/B0BZ9T8R41/ref=sr_1_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-3#customerReviews",
  "https://www.amazon.com//Google-Pixel-7a-Unlocked-Smartphone/dp/B0BZ9XNBRB/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-3",
  "https://www.amazon.com//Google-Pixel-7a-Unlocked-Smartphone/dp/B0BZ9R47PC/ref=cs_sr_dp_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-3",
  "https://www.amazon.com//xixaomiro-Unlocked-Cellphone-Smartphone-Expandable/dp/B0C9R3X9W8/ref=sr_1_4?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-4",
  "https://www.amazon.com//xixaomiro-Unlocked-Cellphone-Smartphone-Expandable/dp/B0C9R3X9W8/ref=sr_1_4?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-4#customerReviews",
  "https://www.amazon.com//xixaomiro-Unlocked-Cellphone-Smartphone-Expandable/dp/B0C9R3X9W8/ref=cs_sr_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-4",
  "https://www.amazon.com//Samsung-Galaxy-A03-Core-International/dp/B09Q98BRRN/ref=sr_1_5?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-5",
  "https://www.amazon.com//Samsung-Galaxy-A03-Core-International/dp/B09Q98BRRN/ref=sr_1_5?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-5#customerReviews",
  "https://www.amazon.com//Blackview-Unlocked-A53-5080mAh-Smartphone/dp/B0C138VG1F/ref=sr_1_6?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-6",
  "https://www.amazon.com//Blackview-Unlocked-A53-5080mAh-Smartphone/dp/B0C138VG1F/ref=sr_1_6?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-6#customerReviews",
  "https://www.amazon.com//Blackview-Unlocked-A53-5080mAh-Smartphone/dp/B0C138VG1F/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-6",
  "https://www.amazon.com//Blackview-Unlocked-A53-5080mAh-Smartphone/dp/B0C133TL2Q/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-6",
  "https://www.amazon.com//Blackview-Unlocked-A53-5080mAh-Smartphone/dp/B0C13347WJ/ref=cs_sr_dp_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-6",
  "https://www.amazon.com//Motorola-Unlocked-128GB-MPCamera-Harbor/dp/B0C2SP2L4K/ref=sr_1_7?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-7",
  "https://www.amazon.com//Motorola-Unlocked-128GB-MPCamera-Harbor/dp/B0C2SP2L4K/ref=cs_sr_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-7",
  "https://www.amazon.com//Motorola-Unlocked-MPCamera-Intersteller-Black/dp/B0C2W7YYHM/ref=sr_1_8?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-8",
  "https://www.amazon.com//Motorola-Unlocked-MPCamera-Intersteller-Black/dp/B0C2W7YYHM/ref=sr_1_8?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-8#customerReviews",
  "https://www.amazon.com//Samsung-Unlocked-Smartphone-Intelligent-Graphite/dp/B09BFTMQH9/ref=sr_1_9?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-9",
  "https://www.amazon.com//Samsung-Unlocked-Smartphone-Intelligent-Graphite/dp/B09BFTMQH9/ref=sr_1_9?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-9#customerReviews",
  "https://www.amazon.com//Samsung-Unlocked-Smartphone-Intelligent-Graphite/dp/B09BFTMQH9/ref=vo_sr_l_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-9",
  "https://www.amazon.com//Samsung-Unlocked-Smartphone-Intelligent-Graphite/dp/B09BFTMQH9/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-9",
  "https://www.amazon.com//Samsung-Unlocked-Smartphone-Intelligent-Graphite/dp/B08FYTSXGQ/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-9",
  "https://www.amazon.com//Samsung-Unlocked-Smartphone-Intelligent-Graphite/dp/B09BFSTTNK/ref=cs_sr_dp_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-9",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3CDB9NV/ref=sr_1_10?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10#customerReviews",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3CDB9NV/ref=vo_sr_l_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3CDB9NV/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3CGX3C9/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3B7PJ47/ref=cs_sr_dp_4?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3B7LT8N/ref=cs_sr_dp_5?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10",
  "https://www.amazon.com//UMIDIGI-Smartphones-G3-Smartphone-Mode%EF%BC%8C5150mAh/dp/B0C3B59JM4/ref=cs_sr_dp_6?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-10",
  "https://www.amazon.com//OnePlus-Unlocked-Android-Smartphone-Charging/dp/B07XWGWPH5/ref=sr_1_11?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-11#customerReviews",
  "https://www.amazon.com//SAMSUNG-A14-5G-Unlocked-Worldwide/dp/B0C34C4W27/ref=sr_1_12?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-12",
  "https://www.amazon.com//SAMSUNG-A14-5G-Unlocked-Worldwide/dp/B0C34C4W27/ref=sr_1_12?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-12#customerReviews",
  "https://www.amazon.com//SAMSUNG-A14-5G-Unlocked-Worldwide/dp/B0C34C4W27/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-12",
  "https://www.amazon.com//Galaxy-S20-5G-Unlocked-Smartphone/dp/B08FRQMW31/ref=sr_1_13?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-13",
  "https://www.amazon.com//Galaxy-S20-5G-Unlocked-Smartphone/dp/B08FRQMW31/ref=sr_1_13?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-13#customerReviews",
  "https://www.amazon.com//climatepledgefriendly",
  "https://www.amazon.com//Galaxy-S20-5G-Unlocked-Smartphone/dp/B08FRQMW31/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-13",
  "https://www.amazon.com//Galaxy-S20-5G-Unlocked-Smartphone/dp/B08FRTH1KJ/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-13",
  "https://www.amazon.com//Samsung-Electronics-Unlocked-Smartphone-SM-F916UZKAXAA/dp/B08GL5YRQT/ref=sr_1_14?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-14",
  "https://www.amazon.com//Samsung-Electronics-Unlocked-Smartphone-SM-F916UZKAXAA/dp/B08GL5YRQT/ref=sr_1_14?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-14#customerReviews",
  "https://www.amazon.com//Samsung-Electronics-Unlocked-Smartphone-SM-F916UZKAXAA/dp/B08GL3QYHC/ref=cs_sr_dp_2?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-14",
  "https://www.amazon.com//Ulefone-Unlocked-Display-Smartphone-Fingerprint/dp/B0C58SG685/ref=sr_1_15?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-15",
  "https://www.amazon.com//Ulefone-Unlocked-Display-Smartphone-Fingerprint/dp/B0C58SG685/ref=sr_1_15?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-15#customerReviews",
  "https://www.amazon.com//Ulefone-Unlocked-Display-Smartphone-Fingerprint/dp/B0C58SG685/ref=cs_sr_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-15",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MW13RQH/ref=sr_1_16?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MW13RQH/ref=sr_1_16?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16#customerReviews",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MW13RQH/ref=vo_sr_l_dp?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MW13RQH/ref=cs_sr_dp_1?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MW17JQY/ref=cs_sr_dp_3?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MW11C2H/ref=cs_sr_dp_4?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16",
  "https://www.amazon.com//SAMSUNG-Smartphone-Unlocked-Brightest-Processor/dp/B09MVYN4M4/ref=cs_sr_dp_6?crid=3HWJC6653VXAF&keywords=mobile+phone&qid=1690203043&sprefix=mobile+phon%2Caps%2C376&sr=8-16"
]

/* 
- we loop throug the list of all the links
- launch a new browser with the command puppeteer.launch()
- then open a new page in chrome with the command browser.newPage()
- we open the link in the browser page.goto
*/
for(x = 0; x<=results.length; x++) {

/* checking if link is already scraped */
if(link_array.includes(results[x])){
console.log("I's same link browser will now close");
/* if not scrape the data */
} else {

/* push it into the array if it is not there */
link_array.push(results[x]);
console.log(results[x]);
console.log("This is the number fetching : " + x);
/* the open a new tab */
try {
const browser = await puppeteer.launch();
const page = await browser.newPage();
/* then load the url */
await page.goto(results[x], { timeout: 0 });


/* we wait for the content to load */
const pageContent = await page.content();


/* 
we initialize some variable to hold the filtered data
- list_of_images to hold all images scraped, per link visit
- all_features to hold all features scraped
- price to hold the price scraped
- product_title to hold the title of products
 */
let list_of_images = []
let all_image_name;
const all_features = [];
var price = [];
var product_title;

/*
we use cheerio package to receive and parse
the content fetched from puppeteer using cheer.load() 
*/
const $ = cheer.load(pageContent);

/* 
we can begin to extract details we need using 
css and jquery element acessor
*/
/* filtering the product title */
try {
product_title = $("#productTitle").text()
} catch (e) {
console.log("unable to get product title " + e);
}

/* filtering the product image */
$(".imageThumbnail img").each(async (i, elem) => {
var imageUrl = $(elem).attr("src").split("_")[0] + "jpg";
try {
var imageFileName = path.basename(imageUrl);
var imagePath = path.join(downloadDir, imageFileName);
   
list_of_images[i] = imageFileName;

var response = await axios.get(imageUrl, { responseType: 'stream' });
await response.data.pipe(fs.createWriteStream(imagePath));
console.log("finish downloading image")
console.log(`Downloaded ${imageFileName}`);
  } catch (error) {
    console.error(`Error downloading image: ${imageUrl}`);
  }
})

/* filtering the product price */
try {
$("span.a-price-whole").each((i, elem) => {
price[i] = $(elem).text().trim();
});
} catch(e) {
console.log("unable to fetch the price : " + e);
}

/* filtering the product features */
try {
const features = $("#feature-bullets .a-list-item").each((i, elem) => {
    all_features[i] = $(elem).text().trim();
})

} catch(e) {
console.log("unable to fetch features: " + e)
}

/* filtering the product review */
try {
var review = $("#detailBulletsWrapper_feature_div .a-color-base").text()
} catch(e) {
console.log("unable to fetch review: " + e)
}

AmazonScraper["ProductTitle"] = product_title.trim();
AmazonScraper["list_of_images"] = list_of_images;
AmazonScraper["Price"] = price.slice(0, 3);
AmazonScraper["ProductDescription"] = all_features;
AmazonScraper["review"] = review.trim();
AmazonScraper["category"] = "Mobile Phone";
AmazonScraper["Quantity"] = 10;
AmazonScraper["UploadDate"] = new Date().toLocaleDateString();

/* Checking if some information are empty
if the are not empty we push the link into the
successful_arrays else we push it in the 
empty arrays.
*/
if(AmazonScraper["ProductTitle"] && AmazonScraper["list_of_images"]){
successful_arrays.push(results[x])
writeToJson("test_file.json", AmazonScraper);
} else {
empty_arrays.push(results[x])
console.log("There is an empty file, so it is not inserted");
}

/* we close the browser */
await browser.close();
} catch (err) {
console.log(err)
}

}
}
/*and return the successful and empty array*/
return [
{"empty_arrays" : empty_arrays},
{"successful_arrays" : successful_arrays}
];
}

/*we call the function and push the 
returned result into json file emptyarray.json
*/
scrapeREDDIT().then((result)=> {
writArrayToJson(result, "emptyarray.json");
});
