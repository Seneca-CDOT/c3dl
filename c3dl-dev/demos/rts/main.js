/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// model paths
const BARRACKS_PATH = "models/barracks/barracks.dae";
const PLANE = "models/cube.dae";
const FARM_PATH = "models/farm/farm.dae";

var creatingBuilding = false;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const NONE_SELECTED = -1;
lastSelectedObjID = -1;

const ZOOM_SENSITIVITY = 1;

const CAM_MOVE_SPEED = 2;
const CAM_MOVE_BUFFER_SIZE = 20;
var keyD = false;

c3dl.addModel(BARRACKS_PATH);
c3dl.addModel(FARM_PATH);
c3dl.addModel(PLANE);

// How many lines make up the circle around the
// buildings. The higher the value, the more lines.
const OUTLINE_DETAIL = 7;
var outline1;

c3dl.addMainCallBack(canvasMain, 'rts');

var scn;
var test;
var mx, my, mz;
var psys;
var cam;
var light;
var md = false;

var startSx = 0,
  startSy = 0;

var clickTimeDiff = 0;
var numClicks = 0;

var objectSelected = null;
var selectedObjectID = NONE_SELECTED;

// array of all of the users buildings
var usersBuildings = [];

var selTopLine, selBottomLine, selLeftLine, selRightLine;

// the material the selected object will have
var selectedMat = null;
var selHeight = 0.2;
var isCamMovingLeft = false;
var isCamMovingRight = false;
var isCamMovingUp = false;
var isCamMovingDown = false;

var screenStartX = 0;
var screenStartY = 0;
var screenCurrentX = 0;
var screenCurrentY = 0;

var idGenerator = (function IDGen() {
  var id = 0;

  return {
    getNextID: function () {
      return id++;
    }
  };
})();


var selection = (

function Selection() {
  var lines = [null, null, null, null];
  var coords;

  return {
    init: function () {
      for (var i = 0; i < 4; i++) {
        lines[i] = new c3dl.Line();
        lines[i].setColors([.33, .66, .99], [.33, .66, .99]);
        lines[i].setVisible(true);
        scn.addObjectToScene(lines[i]);
      }
    },
    setBounds: function (x1, y1, x2, y2, x3, y3, x4, y4) {
      coords = [x1, y1, x2, y2, x3, y3, x4, y4];
      //lines[0].setCoordinates([x, 2, z], [x2, 2, z2]);
      // lines[1].setCoordinates([x2, 2, z], [x2, 2, z2]);
      // lines[2].setCoordinates([x2, 2, z2], [x, 2, z2]);
      // lines[3].setCoordinates([x, 2, z2], [x, 2, z]);
    },
    getLines: function () {
      return lines;
    },
    setVisible: function (isVisible) {
      for (var i = 0; i < 4; i++) {
       // lines[i].setVisible(isVisible);
        lines[i].setCoordinates([0,0,0],[0,0,0]);
      }
    }
  };
})();

/*
  detail -  How many lines make up the shape around the object
            the higher the value, the smoother it will be
  color -   array of 3 values
  radius -  Radius
*/
function outline(detail, color, radius) {
  var detail = detail;
  var color = color;
  var radius = radius;
  var lines = [];
  var position = [0,0,0];
  
  function init() {
    var lineVerts = [];
    var x = 0;
    var y = 1 * radius;
    var num_lines = Math.PI * 2 / OUTLINE_DETAIL;

    for(var i = 0; i <= Math.PI * 2; i+= num_lines)
    {
      lineVerts.push([x, 1, y]);
      x = Math.sin(i) * radius;
      y = Math.cos(i) * radius;
      lineVerts.push([x, 1, y]);
    }

    for (var i = 0; i < lineVerts.length; i+=2) {
      var line = new c3dl.Line();
      line.setCoordinates(lineVerts[i], lineVerts[i + 1]);
      line.setColors(color, color);
      scn.addObjectToScene(line);
      lines.push(line);
    }

    // close off the shape
    var line = new c3dl.Line();
    line.setCoordinates(lineVerts[lineVerts.length - 1], lineVerts[0]);
    line.setColors(color, color);
    scn.addObjectToScene(line);
    lines.push(line);
  }
  init();

  return {
    /*
      Assign a new position to the outline
    */
    setPosition: function(newPos) {
      for(var i = 0; i < lines.length; i++) {
        
        var lc = lines[i].getCoordinates();

        var l1 = [lc[0],lc[1],lc[2]];
        var l2 = [lc[3],lc[4],lc[5]];
        
        var posToVert1 = c3dl.subtractVectors(l1, position);
        var posToVert2 = c3dl.subtractVectors(l2, position);
        lines[i].setCoordinates(c3dl.addVectors(posToVert1,newPos), c3dl.addVectors(posToVert2,newPos));
      }
    },
    setColor: function(color) {
      for(var i = 0; i < lines.length; i++) {
        lines[i].setColors(color,color);
      }
    },
    getColor: function() {
      return color;
    },
    getPosition: function() {
      return position;
    },
    setVisible: function(visible) {
      for(var i = 0; i < lines.length; i++) {
        lines[i].setVisible(visible);
      }
    }
  };
}


