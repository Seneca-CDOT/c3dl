/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
// model paths
const FIREHALL_PATH = "models/firehall/firehall.dae";
const PLANE = "models/plane/planeTextured.dae";
const LUMBER_PATH = "models/lumberyard/lumber_yard.dae";
const BANK_PATH = "models/bank/bank.dae";
const HOME_PATH = "models/house/house.dae";
const PERSON_PATH = "models/people/person.dae";

c3dl.addModel(FIREHALL_PATH);
c3dl.addModel(LUMBER_PATH);
c3dl.addModel(PLANE);
c3dl.addModel(BANK_PATH);
c3dl.addModel(HOME_PATH);
c3dl.addModel(PERSON_PATH);

c3dl.addMainCallBack(canvasMain, 'Seneca Island');

//game constants
const makeMoney       = 15;
const makePeople      = 30;
var makePeopleTime    = 0;
var movePeopleTime    = 0;
const mvmntVelocity   = 0.5;
const buildRate       = 0;//not being used
const night           = 600;
const CANVAS_WIDTH    = 650;
const CANVAS_HEIGHT   = 500;
const numOfTiles      = 15;
const xOffset         = -(numOfTiles/2*10);
const zOffset         = -(numOfTiles/2*10);
const radius          = 3*10; //used for seeing which buildings are close
// How many lines make up the circle around the
// buildings. The higher the value, the more lines.
const OUTLINE_DETAIL  = 7;
var boundaryLine      = null;
var underAttack       = false;
var usersBuildings    = new Array();
var usersPeople       = new Array();
var cash              = 100;
var currentlyBuilding = false;
var newBuilding       = null;
var peopleSelected    = new Array();
var buildingSelected  = new Array();
var movePeopleTo      = null;
//moving the camera
var isCamMovingLeft  = false;
var isCamMovingRight = false;
var isCamMovingUp    = false;
var isCamMovingDown  = false;

const CAM_MOVE_SPEED = 2;
const CAM_MOVE_BUFFER_SIZE = 20;
//used by the mouse wheel event
const ZOOM_SENSITIVITY = 1;

// keyboard stuff
var keyD        = false;
var mouseIsDown = false;
var selStartXWorldCoords = 0
var selStartYWorldCoords = 0;
var selEndXWorldCoords   = 0;
var selEndYWorldCoords   = 0;

