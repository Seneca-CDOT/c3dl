/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class WebGL context.
 @augments c3dl.Renderer
 */
c3dl.WebGL = c3dl.inherit(c3dl.Renderer, function () {
  c3dl._superc(this);
  var glCanvas3D = null; // GL Context; 
  this.texManager = null;

  // overwrite the version set in the Renderer base class.
  this.version = 2.0;

  // overwrite the version set in the Renderer base class.
  this.versionString = "WebGL";

  // program objects to render various visual objects.
  this.geometryShader;
  this.particleSystemShader;
  this.pointShader;
  this.pointSphereShader;
  this.lineShader;
  this.boundingSphereShader;
  this.programsWithLights = [];

  /// Maybe need to move these out somewhere else
  this.pointVertBuffer = null;
  this.pointColBuffer = null;

  this.lineVertBuffer = null;
  this.lineColBuffer = null;

  // unique id of this renderer
  this.ID = c3dl.getNextRendererID();
  this.STANDARD_PROGRAM_ID = null;

  this.textureQueue = [];

  // have the vbos to render point spheres been created
  this.pointSphereRenderReady = false;

  // Verts, Normals, etc will be added to this.
  this.pointsphereVBOVert;

  /**
   Add a texture to the renderer. If the texture was added before
   the renderer was initialized, the texture will be placed in a 
   queue and the texture will be created once the renderer has been
   initialized.
   
   The renderer will create an internal ID for the texture which can
   be queried by calling getTextureID. This ID can be passed to commands 
   of the context in the rendering callback function in effects to make 
   that texture active.
   
   @parma {String} path Texture path
   */
  this.addTexture = function (path)
  {
    //
    if (this.texManager == null)
    {
      this.textureQueue.push(path);
    }
    else
    {
      this.texManager.addTexture(path);
    }
  }

  /**
   Get the unique ID of this renderer.
   
   @returns {int} unique ID of this renderer.
   */
  this.getID = function ()
  {
    return this.ID;
  }

  /**
   Get the ID of the texture at 'texturePath'. If the texture could not
   be found or the renderer has not yet been initialized, -1 will be 
   returned.
   
   @param {String} texturePath
   
   @returns {int} The ID of the texture, or -1 if the renderer has not 
   yet been initialized or if the texture was not found.
   */
  this.getTextureID = function (texturePath)
  {
    if (this.texManager)
    {
      return this.texManager.getID(texturePath);
    }
    else
    {
      return -1;
    }
  }

  /**
   @private
   Is the renderer ready?
   
   @returns {boolean} True if the context is not null, otherwise false.
   */
  this.isReady = function ()
  {
    return glCanvas3D == null ? false : true;
  }

  /**
   Get the WebGL context.
   
   @returns {Context} The GL Context.
   */
  this.getGLContext = function ()
  {
    return glCanvas3D;
  }

  /**
   @private
   Create a program which is composed of shaders.
   
   Create a program object which is composed of compiled shader objects.
   This program object can be installed as the current rendering state 
   by using gl.useProgram().
   
   @param {Array|String} vertexShaderSource The source code for the vertex shader.
   @param {Array|String} fragmentShaderSource The source code for the fragment shader.
   
   @return {c3dl.ProgramObject} ProgramObject or null .
   */
  this.createProgram = function (vertexShader, fragmentShader)
  {
    // We don't check the parameters because the WebGL functions will already
    // be checking to make sure the source is valid when it compiles them. If 
    // they are invalid, error messages will be displayed on the page.
    // make alias for shorter code.
    var gl = glCanvas3D;

    // createProgram creates a program object to which our shaders can be
    // attached. We can later tell WebGL which program to use by 
    // calling useProgram().
    var program = gl.createProgram();

    // it is possible createProgram failed.
    if (program == null)
    {
      c3dl.debug.logError("failed to create shader program");
      return null;
    }

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertexShader);


    gl.compileShader(vertShader);

    // The compilation status of each shader can be queried.
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
    {
      c3dl.debug.logError("vert shader: " + gl.getShaderInfoLog(vertShader));
      gl.deleteShader(vertShader);
      return null;
    }

    gl.attachShader(program, vertShader);


    var vertShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertShader, fragmentShader);
    gl.compileShader(vertShader);

    // The compilation status of each shader can be queried.
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS))
    {
      c3dl.debug.logError("frag shader " + gl.getShaderInfoLog(vertShader));
      gl.deleteShader(vertShader);
      return null;
    }
    gl.attachShader(program, vertShader);

    // Linking is the final step which must be done to obtain a valid
    // program object. Linking assigns variable locations for uniform variables,
    // initialized user-defined uniform variables, resolves references
    // between independently compiled shader objects, etc.
    //
    // The status of the link operation is stored as part of the program object's
    // state which we will query.
    // 
    gl.linkProgram(program);

    // Check if the shaders were linked successfully.
    if (gl.getProgramParameter(program, gl.LINK_STATUS) != 1)
    {
      c3dl.debug.logError(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    // create a program object, similar to an WebGL program object.
    var programObject = new c3dl.ProgramObject();
    programObject.rendererID = this.ID;
    programObject.programID = program;

    return programObject;
  }

  /**
   @private
   Clear the color and depth buffers.
   
   Scene is responsible for calling this.
   */
  this.clearBuffers = function ()
  {
    glCanvas3D.clear(glCanvas3D.COLOR_BUFFER_BIT | glCanvas3D.DEPTH_BUFFER_BIT);
  }

  /**
   @private
   Swap the front and back buffers. Scene is responsible for calling this.
   */
  this.swapBuffers = function ()
  {
    glCanvas3D.clear(glCanvas3D.COLOR_BUFFER_BIT | glCanvas3D.DEPTH_BUFFER_BIT);
  }

  /**
   @private
   this is documented in the renderer class
   */
  this.setClearColor = function (bgColor)
  {
    if (bgColor.length >= 3)
    {
      glCanvas3D.clearColor(bgColor[0], bgColor[1], bgColor[2], 1.0);
    }
  }

  /**
   @private
   
   implementes the 'virtual' function getMaxLineWidth from renderer.
   
   Get the maximum line width supported which is implementation
   dependent.
   
   @returns {int} maximum line width supported.
   */
  this.getMaxLineWidth = function ()
  {
    // returns the range, first value represents minimum value supported.
    // WebGL guarantees support for width of 1.
    // should this be checked once on init and then we don't have to keep querying?
    var maxLineWidth = glCanvas3D.getParameter(glCanvas3D.ALIASED_LINE_WIDTH_RANGE);

    return maxLineWidth[1];
  }

  /**
   @private
   Set the shader values to zero so the light no longer affects the scene.
   
   @param {int} lightID The light to clear must range from 0 to one less than c3dl.MAX_LIGHTS.
   */
  this.clearLight = function (lightID, scene)
  {
    if (lightID >= 0 && lightID < c3dl.MAX_LIGHTS)
    {
      for (var i = 0, len = this.programsWithLights.length; i < len; i++)
      {
        var PID = this.programsWithLights[i];

        // base string to shorten code below.
        var base = "lights[" + lightID + "].";
        glCanvas3D.useProgram(PID);
        this.setUniformf(PID, base + "position", [0, 0, 0], scene, "light"+i+lightID);
        this.setUniformf(PID, base + "ambient", [0, 0, 0], scene, "light"+i+lightID);
        this.setUniformf(PID, base + "diffuse", [0, 0, 0], scene, "light"+i+lightID);
        this.setUniformf(PID, base + "specular", [0, 0, 0], scene, "light"+i);
        this.setUniformf(PID, base + "spotDirection", [0, 0, -1], scene, "light"+i+lightID);
        this.setUniformf(PID, base + "spotCutoff", 180, scene, "light"+i+lightID);
        this.setUniformf(PID, base + "spotExponent", 0, scene, "light"+i+lightID);
        this.setUniformf(PID, base + "attenuation1", 1, scene, "light"+i+lightID);
        this.setUniformf(PID, base + "attenuation2", 0, scene, "light"+i+lightID);
        this.setUniformf(PID, base + "attenuation3", 0, scene, "light"+i+lightID);
        this.setUniformi(PID, base + "type", 0, scene, "light"+i+lightID);
        this.setUniformi(PID, base + "isOn", 0, scene, "light"+i+lightID);
      }
    }
  }

  /**
   @private
   
   @param {Array} ambientLight Array of lights
   */
  this.updateAmbientLight = function (ambientLight, scene)
  {
    // the toon shader uses lights, but does not use
    // the ambient light. We need to turn off debugger to
    // suppress any errors.
    var prevVal = c3dl.debug.getVisible();
    c3dl.debug.setVisible(false);

    for (var i = 0, len = this.programsWithLights.length; i < len; i++)
    {
      glCanvas3D.useProgram(this.programsWithLights[i]);
      this.setUniformf(this.programsWithLights[i], "ambientLightColor", ambientLight, scene, "ambientLight");
      this.setUniformi(this.programsWithLights[i], "lightingOn", this.getLighting(), scene, "ambientLight"+i);
    }

    // turn it back on if it was on before.
    if (prevVal == true)
    {
      c3dl.debug.setVisible(true);
    }
  }

  /**
   @private
   Update the light states in the shader with lightList.
   
   @param {Array} lightList Array of lights
   */
  this.updateLights = function (lightList, scene)
  {
    // The list of all the program objects which have lights need to be updated
    for (var progObjIter = 0, len = this.programsWithLights.length; progObjIter < len; progObjIter++)
    {
      var shader = this.programsWithLights[progObjIter];

      glCanvas3D.useProgram(shader);

      // iterate over all the lights
      for (var i = 0, len2 = lightList.length; i < len2; i++)
      {
        // create a base string to shorten code below.
        var base = "lights[" + i + "].";

        // we may have nulls in the array which represent places lights can be inserted
        // so we have to check for these.
        if (lightList[i] != null)
        {
          // if the light is off, that's the only uniform var that needs to be set.
          if (lightList[i].isOn() == false)
          {
            this.setUniformi(shader, base + "isOn", lightList[i].isOn(), scene, "light"+progObjIter+i);
          }
          else
          {
            if (lightList[i] instanceof c3dl.DirectionalLight)
            {
              // place the light in viewspace here instead of the shader, preventing placing the lights
              // in viewspace for every vertex.
              var dir = c3dl.multiplyMatrixByDirection(c3dl.peekMatrix(), lightList[i].getDirection());
              dir =c3dl.addVectorComponent(dir,0);

              this.setUniformf(shader, base + "position", dir, scene, "light"+progObjIter+i);

              // this is used to distinguish a directional light from a spotlight.
              this.setUniformf(shader, base + "spotCutoff", 180, scene, "light"+progObjIter+i);
            }

            // check if its a spotlight first before positional light!
            else if (lightList[i] instanceof c3dl.SpotLight)
            {
              var pos = lightList[i].getPosition();
              pos = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), pos);
              pos = c3dl.addVectorComponent(pos,1);

              var dir = lightList[i].getDirection();
              dir = c3dl.multiplyMatrixByDirection(c3dl.peekMatrix(), dir);

              this.setUniformf(shader, base + "position", pos, scene, "light"+i);
              this.setUniformf(shader, base + "spotDirection", dir, scene, "light"+i);
              this.setUniformf(shader, base + "spotCutoff", lightList[i].getCutoff(), scene, "light"+progObjIter+i);
              this.setUniformf(shader, base + "spotExponent", lightList[i].getExponent(), scene, "light"+progObjIter+i);
            }

            else if (lightList[i] instanceof c3dl.PositionalLight)
            {
              var pos = lightList[i].getPosition();
              //pos = c3dl.multiplyMatrixByVector(c3dl.getUniform("viewMatrix"), pos);
              pos = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), pos);
              pos = c3dl.addVectorComponent(pos,1);

              this.setUniformf(shader, base + "position", pos, scene, "light"+progObjIter+i);
              this.setUniformf(shader, base + "spotCutoff", 180.0, scene, "light"+progObjIter+i);
            }

            this.setUniformi(shader, base + "type", lightList[i].getType(), scene, "light"+progObjIter+i);
            this.setUniformi(shader, base + "isOn", lightList[i].isOn(), scene, "light"+progObjIter+i);
            this.setUniformf(shader, base + "ambient", lightList[i].getAmbient(), scene, "light"+progObjIter+i);
            this.setUniformf(shader, base + "diffuse", lightList[i].getDiffuse(), scene, "light"+progObjIter+i);
            this.setUniformf(shader, base + "specular", lightList[i].getSpecular(), scene, "light"+progObjIter+i);

            // lights are attenuated as long as they are not directional lights
            if (!(lightList[i] instanceof c3dl.DirectionalLight))
            {
              var attn = lightList[i].getAttenuation();
              this.setUniformf(shader, base + "attenuation1", attn[0], scene, "light"+progObjIter+i);
              this.setUniformf(shader, base + "attenuation2", attn[1], scene, "light"+progObjIter+i);
              this.setUniformf(shader, base + "attenuation3", attn[2], scene, "light"+progObjIter+i);
            }
          }
        }
      }
    }
  }

