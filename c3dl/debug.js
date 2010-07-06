/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class used to output error, warning and information to either the page or firebug.
 If firebug is enabled, the message will appear in both firebug and the page.
 */
c3dl.debug =
{
  //
  BENCHMARK: false,
  DUMMY: false,
  DUMP: false,
  SHARK: false,

  // will the messages be visible to the user which the script is running?
  isVisible: true,

  // keep track of the total number of lines logged and prevent logging
  // too many, which may slow down the browser.
  numLinesLogged: 0,

  // once this many lines have been logged, logging will stop to prevent the
  // browser from slowing down.
  maxLinesToLog: 100,

  isSetUp: false,

  // this will contain a div element which will be populated with <p> tags which 
  // are warning, errors, etc.
  logDiv: null,

  // make sure the user has firebug before writing to the firebug console.
  isFirebugEnabled: false,

  /**
   Is the debugger visible?
   
   @returns {boolean} true if logs will be displayed for the user, false otherwise.
   */
  getVisible: function ()
  {
    return c3dl.debug.isVisible;
  },

  /**
   @private
   Setup creates a div element and adds it to the DOM. This div will be populated with any warnings, 
   errors, etc. which happen to occur during the execution of the script.
   */
  setup: function ()
  {
    windowWidth = document.body.clientWidth - 50;
    windowHeight = document.body.clientHeight;
    logWindowWidth = windowWidth;
    logWindowHeight = 200;
    c3dl.debug.logDiv = document.createElement("div");
    c3dl.debug.logDiv.style.width = logWindowWidth + "px";
    c3dl.debug.logDiv.style.position = 'absolute';
    c3dl.debug.logDiv.style.top = windowHeight - logWindowHeight;
    c3dl.debug.logDiv.style.left = 5;
    c3dl.debug.logDiv.style.padding = 5;
    c3dl.debug.logDiv.style.opacity = .8;
    c3dl.debug.logDiv.style.border = '1px solid #000';
    c3dl.debug.logDiv.id = 'logdiv';
    c3dl.debug.logDiv.name = 'logdiv';
    document.body.appendChild(c3dl.debug.logDiv);

    // find out if the user is using firebug. If they are, we can add the messages to the
    // firebug console as well as the DOM.
    try
    {
      if (console)
      {
        c3dl.debug.isFirebugEnabled = true;
      }
    }
    catch (err)
    {
      c3dl.debug.isFirebugEnabled = false;
    }
    c3dl.debug.isSetUp = true;
  },

  /**
   
   @private
   @author Jeremy Giberson
   This gem will wrap any function call with an inspector that will log parameters and return values.
   
   param {String} functionName function calls you want to inspect
   param {Object} object
   */
  inspect: function (functionName, object)
  {
    var f;
    f = (object) ? object.functionName : window.funcName;
    object.functionName = function ()
    {
      // log args
      // c3dl.debug.log (arguments);
      var r = f.call(args);
      // log r
      // c3dl.debug.log (r);
      return r;
    }
  },

  /**
   Set the visibility of the logs.
   
   @param {boolean} isVisible true if the logs should be displayed, false if the logs should not
   be displayed.
   */
  setVisible: function (isVisible)
  {
    c3dl.debug.isVisible = isVisible;
  },

  /**
   @private
   If the user has firebug, the warning will
   be placed in the console.  The warning will also appear on the HTML page itself.
   
   @param {String} str The string which will be displayed on the HTML page.
   @param {String} type The type of log, either 'Info', 'Warning' or 'Error'.
   @param {String} colour A string which contains an HTML colour encoded 
   value, such as '#FF6666', 'yellow', etc.
   */
  doLog: function (str, type, color)
  {
    if (c3dl.debug.getVisible())
    {
      // if we reached the max number of lines to log, we will overwrite the parameters passed in
      // and print out our our warning specifying no more lines will be logged.
      if (c3dl.debug.numLinesLogged == c3dl.debug.maxLinesToLog)
      {
        // Too many lines logged may overload/slow down the browser.
        str = "Too many lines to log (" + c3dl.debug.numLinesLogged + "). Logging stopped.";
        type = c3dl.DEBUG_WARNING;
        colour = "yellow";
      }

      // don't log anything if we have too many lines, just return from this function.
      if (c3dl.debug.numLinesLogged > c3dl.debug.maxLinesToLog)
      {
        return;
      }

      if (!c3dl.debug.isSetUp)
      {
        c3dl.debug.setup();
      }

      // Output a log line to the HTML page
      var currentTime = new Date();

      // this should probably be lowercase
      var node = document.createElement('p');
      node.innerHTML = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + 
        currentTime.getSeconds() + ' ' + type + ': ' + str;
      node.style.background = color;
      c3dl.debug.logDiv.insertBefore(node, c3dl.debug.logDiv.firstChild);

      // output an appropriate log to the firebug console if it is enabled. If 
      // the user has firebug installed, but the console is enabled and we don't
      // check for this, our script could break.
      if (c3dl.debug.isFirebugEnabled)
      {
        switch (type)
        {
        case c3dl.DEBUG_WARNING:
          console.warn(str);
          break;
        case c3dl.DEBUG_ERROR:
          console.error(str);
          break;
        case c3dl.DEBUG_INFO:
          console.info(str);
          break;
        default:
          break;
        }
      }
      c3dl.debug.numLinesLogged++;
    }
  },

  /**
   @private
   Provide some sort of information the user should know about.
   
   @param {String} infoMsg the message containing some information which may be useful
   to the user.
   */
  logInfo: function (infoMsg)
  {
    c3dl.debug.doLog(infoMsg, c3dl.DEBUG_INFO, '#CCFFFF');
  },

  /**
   @private
   Inform the user of a warning. A warning indicates the script can still run, 
   but whatever caused the warning should be fixed. One example of a warning is trying to
   add an object to a scene which is not a valid object.
   
   @param {String} warningMsg the message containing information about the warning.
   */
  logWarning: function (warningMsg)
  {
    c3dl.debug.doLog(warningMsg, c3dl.DEBUG_WARNING, '#FFFF00');
  },

  /**
   @private
   Inform the user an exception has been caught. An exception can be something like trying to 
   access an array with an out of bounds index or trying to enable an unsupported capability.
   The script may still be able to run even after an exception has occured.
   
   @param {String} exceptionMsg the message containing information about the exception.
   */
  logException: function (exceptionMsg)
  {
    c3dl.debug.doLog(exceptionMsg, c3dl.DEBUG_EXCEPTION, '#FF6600');
  },

  /**
   @private
   Inform the user an error has occured.  An error prevents the script from running properly.
   An example of an error is the renderer failing to initialize because of an invalid value 
   passed to the renderer's initialize method.
   
   @param {String} errorMsg A string which indicates why the script failed to run.
   */
  logError: function (errorMsg)
  {
    c3dl.debug.doLog(errorMsg, c3dl.DEBUG_ERROR, '#FF2222');
  }
}