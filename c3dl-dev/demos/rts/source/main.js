/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// model paths
const BANK_PATH         = "models/bank/bank.dae";
const BARRACKS_PATH     = "models/barracks/barracks.dae";
const CUBE_PATH         = "models/cube/cube.dae";
const FARM_PATH         = "models/farm/farm.dae";
const FIREHALL_PATH     = "models/firehall/firehall.dae";
const HOUSE_PATH        = "models/house/house.dae";
const LUMBER_YARD_PATH  = "models/lumber_yard/lumber_yard.dae";
const PERSON_PATH       = "models/person/person.dae";
const PLANE_PATH        = "models/plane/plane.dae";

c3dl.addModel(BANK_PATH);
c3dl.addModel(BARRACKS_PATH);
c3dl.addModel(CUBE_PATH);
c3dl.addModel(FARM_PATH);
c3dl.addModel(FIREHALL_PATH);
c3dl.addModel(HOUSE_PATH);
c3dl.addModel(LUMBER_YARD_PATH);
c3dl.addModel(PERSON_PATH);
c3dl.addModel(PLANE_PATH);

// keys
const KEY_ESC   = 27;
const KEY_H     = 72;
const KEY_M     = 77;
const KEY_Y     = 89;

const KEY_LEFT  = 37;
const KEY_UP    = 38;
const KEY_RIGHT = 39;
const KEY_DOWN  = 40; 

//
c3dl.addMainCallBack(canvasMain, 'rts');

// seletion
const BOTTOM_LEFT_TO_TOP_RIGHT = 4;
const BOTTOM_RIGHT_TO_TOP_LEFT = 3;
const TOP_RIGHT_TO_BOTTOM_LEFT = 2;
const TOP_LEFT_TO_BOTTOM_RIGHT = 1;
const SEL_HEIGHT = 0.2;

// Canvas
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

// How many lines make up the circle around the
// buildings. The higher the value, the more lines.
const OUTLINE_DETAIL      = 25;
const OUTLINE_RADIUS      = 7;
const OUTLINE_HEIGHT      = 0;
const OUTLINE_LINE_WIDTH  = 1;

const NONE_SELECTED = -1;

// Camera
const ZOOM_SENSITIVITY = 1;
const CAM_MOVE_SPEED = 5;
const CAM_MOVE_BUFFER_SIZE = 20;
const CAM_CLOSEST_DISTANCE = 20;
const CAM_FARTHEST_DISTANCE = 100;
const SIDEWAYS = 0;
const FORWARD = 1;

var creatingBuilding = false;

//
var scn;
var test;
var sun;

// Users things
var usersMoney = 2000;
var usersLumber = 1000;
// array of all of the users buildings
var usersBuildings = [];

// When the user starts to make a selection, keep
// track of the world coords where they clicked so
// we can later figure out what objects where in 
// the bounds of the selection.
var selStartWorldCoords = [0,0];
var selEndWorldCoords = [0,0];

// the material the selected object will have
var selectedEffect = null;
var nosel = false;
var lastSelectedObjID = -1;
var objectSelected = null;
var selectedObjectID = NONE_SELECTED;
var clickTimeDiff = 0;
var numClicks = 0;

// Camera
var cam;
var isCamMovingLeft = false;
var isCamMovingRight = false;
var isCamMovingUp = false;
var isCamMovingDown = false;

/*
  Provides unique IDs to distinguish between objects.
*/
var idGenerator = (function IDGen() {
  var id = 0;

  return {
    getNextID: function () {
      return id++;
    }
  };
})();

