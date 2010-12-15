/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Material contains values which describe the behaviour of an object when light
 illuminates it.  A material can be applied to an object which will make the object appear
 to be compose of something rough, shiny, metalic, etc. An object may also emit light, in 
 which case a light is not required to be in the scene for the object to be colored/lit.
 */
c3dl.Material = function ()
{
  this.emission = c3dl.makeVector(0, 0, 0);
  this.ambient = c3dl.makeVector(0, 0, 0);
  this.diffuse = c3dl.makeVector(0, 0, 0);
  this.specular = c3dl.makeVector(0, 0, 0);
  this.shininess = 0;
  this.name = "unnamed";

  /**
   Get a deep copy of this object.
   
   @returns {c3dl.Material} a deep copy of this object.
   */
  this.getCopy = function ()
  {
    var copy = new c3dl.Material();
    copy.emission = c3dl.copyVector(this.emission);
    copy.ambient = c3dl.copyVector(this.ambient);
    copy.diffuse = c3dl.copyVector(this.diffuse);
    copy.specular = c3dl.copyVector(this.specular);
    copy.shininess = this.shininess;
    copy.name = this.name;
    return copy;
  }

  /**
   Get the color this material emits.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getEmission = function ()
  {
    return c3dl.copyVector(this.emission);
  }

  /**
   Get how much ambient light this material reflects.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getAmbient = function ()
  {
    return c3dl.copyVector(this.ambient);
  }

  /**
   Get how much diffuse light this material reflects.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getDiffuse = function ()
  {
    return c3dl.copyVector(this.diffuse);
  }

  /**
   Get the name of this material.
   
   @returns {String} name of this material.
   */
  this.getName = function ()
  {
    return this.name;
  }

  /**
   Get how much specular light this material reflects.
   
   @returns {Array} Three float values in the range 0 - 1 in the order RGB.
   */
  this.getSpecular = function ()
  {
    return c3dl.copyVector(this.specular);
  }

  /**
   Get how shiny this material is.
   
   @returns {float}
   */
  this.getShininess = function ()
  {
    return this.shininess;
  }

  /**
   Set how much light this material should emit.
   
   Examples of objects emitting their own light include 
   real world lights,
   glow-in-the-dark objects,
   any objects which should not appear black in absence of lights
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setEmission = function (color)
  {
    if (this.assertColor(color))
    {
      this.emission[0] = color[0];
	  this.emission[1] = color[1];
	  this.emission[2] = color[2];
    }
  }

  /**
   Set how much ambient light this material reflects.
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setAmbient = function (color)
  {
    if (this.assertColor(color))
    {
      this.ambient[0] = color[0];
	  this.ambient[1] = color[1];
	  this.ambient[2] = color[2];
    }
  }

  /**
   Set how much diffuse light this material reflects.
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setDiffuse = function (color)
  {
    if (this.assertColor(color))
    {
      this.diffuse[0] = color[0];
	  this.diffuse[1] = color[1];
	  this.diffuse[2] = color[2];
    }
  }

  /**
   Set how much specular light this material reflects.
   
   @param {Array} color Three float values in the range 0 - 1 in the order RGB.
   */
  this.setSpecular = function (color)
  {
    if (this.assertColor(color))
    {
      this.specular[0] = color[0];
	  this.specular[1] = color[1];
	  this.specular[2] = color[2];
    }
  }

  /**
   Set how shiny this material is.
   
   @param {float} shine
   */
  this.setShininess = function (shine)
  {
    // allow negatives? what is the maximum?
    this.shininess = shine;
  }

  /**
   Set a new name for this material. 
   
   The default name for materials is "unnamed".
   
   @param {String} name New name of the material.
   */
  this.setName = function (name)
  {
    this.name = name;
  }

  /**
   Get a string representation of this object.
   
   @returns {String} A string of all the variables and their values 
   seperated by &lt;br /&gt;.
   */
  this.toString = function ()
  {
    var breakStr = "<br />";

    return "Name: " + this.getName() + breakStr + "Emission: " + this.getEmission() + breakStr +
      "Ambient: " + this.getAmbient() + breakStr + "Diffuse: " + this.getDiffuse() + breakStr +
      "Specular: " + this.getSpecular() + breakStr + "Shininess: " + this.getShininess();
  }

  /**
   @private
   
   @param color
   */
  this.assertColor = function (color)
  {
    if (color instanceof Array && color.length == 3)
    {
      return true;
    }
    else
    {
      c3dl.debug.logWarning("Invalid argument passed to material set* method." + 
        "Color values must be arrays with exactly 3 elements.");
      return false;
    }
  }
}