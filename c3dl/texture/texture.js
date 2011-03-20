/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
  @private
  @class A Texture is an image which is to be wrapped around a Model object. A 
  texture has a unique ID which can be used to identify it in WebGL.
 
  <p>To create a texture, call setup() passing in the WebGL context as
  well as the path to the image.</p>
*/
c3dl.Texture = function ()
{
  // textureImage will be created as an Image().
  /**
    @private
  */
  var textureImage = null;
  var isSetup = false;
  var tCanvas = document.createElement('CANVAS'); 
  var tCtx = tCanvas.getContext("2d");
  var sourcecan = null;
  /**
    @private
    Get the texture ID, the texture ID is a unique number which
    we can use to notify what texture in WebGL we want
    to work with.
   
    @returns {int} The ID of the texture if the texture has been 
    loaded, 0 otherwise.
  */
  this.getTextureID = function ()
  {
    return textureImage.ID;
  }

  /**	
    @private
    Get the absolute path of the Texture.
   
    @returns {string} The absolute path of the texture using the 
    image's src property.
  */
  this.getAbsolutePath = function ()
  {
    if (textureImage != null)
    {
      return textureImage.src;
    }
    else
    {
      c3dl.debug.logError('getTexturePath() error - texture has not been setup.');
      return false;
    }
  }

  /** 
    @private
    Get the path of the image relative the main.js file.  This will
    be the same path the user passes in when they call setTexture on
    a model.
   
    @returns {string} The relative path of texture.
  */
  this.getRelativePath = function ()
  {
    return textureImage.relativePath;
  }

  /**
    @private
    Check if the Texture has been setup.
   
    @returns {boolean} True if the Texture has been setup, false otherwise.
  */
  this.getIsSetup = function ()
  {
    return isSetup;
  }

  /**
   @private
   Setup can be called when the object is created to give it a
   texture, but it can also be later changed by calling this method
   again.
   
   Once the Texture has been setup, do not allow the user to set it up 
   again.
   
   @param glCanvas3D
   @param {string} source
   @param sourceCanvas
   
   @return {boolean} true if the Texture could be set up, false 
   if the texture was already setup or if setup failed.
  */
  this.setup = function (glCanvas3D, source, sourceCanvas)
  {
    var returnCode = true;

    // make sure the user passed in correct variables and prevent
    // the user from calling this method more than once.
    if (source != null && glCanvas3D != null && this.getIsSetup() == false)
    {
      if (sourceCanvas == null) {
        textureImage = new Image();
        textureImage.src = source;

        // doing this will only store the name of the texture in 
        // the name variable.
        textureImage.relativePath = source;
      }
      else {
        if (sourceCanvas instanceof HTMLCanvasElement || sourceCanvas instanceof HTMLVideoElement || sourceCanvas instanceof HTMLImageElement) {
          //if height or width is unknown set height and width to predefined value of 1024 by 1024
          if ( sourceCanvas.width < 1 || sourceCanvas.height  < 1) {
            tCanvas.width = 1024;
            tCanvas.height = 1024;
          }
          else {
            tCanvas.width = c3dl.roundUpToNextPowerOfTwo(sourceCanvas.width);
            tCanvas.height = c3dl.roundUpToNextPowerOfTwo(sourceCanvas.height);
          }
          sourcecan = sourceCanvas;
          textureImage = tCanvas;
        }
        else {
          textureImage = document.getElementById(sourceCanvas);
        }
        textureImage.relativePath = sourceCanvas;
      }

      // was a bit tricky to pass in glCanvas into the onload function 
      // of the image, so instead they were added as properties
      //	textureImage.ID = 0;	
      textureImage.glCanvas3D = glCanvas3D;

      // genTextures gives us an unused texture image id, like 
      // a primary key only needs to be done once
      // don't wait for load to run since we don't konw when that will
      // be. if the user has given us proper values, we'll probably
      // be able to create the texture, worst case, we have an id
      // not associated with a texture
      textureImage.ID = glCanvas3D.createTexture();
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);

      /**
        @private
      */
      textureImage.setupWebGL = function ()
      {
        // bindtexture() sets the selected texture (by id) to be 
        // the current texture.  the current texture is the one 
        // used for any operations such as assigning uv coords, 
        glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, this.ID);
      }

      /**
        @private
        Resize the texture so it can be used in WebGL.  The texture 
        may be distorted, but at least it will display something.
        The user will be notified their texture should be modified.
      */
      textureImage.resizeImage = function ()
      {
        // not power-of-two, so resize it using a 2d canvas
        var w = c3dl.roundUpToNextPowerOfTwo(this.width);
        var h = c3dl.roundUpToNextPowerOfTwo(this.height);
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext('2d');
        context.drawImage(this, 0, 0, w, h);
        // add a property to the image, so the onload function can access the canvas created here.
        this.canvas = canvas;
      }

      /*
        Wrapper for old texImage2D specification
      */
      textureImage.texImage2DWrapper = function(){
        try
        {
          // new way
          this.glCanvas3D.texImage2D(glCanvas3D.TEXTURE_2D, 0, glCanvas3D.RGBA, glCanvas3D.RGBA, glCanvas3D.UNSIGNED_BYTE, this);
        }catch(ex){
          this.glCanvas3D.texImage2D(glCanvas3D.TEXTURE_2D, 0, this, false);
        }
      }

      /**
        @private
        Set the function to run when the image is loaded
      */
      textureImage.onload = function ()
      {
        //
        this.setupWebGL();

        try
        {
          this.texImage2DWrapper();
          this.glCanvas3D.generateMipmap(glCanvas3D.TEXTURE_2D);
          this.isSetup = true;
        }
        catch (ex)
        {
          c3dl.debug.logError('Texture exception: ' + ex);
        }
      };

      if (sourceCanvas != null)
      {
        textureImage.onload();
      }

      if (this.getIsSetup())
      {
        //!! this should be false, because its initialised as true
        returnCode = true;
      }
    }
    // user passed in a null for either the canvas or the source
    else
    {
      c3dl.debug.logError('null value was passed into texture load function or texture was already setup');
      returnCode = false;
    }

    // if the image could be setup, this variable was set to
    return returnCode;
  }
  this.update = function () {
    if (sourcecan instanceof HTMLImageElement) {
      if (sourcecan.src && sourcecan.src != tCanvas.oldSrc && sourcecan.complete) {
        tCtx.drawImage(sourcecan, 0, 0, tCanvas.width, tCanvas.height);
        textureImage.onload();
        tCanvas.oldSrc = sourcecan.src;
      }
    }
    else {
      tCtx.drawImage(sourcecan, 0, 0, tCanvas.width, tCanvas.height);
      textureImage.onload();
    }
  }
}