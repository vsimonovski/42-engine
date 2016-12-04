var regex=new RegExp("(.*?)>(.*?)<(/)?","g");

module.exports=function(body){

	var str="";
	var matches;
	while(matches=regex.exec(body)){
		str+=matches[2];
	}

	var arr=str.split(/[\s,.|":;'?]+/);
	
	var uniqueArr = arr.filter(function(elem, pos) {
    return arr.indexOf(elem) == pos;
	});

	for(var k in uniqueArr){
		if(uniqueArr[k].length<=1){
			delete uniqueArr[k];
		}
	}

	return uniqueArr;
};
