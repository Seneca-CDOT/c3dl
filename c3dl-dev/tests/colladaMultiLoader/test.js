c3dl.addMainCallBack(canvasMain, "tester");
 //Paths
  var ready = false;
  var models = [];
  models[0] = new c3dl.Collada();
  models[0].init("./models/pacman.dae");
  models[1] = new c3dl.Collada();
  models[1].init("./models/redghost.dae");
  models[2] = new c3dl.Collada();
  models[2].init("./models/blueghost.dae");
  models[3] = new c3dl.Collada();
  models[3].init("./models/orangeghost.dae");
  models[4] = new c3dl.Collada();
  models[4].init("./models/pinkghost.dae");  
  models[5] = new c3dl.Collada();
  models[5].init("./models/ball.dae");  
  models[6] = new c3dl.Collada();
  models[6].init("./models/ceiling-light.dae");
  models[7] = new c3dl.Collada();
  models[7].init("./models/ceiling-light2.dae");
  models[8] = new c3dl.Collada();
  models[8].init("./models/computer-chair.dae");
  models[9] = new c3dl.Collada();
  models[9].init("./models/lexmark-printer.dae");
  models[10] = new c3dl.Collada();
  models[10].init("./models/sofa.dae");
  models[11] = new c3dl.Collada();
  models[11].init("./models/table.dae");
  models[12] = new c3dl.Collada();
  models[12].init("./models/rack-mount-server-2U.dae");
  models[13] = new c3dl.Collada();
  models[13].init("./models/rack-mount-server-1U.dae");
  models[14] = new c3dl.Collada();
  models[14].init("./models/barracuda350.dae");


function canvasMain(canvasName){
 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);
 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);
 scn.setRenderer(renderer);
 scn.init(canvasName);
 if(renderer.isReady() )
 {
 scn.addObjectToScene(models[0]);

 var cam = new c3dl.FreeCamera();
 cam.setPosition(new Array(0.0, 0.0, 2500.0));
 cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
 scn.setCamera(cam);
 scn.startScene();
 }
}
$(function() {
  $( "#progressbar" ).progressbar({
  	value: 0
	});
});
var intervalID = window.setInterval(function () {
  var progress = 0;
  var counter = 0;
  for (var i = 0; i < models.length; i++) {
    progress+=models[i].getLoadedProgress();
  }
  progress = progress/models.length;
  $("#progressbar").progressbar("value", progress);
  if (document.addEventListener && progress == 10) { 
    document.addEventListener("DOMContentLoaded", c3dl.init, false);
    clearInterval(intervalID);
  }
}, 100);