function isPointInSquare(p, line1, line2, line3, line4) {

}

function canvasMain(canvasName) {
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();
  scn.setRenderer(renderer);
  scn.init();

  scn.setAmbientLight([.2, .2, .2]);

  selectedMat = new c3dl.Effect();
  selectedMat.init(c3dl.effects.SEPIA);
  selectedMat.setParameter("color", [0.3, 0.6, 0.9]);

  light = new c3dl.DirectionalLight();
  light.setDiffuse([1, 1, 1]);
  light.setDirection([0, -1, 0]);
  light.setOn(true);
  scn.addLight(light);

  var onFire = new c3dl.Effect();
  onFire.init(c3dl.effects.SEPIA);
  onFire.setParameter("color", [0.6, 0.3, 0.2]);

  selTopLine = new c3dl.Line();
  selBottomLine = new c3dl.Line();

  selection.init();
  selection.setBounds(0, 0, 50, 50);
  selection.setVisible(false);

  var col = new c3dl.Collada();
  col.init(BARRACKS_PATH);
  col.pitch(-3.14 / 2);
  col.translate([25,0,25]);
  scn.addObjectToScene(col);

  outline1 = new outline(OUTLINE_DETAIL,[0,0,1],8);
  outline1.setVisible(true);
  outline1.setPosition([25,0,25]);

  psys = new c3dl.ParticleSystem();
  psys.setMinVelocity([-.5, 3, -.5]);
  psys.setMaxVelocity([.2, 5, .5]);
  
  psys.setMinLifetime(1);
  psys.setMaxLifetime(3);

  psys.setMinColor([0.5, 0, 0, 0]);
  psys.setMaxColor([1, 0.5, 0, 1]);

  psys.setSrcBlend(c3dl.ONE);
  psys.setDstBlend(c3dl.ONE);

  psys.setMinSize(0.4);
  psys.setMaxSize(0.8);

  psys.setTexture("textures/flare.gif");
  psys.setAcceleration([0, 0, 0]);
  psys.setEmitRate(90);
  psys.init(150);
  psys.setPosition([25,0,25]);
  scn.addObjectToScene(psys);

  var r = -1;
  var c = -1;
  for (var i = 0; i < 9; i++, c++) {
    if (i != 0 && i % 3 == 0) {
      r++;
      c = -1
    }

    var earth = new c3dl.Collada();
    earth.init(PLANE);
    earth.setTexture("textures/grass.jpg");
    earth.scale([10, .01, 10]);
    earth.translate([c * 100, 0, r * 100]);
    earth.id = 0;
    scn.addObjectToScene(earth);
  }

  cam = new c3dl.OrbitCamera();
  cam.setFarthestDistance(200);
  cam.setClosestDistance(20);
  cam.setDistance(100);
  cam.pitch(1);

  scn.setCamera(cam);
  scn.startScene();
  scn.setKeyboardCallback(onKeyUp, onKeyDown);
  scn.setMouseCallback(mouseUp, mouseDown, mouseMove, mouseWheel);
  scn.setUpdateCallback(update);
  scn.setPickingCallback(picking);
}

function onKeyUp(event) {
  if (event.keyCode == 89) {
    keyD = false;
  }
}



function mouseUp() {
  var tooClose = false;

  if (usersBuildings.length > 0) {
    for (var i = 0; i < usersBuildings.length; i++) {
      if (test === usersBuildings[i]) {
        continue;
      }
      if (test != null) {
        var s = c3dl.subtractVectors(
        test.getPosition(), usersBuildings[i].getPosition());

        if (c3dl.vectorLength(s) < 20) {
          tooClose = true;
          //c3dl.debug.logInfo('too close to adjacent building!');
          break;
        }
      }
    }
  }

  if (tooClose === false && test) {
    var o = new outline(OUTLINE_DETAIL, [0,0,1], 8);
    o.setPosition(test.getPosition());
    test = null;
    creatingBuilding = false;
  }


  selection.setVisible(false);

  md = false;
}

function mouseDown(event) {
  md = true;

  var viewportCoords = getClickedCoords(event);
  var c = getWorldCoords(viewportCoords[0], viewportCoords[1]);

  startSx = c[0];
  startSy = c[2];

  screenStartX = viewportCoords[0];
  screenStartY = viewportCoords[1];


  //selection.setVisible(true);
  //selection.setBounds(startSx,startSy,startSx,startSy);
}

