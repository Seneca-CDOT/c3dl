/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @class c3dl.Model represents the model data from a file. To
 load a model into a scene, the file must first be called
 with c3dl.addModel('plane.dae'). This makes sure the file
 is parsed before it is used. In the main function, you can create
 instances of the model file:
 <br />
 <br />
 var myModel = new c3dl.Model();<br />
 myModel.init('plane.dae');<br />
 
 @augments c3dl.Primitive
 */
c3dl.Model = c3dl.inherit(c3dl.Primitive, function ()
{
  c3dl._superc(this);
  this.boundingVolume = new c3dl.BoundingVolume();
  this.renderObb = false;
  this.renderAabb = false;
  this.renderBoundingSphere = false;
  this.path = null;
  this.sceneGraph = new c3dl.SceneNode();
  this.ready = false;
  this.cmdQueue = [];
  this.parameterList = [];
});


/**
 Get the path of the file loaded. This is set when init() 
 is called.
 
 @returns {String} The path to the file this model was loaded from
 */
c3dl.Model.prototype.getPath = function ()
{
  return this.path;
}

/**
 Get the angular velocity of the scenegraph's root node.
 
 @returns {float} The angular velocity applied to this Model
 */
c3dl.Model.prototype.getAngularVel = function ()
{
  return this.sceneGraph.getAngularVel();
}

/**
 Get the linear velocity of the scenegraph's root node.
 
 @returns {Array} The linear velocity applied to this model
 */
c3dl.Model.prototype.getLinearVel = function ()
{
  return this.sceneGraph.getLinearVel();
}

/**
 Get the position of the scene graph's root.
 
 @returns {Array} The position of this model in 3D space
 */
c3dl.Model.prototype.getPosition = function ()
{
    return this.sceneGraph.getPosition();
}

/**
 Set the angular velocity of the scenegraph's root node.
 
 @param {Array} vec - The angular velocity to apply to this model
 */
c3dl.Model.prototype.setAngularVel = function (vec)
{
    this.sceneGraph.setAngularVel(vec);
}

/**
 Get the up vector of the scenegraph's root node.
 
 @return {Array} The direction this model considers to be 'up'.
 */
c3dl.Model.prototype.getUp = function ()
{
  return this.sceneGraph.getUp();
}

/**
 Get the left vector of the scenegraph's root node.
 
 @return {Array} The direction this model considers to be 'left'
 */
c3dl.Model.prototype.getLeft = function ()
{
  return this.sceneGraph.getLeft();
}

/**
 Get the direction vector of the scenegraph's root node.
 
 @returns {Array}  The direction this model considers to be 'forward'.
 */
c3dl.Model.prototype.getDirection = function ()
{
  return this.sceneGraph.getDirection();
}

/**
 Can this object be picked when the user clicks on it?  In some scripts using
 the library, it may not make sense for wall, for example to be picked.  If the
 object cannot be picked, it will not tested against the ray which is generated
 then the user clicks the canvas, thus increasing performance.
 
 @returns {boolean} true if the object can be picked, false otherwise.
 */
c3dl.Model.prototype.getPickable = function ()
{
  return this.sceneGraph.getPickable();
}

/**
 Set whether this object should be included in picking tests.  By omitting
 objects which should not be interacted with, it can increase performance.
 
 @param {boolean} isPickable - true if the object should be included in picking tests,
 false otherwise.
 */
c3dl.Model.prototype.setPickable = function (isPickable)
{
  this.sceneGraph.setPickable(isPickable);
}

/**
 Set the linear velocity of the scenegraph's root node.
 
 @param {Array} vec - The linear velocity to set on this object.
 */
c3dl.Model.prototype.setLinearVel = function (vec)
{
  this.sceneGraph.setLinearVel(vec);
}

/**
 This should be called after the model is created. It will be 
 assigned a structural copy of the model which exists in the 
 ModelManager. This object will then be able to update the 
 transformations without changing the object in the manager class. The
 nodes are copied, however the arrays of vertices, normals, etc are not.
 References exsist within this object which will point to the vertex arrays
 in the manager object.
 
 @param {string} modelpath - path of the model file.
 */
