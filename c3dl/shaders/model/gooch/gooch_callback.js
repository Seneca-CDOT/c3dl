/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/*

*/
c3dl.gooch_callback = function (renderingObj, scene)
{
  var renderer = renderingObj.getRenderer();
  var gl = renderingObj.getContext();
  var geometry = renderingObj.getGeometry();
  var effect = geometry.getEffect();
  var programObjID = renderingObj.getProgramObjectID();

  gl.useProgram(programObjID);
  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(programObjID, "modelViewMatrix", modelViewMatrix, scene, "gooch");
  renderer.setUniformMatrix(programObjID, "modelViewProjMatrix", modelViewProjMatrix, scene, "gooch");

  // Commenting out until a fix is solved for the 2-object outline bug
  // Only render the outline, which is a single pixel thick if the user
  // wants it and the effect exists.
  if (effect.getParameter("outline") == true && renderer.SOLID_COLOR_EFFECT_ID)
  {
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(2.0, 2.0);

    // use the solid color effect since it's fast and we don't have
    // to send unnecessary data.
    var outlineProgID = renderer.SOLID_COLOR_EFFECT_ID;

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    gl.useProgram(outlineProgID);
    renderer.setUniformf(outlineProgID, "color", [0, 0, 0], scene, "outlinegooch");

    var modelViewMatrix = c3dl.peekMatrix();
    c3dl.matrixMode(c3dl.PROJECTION);
    var projectionMatrix = c3dl.peekMatrix();
    c3dl.matrixMode(c3dl.MODELVIEW);

    var MVPMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
    renderer.setUniformMatrix(outlineProgID, "modelViewProjMatrix", MVPMatrix, scene, "outlinegooch");

    var contextWidth = renderer.getContextWidth();
    var contextHeight = renderer.getContextHeight();

    for (var primSet = 0; primSet < geometry.getPrimitiveSets().length; primSet++)
    {
      var currColl = geometry.getPrimitiveSets()[primSet];

      // Prevent C3DL from reporting an error, so check if attrib exsits
      // before trying to set it.
      // This is  a kludge for Safari and Chrome since they want these attributes
      ////////////////////////////
      var normalAttribLoc = scene.curContextCache.attributes["outlinegooch"+primSet+"Normal"];
      if(normalAttribLoc ==undefined ) {
        normalAttribLoc = gl.getAttribLocation(outlineProgID, "Normal");
        scene.curContextCache.attributes["outlinegooch"+primSet+"Normal"] = normalAttribLoc;
      }
      
      if (normalAttribLoc != -1 && currColl.getNormals())
      {
        renderer.setVertexAttribArray(outlineProgID, "Normal", 3, currColl.getVBONormals(), scene, "outlinegooch"+primSet);
      }
      var texAttribLoc = scene.curContextCache.attributes["outlinegooch"+primSet+"Texture"];
      if(texAttribLoc ==undefined ) {
        texAttribLoc = gl.getAttribLocation(outlineProgID, "Texture");
        scene.curContextCache.attributes["outlinegooch"+primSet+"Texture"] = texAttribLoc;
      }
      
      if (texAttribLoc != -1 && currColl.getTexCoords())
      {
        renderer.setVertexAttribArray(outlineProgID, "Texture", 2, currColl.getVBOTexCoords(), scene, "outlinegooch"+primSet);
      }
      ////////////////////////// End kludge
      renderer.setVertexAttribArray(outlineProgID, "Vertex", 3, currColl.getVBOVertices(), scene, "outlinegooch"+primSet);

      gl.viewport(1, -1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(-1, -1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(-1, 1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);

      gl.viewport(1, 1, contextWidth, contextHeight);
      gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
    }

    // restore normal backface culling
    gl.cullFace(gl.BACK);
    gl.viewport(0, 0, contextWidth, contextHeight);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.0, 0.0);
  }

  gl.useProgram(programObjID);

  // render all the collation elements. Every collation element in an object will
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    var dummyAttribLoc = scene.curContextCache.attributes["gooch"+coll+"dummyAttrib"];
    if(dummyAttribLoc ==undefined ) {
      dummyAttribLoc = gl.getAttribLocation(programObjID, "dummyAttrib");
      scene.curContextCache.attributes["gooch"+coll+"dummyAttrib"] = dummyAttribLoc;
    }
    
    if (dummyAttribLoc !== -1 && currColl.getNormals())
    {
      renderer.setVertexAttribArray(programObjID, "dummyAttrib", 3, currColl.getVBONormals(), scene, "gooch"+coll);
    }

    var normalAttribLoc = scene.curContextCache.attributes["gooch"+coll+"Normal"];
    if(normalAttribLoc ==undefined ) {
      normalAttribLoc = gl.getAttribLocation(programObjID, "Normal");
      scene.curContextCache.attributes["gooch"+coll+"Normal"] = normalAttribLoc;
    }
    
    // if the object acutally has normals and the normal attribute was found
    //
    if (normalAttribLoc !== -1 && currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(programObjID, "normalMatrix", NormalMatrix, scene, "gooch"+coll);

      renderer.setVertexAttribArray(programObjID, "Normal", 3, currColl.getVBONormals(), scene, "gooch"+coll);
    }
    else
    {
      gl.disableVertexAttribArray(normalAttribLoc);
    }

    renderer.setUniformf(programObjID, "warmColor", effect.getParameter("warmColor"), scene, "gooch"+coll);
    renderer.setUniformf(programObjID, "coolColor", effect.getParameter("coolColor"), scene, "gooch"+coll);
    renderer.setUniformf(programObjID, "surfaceColor", effect.getParameter("surfaceColor"), scene, "gooch"+coll);
    renderer.setVertexAttribArray(programObjID, "Vertex", 3, currColl.getVBOVertices(), scene, "gooch"+coll);
    gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}