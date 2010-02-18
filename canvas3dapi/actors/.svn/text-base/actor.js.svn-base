/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
	@class c3dl.Actor is a base class for 3D objects.
*/
c3dl.Actor = function()
{
	// Raw Position Values
	this.left	    = c3dl.makeVector(1.0, 0.0, 0.0); // Left vector
	this.up		    = c3dl.makeVector(0.0, 1.0, 0.0); // Up Vector
	this.dir		= c3dl.makeVector(0.0, 0.0, 1.0); // Forward Vector
	this.pos	    = c3dl.makeVector(0.0, 0.0, 0.0); // Position
	this.scaleVec	= c3dl.makeVector(1.0, 1.0, 1.0); // Scale
	
	// Delta Values for Animations
	this.linVel		= c3dl.makeVector(0.0, 0.0, 0.0); // Animation of positions
	this.angVel		= c3dl.makeVector(0.0, 0.0, 0.0); // Animations of rotation around (side Vector, up Vector, dir Vector)
	
	this.name = "unnamed";
}
	
// -------------------------------------------------------

// Getters

/**
	Get the position of the Actor relative to the world origin.

	@returns {Array} The position of the Actor.
*/
c3dl.Actor.prototype.getPosition = function()
{
	return c3dl.makeVector(this.pos[0], this.pos[1], this.pos[2]); 
}

/**
	The the Up Vector of the actor.

	@returns {Array} The up Vector of the actor.
*/
c3dl.Actor.prototype.getUp = function()
{
	return c3dl.makeVector(this.up[0], this.up[1], this.up[2]); 
}

/**
	Get the direction of the actor, where the actor is 
	'pointing' or looking'.

	@returns {Array} The direction of the actor.
*/
c3dl.Actor.prototype.getDirection = function()
{
	return c3dl.makeVector(this.dir[0], this.dir[1], this.dir[2]); 
}

/**
	Get the left Vector of the actor.

	@returns {Array} The left Vector of the actor.
*/
c3dl.Actor.prototype.getLeft = function()
{
	return c3dl.makeVector(this.left[0], this.left[1], this.left[2]); 
}

/**
	Get the linear velocity of the Actor.

	@returns {Array} The linear velocity of the Actor.
*/
c3dl.Actor.prototype.getLinearVel = function()
{
	return c3dl.makeVector(this.linVel[0], this.linVel[1], this.linVel[2]); 
}

/**
	Get the angular velocity of the Actor.

	@returns {Array} The angular velocity of the Actor.
*/
c3dl.Actor.prototype.getAngularVel = function()
{
	return c3dl.makeVector(this.angVel[0], this.angVel[1], this.angVel[2]); 
}

/**
	Get the scale factor of the Actor.  It has a default value 
	of (1,1,1) when created.

	@returns {Array} The scale amount of the Actor.
*/
c3dl.Actor.prototype.getScale = function()
{
	return c3dl.makeVector(this.scaleVec[0], this.scaleVec[1], this.scaleVec[2]);
}

/**
       Get the transformation of this node. Keep in mind that
       if this node is 'animated', the matrix will be changing with 
       each update(). In that case, the matrix this function returns
       will the the state the matrix is in at the time the function is called.
       
       @return {Array}
*/
c3dl.Actor.prototype.getTransform = function()
{
	var mat = c3dl.makePoseMatrix(this.left, this.up, this.dir, this.pos);

	var smat = c3dl.makeMatrix();
	c3dl.setMatrix(smat, this.scaleVec[0], 0, 0, 0,
								0, this.scaleVec[1], 0, 0,
								0, 0, this.scaleVec[2], 0,
								0, 0, 0, 1 );
						   
	mat = c3dl.multiplyMatrixByMatrix(mat, smat);

	return mat;
}

/**
	Get the name of this actor.
	
	@returns {String} actor's name
*/
c3dl.Actor.prototype.getName = function()
{
	return this.name;
}

// Setters	

/**
	Set the transformation of this actor.

	@param {Array} mat
*/
c3dl.Actor.prototype.setTransform = function(mat)
{
	this.left = c3dl.makeVector(mat[0], mat[1], mat[2]);
	this.up = c3dl.makeVector(mat[4], mat[5], mat[6]);
	this.dir = c3dl.makeVector(mat[8], mat[9], mat[10]);
	this.pos = c3dl.makeVector(mat[12], mat[13], mat[14]);
}