c3dl.Model.prototype.init = function (modelpath)
{
  this.path = modelpath;
  // if the file is already in the manager, just get a copy of it now,
  // otherwise put it in queue.
  // Before the scene begins, the user must first specify all the model files
  // they will use during the lifetime of the scene.  When the scene begins, all
  // the files they specified will be created and initialized.  Either it will 
  // be the first time (they won't exist in the manager) or they want a new 
  // object, in which case a copy must be created.
  if (c3dl.ModelManager.getIndex(this.path) == -1)
  {
    c3dl.ModelManager.loadFile(modelpath);
  }
  else if (c3dl.ModelManager.isFileLoaded(this.path))
  {
    var sg = c3dl.ModelManager.getSceneGraphCopy(this.path);
    for (var i=0; i < sg.length; i++)
    {
      this.sceneGraph.addChild(sg[i]);
    }
    this.ready = true;
    c3dl.pushMatrix();
    c3dl.loadIdentity();
    var allVerts = this.sceneGraph.getAllVerts(true);
    this.boundingVolume.init(allVerts);
    c3dl.popMatrix();
  }
}

/**
 @private
 
 Called automatically
 
 Update animations for linear velocity and angular velocity.
 
 @param {float} timeStep - The amount of time elapsed since the last update.
 */
c3dl.Model.prototype.update = function (timeStep)
{
  // keep checking to see if the file is done being loaded.
  if (this.isReady())
  {
    if (!this.isStatic() || (this.isStatic() && this.isDirty()))
    {
      scaleVec=[1,1,1];
      //ModelView stack will be used for trasform mat
      c3dl.pushMatrix();
      c3dl.loadIdentity();
       //ModelView stack will be used for rotation mat
      c3dl.matrixMode(c3dl.PROJECTION);
      c3dl.pushMatrix();
      c3dl.loadIdentity();
      c3dl.matrixMode(c3dl.MODELVIEW);
      var currNode = this.sceneGraph;
      while(currNode)
      {
        if(currNode.children && currNode.children.length)
        {
          var flag = true;
          if (!currNode.pushed)
          {
            c3dl.multiplyVectorByVector(scaleVec, currNode.scaleVec, scaleVec);
            c3dl.multiplyVector(currNode.linVel, timeStep, c3dl.vec1);
            c3dl.addVectors(currNode.pos, c3dl.vec1, currNode.pos);
            currNode.pitch(currNode.angVel[0] * timeStep);
            currNode.yaw(currNode.angVel[1] * timeStep);
            currNode.roll(currNode.angVel[2] * timeStep);
            c3dl.pushMatrix();
            c3dl.multMatrix(currNode.getTransform());
            c3dl.matrixMode(c3dl.PROJECTION);
            c3dl.pushMatrix();
            c3dl.multMatrix(currNode.getRotateMat());
            c3dl.matrixMode(c3dl.MODELVIEW);
            currNode.pushed = true;
          }
          for (var i = 0, len = currNode.children.length; i < len; i++)
          {
            if(!currNode.children[i].updated)
            {
              currNode = currNode.children[i];
              i = len;
              flag = false;
            }
          }
          if (flag)
          {
            c3dl.popMatrix();
            c3dl.matrixMode(c3dl.PROJECTION);
            c3dl.popMatrix();
            c3dl.matrixMode(c3dl.MODELVIEW);
            c3dl.divideVectorByVector(scaleVec, currNode.scaleVec, scaleVec);
            for (var i = 0, len = currNode.children.length; i < len; i++)
            {
              currNode.children[i].updated =null;
            }
            currNode.updated =true;
            currNode.pushed = null;
            currNode = currNode.parent;
          }
        }
        else
        {
          if (currNode.primitiveSets)
          {
            for (var i = 0, len = currNode.primitiveSets.length; i < len; i++)
            {
              var bv = currNode.primitiveSets[i].getBoundingVolume();
              var trans = c3dl.peekMatrix();
              c3dl.matrixMode(c3dl.PROJECTION);
              var rot = c3dl.peekMatrix();
              c3dl.matrixMode(c3dl.MODELVIEW);
              if (bv)
              {
                bv.set(new C3DL_FLOAT_ARRAY([trans[12], trans[13], trans[14]]),rot,scaleVec);
              }
            }
          }
          currNode.updated =true;
          currNode = currNode.parent;
        }
      }
      c3dl.popMatrix();
      c3dl.popMatrix();
      c3dl.matrixMode(c3dl.PROJECTION);
      c3dl.popMatrix();
      c3dl.popMatrix();
      c3dl.matrixMode(c3dl.MODELVIEW);
      if (this.isStatic())
      {
        this.setDirty(false);
      }
      var pos = this.sceneGraph.pos;
      var rotateMat = this.sceneGraph.getRotateMat();
      var scaleVec = this.sceneGraph.scaleVec;
      this.boundingVolume.set(pos,rotateMat,scaleVec);
    }
  }
  if (!this.isReady() && c3dl.ModelManager.isFileLoaded(this.path))
  {
    var sg = c3dl.ModelManager.getSceneGraphCopy(this.path);
    for (var i=0; i < sg.length; i++)
    {
      this.sceneGraph.addChild(sg[i]);
    }
    c3dl.pushMatrix();
    c3dl.loadIdentity();
    var allVerts = this.sceneGraph.getAllVerts(true);
    this.boundingVolume.init(allVerts);
    c3dl.popMatrix();
    
    this.ready =true;     
    if (this.cmdQueue[0])
    {
      for (var i = 0; i <= this.cmdQueue.length; i++)
      {
        var parameters = this.parameterList.pop();
        if (!parameters)
        {
          this[this.cmdQueue.pop()]();
        }
        else if (parameters.length == 2)
        {
          this[this.cmdQueue.pop()](parameters[0],parameters[1]);
        }
        else if (parameters.length == 3)
        {
          this[this.cmdQueue.pop()](parameters[0],parameters[1], parameters[2]);
        }
        else
        {
          this[this.cmdQueue.pop()](parameters[0]);
        }
      }
    }
  }
}

