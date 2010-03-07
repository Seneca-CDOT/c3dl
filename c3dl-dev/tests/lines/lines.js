/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// Global variables
var cam;
var scn;
var lineList;
var startColor = [0.3,0,0];
var width = 1;
var maxWidth;

c3dl.addMainCallBack(canvasMain, "lines");

// the function that will be called by the web page. canvasName is the name
// of the canvas where the scene will show.
function canvasMain(canvasName)
{
  // create a new Scene object
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  scn.setRenderer(renderer);
  scn.init();

  lineList = new Array();

  for(var i = 0; i < 20; i++)
  {
    var l = new c3dl.Line();
    l.setCoordinates([i/2,0,0],[i/2,0,20]);
    lineList.push(l);
    maxWidth = renderer.getMaxLineWidth();
    scn.addObjectToScene(l);
  }

  // default ambient light is full, so turn it all off to 
  // control color with spotlight.
  scn.setAmbientLight([0,0,0]);

  // create a camera
  cam = new c3dl.FreeCamera();
  cam.setPosition([40,40,40]);
  cam.setLookAtPoint([0,0,0]);

  scn.setCamera(cam);
  scn.setUpdateCallback(update);
  scn.setKeyboardCallback(up,down);
  scn.startScene();
}

function update(t)
{
	if( t < 100)
	{
		if( lineList.length > 0)
		{
			for(var i = 0; i < lineList.length; i++)
			{
				var oldCoords = lineList[i].getCoordinates();

				s = Math.sin(oldCoords[0])/6;
				
				oldCoords[0] += t/100;
				oldCoords[1] += s;
				
				oldCoords[3] += t/100;
				oldCoords[4] += s;

				lineList[i].setCoordinates([oldCoords[0],oldCoords[1],oldCoords[2] ],  [oldCoords[3],oldCoords[4],oldCoords[5]] );
				
				var oldCols = lineList[i].getColors();

				var col = [startColor[0],oldCoords[0]/40,startColor[2]];
				var col2 = [oldCoords[1],oldCoords[0]/40,1];
				
				lineList[i].setColors(col, col2);

				// reset line's position so it goes back into view
				if(oldCoords[0] > 50)
				{
					lineList[i].setCoordinates([0,0,0],  [0,0,20] );
					lineList[i].setColors(startColor , startColor );
				}
			}
		}
	}
}

function up(event)
{
  // V change visibility
  if(event.keyCode == 86) {
    for(var i = 0; i < lineList.length; i++)
    {
      lineList[i].setVisible(!lineList[i].isVisible());
    }
  }

  // Z decrease width
  if(event.keyCode == 90) {
    if( width > 0) {
      width--;
    }

    for(var i = 0; i < lineList.length; i++) {
      lineList[i].setWidth(width);
    }
  }

  // X increase width
  if(event.keyCode == 88) {
    if( width < maxWidth)
    {
      width++;
    }

    for(var i = 0; i < lineList.length; i++) {
      lineList[i].setWidth(width);
    }
  }	

  // D delete one line
  if(event.keyCode == 68) {
    // get the last element of the linelist
    var line = lineList[lineList.length-1];

    lineList.splice( lineList.length-1, 1);

    if(line){
      scn.removeObjectFromScene(line);
    }
  }

  // C see all lines
  if(event.keyCode == 67) {
    for(var i in lineList)
    {
      lineList[i].setVisible(true);
    }
  }

  // S toggle visibility of random lines
  if(event.keyCode == 83) {
    for (var i in lineList) {
      var r =Math.ceil(Math.random()*100);
      lineList[i].setVisible(r%2);
    }
  }
}
