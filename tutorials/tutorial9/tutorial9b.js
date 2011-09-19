// Tutorial 9b

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");

//This function is going to be called when the user releases a key.
// If shift is currently pressed, the camera will rotate a bit in the chosen direction,
// if shift is not being held, the camera will move.
function up(event){//a key is released
    var cam = scn.getCamera();
    if(event.shiftKey) {
        switch(event.keyCode) {//deterime the key pressed
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
        switch(event.keyCode) {//deterime the key pressed
            case 65://a key
            case 37://left arrow
                cam.setPosition([pos[0]-10,pos[1],pos[2]]);//move - along the X axis
            break;
            case 68://d key
            case 39://right arrow
                cam.setPosition([pos[0]+10,pos[1],pos[2]]);//more + along the X axis
            break;
            case 83://s key
                cam.setPosition([pos[0],pos[1]-10,pos[2]]);//move - along the Y axis (down)
            break;
            case 40://down arrow
                cam.setPosition([pos[0],pos[1],pos[2]+10]);//move + on the Z axis
            break;
            case 87://w key
                cam.setPosition([pos[0],pos[1]+10,pos[2]]);//move + on the Y axis (up)
            break;
            case 38://up arrow
                cam.setPosition([pos[0],pos[1],pos[2]-10]);//move - on the Z axis
            break;
        }
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
  var duck = new c3dl.Collada();
  duck.init("duck.dae");
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