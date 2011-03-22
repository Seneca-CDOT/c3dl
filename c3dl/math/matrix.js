/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
// Written By:	Mark Paruzel
// Date:		April 11, 2008
// Project:		Canvas 3D Library
// -----------------------------------------------------------------------------
// NOTE: This group of functions act upon an array of sixteen values which
//       represent a matrix orientation. How a Matrix Works:
//
//       - An Orientation uses the 3 Axis in a 3D world: Up, Forward and Left 
//         (Right handed system).
//       - A 4x4 Matrix adds in a Translation into the matrix along with an 
//         Orientation.
//
//			Matrix uses column-major order which means elements are listed column
//			first
// 
//       +-                             -+
//       |  Right.x, Up.x, Fwd.x, Pos.x  |
//       |  Right.y, Up.y, Fwd.y, Pos.y  |
//       |  Right.z, Up.z, Fwd.z, Pos.z  |
//       |  0.0,     0.0,  0.0,   1.0    |
//       +-                             -+
//
//       Array Indices:
//       +-               -+
//       |  0,  4,  8, 11  |
//       |  1,  5,  6, 12  |
//       |  2,  6,  9, 13  |
//       |  3,  7, 10, 15  |
//       +-               -+
// -----------------------------------------------------------------------------
/**
 Is the Matrix 'mat' is valid?  That is, does it contain 16
 values and are all the values numbers?
 
 @param {Array} mat The matrix to check.
 
 @returns {boolean} True if the object 'mat' is a matrix, 
 false otherwise.
 */
c3dl.isValidMatrix = function (mat)
{
  // Check if the value being passed is an array
  if (mat instanceof Array || mat instanceof MJS_FLOAT_ARRAY_TYPE)
  {
    // Must be array of 16 Values
    if (mat.length == 16)
    {
      for (var i = 0; i < 16; i++)
      {
        // Check for bad values
        if (isNaN(mat[i])) return false;
      }

      return true;
    }
  }

  return false;
}

/**
 Create an identity matrix. An identity matrix is a matrix in 
 which all the elements are zero, save on the main diagonal 
 where all elements are ones.<br />
 <br />
 Example:
 <pre>
 +-            -+
 |  1, 0, 0, 0  |
 |  0, 1, 0, 0  |
 |  0, 0, 1, 0  |
 |  0, 0, 0, 1  |
 +-            -+
 </pre>
 
 An identity matrix is equivalent to the number one in some respects, 
 that is multiplying matrix M by an identity matrix will yield M.
 Matrix multiplication with an identity matrix is one case in which
 matrix multiplication is commutative.
 M * I = M
 I * M = M
 <br />
 
 @returns {Array} An identity matrix.
 */