/**
 @private
 Specify the scene graph for this object to use.
 Called automatically.
 
 @param {c3dl.SceneNode} sg - The scenegraph this object is part of.
 */
c3dl.Model.prototype.setSceneGraph = function (sg)
{
  this.sceneGraph = sg;
}


/**
 @private
 
 Called automatically
 
 Render the model.
 
 @param {context} glCanvas3D - The graphics rendering context
 @param {Scene} scene - The scene currently being rendered
 */
c3dl.Model.prototype.render = function (glCanvas3D, scene)
{
  if (this.isReady() && this.isVisible())
  {
    // tell the root to render. The render() calls
    // will propogate down the graph.
    var currNode = this.sceneGraph;
    while(currNode)
    {
      if(currNode.children && currNode.children.length)
      {
        var flag = true;
        if (!currNode.rpushed)
        {
          c3dl.pushMatrix();
          c3dl.multMatrix(currNode.getTransform());
          currNode.rpushed = true;
        }
        for (var i = 0, len = currNode.children.length; i < len; i++)
        {
          if(!currNode.children[i].rupdated)
          {
            currNode = currNode.children[i];
            i = len;
            flag = false;
          }
        }
        if (flag)
        {
          c3dl.popMatrix();
          for (var i = 0, len = currNode.children.length; i < len; i++)
          {
            currNode.children[i].rupdated =null;
          }
          currNode.rupdated =true;
          currNode.rpushed = null;
          currNode = currNode.parent;
        }
      }
      else
      {
        if (currNode.primitiveSets)
        {
          if (currNode.getPrimitiveSets()[0].getType() === "lines")
          {
            //scene.getRenderer().renderLines(this.getPrimitiveSets()[0].getLines(), scene);
          }
          else
          {
            // The first time this is rendered, setup VBOs.
            if (currNode.firstTimeRender == true)
            {
              // iterate over the primitive sets and setup their VBOs
              for (var i = 0, len = currNode.primitiveSets.length; i < len; i++)
              {
                currNode.primitiveSets[i].setupVBO(glCanvas3D);
              }
              currNode.firstTimeRender = false;
            }
            for (var i = 0, len = currNode.primitiveSets.length; i < len; i++)
            {
              scene.getRenderer().texManager.updateTexture(currNode.primitiveSets[i].texture);
            }
            scene.getRenderer().renderGeometry(currNode, scene);
          }
        }
        currNode.rupdated =true;
        currNode = currNode.parent;
      }
    }
    c3dl.popMatrix();
    if (scene.getBoundingVolumeVisibility())
    {
      this.sceneGraph.renderBoundingVolumes(scene);
    }
    if (this.renderObb)
    {
      this.boundingVolume.renderObb(scene);
    }
    if (this.renderAabb)
    {
      this.boundingVolume.renderAabb(scene);
    }
    if (this.renderBoundingSphere)
    {
      this.boundingVolume.renderSphere(scene);
    }
  }
} 

