/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// Written By:		Mark Paruzel
// Date:			March 23, 2008
// Project:			Canvas 3D Library
// -----------------------------------------------------------------------------
// NOTE: This group of functions act upon an array of three values which
//       represent a vector in 3D space. The values of the array each hold the
//       values of the X, Y, and Z coordinates on each axis. 
// -----------------------------------------------------------------------------
/**
 Check to see if vector 'vecArr' is valid.  That is, if it 
 has the correct amount of components, is the right type and has 
 the correct types.
 
 @param {Array} vecArr The vector to check.
 
 @return {boolean} True if the 'vecArr' is valid, false otherwise.
 */
c3dl.isValidVector = function (vecArr)
{
  // Check if the value being passed is an array
  if (vecArr instanceof Array || vecArr instanceof C3DL_FLOAT_ARRAY)
  {
    // Need to allow 4D vectors since last element of 
    // vector may not always be 1, and we can't assume
    // user wants w = 1.
    if (vecArr.length == 3 || vecArr.length == 4)
    {
      for (var i = 0, len = vecArr.length; i < len; i++)
      {
        // Check for bad values
        if (isNaN(vecArr[i])) return false;
      }

      return true;
    }
  }

  return false;
}

/**
 Copy the Vector 'srcVec' and return it.
 
 @param {Array} srcVec The vector to copy.
 
 @returns {Array} A copy of the 'srcVec' vector.
 */
c3dl.copyVector = function (srcVec, dest)
{
  if (dest == undefined) {
    return V3.clone(srcVec);
  }
  else {
    dest[0] = srcVec[0];
    dest[1] = srcVec[1];
    dest[2] = srcVec[2];
  }
}

/**
 Copy the components of srcVec Vector to destVec Vector.
 
 @param {Array} srcVec The source Vector to copy from.
 @param {Array} destVec The destination Vector to copy to.
 */
c3dl.copyVectorContents = function (srcVec, destVec)
{
 destVec= V3.clone(srcVec);
}

c3dl.addVectorComponent = function (srcVec, newComponent) {
  var newVec = new C3DL_FLOAT_ARRAY(4);
  newVec[0]=srcVec[0]
  newVec[1]=srcVec[1]
  newVec[2]=srcVec[2]
  newVec[3]=newComponent
  return newVec;
}
/**
 Create a 3D Vector from the given 'newX', 'newY' 
 and 'newZ' arguments.
 
 @param {float} newX The x value.
 @param {float} newY The y value.
 @param {float} newZ The z value.
 
 @returns {Array} A 3D Vector with the components specified by the
 three arguments.
 */
c3dl.makeVector = function (newX, newY, newZ)
{
  return  new C3DL_FLOAT_ARRAY([!isNaN(newX) ? parseFloat(newX) : 0.0, !isNaN(newY) ? parseFloat(newY) : 0.0, !isNaN(newZ) ? parseFloat(newZ) : 0.0]);
}

/**
 Normalize the given Vector. A normalized Vector points in the same direction
 as the original, yet has a length of 1.
 
 @param {Array} vec The Vector to normalize.
 
 @returns {Array} The normalized Vector if the argument is a Vector 
 object, otherwise returns nulls.
 */
c3dl.normalizeVector = function (vec)
{ 
  if (vec.length === 4) {
	  var compr = vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2];
	  // Sometimes this can become invalid
	  var ln = Math.sqrt(compr);
	  // If the length is greater then zero, return the normalized Vector
	  // Normalization
	  vec[0] = vec[0] != 0.0 ? vec[0] / ln : 0.0;
	  vec[1] = vec[1] != 0.0 ? vec[1] / ln : 0.0;
	  vec[2] = vec[2] != 0.0 ? vec[2] / ln : 0.0;
	  vec[3] = vec[3] != 0.0 ? vec[2] / ln : 0.0;
	  return vec;
  }
  else {
	  var compr = vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2];
	  // Sometimes this can become invalid
	  var ln = Math.sqrt(compr);
	  // If the length is greater then zero, return the normalized Vector
	  // Normalization
	  vec[0] = vec[0] != 0.0 ? vec[0] / ln : 0.0;
	  vec[1] = vec[1] != 0.0 ? vec[1] / ln : 0.0;
	  vec[2] = vec[2] != 0.0 ? vec[2] / ln : 0.0;
	  return vec;
  }
}

