var doodleDates = [
	[{b:1,e:1,name:"newyear"}], //1
	[], //2
	[], //3
	[], //4
	[], //5
	[], //6
	[], //7
	[], //8
	[], //9
	[], //10
	[], //11
	[{b:1,e:26,name:"xmas"},{b:27,e:31,name:"newyear"}] //12
];

var imgToLoad = new Image(10,10);
imgToLoad.src = "/images/site-logo-"+getDoodleName()+".png"

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