/**
 Scale the scenegraph's root node.
 
 @param {Array} scaleVec - The value to scale by on each axis
 */
c3dl.Model.prototype.scale = function (scaleVec)
{
  this.sceneGraph.scale(scaleVec);
  if (this.isReady())
  {
    this.boundingVolume.scale(scaleVec);
  }
  this.setDirty(true);
}

/**
 Translate the entire model. This will tell the root of the
 Model scenegraph to translate by 'trans'.
 
 @param {Array} trans - The value to translate on each axis
 */
c3dl.Model.prototype.translate = function (trans)
{
  this.sceneGraph.translate(trans);
  if (this.isReady())
  {
    this.boundingVolume.setPosition(this.sceneGraph.pos);
  }
  this.setDirty(true);
}

/**
 Place the object to a new location relative to the world origin.
 
 @param {Array} pos - The absolute position to move the object to
 */
c3dl.Model.prototype.setPosition = function (pos)
{
  this.sceneGraph.setPosition(pos);
  if (this.isReady())
  {
    this.boundingVolume.setPosition(pos);
  }
  this.setDirty(true); 
}

/**
 Get the scenegraph of the Model object.
 
 @returns {c3dl.SceneNode} Root node of the Model model's scenegraph.
 */
c3dl.Model.prototype.getSceneGraph = function ()
{
  return this.sceneGraph;
}

/**
 Set the texture of all the geometry sections (primitive collation elements 
 or primitiveSets) to this texture.
 
 @param {string} texturePath - Path of the texture.
 */
c3dl.Model.prototype.setTexture = function (texturePath)
{
  if (this.isReady())
  {
    this.sceneGraph.setTexture(texturePath);
  }
  else
  {
    this.cmdQueue.push("setTexture");
    this.parameterList.push([texturePath]);
  }
}
/**
Set the texture of a model from an old path to a new path specified by the user

 @param {string} oldtexturePath - The path of the texture to be replaced
 @param {string} newoldtexturePath - The path of the new texture to apply
*/
c3dl.Model.prototype.updateTextureByName = function (oldTexturePath,newTexturePath)
{
  if (this.isReady())
  {
    var modelPath = this.path.split("/");
    modelPath.pop();
    var addModelPath = "";
    for (var i = 0; i < modelPath.length;i++)
    {
      addModelPath += modelPath[i] + "/";
    }
    if (typeof newTexturePath !== "string")
    {
      this.sceneGraph.updateTextureByName(addModelPath+oldTexturePath,newTexturePath);
    }
    else
    {
      this.sceneGraph.updateTextureByName(addModelPath+oldTexturePath,addModelPath+newTexturePath);
    }
  }
  else
  {
    
    this.cmdQueue.push("setMaterial");
    this.parameterList.push([oldTexturePath, newTexturePath]);
  }
}

/**
 Get the textures currently applied to this object.
 
 @returns {Array} The paths to all textures being used by this model.
*/
c3dl.Model.prototype.getTextures = function ()
{
  if (this.isReady())
  {
    return this.sceneGraph.getTextures();
  }
}

/**
 Get the primitiveSets that make up this Model
 
 @returns {Array} The primitiveSets that make up this model.
*/
c3dl.Model.prototype.getPrimitiveSets = function ()
{
  if (this.isReady())
  {
    return this.sceneGraph.getPrimitiveSets();
  }
}

/**
 Sets the material of all the geometry sections (primitive collation elements 
 or primitiveSets) to this material. Thus, the entire model will be
 rendered using this material.
 
 @param {c3dl.Material} material - The material to attach to this model.
 */
c3dl.Model.prototype.setMaterial = function (material)
{
  if (this.isReady())
  {
    this.sceneGraph.setMaterial(material);
  }
  else
  {
    this.cmdQueue.push("setMaterial");
    this.parameterList.push([material]);
  }
}

