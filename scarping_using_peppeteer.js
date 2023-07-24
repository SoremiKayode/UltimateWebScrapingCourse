const puppeteer = require("puppeteer")
const rp = require("request-promise");
const cheer = require('cheerio');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const AmazonScrape = require("./scrapingAmazon")
const writeToJson = require("./writing_to_json.js")
const writArrayToJson = require("./writing_empty_array_to_json.js")

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
await AmazonScrape("https://www.amazon.com/s?k=mobile+phone&crid=3HWJC6653VXAF&sprefix=mobile+phon%2Caps%2C376&ref=nb_sb_noss_2").then((result) => {
results = result;
console.log(results);
})

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
