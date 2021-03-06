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
	[], //11
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