/**
 Set the way this model should be rendered. The 
 Effect will be set to all the nodes within the model's
 scenegraph. This should only be called once the scene has
 been initialized since on initialization, the built-in
 effects such as c3dl.effects.GOOCH, c3dl.effects.CARTOON, etc.
 are created.
 
 @param {c3dl.Effect} effect - The effect to attach to this model
 */
c3dl.Model.prototype.setEffect = function (effect)
{
  // add type checking?
  if (this.isReady())
  {
    this.sceneGraph.setEffect(effect);
  }
  else
  {
    this.cmdQueue.push("setEffect");
    this.parameterList.push([effect]);
  }
}

/**
 Rotate around an arbitrary axis by a hard amount.
 
 @param {Array} axisVec - The axis to rotate around.
 @param {float} angle - in radians.
 */
c3dl.Model.prototype.rotateOnAxis = function (axisVec, angle)
{
  this.sceneGraph.rotateOnAxis(axisVec, angle);
  if (this.isReady())
  {
    this.boundingVolume.rotateOnAxis(axisVec, angle);
  }
  this.setDirty(true);
}


/**
 Rotate around this object's up vector by a hard amount.
 
 @param {float} angle - in radians.
 */
c3dl.Model.prototype.yaw = function (angle)
{
  this.sceneGraph.yaw(angle);
  if (this.isReady())
  {
    this.boundingVolume.rotateOnAxis(this.boundingVolume.axis[1], angle);
  }
  this.setDirty(true);
}

/**
 Rotate around this object's side vector by a hard amount.
 
 @param {float} angle - in radians.
 */
c3dl.Model.prototype.pitch = function (angle)
{
  this.sceneGraph.pitch(angle);
  if (this.isReady())
  {
   this.boundingVolume.rotateOnAxis(this.boundingVolume.axis[0], angle);
  }
  this.setDirty(true);
}

/**
 @private
 Check if this object has finished loading (and is ready to be drawn) or not.
 
 @returns {boolean} true if this object is ready, false otherwise.
 */
c3dl.Model.prototype.isReady = function ()
{
  return this.ready;
}

/**
 Rotate around this model's direction vector by a hard amount.
 
 @param {float} angle - in radians.
 */
c3dl.Model.prototype.roll = function (angle)
{
  this.sceneGraph.roll(angle);
  if (this.isReady())
  {
    this.boundingVolume.rotateOnAxis(this.boundingVolume.axis[2], angle);
  }
  this.setDirty(true);
}

/**
 @private
 Get a duplicate of this model.
 
 @returns {c3dl.Model} A duplicate of this Model.
 */
c3dl.Model.prototype.getCopy = function ()
{
  var myModel = new c3dl.Model();
  myModel.clone(this);
  return myModel;
}

/**
 Get the transformation matrix of this model.
 Called automatically.
 
 @returns {Array} The array that represents this model's transformation.
*/
c3dl.Model.prototype.getTransform = function ()
{
  if (this.sceneGraph)
  {
    return this.sceneGraph.getTransform();
  }
}

/**
 @private
 Make this object a duplicate of another model.
 
 @param {c3dl.Model} other - The model for this one to duplicate
 */
c3dl.Model.prototype.clone = function (other)
{
  c3dl._super(this, arguments, "clone");
  this.ready = other.ready;
  this.path = other.path;
  this.sceneGraph = other.sceneGraph.getCopy();
  this.boundingVolume = other.boundingVolume.getCopy();
}

/**
 @private
 Does the given ray intersect with this object? This function will
 test the ray against all the geometry nodes in the scenegraph and
 return true as soon as it finds an intersection.
 
 @param {Array} rayOrigin - The ray's origin in view space.
 @param {Array} rayDir - The ray's direction in view space.
 
 @returns {boolean} true if the ray intersects with one of the geometry nodes
 in the scenegraph.
 */
c3dl.Model.prototype.rayIntersectsEnclosures = function (rayOrigin, rayDir)
{
  var result;
  if (c3dl.rayIntersectsSphere(rayOrigin, rayDir, this.boundingVolume.getPosition(), this.boundingVolume.getRadius()) && 
  c3dl.rayAABBIntersect(rayOrigin, rayDir, this.boundingVolume.aabb.maxMins) &&
  c3dl.rayOBBIntersect(rayOrigin, rayDir, this.boundingVolume.obb.boxVerts, this.boundingVolume.getAxis()))
  {
    result = this.sceneGraph.rayIntersectsEnclosures(rayOrigin, rayDir);
  }
  else
  {
    result = false;
  }
  return result;
}

