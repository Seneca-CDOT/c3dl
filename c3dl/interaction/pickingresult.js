/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.PickingResult is contains the result of the user picking something
 in the scene. This object is created within the library and sent to the picking
 callback function. You can query things such as which objects were picked, which 
 canvas and which button was used for the pick.
 */
c3dl.PickingResult = function ()
{
  // NOTE
  // These functions are empty because we only want jsdoc toolkit creating the doc
  // files.  Within the picking code, we create an instance of this class and override
  // these functions. This is done because adding functions such as setButtonUsed, setObjectsHit, etc
  // which the picking code can call allows other code to call those methods as well.
  /**
   Get the mouse button that was used for the pick.
   
   @returns {int} the mouse button used for the pick.
   */
  this.getButtonUsed = function ()
  {
  }

  /**
   Get the canvas the user clicked on.
   
   @returns {HTMLComponent} the canvas the user clicked on.
   */
  this.getCanvas = function ()
  {
  }

  /**
   Get the list of objects which were picked. This list contains points,
   lines and collada objects.
   
   @returns {Array} References to objects which have been picked.
   */
  this.getObjects = function ()
  {
  }
}