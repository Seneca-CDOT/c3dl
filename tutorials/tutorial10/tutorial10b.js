// Tutorial 10b

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");

//This function is going to be called when the user releases a key.
// If shift is currently pressed, the camera will stop rotating in that direction,
// if shift is not being held, the camera will stop moving.
function up(event){//a key is released
    var cam = scn.getCamera();
    var vel;
    if(event.shiftKey) {
        switch(event.keyCode) {//determine the key released, if it is any of the angular velocity keys, set angular velocity to 0
            case 65://a key
            case 68://d key
            case 37://left arrow
            case 39://right arrow
            case 83://s key
            case 40://down arrow
            case 87://w key
            case 38://up arrow
                cam.setAngularVel([0,0,0]);//stop rolling
            break;
        }
    }
    else {
        var pos = cam.getPosition();
        switch(event.keyCode) {//determine the key released, if it is one of the linear velocity keys, set linear velocity to 0
            case 65://a key
            case 37://left arrow
            case 68://d key
            case 39://right arrow
            case 83://s key
            case 40://down arrow
            case 87://w key
            case 38://up arrow
                cam.setLinearVel([0,0,0]);
            break;
            case 16://shift key
                cam.setAngularVel([0,0,0]);
            break;
        }
    }
}

//This function is going to be called when the user presses a key.
// If shift is currently pressed, the camera will start rotating in the chosen direction,
// if shift is not being held, the camera will move.
function down(event){//a key is released
    var cam = scn.getCamera();
    if(event.shiftKey) {
        switch(event.keyCode) {//determine the key pressed
            case 65://a key
                cam.setAngularVel([0,0,-0.001]);//roll the camera left
                break;
            case 37://left arrow
                cam.setAngularVel([0,0.001,0]);//yaw left
                break;
            case 68://d key
                cam.setAngularVel([0,0,0.001]);//roll the camera right
                break;
            case 39://right arrow
                cam.setAngularVel([0,-0.001,0]);//yaw right
                break;
            case 83://s key
            case 40://down arrow
                cam.setAngularVel([0.001,0,0]);//pitch down
            break;
            case 87://w key
            case 38://up arrow
                cam.setAngularVel([-0.001,0,0]);//pitch up
            break;
        }
    }
    else {
        var mov = [0,0,0];
        switch(event.keyCode) {//determine the key pressed
            case 65://a key
            case 37://left arrow
                mov = c3dl.multiplyVector(cam.getLeft(),0.1,mov);
            break;
            case 68://d key
            case 39://right arrow
                mov = c3dl.multiplyVector(cam.getLeft(),-0.1,mov);
            break;
            case 83://s key
                mov = c3dl.multiplyVector(cam.getUp(),-0.1,mov);//move the camera down
            break;
            case 40://down arrow
                mov = c3dl.multiplyVector(cam.getDir(),-0.1,mov); //move the camera 'back' (towards the user)
            break;
            case 87://w key
                mov = c3dl.multiplyVector(cam.getUp(),0.1,mov); //move the camera up
            break;
            case 38://up arrow
                mov = c3dl.multiplyVector(cam.getDir(),0.1,mov);//move the camera 'forward' (into the scene)
            break;
            case 16://shift key, stop linear movement
                cam.setLinearVel([0,0,0]);
            break;
        }
        cam.setLinearVel(mov);
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
  scn.setKeyboardCallback(up,down);

  scn.startScene();
 }
}