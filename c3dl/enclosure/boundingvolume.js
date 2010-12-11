
c3dl.BoundingVolume = function () {
  this.boundingSphere = new c3dl.BoundingSphere();
  this.aabb = new c3dl.AABB();
  this.obb = new c3dl.OBB();
  //x
  this.length = 0;
  //y
  this.height = 0;
  //z
  this.width = 0;
  this.maxMins= [];
  this.centerPosition = [];
  this.position = new C3DL_FLOAT_ARRAY([0,0,0]);
  this.axis=[3];
  this.axis[0]= new C3DL_FLOAT_ARRAY([1,0,0]);
  this.axis[1]= new C3DL_FLOAT_ARRAY([0,1,0]);
  this.axis[2]= new C3DL_FLOAT_ARRAY([0,0,1]);
  this.centered = false;
  this.scaleVec = [1,1,1];
  this.vertices = null;
  this.init = function (vertices) {
    this.vertices = new C3DL_FLOAT_ARRAY(vertices);
   	var lengthVerts = new C3DL_FLOAT_ARRAY(vertices.length/3), heightVerts= new C3DL_FLOAT_ARRAY(vertices.length/3), widthVerts= new C3DL_FLOAT_ARRAY(vertices.length/3);
	  var j = 0;
    
    for (var i = 0, len = vertices.length/3; i < len; i++) {
      lengthVerts[i] = vertices[j];
      heightVerts[i] = vertices[j+1];
      widthVerts[i]  = vertices[j+2];
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
    
    this.boundingSphere.init(this.vertices,this.centerPosition);  
    this.aabb.init(this.maxMins);
    this.obb.init(this.maxMins); 
    
    this.originalLength = this.length = this.maxMins[0]-this.maxMins[1];
    this.originalHeight = this.height = this.maxMins[2]-this.maxMins[3];
    this.originalWidth = this.width = this.maxMins[4]-this.maxMins[5];
  }
  
  this.setPosition = function (position) {
    this.position[0] = position[0];
    this.position[1] = position[1];
    this.position[2] = position[2];
    this.obb.set(this.getTransform()); 
  }
  
  this.scale = function (scaleVec) {
    this.length = this.length * scaleVec[0];
    this.height = this.height * scaleVec[1];
    this.width = this.width * scaleVec[2];
    this.scaleVec[0] = this.scaleVec[0] * scaleVec[0]; 
	  this.scaleVec[1] = this.scaleVec[1] * scaleVec[1]; 
    this.scaleVec[2] = this.scaleVec[2] * scaleVec[2];
    this.boundingSphere.set(scaleVec);  
    this.obb.set(this.getTransform()); 
    this.aabb.set(this.obb.boxVerts); 
  }
  
  this.rotateOnAxis = function (axisVec, angle) {
    var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
    // Create a proper Quaternion based on location and angle
    c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);
    // Create a rotation Matrix out of this quaternion
    var rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);
    // Apply changes to the remaining vectors
    for (var i = 0; i <3; i++) {
      this.axis[i] = c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.axis[i]);
      c3dl.normalizeVector(this.axis[i]);
    }
    this.obb.set(this.getTransform()); 
    this.aabb.set(this.obb.boxVerts); 
  }
  this.set = function (pos, rotateMat, scaleVec) {
    this.position[0] = pos[0];
    this.position[1] = pos[1];
    this.position[2] = pos[2];
    this.scaleVec[0] = scaleVec[0];
    this.scaleVec[1] = scaleVec[1];
    this.scaleVec[2] = scaleVec[2];
    this.length = this.originalLength * scaleVec[0];
    this.height = this.originalHeight * scaleVec[1];
    this.width = this.originalWidth * scaleVec[2];
    this.axis[0][0]= 1;
    this.axis[0][1]= 0;
    this.axis[0][2]= 0;
    this.axis[1][0]= 0;
    this.axis[1][1]= 1;
    this.axis[1][2]= 0;
    this.axis[2][0]= 0;
    this.axis[2][1]= 0;
    this.axis[2][2]= 1;
    for (var i = 0; i <3; i++) {
      this.axis[i] = c3dl.multiplyMatrixByVector(rotateMat, this.axis[i]);
      c3dl.normalizeVector(this.axis[i]);
    }
    
    this.boundingSphere.set(scaleVec);  
    this.obb.set(this.getTransform()); 
    this.aabb.set(this.obb.boxVerts);
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
  this.getRadius = function () {
    return this.boundingSphere.radius;
  }
  this.getAxis = function () {
    return this.axis;
  }
  this.getSizeInAxis= function () {
    return [this.length/2, this.height/2,this.width/2];
  }
  this.getMaxMins= function () {
    return this.maxMins;
  }
  this.getTransform = function () {
    var mat = c3dl.makePoseMatrix(this.axis[0], this.axis[1], this.axis[2], this.position);
    var smat = c3dl.makeMatrix();
    c3dl.setMatrix(smat, this.scaleVec[0], 0, 0, 0, 0, this.scaleVec[1], 0, 0, 0, 0, 
                  this.scaleVec[2], 0, 0, 0, 0, 1);
    mat = c3dl.multiplyMatrixByMatrix(mat, smat);
    return mat;
  }
  this.getPosition = function () {
    if (this.centered) {
      return this.position;
    }
    else {
      return c3dl.multiplyMatrixByVector(this.getTransform(), this.centerPosition);
    }  
  }
  
  this.getCopy = function () {
    var copy = new c3dl.BoundingVolume();
    copy.boundingSphere = this.boundingSphere.getCopy();
    copy.aabb = this.aabb.getCopy();
    copy.obb = this.obb.getCopy();
    copy.length = this.length;
    copy.height = this.height;
    copy.width = this.width;
    copy.originalLength = this.originalLength;
    copy.originalHeight = this.originalHeight;
    copy.originalWidth = this.originalWidth;
    copy.maxMins= c3dl.copyObj(this.maxMins);
    copy.centerPosition = c3dl.copyObj(this.centerPosition);
    copy.position = c3dl.copyObj(this.position);
    copy.axis = c3dl.copyObj(this.axis);
    copy.scaleVec = c3dl.copyObj(this.scaleVec);
    copy.centered = this.centered;
    return copy;
  }
  this.center = function () {
    this.centered = true;
    this.obb.center(this.centerPosition);
    this.aabb.center(this.centerPosition);
  }
  
  this.renderSphere = function (scene) {
    scene.getRenderer().renderBoundingSphere(this,scene.getCamera().getViewMatrix());
  }
  this.renderObb = function (scene) {
    this.obb.render(scene);
  }
  this.renderAabb= function (scene) {
    this.aabb.render(scene);
  }
}