/**
*/
c3dl.Actor.prototype.resetTransform = function()
{
	this.angVel = c3dl.makeVector(0.0, 0.0, 0.0);
	this.linVel = c3dl.makeVector(0.0, 0.0, 0.0);

	this.left = c3dl.makeVector(1.0, 0.0, 0.0);
	this.up   = c3dl.makeVector(0.0, 1.0, 0.0);
	this.dir  = c3dl.makeVector(0.0, 0.0, 1.0);
	this.pos  = c3dl.makeVector(0.0, 0.0, 0.0);
}



/**
	Scale the  Actor relative to its current scaling value.	
	Attempts to scale the x, y or z values of the Actor less 
	than or equal to zero will be ignored.

	@param {Array} scaleVec The amount to scale the Actor.
*/
c3dl.Actor.prototype.scale = function(scaleVec)
{
	if ( c3dl.isValidVector(scaleVec))
	{
		// none of the values should be less than or equal to zero
		if(	scaleVec[0]  > 0.0 && scaleVec[1]  > 0.0 && scaleVec[2]  > 0.0)
		{				
			this.scaleVec = [	this.scaleVec[0] * scaleVec[0], 
								this.scaleVec[1] * scaleVec[1], 
								this.scaleVec[2] * scaleVec[2]];
		}			
	}
	else
	{
		c3dl.debug.logWarning('Actor::scale() called with a parameter that\'s not a vector');
	}
}

/**
	Set the new location of the Actor.

	@param {Array} vecPos A vector containing the new location for the actor.
*/
c3dl.Actor.prototype.setPosition = function( vecPos )
{
	if (c3dl.isValidVector(vecPos))
	{
		this.pos = vecPos;
	}
	else
	{
		c3dl.debug.logWarning("Actor::setPosition() called with a parameter that's not a vector");
	}
}

/**
	Move the object relative to where it is currently, not relative 
	to the origin.

	@param {Array} translation A vector which represents 
	how far away to move the actor from its current location.
*/
c3dl.Actor.prototype.translate = function( translation )
{
	this.pos = c3dl.addVectors(this.pos, translation);
}


/**
	Set the point in space where the Actor will look at (No Animation).

	@param {Array} newVec
*/	
c3dl.Actor.prototype.setForward = function(newVec)
{
	if (c3dl.isValidVector(newVec))
	{
		// Figure out the direction of the point we are looking at
		this.dir = this.pos;
		c3dl.subtractVectors(this.dir,newVec, this.dir);
		c3dl.normalizeVector(this.dir);

		// Adjust the Up and Left vectors accordingly
		c3dl.vectorCrossProduct(this.up, this.dir, this.left);
		c3dl.normalizeVector(this.left);
		c3dl.vectorCrossProduct(this.dir, this.up, this.up);
		c3dl.normalizeVector(this.up);
	}
	else
	{
		c3dl.debug.logWarning('Actor::setForward() called with a parameter that\'s not a vector');
	}
}

/**
	Set the orientation of Up (No Animation)

	@param {Array} newVec
*/
c3dl.Actor.prototype.setUpVector = function(newVec)
{
	if (c3dl.isValidVector(newVec))
	{
		this.up = newVec;
	}
	else
	{
		c3dl.debug.logWarning('Actor::setUpVector() called with a parameter that\'s not a vector');
	}
}

/**
	Set a new Linear Velocity that will be added to the Position on every update

	@param {Array} newVec
*/
c3dl.Actor.prototype.setLinearVel = function(newVec)
{
	if (c3dl.isValidVector(newVec))
	{
		this.linVel = newVec;
	}
	else
	{
		c3dl.debug.logWarning('Actor::setLinearVel() called with a parameter that\'s not a vector');
	}
}

/**
  Set a new Angular Veclocity that will be added to the rotation on 
  every update.

  @param {Array} newVec
*/
c3dl.Actor.prototype.setAngularVel = function(newVec)
{
	if (c3dl.isValidVector(newVec))
	{
		this.angVel = newVec;
	}
	else
	{
		c3dl.debug.logWarning("Actor's setAngularVel() called with a parameter that's not a vector");
	}
}

