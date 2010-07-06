/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.RenderingObject is an object which is created dynamically 
 and passed to the callback function defined within an effect when 
 rendering objects.
 */
c3dl.RenderingObject = function ()
{
  // NOTE
  // These methods are empty because we only want jsdoc toolkit creating 
  // the doc files.  Within the renderer code, we create an instance of 
  // this class and override these functions and provide the function
  // definition. 
  // This is done because adding 
  // setter functions would make this object not read-only.
  /**
   Get the rendering context. Within the callback function, the context
   is used to do many things, some of which includes issuing commands to
   set the uniform variables, set rendering states and render the 
   geometry.
   
   @returns the rendering context.
   */
  this.getContext = function ()
  {
  }

  /**
   Get the geometric object to render. The geometric object is composed
   of primitive sets, so the list of primitive sets must be queried and
   rendered.
   
   @returns {c3dl.Geometry} the geometric object to render.
   */
  this.getGeometry = function ()
  {
  }

  /**
   Get the ID of the program object which is to be used to render the
   geometry. Pass this value to the context's useProgram() function to
   change the current rendering program.
   
   @returns {int} the program object ID.
   */
  this.getProgramObjectID = function ()
  {
  }

  /**
   Get the renderer used to render the geometry. The renderer will have 
   useful state information as well as helper functions to easily set
   uniform and vertex attribute variables.
   
   @returns {c3dl.WebGL} the renderer used to render the geometry.
   */
  this.getRenderer = function ()
  {
  }
}