// Asteroids

var MAXOBJ = 1;
var yaw = 0;
var shiftIt = false;
var laser;
var sm;
var laserTime = 0;
var psys;
var health=100;
var score=0;
var timesincelastrock=0;
var threshold=9000;
var objs;
var basevelocity=-0.055;
var basescale=0.6;
var cam;
var spot;
var canvas2d;
var radar;
var gameovemsg;
var cleaned=0;
var sepia;
var simple;
//var textured;
var timesincelasteffectchange=0;
var effects;
var curreffects;
var netyaw=0;
var pew;
c3dl.addMainCallBack(canvasMain, "mainwindow");
c3dl.addModel("asteroid2.dae");
c3dl.addModel("gameover.dae");
c3dl.addModel("skysphere.dae");

// The program main
function canvasMain(canvasName){

  pew=document.getElementById('pew');
  if(pew==null)
     pew=new Audio('pew.mp3');
  //prepare the hud
  canvas2d=document.getElementById('hud');
  radar=canvas2d.getContext('2d');
  // Create new c3dl.Scene object
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);

  // Create WebGL context
  renderer = new c3dl.WebGL();

  // Set the background to black
  scn.setBackgroundColor([0,0,0]);

  // Attach renderer to the scene
  scn.setRenderer(renderer);
  scn.init();
  
  sm = new c3dl.Collada();
  sm.init('skysphere.dae');

  var vel;
  objs = new Array();

  thing = new c3dl.Collada();
  thing.init("asteroid2.dae");
  thing.setTexture("asteroid2.png");
  thing.scale([2,2,2]);
  thing.setPosition([0,0,-70]);
  vel = c3dl.multiplyVector(c3dl.normalizeVector(thing.getPosition()),basevelocity-(Math.floor(Math.random()*3)*0.01));
  thing.setLinearVel(vel);
  objs[0] = [thing,1];
  scn.addObjectToScene(thing);

  // a sepia shader effect
  var sepia = new c3dl.Effect();
  sepia.init(c3dl.effects.SEPIA);
  sepia.setParameter("color", [1.2, 1.0, 0.8]);

  //simple solid colour effect
  simple=  solidColorEffect = new c3dl.Effect();
  simple.init(c3dl.effects.SOLID_COLOR);
  simple.setParameter("color", [0.0, 0.0, 1.0]);	

  //cartoon style effect
  cartoon = new c3dl.Effect();
  cartoon.init(c3dl.effects.CARTOON);
  cartoon.setParameter("qMap", "shades.jpg");

  effects=[c3dl.effects.STANDARD,sepia,cartoon,simple];

  rollEm(thing);
  cam = new c3dl.FreeCamera();
    
  // Place the camera.
  cam.setPosition([0, 0, 0]);

  // Point the camera.
  // Here it is pointed at the same location as
  // the thing so the thing will appear centered.
  cam.setLookAtPoint([0, 0, -1]);

  // Add the camera to the scene
  scn.setCamera(cam);
  scn.setUpdateCallback(update);
  scn.setKeyboardCallback(up,down);
  scn.setSkyModel(sm);
  // Start the scene
  scn.startScene();

  //add a star
  var sun = new c3dl.DirectionalLight();
  sun.setName('mr. sun');
  sun.setDirection([-5,-200,-1]);
  sun.setDiffuse([0.5,0.4,0.3]);
  sun.setOn(true);
  scn.addLight(sun);

  //add headlight
  spot = new c3dl.SpotLight();
  spot.setName('beam');
  spot.setDirection([0,-1,-100]);
  spot.setPosition([0,1,0]);
  spot.setCutoff(5);
  spot.setExponent(10);
  spot.setDiffuse([0.8,0.8,0.8]);
  spot.setOn(true);
  scn.addLight(spot);

  //add the 'laser'
  laser = new c3dl.Line();
  laser.setCoordinates([0,0,0],[0,0,0]);
  laser.setColors([1,0,0],[1,0,0]);
  laser.setWidth(1);
  laser.setVisible(false);
  scn.addObjectToScene(laser);

  //add the particle system
  psys = new c3dl.ParticleSystem();
  psys.setMinVelocity([-8,-8,-8]);
  psys.setMaxVelocity([8,8,8]);
  psys.setMinLifetime(0.5);
  psys.setMaxLifetime(1.6);
  psys.setMinColor([0.5,0.4,0.0,0.5]);
  psys.setMaxColor([1,0.6,0,1]);
  psys.setSrcBlend(c3dl.ONE);
  psys.setDstBlend(c3dl.ONE);
  psys.setTexture("flare.jpg");
  psys.setAcceleration([0,0,0]);
  psys.setEmitRate(0);
  psys.init(50);
  scn.addObjectToScene(psys);

  scn.setPickingCallback(handler);
}

