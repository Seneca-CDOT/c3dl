/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// the stacks
c3dl.ModelView = [];
c3dl.Projection = [];
var matrixList = [];
//created as a buffer. Creating float arrays on every call is to low.
for (var i = 0; i < 1000; i++) {
  matrixList[i] = c3dl.makeMatrix();
}
matrixListPos = 0;
// to reduce code in the functions for cheking which stack we are 
// changing, just keep a reference variable to the current one.
// start with the modelview.
c3dl.CurrentStackPointer = c3dl.ModelView;

// like OpenGL, our stack starts off with an identity matrix. Here, we 
// have to access the stacks directly since at this point we don't 
// have access to the functions since they aren't defined yet.
c3dl.ModelView.push(c3dl.makeIdentityMatrix());
c3dl.Projection.push(c3dl.makeIdentityMatrix());


/**
 Change the matrix mode to either model view or projection.
 
 @param {c3dl.PROJECTION | c3dl.MODELVIEW} mode
 */
c3dl.matrixMode = function (mode)
{
  if (mode == c3dl.PROJECTION)
  {
    c3dl.CurrentStackPointer = c3dl.Projection;
  }
  else if (mode == c3dl.MODELVIEW)
  {
    c3dl.CurrentStackPointer = c3dl.ModelView;
  }
}


/**
 Create a copy of the top element and push on that copy. This results
 in the first two element being identical. This is simply emulating what
 OpenGL does.
 */
c3dl.pushMatrix = function ()
{
  c3dl.copyMatrix(c3dl.peekMatrix(),matrixList[matrixListPos]);
  c3dl.CurrentStackPointer.push(matrixList[matrixListPos]);
  matrixListPos++;
}


/**
 Replace the top matrix with a specified matrix. If paramter is
 not provided, an identity matrix will replace the top matrix.
 
 @param {Array} [matrix] The matrix which will replace the 
 element at the top of the stack. If omitted, it will replace the
 top element with an identity matrix.
 */
c3dl.loadMatrix = function (matrix)
{
  if (matrix)
  {
    c3dl.CurrentStackPointer[c3dl.getMatrixStackHeight() - 1] = matrix;
  }

  // in Opengl if nothing is passed in it loads an identity matrix, 
  // so emulate that.
  else
  {
    // recursive, makes the first conditional our base case.
    c3dl.loadMatrix(c3dl.makeIdentityMatrix());
  }
}

/**
 Replace the top matrix with an identity matrix. This can also
 be accomplished by calling C3DL.loadMatrix() passing in zero
 arguments.
 */
c3dl.loadIdentity = function ()
{
  c3dl.loadMatrix(c3dl.makeIdentityMatrix())
}

/**
 Pop the top matrix off the stack.  If there is only one matrix
 left in the stack, this function does nothing.
 */
c3dl.popMatrix = function ()
{
  if (c3dl.getMatrixStackHeight() > 1)
  {
    c3dl.CurrentStackPointer.pop();
    matrixListPos--;
  }
}


/**
 Post multiply the matrix at the top of the stack with the 
 parameter 'matrix' and replace the top element with the product.
 
 @param {Array} matrix The matrix which will be post multiplied 
 with the top matrix.
 */
c3dl.multMatrix = function (matrix)
{
  c3dl.copyMatrix(c3dl.peekMatrix(), c3dl.mat1);
  c3dl.loadMatrix(c3dl.multiplyMatrixByMatrix(c3dl.mat1, matrix,c3dl.peekMatrix()));
}


/**
 Get the matrix at the top of the stack.
 
 @returns {Array} The matrix at the top of the matrix stack.
 */
c3dl.peekMatrix = function ()
{
  return c3dl.CurrentStackPointer[c3dl.getMatrixStackHeight() - 1];
}


/**
 Get the number of elements in the matrix stack.
 
 @returns {int} The number of elements in the current matrix stack.
 */
c3dl.getMatrixStackHeight = function ()
{
  return c3dl.CurrentStackPointer.length;
}


/**
 Create a translate matrix and call C3DL.multMatrix() passing in the
 translate matrix.
 
 @param {float} translateX The translation for the x component.
 @param {float} translateY The translation for the y component.
 @param {float} translateZ The translation for the z component.
 */
c3dl.translate = function (translateX, translateY, translateZ)
{
  var translateMatrix = c3dl.makePoseMatrix([1, 0, 0], [0, 1, 0], [0, 0, 1],
    [translateX, translateY, translateZ]);

  c3dl.multMatrix(translateMatrix);
}

/**
 @private until implemented
 Create a rotation matrix and call multMatrix() with this matrix.
 
 @param {float} angle 
 @param {float} rotationX 
 @param {float} rotationY 
 @param {float} rotationZ 
 */
c3dl.rotate = function (angle, rotationX, rotationY, rotationZ)
{
  //implement me!
}

/**
 Create a scale matrix from the parameters provided and call multMatrix()
 with this matrix.
 
 @param {float} scaleX Scaling factor for the x component.
 @param {float} scaleY Scaling factor for the y component.
 @param {float} scaleZ Scaling factor for the z component. 
 */
c3dl.scale = function (scaleX, scaleY, scaleZ)
{
  var scaleMatrix = c3dl.makeIdentityMatrix();
  scaleMatrix[0] = scaleX;
  scaleMatrix[5] = scaleY;
  scaleMatrix[10] = scaleZ;

  c3dl.multMatrix(scaleMatrix);
}