c3dl.makeIdentityMatrix = function ()
{
  return new C3DL_FLOAT_ARRAY([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
}


/**
 Create a Zero matrix, that is a matrix in which each component 
 of the matrix is zero.
 
 @returns {Array} A zero matrix.
 */
c3dl.makeZeroMatrix = function ()
{
  return new C3DL_FLOAT_ARRAY([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
}

/**
 Set the elements of a matrix.  Supply the values in column-major
 ordering.
 
 e[r][c], e01 = row 0, column 1
 
 @param {Array} mat The matrix to set
 @param {float} e00 Column 0, Row 0
 @param {float} e01 
 @param {float} e02 
 @param {float} e03 
 @param {float} e10 Column 1, Row 0
 @param {float} e11 
 @param {float} e12 
 @param {float} e13
 @param {float} e20 Column 2, Row 0
 @param {float} e21 
 @param {float} e22 
 @param {float} e23 
 @param {float} e30 Column 3, Row 0
 @param {float} e31 
 @param {float} e32 
 @param {float} e33 
 */
c3dl.setMatrix = function (mat, e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, 
  e30, e31, e32, e33)
{ 
  mat[0] = e00;
  mat[1] = e01;
  mat[2] = e02;
  mat[3] = e03;

  mat[4] = e10;
  mat[5] = e11;
  mat[6] = e12;
  mat[7] = e13;

  mat[8] = e20;
  mat[9] = e21;
  mat[10] = e22;
  mat[11] = e23;

  mat[12] = e30;
  mat[13] = e31;
  mat[14] = e32;
  mat[15] = e33;
}

/**
 Make a matrix by providing each component. Supply the values in colum-major order.<br />
 Indices:
 <pre>
 +-               -+
 |  0,  4,  8, 12  |
 |  1,  5,  9, 13  |
 |  2,  6, 10, 14  |
 |  3,  7, 11, 15  |
 +-               -+
 </pre>
 
 @param {float} e00 Element at row 0 column 0.
 @param {float} e01 Element at row 1 column 0.
 @param {float} e02 Element at row 2 column 0.
 @param {float} e03 Element at row 3 column 0.
 @param {float} e10 Element at row 0 column 1.
 @param {float} e11 Element at row 1 column 1.
 @param {float} e12 Element at row 2 column 1.
 @param {float} e13 Element at row 3 column 1.
 @param {float} e20 Element at row 0 column 2.
 @param {float} e21 Element at row 1 column 2.
 @param {float} e22 Element at row 2 column 2.
 @param {float} e23 Element at row 3 column 2.
 @param {float} e30 Element at row 0 column 3.
 @param {float} e31 Element at row 1 column 3.
 @param {float} e32 Element at row 2 column 3.
 @param {float} e33 Element at row 3 column 3.
 
 @return {Array} A matrix defined by the provided arguments.
 */
c3dl.makeMatrix = function (e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33)
{
  return [!isNaN(e00) ? parseFloat(e00) : 0.0, !isNaN(e01) ? parseFloat(e01) : 0.0, !isNaN(e02) ? parseFloat(e02) : 0.0, !isNaN(e03) ? parseFloat(e03) : 0.0, !isNaN(e10) ? parseFloat(e10) : 0.0, !isNaN(e11) ? parseFloat(e11) : 0.0, !isNaN(e12) ? parseFloat(e12) : 0.0, !isNaN(e13) ? parseFloat(e13) : 0.0, !isNaN(e20) ? parseFloat(e20) : 0.0, !isNaN(e21) ? parseFloat(e21) : 0.0, !isNaN(e22) ? parseFloat(e22) : 0.0, !isNaN(e23) ? parseFloat(e23) : 0.0, !isNaN(e30) ? parseFloat(e30) : 0.0, !isNaN(e31) ? parseFloat(e31) : 0.0, !isNaN(e32) ? parseFloat(e32) : 0.0, !isNaN(e33) ? parseFloat(e33) : 0.0];
}

/**
 Check if two matrices are equal. Assumes for performance reasons 
 that the matrices passed in are valid. Two matrices are equal if
 they're corresponding components are equal or their difference is
 less than TOLERANCE. This tolerance is simply a small number used 
 as a buffer due to floating point inaccuracies.
 
 @param {Array} matrix1 The first matrix.
 @param {Array} matrix2 The second matrix.
 
 @return {boolean} True if matrices are equal, false otherwise.
 */
c3dl.matricesEqual = function (matrix1, matrix2)
{
  var areEqual = true;

  // stop as soon as we find an element that is not equal
  for (var i = 0; areEqual && i < 16; i++)
  {
    // if it goes beyond the threshold or tolerance, we can stop
    if (Math.abs(matrix1[i] - matrix2[i]) > c3dl.TOLERANCE)
    {
      areEqual = false;
    }
  }

  return areEqual;
}


/**
 */
c3dl.makePoseMatrix = function (vecLeft, vecUp, vecFrwd, vecPos)
{
    // +-                            -+
    // |  Left.x, Up.y, Dir.x, Pos.x  |
    // |  Left.y, Up.x, Dir.y, Pos.y  |
    // |  Left.z, Up.z, Dir.z, Pos.z  |
    // |  0.0,    0.0,    0.0,  1.0   |
    // +-                            -+
    var mat = new C3DL_FLOAT_ARRAY(16);
    // Left
    mat[0] = vecLeft[0];
    mat[1] = vecLeft[1];
    mat[2] = vecLeft[2];
    mat[3] = 0.0;

    // Up
    mat[4] = vecUp[0];
    mat[5] = vecUp[1];
    mat[6] = vecUp[2];
    mat[7] = 0.0;

    // Forward
    mat[8] = vecFrwd[0];
    mat[9] = vecFrwd[1];
    mat[10] = vecFrwd[2];
    mat[11] = 0.0;

    // Position
    mat[12] = vecPos[0];
    mat[13] = vecPos[1];
    mat[14] = vecPos[2];
    mat[15] = 1.0;

    return  mat;
}


/**
 Get the transpose of matrix 'mat'.  A transposed matrix is created
 by interchanging the rows and columns of a matrix.
 
 Transposing the following matrix,
 <pre>
 +-            -+
 |  A, B, C, D  |
 |  E, F, G, H  |
 |  I, J, K, L  |
 |  M, N, O, P  |
 +-            -+
 </pre>
 
 would yield:
 <pre>
 +-            -+
 |  A, E, I, M  |
 |  B, F, J, N  |
 |  C, G, K, O  |
 |  D, H, L, P  |
 +-            -+
 </pre>
 
 @param {Array} mat Matrix to transpose.
 
 @returns {Array} The transposed matrix if the passed in matrix 
 was valid, otherwise returns null.
 */
c3dl.transposeMatrix = function (mat, dest)
{
    return M4x4.transpose(mat, dest);
}


/**
 Get the inverse of matrix 'mat'.  Matrix-matrix division is not 
 defined mathematically, but there is a multiplicative inverse 
 operation which is useful in solving some matrix equations.  
 Note that only matrices with a determinant not equal to zero 
 will have an inverse.  There is no need to check if first if
 the matrix has a determinant not equal to zero as this function
 does that anyway.
 
 @param {Array} mat The Matrix for which the inverse is
 required.
 
 @returns {Array} The inverse of matrix 'mat' if it has one
 */
c3dl.inverseMatrix = function (mat) {
  if (!mat) {
    return
  }
  var kInv =  c3dl.mat1;
	var fA0 = mat[ 0] * mat[ 5] - mat[ 1] * mat[ 4];
 	var fA1 = mat[ 0] * mat[ 6] - mat[ 2] * mat[ 4];
 	var fA2 = mat[ 0] * mat[ 7] - mat[ 3] * mat[ 4];
 	var fA3 = mat[ 1] * mat[ 6] - mat[ 2] * mat[ 5];
 	var fA4 = mat[ 1] * mat[ 7] - mat[ 3] * mat[ 5];
 	var fA5 = mat[ 2] * mat[ 7] - mat[ 3] * mat[ 6];
 	var fB0 = mat[ 8] * mat[13] - mat[ 9] * mat[12];
 	var fB1 = mat[ 8] * mat[14] - mat[10] * mat[12];
 	var fB2 = mat[ 8] * mat[15] - mat[11] * mat[12];
 	var fB3 = mat[ 9] * mat[14] - mat[10] * mat[13];
 	var fB4 = mat[ 9] * mat[15] - mat[11] * mat[13];
 	var fB5 = mat[10] * mat[15] - mat[11] * mat[14];
  // Determinant
 	var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
 	// Account for a very small value
	if (Math.abs(fDet) <= 1e-9) {
 	  c3dl.debug.logWarning('inverseMatrix() failed due to bad values');
   	return null;
	} 
	kInv[ 0] = + mat[ 5] * fB5 - mat[ 6] * fB4 + mat[ 7] * fB3;
	kInv[ 4] = - mat[ 4] * fB5 + mat[ 6] * fB2 - mat[ 7] * fB1;
	kInv[ 8] = + mat[ 4] * fB4 - mat[ 5] * fB2 + mat[ 7] * fB0;
	kInv[12] = - mat[ 4] * fB3 + mat[ 5] * fB1 - mat[ 6] * fB0;
	kInv[ 1] = - mat[ 1] * fB5 + mat[ 2] * fB4 - mat[ 3] * fB3;
	kInv[ 5] = + mat[ 0] * fB5 - mat[ 2] * fB2 + mat[ 3] * fB1;
	kInv[ 9] = - mat[ 0] * fB4 + mat[ 1] * fB2 - mat[ 3] * fB0;
	kInv[13] = + mat[ 0] * fB3 - mat[ 1] * fB1 + mat[ 2] * fB0;
	kInv[ 2] = + mat[13] * fA5 - mat[14] * fA4 + mat[15] * fA3;
	kInv[ 6] = - mat[12] * fA5 + mat[14] * fA2 - mat[15] * fA1; 		
	kInv[10] = + mat[12] * fA4 - mat[13] * fA2 + mat[15] * fA0;
 	kInv[14] = - mat[12] * fA3 + mat[13] * fA1 - mat[14] * fA0;
 	kInv[ 3] = - mat[ 9] * fA5 + mat[10] * fA4 - mat[11] * fA3;
 	kInv[ 7] = + mat[ 8] * fA5 - mat[10] * fA2 + mat[11] * fA1;
 	kInv[11] = - mat[ 8] * fA4 + mat[ 9] * fA2 - mat[11] * fA0;
 	kInv[15] = + mat[ 8] * fA3 - mat[ 9] * fA1 + mat[10] * fA0;
  // Inverse using Determinant
 	var fInvDet = 1.0 / fDet;
 	kInv[ 0] *= fInvDet;
 	kInv[ 1] *= fInvDet;
 	kInv[ 2] *= fInvDet;
 	kInv[ 3] *= fInvDet;
 	kInv[ 4] *= fInvDet;
 	kInv[ 5] *= fInvDet;
 	kInv[ 6] *= fInvDet;
 	kInv[ 7] *= fInvDet;
 	kInv[ 8] *= fInvDet;
 	kInv[ 9] *= fInvDet;
 	kInv[10] *= fInvDet;
 	kInv[11] *= fInvDet;
 	kInv[12] *= fInvDet;
 	kInv[13] *= fInvDet;
 	kInv[14] *= fInvDet;
	kInv[15] *= fInvDet;
  return kInv;
}


/**
 Get the matrix determinant of 'mat'.
 
 @param {Array} mat The matrix for which the determinant 
 is required.
 
 @returns {float} The matrix determinant of 'mat' or null if 
 'mat' is invalid.
 */
c3dl.matrixDeterminant = function (mat) {
    var fA0 = mat[0] * mat[5] - mat[1] * mat[4];
    var fA1 = mat[0] * mat[6] - mat[2] * mat[4];
    var fA2 = mat[0] * mat[7] - mat[3] * mat[4];
    var fA3 = mat[1] * mat[6] - mat[2] * mat[5];
    var fA4 = mat[1] * mat[7] - mat[3] * mat[5];
    var fA5 = mat[2] * mat[7] - mat[3] * mat[6];
    var fB0 = mat[8] * mat[13] - mat[9] * mat[12];
    var fB1 = mat[8] * mat[14] - mat[10] * mat[12];
    var fB2 = mat[8] * mat[15] - mat[11] * mat[12];
    var fB3 = mat[9] * mat[14] - mat[10] * mat[13];
    var fB4 = mat[9] * mat[15] - mat[11] * mat[13];
    var fB5 = mat[10] * mat[15] - mat[11] * mat[14];
    // Construct the Determinant
    var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
    return fDet;
}



/**
 Get the adjoint matrix of matrix 'mat'.
 
 @param {Array} mat The matrix which the adjoint is required.
 
 @returns {Array} the adjoint matrix of 'mat' if it was valid, otherwise
 returns null.
 */
c3dl.matrixAdjoint = function (mat) {
  var fA0 = mat[0] * mat[5] - mat[1] * mat[4];
  var fA1 = mat[0] * mat[6] - mat[2] * mat[4];
  var fA2 = mat[0] * mat[7] - mat[3] * mat[4];
  var fA3 = mat[1] * mat[6] - mat[2] * mat[5];
  var fA4 = mat[1] * mat[7] - mat[3] * mat[5];
  var fA5 = mat[2] * mat[7] - mat[3] * mat[6];
  var fB0 = mat[8] * mat[13] - mat[9] * mat[12];
  var fB1 = mat[8] * mat[14] - mat[10] * mat[12];
  var fB2 = mat[8] * mat[15] - mat[11] * mat[12];
  var fB3 = mat[9] * mat[14] - mat[10] * mat[13];
  var fB4 = mat[9] * mat[15] - mat[11] * mat[13];
  var fB5 = mat[10] * mat[15] - mat[11] * mat[14];
  // Adjoint
  var k = new C3DL_FLOAT_ARRAY([mat[5] * fB5 - mat[6] * fB4 + mat[7] * fB3, -mat[1] * fB5 + mat[2] * fB4 - mat[3] * fB3,
    mat[13] * fA5 - mat[14] * fA4 + mat[15] * fA3, -mat[9] * fA5 + mat[10] * fA4 - mat[11] * fA3,
    -mat[4] * fB5 + mat[6] * fB2 - mat[7] * fB1, mat[0] * fB5 - mat[2] * fB2 + mat[3] * fB1, 
    -mat[12] * fA5 + mat[14] * fA2 - mat[15] * fA1, mat[8] * fA5 - mat[10] * fA2 + mat[11] * fA1,
    mat[4] * fB4 - mat[5] * fB2 + mat[7] * fB0, -mat[0] * fB4 + mat[1] * fB2 - mat[3] * fB0, 
    mat[12] * fA4 - mat[13] * fA2 + mat[15] * fA0, -mat[8] * fA4 + mat[9] * fA2 - mat[11] * fA0,
    -mat[4] * fB3 + mat[5] * fB1 - mat[6] * fB0, mat[0] * fB3 - mat[1] * fB1 + mat[2] * fB0,
    -mat[12] * fA3 + mat[13] * fA1 - mat[14] * fA0,
    mat[8] * fA3 - mat[9] * fA1 + mat[10] * fA0]);
  return k;
}


/**
 Multiply a given Matrix 'mat' with a scalar value.  This will result
 in a matrix which has each component in 'mat' multiplied with 'scalar'.
 
 @param {Array} mat The matrix to "scale".
 @param {float} scalar The value which will be multiplied by each 
 component of 'mat'.
 
 @returns {Array} The Matrix 'mat', with each component 
 multiplied by 'scalar'.
 */
c3dl.multiplyMatrixByScalar = function (mat,scalar, dest) { 
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(16);
  }
  for (var i = 0; i < 16; i++) {
    dest[i] = mat[i] * scalar;
  }
  return dest;
}

// -----------------------------------------------------------------------------

/**
 Divide a Matrix 'mat' by a scalar value. This will divide each 
 component of the matrix 'mat' by 'scalar' and reutrn the value.
 
 @param {Array} mat The matrix which will be divided.
 @param {float} scalar The value which the matrix components 
 will be divided by.
 
 @returns {Array} The Matrix 'mat' divided by 'scalar'.
 */
c3dl.divideMatrixByScalar = function (mat, scalar, dest) {
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(16);
  }
  // Multiply each variable
  for (var i = 0; i < 16; i++) {
    dest[i] = mat[i] / scalar;
  }
  return dest;
}

/**
 Multiply matrix 'matOne' by 'matTwo'.
 
 @param {Array} matOne
 @param {Array} matTwo
 
 @returns {Array} The result of multiplying 'matOne' by 'matTwo'.
 */
c3dl.multiplyMatrixByMatrix = function (matOne, matTwo,dest) {
  return M4x4.mul(matOne,matTwo,dest);
}

/**
 Multiply a matrix by a direction vector
 
 @param {Array} mat
 @param {Array} vec
 @param {Array} dest
 
 @returns {Array} vector
 */
c3dl.multiplyMatrixByDirection = function (mat, vec, dest)
{
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(3);
  }
  // since we don't need to multiply the translation part, we leave it out.
  var a = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2]; 
  var b = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2]; 
  var c = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2];
  dest[0] = a;
  dest[1] = b;
  dest[2] = c;
  return dest;
}


