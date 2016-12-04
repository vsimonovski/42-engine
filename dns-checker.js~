module.exports=function(url){
var dnsSync = require('dns-sync');
var domainRegex=new RegExp(/10\.([0-9]|([1-9][0-9])|(1[0-9][0-9]|2([0-4][0-9]|5[0-5])))\.([0-9]|([1-9][0-9])|(1[0-9][0-9]|2([0-4][0-9]|5[0-5])))\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2([0-4][0-9]|5[0-5]))/);

//var dr=new RegExp(/10\.[0-9]+.[0-9]+.[0-9]+/);

	try{
	var IP = dnsSync.resolve(url);
//	console.log(url, " ", domainRegex.exec(IP)!=null, " ", IP);	
	if(domainRegex.exec(IP)!=null){
			return true;
		}  
	else{
		return false;
		}
	}

	catch(e){
		return false;
	}
/*
	dns.lookup(url, function onLookup(err, address, family) {
  	console.log('address:', address, url);
		if(domainRegex.exec(address)!=null){
			console.log(url, "super!");
			return true;
		}  
		else{
		return false;
		}
	});
*/
};
