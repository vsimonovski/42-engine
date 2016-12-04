var express=require("express");
var app=express();
var request=require("sync-request");

var toCrawl=["http://localbyteout.com"];
var crawled={};

var urlRegex=new RegExp(/<a href="(.*?)\/?".*>(.*?)<\/a>/g);

var linkscrape=require("linkscrape");

function getPosition(string, char, index) {
   return string.split(char, index).join(char).length;
}

function crawling(url){
var brojiteracija = 0;

    while(toCrawl.length>0)	{ 
        var response=request('get',toCrawl[0]);
        response=response.getBody();
        var matches;			
        linkscrape(toCrawl[0],response,function(links,$) {
            var i=0;
            while(i<links.length) {
                var link=links[i].link;

                if(link!==null && link.indexOf("https://")===-1) {
                    if(!(crawled[link] == true || (toCrawl.indexOf(link)>-1) || link.indexOf('#') != -1)) {
                        toCrawl.push(link);
                    }
                }
                i++;
            }
        });
        crawled[toCrawl[0]]=true;
        brojiteracija++;
        toCrawl.shift();
        console.log(brojiteracija + "*************************");
        console.log(toCrawl);
        console.log(crawled);
        if(brojiteracija == 3) {
            break;
        }
        //	console.log(brojiteracija);
    }
}

crawling(toCrawl[0]);


// REST API