/**
 Multiply a vector 'vec' by Matrix 'mat'. This results in a vector
 which the elements are found by calculatig the dot product of the 
 column vectors of 'mat' by 'vec'.
 
 If 'vec' is an array of 3 values, the last component, w will be assumed to be 1. If 'vec'
 is an array of 4 values, dest must also be an array of 4 values.
 
 @param {Array} mat The matrix, an array of 16 values.
 
 @param {Array} vec Array of 3 or 4 values. If last component, W is not present, W=1 will
 be assumed. Also, if the Array has 3 elements, the return value will be 3 elements. If the
 array has 4 elements, the return value will have 4 elements.
 
 @param {Array} dest Optional return by reference.
 
 @returns {Array} The vector 'vec' multiplied by matrix 'mat' if both
 arguments were valid, otherwise returns null.
 */
c3dl.multiplyMatrixByVector = function (mat, vec, dest) { 
  var len = vec.length;
  var w = (len == 3 ? 1 : vec[3]);
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(len);
  }
  var a = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12] * w;
  var b = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13] * w;
  var c = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14] * w;
  var d = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15] * w;
  dest[0] = a;
  dest[1] = b;
  dest[2] = c;
  // make sure they passed us a 4 component vector before trying to write to that
  // element.
  if (len === 4) {
    dest[3] = d;
  }
  return dest;
}

