var linkscrape = require('linkscrape');
 
htmlString='<p id="wat"><a href="/google"><b>Google</b></a></p>';

linkscrape('http://someserver.com/mypage', htmlString, function(links, $){
  console.log(links[0].link); //is 'http://google.com' 
});