/*
*/
var selection = (

  function Selection() {
    var lines = [null, null, null, null];
    var coords;
    var vis = false;
    var color = [1,1,1];
    var direction = 0;

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
      getCoordinates: function() {
        var c = [];
        for(var i=0; i< 4; i++) {
          for(var j = 0; j < 6; j++) {
            c.push(lines[i].getCoordinates()[j]);
          }
        }
        return c;
      },
      setDirection: function(d) {
        direction = d;
      },
      getDirection: function() {
        return direction;
      },
      setColor: function(c) {
       for (var i = 0; i < 4; i++) {
        lines[i].setColors(c, c);
       }
       color = c;
      },
      getColor: function() {
        return color;
      },
      getVisible: function() {
        return vis;
      },
      setVisible: function (isVisible) {
        for (var i = 0; i < 4; i++) {
         // lines[i].setVisible(isVisible);
          lines[i].setCoordinates([0,0,0],[0,0,0]);
        }
        vis = isVisible;
      }
    };
  }
)();

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
    var y = radius;
    var num_lines = Math.PI * 2 / OUTLINE_DETAIL;

    for(var i = 0; i <= Math.PI * 2; i += num_lines)
    {
      lineVerts.push([x, OUTLINE_HEIGHT, y]);
      x = Math.sin(i) * radius;
      y = Math.cos(i) * radius;
      lineVerts.push([x, OUTLINE_HEIGHT, y]);
    }

    for (var i = 0; i < lineVerts.length; i+=2) {
      var line = new c3dl.Line();
      line.setWidth(OUTLINE_LINE_WIDTH);
      line.setCoordinates(lineVerts[i], lineVerts[i + 1]);
      line.setColors(color, color);
      scn.addObjectToScene(line);
      lines.push(line);
    }

    // close off the shape
    var line = new c3dl.Line();
    line.setWidth(OUTLINE_LINE_WIDTH);
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

// mouse screen coords and button states
var mouseX = 0;
var mouseY = 0;

var mouseButtonsDown = (
  function MouseButtonsDown(){
    var BTN1 = false,
        BTN2 = false,
        BTN3 = false;
    return {"BTN1":BTN1,
            "BTN2":BTN2,
            "BTN3":BTN3
    };
  }
)();

var keysDown = (
  function KeysDown(){
    var key_a = false,
        key_up = false,
        key_down = false,
        key_up = false,
        key_left = false,
        key_right = false;
    return {"KEY_A":key_a,
            "KEY_UP":key_up,
            "KEY_DOWN":key_down,
            "KEY_LEFT":key_left,
            "KEY_RIGHT":key_right
    };
  }
)();


/*
  First function which gets called
*/
function canvasMain(canvasName) {

 // alert(keysDown.KEY_A);
 // keysDown.KEY_A = true;
 // alert(keysDown.KEY_A);
  
  // standard C3DL initialization
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();
  scn.setRenderer(renderer);
  scn.init();
  
  // Make the camera look down -z with yaw
  cam = new c3dl.OrbitCamera();
  cam.setFarthestDistance(CAM_FARTHEST_DISTANCE);
  cam.setClosestDistance(CAM_CLOSEST_DISTANCE);
  setDefaultCamView();


  // Effect used when game objects are selected
  selectedEffect = new c3dl.Effect();
  selectedEffect.init(c3dl.effects.SEPIA);
  selectedEffect.setParameter("color", [0.3, 0.6, 0.9]);

  //var onFire = new c3dl.Effect();
 // onFire.init(c3dl.effects.SEPIA);
  //onFire.setParameter("color", [0.6, 0.3, 0.2]);

  // sunlight goes from east to west 
  sun = new c3dl.DirectionalLight();
  sun.setDiffuse([1, 1, 1]);
  sun.setDirection([-1, 0, 0]);
  sun.setOn(true);
  scn.addLight(sun);

  // Add some ambient light so the scene isn't so dark.  
  scn.setAmbientLight([.2, .2, .2]);

  // create the selection object which is used to select
  // buildings and game objects.
  selection.init();
  selection.setBounds(0, 0, 50, 50);
  selection.setVisible(false);

  // Create the game board
  var r = -1;
  var c = -1;
  for (var i = 0; i < 25; i++, c++) {
    if (i != 0 && i % 5 == 0) {
      r++;
      c = -1
    }

    var earth = new c3dl.Collada();
    earth.init(PLANE_PATH);
    // move down y to prevent z-fighting with planes
    // under models
    earth.translate([r*10,-0.5,c*10]);
    //set the id for later use during picking
    earth.id = i;
    scn.addObjectToScene(earth);
  }

  updateDOM();

  scn.setCamera(cam);
  scn.startScene();
  scn.setKeyboardCallback(onKeyUp, onKeyDown);
  scn.setMouseCallback(mouseUp, mouseDown, mouseMove, mouseWheel);
  scn.setUpdateCallback(update);
  scn.setPickingCallback(picking);
}

