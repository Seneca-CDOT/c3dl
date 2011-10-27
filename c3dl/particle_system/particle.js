/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 class Particle.
 */
c3dl.Particle = function ()
{
  // life properties
  this.age = 0;
  this.lifetime = 0;
  this.alive = false;

  // what the particle looks like
  this.color = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);
  this.size = 0;

  // how the particle moves and its location
  this.position = c3dl.makeVector(0, 0, 0);
  this.velocity = c3dl.makeVector(0, 0, 0);
  this.rotation = 0;
  this.vertices = new C3DL_FLOAT_ARRAY([1, -1, 0, -1, -1, 0, -1, 1, 0, 1, 1, 0]);

  this.transform = new C3DL_FLOAT_ARRAY([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  /**
   @private
   Get the age of this particle in seconds.
   
   @returns {float} How many seconds this particle has been alive for.
   */
  this.getAge = function ()
  {
    return this.age;
  }

  /**
   @private
   Get the position of this particle in 3d space.
   
   @returns {Array} This particle's position
   */
  this.getPosition = function ()
  {
    return c3dl.copyVector(this.position);
  }

  /**
   @private
   Get this particle's current velocity
   
   @returns {Array} This particle's current velocity
   */
  this.getVelocity = function ()
  {
    return c3dl.copyVector(this.velocity);
  }

  /**
   @private
   Get how long this particle is set to live for.
   
   @returns {float} The maximum lifetime of this particle, in seconds
   */
  this.getLifetime = function ()
  {
    return this.lifetime;
  }

  /**
   @private  
   Get the color of this particle.
   
   @returns {Array} The RGB values of this particle
   */
  this.getColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.color);
  }

  /**
   @private
   Get the size of this particle
   
   @returns {float} The current size of this particle
   */
  this.getSize = function ()
  {
    return this.size;
  }

  /**
   Set the size of this particle
   
   @param {float} s - The desired size of this particle
   */
  this.setSize = function (s)
  {
    this.size = s;
  }

  /**
   @private
   Determine whether this particle is currently active
   
   @returns {boolean} True if this particle is currently active, false otherwise.
   */
  this.isAlive = function ()
  {
    return this.alive;
  }

  /**
   @private
   Get the transformation matrix for this particle
   
   @returns {Array} This particles transformation matrix
   */
  this.getTransform = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.transform);
  }

  /**
   @private
   Get the vertices that make up the corners of this particle's quad.
   
   @returns {Array} The vertices of this particle's corners.
   */
  this.getVertices = function ()
  {
    return new C3DL_FLOAT_ARRAY(verts);
  }

  /**
   @private
   Manually change the age of this particle
   
   @param {float} The new age for this particle
   */
  this.setAge = function (age)
  {
    if (age >= 0)
    {
      this.age = age;
    }
  }

  /**
   @private
   Set the colour of this particle
   
   @param {Array} c - The RGBa values for this particle.
   */
  this.setColor = function (c)
  {
    this.color[0] = c[0];
    this.color[1] = c[1];
    this.color[2] = c[2];
    this.color[3] = c[3];
  }

  /**
   @private
   Set the velocity of this particle.
   
   @param {Array} velocity - The velocity of this particle in three dimensions.
   */
  this.setVelocity = function (velocity)
  {
    this.velocity[0] = velocity[0];
  this.velocity[1] = velocity[1];
  this.velocity[2] = velocity[2];
  }

  /**
   @private
   Set the position of this particle in 3d space
   
   @param {Array} position - The absolute coordinates for this particle
   */
  this.setPosition = function (position)
  {
    this.transform[12] = position[0];
    this.transform[13] = position[1];
    this.transform[14] = position[2];
  }

  /**
   @private
   Set the maximum lifespan for this particle
   
   @param {float} The lifespan of this particle (in seconds)
   */
  this.setLifetime = function (lifetime)
  {
    if (this.lifetime >= 0)
    {
      this.lifetime = lifetime;
    }
  }

  /**
   @private
   Set whether this particle is currently active or not.
   
   @param {boolean} alive - True if this particle should be alive, false otherwise.
   */
  this.setAlive = function (alive)
  {
    this.alive = alive;
  }

  /**
   @private
   Move this particle in 3d space
   
   @param {Array} trans - The amount to move, relative to the current position
   */
  this.translate = function (trans)
  {
    this.transform[12] += trans[0];
    this.transform[13] += trans[1];
    this.transform[14] += trans[2];
  }

  /**
   @private  
   Update the position of the particle.
   
   @param {float} timeStep - The amount of time elapsed since the last update
   */
  this.update = function (timeStep)
  {
  }

  /**
   @private
   Draw this object in the scene
   
   @param {context} glCanvas3D - The graphics rendering context
   */
  this.render = function (glCanvas3D)
  {
  }
}
