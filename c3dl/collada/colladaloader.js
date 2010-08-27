/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 
 class ColladaLoader is used by the ModelManager to load .DAE (COLLADA) files.
 */
c3dl.ColladaLoader = function ()
{
  var XHR_STATE_COMPLETED = 4;
  var xmlhttp = null;
  this.done = false;
  this.name = "";
  this.rootNode = new c3dl.SceneNode();

  /**
   @private
   Opens the DAE file, reads the vertex, normal and uv data and stores 
   all the data in 'expanded' form into members.
   
   @param {String} relativePath
   @param {c3dl.SceneNode} rootNode
   */
  this.load = function (relativePath, rootNode)
  {
    //
    this.rootNode = rootNode;

    xmlhttp = new XMLHttpRequest();

    //
    xmlhttp.parent = this;

    // call the parse function when XMLHttpRequest is ready.
    xmlhttp.callbackFunc = this.parse;
    xmlhttp.open("GET", relativePath, true);
    xmlhttp.overrideMimeType('text/xml');

    // this may throw an exception if the file isn't found, so 
    // catch the exception and give the user a helpful warning message.
    try
    {
      // send the request
      xmlhttp.send(null);
    }
    catch (err)
    {
      c3dl.debug.logWarning("Could not find file '" + relativePath + "'. Check the path.");
    }

    /**
     @private
     */
    xmlhttp.onreadystatechange = function ()
    {
      // when the state has changed to being finished, 
      if (xmlhttp.readyState == XHR_STATE_COMPLETED)
      {
        // this line may not be totally nnecessary.
        if (xmlhttp.responseXML)
        {
          xmlhttp.responseXML.colladaPath = relativePath;

          // we can now parse by calling the callback which 
          // was set the the parse function.
          this.callbackFunc(xmlhttp.responseXML);
        }
      }
    }
  }


  /**
   @private
   
   Parse a node from the DAE file.  The part of the DAE file
   we are interested with is the scenegraph which is a hierarchical
   structure of nodes.  Nodes therefore can contain other nodes, thus
   we use a recursive function to parse each one.
   
   // clarify nodes in sg nodes in _DOM_
   @param {xmlDocument} xmlObject The DAE DOM.
   @param {} node The node element to parse. the DOM
   @param {c3dl.SceneNode} sgNode The SceneGraph node, not part of the XML DOM.
   */
  this.parseNodeRecursive = function (xmlObject, node, sgNode)
  {
    // set this node's transform
    var translateTag = c3dl.ColladaLoader.getChildNodesByNodeName(node, "translate");

    // node may not have one, so check first
    if (translateTag)
    {
      // string representation of data between <translate> tags.
      var floatValues = c3dl.ColladaLoader.stringsToFloats(translateTag[0].childNodes[0].nodeValue, ' ');

      if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
      {
        var temp = floatValues[1];
        floatValues[1] = floatValues[2];
        floatValues[2] = -temp;
      }
      else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
      {
        var temp = floatValues[0];
        floatValues[0] = -floatValues[1];
        floatValues[1] = temp;
      }
      sgNode.translate(floatValues);
    }

    // rotations
    var rotationTags = c3dl.ColladaLoader.getChildNodesByNodeName(node, "rotate");

    if (rotationTags)
    {
      // example
      // <rotate sid="rotateZ">0 0 1 15</rotate>
      // <rotate sid="rotateY">0 1 0 0</rotate>
      // <rotate sid="rotateX">1 0 0 0</rotate>
      for (var i = 0, len = rotationTags.length; i < len; i++)
      {
        var floatValues = c3dl.ColladaLoader.stringsToFloats(rotationTags[i].childNodes[0].nodeValue, ' ');

        var vec = [floatValues[0], floatValues[1], floatValues[2]];

        if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
        {
          var temp = vec[1];
          vec[1] = vec[2];
          vec[2] = -temp;
        }
        else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
        {
          var temp = vec[0];
          vec[0] = -vec[1];
          vec[1] = temp;
        }

        var angle = c3dl.degreesToRadians(floatValues[3]);

        sgNode.rotateOnAxis(vec, angle);
      }
    }

    // <scale> tag
    var scaleTag = c3dl.ColladaLoader.getChildNodesByNodeName(node, "scale");
    if (scaleTag)
    {
      var floatValues = c3dl.ColladaLoader.stringsToFloats(scaleTag[0].childNodes[0].nodeValue, ' ');

      if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
      {
        var temp = floatValues[1];
        floatValues[1] = floatValues[2];
        floatValues[2] = temp;
      }
      if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
      {
        var temp = floatValues[0];
        floatValues[0] = floatValues[1];
        floatValues[1] = temp;
      }

      sgNode.scale(floatValues);
    }

    // <matrix> tag specifies the matrix of the node instead of
    // a scale, translate and rotate.  
    //
    //  The set of 16 numbers can have values with leading or trailing spaces, so we have to 
    // 
    var matrixTag = c3dl.ColladaLoader.getChildNodesByNodeName(node, "matrix");
    if (matrixTag)
    {
      var mat = c3dl.ColladaLoader.stringsToFloats(matrixTag[0].childNodes[0].nodeValue, ' ');

      // If Z-axis is up, any rotations on Y and Z need to be flipped.
      if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
      {
        // swap y, z translation
        var temp = mat[7];
        mat[7] = mat[11];
        mat[11] = -temp;

        temp = mat[1];
        mat[1] = mat[2];
        mat[2] = temp;

        temp = mat[4];
        mat[4] = mat[8];
        mat[8] = temp;

        temp = mat[5];
        mat[5] = mat[10];
        mat[10] = temp;
      }

      // If X-axis is up, any rotations on X and Y needs to be flipped.
      if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
      {
        // swap x, y translation        
        var temp = mat[3];
        mat[3] = -mat[7];
        mat[7] = temp;

        temp = mat[0];
        mat[0] = mat[5];
        mat[5] = temp;

        temp = mat[2];
        mat[2] = mat[6];
        mat[6] = temp;

        temp = mat[8];
        mat[8] = mat[9];
        mat[9] = temp;
      }
      sgNode.setTransform(c3dl.transposeMatrix(mat));
    }

    // At this point, this node's child nodes have been parsed or it
    // did not contain subnodes.
    // get the geometryNodes of this node.
    var geometries = c3dl.ColladaLoader.getChildNodesByNodeName(node, "instance_geometry");

    // base case: we found a geometry leaf node, now instantiate it.
    if (geometries)
    {
      // a node may contain many geometryNodes, so we have to create each one.
      for (var currGeo = 0, len = geometries.length; currGeo < len; currGeo++)
      {
        // the url references a <geometry> element within the <library_geometry>
        var url = geometries[currGeo].getAttribute("url").split('#')[1];

        // A separate function exists to actually create the geometry which can
        // be pretty messy going through the DOM and constructing the geometry.
        sgNode.addChild(this.instantiateGeometry(xmlObject, url, geometries[currGeo]));
      }
    }

    //
    // <instance_node> appears after <instance_geometry>
    //
    var instance_nodes = c3dl.ColladaLoader.getChildNodesByNodeName(node, "instance_node");
    if (instance_nodes)
    {
      // a <node> can contain 0..N <instance_node> so iterate over each one
      for (var currNode = 0, len = instance_nodes.length; currNode < len; currNode++)
      {
        // remove the '#' from the url
        var url = instance_nodes[currNode].getAttribute("url").split('#')[1];
        sgNode.addChild(this.instantiateNode(xmlObject, url));
      }
    }


    // get the DIRECT child nodes of this node.  We can't use
    // getElementsByTagName since its recursive and will
    // return this node's grandchildren, we don't want that. 
    var nodes = c3dl.ColladaLoader.getChildNodesByNodeName(node, "node");

    // recursive case: the node has one or many nodes, therefore
    // we have to parse all of its nodes.
    if (nodes)
    {
      // for each of subnodes, call this function.
      for (var i = 0, len = nodes.length; i < len; i++)
      {
        var scenenode = new c3dl.SceneNode();
        scenenode.setName(nodes[i].getAttribute("name"));
        sgNode.addChild(scenenode);

        // call this function for each of the nodes found.
        this.parseNodeRecursive(xmlObject, nodes[i], scenenode);
      }
    }
  }

  /**
   @private
   
   Get the child element of a parent element in the scenario when a schema can 
   have only one of set of children. For example, the technique element in the 
   common profile can have either constant, lambert, phong or blinn child elements
   which are mutually exclusive.
   
   @returns {object Element}
   
   @param {Array} choiceTagNames Array of strings which contain the tags of
   choices an element can have.
   */
  this.getChoice = function (parentTag, choiceTagNames)
  {
    var choice = null;
    var i = 0;

    // use an iterator just in case the file does not conform to the spec
    // and we can just out of the loop
    while (choice == null && i < choiceTagNames.length)
    {
      choice = parentTag.getElementsByTagName(choiceTagNames[i])[0];
      i++;
    }

    return choice;
  }

  /**
   @private
   Parse is responsible for traversing different parts of the xmlObject
   and constructing the geometries from the data provided.
   
   This function is not called directly, it is called once the xml is 
   finished downloading.
   
   @param {xmlDocument} xmlObject
   */
  this.parse = function (xmlObject)
  {
    // since the xmlhttp object is calling this function, any reference
    // to 'this' refers to the xmlhttp object, but we want to access the members in
    // the object that owns this function, the DAELoader instance.  To
    // do this, simply make a reference to the this.parent which was set
    // earlier, now we can access the members we need.
    var loader = this.parent;

    // get the root element of the xml document, to keep the naming short.
    var root = xmlObject.documentElement;

    // load the images listed in the dae file under the
    // library_images into the texture manager.
    var library_images = root.getElementsByTagName("library_images");

    // <collada> may have 0 or many <library_images>
    for (var libraryImagesIter = 0, len = library_images.length; libraryImagesIter < len; libraryImagesIter++)
    {
      // one <library_images> has <images>. cardinality isn't mentioned in the spec.
      var imageElements = library_images[libraryImagesIter].getElementsByTagName("image");

      // 
      for (var imageElementIter = 0, len2 = imageElements.length; imageElementIter < len2; imageElementIter++)
      {
        // an <image> has exactly one <init_from> which have the uri or the
        // texture.
        //	<image id="file2" name="file2" depth="1">
        //		<init_from>./duckCM.tga</init_from>
        //	</image>
        //
        var init_from = imageElements[imageElementIter].getElementsByTagName("init_from")[0];
      }
    }

    // get the up axis so we can orient the object without making
    // the user do it explicitly.
    //
    //
    var upAxisTag = root.getElementsByTagName("up_axis")[0];
    if (upAxisTag)
    {
      xmlObject.upAxis = upAxisTag.childNodes[0].nodeValue;
    }

    // we start at the scene tag. A document instance 
    // can contain zero or 1 <scene> tags, therefore we
    // can address the 0th element.  If the
    // scene tag is not present, this is an error, as 
    // we are concerned with some sort of visual scene.
    // TODO: handle no scene elements.
    var sceneElement = root.getElementsByTagName("scene")[0];

    // A scene element can contain ZERO OR ONE of each of the following 
    // elements:
    // <instance_visual_scene>
    // <instance_physics_scene>
    // again, we are concerned only with visual stuff right now
    // so if the element <instance_visual_scene> is not present, 
    // its another error. the <instance_visual_scene> has an attribute that acts as
    // a foreign key into an element in the library_visual_scenes
    // tag.
    // TODO: handle no <instance_visual_scene> element. This can occur if the
    // user tries to load a 1.3 Collada instance.
    var instanceVisualSceneElem = sceneElement.getElementsByTagName("instance_visual_scene")[0];

    // get the url attribute of the <instance_visual_scene>
    // this will tell us which scene to load. (we will be loading one scene from the 
    // library of scenes).
    // this has a # in front of it so we have to remove it.
    var visualSceneToLoad = instanceVisualSceneElem.getAttribute("url").split('#')[1];

    // a collada document has ZERO OR MANY <library_visual_scenes>
    // which in turn have ONE OR MANY <visual_scene>'s.
    // a <visual_scene> is the base of a scenegraph, which is what we 
    // want.  Note that even if <library_visual_scenes> has
    // more than one <visual_scene>'s, only one will be loaded.
    // The one to load is the the value found earlier in the 
    // <instance_visual_scene>'s url attribute.
    // so first, go the the collada's/root's <library_visual_scenes>
    // TODO: can't access the first node since there may be many library_visual_scenes,
    // we have to iterate over the libraries until we find the visualScene we want.
    var libraryVisualScenes = root.getElementsByTagName("library_visual_scenes")[0];

    // added 'List' to avoid confusion with 'visualScene', which is the
    // scene we will load.
    // This is the list of visual scenes.  Only one of which we will actually load.
    var visualSceneList = libraryVisualScenes.getElementsByTagName("visual_scene");

    // Find the <visual_scene> element which we want, buy
    // using the 'foreign key' we got from the <instance_visual_scene>.
    var visualScene = null;

    // go over all the visual scenes trying to identify the one we want.
    for (var i = 0, len = visualSceneList.length; i < len; i++)
    {
      if (visualSceneList[i].getAttribute("id") == visualSceneToLoad)
      {
        visualScene = visualSceneList[i];
      }
    }

    // we are at the start of the visual_scene tag, this may have many
    // nodes
    // we now should have the visual_scene to load.
    // A visual scene has ONE OR MANY <node> elements which compose the scenegraph.
    var nodes = c3dl.ColladaLoader.getChildNodesByNodeName(visualScene, "node");

    // there is a change nodes is null if the dae file was edited manually
    // and the nodes were removed. 
    if (nodes)
    {
      // parse each of the 'root' nodes.
      for (var currNode = 0, len = nodes.length; currNode < len; currNode++)
      {
        var scenenode = new c3dl.SceneNode();

        //
        loader.rootNode.addChild(scenenode);
        scenenode.setName(nodes[currNode].getAttribute("name"));

        loader.parseNodeRecursive(xmlObject, nodes[currNode], scenenode);
      }
    }

    // !!!
    c3dl.ColladaQueue.popFront();
    delete xmlObject;
    delete xmlhttp;
  }

  /**
   @private
   
   @param {XMLDocument} xmlObject
   @param {String} target
   */
  this.instantiateMaterial = function (xmlObject, target)
  {
    var tempTexture = null;

    // we now have the material ID which we can look up in the library materials.
    var material = this.findElementInLibrary(xmlObject, "library_materials", "material", target);
    var tempName = target;

    // a <material> has exactly 1 <instance_effect>, so just get the first.
    //
    //<library_materials>
    //	<material id="shine" name="shine">
    //		<instance_effect url="#shine-fx"/>
    //	</material>
    //	<material id="matte" name="matte">
    //		<instance_effect url="#matte-fx"/>
    //	</material>
    //</library_materials>
    var instanceEffect = material.getElementsByTagName("instance_effect")[0];
    var instanceEffectURL = instanceEffect.getAttribute("url").split('#')[1];

    // go to the <library_effects> since we have the <instance_effect>
    // and it points to an entry in the library.
    //
    //
    var effect = this.findElementInLibrary(xmlObject, "library_effects", "effect", instanceEffectURL);

    // An effect has 1..N profiles. Each profile is designed for a specific platform,
    // usage scenario, etc.
    //
    // profile types include:
    // profile_COMMON - used for basic interchange between DCCs.
    // profile_CG - opengl and NVIDIA's Cg shading language.
    // profile_GLSL - opengl & glslang
    // profile_GLES - opengl 1.0 and 1.1
    //
    // Collada book states support for GLES 2.0 and HLSL are in development,
    // has this already been released?
    //
    // Right now we will focus on the fallback, profile_COMMON since it seems to be 
    // the safest profile and will likely be available. This should be understood 
    // by every application. We use it now as a default, later other profiles can 
    // be supported, namely GLSL/GLES.
    var profile_COMMON = effect.getElementsByTagName("profile_COMMON")[0];

    // In each technique in the profile_COMMON profile is one of the  shader 
    // algorithms: blinn, phong, constant or lambert. These shading algorithms
    // are used in DCC tools which do not have adopted a shading language, therefore
    // are using fixed functionality. Blinn shading algorithm is used by most DCC 
    // tools and therefore most common.
    var technique = profile_COMMON.getElementsByTagName("technique")[0];

    // get the texture
    var newparam = profile_COMMON.getElementsByTagName("newparam")[0];

    if (newparam)
    {
      // go to the surface type
      var surface = newparam.getElementsByTagName("surface")[0];

      // get the value between the <init_from> tags
      // the plane would have:
      // <init_from>file1</init_from>
      // it also has a format, but we ignore this for now.
      var init_from = surface.getElementsByTagName("init_from")[0];

      // got the file id.
      var fileID = init_from.childNodes[0].nodeValue;

      // file1 is an id of an image in the <library_images> library
      var texture = this.findElementInLibrary(xmlObject, "library_images", "image", fileID);

      // finally, get the image name
      //<image id="file2" name="file2" depth="1">
      //	<init_from>./duckCM.tga</init_from>
      //</image>
      var textureName = texture.getElementsByTagName("init_from")[0].childNodes[0].nodeValue;

      var resolvedTexture;

      // if the texture is an abosolute path, use it.
      if (c3dl.isPathAbsolute(textureName))
      {
        resolvedTexture = textureName;
      }
      // otherwise, we need to place the path of dae file before the texture.
      else
      {
        resolvedTexture = c3dl.getPathWithoutFilename(xmlObject.colladaPath) + textureName;
      }
      tempTexture = resolvedTexture;
    }

    // get the shading algorithm used.
    // as of right now, we aren't concerned with the algorithm itself, (we use our
    // own custom shading algorithm) but what we want to extract are the properties
    // of the shading method which include diffuse, ambient, specular, etc. components.
    var shadingAlgorithm = this.getChoice(technique, ["blinn", "constant", "phong", "lambert"]);

    var mat = new c3dl.Material();
    //mat.texture = tempTexture;
    mat.setName(tempName);
    mat.setAmbient(this.getColor(shadingAlgorithm, "ambient"));
    mat.setDiffuse(this.getColor(shadingAlgorithm, "diffuse"));
    mat.setEmission(this.getColor(shadingAlgorithm, "emission"));
    mat.setSpecular(this.getColor(shadingAlgorithm, "specular"));
    mat.setShininess(this.getColor(shadingAlgorithm, "shininess"));

    return [mat, tempTexture];
  }

  /**
   @private
   
   The root COLLADA can contain ZERO OR MANY library_geometries node.
   However in our case, since we are importing model data, should
   have at least one library_geometries.  If absent this will cause
   an error.
   
   The library geometries node contains 1 or Many <geometry>
   nodes.
   If library_geometries describes a car,
   there may be several <geometries> which described the chairs,
   seats, body, etc.
   
   @param {XMLDocument} xmlObject
   @param url
   @param instanceGeometryElement
   */
  this.instantiateGeometry = function (xmlObject, url, instanceGeometryElement)
  {
    var root = xmlObject.documentElement;
    var libraryGeometries = root.getElementsByTagName("library_geometries");

    // once not null, we can stop searching.
    var geoToCreate = null;
    var geometry = new c3dl.Geometry();

    // the url provided points to a geometry in a geometry library. We'll need to
    // go through the libraries and find which library it is in.
    // TODO: add breakout when found
    for (var currLib = 0, len = libraryGeometries.length; currLib < len; currLib++)
    {
      var geometries = libraryGeometries[currLib].getElementsByTagName("geometry");
      // for each geometry
      for (var currGeo = 0, len2= geometries.length; currGeo < len2; currGeo++)
      {
        if (geometries[currGeo].getAttribute("id") == url)
        {
          // found it
          geoToCreate = geometries[currGeo];
        }
      }
    }

    var verticesArray = null;
    var vertexStride;

    var normalsArray = null;
    var normalsStride;

    var texCoordsArray = null;
    var texCoordsStride;

    var faces = null;
    var rawFaces;

    // the library geometry will have a <mesh> which will have one or many <triangles>.
    // we have to go over each <triangle> element and construct it.
    // <geometry> contains all the data which describes a geometric object.
    // <geometry> contains <mesh>, which in turn contains collation elements.
    // these collation elements describe parts of the mesh differently either
    // using polygons or lines.
    //
    // a geometry contains only one mesh node, so just get the first index.
    // there are other kinds of meshes a geometry can have, but for now
    // we aren't supporting them (convex_mesh, brep, spline, ...)
    var mesh = geoToCreate.getElementsByTagName("mesh")[0];

    // we'll need to iterate over all the collation elements.
    var collations = [];

    // A mesh is composed of a set of collation elements.
    // Types of collation elements are 
    // <lines>, <linestrips>,
    // <polygons>, <polylist>,
    // <triangles>, <tristrips>, <trifans>
    //
    // polygons can be a set of 3 or more vertices, therefore, we'll need to divide the polygons
    // into triangles since GLES does not support quads or polygon rendering.
    //
    // The library does have means to render lines, but reading this primitive has not been added yet.
    //
    for (var i = 0, len = mesh.childNodes.length; i < len; i++)
    {
      if (mesh.childNodes[i].nodeName == "triangles" || 
          mesh.childNodes[i].nodeName == "polygons" ||
          mesh.childNodes[i].nodeName == "polylist" || 
          mesh.childNodes[i].nodeName == "lines" )
      {
        collations.push(mesh.childNodes[i]);
      }
    }

    // the collation elements have many primitives.
    // <p> element represents a primitive. 
    //
    // currColl = current collation
    for (var currColl = 0, len = collations.length; currColl < len; currColl++)
    {
      // Depending on the type of collation element, the data will be layed out slighly differently.			
      //
      // <triangles> and <polylist> are similar in that they both only have one <p> tag.
      // polylist has an additional <vcount> child element which has a list of integers
      // which states the number of vertices per polygon (which can vary).
      //
      // triangles are always composed of 3 vertices so this element does not require <vcount>
      //
      if (collations[currColl].nodeName == "triangles" || 
          collations[currColl].nodeName == "polylist" ||
          collations[currColl].nodeName == "lines")
      {
        var p = this.getFirstChildByNodeName(collations[currColl], "p");
        new C3DL_FLOAT_ARRAY(rawFaces = this.mergeChildData(p.childNodes).split(" "));
      }

      // <polygon> contains a list of <p>...</p>
      // <p> 0 0 1 1 2 2 3 3 </p>
      // <p> 1 1 2 2 3 3 4 4 </p>
      // <p> ... </p>
      // <polygon> also has an "count" attribute which lists how many of <p></p> it has.
      // each <p> element describes one polygon which can vary in length from others
      //
      else if (collations[currColl].nodeName == "polygons")
      {
        var p_tags = collations[currColl].getElementsByTagName("p");
        var faces = [];
                       
        for (var i = 0; i < p_tags.length; i++)
        {
          // need to get rid of the spaces
          var p_line = p_tags[i].childNodes[0].nodeValue.split(" ");
          for (var j = 0; j < p_line.length; j++)
          {
            faces.push(parseInt(p_line[j]));
          }
        }
        
        rawFaces = new C3DL_FLOAT_ARRAY(faces.length);
        for(var i = 0; i < faces.length; i++){
          rawFaces[i] = faces[i];
        }
      }
      // If this message is ever seen, that means I have to write the case for it.
      else
      {
        c3dl.debug.logError(collations[currColl].nodeName + " collation element is not yet supported");
      }

      // At this point, we finished getting the faces for one collation element, the integers which will index
      // into data steams. Now we move onto getting the input data streams.
      //
      // get the inputs which contain the verts, normals, uvs.
      //
      // A collation element first contains the <input> tags, then <vcount> (in the case of
      // <polylist>) and then <p> tags. The <input> tags point to the raw data streams which 
      // 
      // The <input> tags associate a semantic to a data stream. This explains how the raw data
      // stream will be used for this particular context. <input> has a source attribute which
      // points to a source element which contains the raw data.
      //
      var inputs = collations[currColl].getElementsByTagName("input");

      collationElement = new c3dl.PrimitiveSet();

      // The order of the <input> tags can vary, so we can't rely on how they are arranged
      // in most documents.
      for (var i = 0, len2 = inputs.length; i < len2; i++)
      { /**************/
        /*  VERTICES  */
        /**************/
        if (inputs[i].getAttribute("semantic") == "VERTEX")
        {
          this.vertexOffset = inputs[i].getAttribute("offset");
          // need to remove the leading # from the value
          this.vertexSource = inputs[i].getAttribute("source").split('#')[1];

          var vertices = c3dl.ColladaLoader.getNodeWithAttribute(xmlObject, "vertices", "id", 
            this.vertexSource);

          // get the child
          var input = vertices.getElementsByTagName("input")[0];

          // get the <input>s source				
          var posSource = input.getAttribute("source").split('#')[1];

          // the raw data in a long list of floats, we have to group this so the face indices
          // can index into it.
          var data = this.getData(xmlObject, "source", "id", posSource);
          vertexStride = parseInt(data.stride);
          if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += vertexStride)
            {
              var temp = data.values[vertIter + 1];
              data.values[vertIter + 1] = data.values[vertIter + 2];
              data.values[vertIter + 2] = -temp;
            }
          }
          else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += vertexStride)
            {
              var temp = data.values[vertIter];
              data.values[vertIter] = -data.values[vertIter + 1];
              data.values[vertIter + 1] = temp;
            }
          }
          verticesArray = this.groupScalarsIntoArray(data.values, 3, vertexStride);
        }

        /**************/
        /*   NORMAL   */
        /**************/
        else if (inputs[i].getAttribute("semantic") == "NORMAL")
        {
          this.normalOffset = inputs[i].getAttribute("offset");
          // need to remove the leading # from the value
          this.normalSource = inputs[i].getAttribute("source").split('#')[1];
          var data = this.getData(xmlObject, "source", "id", this.normalSource);
          normalsStride = parseInt(data.stride);
          // length * stride instead of literal?
          if (xmlObject.upAxis && xmlObject.upAxis == "Z_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += normalsStride)
            {
              var temp = data.values[vertIter + 1];
              data.values[vertIter + 1] = data.values[vertIter + 2];
              data.values[vertIter + 2] = -temp;
            }
          }
          else if (xmlObject.upAxis && xmlObject.upAxis == "X_UP")
          {
            for (var vertIter = 0, len3 = data.values.length; vertIter < len3; vertIter += normalsStride)
            {		
              var temp = data.values[vertIter];
              data.values[vertIter] = -data.values[vertIter + 1];
              data.values[vertIter + 1] = temp;
            }
          }
          normalsArray = this.groupScalarsIntoArray(data.values, 3, normalsStride);
        }

        /**************/
        /*  TEXCOORD  */
        /**************/
        else if (inputs[i].getAttribute("semantic") == "TEXCOORD")
        {
          this.texCoordOffset = inputs[i].getAttribute("offset");
          // need to remove the leading # from the value
          var uvSource = inputs[i].getAttribute("source").split('#')[1];
          var data = this.getData(xmlObject, "source", "id", uvSource);
          texCoordsStride = parseInt(data.stride);

          // WebGL expects the bottom left corner of the
          // texture in the top left, so we need to flip the texture coordinates
          for (var currUV = 1, len3 = data.values.length; currUV < len3; currUV += texCoordsStride)
          {
            data.values[currUV] = 1 - data.values[currUV];
          }

          // we only want 2 values stored, but we may have to stride either 2 or
          // 3 depending if a zero was added
          // 1.0 1.0 0.0
          //         ^ don't need this.
          texCoordsArray = this.groupScalarsIntoArray(data.values, 2, texCoordsStride);
        }
      }


      // We now have the faces for a collation element and its input data streams,
      // however if the collation element is a <polylist> or <polygon>, we'll need to
      // re-arrange some of the faces since WebGL does not support quads.
      //  The next two conditionals handle these two cases.

      // <polylist> contains a list of polygons, each which can contains a different number 
      // of vertices (one poly has 3 another has 5).  Since we can't render polygons or even
      // quads in GLES, the polygons need to be broken down into triangles. Note, it is assumed
      // only simple convex polygons are used. (no intersections are present and no polygons are
      // concave). If there are intersections or the polygons are concave, they will be represented
      // incorrectly.
      if (collations[currColl].nodeName == "polylist")
      {
        rawFaces = this.splitPolylist(collations[currColl], inputs.length, rawFaces);
      }
      // before we group the individual values in the faces array into
      // arrays so we can easily address values in the arrays for vertices,
      // textures, etc, we have to convert the quads into triangles since
      // WebGL does not support the QUADS primitive mode.
      else if (collations[currColl].nodeName == "polygons")
      {
        // example looks like this:
        // 0,0,1,1,2,2,3,3,4,4,....
        // here is a quad and collada states its winding
        // order is counter clockwise, so our goal
        // to convert it to:
        // 0,0, 1,1, 3,3 3,3 1,1 2,2
        // which is 2 triangles.
        // first thing is to seperate the individual numbers into 'parts'
        // 0,0 is one part,  2,2 is another part.  If there are more
        // inputs, we have to account for that and our parts will be
        // larger
        var partSize = inputs.length;

        // make a new list which uses triangles and which will overrite the quads list.
        var trianglesList = [];

        // knowing the partSize, we can use it as a stride to create a new face list
        // count is an attribute of polygons which lists how many primitives the
        // polygon has. we can use this data to find out how many times we have to
        // change the parts.
        for (var currPrim = 0, count = collations[currColl].getAttribute("count"); currPrim < count; currPrim++)
        {
          var partsArray = [];

          // make an array of array so we can easily index parts
          // use four since a polygon primitive is defined as having 4 points
          for (var currPart = 0; currPart < 4; currPart++)
          {
            var part = [];
            for (currScalar = 0, len2 = inputs.length; currScalar < len2; currScalar++)
            {
              part.push(rawFaces[(currPrim * inputs.length * 4) + (currPart * partSize) + currScalar]);
            }
            partsArray.push(part);
          }

          // need to push on the RAW values, don't push on arrays.
          // TODO: write a function for this.
          for (var s = 0, len2 = partsArray[0].length; s < len2; s++)
          {
            trianglesList.push(partsArray[0][s]);
          }
          for (var s = 0, len2 = partsArray[1].length; s < len2; s++)
          {
            trianglesList.push(partsArray[1][s]);
          }
          for (var s = 0, len2 = partsArray[3].length; s < len2; s++)
          {
            trianglesList.push(partsArray[3][s]);
          }
          for (var s = 0, len2 = partsArray[3].length; s < len2; s++)
          {
            trianglesList.push(partsArray[3][s]);
          }
          for (var s = 0, len2 = partsArray[1].length; s < len2; s++)
          {
            trianglesList.push(partsArray[1][s]);
          }
          for (var s = 0, len2 = partsArray[2].length; s < len2; s++)
          {
            trianglesList.push(partsArray[2][s]);
          }
        }
        // now we can overrite what rawFaces had in it
        rawFaces = new C3DL_FLOAT_ARRAY(trianglesList);
      } // if polygons
      // we don't need a case for triangles since
      // now that we know how many inputs there were, we can group the faces.
      faces = this.groupScalarsIntoArray(rawFaces, inputs.length, inputs.length,collations[currColl].nodeName);

      // each primitive collation element can have a material name. this name matches to the
      // <instance_material>'s symbol attribute value.					
      collationElement.tempMaterial = collations[currColl].getAttribute("material");
	    if (collations[currColl].nodeName !== "lines") {
        collationElement.init(
          this.expandFaces(faces, verticesArray, this.vertexOffset, vertexStride), 
          this.expandFaces(faces, normalsArray, this.normalOffset, normalsStride), 
          this.expandFaces(faces, texCoordsArray, this.texCoordOffset, 2)
        );
	  }
	  else {
	    collationElement.initLine(verticesArray, faces , collations[currColl].nodeName);
	  }
      geometry.addPrimitiveSet(collationElement);
    } // end iterating over collations

    // get the texture for the geometry
    // go back to the instance_geometry
    // <instance_geometry> has either 0 or 1 <bind_material>, so just get the first if it exsits.
    var bind_material = instanceGeometryElement.getElementsByTagName("bind_material")[0];
    if (bind_material)
    {
      // <bind_material> has exactly 1 <technique_common>, so only get the first.
      var technique_common = bind_material.getElementsByTagName("technique_common")[0];

      // technique_common within instance geometry may have many materials.
      var instance_materials = technique_common.getElementsByTagName("instance_material");

      // iterate over all the <instance_material>'s <technique_common> has.
      for (var im = 0, len2 = instance_materials.length; im < len2; im++)
      {
        // target is the target material to instantiate
        var target = instance_materials[im].getAttribute("target").split('#')[1];

        // symbol links to the primitive collation's material attribute.
        var symbol = instance_materials[im].getAttribute("symbol");

        // we now have the material ID which we can look up in the library materials.
        var material = this.findElementInLibrary(xmlObject, "library_materials", "material", target);

        //
        var matAndTex = this.instantiateMaterial(xmlObject, target);
        var instanceMaterial = matAndTex[0];
        var tex = matAndTex[1];

        var GeoCollations = geometry.getPrimitiveSets();

        // The material was instantiated and now we have to iterate over the collations
        // and find the collation which has a material which matches the material name.
        for (var ic = 0, len = GeoCollations.length; ic < len; ic++)
        {
          if (GeoCollations[ic].tempMaterial == symbol)
          {
            GeoCollations[ic].setMaterial(instanceMaterial);
            GeoCollations[ic].setTexture(tex);
          }
        }
      } // instance_materials loop
    } // bind_material conditional
    return geometry;
  }

  /**
   @private
   @param {XMLDocument} xmlObject
   @param {String} url
   
   @returns {c3dl.SceneNode}
   */
  this.instantiateNode = function (xmlObject, url)
  {
    var root = xmlObject.documentElement;
    var libraryNodes = root.getElementsByTagName("library_nodes");

    // domNode
    var nodeToCreate = null;

    // <collada> may have many <library_node>. We'll need to go through each to find
    // the node with the name we are looking for.
    for (var currLib = 0, len = libraryNodes.length; currLib < len /*&& nodeToCreate == null*/ ; currLib++)
    {
      // get all the nodes in this library.
      var nodes = libraryNodes[currLib].getElementsByTagName("node");

      // find the node in the list.
      for (var currNode = 0, len2 = nodes.length; currNode < len2 /*&& nodeToCreate == null*/ ; currNode++)
      {
        if (nodes[currNode].getAttribute("id") == url)
        {
          // found it
          nodeToCreate = nodes[currNode];
        }
      }
    }

    var inode = new c3dl.SceneNode();
    inode.setName(nodeToCreate.getAttribute("name"));

    this.parseNodeRecursive(xmlObject, nodeToCreate, inode);

    return inode;
  }

  /**
   @private
   This function takes a list of scalar values and 
   groups them into elements inside an array.  This 
   must be done since in the DAE file, the values are
   stored one after another in a linear format. Since
   the triangles/faces use indices to access these scalars,
   we have to group them together so indexing will work 
   properly.
   
   @param {Array} rawScalarValues
   @param {int} numComponentsPerElement
   @param {int} stride
   
   @returns {Array}
   */
  this.groupScalarsIntoArray = function (rawScalarValues, numComponentsPerElement, stride)
  {
    // start off with an empty list
    var listOfArrays = [];

    //
    for (var i = 0, len = rawScalarValues.length; i < len; i += stride)
    {
      var element = new C3DL_FLOAT_ARRAY(numComponentsPerElement);
      var counter = 0;
      
      //
      for (var j = i; j < i + numComponentsPerElement; j++)
      {
        element[counter++] = rawScalarValues[j];
      }

      listOfArrays.push(element);
    }

    return listOfArrays;
  }


  /**
   @private
   
   @param {} collation
   @param {int} numInputs
   @param {Array} rawFaces
   */
  this.splitPolylist = function (collation, numInputs, rawFaces)
  {
    // rawFaces = this.splitPolylist(collations[currColl], inputs.length);
    // <vcount> has the count of vertices for each polygon.
    // <vcount> 4 4 4 3 4 5 3 4 .. </vcount>
    var vcountNode = this.getFirstChildByNodeName(collation, "vcount");
    var vcountList = this.mergeChildData(vcountNode.childNodes).split(" ");

    // this counter keeps track of where we are in the vcount list
    // <vcount>4 4 3 4 4 4 5 ... 4 4 3 4</vcount>
    var vcountIndex = 0;

    // 
    var primOffset = 0;

    // since we can only support triangles, we have to make a triangle list
    // and convert any quads to triangles.
    var trianglesList = [];
    //
    var partSize = numInputs;

    // iterate from the 0 to vcount, this is the number of primitives
    // there are in this mesh.  Primitives in a polylist may have
    // more than 4 vertices, we will solve this by making the 
    // triangle fans.
    // Vertices, according to the spec, will be counter clockwise.  Because
    // of this, we should be able to make fans without problems.
    for (var currPrim = 0, count = collation.getAttribute("count"); currPrim < count; currPrim++, vcountIndex++)
    {
      var partsArray = [];
      // the current number in the vcount list may have different values depending, may have 3, 4 or more
      // so we have to iterate for the amount of values in the primitive.
      for (var currPart = 0; currPart < vcountList[vcountIndex]; currPart++)
      {
        var part = [];

        for (currScalar = 0; currScalar < numInputs; currScalar++)
        {
          // first part (primOffset * inputs.length) indexes into the primitive
          // part.  Second part will index into the specific part we want.
          part.push(rawFaces[(primOffset * numInputs) + (currPart * numInputs) + currScalar]);
        }
        partsArray.push(part);
      }
      // set the new value for the primitive offset
      // since the number of vertices vary in a list of primitives,
      // we just keep track how many we have to skip here.
      // 4 3 4 3 3
      // we can't just calculate how many values we have to skip, we acutally
      // have to keep the total count.
      primOffset += parseInt(vcountList[vcountIndex]);

      // the way we will create a triangle fan is by creating a pivot
      // vertex and keep track of the last vertex added.
      // everytime a new vertex is added we will create a triangle from
      // the pivot, the last vertex and the new one.
      // start this as index 1. the first time this main loop runs, 
      // last will actually be the middle vertex, from then on, it 
      // will act as the last one added since before the iteration ends
      // we set last to be the fanIndex
      var last = 1;
      var firstTriangle = true;
      // create a triangle fan
      for (var fanIndex = 0; fanIndex < vcountList[vcountIndex] - 1;)
      {
        // s iterator is for scalar, we are dealing with single values.
        // push on the first 
        for (var s = 0, len = partsArray[0].length; s < len; s++)
        {
          // first
          trianglesList.push(partsArray[0][s]);
        }
        fanIndex++;

        // last
        for (var s = 0, len = partsArray[0].length; s < len; s++)
        {
          trianglesList.push(partsArray[last][s]);
        }

        // if this is the first iteration, increase the fanIndex.
        if (firstTriangle)
        {
          fanIndex++;
          firstTriangle = false;
        }

        for (var s = 0, len = partsArray[0].length; s < len; s++)
        {
          trianglesList.push(partsArray[fanIndex][s]);
        }

        last = fanIndex;
      }
    }
    // overwrite rawFaces with the triangle faces, as if quads never existed.
    //rawFaces = trianglesList;				
    return new C3DL_FLOAT_ARRAY(trianglesList);
  }


  /**
   @private
   @param {XMLDocument} xmlObject
   @param {String} libraryName
   @param {String} elementName
   @param {String} elementAttributeId
   
   @returns
   */
  this.findElementInLibrary = function (xmlObject, libraryName, elementName, elementAttributeId)
  {
    // collada may have many listings of the same library.
    var libraries = xmlObject.getElementsByTagName(libraryName);

    // for all the libraries in the <collada> element
    for (libraryIter = 0, len = libraries.length; libraryIter < len; libraryIter++)
    {
      var elements = libraries[libraryIter].getElementsByTagName(elementName);

      // for all the elements in each library.
      for (elementIter = 0, len2 = elements.length; elementIter < len2; elementIter++)
      {
        // found it
        if (elementAttributeId == elements[elementIter].getAttribute("id"))
        {
          return elements[elementIter];
        }
      }
    }
    // return null if it could not be found.
    return null;
  }


  /**
   @private
   @param {} xmlObject	
   @param {String} nodeName
   @param {String} attributeKey
   @param {String} attributeValue
   
   @return 
   */
  this.getData = function (xmlObject, nodeName, attributeKey, attributeValue)
  {
    var data = new Object();

    // find node that has 'src' value as id
    var nsrc = c3dl.ColladaLoader.getNodeWithAttribute(xmlObject, "source", "id", attributeValue);
    // go to the node's technique common
    var tech_common = nsrc.getElementsByTagName("technique_common")[0];

    // go to its accessor
    var accessor = tech_common.getElementsByTagName("accessor")[0];
    data.stride = accessor.getAttribute("stride");

    // get the source
    var accessorSrc = accessor.getAttribute("source").split("#")[1];

    //
    var float_array = c3dl.ColladaLoader.getNodeWithAttribute(xmlObject, "float_array", "id", accessorSrc);   
    // values in the DAE file are seperated with a space
    // don't use nodeValue since it will be broken up in 4096 chunks
	  data.values = new C3DL_FLOAT_ARRAY(this.mergeChildData(float_array.childNodes).split(" "));
    return data;
  }

  /**
   @private
   @param {Array} faces A 2D array which has indices.  Each index points
   to a set of vertex, normal or texture coordinates.
   
   <pre>
   // faces can look like this:
   [
   [0,0,0] , 
   [1,0,1] , 
   [2,0,2] 
   ]
   // first value in each element is vertex index.
   // second value is normal index.
   // third value is uv index.
   </pre>
   
   @param {Array} array The array to expand. For a cube, the array of vertices
   can look like:
   
   <pre>
   [1.00000,1.00000,-1.00000] , [1.00000,-1.00000,-1.00000] , [-1.00000,-1.00000,-1.00000] 
   </pre>
   
   @param offset Refers to the component we are interested in within an array
   in the faces array.  Since the faces array has indices for verts, normals and texcoords,
   using a different index gets us a index which is a 0 based index into a list of 
   coordinates.
   
   <pre>
   here is a faces array.  If we used offset=2, we would get the following indices:
   [0,0,0] , [1,0,1] , [2,0,2] 
   ^         ^         ^
   </pre>
   
   @param {int} numComponentsToExpand
   */
  this.expandFaces = function (faces, array, offset, numComponentsToExpand)
  {
    // this is a single dimensional array which hold expanded values.
    var expandedArray = new C3DL_FLOAT_ARRAY(faces.length*3);
    var counter = 0;
    // in the nested loop, we divide the instructions into parts to
    // make it easier to read, but don't allocate these varialbes everytime
    // the loop is executed, so declare them here. This speeds up the parser
    // quite a bit.
    var face;
    var coordIndex;
    var coord;
    var floatValue;

    // for all the faces
    //  [0,0,0] ,   [1,0,1] ,   [2,0,2] 
    //  \    /      \    /      \    /  
    //    \/          \/          \/
    // currFace=0   currFace=1    ...
    for (var currFace = 0, len = faces.length; currFace < len; currFace++)
    {
      // have to be scalar, no arrays
      // each element in the faces array is another array. That second array
      // hold components.
      for (var currComp = 0; currComp < numComponentsToExpand; currComp++)
      {
        // go to a particular face:
        // [3, 1, 4]
        face = faces[currFace];

        // we might be dealing with verts, norms or textures, each has a different offset.
        // then go to a particular value inside denoted by the offset.
        // [3, 1, 4]
        //        ^
        // offset = 2 for tex
        // 4 is an index which refers to the 4th set of tex coords.
        // something like:
        // ["1.0", "0.0"] 
        coordIndex = face[offset];

        // coord is a vertex coord, normal or uv coord retrieved from the
        // 'array' array.
        //
        // ["29.4787", "0", "50.5349"] -> array[0]
        // ["29.4787", "0", "50.5349"] -> array[1]
        // ...
        // this is done for each component, for textures, we have 2 components.
        // for normals, we have 3.
        
        if (array){
          coord = array[coordIndex][currComp];
        }
        // insert that value into the 1d array.
        expandedArray[counter++] = coord;
      }
    }
    return expandedArray;
  }

  /**
   @private
   Loading is done once all the nodes in the .DAE file have been created and placed
   into the ModelManager.
   
   @returns {bool} true if loading is done, false otherwise. 
   */
  this.doneLoading = function ()
  {
    return this.done;
  }

  /**
   @private
   
   get data from blinn, phong, lambert node
   
   @param {}
   @param {String} str
   */
  this.getColor = function (node, str)
  {
    // ambient, diffuse, specular, etc.
    var component = node != null ? node.getElementsByTagName(str)[0] : null;

    // if the component has a reference parameter, ignore it for now.
    // that component will not be used in the calculations.
    var returnValue = [0, 0, 0];

    // if the component is present (ambient, diffuse, specular)
    if (component)
    {
      var value = this.getChoice(component, ["color", "float", "texture"]);

      if (value.nodeName == "color")
      {
        returnValue = [];
        for (var currNode = 0, len = value.childNodes.length; currNode < len; currNode++)
        {
          returnValue += value.childNodes[currNode].nodeValue;
        }
        returnValue = returnValue.split(" ");
        returnValue = [parseFloat(returnValue[0]), parseFloat(returnValue[1]), parseFloat(returnValue[2])];
        returnValue = returnValue.slice(0, 3);
      }
      //
      else if (value.nodeName == "float")
      {
        returnValue = parseFloat(value.childNodes[0].nodeValue);
      }
      // 
      else if (value.nodeName == "texture")
      {
        returnValue = [1, 1, 1];
      }
    }

    return returnValue;
  }



  /**
   @private
   When reading data in between tags, 
   
   There tends to be a lot of data between tags such as <float_array>
   <float_array id="Teapot-mesh-positions-array" count="1590">29.4787 0 50.5349 ..... 34.093 </float_array>
   
   We can't just read the node value contents because it is broken up into 4096 byte chunks. So 
   we use this function to merge all the chunks together.
   
   @param {String} childNodes
   
   @returns
   */
  this.mergeChildData = function (childNodes)
  {
    var values = [];
    for (var currNode = 0, len = childNodes.length; currNode < len; currNode++)
    {
      values += childNodes[currNode].nodeValue;
    }

    // there are some 3d authoring tools which place a trailing space after a long set of data.
    // for example:
    //
    // <float_array id="Teapot-mesh-positions-array" count="1590">29.4787 0 50.5349 ..... 34.093 </float_array>
    //
    // the trailing space causes problems as when the string is split, an undefined value
    // is placed at the end of the array.  So we will get rid of any trailing spaces here.
    //
    return values.replace(/\s+$/, '');
  }



  /**
   @private
   Get the first child of type 'nodeName' of a element 'searchNode'.
   
   @param {Object Element} searchNode - the element to search.
   @param {String} nodeName - the node to search for.
   
   @returns 
   */
  this.getFirstChildByNodeName = function (searchNode, nodeName)
  {
    for (var i = 0, len = searchNode.childNodes.length; i < len; i++)
    {
      // found it!
      if (searchNode.childNodes[i].nodeName == nodeName)
      {
        return searchNode.childNodes[i];
      }
    }
    return null;
  }

}