function update(time){
  if(health > 0){
    if(laser.isVisible()){
      //alert(time);
      laserTime += time;
      if(laserTime > 200) {//if the laser has been around for more than 1 seconds
        laser.setVisible(false);
        psys.setEmitRate(0);//turn the particle system off too
      }
    }//if laser is visible
    if(yaw != 0) {
      cam.yaw(yaw*time/1000);
      netyaw=netyaw+(yaw*time/1000);
      if(netyaw > Math.PI*2){
         netyaw = netyaw - Math.PI*2;
      }
      else if (netyaw < Math.PI*2){
	netyaw=netyaw + Math.PI*2;
      }
    }
    //now move the headlight to match
    var pos = cam.getPosition();
    spot.setPosition([pos[0],pos[1],pos[2]]);
    var dir = cam.getDir();
    spot.setDirection([dir[0],dir[1],dir[2]]);
    timesincelastrock+=time;
    if(timesincelastrock > threshold){
      if(threshold > 5000)
        threshold = threshold-200;
      thing = new c3dl.Collada();
      thing.init("asteroid2.dae");
      thing.setTexture("asteroid2.png");
      thing.scale([2,2,2]);
      var x = Math.floor(Math.random() * 15) + 55;
      var z = Math.sqrt(4900 - (x*x));
      if(x%2 ==0){
        x=-1*x;
      }
      if(Math.floor(Math.random()*2)==0){
        z=-1*z;
      }	  
      thing.setPosition([x,0,z]);
      var vel = c3dl.multiplyVector(c3dl.normalizeVector(thing.getPosition()),basevelocity+(Math.floor(Math.random()*3)*0.01));
      thing.setLinearVel(vel);
      objs.push([thing,1]);
      scn.addObjectToScene(thing);
      timesincelastrock=0;
    }
    /* check if any of the rocks has hit the ship and make them disappear if they do*/
    for(var i=0;i<objs.length;i++){
      if(objs[i][1]!=-1){
        var p=objs[i][0].getPosition();
        if(c3dl.vectorLength(p) < 5){
          health=health-Math.floor(20*objs[i][1]);
          objs[i][0].setVisible(false);
          objs[i][0].setPickable(false);
          scn.removeObjectFromScene(objs[i][0]);
          objs.splice(i,1);
        }
      }
    }
  }
  else{
    if(cleaned==0){
      for(var i=0;i<objs.length;i++){
        objs[i][0].setVisible(false);
        objs[i][0].setPickable(false);
        scn.removeObjectFromScene(objs[i][0]);
      }
      objs.splice(0,objs.length);
      var pos = cam.getPosition();
      spot.setPosition([pos[0],pos[1],pos[2]]);
      var dir = cam.getDir();
      spot.setDirection([dir[0],dir[1],dir[2]]);
      var angle;
      if(netyaw<0){
        netyaw=netyaw*-1;
        angle=-1*(netyaw-Math.floor(netyaw/(Math.PI*2)));
      }
      else{
        angle=(netyaw-Math.floor(netyaw/(Math.PI*2)));
      }
      var np=c3dl.normalizeVector(dir);
      gameovermsg=new c3dl.Collada();
      gameovermsg.init("gameover.dae");
      gameovermsg.setTexture("gameover.png");
      gameovermsg.scale([0.07,0.07,0.07]);
      gameovermsg.yaw(angle);
      gameovermsg.setAngularVel([0.0005,0,0]);
      curreffects=0;
      gameovermsg.setEffect(effects[0]);
      scn.addObjectToScene(gameovermsg);  
      cleaned=1;
      gameovermsg.setPosition([40*np[0],40*np[1],40*np[2]]);    
    }
    else{
      timesincelasteffectchange+=time;
      if(timesincelasteffectchange > 7000){
        timesincelasteffectchange=0;
        curreffects=(curreffects+1)%4;
        gameovermsg.setEffect(effects[curreffects]);		
      }
    }
  }
  drawhud();
}