/**
	Set the name of this actor.
	
	@param {String} name The new name of for this actor.
*/
c3dl.Actor.prototype.setName = function(name)
{
	this.name = name;
}

// -------------------------------------------------------

/**
	Rotate Actor on an axis which is centered on the position of 
	the Actor.

	@param {Array} axisVec
	@param {float} angle in radians.
*/
c3dl.Actor.prototype.rotateOnAxis = function(axisVec, angle)
{
	var rotateOnAxisQuat = c3dl.makeQuat(0, 0, 0, 0);
	var rotateOnAxisMat = c3dl.makeZeroMatrix();

	if ( !c3dl.isValidVector(axisVec) )
	{
		c3dl.debug.logWarning('Actor::rotateOnAxis() called with the first parameter not a vector');
		return;
	}
	if (isNaN(angle))
	{
		c3dl.debug.logWarning('Actor::rotateOnAxis() called with the second parameter not a number');
		return;
	}
	if( angle == 0)
	{
		return;
	}

	// Create a proper Quaternion based on location and angle
	c3dl.axisAngleToQuat(axisVec, angle, rotateOnAxisQuat);

	// Create a rotation Matrix out of this quaternion
	rotateOnAxisMat = c3dl.quatToMatrix(rotateOnAxisQuat);

	// Apply changes to the remaining vectors
	//
	c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.dir, this.dir);
	c3dl.normalizeVector(this.dir);

	c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.left, this.left);
	c3dl.normalizeVector(this.left);

	c3dl.multiplyMatrixByVector(rotateOnAxisMat, this.up, this.up);
	c3dl.normalizeVector(this.up);
}

/**
	Rotate around the Up Vector by a hard amount (No Animation)

	@param {float} angle in radians.
*/
c3dl.Actor.prototype.yaw = function(angle)
{
	if(angle != 0)
	{
		this.rotateOnAxis(this.up, angle);
	}
}

/**
	Rotate around the Dir Vector by a hard amount (No Animation)

	@param {float} angle in radians.
*/
c3dl.Actor.prototype.roll = function(angle)
{
	if(angle != 0)
	{
		this.rotateOnAxis(this.dir, angle);
	}
}

/**
	Rotate around the Side Vector by a hard amount (No Animation)

	@param {float} angle in radians.
*/
c3dl.Actor.prototype.pitch = function(angle)
{
	if(angle != 0 )
	{
		this.rotateOnAxis(this.left, angle);
	}
}	

/**
	@private
	
	Called automatically. Update animations, etc.

	@param {float} timeStep
*/
c3dl.Actor.prototype.update = function(timeStep)
{
	// if update took longer than 1/2 a second, it was
	// probably the GC, so don't apply angular velocities
	// since that will change the directions.
	if(timeStep < 500)
	{
		// Add a velocity to the position
		var velVec = this.linVel;
		c3dl.multiplyVector(velVec, timeStep);
		c3dl.addVectors(this.pos, velVec, this.pos);

		// Apply some rotations to the orientation from the angular velocity
		this.pitch(this.angVel[0] * timeStep);
		this.yaw(this.angVel[1] * timeStep);
		this.roll(this.angVel[2] * timeStep);
	}
}

/**
	@private
*/
c3dl.Actor.prototype.getCopy = function()
{
	var actor = new c3dl.Actor();
	actor.clone(this);
	return actor;
}


/**
*/
c3dl.Actor.getObjectType = function()
{
	return c3dl.COLLADA;
}
	
/**
	@private
*/
c3dl.Actor.prototype.clone = function(other)
{
	this.left = c3dl.copyVector(other.left);
	this.up = c3dl.copyVector(other.up);
	this.dir = c3dl.copyVector(other.dir);
	this.pos = c3dl.copyVector(other.pos);
	this.scaleVec = c3dl.copyVector(other.scaleVec);
	this.linVel = c3dl.copyVector(other.linVel);
	this.angVel = c3dl.copyVector(other.angVel);
	this.name = other.name;
}
