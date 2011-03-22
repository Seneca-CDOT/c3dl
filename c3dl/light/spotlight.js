/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class
 
 A spotlight is a PositionalLight which can have a 'cone' of light used to 
 restrict what objects or parts of an object get lit.  All vertices which 
 fall inside the code are lit.
 
 One application of using a spotlight is making a headlight effect.
 @see c3dl.PositionalLight
 @augments c3dl.Light
 @augments c3dl.PositionalLight	
 */
c3dl.SpotLight = c3dl.inherit(c3dl.PositionalLight, function () {
  c3dl._superc(this);
  // this will be multiplied by 2 within our shader. 180 is the default OpenGL 
  // value for cutoff.  So we are starting off which a Positional light 
  // since there is no light 'cone'.
  this.cutoff = 180;

  // override the type
  this.type = c3dl.SPOT_LIGHT;

  // the direction where the spot light is pointing.
  this.direction = c3dl.makeVector(0, 0, -1);

  // how concentrated is the light?
  // use the OpenGL default value of zero to indicate uniform 
  // light distribution.
  this.exponent = 0;

  /**
   The cutoff value defines the spread of the cone of the spotlight. The
   value will either be 180 degrees or will range from 0 to 90 degrees. If 
   the value is 180, the spotlight will not have a cone.
   
   @returns {float} the cutoff value.
   */
  this.getCutoff = function ()
  {
    return this.cutoff;
  }

  /**
   Get the direction the spotlight is pointing which will be unit
   length.
   
   @returns {Array} the direction where the spotlight is
   pointing which will be unit length.
   */
  this.getDirection = function ()
  {
    return c3dl.copyVector(this.direction);
  }

  /**
   Get the intensity distribution of light within the cone of light the
   spotlight creates. Higher exponents result in a more focused light.
   
   @returns {float} Exponent will range from 0 to 128 inclusive.
   */
  this.getExponent = function ()
  {
    return this.exponent;
  }

  /**
   The cutoff defines the spread (angle) of the cone of the spotlight. 
   If the angle between the direction of the light and direction of spotlight
   to the vertex being lit is less than the cutoff, the vertex will be lit.
   
   @param {float} cutoff Measured in degrees. Must either be equal 
   to 180 or range between 0 and 90.
   */
  this.setCutoff = function (cutoff)
  {
    if ((cutoff >= 0 && cutoff <= 90) || cutoff == 180)
    {
      this.cutoff = cutoff;
    }
  }

  /**
   Set the direction of the spotlight. The 'dir' argument will be scaled to
   a unit vector before being assigned if not already unit length.
   
   @param {Array} dir Direction the spotlight is pointing. Will be scaled 
   to a unit vector before being assigned if not already unit length.
   */
  this.setDirection = function (dir)
  {
    this.direction = c3dl.normalizeVector(dir);
  }

  /**
   Set the intensity distribution of the light within the cone the spotlight
   creates. Higher exponent values will result in a more focused light.
   
   @param {float} exponent Must range from 0 to 128 inclusive.
   */
  this.setExponent = function (exponent)
  {
    if (exponent >= 0 && exponent <= 128)
    {
      this.exponent = exponent;
    }
  }
});