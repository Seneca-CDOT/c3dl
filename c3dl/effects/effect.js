/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Effect specifies exactly how a geometric object should 
 be rendered. An Effect is an instantiation of an EffectTemplate, which 
 is a template for creating effects with similar results.
 
 <p>
 Effects are composed of a vertex shader, fragment shader and a rendering 
 callback. The shaders perform the transformation, lighting calculations
 and anything else necessary. The callback typically sets the uniform and 
 vertex attributes.
 </p>
 
 <p>
 When the library is told to render an object which has an effect, it will first call
 the rendering callback. This allows the user to do things such as toggle depth
 tests, set the uniform variables, or adjust any other rendering state variables
 required to perform the required rendering. The shader programs are then executed
 and the object is rendered.
 </p>
 
 <p>
 Some effect templates have already been written and using them requires minimal 
 effort.
 <code><pre>
 // c3dl.effects is a namespace which contains premade effects.
 var effect = new c3dl.Effect();
 effect.init(c3dl.effects.GOOCH);
 var teapot = c3dl.Collada();
 teapot.init('teapot.dae');
 // the effect's parameters were not set, so the default Gooch params
 // will be used.
 teapot.setEffect(effect);
 </pre></code>
 </p>
 
 <p>
 In the example above, none of the Gooch parameters were set, therefore
 the default Gooch parameters are used. However, not all effects have 
 default parameters and therefore some need to be set. Wheather an effect
 has default parameters is noted in c3dl.effects.
 </p>
 */
c3dl.Effect = function ()
{
  // the effect this object is instantiating.
  this.effectTemplate = null;

  // these can be changed from the default ones created by the effect template.
  this.instanceParams = [];

  // prevent the effect from being initialized more than once.
  this.isInitialized = false;

  /**
   Call this after the Effect has been created. Once the Effect has been
   created and initialized, its parameters can be set.
   
   @param {c3dl.EffectTemplate} effectTemplate
   */
  this.init = function (effectTemplate)
  {
    var check = true;

    if (check || effectTemplate instanceof c3dl.EffectTemplate)
    {
      // keep a reference to the template as it holds the shaders
      // which will need to be compiled during rendering.
      this.effectTemplate = effectTemplate;

      // copy over the parameters which comprise of
      // names, types and default values.
      this.instanceParams = c3dl.copyObj(effectTemplate.getParameters());

      // prevent the Effect from being initialized more than once.
      this.isInitialized = true;
    }
    else
    {
      c3dl.debug.logWarning("Invalid argument passed to c3dl.Effect's init().");
    }
  }

  /**
   Get the EffectTemplate which was used to create this Effect.
   
   @returns {c3dl.EffectTemplate} the effect template which was used to
   create this effect.
   */
  this.getEffectTemplate = function ()
  {
    return this.effectTemplate;
  }

  /**
   Get the value of the parameter 'paramName'.
   
   @param {String} paramName
   
   @returns the value of 'paramName' or null if parameter does not exist or 
   has not been set.
   */
  this.getParameter = function (paramName)
  {
    var isFound = false;
    var returnVal = null;
    for (var i = 0, len = this.instanceParams.length; i < len; i++)
    {
      if (this.instanceParams[i].name == paramName)
      {
        isFound = true;
        returnVal = this.instanceParams[i].value;
      }
    }
    if (!isFound)
    {
      c3dl.debug.logWarning("Effect getParameter(): '" + paramName + "' does not exist.");
    }
    return returnVal;
  }

  /**
   Set the value of the parameter 'paramName' to 'paramvalue'.
   
   @param {String} paramName Name of the parameter to set.
   @param {} paramValue The value to set the parameter.
   
   If the value does not match the parameter's type, a warning will 
   be displayed and the parameter will not be set.
   */
  this.setParameter = function (paramName, paramValue)
  {
    // When the instance effect is initialized, all the default parameters from the effect
    // are copied to the instance effect and then they can be changed with setParameter.
    // Otherwise, there would be no place to store the values.
    if (this.isInitialized == false)
    {
      c3dl.debug.logWarning("Effect must be initialized with init() " + "before setting its parameters.");
    }
    else
    {
      var isFound = false;

      for (var i = 0, len = this.instanceParams.length; !isFound && i < len; i++)
      {
        if (paramName == this.instanceParams[i].name)
        {
          isFound = true;

          // check if the value matches the parameter's type
          if (paramValue.constructor == this.instanceParams[i].type)
          {
            this.instanceParams[i].value = paramValue;
          }
          else
          {
            // The value 'true' does not match parameter 'warmColor' type.
            // The value 'true' cannot be assigned to parameter 'warmColor'
            // because it is the incorrect type. Check the Effect documentation
            // for the correct type.
            c3dl.debug.logWarning("The value '" + paramValue + "' cannot be assigned " + "to parameter '" + paramName + "' because it is the " + "incorrect type. Check the c3dl.effects documentation " + " for the correct type.");
          }
        }
      }
      if (!isFound)
      {
        c3dl.debug.logWarning("Effect setParameter(): '" + paramName + "' does not exist.");
      }
    }
  }
}