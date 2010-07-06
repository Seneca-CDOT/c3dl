/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 
 @class ProgramObject is used to store a program object ID, which 
 WebGL generates along with the ID of the renderer which compiled
 the shaders resulting in the program ID. 
 */
c3dl.ProgramObject = function ()
{
  this.programID = -1;
  this.rendererID = -1;

  /**
   */
  this.getProgramID = function ()
  {
    return this.programID;
  }

  /**
   
   */
  this.getRendererID = function ()
  {
    return this.rendererID;
  }

  /**
   @private	
   Get a string representation of this object. 
   
   @param {null|String} delimiter A string which will separate values. Typically will be 
   ","  ,  "\n" or "&lt;br /&gt;". If none is specified, "," will be used.
   
   @returns {String} A string representation of this object.
   */
  this.toString = function (delimiter)
  {
    // make sure user passed up a string if they actually decided
    // to specify a delimiter.
    if (!delimiter || typeof(delimiter) != "string")
    {
      delimiter = ",";
    }
    return "Program ID = " + this.getProgramID() + delimiter + "Renderer ID = " + this.getRendererID();
  }
}