/*

  */
  this.pointSphereRenderSetup = function ()
  {
    // create the empty WebGL VBO's
    this.pointSphereVBOVert = glCanvas3D.createBuffer();

    // bind to the VBO
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.pointSphereVBOVert);

    // set the data using the bounding sphere verts since that sphere has a size of 1 unit
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(c3dl.BOUNDING_SPHERE_VERTICES), glCanvas3D.STATIC_DRAW);

    // next frame we'll be ready to render
    this.pointSphereRenderReady = true;
  }

  /**
   @private
   
   Create a Renderer.
   
   @param cvs
   
   @returns {boolean} True if the context could be created, 
   otherwise false.
   */
  this.createRenderer = function (cvs)
  {
    if (c3dl.debug.DUMMY)
    {
      glCanvas3D =
      {
      };
      glCanvas3D.__noSuchMethod__ = function ()
      {
        return true;
      }
    }
    else
    {
      try
      {
        glCanvas3D = cvs.getContext('experimental-webgl');
        glCanvas3D.viewport(0, 0, cvs.width, cvs.height);
      }
      catch (err)
      {
      }
    }

    return glCanvas3D ? true : false;
  }

  /**
   @private
   Enables depth testing, create necessary shaders, create the projection
   matrix and set the lighting uniform.
   
   Compiles and link the shaders.
   
   @param {int} width of the canvas in pixels.
   @param {int} height of the canvas in pixels.
   */
  this.init = function (width, height,scene)
  {
    if (glCanvas3D == null)
    {
      return false;
    }

    // set the context width and height. These are the base class
    // members.
    this.contextWidth = width;
    this.contextHeight = height;
    this.scene = scene;

    // enable the depth buffer, only needs to be done once, so do it here		
    glCanvas3D.enable(glCanvas3D.DEPTH_TEST);

    // create the shader programs
    //this.geometryShader = this.createProgram(c3dl.material_vs+c3dl.light_vs+c3dl.model_vs, c3dl.model_fs).getProgramID();
    this.particleSystemShader = this.createProgram(c3dl.psys_vs, c3dl.psys_fs).getProgramID();
    this.pointShader = this.createProgram(c3dl.point_vs, c3dl.point_fs).getProgramID();
    this.lineShader = this.createProgram(c3dl.line_vs, c3dl.line_fs).getProgramID();
    this.pointSphereShader = this.createProgram(c3dl.point_sphere_vs, c3dl.point_sphere_fs).getProgramID();
    this.boundingSphereShader = this.createProgram(c3dl.bounding_sphere_vs, c3dl.bounding_sphere_fs).getProgramID();

    // Template effects
    // STANDARD
    c3dl.effects.STD_EFFECT = new c3dl.EffectTemplate();
    c3dl.effects.STD_EFFECT.addVertexShader(c3dl.material_vs + c3dl.light_vs + c3dl.model_vs);
    c3dl.effects.STD_EFFECT.addFragmentShader(c3dl.model_fs);
    c3dl.effects.STD_EFFECT.setRenderingCallback(c3dl.std_callback);
    c3dl.effects.STD_EFFECT.init();

    c3dl.effects.STANDARD = new c3dl.Effect();
    c3dl.effects.STANDARD.init(c3dl.effects.STD_EFFECT);
    var prog = this.createProgram(c3dl.material_vs + c3dl.light_vs + c3dl.model_vs, c3dl.model_fs);

    c3dl.effects.STANDARD.getEffectTemplate().addProgramObject(prog);
    this.programsWithLights.push(c3dl.effects.STANDARD.getEffectTemplate().getProgramID(this.ID));
    this.STANDARD_PROGRAM_ID = prog.getProgramID();

    // need to create the solid color effect explicitly
    // since effects are really only created if an object uses them.
    // and since we need it for gooch and cartoon....
    ///
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP = new c3dl.EffectTemplate();
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.addVertexShader(c3dl.solid_color_vs);
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.addFragmentShader(c3dl.solid_color_fs);
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.setRenderingCallback(c3dl.solid_color_callback);
    c3dl.effects.SOLID_COLOR_EFFECT_TEMP.init();

    c3dl.effects.SOLID_COLOR_EFFECT = new c3dl.Effect();
    c3dl.effects.SOLID_COLOR_EFFECT.init(c3dl.effects.SOLID_COLOR_EFFECT_TEMP);
    var prog = this.createProgram(c3dl.solid_color_vs, c3dl.solid_color_fs);

    c3dl.effects.SOLID_COLOR_EFFECT.getEffectTemplate().addProgramObject(prog);
    this.SOLID_COLOR_EFFECT_ID = prog.getProgramID();

    // GREYSCALE
    c3dl.effects.GREYSCALE = new c3dl.EffectTemplate();
    c3dl.effects.GREYSCALE.addVertexShader(c3dl.material_vs);
    c3dl.effects.GREYSCALE.addVertexShader(c3dl.light_vs);
    c3dl.effects.GREYSCALE.addVertexShader(c3dl.greyscale_vs);
    c3dl.effects.GREYSCALE.addFragmentShader(c3dl.greyscale_fs);
    c3dl.effects.GREYSCALE.setRenderingCallback(c3dl.greyscale_callback);
    c3dl.effects.GREYSCALE.addParameter("color", Array, [0.3, 0.6, 0.1]);
    c3dl.effects.GREYSCALE.init();

    // SOLID COLOR    
    c3dl.effects.SOLID_COLOR = new c3dl.EffectTemplate();
    c3dl.effects.SOLID_COLOR.addVertexShader(c3dl.solid_color_vs);
    c3dl.effects.SOLID_COLOR.addFragmentShader(c3dl.solid_color_fs);
    c3dl.effects.SOLID_COLOR.setRenderingCallback(c3dl.solid_color_callback);
    c3dl.effects.SOLID_COLOR.addParameter("color", Array, [0.0, 0.0, 0.0]);
    c3dl.effects.SOLID_COLOR.init();

    // SEPIA
    c3dl.effects.SEPIA = new c3dl.EffectTemplate();
    c3dl.effects.SEPIA.addVertexShader(c3dl.material_vs);
    c3dl.effects.SEPIA.addVertexShader(c3dl.light_vs);
    c3dl.effects.SEPIA.addVertexShader(c3dl.sepia_vs);
    c3dl.effects.SEPIA.addFragmentShader(c3dl.sepia_fs);
    c3dl.effects.SEPIA.setRenderingCallback(c3dl.sepia_callback);
    c3dl.effects.SEPIA.addParameter("color", Array, [1.2, 1.0, 0.8]);
    c3dl.effects.SEPIA.init();

    // CARTOON
    c3dl.effects.CARTOON = new c3dl.EffectTemplate();
    c3dl.effects.CARTOON.addVertexShader(c3dl.cartoon_vs);
    c3dl.effects.CARTOON.addFragmentShader("#ifdef GL_ES \n precision highp float; \n #endif \n ");
    c3dl.effects.CARTOON.addFragmentShader(c3dl.light_vs);
    c3dl.effects.CARTOON.addFragmentShader(c3dl.cartoon_fs);
    c3dl.effects.CARTOON.setRenderingCallback(c3dl.cartoon_callback);
    c3dl.effects.CARTOON.addParameter("qMap", String);
    c3dl.effects.CARTOON.addParameter("outline", Boolean, true);
    c3dl.effects.CARTOON.init();

    // GOOCH
    c3dl.effects.GOOCH = new c3dl.EffectTemplate();
    c3dl.effects.GOOCH.addVertexShader(c3dl.gooch_vs);
    c3dl.effects.GOOCH.addFragmentShader("#ifdef GL_ES \n precision highp float; \n #endif \n ");
    c3dl.effects.GOOCH.addFragmentShader(c3dl.light_vs);
    c3dl.effects.GOOCH.addFragmentShader(c3dl.gooch_fs);
    c3dl.effects.GOOCH.setRenderingCallback(c3dl.gooch_callback);
    c3dl.effects.GOOCH.addParameter("coolColor", Array, [0, 0, 1]);
    c3dl.effects.GOOCH.addParameter("warmColor", Array, [0.5, 0.5, 0.0]);
    c3dl.effects.GOOCH.addParameter("surfaceColor", Array, [0.1, 0.1, 0.1]);
    c3dl.effects.GOOCH.addParameter("outline", Boolean, true);
    c3dl.effects.GOOCH.init();

    this.texManager = new c3dl.TextureManager(glCanvas3D);

    // iterate over all the textures the user added before the renderer
    // was initialized and add them now.
    for (var i in this.textureQueue)
    {
      if (this.textureQueue[i])
      {
        this.texManager.addTexture(this.textureQueue[i]);
      }
    }

    return true;
  }

  /**
   @private
   Render the bounding sphere
   
   @param {c3dl.BoundingSphere} boundingSphere
   */
  this.renderBoundingSphere = function (boundingSphere,viewMatrix, scene)
  {
    // create an short alias
    var shader = this.boundingSphereShader;
    glCanvas3D.useProgram(shader);

    if (this.pointSphereRenderReady == false)
    {
      // create VBO and set the data
      this.pointSphereRenderSetup();
    }
    else {
      var sphereMatrix = c3dl.makeIdentityMatrix();
      c3dl.matrixMode(c3dl.PROJECTION);
      var projMatrix = c3dl.peekMatrix();
      c3dl.matrixMode(c3dl.MODELVIEW); 
      // set the bounding sphere's position
      var pos =boundingSphere.getPosition();
      sphereMatrix[12] = pos[0];
      sphereMatrix[13] = pos[1];
      sphereMatrix[14] = pos[2];
      sphereMatrix[0] = sphereMatrix[5] = sphereMatrix[10] = boundingSphere.getRadius();

      // create a modelviewprojection matrix.  By doing this, we can multiply
      // 3 matrices together once per model instead of once per vertex.
      var sphereViewMatrix = c3dl.multiplyMatrixByMatrix(viewMatrix,sphereMatrix);
	  
      var MVPMatrix = c3dl.multiplyMatrixByMatrix(projMatrix, sphereViewMatrix);
      this.setUniformMatrix(shader, "modelViewProjMatrix", MVPMatrix, scene, "boundingSphereShader");
      this.setVertexAttribArray(shader, "Vertex", 3, this.pointSphereVBOVert, scene, "boundingSphereShader");
      glCanvas3D.drawArrays(glCanvas3D.POINTS, 0, c3dl.BOUNDING_SPHERE_VERTICES.length / 3);
    }
  }

  /**
   @private
   Render a geometry
   
   @param {c3dl.Geometry} obj
   */
  this.renderGeometry = function (obj, scene)
  {
    // get the object's effect
    if (obj.getEffect())
    {
      //
      var effect = obj.getEffect().getEffectTemplate();

      var progObjID = effect.getProgramID(this.ID);

      // If the effect's shaders have not yet been compiled for this renderer,
      // compile them.
      if (progObjID == -1)
      {
        var vertexShaders = effect.getVertexShaders();
        var fragmentShaders = effect.getFragmentShaders();

        // join all the shaders, but don't insert a delimiter, that
        // would create a syntax error for the shaders.
        var joinedVertexShaders = vertexShaders.join('');
        var joinedFragmentShaders = fragmentShaders.join('');

        var programObject = this.createProgram(joinedVertexShaders, joinedFragmentShaders);

        // if the effect was successfully compiled, render it using the effect
        if (programObject)
        {
          effect.addProgramObject(programObject);

          // check if the user added the light vertex shader source.
          // if they did, we'll need to update the light states every
          // update for that shader.
          for (var i = 0, len = vertexShaders.length; i < len; i++)
          {
            if (vertexShaders[i] == c3dl.light_vs)
            {
              this.programsWithLights.push(programObject.getProgramID());
              glCanvas3D.useProgram(programObject.getProgramID());
              this.setUniformi(programObject.getProgramID(), "lightingOn", true, scene, "vertexfragmentShaders");
            }
          }

          for (var i = 0, len = fragmentShaders.length; i < len; i++)
          {
            if (fragmentShaders[i] == c3dl.light_vs)
            {
              this.programsWithLights.push(programObject.getProgramID());
              glCanvas3D.useProgram(programObject.getProgramID());
              this.setUniformi(programObject.getProgramID(), "lightingOn", true, scene, "vertexfragmentShaders");
            }
          }
        }
        else
        {
          c3dl.debug.logWarning("could not compile effect shader(s).");
          c3dl.debug.logInfo(joinedVertexShaders);
          c3dl.debug.logInfo(joinedFragmentShaders);
        }
      }
      // if the effect has already been compiled, go ahead and render the geometry.
      else
      {
        var renderingObj =
        {
        };

        // user will need to query states of the context.
        renderingObj["context"] = glCanvas3D;
        renderingObj["getContext"] = function ()
        {
          return this.context;
        };

        // user will need to query states of the renderer.
        // enventually the renderer will completely abtract the context and
        // the context will not need to be passed in. But that requires all
        // functions to be wrapped.
        renderingObj["renderer"] = this;
        renderingObj["getRenderer"] = function ()
        {
          return this.renderer;
        };

        // user will need to set the current program.
        renderingObj['programObjectID'] = progObjID;
        renderingObj['getProgramObjectID'] = function ()
        {
          return this.programObjectID;
        };

        // user will need the actual geometry to render.
        renderingObj['geometry'] = obj;
        renderingObj['getGeometry'] = function ()
        {
          return this.geometry;
        };

        var cb = effect.getRenderingCallback();
        cb(renderingObj, scene);
      }

    }

    // if the geometry didn't have an effect, we'll render it using
    // the standard shader.
    else
    {
      var renderingObj =
      {
      };

      //
      renderingObj["context"] = glCanvas3D;
      renderingObj["getContext"] = function ()
      {
        return this.context;
      };

      //
      renderingObj["renderer"] = this;
      renderingObj["getRenderer"] = function ()
      {
        return this.renderer;
      };

      //
      renderingObj['programObjectID'] = this.STANDARD_PROGRAM_ID;
      renderingObj['getProgramObjectID'] = function ()
      {
        return this.programObjectID;
      };

      //
      renderingObj['geometry'] = obj;
      renderingObj['getGeometry'] = function ()
      {
        return this.geometry;
      };

      c3dl.std_callback(renderingObj, scene);
    }
  }
  this.renderShape = function (obj, scene)
  {
      var renderingObj =
      {
      };

      //
      renderingObj["context"] = glCanvas3D;
      renderingObj["getContext"] = function ()
      {
        return this.context;
      };

      //
      renderingObj["renderer"] = this;
      renderingObj["getRenderer"] = function ()
      {
        return this.renderer;
      };

      //
      renderingObj['programObjectID'] = this.STANDARD_PROGRAM_ID;
      renderingObj['getProgramObjectID'] = function ()
      {
        return this.programObjectID;
      };

      //
      renderingObj['geometry'] = obj;
      renderingObj['getGeometry'] = function ()
      {
        return this.geometry;
      };
      c3dl.std_callback(renderingObj, scene);

  }
  /**
   @private	
   Render a particle system.
   
   @param {c3dl.ParticleSystem} psys
   */
  this.renderParticleSystem = function (psys, scene)
  {
    // create shorter alias
    var shader = this.particleSystemShader;
    glCanvas3D.useProgram(shader);

    var usingTexture = false;
    var texturePath = psys.getTexture();
    var texID = this.texManager.getID(texturePath);
    var texAttribLoc = glCanvas3D.getAttribLocation(shader, "Texture");

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && texturePath)
    {
      this.texManager.addTexture(texturePath);
    }

    if (texID != -1 && texturePath && psys.getTexCoords())
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, texID);
      this.setVertexAttribArray(shader, "Texture", 2, psys.getVBOTexCoords(), scene, "particleSystemShader");
      usingTexture = true;

      glCanvas3D.texParameteri(glCanvas3D.TEXTURE_2D, glCanvas3D.TEXTURE_WRAP_S, glCanvas3D.CLAMP_TO_EDGE);
      glCanvas3D.texParameteri(glCanvas3D.TEXTURE_2D, glCanvas3D.TEXTURE_WRAP_T, glCanvas3D.CLAMP_TO_EDGE);
    }
    else
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.disableVertexAttribArray(texAttribLoc);
      //glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,-1);
    }
    this.setUniformi(shader, "usingTexture", usingTexture, scene, "particleSystemShader");
    this.setUniformMatrix(shader, "rot", [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], scene, "particleSystemShader");
    this.setVertexAttribArray(shader, "Vertex", 3, psys.getVBOVertices(), scene, "particleSystemShader");

    for (var i = 0, numParticles = psys.getNumParticles(); i < numParticles; i++)
    {
      if (psys.getParticle(i).isAlive())
      {
        var pSize = psys.getParticle(i).getSize();

        this.setUniformf(shader, "Color", psys.getParticle(i).getColor(), scene, "particleSystemShader");

        c3dl.matrixMode(c3dl.PROJECTION);
        var projectionMatrix = c3dl.peekMatrix();
        c3dl.matrixMode(c3dl.MODELVIEW);
        var viewMatrix = c3dl.peekMatrix();

        //
        var modelMatrix = psys.getParticle(i).getTransform();
        modelMatrix = c3dl.multiplyMatrixByMatrix(modelMatrix, [pSize, 0, 0, 0, 0, pSize, 0, 0, 0, 0, 
          pSize, 0, 0, 0, 0, 1]);

        // create a ModelViewProjection matrix.  By doing this, we can multiply
        // 3 matrices together once per particle instead of once per vertex
        var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(viewMatrix, modelMatrix);
        modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewProjMatrix);
        this.setUniformMatrix(shader, "modelViewProjMatrix", modelViewProjMatrix, scene, "particleSystemShader");

        glCanvas3D.drawArrays(glCanvas3D.TRIANGLE_FAN, i, 4);
      }
    }
  }

  /**
   @private
   Render a set of lines.
   
   @param {Array} lines
   */
  this.renderLines = function (lines, scene)
  {
    if (lines.length > 0)
    {
      // create a short alias for this.lineShader
      var shader = this.lineShader;
      glCanvas3D.useProgram(shader);

      // camera placed the view matrix at the bottom of the stack
      var modelViewMatrix = c3dl.peekMatrix();
      c3dl.matrixMode(c3dl.PROJECTION);
      var projectionMatrix = c3dl.peekMatrix();
      c3dl.matrixMode(c3dl.MODELVIEW);

      // create a ModelViewProjection matrix.  By doing this, we can multiply
      // 3 matrices together once per model instead of once per vertex
      var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
      this.setUniformMatrix(shader, "modelViewProjMatrix", modelViewProjMatrix, scene, "lineShader");

      // we need to render each line individually since each can have 
      // a different width.
      for (var l = 0, len = lines.length; l < len; l++)
      {
        glCanvas3D.lineWidth(lines[l].getWidth());

        var coords = [];
        var cols = [];
        for (var i = 0; i < 6; i++)
        {
          coords.push(lines[l].getCoordinates()[i]);
          cols.push(lines[l].getColors()[i]);
        }

        if (this.lineVertBuffer == null)
        {
          this.lineVertBuffer =
          {
          };
          this.lineVertBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.lineVertBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(coords), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Vertex", 3, this.lineVertBuffer.position, scene, "lineShader");

        if (this.lineColBuffer == null)
        {
          this.lineColBuffer =
          {
          };
          this.lineColBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.lineColBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(cols), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Color", 3, this.lineColBuffer.position, scene, "lineShader");

        glCanvas3D.drawArrays(glCanvas3D.LINES, 0, coords.length / 3);
      }
    }
  }

  /**
   @private
   @param {Array} pointPositions
   @param {Array} pointColors
   @param {Array} attenuation
   @param {int} mode
   @param {float} size
   */
  this.renderPoints = function (pointPositions, pointColors, attenuation, mode, size, scene)
  {
    // trying to render an empty list will result in an WebGL error
    if (pointPositions.length > 0 && pointColors.length > 0)
    {
      if (mode == c3dl.POINT_MODE_POINT)
      {
        // create a shorter reference name.
        var shader = this.pointShader;
        glCanvas3D.useProgram(shader);

        // camera placed the view matrix at the bottom of the stack
        var viewMatrix = c3dl.peekMatrix();
        c3dl.matrixMode(c3dl.PROJECTION);
        var projectionMatrix = c3dl.peekMatrix();
        c3dl.matrixMode(c3dl.MODELVIEW);

        // create a ModelViewProjection matrix.  By doing this, we can multiply
        // 3 matrices together once instead of once per point
        var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, viewMatrix, scene, "pointShader");
        this.setUniformMatrix(shader, "viewMatrix", viewMatrix, scene, "pointShader");
        this.setUniformMatrix(shader, "modelViewProjMatrix", modelViewProjMatrix, scene, "pointShader");
        this.setUniformf(shader, "attenuation", attenuation, scene, "pointShader");

        if (this.pointVertBuffer == null)
        {
          this.pointVertBuffer =
          {
          };
          this.pointVertBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.pointVertBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(pointPositions), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Vertex", 3, this.pointVertBuffer.position, scene, "pointShader");

        if (this.pointColBuffer == null)
        {
          this.pointColBuffer =
          {
          };
          this.pointColBuffer.position = glCanvas3D.createBuffer();
        }

        glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.pointColBuffer.position);
        glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, new WebGLFloatArray(pointColors), glCanvas3D.STREAM_DRAW);
        this.setVertexAttribArray(shader, "Color", 3, this.pointColBuffer.position, scene, "pointShader");
        glCanvas3D.drawArrays(glCanvas3D.POINTS, 0, pointPositions.length / 3);
      }
      else if (mode == c3dl.POINT_MODE_SPHERE)
      {
        // create an short alias
        var shader = this.pointSphereShader;
        glCanvas3D.useProgram(shader);

        if (this.pointSphereRenderReady == false)
        {
          // create vbo and set the data
          this.pointSphereRenderSetup();
        }
        else
        {
          c3dl.pushMatrix();

          for (var i = 0, len = pointPositions.length; i < len; i += 3)
          {
            // 
            var mat = c3dl.makeIdentityMatrix();
            mat[12] = pointPositions[i];
            mat[13] = pointPositions[i + 1];
            mat[14] = pointPositions[i + 2];
            mat[0] = mat[5] = mat[10] = size;

            mat = c3dl.multiplyMatrixByMatrix(c3dl.peekMatrix(), mat);

            c3dl.matrixMode(c3dl.PROJECTION);
            var proj = c3dl.peekMatrix();
            c3dl.matrixMode(c3dl.MODELVIEW);

            // create a modelviewprojection matrix.  By doing this, we can multiply
            // 3 matrices together once per model instead of once per vertex.
            var MVPMatrix = c3dl.multiplyMatrixByMatrix(proj, mat);
            this.setUniformMatrix(shader, "modelViewProjMatrix", MVPMatrix, scene, "pointShader");
            this.setUniformf(shader, "Color", [pointColors[i], pointColors[i + 1], pointColors[i + 2]], scene, "pointShader");

            this.setVertexAttribArray(shader, "Vertex", 3, this.pointSphereVBOVert, scene, "pointShader");
            glCanvas3D.drawArrays(glCanvas3D.TRIANGLES, 0, c3dl.BOUNDING_SPHERE_VERTICES.length / 3);
            c3dl.popMatrix();
          }
        }
      }
    }
  }

  /**
   @private
   
   @param {int} shader
   @param {String} varName
   @param {int} size
   @param vbo
   */
  this.setVertexAttribArray = function (shader, varName, size, vbo, scene, shaderName)
  {
    var attribLoc = scene.curContextCache.attributes[shaderName+varName];
    if(attribLoc ==undefined) {
      attribLoc = glCanvas3D.getAttribLocation(shader, varName);
      scene.curContextCache.attributes[shaderName+varName] = attribLoc;
    }
    if (attribLoc != c3dl.SHADER_VAR_NOT_FOUND)
    {
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, vbo);
      glCanvas3D.vertexAttribPointer(attribLoc, size, glCanvas3D.FLOAT, false, 0, 0);
      glCanvas3D.enableVertexAttribArray(attribLoc);
    }
    else
    {
      c3dl.debug.logError("Attribute variable '" + varName + "' not found in shader with ID = " + shader);
    }
  }

  /**
   Sets the uniform matrix variable 'varName' to the value specified by 'value'.
   Before calling this function, you must ensure the program object with
   the variable name 'varName' has been installed as part of the current
   rendering state by calling useProgram().<br />
   <br />
   The size of the matrix must be 16 elements.<br />
   <br />
   On some systems, if the variable exists in the shader but isn't used,
   the compiler will remove it. An error message will be displayed if the
   non-existant variable is set.<br />
   <br />
   If the variable could not be found for any other reason, an error is 
   displayed.
   
   @param {int} programObjectID The shader where the variable resides.
   @param {String} varName The name of the matrix variable.
   @param {Array} matrix 16 element matrix.
   */
  this.setUniformMatrix = function (programObjectID, varName, matrix, scene, programObjectName)
  {
    var varLocation = scene.curContextCache.locations[programObjectName+varName];
    if(!varLocation) {
      varLocation = glCanvas3D.getUniformLocation(programObjectID, varName);
      scene.curContextCache.locations[programObjectName+varName] = varLocation;
    }
    // the variable won't be found if it was optimized out.
    if (varLocation != c3dl.SHADER_VAR_NOT_FOUND)
    {
      glCanvas3D.uniformMatrix4fv(varLocation, false, matrix);
    }
    else
    {
      c3dl.debug.logError("Uniform matrix variable '" + varName + "' not found in program object.");
    }
  }

  /**
   Sets the uniform variable 'varName' to the value specified by 'value'.
   Before calling this function, you must ensure the program object with
   the variable name 'varName' has been installed as part of the current
   rendering state by calling useProgram().<br />
   <br />
   The size of the value will be queried and depending on its size, the 
   appropriate WebGL command will be called either uniform1f or 
   uniform{1|2|3|4}fv.<br />
   <br />
   On some systems, if the variable exists in the shader but isn't used,
   the compiler will remove it. An error message will be displayed if the
   non-existant variable is set.<br />
   <br />
   If the variable could not be found for any other reason, an error is 
   displayed.
   
   @param {int} programObjectID The shader where the variable resides.
   @param {String} varName The name of the variable.
   @param {float|Array} value The value to assign the variable.
   */
  this.setUniformf = function (shader, varName, value, scene, shaderName)
  {
    var varLocation = scene.curContextCache.locations[shaderName+varName];
    if(!varLocation) {
      varLocation = glCanvas3D.getUniformLocation(shader, varName);
      scene.curContextCache.flag = 0;
      scene.curContextCache.locations[shaderName+varName] = varLocation;
    }
    // the variable won't be found if it was optimized out.
    if (varLocation != c3dl.SHADER_VAR_NOT_FOUND)
    {
      if (value.length == 4)
      {
        glCanvas3D.uniform4fv(varLocation, value);
      }
      else if (value.length == 3)
      {
        glCanvas3D.uniform3fv(varLocation, value);
      }
      else if (value.length == 2)
      {
        glCanvas3D.uniform2fv(varLocation, value);
      }
      else
      {
        glCanvas3D.uniform1f(varLocation, value);
      }
    }
    else
    {
      c3dl.debug.logError('Uniform variable "' + varName + '" not found in program object.');
    }
  }

  /**
   Sets the uniform variable 'varName' to the value specified by 'value'.
   Before calling this function, you must ensure the program object with
   the variable name 'varName' has been installed as part of the current
   rendering state by calling useProgram().<br />
   <br />
   The size of the value will be queried and depending on its size, the 
   appropriate WebGL command will be called either uniform1i or 
   uniform{1|2|3|4}iv.<br />
   <br />
   On some systems, if the variable exists in the shader but isn't used,
   the compiler will remove it. An error message will be displayed if the
   non-existant variable is set.<br />
   <br />
   If the variable could not be found for any other reason, an error is 
   displayed.
   
   @param {int} programObjectID The shader where the variable resides.
   @param {String} varName The name of the variable.
   @param {int|Array} value The value to assign the variable.
   */
  this.setUniformi = function (programObjectID, varName, value, scene, programObjectName)
  {
   var varLocation = scene.curContextCache.locations[programObjectName+varName];
    if(!varLocation) {
      varLocation = glCanvas3D.getUniformLocation(programObjectID, varName);
      scene.curContextCache.locations[programObjectName+varName] = varLocation;
    }
    // the variable won't be found if it was optimized out.
    if (varLocation != c3dl.SHADER_VAR_NOT_FOUND)
    {
      if (value.length == 4)
      {
        glCanvas3D.uniform4iv(varLocation, value);
      }
      else if (value.length == 3)
      {
        glCanvas3D.uniform3iv(varLocation, value);
      }
      else if (value.length == 2)
      {
        glCanvas3D.uniform2iv(varLocation, value);
      }
      else
      {
        glCanvas3D.uniform1i(varLocation, value);
      }
    }
    else
    {
      c3dl.debug.logError('Uniform variable "' + varName + '" not found in program object.');
    }
  }

  /**
   @private
   Enable an WebGL server-side capability.
   
   @param {int} capability
   */
  this.enable = function (capability)
  {
    try
    {
      // check if its defined
      if (capability)
      {
        glCanvas3D.enable(capability);
      }
      else
      {
        c3dl.debug.logWarning("Enable command passed undefined value.");
      }
    }
    catch (e)
    {
      c3dl.debug.logException("Exception name:" + e.name +
        "<br />" + "Exception msg: " + e.message + "<br />" +
        "Capability: " + capability);
    }
  }

  /**
   @private
   
   Disable a server-side WebGL capability. This wraps the WebGL 
   'disable' command and adds a conditional to make sure the capability is
   supported before trying to change the state.  If the capability is not
   supported and the state is change, the script could be prevented 
   from running.
   
   @param {int} capability WebGL capability
   */
  this.disable = function (capability)
  {
    if (capability)
    {
      glCanvas3D.disable(capability);
    }
    else
    {
      c3dl.debug.logWarning("disable command passed undefined value.");
    }
  }
});
