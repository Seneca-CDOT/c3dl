
c3dl.AABB = function () {  
  this.lineList =[];
  for (var i = 0; i <12; i++) {
    this.lineList[i] = new c3dl.Line();
    this.lineList[i].setWidth(2);
  }  
  this.maxMins= [];
  this.originalBoxVerts = [];
  this.boxVerts = [];
  //x
  this.length = 0;
  //y
  this.height = 0;
  //z
  this.width = 0;
  this.init = function (maxMins) {     
    this.maxMins[0] = maxMins[0]; 
    this.maxMins[1] = maxMins[1]; 
    this.maxMins[2] = maxMins[2]; 
    this.maxMins[3] = maxMins[3];  
    this.maxMins[4] = maxMins[4]; 
    this.maxMins[5] = maxMins[5];     

    
    //F top left 
    this.originalBoxVerts[0] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[5]);
    this.boxVerts[0] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[5]);
    //B top left 
    this.originalBoxVerts[1] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[4]);    
    this.boxVerts[1] = c3dl.makeVector(maxMins[1], maxMins[3], maxMins[4]);         
    //F top right                       
    this.originalBoxVerts[2] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[5]); 
    this.boxVerts[2] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[5]);
    //B top right    
    this.originalBoxVerts[3] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[4]);
    this.boxVerts[3] = c3dl.makeVector(maxMins[0], maxMins[3], maxMins[4]);
    //F bottom left 
    this.originalBoxVerts[4] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[5]);
    this.boxVerts[4] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[5]);
    //B bottom left
    this.originalBoxVerts[5] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[4]);
    this.boxVerts[5] = c3dl.makeVector(maxMins[1], maxMins[2], maxMins[4]);
    //F bottom right
    this.originalBoxVerts[6] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[5]); 
    this.boxVerts[6] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[5]);
    //B bottom right  
    this.originalBoxVerts[7] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[4]);
    this.boxVerts[7] = c3dl.makeVector(maxMins[0], maxMins[2], maxMins[4]);
  }
  
  this.set = function (boxVertsIn) {
    var lengthVerts= new C3DL_FLOAT_ARRAY(8), widthVerts=new C3DL_FLOAT_ARRAY(8), heightVerts=new C3DL_FLOAT_ARRAY(8);
    for (var i = 0; i < 8; i++) {
      lengthVerts[i] = boxVertsIn[i][0];
      heightVerts[i] = boxVertsIn[i][1];
      widthVerts[i] = boxVertsIn[i][2];
    }       
    this.maxMins[0] = c3dl.findMax(lengthVerts); 
    this.maxMins[1] = c3dl.findMin(lengthVerts);
    this.maxMins[2] = c3dl.findMax(heightVerts);     
    this.maxMins[3] = c3dl.findMin(heightVerts); 
    this.maxMins[4] = c3dl.findMax(widthVerts);     
    this.maxMins[5] = c3dl.findMin(widthVerts);     
    
    //F top left 
    this.boxVerts[0][0] = this.maxMins[1];
    this.boxVerts[0][1] = this.maxMins[3];
    this.boxVerts[0][2] = this.maxMins[5];
    //B top left 
    this.boxVerts[1][0] = this.maxMins[1];         
    this.boxVerts[1][1] = this.maxMins[3];   
    this.boxVerts[1][2] = this.maxMins[4];       
    //F top right                       
    this.boxVerts[2][0] = this.maxMins[0]; 
    this.boxVerts[2][1] = this.maxMins[3]; 
    this.boxVerts[2][2] = this.maxMins[5]; 
    //B top right    
    this.boxVerts[3][0] = this.maxMins[0];
    this.boxVerts[3][1] = this.maxMins[3];
    this.boxVerts[3][2] = this.maxMins[4];
    //F bottom left 
    this.boxVerts[4][0] = this.maxMins[1];
    this.boxVerts[4][1] = this.maxMins[2];
    this.boxVerts[4][2] = this.maxMins[5];
    //B bottom left
    this.boxVerts[5][0] = this.maxMins[1];
    this.boxVerts[5][1] = this.maxMins[2];  
    this.boxVerts[5][2] = this.maxMins[4];
    //F bottom right
    this.boxVerts[6][0] = this.maxMins[0]; 
    this.boxVerts[6][1] = this.maxMins[2]; 
    this.boxVerts[6][2] = this.maxMins[5]; 
    //B bottom right  
    this.boxVerts[7][0] = this.maxMins[0];
    this.boxVerts[7][1] = this.maxMins[2];
    this.boxVerts[7][2] = this.maxMins[4];
    
    this.length = this.maxMins[0]-this.maxMins[1];
    this.height = this.maxMins[2]-this.maxMins[3];
    this.width = this.maxMins[4]-this.maxMins[5];
  }
  
  //draw a box using lines
  this.render = function(scene) {
    //front of box
    //top left to top right
    this.lineList[0].setCoordinates(this.boxVerts[0],this.boxVerts[2]);
    //top left to bottom left                            
    this.lineList[1].setCoordinates(this.boxVerts[0],this.boxVerts[4]); 
    //bottom left to bottom right 
    this.lineList[2].setCoordinates(this.boxVerts[4],this.boxVerts[6]);
    //bottom right to top right
    this.lineList[3].setCoordinates(this.boxVerts[6],this.boxVerts[2]);

    //back of box
    //top left to top right
    this.lineList[4].setCoordinates(this.boxVerts[1],this.boxVerts[3]);
    //top left to bottom left                            
    this.lineList[5].setCoordinates(this.boxVerts[1],this.boxVerts[5]); 
    //bottom left to bottom right 
    this.lineList[6].setCoordinates(this.boxVerts[5],this.boxVerts[7]);
    //bottom right to top right
    this.lineList[7].setCoordinates(this.boxVerts[7],this.boxVerts[3]);
    
    //connectors
    //F top left to B top left
    this.lineList[8].setCoordinates(this.boxVerts[0],this.boxVerts[1]);
    //F top right to B top right                           
    this.lineList[9].setCoordinates(this.boxVerts[2],this.boxVerts[3]); 
    //F bottom left to B bottom left 
    this.lineList[10].setCoordinates(this.boxVerts[4],this.boxVerts[5]);
    //F bottom right to B bottom right  
    this.lineList[11].setCoordinates(this.boxVerts[6],this.boxVerts[7]);  
    scene.getRenderer().renderLines(this.lineList, scene);
  }
  
  this.getCopy = function () {
    var copy = new c3dl.AABB();
    for (var i = 0; i <8; i++) {
      copy.originalBoxVerts[i] = c3dl.copyVector(this.originalBoxVerts[i]);
      copy.boxVerts[i] = c3dl.copyVector(this.boxVerts[i]);
    }
    copy.maxMins[0] = this.maxMins[0] 
    copy.maxMins[1] = this.maxMins[1] 
    copy.maxMins[2] = this.maxMins[2] 
    copy.maxMins[3] = this.maxMins[3]  
    copy.maxMins[4] = this.maxMins[4] 
    copy.maxMins[5] = this.maxMins[5];
    return copy;
  }
  
  this.center = function (centerPosition) {
    //F top left 
    this.originalBoxVerts[0] =c3dl.makeVector(this.originalBoxVerts[0][0] - centerPosition[0] , this.originalBoxVerts[0][1] - centerPosition[1] , this.originalBoxVerts[0][2] - centerPosition[2]);
    //B top left 
    this.originalBoxVerts[1] =c3dl.makeVector(this.originalBoxVerts[1][0] - centerPosition[0] , this.originalBoxVerts[1][1] - centerPosition[1],  this.originalBoxVerts[1][2] - centerPosition[2]);                         
    //F top right                       
    this.originalBoxVerts[2] =c3dl.makeVector(this.originalBoxVerts[2][0] - centerPosition[0] , this.originalBoxVerts[2][1] - centerPosition[1],  this.originalBoxVerts[2][2] - centerPosition[2]); 
    //B top right    
    this.originalBoxVerts[3] =c3dl.makeVector(this.originalBoxVerts[3][0]  - centerPosition[0], this.originalBoxVerts[3][1] - centerPosition[1],  this.originalBoxVerts[3][2] - centerPosition[2]);
    //F bottom left 
    this.originalBoxVerts[4] =c3dl.makeVector(this.originalBoxVerts[4][0]  - centerPosition[0], this.originalBoxVerts[4][1] - centerPosition[1],  this.originalBoxVerts[4][2] - centerPosition[2]);
    //B bottom left
    this.originalBoxVerts[5] =c3dl.makeVector(this.originalBoxVerts[5][0]  - centerPosition[0], this.originalBoxVerts[5][1] - centerPosition[1],  this.originalBoxVerts[5][2] - centerPosition[2]);
    //F bottom right
    this.originalBoxVerts[6] =c3dl.makeVector(this.originalBoxVerts[6][0]  - centerPosition[0], this.originalBoxVerts[6][1] - centerPosition[1],  this.originalBoxVerts[6][2] - centerPosition[2]); 
    //B bottom right  
    this.originalBoxVerts[7] =c3dl.makeVector(this.originalBoxVerts[7][0]  - centerPosition[0], this.originalBoxVerts[7][1] - centerPosition[1] , this.originalBoxVerts[7][2] - centerPosition[2]);
  }
  this.getCorners = function () {
    return [[(this.boxVerts[0][0]).toFixed(2),(this.boxVerts[0][2]).toFixed(2)], 
            [(this.boxVerts[1][0].toFixed(2)),(this.boxVerts[1][2]).toFixed(2)],
            [(this.boxVerts[2][0]).toFixed(2),(this.boxVerts[2][2]).toFixed(2)],
            [(this.boxVerts[3][0]).toFixed(2),(this.boxVerts[3][2]).toFixed(2)]];
  }
  this.getLength = function() {
    return this.maxMins[0]-this.maxMins[1];
  }
  this.getHeight = function() {
    return this.maxMins[2]-this.maxMins[3];
  }
  this.getWidth = function() {
    return this.maxMins[4]-this.maxMins[5];
  }
}



