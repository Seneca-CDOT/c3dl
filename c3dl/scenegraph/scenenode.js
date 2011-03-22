/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 
 @class c3dl.SceneNode
 */
c3dl.SceneNode = c3dl.inherit(c3dl.Primitive, function () {
  c3dl._superc(this);

  // An array of c3dl.Actors
  this.children = [];
  this.parent =null;
});

/**
 @private
 
 Get a copy of this node and all its children.
 */
c3dl.SceneNode.prototype.getCopy = function () {
  var sceneNode = new c3dl.SceneNode();
  sceneNode.clone(this);
  return sceneNode;
}

/**
 @private
 */
c3dl.SceneNode.prototype.clone = function (other) {
  c3dl._super(this, arguments, "clone");

  // copy all the children
  for (var i = 0, len = other.children.length; i < len; i++) {
    this.addChild(other.children[i].getCopy());
  }
}

/**
 @private
 
 Add a child to this node
 
 @param child
 */
c3dl.SceneNode.prototype.addChild = function (child) {
  this.children.push(child);
  child.parent = this;
}

/**
 @private
 
 private until function is tested.
 
 Ask every child node if they are named 'nodeName'.
 
 @param nodeName
 */
c3dl.SceneNode.prototype.findNode = function (nodeName) {
  var child = null;

  // check first if this node is the one user is looking for.
  if (nodeName == this.name) {
    child = this;
  }

  // otherwise check the children
  else {
    for (var i = 0, len = this.children.length; i < len; i++) {
      //
      if (this.children[i] instanceof c3dl.SceneNode) {
        child = this.children[i].findNode(nodeName);

        // if we found something it wont be null, so we can
        // skip checking the other nodes
        if (child != null) {
          break;
        }
      }
    }
  }
  return child;
}

/**
 @private
 
 Called automatically.
 
 Update animations, etc.
 
 @param {float} timeStep
 */
c3dl.SceneNode.prototype.update = function (timeStep, scaleVec) {
  c3dl._super(this, arguments, "update");
  c3dl.multiplyVectorByVector(scaleVec, this.scaleVec, scaleVec);
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());
  c3dl.matrixMode(c3dl.PROJECTION);
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getRotateMat());
  c3dl.matrixMode(c3dl.MODELVIEW);
  c3dl.multiplyVector(this.linVel, timeStep, c3dl.vec1);
  c3dl.addVectors(this.pos, c3dl.vec1, this.pos);
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].update(timeStep, scaleVec);
  }
  // Apply some rotations to the orientation from the angular velocity
  this.pitch(this.angVel[0] * timeStep);
  this.yaw(this.angVel[1] * timeStep);
  this.roll(this.angVel[2] * timeStep);
  c3dl.popMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  c3dl.popMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);
}


/**
 @private
 
 Called automatically.
 
 When scene nodes are rendered, they first push on their matrix 
 onto the stack, and render their children.  By doing this, all 
 children will be rendered relative to their parent which is this node.
 */
c3dl.SceneNode.prototype.render = function (glCanvas3D, scene) {
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());

  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].render(glCanvas3D, scene);
  }

  c3dl.popMatrix();
}
c3dl.SceneNode.prototype.renderBoundingVolumes = function (scene) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].renderBoundingVolumes(scene);
  }
}

/**
 @private
 
 Set the texture for all the geometry leaves in the scenegraph.
 This should be used when a Collada file has many meshes and each
 mesh uses the same texture file.
 
 @param {String} textureName
 */
c3dl.SceneNode.prototype.setTexture = function (textureName) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].setTexture(textureName);
  }
}

c3dl.SceneNode.prototype.updateTextureByName = function (oldTexturePath,newTexturePath)
{
  for (var i = 0, len = this.children.length; i < len; i++)
  {
    this.children[i].updateTextureByName(oldTexturePath,newTexturePath);
  }
}

/**
 @private
 
 */
c3dl.SceneNode.prototype.setMaterial = function (material) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].setMaterial(material);
  }
}

