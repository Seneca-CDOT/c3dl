/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
	@private
	class Particle.
*/
c3dl.Particle = function()
{
	// life properties
	this.age = 0;
	this.lifetime = 0;
	this.alive = false;
	
	// what the particle looks like
	this.color = [0,0,0,0];
	this.size = 0;
	
	// how the particle moves and its location
	this.position = c3dl.makeVector(0,0,0);
	this.velocity = c3dl.makeVector(0,0,0);
  this.rotation = 0;
	this.vertices = [1,-1, 0,
                  -1,-1, 0,
                  -1, 1, 0,
                   1, 1, 0];

	this.transform = [	1,0,0,0,
						0,1,0,0,
						0,0,1,0,
						0,0,0,1];
	
	/**
		@private
		Get the age of this particle in seconds.

		@returns {float}
	*/				
	this.getAge  = function()
	{
		return this.age;
	}
	
	/**
		@private	
	*/
	this.getPosition = function()
	{
		return this.position;
	}

	/**
		@private	
	*/
	this.getVelocity = function()
	{
		return this.velocity;
	}
	
	/**
		@private
		Get how long this particle is set to live for.

		@returns {float}
	*/	
	this.getLifetime = function()
	{
		return this.lifetime;
	}
	
	/**
		@private	
		Get the color of this particle.

		@returns {Array}
	*/
	this.getColor = function()
	{    
    return [this.color[0], this.color[1], this.color[2], this.color[3]];
	}
		
	/**
		@private
	*/
	this.getSize = function()
	{
		return this.size;
	}
  
  /**
  */
  this.setSize = function(s)
  {
    this.size = s;
  }
	
	/**
		@private	
	*/
	this.isAlive = function()
	{
		return this.alive;
	}

	/**
		@private
	*/
	this.getTransform = function()
	{
		return this.transform;
	}
	
	/**
		@private
	*/	
	this.getVertices = function()
	{
		var verts = new Array();
		
		for (var i = 0; i < 12; i++) //18
		{
			verts.push(this.vertices[i] + this.position[i%3]);
		}

		return verts;
	}
	
	/**
		@private	
	*/
	this.setAge = function(age)
	{
		if(age >= 0)
		{
			this.age = age;
		}
	}
	
	/**
		@private
	*/
	this.setColor = function(c)
	{
		this.color[0] = c[0];
		this.color[1] = c[1];
		this.color[2] = c[2];
    this.color[3] = c[3];
	}
	
	/**
		@private
	*/
	this.setVelocity = function(velocity)
	{
		this.velocity = velocity;
	}

	/**
		@private
	*/
	this.setPosition = function(position)
	{
		this.transform[12] = position[0];
		this.transform[13] = position[1];
		this.transform[14] = position[2];
 	}

	/**
		@private
	*/
	this.setLifetime = function(lifetime)
	{
		if(this.lifetime >= 0 )
		{
			this.lifetime = lifetime;
		}
	}

	/**
		@private	
	*/
	this.setAlive = function(alive)
	{
		this.alive = alive;
	}
	
	/**
		@private
	*/
	this.translate = function(trans)
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
	this.update = function(timeStep)
	{
	}
	
	/**
		@private
	*/
	this.render = function(glCanvas3D)
	{		
	}
}
