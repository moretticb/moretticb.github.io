var selTab = "topoTab";
var topology;

window.onload = function(){
	var randomSizes = [];
	var randomLen = 3+Math.round(Math.random());
	for(var i=0;i<randomLen;i++)
		randomSizes.push(Math.round(Math.random()*6)+1);
	topology = randomSizes;
	window.onresize();
	newTopology();
}

window.onresize = function(){
	var vp = document.getElementById('viewport');
	var topo = document.getElementById('topoContent');
	topo.style.width = vp.offsetWidth+"px";
	topo.style.height = (vp.offsetWidth/2)+"px";
	document.getElementById('cmdContent').style.height = (vp.offsetWidth/2)+"px";
	if(window.frameElement){
		window.frameElement.style.height = (topo.offsetHeight+20+document.getElementById('panel').offsetHeight)+"px";
	}
	
}

window.onhashchange = function(){
	alert('mudou: '+window.location.hash);
}

function drawNetwork(sizes){
	var html="";
	for(var i=0;i<sizes.length && i<4;i++)
		sizes[i] = sizes[i]==0?1:sizes[i];
	
	for(var i=0;i<sizes.length && i<4;i++){
		html += '<div class="'+(i==0?'i':'n')+'layer'+(sizes[i]<=3?sizes[i]:4)+'">';
		for(var j=1;j<=sizes[i];j++){
			j = j<3?j:sizes[i]>3?sizes[i]:3;
			html += '<div class="'+(i==0?'x':'n')+(j>3?4:j)+'">'+(i==0?'x<sub>'+j+'</sub>':j)+'</div>';
		}
		html += "</div>";
		
		if(i<sizes.length-1 && i<3)
			html += '<div class="w'+(sizes[i]>3?4:sizes[i])+(sizes[i+1]>3?4:sizes[i+1])+'"><div class="bias">&minus; &theta;</div></div>';
		else
			html += '<div class="arrow'+(sizes[i]>3?4:sizes[i])+'"></div>';
	}
	
	return html;
}

function changeTab(domTab){
	if(domTab.id==selTab)
		return
	document.getElementById(selTab).className = 'tabIdle';
	document.getElementById(selTab.split("Tab").join("Content")).style.display = "none";
	
	domTab.className = 'tabSel';
	document.getElementById(domTab.id.split("Tab").join("Content")).style.display = "inline-block";
	if(domTab.id.indexOf('cmd')>-1){
		domTab.style.backgroundColor = "#000";
		domTab.style.color = "#FFF";
	}
	
	selTab=domTab.id;
}

function isNum(num){
	for(var i=0;i<num.length;i++)
		if("0123456789".indexOf(num.charAt(i))<0)
			return false;
	return num != "" ? true : false;
}

function upDownLayer(btn){
	var lid = btn.id.substr(-1);
	var txtField = document.getElementById('len'+lid);
	if(isNum(txtField.value))
		txtField.value = parseInt(txtField.value)+(btn.id.indexOf('up')>-1?1:-1);
	else
		txtField.value = 1;
	
	adjustLayerUI(lid);
	topology[lid] = txtField.value;
	newTopology();
}

function lenKeyDown(evt){
	var lid = evt.target.id.substr(-1);
	if(evt.key.toLowerCase()=='enter'){
		adjustLayerUI(lid);
		//evt.target.blur();
		topology[lid]=evt.target.value;
		newTopology();
	}
	return isNum(evt.key) || evt.key.toLowerCase()=='backspace' || evt.key.toLowerCase()=='delete' || evt.key.toLowerCase()=='enter';
}

function adjustLayerUI(lid){
	var txtField = document.getElementById("len"+lid);
	if(txtField.value <= 1){
		txtField.value = 1;
		document.getElementById('down'+lid).style.visibility = "hidden";
	} else
		document.getElementById('down'+lid).style.visibility = "visible";
}

