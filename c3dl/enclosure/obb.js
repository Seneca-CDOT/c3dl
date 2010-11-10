
c3dl.OBB = function () {
  //x
  this.length = 0;
  //y
  this.height = 0;
  //z
  this.width = 0;
  this.originalBoxVerts = [];
  this.boxVerts = [];
  this.lineList =[];
  this.maxMins= [];
  this.centerPosition = [];
  this.position = [0,0,0];
  this.axis=[3];
  this.axis[0]= [1,0,0];
  this.axis[1]= [0,1,0];
  this.axis[2]= [0,0,1];
  this.scaleVec = [1,1,1];
  this.init = function (vertices) {
    if (vertices) {
      this.vertices = new C3DL_FLOAT_ARRAY(vertices);
      var lengthVerts= new C3DL_FLOAT_ARRAY(vertices.length/3), widthVerts=new C3DL_FLOAT_ARRAY(vertices.length/3), heightVerts=new C3DL_FLOAT_ARRAY(vertices.length/3), j = 0;
      var j = 0;
      for (var i = 0; i < vertices.length/3; i++) {
        lengthVerts[i] = vertices[j];
        heightVerts[i] = vertices[j+1];
        widthVerts[i] = vertices[j+2];
        j+=3
      }    
  
      this.maxMins[0] = c3dl.findMax(lengthVerts); 
      this.maxMins[1] = c3dl.findMin(lengthVerts);
      this.maxMins[2] = c3dl.findMax(heightVerts);
      this.maxMins[3] = c3dl.findMin(heightVerts); 
      this.maxMins[4] = c3dl.findMax(widthVerts); 
      this.maxMins[5] = c3dl.findMin(widthVerts);     
     
      this.centerPosition[0] = (this.maxMins[0] + this.maxMins[1])/2;
      this.centerPosition[1] = (this.maxMins[2] + this.maxMins[3])/2;
      this.centerPosition[2] = (this.maxMins[4] + this.maxMins[5])/2;
      this.length=this.maxMins[0]-this.maxMins[1];
      this.height=this.maxMins[2]-this.maxMins[3];
      this.width=this.maxMins[4]-this.maxMins[5];
    }
    for (var i = 0; i <12; i++) {
      this.lineList[i] = new c3dl.Line();
      this.lineList[i].setWidth(2);
    }  

    //F top left 
    this.originalBoxVerts[0] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[5]];
    //B top left 
    this.originalBoxVerts[1] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[4]];                         
    //F top right                       
    this.originalBoxVerts[2] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[5]]; 
    //B top right    
    this.originalBoxVerts[3] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[4]];
    //F bottom left 
    this.originalBoxVerts[4] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[5]];
    //B bottom left
    this.originalBoxVerts[5] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[4]];
    //F bottom right
    this.originalBoxVerts[6] =[ this.maxMins[0], this.maxMins[2],  this.maxMins[5]]; 
    //B bottom right  
    this.originalBoxVerts[7] =[ this.maxMins[0], this.maxMins[2], this.maxMins[4]];
    
    this.boxVerts[0] = this.originalBoxVerts[0];
    this.boxVerts[1] = this.originalBoxVerts[1];
    this.boxVerts[2] = this.originalBoxVerts[2];
    this.boxVerts[3] = this.originalBoxVerts[3];
    this.boxVerts[4] = this.originalBoxVerts[4];
    this.boxVerts[5] = this.originalBoxVerts[5];
    this.boxVerts[6] = this.originalBoxVerts[6];
    this.boxVerts[7] = this.originalBoxVerts[7];
  }
  
  this.setPosition = function (position) {
    this.position = [position[0], position[1], position[2]];
    for (var i = 0; i < 8; i++) {
      this.boxVerts[i] = c3dl.multiplyMatrixByVector(this.getTransform(), this.originalBoxVerts[i]);
    } 
  }
  this.scale = function (scaleVec) {
    this.length = this.length * scaleVec[0];
    this.height = this.height * scaleVec[1];
    this.width = this.width * scaleVec[2];
    this.scaleVec[0] = this.scaleVec[0] * scaleVec[0]; 
	  this.scaleVec[1] = this.scaleVec[1] * scaleVec[1]; 
    this.scaleVec[2] = this.scaleVec[2] * scaleVec[2];
    for (var i = 0; i < 8; i++) {
      this.boxVerts[i] = c3dl.multiplyMatrixByVector(this.getTransform(), this.originalBoxVerts[i]);
    } 
  }
  
  this.rotateOnAxis = function (axisVec, angle) {
    var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
    // Create a proper Quaternion based on location and angle
    c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);
    // Create a rotation Matrix out of this quaternion
    var rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);
    // Apply changes to the remaining vectors
    for (var i = 0; i <3; i++) {
      c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.axis[i], this.axis[i]);
      c3dl.normalizeVector(this.axis[i]);
    }
    for (var i = 0; i < 8; i++) {
      this.boxVerts[i] = c3dl.multiplyMatrixByVector(this.getTransform(), this.originalBoxVerts[i]);
    } 
    
  }
  
  this.set = function (pos,rotM, scaleVec) {
    this.position = [pos[0], pos[1], pos[2]];
    this.scaleVec = [scaleVec[0],scaleVec[1],scaleVec[2]]; 
    this.axis[0]= [1,0,0];
    this.axis[1]= [0,1,0];
    this.axis[2]= [0,0,1];    
    for (var i = 0; i <3; i++) {
      c3dl.multiplyMatrixByVector(rotM, this.axis[i], this.axis[i]);
      c3dl.normalizeVector(this.axis[i]);
    }
    
    for (var i = 0; i < 8; i++) {
      this.boxVerts[i] = c3dl.multiplyMatrixByVector(this.getTransform(), this.originalBoxVerts[i]);
    } 
  }
  this.getHeight = function () {
    return this.height;
  }
  this.getLength = function () {
    return this.length;
  }
  this.getWidth = function () {
    return this.width;
  }
  this.getPosition = function () {
    return this.position
  }
  this.getAxis = function () {
    return this.axis;
  }
  this.getSizeInAxis= function () {
    return [this.length/2, this.height/2,this.width/2];
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
    scene.getRenderer().renderLines(this.lineList);
  }
  
  this.getCopy = function () {
    var copy = new c3dl.OBB();
    copy.length = this.length;
    copy.height = this.height;
    copy.width = this.width;
    copy.originalBoxVerts = c3dl.copyObj(this.originalBoxVerts);
    copy.lineList = c3dl.copyObj(this.lineList);
    copy.maxMins= c3dl.copyObj(this.maxMins);
    copy.centerPosition = c3dl.copyObj(this.centerPosition);
    copy.position = c3dl.copyObj(this.position);
    copy.axis = c3dl.copyObj(this.axis);
    copy.scaleVec = c3dl.copyObj(this.scaleVec);
    
    return copy;
  }
  this.center = function () {
    //F top left 
    this.originalBoxVerts[0] =[ this.originalBoxVerts[0][0] - this.centerPosition[0] , this.originalBoxVerts[0][1] - this.centerPosition[1] , this.originalBoxVerts[0][2] - this.centerPosition[2] ];
    //B top left 
    this.originalBoxVerts[1] =[ this.originalBoxVerts[1][0] - this.centerPosition[0] , this.originalBoxVerts[1][1] - this.centerPosition[1],  this.originalBoxVerts[1][2] - this.centerPosition[2] ];                         
    //F top right                       
    this.originalBoxVerts[2] =[ this.originalBoxVerts[2][0] - this.centerPosition[0] , this.originalBoxVerts[2][1] - this.centerPosition[1],  this.originalBoxVerts[2][2] - this.centerPosition[2] ]; 
    //B top right    
    this.originalBoxVerts[3] =[ this.originalBoxVerts[3][0]  - this.centerPosition[0], this.originalBoxVerts[3][1] - this.centerPosition[1],  this.originalBoxVerts[3][2] - this.centerPosition[2] ];
    //F bottom left 
    this.originalBoxVerts[4] =[ this.originalBoxVerts[4][0]  - this.centerPosition[0], this.originalBoxVerts[4][1] - this.centerPosition[1],  this.originalBoxVerts[4][2] - this.centerPosition[2] ];
    //B bottom left
    this.originalBoxVerts[5] =[ this.originalBoxVerts[5][0]  - this.centerPosition[0], this.originalBoxVerts[5][1] - this.centerPosition[1],  this.originalBoxVerts[5][2] - this.centerPosition[2] ];
    //F bottom right
    this.originalBoxVerts[6] =[ this.originalBoxVerts[6][0]  - this.centerPosition[0], this.originalBoxVerts[6][1] - this.centerPosition[1],  this.originalBoxVerts[6][2] - this.centerPosition[2] ]; 
    //B bottom right  
    this.originalBoxVerts[7] =[ this.originalBoxVerts[7][0]  - this.centerPosition[0], this.originalBoxVerts[7][1] - this.centerPosition[1] , this.originalBoxVerts[7][2] - this.centerPosition[2] ];

  }
  this.getTransform = function () {
    var mat = c3dl.makePoseMatrix(this.axis[0], this.axis[1], this.axis[2], this.position);
    var smat = c3dl.makeMatrix();
    c3dl.setMatrix(smat, this.scaleVec[0], 0, 0, 0, 0, this.scaleVec[1], 0, 0, 0, 0, 
                   this.scaleVec[2], 0, 0, 0, 0, 1);
    mat = c3dl.multiplyMatrixByMatrix(mat, smat);
    return mat;
  }
}



