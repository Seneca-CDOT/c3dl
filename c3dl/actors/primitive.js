/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
	@class
*/
c3dl.Primitive = c3dl.inherit(c3dl.Actor, function()
{
	c3dl._superc(this);

	// Member Variables
	this.isPickable	= true;
	this.visible	= true;
});
	
	
// -------------------------------------------------------
// Getters

/**
	Can this object be picked when the user clicks on it?  In some scripts using
	the library, it may not make sense for wall, for example to be picked.  If the
	object cannot be picked, it will not tested against the ray which is generated
	then the user clicks the canvas, thus increasing performance.

	@returns {bool} true if the object can be picked, false otherwise.
*/
c3dl.Primitive.prototype.getPickable = function()
{
	return this.isPickable;
}

/**
	Will the Primitive be visible in the scene?

	@returns {boolean} true if the object is rendered.
*/
c3dl.Primitive.prototype.isVisible = function()
{
	return this.visible;
}

// -------------------------------------------------------
// Setters	

/**
	Set the visibility state.

	@param {boolean} show Either a true or false value which will 
	show or hide the object when rendering.
*/
c3dl.Primitive.prototype.setVisible = function(show)
{
	this.visible = show;
}

/**
	Set whether this object should be included in picking tests.  By omitting
	objects which should not be interacted with, it can increase performance.

	@param {bool} isPickable true if the object should be included in pikcing tests,
	false otherwise.
*/
c3dl.Primitive.prototype.setPickable = function(isPickable)
{
	this.isPickable = isPickable;
}

/**
	@private
*/
c3dl.Primitive.prototype.getCopy = function()
{
	var primitive = new c3dl.Primitive();
	primitive.clone(this);
	return primitive;
}

/**
	@private
*/
c3dl.Primitive.prototype.clone = function(other)
{
        c3dl._super(this, arguments, "clone");

        this.visible = other.visible;
        this.isPickable = other.isPickable;
		this.visible = other.visible;
}

/**
	@private
*/
c3dl.Primitive.prototype.render = function(glCanvas3D, scene)
{
}
