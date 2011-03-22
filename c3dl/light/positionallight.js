/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class
 A PositionalLight inherits from Light. Unlike DirectionalLight,
 a PositionalLight can have an attenuation factor.
 @see c3dl.Light
 @augments c3dl.Light
 */
c3dl.PositionalLight = c3dl.inherit(c3dl.Light, function () {
  c3dl._superc(this);
  this.position = c3dl.makeVector(0, 0, 0);

  // use OpenGL default attenuation factors.
  // element 0 is for constant attenuation
  // element 1 is for linear attenuation
  // element 2 is for quadratic attenuation
  this.attenuation = c3dl.makeVector(1, 0, 0);

  // need to override the type the abstract class set.
  this.type = c3dl.POSITIONAL_LIGHT;

  /**	 
   Get the attenuation factors of this light. This is an array of three values
   which include constant attenuation, linear attenuation and quadratic attenuation.
   
   @returns {Array} The attenuation factors
   */
  this.getAttenuation = function ()
  {
    return c3dl.copyVector(this.attenuation);
  }

  /**
   Get the position of the light.
   
   @returns {Array} the position of the light.
   */
  this.getPosition = function ()
  {
    return c3dl.copyVector(this.position);
  }

  /**
   Set the attenuation factors of this light.
   
   the attenuation factor is calculated:
   
   attenuation factor = 1 / (C + L*D + Q*D^2) <br />
   C = constant attenuation, 0th element <br />
   L = linear attenuation, 1st element <br />
   Q = quadratic attenuation, 2nd element<br />
   D = distance between light and vertex.<br />
   
   @param {Array} attenuation
   */
  this.setAttenuation = function (attenuation)
  {
    this.attenuation[0] = attenuation[0];
    this.attenuation[1] = attenuation[1];
    this.attenuation[2] = attenuation[2];
  }

  /**
   Set the position of this light.
   
   @param {Array} Position of the light relative to world space.
   */
  this.setPosition = function (vec)
  {
    this.position[0] = vec[0];
    this.position[1] = vec[1];
    this.position[2] = vec[2];
  }
});
