/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.OrbitCamera is a camera which is restricted to orbiting 
 a point in space.  The camera orbits the point by moving along an imaginary 
 sphere which is centered on the point.<br /><br />
 
 OrbitCamera is generally used to orbit meshes, but isn't limited to doing so 
 since any point in space can be orbitted. However, since orbitting a mesh is 
 so common, distance limits can be assigned to the camera, which prevent it from
 entering or going to far from the mesh.<br /><br />
 
 If an object is being orbitted and the object moves, the camera must be set to 
 orbit the new object's position. This can be done by calling setOrbitPoint() and
 passing in the new object's position.<br /><br />
 
 When an OrbitCamera is created, it will be have the position and orbit point 
 at [0,0,0]. It will be looking down the -Z axis and have a closest and farthest 
 distance of 0.<br /><br />
 
 If the OrbitCamera's closest distance is set to a value which is greater than its 
 current distance, the camera will be 'backed up' so it has a distance equal to the 
 closest distance.  Similarly, setting the farthest distance to a smaller value may 
 also move the camera closer to the orbit point.
 
 @augments c3dl.Camera
 */
c3dl.OrbitCamera = c3dl.inherit(c3dl.Camera, function ()
{
  c3dl._superc(this);

  // this value cannot be set to less than 0.
  this.closestDistance = 0;

  // typically larger than the closest distance, but set to 
  // 0 here since the user will likely overwrite it anyway.
  // this value will always be greater or equal to the closest
  // distance.
  this.farthestDistance = 0;

  // the point in space the camera will 'orbit'.
  this.orbitPoint = c3dl.makeVector(0, 0, 0);
});

/**
 Get the closest distance the camera can reside from the orbit point.
 
 @returns {float} The closest distance camera can reside from the orbit point.
 */
c3dl.OrbitCamera.prototype.getClosestDistance = function ()
{
  return this.closestDistance;
}


/**
 Get the distance from the camera to the orbit point.
 
 @returns {float} distance from the camera to the orbit point.
 */
c3dl.OrbitCamera.prototype.getDistance = function ()
{
  return c3dl.vectorLength(c3dl.subtractVectors(this.pos, this.orbitPoint));
}


/**
 Get the farthest ditance the camera can reside from the orbit point.
 
 @returns {float} The farthest distance the camera can reside from the orbit point.
 */
c3dl.OrbitCamera.prototype.getFarthestDistance = function ()
{
  return this.farthestDistance;
}


/**
 Get the point the camera is orbiting.
 
 @returns {Array} The point which the camera is orbiting.
 */
c3dl.OrbitCamera.prototype.getOrbitPoint = function ()
{
  return c3dl.copyVector(this.orbitPoint);
}


/**
 Move the camera 'distance' towards the orbit point relative to where
 the camera is positioned. The camera will not move if attempted to move
 closer than the closest allowed distance.
 
 @param {float} distance Must be greater than 0.
 */
c3dl.OrbitCamera.prototype.goCloser = function (distance)
{
  // A negative value for goCloser() could be allowed and would
  // mean moving farther using a positive value, but this could
  // create some confusion and is therefore not permitted.
  if (distance > 0)
  {
    // scale it
    var shiftAmt = c3dl.multiplyVector(this.dir, distance);
    var renameMe = c3dl.subtractVectors(this.pos, this.orbitPoint);

    var maxMoveCloser = c3dl.vectorLength(renameMe) - this.getClosestDistance();

    if (c3dl.vectorLength(shiftAmt) <= maxMoveCloser)
    {
      this.pos = c3dl.addVectors(this.pos, shiftAmt);
      return true;
    }
  }
  return false;
}


/**
 Move the camera 'distance' away from the orbit point relative to where
 the camera is positioned. The camera will not move if attempted to move
 farther than the farthest distance.
 
 @param {float} distance Must be greater than 0.
 */
c3dl.OrbitCamera.prototype.goFarther = function (distance)
{
  // A negative value for goFarther() could be allowed and would
  // mean moving closer using a positive value, but this could
  // create some confusion and is therefore not permitted.
  if (distance > 0)
  {
    //
    var shiftAmt = c3dl.multiplyVector(c3dl.multiplyVector(this.dir, -1), distance);
    var newpos = c3dl.addVectors(this.pos, shiftAmt);
    var distanceBetweenCamAndOP = c3dl.vectorLength(c3dl.subtractVectors(newpos, this.orbitPoint));
    if (distanceBetweenCamAndOP <= this.getFarthestDistance())
    {
      this.pos = newpos;
      return true;
    }
  }
  return false;
}


