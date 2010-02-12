/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
	@private
    Find the smallest number that's a power of 2 that's bigger
    than the given number.

	@param {int} number The base number which the next power of two 
	number must be found.  For example:
	<pre>
		var i = roundUpToNextPowerOfTwo(3);
		// i is now 4

		i = roundUpToNextPowerOfTwo(4);
		// i is now 4

		i = roundUpToNextPowerOfTwo(9);
		// i is now 16
	</pre>

	@returns {int} A number which is greater or equal to 'number'
	which is the closest power of two which exists.
*/
c3dl.roundUpToNextPowerOfTwo = function(number)
{
	var i = 1;
	
	while( i < number)
	{
		i *= 2;
	}

	return i;
}

/**
	Inverse of a square root.

	@param {float} num

	@return {float} the inverse square root of num or 0 ir num was not a 
	number.
*/
c3dl.invSqrt = function(num)
{
	if (!isNaN(num))
	{
		// We have to do this ourselves since javascript does not have it.
		return 1 / Math.sqrt(num);
	}
	
	c3dl.debug.logWarning('invSqrt() caled with a parameter that\'s not a number');
	
	return 0;
}

/**
	gluLookAt Implementation

	@param {Array} eye The location of the camera.
	@param {Array} center Where the camera is looking at.
	@param {Array} up A Vector which represents the camera's up
	vector.

	@returns {Array} the lookat matrix or null if one of the arguments were
	not valid Vectors.
*/
c3dl.lookAt = function(eye, center, up)
{
	if ( c3dl.isValidVector(eye) && c3dl.isValidVector(center) && c3dl.isValidVector(up))
	{
		// Figure out the Orientation
		var z = c3dl.subtractVectors(eye, center, null);
		var x = c3dl.vectorCrossProduct(up, z, null);
		var y = c3dl.vectorCrossProduct(z, x, null);
		c3dl.normalizeVector(z);
		c3dl.normalizeVector(y);
		c3dl.normalizeVector(x);

		// makeMatrix expects values to be in column-major
		return c3dl.makeMatrix( x[0], y[0], z[0], 0,
								x[1], y[1], z[1], 0,
								x[2], y[2], z[2], 0,
								0,    0,    0,   1);			
	}
	
	c3dl.debug.logWarning('lookAt() called with a parameters that are not vectors');
	return null;
}

/**
	@private
	this function needs testing
	
	Create an orthographic matrix from the specified arguments.

	@param {float} left The coordinate of the left vertical clipping plane.
	@param {float} right The coordinate of the right vertical clipping plane.
	@param {float} bottom The coordinate of the bottom horizontal clipping 
	plane.
	@param {float} top The coordinate of the top horizontal clipping plane.
	@param {float} znear The distance to the near clipping plane.
	@param {float} zfar The distance to the far clipping plane.

	@returns {Array} an orthographic matrix defined by the arguments.
*/
c3dl.makeOrtho = function(	left, right,
							bottom, top,
							znear, zfar)
{
    var tx = -(right + left) / (right - left);
    var ty = -(top + bottom) / (top - bottom);
    var tz = -(zfar + znear) / (zfar - znear);

	return c3dl.makeMatrix(
		2 / (left - right), 0, 0,  tx,
		0, 2 / (top - bottom), 0,  ty,
		0, 0, -2 / (zfar - znear), tz,
		0, 0, 0, 1);
}

/**
	Create a perspective projection matrix.

	@param {float} fovy The field of view angle in degrees in the Y 
	direction.
	@param {float} aspect The aspect ratio
	@param {float} znear The distance from the viewer to the near clipping
	plane.
	@param {float} zfar The distance from the viewer to the far clipping 
	plane.

	@returns {Array} A perspective projection matrix. 
*/
c3dl.makePerspective = function(fovy, aspect, znear, zfar)
{
	var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
	var ymin = -ymax;
	var xmin = ymin * aspect;
	var xmax = ymax * aspect;

	return c3dl.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

/**
	glFrustum Implementation
	
	@param {float} left The coordinate of the left vertical clipping plane.
	@param {float} right The coordinate of the right vertical clipping plane.
	@param {float} bottom The coordinate of the bottom horizontal clipping 
	plane.
	@param {float} top The coordinate of the top horizontal clipping plane.
	@param {float} znear The distance to the near clipping plane.
	@param {float} zfar The distance to the far clipping plane.

	@returns {Array} A perspective projection matrix.
*/
c3dl.makeFrustum = function(left, right,bottom, top,znear, zfar)
{
    var X = 2 * znear / (right - left);
    var Y = 2 * znear / (top - bottom);
    var A = (right + left) / (right - left);
    var B = (top + bottom) / (top - bottom);
    var C = -(zfar + znear) / (zfar - znear);
    var D = -2 * zfar * znear / (zfar - znear);
	
	// specify values in column major order
	return c3dl.makeMatrix(X, 0, 0, 0, 0, Y, 0, 0, A, B, C, -1, 0, 0, D, 0);
}

/**
	Convert 'rad' radians into degrees.

	@param {float} rad The value in radians to convert into degrees.

	@returns {float} The value of 'rad' radians converted to degrees.
*/
c3dl.radiansToDegrees = function(rad)
{
	return rad / (Math.PI * 2) * 360.0;
}

/**
	Convert 'deg' degrees into radians.

	@param {float} degrees The value in degrees to convert into radians.

	@returns {float} The value of 'deg' degrees converted to radians.
*/
c3dl.degreesToRadians = function(deg)
{
	return deg / 360.0 * (Math.PI * 2);
}

/**	
	Get a random value from min to max inclusive
	
	@param {num} min
	@param {num} max

	@returns {num} a random number from min to max.
*/
c3dl.getRandom = function(min, max)
{
	var norm = Math.random();
	return ((max-min)*norm) + min;
}
