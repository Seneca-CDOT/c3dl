/**
	@private

	class A Model is an object which has a geometric representation composed of 
	vertices, normals and uv coordinates. Models may also  have textures
	applied to them.
*/
c3dl.BoundingSphere = function()
{
	// When a model is first loaded, the longestVector will be set.  Once the
	// model is scaled for example by (2,2,2), this scaled vector will be multiplied by
	// the longest vector and the radius will be recomputed.  It is not
	// sufficient to only store the radius (a scalar) value.  If the scaling
	// is uniform, the boundingSphere will always tightly enclose the model.  If
	// non-uniform scaling is applied to the model, the enclosure will not.
	// For the enclosure to do so would incur an O(n) operation everytime the 
	// a model is scaled non-uniformly.
	this.longestVector = [0,0,0];
	
	this.original = [0,0,0];

	// position of the boundingSphere in world space.
	this.position =[0,0,0];
	
	//
	this.radius = 0;
	
	// This varialbe exists here to solve the problem of the Model and Bounding Sphere
	// having the same scaling.
	// The first time the BS is initialized it gets the longest vector of the object.
	// However the user may then scale the Model, we cannot scale the BS at that time
	// since the scale method is inside the primitive class, not model.  We also cannot
	// scale the BS to reflect the proper size in getBoundingSphere() since it would
	// keep incrementing the size of the BS everytime it it called.
	//
	// The hierarchy of our classes should be changed to 
	//   Actor (currently Primitive)
	//     ^
	//     |
	// VisualActor
	//     ^
	//     |
	//   Model 
	//
	// Then we could add BoundingSphere on the VisualActor and when it is scaled, the BS can be
	// also scaled.
	

	/**
		@private
		Initialize the object by providing a 1-dimensional array which contains
		the vertices of the object. This is O(n) since we need to find the longest
		vector as to adjust the sphere's radius.
				
		@param {Array} vertices The vertices of the visible object.  Since the array
		is 1-dimensional, the values could look similar to:<br />
		[-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, .... ]<br />
		in which case values at 0,1 and 2 are x,y,z coordinates.
	*/
	this.init = function(vertices)
	{
		// start the longest to zero, so it will be overritten probably by the first
		// vector found.
		var longestLengthFound = 0;
	
		// do not allocate a new vector for every iteration to prevent
		// too much allocation. So allocate outside the loop.
		var vector = [0,0,0];
		var currVector;
		
		// iterate over the vertices and find the longest vector.
		for (var i = 0; i < vertices.length; i+=3)
		{
			// 
			vector[0] = vertices[i+0];
			vector[1] = vertices[i+1];
			vector[2] = vertices[i+2];

			currVector = c3dl.vectorLength(vector);

			// once the longest vector is found, this becomes our radius.
			if(currVector > longestLengthFound)
			{
				longestLengthFound = currVector;
				this.longestVector = [vertices[i+0], vertices[i+1], vertices[i+2] ];
			}
		}

		// now that we have found the longest vector, we can assign the radius.
		// use copyVector for this
		this.original[0] = this.longestVector[0];
		this.original[1] = this.longestVector[1];
		this.original[2] = this.longestVector[2];
	}
	
	/**
		@private
		Set a new position of the bounding sphere.
		
		@param {Array} position An three element array which contains the x,y,z values
		of the new position of the bounding sphere.
	*/
	this.setPosition = function(position)
	{
		this.position = [position[0],position[1],position[2]];
	}
	
	/**
		@private
	
		Primitive will call this when it is scaled. Thus keeping the sphere bounds around
		the Model.
		
		@param {Array} scaleVec
	*/
	this.scale = function(scaleVec)
	{
		// The object could have been scaled non-uniformly, so we have to get the component
		// which has the greatest scaling factor.  We will use that to recalculate the 
		// bounding sphere's radius.

		var largestScale = scaleVec[0] > scaleVec[1] ? scaleVec[0] : scaleVec[1];
		largestScale = largestScale > scaleVec[2] ? largestScale : scaleVec[2];		
						
		this.longestVector[0] = this.original[0] * largestScale;
		this.longestVector[1] = this.original[1] * largestScale;
		this.longestVector[2] = this.original[2] * largestScale;
	}
	
	/**
		@private
		Render the bounding sphere
		
		@param {c3dl.Scene} scene
	*/
	this.render = function(scene)
	{
		if(scene.getBoundingVolumeVisibility())
		{
			scene.getRenderer().renderBoundingSphere(this);
		}
	}
	
	/**
		@private
	*/
	this.getRadius = function()
	{
		return c3dl.vectorLength(this.longestVector);
	}
	
	/**
		@private

		Get the position of the bounding sphere.
		
		@returns {Array} A three element array of the bounding spheres position.
	*/
	this.getPosition = function()
	{
		return [this.position[0],this.position[1],this.position[2]];
	}
}