/**
 Get the dot product of two vectors.
 
 @param {Array} vecOne The first vector.
 @param {Array} vecTwo The second vector.
 
 @returns {float} The dot product of the two specified Vectors. If 
 one of the Vectors was invalid, returns null.
 */
c3dl.vectorDotProduct = function (vecOne, vecTwo, dest) {
  return V3.dot(vecOne,vecTwo, dest);
}

/**
 Get the result of projecting vector 'vecOne' onto 'vecTwo'.
 
 @param {Array} vecOne
 @param {Array} vecTwo
 
 @returns {Array} result of projecting vector 'vecOne' onto 'vecTwo'.
 */
c3dl.vectorProject = function (vecOne, vecTwo) {
  //           vecOne . vecTwo
  // result =  ---------------- x vecTwo
  //           vecTwo . vecTwo
  // get the top and bottom dot product
  var topDot = V3.dot(vecOne, vecTwo);
  var bottomDot = V3.dot(vecTwo, vecTwo);

  return c3dl.multiplyVector(vecTwo, topDot / bottomDot);
}

/**
 Get the cross product of two Vectors.  The cross product is a Vector which
 is perpendicular to both the first and second vector.
 
 @param {Array} vecOne The first vector.
 @param {Array} vecTwo The second vector.
 
 @returns {Array} The cross product of 'vecOne' and 'vecTwo'.
 */
c3dl.vectorCrossProduct = function (vecOne, vecTwo, dest) {
return V3.cross(vecOne, vecTwo, dest);
}

/**
 Get the length of the vector 'vec'.
 
 @param {Array} vec The vector for which the length is needed.
 
 @return {float} The length of the vector 'vec'.
 */
c3dl.vectorLength = function (vec) {
  return V3.length(vec);
}

/**	
 Get the squared length of the vector 'vec'.
 
 @param {Array} vec The vector for which the squared length is required.
 
 @returns {float} The 'length' of each component of 'vec' added together.
 */
c3dl.vectorLengthSq = function (vec) {
  return V3.lengthSquared(vec);
}

/**
 Add two Vectors together and place the result in dest and 
 return it.
 
 @param {Array} vecOne The first Vector.
 @param {Array} vecTwo The second Vector.
 @param {Array} [dest] A vector which will hold the result.
 
 @returns {Array} The resultant Vector if both were valid 
 Vectors, otherwise returns null.
 */
c3dl.addVectors = function (vecOne, vecTwo, dest) {
  return V3.add(vecOne, vecTwo, dest);
}

/**
 Subtract vector 'vecTwo' from vector 'vecOne'.
 
 @param {Array} vecOne The Vector to subtract from.
 @param {Array} vecTwo The Vector which is used to subtract.
 @param {Array} [dest] The Vector which will contains the resultant.
 
 @returns {Array} The resultant Vector, which is the first vector 
 minus the second. If one of the vector were not valid, returns null.
 */
c3dl.subtractVectors = function (vecOne, vecTwo, dest) {
  return V3.sub(vecOne, vecTwo, dest);
}

/**
 Multiply the specified vector by the scalar.  Place the result
 in 'dest' and return it.  This operation will multiply the scalar 
 by each component of the vector, effectively scaling it, making it 
 geometrically longer or shorter.  If the scalar value is negative, 
 the result will point in the opposite direction of 'vec'.
 
 @param {Array} vec The vector to scale.
 @param {float} scalar The amount to scale the vector.
 @param {Array} [dest] A vector which will hold
 the result if provided.
 
 @returns {Array} A vector 'vec' which has been scaled by 'scalar' or
 returns null if 'vec' was invalid or 'scalar' was not a number.
 */