/**
 Pitch the camera about the orbit point.
 
 @param {float} angle in radians.
 */
c3dl.OrbitCamera.prototype.pitch = function (angle)
{
  if (c3dl.isVectorEqual(this.pos, this.orbitPoint))
  {
    // Create a proper Quaternion based on location and angle.
    // we will rotate about the global up axis.
    var rotMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat(this.left, angle));

    // 
    this.dir = c3dl.multiplyMatrixByVector(rotMat, this.dir);
    this.dir = c3dl.normalizeVector(this.dir);

    // update up vector
    this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    this.up = c3dl.normalizeVector(this.up);

    // left does not change.
  }
  else
  {
    // get position relative to orbit point
    this.pos = c3dl.subtractVectors(this.pos, this.orbitPoint);

    // Create a Quaternion based on left vector and angle
    var quat = c3dl.axisAngleToQuat(this.left, angle);

    // Create a rotation Matrix out of this quaternion and apply 
    // the rotation matrix to position
    var rotMat = c3dl.quatToMatrix(quat);
    var newpos = c3dl.multiplyMatrixByVector(rotMat, this.pos);
    this.pos = c3dl.addVectors(newpos, this.orbitPoint);

    // 
    this.dir = c3dl.subtractVectors(this.orbitPoint, this.pos);
    this.dir = c3dl.normalizeVector(this.dir);

    // update up vector
    this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    this.up = c3dl.normalizeVector(this.up);

    // update left
    this.left = c3dl.vectorCrossProduct(this.up, this.dir);
    this.left = c3dl.normalizeVector(this.left);
  }
}


/**
 Set the closest distance the camera can be from the orbit point.
 
 If 'distance' is greater than the current distance the camera is from
 the orbit point, the camera will be 'backed up' to the new closest
 distance.
 
 @param {float} distance Must be greater than zero and less than or 
 equal to getFarthestDistance().
 */
c3dl.OrbitCamera.prototype.setClosestDistance = function (distance)
{
  if (distance >= 0 && distance <= this.getFarthestDistance())
  {
    this.closestDistance = distance;

    // the camera may now be too close, so back it up if necessary.
    var distanceBetweenCamAndOP = this.getDistance();

    // check if the camera's position has been invalidated.
    if (distanceBetweenCamAndOP < this.getClosestDistance())
    {
      // back the camera up to the new closest distance.
      // find how much to back up the camera
      var amt = this.getClosestDistance() - distanceBetweenCamAndOP;

      // back it up
      this.goFarther(amt);
    }
  }
}


/**
 Set the camera 'distance' away from the orbit point. The distance
 must be a value between the getClosestDistance() and getFarthestDistance().
 
 @param {float} distance
 */
c3dl.OrbitCamera.prototype.setDistance = function (distance)
{
  if (distance >= this.getClosestDistance() && distance <= this.getFarthestDistance())
  {
    // place the camera at the orbit point, then goFarther
    this.pos = c3dl.copyVector(this.orbitPoint);

    this.goFarther(distance);
  }
}


/**
 Set the farthest distance the camera can move away from the orbit point.
 
 If 'distance' is less than the current distance the camera is from
 the orbit point, the camera will be pulled in to the new closest
 distance.
 
 @param {float} distance Must be less than or equal to getClosestDistance().
 */
c3dl.OrbitCamera.prototype.setFarthestDistance = function (distance)
{
  if (distance >= this.getClosestDistance())
  {
    this.farthestDistance = distance;

    // the camera may be too far from the orbit point, so bring it closer.
    var distanceBetweenCamAndOP = this.getDistance();

    // check if the camera's position has been invalidated.
    if (distanceBetweenCamAndOP > this.getFarthestDistance())
    {
      // back the camera up to the new closest distance.
      // find how much to back up the camera
      var amt = distanceBetweenCamAndOP - this.getFarthestDistance();

      // bring it closer.
      this.goCloser(amt);
    }
  }
}


/**
 Set the point which the camera will orbit and look at.
 
 The direction will remain unchanged.
 
 @param {Array} orbitPoint The new vector the camera will orbit and look at.
 */
c3dl.OrbitCamera.prototype.setOrbitPoint = function (orbitPoint)
{
  // get the distance the camera was from the orbit point.
  var orbitPointToCam = c3dl.multiplyVector(this.dir, -this.getDistance());
  this.orbitPoint[0] = orbitPoint[0];
  this.orbitPoint[1] = orbitPoint[1];
  this.orbitPoint[2] = orbitPoint[2];
  this.pos = c3dl.addVectors(this.orbitPoint, orbitPointToCam);
}
  



