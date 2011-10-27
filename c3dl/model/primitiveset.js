/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**  
 @class c3dl.PrimitiveSet represents a set of primitives within a 
 geometric class. It derives from how .DAE files are structured and is
 roughly equal to a 'primitive collation element'.
 
 <p>All primitive sets in a geometric object share the same coordinate 
 system, so when they are rendered, the matrix stack does not need to 
 be updated or queried. Each primitive set can have its own material 
 and texture if it was defined in the .DAE file.</p>
 
 <p>In the callback function of an effect, the geometry will need to be 
 queried for all its primitive sets. This set will need to be iterated
 and each must be rendered. Since each set can have its own material
 and texture, the context must be sent commands to have the proper 
 states set.</p>
 
 */
c3dl.PrimitiveSet = function ()
{
  this.material = null;
  this.texture = null;
  this.vertices = null;
  this.normals = null;
  this.texCoords = null;
  this.type = null;
  this.lineList = null;
  this.boundingVolume = null;
  this.fillType = null;
  this.buffers =
  {
  };

  /**
   @private
   Set the initial values for this primitiveSet
   
   @param {Array} vertices - The vertex coordinates that make up this primitive set
   @param {Array} normals - The normal at each vertex
   @param {Array} texCoords - The texture coordinates at each vertex
   @param {int} type - A constant value representing what type of primitiveSet this is.
   */
  this.init = function (vertices, normals, texCoords,type)
  {
    this.vertices = vertices;
    this.normals = normals;
    this.texCoords = texCoords;
    this.boundingVolume = new c3dl.BoundingVolume();
    this.type = type;
    // give the bounding sphere the vertices, so it can properly
    // adjust its radius to completely enclose the object. 
    this.boundingVolume.init(this.vertices);  
  }
  
  /**
   Set initial values for this primitiveset using vertices and faces.
   
   @param {Array} vertices - The vertex coordinates that make up this primitive set
   @param {Array} faces - The faces that make up this primitive.  Will be deconstructed to make lines.
   @param {int} type - A constant value representing what type of primitiveSet this is.
  */
  this.initLine = function (vertices, faces, type)
  {
    this.vertices = [];
    this.lineList = [];
    for (var i = 0; i < vertices.length; i++)
    {
      var xyz = [];
      xyz[0]= parseFloat(vertices[i][0]);
      xyz[1] = parseFloat(vertices[i][1]);
      xyz[2] = parseFloat(vertices[i][2]);
      this.vertices.push(xyz[0]);
      this.vertices.push(xyz[1]);
      this.vertices.push(xyz[2]);
    }
    this.type = type;
    for (var i = 0; i < faces.length; i+=2)
    {
      var line = new c3dl.Line();
      var start = faces[i][0];
      var end = faces[i+1][0];
      line.setCoordinates([this.vertices[start*3], this.vertices[start*3+1], this.vertices[start*3+2]],
       [this.vertices[end*3], this.vertices[end*3+1], this.vertices[end*3+2] ]);
      this.lineList.push(line);
    }
  }
  
  /**
   @private
   Create the vertex buffer objects.
   Called automatically.
   
   @param {context} glCanvas3D - The graphics rendering context
   */
  this.setupVBO = function (glCanvas3D)
  {
    this.buffers.vertices = glCanvas3D.createBuffer();
    this.buffers.normals = glCanvas3D.createBuffer();
    this.buffers.texCoords = glCanvas3D.createBuffer();
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.buffers.vertices);
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.vertices, glCanvas3D.STATIC_DRAW);
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.buffers.normals);
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.normals, glCanvas3D.STATIC_DRAW);
    glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.buffers.texCoords);
    glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.texCoords, glCanvas3D.STATIC_DRAW);
  }

  /**
   Get the buffer containing the vertices from this primitiveSet.
   
   @returns {} The buffer containing this primitiveSet's vertices
  */
  this.getVBOVertices = function ()
  {
    return this.buffers.vertices;
  }

  /**
   Get the buffer containing the normals from this primitiveSet.
   
   @returns {} The buffer containing this primitiveSet's normals
  */
  this.getVBONormals = function ()
  {
    return this.buffers.normals;
  }

  /**
   Get the buffer containing the texture coordinates from this primitiveSet.
   
   @returns {} The buffer containing this primitiveSet's texture coordinates
  */
  this.getVBOTexCoords = function ()
  {
    return this.buffers.texCoords;
  }

  /**
   @private
   
   Get a semi-deep copy of this object.  The copy will have deep copies
   of the material and texture, but shallow copies of the vertices, normals and
   texCoords.
   
   @returns {c3dl.PrimitiveSet} A duplicate copy of this primitiveSet
   */
  this.getCopy = function ()
  {
    var copy = new c3dl.PrimitiveSet();

    // shallow copy to save memory.
    copy.vertices = this.vertices;
    copy.normals = this.normals;
    copy.texCoords = this.texCoords;
    copy.texture = this.texture;
    copy.lineList = this.lineList;
    copy.type = this.type;
    copy.fillType = this.fillType;
    // get a deep copy of the material since every model's primitive set
    // can have its own material.    
    copy.material = this.material ? this.material.getCopy() : null;
    if (this.boundingVolume)
    {
      copy.boundingVolume = this.boundingVolume.getCopy();
    }
    return copy;
  }

  /**
   Get the path of the texture for this primitive set.
   
   @returns {String} path of the texture.
   */
  this.getTexture = function ()
  {
    return this.texture;
  }

  /**    
   Get the single dimensional array of vertices of this primitive set.
   The array of vertices is in the order x,y,z,x,y,z,...
   
   @returns {Array} Vertices are in the order x,y,z,x,y,z,...
   */
  this.getVertices = function ()
  {
    return this.vertices;
  }

  /**
   Get the single dimensional array of normals of this primitive set. 
   The array of normals is in the order nx, ny, nz, nx, ny, nz,...
   
   @returns {Array} Normals are in the order nx, ny, nz, nx, ny, nz,...
   */
  this.getNormals = function ()
  {
    return this.normals;
  }

  /**
   Get the single dimensional array of texture coordinates of this 
   primitive set. The array of texture coords is in the order u, v, u, v,...
   
   @returns {Array} Textures coordinates are in the order u, v, u, v,...
   */
  this.getTexCoords = function ()
  {
    return this.texCoords;
  }

  /**
   Get the material of this primitive set.
   
   @returns {c3dl.Material} Material of this primitive set.
   */
  this.getMaterial = function ()
  {
    return this.material;
  }

  /**
   @private
   Get the bounding volume of this primitiveSet
   
   @returns {c3dl.BoundingVolume}  the updated bounding volume object.
   */
  this.getBoundingVolume = function ()
  {
    return this.boundingVolume;
  }
  
  /**
   @private
   Set the material of this primitive set. The material can't be directly
   set by the user, but is set by the library when the .DAE file is being
   loaded.
   
   @param {c3dl.Material} material - The material for this primitive set to use
   */
  this.setMaterial = function (material)
  {
    this.material = material;
  }

  /**
   @private
   Set the texture of this primitive set. The texture can't be directly
   set, but is set when the .DAE file is being loaded.
   
   @param {String} texture - Path of the texture.
   */
  this.setTexture = function (texture)
  {
    this.texture = texture;
  }
  
  /**
   Change the texture applied to this primitiveSet.
   
   @param {String} oldTexturePath - The path to the texture currently in use
   @param {String} TexturePath - The path to the new texture to apply instead.
  */
  this.updateTextureByName = function (oldTexturePath,newTexturePath)
  {
    if (this.texture)
    {
      if (this.texture === oldTexturePath)
      {
        this.texture = newTexturePath;
      }
    }
  }
  
  /**
   Get the lines used in this primitiveSet.
   
   @returns {Array} This primitiveSet's lines.
  */
  this.getLines = function ()
  {
    return this.lineList;
  }
  
  /**
   Retrieve the type of this PrmitiveSet
   
   @returns {int} A constant value representing what type of primitiveSet this is.
  */
  this.getType = function ()
  {
    return this.type;
  }
}
