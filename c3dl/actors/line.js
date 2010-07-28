/*
  Copyright (c) 2009 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Line represents a line segment in 3D space. The beginning and ending
 coordinates have their own color.  If the beginning and ending colors are different,
 the line will be drawn with a gradient color change.<br />
 <br />
 The default color of the line is black and the default coordinates
 are both [0,0,0], which results in the line not being rendered.The default width
 is 1 pixel.
 */
c3dl.Line = function ()
{
  // begin and end coordinates in the order [x,y,z].
  this.coords = new C3DL_FLOAT_ARRAY([0, 0, 0, 0, 0, 0]);

  // begin and end colors in the order [r,g,b].
  this.colors = new C3DL_FLOAT_ARRAY([0, 0, 0, 0, 0, 0]);

  // Will the line be drawn on render?
  this.visible = true;

  // The default width of the line is 1 pixel.
  this.width = 1.0;

  /**
   Set the begin and end coordinates.
   
   @param {Array} beginCoord Array of 3 values in the order [x,y,z], where 
   the line segment begins.
   
   @param {Array} endCoord Array of 3 values in the order [x,y,z], where 
   the line segment ends.
   */
  this.setCoordinates = function (beginCoord, endCoord)
  {
    if (beginCoord.length == 3 && endCoord.length == 3)
    {
      this.coords[0] = beginCoord[0];
      this.coords[1] = beginCoord[1];
      this.coords[2] = beginCoord[2];

      this.coords[3] = endCoord[0];
      this.coords[4] = endCoord[1];
      this.coords[5] = endCoord[2];
    }
    else
    {
      c3dl.debug.logWarning("invalid values passed to Line::setCoordinates()");
    }
  }


  /**
   Set the color of each end of the line.  A line can rendered using a solid color (by assigning
   both ends of the line the same color), or a color gradient from beginColor and endColor.
   The beginColor sets the color of the first coordinate of the line. The endColor sets the 
   end coordinate of the line. The rendered pixels in between transition from one color to 
   the other.
   
   @param {Array} beginColor An array of 3 values in the order [r,g,b]. Each component must 
   range from 0.0 to 1.0.
   
   @param {Array} endColor An array of 3 values in the order [r,g,b]. Each component must 
   range from 0.0 to 1.0.
   */
  this.setColors = function (beginColor, endColor)
  {
    if (beginColor.length == 3 && endColor.length == 3)
    {
      this.colors[0] = beginColor[0];
      this.colors[1] = beginColor[1];
      this.colors[2] = beginColor[2];

      this.colors[3] = endColor[0];
      this.colors[4] = endColor[1];
      this.colors[5] = endColor[2];
    }
    else
    {
      c3dl.debug.logWarning("invalid values passed to Line::setColors");
    }
  }

  /**
   Set the line's visibility.
   
   @param {bool} visible true if the line should be rendered.
   */
  this.setVisible = function (visible)
  {
    this.visible = visible;
  }

  /**
   Get the visibility of the line.
   
   @returns {bool} true if the line is rendered, otherwise false.
   */
  this.isVisible = function ()
  {
    return this.visible;
  }

  /**		
   Set the width the line in pixels. A line width of 1 is guaranteed to be supported. 
   However, the maximum supported width for lines is implementation dependent. To get the
   maximum supported line width, call Renderer's getMaxLineWidth() once the scene and renderer
   have been initialized.
   
   @param {float} width Specified in pixels. Must be at least 1. Will be rounded to 
   the nearest integer.
   */
  this.setWidth = function (width)
  {
    // if a line width of 0 is passed to WebGL, it will use a line with of 1, so 
    // don't bother allowing the user to specify anything below 1.
    if (width >= 1)
    {
      this.width = width;
    }
  }

  /**
   Get the width the line in pixels.
   
   @returns {float} The width of the line in pixels.
   */
  this.getWidth = function ()
  {
    return this.width;
  }

  /**
   Get the beginning and ending coordinates.
   
   @returns {Array} Array of 6 values. first 3 values represent the coordinates 
   of the beginning of the line. The last 3 values represent the coordinates
   of the end of the line in the order [x,y,z].
   */
  this.getCoordinates = function ()
  {
    return new C3DL_FLOAT_ARRAY([this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4], this.coords[5]]);
  }

  /**
   Get beginning and ending colors of the line.
   
   @returns {Array} Array of 6 values. First 3 represent beginning color, last 3 represent
   ending color in the order [r,g,b].
   */
  this.getColors = function ()
  {
    return new C3DL_FLOAT_ARRAY([this.colors[0], this.colors[1], this.colors[2], this.colors[3], this.colors[4], this.colors[5]]);
  }

  /**
   */
  this.getObjectType = function ()
  {
    return c3dl.LINE;
  }
}