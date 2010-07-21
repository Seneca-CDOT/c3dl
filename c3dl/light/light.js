/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class
 This is an 'abstract' class which should not be instantiaed.  Doing so will result in a 
 light which will not work and have no effect on the scene.  This class exists to serve as 
 a base class for c3dl.PositionalLight and c3dl.DirectionalLight. To place a light into a 
 scene use a class which derives from this one.
 */
c3dl.Light = function ()
{
  // Derived classes will overide this member so when scene calls getType() it will
  // know its type.
  this.type = c3dl.ABSTRACT_LIGHT;

  // assign names to lights as to make removing them easy.
  this.name = "unnamed";

  // OpenGL assigns default values to lights.  For example light0 already has some
  // properties which will light the scene.  the other lights are off by default. It
  // was decided to zero out all the components for all the lights 0-7 to prevent
  // any confusion.
  this.ambient = c3dl.makeVector(0, 0, 0);
  this.diffuse = c3dl.makeVector(0, 0, 0);
  this.specular = c3dl.makeVector(0, 0, 0);
  //this.on = 0;
  this.on = false;

  /**
   Get the name of this light.
   
   The name can be assigned with SetName() and should be unique.  When getting or 
   removing a light from the scene, the name must be used as an identifier.
   
   @returns {string} the name of the light.
   */
  this.getName = function ()
  {
    return this.name;
  }

  /**
   Get the ambient component of this light.
   
   Ambient light does not have a direction or position, but seems to come from 
   everywhere. If only using ambient light, all objects in the scene would be lit 
   evenly. Assigning an ambient component to a light can seem strange since lights 
   typically tend to attenuate. The functionality is simply provided because OpenGL 
   supports it. Generally, you should use scene.setAmbientLight(array) to place 
   ambient light in the scene.
   
   Regardless of the position of the light in the scene, the ambient component 
   will light the entire surface of all objects in the scene.  Also, if only using
   ambient light, object will tend to appear flat, therefore set the diffuse color
   component to give 'shape' to objects.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getAmbient = function ()
  {
    return c3dl.copyVector(this.ambient);
  }

  /**
   Get the difuse component of this light.
   
   Diffuse light is what most people associate with what light is. Diffuse gives 
   shape to the object, making it appear 3D. Diffuse lighting is dependent on the 
   light’s position relative to the object.  For example,  if you were looking 
   at the object directly and the light was behind it, you would likely not see much of
   the light's effect. If you were at the position of the light looking at the object,
   you would see the object light and likely its contour would be less lit.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getDiffuse = function ()
  {
    return c3dl.copyVector(this.diffuse);
  }

  /**
   Get the specular component of the light.  
   
   Specular lighting is used to create shiny highlights. Highlights are typically 
   seen on objects such as glass, metal or plastic and are usually white.
   Unlike ambient and diffuse light, specular light takes not only the object's 
   position into account, but also the viewer’s position. The highlights tend to
   'follow' where the camera is looking.
   
   @returns {Array} Array of three values in the order RGB.
   */
  this.getSpecular = function ()
  {
    return c3dl.copyVector(this.specular);
  }

  /**
   Get the type of light this is.
   
   @returns {int} the type of light this is.
   */
  this.getType = function ()
  {
    return this.type;
  }

  /**
   If the light is on, it will affect the colors of the object it hits.
   
   When creating a light, its initial state will be off.
   
   @returns {boolean} true if the light is on, otherwise false.
   */
  this.isOn = function ()
  {
    return this.on;
  }

  /**
   Turn the light on or off.
   
   @param {boolean} isOn true to turn the light on, false to turn it off.
   */
  this.setOn = function (isOn)
  {
    this.on = isOn;
  }

  /**
   Set the name of the light.
   
   The scene can later be queried for the light by this name so the light can be 
   updated or removed.  The default name is "unnamed".
   
   @param {String} name The new name of the light.
   */
  this.setName = function (name)
  {
    this.name = name;
  }

  /**
   Set the ambient color component of this light.
   
   Ambient light does not have a direction or position, but seems to come from 
   everywhere. If only using ambient light, all objects in the scene would be lit 
   evenly. Assigning an ambient component to a light can seem strange since lights 
   typically tend to attenuate. The functionality is simply provided because OpenGL 
   supports it. Generally, you should use scene.setAmbientLight(array) to place 
   ambient light in the scene.
   
   Regardless of the position of the light in the scene, the ambient component 
   will light the entire surface of all objects in the scene. Also, if only using
   ambient light, object will tend to appear flat, therefore set the diffuse color
   component to give 'shape' to objects.
   
   @param {Array} color Array of three values in the order RGB.
   */
  this.setAmbient = function (color)
  {
      this.ambient[0] = color[0];
	  this.ambient[1] = color[1];
	  this.ambient[2] = color[2];  
  }

  /**
   Set the diffuse color component of this light.
   
   Diffuse light is what most people associate with what light is. Diffuse gives 
   shape to the object, making it appear 3D. Diffuse lighting is dependent on the 
   light’s position relative to the object.  For example,  if you were looking 
   at the object directly and the light was behind it, you would likely not see much of
   the light's effect. If you were at the position of the light looking at the object,
   you would see the object light and likely its contour would be less lit.		
   
   @param {Array} color Array of three values in the order RGB.
   */
  this.setDiffuse = function (color)
  {
    this.diffuse[0] = color[0];
	this.diffuse[1] = color[1];
	this.diffuse[2] = color[2]; 
  }

  /**
   Set the specular component of the light.  
   
   Specular lighting is used to create shiny highlights. Highlights are typically 
   seen on objects such as glass, metal or plastic and are usually white.
   Unlike ambient and diffuse light, specular light takes not only the object's 
   position into account, but also the viewer’s position. The highlights tend to
   'follow' where the camera is looking.
   
   @param {Array} color Array of three values in the order RGB.
   */
  this.setSpecular = function (color)
  {
    this.specular[0] = color[0];
    this.specular[1] = color[1];
    this.specular[2] = color[2];
  }
}