/**
 */
c3dl.SceneNode.prototype.setEffect = function (effect) {
  for (var i = 0, len = this.children.length; i < len; i++) {
    this.children[i].setEffect(effect);
  }
}

/**
 @private
 
 Called automatically
 
 Do any of the triangles in any of the geometry child nodes of this node intersect
 with the given ray?
 
 @param {Array} rayOrigin
 @param {Array} rayDir
 
 @returns {bool} true if any child geometry node has intersected the ray.
 */
c3dl.SceneNode.prototype.rayIntersectsTriangles = function (rayOrigin, rayDir) {
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());

  var passed = false;

  for (var i = 0, len = this.children.length; i < len; i++) {
    // found a node which passed, we don't have to test the rest of the nodes.
    if (this.children[i].rayIntersectsTriangles(rayOrigin, rayDir)) {
      passed = true;
      break;
    }
  }
  c3dl.popMatrix();
  return passed;
}

/**
 @private
 
 Called automatically.
 
 Do any of the geometry child nodes of this node intersect with the given ray?
 
 @param {Array} rayOrigin
 @param {Array} rayDir
 
 @returns {bool} true if any child geometry node has intersected the ray.
 */
c3dl.SceneNode.prototype.rayIntersectsEnclosures = function (rayOrigin, rayDir) {
  var passed = false;

  // iterate over each child or stop until we find one which has passed the Bounding
  // sphere test.
  for (var i = 0, len = this.children.length; i < len; i++) {
    // found a node which passed, we don't have to test the rest of the nodes.
    if (this.children[i].rayIntersectsEnclosures(rayOrigin, rayDir)) {
      passed = true;
      break;
    }
  }
  return passed;
}

c3dl.SceneNode.prototype.getBoundingVolumes = function () {
  var boundingVolumes = [];
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] instanceof c3dl.SceneNode) {
      boundingVolumes = boundingVolumes.concat(this.children[i].getBoundingVolumes());
    }
    else if (this.children[i] instanceof c3dl.Geometry) {
      for (var j = 0; j < this.children[i].getPrimitiveSets().length; j++) {
        if (this.children[i].getPrimitiveSets()[j].getBoundingVolume()) {
          boundingVolumes = boundingVolumes.concat(this.children[i].getPrimitiveSets()[j].getBoundingVolume());
        }
      }
    }
  }
  return boundingVolumes;
}

c3dl.SceneNode.prototype.getAllVerts = function () {
  var allverts = [];
  var numverts = 0;
  var temp2 = [],
      temp3 = [];
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] instanceof c3dl.SceneNode) {
      allverts = allverts.concat(this.children[i].getAllVerts());
    }
    else if (this.children[i] instanceof c3dl.Geometry) {
      for (var j = 0; j < this.children[i].getPrimitiveSets().length; j++) {
        if (this.children[i].getPrimitiveSets()[j].getBoundingVolume()) {
          var temp = this.children[i].getPrimitiveSets()[j].getBoundingVolume().getMaxMins();
          temp2 = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), [temp[0], temp[2], temp[4]]);
          temp3 = c3dl.multiplyMatrixByVector(c3dl.peekMatrix(), [temp[1], temp[3], temp[5]]);
          allverts.push(temp2[0]);
          allverts.push(temp2[1]);
          allverts.push(temp2[2]);
          allverts.push(temp3[0]);
          allverts.push(temp3[1]);
          allverts.push(temp3[2]);
        }
      }
    }
  }
  c3dl.popMatrix();
  return allverts;
}

c3dl.SceneNode.prototype.center = function (realposition) {  
  var temp = new c3dl.SceneNode();

  for (var j = 0; j < this.children.length; j++) {
    temp.addChild(this.children[j]);
    
  }   
  this.children = [];   
  this.addChild(temp);
  temp.setTransform(c3dl.makePoseMatrix([1, 0, 0], [0, 1, 0], [0, 0, 1], [-realposition[0], -realposition[1], -realposition[2]]));
}