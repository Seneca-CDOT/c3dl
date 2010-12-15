/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Actor is a base class for 3D objects.
 */
c3dl.Actor = function ()
{
  // Raw Position Values
  this.left = c3dl.makeVector(1.0, 0.0, 0.0); // Left vector
  this.up = c3dl.makeVector(0.0, 1.0, 0.0); // Up Vector
  this.dir = c3dl.makeVector(0.0, 0.0, 1.0); // Forward Vector
  this.pos = c3dl.makeVector(0.0, 0.0, 0.0); // Position
  this.scaleVec = c3dl.makeVector(1.0, 1.0, 1.0); // Scale
  // Delta Values for Animations
  this.linVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animation of positions
  this.angVel = c3dl.makeVector(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)
  this.name = "unnamed";
  this.rotMat = c3dl.makeMatrix();
  this.transMat = c3dl.makeMatrix();
}

// -------------------------------------------------------
// Getters
/**
 Get the position of the Actor relative to the world origin.
 
 @returns {Array} The position of the Actor.
 */
c3dl.Actor.prototype.getPosition = function () {
  return c3dl.copyVector(this.pos);
}

/**
 The the Up Vector of the actor.
 
 @returns {Array} The up Vector of the actor.
 */
c3dl.Actor.prototype.getUp = function () {  
  return c3dl.copyVector(this.up);
}

/**
 Get the direction of the actor, where the actor is 
 'pointing' or looking'.
 
 @returns {Array} The direction of the actor.
 */
c3dl.Actor.prototype.getDirection = function () {
  return c3dl.copyVector(this.dir);
}

/**
 Get the left Vector of the actor.
 
 @returns {Array} The left Vector of the actor.
 */
c3dl.Actor.prototype.getLeft = function () {
  return c3dl.copyVector(this.left);
}

/**
 Get the linear velocity of the Actor.
 
 @returns {Array} The linear velocity of the Actor.
 */
c3dl.Actor.prototype.getLinearVel = function () {
  return c3dl.copyVector(this.linVel);
}

/**
 Get the angular velocity of the Actor.
 
 @returns {Array} The angular velocity of the Actor.
 */
c3dl.Actor.prototype.getAngularVel = function () {
  return c3dl.copyVector(this.angVel);
}

/**
 Get the scale factor of the Actor.  It has a default value 
 of (1,1,1) when created.
 
 @returns {Array} The scale amount of the Actor.
 */
c3dl.Actor.prototype.getScale = function () {
  return c3dl.copyVector(this.scaleVec);
}

/**
 Get the transformation of this node. Keep in mind that
 if this node is 'animated', the matrix will be changing with 
 each update(). In that case, the matrix this function returns
 will the the state the matrix is in at the time the function is called.
 
 @return {Array}
 */
c3dl.Actor.prototype.getTransform = function () {
  c3dl.mat1[0] = this.left[0];
  c3dl.mat1[1] = this.left[1];
  c3dl.mat1[2] = this.left[2];
  c3dl.mat1[3] = 0.0;
  c3dl.mat1[4] = this.up[0];
  c3dl.mat1[5] = this.up[1];
  c3dl.mat1[6] = this.up[2];
  c3dl.mat1[7] = 0.0;
  c3dl.mat1[8] = this.dir[0];
  c3dl.mat1[9] = this.dir[1];
  c3dl.mat1[10] = this.dir[2];
  c3dl.mat1[11] = 0.0;
  c3dl.mat1[12] = this.pos[0];
  c3dl.mat1[13] = this.pos[1];
  c3dl.mat1[14] = this.pos[2];
  c3dl.mat1[15] = 1.0;
  c3dl.setMatrix(c3dl.mat2, this.scaleVec[0], 0, 0, 0, 0, this.scaleVec[1], 0, 0, 0, 0, this.scaleVec[2], 0, 0, 0, 0, 1);
  return c3dl.multiplyMatrixByMatrix(c3dl.mat1, c3dl.mat2, this.transMat); 
}


c3dl.Actor.prototype.getRotateMat = function ()
{ 
  this.rotMat[0] = this.left[0];
  this.rotMat[1] = this.left[1];
  this.rotMat[2] = this.left[2];
  this.rotMat[3] = 0.0;
  this.rotMat[4] = this.up[0];
  this.rotMat[5] = this.up[1];
  this.rotMat[6] = this.up[2];
  this.rotMat[7] = 0.0;
  this.rotMat[8] = this.dir[0];
  this.rotMat[9] = this.dir[1];
  this.rotMat[10] = this.dir[2];
  this.rotMat[11] = 0.0;
  this.rotMat[12] = 0;
  this.rotMat[13] = 0;
  this.rotMat[14] = 0;
  this.rotMat[15] = 1.0;
  return this.rotMat; 
}
/**
 Get the name of this actor.
 
 @returns {String} actor's name
 */
c3dl.Actor.prototype.getName = function () {
  return this.name;
}

// Setters	
/**
 Set the transformation of this actor.
 
 @param {Array} mat
 */
c3dl.Actor.prototype.setTransform = function (mat) {
  this.left = c3dl.makeVector(mat[0], mat[1], mat[2]);
  this.up = c3dl.makeVector(mat[4], mat[5], mat[6]);
  this.dir = c3dl.makeVector(mat[8], mat[9], mat[10]);
  this.pos = c3dl.makeVector(mat[12], mat[13], mat[14]);
}

/**
 */
c3dl.Actor.prototype.resetTransform = function () {
  this.angVel = c3dl.makeVector(0.0, 0.0, 0.0);
  this.linVel = c3dl.makeVector(0.0, 0.0, 0.0);
  this.left = c3dl.makeVector(1.0, 0.0, 0.0);
  this.up = c3dl.makeVector(0.0, 1.0, 0.0);
  this.dir = c3dl.makeVector(0.0, 0.0, 1.0);
  this.pos = c3dl.makeVector(0.0, 0.0, 0.0);
}



