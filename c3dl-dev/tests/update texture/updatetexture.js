c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("./models/tv.dae");
c3dl.addModel("./models/tv2.dae");
var tv=new c3dl.Collada();
var tv2=new c3dl.Collada();
var timeSinceLastChange=0;
var changed = false;
function canvasMain(canvasName){
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.init(canvasName);
    if(renderer.isReady() )
    {
      tv.init("./models/tv.dae");
      tv.setSize(6,2,3);
      scn.addObjectToScene(tv); 
      tv2.init("./models/tv2.dae");
      tv2.setSize(6,2,3);
      tv2.setPosition([0,-3.5,0])
      scn.addObjectToScene(tv2); 
      var cam = new c3dl.FreeCamera();
      cam.setPosition(new Array(0.0, 0.0, 10.0));
      cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
      scn.setCamera(cam);
      scn.startScene();
      scn.setUpdateCallback(checktime);
    }
}

function checktime(time){
    timeSinceLastChange += time; 
    if(timeSinceLastChange >= 3000)
    {
      if(changed)
      {
        tv.updateTextureByName("../images/webgl.jpg","../images/fffffffnoCulling.jpg");
        changed = false;
      }
      else
      {
        tv.updateTextureByName("../images/fffffffnoCulling.jpg","../images/webgl.jpg");
        changed = true;
        tv2.updateTextureByName("updatingTexture","../images/webgl.jpg");
      }
      timeSinceLastChange = 0;
    }
}