function drawInterface(){
	var html = '';
	for (var i=0;i<topology.length;i++){
		html += '<div class="layerAdjust" '+(i==0?'style="width: 16%; margin-left: 1%"':'')+'>';
		html += '<div class="left'+(i==0?'Normal':'Hole')+'">'+(i>0&&topology.length>2?'<div class="removeBtn" title="Remove layer" onclick="removeLayer('+i+');"></div>':'')+'</div>';
		html += '<div class="layerAdjustMiddle">';
		
		if(i==0) html += 'inputs';
		else if(i==topology.length-1) html += 'output layer';
		else if(i==1) html += '1<sup>st</sup> hidden layer';
		else if(i==2) html += '2<sup>nd</sup> hidden layer';
		
		html += drawCounter(i);
		
		html += '</div><div class="middle"></div><div class="right'+(i<3?'Hole':'Normal')+'">'+(i>0?'<div class="activationBtn" title="Activation function"></div>':'')+'</div></div>';
		
		var addSwap=i<topology.length-2?'swap':i==topology.length-1?'plus':'swap';
		if(i<3)
			html += '<div class="swapBtnContainer"><div class="'+addSwap+'Btn" title="'+(addSwap=='swap'?'Swap layers':'Add layer')+'" onclick="'+(addSwap=='plus'?'addLayer();':'swapLayers('+i+');')+'"></div></div>';
	}
	
	document.getElementById('layerAdjustContainer').innerHTML = html;
	for (var i=0;i<topology.length;i++)
		adjustLayerUI(i);
}

function drawCounter(lid){
	var html = '<div class="counter"'+(lid==0?' style="padding-top: 25px;"':'')+'>';
	html += '<div class="up" id="up'+lid+'" onmousedown="this.className=\'upDown\';" onmouseup="this.className=\'up\';" onclick="upDownLayer(this);"></div>';
	html += '<div class="len"><input type="text" value="'+topology[lid]+'" id="len'+lid+'" onkeydown="return lenKeyDown(event);" /></div>';
	html += '<div class="down" id="down'+lid+'" onmousedown="this.className=\'downDown\';" onmouseup="this.className=\'down\';" onclick="upDownLayer(this);"></div></div>';
	return html;
}

function newTopology(){
	document.getElementById("topoContent").innerHTML = drawNetwork(topology);
	drawInterface();
	drawCommands();
}

function addLayer(){
	topology.push(1);
	newTopology();
}

function removeLayer(lid){
	if(topology.length<=2)
		return;
	topology.splice(lid,1);
	newTopology();
}

function swapLayers(lid){
	var temp = topology[lid];
	topology[lid]=topology[lid+1];
	topology[lid+1]=temp;
	newTopology();
}

function generateCommands(){
	var coreCmd = "./mlp -i "+topology[0]+" -o "+topology[topology.length-1]+" -l "+(topology.length-1);
	//cat inputFile | ./mlp -i INPUTS -o OUTPUTS -l LAYERS n1 n2 n3 [-[e | E | W]]
	//                ./mlp -i INPUTS -o OUTPUTS -l LAYERS n1 n2 nLAYERS -w
	
	for(var i=1;i<topology.length;i++)
		coreCmd += ' '+topology[i];
	
	var cmds = [coreCmd,coreCmd];
	var params = [document.getElementById('epochs').checked,document.getElementById('mse').checked,!document.getElementById('weights').checked]
	cmds[0] = 'cat inputFile | '+cmds[0]+(params[0]||params[1]||params[2]?' -':'')+(params[0]?'e':'')+(params[1]?'E':'')+(params[2]?'W':'');
	cmds[1] = cmds[1]+' -w';
	return cmds;
}

function drawCommands(){
	var cmds = generateCommands();
	document.getElementById('cmdTrain').innerHTML = cmds[0];
	document.getElementById('cmdTest').innerHTML = cmds[1];
}