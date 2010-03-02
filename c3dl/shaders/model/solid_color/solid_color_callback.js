/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
	@private
*/
c3dl.solid_color_callback = function(renderingObj)
{
	var progObjID = renderingObj.getProgramObjectID();
	var geometry = renderingObj.getGeometry();
  var effect = geometry.getEffect();
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
	renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix);
  renderer.setUniformf(progObjID, "color", effect.getParameter("color"));

	// render all the collation elements. Every collation element in an object will 
	// have the same tranformation
	for(var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
	{
		var currColl = geometry.getPrimitiveSets()[coll];

    // Prevent C3DL from reporting an error, so check if attrib exsits
    // before trying to set it.
    // This is  a kludge for Safari and Chrome since they want these attributes
    ////////////////////////////
    var normalAttribLoc = glCanvas3D.getAttribLocation(progObjID,"Normal");
		if(normalAttribLoc != -1 && currColl.getNormals())
		{
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals());
		}
		var texAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Texture");
		if(texAttribLoc != -1 && currColl.getTexCoords())
		{
			renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords());
		}
    ////////////////////////// End kludge



		// VERTICES
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices());
    glCanvas3D.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length/3);
	}
}
