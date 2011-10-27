/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Shape represents a generic shape for a model created without using a file.
 Shape is never intended to be instantiated directly, instead any of the classes
 that inherit from it should.
 
 @augments c3dl.Primitive
*/
c3dl.Shape = c3dl.inherit(c3dl.Primitive, function ()
{
  c3dl._superc(this);
  this.boundingVolume = new c3dl.BoundingVolume();
  this.boundingVolume.centered = true;
  this.renderObb = false;
  this.renderAabb = false;
  this.renderBoundingSphere = false;
  this.shape = new c3dl.Primitive();
  this.firstTimeRender = true;
  this.primitiveSets = [];
});

/**
 Get the angular velocity of this shape.
 
 @returns {float} The angular velocity applied to this Shape
 */
c3dl.Shape.prototype.getAngularVel = function ()
{
  if (this.isReady())
  {
    return this.shape.getAngularVel();
  }
}

/**
 Get the linear velocity of this shape.
 
 @returns {float} The linear velocity applied to this Shape
 */
c3dl.Shape.prototype.getLinearVel = function ()
{
  if (this.isReady())
  {
    return this.shape.getLinearVel();
  }
}

/**
 Get the position of this Shape.
 
 @returns {Array} The position of this Shape in 3D space
 */
c3dl.Shape.prototype.getPosition = function ()
{
  if (this.isReady())
  {
    return this.shape.getPosition();
  }
}

/**
 Set the angular velocity of this shape.
 
 @param {Array} vec - The angular velocity to apply to this Shape
*/
c3dl.Shape.prototype.setAngularVel = function (vec)
{
  if (this.isReady())
  {
    this.shape.setAngularVel(vec);
  }
}

/**
 Get the direction this shape considers to be 'up'
 
 @returns {Array} A vector representing the direction this Shape considers 'up'
*/
c3dl.Shape.prototype.getUp = function ()
{
  if (this.isReady())
  {
    return this.shape.getUp();
  }
}

/**
 Get the direction this shape considers to be 'left'
 
 @returns {Array} A vector representing the direction this Shape considers 'left'
*/
c3dl.Shape.prototype.getLeft = function ()
{
  if (this.isReady())
  {
    return this.shape.getLeft();
  }
}

/**
 Get the direction this shape considers to be 'forward'
 
 @returns {Array} A vector representing the direction this Shape considers 'forward'
*/
c3dl.Shape.prototype.getDirection = function ()
{
  if (this.isReady())
  {
    return this.shape.getDirection();
  }
}

/**
 Can this object be picked when the user clicks on it?  In some scripts using
 the library, it may not make sense for wall, for example to be picked.  If the
 object cannot be picked, it will not tested against the ray which is generated
 then the user clicks the canvas, thus increasing performance.
 
 @returns {boolean} true if the object can be picked, false otherwise.
*/
c3dl.Shape.prototype.getPickable = function ()
{
  if (this.isReady())
  {
    return this.shape.getPickable();
  }
}

/**
 Set whether this object should be included in picking tests.  By omitting
 objects which should not be interacted with, it can increase performance.
 
 @param {boolean} isPickable - true if the object should be included in picking tests,
 false otherwise.
 */
c3dl.Shape.prototype.setPickable = function (isPickable)
{
  if (this.isReady())
  {
    this.shape.setPickable(isPickable);
  }
}

/**
 Set the linear velocity of the scenegraph's root node.
 
 @param {Array} vec - The linear velocity to set on this object.
 */
c3dl.Shape.prototype.setLinearVel = function (vec)
{
  if (this.isReady())
  {
    this.shape.setLinearVel(vec);
  }
}

/**
 Perform any tasks necessary to create the object.  Virtual here,
 but intended to be available to any derived classes.
*/
c3dl.Shape.prototype.init = function ()
{
}

/**
 Update the Shape for any changes since the last render.
 
 @param {float} timestep - The time elapsed since the last update
*/
c3dl.Shape.prototype.update = function (timeStep)
{
  if (!this.isStatic() || this.isStatic() && this.isDirty())
  {
    c3dl.multiplyVector(this.shape.linVel, timeStep, c3dl.vec1);
    c3dl.addVectors(this.shape.pos, c3dl.vec1, this.shape.pos);
    this.shape.pitch(this.shape.angVel[0] * timeStep);
    this.shape.yaw(this.shape.angVel[1] * timeStep);
    this.shape.roll(this.shape.angVel[2] * timeStep);
    if (this.isStatic())
    {
      this.setDirty(false);
    }
    var pos = this.shape.pos;
    var rotateMat = this.shape.getRotateMat();
    var scaleVec = this.shape.scaleVec;
    this.boundingVolume.set(pos,rotateMat,scaleVec);
  }
}

