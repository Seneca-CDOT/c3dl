/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.Camera is a base class for c3dl.OrbitCamera and c3dl.FreeCamera. 
 */
c3dl.Camera = function ()
{
  // Raw Position Values
  this.left = c3dl.makeVector(1.0, 0.0, 0.0); // Camera Left vector
  this.up = c3dl.makeVector(0.0, 1.0, 0.0); // Camera Up vector
  this.dir = c3dl.makeVector(0.0, 0.0, 1.0); // The direction its looking at
  this.pos = c3dl.makeVector(0.0, 0.0, 0.0); // Camera eye position
  this.projectionTransform = null;
  this.projMatrix;
  this.viewMatrix;

  this.fieldOfView = c3dl.DEFAULT_FIELD_OF_VIEW;
  this.nearClippingPlane = c3dl.DEFAULT_NEAR_CLIPPING_PLANE;
  this.farClippingPlane = c3dl.DEFAULT_FAR_CLIPPING_PLANE;
}


/**
 @private
 
 Create the projection matrix.
 
 Places the view matrix at the bottom of the matrix stack.
 */
c3dl.Camera.prototype.applyToWorld = function (aspectRatio)
{
  // set the bottom matrix of the matrix stack to the viewmatrix
  c3dl.loadMatrix(c3dl.lookAt(this.pos, c3dl.addVectors(this.pos, this.dir), this.up));
  c3dl.translate(-this.pos[0], -this.pos[1], -this.pos[2]);
  this.viewMatrix = c3dl.peekMatrix();

  // Create a projection matrix and store it inside a globally accessible place.
  this.projMatrix = c3dl.makePerspective(this.fieldOfView, aspectRatio, this.nearClippingPlane, 
  this.farClippingPlane);
  c3dl.matrixMode(c3dl.PROJECTION);
  c3dl.loadMatrix(this.projMatrix);
  c3dl.matrixMode(c3dl.MODELVIEW);
}


/**
 Get the direction of the camera.
 
 @returns {Array} vector
 */
c3dl.Camera.prototype.getDir = function ()
{
  return c3dl.copyVector(this.dir);
}


/**
 Get the far clipping plane.
 
 @returns {float} far clipping plane value.
 */
c3dl.Camera.prototype.getFarClippingPlane = function ()
{
  return this.farClippingPlane;
}


/**
 Get the vertical field of view for this camera in degrees.
 
 @returns {float} field of view is greater than 0 and less than 180.
 */
c3dl.Camera.prototype.getFieldOfView = function ()
{
  return this.fieldOfView;
}


/**
 Get the left vector of the camera.
 
 @returns {Array} vector
 */
c3dl.Camera.prototype.getLeft = function ()
{
  return c3dl.copyVector(this.left);
}


/**
 Get the near clipping plane.
 
 @returns {float} near clipping plane value.
 */
c3dl.Camera.prototype.getNearClippingPlane = function ()
{
  return this.nearClippingPlane;
}


/**
 Get the position of the camera.
 
 @returns {Array} A three element array which contains the position of the camera.
 */
c3dl.Camera.prototype.getPosition = function ()
{
  return c3dl.copyVector(this.pos);
}


/**
 @private
 */
c3dl.Camera.prototype.getProjectionMatrix = function ()
{
  return c3dl.copyMatrix(this.projMatrix);
}

/**
 @private
 */
c3dl.Camera.prototype.getViewMatrix = function ()
{
  return c3dl.copyMatrix(this.viewMatrix);
}

/**
 Get the up vector of the camera.
 
 @returns {Array}
 */
c3dl.Camera.prototype.getUp = function ()
{
  return c3dl.copyVector(this.up);
}


/**
 The far clipping plane should not be set to an extremely large value. This
 can create depth buffer precision problems such as z-fighting. see
 http://www.opengl.org/resources/faq/technical/depthbuffer.htm for more information.
 
 @param {float} fcp Must be larger than 0.
 */
c3dl.Camera.prototype.setFarClippingPlane = function (fcp)
{
  if (fcp > 0)
  {
    this.farClippingPlane = fcp;
  }
}


/**
 Set the field of view for this camera in degrees.
 
 @param {float} fov Specified in degrees. Must be greater than 0 and less than 180.
 */
c3dl.Camera.prototype.setFieldOfView = function (fov)
{
  if (fov > 0 && fov < 180)
  {
    this.fieldOfView = fov;
  }
}


/**
 The near clipping plane must be set to a positive value.
 
 @param {float} ncp Must be larger than 0.
 */
c3dl.Camera.prototype.setNearClippingPlane = function (ncp)
{
  if (ncp > 0)
  {
    this.nearClippingPlane = ncp;
  }
}

/**
 Get a string representation of this camera.
 
 @param {String} [delimiter=","]  A string used to separate the member
 variables of the object.
 
 @returns {String} a string representation of this class.
 */
c3dl.Camera.prototype.toString = function (delimiter)
{
  // make sure user passed up a string if they actually decided
  // to specify a delimiter.
  if (!delimiter || typeof(delimiter) != "string")
  {
    delimiter = ",";
  }

  return "c3dl.Camera: " + delimiter + "left: " + this.getLeft() + delimiter + "up: " + this.getUp() +
    delimiter + "direction: " + this.getDir() + delimiter + "position: " + this.getPosition() +
    delimiter + "fied of view: " + this.getFieldOfView() + delimiter + "near clipping plane: " +
    this.getNearClippingPlane() + delimiter + "far clipping plane: " + this.getFarClippingPlane() + 
    delimiter;
}

/**
 @private
 
 Called automatically.
 
 Update Animation of the camera.
 
 @param {float} timeStep 
 */
c3dl.Camera.prototype.update = function (timeStep)
{

  if (c3dl.isVectorZero(linVel) && c3dl.isVectorZero(angVel)) return false;

  if (c3dl.vectorLengthSq(linVel) > 0.0)
  {
    // Add a velocity to the position
    velVec = c3dl.makeVector(linVel[0], linVel[1], linVel[2]);
    c3dl.multiplyVector(velVec, timeStep, velVec);

    c3dl.addVectors(pos, velVec, pos);
  }

  if (c3dl.vectorLengthSq(angVel) > 0.0)
  {
    // Apply some rotations to the orientation from the angular velocity
    this.pitch(angVel[0] * timeStep);
    this.yaw(angVel[1] * timeStep);
    this.roll(angVel[2] * timeStep);
  }

  return true;
}