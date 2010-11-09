c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("duck.dae");
var duck;
var scn;
function canvasMain(canvasName){
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.init(canvasName);
    if(renderer.isReady() )
    {
        
        duck = new c3dl.Collada();
        duck.init("duck.dae");
        duck.setDrawObb(true);
        //duck.centerObject();
        scn.addObjectToScene(duck);
        duck = new c3dl.Collada();
        duck.init("duck.dae");
        duck.setDrawObb(true);
        //scn.addObjectToScene(duck);
        var cam = new c3dl.FreeCamera();
        cam.setPosition(new Array(10.0, 0.0, 0.0));
        cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
        scn.setCamera(cam);
        scn.startScene();
    }
}