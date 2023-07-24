const rp = require("request-promise");
const cheer = require('cheerio');

const scrapeAll = (url) => {
rp(url).then((html)=> {
const $  = cheer.load(html)
        
const dob = $(".bday").text()     
const name = $(".mw-page-title-main").text()

const result = {
    name: name,
    birthday: dob,
  }
console.log(result);
return result;
}).catch((error) => {
console.log(error);
})

}

module.exports = scrapeAll
