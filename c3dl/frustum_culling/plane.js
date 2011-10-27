/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.Plane_Frustrum is a plane representing one boundary of the area visible to a camera.
 */
c3dl.Plane_Frustrum = function ()
{
  this.normal = new C3DL_FLOAT_ARRAY(3);
  this.offset = null;
  
  /**
   Set the initial values for this plane.
   Called automatically.
   
   @param {Array} normal - The normal for this plane.
   @param {Float} offset - A distance offset from the origin.
  */
  this.init = function(normal, offset)
  {
    this.normal[0] = normal[0];
    this.normal[1] = normal[1];
    this.normal[2] = normal[2];
    this.offset = offset;
  }
  
  /**
   Normalize the vector that represents this plane's normal.
   Called Automatically.
  */
  this.normalize = function()
  {
    var norm = Math.sqrt( this.normal[0] * this.normal[0] + this.normal[1] * this.normal[1] + 
        this.normal[2] * this.normal[2]);
    this.normal[0] /= norm;
    this.normal[1] /= norm;
    this.normal[2] /= norm;
    this.offset /= norm;
  }
}
