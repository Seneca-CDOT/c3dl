/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @namespace Prevent name conflicts by placing c3dl variables 
 and functions in a javascript 'namespace'. Class adapted from
 Jeremy Giberson's refactorization code.
 */
var c3dl =
{
  // Each renderer requires a unique ID, we start the counter here.	
  rendererID: 0,

  /**
   @private
   Get a unique ID to be assigned to a renderer. Values start at 1 inclusive.
   
   @returns {int} a unique ID for a renderer.
   */
  getNextRendererID: function ()
  {
    return ++c3dl.rendererID;
  },

  /**
   @private
   Bind func's this property to obj
   */
  bind: function (func, bindObj)
  {
    return function ()
    {
      func.call(bindObj, arguments);
    };
  },

  /**
   @private
   Extend one object with properties/methods from another.
   note: extend is meant for adding functionality to instanced objects
   */
  extend: function (baseObj, extObj)
  {
    for (var i in extObj){
      if (extObj[i] != null && extObj[i] != undefined){
        baseObj[i] = extObj[i];
      }
    }
    return baseObj;
  },

  /**
   @private
   */
  guid: function ()
  {
    return new Date().getTime();
  },

  /**
   @private
   Inherit one object class with properties/methods from another 
   note: inherit is meant for classic inheritance patterns
   */
  inherit: function (parentObject, child)
  {
    child.prototype.__proto__ = parentObject.prototype;
    child.prototype.__parent = parentObject;
    return child;
  },

  /**
   Call a superclass's instance of a function.
   Note: |this| must have been inherited using c3dl.inherit.
   
   @param o |this| from the calling object.
   @param args The |arguments| variable from the called function
   @param funcname The name of the function to be called if the function has no name.
   */
  _super: function (o, args, funcname)
  {
    if (funcname.length == 0) funcname = args.callee.name;
    var tmpparent = o.__parent;
    if (o.__parent.prototype.__parent) o.__parent = o.__parent.prototype.__parent;
    var ret = tmpparent.prototype[funcname].apply(o, args);
    delete o.__parent;
    return ret;
  },

  /** 
   Call the superclass's constructor. 
   Note: |this| must have been inherited using c3dl.inherit.
   
   @param o |this| from the calling object 
   */
  _superc: function (o)
  {
    var tmpparent = o.__parent;
    // Temporarily change our parent to be our parent's parent to
    // avoid infinite recursion.
    if (o.__parent.prototype.__parent){
      o.__parent = o.__parent.prototype.__parent;
    }
    tmpparent.prototype.constructor.apply(o);
    delete o.__parent;
  },
};