/**
 @private
 
 class A Model is an object which has a geometric representation composed of 
 vertices, normals and uv coordinates. Models may also  have textures
 applied to them.
 */
c3dl.BoundingSphere = function () {
  // When a model is first loaded, the longestVector will be set.  Once the
  // model is scaled for example by (2,2,2), this scaled vector will be multiplied by
  // the longest vector and the radius will be recomputed.  It is not
  // sufficient to only store the radius (a scalar) value.  If the scaling
  // is uniform, the boundingSphere will always tightly enclose the model.  If
  // non-uniform scaling is applied to the model, the enclosure will not.
  // For the enclosure to do so would incur an O(n) operation everytime the 
  // a model is scaled non-uniformly.
  this.longestVector = c3dl.makeVector(0, 0, 0);
  this.originalLV = c3dl.makeVector(0, 0, 0);
  // position of the boundingSphere in world space.
  this.position = c3dl.makeVector(0, 0, 0);
  this.centerPosition = c3dl.makeVector(0, 0, 0);
  this.axis=[3];
  this.axis[0]= c3dl.makeVector(1,0,0);
  this.axis[1]= c3dl.makeVector(0,1,0);
  this.axis[2]= c3dl.makeVector(0,0,1);
  this.centered = false;
  this.scaleVec = c3dl.makeVector(1,1,1);
  this.radius = 0;
  this.maxMins = new C3DL_FLOAT_ARRAY(6)
  // This varialbe exists here to solve the problem of the Model and Bounding Sphere
  // having the same scaling.
  // The first time the BS is initialized it gets the longest vector of the object.
  // However the user may then scale the Model, we cannot scale the BS at that time
  // since the scale method is inside the primitive class, not model.  We also cannot
  // scale the BS to reflect the proper size in getBoundingSphere() since it would
  // keep incrementing the size of the BS everytime it it called.
  //
  // The hierarchy of our classes should be changed to 
  //   Actor (currently Primitive)
  //     ^
  //     |
  // VisualActor
  //     ^
  //     |
  //   Model 
  //
  // Then we could add BoundingSphere on the VisualActor and when it is scaled, the BS can be
  // also scaled.
  /**
   @private
   Initialize the object by providing a 1-dimensional array which contains
   the vertices of the object. This is O(n) since we need to find the longest
   vector as to adjust the sphere's radius.
   
   @param {Array} vertices The vertices of the visible object.  Since the array
   is 1-dimensional, the values could look similar to:<br />
   [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, .... ]<br />
   in which case values at 0,1 and 2 are x,y,z coordinates.
   */
  this.init = function (vertices) {
    // start the longest to zero, so it will be overritten probably by the first
    // vector found.
    var longestLengthFound = 0;

    // do not allocate a new vector for every iteration to prevent
    // too much allocation. So allocate outside the loop.
    var vector = c3dl.makeVector(0, 0, 0);
    var currVector;
	  lengthVerts = new C3DL_FLOAT_ARRAY(vertices.length/3), 
	  heightVerts= new C3DL_FLOAT_ARRAY(vertices.length/3), widthVerts= new C3DL_FLOAT_ARRAY(vertices.length/3);
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
	  for (var i = 0; i < vertices.length; i += 3)
    {
      // 
      vector[0] = vertices[i + 0];
      vector[1] = vertices[i + 1];
      vector[2] = vertices[i + 2];	
	    c3dl.subtractVectors(vector, this.centerPosition, vector);
      currVector = c3dl.vectorLength(vector);

      // once the longest vector is found, this becomes our radius.
      if (currVector > longestLengthFound)
      {
        longestLengthFound = currVector;
        this.longestVector = [vector[0], vector[1], vector[2]];
      }
    }
    // now that we have found the longest vector, we can assign the radius.
    // use copyVector for this
    this.originalLV[0] = this.longestVector[0];
    this.originalLV[1] = this.longestVector[1];
    this.originalLV[2] = this.longestVector[2];
    this.radius=c3dl.vectorLength(this.longestVector);
  }

  /**
   @private
   Set a new position of the bounding sphere.
   
   @param {Array} position An three element array which contains the x,y,z values
   of the new position of the bounding sphere.
   */
  this.setPosition = function (position) {
    this.position[0] = position[0];
    this.position[1] = position[1];
    this.position[2] = position[2];
  }
  
  /**
   @private
   
   Primitive will call this when it is scaled. Thus keeping the sphere bounds around
   the Model.
   
   @param {Array} scaleVec
   */
  this.scale = function (scaleVec) {
    // The object could have been scaled non-uniformly, so we have to get the component
    // which has the greatest scaling factor.  We will use that to recalculate the 
    // bounding sphere's radius.
    var largestScale = scaleVec[0] > scaleVec[1] ? scaleVec[0] : scaleVec[1];
    largestScale = largestScale > scaleVec[2] ? largestScale : scaleVec[2];
    this.scaleVec[0] = this.scaleVec[0] * largestScale;
    this.scaleVec[1] = this.scaleVec[1] * largestScale;
    this.longestVector = c3dl.multiplyVectorByVector(this.scaleVec, this.longestVector); 
    this.radius=c3dl.vectorLength(this.longestVector);
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
  /**
   @private
   Render the bounding sphere
   
   @param {c3dl.Scene} scene
   */
  this.render = function (scene) {
    scene.getRenderer().renderBoundingSphere(this,scene.getCamera().getViewMatrix());
  }
  this.set = function (pos,rotM, scaleVec) {
    this.position = [pos[0], pos[1], pos[2]];
    this.scaleVec = [scaleVec[0],scaleVec[1],scaleVec[2]]; 
    this.axis[0]= [1,0,0];
    this.axis[1]= [0,1,0];
    this.axis[2]= [0,0,1];    
    for (var i = 0; i <3; i++) {
      c3dl.multiplyMatrixByVector(rotM, this.axis[i], this.axis[i]);
    }
    this.longestVector = c3dl.multiplyVectorByVector(this.scaleVec, this.originalLV); 
    this.radius=c3dl.vectorLength(this.longestVector);
  }
  /**
   @private
   */
  this.getRadius = function () {
    return this.radius;
  }
  /**
   @private
   */
  this.getMaxMins = function () {
    return this.maxMins;
  }
  /**
   @private
   
   Get the position of the bounding sphere.
   
   @returns {Array} A three element array of the bounding spheres position.
   */
  this.getPosition = function () {
    if (this.centered) {
      return this.position;
    }
    else {
      return c3dl.multiplyMatrixByVector(this.getTransform(), this.centerPosition);
    }  
  }
  this.centerSphere = function (position) {
    this.centered = true;
  }
  this.getCopy = function () {
    var copy = new c3dl.BoundingSphere();
    copy.longestVector = c3dl.copyVector(this.longestVector);
    copy.originalLV = c3dl.copyVector(this.originalLV);
    copy.position = c3dl.copyVector(this.position);
    copy.centerPosition = c3dl.copyVector(this.centerPosition);
    copy.maxMins = c3dl.copyObj(this.maxMins);
    copy.axis = c3dl.copyObj(this.axis);
    copy.scaleVec = c3dl.copyObj(this.scaleVec);
    copy.centered = this.centered;
    return copy;
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