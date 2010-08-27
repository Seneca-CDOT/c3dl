/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/



/**
 @class c3dl.FreeCamera A camera which can be freely moved around in a scene.
 @augments c3dl.Camera
 */
c3dl.FreeCamera = c3dl.inherit(c3dl.Camera, function ()
{
  c3dl._superc(this);
  // Delta Values for Animations
  this.linVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animation of positions
  this.angVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)
});

/**
 Get the camera's angular velocity
 
 @return {Array}
 */
c3dl.FreeCamera.prototype.getAngularVel = function ()
{
  return c3dl.copyVector(this.angVel);
}


/**
 Get the camera's linear velocity
 
 @returns {Array}
 */
c3dl.FreeCamera.prototype.getLinearVel = function ()
{
  return c3dl.copyVector(this.linVel);
}


/**
 Rotate around the Side Vector by a hard amount (No Animation).
 
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.pitch = function (angle)
{
  this.rotateOnAxis(this.left, angle);
}


/**
 Rotate around the Dir Vector by a hard amount (No Animation).
 
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.roll = function (angle)
{
  this.rotateOnAxis(this.dir, angle);
}


/**
 Rotate camera on an Axis which is centered on the position of the camera.
 
 @param {Array} axisVec
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.rotateOnAxis = function (axisVec, angle)
{
  // Create a proper Quaternion based on location and angle
  var quat = c3dl.axisAngleToQuat(axisVec, angle);

  // Create a rotation Matrix out of this quaternion
  var mat = c3dl.quatToMatrix(quat);

  // Apply changes to the remaining vectors
  c3dl.multiplyMatrixByVector(mat, this.dir, this.dir);
  c3dl.normalizeVector(this.dir);

  c3dl.multiplyMatrixByVector(mat, this.left, this.left);
  c3dl.normalizeVector(this.left);

  c3dl.multiplyMatrixByVector(mat, this.up, this.up);
  c3dl.normalizeVector(this.up);
}


/**
 Set a new Angular Veclocity that will be added to the rotation on 
 every update.
 
 @param {Array} newVec
 */
c3dl.FreeCamera.prototype.setAngularVel = function (newVec)
{
  this.angVel[0] = newVec[0];
  this.angVel[1] = newVec[1];
  this.angVel[2] = newVec[2];
}


/**
 Set a new linear velocity that will be added to the position 
 on every update.
 
 @param {Array} newVec A vector which contains the direction 
 and speed of the camera.
 */
c3dl.FreeCamera.prototype.setLinearVel = function (newVec)
{
  this.linVel[0] = newVec[0];
  this.linVel[1] = newVec[1];
  this.linVel[2] = newVec[2];
}


/**
 Set the point in space where the camera will look at 
 (No Animation).
 
 @param {Array} newVec The new point the camera will 
 look at.
 */
c3dl.FreeCamera.prototype.setLookAtPoint = function (newVec)
{
    // if the position hasn't yet been changed and they want the
    // camera to look at [0,0,0], that will create a problem.
  if (c3dl.isVectorEqual(this.pos, [0, 0, 0]) && c3dl.isVectorEqual(newVec, [0, 0, 0]))
  {
    c3dl.debug.logWarning("Cannot lookAt [0,0,0] since camera is at [0,0,0]." +
      " Move camera before calling setLookAt()");
  }
  else
  {
    // Figure out the direction of the point we are looking at.
    this.dir = c3dl.subtractVectors(newVec, this.pos);
    c3dl.normalizeVector(this.dir);
    // Adjust the Up and Left vectors accordingly
    c3dl.vectorCrossProduct([0, 1, 0], this.dir, this.left);
    c3dl.normalizeVector(this.left);
    c3dl.vectorCrossProduct(this.dir, this.left, this.up);
    c3dl.normalizeVector(this.up);
  }
}
 


/**
 Set the new location of the camera.
 
 @param {Array} newVec An absolute value of where to 
 place the camera.
 */
c3dl.FreeCamera.prototype.setPosition = function (newVec)
{
  this.pos[0] = newVec[0];
  this.pos[1] = newVec[1];
  this.pos[2] = newVec[2];
}


/**
 Set the orientation of Up (No Animation).
 
 @param {Array} newVec
 */
c3dl.FreeCamera.prototype.setUpVector = function (newVec)
{
  this.up[0] = newVec[0];
  this.up[1] = newVec[1];
  this.up[2] = newVec[2];
}


/**
 Get a string representation of this camera.
 
 @param {null|String} delimiter A string which will separate values. Typically will be 
 ","  ,  "\n" or "&lt;br /&gt;". If none is specified, "," will be used.
 
 @returns {String} a string representation of this camera.
 */
c3dl.FreeCamera.prototype.toString = function (delimiter)
{
  // make sure user passed up a string if they actually decided
  // to specify a delimiter.
  if (!delimiter || typeof(delimiter) != "string")
  {
    delimiter = ",";
  }

  // get the c3dl.Camera's toString()
  var cameraToStr = c3dl._super(this, arguments, "toString");
  var FreeCameraToStr = "c3dl.FreeCamera: " + delimiter + "angular velocity = " +
  this.getAngularVel() + delimiter + "linear velocity = " + this.getLinearVel() + delimiter;
  return cameraToStr + FreeCameraToStr;
}


/**
 @private
 
 Called automatically.
 
 Update Animation of the camera.
 
 @param {float} timeStep 
 */
c3dl.FreeCamera.prototype.update = function (timeStep)
{
  //
  if (c3dl.isVectorZero(this.linVel) && c3dl.isVectorZero(this.angVel))
  {
    return false;
  }

  if (c3dl.vectorLengthSq(this.linVel) > 0.0)
  {
    // Add a velocity to the position
    var velVec = c3dl.makeVector(this.linVel[0], this.linVel[1], this.linVel[2]);
    c3dl.multiplyVector(velVec, timeStep, velVec);

    c3dl.addVectors(this.pos, velVec, this.pos);
  }

  if (c3dl.vectorLengthSq(this.angVel) > 0.0)
  {
    // Apply some rotations to the orientation from the angular velocity
    this.pitch(this.angVel[0] * timeStep);
    this.yaw(this.angVel[1] * timeStep);
    this.roll(this.angVel[2] * timeStep);
  }
}


/**
 Rotate around the Up Vector by a hard amount (No Animation).
 
 @param {float} angle in radians.
 */
c3dl.FreeCamera.prototype.yaw = function (angle)
{
  this.rotateOnAxis(this.up, angle);
}