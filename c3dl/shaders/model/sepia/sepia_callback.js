/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 */
c3dl.sepia_callback = function (renderingObj, scene)
{
  var progObjID = renderingObj.getProgramObjectID();
  var renderer = renderingObj.getRenderer();
  var geometry = renderingObj.getGeometry();
  var gl = renderingObj.getContext();
  var effect = geometry.getEffect();

  gl.useProgram(progObjID);
  renderer.setUniformf(progObjID, "color", effect.getParameter("color"), scene, "sepia");

  var modelViewMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.PROJECTION);
  var projectionMatrix = c3dl.peekMatrix();
  c3dl.matrixMode(c3dl.MODELVIEW);

  // create a ModelViewProjection matrix.  By doing this, we can multiply
  // 3 matrices together once per model instead of once per vertex
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix);
  renderer.setUniformMatrix(progObjID, "modelViewMatrix", modelViewMatrix, scene, "sepia");
  renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix, scene, "sepia");

  // render all the collation elements. Every collation element in an object will 
  // have the same tranformation
  for (var coll = 0; coll < geometry.getPrimitiveSets().length; coll++)
  {
    var currColl = geometry.getPrimitiveSets()[coll];

    // MATERIAL
    var mat = currColl.getMaterial();

    if (mat)
    {
      // every primitive collection can have a material associated with it.
      // currColl.material.getEmission()

      renderer.setUniformi(progObjID, "usingMaterial", false, scene, "sepia"+coll);
    }
    else
    {
      renderer.setUniformi(progObjID, "usingMaterial", false, scene, "sepia"+coll);
    }

    // NORMAL
    var normalAttribLoc = scene.curContextCache.attributes["sepia"+coll+"Normal"];
    if (normalAttribLoc == undefined) {
      normalAttribLoc = gl.getAttribLocation(progObjID, "Normal");
      scene.curContextCache.attributes["sepia"+coll+"Normal"] = normalAttribLoc;
    }
    
    // if the object acutally has normals and the normal attribute was found
    //			
    if (currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      NormalMatrix = c3dl.transposeMatrix(NormalMatrix);
      renderer.setUniformMatrix(progObjID, "normalMatrix", NormalMatrix, scene, "sepia"+coll);
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals(), scene, "sepia"+coll);
    }
    else
    {
      gl.disableVertexAttribArray(normalAttribLoc);
    }

    // TEXTURE
    var usingTexture = false;

    var texAttribLoc = scene.curContextCache.attributes["sepia"+coll+"Texture"];
    if (texAttribLoc == undefined) {
      texAttribLoc = gl.getAttribLocation(progObjID, "Texture");
      scene.curContextCache.attributes["sepia"+coll+"Texture"] = texAttribLoc;
    }
    
    //
    var texID = renderer.getTextureID(currColl.getTexture(), scene, "sepia"+coll);

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && currColl.getTexture())
    {
      renderer.addTexture(currColl.getTexture());
    }

    // The following must be fixed: If a collada object was specified as having
    // a texture, but the texture file isn't found, the object will be textured.
    // However, this following condition will run, because the object 'thinks'
    // it has a texture.  the result is the object will not get lit and will
    // appear completely black.  We need to insert another condition which
    // states if the texture is actually present, this should run...
    if (texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1)
    {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texID);
      renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords(), scene, "sepia"+coll);
      usingTexture = true;
    }
    else
    {
      //glCanvas3D.activeTexture(gl.TEXTURE0);
      gl.disableVertexAttribArray(texAttribLoc);
      //gl.bindTexture(gl.TEXTURE_2D,-1);
    }

    // tell the fragment shader if we are using textures or not
    renderer.setUniformi(progObjID, "usingTexture", usingTexture, scene, "sepia");

    // Vertices
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices(), scene, "sepia"+coll);
    gl.drawArrays(renderer.getFillMode(), 0, currColl.getVertices().length / 3);
  }
}