/**
 Draw this object in the scene.
  
 @param {context} glCanvas3D - The graphics rendering context
 @param {Scene} scene - The scene currently being rendered
*/
c3dl.Shape.prototype.render = function (glCanvas3D, scene)
{
  if (this.isVisible())
  {
    c3dl.pushMatrix();
    c3dl.multMatrix(this.shape.getTransform());
    if (this.firstTimeRender == true)
    {
      this.primitiveSets[0].setupVBO(glCanvas3D);
      this.firstTimeRender = false;
    }
    scene.getRenderer().renderShape(this, scene);
    c3dl.popMatrix();
    if (scene.getBoundingVolumeVisibility())
    {
      this.boundingVolume.renderObb(scene);
      this.boundingVolume.renderAabb(scene);
      this.boundingVolume.renderSphere(scene);
    }
    if (this.renderObb)
    {
      this.boundingVolume.renderObb(scene);
    }
    if (this.renderAabb)
    {
      this.boundingVolume.renderAabb(scene);
    }
    if (this.renderBoundingSphere)
    {
      this.boundingVolume.renderSphere(scene);
    }
    scene.getRenderer().texManager.updateTexture(this.primitiveSets[0].texture);
  }
} 


/**
 Scale this shape within the scene
 
 @param {Array} scaleVec - The value to scale by on each axis
 */
c3dl.Shape.prototype.scale = function (scaleVec)
{
  if (this.isReady())
  {
    this.shape.scale(scaleVec);
    this.boundingVolume.scale(scaleVec);
    this.setDirty(true);
  }
}

/**
 Translate the entire model, relative to its current position.
 
 @param {Array} trans - The value to translate on each axis
 */
c3dl.Shape.prototype.translate = function (trans)
{
  if (this.isReady())
  {
    this.shape.translate(trans);
    this.boundingVolume.setPosition(this.shape.pos);
    this.setDirty(true);
  }
}

/**
 Move the model to a new position.
 
 @param {Array} pos - The absolute position to move to.
*/
c3dl.Shape.prototype.setPosition = function (pos)
{
  if (this.isReady())
  {
    this.shape.setPosition(pos);
    this.boundingVolume.setPosition(pos);
    this.setDirty(true);
  }
  
}

/**
 Set the texture being used by this Shape.
 
 @param {string} texturePath - Path of the texture.
 */
c3dl.Shape.prototype.setTexture = function (texturePath)
{
  if (this.isReady())
  {
    this.primitiveSets[0].setTexture(texturePath);
  }
}

/**
 Rotate around an arbitrary axis by a hard amount.
 
 @param {Array} axisVec - The axis to rotate around.
 @param {float} angle - in radians.
 */
c3dl.Shape.prototype.rotateOnAxis = function (axisVec, angle)
{
  if (this.isReady())
  {
    this.shape.rotateOnAxis(axisVec, angle);
    this.boundingVolume.rotateOnAxis(axisVec, angle);
    this.setDirty(true);
  }
}

/**
 Rotate around this object's up vector by a hard amount.
 
 @param {float} angle - in radians.
 */
c3dl.Shape.prototype.yaw = function (angle)
{
  if (this.isReady())
  {
    this.shape.yaw(angle);
    this.boundingVolume.rotateOnAxis(this.shape.up, angle);
    this.setDirty(true);
  }
}

/**
 Rotate around the side vector by a hard amount.
 
 @param {float} angle - in radians.
 */
c3dl.Shape.prototype.pitch = function (angle)
{
  if (this.isReady())
  {
    this.shape.pitch(angle);
    this.boundingVolume.rotateOnAxis(this.shape.left, angle);
    this.setDirty(true);
  }
}

/**
 @private
 
 Check if this object is fully loaded (and ready to render) or not.
 
 @returns {boolean} True if this Shape is ready, false otherwise
 */
c3dl.Shape.prototype.isReady = function ()
{
  return this.shape != null ? true : false;
}

/**
 Rotate around this shape's direction vector by a hard amount.
 
 @param {float} angle - in radians.
 */
c3dl.Shape.prototype.roll = function (angle)
{
  if (this.isReady())
  {
    this.shape.roll(angle);
    this.boundingVolume.rotateOnAxis(this.shape.dir, angle);
    this.setDirty(true);
  }
}

/**
 Get the transformation matrix of this shape.
 Called automatically.
 
 @returns {Array} The array that represents this model's transformation.
*/
c3dl.Shape.prototype.getTransform = function ()
{
  if (this.shape)
  {
    return this.shape.getTransform();
  }
}

