/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
var isDone = false;
/**
	@private
*/
c3dl.std_callback = function(renderingObj)
{
	var progObjID = renderingObj.getProgramObjectID();
	var geometry = renderingObj.getGeometry();
	var renderer = renderingObj.getRenderer();
	var glCanvas3D = renderingObj.getContext();

	glCanvas3D.useProgram(progObjID);

	var modelViewMatrix = c3dl.peekMatrix();
	c3dl.matrixMode(c3dl.PROJECTION);
	var projectionMatrix = c3dl.peekMatrix();
	c3dl.matrixMode(c3dl.MODELVIEW);

	// create a ModelViewProjection matrix.  By doing this, we can multiply
	// 3 matrices together once per model instead of once per vertex
	var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
	renderer.setUniformMatrix(progObjID, "modelViewMatrix", modelViewMatrix);
	renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix);

	// render all the collation elements. Every collation element in an object will 
	// have the same tranformation
	for(var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
	{
		var currColl = geometry.getPrimitiveSets()[coll];

		// MATERIAL
		var mat = currColl.getMaterial();

		if(mat)
		{
			// every primitive collection can have a material associated with it.
			// currColl.material.getEmission()
			renderer.setUniformf(progObjID, "material.emission", mat.getEmission());
			renderer.setUniformf(progObjID, "material.ambient", mat.getAmbient());
			renderer.setUniformf(progObjID, "material.diffuse", mat.getDiffuse());
			renderer.setUniformf(progObjID, "material.specular", mat.getSpecular());
			renderer.setUniformf(progObjID, "material.shininess", mat.getShininess());
			renderer.setUniformi(progObjID, "usingMaterial", true);
		}
		else
		{
			renderer.setUniformi(progObjID, "usingMaterial", false);
		}

		// NORMAL
		var normalAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Normal");

		// if the object acutally has normals and the normal attribute was found
		//			
		if(normalAttribLoc != -1 && currColl.getNormals())
		{
			// the top matrix is the modelview matrix.
			var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
			NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
			renderer.setUniformMatrix(progObjID, "normalMatrix", NormalMatrix);
			renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals());	
		}
		else
		{
			glCanvas3D.disableVertexAttribArray(normalAttribLoc);
		}

		// TEXTURE
		var usingTexture = false;

		var texAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Texture");
		var texID = renderer.texManager.getID(currColl.getTexture());
		
		// if the texture isn't loaded, but this collation element has one, 
		// queue one up
		if(texID == -1 && currColl.getTexture())
		{
			renderer.texManager.addTexture(currColl.getTexture());
		}

		// The following must be fixed: If a collada object was specified as having
		// a texture, but the texture file isn't found, the object will be textured.
		// However, this following condition will run, because the object 'thinks'
		// it has a texture.  the result is the object will not get lit and will
		// appear completely black.  We need to insert another condition which
		// states if the texture is actually present, this should run...
		if(texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1 )
		{
			glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
			glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, texID);
			renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords());
			usingTexture = true;
		}
		else
		{
			glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
			glCanvas3D.disableVertexAttribArray(texAttribLoc);
			//glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,-1);
		}

		// tell the fragment shader if we are using textures or not
		renderer.setUniformi(progObjID, "usingTexture", usingTexture);
		renderer.setUniformi(progObjID, "lightingOn", true);

		// VERTICES
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices());
    glCanvas3D.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length/3);
	}
}
