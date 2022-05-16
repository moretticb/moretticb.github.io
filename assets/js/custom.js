var doodleDates = [
	[{b:1,e:1,name:"newyear"}], //1
	[{b:20,e:29,name:"carnival"}], //2
	[{b:1,e:1,name:"carnival"}], //3
	[{b:10,e:17,name:"easter"}], //4
	[{b:28,e:28,name:"epicycles_"}], //5
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
	var doodle_name = getDoodleName();
	if(doodle_name.indexOf("_")>0){
		doodle_name = doodle_name.split("_").join();
	}

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
	var doodle_name = getDoodleName();
	if(doodle_name && doodle_name.indexOf("_")>0){
		eval(doodle_name+"init()");
		return;
	}

	standard_init();
	var doodleImg = document.getElementById("doodle");
	doodleImg.src = imgToLoad.src;
}



var coverImgToLoad = new Image(10,10);
if(window.location.href.indexOf("about") > -1){
	var aboutCapa = 3;
	coverImgToLoad.src = "/images/aboutCapa"+(Math.round(Math.random()*(aboutCapa-1))+1)+".jpg";
}

function checkPageCover(){
	if(window.location.href.indexOf("about") > -1){
		document.getElementById("pagecover").src = coverImgToLoad.src;
	}
}





/****** interactive doodle functions *****/

function standard_init(){
	var doodle_dom = document.getElementById("doodle");
	if(doodle_dom.tagName != "IMG"){
		doodle_dom.outerHTML = '<img src="http://www.moretticb.com/images/site-logo.png" id="doodle" alt="Caio Benatti Moretti logo" class="animated fadeInDown" width="200" height="200">';
	}
	doodle_dom.parentElement.href = "http://www.moretticb.com/";
	doodle_dom.parentElement.target = "";
	window.onmousemove=null;
}

function epicycles_init(){
	var doodle_dom = document.getElementById("doodle");
	doodle_dom.outerHTML = '<div style="display:inline-block; background-repeat: no-repeat; width: 200px; height:200px;" id="doodle" class="animated fadeInDown"></div>';
	doodle_dom = document.getElementById("doodle");
	doodle_dom.style.backgroundImage = "url('/images/site-logo-epicycles.png')";
	doodle_dom.style.backgroundSize = "auto "+(5*doodle_dom.offsetHeight)+"px";

	doodle_dom.parentElement.href = "https://www.desmos.com/calculator/ga5d0wzlhl";
	doodle_dom.parentElement.target = "_blank";

	window.onmousemove = function(evt){
		var tile_cols = 55;
		var tile_rows = 5;
		var frame_dim = doodle_dom.offsetWidth;
		var perc_xy = [evt.clientX/window.innerWidth, evt.clientY/window.innerHeight];
		var col = Math.floor(perc_xy[0]*tile_cols);
		var row = Math.floor(perc_xy[1]*tile_rows);
		
		if(doodle_dom.style.backgroundImage){
			doodle_dom.style.backgroundPosition = (-col*frame_dim)+"px "+(-row*frame_dim)+"px";
		}
	}

}
