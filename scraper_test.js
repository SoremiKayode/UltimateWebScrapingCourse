const rp = require("request-promise");
const cheer = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const url2 = "https://en.wikipedia.org/wiki/James_Madison";
const scraper_function = require("./scrapeer_function.js")
const president = []
let presido;

// rp(url).then((html)=> {
// const $  = cheer.load(html)
// // getting the length of the return element
// // console.log($("b").length);

// // getting the text of the retuirn element
// // console.log($("b a").text().split(" "))

// // Getting the some attribute of the return element
// // int his example geting all images
// const result = $("b a").each(function(i, elem){
// president[i] = "https://en.wikipedia.org" + $(elem).attr("href");
// });
// console.log(president.slice(0, 46))
// }).catch((error) => {
// console.log(error);
// })

rp(url)
  .then(function(html) {
//success!
const $  = cheer.load(html)
const result = $("b a").each(function(i, elem){
president[i] = $(elem).attr("href");
presido = president.slice(0, 46)
})
}).then(()=> {
presido.map(function(url) {
return scraper_function('https://en.wikipedia.org' + url);
})
}).then((prisential) => {
console.log(prisential)
})
.catch(function(err) {
    //handle error
    console.log(err);
  });