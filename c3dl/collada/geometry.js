/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**	
	@class c3dl.Geometry is a container for the primitiveSets of a 
	geometric object.
*/
c3dl.Geometry = function()
{
	// a geometry is composed of different collation elements (sets of primitives)
	// collation elements are <triangles>, <polylist>, <polygon>, etc.
	this.primitiveSets = [];
	this.effect = null;
	
	// the first time geometries are rendered, their VBO's need to
	// be setup. Can't do this when Collada objects are created
	// because we don't yet have a graphics context.
	this.firstTimeRender = true;

	/**
		@private
		
		Used by the collada loader
	*/
	this.addPrimitiveSet = function(primitiveSet)
	{
		this.primitiveSets.push(primitiveSet);
	}

	/**
		@private

		Used by the ColladaManager
	*/
	this.clone = function(other)
	{
		// 
		for(var i = 0; i < other.primitiveSets.length; i++)
		{
			this.primitiveSets.push( other.primitiveSets[i].getCopy());
		}
	}


	/**
		@private

		Used by the ColladaManager
	*/
	this.getCopy = function()
	{
		var geometry = new c3dl.Geometry();
		geometry.clone(this);
		return geometry;
	}


	/**
		@private
		Get the effect of this geometry.

		@param {c3dl.Effect} The effect of this geometry.
	*/
	this.getEffect = function()
	{
		return this.effect;
	}

	/**
		Get the array of primitive sets for this geometry.
		
		@returns {Array} The primitive sets for this geometry.
	*/
	this.getPrimitiveSets = function()
	{
		return this.primitiveSets;
	}


	/**
		@private
		
		Does the given ray intersect with any of the geometry's primitive set's
		bounding spheres?
		
		@param {Array} rayOrigin
		@param {Array} rayDir
	*/
	this.rayIntersectsEnclosures = function(rayOrigin, rayDir)
	{
		var mat = c3dl.peekMatrix();
		
		for(var i = 0; i < this.primitiveSets.length; i++)
		{
			var bs = this.primitiveSets[i].getBoundingSphere();
			var longestVec;

			var leftLen = c3dl.vectorLength([mat[0], mat[1], mat[2]]);
			var upLen   = c3dl.vectorLength([mat[4], mat[5], mat[6]]);
			var dirLen  = c3dl.vectorLength([mat[8], mat[9], mat[10]]); 

			longestVec = leftLen > upLen ? leftLen : upLen;
			longestVec = longestVec > dirLen? longestVec : dirLen;

			bs.setPosition([mat[12], mat[13], mat[14]])
			bs.scale([longestVec,longestVec,longestVec]);

			if(c3dl.rayIntersectsSphere(rayOrigin, rayDir, bs.getPosition(), bs.getRadius()))
			{				
				return true;
			}
		}
		return false;
	}


	/**
		@private

		Does the mesh in this geometry node intersect with the ray?
			
		@param {Array} rayOrigin
		@param {Array} rayDir
	*/
	this.rayIntersectsTriangles = function(rayOrigin, rayDir)
	{		
		var mat = c3dl.inverseMatrix(c3dl.peekMatrix());
		var rayorigin = c3dl.multiplyMatrixByVector(mat, rayOrigin);
		var raydir = c3dl.normalizeVector(c3dl.multiplyMatrixByDirection(mat, rayDir));

		// allocate and resuse these vertices to prevent allocation and deletion every face.
		var vert1 = new Array(3);
		var vert2 = new Array(3);
		var vert3 = new Array(3);
		
		for(var i = 0; i < this.primitiveSets.length; i++)
		{
			var vertices = this.primitiveSets[i].getVertices();

			// Iterate over each face of the object and test it against the ray.
			for (var j = 0; j < vertices.length; j += 9)
			{
				// 3 points of a triangle with the object's position offset
				vert1[0] = vertices[j];
				vert1[1] = vertices[j+1]
				vert1[2] = vertices[j+2];

				vert2[0] = vertices[j+3];
				vert2[1] = vertices[j+4];
				vert2[2] = vertices[j+5];

				vert3[0] = vertices[j+6];
				vert3[1] = vertices[j+7];
				vert3[2] = vertices[j+8];

				if (c3dl.rayIntersectsTriangle(rayorigin, raydir, vert1, vert2, vert3))
				{
					return true;
				}
			}
		}
		return false;
	}

	
	
	/**
		@private

		Called automatically
	*/
	this.render = function(glCanvas3D, scene)
	{		
		if (glCanvas3D == null)
		{
			c3dl.debug.logWarning('Geometry::render() called with a null glCanvas3D');	
			return false;
		}
		
		// The first time this is rendered, setup VBOs.
		if(this.firstTimeRender == true)
		{
			// iterate over the primitive sets and setup their VBOs
			for(var i = 0; i < this.primitiveSets.length; i++)
			{
				this.primitiveSets[i].setupVBO(glCanvas3D);
			}
			this.firstTimeRender = false;
		}

		scene.getRenderer().renderGeometry(this);

		if( scene.getBoundingVolumeVisibility() )
		{
			// tell all the collation elements/ primitive sets to render their bounding spheres.
			for(var i = 0; i < this.primitiveSets.length; i++)
			{		
				var bs = this.primitiveSets[i].getBoundingSphere();
				if(bs)
				{
					bs.render(scene);
				}
			}
		}
	}


	/**
		@private
		
		Set the effect of this geometry. The geometry has primitive sets, 
		but those cannot be set directly. All primitive sets under this 
		geometric object will be rendered the same.
		
		@param {c3dl.Effect} effect
	*/
	this.setEffect = function(effect)
	{
		this.effect = effect;
	}


	/**
		@private
		
		@param {c3dl.Material} material
	*/
	this.setMaterial = function(material)
	{
		for(var i=0; i < this.primitiveSets.length; i++)
		{
			this.primitiveSets[i].setMaterial(material);
		}
	}


	/**
		@private
		
		@param {} texture
	*/
	this.setTexture = function(texture)
	{
		for(var i=0; i < this.primitiveSets.length; i++)
		{
			this.primitiveSets[i].setTexture(texture);
		}
	}


	/**
		@private

		Called automatically
	*/
	this.update = function(timeStep)
	{
		//
		for(var i = 0; i < this.primitiveSets.length; i++)
		{
			var bs = this.primitiveSets[i].getBoundingSphere();
			if(bs)
			{
				//bs.setPosition(this.pos);
				bs.setPosition([0,0,0]);
			}
		}
	}
}
