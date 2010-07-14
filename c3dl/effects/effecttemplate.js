/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class 
 
 <p>An EffectTemplate is a template for creating many Effects which have
 similar rendering results. Effects instantiated from EffectTemplates 
 achieve different rendering results by changing the parameters of the
 EffectTemplate.</p>
 
 <p>Effects cannot instantiate EffectTemplates until the EffectTemplate has been
 initialized.  However, once initialized, the EffectTemplate can no longer be modified.
 This includes changing the callback, parameters, shaders, etc.</p>
 
 <p>When an effect is instantiated from an effect template, any parameters the effect template
 has which are do not have default values must be set before the object with the effect is rendered.</p>
 */
c3dl.EffectTemplate = function ()
{
  this.vertexShaders = [];
  this.fragmentShaders = [];
  this.isInitialized = false;

  // array of objects.
  this.params = [];
  this.renderingCB = null;

  //
  //
  this.programObjects = [];


  /**
   Call this once the vertex shader, fragment shader and rendering callback have been 
   set and all parameters have been created. Once the EffectTemplate has been initialized,
   neither the shaders, callback or parameters can be changed.
   
   @returns {bool} true if the EffectTemplate was initialized, false otherwise.
   */
  this.init = function ()
  {
    var rc = false;

    // can only be initialize once
    if (this.isInitialized == false)
    {
      // these variables had to be set, parameters variable
      // is optional.
      if (this.renderingCB && this.vertexShaders.length > 0 && this.fragmentShaders.length > 0)
      {
        this.isInitialized = true;
        rc = true;
      }
    }
    return rc;
  }

  /**
   Adds a fragment shader to the list of fragment shaders which need to be compiled.
   The fragment shader strings are literally added together, therefore the order
   which they are added is important. For example, if the material struct it used,
   the variable holding the material string code should be added before the light
   string code since the light code depends on material code.
   
   @param {String} fragmentShader
   */
  this.addFragmentShader = function (fragmentShader)
  {
    if (this.isInitialized == false)
    {
      if (fragmentShader && typeof(fragmentShader) == "string")
      {
        this.fragmentShaders.push(fragmentShader);
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument passed to Effect's addFragmentShader().");
      }
    }
  }

  /**
   Add a parameter which and instance effect can modify. Parameters should be simple, built-in
   types such as Boolean, Number, Array etc. They should not be Objects created with {}.
   
   @param {String} paramName 
   @param paramType Constructor used to create the object such as Boolean, Number, Array, etc.
   @param paramDefaultValue The default value to be used if the user
   does not specify any value. If null, user will have to specify a value, 
   otherwise the object with this effect will not be rendered.
   */
  this.addParameter = function (paramName, paramType, paramDefaultValue)
  {
    if (this.isInitialized == false)
    {
      if (paramName && typeof(paramName) == "string")
      {
        var val;

        if (paramType == Array)
        {
          val = c3dl.copyObj(paramDefaultValue);
        }
        else
        {
          val = paramDefaultValue;
        }

        // Each parameter will be an object, so when copying is done
        // we can iterate the list by simply incrementing by one.
        this.params.push(
        {
          name: paramName,
          type: paramType,
          value: val
        });
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument(s) passed to Effect's addParameter().");
      }
    }
    else
    {
      c3dl.debug.logWarning("Effect addParameter(): cannot be called once an effect has been initialized.");
    }
  }

  /**
   Adds a vertex shader to the list of vertex shaders which need to be compiled.
   The vertex shader strings are literally added together, therefore the order
   which they are added is important. For example, if the material struct it used,
   the variable holding the material string code should be added before the light
   string code since the light code depends on material code.
   
   @param {String} vertexShader
   */
  this.addVertexShader = function (vertexShader)
  {
    if (this.isInitialized == false)
    {
      if (vertexShader && typeof(vertexShader) == "string")
      {
        this.vertexShaders.push(vertexShader);
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument passed to Effect's addVertexShader().");
      }
    }
  }

  /**
   @private
   Renderer will call this when it needs to compile the vertex shaders.
   
   @returns {String[]} vertex shaders.
   */
  this.getVertexShaders = function ()
  {
    return this.vertexShaders;
  }

  /**
   @private
   
   Get the array of all the parameters of this effect template.
   
   @returns {Array} array of objects.
   */
  this.getParameters = function ()
  {
    var ret = [];

    for (var i = 0, len = this.params.length; i < len; i++)
    {
      var val;

      if (typeof this.params[i].value == "Array")
      {
        val = c3dl.copyObj(this.params[i].value);
      }
      else
      {
        val = this.params[i].value;
      }

      ret.push(
      {
        name: this.params[i].name,
        type: this.params[i].type,
        value: val
      });
    }

    return ret;
  }

  /**
   @private
   
   Renderer will call this when it needs to compile the fragment shaders.
   
   @returns {String[]} fragment shaders
   */
  this.getFragmentShaders = function ()
  {
    return this.fragmentShaders;
  }

  /**
   Get the callback which is to be called when the
   geometric object with an effect created from this effect template is rendered.
   
   @returns {Function} The function which will render the geometric object
   with an effect created from this template effect.
   */
  this.getRenderingCallback = function ()
  {
    return this.renderingCB;
  }

  /**
   Set the rendering callback which will be called by the renderer when the
   object with this effect needs to be rendered. The renderer will pass a 
   renderingObject to the function which can be queried for context, renderer,
   effect, etc.
   
   @see c3dl.RenderingObject.
   
   @param {Function} func
   */
  this.setRenderingCallback = function (func)
  {
    if (this.isInitialized == false)
    {
      if (func instanceof Function)
      {
        this.renderingCB = func;
      }
      else
      {
        c3dl.debug.logWarning("Invalid argument passed to Effect's setRenderingCB().");
      }
    }
  }

  /**
   @private
   
   When the renderer compiles the shaders, it returns a program object id. Each
   renderer will have its own id for this particular effect.
   
   @returns {int} -1 if the rendererID was not found in the list
   */
  this.getProgramID = function (rendererID)
  {
    var programID = -1;
    var found = false;

    for (var i = 0, len = this.programObjects.length; found == false && i < len; i++)
    {
      if (found === false)
      {
        if (rendererID == this.programObjects[i].getRendererID())
        {
          found = true;
          programID = this.programObjects[i].getProgramID();
        }
      }
    }
    return programID;
  }

  /**
   @private
   
   @param {c3dl.ProgramObject} programObject
   */
  this.addProgramObject = function (programObject)
  {
    this.programObjects.push(programObject);
  }

  /**
   Get a string representation of this object.
   
   @param {String} [delimiter=","]  A string which will separate values.
   */
  this.toString = function (delimiter)
  {
    if (!delimiter && typeof(delimiter) != "string")
    {
      delimiter = ",";
    }

    return "Initialized = " + this.isInitialized + delimiter + "Vertex Shaders = " + 
      this.vertexShaders + delimiter + "Fragment Shaders = " + this.fragmentShaders + 
      delimiter + "Rendering Callback = " + this.renderingCB + delimiter + "Parameters = " + 
      this.parameters;
  }
}