/**
 Add two matrices.  This will result in a matrix in which each 
 corresponding component	of each matrix are added together.
 
 @param {Array} matOne The first matrix.
 @param {Array} matTwo The second matrix.
 
 @returns {Array} A Matrix which is the addition of 'matOne' and
 'matTwo'.
 */
c3dl.addMatrices = function (matOne, matTwo) {
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(16);
  }
  for (var i = 0; i < 16; i++) {
    // Add each value of the matrix to its counterpart
    dest[i] = matOne[i] + matTwo[i];
  }
  return dest;
}


/**
 Subtract Matrix 'matTwo' from 'matOne'.  This will result in a 
 matrix in which each component of 'matTwo' is subtracted from
 Matrix 'matOne.
 
 @param {Array} matOne The matrix which is being 
 subtracted from.
 @param {Array} matTwo The matrix which is matOne is being 
 subtracted from.
 
 @returns {Array} A matrix which is 'matTwo' subtracted from 'matOne'.
 */
c3dl.subtractMatrices = function (matOne, matTwo) {
  if (dest == undefined) {
    dest = new C3DL_FLOAT_ARRAY(16);
  }
  for (var i = 0; i < 16; i++) {
    // Add each value of the matrix to its counterpart
    dest[i] = matOne[i] - matTwo[i];
  }
  return dest;
}