function handler(result){
  var buttonUsed = result.getButtonUsed();
  var objectsPicked = result.getObjects();
  if(objectsPicked != undefined){
    // a left mouse click will equal 1;
    // at present that is the only mouse event implemented
    if (buttonUsed == 1 && health > 0){
    // loop through the objects
      for(var i = 0 ; i < objectsPicked.length; i++){
        // get the object that was picked
        obj = objectsPicked[i];

        // shoot the laser at the object
        var pos1 = cam.getPosition();
        var pos2 = obj.getPosition();
        //now get a position 1 unit forward and 1 unit below the camera
        var up = cam.getUp();
        var down = normalize(up);
        down = ([down[0] * -1, down[1] * -1, down[2] * -1]);
        var forward = normalize(cam.getDir());
        var coord1 = ([pos1[0] + down[0] + forward[0],pos1[1] + down[1] + forward[1],pos1[2] + down[2] + forward[2]]);
        laser.setCoordinates([coord1[0],coord1[1],coord1[2]],[pos2[0],pos2[1],pos2[2]]);
        laser.setVisible(true);
        psys.setPosition([pos2[0],pos2[1],pos2[2]]);
        laserTime = 0; //start the laserTimer
        if(pew!=null)
	  pew.play();
        //figure out the object's index, to get scale
        var scale = -1;
        for(var q = 0; q < objs.length; q++){
          if(objs[q][1] > 0 && obj == objs[q][0]){
            var scale = objs[q][1];
            //
            //psys.setEmitRate(20 * scale);
            psys.emit(20* scale);
            if(scale > 0.5)
            {
              rollEm(obj);
              obj.scale([basescale,basescale,basescale]);//drop it to half its current size
              objs[q][1] *= basescale;
              var rand = Math.floor(Math.random() * 2) + 1;//1,2
              var pos = obj.getPosition();
              for(var r = 0; r < rand; r++){
                var pr = new Array();
                var r2 = Math.floor(Math.random() * 2);
                pr[0]=(Math.floor(Math.random() * 8)+1);
                if(r2 == 1){
                  pr[0]=pr[0]*-1;
                }
                r2 = Math.floor(Math.random() * 2);
                pr[1]=(Math.floor(Math.random() * 4)+1);
                if(r2 == 1){
                  pr[1]=pr[1]*-1;
                }
                r2 = Math.floor(Math.random() * 2);
                pr[2]=(Math.floor(Math.random() * 8) + 1);
                if(r2 == 1){
                  pr[2]=pr[2]*-1;
                }

                var thing = new c3dl.Collada();
                thing.init("asteroid2.dae");
                thing.setTexture("asteroid2.png");
                thing.setPosition([pos[0]+pr[0],pos[1] + pr[1],pos[2]+pr[2]]);
                vel = c3dl.multiplyVector(c3dl.normalizeVector(thing.getPosition()),basevelocity-(Math.floor(Math.random()*3)*0.01));
                thing.setLinearVel(vel);
                thing.scale([scale,scale,scale]);
                objs.push([thing,scale*basescale]);
                scn.addObjectToScene(thing);
                rollEm(thing);
              }//for
            }//if
            else{
              obj.setVisible(false);
              obj.setPickable(false);
              //objs[q][1]=-1;
              scn.removeObjectFromScene(obj);
              objs.splice(q,1);
            }
            q = objs.length;
            score+=10;
            scorefield=document.getElementById("score");
            scorefield.innerHTML="Score: " + score;
          }
        }
      }
    }
  }
}

function down(event){
	
  //left (A)
  if(event.keyCode == 65){
    yaw = 1;
  }
  //right (D)
  if(event.keyCode == 68){
    yaw = -1;
  }
	
	
}

function up(event){
  //left
	if(event.keyCode == 65){
		yaw = 0;
	}

/*	if(event.keyCode == 66){
		          health=health-100;
	}*/
	
	//right
	if(event.keyCode == 68){
		yaw = 0;
	}
}

//return a normalized copy of a 3D vector
function normalize(vec) {
	var len = Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]) + (vec[2] * vec[2]));
	var retval = ([vec[0]/len,vec[1]/len,vec[2]/len]);
	return retval;
}

//sets a random yaw,roll,pitch and rotation speed
function rollEm(ob) {
  ranScale = 1 - (Math.floor(Math.random()*11) / 20);
  ranScaleVector = new Array(ranScale/10,ranScale/10,ranScale/10);
  ranYaw = Math.floor(Math.random()*361) ;
  ranPitch = .5 - Math.floor(Math.random()*10) / 10 ;
  ranRoll = .5 - Math.floor(Math.random()*10) / 10 ; ;
  ranVel1 = 0.0001 + (Math.floor(Math.random()*11) * 0.00005);
  ranVel2 = 0.0001 + (Math.floor(Math.random()*11) * 0.00005);
  ranVel3 = 0.0001 + (Math.floor(Math.random()*11) * 0.00005);		

  ob.yaw(ranYaw);
  ob.pitch(ranPitch/1.5);
  ob.roll(ranRoll/1.5);
  ob.setAngularVel(new Array(ranVel1,ranVel2,ranVel3));
}

function drawhud(){
  radar.fillStyle="black";
  radar.fillRect(0,0,150,200);
  radar.fillStyle="green";
  radar.strokeStyle="green";
  drawship();
  drawrocks();
  drawhealth();
}
function drawhealth(){
  if(health <= 50)
    radar.fillStyle="yellow";
  if(health <= 30)
    radar.fillStyle="orange";
  if(health <= 15)
    radar.fillStyle="red";
  radar.fillRect(25,160,health,20);
}
function drawship(){
  var camdir=normalize(cam.getDir());
  radar.beginPath();
  radar.moveTo(75+10*camdir[0],75-(-10*camdir[2]));
  radar.lineTo(75+(4*camdir[2]),75-(4*camdir[0]));
  radar.lineTo(75+(-4*camdir[2]),75-(-4*camdir[0]));
  radar.fill();  
  radar.stroke();
  radar.closePath();
}
function drawrocks(){
  radar.beginPath();
  radar.arc(75,75,74,0,Math.PI*2,true);
  radar.stroke();
  radar.closePath();
  for(var i=0; i< objs.length;i++){
    if(objs[i][0].isVisible()){
      var rockpos=objs[i][0].getPosition();
      radar.beginPath();
      radar.moveTo(75+rockpos[0],75+rockpos[2]);
      radar.arc(75+rockpos[0],75+rockpos[2],2,0,Math.PI*2,true);
      radar.fill();
      radar.closePath();
    }
  }
}
