/**
 @private
 
 Check if a texture has the correct dimensions for WebGL.  The texture 
 must not be too small, that is, it must be greater than 1x1. And it must be 
 a power of 2: 2x2, 4x4, 8x8, 16x16, etc.
 
 @param texture
 
 @returns {boolean} true if the image has the correct dimensions, false otherwise.
 */
c3dl.hasCorrectDimensions = function (texture)
{
  // broke down cases where the texture could be invalid so user
  // knows where to look first
  var isCorrect = false;

  // textures cannot have size 0 or 1.
  if (texture.width <= 1 || texture.height <= 1)
  {
    c3dl.debug.logWarning('Texture ' + texture.src + ' is too small.' + 'Dimensions are: ' +
    texture.width + "x" + texture.height + ". " + '<br/>Texture was resized.');
  }

  // Texture width and height must be a power of 2. By performing a 
  // bitwise and, we can see if the bit to the far left is on and all
  // other bits are off, thus, the size must be square.
  // 10(bin) = 2(dec)		= power of 2
  // 100(bin) = 4dec)		= power of 2
  // 1000(bin) = 8(dec)	= power of 2
  // etc..
  else if ((texture.width & (texture.width - 1)) || (texture.height & (texture.height - 1)))
  {
    c3dl.debug.logWarning('Texture ' + texture.src + ' must have a width and height of a power of 2.' + 
    'Dimensions are: ' + texture.width + "x" + texture.height + ". " + 
    'Dimensions must be something like: 2x2, 2x4, 4x4, 4x8, 8x8, 16x8, 16x16, etc..' + 
    '<br />Texture has been resized.');
  }

  // if we didn't satisfy any of the conditionals, texture 
  // should be okay
  else
  {
    isCorrect = true;
  }
  return isCorrect;
}