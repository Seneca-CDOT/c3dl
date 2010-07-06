/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class base class for WebGL.
 */
c3dl.Renderer = function ()
{
  // use an invalid value which must be overwritten.
  this.version = 0.0;

  // a detailed description of the renderer
  this.versionString = "Renderer interface.";

  // by default we fill in the models, wireframe is mostly for debugging.
  this.fillMode = c3dl.FILL;

  this.lightingOn = true;

  // these will be set by the derived renderer on initialization.
  this.contextWidth = 0;
  this.contextHeight = 0;

  /**
   */
  this.getLighting = function ()
  {
    return this.lightingOn;
  }

  /**
   Get the maximum line width supported which is implementation dependent.
   
   @returns {int} maximum line width supported.
   */
  this.getMaxLineWidth = function ()
  {
    // derived classes must implement this function.
  }

  /**
   Get the version of the renderer as a number.
   
   @returns { 0.0 | 2.0 } A value of 0.0 is returned if the class was instantiated incorrectly.
   */
  this.getVersion = function ()
  {
    return this.version;
  }

  /**
   Get the WebGL version string.
   
   @returns {"Renderer interface" | "WebGL"} "Renderer interface" is returned if the Renderer was not instantiated correctly.
   */
  this.getVersionString = function ()
  {
    return this.versionString;
  }


  /**
   Are objects filled in or are they rendered using wireframe?
   
   @returns {int} either c3dl.FILL or c3dl.WIRE_FRAME.
   */
  this.getFillMode = function ()
  {
    return this.fillMode;
  }

  /**
   @private
   Set the color the canvas will be cleared to each frame.
   
   @param {Array} clearColor Array of 4 values in the order [r,g,b,a] which must
   be in the range [0.0 - 1.0].
   */
  this.setClearColor = function (clearColor)
  {
    // derived classes must implement this function.
  }

  /**
   Set how objects will be rendered, either filled in or using wireframe.
   
   @param {c3dl.FILL | c3dl.WIRE_FRAME} mode
   */
  this.setFillMode = function (mode)
  {
    if (mode == c3dl.FILL || mode == c3dl.WIRE_FRAME)
    {
      this.fillMode = mode;
    }
    else
    {
      c3dl.debug.logWarning('Invalid value "' + mode + '" passed to setFillMode()');
    }
  }

  /**
   */
  this.setLighting = function (isOn)
  {
    this.lightingOn = isOn;
  }

  /**
   */
  this.getContextWidth = function ()
  {
    return this.contextWidth;
  }

  /**
   */
  this.getContextHeight = function ()
  {
    return this.contextHeight;
  }
}