/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.BoundingVolume is a composite of other bounding objects.
 */
c3dl.BoundingVolume = function ()
{
  this.boundingSphere = new c3dl.BoundingSphere();
  this.aabb = new c3dl.AABB();
  this.obb = new c3dl.OBB();
  //size on x axis
  this.length = 0;
  //size on y axis
  this.height = 0;
  //size on z axis
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
  this.transMat = new C3DL_FLOAT_ARRAY(16);
  
  /**
   Initialize the various properties of the boudning volume using an array of vertices.  Called Automatically.
   
   @param {Array} vertices - An array of vertices representing the object this volume must contain.
   */
  this.init = function (vertices)
  {
    this.vertices = new C3DL_FLOAT_ARRAY(vertices);
    var lengthVerts = new C3DL_FLOAT_ARRAY(vertices.length/3), heightVerts= new C3DL_FLOAT_ARRAY(vertices.length/3), widthVerts= new C3DL_FLOAT_ARRAY(vertices.length/3);
    var j = 0;
    
    for (var i = 0, len = vertices.length/3; i < len; i++)
    {
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
  
  /**
   Move the bounding volume to a new position (no animation).
   Called automatically when moving the object it contains.

   @param {Array} position - The new position in 3D space.
   */
  this.setPosition = function (position)
  {
    this.position[0] = position[0];
    this.position[1] = position[1];
    this.position[2] = position[2];
    this.obb.set(this.getTransform()); 
    this.aabb.set(this.obb.boxVerts); 
  }
  
  /**
   Scale the bounding volume up or down based on how the object it is associated with scales
   Called automatically when scaling the object it contains.

   @param {Array} scaleVec - The three values representing how to scale the object on each axis (x,y,z)
   */
  this.scale = function (scaleVec)
  {
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
  
  /**
   Rotate this object by a specific amount (angle) around an axis (axisVec).
   No animation, called automatically when rotating the object this volume is associated with.
   
   @param {Array} axisVec - The axis around which to rotate.
   @param {Int} angle - The angle to rotate through.  Expessed in radians.
   */
  this.rotateOnAxis = function (axisVec, angle)
  {
    var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
    // Create a proper Quaternion based on location and angle
    c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);
    // Create a rotation Matrix out of this quaternion
    var rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);
    // Apply changes to the remaining vectors
    for (var i = 0; i <3; i++)
    {
      this.axis[i] = c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.axis[i]);
      c3dl.normalizeVector(this.axis[i]);
    }
    this.obb.set(this.getTransform()); 
    this.aabb.set(this.obb.boxVerts); 
  }
  
  /**
   Replace the current properties of the bounding volume with new ones.
   Called automatically.
   
   @param {Array} pos - The new position in 3D space
   @param {Array} rotateMat - The new rotation matrix
   @param {Array} scaleVec - The new scale of the volume
   */
  this.set = function (pos, rotateMat, scaleVec)
  {
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
    for (var i = 0; i <3; i++)
    {
      c3dl.multiplyMatrixByVector(rotateMat, this.axis[i], this.axis[i]);
      c3dl.normalizeVector(this.axis[i]);
    }
    this.boundingSphere.set(scaleVec);  
    this.obb.set(this.getTransform()); 
    this.aabb.set(this.obb.boxVerts);
  }
  
  /**
   Obtain the current height (y axis) of this volume
   
   @returns {Float} The current height of this volume
  */
  this.getHeight = function ()
  {
    return this.height;
  }
  
  /**
   Obtain the current length (z axis) of this volume
   
   @returns {Float} The current length of this volume
  */
  this.getLength = function ()
  {
    return this.length;
  }
  
  /**
   Obtain the current width (x axis) of this volume
   
   @returns {Float} The current width of this volume
  */
  this.getWidth = function ()
  {
    return this.width;
  }
  
  /**
   Obtain the current radius of this volume
   
   @returns {Float} The current radius of this volume
  */
  this.getRadius = function ()
  {
    return this.boundingSphere.radius;
  }
  
  /**
   Get the current orthoganal direction vectors (left, up and forward) of this volume
   
   @returns {Array} The current orthoganal direction vectors of this volume
  */
  this.getAxis = function ()
  {
    return this.axis;
  }
  
  /**
   Get the maximum distance from the centre of this object to its edge in each axis.
   
   @returns {Array} A three element array consisting of half the length, height and width of the bounding volume.
  */
  this.getSizeInAxis= function ()
  {
    return [this.length/2, this.height/2,this.width/2];
  }
  
  /**
   Retrieve the maximum and minimum values on each axis for verticies in the object this volume is associated with.

   @returns {Array} A six element array containing the maximum and minimum values on the x,y and z axes (in that order).
   */
  this.getMaxMins= function ()
  {
    return this.maxMins;
  }
  
  /**
   Retrieve the tranformation matrix for this volume.
   
   @returns {Array} The transformation matrix for this bounding volume.
   */
  this.getTransform = function ()
  {
    c3dl.mat1[0] = this.axis[0][0];
    c3dl.mat1[1] = this.axis[0][1];
    c3dl.mat1[2] = this.axis[0][2];
    c3dl.mat1[3] = 0.0;
    c3dl.mat1[4] = this.axis[1][0];
    c3dl.mat1[5] = this.axis[1][1];
    c3dl.mat1[6] = this.axis[1][2];
    c3dl.mat1[7] = 0.0;
    c3dl.mat1[8] = this.axis[2][0];
    c3dl.mat1[9] = this.axis[2][1];
    c3dl.mat1[10] = this.axis[2][2];
    c3dl.mat1[11] = 0.0;
    c3dl.mat1[12] = this.position[0];
    c3dl.mat1[13] = this.position[1];
    c3dl.mat1[14] = this.position[2];
    c3dl.mat1[15] = 1.0;
    c3dl.setMatrix(c3dl.mat2, this.scaleVec[0], 0, 0, 0, 0, this.scaleVec[1], 0, 0, 0, 0, this.scaleVec[2], 0, 0, 0, 0, 1);
    return c3dl.multiplyMatrixByMatrix(c3dl.mat1, c3dl.mat2, this.transMat); 
  }
  
  /**
   Retrieve this bounding volumes current position.
   
   @returns {Array} This bounding volume's current position.
  */
  this.getPosition = function ()
  {
    if (this.centered)
    {
      return this.position;
    }
    else
    {
      return c3dl.multiplyMatrixByVector(this.getTransform(), this.centerPosition);
    }  
  }
  
  /**
   @private
   Retrieve a duplicate of this volume.
   
   @returns {BoundingVolume} A duplicate copy of this object.
  */
  this.getCopy = function ()
  {
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
    copy.maxMins[0] = this.maxMins[0] 
    copy.maxMins[1] = this.maxMins[1] 
    copy.maxMins[2] = this.maxMins[2] 
    copy.maxMins[3] = this.maxMins[3]  
    copy.maxMins[4] = this.maxMins[4] 
    copy.maxMins[5] = this.maxMins[5];  
    copy.centerPosition = c3dl.copyVector(this.centerPosition);
    copy.position = c3dl.copyVector(this.position);
    for (var i = 0; i <3; i++)
    {
      copy.axis[i] = c3dl.copyVector(this.axis[i]);
    }
    copy.scaleVec = c3dl.copyVector(this.scaleVec);
    copy.centered = this.centered;
    return copy;
  }
  
  /**
   Re-center the object bounding box and axis aligned bounding box around the center of this volume.
   Called automatically.
   */
  this.center = function ()
  {
    this.centered = true;
    this.obb.center(this.centerPosition);
    this.aabb.center(this.centerPosition);
  }
  
  /**
   Cause the bounding sphere associated with this object ot be rendered.
   Called automatically.
   
   @param {Scene} scene - The scene currently being drawn.
  */
  this.renderSphere = function (scene)
  {
    scene.getRenderer().renderBoundingSphere(this,scene.getCamera().getViewMatrix(), scene);
  }
  
  /**
   Cause the object boundigng box associated with this object ot be rendered.
   Called automatically.
   
   @param {Scene} scene - The scene currently being drawn.
  */
  this.renderObb = function (scene)
  {
    this.obb.render(scene);
  }
  
  /**
   Cause the axis aligned bounding box associated with this object ot be rendered.
   Called automatically.
   
   @param {Scene} scene - The scene currently being drawn.
  */
  this.renderAabb= function (scene)
  {
    this.aabb.render(scene);
  }
}
