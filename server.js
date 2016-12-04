var express = require("express"),
    app = express(),
    request = require("sync-request"),
    mongodb = require("mongodb").MongoClient,
    words = require("./words"),
    indexing = {},
    toCrawl = ["http://localbyteout.com"],
    crawled = {},
    urlRegex = new RegExp(/<a href="(.*?)\/?".*>(.*?)<\/a>/g),
    linkscrape = require("linkscrape"),
    globalRes = {};



app.get("/:keyword",function(req,res){
    var query = req.params.keyword;
    mongodb.connect("mongodb://localhost:27017/indexes", function(err, db) {
        db.collection("wordsefe9.4",function(err,col){
            json = JSON.stringify(indexing);
            json = JSON.parse(json);
            col.insert(json);
            data = col.find().forEach( function(myDoc) {
                globalRes[query] = myDoc[query];
            });
        });
    });
    setTimeout(function(){
        res.send(JSON.stringify(globalRes));
    }, 100);
    
});

function crawling(url){
var numOfIterations = 0;

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
        numOfIterations++;
				var arr=words(response);
				console.log(arr);
				for(var i = 0; i < arr.length; i++){
					if(arr[i]!==undefined){
						keyword=arr[i].toLowerCase();					
						if(indexing.hasOwnProperty(keyword)){
							indexing[keyword].push(toCrawl[0]);
						}else{
							indexing[keyword]=[];
							indexing[keyword].push(toCrawl[0]);
						}
					}
				}
        console.log(numOfIterations + "*************************");
        toCrawl.shift();
        if(numOfIterations === 7) {
            break;
        }
    }
}

crawling(toCrawl[0]);
app.use(express.static(__dirname + '/app/'));
app.listen('3030');