function mouseWheel(event) {
  var delta = 0;

  // Chromium
  if (event.wheelDelta) {
    delta = -event.wheelDelta / 20;
  }
  // Minefield
  else if (event.detail) {
    delta = event.detail * 4;
  }

  if (test) //creatingBuilding)
  {
    test.roll(delta / 200);
  }

  else {
    if (keyD) {
      cam.yaw(delta * ZOOM_SENSITIVITY / 100);
    } else {

      // towards user
      if (-delta * ZOOM_SENSITIVITY < 0) {
        cam.goFarther(-1 * -delta * ZOOM_SENSITIVITY);
      }

      // towards screen
      else {
        cam.goCloser(-delta * ZOOM_SENSITIVITY);
      }
    }
  }
}


function onKeyDown(event) {
  if (event.keyCode == 65) {
    cam.setOrbitPoint([0, 0, 0]);
  }
  if (event.keyCode == 89) {
    keyD = true;
  }
}

function createObject(objID) {
  var collada = new c3dl.Collada();

  switch (objID) {
  case 0:
    collada.init(BARRACKS_PATH);
    break;
  case 1:
    collada.init(FARM_PATH);
    break;

  default:
    break;
  }

  if (collada) {
    collada.pitch(-Math.PI / 2);
    test = collada;
    collada.ID = idGenerator.getNextID();
    usersBuildings.push(collada);
    scn.addObjectToScene(collada);
    creatingBuilding = true;
  }
}

/*
  Returns the viewport coordinates where the user clicked
*/
function getClickedCoords( event )
{
  var canvas = scn.getCanvas();
  var canvasPosition = c3dl.getObjectPosition(scn.getCanvas());

  // event.clientX and event.clientY contain where the user clicked 
  // on the client area of the browser
  // canvasPosition holds the coordinate of the top left corner where the canvas resides
  // on the client area.
  // window.pageXOffset, window.pageYOffset hold how much the user has scrolled.
  var X = event.clientX - canvasPosition[0] + window.pageXOffset - 1;
  var Y = event.clientY - canvasPosition[1] + window.pageYOffset - 1;

  return [X,Y];
}