/**
 Scale the  Actor relative to its current scaling value.	
 Attempts to scale the x, y or z values of the Actor less 
 than or equal to zero will be ignored.
 
 @param {Array} scaleVec The amount to scale the Actor.
 */
c3dl.Actor.prototype.scale = function (scaleVec) {
  // none of the values should be less than or equal to zero
  if (scaleVec[0] > 0.0 && scaleVec[1] > 0.0 && scaleVec[2] > 0.0)
  {
    this.scaleVec[0] = this.scaleVec[0] * scaleVec[0]; 
  	this.scaleVec[1] = this.scaleVec[1] * scaleVec[1]; 
    this.scaleVec[2] = this.scaleVec[2] * scaleVec[2];
  }
}
 
/**
 Set the new location of the Actor.
 
 @param {Array} vecPos A vector containing the new location for the actor.
 */
c3dl.Actor.prototype.setPosition = function (vecPos)
{
  this.pos[0] = vecPos[0];
  this.pos[1] = vecPos[1];
  this.pos[2] = vecPos[2];
}

/**
 Move the object relative to where it is currently, not relative 
 to the origin.
 
 @param {Array} translation A vector which represents 
 how far away to move the actor from its current location.
 */
c3dl.Actor.prototype.translate = function (translation)
{
  this.pos = c3dl.addVectors(this.pos, translation);
}


/**
 Set the point in space where the Actor will look at (No Animation).
 
 @param {Array} newVec
 */
c3dl.Actor.prototype.setForward = function (newVec)
{
  this.dir = this.pos;
  c3dl.subtractVectors(this.dir, newVec, this.dir);
  c3dl.normalizeVector(this.dir);
  // Adjust the Up and Left vectors accordingly
  c3dl.vectorCrossProduct(this.up, this.dir, this.left);
  c3dl.normalizeVector(this.left);
  c3dl.vectorCrossProduct(this.dir, this.up, this.up);
  c3dl.normalizeVector(this.up);
}

/**
 Set the orientation of Up (No Animation)
 
 @param {Array} newVec
 */
 
c3dl.Actor.prototype.setUpVector = function (newVec)
{
  this.up[0] = newVec[0];
  this.up[1] = newVec[1];
  this.up[2] = newVec[2];
}

/**
 Set a new Linear Velocity that will be added to the Position on every update
 
 @param {Array} newVec
 */
c3dl.Actor.prototype.setLinearVel = function (newVec)
{
  this.linVel[0] = newVec[0];
  this.linVel[1] = newVec[1];
  this.linVel[2] = newVec[2];
}

/**
 Set a new Angular Veclocity that will be added to the rotation on 
 every update.
 
 @param {Array} newVec
 */
c3dl.Actor.prototype.setAngularVel = function (newVec)
{
  this.angVel[0] = newVec[0];
  this.angVel[1] = newVec[1];
  this.angVel[2] = newVec[2];
}

/**
 Set the name of this actor.
 
 @param {String} name The new name of for this actor.
 */
c3dl.Actor.prototype.setName = function (name)
{
  this.name = name;
}

// -------------------------------------------------------
/**
 Rotate Actor on an axis which is centered on the position of 
 the Actor.
 
 @param {Array} axisVec
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.rotateOnAxis = function (axisVec, angle)
{
  var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
  var rotateOnAxisMat = c3dl.makeZeroMatrix();
  
  if (angle == 0)
  {
    return;
  }

  // Create a proper Quaternion based on location and angle
  c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);

  // Create a rotation Matrix out of this quaternion
  rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);

  // Apply changes to the remaining vectors
  //
  c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.dir, this.dir);
  c3dl.normalizeVector(this.dir);

  c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.left, this.left);
  c3dl.normalizeVector(this.left);

  c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.up, this.up);
  c3dl.normalizeVector(this.up);
}

/**
 Rotate around the Up Vector by a hard amount (No Animation)
 
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.yaw = function (angle)
{
  if (angle != 0)
  {
    this.rotateOnAxis(this.up, angle);
  }
}

/**
 Rotate around the Dir Vector by a hard amount (No Animation)
 
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.roll = function (angle)
{
  if (angle != 0)
  {
    this.rotateOnAxis(this.dir, angle);
  }
}

/**
 Rotate around the Side Vector by a hard amount (No Animation)
 
 @param {float} angle in radians.
 */
c3dl.Actor.prototype.pitch = function (angle)
{
  if (angle != 0)
  {
    this.rotateOnAxis(this.left, angle);
  }
}

/**
 @private
 
 Called automatically. Update animations, etc.
 
 @param {float} timeStep
 */
c3dl.Actor.prototype.update = function (timeStep)
{

}

/**
 @private
 */
c3dl.Actor.prototype.getCopy = function ()
{
  var actor = new c3dl.Actor();
  actor.clone(this);
  return actor;
}


/**
 */
c3dl.Actor.getObjectType = function ()
{
  return c3dl.COLLADA;
}

/**
 @private
 */
c3dl.Actor.prototype.clone = function (other)
{
  this.left = c3dl.copyVector(other.left);
  this.up = c3dl.copyVector(other.up);
  this.dir = c3dl.copyVector(other.dir);
  this.pos = c3dl.copyVector(other.pos);
  this.scaleVec = c3dl.copyVector(other.scaleVec);
  this.linVel = c3dl.copyVector(other.linVel);
  this.angVel = c3dl.copyVector(other.angVel);
  this.name = other.name;
}