/**
 @private	
 
 static method of collada loader. 
 
 @param {} xmlObject
 @param {String} nodeName
 @param {String} attributeKey
 @param {String} attributeValue
 
 @returns 
 */
c3dl.ColladaLoader.getNodeWithAttribute = function (xmlObject, nodeName, attributeKey, attributeValue)
{
  var nodeFound;

  // go to the root of the XML
  var root = xmlObject.documentElement;

  // get all the tags names 'nodeName'
  var elements = root.getElementsByTagName(nodeName);

  // we might have a few tags, we need to find the one with the id specified
  for (var i = 0, len = elements.length; i < len; i++)
  {
    if (elements[i].getAttribute(attributeKey) == attributeValue)
    {
      nodeFound = elements[i];
    }
  }
  return nodeFound;
}


/**
 @private
 Get the child nodes of searchNode which have the name 'nodeName'.
 This funciton is not recursive.  It only returns the <b>direct</b> children.
 
 @param {String} searchNode - the node to search.
 @param {String} nodeName - the nodes to search for.
 
 @returns {Array} array of node elements.
 */
c3dl.ColladaLoader.getChildNodesByNodeName = function (searchNode, nodeName)
{
  var children = [];
  var foundOne = false;

  if (searchNode.childNodes.length > 0)
  {
    for (var i = 0, len = searchNode.childNodes.length; i < len; i++)
    {
      if (searchNode.childNodes[i].nodeName == nodeName)
      {
        children.push(searchNode.childNodes[i]);
        foundOne = true;
      }
    }
  }

  // somehow need to specify if non were found, so 
  // send back a null if that's the case.
  if (foundOne == false)
  {
    children = null;
  }

  return children;
}