//id generator for people
var idGenerator = (function IDGen() {
  var id = 0;

  return {
    getNextID: function () {
			id ++;
      return "P"+id;
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

function canvasMain(canvasName)
{
	scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();
  scn.setRenderer(renderer);
  scn.init();

  scn.setAmbientLight([.7,.7,.7]);
	var earth = null;
	var x = 0 + xOffset , 
	    z = 0 + zOffset;
  var k=1;    
  for(var i=0;i<numOfTiles;i++){
    for(var j=0;j<numOfTiles;j++){
      earth = new c3dl.Collada();
      earth.init(PLANE);
      earth.setPosition([xOffset+(i*10),0,zOffset+(j*10)]);
      //set the id for later use during picking
      earth.id = k++;
      scn.addObjectToScene(earth);
    }
  }
	
	//day light
	light = new c3dl.DirectionalLight();
  light.setDiffuse([1,1,1]);
  light.setDirection([0,-1,0]);
  light.setOn(true);
  scn.addLight(light);
	
	cam = new c3dl.OrbitCamera();
	cam.setFarthestDistance(200);
	cam.setClosestDistance(20);
	cam.setDistance(100);
  cam.yaw(Math.PI);

  cam.pitch(1);
  
	scn.setCamera(cam);
  scn.startScene();
  scn.setKeyboardCallback(onKeyUp, onKeyDown);
	scn.setMouseCallback(mouseUp, mouseDown, mouseMove, mouseWheel);
  scn.setUpdateCallback(update);
	scn.setPickingCallback(picking);

}


function update(deltaTime){
	
	var s = CAM_MOVE_SPEED * deltaTime / 100;
	
	//generate person
	makePeopleTime += deltaTime/1000;
	if(makePeopleTime >= makePeople)
	{
		var collada = new c3dl.Collada();
		collada.init(PERSON_PATH);
		collada.id = idGenerator.getNextID();
		collada.setPosition([xOffset+10,0.01,zOffset+ (Math.random()*100)]);
		scn.addObjectToScene(collada);
		usersPeople.push(collada);
		makePeopleTime = 0;
	}
	movePeopleTime += deltaTime/1000;
	//check to see if people reached their destination
	if(movePeopleTo != null)
	{
		//missing-- if people went into house take them out of the 
		//usersPeople array.
		for(var k=0; k< peopleSelected.length; k++)
		{
			var diff = c3dl.subtractVectors(movePeopleTo,peopleSelected[k].getPosition());
			if (c3dl.vectorLength(diff) <= 5)
			{
				peopleSelected[k].setEffect(c3dl.effects.STANDARD);
				peopleSelected[k].setLinearVel([0,0,0]);
				peopleSelected.pop(peopleSelected[k]);
			}
		}
		if(peopleSelected.length == 0)
		{
			movePeopleTo = null;
		}
	}
	if(movePeopleTo !=null)
	{
			for(var k=0; k< peopleSelected.length; k++)
			{
				var diff = c3dl.subtractVectors(movePeopleTo,peopleSelected[k].getPosition());
				var vel = c3dl.multiplyVector(c3dl.normalizeVector(diff),mvmntVelocity);
			//	if( vel != 0)
			//	{
					peopleSelected[k].setLinearVel(vel);
				//}
			}
			
			movePeopleTime = 0;
	}
	if (selEndXWorldCoords && newBuilding) {
    if(newBuilding.isPlaced==false){
		//if the user is currently Building update the colladas position
      newBuilding.setColladaPosition([selEndXWorldCoords, 0.01, selEndYWorldCoords]);
      
    }
  }
	
  if (isCamMovingLeft && mouseIsDown) {
    var dir = c3dl.multiplyVector(cam.getLeft(), s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  } else if (isCamMovingRight && mouseIsDown) {
    var dir = c3dl.multiplyVector(cam.getLeft(), -s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  }

  if (isCamMovingUp && mouseIsDown) {
    var dir = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    dir = c3dl.multiplyVector(dir, s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  } else if (isCamMovingDown && mouseIsDown) {
    var dir = c3dl.vectorCrossProduct(cam.getLeft(), [0, 1, 0]);
    dir = c3dl.multiplyVector(dir, -s);
    cam.setOrbitPoint(c3dl.addVectors(cam.getOrbitPoint(), dir));
  }
  printStatus();

 }
//the user clicks on something
function picking(pickingObj) {

	var id;
	var j;
	var k;
	var selected;
	//get a list of all of the objects that were hit
	var objectsHit = pickingObj.getObjects();
		
  //if the player is not building a structure
	if (currentlyBuilding == false) {
    var centerOnObj = false;
		//if the user hit only one collada object
		if (objectsHit.length == 1 ) {
			//if it was the ground, most likely always grass
			id = objectsHit[0].id;
			alert("hit grass pos:" + objectsHit[0].getPosition());
			if(id >=1 && id <=numOfTiles)
			{
				//get rid of firehall and bank parimeter
				if(boundaryLine){
					boundaryLine.setVisible(false);
				}
				//**********IF PPL WERE SELECTED MOVE THEM
				if(peopleSelected.length >0)
				{
					movePeopleTo = objectsHit[0].getPosition();
				}
				//**********If building were selected unselect them
				if (buildingSelected.length >0) {
					for(var i=0; i<buildingSelected.length; i++)
					{
						buildingSelected[i].setBuildingEffect(c3dl.effects.STANDARD);;
						buildingSelected[i].setSelection(false);
					}
					buildingSelected = new Array();
				}			
			}
		}
		else
		{
			for (var i in objectsHit) {
        id = objectsHit[i].id.toString();
				//list of objects were selected, we don't care about the ground 
				//ground will always get selected because it is underneath
				if(id.charAt(0)=="B")
				{
					//get the building that is selected
					for(j =0; j< usersBuildings.length; j++)
					{
						if(usersBuildings[j].getColladaID() == id)
						{
							if(usersBuildings[j].getSelection() == false)
							{
								//reason for selection: rebuild, extinguish, put people, get info
								//firehalls have to be selected twice in order to extinguish themselves
								//lumber mills have to be selected twice in order to repair themselves 
								if(usersBuildings[j].burningCheck() == true && usersBuildings[j].getType() != "Fire Station")
								{
									selected = false;
									//see if a fire hall was selected
									for(k =0; k< buildingSelected.length; k++)
									{
										if(buildingSelected[k].getType() == "Fire Station")
										{
											//is it close enough, is it busy?, extinguish
											var s = c3dl.subtractVectors(
											buildingSelected[k].getColladaPosition(), usersBuildings[j].getColladaPosition());
											if (c3dl.vectorLength(s) < radius) {
												if(buildingSelected[k].repairingCheck() == false)
												{
													buildingSelected[k].setRepairing(true);
													usersBuildings[j].setIsBeingRepaired(true);
													selected = true;
													break;
												}
											}
										}
									}
									if(selected == false){
										document.getElementById("info").innerHTML = "<font color='red'>Cannot extinguish. You must first select a Fire Station that is in range and not busy.</font>";
									}
								}
								else if(usersBuildings[j].getHealth() < usersBuildings[j].getMaxHealth() && usersBuildings[j].getType() != "Lumber Mill")
								{
									selected = false;
									//see if a lumber mill was selected
									for(k =0; k< buildingSelected.length; k++)
									{
										if(buildingSelected[k].getType() == "Lumber Mill")
										{
											//is it close enough, is it busy?, extinguish
											var s = c3dl.subtractVectors(
											buildingSelected[k].getColladaPosition(), usersBuildings[j].getColladaPosition());
											if (c3dl.vectorLength(s) < radius) {
												if(buildingSelected[k].repairingCheck() == false)
												{
													buildingSelected[k].setRepairing(true);
													usersBuildings[j].setIsBeingRepaired(true);
													selected = true;
													break;
												}
											}
										}
									}
									if(selected == false){
										document.getElementById("info").innerHTML = "<font color='red'>Cannot repair. You must first select a Lumber Mill that is in range and not busy.</font>";
									}
								}
								else if(peopleSelected.length >0)
								{
									if(usersBuildings[j].getType() == "Home")
									{
										if(usersBuildings[j].burningCheck() == false && usersBuildings[j].isBeingRepairedCheck() == false)
										{
											//*****************move people towards home
											movePeopleTo = usersBuildings[j].getColladaPosition();
										}
										else{
											document.getElementById("info").innerHTML = "<font color='red'>People can only go into non-burning homes. Hit the ground to unselect people.</font>";										
										}
									}
									else
									{
										document.getElementById("info").innerHTML = "<font color='red'>People can only go into homes.</font>";
									}
								}
								else
								{								
									for(k =0; k< buildingSelected.length; k++)
									{
										buildingSelected[k].setBuildingEffect(c3dl.effects.STANDARD);
										buildingSelected[k].setSelection(false);
									}
									buildingSelected = new Array();
									usersBuildings[j].setColorFilter([0.3, 0.6, 0.9]);
									usersBuildings[j].setSelection(true);
									buildingSelected.push(usersBuildings[j]);
									if(usersBuildings[j].getType() != "Home")
									{
										//get rid of any other boundaries
										if(boundaryLine){
											boundaryLine.setVisible(false);
										}
										//make the boundary line
										boundaryLine = new outline(OUTLINE_DETAIL,[0,0,1],radius);
										boundaryLine.setVisible(false);
										boundaryLine.setPosition(usersBuildings[j].getColladaPosition());
										boundaryLine.setVisible(true);
										alert(usersBuildings[j].getColladaPosition());
									}
									else{
										if(boundaryLine)
										{
											boundaryLine.setVisible(false);
										}
									}
									document.getElementById("info").innerHTML = "<font color='red'>Health: "+usersBuildings[j].getHealth()+" Occupants: "+usersBuildings[j].getOccupants()+" </font>";
								}
							}
							else{
								//already been selected
								//extinguish if it is a fire hall
								//repair if it is a lumber mill
								//center camera (doubble click)
								if(usersBuildings[j].burningCheck() == true && usersBuildings[j].getType() == "Fire Station")
								{
									if(usersBuildings[j].repairingCheck() == false)
									{
										usersBuildings[j].setRepairing(true);
										usersBuildings[j].setIsBeingRepaired(true);
									}
									else{
										document.getElementById("info").innerHTML = "<font color='red'>This fire station is already in use.</font>";
									}
								}
								else if(usersBuildings[j].getHealth() < usersBuildings[j].getMaxHealth() && usersBuildings[j].getType() == "Lumber Mill")
								{
									if(usersBuildings[j].repairingCheck() == false)
									{
										usersBuildings[j].setRepairing(true);
										usersBuildings[j].setIsBeingRepaired(true);
									}
									else{
										document.getElementById("info").innerHTML = "<font color='red'>This lumber mill is already repairing another building.</font>";
									}
								}
								else{
								alert("centere");
									cam.setOrbitPoint(usersBuildings[j].getColladaPosition());
								}
							}
						}
					}
				}
				//person was selected
				if(id.charAt(0)=="P")
				{
					peopleSelected.push(objectsHit[i]);
					var material = new c3dl.Effect();
					material.init(c3dl.effects.SEPIA);
					material.setParameter("color", [0.9, 0.9, 0.3]);
					objectsHit[i].setEffect(material);
					//id = id.substr(1); //get the rest of the id
				}
      }
   	}
  }
	//use this opportunity to update the buildings id
	//because the picture of the building is on the cursor, the user might select it
	//need to loop through selection in order to get the grass 
	else{
		for (var i in objectsHit) {
      id = objectsHit[i].id;
			//if it was the ground
			if(id >=1 && id <=numOfTiles*numOfTiles)
			{ 				
				id = "B" + id;
				newBuilding.setColladaID(id);
        pos=objectsHit[i].getPosition();
        pos[1]=pos[1]+0.01;
				newBuilding.setPlacement(pos);

			}
		}
	}
}
function createObject(objID) {
  var collada = new c3dl.Collada();

  switch (objID) {
  case 0:
	  newBuilding = new Building(10, 100, FIREHALL_PATH,"Fire Station", 0,50);
    newBuilding.setCollada();
    printBuildingCost(newBuilding);
    break;
  case 1:
    newBuilding = new Building(0, 100, LUMBER_PATH,"Lumber Mill", 10,100);
		newBuilding.setCollada();
    printBuildingCost(newBuilding);
    break;
	case 2:
    newBuilding = new Building(5, 50, HOME_PATH,"Home", 0,50);
		newBuilding.setCollada();
    printBuildingCost(newBuilding);
    break;
	case 3:
    newBuilding = new Building(0, 80, BANK_PATH,"Bank", 20,200);
		newBuilding.setCollada();
    printBuildingCost(newBuilding);
    break;
  default:
    break;
  }

  if (newBuilding.collada) {
		currentlyBuilding = true;
    //usersBuildings.push(newBuilding); done in mouse up
    scn.addObjectToScene(newBuilding.getCollada()); 
  }
}
//if the user presses the "Y" key set the variable to false
//if the user presses the "ESC" key, delete the new building
function onKeyDown(event) {
	if (event.keyCode == 89) {
    keyD = true;
  }
	if (event.keyCode == 27){
		if(currentlyBuilding == true){
			if(newBuilding != null)
			{
				scn.removeObjectFromScene(newBuilding.getCollada());
				delete newBuilding;
        document.getElementById("message").innerHTML="";
      }
		}
	}
}
//if the user lets go of "Y" key set the variable to false
function onKeyUp(event) {
  if (event.keyCode == 89) {
    keyD = false;
  }
}
//using the mouseWheel the user is able to zoom in and out of the scene
function mouseWheel(event){
  var delta = 0;    

  // Chromium
  if(event.wheelDelta) {
    delta = -event.wheelDelta/20;
  }
  // Minefield
  else if(event.detail) {
    delta = event.detail * 4;
  }
	
	//if the user is pressing down the "Y" key the camera spins in a circular motion
	if(keyD)
  {
    cam.yaw(delta*ZOOM_SENSITIVITY/100);
  }
  else
  {
    // towards user
    if(-delta*ZOOM_SENSITIVITY < 0)
    {
      cam.goFarther(-1 * -delta*ZOOM_SENSITIVITY);
    }
    // towards screen
    else
    {
      cam.goCloser(-delta*ZOOM_SENSITIVITY);
    }
  }
}
//user releases the mouse button
function mouseUp(){
	mouseIsDown = false;
	var tooClose = false;

  if(currentlyBuilding == true)
	{
		if (usersBuildings.length > 0) {
			for (var i = 0; i < usersBuildings.length; i++) {
				if (newBuilding === usersBuildings[i]) {
					continue;
				}
				if (newBuilding.getCollada() != null) {
					var s = c3dl.subtractVectors(
					newBuilding.getColladaPosition(), usersBuildings[i].getColladaPosition());

					if (c3dl.vectorLength(s) < 10) {
						tooClose = true;
						//c3dl.debug.logInfo('too close to adjacent building!');
						break;
					}
				}
			}
		}

		if (tooClose === false) {
		 // var o = new outline(OUTLINE_DETAIL, [0,0,1], 8);
			//o.setPosition(test.getPosition());
			if(newBuilding.getColladaPosition())
			{
				//if we are building a bank, let nearby buildings know
				if(newBuilding.getType() == "Bank")
				{
					for (var i = 0; i < usersBuildings.length; i++) {
						if (usersBuildings[i].getType() == "Farm" || usersBuildings[i].getType() == "Home") {
							var s = c3dl.subtractVectors(
							newBuilding.getColladaPosition(), usersBuildings[i].getColladaPosition());

							if (c3dl.vectorLength(s) < radius) {
								usersBuildings[i].addBank();
							}
						}
					}	
				}
				//if you are building a home figure out how many banks are nearby
				else if(newBuilding.getType() == "Home")
				{
					for (var i = 0; i < usersBuildings.length; i++) {
						if (usersBuildings[i].getType() == "Bank") {
							var s = c3dl.subtractVectors(
							newBuilding.getColladaPosition(), usersBuildings[i].getColladaPosition());

							if (c3dl.vectorLength(s) < radius) {
								newBuilding.addBank();
							}
						}
					}	
				}
				usersBuildings.push(newBuilding); //otherwise empty array elementss
				newBuilding = null;
				currentlyBuilding = false;
			}
		}
  }

  //selection.setVisible(false);
}
//user presses the mouse button
function mouseDown(event){
	mouseIsDown = true;

  var viewportCoords = getClickedCoords(event);
  var worldCoords = getWorldCoords(viewportCoords[0], viewportCoords[1]);

  selStartXWorldCoords = worldCoords[0];
  selStartYWorldCoords = worldCoords[2];
  
  topLeft = [worldCoords[0],0,worldCoords[2]];
}

//user moves the mouse
function mouseMove(event){
 // get mouse coords relative to window
  var viewportCoords = getClickedCoords(event);
  var mmx = viewportCoords[0];
  var mmy = viewportCoords[1];

  isCamMovingLeft = (mmx < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingRight = (mmx > CANVAS_WIDTH - CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingUp = (mmy < CAM_MOVE_BUFFER_SIZE) ? true : false;
  isCamMovingDown = (mmy > CANVAS_HEIGHT - CAM_MOVE_BUFFER_SIZE) ? true : false;


  var worldCoords = getWorldCoords(mmx, mmy);

  if (worldCoords) {
    selEndXWorldCoords = worldCoords[0];
    my = worldCoords[1];
    selEndYWorldCoords = worldCoords[2];
  }
}
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
//Returns the viewport coordinates where the user clicked
function getClickedCoords( event ){
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
// get mouse coords relative to window
function getWorldCoords( mmx, mmy ) {
  
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

      selEndXWorldCoords = hyp * rayDir[0] + rayInitialPoint[0];
      my = hyp * rayDir[1];
      selEndYWorldCoords = hyp * rayDir[2] + rayInitialPoint[2];
      return [selEndXWorldCoords, my, selEndYWorldCoords];
    }
  }
}
function printStatus(){
  document.getElementById("status").innerHTML = "<p>Gold: "+ cash + "<p>" + "<p>";
}

function printBuildingCost(building){
  document.getElementById("message").innerHTML = "<p>Building: "+ building.type + 
                                                 "<p>Cost: " + building.cost;
}