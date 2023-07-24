##**Web Scraping in NodeJS**##

This repository demonstrate how to scrape web pages using Nodejs, with three Nodejs packages:

* request-promise
* puppeteer
* cheerio

**Cherrio to parse the content**
**puppeteer to fetch content of a web page especially if the content is dynamic and require alot of Javascript. puppeteer open a chrome page to fetch the content**
**request-promise fetch content also**

Files

scarping_using_peppeteer.js : This page demonstrate how to fetch content using peppeteer and cheerio

scrapeer_function.js : This file demonstrate web scraping using request and 
cheerio, request-promise help us fetch a web content
and we use cheerio to parse the data and extract
information we need from it

scraper_test.js : This file uses the functionalities in the scrapeer_function.js file, to scrape all American presidents 

scraping_failed_data.js : This file scraped links that failed to scrape any thingfrom scarping_using_peppeteer.js file, all logic still remain the same just that the result have been replaced with an array, rather than getting the result from a function that fetch all the links.

scrapingAmazon.js : This file scrape all product links from some search query in Amazon Note : This is only for Test and it is higly prohibited to scrape Data illegally.

writing_empty_array_to_json.js : This file write a javascript object to a JSON file The function arrayToJSON requires two parameter : the newArray or object and file path to the JSON file

writing_to_json.js : This file write an object to a json file if the file is not existing it create a new file The function writeToJson takes requires two
parameters; the file path : filePath, and the new javascript object you want to write to json
