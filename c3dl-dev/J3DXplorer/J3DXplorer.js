/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

var cam = new c3dl.FreeCamera();
var scn;

var test = new Array();
const MAXOBJ = 20;
c3dl.debug.setVisible(false);
c3dl.addMainCallBack(J3DXplorer_main, 'J3DXplorer');
c3dl.addModel("J3DXplorer_window.dae");
c3dl.addModel("c3DL_logo.dae");
c3dl.addModel("SkySphere.dae");

var urls = ["http://www.google.com", "http://www.senecac.on.ca", 
"http://www.twitter.com", 
"http://www.c3dl.org","http://www.mozilla.com/en-US/firefox/personal.html"];
var imgs = ["windowTex_google.png", 
		"windowTex_seneca.png", 
		"windowTex_twitter.png", 
		"windowTex_c3dl.png",
		"windowTex_firefox.png"];

function J3DXplorer_main(canvasName)
{
	scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init(canvasName);
	if(!renderer.isReady()){
                var imgtag=document.getElementById("screenshot");
                imgtag.style.display="block";
                var canvas=document.getElementById(canvasName);
                canvas.style.display="none";
	}
	else{
	var j=0;	
	// spinning 'windows'
	for(var i = 0; i < MAXOBJ; i++){
	
		var obj = new c3dl.Collada();
		obj.init("J3DXplorer_window.dae");		
		
		var ranScale = 1 - ( Math.floor(Math.random()*11) / 20);
		var ranScaleVector = new Array(ranScale,ranScale,ranScale);
		var ranYaw = Math.floor(Math.random()*361) ;
		var ranPitch = .5 - Math.floor(Math.random()*10) / 10 ;
		var ranRoll = .5 - Math.floor(Math.random()*10) / 10 ; ;
		var ranVel = 0.0001 + (Math.floor(Math.random()*11) * 0.00005);
		
		obj.scale(ranScaleVector);
		obj.yaw(ranYaw);
		obj.pitch(ranPitch/1.5);
		obj.roll(ranRoll/1.5);
		obj.setAngularVel([0,ranVel,0]);

		// generate a random number which will be used to index
		// into a list of urls/images
		// Math.random gives us a number from [0,1), so add a buffer
		// to get the 1.
		//var rand = Math.floor(((Math.random() + 0.2) * 4));

		obj.url = urls[j];
		obj.setTexture(imgs[j]);
		j++;
                if(j==5)
		  j=0;
		scn.addObjectToScene(obj);
	}
	
	// c3dl logo
	var logo = new c3dl.Collada();			
	logo.init("c3DL_logo.dae");
	logo.scale([0.1,0.1,0.1]);
	logo.setAngularVel([0,-0.001,0]);
	logo.setPickable(false);
	scn.addObjectToScene(logo);

	// SkySphere
	var skySphere = new c3dl.Collada();			
	skySphere.init("SkySphere.dae");
	skySphere.setAngularVel(new Array(0,.00005,0));
	skySphere.setPickable(false);
	scn.addObjectToScene(skySphere);
	
	//
	//scn.setBackgroundColor([0.15,0.15,0.15]);
	scn.setAmbientLight([1,1,1]);
	cam.setPosition([0,0,-30.0]);
	cam.setLookAtPoint([0,0,0]);
	
	scn.setCamera(cam);
	scn.startScene();
	scn.setPickingCallback(picking);
	}
}

function picking(pickingObj)
{	
	var objectsHit = pickingObj.getObjects();

	if( objectsHit.length > 0 )
	{
		var sepiaEffect = new c3dl.Effect();
		sepiaEffect.init(c3dl.effects.SEPIA);
//		document.addTab(objectsHit[0].url);
//		window.open(objectsHit[0].url, objectsHit[0].url, "resizable=yes,scrollbars=yes,status=yes");
		window.location=objectsHit[0].url;
		objectsHit[0].setEffect(sepiaEffect);
 		for(var i = 0; i < MAXOBJ; i++){
		  if(objectsHit[0].url == scn.getObj(i).url)
			scn.getObject(i).setEffect(sepiaEffect);
		}
	}
}