c3dl.multiplyVector = function (vec, scalar, dest) {
  return V3.scale(vec, scalar, dest);
}

/**
 Divide each component of 'vec' and store into dest and return it.
 
 @param {Array} vec The vector to divide.
 @param {float} scalar The amount to scale 'vec'.
 @param {Array} [dest] A vector which will hold
 the result if provided.
 
 @returns {Array} A vector 'vec' which has been divided by 'scalar' or
 returns null if 'vec' was invalid or 'scalar' was NaN.
 */
c3dl.divideVector = function (vec, scalar, dest) {
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(3);
  }
  dest[0] = vec[0] / scalar;
  dest[1] = vec[1] / scalar;
  dest[2] = vec[2] / scalar;

  return dest;
}


/**
 Multiply two Vectors together, this is not a dot product or a cross 
 product operation.  Instead, each corresponding component of each of 
 the vectors are multiplied together
 
 @param {Array} vecOne Vector one.
 @param {Array} vecTwo Vector two.
 @param {Array} [dest] The destination will contain the result of 
 the operation.
 
 @returns {Array} A Vector which is the result of multiplying each 
 component together or null if one of the vectors where not valid 
 Vectors.
 */
c3dl.multiplyVectorByVector = function (vecOne, vecTwo, dest) {
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(3);
  }
  dest[0] = vecOne[0] * vecTwo[0];
  dest[1] = vecOne[1] * vecTwo[1];
  dest[2] = vecOne[2] * vecTwo[2];
  return dest;
}
c3dl.divideVectorByVector = function (vecOne, vecTwo, dest) {
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(3);
  }
  dest[0] = vecOne[0] / vecTwo[0];
  dest[1] = vecOne[1] / vecTwo[1];
  dest[2] = vecOne[2] / vecTwo[2];
  return dest;
}

/**
 Compare two vectors for equality. Two Vectors are said to be equal 
 if all their components are equal.
 
 @param {Array} vecOne Vector one.
 @param {Array} vectwo Vector two.
 
 @return {boolean} True if both vectors are equal, null otherwise.
 */
c3dl.isVectorEqual = function (vecOne, vecTwo) {
  // add tolerance to calculations
  return (vecOne[0] === vecTwo[0] && vecOne[1] === vecTwo[1] && vecOne[2] === vecTwo[2]);
}

/**
 Check to see if a Vector is a zero vector, that is a vector with a 
 length of zero, or it has components close enough to zero to be 
 considered zero.  'Close enough' is considered true if the components
 lie between the -TOLERANCE and +TOLERANCE constant.
 
 @param {Array} vec The Vector to check.
 
 @return {boolean} True if the vector is considered a zero vector, false otherwise.
 */
c3dl.isVectorZero = function (vec) {
  // Check for a tolerance
  return ((-c3dl.TOLERANCE < vec[0] && vec[0] < c3dl.TOLERANCE) && (-c3dl.TOLERANCE < vec[1] && vec[1] < c3dl.TOLERANCE) && (-c3dl.TOLERANCE < vec[2] && vec[2] < c3dl.TOLERANCE));
}


/**
 Get the angle (in degrees) between two vectors.
 
 @param {Array} vecOne The first vector.
 @param {Array} vecTwo The second vector.
 
 @return {float} The angle in degrees between the two vectors.
 */
c3dl.getAngleBetweenVectors = function (vecOne, vecTwo)
{
  var dot = c3dl.vectorDotProduct(vecOne, vecTwo);
  //force dot into acceptable range.
  if(dot > 1 && dot < 1+c3dl.TOLERANCE) {
    dot = 1;
  }
  else if(dot < -1 && dot > -1-c3dl.TOLERANCE) {
    dot = -1;
  }
  return c3dl.radiansToDegrees(Math.acos(dot));
}
