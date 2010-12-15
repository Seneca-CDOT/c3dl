/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class
 
 A DirectionalLight inherits from Light.  It does not have a position 
 such as a PositionalLight. It only has a direction. Think if a 
 directional light as being infinately far from the scene, but its light
 rays travelling in the direction specified. Since it has no position, 
 it will always light a side of an object.<br />
 <br />
 When specifying the direction, you are specifying where the light rays are going towards.<br />
 <br />
 A DirectionalLight is useful when a scene contains an 2D array of objects aligned in a square. If
 all the objects are to be light the same way, a directional light would be a good choice to add
 to the scene.
 @augments c3dl.Light
 */
c3dl.DirectionalLight = c3dl.inherit(c3dl.Light, function () {
  c3dl._superc(this);
  // WebGL will interpret the light as directional if
  // the last value specified for POSITION is 0 and
  // positional if the last value for POSITION is 1.
  // We use a 'direction' variable, but when given the light direction needs
  // to be specified, we just pass in our this.direction into the POSITION parameter.
  this.direction = c3dl.makeVector(0, 0, 1);
  this.type = c3dl.DIRECTIONAL_LIGHT;

  /**
   Get the direction of this light. The default direction of the light is [0,0,1].
   
   @returns {Array} the direction of the light which will be unit length.
   */
  this.getDirection = function ()
  {
    return c3dl.copyVector(this.direction);
  }

  /**
   Set the direction of this light. The 'dir' argument will be scaled to
   a unit vector before being assigned if not already unit length.
   
   @param {Array} dir Will be scaled to a unit vector before being assigned
   if not already unit length.
   */
  this.setDirection = function (dir)
  {
    this.direction = c3dl.normalizeVector(dir);
  }
});
