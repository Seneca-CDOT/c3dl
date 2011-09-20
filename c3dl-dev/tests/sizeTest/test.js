c3dl.addMainCallBack(canvasMain, "size");
c3dl.addModel("models/teapot.dae");
c3dl.addModel("models/cube.dae");
var teapot;
var first = true;
function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if(renderer.isReady()) {
    teapot = new c3dl.Model();
    teapot.init("models/teapot.dae");
    teapot.centerObject();
    teapot.setRenderObb(true);
    teapot.setHeight(5);
    teapot.setWidth(5);
    teapot.setLength(5);
    scn.addObjectToScene(teapot);
    var cube = new c3dl.Model();
    cube.init("models/cube.dae");
    cube.centerObject();
    scn.addObjectToScene(cube);
    var cam = new c3dl.FreeCamera();
    cam.setPosition(new Array(0.0, 0.0,10));
    cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
    scn.setCamera(cam);
    scn.setUpdateCallback(update);
    scn.startScene();
   
  }
}

function update(event)
{	
  if (teapot.isReady() && first) {
    document.getElementById("length").value=teapot.getSize()[0].toFixed(2);
    document.getElementById("width").value=teapot.getSize()[2].toFixed(2);
    document.getElementById("height").value=teapot.getSize()[1].toFixed(2);
    first = false;
  }
}
function maintainAspectRatioLength(){
  document.getElementById("length").value = parseFloat(document.getElementById("length").value).toFixed(2);
  if (document.getElementById("mar").checked) { 
    newLength = document.getElementById("length").value;
    if (newLength > oldLength) {
      document.getElementById("width").value= (document.getElementById("width").value * (newLength / oldLength)).toFixed(2);
      document.getElementById("height").value= (document.getElementById("height").value* (newLength / oldLength)).toFixed(2);
    }
    else if (newLength < oldLength) {
      document.getElementById("width").value= document.getElementById("width").value * 1/(oldLength / newLength).toFixed(2);
      document.getElementById("height").value= document.getElementById("height").value * 1/(oldLength / newLength).toFixed(2);
    }
  }
}
function maintainAspectRatioWidth(){
  document.getElementById("width").value = parseFloat(document.getElementById("width").value).toFixed(2);
  if (document.getElementById("mar").checked) {
    newWidth = document.getElementById("width").value;
    if (newWidth > oldWidth) {
      document.getElementById("length").value= (document.getElementById("length").value * (newWidth / oldWidth)).toFixed(2);
      document.getElementById("height").value= (document.getElementById("height").value* (newWidth / oldWidth)).toFixed(2);
    }
    else if (newWidth < oldWidth) {
      document.getElementById("length").value= (document.getElementById("length").value * 1/(oldWidth / newWidth)).toFixed(2);
      document.getElementById("height").value= (document.getElementById("height").value * 1/(oldWidth / newWidth)).toFixed(2);
    }
  }
}
function maintainAspectRatioHeight(){
  document.getElementById("height").value = parseFloat(document.getElementById("height").value).toFixed(2);  
  if (document.getElementById("mar").checked) {
    newHeight = document.getElementById("height").value;
    if (newHeight > oldHeight) {
      document.getElementById("width").value= (document.getElementById("width").value * (newHeight / oldHeight)).toFixed(2);
      document.getElementById("length").value= (document.getElementById("length").value* (newHeight / oldHeight)).toFixed(2);
    }
    else if (newHeight < oldHeight) {
      document.getElementById("width").value= (document.getElementById("width").value * 1/(oldHeight / newHeight)).toFixed(2);
      document.getElementById("length").value= (document.getElementById("length").value * 1/(oldHeight / newHeight)).toFixed(2);
    }
  }
}
function setCurHeigth() {
  oldHeight= document.getElementById("height").value;
}
function setCurLength() {
  oldLength= document.getElementById("length").value;
}
function setCurWidth() {
  oldWidth= document.getElementById("width").value;
}
function ok() { 
  length = document.getElementById("length").value;
  width =  document.getElementById("width").value;
  height = document.getElementById("height").value;
  teapot.setSize(length,width,height);
}