/**
 @private
 static method of c3dl.ColladaLoader
 
 Turn a series of strings seperated by 'delimiter' into float values.
 used when we need to convert <translate>0.0 0.0 0.0</translate> into float
 values.
 
 @param {String} numbers A string which contains numbers such as "1.0 0.0 1.0 0.0       0.0 1.0 ..." note the spaces.
 @param {String} delimeter A string which is being used to separate the numbers.
 */
c3dl.ColladaLoader.stringsToFloats = function (numbers, delimeter)
{
  var floatValues = [];

  // Get rid of leading and trailing spaces so they don't interfere with out split().
  // remove leading whitespace
  var trimmedNumbers = numbers.replace(/^\s+/, '');

  // remove trailing whitespace
  trimmedNumbers = trimmedNumbers.replace(/\s+$/, '');

  // remove superfluous whitespace between numbers
  // find one or more instances of whitespace and replace with a single space.
  trimmedNumbers = trimmedNumbers.replace(/\s+/g, ' ');

  // split each number into an element of an array, but they are still
  // strings, so convert them to float.
  var strValues = trimmedNumbers.split(delimeter);

  for (var i = 0, len = strValues.length; i < len; i++)
  {
    floatValues.push(parseFloat(strValues[i]));
  }

  return floatValues;
}