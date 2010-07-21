/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 @class ColladaManager prevents the same collada file from being loaded into 
 memory more than once.
 */
c3dl.ColladaManager =
{
};

// parallel arrays. keys have the filePaths, values have the c3dl.SceneNode root
// nodes.
c3dl.ColladaManager.keys = [];
c3dl.ColladaManager.values = [];

/**
 @private
 Get the scenegraph's root for the filePath.
 
 @param {String} filePath 
 
 @returns c3dl.SceneNode or null if the file has not finished loading.
 
 c3dl.ColladaManager.getSceneGraphRoot = function(filePath)
 {
 var index = c3dl.ColladaManager.getIndex(filePath);
 
 // if it's in the table
 if(index != -1)
 {
 // The loader will set the root once it has finished parsing.
 // Initially when we create the sceneGraph, the root is null
 // indicating the graph hasn't been created.
 return c3dl.ColladaManager.values[index];
 }
 else
 {
 return null;
 }
 }*/


/**
 @private
 Load a collada file at 'filePath'. This method will check if
 the model is already loaded, thus preventing the file being
 loaded twice.
 */
c3dl.ColladaManager.loadFile = function (filePath)
{
  // prevent loading the file twice
  if (c3dl.ColladaManager.isFileLoaded(filePath) == false)
  {
    // create a node which the loader will assign other nodes.
    var rootNode = new c3dl.SceneNode();

    // give the loader a sceneGraph which it will populate with nodes.
    // We know it has finished once it has set the scenegraph's root.

    var colladaLoader = new c3dl.ColladaLoader();
    colladaLoader.load(filePath, rootNode);
    c3dl.ColladaManager.keys.push(filePath);
    c3dl.ColladaManager.values.push(rootNode);
  }
}

/**
 @private
 Make a copy of the sceneGraph
 
 @param {String} filePath
 */
c3dl.ColladaManager.getSceneGraphCopy = function (filePath)
{
  if (c3dl.ColladaManager.isFileLoaded(filePath))
  {
    var i = c3dl.ColladaManager.getIndex(filePath);

    // get a copy of the scenegraph
    var sg = c3dl.ColladaManager.values[i].getCopy();

    //return ColladaManager.values[i];
    return sg;
  }

  // return null?
}

/**
 @private
 Has the file already been loaded?
 
 @param filePath {string}
 
 @return true if the file has already been loaded, otherwise false.
 */
c3dl.ColladaManager.isFileLoaded = function (filePath)
{
  // if its in the 'table', it will return non-negative one.
  return c3dl.ColladaManager.getIndex(filePath) != -1 ? true : false;
}

/**
 @private
 Get the 0-based index of the filePath.  If we have
 that index, we can reference the values array since
 they are parallel.
 */
c3dl.ColladaManager.getIndex = function (filePath)
{
  var index = -1;

  for (var i = 0, len = c3dl.ColladaManager.values.length; i < len; i++)
  {
    if (filePath == c3dl.ColladaManager.keys[i])
    {
      index = i;
      break;
    }
  }
  return index;
}