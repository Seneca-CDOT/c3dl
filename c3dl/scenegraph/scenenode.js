/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

				
/**
	@private

	@class c3dl.SceneNode
*/
c3dl.SceneNode = c3dl.inherit(c3dl.Primitive, function()
{
	c3dl._superc(this);

	// An array of c3dl.Actors
	this.children = [];
});

/**
	@private

	Get a copy of this node and all its children.
*/
c3dl.SceneNode.prototype.getCopy = function()
{
	var sceneNode = new c3dl.SceneNode();
	sceneNode.clone(this);
	return sceneNode;
}

/**
	@private
*/
c3dl.SceneNode.prototype.clone = function(other)
{
	c3dl._super(this, arguments, "clone");

	// copy all the children
	for (var i = 0; i < other.children.length; i++)
	{
		this.addChild(other.children[i].getCopy());
	}
}


/**
	@private

	Add a child to this node

	@param child
*/
c3dl.SceneNode.prototype.addChild = function(child)
{
	this.children.push(child);
}


/**
	@private
	
	private until function is tested.
	
	Ask every child node if they are named 'nodeName'.
	
	@param nodeName
*/
c3dl.SceneNode.prototype.findNode = function(nodeName)
{
	var child = null;

	// check first if this node is the one user is looking for.
	if(nodeName == this.name)
	{
		child = this;
	}

	// otherwise check the children
	else
	{
		for (var i=0; i < this.children.length; i++)
		{
			//
			if(this.children[i] instanceof c3dl.SceneNode)
			{
				child = this.children[i].findNode(nodeName);

				// if we found something it wont be null, so we can
				// skip checking the other nodes
				if (child != null)
				{
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
c3dl.SceneNode.prototype.update = function(timeStep)
{
	c3dl._super(this, arguments, "update");

	for (var i=0; i < this.children.length; i++)
	{
		this.children[i].update(timeStep);
	}
}


/**
	@private
	
	Called automatically.

	When scene nodes are rendered, they first push on their matrix 
	onto the stack, and render their children.  By doing this, all 
	children will be rendered relative to their parent which is this node.
*/
c3dl.SceneNode.prototype.render = function(glCanvas3D, scene)
{
	c3dl.pushMatrix();
	c3dl.multMatrix(this.getTransform());

	for (var i = 0; i < this.children.length; i++)
	{
		this.children[i].render(glCanvas3D, scene);
	}

	c3dl.popMatrix();
}	


/**
	@private

	Set the texture for all the geometry leaves in the scenegraph.
	This should be used when a Collada file has many meshes and each
	mesh uses the same texture file.

	@param {String} textureName
*/
c3dl.SceneNode.prototype.setTexture = function(textureName)
{
	for (var i = 0; i < this.children.length; i++)
	{
		this.children[i].setTexture(textureName);
	}
}

/**
	@private

*/
c3dl.SceneNode.prototype.setMaterial = function(material)
{
	for (var i = 0; i < this.children.length; i++)
	{
		this.children[i].setMaterial(material);
	}
}

/**
*/
c3dl.SceneNode.prototype.setEffect = function(effect)
{
	for (var i = 0; i < this.children.length; i++)
	{
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
c3dl.SceneNode.prototype.rayIntersectsTriangles = function(rayOrigin, rayDir)
{
	c3dl.pushMatrix();
	c3dl.multMatrix(this.getTransform());
	
	var passed = false;

	for (var i = 0; i < this.children.length; i++)
	{
		// found a node which passed, we don't have to test the rest of the nodes.
		if(this.children[i].rayIntersectsTriangles(rayOrigin, rayDir))
		{
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
c3dl.SceneNode.prototype.rayIntersectsEnclosures = function(rayOrigin, rayDir)
{
	c3dl.pushMatrix();
	c3dl.multMatrix(this.getTransform());
	
	var passed = false;

	// iterate over each child or stop until we find one which has passed the Bounding
	// sphere test.
	for (var i = 0; i < this.children.length; i++)
	{
		// found a node which passed, we don't have to test the rest of the nodes.
		if(this.children[i].rayIntersectsEnclosures(rayOrigin, rayDir))
		{
			passed = true;		
			break;
		}
	}
	
	c3dl.popMatrix();
	return passed;
}
