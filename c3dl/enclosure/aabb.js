
c3dl.AABB = function ()
{  
  this.lineList =[];
  this.maxMins= [];
  this.boxverts = [];
  this.newboxverts = [];
  this.realposition = [];
  this.position = [0,0,0];
  this.axis=[3];
  this.axis[0]= [1,0,0];
  this.axis[1]= [0,1,0];
  this.axis[2]= [0,0,1];
  this.scaleVec = [1,1,1];
  this.init = function (vertices) {
    if (vertices) {
      vertices = new C3DL_FLOAT_ARRAY(vertices);
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
     
      this.realposition[0] = (this.maxMins[0] + this.maxMins[1])/2;
      this.realposition[1] = (this.maxMins[2] + this.maxMins[3])/2;
      this.realposition[2] = (this.maxMins[4] + this.maxMins[5])/2;
      this.length=this.maxMins[0]-this.maxMins[1];
      this.height=this.maxMins[2]-this.maxMins[3];
      this.width=this.maxMins[4]-this.maxMins[5];
    }
    for (var i = 0; i <12; i++) {
      this.lineList[i] = new c3dl.Line();
      this.lineList[i].setWidth(2);
    }  
    //F top left 
    this.boxverts[0] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[5]];
    //B top left 
    this.boxverts[1] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[4]];                         
    //F top right                       
    this.boxverts[2] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[5]]; 
    //B top right    
    this.boxverts[3] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[4]];
    //F bottom left 
    this.boxverts[4] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[5]];
    //B bottom left
    this.boxverts[5] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[4]];
    //F bottom right
    this.boxverts[6] =[ this.maxMins[0], this.maxMins[2],  this.maxMins[5]]; 
    //B bottom right  
    this.boxverts[7] =[ this.maxMins[0], this.maxMins[2], this.maxMins[4]];
    this.newboxverts[0] = this.boxverts[0];
    this.newboxverts[1] = this.boxverts[1];
    this.newboxverts[2] = this.boxverts[2];
    this.newboxverts[3] = this.boxverts[3];
    this.newboxverts[4] = this.boxverts[4];
    this.newboxverts[5] = this.boxverts[5];
    this.newboxverts[6] = this.boxverts[6];
    this.newboxverts[7] = this.boxverts[7];
  }
  
  this.setPosition = function (position) {
    this.position = [position[0], position[1], position[2]];
  }
  this.scale = function (scaleVec) {
    this.scaleVec[0] = this.scaleVec[0] * scaleVec[0]; 
	  this.scaleVec[1] = this.scaleVec[1] * scaleVec[1]; 
    this.scaleVec[2] = this.scaleVec[2] * scaleVec[2];
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
  }
  
  //draw a box using lines
  this.render = function(scene) {
    for (var i = 0; i < 8; i++) {
      this.newboxverts[i] = c3dl.multiplyMatrixByVector(this.getTransform(), this.boxverts[i]);
    } 
    
    this.calcBoxVerts();
    //front of box
    //top left to top right
    this.lineList[0].setCoordinates(this.newboxverts[0],this.newboxverts[2]);
    //top left to bottom left                            
    this.lineList[1].setCoordinates(this.newboxverts[0],this.newboxverts[4]); 
    //bottom left to bottom right 
    this.lineList[2].setCoordinates(this.newboxverts[4],this.newboxverts[6]);
    //bottom right to top right
    this.lineList[3].setCoordinates(this.newboxverts[6],this.newboxverts[2]);

    //back of box
    //top left to top right
    this.lineList[4].setCoordinates(this.newboxverts[1],this.newboxverts[3]);
    //top left to bottom left                            
    this.lineList[5].setCoordinates(this.newboxverts[1],this.newboxverts[5]); 
    //bottom left to bottom right 
    this.lineList[6].setCoordinates(this.newboxverts[5],this.newboxverts[7]);
    //bottom right to top right
    this.lineList[7].setCoordinates(this.newboxverts[7],this.newboxverts[3]);
    
    //connectors
    //F top left to B top left
    this.lineList[8].setCoordinates(this.newboxverts[0],this.newboxverts[1]);
    //F top right to B top right                           
    this.lineList[9].setCoordinates(this.newboxverts[2],this.newboxverts[3]); 
    //F bottom left to B bottom left 
    this.lineList[10].setCoordinates(this.newboxverts[4],this.newboxverts[5]);
    //F bottom right to B bottom right  
    this.lineList[11].setCoordinates(this.newboxverts[6],this.newboxverts[7]);  
    scene.getRenderer().renderLines(this.lineList);
  }
  
  this.getCopy = function () {
    var copy = new c3dl.BoundingBox();
    copy.length = this.length;
    copy.height = this.height;
    copy.width = this.width;
    copy.boxverts = c3dl.copyObj(this.boxverts);
    copy.lineList = c3dl.copyObj(this.lineList);
    copy.maxMins= c3dl.copyObj(this.maxMins);
    copy.realposition = c3dl.copyObj(this.realposition);
    copy.position = c3dl.copyObj(this.position);
    return copy;
  }
  this.center = function () {
    //F top left 
    this.boxverts[0] =[ this.boxverts[0][0] - this.realposition[0] , this.boxverts[0][1] - this.realposition[1] , this.boxverts[0][2] - this.realposition[2] ];
    //B top left 
    this.boxverts[1] =[ this.boxverts[1][0] - this.realposition[0] , this.boxverts[1][1] - this.realposition[1],  this.boxverts[1][2] - this.realposition[2] ];                         
    //F top right                       
    this.boxverts[2] =[ this.boxverts[2][0] - this.realposition[0] , this.boxverts[2][1] - this.realposition[1],  this.boxverts[2][2] - this.realposition[2] ]; 
    //B top right    
    this.boxverts[3] =[ this.boxverts[3][0]  - this.realposition[0], this.boxverts[3][1] - this.realposition[1],  this.boxverts[3][2] - this.realposition[2] ];
    //F bottom left 
    this.boxverts[4] =[ this.boxverts[4][0]  - this.realposition[0], this.boxverts[4][1] - this.realposition[1],  this.boxverts[4][2] - this.realposition[2] ];
    //B bottom left
    this.boxverts[5] =[ this.boxverts[5][0]  - this.realposition[0], this.boxverts[5][1] - this.realposition[1],  this.boxverts[5][2] - this.realposition[2] ];
    //F bottom right
    this.boxverts[6] =[ this.boxverts[6][0]  - this.realposition[0], this.boxverts[6][1] - this.realposition[1],  this.boxverts[6][2] - this.realposition[2] ]; 
    //B bottom right  
    this.boxverts[7] =[ this.boxverts[7][0]  - this.realposition[0], this.boxverts[7][1] - this.realposition[1] , this.boxverts[7][2] - this.realposition[2] ];

  }
  this.getTransform = function () {
    var mat = c3dl.makePoseMatrix(this.axis[0], this.axis[1], this.axis[2], this.position);
    var smat = c3dl.makeMatrix();
    c3dl.setMatrix(smat, this.scaleVec[0], 0, 0, 0, 0, this.scaleVec[1], 0, 0, 0, 0, 
                   this.scaleVec[2], 0, 0, 0, 0, 1);
    mat = c3dl.multiplyMatrixByMatrix(mat, smat);
    return mat;
  }
  this.calcBoxVerts = function () {
    var lengthVerts= new C3DL_FLOAT_ARRAY(8), widthVerts=new C3DL_FLOAT_ARRAY(8), heightVerts=new C3DL_FLOAT_ARRAY(8);
    for (var i = 0; i < 8; i++) {
      lengthVerts[i] = this.newboxverts[i][0];
      heightVerts[i] = this.newboxverts[i][1];
      widthVerts[i] = this.newboxverts[i][2];
    }       
    this.maxMins[0] = c3dl.findMax(lengthVerts); 
    this.maxMins[1] = c3dl.findMin(lengthVerts);
    this.maxMins[2] = c3dl.findMax(heightVerts);     
    this.maxMins[3] = c3dl.findMin(heightVerts); 
    this.maxMins[4] = c3dl.findMax(widthVerts);     
    this.maxMins[5] = c3dl.findMin(widthVerts);     
    
    //F top left 
    this.newboxverts[0] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[5]];
    //B top left 
    this.newboxverts[1] =[ this.maxMins[1], this.maxMins[3],  this.maxMins[4]];                         
    //F top right                       
    this.newboxverts[2] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[5]]; 
    //B top right    
    this.newboxverts[3] =[ this.maxMins[0], this.maxMins[3],  this.maxMins[4]];
    //F bottom left 
    this.newboxverts[4] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[5]];
    //B bottom left
    this.newboxverts[5] =[ this.maxMins[1], this.maxMins[2],  this.maxMins[4]];
    //F bottom right
    this.newboxverts[6] =[ this.maxMins[0], this.maxMins[2],  this.maxMins[5]]; 
    //B bottom right  
    this.newboxverts[7] =[ this.maxMins[0], this.maxMins[2], this.maxMins[4]];
  }
}



