/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/*
 @class
*/
c3dl.Primitive = c3dl.inherit(c3dl.Actor, function ()
{
  c3dl._superc(this);

  // Member Variables
  this.isPickable = true;
  this.visible = true;
  this.insideFrustum = false;
  this.dirtyFlag = true;
  this.staticObject = false;
});


// -------------------------------------------------------
// Getters
/*
 Can this object be picked when the user clicks on it?  In some scripts using
 the library, it may not make sense for wall, for example to be picked.  If the
 object cannot be picked, it will not tested against the ray which is generated
 then the user clicks the canvas, thus increasing performance.
 
 @returns {boolean} true if the object can be picked, false otherwise.
 */
c3dl.Primitive.prototype.getPickable = function ()
{
  return this.isPickable;
}

/*
 Will the Primitive be visible in the scene?
 
 @returns {boolean} true if the object is rendered.
 */
c3dl.Primitive.prototype.isVisible = function ()
{
  return this.visible;
}

/*
 Is the primitive inside the camera's viewing area (frustrum)?
 
 @returns {boolean} true if the object is in the frustrum.
 */
c3dl.Primitive.prototype.isInsideFrustum = function ()
{
  return this.insideFrustum;
}

/*
 Will the Primitive remain unchanged (static) between updates?
 
 @returns {boolean} true if the object is static.
 */
c3dl.Primitive.prototype.isStatic = function ()
{
  return this.staticObject;
}

/*
 Has the primitive changed (e.g., scaled, rotated) since the last render?
 
 @returns {boolean} true if the object has changed.
 */
c3dl.Primitive.prototype.isDirty = function ()
{
  return this.dirtyFlag;
}

// -------------------------------------------------------
// Setters  
/**
 Set the visibility state.
 
 @param {boolean} show - Either a true or false value which will 
 show or hide the object when rendering.
 */
c3dl.Primitive.prototype.setVisible = function (show)
{
  this.visible = show;
}

/**
 Set whether the primitive is inside the frustrum or not.
 
 @param {boolean} inside - Either a true or false value which will 
 be used when determining if the object will be rendered or not.
 */
c3dl.Primitive.prototype.setInsideFrustum = function (inside)
{
  this.insideFrustum = inside;
}

/**
 Set the static state.
 
 @param {boolean} staticObject - Either a true or false value which will 
 be used to determine whether or not to call update on the primitive
 between renders.
 */
c3dl.Primitive.prototype.setStatic = function (staticObject)
{
  this.staticObject = staticObject;
}

/**
 Set the 'dirty' state.
 
 @param {boolean} dirty - Either a true or false value which will 
 be used to determine whether or not to call update on a static primitive
 before rendering.
 */
c3dl.Primitive.prototype.setDirty = function (dirty)
{
  this.dirtyFlag = dirty;
}

/**
  Set whether this object should be included in picking tests.  By omitting
  objects which should not be interacted with, it can increase performance.

  @param {boolean} isPickable - true if the object should be included in picking tests,
  false otherwise.
*/
c3dl.Primitive.prototype.setPickable = function (isPickable)
{
  this.isPickable = isPickable;
}

/**
  @private
 
 Obtain a copy of this Primitive
 
 @return {actor} A copy of this Primitive
*/
c3dl.Primitive.prototype.getCopy = function ()
{
  var primitive = new c3dl.Primitive();
  primitive.clone(this);
  return primitive;
}

/**
 @private
 
 Make this primitive a duplicate of the passed primitive.
 
 @param {Primitive} other - The primitive holding the values to be copied into this one.
*/
c3dl.Primitive.prototype.clone = function (other)
{
  c3dl._super(this, arguments, "clone");

  this.visible = other.visible;
  this.isPickable = other.isPickable;
  this.insideFrustum = other.insideFrustum;
  this.staticObject = other.staticObject;
  this.dirtyFlag = other.dirtyFlag;
}

/**
 @private
 
 Called automatically.
 Perform any tasks necessary to display this object in the scene
 Virtual function.  Should be overridden by any class inheriting from Primitive.
 
 @param {context} glCanvas3D - The graphics rendering context
 @param {Scene} scene - The scene currently being rendered.
 */
c3dl.Primitive.prototype.render = function (glCanvas3D, scene)
{
}
