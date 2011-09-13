/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 @class ModelQueue is a queueing system to load model files.  There
 seems to be issues when two or more files are attempted to be loaded
 in script.  Albeit, if the second model is loaded once the first has
 been completely loaded, then they are both loaded properly.  Therefore
 this class was created for taking care of such serial loading.
 */
c3dl.ModelQueue =
{

  queue: [],
  firstTime: true,

  /**
   @private
   Are there any more files to load?
   
   @returns {boolean} true if there are no more files to load, false otherwise.
   */
  isEmpty: function ()
  {
    return (c3dl.ModelQueue.queue.length == 0 ? true : false);
  },

  /**
   @private
   Add a file to load at the end of the list
   
   @param {Model} modelInstance
   */
  pushBack: function (modelInstance)
  {
    c3dl.ModelQueue.queue.push(modelInstance);

    // every time scene sees that a file is loaded, it
    // will popFront(), which in turn will load the next
    // file, but for the first file loaded,  we have to
    // do it manually.
    if (c3dl.ModelQueue.firstTime)
    {
      c3dl.ModelQueue.firstTime = false;
      c3dl.ModelManager.loadFile(c3dl.ModelQueue.queue[0].path);
    }
  },

  /**
   @private	
   Remove the first element from the queue. Do this if the first
   element has finished loading.
   */
  popFront: function ()
  {
    c3dl.ModelQueue.queue.shift();

    // if there are more files to load, load them.
    if (c3dl.ModelQueue.isEmpty() == false)
    {
      c3dl.ModelManager.loadFile(c3dl.ModelQueue.queue[0].path);
    }

    // if all the models were done, but the user didn't give us	
    // their main functions, we don't want the gif spinning there
    // forever, so turn it off.	
    else if (c3dl.ModelQueue.isEmpty() == true && c3dl.mainCallBacks.length == 0)
    {
      c3dl.removeProgressBars();
    }

    // otherwise we loaded all the models, we can start rendering.
    else if (c3dl.ModelQueue.isEmpty() == true && c3dl.mainCallBacks.length != 0)
    {
      c3dl.removeProgressBars();

      for (var i = 0, len = c3dl.mainCallBacks.length; i < len; i++)
      {
        var func = c3dl.mainCallBacks[i].f;
        var tag = c3dl.mainCallBacks[i].t;
        func(tag);
      }
    }
  },

  /**
   @private	
   Get the first element from the queue.
   
   @returns {Model}
   */
  getFront: function ()
  {
    return c3dl.ModelQueue.queue[0];
  }
};