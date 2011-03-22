/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @private
 @class TextureManager is a class designed to prevent the same 
 texture from being loaded more than once in the WebGL context.
 Users of the library don't actually have to bother with using it,
 they just have to create their Textures.
 */
c3dl.TextureManager = function (gl)
{
  this.currentID = 1;
  this.keys = [];
  this.values = [];
  this.glCanvas3D = gl;

  /**
   @private
   Add a texture to be used in the script.
   
   @param {String} relativePath The relative path of the Texture from 
   the index.html file.
   */
  this.addTexture = function (relativePath)
  {
    // if its already present, don't readd it
    if (this.getID(relativePath) == -1)
    {
      var texture = new c3dl.Texture();
      if (texture.setup(this.glCanvas3D, relativePath))
      {
        this.keys.push(texture.getTextureID());
        this.values.push(texture);
        this.currentID++;
      }
    }
  }

  /**
   @private	
   */
  this.addTextureFromCanvas2D = function (sourceCanvas)
  {
    if (this.getID(sourceCanvas) == -1) {
      var texture = new c3dl.Texture();
      if (texture.setup(this.glCanvas3D, 'deleteme', sourceCanvas)) {
        this.keys.push(texture.getTextureID());
        this.values.push(texture);
        this.currentID++;
      } 
    }
  }

  /**
   @private	
   Has the Texture already been added?
   
   @param {String} relativePath The relative path of the Texture from 
   the index.html file.
   
   @returns {boolean} True if the texture has already been added, false
   otherwise.
   */
  this.hasTexture = function (relativePath)
  {
    // -1 indicates an invalid texture id
    return this.getID(relativePath) == -1 ? false : true;
  }

  /**
   @private	
   Remove a texture. Currently not implemented.
   
   @param {String} relativePath
   */
  this.removeTexture = function (relativePath)
  {
    // check if it exists
    if (this.getID(relativePath) != -1)
    {
      // remove it from this list?
      // remove it from WebGL
    }
  }

  /**
   @private
   
   Get the ID of a Texture, referenced by 'relativePath'.
   
   @param {String} relativePath The relative path of the Texture from 
   the index.html file.
   
   @returns {int} The ID of the Texture, reutrns -1 if the Texture 
   hasn't been added.
   */
  this.getID = function (relativePath)
  {
    var id = -1;

    for (var i = 0, len = this.values.length; i < len; i++)
    {
      if (this.values[i].getRelativePath() == relativePath)
      {
        id = this.keys[i];
        break;
      }
    }
    return id;
  }
  this.getIDNumber = function (relativePath) {
    var id = -1;
    for (var i = 0, len = this.values.length; i < len; i++) {
      if (this.values[i].getRelativePath() === relativePath) {
        id = i;
        break;
      }
    }
    return id;
  }
  /**
   @private	
   Get a string representation of this class. Will display all the WebGL 
   texture IDs along with the associated texture path.
   
   @param {null|String} delimiter A string which will separate values. Typically will be 
   ","  ,  "\n" or "&lt;br /&gt;". If none is specified, "," will be used.
   
   @returns {String} A string representation of this object.
   */
  this.toString = function (delimiter)
  {
    // make sure user passed up a string if they actually decided
    // to specify a delimiter.
    if (!delimiter || typeof(delimiter) != "string")
    {
      delimiter = ",";
    }

    // start with en empty string
    var str = "";
    for (var i = 0, len = this.values.length; i < len; i++)
    {
      str += "ID = " + this.keys[i] + delimiter + "Path = " + this.values[i].getRelativePath();

      // only add the comma, if this isn't the last path, we don't
      // want a trailing comma.
      if (i + 1 < this.values.length)
      {
        str += delimiter;
      }
    }
    return str;
  }
  this.updateTexture= function(path) {
    if (typeof(path) != "string") {
      var id = this.getIDNumber(path);
      if (id >= 0){
        this.values[id].update();
      }
    }
  }
}