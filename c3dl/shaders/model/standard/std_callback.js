/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/
var isDone = false;
/**
 @private
 */
c3dl.std_callback = function (renderingObj, scene)
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
  var modelViewProjMatrix = c3dl.multiplyMatrixByMatrix(projectionMatrix, modelViewMatrix, c3dl.mat1);
  
  renderer.setUniformMatrix(progObjID, "modelViewMatrix", modelViewMatrix, scene, "std");
  renderer.setUniformMatrix(progObjID, "modelViewProjMatrix", modelViewProjMatrix, scene, "std");

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
      renderer.setUniformf(progObjID, "material.emission", mat.emission, scene, "std");
      renderer.setUniformf(progObjID, "material.ambient", mat.ambient, scene, "std");
      renderer.setUniformf(progObjID, "material.diffuse", mat.diffuse, scene, "std");
      renderer.setUniformf(progObjID, "material.specular", mat.specular, scene, "std");
      renderer.setUniformf(progObjID, "material.shininess", mat.shininess, scene, "std");
      renderer.setUniformi(progObjID, "usingMaterial", true, scene, "std");
    }
    else
    {
      renderer.setUniformi(progObjID, "usingMaterial", false, scene, "std");
    }

    // NORMAL 
    var normalAttribLoc = scene.curContextCache.attributes["std"+"Normal"];
    if(normalAttribLoc ==undefined ) {
      normalAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Normal");
      scene.curContextCache.attributes["std"+"Normal"] = normalAttribLoc;
    }
    // if the object acutally has normals and the normal attribute was found
    //			
    if (normalAttribLoc != -1 && currColl.getNormals())
    {
      // the top matrix is the modelview matrix.
      var NormalMatrix = c3dl.inverseMatrix(modelViewMatrix);
      c3dl.transposeMatrix(NormalMatrix, NormalMatrix);
      renderer.setUniformMatrix(progObjID, "normalMatrix", NormalMatrix, scene, "std");
      renderer.setVertexAttribArray(progObjID, "Normal", 3, currColl.getVBONormals(), scene, "std");
    }
    else
    {
      glCanvas3D.disableVertexAttribArray(normalAttribLoc);
    }

    // TEXTURE
    var usingTexture = false;
    var texAttribLoc = scene.curContextCache.attributes["std"+"Texture"];
    if(texAttribLoc ==undefined) {
      texAttribLoc = glCanvas3D.getAttribLocation(progObjID, "Texture");
      scene.curContextCache.attributes["std"+"Texture"] = texAttribLoc;
    }
    var texID = renderer.texManager.getID(currColl.getTexture());

    // if the texture isn't loaded, but this collation element has one, 
    // queue one up
    if (texID == -1 && currColl.getTexture())
    {
      if (typeof currColl.getTexture() !== "string") {
        renderer.texManager.addTextureFromCanvas2D(currColl.getTexture())
      }
      else {
          renderer.texManager.addTexture(currColl.getTexture());
      }
    }


    // The following must be fixed: If a collada object was specified as having
    // a texture, but the texture file isn't found, the object will be textured.
    // However, this following condition will run, because the object 'thinks'
    // it has a texture.  the result is the object will not get lit and will
    // appear completely black.  We need to insert another condition which
    // states if the texture is actually present, this should run...
    if (texID != -1 && currColl.getTexture() && currColl.getTexCoords() && texAttribLoc != -1)
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D, texID);
      renderer.setVertexAttribArray(progObjID, "Texture", 2, currColl.getVBOTexCoords(), scene, "std");
      usingTexture = true;
    }
    else
    {
      glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);
      glCanvas3D.disableVertexAttribArray(texAttribLoc);
      //glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,-1);
    }

    // tell the fragment shader if we are using textures or not
    renderer.setUniformi(progObjID, "usingTexture", usingTexture, scene, "std");
    renderer.setUniformi(progObjID, "lightingOn", true, scene, "std");

    // VERTICES
    renderer.setVertexAttribArray(progObjID, "Vertex", 3, currColl.getVBOVertices(), scene, "std");
    if (renderer.getFillMode() === c3dl.FILL) {
      if (currColl.fillType === "TRIANGLE_STRIP") {
        glCanvas3D.drawArrays(glCanvas3D.TRIANGLE_STRIP, 0, currColl.getVertices().length / 3);
      }
      else if (currColl.fillType === "TRIANGLE_FAN") {
        glCanvas3D.drawArrays(glCanvas3D.TRIANGLE_FAN, 0, currColl.getVertices().length / 3);
      }
      else {
        glCanvas3D.drawArrays(glCanvas3D.TRIANGLES, 0, currColl.getVertices().length / 3);
      }
    }
    else {
      glCanvas3D.drawArrays(c3dl.WIRE_FRAME, 0, currColl.getVertices().length / 3);
    }
    glCanvas3D.enable(glCanvas3D.POLYGON_OFFSET_FILL);
  }
}

