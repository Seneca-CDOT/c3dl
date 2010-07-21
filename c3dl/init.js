/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// functions for initialization
c3dl.mainCallBacks = [];
c3dl.preloadModels = [];

/**
 @private
 Add a progress bar for each canvas on the page.  Place them in the
 middle of each canvas.  The progress bar is an animated gif placed 
 in the center of the screen.  
 
 The primary purpose of using a progress bar is to notify users
 that collada model files are being parsed.   When the collada
 Queue becomes empty, it will automatically call removeProgressBars().
 */
c3dl.addProgressBars = function ()
{
  // get all the canvases in the DOM.
  var canvases = document.getElementsByTagName('canvas');

  // add a progress bar for each of the canvases.
  for (var i = 0, len = canvases.length; i < len; i++)
  {
    // to place the loading gif in the center of the canvas, we'll need to
    // get the absolute position of the canvas.
    var pos = c3dl.getObjectPosition(canvases[i]);
    var xOffset = pos[0];
    var yOffset = pos[1];
    var progressBar = document.createElement("img");
    progressBar.src = basePath + "/loading.gif";
    progressBar.style.position = 'absolute';
    // place the center of the gif in the center of the canvas
    // First get the middle of the canvas then add the offset from the 
    // top or left corner of the screen, then move the image left 
    // (by subtracting) since positioning the image is relative to 
    // the top left corner of the image.
    progressBar.style.left = (canvases[i].width / 2) + xOffset - (50); //progressBar.width/2); progressbar is not yet loaded
    progressBar.style.top = (canvases[i].height / 2) + yOffset - (50); // so its width and height is zero.
    // make it translucent as to not annoy the user too much.
    progressBar.style.opacity = 0.5;

    // try to force this image above all others.
    progressBar.style.zIndex = 100;

    // make sure the id of each progress bar is unique so we 
    // can remove them all later.
    progressBar.id = 'c3dl_progress_bar_' + i;
    document.body.appendChild(progressBar);
  }
}

/**
 @private
 Remove all the progress bars from the page.  Each canvas will have
 a progress bar if the user of the library used addModel() to add
 a model to be parsed. 
 */
c3dl.removeProgressBars = function ()
{
  // To remove all the loading bars, we just need to get the number of
  // canvases on the page.  Since every canvas will have their own loading
  // bar, we know how many bars there will be.  This will allow us to 
  // create the id's of each individual loading bar.
  var numProgressBars = document.getElementsByTagName('canvas').length;
  for (var i = 0; i < numProgressBars; i++)
  {
    // generate the id's of the progress bars
    var progressBarID = 'c3dl_progress_bar_' + i;
    var progressBar = document.getElementById(progressBarID);
    document.body.removeChild(progressBar);
  }
}

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
  if (c3dl.preloadModels.length == 0)
  {
    for (var i = 0, len = c3dl.mainCallBacks.length; i < len; i++)
    {
      // Each element is an object which holds a function 
      // and a tag.  They were both placed in a wrapper
      // object so we can stick to using arrays for simplicity.
      var func = c3dl.mainCallBacks[i].f;
      var tag = c3dl.mainCallBacks[i].t;
      func(tag);
    }
  }
  // otherwise we will let the collada queue call the main methods
  // once all the models have been parsed.
  // By creating collada objects, they will be placed in the queue.
  // Once the queue is empty, the main methods will be called by
  // the Queue.
  else
  {
    // This will add an animated gif to the DOM, letting
    // the user know that there is loading occuring.
    c3dl.addProgressBars();

    for (var i = 0, len = c3dl.preloadModels.length; i < len; i++)
    {
      var preloadColadda = new c3dl.Collada();
      preloadColadda.init(c3dl.preloadModels[i]);
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
  c3dl.preloadModels.push(model);
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
if (document.addEventListener)
{
  document.addEventListener("DOMContentLoaded", c3dl.init, false);
}