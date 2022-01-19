// DOODLE

var doodleDates = [
	[{b:1,e:1,name:"newyear"}], //1
	[{b:20,e:29,name:"carnival"}], //2
	[{b:1,e:1,name:"carnival"}], //3
	[{b:10,e:17,name:"easter"}], //4
	[], //5
	[{b:1,e:30,name:"arraia"}], //6
	[{b:4,e:4,name:"usa"}], //7
	[{b:31,e:31,name:"usa"}], //8
	[{b:2,e:2,name:"mit"},{b:7,e:7,name:"7set"},{b:9,e:9,name:"donosmi"}], //9
	[], //10
	[{b:19,e:19,name:"italia"}], //11
	[{b:1,e:26,name:"xmas"},{b:27,e:31,name:"newyear"}] //12
];

var imgToLoad = new Image(10,10);
if(getDoodleName()){
	imgToLoad.src = "/images/site-logo-"+getDoodleName()+".png";
} else {
	imgToLoad.src = "/images/site-logo.png";
}

function getDoodleName(){
	var date = new Date();
	doodles = doodleDates[date.getMonth()];
	for(var i in doodles){
		if(date.getDate()>=doodles[i].b && date.getDate()<=doodles[i].e){
			return doodles[i].name;
		}
	}
}

function checkDoodle(){
	var doodleImg = document.getElementById("doodle");
	doodleImg.src = imgToLoad.src;
}

// end of DOODLE




// ABOUT PAGE MODS

if(window.onload){
} else {
	window.onload = function(){
		var aboutCapa = 3;
		if(window.location.href.indexOf("about") > -1){
			var imgs = document.getElementsByTagName("img");
			var idx = 0;
			while(imgs[idx].src.indexOf("aboutCapa") < 0){idx++};
			imgs[idx].src="/images/aboutCapa"+Math.round(Math.random()*aboutCapa)+".png";
		}
	}
}


// end of ABOUT PAGE MODS
