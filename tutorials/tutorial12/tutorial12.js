// Tutorial 12

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");

var lastKey = -1;

function down(event)
{
  var cam = scn.getCamera();
      var vel = [0,0,0];
      if(event.keyCode != lastKey) {
          lastKey = event.keyCode;
              var mov = [0,0,0];
          vel = cam.getLinearVel();
        switch(event.keyCode) {//determine the key pressed
                    case 37://left arrow
                    mov = c3dl.multiplyVector(cam.getLeft(),1,mov);
            break;
            case 39://right arrow
                        mov = c3dl.multiplyVector(cam.getLeft(),-1,mov);
                  break;
                  case 40://down arrow
                  mov = c3dl.multiplyVector(cam.getDir(),-1,mov); //move the camera 'back' (towards the user)
            break;
                  case 38://up arrow
                    mov = c3dl.multiplyVector(cam.getDir(),1,mov);//move the camera 'forward' (into the scene)
            break;
        }
              cam.setLinearVel([vel[0]+mov[0],vel[1]+mov[1],vel[2]+mov[2]]);
  }
}

function up(event)
{
  var cam = scn.getCamera();
        var vel;
        lastKey = -1;
  var pos = cam.getPosition();
  vel = cam.getLinearVel();
  switch(event.keyCode) {//determine the key released, if it is one of the linear velocity keys, set linear velocity to 0
    case 37://left arrow
    case 39://right arrow
      cam.setLinearVel([0,vel[1],vel[2]]);
    break;
    case 40://down arrow
    case 38://up arrow
      cam.setLinearVel([vel[0],vel[1],0]);
    break;
    case 87://w key - move far clipping plane away
      cam.setFarClippingPlane(cam.getFarClippingPlane() + 1000);
    break;
    case 83://s key - move far clipping plane closer
      cam.setFarClippingPlane(cam.getFarClippingPlane() - 1000);      
    break;
    case 81://q key - move near clipping plane farther away
      cam.setNearClippingPlane(cam.getNearClippingPlane() + 1000);
    break;
    case 65://a key - move near clipping plane closer
      cam.setNearClippingPlane(cam.getNearClippingPlane() - 1000);
    break;
    case 69://e key - increase field of view
      cam.setFieldOfView(cam.getFieldOfView() + 5);
    break;
    case 68://d key - decrease field of view
      cam.setFieldOfView(cam.getFieldOfView() - 5);      
    break;
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
  var things = [];
  for(var i = 0; i < 70; i++) {
    things[i] = new c3dl.Model();
    things[i].init("duck.dae");
    things[i].setTexture("duck.png");
    things[i].setPosition([0,0,200-(1000*i)]);
    scn.addObjectToScene(things[i]);
  }

  var cam = new c3dl.FreeCamera();
  cam.setPosition([0,400,100]);
  cam.setLookAtPoint([0,400,-100]);
  scn.setCamera(cam);
  
  scn.setKeyboardCallback(up,down);

  scn.startScene();
 }
}
