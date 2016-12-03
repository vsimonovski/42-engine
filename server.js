var express=require("express");
var app=express();
var request=require("sync-request");

var toCrawl=["http://localbyteout.com"];
var crawled={};

var urlRegex=new RegExp(/<a href="(.*?)\/?".*>(.*?)<\/a>/g);

function crawling(url){

  var brojiteracija = 0
	while(toCrawl.length>0)
	{ 
		var response=request('get',toCrawl[0].trim());
		response=response.getBody();
			var matches;
			while(matches=urlRegex.exec(response)){
				var sajt = matches[1];
				if(matches[1].indexOf("http://") == 0)
				{
					if(!(crawled[matches[1]] == true || (toCrawl.indexOf(matches[1])>-1) || matches[1].indexOf('#') != -1))
					{
						toCrawl.push(matches[1]);
					//	console.log("Dodat u niz: " + matches[1]);
				//		console.log(toCrawl);
					}
				}
				else if(matches[1].indexOf("https://") == -1)
				{
					sajt = toCrawl[0] +"/" + matches[1];
					if(!(crawled[sajt] == true || (toCrawl.indexOf(sajt)>-1) || sajt.indexOf('#') != -1))
					{
						toCrawl.push(sajt);
			//			console.log("Dodat u niz: " + sajt);
		//				console.log(toCrawl);
					}
				}
		}
			crawled[toCrawl[0]]=true;
			brojiteracija++;
			toCrawl.shift();
			console.log(brojiteracija + "*************************");
			console.log(toCrawl);
			console.log(crawled);
   	//	console.log(brojiteracija);

	}
}

crawling(toCrawl[0]);
