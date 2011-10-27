/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**  
 @class c3dl.Geometry is a container for the primitiveSets of a 
 geometric object.
 */
c3dl.Geometry = function ()
{
  // a geometry is composed of different collation elements (sets of primitives)
  // collation elements are <triangles>, <polylist>, <polygon>, etc.
  this.primitiveSets = [];
  this.effect = null;

  // the first time geometries are rendered, their VBO's need to
  // be setup. Can't do this when models are created
  // because we don't yet have a graphics context.
  this.firstTimeRender = true;

  /**
   @private
   
   Used by the model loader.
   Add a primitiveSet to this Geometry
   */
  this.addPrimitiveSet = function (primitiveSet)
  {
    this.primitiveSets.push(primitiveSet);
  }

  /**
   @private
   
   Used by the ModelManager.
   Attach the primitiveSets from another Geometry to this one.
   
   @param {c3dl.Geometry} other - The Geometry to copy the primitiveSets from. 
   */
  this.clone = function (other)
  {
    // 
    for (var i = 0, len = other.primitiveSets.length; i < len; i++)
    {
      this.primitiveSets.push(other.primitiveSets[i].getCopy());
    }
  }

  /**
   @private
   
   Used by the ModelManager.
   Obtain a copy of this Geometry.
   
   @returns {c3dl.Geometry} A duplicate copy of this Geometry.
   
   */
  this.getCopy = function ()
  {
    var geometry = new c3dl.Geometry();
    geometry.clone(this);
    return geometry;
  }

  /**
   @private
   Get the effect of this geometry.
   
   @returns {c3dl.Effect} The effect of this geometry.
   */
  this.getEffect = function ()
  {
    return this.effect;
  }

  /**
   Get the array of primitive sets for this geometry.
   
   @returns {Array} The primitive sets for this geometry.
   */
  this.getPrimitiveSets = function ()
  {
    return this.primitiveSets;
  }

  /**
   @private
   
   Does the given ray intersect with any of the geometry's primitive set's
   bounding spheres?
   
   @param {Array} rayOrigin - The originating point of the ray
   @param {Array} rayDir - The direction vector for the ray
   
   @returns {boolean} True if the ray intersects this Geometry's OBB, false otherwise.
   */
  this.rayIntersectsEnclosures = function (rayOrigin, rayDir)
  {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      if (this.getPrimitiveSets()[i].getType() !== "lines")
      {
        var bv = this.primitiveSets[i].getBoundingVolume();
        var pos = bv.getPosition();
        var radius = bv.getRadius();
        if (c3dl.rayIntersectsSphere(rayOrigin, rayDir, pos, radius) && c3dl.rayAABBIntersect(rayOrigin, rayDir, bv.aabb.maxMins) && 
        c3dl.rayOBBIntersect(rayOrigin, rayDir, bv.obb.boxVerts, bv.getAxis()))
        {
          return true;
        }
      }
    }
    return false;
  }

  /**
   @private
   
   Does the mesh in this geometry node intersect with the ray?
   
   @param {Array} rayOrigin - The originating point of the ray
   @param {Array} rayDir - The ray's direction vector
   
   @returns {boolean} True if the ray intersects any of this Geometry's triangles, false otherwise.
   */
  this.rayIntersectsTriangles = function (rayOrigin, rayDir)
  {
    var mat = c3dl.inverseMatrix(c3dl.peekMatrix());
    var rayorigin = c3dl.multiplyMatrixByVector(mat, rayOrigin);
    var raydir = c3dl.normalizeVector(c3dl.multiplyMatrixByDirection(mat, rayDir));

    // allocate and resuse these vertices to prevent allocation and deletion every face.
    var vert1 = new C3DL_FLOAT_ARRAY(3);
    var vert2 = new C3DL_FLOAT_ARRAY(3);
    var vert3 = new C3DL_FLOAT_ARRAY(3);

    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      if (this.getPrimitiveSets()[i].getType() !== "lines")
      {
        var vertices = this.primitiveSets[i].getVertices();

        // Iterate over each face of the object and test it against the ray.
        for (var j = 0, len2 = vertices.length; j < len2; j += 9)
        {
          // 3 points of a triangle with the object's position offset
          vert1[0] = vertices[j];
          vert1[1] = vertices[j + 1]
          vert1[2] = vertices[j + 2];

          vert2[0] = vertices[j + 3];
          vert2[1] = vertices[j + 4];
          vert2[2] = vertices[j + 5];

          vert3[0] = vertices[j + 6];
          vert3[1] = vertices[j + 7];
          vert3[2] = vertices[j + 8];

          if (c3dl.rayIntersectsTriangle(rayorigin, raydir, vert1, vert2, vert3))
          {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   @private
   
   Draw this Geometry within the scene.
   Called automatically.
   
   @param {Context} glCanvas3D - The graphics rendering context.
   @param {Scene} scene - The scene currently being rendered.
   */
  this.render = function (glCanvas3D, scene)
  {
    if (glCanvas3D == null)
    {
      c3dl.debug.logWarning('Geometry::render() called with a null glCanvas3D');
      return false;
    }
    if (this.getPrimitiveSets()[0].getType() === "lines")
    {
      //scene.getRenderer().renderLines(this.getPrimitiveSets()[0].getLines(), scene);
    }
    else
    {
      // The first time this is rendered, setup VBOs.
      if (this.firstTimeRender == true)
      {
        // iterate over the primitive sets and setup their VBOs
        for (var i = 0, len = this.primitiveSets.length; i < len; i++)
        {
          this.primitiveSets[i].setupVBO(glCanvas3D);
        }
        this.firstTimeRender = false;
      }
      for (var i = 0, len = this.primitiveSets.length; i < len; i++)
      {
        scene.getRenderer().texManager.updateTexture(this.primitiveSets[i].texture);
      }
      
      scene.getRenderer().renderGeometry(this, scene);
    }
  }
  
  
  /**
   Render the bounding volumes for this Geometry.
   
   @param {Scene} scene - The scene currently being rendered.
  */
  this.renderBoundingVolumes = function (scene)
  {
    // tell all the collation elements/ primitive sets to render their bounding spheres.
    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      var bv = this.primitiveSets[i].getBoundingVolume();
      if (bv)
      {
        bv.renderAabb(scene);
        bv.renderObb(scene);
        bv.renderSphere(scene);
      }
    }   
  }

  /**
   @private
   
   Set the effect of this geometry. The geometry has primitive sets, 
   but those cannot be set directly. All primitive sets under this 
   geometric object will be rendered the same.
   
   @param {c3dl.Effect} effect - the effect to use on this Geometry
   */
  this.setEffect = function (effect)
  {
    this.effect = effect;
  }

  /**
   @private
   Set a material for this Geometry to use.
   
   @param {c3dl.Material} material - The material to attach to this object
   */
  this.setMaterial = function (material)
  {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      this.primitiveSets[i].setMaterial(material);
    }
  }


  /**
   @private
   Set this Geometry's texture.
   
   @param {} texture - The textrue object for this Geometry to use.
   */
  this.setTexture = function (texture)
  {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      this.primitiveSets[i].setTexture(texture);
    }
  }
    /**
   @private
   Change the texture being used by this Geometry.
   
   @param {String} oldTexturePath - The path to the texture currently in use
   @param {String} newTexturePath - The path to the texture to use
   */
  this.updateTextureByName = function (oldTexturePath,newTexturePath)
  {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      this.primitiveSets[i].updateTextureByName(oldTexturePath,newTexturePath);
    }
  }

  /**
   @private
   Apply any changes to this Geometry, prior to rendering it.
   Called automatically.
   
   @param {int} timestep - The amount of time elapsed since the last update
   @param {Array} scaleVec - Scaling to apply to this object.
   */
  this.update = function (timeStep, scaleVec)
  {
    for (var i = 0, len = this.primitiveSets.length; i < len; i++)
    {
      var bv = this.primitiveSets[i].getBoundingVolume();
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
}