/*
  
*/
function setDefaultCamView() {
  cam.setOrbitPoint([0,0,0]);
  cam.setPosition([0,0,CAM_FARTHEST_DISTANCE]);
  cam.pitch(Math.PI/4);
}

/*
  TODO: fix signature to take polygon coords
*/
function pointInPolygon(point) {

  var isInside = true;
  var lines = selection.getLines();
  var c1 = lines[0].getCoordinates();
  var c2 = lines[1].getCoordinates();

  var startCoords = [c1[0],c1[1],c1[2]];
  var endCoords = [c2[3],c2[4],c2[5]];

  // only test if the polygon isn't to small, otherwise we get strange errors.
  if(c3dl.vectorLength(c3dl.subtractVectors(startCoords, endCoords)) > 10){
    for(var i = 0; i < 4; i++)
    {
      var c = lines[i].getCoordinates();
  
      var line;

      if( selection.getDirection() == TOP_RIGHT_TO_BOTTOM_LEFT ||
          selection.getDirection() == BOTTOM_LEFT_TO_TOP_RIGHT) {
        line = c3dl.normalizeVector(c3dl.subtractVectors( [c[0],c[1],c[2]],  [c[3],c[4],c[5] ]));
      }
      else {
        line = c3dl.normalizeVector(c3dl.subtractVectors( [c[3],c[4],c[5] ], [c[0],c[1],c[2] ]));
      }
            
      var lineNormal = c3dl.normalizeVector(c3dl.vectorCrossProduct(line,[0,1,0]));
      var endOfLineToPoint = c3dl.subtractVectors([point[0],c[1],point[1]],[c[0],c[1],c[2]]);

      var angle = c3dl.getAngleBetweenVectors(lineNormal, c3dl.normalizeVector(endOfLineToPoint));
      if(angle > 90)
      {
        isInside = false;
      }
    } 
  }
  else{
    isInside = false;
  }
  return isInside;
}

/*
*/
function mouseUp(event) {
  var tooClose = false;

  if(!test){
    for( var i = 0; i < usersBuildings.length; i++) {
      var ux = usersBuildings[i].getPosition()[0];
      var uy = usersBuildings[i].getPosition()[2];
      
      if(pointInPolygon([ux,uy]))
      {
        usersBuildings[i].setEffect(selectedEffect);
      }
      else
      {
        usersBuildings[i].setEffect(null);
      }
    }
  }
  
  if (usersBuildings.length > 0) {
    for (var i = 0; i < usersBuildings.length; i++) {
      if (test === usersBuildings[i]) {
        continue;
      }
      if (test != null) {
        var s = c3dl.subtractVectors(
        test.getPosition(), usersBuildings[i].getPosition());

        if (c3dl.vectorLength(s) < OUTLINE_RADIUS * 2) {
          tooClose = true;
          break;
        }
      }
    }
  }

  // If the user requested to build the object not too 
  // close to other objects
  if (tooClose === false && test) {
    var o = new outline(OUTLINE_DETAIL, [0,0,1], OUTLINE_RADIUS);
    o.setPosition(test.getPosition());
    test = null;
    creatingBuilding = false;
    showCancelBuildingImg(false);
    usersMoney -= 500;
  }

  selection.setVisible(false);
  
  switch(event.button) {
    case 0: mouseButtonsDown.BTN1 = false;break;
    case 1: mouseButtonsDown.BTN2 = false;break;
    case 2: mouseButtonsDown.BTN3 = false;break;
    default:break;
  }
}

/*
  TODO: prevent cam from going too far from island
*/
function moveCamera(direction, amount) {
  if(direction === SIDEWAYS) {
    var dir = c3dl.multiplyVector(cam.getLeft(), amount);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  }
  else if(direction === FORWARD ) {
    var dir = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    dir = c3dl.multiplyVector(dir, amount);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  }
}

