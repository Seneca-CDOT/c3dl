c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("box.dae");
var timesincelastchange=0;
var box;
function canvasMain(canvasName){
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.init(canvasName);
    if(renderer.isReady() )
    {
        var now = new Date();
        box = new c3dl.Collada();
        box.init("box.dae");
		box.setPosition(new Array(0.0, 0.0, 0));
        box.setLinearVel(new Array(0.001, 0.0, 0.0));
        scn.addObjectToScene(box);
        var cam = new c3dl.FreeCamera();
        cam.setPosition(new Array(10, 20, 30.0));
        cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
        scn.setCamera(cam);
		scn.setUpdateCallback(test);
        scn.startScene();
    }
}
function test(){
	document.getElementById('fps').value = scn.getFPS();
}

