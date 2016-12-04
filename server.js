var express=require("express");
var app=express();
var request=require("sync-request");
var mongodb=require("mongodb").MongoClient;
var dnsChecker=require("./dns-checker"); 
var words=require("./words");
var indexing={};

var tld=require("tldjs");

var toCrawl=["http://localbyteout.com"];
var crawled={};
var DNSPassed=[];

var urlRegex=new RegExp(/<a href="(.*?)\/?".*>(.*?)<\/a>/g);

var domainRegex=new RegExp(/10\.(0-9|[1-9][0-9]|1[1-9][0-9]|2([0-4][0-9]|5[0-5]))/);

var linkscrape=require("linkscrape");
var dns=require("dns");

mongodb.connect("mongodb://linksuser:linkspass@ds119598.mlab.com:19598/hack_engine", function(err, db) {
 	db.collection("wordsee",function(err,col){
		var json=JSON.stringify(indexing);
		json=JSON.parse(json);
		col.insert(json);
	});
});

var Link=function(title,url,text){
	this.title=title;
	this.url=url;
	this.text=text;
}

var titleRegex=new RegExp(".*?<title>(.*?)</title>.*?");
var bodyRegex=new RegExp(".*?<body>(.*?)</body>.*?");

function crawling(url){
	console.log(toCrawl.length);
	var brojiteracija = 0;
  while(toCrawl.length>0)	{
        var response=request('get',toCrawl[0],{retry:false});
				response=response.getBody();
				var matchess;
				
        var matches;			
        linkscrape(toCrawl[0],response,function(links,$) {
            var i=0;
						var matc;
						if(matc=bodyRegex.exec(response.toString())){
							console.log(matc[1]);
						}
					
            while(i<links.length) {
                var link=links[i].link;
							
								if(link===null || !tld.isValid(link) || link.indexOf("@")>-1 || link.indexOf(".jpg")>-1){
									i++;
									continue;
								}
				
								var dnsCheckLink = link.substr(7, link.length);
								if(dnsCheckLink.indexOf("/") != -1)
									dnsCheckLink = dnsCheckLink.substr(0, dnsCheckLink.indexOf("/"));
                if(link.indexOf("https://")===-1) {
                    if(!(crawled[link] == true || (toCrawl.indexOf(link)>-1) || link.indexOf('#') != -1)) {
												if((DNSPassed.indexOf(dnsCheckLink)==-1) ){
								
													if(dnsChecker(dnsCheckLink) === true){
                        			toCrawl.push(link);
														
															DNSPassed.push(dnsCheckLink);
														}
								
													}
													else{ 
							
															toCrawl.push(link);
													}
                    }
                }
                i++;
            }
					
        });
			//	var leftBody=response.toString().indexOf("<body>");
			//	var rightBody=response.toString().indexOf("</body>");
			//	if(leftBody<rightBody && leftBody>-1){
			//		var bodi=response.toString().substring(leftBody,rightBody);
			//	}
				
				var body=response.toString();
				//var target;
				if(matchess=titleRegex.exec(body)){
					matches=matchess[1];
				}else{
					matches="Untitled";
				}
				var targetObject=new Link(matches,toCrawl[0],body);
        crawled[toCrawl[0]]=true;
        brojiteracija++;
				var arr=words(response);
			//	console.log(arr);
				for(var i = 0; i < arr.length; i++){
					if(arr[i]!==undefined){
						keyword=arr[i].toLowerCase();					
						if(indexing.hasOwnProperty(keyword)){
							indexing[keyword].push(targetObject);
						}else{
							indexing[keyword]=[];
							indexing[keyword].push(targetObject);
						}
					}
				}
				toCrawl.shift();
        console.log(brojiteracija + "*************************");
        console.log(toCrawl);
        console.log(crawled);
        if(brojiteracija == 5) {
     	       console.log(indexing);
						break;
     		}	
	
			}
}
//console.log(indexing);
				/*
        
        //	console.log(brojiteracija);
    }
}
//console.log(crawled);
*/
crawling(toCrawl[0]);

