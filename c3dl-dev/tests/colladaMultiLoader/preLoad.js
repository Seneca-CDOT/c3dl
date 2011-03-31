c3dl.addMainCallBack(canvasMain, "tester");

c3dl.PreLoader.callBack = function () {
  $("#progressbar").progressbar("value", c3dl.PreLoader.progress);
}

var models = [];
for (var i = 0; i < 50; i++) {
  models[i] = new c3dl.Collada();
}

models[0].init("./models/wall/cube.dae");
models[1].init("./models/chair-modern/models/chair.dae");
models[2].init("./models/wood-table/models/table.dae");
models[3].init("./models/table-lamp/models/lamp.dae");
models[4].init("./models/ceiling-lamp/models/ceilinglamp.dae");
models[5].init("./models/wall-picture/models/picture.dae");
models[6].init("./models/plane/plane.dae");
models[7].init("./models/pacman.dae");
models[8].init("./models/redghost.dae");
models[9].init("./models/blueghost.dae");
models[10].init("./models/orangeghost.dae");
models[11].init("./models/pinkghost.dae");
models[12].init("./models/ball.dae");
models[13].init("./models/play.dae");
models[14].init("./models/twitter.dae");
models[15].init("./models/flickr.dae");
models[16].init("./models/customimage.dae");
models[17].init("./models/customvideo.dae");
models[18].init("./models/clock.dae");
models[19].init("./models/tv/models/tv.dae");
models[20].init("./models/sc/810/810OpenCollada.DAE");
models[21].init("./models/sc/868/868OpenCollada.DAE");
models[22].init("./models/sc/K-108-3/K-108-3OpenCollada.DAE");
models[23].init("./models/sc/K-110-3/K-110-3OpenCollada.DAE");
models[24].init("./models/sc/k-839/k-839OpenCollada.DAE");
models[25].init("./models/sc/K-1454/K-1454OpenCollada.DAE");
models[26].init("./models/sc/k-2200/k-2200OpenCollada.DAE");
models[27].init("./models/sc/k-2314/k-2314OpenCollada.DAE");
models[28].init("./models/sc/k-2605/k-2605OpenCollada.DAE");
models[29].init("./models/sc/k-15136/k-15136OpenCollada.DAE");
models[30].init("./models/ceiling-light.dae");
models[31].init("./models/ceiling-light2.dae");
models[32].init("./models/computer-chair.dae");
models[33].init("./models/lexmark-printer.dae");
models[34].init("./models/AlienwareArea51Case/models/AlienwareArea51Case.dae");
models[35].init("./models/AppleMacPro/models/AppleMacPro.dae");
models[36].init("./models/HP-monitor/models/hp-monitor.dae");
models[37].init("./models/ceiling-fan/models/fan.dae");
models[38].init("./models/coffee-table/models/coffee-table.dae");
models[39].init("./models/side-table/models/side-table.dae");
models[40].init("./models/table2.dae");
models[41].init("./models/wood-dinner-chair/models/chair.dae");
models[42].init("./models/rack-mount-server-2U.dae");
models[43].init("./models/rack-mount-server-1U.dae");
models[44].init("./models/barracuda350.dae");
models[45].init("./models/APC3100-Cabinet/models/APC3100-Cabinet.dae");
models[46].init("./models/Server-Rack-with-Keypad/models/Server-Rack-with-Keypad.dae");
models[47].init("./models/panduit-CS1-server-rack/models/panduit-cn1.dae");
models[48].init("./models/sofa/models/sofa.dae");
models[49].init("./models/sofa2.dae");




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