/*
*/
function mouseDown(event) {
  
  switch(event.button) {
    case 0:   mouseButtonsDown.BTN1 = true;break;
    case 1:   mouseButtonsDown.BTN2 = true;break;
    case 2:   mouseButtonsDown.BTN3 = true;break;
    default:break;
  }

  nosel = false;

  var viewportCoords = getClickedCoords(event);
  var worldCoords = getWorldCoords(viewportCoords[0], viewportCoords[1]);

  selStartWorldCoords = [worldCoords[0],worldCoords[2]];
  
  isCamMovingLeft = (mouseX < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingRight = (mouseX > CANVAS_WIDTH - CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingUp = (mouseY < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingDown = (mouseY > CANVAS_HEIGHT - CAM_MOVE_BUFFER_SIZE) ? true : false;
  
  if(isCamMovingLeft || isCamMovingRight || isCamMovingUp || isCamMovingDown) {
    nosel = true;
  }
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
    test.yaw(delta / 200);
  }

  else {
    if (keysDown.KEY_Y) {
      cam.yaw(delta * ZOOM_SENSITIVITY / 100);
    } else {

      // towards user
      if (-delta * ZOOM_SENSITIVITY < 0) {
        if(cam.goFarther(-1 * -delta * ZOOM_SENSITIVITY)) {
          if(c3dl.getAngleBetweenVectors(cam.getUp(), [0,1,0]) < 90){
            cam.pitch(0.15);
          }
        }
      }

      // towards screen
      else {
        if(cam.goCloser(-delta * ZOOM_SENSITIVITY))
        {
          if(c3dl.getAngleBetweenVectors(cam.getUp(), [0,1,0]) > 20){
            cam.pitch(-0.15);
           // c3dl.debug.logInfo(cam.getPosition());
          }
        }
      }
    }
  }
}

/*
*/
function onKeyDown(event) {

  switch(event.keyCode) {  
    // Allow the user to cancel creating a building
    case KEY_ESC:   cancelCreateObject();break;

    // return the user home with default camera orientation
    case KEY_H:     setDefaultCamView();break;

    // Allow cheating for debugging purposes  
    case KEY_M:     usersMoney += 500;break;
    case KEY_Y:     keysDown.KEY_Y = true;break;

    case KEY_UP:    keysDown.KEY_UP = true;break;
    case KEY_DOWN:  keysDown.KEY_DOWN = true;break;
    case KEY_RIGHT: keysDown.KEY_RIGHT = true;break;
    case KEY_LEFT:  keysDown.KEY_LEFT = true;break;
    default:break;
  }
}

/*
*/
function onKeyUp(event) {

  switch(event.keyCode) {
    case KEY_Y:     keysDown.KEY_Y = false;break;
    case KEY_UP:    keysDown.KEY_UP = false;break;
    case KEY_DOWN:  keysDown.KEY_DOWN = false;break;
    case KEY_RIGHT: keysDown.KEY_RIGHT = false;break;
    case KEY_LEFT:  keysDown.KEY_LEFT = false;break;
    default:break;
  }
}

/*
  show or hide the 'cancel building' image which allows the user to
  cancel building selection. They can also press escape to do this.
*/
function showCancelBuildingImg(show) {
  var img = document.getElementById('cancel_building');
  if(show) {
    img.src = "images/cancel_building.png";
  }
  else{
    img.src = "images/blank.png";
  }
}

/*
  User decided not to create the building
*/
function cancelCreateObject() {
  if(test) {
    scn.removeObjectFromScene(test);
    usersBuildings.pop();
    test = null;
    showCancelBuildingImg(false);
  }
}

/*
*/
function createObject(objID) {

  // don't allow creation of buildings if the user is
  // currently creating one
  if(!test && usersMoney - 500 >= 0) {
    var collada = new c3dl.Collada();
    var isValid = true;
    
    switch (objID) {
      case 0: collada.init(HOUSE_PATH);break;
      case 1: collada.init(FIREHALL_PATH);break;
      case 2: collada.init(BANK_PATH);break;
      case 3: collada.init(LUMBER_YARD_PATH);break;
      default: isValid = false;break;
    }

    if (isValid) {
      showCancelBuildingImg(true);
      test = collada;
      collada.ID = idGenerator.getNextID();
      usersBuildings.push(collada);
      scn.addObjectToScene(collada);
      creatingBuilding = true;
    }
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

/*
*/
function updateSelection(mouseX,mouseY) {
  
  var worldCoords = getWorldCoords(mouseX, mouseY);

  if (worldCoords && mouseButtonsDown.BTN1 && nosel == false) {
    
    selection.setVisible(true);
  
    var camLeft = cam.getLeft();

    // From the end of where the user is currently dragging to
    // where they first clicked.
    var toStart = [selStartWorldCoords[0] - selEndWorldCoords[0], 0, selStartWorldCoords[1] - selEndWorldCoords[1]];
    var toStartLength = c3dl.vectorLength(toStart);

    // get the camera's direction without the y value
    // The camera is looking forward and down, but 
    // we need to ignore the 'down' portion.
    var camDir = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    // Scale the vector so any vector which is long
    // will result in the correct value.
    camDir = c3dl.multiplyVector(camDir, 1000);

    //
    var startProjForward = c3dl.vectorProject(toStart, camDir);
    var startToEndLengthP = c3dl.vectorLength(startProjForward);

    // we have the length of the vector from the end to the start
    // we have the length of the vector from the origin to start
    // now we can figure out the length of the vector
    // we have the type and adjacent, now we need opp.
    var opp = Math.sqrt(toStartLength * toStartLength - startToEndLengthP * startToEndLengthP);

    var topRightX;
    var topRightY;
    var bottomLeftX;
    var bottomLeftY;

    // A vector from the start world coords to the end world coords
    //
    //
    var fromStartToEnd = [selStartWorldCoords[0] - selEndWorldCoords[0] ,0,
                        selStartWorldCoords[1] - selEndWorldCoords[1]];
    if(c3dl.vectorLength(fromStartToEnd) > 0)
    {
      var angle = c3dl.getAngleBetweenVectors(c3dl.normalizeVector(fromStartToEnd), cam.getLeft());
      
      
      var forw = c3dl.vectorCrossProduct(c3dl.multiplyVector(cam.getLeft(),-1), [0, 1, 0]);
      // the angle between the forward vector and the one from the start of
      // the selection to the end. 
      var angle2 = 
      c3dl.getAngleBetweenVectors(c3dl.normalizeVector(forw), fromStartToEnd);
      
      // if the user is dragging to the right
      if(angle < 90){
        topRightX = selStartWorldCoords[0] - (camLeft[0] * opp);
        topRightY = selStartWorldCoords[1] - (camLeft[2] * opp);

        bottomLeftX = selEndWorldCoords[0] + (camLeft[0] * opp);
        bottomLeftY = selEndWorldCoords[1] + (camLeft[2] * opp);
      } else {
        topRightX = selStartWorldCoords[0] + (camLeft[0] * opp);
        topRightY = selStartWorldCoords[1] + (camLeft[2] * opp);

        bottomLeftX = selEndWorldCoords[0] - (camLeft[0] * opp);
        bottomLeftY = selEndWorldCoords[1] - (camLeft[2] * opp);
      }

      if(angle < 90 && angle2 < 90)
      {
        selection.setDirection(BOTTOM_LEFT_TO_TOP_RIGHT);
      }
      else if(angle < 90 && angle2 > 90)
      {
        selection.setDirection(TOP_LEFT_TO_BOTTOM_RIGHT);
      }
      else if(angle > 90 && angle2 > 90)
      {
        selection.setDirection(TOP_RIGHT_TO_BOTTOM_LEFT);
      }
      else if(angle > 90 && angle2 < 90)
      {
        selection.setDirection(BOTTOM_RIGHT_TO_TOP_LEFT);
      }
      
      var lines = selection.getLines();
      lines[0].setCoordinates([selStartWorldCoords[0], SEL_HEIGHT, selStartWorldCoords[1]], 
                              [topRightX, SEL_HEIGHT, topRightY]);

      lines[1].setCoordinates([topRightX, SEL_HEIGHT, topRightY], 
                              [selEndWorldCoords[0], SEL_HEIGHT, selEndWorldCoords[1]]);

      lines[2].setCoordinates([selEndWorldCoords[0], SEL_HEIGHT, selEndWorldCoords[1]], 
                              [bottomLeftX, SEL_HEIGHT, bottomLeftY]);

      lines[3].setCoordinates([bottomLeftX, SEL_HEIGHT, bottomLeftY], 
                              [selStartWorldCoords[0], SEL_HEIGHT, selStartWorldCoords[1]]);
    }
  }
}
    

function mouseMove(event) {
  // get mouse coords relative to window
  var viewportCoords = getClickedCoords(event);
  mouseX = viewportCoords[0];
  mouseY = viewportCoords[1];

  isCamMovingLeft = (mouseX < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingRight = (mouseX > CANVAS_WIDTH - CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingUp = (mouseY < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingDown = (mouseY > CANVAS_HEIGHT - CAM_MOVE_BUFFER_SIZE) ? true : false;

  updateSelection(mouseX, mouseY);
}

/*
*/
function getWorldCoords(mmx, mmy) {

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

      selEndWorldCoords[0] = hyp * rayDir[0] + rayInitialPoint[0];
      selEndWorldCoords[1] = hyp * rayDir[2] + rayInitialPoint[2];
      return [selEndWorldCoords[0], hyp * rayDir[1], selEndWorldCoords[1]];
    }
  }
}

/*
*/
function updateDOM() {
  var house = document.getElementById('house');
  var firehall = document.getElementById('firehall');
  var lumberYard = document.getElementById('lumber_yard');
  var bank = document.getElementById('bank');

  if(usersMoney < 500) {
    house.src = "images/house/house_icon_gray.png";
    firehall.src = "images/firehall/firehall_icon_gray.png";
    lumberYard.src = "images/lumber_yard/lumber_yard_icon_gray.png";
    bank.src = "images/bank/bank_icon_gray.png";
  }
  else {
    house.src = "images/house/house_icon_up.png";
    firehall.src = "images/firehall/firehall_icon_up.png";
    lumberYard.src = "images/lumber_yard/lumber_yard_icon_up.png";
    bank.src = "images/bank/bank_icon_up.png";
  }
  
  document.getElementById('usersMoney').innerHTML = usersMoney;
}

/*
*/
function update(deltaTime) {

  // updates money, lumber and grays out building icons if
  // user does not have sufficient resources.
  updateDOM();

  updateSelection(mouseX, mouseY);
  
  if (selEndWorldCoords[0] && test) {
    test.setPosition([selEndWorldCoords[0], 0, selEndWorldCoords[1]]);
  }

  var moveAmount = CAM_MOVE_SPEED * deltaTime / 100;

  if (isCamMovingLeft && mouseButtonsDown.BTN1 || keysDown.KEY_LEFT) {
    moveCamera(SIDEWAYS, moveAmount);
  }
  else if (isCamMovingRight && mouseButtonsDown.BTN1 || keysDown.KEY_RIGHT) {
    moveCamera(SIDEWAYS, -moveAmount);
  }
  if (isCamMovingUp && mouseButtonsDown.BTN1 || keysDown.KEY_UP) {
    moveCamera(FORWARD, moveAmount); 
  }
  else if (isCamMovingDown && mouseButtonsDown.BTN1 || keysDown.KEY_DOWN) {
    moveCamera(FORWARD, -moveAmount);
  }

  // move the sun
  var pos = sun.getDirection();
  var quat = c3dl.axisAngleToQuat([0, 0, -1], deltaTime / 25000);
  var mat = c3dl.quatToMatrix(quat);
  c3dl.multiplyMatrixByVector(mat, pos, pos);
  sun.setDirection(pos);
}

/*
*/
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

          objectsHit[i].setEffect(selectedEffect);
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