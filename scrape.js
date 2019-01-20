const request = require('request');
const cheerio = require('cheerio');

const endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1'; // URL to call
const version = '&SERVICE-VERSION=1.0.0'; // API version supported by your application
const apiKey = 'ZacBolic-LokPrice-PRD-839332c4a-27e3d652';
const globalid = 'EBAY-US'; // Global ID of the eBay site you want to search (e.g., EBAY-DE)
const keywords = 'book';

let targetUrl = `http://svcs.ebay.com/services/search/FindingService/v1
?OPERATION-NAME=findItemsByKeywords
&SERVICE-VERSION=1.0.0
&SECURITY-APPNAME=${apiKey}
&GLOBAL-ID=EBAY-US
&keywords=${keywords}
&paginationInput.entriesPerPage=10
&RESPONSE-DATA-FORMAT=JSON`;

targetUrl = targetUrl.replace(/(\r\n\t|\n|\r\t)/gm, "");



request(targetUrl, (error, response, data) => {
    if (!error && response.statusCode == 200) {
        data.findItemsByKeywordsResponse[0].searchResult[0].item.forEach(element => {
            console.log(element.galleryURL[0]);
        });
   
    }
});