c3dl.copyMatrix = function (srcMat, dest) {
  if (dest == undefined) {
    return M4x4.clone(srcMat);
  }
  else {
    dest[0] = srcMat[0];
    dest[1] = srcMat[1];
    dest[2] = srcMat[2];
    dest[3] = srcMat[3];
    dest[4] = srcMat[4];
    dest[5] = srcMat[5];
    dest[6] = srcMat[6];
    dest[7] = srcMat[7];
    dest[8] = srcMat[8];
    dest[9] = srcMat[9];
    dest[10] = srcMat[10];
    dest[11] = srcMat[11];
    dest[12] = srcMat[12];
    dest[13] = srcMat[13];
    dest[14] = srcMat[14];
    dest[15] = srcMat[15];
  }
}
c3dl.emptyMatrix = function (srcMat) {
  srcMat[0] = 0;
  srcMat[1] = 0;
  srcMat[2] = 0;
  srcMat[3] = 0;
  srcMat[4] = 0;
  srcMat[5] = 0;
  srcMat[6] = 0;
  srcMat[7] = 0;
  srcMat[8] = 0;
  srcMat[9] = 0;
  srcMat[10] = 0;
  srcMat[11] = 0;
  srcMat[12] = 0;
  srcMat[13] = 0;
  srcMat[14] = 0;
  srcMat[15] = 0;
}
