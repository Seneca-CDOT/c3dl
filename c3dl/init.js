/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// functions for initialization
c3dl.mainCallBacks = [];

/**
 @private
 This is a function which the browser will call once the loading of the 
 page is done.
 
 Once the page is done loading, this function will place all the models 
 the user will use in the course of the script into the ColladaQueue.  
 Once the Queue detects it is empty, it will call all the 'main' 
 functions the user wants to start automatically.
 
 If the user did not provide the library with main functions, it will be
 up to the user to call those main functions.  If the user did not 
 provide the models they will use in their script, references to models 
 may not exit yet when the main funciton is executed.
 */
c3dl.init = function ()
{
  // if the user does not want to parse any collada models,
  // we don't put anything in the queue and go right ahead and 
  // call the main methods.  
  if (c3dl.ColladaManager.values.length == 0 || c3dl.PreLoader.loaded) {
    for (var i = 0, len = c3dl.mainCallBacks.length; i < len; i++) {
        // Each element is an object which holds a function 
        // and a tag.  They were both placed in a wrapper
        // object so we can stick to using arrays for simplicity.
        var func = c3dl.mainCallBacks[i].f;
        var tag = c3dl.mainCallBacks[i].t;
        func(tag);
    }
  }
}

/**
 Add a model to the collada queue to be parsed
 before the main funciton is run. Call this function
 once for each collada file your script will use.
 
 @param {string} model - path to a .dae file.
 */
c3dl.addModel = function (model)
{
  var newModel = new c3dl.Collada();
  newModel.init(model);
}

/**
 Add a function to a list of functions to call once the
 page is finished loading.
 
 @param {Function} func - the function to call once the web page
 is finished loading.
 
 @param {String} tagName - the tag name of the canvas associated 
 with the function.
 */
c3dl.addMainCallBack = function (func, tagName)
{
  // put both objects into a wrapper object so later
  // we can access the couple as an array access.
  var obj =
  {
    f: func,
    t: tagName
  };

  c3dl.mainCallBacks.push(obj);
}

// This will make sure the c3dl.init() funciton is called once the web page
// is done loading.
if (document.addEventListener) { 
  document.addEventListener("DOMContentLoaded", c3dl.init, false);
}

c3dl.PreLoader = {
  progress: 0,
  loaded: false,
  checkProgress: function () {
    c3dl.PreLoader.progress = 0;
    var counter = 0;
    c3dl.PreLoader.loaded = true;
    for (var i = 0; i < c3dl.ColladaManager.values.length; i++) {
      c3dl.PreLoader.progress+=c3dl.ColladaManager.values[i].progress;
      if (!c3dl.ColladaManager.values[i].loaded) {c3dl.PreLoader.loaded = false};
    }
    c3dl.PreLoader.progress = c3dl.PreLoader.progress/c3dl.ColladaManager.values.length;
    c3dl.PreLoader.callBack()
    if (c3dl.PreLoader.loaded) { 
      c3dl.init();
    }
  },
  callBack: function () {}
};