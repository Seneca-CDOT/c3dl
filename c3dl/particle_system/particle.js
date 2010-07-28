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
   
   @returns {float}
   */
  this.getAge = function ()
  {
    return this.age;
  }

  /**
   @private	
   */
  this.getPosition = function ()
  {
    return c3dl.copyVector(this.position);
  }

  /**
   @private	
   */
  this.getVelocity = function ()
  {
    return c3dl.copyVector(this.velocity);
  }

  /**
   @private
   Get how long this particle is set to live for.
   
   @returns {float}
   */
  this.getLifetime = function ()
  {
    return this.lifetime;
  }

  /**
   @private	
   Get the color of this particle.
   
   @returns {Array}
   */
  this.getColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.color);
  }

  /**
   @private
   */
  this.getSize = function ()
  {
    return this.size;
  }

  /**
   */
  this.setSize = function (s)
  {
    this.size = s;
  }

  /**
   @private	
   */
  this.isAlive = function ()
  {
    return this.alive;
  }

  /**
   @private
   */
  this.getTransform = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.transform);
  }

  /**
   @private
   */
  this.getVertices = function ()
  {
    return new C3DL_FLOAT_ARRAY(verts);
  }

  /**
   @private	
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
   */
  this.setVelocity = function (velocity)
  {
    this.velocity[0] = velocity[0];
	this.velocity[1] = velocity[1];
	this.velocity[2] = velocity[2];
  }

  /**
   @private
   */
  this.setPosition = function (position)
  {
    this.transform[12] = position[0];
    this.transform[13] = position[1];
    this.transform[14] = position[2];
  }

  /**
   @private
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
   */
  this.setAlive = function (alive)
  {
    this.alive = alive;
  }

  /**
   @private
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
   
   @param timeStep
   */
  this.update = function (timeStep)
  {
  }

  /**
   @private
   */
  this.render = function (glCanvas3D)
  {
  }
}