/**
 @private
 Does the given ray intersect with this object? This function will
 test the ray against all the geometry nodes in the shape and
 return true as soon as it finds an intersection.
 
 @param {Array} rayOrigin The ray's origin in view space.
 @param {Array} rayDir The ray's direction in view space.
 
 @returns {boolean} true if the ray intersects with one of the geometry nodes
 in the shape.
 */
c3dl.Shape.prototype.rayIntersectsEnclosures = function (rayOrigin, rayDir)
{
  if (c3dl.rayIntersectsSphere(rayOrigin, rayDir, this.boundingVolume.getPosition(), this.boundingVolume.getRadius()) && 
    c3dl.rayAABBIntersect(rayOrigin, rayDir, this.boundingVolume.aabb.maxMins) &&
    c3dl.rayOBBIntersect(rayOrigin, rayDir, this.boundingVolume.obb.boxVerts, this.boundingVolume.getAxis()))
  {
    return true;
  }
  return false;
}

/**
 @private
 Does the given ray intersect with any of the triangles in this object?
 
 @param {Array} rayOrigin - ray's origin in world space.
 @param {Array} rayDir - A normalized direction vector.
 
 @returns {boolean} true if the ray intersects with any triangle in the object.
 */
c3dl.Shape.prototype.rayIntersectsTriangles = function (rayOrigin, rayDir)
{
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());
  var mat = c3dl.inverseMatrix(c3dl.peekMatrix());
  var rayorigin = c3dl.multiplyMatrixByVector(mat, rayOrigin);
  var raydir = c3dl.normalizeVector(c3dl.multiplyMatrixByDirection(mat, rayDir));
  c3dl.popMatrix();
  // allocate and resuse these vertices to prevent allocation and deletion every face.
  var vert1 = new C3DL_FLOAT_ARRAY(3);
  var vert2 = new C3DL_FLOAT_ARRAY(3);
  var vert3 = new C3DL_FLOAT_ARRAY(3);
  var vertices = this.primitiveSets[0].getVertices();
  // Iterate over each face of the object and test it against the ray.
  for (var j = 0, len2 = vertices.length; j < len2; j += 9)
  {
    // 3 points of a triangle with the object's position offset
    vert1[0] = vertices[j];
    vert1[1] = vertices[j + 1]
    vert1[2] = vertices[j + 2];
 
    vert2[0] = vertices[j + 3];
    vert2[1] = vertices[j + 4];
    vert2[2] = vertices[j + 5];

    vert3[0] = vertices[j + 6];
    vert3[1] = vertices[j + 7];
    vert3[2] = vertices[j + 8];
    if (c3dl.rayIntersectsTriangle(rayorigin, raydir, vert1, vert2, vert3))
    {
      return true;
    }   
  }
  return false;
}

/**
 Determine the type of object this is.
 
 @returns {int} A constant value representing c3dl.Shape.
*/
c3dl.Shape.prototype.getObjectType = function ()
{
  return c3dl.SHAPE;
}

/**
 Get the bounding volumes for this shape.
 
 @returns {c3dl.BoundingVolume} The bounding volumes attached to this shape.
*/
c3dl.Shape.prototype.getBoundingVolumes = function ()
{
  return [this.boundingVolume];
}

/**
 Get the height (y-axis) of this model.
 
 @returns {int} The height of this model.
*/
c3dl.Shape.prototype.getHeight = function ()
{
  if (this.isReady())
  {
    return this.boundingVolume.getHeight();
  }
}

/**
 Get the width (x-axis) of this model.
 
 @returns {int} The width of this model.
*/
c3dl.Shape.prototype.getWidth = function ()
{
  if (this.isReady())
  {
    return this.boundingVolume.getWidth();
  }
}

/**
 Get the length (z-axis) of this model.
 
 @returns {int} The length of this model.
*/
c3dl.Shape.prototype.getLength = function ()
{
  if (this.isReady())
  {
    return this.boundingVolume.getLength();
  }
}

/**
 Get the size of this shape in all three axes.
 
 @returns {Array} The size of this shape in all three axes.
*/
c3dl.Shape.prototype.getSize = function ()
{
  if (this.isReady())
  {
    return [this.boundingVolume.getLength(),this.boundingVolume.getWidth(),this.boundingVolume.getHeight()];
  }
}

/**
 Scale this shape to be a specific height, while leaving the other dimensions untouched.
 
 @param {int} height - The desired height of this shape
*/
c3dl.Shape.prototype.setHeight = function (height)
{
  height = parseFloat(height);
  var curheight = this.boundingVolume.getHeight();
  var scaleVec = [];
  if (curheight > height)
  {
    scaleVec = [1, (1 / (curheight / height)), 1];
  }
  else if (curheight < height)
  {
    scaleVec = [1, (height / curheight), 1];
  }
  else
  {
    scaleVec= [1, 1, 1];
  }
  this.shape.scale(scaleVec);
  this.boundingVolume.scale(scaleVec);
  this.setDirty(true);
}