function mouseMove(event) {
  // get mouse coords relative to window
  var viewportCoords = getClickedCoords(event);
  var mmx = viewportCoords[0];
  var mmy = viewportCoords[1];

  var screenCurrentX = mmx;

  isCamMovingLeft = (mmx < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingRight = (mmx > CANVAS_WIDTH - CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingUp = (mmy < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingDown = (mmy > CANVAS_HEIGHT - CAM_MOVE_BUFFER_SIZE) ? true : false;

  if (md) {
    selection.setVisible(true);
  }

  var c = getWorldCoords(mmx, mmy);
  if (c) {
    mx = c[0];
    my = c[1];
    mz = c[2];
  }
  if (md) {
    var camLeft = cam.getLeft();

    var a = [startSx - mx, 0, startSy - mz];
    var l = c3dl.vectorLength(a);

    var forw = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    forw = c3dl.multiplyVector(forw, 1000);

    var aa = c3dl.vectorProject(a, forw);
    var testl = c3dl.vectorLength(aa);
    var b = Math.sqrt(l * l - testl * testl);

    var f = selection.getLines();

    var topRightX;
    var topRightY;
    var bottomLeftX;
    var bottomLeftY;

    // if the user is dragging to the right
    if (screenStartX < screenCurrentX) {
      topRightX = startSx - camLeft[0] * b;

      bottomLeftX = mx + camLeft[0] * b;
      bottomLeftY = mz + camLeft[2] * b;

      topRightY = startSy - camLeft[2] * b;
    } else {
      topRightX = startSx + camLeft[0] * b;
      topRightY = startSy + camLeft[2] * b;

      bottomLeftX = mx - camLeft[0] * b;
      bottomLeftY = mz - camLeft[2] * b;
    }

    var lines = selection.getLines();
    lines[0].setCoordinates([startSx, selHeight, startSy], [topRightX, selHeight, topRightY]);
    lines[1].setCoordinates([topRightX, selHeight, topRightY], [mx, selHeight, mz]);
    lines[2].setCoordinates([mx, selHeight, mz], [bottomLeftX, selHeight, bottomLeftY]);
    lines[3].setCoordinates([bottomLeftX, selHeight, bottomLeftY], [startSx, selHeight, startSy]);
  }
}

function getWorldCoords(mmx, mmy) {
  // get mouse coords relative to window
  //	var mmx = event.pageX - 1;
  //	var mmy = event.pageY - 1;
  isCamMovingLeft = (mmx < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingRight = (mmx > CANVAS_WIDTH - CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingUp = (mmy < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingDown = (mmy > CANVAS_HEIGHT - CAM_MOVE_BUFFER_SIZE) ? true : false;

  if (mmx != null && mmy != null) {
    // NDC
    var normalizedDeviceCoords = [(2 * mmx / CANVAS_WIDTH) - 1, -((2 * mmy / CANVAS_HEIGHT) - 1), 1, 1];

    // Sometimes this is called before the perspective transform
    // is setup which causes warnings. This check prevents that.
    if (c3dl.isValidMatrix(scn.getProjectionMatrix())) {
      var iproj = c3dl.inverseMatrix(scn.getProjectionMatrix());

      // To get the clip coords, we multiply the viewspace coordinates by
      // the projection matrix.
      // Working backwards across the pipeline, we have to take the normalized
      // device coordinates and multiply by the inverse projection matrix to get
      // the clip coordinates.
      var clipCoords = c3dl.multiplyMatrixByVector(iproj, normalizedDeviceCoords);

      // perspective divide
      clipCoords[0] /= clipCoords[3];
      clipCoords[1] /= clipCoords[3];
      clipCoords[2] /= clipCoords[3];
      clipCoords[2] = -clipCoords[2];

      var rayInitialPoint = cam.getPosition();

      var x = clipCoords[0];
      var y = clipCoords[1];
      var z = clipCoords[2];

      var kludge = c3dl.multiplyVector(cam.getLeft(), -1);
      var viewMatrix = c3dl.makePoseMatrix(kludge, cam.getUp(), cam.getDir(), cam.getPosition());

      var rayTerminalPoint = c3dl.multiplyMatrixByVector(viewMatrix, [x, y, z, 0]);
      var rayDir = c3dl.normalizeVector(rayTerminalPoint);

      // get angle
      var angle = Math.acos(-1 * rayDir[1]);
      var camHeight = rayInitialPoint[1];

      var hyp = camHeight / Math.cos(angle);

      mx = hyp * rayDir[0] + rayInitialPoint[0];
      my = hyp * rayDir[1];
      mz = hyp * rayDir[2] + rayInitialPoint[2];
      return [mx, my, mz];
    }
  }
}

function update(deltaTime) {
  document.getElementById("fps").innerHTML = "<br />FPS:" + Math.floor(scn.getFPS());
  //  document.getElementById("debug").innerHTML = mx + " " + my + " " + mz;
  if (mx && test) {
    test.setPosition([mx, 0, mz]);
  }

  var s = CAM_MOVE_SPEED * deltaTime / 100;

  if (isCamMovingLeft && md) {
    var dir = c3dl.multiplyVector(cam.getLeft(), s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  } else if (isCamMovingRight && md) {
    var dir = c3dl.multiplyVector(cam.getLeft(), -s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  }

  if (isCamMovingUp && md) {
    var dir = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    dir = c3dl.multiplyVector(dir, s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  } else if (isCamMovingDown && md) {
    var dir = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    dir = c3dl.multiplyVector(dir, -s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  }

  // move the sun
  var pos = light.getDirection();

  var quat = c3dl.axisAngleToQuat([0, 0, 1], deltaTime / 25000);
  var mat = c3dl.quatToMatrix(quat);
  c3dl.multiplyMatrixByVector(mat, pos, pos);

  light.setDirection(pos);
  
  
  // testing
  
  var color = outline1.getColor();
  if(color[0] < 1){
  color[0] += 0.01;
  color[2] -= 0.01;
  outline1.setColor(color);
  }
}

function picking(pickingObj) {

  if (creatingBuilding === false) {
    var objectsHit = pickingObj.getObjects();
    var centerOnObj = false;

    if (objectsHit.length > 0) {
      for (var i in objectsHit) {
        // If the ground was selected, the user just
        // wants to deselect the current selected object.
        if (objectsHit.length === 1) {
          if (objectSelected) {
            objectSelected.setEffect(c3dl.effects.STANDARD);
            objectSelected = null;
            lastSelectedObjID = NONE_SELECTED;
          }
          break;
        }

        // If the object that was clicked isn't the ground
        if (objectsHit[i].id !== 0) {
          if (objectSelected) {
            objectSelected.setEffect(c3dl.effects.STANDARD);
          }

          objectsHit[i].setEffect(selectedMat);
          objectSelected = objectsHit[i];

          if (objectSelected.ID === lastSelectedObjID) {
            centerOnObj = true;
          }

          lastSelectedObjID = objectSelected.ID;

          if (centerOnObj) {
            cam.setOrbitPoint(objectSelected.getPosition());
          }
          break;
        }
      }
    }
  }
}