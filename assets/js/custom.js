var doodleDates = [
	[], //1
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
	[{b:1,e:26,name:"xmas"},{b:27,e:1,name:"newyear"}] //12
];

function checkDoodle(){
	var doodleImg = document.getElementById("doodle");
	var date = new Date();
	doodles = doodleDates[date.getMonth()];
	for(var i in doodles){
		if(date.getDate()>=i.b && date.getDate()<=i.e){
			doodleImg.src = "/images/site-logo-"+i.name+".png"
			return false;
		}
	}
}