/**
 Scale this shape to be a specific length, while leaving the other dimensions untouched.
 
 @param {int} height - The desired length of this shape
*/
c3dl.Shape.prototype.setLength = function (length)
{
  length = parseFloat(length);
  var curlength = this.boundingVolume.getLength();
  var scaleVec = [];
  if (curlength > length)
  {
    scaleVec = [(1 / (curlength / length)), 1, 1];
  }
  else if (curlength < length)
  {
    scaleVec = [(length / curlength), 1, 1];
  }
  else
  {
    scaleVec = [1, 1, 1];
  }
  this.shape.scale(scaleVec);
  this.boundingVolume.scale(scaleVec);
  this.setDirty(true);
}

/**
 Scale this shape to be a specific width, while leaving the other dimensions untouched.
 
 @param {int} height - The desired width of this shape
*/
c3dl.Shape.prototype.setWidth = function (width)
{
  width = parseFloat(width);
  var curwidth = this.boundingVolume.getWidth();
  var scaleVec = [];
  if (curwidth > width)
  {
    scaleVec = [1, 1, (1 / (curwidth / width))];
  }
  else if (curwidth < width)
  {
    scaleVec = [1, 1, (width / curwidth)];
  }
  else
  {
    scaleVec = [1, 1, 1];
  }
  this.shape.scale(scaleVec);
  this.boundingVolume.scale(scaleVec);
  this.setDirty(true);
}

/**
 Scale this shape to be a specific size, in all three axes.
 
 @param {int} length - The desired length of this shape
 @param {int} width - The desired width of this shape
 @param {int} height - The desired height of this shape
*/
c3dl.Shape.prototype.setSize = function (length, width, height)
{
  length = parseFloat(length);
  width = parseFloat(width);
  height = parseFloat(height);
  var curlength = this.boundingVolume.getLength();
  var curwidth = this.boundingVolume.getWidth();
  var curheight = this.boundingVolume.getHeight();
  var scaleVec = [];
  var vecL, vecW, vecH;
  if (curlength > length)
  {
    vecL = (1 / (curlength / length));
  }
  else if (curlength < length)
  {
    vecL = length / curlength;
  }
  else
  {
    vecL = 1;
  }
  if (curheight > height)
  {
    vecH = (1 / (curheight / height));
  }
  else if (curheight < height)
  {
    vecH = (height / curheight);
  }
  else
  {
    vecH = 1;
  }
  if (curwidth > width)
  {
    vecW = (1 / (curwidth / width));
  }
  else if (curwidth < width)
  {
    vecW = (width / curwidth);
  }
  else
  {
    vecW = 1;
  }
  scaleVec = [vecL, vecH, vecW];
  this.shape.scale(scaleVec);
  this.boundingVolume.scale(scaleVec);
  this.setDirty(true);
}

/**
 Set whether or not to render this shape's bounding box.
 
 @param {boolean} renderObb - whether to render the obb or not.
*/
c3dl.Shape.prototype.setRenderObb = function (renderObb)
{
  this.renderObb = renderObb;
}

/**
 Set whether or not to render this shape's axis aligned bounding box.
 
 @param {boolean} renderAabb - whether to render the axis aligned bounding box or not.
*/
c3dl.Shape.prototype.setRenderAabb = function (renderAabb)
{
  this.renderAabb = renderAabb;
}

/**
 Set whether or not to render this shapes's bounding sphere.
 
 @param {boolean} renderBoundingSphere - whether to render the bounding sphere or not.
*/
c3dl.Shape.prototype.setRenderBoundingSphere = function (renderBoundingSphere)
{
  this.renderBoundingSphere = renderBoundingSphere;
}

/**
 Get this shape's bounding volume.
 
 @returns {c3dl.BoundingVolume} This shape's bounding volumes.
*/
c3dl.Shape.prototype.getBoundingVolume = function ()
{
  return this.boundingVolume;
}

/**
 Get the primitiveSets that make up this Shape
 
 @returns {Array} The primitiveSets that make up this shape.
*/
c3dl.Shape.prototype.getPrimitiveSets = function ()
{
  return this.primitiveSets;
}

/**
 Get the path of the texture currently applied to this object.
 
 @returns {String} The paths to the texture applied to this shape.
*/
c3dl.Shape.prototype.getTextures = function ()
{
  return [this.primitiveSets[0].getTexture()];
}
