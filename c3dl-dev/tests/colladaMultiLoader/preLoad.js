c3dl.addMainCallBack(canvasMain, "tester");

c3dl.PreLoader.callBack = function () {
  $("#progressbar").progressbar("value", c3dl.PreLoader.progress);
}

var models = [];
for (var i = 0; i < 50; i++) {
  models[i] = new c3dl.Collada();
}

//addModel can also be used to preload
models[0].init("./models/wall/cube.dae");
models[1].init("./models/chair-modern/models/chair.dae");
models[2].init("./models/wood-table/models/table.dae");
models[3].init("./models/table-lamp/models/lamp.dae");
models[4].init("./models/ceiling-lamp/models/ceilinglamp.dae");
models[5].init("./models/wall-picture/models/picture.dae");
models[6].init("./models/computer-chair.dae");
models[7].init("./models/pacman.dae");
models[8].init("./models/blueghost.dae");
models[9].init("./models/ceiling-light.dae");
models[10].init("./models/lexmark-printer.dae");

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if(renderer.isReady()) {
    scn.addObjectToScene(models[0]);
    models[0].setAngularVel([0,0,0.001]);
    var cam = new c3dl.FreeCamera();
    cam.setPosition(new Array(0.0, 0.0, 10.0));
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
