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
c3dl.PositionalLight = function()
{
	this.position = [0,0,0];
	
	// use opengl default attenuation factors.
	// element 0 is for constant attenuation
	// element 1 is for linear attenuation
	// element 2 is for quadratic attenuation
	this.attenuation = [1,0,0];
	
	// need to override the type the abstract class set.
	this.type = c3dl.POSITIONAL_LIGHT;

	/**	 
		Get the attenuation factors of this light. This is an array of three values
		which include constant attenuation, linear attenuation and quadratic attenuation.

		@returns {Array} The attenuation factors
	*/
	this.getAttenuation = function()
	{
		return [this.attenuation[0], this.attenuation[1],this.attenuation[2]];
	}

	/**
		Get the position of the light.

		@returns {Array} the position of the light.
	*/
	this.getPosition = function()
	{
		return [this.position[0], this.position[1], this.position[2]];
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
	this.setAttenuation = function(attenuation)
	{
		this.attenuation = attenuation;
	}

	/**
		Set the position of this light.

		@param {Array} Position of the light relative to world space.
	*/
	this.setPosition = function(vec)
	{
		if(c3dl.isValidVector(vec))
		{
			this.position = vec;
		}
	}
}

c3dl.PositionalLight.prototype = new c3dl.Light;