/**
 Determine the type of object this is.
 
 @returns {} A constant value representing c3dl.Model.
*/
c3dl.Model.prototype.getObjectType = function ()
{
  //switch(this.path.substr(this.path.lastIndexOf(".")))
  //{
    //case "dae":
      return c3dl.MODEL;
    //break;
  //}
}

/**
 @private
 Does the given ray intersect with any of the triangles in this object?
 
 @param {Array} rayOrigin - ray's origin in world space.
 @param {Array} rayDir - A normalized direction vector.
 
 @returns {boolean} true if the ray intersects with any triangle in the object.
 */
c3dl.Model.prototype.rayIntersectsTriangles = function (rayOrigin, rayDir)
{
  // Use the matrix stack, but clear it out first
  c3dl.pushMatrix();
  c3dl.loadIdentity();

  var result = this.sceneGraph.rayIntersectsTriangles(rayOrigin, rayDir);

  // restore the stack to its previous state.
  c3dl.popMatrix();
  return result;
}

/**
 Get the bounding volumes for this model.
 
 @returns {c3dl.BoundingVolume} The bounding volumes attached to this model.
*/
c3dl.Model.prototype.getBoundingVolumes = function ()
{
  return this.sceneGraph.getBoundingVolumes();
}

/**
 Get the height (y-axis) of this model.
 
 @returns {int} The height of this model.
*/
c3dl.Model.prototype.getHeight = function ()
{
  if (this.isReady())
  {
    return this.boundingVolume.getHeight();
  }
}


/**
 Get the width (x-axis) of this model.
 
 @returns {int} The width of this model.
*/
c3dl.Model.prototype.getWidth = function ()
{
  if (this.isReady())
  {
    return this.boundingVolume.getWidth();
  }
}

/**
 Get the length (z-axis) of this model.
 
 @returns {int} The length of this model.
*/
c3dl.Model.prototype.getLength = function ()
{
  if (this.isReady())
  {
    return this.boundingVolume.getLength();
  }
}

/**
 Get the size of this model in all three axes.
 
 @returns {Array} The size of this model in all three axes.
*/
c3dl.Model.prototype.getSize = function ()
{
  if (this.isReady())
  {
    return [this.boundingVolume.getLength(),this.boundingVolume.getWidth(),this.boundingVolume.getHeight()];
  }
}

/**
 Scale this model to be a specific height, while leaving the other dimensions untouched.
 
 @param {int} height - The desired height of this model
*/
c3dl.Model.prototype.setHeight = function (height)
{
  if (this.isReady())
  {
    height = parseFloat(height);
    var curheight = this.boundingVolume.getHeight();
    var scaleVec = [];
    if (curheight > height)
    {
      scaleVec = [1, (1 / (curheight / height)), 1];
    }
    else if (curheight < height)
    {
      scaleVec = [1, (height / curheight), 1];
    }
    else
    {
      scaleVec= [1, 1, 1];
    }
    this.sceneGraph.scale(scaleVec);
    this.boundingVolume.scale(scaleVec);
    this.setDirty(true);
  }
  else
  {
    this.cmdQueue.push("setHeight");
    this.parameterList.push([height]);
  }
}

/**
 Scale this model to be a specific length, while leaving the other dimensions untouched.
 
 @param {int} length - The desired length of this model
*/
c3dl.Model.prototype.setLength = function (length)
{
  if (this.isReady())
  {
    length = parseFloat(length);
    var curlength = this.boundingVolume.getLength();
    var scaleVec = [];
    if (curlength > length)
    {
      scaleVec = [(1 / (curlength / length)), 1, 1];
    }
    else if (curlength < length)
    {
      scaleVec = [(length / curlength), 1, 1];
    }
    else
    {
      scaleVec = [1, 1, 1];
    }
    this.sceneGraph.scale(scaleVec);
    this.boundingVolume.scale(scaleVec);
    this.setDirty(true);
  }
  else
  {
    this.cmdQueue.push("setLength");
    this.parameterList.push([length]);
  }
}

