var express=require("express");
var app=express();
var request=require("sync-request");

var words=require("./words");
var indexing={};

var toCrawl=["http://localbyteout.com"];
var crawled={};

var urlRegex=new RegExp(/<a href="(.*?)\/?".*>(.*?)<\/a>/g);

var linkscrape=require("linkscrape");



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
				var arr=words(response);
				console.log(arr);
				for(var i = 0; i < arr.length; i++){
					if(arr[i]!==undefined){
						keyword=arr[i].toLowerCase();					
						if(indexing.hasOwnProperty(keyword)){
							indexing[keyword].push(toCrawl[0]);
						}else{
							indexing[keyword]=[toCrawl[0]];
						}
					}
				}
        toCrawl.shift();
        console.log(brojiteracija + "*************************");
//        console.log(toCrawl);
//        console.log(crawled);
        if(brojiteracija == 10) {
            break;
        }
        //	console.log(brojiteracija);
    }
		var php="PHP".toLowerCase();
		console.log(indexing[php]);
}

crawling(toCrawl[0]);


// REST API
