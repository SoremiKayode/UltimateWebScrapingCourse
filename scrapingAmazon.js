const puppeteer = require("puppeteer")
const rp = require("request-promise");
const cheer = require('cheerio');
const fs = require('fs');

/**
 This file scrape all product links from some search
 query in Amazon
 Note : This is only for Test and it is higly 
 prohibited to scrape Data illegally.
 */

/*This are all the search link for experiment */
const link_to_scrape = {
woman_dress : "https://www.amazon.com/s?k=sexy+woman+dress&crid=KU113YKS2VPO&sprefix=sexy+woman+dress%2Caps%2C356&ref=nb_sb_noss_1",
men_clothing : "https://www.amazon.com/s?k=men+clothing&crid=V0L2Y5ABUNAM&sprefix=men+clothing%2Caps%2C412&ref=nb_sb_noss_1",
laptops : "https://www.amazon.com/s?k=laptops&crid=GYC4KFD1HAV3&sprefix=laptop%2Caps%2C337&ref=nb_sb_noss_1",
Grocery : "https://www.amazon.com/s?k=groceries&crid=46E8YSWII8SD&sprefix=groceries%2Caps%2C342&ref=nb_sb_noss_1",
gymn : "https://www.amazon.com/s?k=gym&crid=3O5SYV55GMU6K&sprefix=gym%2Caps%2C326&ref=nb_sb_noss_1",
mobile_phone : "https://www.amazon.com/s?k=mobile+phone&crid=3HWJC6653VXAF&sprefix=mobile+phon%2Caps%2C376&ref=nb_sb_noss_2"
}

/*
Here is an object containing element locator
for each of the products category
*/
element_needed = {
mens_cloth: {
product_title : "#productTitle",
image_urls : ".imageThumbnail img",
price : "#corePriceDisplay_desktop_feature_div .a-price-whole",
features : "#feature-bullets .a-list-item",
review : "#acrPopover .a-color-base",
productCard : ".s-card-container a.a-link-normal"
},

Grocery: {
product_title : "span#productTitle",
image_urls : ".imageThumbnail img",
price : "span.a-price-whole",
features : "#feature-bullets .a-list-item",
review : "#acrPopover .a-color-base",
productCard : ".s-card-container a.a-link-normal"
},

Gymn: {
product_title : "span#productTitle",
image_urls : ".imageThumbnail img",
price : "span.a-price-whole",
features : "#feature-bullets .a-list-item",
review : "#acrPopover .a-color-base",
productCard : ".s-card-container a.a-link-normal"
},

laptop: {
product_title : "span#productTitle",
image_urls : ".imageThumbnail img",
price : "span.a-price-whole",
features : "#feature-bullets .a-list-item",
review : "#acrPopover .a-color-base",
productCard : ".s-card-container a.a-link-normal"
},

mens_cloth: {
product_title : "#productTitle",
image_urls : "#imgTagWrapperId img",
price : ".a-price-whole",
features : ".feature-bullets .a-list-item ",
review : "#detailBulletsWrapper_feature_div .a-color-base"
}
}

/*
This is the element locator for each link on 
the product listed from the search results
*/
const productCard = ".s-card-container .a-link-normal"

const scrapeProductList = async (url) => {
/*
Below : 
- we launch puppeteer to open chrome
- ask it to open a new page
- ask it to go to the url provided
- ask it to grab the content

- use cheerio to parse the content
- when done parsing, we extract the links we need
*/
const all_links = []
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(url, timeout=0);
const pageContent = await page.content();
try {
const $ = cheer.load(pageContent);
$(productCard).each((i, elem) => {
all_links[i] = "https://www.amazon.com/" + $(elem).attr('href');
})
console.log(all_links);
// console.log("Finish adding all link to the list : " + all_links.length());

} catch (e) {
console.log(e);
}
browser.close();
return all_links;
}
// scrapeProductList("https://www.amazon.com/s?k=laptops&crid=GYC4KFD1HAV3&sprefix=laptop%2Caps%2C337&ref=nb_sb_noss_1")
// .then((result) => {
// console.log(result);
// })
module.exports = scrapeProductList;
