/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @private
 @class ModelManager prevents the same model file from being loaded into 
 memory more than once.
 */
c3dl.ModelManager =
{
};

// parallel arrays. keys have the filePaths, values have the c3dl.SceneNode root
// nodes.
c3dl.ModelManager.keys = [];
c3dl.ModelManager.values = [];

/**
 @private
 Load a model file at 'filePath'. This method will check if
 the model is already loaded, thus preventing the file being
 loaded twice.
 
 @param {String} filePath - The path of the model to load, relative to the html page containing the canvas element.
 */
c3dl.ModelManager.loadFile = function (filePath)
{
  // create a node which the loader will assign other nodes.
  var rootNode = new c3dl.SceneNode();
  rootNode.loaded = false;
  rootNode.progress = 0;
  // give the loader a sceneGraph which it will populate with nodes.
  // We know it has finished once it has set the scenegraph's root.

  var modelLoader = new c3dl.ColladaLoader();
  modelLoader.load(filePath, rootNode);
  c3dl.ModelManager.keys.push(filePath);
  c3dl.ModelManager.values.push(rootNode);
}

/**
 Remove a model from the managers list.
 
 @param {String} filePath - The path of the model to remove.
*/
c3dl.ModelManager.deleteFile = function (filePath)
{
  //get the index associated with that file
  var index = c3dl.ModelManager.getIndex(filePath);
  if(index != -1) //if it exists
  {
    //remove it from both arrays
    c3dl.ModelManager.values.splice(index,1);
    c3dl.ModelManager.keys.splice(index,1);
  }
  else //if it does not exist, warn the user they are trying to delete a file that does not exist.
  {
    c3dl.debug.logWarning('Attempting to delete non-existant file ' + filePath + '.');
  }
}

/**
 @private
 Make a copy of the sceneGraph
 
 @param {String} filePath - The path of the model who's scenegraph to copy.
 */
c3dl.ModelManager.getSceneGraphCopy = function (filePath)
{
  if (c3dl.ModelManager.isFileLoaded(filePath))
  {
    var index = c3dl.ModelManager.getIndex(filePath);

    // get a copy of the scenegraph
    var sg = [];
    
    for (var i=0; i < c3dl.ModelManager.values[index].children.length; i++)
    {
      sg.push(c3dl.ModelManager.values[index].children[i].getCopy());
    }

    return sg;
  }
}

/**
 @private
 Has the file already been loaded?
 
 @param filePath {string} - The path of the file to check for.
 
 @return true if the file has already been loaded, otherwise false.
 */
c3dl.ModelManager.isFileLoaded = function (filePath)
{
  return c3dl.ModelManager.values[c3dl.ModelManager.getIndex(filePath)].loaded;
}

/**
 Check how close a particular model is to being loaded.
 
 @param {String} filePath - The path of the file to check.
 
 @returns {int} A value between 0 and 100 corresponding to what percent of the file is loaded.
*/
c3dl.ModelManager.loadProgress = function (filePath)
{
    return c3dl.ModelManager.values[c3dl.ModelManager.getIndex(filePath)].progress;
}

/**
 @private
 Get the 0-based index of the filePath.  If we have
 that index, we can reference the values array since
 they are parallel.
 
 @param {String} filePath - The path of the file to get the index of.
 
 @returns {int} Te index of that file within the manager's arrays, or -1 if it is not present. 
 */
c3dl.ModelManager.getIndex = function (filePath)
{
  var index = -1;

  for (var i = 0, len = c3dl.ModelManager.values.length; i < len; i++)
  {
    if (filePath == c3dl.ModelManager.keys[i])
    {
      index = i;
      break;
    }
  }
  return index;
}
