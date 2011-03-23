c3dl.addMainCallBack(canvasMain, "tester");
 //Paths

  const PACMAN_PATH = "./models/pacman.dae";
  const REDGHOST_PATH = "./models/redghost.dae";
  const BLUEGHOST_PATH = "./models/blueghost.dae";
  const ORANGEGHOST_PATH = "./models/orangeghost.dae";
  const PINKGHOST_PATH = "./models/pinkghost.dae";
  const PACMANBALL_PATH = "./models/ball.dae";
  const CEILINGLIGHT_PATH = "./models/ceiling-light.dae";
  const CEILINGLIGHT2_PATH = "./models/ceiling-light2.dae";
  const COMPCHAIR_PATH = "./models/computer-chair.dae";
  const LEXMARKPRINTER_PATH = "./models/lexmark-printer.dae";
  const TABLE_PATH = "./models/table.dae";
  const RACKMOUNTSERVER_PATH = "./models/rack-mount-server-2U.dae";
  const RACKMOUNTSERVER2_PATH = "./models/rack-mount-server-1U.dae";
  const RACKMOUNTSERVER3_PATH = "./models/barracuda350.dae";
  const SOFA_PATH = "./models/sofa.dae";

  c3dl.addModel(PACMAN_PATH);
  c3dl.addModel(REDGHOST_PATH);
  c3dl.addModel(BLUEGHOST_PATH);
  c3dl.addModel(ORANGEGHOST_PATH);
  c3dl.addModel(PINKGHOST_PATH);
  c3dl.addModel(PACMANBALL_PATH);
  c3dl.addModel(CEILINGLIGHT_PATH);
  c3dl.addModel(CEILINGLIGHT2_PATH);
  c3dl.addModel(COMPCHAIR_PATH);
  c3dl.addModel(LEXMARKPRINTER_PATH);
  c3dl.addModel(TABLE_PATH);
  c3dl.addModel(RACKMOUNTSERVER_PATH);
  c3dl.addModel(RACKMOUNTSERVER2_PATH);
  c3dl.addModel(RACKMOUNTSERVER3_PATH);
  c3dl.addModel(SOFA_PATH);

function canvasMain(canvasName){
 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);
 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);
 scn.setRenderer(renderer);
 scn.init(canvasName);
 if(renderer.isReady() )
 {
 var pacman = new c3dl.Collada();
 pacman.init(PACMAN_PATH);
 scn.addObjectToScene(pacman);

 var cam = new c3dl.FreeCamera();
 cam.setPosition(new Array(0.0, 0.0, 2500.0));
 cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
 scn.setCamera(cam);
 scn.startScene();
 }
}