/**
 Scale this model to be a specific width, while leaving the other dimensions untouched.
 
 @param {int} width - The desired width of this model
*/
c3dl.Model.prototype.setWidth = function (width)
{
  if (this.isReady())
  {
    width = parseFloat(width);
    var curwidth = this.boundingVolume.getWidth();
    var scaleVec = [];
    if (curwidth > width)
    {
      scaleVec = [1, 1, (1 / (curwidth / width))];
    }
    else if (curwidth < width)
    {
      scaleVec = [1, 1, (width / curwidth)];
    }
    else
    {
      scaleVec = [1, 1, 1];
    }
    this.sceneGraph.scale(scaleVec);
    this.boundingVolume.scale(scaleVec);
    this.setDirty(true);
  }
  else
  {
    this.cmdQueue.push("setWidth");
    this.parameterList.push([width]);
  }
}

/**
 Scale this model to be a specific size, in all three axes.
 
 @param {int} length - The desired length of this model
 @param {int} width - The desired width of this model
 @param {int} height - The desired height of this model
*/
c3dl.Model.prototype.setSize = function (length, width, height)
{
  if (this.isReady())
  {
    length = parseFloat(length);
    width = parseFloat(width);
    height = parseFloat(height);
    var curlength = this.boundingVolume.getLength();
    var curwidth = this.boundingVolume.getWidth();
    var curheight = this.boundingVolume.getHeight();
    var scaleVec = [];
    var vecL, vecW, vecH;
    if (curlength > length)
    {
      vecL = (1 / (curlength / length));
    }
    else if (curlength < length)
    {
      vecL = length / curlength;
    }
    else
    {
      vecL = 1;
    }
    if (curheight > height)
    {
      vecH = (1 / (curheight / height));
    }
    else if (curheight < height)
    {
      vecH = (height / curheight);
    }
    else
    {
      vecH = 1;
    }
    if (curwidth > width)
    {
      vecW = (1 / (curwidth / width));
    }
    else if (curwidth < width)
    {
      vecW = (width / curwidth);
    }
    else
    {
      vecW = 1;
    }
    scaleVec = [vecL, vecH, vecW];
    this.sceneGraph.scale(scaleVec);
    this.boundingVolume.scale(scaleVec);
    this.setDirty(true);
  }
  else
  {
    this.cmdQueue.push("setSize");
    this.parameterList.push([length, width, height]);
  }
}

/**
 Set whether or not to render this model's bounding box.
 
 @param {boolean} renderObb - whether to render the obb or not.
*/
c3dl.Model.prototype.setRenderObb = function (renderObb)
{
  this.renderObb = renderObb;
}

/**
 Set whether or not to render this model's axis aligned bounding box.
 
 @param {boolean} renderAabb - whether to render the axis aligned bounding box or not.
*/
c3dl.Model.prototype.setRenderAabb = function (renderAabb)
{
  this.renderAabb = renderAabb;
}

/**
 Set whether or not to render this model's bounding sphere.
 
 @param {boolean} renderBoundingSphere - whether to render the bounding sphere or not.
*/
c3dl.Model.prototype.setRenderBoundingSphere = function (renderBoundingSphere)
{
  this.renderBoundingSphere = renderBoundingSphere;
}

/**
 Get this model's bounding volume.
 
 @returns {c3dl.BoundingVolume} This model's bounding volumes.
*/
c3dl.Model.prototype.getBoundingVolume = function ()
{
  return this.boundingVolume;
}

/**
 Re-center this object on its original position.
*/
c3dl.Model.prototype.centerObject = function ()
{
  if (this.isReady())
  {
    c3dl.pushMatrix();
    c3dl.loadIdentity();
    this.sceneGraph.center(this.boundingVolume.centerPosition);
    this.boundingVolume.center();
    c3dl.popMatrix();
    this.setDirty(true);
  }
  else
  {
    this.cmdQueue.push("centerObject");
    this.parameterList.push([]);
  }
}

/**
 Determine how close this object is to being loaded.
 
 @returns {int} A value between 0 and 100 representing what percent of this model is loaded. 
*/
c3dl.Model.prototype.getLoadedProgress = function ()
{
  return c3dl.ModelManager.loadProgress(this.path);
}