/**
 Yaw about the orbit point. The camera will remain looking at the
 orbit point and its position will rotate about the point parallel to
 the global up axis and intersecting with the orbit point.
 
 @param {float} angle in radians.
 */
c3dl.OrbitCamera.prototype.yaw = function (angle)
{
  if (c3dl.isVectorEqual(this.pos, this.orbitPoint))
  {
    // Create a proper Quaternion based on location and angle.
    // we will rotate about the global up axis.
    var rotMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat([0, 1, 0], angle));

    //
    this.left = c3dl.multiplyMatrixByVector(rotMat, this.left);
    this.left = c3dl.normalizeVector(this.left);

    // update up
    this.up = c3dl.multiplyMatrixByVector(rotMat, this.up);
    this.up = c3dl.normalizeVector(this.up);

    // update left, can either do a cross product or matrix-vector mult.
    this.dir = c3dl.vectorCrossProduct(this.left, this.up);
    this.dir = c3dl.normalizeVector(this.dir);
  }

  else
  {
    //
    var camPosOrbit = c3dl.subtractVectors(this.pos, this.orbitPoint);

    // Create a rotation matrix based on location and angle.
    // we will rotate about the global up axis.
    var rotMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat([0, 1, 0], angle));

    //
    var newpos = c3dl.multiplyMatrixByVector(rotMat, camPosOrbit);
    this.pos = c3dl.addVectors(newpos, this.orbitPoint);

    // update direction
    this.dir = c3dl.subtractVectors(this.orbitPoint, this.pos);
    this.dir = c3dl.normalizeVector(this.dir);

    // update up
    //
    this.up = c3dl.multiplyMatrixByVector(rotMat, this.up);
    this.up = c3dl.normalizeVector(this.up);

    // update left
    this.left = c3dl.vectorCrossProduct(this.up, this.dir);
    this.left = c3dl.normalizeVector(this.left);
  }
}


/**
 Set the camera to a new position. The position must be between the closest
 and farthest distances.
 
 @param {Array} position The new position of the camera.
 */
c3dl.OrbitCamera.prototype.setPosition = function (position)
{
  var distFromNewPosToOP = c3dl.vectorLength(c3dl.subtractVectors(this.orbitPoint, position));

  // make sure the new position of the cam is between the min 
  // and max allowed constraints.	
  if (distFromNewPosToOP >= this.getClosestDistance() && distFromNewPosToOP <= this.getFarthestDistance())
  {
    this.pos[0] = position[0];
    this.pos[1] = position[1];
    this.pos[2] = position[2];
    var camPosToOrbitPoint = c3dl.subtractVectors(this.orbitPoint, this.pos);

    // if the position was set such that the direction vector is parallel to the global
    // up axis, the cross product won't work. In that case, leave the left vector as it was.
    if (c3dl.isVectorEqual([0, 0, 0], c3dl.vectorCrossProduct(camPosToOrbitPoint, [0, 1, 0])))
    {
      // set the direction
      this.dir = c3dl.normalizeVector(camPosToOrbitPoint);
      // the left vector will be perpendicular to the global up
      // axis and direction.
      this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    }
    else
    {
      // set the direction
      this.dir = c3dl.normalizeVector(c3dl.subtractVectors(this.orbitPoint, this.pos));
      // the left vector will be perpendicular to the global up
      // axis and direction.
      this.left = c3dl.vectorCrossProduct([0, 1, 0], this.dir);
      this.up = c3dl.vectorCrossProduct(this.dir, this.left);
    }
 }
}


/**
 Get a string representation of this camera.
 
 @param {String} [delimiter=","]  A string which will separate values.
 
 @returns {String} a string representation of this camera.
 */
c3dl.OrbitCamera.prototype.toString = function (delimiter)
{
  // make sure user passed up a string if they actually decided
  // to specify a delimiter.
  if (!delimiter || typeof(delimiter) != "string")
  {
    delimiter = ",";
  }

  // get the c3dl.Camera's toString()
  var cameraToStr = c3dl._super(this, arguments, "toString");
  var OrbitCameraToStr = "c3dl.OrbitCamera: " + delimiter + "orbit point = " + this.getOrbitPoint() + delimiter + "closest distance = " + this.getClosestDistance() + delimiter + "farthest distance = " + this.getFarthestDistance();
  return cameraToStr + OrbitCameraToStr;
}


/**
 @private
 
 yaw and pitch can be given velocities later, but for now, this is
 not implemented.
 
 Update Animation of the camera.
 
 @param {float} timeStep
 */
c3dl.OrbitCamera.prototype.update = function (timeStep)
{
}