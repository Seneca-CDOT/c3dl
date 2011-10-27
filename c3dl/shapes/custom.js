/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.CustomShape A primitive shape designed to allow people to easily add simple
 models to scenes without requiring model files.  This shape allows the creation of custom
 models thorugh passing arrays of vertices, normals and texture coordinates.
 
 @augments c3dl.Shape
*/
c3dl.CustomShape = c3dl.inherit(c3dl.Shape, function (vertArry, normArry, texArry)
{
  c3dl._superc(this);
  this.boundingVolume.centered = false;
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
  if (arguments.length >= 2)
  {
    var vertices = new C3DL_FLOAT_ARRAY(vertArry);
    var normals = new C3DL_FLOAT_ARRAY(normArry);
    this.primitiveSets[0].init(vertices, normals);
    this.boundingVolume.init(vertices);
  }
  if (arguments.length >= 3)
  {
    var vertices = new C3DL_FLOAT_ARRAY(vertArry);
    var normals = new C3DL_FLOAT_ARRAY(normArry);
    var texCoords = new C3DL_FLOAT_ARRAY(texArry);
    this.primitiveSets[0].init(vertices, normals, texCoords);
    this.boundingVolume.init(vertices);
  }
});

/**
 Get a duplicate copy of this Shape.
 
 @returns {c3dl.CustomShape} A duplicate copy of this CustomShape
*/
c3dl.CustomShape.prototype.getCopy = function ()
{
  var Shape = new c3dl.CustomShape();
  Shape.clone(this);
  return Shape;
}

/**
 Copy data from another CustomShape into this one.
 
 @param {c3dl.CustomShape} other - The shape to copy into this one.
*/
c3dl.CustomShape.prototype.clone = function (other)
{
  c3dl._super(this, arguments, "clone");
  this.boundingVolume = other.boundingVolume.getCopy();
  this.primitiveSets[0] = other.primitiveSets[0].getCopy();
  this.shape = other.shape.getCopy();
} 
