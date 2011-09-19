// Tutorial 10

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");

//This function is going to be called when the user releases a key.
// If shift is currently pressed, the camera will rotate a bit in the chosen direction,
// if shift is not being held, the camera will move.
function up(event){//a key is released
    var cam = scn.getCamera();
    if(event.shiftKey) {
        switch(event.keyCode) {//determine the key released
            case 65://a key
                cam.roll(-Math.PI * 0.025);//tilt to the left
                break;
            case 37://left arrow
                cam.yaw(Math.PI * 0.025);//rotate to the left
                break;
            case 68://d key
                cam.roll(Math.PI * 0.025);//tilt to the right
                break;
            case 39://right arrow
                cam.yaw(-Math.PI * 0.025);//rotate to the right
                break;
            case 83://s key
            case 40://down arrow
                cam.pitch(Math.PI * 0.025);//look down
            break;
            case 87://w key
            case 38://up arrow
                cam.pitch(-Math.PI * 0.025);//look up
            break;
        }
    }
    else {
        var pos = cam.getPosition();
        var mov = [0,0,0];
        switch(event.keyCode) {//determinethe key released
            case 65://a key
            case 37://left arrow
                mov = c3dl.multiplyVector(cam.getLeft(),10,mov);
            break;
            case 68://d key
            case 39://right arrow
                mov = c3dl.multiplyVector(cam.getLeft(),-10,mov);
            break;
            case 83://s key
                mov = c3dl.multiplyVector(cam.getUp(),-10,mov);//move the camera down
            break;
            case 40://down arrow
                mov = c3dl.multiplyVector(cam.getDir(),-10,mov); //move the camera 'back' (towards the user)
            break;
            case 87://w key
                mov = c3dl.multiplyVector(cam.getUp(),10,mov); //move the camera up
            break;
            case 38://up arrow
                mov = c3dl.multiplyVector(cam.getDir(),10,mov);//move the camera 'forward' (into the scene)
            break;
        }
        cam.setPosition([pos[0]+mov[0],pos[1]+mov[1],pos[2]+mov[2]]);
    }
}

function canvasMain(canvasName){

 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);

 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);

 scn.setRenderer(renderer);
 scn.init(canvasName);

 if(renderer.isReady() )
 {
  var duck = new c3dl.Model();
  duck.init("duck.dae");
  duck.setTexture("duck.png");
  duck.yaw(-Math.PI * 0.5); //rotate the duck to look up the Z axis
  scn.addObjectToScene(duck);

  var cam = new c3dl.FreeCamera();
  cam.setPosition(new Array(0, 0, 600));
  cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  scn.setCamera(cam);

  //let the scene know which function to call when a key is pressed (down) 
  //and released (up).  
  scn.setKeyboardCallback(up);

  scn.startScene();
 }
}