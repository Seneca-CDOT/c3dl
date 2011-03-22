/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class A Scene should be thought of as a scene on a movie set.  A scene 
 would typically contain objects which are moving and a current camera,
 lights, etc.
 */
c3dl.Scene = function ()
{
  // Engine Variables
  var glCanvas3D = null; // WebGL Context (Canvas)
  var renderer = null;
  var camera = null; // Reference to a Camera type
  var projMat = null;

  // Picking is implemented as a class, should be changed
  // to a function. For now we need to make an instance of the class. 
  // We store this in this.pick.
  this.pick;
  this.pickingPrecision = c3dl.PICK_PRECISION_TRIANGLES;

  // This will hold the function the user wants called everytime 
  // there is a mouse down event.
  this.pickingHandler;

  // This is off by default since users will likely only need it when
  // trying to debug something.
  this.boundingVolumesVisible = false;

  // A reference to a model which will actually act as a 
  // SkyBox, except any Model can be used, not just a box.
  var skyModel = null;

  // list of objects in the scene and list of lights
  var objList = []; // An array of objects to draw
  var lightList = [c3dl.MAX_LIGHTS];

  // each scene has its own point attenuation factors giving the user
  // the flexibility to have different factors for each scene.
  var pointAttenuation = c3dl.makeVector(1, 0, 0);
  var pointSize = 5;

  // default point rendering to spheres to prevent possible crashing
  // when users render points which playing a DVD on OS X.
  var pointRenderingMode = c3dl.POINT_MODE_SPHERE;
  var pauseRender = false; //Pause the render loop
  var exitRender = false; // Exits the render loop
  var pauseUpdate = false; //Pause the update loop
  var canvasTag = null;
  var canvas2Dlist = [];

  // Input Handler Variables
  var kybdHandler = null;
  var mouseHandler = null;
  var updateHandler = null;

  // Performance variables
  var lastTimeTaken = Date.now();
  var numFramesSinceSceneStart = 0;

  // this is re-calculated every second and queried with getFPS();
  var FPS = 0;
  // will be reset after calculating the FPS.
  var FPS_Counter = 0;
  var FPS_LastTimeTaken = Date.now();

  // This will be the color of the background if the user does not change it.
  var backgroundColor = c3dl.makeVector(c3dl.DEFAULT_BG_RED, c3dl.DEFAULT_BG_GREEN, c3dl.DEFAULT_BG_BLUE);
  var ambientLight = c3dl.makeVector(1, 1, 1);
  var thisScn = null;

  // If the user calls addTexture on scene, but the scene does not have
  // a renderer, there's no was for the texture to be created. In that case
  // place the texture path in a queue which will be passed to the renderer 
  // once it is set.
  var textureQueue = [];
  var pointPositions = null;
  //type of culling 
  var frustumCulling = new c3dl.Frustum();
  var culling = "BoundingSphere"
  //Collision
  var collision = false;
  var collisionList = [];
  var collisionDetection = new c3dl.CollisionDetection();
  //can detect collision between the entire model or the geometries making up the model
  //collisionType = "Collada" or "Geometry"
  var collisionType = "Collada"; 
  //cache attributes and location
  this.curContextCache = { attributes: {}, locations: {} };
  // -------------------------------------------------------
  /**
   Add a texture to this scene to be used used for assigning to a model,
   particle system etc. 
   
   If the renderer was not set for the scene, the texture will be queued and
   will begin to load once the renderer is set
   
   @param {String} path
   */
/*	this.addTexture = function(path)
	{
		// check path parameter
		if(path)
		{
			if(renderer && renderer.getGLContext())
			{
				renderer.addTexture(path);
			}
			else
			{
				textureQueue.push(path);
			}
		}
		else
		{
			c3dl.debug.logWarning("Invalid parameter, '" + path + "' was passed to Scene's addTexture()");
		}
	}*/

  /**
   
   */
/*	this.getTextureID = function(path)
	{
		if(renderer)
		{
			return renderer.getTextureID(path);
		}
		else
		{
			return -1;
		}
	}*/

  /**
   @returns {Array} 
   */
  this.getPointAttenuation = function ()
  {
    return [pointAttenuation[0], pointAttenuation[1], pointAttenuation[2]];
  }

  /**
   @private
   
   When the picking function runs, it needs the projection matrix
   which was used to render the scene. Since one camera can be used for
   many scenes, we can't get the projection from the camera because it would
   change each time a canvas with a different aspect ratio is rendered.
   
   We have to provide a accessor to the projection matrix at the scene level.
   */
  this.getProjectionMatrix = function ()
  {
    return projMat;
  }

  /**
   @private
   
   Will the bounding volumes be drawn on render?
   
   @returns {boolean} true if the bounding volumes will be drawn, false otherwise.
   */
  this.getBoundingVolumeVisibility = function ()
  {
    return this.boundingVolumesVisible;
  }

  /**
   Get the camera of the scene.
   
   @returns {Camera} The camera of the scene.
   */
  this.getCamera = function ()
  {
    return camera;
  }

  /**
   Get the number of objects in the scene.
   
   @returns {int} The number of objects in the object list.
   */
  this.getObjListSize = function ()
  {
    return objList.length;
  }

  /**
   Get the context.
   
   @returns {Context}
   */
  this.getGL = function ()
  {
    return glCanvas3D;
  }

  /**
   Get the amount of frames rendered since the start of the scene.
   @private
   */
  this.getTotalFrameCount = function ()
  {
    return numFramesSinceSceneStart;
  }

  /**
   Get the number of frames rendered in the last second.
   
   @returns {float} the number of frames rendered in the 
   last second.
   */
  this.getFPS = function ()
  {
    return FPS;
  }

  /**
   Get the scene's Renderer
   */
  this.getRenderer = function ()
  {
    return renderer;
  }

  /**
   Get the Scene.
   
   @returns {c3dl.Scene}
   */
  this.getScene = function ()
  {
    return thisScn;
  }

  /**
   Get the SkyModel.
   
   @returns {c3dl.Collada} The Scene's SkyModel.
   */
  this.getSkyModel = function ()
  {
    return skyModel;
  }

  /**
   Get the ambient light of the scene.
   
   @returns {Array} An Array of 3 values in the order RGB.
   */
  this.getAmbientLight = function ()
  {
    return [ambientLight[0], ambientLight[1], ambientLight[2]];
  }

  /**
   Get a reference of a particular object in the scene.
   
   @param indxNum The index number of the object.
   
   @return the reference to the object at index number indxNum or null 
   if indxNum was out of bounds.
   */
  this.getObj = function (indxNum)
  {
    if (isNaN(indxNum))
    {
      c3dl.debug.logWarning("Scene::getObj() called with a parameter that's not a number");
      return null;
    }
    // Check if the index that was asked for is inside the bounds of our array
    if (indxNum < 0 || indxNum >= objList.length)
    {
      c3dl.debug.logWarning("Scene::getObj() called with " + indxNum + ", which is not betwen 0 and " + objList.length);
      return null;
    }

    // We do this because we dont want outsiders modifying the object list,
    // just the object themselves (ie. changing position, orientation, etc)
    return objList[indxNum];
  }


  /**
   Get the type of test which will run when a user clicks on the canvas.
   
   @returns c3dl.PICK_PRECISION_BOUNDING_VOLUME or c3dl.PICK_PRECISION_TRIANGLE.
   */
  this.getPickingPrecision = function ()
  {
    return this.pickingPrecision;
  }


  /**
   @private
   
   @param {boolean} visible true if the bounding volumes should be drawn, otherwise
   set to false.
   */
  this.setBoundingVolumeVisibility = function (visible)
  {
    this.boundingVolumesVisible = visible;
  }


  /**
   Set the functions to call when a key is pressed or released. <br />
   TODO: add keyPress event callback as windows and osx versions of firefox
   handle keyboard events differently.
   
   @param {function} keyUpCB The callback function for the up key.		
   @param {function} keyDownCD The callback function for the down key.
   */
  this.setKeyboardCallback = function (keyUpCB, keyDownCB)
  {
    if (canvasTag)
    {
      // Register True keyboard listeners
      if (keyUpCB != null) document.addEventListener("keyup", keyUpCB, false);
      if (keyDownCB != null) document.addEventListener("keydown", keyDownCB, false);
    }
  }

  /**
   Pass in the functions to call when mouse event occur such as when 
   a button is pressed, released or the mousewheel is scrolled.  The
   scene will call these functions when the events occur.
   
   @param {function} mouseUpCB
   @param {function} mouseDownCB
   @param {function} mouseMoveCB
   @param {function} mouseScrollCB
   */
  this.setMouseCallback = function (mouseUpCB, mouseDownCB, mouseMoveCB, mouseScrollCB)
  {
    if (canvasTag)
    {
      // Register all Mouse listeners
      if (mouseMoveCB != null) canvasTag.addEventListener("mousemove", mouseMoveCB, false);
      if (mouseUpCB != null) canvasTag.addEventListener("mouseup", mouseUpCB, false);
      if (mouseDownCB != null) canvasTag.addEventListener("mousedown", mouseDownCB, false);

      // Firefox uses DOMMouseScroll, Safari and Chrome use mousewheel
      if (mouseScrollCB != null)
      {
        canvasTag.addEventListener("DOMMouseScroll", mouseScrollCB, false);
        canvasTag.addEventListener("mousewheel", mouseScrollCB, false);
      }
    }
  }

  /**
   Tell the scene what function to call when a user clicks on the canvas.
   
   @param {function} pickingHandler The function to call when the user clicks on the canvas.
   */
  this.setPickingCallback = function (pickingHandler)
  {
    if (pickingHandler && pickingHandler instanceof Function)
    {
      // for now we need to make an instance, this needs to be changed.
      this.pick = new c3dl.Picking(this);

      // set the picking handler
      this.pickingHandler = pickingHandler;
      canvasTag.addEventListener("mousedown", this.pick.onMouseDown, false);
    }
    else
    {
      c3dl.debug.logWarning("scene's setPickingCallback() was passed an invalid callback function");
    }
  }

  /**
   Get the function which will be called when the user clicks on the
   canvas.
   
   @returns {Function} the function which is called when the user clicks
   on the canvas.
   */
  this.getPickingCallback = function ()
  {
    return this.pickingHandler;
  }

  /**
   Set how the points attenuate for this scene.
   
   @param {Array} attn with three values.<br />
   first contains constant attenuation<br />
   second contains linear attenuation<br />
   third contains quadratic attenuation<br />
   At least one of the elements must be greater than one or the 
   argument is ignored.
   */
  this.setPointAttenuation = function (attn)
  {
    if (attn.length == 3 && (attn[0] > 0 || attn[1] > 0 || attn[2] > 0))
    {
      pointAttenuation[0] = attn[0];
      pointAttenuation[1] = attn[1];
      pointAttenuation[2] = attn[2];
    }
  }

  /**		
   Get the size of the spheres when they are rendered as points.
   
   @returns {float} size the points will be when they are rendered as
   spheres.
   */
  this.getPointSize = function ()
  {
    return pointSize;
  }

  /**
   Sets the point size when rendering points as spheres.
   To change point size when rendering points as circles,
   or using the built-in points, use setPointAttenuation.
   
   @param {float} size Must be greater than zero.
   */
  this.setPointSize = function (size)
  {
    if (size > 0)
    {
      pointSize = size;
    }
  }

  /**
   Set the SkyModel. A SkyModel acts like a skybox, when the camera 
   moves in the scene the SkyModel maintains the same distance from 
   the camera.  This creates the illusion that there are parts to 
   the scene that are very far away which cannot be reached.  
   Applications of this would include creating clouds, or mountain 
   ranges, starfields, etc.  Any Model can be passed in and is not
   restricted to a Cube.  Whatever model that is appropirate should 
   be used.
   
   @param {c3dl.Collada} sky A Model which will maintain the same distance 
   from the Scene's camera.
   */
  this.setSkyModel = function (sky)
  {
    if (sky instanceof c3dl.Collada)
    {
      skyModel = sky;
    }
    else
    {
      c3dl.debug.Warning("Scene::setSkyModel() Inavlid argument passed, was not c3dl.Collada.");
    }
  }

  /**
   Set the function to call everytime the scene is updated.
   
   @param {function} updateCB The function to call everytime the
   scene is updated.
   */
  this.setUpdateCallback = function (updateCB)
  {
    if (canvasTag)
    {
      if (updateCB != null)
      {
        updateHandler = updateCB;
      }
    }
  }

  /**
   Set the renderer used to render the scene.
   
   @param {c3dl.WebGL} renderType
   */
  this.setRenderer = function (renderType)
  {
    // Set the type of renderer to use
    if (renderType instanceof c3dl.WebGL)
    {
      renderer = renderType;
    }
  }

  /**
   @param {String} canvasTagID The id of the canvas, which is
   a property of the canvas tag in the html file.
   */
  this.setCanvasTag = function (canvasTagID)
  {
    // Get the Canvas tag
    canvasTag = document.getElementById(canvasTagID);
    if (canvasTag == null)
    {
      c3dl.debug.logWarning('Scene::setCanvasTag() No canvas tag with name ' + canvasTagID + ' was found.');
    }
  }

  /**
   Return the canvas
   */
  this.getCanvas = function ()
  {
    return canvasTag;
  }

  /**
   Set the Scene's camera.
   
   @param {c3dl.FreeCamera} cam The camera.
   */
  this.setCamera = function (cam)
  {
    // Check to see if we were passed a correct Camera class
    if (cam instanceof c3dl.FreeCamera || cam instanceof c3dl.OrbitCamera)
    {
      camera = cam;
      return true;
    }

    c3dl.debug.logWarning('Scene::setCamera() invalid type of camera.');
    return false;
  }

  /**
   If the scene has been provided with a picking callback, when the user clicks the canvas
   either one or two sets of tests will run.  If the bounding volume constant is passed to 
   this function, a fast, approximate test is run for objects which can be picked against the
   ray generated by the click.  If the triangles constant is passed in, both the ray/bounding volume test 
   will run along with a ray/triangle test for each object which can be picked.
   
   @param {c3dl.PICK_PRECISION_BOUNDING_VOLUME | c3dl.PICK_PRECISION_TRIANGLE} precision The precision test to use when the user clicks the canvas.
   */
  this.setPickingPrecision = function (precision)
  {
    if (precision == c3dl.PICK_PRECISION_BOUNDING_VOLUME || precision == c3dl.PICK_PRECISION_TRIANGLE)
    {
      this.pickingPrecision = precision;
    }
  }


  /**
   @private
   This one just calls addTextToModel()
   //!! need dest as a parameter, probably in pixels, where to put the text
   */
  this.addFloatingText = function (text, fontStyle, fontColour, backgroundColour)
  {
    var box = this.addTextToModel(null, text, fontStyle, fontColour, backgroundColour);
    box.stayInFrontOfCamera = true;
    this.addObjectToScene(box);
  }

  /**
   @private
   Create a 2D canvas, render the text into it, and use that as a texture for model.
   If model is null, create a rectangle and stick the text onto it.
   */
  this.addTextToModel = function (model, text, fontStyle, fontColour, backgroundColour)
  {
    // Create a SPAN element with the string and style matching what the user asked
    // for the floating text.
    var tempSpan = document.createElement('span');
    var tempSpanStyle = document.createElement('style');
    var tempSpanStyleContent = document.createTextNode('span{' + 'font: ' + fontStyle + ';' + 'color: ' + fontColour + '; ' + 'background: ' + backgroundColour + ';}');
    var tempText = document.createTextNode(text);
    tempSpanStyle.appendChild(tempSpanStyleContent);
    tempSpan.appendChild(tempSpanStyle);
    tempSpan.appendChild(tempText);

    // Append it to the body so it's momentarily displayed. I couldn't find a way to measure
    // the text box's size without displaying it.
    document.body.appendChild(tempSpan);

    var actualStringWidth = tempSpan.offsetWidth;
    var actualStringHeight = tempSpan.offsetHeight;
    var stringWidth = c3dl.roundUpToNextPowerOfTwo(tempSpan.offsetWidth);
    var stringHeight = c3dl.roundUpToNextPowerOfTwo(tempSpan.offsetHeight);

    // Now get rid of that element, we only needed it to measure it
    tempSpan.removeChild(tempSpanStyle);
    document.body.removeChild(tempSpan);

    var box;
    if (model == null)
    {
      var whRatio = stringWidth / stringHeight;

      // Model for the plane with the text, size based on whRatio
      var smallCanvasVertices = [
        [-1.0 * (whRatio / 2), -1.0, 0.0], // 0 - bottom left
        [-1.0 * (whRatio / 2), 1.0, 0.0], // 1 - top left
        [1.0 * (whRatio / 2), 1.0, 0.0], // 2 - top right
        [1.0 * (whRatio / 2), -1.0, 0.0], // 3 - bottom right
        ];
      var smallCanvasNormals = [
        [0, 0, -1]
      ];
      var smallCanvasUVs = [
        [0.0, 1.0], // 0 - bottom left
        [0.0, 0.0], // 1 - top left
        [1.0, 0.0], // 2 - top right	
        [1.0, 1.0] // 3 - bottom right
        ];
      var smallCanvasFaces = [
        [0, 0, 0],
        [3, 3, 0],
        [2, 2, 0],
        [0, 0, 0],
        [2, 2, 0],
        [1, 1, 0]
      ];

      box = new Model();
      box.init(smallCanvasVertices, smallCanvasNormals, smallCanvasUVs, smallCanvasFaces);
      //box.setAngularVel(new Array(0.003, 0.000, 0.000));
      //box.pitch(-0.4);
      //!! need something user-specified
      box.setPosition([5, 0, 5]);
    }
    else box = model;

    // Draw the text into the 2D canvas and use it for the above model's texture
    var textureCanvas = this.create2Dcanvas(stringWidth, stringHeight);
    if (textureCanvas.getContext)
    {
      var ctx = textureCanvas.getContext('2d');

      if (fontStyle) ctx.mozTextStyle = fontStyle;

      // Fill everything with backgroundColour if it's specified
      if (backgroundColour)
      {
        ctx.fillStyle = backgroundColour;
        ctx.fillRect(0, 0, stringWidth, stringHeight);
      }

      // Center the text in the 2D canvas
      ctx.translate((stringWidth - actualStringWidth) / 2, stringHeight - (stringHeight - actualStringHeight));

      if (fontColour) ctx.fillStyle = fontColour;
      else ctx.fillStyle = 'black';

      ctx.mozDrawText(text);

      box.setTextureFromCanvas2D(textureCanvas.id);
      //textureManager.addTextureFromCanvas2D(textureCanvas.id);
    }
    else c3dl.debug.logWarning("addFloatingText(): call to create2Dcanvas() failed");
    return box;
  }

  /**
   @private
   Create a 2D canvas for drawing text and other stuff. Keep a 
   reference to it.
   
   @return {CanvasTag}
   */
  this.create2Dcanvas = function (width, height)
  {
    var newCanvas = document.createElement('canvas');
    newCanvas.id = 'changemetorandomstring';
    newCanvas.width = width;
    newCanvas.height = height;
    canvasTag.appendChild(newCanvas);

    canvas2Dlist.push(newCanvas);

    return newCanvas;
  }

  /**
   Set the color of the background. Values are clamped to the 
   range [0,1].
   
   @param {Array} bgColor Array of four values in the order [r,g,b,a].
   */
  this.setBackgroundColor = function (bgColor)
  {
    if (bgColor.length >= 3)
    {
      backgroundColor = [bgColor[0], bgColor[1], bgColor[2]]; 
      if (renderer)
      {
        renderer.setClearColor(backgroundColor);
      }
    }
  }


  /**
   Set how c3dl.Point objects are rendered.
   c3dl.POINT_MODE_POINT will render the points using WebGL's built-in 2D billboarded point primitives
   c3dl.POINT_MODE_SPHERE will render points using sphere objects.
   
   @param {c3dl.POINT_MODE_POINT | c3dl.POINT_MODE_SPHERE} mode 
   */
  this.setPointRenderingMode = function (mode)
  {
    if (mode == c3dl.POINT_MODE_POINT || mode == c3dl.POINT_MODE_SPHERE)
    {
      pointRenderingMode = mode;
    }
    else
    {
      c3dl.debug.logWarning("Invalid mode passed to setPointRenderingMode");
    }
  }

  /**
   Get how the points are rendered in the scene. Either they are rendered using
   
   WebGL's built-in method, or are rendered as sphere meshes.
   
   @returns {c3dl.POINT_MODE_POINT | c3dl.POINT_MODE_SPHERE} rendering mode.
   */
  this.getPointRenderingMode = function ()
  {
    return pointRenderingMode;
  }


  /**
   Get the color of the background.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getBackgroundColor = function ()
  {
    return c3dl.copyVector(backgroundColor);
  }

  /**
   Set the ambient light of the scene.
   
   @param {Array} light An array of 3 floating point values 
   ranging from 0 to 1.
   */
  this.setAmbientLight = function (light)
  {
    if (light.length >= 3)
    {
      ambientLight = [light[0], light[1], light[2], 1];
    }
  }


  /**
   Acquire the WebGL Context
   
   @returns {boolean} true if the renderer was initialized, otherwise false.
   */
  this.init = function ()
  {
    if (renderer != null && canvasTag != null)
    {
      // Initialize the renderer
      if (!renderer.createRenderer(canvasTag))
      {
        c3dl.debug.logError("Your browser does not support WebGL.<br />" + "Visit the <a href='http://en.wikipedia.org/wiki/WebGL'>WebGL wiki page</a> for information on downloading a WebGL enabled browser");
        return false;
      }
      // Get the Canvas
      glCanvas3D = renderer.getGLContext();

      // tell the renderer the default color the color buffer should be 
      // every render.
      this.setBackgroundColor(backgroundColor);

      // Set our global (fake static variable) to be used in rendering
      thisScn = this;

      // setup the lights
      // we have an array of elements, but they are all undefined,
      for (var i = 0, len = lightList.length; i < len; i++)
      {
        lightList[i] = null;
      }
      // Initialize the renderer
      return renderer.init(canvasTag.width, canvasTag.height);
    }
    c3dl.debug.logError('Scene::createScene() No renderer was specified.');
    return false;
  }

  /**
   Get a reference to a light from the list in the scene. This is an O(n) 
   operation.
   
   @param {String} lightName the name of the light.
   
   @returns a reference to a light object or null if it was not found.
   */
  this.getLight = function (name)
  {
    for (var i = 0, len = lightList.length; i < len; i++)
    {
      // if we found a match, since we have 'holes' in the array
      // check that the value is not null before calling its method.
      if (lightList[i] && lightList[i].getName() == name)
      {
        return lightList[i];
      }
    }
    return null;
  }

  /**
   Adds a light to a scene if the maximum number of lights in the scene
   has not been exceeded.
   
   @param {c3dl.PositionalLight|c3dl.DirectionalLight|c3dl.SpotLight} light the light to add.
   
   @returns {boolean} true if the light could be added, otherwise returns false.
   */
  this.addLight = function (light)
  {
    // start from the beginning of the list anf find the first empty spot.
    for (var i = 0; i < c3dl.MAX_LIGHTS; i++)
    {
      // either the light was not yet set to null or we are recycling the spot.
      if (lightList[i] == null)
      {
        lightList[i] = light;
        return true;
      }
    }

    // if the iterated over all the lights and didn't find an empty spot,
    // we end up here, returning to indicate the light was not added.
    return false;
  }

 /**
   Remove a light from the scene. The first light found matching the name 
   light or object light will be removed.
   
   @param {String || c3dl.Light } light the name of the light or the c3dl object light
   */
  this.removeLight = function (light)
  {
    // There are 2 copies of the light, one in our js code and one in the WebGL
    // state variable.  We need to remove the light object from our list and set
    // the WebGL state variable to all zeros so it will no longer affect the scene.
    // first find the index of the light in our array.
    var lightID = -1;
    for (var i = 0; i < lightList.length && lightID == -1; i++)
    {
      if (lightList[i] && (lightList[i].getName() == light || lightList[i] === light))
      {
        lightID = i;
      }
    }

    // now that we have the index, we have to set the corresponding WebGL state
    // to zeros, which will prevent the light from affecting the scene.
    //
    if (lightID != -1)
    {
      // place a 'hole' in the array. This can later be populated with another light.
      // don't delete the light, leave it up to the gc, otherwise
      // the light seems to stay on and can't be removed.		
      lightList[lightID] = null;

      // we removed the light from our list, but WebGL still has
      // a light state which needs to be cleared.  Otherwise the
      // light will still affect the scene.
      renderer.clearLight(lightID, this);
    }
    return (lightID == -1 ? false : true);
  }
  
  /**
   @private
   Update the boundingVolume light state variables with our list of lights
   This happens every frame.
   */
  this.updateLights = function ()
  {
    renderer.updateAmbientLight(this.getAmbientLight(), this);
    renderer.updateLights(lightList, this);
  }

  /**
   Add the object 'obj' to the scene.
   
   @param {c3dl.Primitive|c3dl.ParticleSystem|c3dl.Point|c3dl.Line} obj A reference to an object.
   
   @return {boolean} True if the object was added to the scene, false otherwise.
   */
  this.addObjectToScene = function (obj)
  {
    var type = obj.getObjectType();

    switch (type)
    {
    case c3dl.LINE:
    case c3dl.POINT:
    case c3dl.PARTICLE_SYSTEM:
    case c3dl.COLLADA:
    case c3dl.SHAPE:
      objList.push(obj);
      return true;
    }

    c3dl.debug.logWarning("Scene::addObjectToScene() called with an invalid argument.");
    return false;
  }

  /**
   Remove an object from the scene. This is an O(n) operation.
   
   @param {c3dl.Primitive|c3dl.ParticleSystem|c3dl.Point|c3dl.Line} obj The object to remove from the scene.
   
   @return {boolean} true if the object was found and removed from the scene or
   false if the argument 'obj' was not found.
   */
  this.removeObjectFromScene = function (obj)
  {
    var isFound = false;

    if (obj instanceof c3dl.Primitive || obj instanceof c3dl.Point || obj instanceof c3dl.Line || obj instanceof c3dl.ParticleSystem)
    {
      // Check against each item in the list
      for (var i = 0, len = objList.length; i < len; i++)
      {
        if (objList[i] == obj)
        {
          // Remove the item
          objList.splice(i, 1);
          isFound = true;
        }
      }
    }
    else
    {
      c3dl.debug.logWarning('Scene::removeObjectFromScene() called with an invalid argument.');
    }

    return isFound;
  }
  
/**
   @private
   Render Loop
   */
  this.render = function ()
  {
    // calculate FPS. 
    // we update the FPS after a second or more has elapsed.
    var sec = (new Date().getTime() - FPS_LastTimeTaken) / 1000;
    FPS_Counter++;
    var fps = FPS_Counter / sec;
    if (sec > 0.5)
    {
      // frames / seconds
      FPS = fps;
      FPS_Counter = 0;
      FPS_LastTimeTaken = new Date().getTime();
    }

    // If a user wants to stop rendering, this is where it happens
    if (exitRender)
    {
      if (c3dl.debug.SHARK === true)
      {
        stopShark();
        disconnectShark();
      }
      return;
    }
    if (pauseUpdate) {
      lastTimeTaken = Date.now();
    }
    if (!pauseUpdate) {
      // update the camera and objects
      camera.update(Date.now() - lastTimeTaken);
      thisScn.updateObjects(Date.now() - lastTimeTaken);
      lastTimeTaken = Date.now();
    }
    if (!pauseRender) {
      // The user may have added a texture to the scene in 
      // which case, the renderer needs to create them.
      if (textureQueue.length > 0)
      {
        for (var i = 0, len = textureQueue.length; i < len; i++)
        {
          renderer.addTexture(textureQueue[i]);
        }
        // clear out the queue. It will be empty until the
        // user adds new textures.
        textureQueue = [];
      }
      // clear the depth buffer and color buffer. This needs to be 
      // done every frame since objects likely have moved.
      renderer.clearBuffers();

      // we could have 2 canvases with different dimensions, but the same camera.
      // Therefore we need to update the camera with the aspect ratio since it's the 
      // camera that creates the projection matrix.
      // creates the projection matrix
      // this will place the view matrix at the bottom of the matrix stack.
      camera.applyToWorld(canvasTag.width / canvasTag.height);

      // save the projection matrix so if the picking code needs to know what
      // projection matrix was used, it can query the scene.
      projMat = camera.getProjectionMatrix();

      // now that the view matrix has been pushed onto the matrix stack,
      // we can specify the locations of the lights, which will use the top of the
      // matrix stack.
      thisScn.updateLights();

      // render objects in the scene.
      thisScn.renderObjects(glCanvas3D);
    }
    // we just rendered to the back buffer, so to see the changes, swap
    // the front and back buffers.
    //renderer.swapBuffers();
    numFramesSinceSceneStart++;
  }

  this.refresh = function() {
    thisScn.render();
    requestAnimFrame(thisScn.refresh);
  }
  
  /**
   Start scene sets a default ambient light to white with full 
   intensity.  If this ambient lighting is not desired, call 
   setAmbientLight(..) after this method, which will undo the
   default ambient light values.
   */
  this.startScene = function ()
  {
    if (c3dl.debug.SHARK === true)
    {
      connectShark();
      startShark();
    }
    numFramesSinceSceneStart = 0;
    frameCounter = 0;

    // Safety Checks
    if (glCanvas3D == null) return false;
    if (renderer == null) return false;
    if (camera == null) return false;

    // Start the timer
    lastTimeTaken = Date.now();

    // Benchmark hook:
    if (typeof(benchmarkSetupDone) == "function") benchmarkSetupDone();
    this.refresh();
    this.setAmbientLight([ambientLight[0], ambientLight[1], ambientLight[2]]);
  }

  /**
   @private
   Updates all objects based on time.
   
   @param {float} timeElapsed
   
   @returns {boolean} True if something updated.
   */
  this.updateObjects = function (timeElapsed)
  {
    // Call the User's update callback
    if (updateHandler != null)
    {
      updateHandler(timeElapsed);
    }
   collisionList=[];
    // update the rest of the objects individually
    for (var i = 0, len = objList.length; i < len; i++)
    {
      // we don't need to update lines or points since their
      // positions/coords are controlled by the user in the
      // update callback they write.
   
      switch (objList[i].getObjectType()) {
        case c3dl.PARTICLE_SYSTEM:
          objList[i].update(timeElapsed);
          break;
        case c3dl.COLLADA:
        case c3dl.SHAPE:
          objList[i].update(timeElapsed);
          //Collision
          if (collision) {
            for (var j = i, len2 = objList.length; j < len2; j++) {
              if (objList[j].getObjectType() == c3dl.COLLADA && i !== j) {
                if(collisionDetection.checkObjectCollision(objList[i],objList[j],timeElapsed, collisionType)) {
                  collisionList.push(objList[i]);
                  collisionList.push(objList[j]);
                }
              }
            }
          }
          break;
      }
    }
    // update the SkyModel
    if (skyModel) {
      skyModel.update(timeElapsed);
      // move skymodel so the camera is at its center.
      // Let the user scale it and rotate it if they wish.
      skyModel.setPosition(camera.getPosition());
    }
  }

  /**
   @private
   Renders all objects to the screen.
   */
  this.renderObjects = function ()
  {
    // draw the skyModel if there is one.
    if (skyModel)
    {
      //glCanvas3D.disable(glCanvas3D.CULL_FACE);
      glCanvas3D.frontFace(glCanvas3D.CW);
      glCanvas3D.cullFace(glCanvas3D.BACK);

      // We need to be able to draw the SkyModel, but without occluding any
      // objects in the scene.  If the SkyModel is too small, it will occlude
      // other objects. To prevent this, we turn off the depth buffer, that
      // way ANY object drawn will just be drawn ontop of the SkyModel.
      glCanvas3D.disable(glCanvas3D.DEPTH_TEST);

      // When rendering a 'skybox', the lights in the scene must
      // not light the model, since that would destroy the illusion
      // of the geometry being extremely far away.  So all lights
      // must be turned off and texture of the 'skybox' needs to be
      // set to full intensity so the texture is rendered.
      // get renderer's ambient light state
      var prevAmbient = this.getAmbientLight();

      // get renderer's lighting state
      var lightState = renderer.getLighting();

      // turn off renderer's light state
      renderer.setLighting(false);

      // turn rendering ambient to full
      renderer.updateAmbientLight([1, 1, 1], this);

      // render skyModel
      skyModel.render(glCanvas3D, this);

      // restore previous ambient light state
      renderer.setLighting(lightState);

      // restore previous lighting state
      renderer.updateAmbientLight(prevAmbient, this);

      // turn depth buffer back on so other object properly occlude each other.
      glCanvas3D.enable(glCanvas3D.DEPTH_TEST);
    }

    glCanvas3D.enable(glCanvas3D.CULL_FACE);
    glCanvas3D.frontFace(glCanvas3D.CCW);
    glCanvas3D.cullFace(glCanvas3D.BACK);
    // particle systems need to be rendered last, so first render
    // all opaque objects, then render particle systems. This is a bit
    // wasteful since we could have reordered the object list when the 
    // particle system was inserted, but the getObj(index) would then have 
    // been invalidated.
    var particleSystems = [];
    for (var i = 0, len = objList.length; i < len; i++)
    {
      if (objList[i].getObjectType() == c3dl.PARTICLE_SYSTEM)
      {
        particleSystems.push(objList[i]);
      }

      if (objList[i].getObjectType() == c3dl.COLLADA || objList[i].getObjectType() == c3dl.SHAPE)
      {
        var checker;	
        var cam = this.getCamera();
        var projMatrix = cam.projMatrix;		
        var viewMatrix = cam.viewMatrix;
        c3dl.multiplyMatrixByMatrix(projMatrix,viewMatrix, c3dl.mat1);
        frustumCulling.init(c3dl.mat1);
        var boundingVolume = objList[i].getBoundingVolume();
        //Culling using spheres
        if (culling === "BoundingSphere") {
          if (frustumCulling.sphereInFrustum(boundingVolume)) {		
            objList[i].setInsideFrustum(true);
            objList[i].render(glCanvas3D, this);
          }
          else {
            objList[i].setInsideFrustum(false);
          }
        }
        if (culling === "AABB") {
          if (frustumCulling.aabbInfrustum(boundingVolume.aabb.maxMins)) {	
            objList[i].setInsideFrustum(true);
            objList[i].render(glCanvas3D, this);
          }
          else {
            objList[i].setInsideFrustum(false);
          }
        }
        if (culling === "OBB") {
          if (frustumCulling.obbInfrustum(boundingVolume.obb.boxVerts)) {	
            objList[i].setInsideFrustum(true);
            objList[i].render(glCanvas3D, this);
          }
          else {
            objList[i].setInsideFrustum(false);
          }
        }
        if (culling === "All") {
          if (frustumCulling.sphereInFrustum(boundingVolume) && frustumCulling.aabbInfrustum(boundingVolume.aabb.maxMins) && frustumCulling.obbInfrustum(boundingVolume.obb.boxVerts)) {		
            objList[i].setInsideFrustum(true);
            objList[i].render(glCanvas3D, this);
          }
          else {
            objList[i].setInsideFrustum(false);
          }
        }
        else {
          objList[i].render(glCanvas3D, this);
        }
      }
    }
    // POINTS
    // if first time
    //if(pointPositions == null)
    //{
    pointPositions = new Array();
    pointColors = new Array();
    //}
    var currPoint = 0;

    // find all the points and group them together so we can make
    // only 1 call to drawArrays instead of once for each point.
    for (var i = 0, len = objList.length; i < len; i++)
    {
      if (objList[i].getObjectType() == c3dl.POINT && objList[i].isVisible())
      {
/*
				// if the array was already filled once before
				// only need to assign, not push, prevents the need to realloc array
				if( pointPositions.length > 0 && currPoint < pointPositions.length/3)
				{
					pointPositions[currPoint*3] = objList[i].getPosition()[0];
					pointPositions[(currPoint*3)+1] = objList[i].getPosition()[1];
					pointPositions[(currPoint*3)+2] = objList[i].getPosition()[2];
					
					pointColors[currPoint*3] = objList[i].getColor()[0];
					pointColors[(currPoint*3)+1] = objList[i].getColor()[1];
					pointColors[(currPoint*3)+2] = objList[i].getColor()[2];
					currPoint++;
				}
				else
				{
				*/
        pointPositions.push(objList[i].getPosition()[0]);
        pointPositions.push(objList[i].getPosition()[1]);
        pointPositions.push(objList[i].getPosition()[2]);

        pointColors.push(objList[i].getColor()[0]);
        pointColors.push(objList[i].getColor()[1]);
        pointColors.push(objList[i].getColor()[2]);
        //}
      }
    }

    renderer.renderPoints(pointPositions, pointColors, pointAttenuation, this.getPointRenderingMode(), pointSize, this);

    // LINES
    // collect all the lines from the scene, place them into this array
    // and pass the lines to the renderer.
    var lines = [];

    for (var j = 0, len = objList.length; j < len; j++)
    {
      if (objList[j].getObjectType() == c3dl.LINE && objList[j].isVisible())
      {
        lines.push(objList[j]);
      }
    }
    renderer.renderLines(lines, this);

    // Render the particle systems last because they 
    // have blending
    // glCanvas3D.frontFace(glCanvas3D.CW);
    for (var i = 0, len = particleSystems.length; i < len; i++)
    {
      particleSystems[i].render(glCanvas3D, this);
    }
  }

  /**
   Flags the main loop for exit.
   */
  this.stopScene = function () {
    // This flags the main loop to exit gracefully
    exitRender = true;
  }
  this.unpauseSceneRender = function () {
    pauseRender = false;
  }
  this.pauseSceneRender = function () {
    pauseRender = true;
  }
  this.unpauseSceneUpdate = function () {
    pauseUpdate = false;
  }
  this.pauseSceneUpdate = function () {
    pauseUpdate = true;
  }
  this.unpauseScene = function () {
    pauseRender = false;
    pauseUpdate = false;
  }
  this.pauseScene = function () {
    pauseRender = true;
    pauseUpdate = true;
  }
  this.getCollision = function () {
    return collisionList;
  }
  this.setCollision = function (truefalse) {
    collision = truefalse;
  }
  this.setCollisionType = function (type) {
    collisionType = type;
  }
  this.setCulling = function (type) {
    culling = type;
  }
  /**
   @private
   Loads images before they are actually used.  If a Model is created 
   later in the life of the script with a texture which has not yet 
   been loaded, the Model will be drawn without a texture until the
   texture is loaded.  This function prevents this from happening.
   Alternatively, the textureManager can be acquired from the Scene
   and multiple calls to addTexture() can be called. This method simply 
   serves as a convenience.
   
   <p><b>This must be called after Scene's init()</b></p>
   
   @param {string[]} imagePaths An array of paths of the images 
   relative to the html file which holds the main script.
   */
  this.preloadImages = function (imagePaths)
  {
    if (textureManager)
    {
      for (var i = 0, len = imagePaths.length; i < len; i++)
      {
        textureManager.addTexture(imagePaths[i]);
      }
    }
    else
    {
      c3dl.debug.logError("preloadImage() must be called after Scene's init()");
    }
  }
}