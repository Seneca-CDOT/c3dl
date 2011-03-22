
var scripts=document.getElementsByTagName("script");var parts=scripts[scripts.length-1].src.split("/");parts.pop();var basePath=parts.join("/");var head=document.getElementsByTagName("head")[0];c3dl_require=function(path)
{document.write('<'+'script');document.write(' language="javascript"');document.write(' type="text/javascript"');document.write(' src="'+basePath+"/"+path+'">');document.write('</'+'script'+'>');}
c3dl_require('c3dlnamespace.js');c3dl_require('constants.js');c3dl_require('effects/effect_docs.js');c3dl_require('debug.js');c3dl_require('renderer/renderer.js');c3dl_require('renderer/rendererwebgl.js');c3dl_require('renderer/programobject.js');c3dl_require('math/mjs.js');c3dl_require('math/mathutils.js');c3dl_require('math/vector.js');c3dl_require('math/matrix.js');c3dl_require('math/quaternion.js');c3dl_require('matrixstack.js');c3dl_require('camera/camera.js');c3dl_require('camera/freecamera.js');c3dl_require('camera/orbitcamera.js');c3dl_require('enclosure/boundingsphere.js');c3dl_require('enclosure/visualboundingsphere.js');c3dl_require('enclosure/boundingbox.js');c3dl_require('actors/actor.js');c3dl_require('actors/primitive.js');c3dl_require('actors/point.js');c3dl_require('actors/line.js');c3dl_require('frustum_culling/frustum.js');c3dl_require('frustum_culling/plane.js');c3dl_require('scene.js');c3dl_require('texture/texture.js');c3dl_require('texture/texturemanager.js');c3dl_require('texture/textureutils.js');c3dl_require('collada/colladamanager.js');c3dl_require('collada/colladaloader.js');c3dl_require('collada/colladaqueue.js');c3dl_require('collada/geometry.js');c3dl_require('collada/primitiveset.js');c3dl_require('light/light.js');c3dl_require('light/positionallight.js');c3dl_require('light/directionallight.js');c3dl_require('light/spotlight.js');c3dl_require('material.js');c3dl_require('collada/collada.js');c3dl_require('scenegraph/scenenode.js');c3dl_require('utilities/utilities.js');c3dl_require('shaders/model/light/light_vs.js');c3dl_require('shaders/model/material/material.js');c3dl_require('shaders/model/standard/model_fs.js');c3dl_require('shaders/model/standard/model_vs.js');c3dl_require('shaders/model/standard/std_callback.js');c3dl_require('shaders/particle_system/psys_vs.js');c3dl_require('shaders/particle_system/psys_fs.js');c3dl_require('shaders/point/point/point_vs.js');c3dl_require('shaders/point/point/point_fs.js');c3dl_require('shaders/point/sphere/point_sphere_vs.js');c3dl_require('shaders/point/sphere/point_sphere_fs.js');c3dl_require('shaders/line/line_vs.js');c3dl_require('shaders/line/line_fs.js');c3dl_require('shaders/bounding_sphere/bounding_sphere_vs.js');c3dl_require('shaders/bounding_sphere/bounding_sphere_fs.js');c3dl_require('shaders/model/greyscale/greyscale_vs.js');c3dl_require('shaders/model/greyscale/greyscale_fs.js');c3dl_require('shaders/model/greyscale/greyscale_callback.js');c3dl_require('shaders/model/sepia/sepia_vs.js');c3dl_require('shaders/model/sepia/sepia_fs.js');c3dl_require('shaders/model/sepia/sepia_callback.js');c3dl_require('shaders/model/cartoon/cartoon_vs.js');c3dl_require('shaders/model/cartoon/cartoon_fs.js');c3dl_require('shaders/model/cartoon/cartoon_callback.js');c3dl_require('shaders/model/gooch/gooch_vs.js');c3dl_require('shaders/model/gooch/gooch_fs.js');c3dl_require('shaders/model/gooch/gooch_callback.js');c3dl_require('shaders/model/solid_color/solid_color_vs.js');c3dl_require('shaders/model/solid_color/solid_color_fs.js');c3dl_require('shaders/model/solid_color/solid_color_callback.js');c3dl_require('effects/effecttemplate.js');c3dl_require('effects/effect.js');c3dl_require('particle_system/particlesystem.js');c3dl_require('particle_system/particle.js');c3dl_require('init.js');c3dl_require('interaction/picking.js');c3dl_require('interaction/pickingresult.js');var c3dl={rendererID:0,getNextRendererID:function()
{return++c3dl.rendererID;},bind:function(func,bindObj)
{return function()
{func.call(bindObj,arguments);};},extend:function(baseObj,extObj)
{for(var i in extObj){if(extObj[i]!=null&&extObj[i]!=undefined){baseObj[i]=extObj[i];}}
return baseObj;},guid:function()
{return new Date().getTime();},inherit:function(parentObject,child)
{child.prototype.__proto__=parentObject.prototype;child.prototype.__parent=parentObject;return child;},_super:function(o,args,funcname)
{if(funcname.length==0)funcname=args.callee.name;var tmpparent=o.__parent;if(o.__parent.prototype.__parent)o.__parent=o.__parent.prototype.__parent;var ret=tmpparent.prototype[funcname].apply(o,args);delete o.__parent;return ret;},_superc:function(o)
{var tmpparent=o.__parent;if(o.__parent.prototype.__parent){o.__parent=o.__parent.prototype.__parent;}
tmpparent.prototype.constructor.apply(o);delete o.__parent;},};c3dl.TOLERANCE=0.00001;c3dl.POINT_MODE_POINT=1;c3dl.POINT_MODE_SPHERE=2;c3dl.DEFAULT_NEAR_CLIPPING_PLANE=0.1;c3dl.DEFAULT_FAR_CLIPPING_PLANE=8000.0;c3dl.DEFAULT_FIELD_OF_VIEW=45.0;c3dl.GLES_CONTEXT_20=2.0;c3dl.MAX_LIGHTS=7;c3dl.ABSTRACT_LIGHT=0;c3dl.DIRECTIONAL_LIGHT=1;c3dl.POSITIONAL_LIGHT=2;c3dl.SPOT_LIGHT=3;c3dl.PROJECTION=1;c3dl.MODELVIEW=2;c3dl.COLLADA=0;c3dl.LINE=1;c3dl.POINT=2;c3dl.PARTICLE_SYSTEM=3;c3dl.DEFAULT_BG_RED=0.4;c3dl.DEFAULT_BG_GREEN=0.4;c3dl.DEFAULT_BG_BLUE=0.6;c3dl.ZERO=0;c3dl.ONE=1;c3dl.SRC_COLOR=0x0300;c3dl.ONE_MINUS_SRC_COLOR=0x0301;c3dl.SRC_ALPHA=0x0302;c3dl.ONE_MINUS_SRC_ALPHA=0x0303;c3dl.DST_ALPHA=0x0304;c3dl.ONE_MINUS_DST_ALPHA=0x0305;c3dl.DST_COLOR=0x0306;c3dl.ONE_MINUS_DST_COLOR=0x0307;c3dl.SRC_ALPHA_SATURATE=0x0308;c3dl.FUNC_ADD=0x8006;c3dl.FUNC_SUBTRACT=0x800A;c3dl.FUNC_REVERSE_SUBTRACT=0x800B;c3dl.SHADER_VAR_NOT_FOUND=-1;c3dl.VERTEX_SHADER="x-vertex";c3dl.FRAGMENT_SHADER="x-fragment";c3dl.WIRE_FRAME=0x0001;c3dl.FILL=0x0004;c3dl.DEBUG_INFO="Info";c3dl.DEBUG_ERROR="Error";c3dl.DEBUG_WARNING="Warning";c3dl.DEBUG_EXCEPTION="Exception";c3dl.PICK_PRECISION_BOUNDING_VOLUME=1;c3dl.PICK_PRECISION_TRIANGLE=2;try{Float32Array;}catch(ex){Uint8Array=WebGLUnsignedByteArray;Float32Array=WebGLFloatArray;}
const C3DL_FLOAT_ARRAY=Float32Array;const C3DL_UINT_ARRAY=Uint8Array;c3dl.debug={BENCHMARK:false,DUMMY:false,DUMP:false,SHARK:false,isVisible:true,numLinesLogged:0,maxLinesToLog:100,isSetUp:false,logDiv:null,isFirebugEnabled:false,getVisible:function()
{return c3dl.debug.isVisible;},setup:function()
{windowWidth=document.body.clientWidth-50;windowHeight=document.body.clientHeight;logWindowWidth=windowWidth;logWindowHeight=200;c3dl.debug.logDiv=document.createElement("div");c3dl.debug.logDiv.style.width=logWindowWidth+"px";c3dl.debug.logDiv.style.position='absolute';c3dl.debug.logDiv.style.top=windowHeight-logWindowHeight;c3dl.debug.logDiv.style.left=5;c3dl.debug.logDiv.style.padding=5;c3dl.debug.logDiv.style.opacity=.8;c3dl.debug.logDiv.style.border='1px solid #000';c3dl.debug.logDiv.id='logdiv';c3dl.debug.logDiv.name='logdiv';document.body.appendChild(c3dl.debug.logDiv);try
{if(console)
{c3dl.debug.isFirebugEnabled=true;}}
catch(err)
{c3dl.debug.isFirebugEnabled=false;}
c3dl.debug.isSetUp=true;},inspect:function(functionName,object)
{var f;f=(object)?object.functionName:window.funcName;object.functionName=function()
{var r=f.call(args);return r;}},setVisible:function(isVisible)
{c3dl.debug.isVisible=isVisible;},doLog:function(str,type,color)
{if(c3dl.debug.getVisible())
{if(c3dl.debug.numLinesLogged==c3dl.debug.maxLinesToLog)
{str="Too many lines to log ("+c3dl.debug.numLinesLogged+"). Logging stopped.";type=c3dl.DEBUG_WARNING;colour="yellow";}
if(c3dl.debug.numLinesLogged>c3dl.debug.maxLinesToLog)
{return;}
if(!c3dl.debug.isSetUp)
{c3dl.debug.setup();}
var currentTime=new Date();var node=document.createElement('p');node.innerHTML=currentTime.getHours()+':'+currentTime.getMinutes()+':'+
currentTime.getSeconds()+' '+type+': '+str;node.style.background=color;c3dl.debug.logDiv.insertBefore(node,c3dl.debug.logDiv.firstChild);if(c3dl.debug.isFirebugEnabled)
{switch(type)
{case c3dl.DEBUG_WARNING:console.warn(str);break;case c3dl.DEBUG_ERROR:console.error(str);break;case c3dl.DEBUG_INFO:console.info(str);break;default:break;}}
c3dl.debug.numLinesLogged++;}},logInfo:function(infoMsg)
{c3dl.debug.doLog(infoMsg,c3dl.DEBUG_INFO,'#CCFFFF');},logWarning:function(warningMsg)
{c3dl.debug.doLog(warningMsg,c3dl.DEBUG_WARNING,'#FFFF00');},logException:function(exceptionMsg)
{c3dl.debug.doLog(exceptionMsg,c3dl.DEBUG_EXCEPTION,'#FF6600');},logError:function(errorMsg)
{c3dl.debug.doLog(errorMsg,c3dl.DEBUG_ERROR,'#FF2222');}}
c3dl.mainCallBacks=[];c3dl.preloadModels=[];c3dl.addProgressBars=function()
{var canvases=document.getElementsByTagName('canvas');for(var i=0,len=canvases.length;i<len;i++)
{var pos=c3dl.getObjectPosition(canvases[i]);var xOffset=pos[0];var yOffset=pos[1];var progressBar=document.createElement("img");progressBar.src=basePath+"/loading.gif";progressBar.style.position='absolute';progressBar.style.left=(canvases[i].width/2)+xOffset-(50);progressBar.style.top=(canvases[i].height/2)+yOffset-(50);progressBar.style.opacity=0.5;progressBar.style.zIndex=100;progressBar.id='c3dl_progress_bar_'+i;document.body.appendChild(progressBar);}}
c3dl.removeProgressBars=function()
{var numProgressBars=document.getElementsByTagName('canvas').length;for(var i=0;i<numProgressBars;i++)
{var progressBarID='c3dl_progress_bar_'+i;var progressBar=document.getElementById(progressBarID);document.body.removeChild(progressBar);}}
c3dl.init=function()
{if(c3dl.preloadModels.length==0)
{for(var i=0,len=c3dl.mainCallBacks.length;i<len;i++)
{var func=c3dl.mainCallBacks[i].f;var tag=c3dl.mainCallBacks[i].t;func(tag);}}
else
{c3dl.addProgressBars();for(var i=0,len=c3dl.preloadModels.length;i<len;i++)
{var preloadColadda=new c3dl.Collada();preloadColadda.init(c3dl.preloadModels[i]);}}}
c3dl.addModel=function(model)
{c3dl.preloadModels.push(model);}
c3dl.addMainCallBack=function(func,tagName)
{var obj={f:func,t:tagName};c3dl.mainCallBacks.push(obj);}
if(document.addEventListener)
{document.addEventListener("DOMContentLoaded",c3dl.init,false);}
c3dl.Material=function()
{this.emission=c3dl.makeVector(0,0,0);this.ambient=c3dl.makeVector(0,0,0);this.diffuse=c3dl.makeVector(0,0,0);this.specular=c3dl.makeVector(0,0,0);this.shininess=0;this.name="unnamed";this.getCopy=function()
{return c3dl.copyObj(this);}
this.getEmission=function()
{return c3dl.copyVector(this.emission);}
this.getAmbient=function()
{return c3dl.copyVector(this.ambient);}
this.getDiffuse=function()
{return c3dl.copyVector(this.diffuse);}
this.getName=function()
{return this.name;}
this.getSpecular=function()
{return c3dl.copyVector(this.specular);}
this.getShininess=function()
{return this.shininess;}
this.setEmission=function(color)
{if(this.assertColor(color))
{this.emission[0]=color[0];this.emission[1]=color[1];this.emission[2]=color[2];}}
this.setAmbient=function(color)
{if(this.assertColor(color))
{this.ambient[0]=color[0];this.ambient[1]=color[1];this.ambient[2]=color[2];}}
this.setDiffuse=function(color)
{if(this.assertColor(color))
{this.diffuse[0]=color[0];this.diffuse[1]=color[1];this.diffuse[2]=color[2];}}
this.setSpecular=function(color)
{if(this.assertColor(color))
{this.specular[0]=color[0];this.specular[1]=color[1];this.specular[2]=color[2];}}
this.setShininess=function(shine)
{this.shininess=shine;}
this.setName=function(name)
{this.name=name;}
this.toString=function()
{var breakStr="<br />";return"Name: "+this.getName()+breakStr+"Emission: "+this.getEmission()+breakStr+"Ambient: "+this.getAmbient()+breakStr+"Diffuse: "+this.getDiffuse()+breakStr+"Specular: "+this.getSpecular()+breakStr+"Shininess: "+this.getShininess();}
this.assertColor=function(color)
{if(color instanceof Array&&color.length==3)
{return true;}
else
{c3dl.debug.logWarning("Invalid argument passed to material set* method."+"Color values must be arrays with exactly 3 elements.");return false;}}}
c3dl.ModelView=[];c3dl.Projection=[];c3dl.CurrentStackPointer=c3dl.ModelView;c3dl.ModelView.push(c3dl.makeIdentityMatrix());c3dl.Projection.push(c3dl.makeIdentityMatrix());c3dl.matrixMode=function(mode)
{if(mode==c3dl.PROJECTION)
{c3dl.CurrentStackPointer=c3dl.Projection;}
else if(mode==c3dl.MODELVIEW)
{c3dl.CurrentStackPointer=c3dl.ModelView;}}
c3dl.pushMatrix=function()
{c3dl.CurrentStackPointer.push(c3dl.peekMatrix());}
c3dl.loadMatrix=function(matrix)
{if(matrix)
{c3dl.CurrentStackPointer[c3dl.getMatrixStackHeight()-1]=matrix;}
else
{c3dl.loadMatrix(c3dl.makeIdentityMatrix());}}
c3dl.loadIdentity=function()
{c3dl.loadMatrix(c3dl.makeIdentityMatrix())}
c3dl.popMatrix=function()
{if(c3dl.getMatrixStackHeight()>1)
{c3dl.CurrentStackPointer.pop();}}
c3dl.multMatrix=function(matrix)
{c3dl.loadMatrix(c3dl.multiplyMatrixByMatrix(c3dl.peekMatrix(),matrix));}
c3dl.peekMatrix=function()
{return c3dl.CurrentStackPointer[c3dl.getMatrixStackHeight()-1];}
c3dl.getMatrixStackHeight=function()
{return c3dl.CurrentStackPointer.length;}
c3dl.translate=function(translateX,translateY,translateZ)
{var translateMatrix=c3dl.makePoseMatrix([1,0,0],[0,1,0],[0,0,1],[translateX,translateY,translateZ]);c3dl.multMatrix(translateMatrix);}
c3dl.rotate=function(angle,rotationX,rotationY,rotationZ)
{}
c3dl.scale=function(scaleX,scaleY,scaleZ)
{var scaleMatrix=c3dl.makeIdentityMatrix();scaleMatrix[0]=scaleX;scaleMatrix[5]=scaleY;scaleMatrix[10]=scaleZ;c3dl.multMatrix(scaleMatrix);}
c3dl.Scene=function()
{var glCanvas3D=null;var renderer=null;var camera=null;var projMat=null;this.pick;this.pickingPrecision=c3dl.PICK_PRECISION_TRIANGLES;this.pickingHandler;this.boundingVolumesVisible=false;var skyModel=null;var objList=[];var lightList=[c3dl.MAX_LIGHTS];var pointAttenuation=c3dl.makeVector(1,0,0);var pointSize=5;var pointRenderingMode=c3dl.POINT_MODE_SPHERE;var pauseFlag=false;var exitFlag=false;var canvasTag=null;var canvas2Dlist=[];var kybdHandler=null;var mouseHandler=null;var updateHandler=null;var timerID=0;var lastTimeTaken=Date.now();var numFramesSinceSceneStart=0;var FPS=0;var FPS_Counter=0;var FPS_LastTimeTaken=Date.now();var backgroundColor=[c3dl.DEFAULT_BG_RED,c3dl.DEFAULT_BG_GREEN,c3dl.DEFAULT_BG_BLUE];var ambientLight=c3dl.makeVector(1,1,1);var thisScn=null;var textureQueue=[];var pointPositions=null;var culling="BoundingSphere"
this.getPointAttenuation=function()
{return[pointAttenuation[0],pointAttenuation[1],pointAttenuation[2]];}
this.getProjectionMatrix=function()
{return projMat;}
this.getBoundingVolumeVisibility=function()
{return this.boundingVolumesVisible;}
this.getCamera=function()
{return camera;}
this.getObjListSize=function()
{return objList.length;}
this.getGL=function()
{return glCanvas3D;}
this.getTotalFrameCount=function()
{return numFramesSinceSceneStart;}
this.getFPS=function()
{return FPS;}
this.getRenderer=function()
{return renderer;}
this.getScene=function()
{return thisScn;}
this.getSkyModel=function()
{return skyModel;}
this.getAmbientLight=function()
{return[ambientLight[0],ambientLight[1],ambientLight[2]];}
this.getObj=function(indxNum)
{if(isNaN(indxNum))
{c3dl.debug.logWarning("Scene::getObj() called with a parameter that's not a number");return null;}
if(indxNum<0||indxNum>=objList.length)
{c3dl.debug.logWarning("Scene::getObj() called with "+indxNum+", which is not betwen 0 and "+objList.length);return null;}
return objList[indxNum];}
this.getPickingPrecision=function()
{return this.pickingPrecision;}
this.setBoundingVolumeVisibility=function(visible)
{this.boundingVolumesVisible=visible;}
this.setKeyboardCallback=function(keyUpCB,keyDownCB)
{if(canvasTag)
{if(keyUpCB!=null)document.addEventListener("keyup",keyUpCB,false);if(keyDownCB!=null)document.addEventListener("keydown",keyDownCB,false);}}
this.setMouseCallback=function(mouseUpCB,mouseDownCB,mouseMoveCB,mouseScrollCB)
{if(canvasTag)
{if(mouseMoveCB!=null)canvasTag.addEventListener("mousemove",mouseMoveCB,false);if(mouseUpCB!=null)canvasTag.addEventListener("mouseup",mouseUpCB,false);if(mouseDownCB!=null)canvasTag.addEventListener("mousedown",mouseDownCB,false);if(mouseScrollCB!=null)
{canvasTag.addEventListener("DOMMouseScroll",mouseScrollCB,false);canvasTag.addEventListener("mousewheel",mouseScrollCB,false);}}}
this.setPickingCallback=function(pickingHandler)
{if(pickingHandler&&pickingHandler instanceof Function)
{this.pick=new c3dl.Picking(this);this.pickingHandler=pickingHandler;canvasTag.addEventListener("mousedown",this.pick.onMouseDown,false);}
else
{c3dl.debug.logWarning("scene's setPickingCallback() was passed an invalid callback function");}}
this.getPickingCallback=function()
{return this.pickingHandler;}
this.setPointAttenuation=function(attn)
{if(attn.length==3&&(attn[0]>0||attn[1]>0||attn[2]>0))
{pointAttenuation[0]=attn[0];pointAttenuation[1]=attn[1];pointAttenuation[2]=attn[2];}}
this.getPointSize=function()
{return pointSize;}
this.setPointSize=function(size)
{if(size>0)
{pointSize=size;}}
this.setSkyModel=function(sky)
{if(sky instanceof c3dl.Collada)
{skyModel=sky;}
else
{c3dl.debug.Warning("Scene::setSkyModel() Inavlid argument passed, was not c3dl.Collada.");}}
this.setUpdateCallback=function(updateCB)
{if(canvasTag)
{if(updateCB!=null)
{updateHandler=updateCB;}}}
this.setRenderer=function(renderType)
{if(renderType instanceof c3dl.WebGL)
{renderer=renderType;}}
this.setCanvasTag=function(canvasTagID)
{canvasTag=document.getElementById(canvasTagID);if(canvasTag==null)
{c3dl.debug.logWarning('Scene::setCanvasTag() No canvas tag with name '+canvasTagID+' was found.');}}
this.getCanvas=function()
{return canvasTag;}
this.setCamera=function(cam)
{if(cam instanceof c3dl.FreeCamera||cam instanceof c3dl.OrbitCamera)
{camera=cam;return true;}
c3dl.debug.logWarning('Scene::setCamera() invalid type of camera.');return false;}
this.setPickingPrecision=function(precision)
{if(precision==c3dl.PICK_PRECISION_BOUNDING_VOLUME||precision==c3dl.PICK_PRECISION_TRIANGLE)
{this.pickingPrecision=precision;}}
this.addFloatingText=function(text,fontStyle,fontColour,backgroundColour)
{var box=this.addTextToModel(null,text,fontStyle,fontColour,backgroundColour);box.stayInFrontOfCamera=true;this.addObjectToScene(box);}
this.addTextToModel=function(model,text,fontStyle,fontColour,backgroundColour)
{var tempSpan=document.createElement('span');var tempSpanStyle=document.createElement('style');var tempSpanStyleContent=document.createTextNode('span{'+'font: '+fontStyle+';'+'color: '+fontColour+'; '+'background: '+backgroundColour+';}');var tempText=document.createTextNode(text);tempSpanStyle.appendChild(tempSpanStyleContent);tempSpan.appendChild(tempSpanStyle);tempSpan.appendChild(tempText);document.body.appendChild(tempSpan);var actualStringWidth=tempSpan.offsetWidth;var actualStringHeight=tempSpan.offsetHeight;var stringWidth=c3dl.roundUpToNextPowerOfTwo(tempSpan.offsetWidth);var stringHeight=c3dl.roundUpToNextPowerOfTwo(tempSpan.offsetHeight);tempSpan.removeChild(tempSpanStyle);document.body.removeChild(tempSpan);var box;if(model==null)
{var whRatio=stringWidth/stringHeight;var smallCanvasVertices=[[-1.0*(whRatio/2),-1.0,0.0],[-1.0*(whRatio/2),1.0,0.0],[1.0*(whRatio/2),1.0,0.0],[1.0*(whRatio/2),-1.0,0.0],];var smallCanvasNormals=[[0,0,-1]];var smallCanvasUVs=[[0.0,1.0],[0.0,0.0],[1.0,0.0],[1.0,1.0]];var smallCanvasFaces=[[0,0,0],[3,3,0],[2,2,0],[0,0,0],[2,2,0],[1,1,0]];box=new Model();box.init(smallCanvasVertices,smallCanvasNormals,smallCanvasUVs,smallCanvasFaces);box.setPosition([5,0,5]);}
else box=model;var textureCanvas=this.create2Dcanvas(stringWidth,stringHeight);if(textureCanvas.getContext)
{var ctx=textureCanvas.getContext('2d');if(fontStyle)ctx.mozTextStyle=fontStyle;if(backgroundColour)
{ctx.fillStyle=backgroundColour;ctx.fillRect(0,0,stringWidth,stringHeight);}
ctx.translate((stringWidth-actualStringWidth)/2,stringHeight-(stringHeight-actualStringHeight));if(fontColour)ctx.fillStyle=fontColour;else ctx.fillStyle='black';ctx.mozDrawText(text);box.setTextureFromCanvas2D(textureCanvas.id);}
else c3dl.debug.logWarning("addFloatingText(): call to create2Dcanvas() failed");return box;}
this.create2Dcanvas=function(width,height)
{var newCanvas=document.createElement('canvas');newCanvas.id='changemetorandomstring';newCanvas.width=width;newCanvas.height=height;canvasTag.appendChild(newCanvas);canvas2Dlist.push(newCanvas);return newCanvas;}
this.setBackgroundColor=function(bgColor)
{if(bgColor.length>=3)
{backgroundColor=bgColor.slice(0,3);if(renderer)
{renderer.setClearColor(backgroundColor);}}}
this.setPointRenderingMode=function(mode)
{if(mode==c3dl.POINT_MODE_POINT||mode==c3dl.POINT_MODE_SPHERE)
{pointRenderingMode=mode;}
else
{c3dl.debug.logWarning("Invalid mode passed to setPointRenderingMode");}}
this.getPointRenderingMode=function()
{return pointRenderingMode;}
this.getBackgroundColor=function()
{return c3dl.copyObj(backgroundColor);}
this.setAmbientLight=function(light)
{if(light.length>=3)
{ambientLight=[light[0],light[1],light[2],1];}}
this.init=function()
{if(renderer!=null&&canvasTag!=null)
{if(!renderer.createRenderer(canvasTag))
{c3dl.debug.logError("Your browser does not support WebGL.<br />"+"Visit the <a href='http://en.wikipedia.org/wiki/WebGL'>WebGL wiki page</a> for information on downloading a WebGL enabled browser");return false;}
glCanvas3D=renderer.getGLContext();this.setBackgroundColor(backgroundColor);thisScn=this;for(var i=0,len=lightList.length;i<len;i++)
{lightList[i]=null;}
return renderer.init(canvasTag.width,canvasTag.height);}
c3dl.debug.logError('Scene::createScene() No renderer was specified.');return false;}
this.getLight=function(name)
{for(var i=0,len=lightList.length;i<len;i++)
{if(lightList[i]&&lightList[i].getName()==name)
{return lightList[i];}}
return null;}
this.addLight=function(light)
{for(var i=0;i<c3dl.MAX_LIGHTS;i++)
{if(lightList[i]==null)
{lightList[i]=light;return true;}}
return false;}
this.removeLight=function(lightName)
{var lightID=-1;for(var i=0,len=lightList.length;i<len&&lightID==-1;i++)
{if(lightList[i]&&lightList[i].getName()==lightName)
{lightID=i;}}
if(lightID!=-1)
{lightList[lightID]=null;renderer.clearLight(lightID);}
return(lightID==-1?false:true);}
this.updateLights=function()
{renderer.updateAmbientLight(this.getAmbientLight());renderer.updateLights(lightList);}
this.addObjectToScene=function(obj)
{var type=obj.getObjectType();switch(type)
{case c3dl.LINE:case c3dl.POINT:case c3dl.PARTICLE_SYSTEM:case c3dl.COLLADA:objList.push(obj);return true;}
c3dl.debug.logWarning("Scene::addObjectToScene() called with an invalid argument.");return false;}
this.removeObjectFromScene=function(obj)
{var isFound=false;if(obj instanceof c3dl.Primitive||obj instanceof c3dl.Point||obj instanceof c3dl.Line||obj instanceof c3dl.ParticleSystem)
{for(var i=0,len=objList.length;i<len;i++)
{if(objList[i]==obj)
{objList.splice(i,1);isFound=true;}}}
else
{c3dl.debug.logWarning('Scene::removeObjectFromScene() called with an invalid argument.');}
return isFound;}
this.startScene=function()
{if(c3dl.debug.SHARK===true)
{connectShark();startShark();}
numFramesSinceSceneStart=0;frameCounter=0;if(glCanvas3D==null)return false;if(renderer==null)return false;if(camera==null)return false;lastTimeTaken=Date.now();if(typeof(benchmarkSetupDone)=="function")benchmarkSetupDone();timerID=setInterval(this.render,5);this.setAmbientLight([ambientLight[0],ambientLight[1],ambientLight[2]]);}
this.render=function()
{if(Date.now()-FPS_LastTimeTaken>=1000)
{FPS=FPS_Counter/(Date.now()-FPS_LastTimeTaken)*1000;FPS_Counter=0;FPS_LastTimeTaken=Date.now();}
if(exitFlag)
{timerID=clearInterval(timerID);if(c3dl.debug.SHARK===true)
{stopShark();disconnectShark();}
return;}
if(!pauseFlag){camera.update(Date.now()-lastTimeTaken);thisScn.updateObjects(Date.now()-lastTimeTaken);lastTimeTaken=Date.now();if(textureQueue.length>0)
{for(var i=0,len=textureQueue.length;i<len;i++)
{renderer.addTexture(textureQueue[i]);}
textureQueue=[];}
renderer.clearBuffers();camera.applyToWorld(canvasTag.width/canvasTag.height);projMat=camera.getProjectionMatrix();thisScn.updateLights();thisScn.renderObjects(glCanvas3D);}
numFramesSinceSceneStart++;FPS_Counter++;}
this.updateObjects=function(timeElapsed)
{if(updateHandler!=null)
{updateHandler(timeElapsed);}
for(var i=0,len=objList.length;i<len;i++)
{switch(objList[i].getObjectType())
{case c3dl.PARTICLE_SYSTEM:case c3dl.COLLADA:objList[i].update(timeElapsed);}}
if(skyModel)
{skyModel.update(timeElapsed);skyModel.setPosition(camera.getPosition());}}
this.renderObjects=function()
{if(skyModel)
{glCanvas3D.frontFace(glCanvas3D.CW);glCanvas3D.cullFace(glCanvas3D.BACK);glCanvas3D.disable(glCanvas3D.DEPTH_TEST);var prevAmbient=this.getAmbientLight();var lightState=renderer.getLighting();renderer.setLighting(false);renderer.updateAmbientLight([1,1,1]);skyModel.render(glCanvas3D,this);renderer.setLighting(lightState);renderer.updateAmbientLight(prevAmbient);glCanvas3D.enable(glCanvas3D.DEPTH_TEST);}
glCanvas3D.enable(glCanvas3D.CULL_FACE);glCanvas3D.frontFace(glCanvas3D.CCW);glCanvas3D.cullFace(glCanvas3D.BACK);var particleSystems=[];for(var i=0,len=objList.length;i<len;i++)
{if(objList[i].getObjectType()==c3dl.PARTICLE_SYSTEM)
{particleSystems.push(objList[i]);}
if(objList[i].getObjectType()==c3dl.COLLADA)
{var checker;var cam=this.getCamera();var projMatrix=cam.getProjectionMatrix();var viewMatrix=cam.getViewMatrix();var frustumMatrix=c3dl.multiplyMatrixByMatrix(projMatrix,viewMatrix);var frustumCulling=new Frustum(frustumMatrix);if(culling==="BoundingSphere"){var boundingSpheres=objList[i].getBoundingSpheres();for(var j=0;j<boundingSpheres.length;j++){checker=frustumCulling.sphereInFrustum(boundingSpheres[j]);if(checker==="INSIDE"){break;}}
if(checker==="INSIDE"){objList[i].render(glCanvas3D,this);}}
else if(culling==="BoundingBox"){for(var j=0;j<3;j++){box=objList[i].getBoundingBox();sizes=[];sizes[0]=box.getHeight();sizes[1]=box.getLength();sizes[2]=box.getWidth();checker=frustumCulling.boundingBoxInfrustumPlane(box.getPosition(),sizes[j]);if(checker==="INSIDE"){break;}}
if(checker==="INSIDE"){objList[i].render(glCanvas3D,this);}}
else{objList[i].render(glCanvas3D,this);}}}
pointPositions=new Array();pointColors=new Array();var currPoint=0;for(var i=0,len=objList.length;i<len;i++)
{if(objList[i].getObjectType()==c3dl.POINT&&objList[i].isVisible())
{pointPositions.push(objList[i].getPosition()[0]);pointPositions.push(objList[i].getPosition()[1]);pointPositions.push(objList[i].getPosition()[2]);pointColors.push(objList[i].getColor()[0]);pointColors.push(objList[i].getColor()[1]);pointColors.push(objList[i].getColor()[2]);}}
renderer.renderPoints(pointPositions,pointColors,pointAttenuation,this.getPointRenderingMode(),pointSize);var lines=[];for(var j=0,len=objList.length;j<len;j++)
{if(objList[j].getObjectType()==c3dl.LINE&&objList[j].isVisible())
{lines.push(objList[j]);}}
renderer.renderLines(lines);for(var i=0,len=particleSystems.length;i<len;i++)
{particleSystems[i].render(glCanvas3D,this);}}
this.stopScene=function()
{exitFlag=true;}
this.unpauseScene=function()
{pauseFlag=false;}
this.pauseScene=function()
{pauseFlag=true;}
this.preloadImages=function(imagePaths)
{if(textureManager)
{for(var i=0,len=imagePaths.length;i<len;i++)
{textureManager.addTexture(imagePaths[i]);}}
else
{c3dl.debug.logError("preloadImage() must be called after Scene's init()");}}}
c3dl.Actor=function()
{this.left=c3dl.makeVector(1.0,0.0,0.0);this.up=c3dl.makeVector(0.0,1.0,0.0);this.dir=c3dl.makeVector(0.0,0.0,1.0);this.pos=c3dl.makeVector(0.0,0.0,0.0);this.scaleVec=c3dl.makeVector(1.0,1.0,1.0);this.linVel=c3dl.makeVector(0.0,0.0,0.0);this.angVel=c3dl.makeVector(0.0,0.0,0.0);this.name="unnamed";}
c3dl.Actor.prototype.getPosition=function()
{return c3dl.copyVector(this.pos);}
c3dl.Actor.prototype.getUp=function()
{return c3dl.copyVector(this.up);}
c3dl.Actor.prototype.getDirection=function()
{return c3dl.copyVector(this.dir);}
c3dl.Actor.prototype.getLeft=function()
{return c3dl.copyVector(this.left);}
c3dl.Actor.prototype.getLinearVel=function()
{return c3dl.copyVector(this.linVel);}
c3dl.Actor.prototype.getAngularVel=function()
{return c3dl.copyVector(this.angVel);}
c3dl.Actor.prototype.getScale=function()
{return c3dl.copyVector(this.scaleVec[0],this.scaleVec[1],this.scaleVec[2]);}
c3dl.Actor.prototype.getTransform=function()
{var mat=c3dl.makePoseMatrix(this.left,this.up,this.dir,this.pos);var smat=c3dl.makeMatrix();c3dl.setMatrix(smat,this.scaleVec[0],0,0,0,0,this.scaleVec[1],0,0,0,0,this.scaleVec[2],0,0,0,0,1);mat=c3dl.multiplyMatrixByMatrix(mat,smat);return mat;}
c3dl.Actor.prototype.getRotateMat=function()
{return c3dl.makePoseMatrix(this.left,this.up,this.dir,[0,0,0]);}
c3dl.Actor.prototype.getName=function()
{return this.name;}
c3dl.Actor.prototype.setTransform=function(mat)
{this.left=c3dl.makeVector(mat[0],mat[1],mat[2]);this.up=c3dl.makeVector(mat[4],mat[5],mat[6]);this.dir=c3dl.makeVector(mat[8],mat[9],mat[10]);this.pos=c3dl.makeVector(mat[12],mat[13],mat[14]);}
c3dl.Actor.prototype.resetTransform=function()
{this.angVel=c3dl.makeVector(0.0,0.0,0.0);this.linVel=c3dl.makeVector(0.0,0.0,0.0);this.left=c3dl.makeVector(1.0,0.0,0.0);this.up=c3dl.makeVector(0.0,1.0,0.0);this.dir=c3dl.makeVector(0.0,0.0,1.0);this.pos=c3dl.makeVector(0.0,0.0,0.0);}
c3dl.Actor.prototype.scale=function(scaleVec)
{if(scaleVec[0]>0.0&&scaleVec[1]>0.0&&scaleVec[2]>0.0)
{this.scaleVec[0]=this.scaleVec[0]*scaleVec[0];this.scaleVec[1]=this.scaleVec[1]*scaleVec[1];this.scaleVec[2]=this.scaleVec[2]*scaleVec[2];}}
c3dl.Actor.prototype.setPosition=function(vecPos)
{this.pos[0]=vecPos[0];this.pos[1]=vecPos[1];this.pos[2]=vecPos[2];}
c3dl.Actor.prototype.translate=function(translation)
{this.pos=c3dl.addVectors(this.pos,translation);}
c3dl.Actor.prototype.setForward=function(newVec)
{this.dir=this.pos;c3dl.subtractVectors(this.dir,newVec,this.dir);c3dl.normalizeVector(this.dir);c3dl.vectorCrossProduct(this.up,this.dir,this.left);c3dl.normalizeVector(this.left);c3dl.vectorCrossProduct(this.dir,this.up,this.up);c3dl.normalizeVector(this.up);}
c3dl.Actor.prototype.setUpVector=function(newVec)
{this.up[0]=newVec[0];this.up[1]=newVec[1];this.up[2]=newVec[2];}
c3dl.Actor.prototype.setLinearVel=function(newVec)
{this.linVel[0]=newVec[0];this.linVel[1]=newVec[1];this.linVel[2]=newVec[2];}
c3dl.Actor.prototype.setAngularVel=function(newVec)
{this.angVel[0]=newVec[0];this.angVel[1]=newVec[1];this.angVel[2]=newVec[2];}
c3dl.Actor.prototype.setName=function(name)
{this.name=name;}
c3dl.Actor.prototype.rotateOnAxis=function(axisVec,angle)
{var rotateOnAxisQuat=c3dl.makeQuat(0,0,0,0);var rotateOnAxisMat=c3dl.makeZeroMatrix();if(angle==0)
{return;}
c3dl.axisAngleToQuat(axisVec,angle,rotateOnAxisQuat);rotateOnAxisMat=c3dl.quatToMatrix(rotateOnAxisQuat);c3dl.multiplyMatrixByVector(rotateOnAxisMat,this.dir,this.dir);c3dl.normalizeVector(this.dir);c3dl.multiplyMatrixByVector(rotateOnAxisMat,this.left,this.left);c3dl.normalizeVector(this.left);c3dl.multiplyMatrixByVector(rotateOnAxisMat,this.up,this.up);c3dl.normalizeVector(this.up);}
c3dl.Actor.prototype.yaw=function(angle)
{if(angle!=0)
{this.rotateOnAxis(this.up,angle);}}
c3dl.Actor.prototype.roll=function(angle)
{if(angle!=0)
{this.rotateOnAxis(this.dir,angle);}}
c3dl.Actor.prototype.pitch=function(angle)
{if(angle!=0)
{this.rotateOnAxis(this.left,angle);}}
c3dl.Actor.prototype.update=function(timeStep)
{}
c3dl.Actor.prototype.getCopy=function()
{var actor=new c3dl.Actor();actor.clone(this);return actor;}
c3dl.Actor.getObjectType=function()
{return c3dl.COLLADA;}
c3dl.Actor.prototype.clone=function(other)
{this.left=c3dl.copyVector(other.left);this.up=c3dl.copyVector(other.up);this.dir=c3dl.copyVector(other.dir);this.pos=c3dl.copyVector(other.pos);this.scaleVec=c3dl.copyVector(other.scaleVec);this.linVel=c3dl.copyVector(other.linVel);this.angVel=c3dl.copyVector(other.angVel);this.name=other.name;}
c3dl.Line=function()
{this.coords=new C3DL_FLOAT_ARRAY([0,0,0,0,0,0]);this.colors=new C3DL_FLOAT_ARRAY([0,0,0,0,0,0]);this.visible=true;this.width=1.0;this.setCoordinates=function(beginCoord,endCoord)
{if(beginCoord.length==3&&endCoord.length==3)
{this.coords[0]=beginCoord[0];this.coords[1]=beginCoord[1];this.coords[2]=beginCoord[2];this.coords[3]=endCoord[0];this.coords[4]=endCoord[1];this.coords[5]=endCoord[2];}
else
{c3dl.debug.logWarning("invalid values passed to Line::setCoordinates()");}}
this.setColors=function(beginColor,endColor)
{if(beginColor.length==3&&endColor.length==3)
{this.colors[0]=beginColor[0];this.colors[1]=beginColor[1];this.colors[2]=beginColor[2];this.colors[3]=endColor[0];this.colors[4]=endColor[1];this.colors[5]=endColor[2];}
else
{c3dl.debug.logWarning("invalid values passed to Line::setColors");}}
this.setVisible=function(visible)
{this.visible=visible;}
this.isVisible=function()
{return this.visible;}
this.setWidth=function(width)
{if(width>=1)
{this.width=width;}}
this.getWidth=function()
{return this.width;}
this.getCoordinates=function()
{return new C3DL_FLOAT_ARRAY([this.coords[0],this.coords[1],this.coords[2],this.coords[3],this.coords[4],this.coords[5]]);}
this.getColors=function()
{return new C3DL_FLOAT_ARRAY([this.colors[0],this.colors[1],this.colors[2],this.colors[3],this.colors[4],this.colors[5]]);}
this.getObjectType=function()
{return c3dl.LINE;}}
c3dl.Point=function()
{this.color=c3dl.makeVector(0,0,0);this.position=c3dl.makeVector(0,0,0);this.visible=true;this.name="";this.getName=function()
{return this.name;}
this.setName=function(name)
{this.name=name;}
this.getPosition=function()
{return c3dl.copyObj(this.position);}
this.setPosition=function(pos)
{if(pos.length==3)
{this.position=c3dl.copyObj(pos);}
else
{c3dl.debug.logWarning("invalid value passed to Point::setPosition()");}}
this.getColor=function()
{return c3dl.copyObj(this.color);}
this.setColor=function(color)
{if(color.length==3)
{this.color=c3dl.copyObj(color);}
else
{c3dl.debug.logWarning("invalid value passed to Point::setColor()");}}
this.isVisible=function()
{return this.visible;}
this.setVisible=function(visible)
{this.visible=visible;}
this.getObjectType=function()
{return c3dl.POINT;}}
c3dl.Primitive=c3dl.inherit(c3dl.Actor,function()
{c3dl._superc(this);this.isPickable=true;this.visible=true;});c3dl.Primitive.prototype.getPickable=function()
{return this.isPickable;}
c3dl.Primitive.prototype.isVisible=function()
{return this.visible;}
c3dl.Primitive.prototype.setVisible=function(show)
{this.visible=show;}
c3dl.Primitive.prototype.setPickable=function(isPickable)
{this.isPickable=isPickable;}
c3dl.Primitive.prototype.getCopy=function()
{var primitive=new c3dl.Primitive();primitive.clone(this);return primitive;}
c3dl.Primitive.prototype.clone=function(other)
{c3dl._super(this,arguments,"clone");this.visible=other.visible;this.isPickable=other.isPickable;this.visible=other.visible;}
c3dl.Primitive.prototype.render=function(glCanvas3D,scene)
{}
c3dl.Camera=function()
{this.left=c3dl.makeVector(1.0,0.0,0.0);this.up=c3dl.makeVector(0.0,1.0,0.0);this.dir=c3dl.makeVector(0.0,0.0,1.0);this.pos=c3dl.makeVector(0.0,0.0,0.0);this.projectionTransform=null;this.projMatrix;this.viewMatrix;this.fieldOfView=c3dl.DEFAULT_FIELD_OF_VIEW;this.nearClippingPlane=c3dl.DEFAULT_NEAR_CLIPPING_PLANE;this.farClippingPlane=c3dl.DEFAULT_FAR_CLIPPING_PLANE;}
c3dl.Camera.prototype.applyToWorld=function(aspectRatio)
{c3dl.loadMatrix(c3dl.lookAt(this.pos,c3dl.addVectors(this.pos,this.dir),this.up));c3dl.translate(-this.pos[0],-this.pos[1],-this.pos[2]);this.viewMatrix=c3dl.peekMatrix();this.projMatrix=c3dl.makePerspective(this.fieldOfView,aspectRatio,this.nearClippingPlane,this.farClippingPlane);c3dl.matrixMode(c3dl.PROJECTION);c3dl.loadMatrix(this.projMatrix);c3dl.matrixMode(c3dl.MODELVIEW);}
c3dl.Camera.prototype.getDir=function()
{return c3dl.copyVector(this.dir);}
c3dl.Camera.prototype.getFarClippingPlane=function()
{return this.farClippingPlane;}
c3dl.Camera.prototype.getFieldOfView=function()
{return this.fieldOfView;}
c3dl.Camera.prototype.getLeft=function()
{return c3dl.copyVector(this.left);}
c3dl.Camera.prototype.getNearClippingPlane=function()
{return this.nearClippingPlane;}
c3dl.Camera.prototype.getPosition=function()
{return c3dl.copyVector(this.pos);}
c3dl.Camera.prototype.getProjectionMatrix=function()
{return c3dl.copyMatrix(this.projMatrix);}
c3dl.Camera.prototype.getViewMatrix=function()
{return c3dl.copyMatrix(this.viewMatrix);}
c3dl.Camera.prototype.getUp=function()
{return c3dl.copyVector(this.up);}
c3dl.Camera.prototype.setFarClippingPlane=function(fcp)
{if(fcp>0)
{this.farClippingPlane=fcp;}}
c3dl.Camera.prototype.setFieldOfView=function(fov)
{if(fov>0&&fov<180)
{this.fieldOfView=fov;}}
c3dl.Camera.prototype.setNearClippingPlane=function(ncp)
{if(ncp>0)
{this.nearClippingPlane=ncp;}}
c3dl.Camera.prototype.toString=function(delimiter)
{if(!delimiter||typeof(delimiter)!="string")
{delimiter=",";}
return"c3dl.Camera: "+delimiter+"left: "+this.getLeft()+delimiter+"up: "+this.getUp()+
delimiter+"direction: "+this.getDir()+delimiter+"position: "+this.getPosition()+
delimiter+"fied of view: "+this.getFieldOfView()+delimiter+"near clipping plane: "+
this.getNearClippingPlane()+delimiter+"far clipping plane: "+this.getFarClippingPlane()+
delimiter;}
c3dl.Camera.prototype.update=function(timeStep)
{if(c3dl.isVectorZero(linVel)&&c3dl.isVectorZero(angVel))return false;if(c3dl.vectorLengthSq(linVel)>0.0)
{velVec=c3dl.makeVector(linVel[0],linVel[1],linVel[2]);c3dl.multiplyVector(velVec,timeStep,velVec);c3dl.addVectors(pos,velVec,pos);}
if(c3dl.vectorLengthSq(angVel)>0.0)
{this.pitch(angVel[0]*timeStep);this.yaw(angVel[1]*timeStep);this.roll(angVel[2]*timeStep);}
return true;}
c3dl.FreeCamera=c3dl.inherit(c3dl.Camera,function()
{c3dl._superc(this);this.linVel=c3dl.makeVector(0.0,0.0,0.0);this.angVel=c3dl.makeVector(0.0,0.0,0.0);});c3dl.FreeCamera.prototype.getAngularVel=function()
{return c3dl.copyVector(this.angVel);}
c3dl.FreeCamera.prototype.getLinearVel=function()
{return c3dl.copyVector(this.linVel);}
c3dl.FreeCamera.prototype.pitch=function(angle)
{this.rotateOnAxis(this.left,angle);}
c3dl.FreeCamera.prototype.roll=function(angle)
{this.rotateOnAxis(this.dir,angle);}
c3dl.FreeCamera.prototype.rotateOnAxis=function(axisVec,angle)
{var quat=c3dl.axisAngleToQuat(axisVec,angle);var mat=c3dl.quatToMatrix(quat);c3dl.multiplyMatrixByVector(mat,this.dir,this.dir);c3dl.normalizeVector(this.dir);c3dl.multiplyMatrixByVector(mat,this.left,this.left);c3dl.normalizeVector(this.left);c3dl.multiplyMatrixByVector(mat,this.up,this.up);c3dl.normalizeVector(this.up);}
c3dl.FreeCamera.prototype.setAngularVel=function(newVec)
{this.angVel[0]=newVec[0];this.angVel[1]=newVec[1];this.angVel[2]=newVec[2];}
c3dl.FreeCamera.prototype.setLinearVel=function(newVec)
{this.linVel[0]=newVec[0];this.linVel[1]=newVec[1];this.linVel[2]=newVec[2];}
c3dl.FreeCamera.prototype.setLookAtPoint=function(newVec)
{if(c3dl.isVectorEqual(this.pos,[0,0,0])&&c3dl.isVectorEqual(newVec,[0,0,0]))
{c3dl.debug.logWarning("Cannot lookAt [0,0,0] since camera is at [0,0,0]."+" Move camera before calling setLookAt()");}
else
{this.dir=c3dl.subtractVectors(newVec,this.pos);c3dl.normalizeVector(this.dir);c3dl.vectorCrossProduct([0,1,0],this.dir,this.left);c3dl.normalizeVector(this.left);c3dl.vectorCrossProduct(this.dir,this.left,this.up);c3dl.normalizeVector(this.up);}}
c3dl.FreeCamera.prototype.setPosition=function(newVec)
{this.pos[0]=newVec[0];this.pos[1]=newVec[1];this.pos[2]=newVec[2];}
c3dl.FreeCamera.prototype.setUpVector=function(newVec)
{this.up[0]=newVec[0];this.up[1]=newVec[1];this.up[2]=newVec[2];}
c3dl.FreeCamera.prototype.toString=function(delimiter)
{if(!delimiter||typeof(delimiter)!="string")
{delimiter=",";}
var cameraToStr=c3dl._super(this,arguments,"toString");var FreeCameraToStr="c3dl.FreeCamera: "+delimiter+"angular velocity = "+
this.getAngularVel()+delimiter+"linear velocity = "+this.getLinearVel()+delimiter;return cameraToStr+FreeCameraToStr;}
c3dl.FreeCamera.prototype.update=function(timeStep)
{if(c3dl.isVectorZero(this.linVel)&&c3dl.isVectorZero(this.angVel))
{return false;}
if(c3dl.vectorLengthSq(this.linVel)>0.0)
{var velVec=c3dl.makeVector(this.linVel[0],this.linVel[1],this.linVel[2]);c3dl.multiplyVector(velVec,timeStep,velVec);c3dl.addVectors(this.pos,velVec,this.pos);}
if(c3dl.vectorLengthSq(this.angVel)>0.0)
{this.pitch(this.angVel[0]*timeStep);this.yaw(this.angVel[1]*timeStep);this.roll(this.angVel[2]*timeStep);}}
c3dl.FreeCamera.prototype.yaw=function(angle)
{this.rotateOnAxis(this.up,angle);}
c3dl.OrbitCamera=c3dl.inherit(c3dl.Camera,function()
{c3dl._superc(this);this.closestDistance=0;this.farthestDistance=0;this.orbitPoint=c3dl.makeVector(0,0,0);});c3dl.OrbitCamera.prototype.getClosestDistance=function()
{return this.closestDistance;}
c3dl.OrbitCamera.prototype.getDistance=function()
{return c3dl.vectorLength(c3dl.subtractVectors(this.pos,this.orbitPoint));}
c3dl.OrbitCamera.prototype.getFarthestDistance=function()
{return this.farthestDistance;}
c3dl.OrbitCamera.prototype.getOrbitPoint=function()
{return c3dl.copyVector(this.orbitPoint);}
c3dl.OrbitCamera.prototype.goCloser=function(distance)
{if(distance>0)
{var shiftAmt=c3dl.multiplyVector(this.dir,distance);var renameMe=c3dl.subtractVectors(this.pos,this.orbitPoint);var maxMoveCloser=c3dl.vectorLength(renameMe)-this.getClosestDistance();if(c3dl.vectorLength(shiftAmt)<=maxMoveCloser)
{this.pos=c3dl.addVectors(this.pos,shiftAmt);return true;}}
return false;}
c3dl.OrbitCamera.prototype.goFarther=function(distance)
{if(distance>0)
{var shiftAmt=c3dl.multiplyVector(c3dl.multiplyVector(this.dir,-1),distance);var newpos=c3dl.addVectors(this.pos,shiftAmt);var distanceBetweenCamAndOP=c3dl.vectorLength(c3dl.subtractVectors(newpos,this.orbitPoint));if(distanceBetweenCamAndOP<=this.getFarthestDistance())
{this.pos=newpos;return true;}}
return false;}
c3dl.OrbitCamera.prototype.pitch=function(angle)
{if(c3dl.isVectorEqual(this.pos,this.orbitPoint))
{var rotMat=c3dl.quatToMatrix(c3dl.axisAngleToQuat(this.left,angle));this.dir=c3dl.multiplyMatrixByVector(rotMat,this.dir);this.dir=c3dl.normalizeVector(this.dir);this.up=c3dl.vectorCrossProduct(this.dir,this.left);this.up=c3dl.normalizeVector(this.up);}
else
{this.pos=c3dl.subtractVectors(this.pos,this.orbitPoint);var quat=c3dl.axisAngleToQuat(this.left,angle);var rotMat=c3dl.quatToMatrix(quat);var newpos=c3dl.multiplyMatrixByVector(rotMat,this.pos);this.pos=c3dl.addVectors(newpos,this.orbitPoint);this.dir=c3dl.subtractVectors(this.orbitPoint,this.pos);this.dir=c3dl.normalizeVector(this.dir);this.up=c3dl.vectorCrossProduct(this.dir,this.left);this.up=c3dl.normalizeVector(this.up);this.left=c3dl.vectorCrossProduct(this.up,this.dir);this.left=c3dl.normalizeVector(this.left);}}
c3dl.OrbitCamera.prototype.setClosestDistance=function(distance)
{if(distance>=0&&distance<=this.getFarthestDistance())
{this.closestDistance=distance;var distanceBetweenCamAndOP=this.getDistance();if(distanceBetweenCamAndOP<this.getClosestDistance())
{var amt=this.getClosestDistance()-distanceBetweenCamAndOP;this.goFarther(amt);}}}
c3dl.OrbitCamera.prototype.setDistance=function(distance)
{if(distance>=this.getClosestDistance()&&distance<=this.getFarthestDistance())
{this.pos=c3dl.copyVector(this.orbitPoint);this.goFarther(distance);}}
c3dl.OrbitCamera.prototype.setFarthestDistance=function(distance)
{if(distance>=this.getClosestDistance())
{this.farthestDistance=distance;var distanceBetweenCamAndOP=this.getDistance();if(distanceBetweenCamAndOP>this.getFarthestDistance())
{var amt=distanceBetweenCamAndOP-this.getFarthestDistance();this.goCloser(amt);}}}
c3dl.OrbitCamera.prototype.setOrbitPoint=function(orbitPoint)
{var orbitPointToCam=c3dl.multiplyVector(this.dir,-this.getDistance());this.orbitPoint[0]=orbitPoint[0];this.orbitPoint[1]=orbitPoint[1];this.orbitPoint[2]=orbitPoint[2];this.pos=c3dl.addVectors(this.orbitPoint,orbitPointToCam);}
c3dl.OrbitCamera.prototype.yaw=function(angle)
{if(c3dl.isVectorEqual(this.pos,this.orbitPoint))
{var rotMat=c3dl.quatToMatrix(c3dl.axisAngleToQuat([0,1,0],angle));this.left=c3dl.multiplyMatrixByVector(rotMat,this.left);this.left=c3dl.normalizeVector(this.left);this.up=c3dl.multiplyMatrixByVector(rotMat,this.up);this.up=c3dl.normalizeVector(this.up);this.dir=c3dl.vectorCrossProduct(this.left,this.up);this.dir=c3dl.normalizeVector(this.dir);}
else
{var camPosOrbit=c3dl.subtractVectors(this.pos,this.orbitPoint);var rotMat=c3dl.quatToMatrix(c3dl.axisAngleToQuat([0,1,0],angle));var newpos=c3dl.multiplyMatrixByVector(rotMat,camPosOrbit);this.pos=c3dl.addVectors(newpos,this.orbitPoint);this.dir=c3dl.subtractVectors(this.orbitPoint,this.pos);this.dir=c3dl.normalizeVector(this.dir);this.up=c3dl.multiplyMatrixByVector(rotMat,this.up);this.up=c3dl.normalizeVector(this.up);this.left=c3dl.vectorCrossProduct(this.up,this.dir);this.left=c3dl.normalizeVector(this.left);}}
c3dl.OrbitCamera.prototype.setPosition=function(position)
{var distFromNewPosToOP=c3dl.vectorLength(c3dl.subtractVectors(this.orbitPoint,position));if(distFromNewPosToOP>=this.getClosestDistance()&&distFromNewPosToOP<=this.getFarthestDistance())
{this.pos=c3dl.copyObj(position);var camPosToOrbitPoint=c3dl.subtractVectors(this.orbitPoint,this.pos);if(c3dl.isVectorEqual([0,0,0],c3dl.vectorCrossProduct(camPosToOrbitPoint,[0,1,0])))
{this.dir=c3dl.normalizeVector(camPosToOrbitPoint);this.up=c3dl.vectorCrossProduct(this.dir,this.left);}
else
{this.dir=c3dl.normalizeVector(c3dl.subtractVectors(this.orbitPoint,this.pos));this.left=c3dl.vectorCrossProduct([0,1,0],this.dir);this.up=c3dl.vectorCrossProduct(this.dir,this.left);}}}
c3dl.OrbitCamera.prototype.toString=function(delimiter)
{if(!delimiter||typeof(delimiter)!="string")
{delimiter=",";}
var cameraToStr=c3dl._super(this,arguments,"toString");var OrbitCameraToStr="c3dl.OrbitCamera: "+delimiter+"orbit point = "+this.getOrbitPoint()+delimiter+"closest distance = "+this.getClosestDistance()+delimiter+"farthest distance = "+this.getFarthestDistance();return cameraToStr+OrbitCameraToStr;}
c3dl.OrbitCamera.prototype.update=function(timeStep)
{}
c3dl.Collada=c3dl.inherit(c3dl.Primitive,function(){c3dl._superc(this);this.boundingbox=new c3dl.BoundingBox();this.drawboundingbox=false;this.path=null;this.sceneGraph=null;});c3dl.Collada.prototype.getPath=function(){if(this.isReady()){return this.path;}}
c3dl.Collada.prototype.getAngularVel=function(){if(this.isReady()){return this.sceneGraph.getAngularVel();}}
c3dl.Collada.prototype.getLinearVel=function(){if(this.isReady()){return this.sceneGraph.getLinearVel();}}
c3dl.Collada.prototype.getPosition=function(){if(this.isReady()){return this.sceneGraph.getPosition();}}
c3dl.Collada.prototype.setAngularVel=function(vec){if(this.isReady()){this.sceneGraph.setAngularVel(vec);}}
c3dl.Collada.prototype.getUp=function(){if(this.isReady()){return this.sceneGraph.getUp();}}
c3dl.Collada.prototype.getLeft=function(){if(this.isReady()){return this.sceneGraph.getLeft();}}
c3dl.Collada.prototype.getDirection=function(){if(this.isReady()){return this.sceneGraph.getDirection();}}
c3dl.Collada.prototype.getPickable=function(){if(this.isReady()){return this.sceneGraph.getPickable();}}
c3dl.Collada.prototype.setPickable=function(isPickable){if(this.isReady()){this.sceneGraph.setPickable(isPickable);}}
c3dl.Collada.prototype.setLinearVel=function(vec){if(this.isReady()){this.sceneGraph.setLinearVel(vec);}}
c3dl.Collada.prototype.init=function(daePath){this.path=daePath;if(c3dl.ColladaManager.isFileLoaded(this.path)){this.sceneGraph=c3dl.ColladaManager.getSceneGraphCopy(this.path);}
else{c3dl.ColladaQueue.pushBack(this);}
if(this.isReady()){c3dl.pushMatrix();c3dl.loadIdentity();this.boundingbox.init(this.sceneGraph.getAllVerts());c3dl.popMatrix();}}
c3dl.Collada.prototype.update=function(timeStep){if(this.isReady()){c3dl.pushMatrix();c3dl.loadIdentity();this.sceneGraph.update(timeStep);c3dl.popMatrix();var angVel=this.sceneGraph.getAngularVel();this.boundingbox.rotateOnAxis(this.sceneGraph.left,angVel[0]*timeStep);this.boundingbox.rotateOnAxis(this.sceneGraph.up,angVel[1]*timeStep);this.boundingbox.rotateOnAxis(this.sceneGraph.dir,angVel[2]*timeStep);var linVel=this.sceneGraph.getLinearVel();linVel=c3dl.multiplyVector(linVel,timeStep);var tempPos=c3dl.addVectors(this.sceneGraph.getPosition(),linVel);this.boundingbox.setPosition(tempPos);}
else{c3dl.debug.logError('You must call addModel("'+this.path+'"); before canvasMain.');if(c3dl.ColladaManager.isFileLoaded(this.path)){this.sceneGraph=c3dl.ColladaManager.getSceneGraphCopy(this.path);}}}
c3dl.Collada.prototype.setSceneGraph=function(sg){this.sceneGraph=sg;}
c3dl.Collada.prototype.render=function(glCanvas3D,scene){if(this.sceneGraph&&this.isVisible()){this.sceneGraph.render(glCanvas3D,scene);if(this.drawboundingbox){this.boundingbox.render(scene);}}}
c3dl.Collada.prototype.scale=function(scaleVec){if(this.isReady()){this.boundingbox.scale(scaleVec);this.sceneGraph.scale(scaleVec);}}
c3dl.Collada.prototype.translate=function(trans){if(this.isReady()){this.sceneGraph.translate(trans);this.boundingbox.setPosition(trans);}}
c3dl.Collada.prototype.setPosition=function(pos){if(this.isReady()){this.sceneGraph.setPosition(pos);this.boundingbox.setPosition(pos);}}
c3dl.Collada.prototype.getSceneGraph=function(){return this.sceneGraph;}
c3dl.Collada.prototype.setTexture=function(texturePath){if(this.isReady()){this.sceneGraph.setTexture(texturePath);}}
c3dl.Collada.prototype.setMaterial=function(material){if(this.isReady()){this.sceneGraph.setMaterial(material);}}
c3dl.Collada.prototype.setEffect=function(effect){this.sceneGraph.setEffect(effect);}
c3dl.Collada.prototype.rotateOnAxis=function(axisVec,angle){if(this.isReady()){this.sceneGraph.rotateOnAxis(axisVec,angle);this.boundingbox.rotateOnAxis(axisVec,angle);}}
c3dl.Collada.prototype.yaw=function(angle){if(this.isReady()){this.sceneGraph.yaw(angle);this.boundingbox.rotateOnAxis(this.sceneGraph.up,angle);}}
c3dl.Collada.prototype.pitch=function(angle){if(this.isReady()){this.sceneGraph.pitch(angle);this.boundingbox.rotateOnAxis(this.sceneGraph.left,angle);}}
c3dl.Collada.prototype.isReady=function(){return this.sceneGraph!=null?true:false;}
c3dl.Collada.prototype.roll=function(angle){if(this.isReady()){this.sceneGraph.roll(angle);this.boundingbox.rotateOnAxis(this.sceneGraph.dir,angle);}}
c3dl.Collada.prototype.getCopy=function(){var collada=new Collada();collada.clone(this);return collada;}
c3dl.Collada.prototype.getTransform=function(){if(this.sceneGraph){return this.sceneGraph.getTransform();}}
c3dl.Collada.prototype.clone=function(other){c3dl._super(this,arguments,"clone");this.path=other.path;this.sceneGraph=other.sceneGraph.getCopy();this.boundingbox=other.boundingbox.getCopy();}
c3dl.Collada.prototype.rayIntersectsEnclosures=function(rayOrigin,rayDir){var result=this.sceneGraph.rayIntersectsEnclosures(rayOrigin,rayDir);return result;}
c3dl.Collada.prototype.getObjectType=function(){return c3dl.COLLADA;}
c3dl.Collada.prototype.rayIntersectsTriangles=function(rayOrigin,rayDir){c3dl.pushMatrix();c3dl.loadIdentity();var result=this.sceneGraph.rayIntersectsTriangles(rayOrigin,rayDir);c3dl.popMatrix();return result;}
c3dl.Collada.prototype.getBoundingSpheres=function(){return this.sceneGraph.getBoundingSpheres();}
c3dl.Collada.prototype.getHeight=function(){if(this.isReady()){return this.boundingbox.getHeight();}}
c3dl.Collada.prototype.getWidth=function(){if(this.isReady()){return this.boundingbox.getWidth();}}
c3dl.Collada.prototype.getLength=function(){if(this.isReady()){return this.boundingbox.getLength();}}
c3dl.Collada.prototype.setHeight=function(height){var curheight=this.getHeight();var scaleVec=[];if(curheight>height){scaleVec=[1,(1/(curheight/height)),1];}
else if(curheight<height){scaleVec=[1,(height/curheight),1];}
else{scaleVec[1,1,1];}
this.boundingbox.scale(scaleVec);this.sceneGraph.scale(scaleVec);}
c3dl.Collada.prototype.setLength=function(length){var curlength=this.getLength();var scaleVec=[];if(curlength>length){scaleVec=[(1/(curlength/length)),1,1];}
else if(curlength<length){scaleVec=[(length/curlength),1,1];}
else{scaleVec[1,1,1];}
this.boundingbox.scale(scaleVec);this.sceneGraph.scale(scaleVec);}
c3dl.Collada.prototype.setWidth=function(width){var curwidth=this.getWidth();var scaleVec=[];if(curwidth>width){scaleVec=[1,1,(1/(curwidth/width))];}
else if(curwidth<width){scaleVec=[1,1,(width/curwidth)];}
else{scaleVec[1,1,1];}
this.boundingbox.scale(scaleVec);this.sceneGraph.scale(scaleVec);}
c3dl.Collada.prototype.setSize=function(length,width,height){length=parseFloat(length);width=parseFloat(width);height=parseFloat(height);var curlength=this.boundingbox.getLength();var curwidth=this.boundingbox.getWidth();var curheight=this.boundingbox.getHeight();var scaleVec=[];var vecL,vecW,vecH;if(curlength>length){vecL=(1/(curlength/length));}
else if(curlength<length){vecL=length/curlength;}
else{vecL=1;}
if(curheight>height){vecH=(1/(curheight/height));}
else if(curheight<height){vecH=(height/curheight);}
else{vecH=1;}
if(curwidth>width){vecW=(1/(curwidth/width));}
else if(curwidth<width){vecW=(width/curwidth);}
else{vecW=1;}
scaleVec=[vecL,vecH,vecW];this.scale(scaleVec);}
c3dl.Collada.prototype.setDrawBoundingBox=function(drawboundingbox){this.drawboundingbox=drawboundingbox;}
c3dl.Collada.prototype.getBoundingBox=function(){return this.boundingbox;}
c3dl.Collada.prototype.getBoundingBoxCorners=function(){return this.boundingbox.getCorners();}
c3dl.Collada.prototype.centerObject=function(){this.sceneGraph.center(this.boundingbox.realposition);this.boundingbox.center();}
c3dl.ColladaLoader=function()
{var XHR_STATE_COMPLETED=4;var xmlhttp=null;this.done=false;this.name="";this.rootNode=new c3dl.SceneNode();this.load=function(relativePath,rootNode)
{this.rootNode=rootNode;xmlhttp=new XMLHttpRequest();xmlhttp.parent=this;xmlhttp.callbackFunc=this.parse;xmlhttp.open("GET",relativePath,true);xmlhttp.overrideMimeType('text/xml');try
{xmlhttp.send(null);}
catch(err)
{c3dl.debug.logWarning("Could not find file '"+relativePath+"'. Check the path.");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==XHR_STATE_COMPLETED)
{if(xmlhttp.responseXML)
{xmlhttp.responseXML.colladaPath=relativePath;this.callbackFunc(xmlhttp.responseXML);}}}}
this.parseNodeRecursive=function(xmlObject,node,sgNode)
{var translateTag=c3dl.ColladaLoader.getChildNodesByNodeName(node,"translate");if(translateTag)
{var floatValues=c3dl.ColladaLoader.stringsToFloats(translateTag[0].childNodes[0].nodeValue,' ');if(xmlObject.upAxis&&xmlObject.upAxis=="Z_UP")
{var temp=floatValues[1];floatValues[1]=floatValues[2];floatValues[2]=-temp;}
else if(xmlObject.upAxis&&xmlObject.upAxis=="X_UP")
{var temp=floatValues[0];floatValues[0]=-floatValues[1];floatValues[1]=temp;}
sgNode.translate(floatValues);}
var rotationTags=c3dl.ColladaLoader.getChildNodesByNodeName(node,"rotate");if(rotationTags)
{for(var i=0,len=rotationTags.length;i<len;i++)
{var floatValues=c3dl.ColladaLoader.stringsToFloats(rotationTags[i].childNodes[0].nodeValue,' ');var vec=[floatValues[0],floatValues[1],floatValues[2]];if(xmlObject.upAxis&&xmlObject.upAxis=="Z_UP")
{var temp=vec[1];vec[1]=vec[2];vec[2]=-temp;}
else if(xmlObject.upAxis&&xmlObject.upAxis=="X_UP")
{var temp=vec[0];vec[0]=-vec[1];vec[1]=temp;}
var angle=c3dl.degreesToRadians(floatValues[3]);sgNode.rotateOnAxis(vec,angle);}}
var scaleTag=c3dl.ColladaLoader.getChildNodesByNodeName(node,"scale");if(scaleTag)
{var floatValues=c3dl.ColladaLoader.stringsToFloats(scaleTag[0].childNodes[0].nodeValue,' ');if(xmlObject.upAxis&&xmlObject.upAxis=="Z_UP")
{var temp=floatValues[1];floatValues[1]=floatValues[2];floatValues[2]=temp;}
if(xmlObject.upAxis&&xmlObject.upAxis=="X_UP")
{var temp=floatValues[0];floatValues[0]=floatValues[1];floatValues[1]=temp;}
sgNode.scale(floatValues);}
var matrixTag=c3dl.ColladaLoader.getChildNodesByNodeName(node,"matrix");if(matrixTag)
{var mat=c3dl.ColladaLoader.stringsToFloats(matrixTag[0].childNodes[0].nodeValue,' ');if(xmlObject.upAxis&&xmlObject.upAxis=="Z_UP")
{var temp=mat[7];mat[7]=mat[11];mat[11]=-temp;temp=mat[1];mat[1]=mat[2];mat[2]=temp;temp=mat[4];mat[4]=mat[8];mat[8]=temp;temp=mat[5];mat[5]=mat[10];mat[10]=temp;}
if(xmlObject.upAxis&&xmlObject.upAxis=="X_UP")
{var temp=mat[3];mat[3]=-mat[7];mat[7]=temp;temp=mat[0];mat[0]=mat[5];mat[5]=temp;temp=mat[2];mat[2]=mat[6];mat[6]=temp;temp=mat[8];mat[8]=mat[9];mat[9]=temp;}
sgNode.setTransform(c3dl.transposeMatrix(mat));}
var geometries=c3dl.ColladaLoader.getChildNodesByNodeName(node,"instance_geometry");if(geometries)
{for(var currGeo=0,len=geometries.length;currGeo<len;currGeo++)
{var url=geometries[currGeo].getAttribute("url").split('#')[1];sgNode.addChild(this.instantiateGeometry(xmlObject,url,geometries[currGeo]));}}
var instance_nodes=c3dl.ColladaLoader.getChildNodesByNodeName(node,"instance_node");if(instance_nodes)
{for(var currNode=0,len=instance_nodes.length;currNode<len;currNode++)
{var url=instance_nodes[currNode].getAttribute("url").split('#')[1];sgNode.addChild(this.instantiateNode(xmlObject,url));}}
var nodes=c3dl.ColladaLoader.getChildNodesByNodeName(node,"node");if(nodes)
{for(var i=0,len=nodes.length;i<len;i++)
{var scenenode=new c3dl.SceneNode();scenenode.setName(nodes[i].getAttribute("name"));sgNode.addChild(scenenode);this.parseNodeRecursive(xmlObject,nodes[i],scenenode);}}}
this.getChoice=function(parentTag,choiceTagNames)
{var choice=null;var i=0;while(choice==null&&i<choiceTagNames.length)
{choice=parentTag.getElementsByTagName(choiceTagNames[i])[0];i++;}
return choice;}
this.parse=function(xmlObject)
{var loader=this.parent;var root=xmlObject.documentElement;var library_images=root.getElementsByTagName("library_images");for(var libraryImagesIter=0,len=library_images.length;libraryImagesIter<len;libraryImagesIter++)
{var imageElements=library_images[libraryImagesIter].getElementsByTagName("image");for(var imageElementIter=0,len2=imageElements.length;imageElementIter<len2;imageElementIter++)
{var init_from=imageElements[imageElementIter].getElementsByTagName("init_from")[0];}}
var upAxisTag=root.getElementsByTagName("up_axis")[0];if(upAxisTag)
{xmlObject.upAxis=upAxisTag.childNodes[0].nodeValue;}
var sceneElement=root.getElementsByTagName("scene")[0];var instanceVisualSceneElem=sceneElement.getElementsByTagName("instance_visual_scene")[0];var visualSceneToLoad=instanceVisualSceneElem.getAttribute("url").split('#')[1];var libraryVisualScenes=root.getElementsByTagName("library_visual_scenes")[0];var visualSceneList=libraryVisualScenes.getElementsByTagName("visual_scene");var visualScene=null;for(var i=0,len=visualSceneList.length;i<len;i++)
{if(visualSceneList[i].getAttribute("id")==visualSceneToLoad)
{visualScene=visualSceneList[i];}}
var nodes=c3dl.ColladaLoader.getChildNodesByNodeName(visualScene,"node");if(nodes)
{for(var currNode=0,len=nodes.length;currNode<len;currNode++)
{var scenenode=new c3dl.SceneNode();loader.rootNode.addChild(scenenode);scenenode.setName(nodes[currNode].getAttribute("name"));loader.parseNodeRecursive(xmlObject,nodes[currNode],scenenode);}}
c3dl.ColladaQueue.popFront();delete xmlObject;delete xmlhttp;}
this.instantiateMaterial=function(xmlObject,target)
{var tempTexture=null;var material=this.findElementInLibrary(xmlObject,"library_materials","material",target);var tempName=target;var instanceEffect=material.getElementsByTagName("instance_effect")[0];var instanceEffectURL=instanceEffect.getAttribute("url").split('#')[1];var effect=this.findElementInLibrary(xmlObject,"library_effects","effect",instanceEffectURL);var profile_COMMON=effect.getElementsByTagName("profile_COMMON")[0];var technique=profile_COMMON.getElementsByTagName("technique")[0];var newparam=profile_COMMON.getElementsByTagName("newparam")[0];if(newparam)
{var surface=newparam.getElementsByTagName("surface")[0];var init_from=surface.getElementsByTagName("init_from")[0];var fileID=init_from.childNodes[0].nodeValue;var texture=this.findElementInLibrary(xmlObject,"library_images","image",fileID);var textureName=texture.getElementsByTagName("init_from")[0].childNodes[0].nodeValue;var resolvedTexture;if(c3dl.isPathAbsolute(textureName))
{resolvedTexture=textureName;}
else
{resolvedTexture=c3dl.getPathWithoutFilename(xmlObject.colladaPath)+textureName;}
tempTexture=resolvedTexture;}
var shadingAlgorithm=this.getChoice(technique,["blinn","constant","phong","lambert"]);var mat=new c3dl.Material();mat.setName(tempName);mat.setAmbient(this.getColor(shadingAlgorithm,"ambient"));mat.setDiffuse(this.getColor(shadingAlgorithm,"diffuse"));mat.setEmission(this.getColor(shadingAlgorithm,"emission"));mat.setSpecular(this.getColor(shadingAlgorithm,"specular"));mat.setShininess(this.getColor(shadingAlgorithm,"shininess"));return[mat,tempTexture];}
this.instantiateGeometry=function(xmlObject,url,instanceGeometryElement)
{var root=xmlObject.documentElement;var libraryGeometries=root.getElementsByTagName("library_geometries");var geoToCreate=null;var geometry=new c3dl.Geometry();for(var currLib=0,len=libraryGeometries.length;currLib<len;currLib++)
{var geometries=libraryGeometries[currLib].getElementsByTagName("geometry");for(var currGeo=0,len2=geometries.length;currGeo<len2;currGeo++)
{if(geometries[currGeo].getAttribute("id")==url)
{geoToCreate=geometries[currGeo];}}}
var verticesArray=null;var vertexStride;var normalsArray=null;var normalsStride;var texCoordsArray=null;var texCoordsStride;var faces=null;var rawFaces;var mesh=geoToCreate.getElementsByTagName("mesh")[0];var collations=[];for(var i=0,len=mesh.childNodes.length;i<len;i++)
{if(mesh.childNodes[i].nodeName=="triangles"||mesh.childNodes[i].nodeName=="polygons"||mesh.childNodes[i].nodeName=="polylist"||mesh.childNodes[i].nodeName=="lines")
{collations.push(mesh.childNodes[i]);}}
for(var currColl=0,len=collations.length;currColl<len;currColl++)
{if(collations[currColl].nodeName=="triangles"||collations[currColl].nodeName=="polylist"||collations[currColl].nodeName=="lines")
{var p=this.getFirstChildByNodeName(collations[currColl],"p");new C3DL_FLOAT_ARRAY(rawFaces=this.mergeChildData(p.childNodes).split(" "));}
else if(collations[currColl].nodeName=="polygons")
{var p_tags=collations[currColl].getElementsByTagName("p");var faces=[];for(var i=0;i<p_tags.length;i++)
{var p_line=p_tags[i].childNodes[0].nodeValue.split(" ");for(var j=0;j<p_line.length;j++)
{faces.push(parseInt(p_line[j]));}}
rawFaces=new C3DL_FLOAT_ARRAY(faces.length);for(var i=0;i<faces.length;i++){rawFaces[i]=faces[i];}}
else
{c3dl.debug.logError(collations[currColl].nodeName+" collation element is not yet supported");}
var inputs=collations[currColl].getElementsByTagName("input");collationElement=new c3dl.PrimitiveSet();for(var i=0,len2=inputs.length;i<len2;i++)
{if(inputs[i].getAttribute("semantic")=="VERTEX")
{this.vertexOffset=inputs[i].getAttribute("offset");this.vertexSource=inputs[i].getAttribute("source").split('#')[1];var vertices=c3dl.ColladaLoader.getNodeWithAttribute(xmlObject,"vertices","id",this.vertexSource);var input=vertices.getElementsByTagName("input")[0];var posSource=input.getAttribute("source").split('#')[1];var data=this.getData(xmlObject,"source","id",posSource);vertexStride=parseInt(data.stride);if(xmlObject.upAxis&&xmlObject.upAxis=="Z_UP")
{for(var vertIter=0,len3=data.values.length;vertIter<len3;vertIter+=vertexStride)
{var temp=data.values[vertIter+1];data.values[vertIter+1]=data.values[vertIter+2];data.values[vertIter+2]=-temp;}}
else if(xmlObject.upAxis&&xmlObject.upAxis=="X_UP")
{for(var vertIter=0,len3=data.values.length;vertIter<len3;vertIter+=vertexStride)
{var temp=data.values[vertIter];data.values[vertIter]=-data.values[vertIter+1];data.values[vertIter+1]=temp;}}
verticesArray=this.groupScalarsIntoArray(data.values,3,vertexStride);}
else if(inputs[i].getAttribute("semantic")=="NORMAL")
{this.normalOffset=inputs[i].getAttribute("offset");this.normalSource=inputs[i].getAttribute("source").split('#')[1];var data=this.getData(xmlObject,"source","id",this.normalSource);normalsStride=parseInt(data.stride);if(xmlObject.upAxis&&xmlObject.upAxis=="Z_UP")
{for(var vertIter=0,len3=data.values.length;vertIter<len3;vertIter+=normalsStride)
{var temp=data.values[vertIter+1];data.values[vertIter+1]=data.values[vertIter+2];data.values[vertIter+2]=-temp;}}
else if(xmlObject.upAxis&&xmlObject.upAxis=="X_UP")
{for(var vertIter=0,len3=data.values.length;vertIter<len3;vertIter+=normalsStride)
{var temp=data.values[vertIter];data.values[vertIter]=-data.values[vertIter+1];data.values[vertIter+1]=temp;}}
normalsArray=this.groupScalarsIntoArray(data.values,3,normalsStride);}
else if(inputs[i].getAttribute("semantic")=="TEXCOORD")
{this.texCoordOffset=inputs[i].getAttribute("offset");var uvSource=inputs[i].getAttribute("source").split('#')[1];var data=this.getData(xmlObject,"source","id",uvSource);texCoordsStride=parseInt(data.stride);for(var currUV=1,len3=data.values.length;currUV<len3;currUV+=texCoordsStride)
{data.values[currUV]=1-data.values[currUV];}
texCoordsArray=this.groupScalarsIntoArray(data.values,2,texCoordsStride);}}
if(collations[currColl].nodeName=="polylist")
{rawFaces=this.splitPolylist(collations[currColl],inputs.length,rawFaces);}
else if(collations[currColl].nodeName=="polygons")
{var partSize=inputs.length;var trianglesList=[];for(var currPrim=0,count=collations[currColl].getAttribute("count");currPrim<count;currPrim++)
{var partsArray=[];for(var currPart=0;currPart<4;currPart++)
{var part=[];for(currScalar=0,len2=inputs.length;currScalar<len2;currScalar++)
{part.push(rawFaces[(currPrim*inputs.length*4)+(currPart*partSize)+currScalar]);}
partsArray.push(part);}
for(var s=0,len2=partsArray[0].length;s<len2;s++)
{trianglesList.push(partsArray[0][s]);}
for(var s=0,len2=partsArray[1].length;s<len2;s++)
{trianglesList.push(partsArray[1][s]);}
for(var s=0,len2=partsArray[3].length;s<len2;s++)
{trianglesList.push(partsArray[3][s]);}
for(var s=0,len2=partsArray[3].length;s<len2;s++)
{trianglesList.push(partsArray[3][s]);}
for(var s=0,len2=partsArray[1].length;s<len2;s++)
{trianglesList.push(partsArray[1][s]);}
for(var s=0,len2=partsArray[2].length;s<len2;s++)
{trianglesList.push(partsArray[2][s]);}}
rawFaces=new C3DL_FLOAT_ARRAY(trianglesList);}
faces=this.groupScalarsIntoArray(rawFaces,inputs.length,inputs.length,collations[currColl].nodeName);collationElement.tempMaterial=collations[currColl].getAttribute("material");if(collations[currColl].nodeName!=="lines"){collationElement.init(this.expandFaces(faces,verticesArray,this.vertexOffset,vertexStride),this.expandFaces(faces,normalsArray,this.normalOffset,normalsStride),this.expandFaces(faces,texCoordsArray,this.texCoordOffset,2));}
else{collationElement.initLine(verticesArray,faces,collations[currColl].nodeName);}
geometry.addPrimitiveSet(collationElement);}
var bind_material=instanceGeometryElement.getElementsByTagName("bind_material")[0];if(bind_material)
{var technique_common=bind_material.getElementsByTagName("technique_common")[0];var instance_materials=technique_common.getElementsByTagName("instance_material");for(var im=0,len2=instance_materials.length;im<len2;im++)
{var target=instance_materials[im].getAttribute("target").split('#')[1];var symbol=instance_materials[im].getAttribute("symbol");var material=this.findElementInLibrary(xmlObject,"library_materials","material",target);var matAndTex=this.instantiateMaterial(xmlObject,target);var instanceMaterial=matAndTex[0];var tex=matAndTex[1];var GeoCollations=geometry.getPrimitiveSets();for(var ic=0,len=GeoCollations.length;ic<len;ic++)
{if(GeoCollations[ic].tempMaterial==symbol)
{GeoCollations[ic].setMaterial(instanceMaterial);GeoCollations[ic].setTexture(tex);}}}}
return geometry;}
this.instantiateNode=function(xmlObject,url)
{var root=xmlObject.documentElement;var libraryNodes=root.getElementsByTagName("library_nodes");var nodeToCreate=null;for(var currLib=0,len=libraryNodes.length;currLib<len;currLib++)
{var nodes=libraryNodes[currLib].getElementsByTagName("node");for(var currNode=0,len2=nodes.length;currNode<len2;currNode++)
{if(nodes[currNode].getAttribute("id")==url)
{nodeToCreate=nodes[currNode];}}}
var inode=new c3dl.SceneNode();inode.setName(nodeToCreate.getAttribute("name"));this.parseNodeRecursive(xmlObject,nodeToCreate,inode);return inode;}
this.groupScalarsIntoArray=function(rawScalarValues,numComponentsPerElement,stride)
{var listOfArrays=[];for(var i=0,len=rawScalarValues.length;i<len;i+=stride)
{var element=new C3DL_FLOAT_ARRAY(numComponentsPerElement);var counter=0;for(var j=i;j<i+numComponentsPerElement;j++)
{element[counter++]=rawScalarValues[j];}
listOfArrays.push(element);}
return listOfArrays;}
this.splitPolylist=function(collation,numInputs,rawFaces)
{var vcountNode=this.getFirstChildByNodeName(collation,"vcount");var vcountList=this.mergeChildData(vcountNode.childNodes).split(" ");var vcountIndex=0;var primOffset=0;var trianglesList=[];var partSize=numInputs;for(var currPrim=0,count=collation.getAttribute("count");currPrim<count;currPrim++,vcountIndex++)
{var partsArray=[];for(var currPart=0;currPart<vcountList[vcountIndex];currPart++)
{var part=[];for(currScalar=0;currScalar<numInputs;currScalar++)
{part.push(rawFaces[(primOffset*numInputs)+(currPart*numInputs)+currScalar]);}
partsArray.push(part);}
primOffset+=parseInt(vcountList[vcountIndex]);var last=1;var firstTriangle=true;for(var fanIndex=0;fanIndex<vcountList[vcountIndex]-1;)
{for(var s=0,len=partsArray[0].length;s<len;s++)
{trianglesList.push(partsArray[0][s]);}
fanIndex++;for(var s=0,len=partsArray[0].length;s<len;s++)
{trianglesList.push(partsArray[last][s]);}
if(firstTriangle)
{fanIndex++;firstTriangle=false;}
for(var s=0,len=partsArray[0].length;s<len;s++)
{trianglesList.push(partsArray[fanIndex][s]);}
last=fanIndex;}}
return new C3DL_FLOAT_ARRAY(trianglesList);}
this.findElementInLibrary=function(xmlObject,libraryName,elementName,elementAttributeId)
{var libraries=xmlObject.getElementsByTagName(libraryName);for(libraryIter=0,len=libraries.length;libraryIter<len;libraryIter++)
{var elements=libraries[libraryIter].getElementsByTagName(elementName);for(elementIter=0,len2=elements.length;elementIter<len2;elementIter++)
{if(elementAttributeId==elements[elementIter].getAttribute("id"))
{return elements[elementIter];}}}
return null;}
this.getData=function(xmlObject,nodeName,attributeKey,attributeValue)
{var data=new Object();var nsrc=c3dl.ColladaLoader.getNodeWithAttribute(xmlObject,"source","id",attributeValue);var tech_common=nsrc.getElementsByTagName("technique_common")[0];var accessor=tech_common.getElementsByTagName("accessor")[0];data.stride=accessor.getAttribute("stride");var accessorSrc=accessor.getAttribute("source").split("#")[1];var float_array=c3dl.ColladaLoader.getNodeWithAttribute(xmlObject,"float_array","id",accessorSrc);data.values=new C3DL_FLOAT_ARRAY(this.mergeChildData(float_array.childNodes).split(" "));return data;}
this.expandFaces=function(faces,array,offset,numComponentsToExpand)
{var expandedArray=new C3DL_FLOAT_ARRAY(faces.length*3);var counter=0;var face;var coordIndex;var coord;var floatValue;for(var currFace=0,len=faces.length;currFace<len;currFace++)
{for(var currComp=0;currComp<numComponentsToExpand;currComp++)
{face=faces[currFace];coordIndex=face[offset];if(array){coord=array[coordIndex][currComp];}
expandedArray[counter++]=coord;}}
return expandedArray;}
this.doneLoading=function()
{return this.done;}
this.getColor=function(node,str)
{var component=node!=null?node.getElementsByTagName(str)[0]:null;var returnValue=[0,0,0];if(component)
{var value=this.getChoice(component,["color","float","texture"]);if(value.nodeName=="color")
{returnValue=[];for(var currNode=0,len=value.childNodes.length;currNode<len;currNode++)
{returnValue+=value.childNodes[currNode].nodeValue;}
returnValue=returnValue.split(" ");returnValue=[parseFloat(returnValue[0]),parseFloat(returnValue[1]),parseFloat(returnValue[2])];returnValue=returnValue.slice(0,3);}
else if(value.nodeName=="float")
{returnValue=parseFloat(value.childNodes[0].nodeValue);}
else if(value.nodeName=="texture")
{returnValue=[1,1,1];}}
return returnValue;}
this.mergeChildData=function(childNodes)
{var values=[];for(var currNode=0,len=childNodes.length;currNode<len;currNode++)
{values+=childNodes[currNode].nodeValue;}
return values.replace(/\s+$/,'');}
this.getFirstChildByNodeName=function(searchNode,nodeName)
{for(var i=0,len=searchNode.childNodes.length;i<len;i++)
{if(searchNode.childNodes[i].nodeName==nodeName)
{return searchNode.childNodes[i];}}
return null;}}
c3dl.ColladaLoader.getNodeWithAttribute=function(xmlObject,nodeName,attributeKey,attributeValue)
{var nodeFound;var root=xmlObject.documentElement;var elements=root.getElementsByTagName(nodeName);for(var i=0,len=elements.length;i<len;i++)
{if(elements[i].getAttribute(attributeKey)==attributeValue)
{nodeFound=elements[i];}}
return nodeFound;}
c3dl.ColladaLoader.getChildNodesByNodeName=function(searchNode,nodeName)
{var children=[];var foundOne=false;if(searchNode.childNodes.length>0)
{for(var i=0,len=searchNode.childNodes.length;i<len;i++)
{if(searchNode.childNodes[i].nodeName==nodeName)
{children.push(searchNode.childNodes[i]);foundOne=true;}}}
if(foundOne==false)
{children=null;}
return children;}
c3dl.ColladaLoader.stringsToFloats=function(numbers,delimeter)
{var floatValues=[];var trimmedNumbers=numbers.replace(/^\s+/,'');trimmedNumbers=trimmedNumbers.replace(/\s+$/,'');trimmedNumbers=trimmedNumbers.replace(/\s+/g,' ');var strValues=trimmedNumbers.split(delimeter);for(var i=0,len=strValues.length;i<len;i++)
{floatValues.push(parseFloat(strValues[i]));}
return floatValues;}
c3dl.ColladaManager={};c3dl.ColladaManager.keys=[];c3dl.ColladaManager.values=[];c3dl.ColladaManager.loadFile=function(filePath)
{if(c3dl.ColladaManager.isFileLoaded(filePath)==false)
{var rootNode=new c3dl.SceneNode();var colladaLoader=new c3dl.ColladaLoader();colladaLoader.load(filePath,rootNode);c3dl.ColladaManager.keys.push(filePath);c3dl.ColladaManager.values.push(rootNode);}}
c3dl.ColladaManager.getSceneGraphCopy=function(filePath)
{if(c3dl.ColladaManager.isFileLoaded(filePath))
{var i=c3dl.ColladaManager.getIndex(filePath);var sg=c3dl.ColladaManager.values[i].getCopy();return sg;}}
c3dl.ColladaManager.isFileLoaded=function(filePath)
{return c3dl.ColladaManager.getIndex(filePath)!=-1?true:false;}
c3dl.ColladaManager.getIndex=function(filePath)
{var index=-1;for(var i=0,len=c3dl.ColladaManager.values.length;i<len;i++)
{if(filePath==c3dl.ColladaManager.keys[i])
{index=i;break;}}
return index;}
c3dl.ColladaQueue={queue:[],firstTime:true,isEmpty:function()
{return(c3dl.ColladaQueue.queue.length==0?true:false);},pushBack:function(colladaInstance)
{c3dl.ColladaQueue.queue.push(colladaInstance);if(c3dl.ColladaQueue.firstTime)
{c3dl.ColladaQueue.firstTime=false;c3dl.ColladaManager.loadFile(c3dl.ColladaQueue.queue[0].path);}},popFront:function()
{c3dl.ColladaQueue.queue.shift();if(c3dl.ColladaQueue.isEmpty()==false)
{c3dl.ColladaManager.loadFile(c3dl.ColladaQueue.queue[0].path);}
else if(c3dl.ColladaQueue.isEmpty()==true&&c3dl.mainCallBacks.length==0)
{c3dl.removeProgressBars();}
else if(c3dl.ColladaQueue.isEmpty()==true&&c3dl.mainCallBacks.length!=0)
{c3dl.removeProgressBars();for(var i=0,len=c3dl.mainCallBacks.length;i<len;i++)
{var func=c3dl.mainCallBacks[i].f;var tag=c3dl.mainCallBacks[i].t;func(tag);}}},getFront:function()
{return c3dl.ColladaQueue.queue[0];}};c3dl.Geometry=function(){this.primitiveSets=[];this.effect=null;this.firstTimeRender=true;this.addPrimitiveSet=function(primitiveSet){this.primitiveSets.push(primitiveSet);}
this.clone=function(other){for(var i=0,len=other.primitiveSets.length;i<len;i++){this.primitiveSets.push(other.primitiveSets[i].getCopy());}}
this.getCopy=function(){var geometry=new c3dl.Geometry();geometry.clone(this);return geometry;}
this.getEffect=function(){return this.effect;}
this.getPrimitiveSets=function(){return this.primitiveSets;}
this.rayIntersectsEnclosures=function(rayOrigin,rayDir){for(var i=0,len=this.primitiveSets.length;i<len;i++){if(this.getPrimitiveSets()[i].getType()!=="lines"){var bs=this.primitiveSets[i].getBoundingSphere();var pos=bs.getPosition();var radius=bs.getRadius();if(c3dl.rayIntersectsSphere(rayOrigin,rayDir,pos,radius)){return true;}}}
return false;}
this.rayIntersectsTriangles=function(rayOrigin,rayDir){var mat=c3dl.inverseMatrix(c3dl.peekMatrix());var rayorigin=c3dl.multiplyMatrixByVector(mat,rayOrigin);var raydir=c3dl.normalizeVector(c3dl.multiplyMatrixByDirection(mat,rayDir));var vert1=new C3DL_FLOAT_ARRAY(3);var vert2=new C3DL_FLOAT_ARRAY(3);var vert3=new C3DL_FLOAT_ARRAY(3);for(var i=0,len=this.primitiveSets.length;i<len;i++){if(this.getPrimitiveSets()[i].getType()!=="lines"){var vertices=this.primitiveSets[i].getVertices();for(var j=0,len2=vertices.length;j<len2;j+=9){vert1[0]=vertices[j];vert1[1]=vertices[j+1]
vert1[2]=vertices[j+2];vert2[0]=vertices[j+3];vert2[1]=vertices[j+4];vert2[2]=vertices[j+5];vert3[0]=vertices[j+6];vert3[1]=vertices[j+7];vert3[2]=vertices[j+8];if(c3dl.rayIntersectsTriangle(rayorigin,raydir,vert1,vert2,vert3)){return true;}}}}
return false;}
this.render=function(glCanvas3D,scene){if(glCanvas3D==null){c3dl.debug.logWarning('Geometry::render() called with a null glCanvas3D');return false;}
if(this.getPrimitiveSets()[0].getType()==="lines"){scene.getRenderer().renderLines(this.getPrimitiveSets()[0].getLines());}
else{if(this.firstTimeRender==true){for(var i=0,len=this.primitiveSets.length;i<len;i++){this.primitiveSets[i].setupVBO(glCanvas3D);}
this.firstTimeRender=false;}
scene.getRenderer().renderGeometry(this);if(scene.getBoundingVolumeVisibility()){for(var i=0,len=this.primitiveSets.length;i<len;i++){var bs=this.primitiveSets[i].getBoundingSphere();if(bs){bs.render(scene);}}}}}
this.setEffect=function(effect){this.effect=effect;}
this.setMaterial=function(material){for(var i=0,len=this.primitiveSets.length;i<len;i++){this.primitiveSets[i].setMaterial(material);}}
this.setTexture=function(texture){for(var i=0,len=this.primitiveSets.length;i<len;i++){this.primitiveSets[i].setTexture(texture);}}
this.update=function(timeStep,scaleVec,rotateMat){for(var i=0,len=this.primitiveSets.length;i<len;i++){var bs=this.primitiveSets[i].getBoundingSphere();if(bs){var test=c3dl.peekMatrix();bs.setPosition([test[12],test[13],test[14]]);bs.scale(scaleVec);bs.moveCenter(rotateMat);}}}}
c3dl.PrimitiveSet=function()
{this.material=null;this.texture=null;this.vertices=null;this.normals=null;this.texCoords=null;this.type=null;this.lineList=null;this.boundingSphere=null;this.buffers={};this.init=function(vertices,normals,texCoords,type)
{this.vertices=vertices;this.normals=normals;this.texCoords=texCoords;this.boundingSphere=new c3dl.BoundingSphere();this.type=type;this.boundingSphere.init(this.vertices);}
this.initLine=function(vertices,faces,type)
{this.vertices=[];this.lineList=[];for(var i=0;i<vertices.length;i++){var xyz=[];xyz[0]=parseFloat(vertices[i][0]);xyz[1]=parseFloat(vertices[i][1]);xyz[2]=parseFloat(vertices[i][2]);this.vertices.push(xyz[0]);this.vertices.push(xyz[1]);this.vertices.push(xyz[2]);}
this.type=type;for(var i=0;i<faces.length;i+=2){var line=new c3dl.Line();var start=faces[i][0];var end=faces[i+1][0];line.setCoordinates([this.vertices[start*3],this.vertices[start*3+1],this.vertices[start*3+2]],[this.vertices[end*3],this.vertices[end*3+1],this.vertices[end*3+2]]);this.lineList.push(line);}}
this.setupVBO=function(glCanvas3D)
{this.buffers.vertices=glCanvas3D.createBuffer();this.buffers.normals=glCanvas3D.createBuffer();this.buffers.texCoords=glCanvas3D.createBuffer();glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.buffers.vertices);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.vertices,glCanvas3D.STATIC_DRAW);glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.buffers.normals);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.normals,glCanvas3D.STATIC_DRAW);glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.buffers.texCoords);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.texCoords,glCanvas3D.STATIC_DRAW);}
this.getVBOVertices=function()
{return this.buffers.vertices;}
this.getVBONormals=function()
{return this.buffers.normals;}
this.getVBOTexCoords=function()
{return this.buffers.texCoords;}
this.getCopy=function()
{var copy=new c3dl.PrimitiveSet();copy.vertices=this.vertices;copy.normals=this.normals;copy.texCoords=this.texCoords;copy.texture=this.texture;copy.lineList=this.lineList;copy.type=this.type;copy.material=this.material?this.material.getCopy():null;if(this.boundingSphere){copy.boundingSphere=this.boundingSphere.getCopy();}
return copy;}
this.getTexture=function()
{return this.texture;}
this.getVertices=function()
{return this.vertices;}
this.getNormals=function()
{return this.normals;}
this.getTexCoords=function()
{return this.texCoords;}
this.getMaterial=function()
{return this.material;}
this.getBoundingSphere=function()
{return this.boundingSphere;}
this.setMaterial=function(material)
{this.material=material;}
this.setTexture=function(texture)
{this.texture=texture;}
this.getLines=function()
{return this.lineList;}
this.getType=function()
{return this.type;}}
c3dl.Effect=function()
{this.effectTemplate=null;this.instanceParams=[];this.isInitialized=false;this.init=function(effectTemplate)
{var check=true;if(check||effectTemplate instanceof c3dl.EffectTemplate)
{this.effectTemplate=effectTemplate;this.instanceParams=c3dl.copyObj(effectTemplate.getParameters());this.isInitialized=true;}
else
{c3dl.debug.logWarning("Invalid argument passed to c3dl.Effect's init().");}}
this.getEffectTemplate=function()
{return this.effectTemplate;}
this.getParameter=function(paramName)
{var isFound=false;var returnVal=null;for(var i=0,len=this.instanceParams.length;i<len;i++)
{if(this.instanceParams[i].name==paramName)
{isFound=true;returnVal=this.instanceParams[i].value;}}
if(!isFound)
{c3dl.debug.logWarning("Effect getParameter(): '"+paramName+"' does not exist.");}
return returnVal;}
this.setParameter=function(paramName,paramValue)
{if(this.isInitialized==false)
{c3dl.debug.logWarning("Effect must be initialized with init() "+"before setting its parameters.");}
else
{var isFound=false;for(var i=0,len=this.instanceParams.length;!isFound&&i<len;i++)
{if(paramName==this.instanceParams[i].name)
{isFound=true;if(paramValue.constructor==this.instanceParams[i].type)
{this.instanceParams[i].value=paramValue;}
else
{c3dl.debug.logWarning("The value '"+paramValue+"' cannot be assigned "+"to parameter '"+paramName+"' because it is the "+"incorrect type. Check the c3dl.effects documentation "+" for the correct type.");}}}
if(!isFound)
{c3dl.debug.logWarning("Effect setParameter(): '"+paramName+"' does not exist.");}}}}
c3dl.effects={};c3dl.effects.STD_EFFECT=0;c3dl.effects.SOLID_COLOR=0;c3dl.effects.GOOCH=0;c3dl.effects.CARTOON=0;c3dl.effects.SEPIA=0;c3dl.effects.GREYSCALE=0;c3dl.effects.STANDARD=1;c3dl.EffectTemplate=function()
{this.vertexShaders=[];this.fragmentShaders=[];this.isInitialized=false;this.params=[];this.renderingCB=null;this.programObjects=[];this.init=function()
{var rc=false;if(this.isInitialized==false)
{if(this.renderingCB&&this.vertexShaders.length>0&&this.fragmentShaders.length>0)
{this.isInitialized=true;rc=true;}}
return rc;}
this.addFragmentShader=function(fragmentShader)
{if(this.isInitialized==false)
{if(fragmentShader&&typeof(fragmentShader)=="string")
{this.fragmentShaders.push(fragmentShader);}
else
{c3dl.debug.logWarning("Invalid argument passed to Effect's addFragmentShader().");}}}
this.addParameter=function(paramName,paramType,paramDefaultValue)
{if(this.isInitialized==false)
{if(paramName&&typeof(paramName)=="string")
{var val;if(paramType==Array)
{val=c3dl.copyObj(paramDefaultValue);}
else
{val=paramDefaultValue;}
this.params.push({name:paramName,type:paramType,value:val});}
else
{c3dl.debug.logWarning("Invalid argument(s) passed to Effect's addParameter().");}}
else
{c3dl.debug.logWarning("Effect addParameter(): cannot be called once an effect has been initialized.");}}
this.addVertexShader=function(vertexShader)
{if(this.isInitialized==false)
{if(vertexShader&&typeof(vertexShader)=="string")
{this.vertexShaders.push(vertexShader);}
else
{c3dl.debug.logWarning("Invalid argument passed to Effect's addVertexShader().");}}}
this.getVertexShaders=function()
{return this.vertexShaders;}
this.getParameters=function()
{var ret=[];for(var i=0,len=this.params.length;i<len;i++)
{var val;if(typeof this.params[i].value=="Array")
{val=c3dl.copyObj(this.params[i].value);}
else
{val=this.params[i].value;}
ret.push({name:this.params[i].name,type:this.params[i].type,value:val});}
return ret;}
this.getFragmentShaders=function()
{return this.fragmentShaders;}
this.getRenderingCallback=function()
{return this.renderingCB;}
this.setRenderingCallback=function(func)
{if(this.isInitialized==false)
{if(func instanceof Function)
{this.renderingCB=func;}
else
{c3dl.debug.logWarning("Invalid argument passed to Effect's setRenderingCB().");}}}
this.getProgramID=function(rendererID)
{var programID=-1;var found=false;for(var i=0,len=this.programObjects.length;found==false&&i<len;i++)
{if(found===false)
{if(rendererID==this.programObjects[i].getRendererID())
{found=true;programID=this.programObjects[i].getProgramID();}}}
return programID;}
this.addProgramObject=function(programObject)
{this.programObjects.push(programObject);}
this.toString=function(delimiter)
{if(!delimiter&&typeof(delimiter)!="string")
{delimiter=",";}
return"Initialized = "+this.isInitialized+delimiter+"Vertex Shaders = "+
this.vertexShaders+delimiter+"Fragment Shaders = "+this.fragmentShaders+
delimiter+"Rendering Callback = "+this.renderingCB+delimiter+"Parameters = "+
this.parameters;}}
c3dl.BoundingBox=function()
{this.length=0;this.height=0;this.width=0;this.boxverts=[];this.lineList=[];this.maxMins=[];this.realposition=[];this.position=[0,0,0];this.init=function(vertices)
{if(vertices){vertices=new C3DL_FLOAT_ARRAY(vertices);var lengthVerts=new C3DL_FLOAT_ARRAY(vertices.length/3),widthVerts=new C3DL_FLOAT_ARRAY(vertices.length/3),heightVerts=new C3DL_FLOAT_ARRAY(vertices.length/3),j=0;var j=0;for(var i=0;i<vertices.length/3;i++){lengthVerts[i]=vertices[j];heightVerts[i]=vertices[j+1];widthVerts[i]=vertices[j+2];j+=3}
this.maxMins[0]=c3dl.findMax(lengthVerts);this.maxMins[1]=c3dl.findMin(lengthVerts);this.maxMins[2]=c3dl.findMax(heightVerts);this.maxMins[3]=c3dl.findMin(heightVerts);this.maxMins[4]=c3dl.findMax(widthVerts);this.maxMins[5]=c3dl.findMin(widthVerts);this.realposition[0]=(this.maxMins[0]+this.maxMins[1])/2;this.realposition[1]=(this.maxMins[2]+this.maxMins[3])/2;this.realposition[2]=(this.maxMins[4]+this.maxMins[5])/2;this.length=this.maxMins[0]-this.maxMins[1];this.height=this.maxMins[2]-this.maxMins[3];this.width=this.maxMins[4]-this.maxMins[5];}
for(var i=0;i<12;i++){this.lineList[i]=new c3dl.Line();this.lineList[i].setWidth(2);}
this.boxverts[0]=[this.maxMins[1],this.maxMins[3],this.maxMins[5]];this.boxverts[1]=[this.maxMins[1],this.maxMins[3],this.maxMins[4]];this.boxverts[2]=[this.maxMins[0],this.maxMins[3],this.maxMins[5]];this.boxverts[3]=[this.maxMins[0],this.maxMins[3],this.maxMins[4]];this.boxverts[4]=[this.maxMins[1],this.maxMins[2],this.maxMins[5]];this.boxverts[5]=[this.maxMins[1],this.maxMins[2],this.maxMins[4]];this.boxverts[6]=[this.maxMins[0],this.maxMins[2],this.maxMins[5]];this.boxverts[7]=[this.maxMins[0],this.maxMins[2],this.maxMins[4]];}
this.setPosition=function(position)
{for(var i=0;i<8;i++){this.boxverts[i]=c3dl.subtractVectors(this.boxverts[i],this.position);}
this.position=[position[0],position[1],position[2]];this.realposition=[position[0]-this.realposition[0],position[1]-this.realposition[1],position[2]-this.realposition[2]];for(var i=0;i<8;i++){this.boxverts[i]=c3dl.addVectors(this.boxverts[i],this.position);}}
this.scale=function(scaleVec)
{this.length=this.length*scaleVec[0];this.height=this.height*scaleVec[1];this.width=this.width*scaleVec[2];for(var i=0;i<8;i++){this.boxverts[i]=c3dl.subtractVectors(this.boxverts[i],this.position);}
for(var i=0;i<8;i++){this.boxverts[i]=c3dl.multiplyVectorByVector(this.boxverts[i],scaleVec);}
for(var i=0;i<8;i++){this.boxverts[i]=c3dl.addVectors(this.boxverts[i],this.position);}}
this.rotateOnAxis=function(axisVec,angle)
{var rotateOnAxisQuat=c3dl.makeQuat(0,0,0,0);var rotateOnAxisMat=c3dl.makeZeroMatrix();if(!c3dl.isValidVector(axisVec))
{c3dl.debug.logWarning('Actor::rotateOnAxis() called with the first parameter not a vector');return;}
if(isNaN(angle))
{c3dl.debug.logWarning('Actor::rotateOnAxis() called with the second parameter not a number');return;}
if(angle==0)
{return;}
c3dl.axisAngleToQuat(axisVec,angle,rotateOnAxisQuat);rotateOnAxisMat=c3dl.quatToMatrix(rotateOnAxisQuat);for(var i=0;i<8;i++){this.boxverts[i]=c3dl.subtractVectors(this.boxverts[i],this.position);}
for(var i=0;i<8;i++){c3dl.multiplyMatrixByVector(rotateOnAxisMat,this.boxverts[i],this.boxverts[i]);}
for(var i=0;i<8;i++){this.boxverts[i]=c3dl.addVectors(this.boxverts[i],this.position);}}
this.getHeight=function()
{return this.height;}
this.getLength=function()
{return this.length;}
this.getWidth=function()
{return this.width;}
this.getPosition=function()
{return c3dl.subtractVectors(this.position,this.realposition);}
this.render=function(scene)
{this.lineList[0].setCoordinates(this.boxverts[0],this.boxverts[2]);this.lineList[1].setCoordinates(this.boxverts[0],this.boxverts[4]);this.lineList[2].setCoordinates(this.boxverts[4],this.boxverts[6]);this.lineList[3].setCoordinates(this.boxverts[6],this.boxverts[2]);this.lineList[4].setCoordinates(this.boxverts[1],this.boxverts[3]);this.lineList[5].setCoordinates(this.boxverts[1],this.boxverts[5]);this.lineList[6].setCoordinates(this.boxverts[5],this.boxverts[7]);this.lineList[7].setCoordinates(this.boxverts[7],this.boxverts[3]);this.lineList[8].setCoordinates(this.boxverts[0],this.boxverts[1]);this.lineList[9].setCoordinates(this.boxverts[2],this.boxverts[3]);this.lineList[10].setCoordinates(this.boxverts[4],this.boxverts[5]);this.lineList[11].setCoordinates(this.boxverts[6],this.boxverts[7]);scene.getRenderer().renderLines(this.lineList);}
this.getCorners=function()
{return[[(this.boxverts[0][0]).toFixed(2),(this.boxverts[0][2]).toFixed(2)],[(this.boxverts[1][0].toFixed(2)),(this.boxverts[1][2]).toFixed(2)],[(this.boxverts[2][0]).toFixed(2),(this.boxverts[2][2]).toFixed(2)],[(this.boxverts[3][0]).toFixed(2),(this.boxverts[3][2]).toFixed(2)]];}
this.getCopy=function()
{var copy=new c3dl.BoundingBox();copy.length=this.length;copy.height=this.height;copy.width=this.width;copy.boxverts=c3dl.copyObj(this.boxverts);copy.lineList=c3dl.copyObj(this.lineList);copy.maxMins=c3dl.copyObj(this.maxMins);copy.realposition=c3dl.copyObj(this.realposition);copy.position=c3dl.copyObj(this.position);return copy;}
this.center=function()
{this.boxverts[0]=[this.boxverts[0][0]-this.realposition[0],this.boxverts[0][1]-this.realposition[1],this.boxverts[0][2]-this.realposition[2]];this.boxverts[1]=[this.boxverts[1][0]-this.realposition[0],this.boxverts[1][1]-this.realposition[1],this.boxverts[1][2]-this.realposition[2]];this.boxverts[2]=[this.boxverts[2][0]-this.realposition[0],this.boxverts[2][1]-this.realposition[1],this.boxverts[2][2]-this.realposition[2]];this.boxverts[3]=[this.boxverts[3][0]-this.realposition[0],this.boxverts[3][1]-this.realposition[1],this.boxverts[3][2]-this.realposition[2]];this.boxverts[4]=[this.boxverts[4][0]-this.realposition[0],this.boxverts[4][1]-this.realposition[1],this.boxverts[4][2]-this.realposition[2]];this.boxverts[5]=[this.boxverts[5][0]-this.realposition[0],this.boxverts[5][1]-this.realposition[1],this.boxverts[5][2]-this.realposition[2]];this.boxverts[6]=[this.boxverts[6][0]-this.realposition[0],this.boxverts[6][1]-this.realposition[1],this.boxverts[6][2]-this.realposition[2]];this.boxverts[7]=[this.boxverts[7][0]-this.realposition[0],this.boxverts[7][1]-this.realposition[1],this.boxverts[7][2]-this.realposition[2]];}}
c3dl.BoundingSphere=function()
{this.longestVector=c3dl.makeVector(0,0,0);this.original=c3dl.makeVector(0,0,0);this.position=c3dl.makeVector(0,0,0);this.center=c3dl.makeVector(0,0,0);this.radius=0;this.maxMins=new C3DL_FLOAT_ARRAY(6)
this.init=function(vertices)
{var longestLengthFound=0;var vector=c3dl.makeVector(0,0,0);var currVector;lengthVerts=new C3DL_FLOAT_ARRAY(vertices.length/3),heightVerts=new C3DL_FLOAT_ARRAY(vertices.length/3),widthVerts=new C3DL_FLOAT_ARRAY(vertices.length/3);var j=0;for(var i=0,len=vertices.length/3;i<len;i++){lengthVerts[i]=vertices[j];heightVerts[i]=vertices[j+1];widthVerts[i]=vertices[j+2];j+=3}
this.maxMins[0]=c3dl.findMax(lengthVerts);this.maxMins[1]=c3dl.findMin(lengthVerts);this.maxMins[2]=c3dl.findMax(heightVerts);this.maxMins[3]=c3dl.findMin(heightVerts);this.maxMins[4]=c3dl.findMax(widthVerts);this.maxMins[5]=c3dl.findMin(widthVerts);this.center[0]=(this.maxMins[0]+this.maxMins[1])/2;this.center[1]=(this.maxMins[2]+this.maxMins[3])/2;this.center[2]=(this.maxMins[4]+this.maxMins[5])/2;for(var i=0;i<vertices.length;i+=3)
{vector[0]=vertices[i+0];vector[1]=vertices[i+1];vector[2]=vertices[i+2];c3dl.subtractVectors(vector,this.center,vector);currVector=c3dl.vectorLength(vector);if(currVector>longestLengthFound)
{longestLengthFound=currVector;this.longestVector=[vector[0],vector[1],vector[2]];}}
this.original[0]=this.longestVector[0];this.original[1]=this.longestVector[1];this.original[2]=this.longestVector[2];this.radius=c3dl.vectorLength(this.longestVector);}
this.setPosition=function(position)
{this.position[0]=position[0]+this.center[0];this.position[1]=position[1]+this.center[1];this.position[2]=position[2]+this.center[2];}
this.getTransform=function()
{var mat=c3dl.makePoseMatrix([1,0,0],[0,1,0],[0,0,1],this.position);var smat=c3dl.makeMatrix();c3dl.setMatrix(smat,this.radius,0,0,0,0,this.radius,0,0,0,0,this.radius,0,0,0,0,1);mat=c3dl.multiplyMatrixByMatrix(mat,smat);return mat;}
this.scale=function(scaleVec)
{var largestScale=scaleVec[0]>scaleVec[1]?scaleVec[0]:scaleVec[1];largestScale=largestScale>scaleVec[2]?largestScale:scaleVec[2];this.longestVector[0]=this.original[0]*largestScale;this.longestVector[1]=this.original[1]*largestScale;this.longestVector[2]=this.original[2]*largestScale;this.center[0]=(this.maxMins[0]*largestScale+this.maxMins[1]*largestScale)/2;this.center[1]=(this.maxMins[2]*largestScale+this.maxMins[3]*largestScale)/2;this.center[2]=(this.maxMins[4]*largestScale+this.maxMins[5]*largestScale)/2;this.radius=c3dl.vectorLength(this.longestVector);}
this.render=function(scene)
{if(scene.getBoundingVolumeVisibility())
{scene.getRenderer().renderBoundingSphere(this,scene.getCamera().getViewMatrix());}}
this.moveCenter=function(rotateMat)
{this.center=c3dl.multiplyMatrixByVector(rotateMat,this.center);}
this.getRadius=function()
{return this.radius;}
this.getMaxMins=function()
{return this.maxMins;}
this.getPosition=function()
{return c3dl.copyVector(this.position);}
this.getCenter=function()
{return c3dl.copyVector(this.center);}
this.getLongestVector=function()
{return c3dl.copyVector(this.longestVector);}
this.getCopy=function()
{var copy=new c3dl.BoundingSphere();copy.longestVector=c3dl.copyVector(this.longestVector);copy.original=c3dl.copyVector(this.original);copy.position=c3dl.copyVector(this.position);copy.center=c3dl.copyVector(this.center);copy.center=c3dl.copyVector(this.center);copy.maxMins=this.maxMins;return copy;}}
c3dl.BS_NORMALS=[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];c3dl.BOUNDING_SPHERE_VERTICES=[-0.000001,-1,0.000001,0.096133,-0.995185,-0.019122,0.098016,-0.995185,0,0.098017,0.995185,0,0.096134,0.995185,-0.019122,0,1,0,0.096134,0.995185,-0.019122,0.090556,0.995185,-0.03751,0,1,0,-0.000001,-1,0.000001,0.090555,-0.995185,-0.037509,0.096133,-0.995185,-0.019122,-0.000001,-1,0.000001,0.081498,-0.995185,-0.054455,0.090555,-0.995185,-0.037509,0.090556,0.995185,-0.03751,0.081498,0.995185,-0.054455,0,1,0,0.081498,0.995185,-0.054455,0.069309,0.995185,-0.069309,0,1,0,-0.000001,-1,0.000001,0.069308,-0.995185,-0.069308,0.081498,-0.995185,-0.054455,-0.000001,-1,0.000001,0.054455,-0.995185,-0.081498,0.069308,-0.995185,-0.069308,0.069309,0.995185,-0.069309,0.054455,0.995185,-0.081498,0,1,0,0.054455,0.995185,-0.081498,0.03751,0.995185,-0.090556,0,1,0,-0.000001,-1,0.000001,0.037509,-0.995185,-0.090555,0.054455,-0.995185,-0.081498,-0.000001,-1,0.000001,0.019122,-0.995185,-0.096133,0.037509,-0.995185,-0.090555,0.03751,0.995185,-0.090556,0.019122,0.995185,-0.096134,0,1,0,0.019122,0.995185,-0.096134,0,0.995185,-0.098017,0,1,0,-0.000001,-1,0.000001,0,-0.995185,-0.098016,0.019122,-0.995185,-0.096133,-0.000001,-1,0.000001,-0.019122,-0.995185,-0.096133,0,-0.995185,-0.098016,0,0.995185,-0.098017,-0.019122,0.995185,-0.096134,0,1,0,-0.019122,0.995185,-0.096134,-0.03751,0.995185,-0.090556,0,1,0,-0.000001,-1,0.000001,-0.037509,-0.995185,-0.090555,-0.019122,-0.995185,-0.096133,-0.000001,-1,0.000001,-0.054455,-0.995185,-0.081498,-0.037509,-0.995185,-0.090555,-0.03751,0.995185,-0.090556,-0.054455,0.995185,-0.081498,0,1,0,-0.054455,0.995185,-0.081498,-0.069309,0.995185,-0.069309,0,1,0,-0.000001,-1,0.000001,-0.069308,-0.995185,-0.069308,-0.054455,-0.995185,-0.081498,-0.000001,-1,0.000001,-0.081498,-0.995185,-0.054455,-0.069308,-0.995185,-0.069308,-0.069309,0.995185,-0.069309,-0.081498,0.995185,-0.054455,0,1,0,-0.081498,0.995185,-0.054455,-0.090556,0.995185,-0.03751,0,1,0,-0.000001,-1,0.000001,-0.090555,-0.995185,-0.037509,-0.081498,-0.995185,-0.054455,-0.000001,-1,0.000001,-0.096133,-0.995185,-0.019122,-0.090555,-0.995185,-0.037509,-0.090556,0.995185,-0.03751,-0.096134,0.995185,-0.019122,0,1,0,-0.096134,0.995185,-0.019122,-0.098017,0.995185,0,0,1,0,-0.000001,-1,0.000001,-0.098016,-0.995185,0,-0.096133,-0.995185,-0.019122,-0.000001,-1,0.000001,-0.096133,-0.995185,0.019122,-0.098016,-0.995185,0,-0.098017,0.995185,0,-0.096134,0.995185,0.019122,0,1,0,-0.096134,0.995185,0.019122,-0.090556,0.995185,0.037509,0,1,0,-0.000001,-1,0.000001,-0.090555,-0.995185,0.037509,-0.096133,-0.995185,0.019122,-0.000001,-1,0.000001,-0.081498,-0.995185,0.054455,-0.090555,-0.995185,0.037509,-0.090556,0.995185,0.037509,-0.081498,0.995185,0.054455,0,1,0,-0.081498,0.995185,0.054455,-0.069309,0.995185,0.069309,0,1,0,-0.000001,-1,0.000001,-0.069308,-0.995185,0.069308,-0.081498,-0.995185,0.054455,-0.000001,-1,0.000001,-0.054455,-0.995185,0.081498,-0.069308,-0.995185,0.069308,-0.069309,0.995185,0.069309,-0.054455,0.995185,0.081498,0,1,0,-0.054455,0.995185,0.081498,-0.03751,0.995185,0.090556,0,1,0,-0.000001,-1,0.000001,-0.037509,-0.995185,0.090555,-0.054455,-0.995185,0.081498,-0.000001,-1,0.000001,-0.019122,-0.995185,0.096133,-0.037509,-0.995185,0.090555,-0.03751,0.995185,0.090556,-0.019122,0.995185,0.096134,0,1,0,-0.019122,0.995185,0.096134,0,0.995185,0.098017,0,1,0,-0.000001,-1,0.000001,0,-0.995185,0.098016,-0.019122,-0.995185,0.096133,-0.000001,-1,0.000001,0.019122,-0.995185,0.096133,0,-0.995185,0.098016,0,0.995185,0.098017,0.019122,0.995185,0.096134,0,1,0,0.019122,0.995185,0.096134,0.03751,0.995185,0.090556,0,1,0,-0.000001,-1,0.000001,0.037509,-0.995185,0.090555,0.019122,-0.995185,0.096133,-0.000001,-1,0.000001,0.054455,-0.995185,0.081498,0.037509,-0.995185,0.090555,0.03751,0.995185,0.090556,0.054455,0.995185,0.081498,0,1,0,0.054455,0.995185,0.081498,0.069309,0.995185,0.069308,0,1,0,-0.000001,-1,0.000001,0.069308,-0.995185,0.069308,0.054455,-0.995185,0.081498,-0.000001,-1,0.000001,0.081498,-0.995185,0.054455,0.069308,-0.995185,0.069308,0.069309,0.995185,0.069308,0.081498,0.995185,0.054455,0,1,0,0.081498,0.995185,0.054455,0.090556,0.995185,0.037509,0,1,0,-0.000001,-1,0.000001,0.090555,-0.995185,0.037509,0.081498,-0.995185,0.054455,-0.000001,-1,0.000001,0.096133,-0.995185,0.019122,0.090555,-0.995185,0.037509,0.090556,0.995185,0.037509,0.096134,0.995185,0.019122,0,1,0,0.096134,0.995185,0.019122,0.098017,0.995185,0,0,1,0,-0.000001,-1,0.000001,0.098016,-0.995185,0,0.096133,-0.995185,0.019122,0.096133,-0.995185,0.019122,0.098016,-0.995185,0,0.195089,-0.980785,0,0.096133,-0.995185,0.019122,0.195089,-0.980785,0,0.191341,-0.980785,0.03806,0.191341,-0.980785,0.03806,0.195089,-0.980785,0,0.290284,-0.956941,0,0.191341,-0.980785,0.03806,0.290284,-0.956941,0,0.284706,-0.956941,0.056632,0.284706,-0.956941,0.056632,0.290284,-0.956941,0,0.382682,-0.92388,0,0.284706,-0.956941,0.056632,0.382682,-0.92388,0,0.375329,-0.92388,0.074658,0.375329,-0.92388,0.074658,0.382682,-0.92388,0,0.471396,-0.881922,0,0.375329,-0.92388,0.074658,0.471396,-0.881922,0,0.462338,-0.881922,0.091965,0.462338,-0.881922,0.091965,0.471396,-0.881922,0,0.555569,-0.83147,0,0.462338,-0.881922,0.091965,0.555569,-0.83147,0,0.544894,-0.83147,0.108386,0.544894,-0.83147,0.108386,0.555569,-0.83147,0,0.634392,-0.773011,0,0.544894,-0.83147,0.108386,0.634392,-0.773011,0,0.622203,-0.773011,0.123764,0.622203,-0.773011,0.123764,0.634392,-0.773011,0,0.707106,-0.707107,0,0.622203,-0.773011,0.123764,0.707106,-0.707107,0,0.693519,-0.707107,0.137949,0.693519,-0.707107,0.137949,0.707106,-0.707107,0,0.758157,-0.634394,0.150806,0.707106,-0.707107,0,0.77301,-0.634394,0,0.758157,-0.634394,0.150806,0.758157,-0.634394,0.150806,0.77301,-0.634394,0,0.831469,-0.555571,0,0.758157,-0.634394,0.150806,0.831469,-0.555571,0,0.815492,-0.555571,0.162211,0.815492,-0.555571,0.162211,0.831469,-0.555571,0,0.88192,-0.471397,0,0.815492,-0.555571,0.162211,0.88192,-0.471397,0,0.864975,-0.471397,0.172054,0.864975,-0.471397,0.172054,0.88192,-0.471397,0,0.906127,-0.382684,0.18024,0.88192,-0.471397,0,0.923879,-0.382684,0,0.906127,-0.382684,0.18024,0.906127,-0.382684,0.18024,0.923879,-0.382684,0,0.95694,-0.290285,0,0.906127,-0.382684,0.18024,0.95694,-0.290285,0,0.938552,-0.290285,0.18669,0.938552,-0.290285,0.18669,0.95694,-0.290285,0,0.961939,-0.195091,0.191341,0.95694,-0.290285,0,0.980785,-0.195091,0,0.961939,-0.195091,0.191341,0.961939,-0.195091,0.191341,0.980785,-0.195091,0,0.995184,-0.098017,0,0.961939,-0.195091,0.191341,0.995184,-0.098017,0,0.976061,-0.098017,0.194151,0.976061,-0.098017,0.194151,0.995184,-0.098017,0,0.980784,0,0.19509,0.995184,-0.098017,0,0.999999,0,0,0.980784,0,0.19509,0.980784,0,0.19509,0.999999,0,0,0.995184,0.098017,0,0.980784,0,0.19509,0.995184,0.098017,0,0.976061,0.098017,0.194151,0.976061,0.098017,0.194151,0.995184,0.098017,0,0.961939,0.19509,0.191341,0.995184,0.098017,0,0.980785,0.19509,0,0.961939,0.19509,0.191341,0.961939,0.19509,0.191341,0.980785,0.19509,0,0.95694,0.290285,0,0.961939,0.19509,0.191341,0.95694,0.290285,0,0.938552,0.290285,0.186689,0.938552,0.290285,0.186689,0.95694,0.290285,0,0.923879,0.382683,0,0.938552,0.290285,0.186689,0.923879,0.382683,0,0.906127,0.382683,0.18024,0.906127,0.382683,0.18024,0.923879,0.382683,0,0.864975,0.471397,0.172054,0.923879,0.382683,0,0.88192,0.471397,0,0.864975,0.471397,0.172054,0.864975,0.471397,0.172054,0.88192,0.471397,0,0.815493,0.55557,0.162211,0.88192,0.471397,0,0.831469,0.55557,0,0.815493,0.55557,0.162211,0.815493,0.55557,0.162211,0.831469,0.55557,0,0.77301,0.634393,0,0.815493,0.55557,0.162211,0.77301,0.634393,0,0.758157,0.634393,0.150807,0.758157,0.634393,0.150807,0.77301,0.634393,0,0.707107,0.707107,0,0.758157,0.634393,0.150807,0.707107,0.707107,0,0.69352,0.707107,0.13795,0.69352,0.707107,0.13795,0.707107,0.707107,0,0.634393,0.77301,0,0.69352,0.707107,0.13795,0.634393,0.77301,0,0.622203,0.77301,0.123764,0.622203,0.77301,0.123764,0.634393,0.77301,0,0.544895,0.83147,0.108386,0.634393,0.77301,0,0.55557,0.83147,0,0.544895,0.83147,0.108386,0.544895,0.83147,0.108386,0.55557,0.83147,0,0.471396,0.881921,0,0.544895,0.83147,0.108386,0.471396,0.881921,0,0.462339,0.881921,0.091965,0.462339,0.881921,0.091965,0.471396,0.881921,0,0.382683,0.92388,0,0.462339,0.881921,0.091965,0.382683,0.92388,0,0.37533,0.92388,0.074658,0.37533,0.92388,0.074658,0.382683,0.92388,0,0.290284,0.95694,0,0.37533,0.92388,0.074658,0.290284,0.95694,0,0.284707,0.95694,0.056632,0.284707,0.95694,0.056632,0.290284,0.95694,0,0.19509,0.980785,0,0.284707,0.95694,0.056632,0.19509,0.980785,0,0.191342,0.980785,0.03806,0.098017,0.995185,0,0.096134,0.995185,0.019122,0.191342,0.980785,0.03806,0.098017,0.995185,0,0.191342,0.980785,0.03806,0.19509,0.980785,0,0.18024,0.980785,0.074658,0.191342,0.980785,0.03806,0.096134,0.995185,0.019122,0.18024,0.980785,0.074658,0.096134,0.995185,0.019122,0.090556,0.995185,0.037509,0.268188,0.95694,0.111087,0.284707,0.95694,0.056632,0.191342,0.980785,0.03806,0.268188,0.95694,0.111087,0.191342,0.980785,0.03806,0.18024,0.980785,0.074658,0.353553,0.92388,0.146446,0.37533,0.92388,0.074658,0.284707,0.95694,0.056632,0.353553,0.92388,0.146446,0.284707,0.95694,0.056632,0.268188,0.95694,0.111087,0.435513,0.881921,0.180395,0.462339,0.881921,0.091965,0.37533,0.92388,0.074658,0.435513,0.881921,0.180395,0.37533,0.92388,0.074658,0.353553,0.92388,0.146446,0.513279,0.83147,0.212607,0.544895,0.83147,0.108386,0.462339,0.881921,0.091965,0.513279,0.83147,0.212607,0.462339,0.881921,0.091965,0.435513,0.881921,0.180395,0.586102,0.77301,0.242771,0.622203,0.77301,0.123764,0.513279,0.83147,0.212607,0.622203,0.77301,0.123764,0.544895,0.83147,0.108386,0.513279,0.83147,0.212607,0.653281,0.707107,0.270598,0.69352,0.707107,0.13795,0.622203,0.77301,0.123764,0.653281,0.707107,0.270598,0.622203,0.77301,0.123764,0.586102,0.77301,0.242771,0.714168,0.634393,0.295818,0.758157,0.634393,0.150807,0.69352,0.707107,0.13795,0.714168,0.634393,0.295818,0.69352,0.707107,0.13795,0.653281,0.707107,0.270598,0.768177,0.55557,0.318189,0.815493,0.55557,0.162211,0.758157,0.634393,0.150807,0.768177,0.55557,0.318189,0.758157,0.634393,0.150807,0.714168,0.634393,0.295818,0.814788,0.471397,0.337496,0.864975,0.471397,0.172054,0.768177,0.55557,0.318189,0.864975,0.471397,0.172054,0.815493,0.55557,0.162211,0.768177,0.55557,0.318189,0.853553,0.382683,0.353553,0.906127,0.382683,0.18024,0.814788,0.471397,0.337496,0.906127,0.382683,0.18024,0.864975,0.471397,0.172054,0.814788,0.471397,0.337496,0.884097,0.290285,0.366205,0.938552,0.290285,0.186689,0.906127,0.382683,0.18024,0.884097,0.290285,0.366205,0.906127,0.382683,0.18024,0.853553,0.382683,0.353553,0.906127,0.19509,0.37533,0.961939,0.19509,0.191341,0.938552,0.290285,0.186689,0.906127,0.19509,0.37533,0.938552,0.290285,0.186689,0.884097,0.290285,0.366205,0.91943,0.098017,0.38084,0.976061,0.098017,0.194151,0.906127,0.19509,0.37533,0.976061,0.098017,0.194151,0.961939,0.19509,0.191341,0.906127,0.19509,0.37533,0.923879,0,0.382683,0.980784,0,0.19509,0.976061,0.098017,0.194151,0.923879,0,0.382683,0.976061,0.098017,0.194151,0.91943,0.098017,0.38084,0.91943,-0.098017,0.38084,0.976061,-0.098017,0.194151,0.923879,0,0.382683,0.976061,-0.098017,0.194151,0.980784,0,0.19509,0.923879,0,0.382683,0.906127,-0.195091,0.37533,0.961939,-0.195091,0.191341,0.976061,-0.098017,0.194151,0.906127,-0.195091,0.37533,0.976061,-0.098017,0.194151,0.91943,-0.098017,0.38084,0.884097,-0.290285,0.366205,0.938552,-0.290285,0.18669,0.906127,-0.195091,0.37533,0.938552,-0.290285,0.18669,0.961939,-0.195091,0.191341,0.906127,-0.195091,0.37533,0.853553,-0.382684,0.353553,0.906127,-0.382684,0.18024,0.938552,-0.290285,0.18669,0.853553,-0.382684,0.353553,0.938552,-0.290285,0.18669,0.884097,-0.290285,0.366205,0.814788,-0.471397,0.337496,0.864975,-0.471397,0.172054,0.853553,-0.382684,0.353553,0.864975,-0.471397,0.172054,0.906127,-0.382684,0.18024,0.853553,-0.382684,0.353553,0.768177,-0.555571,0.318189,0.815492,-0.555571,0.162211,0.864975,-0.471397,0.172054,0.768177,-0.555571,0.318189,0.864975,-0.471397,0.172054,0.814788,-0.471397,0.337496,0.714168,-0.634394,0.295818,0.758157,-0.634394,0.150806,0.815492,-0.555571,0.162211,0.714168,-0.634394,0.295818,0.815492,-0.555571,0.162211,0.768177,-0.555571,0.318189,0.653281,-0.707107,0.270598,0.693519,-0.707107,0.137949,0.714168,-0.634394,0.295818,0.693519,-0.707107,0.137949,0.758157,-0.634394,0.150806,0.714168,-0.634394,0.295818,0.586102,-0.773011,0.242771,0.622203,-0.773011,0.123764,0.693519,-0.707107,0.137949,0.586102,-0.773011,0.242771,0.693519,-0.707107,0.137949,0.653281,-0.707107,0.270598,0.513279,-0.83147,0.212607,0.544894,-0.83147,0.108386,0.622203,-0.773011,0.123764,0.513279,-0.83147,0.212607,0.622203,-0.773011,0.123764,0.586102,-0.773011,0.242771,0.435513,-0.881922,0.180395,0.462338,-0.881922,0.091965,0.544894,-0.83147,0.108386,0.435513,-0.881922,0.180395,0.544894,-0.83147,0.108386,0.513279,-0.83147,0.212607,0.353552,-0.92388,0.146446,0.375329,-0.92388,0.074658,0.462338,-0.881922,0.091965,0.353552,-0.92388,0.146446,0.462338,-0.881922,0.091965,0.435513,-0.881922,0.180395,0.268187,-0.956941,0.111087,0.284706,-0.956941,0.056632,0.375329,-0.92388,0.074658,0.268187,-0.956941,0.111087,0.375329,-0.92388,0.074658,0.353552,-0.92388,0.146446,0.180239,-0.980785,0.074657,0.191341,-0.980785,0.03806,0.284706,-0.956941,0.056632,0.180239,-0.980785,0.074657,0.284706,-0.956941,0.056632,0.268187,-0.956941,0.111087,0.090555,-0.995185,0.037509,0.096133,-0.995185,0.019122,0.191341,-0.980785,0.03806,0.090555,-0.995185,0.037509,0.191341,-0.980785,0.03806,0.180239,-0.980785,0.074657,0.081498,-0.995185,0.054455,0.090555,-0.995185,0.037509,0.180239,-0.980785,0.074657,0.081498,-0.995185,0.054455,0.180239,-0.980785,0.074657,0.162211,-0.980785,0.108386,0.162211,-0.980785,0.108386,0.180239,-0.980785,0.074657,0.268187,-0.956941,0.111087,0.162211,-0.980785,0.108386,0.268187,-0.956941,0.111087,0.241362,-0.956941,0.161273,0.241362,-0.956941,0.161273,0.268187,-0.956941,0.111087,0.353552,-0.92388,0.146446,0.241362,-0.956941,0.161273,0.353552,-0.92388,0.146446,0.318189,-0.92388,0.212607,0.318189,-0.92388,0.212607,0.353552,-0.92388,0.146446,0.435513,-0.881922,0.180395,0.318189,-0.92388,0.212607,0.435513,-0.881922,0.180395,0.391951,-0.881922,0.261893,0.391951,-0.881922,0.261893,0.435513,-0.881922,0.180395,0.513279,-0.83147,0.212607,0.391951,-0.881922,0.261893,0.513279,-0.83147,0.212607,0.461939,-0.83147,0.308658,0.461939,-0.83147,0.308658,0.513279,-0.83147,0.212607,0.586102,-0.773011,0.242771,0.461939,-0.83147,0.308658,0.586102,-0.773011,0.242771,0.527478,-0.773011,0.352449,0.527478,-0.773011,0.352449,0.586102,-0.773011,0.242771,0.653281,-0.707107,0.270598,0.527478,-0.773011,0.352449,0.653281,-0.707107,0.270598,0.587937,-0.707107,0.392847,0.587937,-0.707107,0.392847,0.653281,-0.707107,0.270598,0.642734,-0.634394,0.429461,0.653281,-0.707107,0.270598,0.714168,-0.634394,0.295818,0.642734,-0.634394,0.429461,0.642734,-0.634394,0.429461,0.714168,-0.634394,0.295818,0.768177,-0.555571,0.318189,0.642734,-0.634394,0.429461,0.768177,-0.555571,0.318189,0.691341,-0.555571,0.461939,0.691341,-0.555571,0.461939,0.768177,-0.555571,0.318189,0.814788,-0.471397,0.337496,0.691341,-0.555571,0.461939,0.814788,-0.471397,0.337496,0.73329,-0.471397,0.489969,0.73329,-0.471397,0.489969,0.814788,-0.471397,0.337496,0.768177,-0.382684,0.513279,0.814788,-0.471397,0.337496,0.853553,-0.382684,0.353553,0.768177,-0.382684,0.513279,0.768177,-0.382684,0.513279,0.853553,-0.382684,0.353553,0.884097,-0.290285,0.366205,0.768177,-0.382684,0.513279,0.884097,-0.290285,0.366205,0.795666,-0.290285,0.531647,0.795666,-0.290285,0.531647,0.884097,-0.290285,0.366205,0.815493,-0.195091,0.544895,0.884097,-0.290285,0.366205,0.906127,-0.195091,0.37533,0.815493,-0.195091,0.544895,0.815493,-0.195091,0.544895,0.906127,-0.195091,0.37533,0.91943,-0.098017,0.38084,0.815493,-0.195091,0.544895,0.91943,-0.098017,0.38084,0.827465,-0.098017,0.552894,0.827465,-0.098017,0.552894,0.91943,-0.098017,0.38084,0.831469,0,0.555569,0.91943,-0.098017,0.38084,0.923879,0,0.382683,0.831469,0,0.555569,0.831469,0,0.555569,0.923879,0,0.382683,0.91943,0.098017,0.38084,0.831469,0,0.555569,0.91943,0.098017,0.38084,0.827465,0.098017,0.552894,0.827465,0.098017,0.552894,0.91943,0.098017,0.38084,0.815493,0.19509,0.544895,0.91943,0.098017,0.38084,0.906127,0.19509,0.37533,0.815493,0.19509,0.544895,0.815493,0.19509,0.544895,0.906127,0.19509,0.37533,0.884097,0.290285,0.366205,0.815493,0.19509,0.544895,0.884097,0.290285,0.366205,0.795666,0.290285,0.531647,0.795666,0.290285,0.531647,0.884097,0.290285,0.366205,0.853553,0.382683,0.353553,0.795666,0.290285,0.531647,0.853553,0.382683,0.353553,0.768177,0.382683,0.51328,0.768177,0.382683,0.51328,0.853553,0.382683,0.353553,0.73329,0.471397,0.489969,0.853553,0.382683,0.353553,0.814788,0.471397,0.337496,0.73329,0.471397,0.489969,0.73329,0.471397,0.489969,0.814788,0.471397,0.337496,0.691341,0.55557,0.461939,0.814788,0.471397,0.337496,0.768177,0.55557,0.318189,0.691341,0.55557,0.461939,0.691341,0.55557,0.461939,0.768177,0.55557,0.318189,0.714168,0.634393,0.295818,0.691341,0.55557,0.461939,0.714168,0.634393,0.295818,0.642734,0.634393,0.429461,0.642734,0.634393,0.429461,0.714168,0.634393,0.295818,0.653281,0.707107,0.270598,0.642734,0.634393,0.429461,0.653281,0.707107,0.270598,0.587938,0.707107,0.392847,0.587938,0.707107,0.392847,0.653281,0.707107,0.270598,0.586102,0.77301,0.242771,0.587938,0.707107,0.392847,0.586102,0.77301,0.242771,0.527478,0.77301,0.35245,0.527478,0.77301,0.35245,0.586102,0.77301,0.242771,0.461939,0.83147,0.308658,0.586102,0.77301,0.242771,0.513279,0.83147,0.212607,0.461939,0.83147,0.308658,0.461939,0.83147,0.308658,0.513279,0.83147,0.212607,0.435513,0.881921,0.180395,0.461939,0.83147,0.308658,0.435513,0.881921,0.180395,0.391952,0.881921,0.261894,0.391952,0.881921,0.261894,0.435513,0.881921,0.180395,0.353553,0.92388,0.146446,0.391952,0.881921,0.261894,0.353553,0.92388,0.146446,0.31819,0.92388,0.212607,0.31819,0.92388,0.212607,0.353553,0.92388,0.146446,0.268188,0.95694,0.111087,0.31819,0.92388,0.212607,0.268188,0.95694,0.111087,0.241363,0.95694,0.161273,0.241363,0.95694,0.161273,0.268188,0.95694,0.111087,0.18024,0.980785,0.074658,0.241363,0.95694,0.161273,0.18024,0.980785,0.074658,0.162212,0.980785,0.108386,0.162212,0.980785,0.108386,0.18024,0.980785,0.074658,0.090556,0.995185,0.037509,0.162212,0.980785,0.108386,0.090556,0.995185,0.037509,0.081498,0.995185,0.054455,0.13795,0.980785,0.137949,0.162212,0.980785,0.108386,0.081498,0.995185,0.054455,0.13795,0.980785,0.137949,0.081498,0.995185,0.054455,0.069309,0.995185,0.069308,0.205262,0.95694,0.205262,0.241363,0.95694,0.161273,0.162212,0.980785,0.108386,0.205262,0.95694,0.205262,0.162212,0.980785,0.108386,0.13795,0.980785,0.137949,0.270598,0.92388,0.270598,0.31819,0.92388,0.212607,0.241363,0.95694,0.161273,0.270598,0.92388,0.270598,0.241363,0.95694,0.161273,0.205262,0.95694,0.205262,0.333328,0.881921,0.333327,0.391952,0.881921,0.261894,0.31819,0.92388,0.212607,0.333328,0.881921,0.333327,0.31819,0.92388,0.212607,0.270598,0.92388,0.270598,0.392847,0.83147,0.392847,0.461939,0.83147,0.308658,0.391952,0.881921,0.261894,0.392847,0.83147,0.392847,0.391952,0.881921,0.261894,0.333328,0.881921,0.333327,0.448583,0.77301,0.448583,0.527478,0.77301,0.35245,0.392847,0.83147,0.392847,0.527478,0.77301,0.35245,0.461939,0.83147,0.308658,0.392847,0.83147,0.392847,0.5,0.707107,0.5,0.587938,0.707107,0.392847,0.527478,0.77301,0.35245,0.5,0.707107,0.5,0.527478,0.77301,0.35245,0.448583,0.77301,0.448583,0.546601,0.634393,0.546601,0.642734,0.634393,0.429461,0.587938,0.707107,0.392847,0.546601,0.634393,0.546601,0.587938,0.707107,0.392847,0.5,0.707107,0.5,0.587938,0.55557,0.587937,0.691341,0.55557,0.461939,0.642734,0.634393,0.429461,0.587938,0.55557,0.587937,0.642734,0.634393,0.429461,0.546601,0.634393,0.546601,0.623612,0.471397,0.623612,0.73329,0.471397,0.489969,0.587938,0.55557,0.587937,0.73329,0.471397,0.489969,0.691341,0.55557,0.461939,0.587938,0.55557,0.587937,0.653281,0.382683,0.653281,0.768177,0.382683,0.51328,0.623612,0.471397,0.623612,0.768177,0.382683,0.51328,0.73329,0.471397,0.489969,0.623612,0.471397,0.623612,0.676659,0.290285,0.676658,0.795666,0.290285,0.531647,0.768177,0.382683,0.51328,0.676659,0.290285,0.676658,0.768177,0.382683,0.51328,0.653281,0.382683,0.653281,0.69352,0.19509,0.693519,0.815493,0.19509,0.544895,0.795666,0.290285,0.531647,0.69352,0.19509,0.693519,0.795666,0.290285,0.531647,0.676659,0.290285,0.676658,0.703701,0.098017,0.703701,0.827465,0.098017,0.552894,0.69352,0.19509,0.693519,0.827465,0.098017,0.552894,0.815493,0.19509,0.544895,0.69352,0.19509,0.693519,0.707106,0,0.707106,0.831469,0,0.555569,0.827465,0.098017,0.552894,0.707106,0,0.707106,0.827465,0.098017,0.552894,0.703701,0.098017,0.703701,0.703701,-0.098017,0.703701,0.827465,-0.098017,0.552894,0.707106,0,0.707106,0.827465,-0.098017,0.552894,0.831469,0,0.555569,0.707106,0,0.707106,0.69352,-0.195091,0.693519,0.815493,-0.195091,0.544895,0.827465,-0.098017,0.552894,0.69352,-0.195091,0.693519,0.827465,-0.098017,0.552894,0.703701,-0.098017,0.703701,0.676659,-0.290285,0.676659,0.795666,-0.290285,0.531647,0.69352,-0.195091,0.693519,0.795666,-0.290285,0.531647,0.815493,-0.195091,0.544895,0.69352,-0.195091,0.693519,0.653281,-0.382684,0.653281,0.768177,-0.382684,0.513279,0.795666,-0.290285,0.531647,0.653281,-0.382684,0.653281,0.795666,-0.290285,0.531647,0.676659,-0.290285,0.676659,0.623612,-0.471397,0.623612,0.73329,-0.471397,0.489969,0.768177,-0.382684,0.513279,0.623612,-0.471397,0.623612,0.768177,-0.382684,0.513279,0.653281,-0.382684,0.653281,0.587937,-0.555571,0.587937,0.691341,-0.555571,0.461939,0.73329,-0.471397,0.489969,0.587937,-0.555571,0.587937,0.73329,-0.471397,0.489969,0.623612,-0.471397,0.623612,0.546601,-0.634394,0.5466,0.642734,-0.634394,0.429461,0.691341,-0.555571,0.461939,0.546601,-0.634394,0.5466,0.691341,-0.555571,0.461939,0.587937,-0.555571,0.587937,0.5,-0.707107,0.499999,0.587937,-0.707107,0.392847,0.642734,-0.634394,0.429461,0.5,-0.707107,0.499999,0.642734,-0.634394,0.429461,0.546601,-0.634394,0.5466,0.448583,-0.773011,0.448583,0.527478,-0.773011,0.352449,0.587937,-0.707107,0.392847,0.448583,-0.773011,0.448583,0.587937,-0.707107,0.392847,0.5,-0.707107,0.499999,0.392847,-0.83147,0.392847,0.461939,-0.83147,0.308658,0.527478,-0.773011,0.352449,0.392847,-0.83147,0.392847,0.527478,-0.773011,0.352449,0.448583,-0.773011,0.448583,0.333327,-0.881922,0.333327,0.391951,-0.881922,0.261893,0.461939,-0.83147,0.308658,0.333327,-0.881922,0.333327,0.461939,-0.83147,0.308658,0.392847,-0.83147,0.392847,0.270597,-0.92388,0.270597,0.318189,-0.92388,0.212607,0.391951,-0.881922,0.261893,0.270597,-0.92388,0.270597,0.391951,-0.881922,0.261893,0.333327,-0.881922,0.333327,0.205262,-0.956941,0.205262,0.241362,-0.956941,0.161273,0.318189,-0.92388,0.212607,0.205262,-0.956941,0.205262,0.318189,-0.92388,0.212607,0.270597,-0.92388,0.270597,0.137949,-0.980785,0.137949,0.162211,-0.980785,0.108386,0.241362,-0.956941,0.161273,0.137949,-0.980785,0.137949,0.241362,-0.956941,0.161273,0.205262,-0.956941,0.205262,0.069308,-0.995185,0.069308,0.081498,-0.995185,0.054455,0.162211,-0.980785,0.108386,0.069308,-0.995185,0.069308,0.162211,-0.980785,0.108386,0.137949,-0.980785,0.137949,0.054455,-0.995185,0.081498,0.069308,-0.995185,0.069308,0.137949,-0.980785,0.137949,0.054455,-0.995185,0.081498,0.137949,-0.980785,0.137949,0.108386,-0.980785,0.162211,0.108386,-0.980785,0.162211,0.137949,-0.980785,0.137949,0.205262,-0.956941,0.205262,0.108386,-0.980785,0.162211,0.205262,-0.956941,0.205262,0.161273,-0.956941,0.241362,0.161273,-0.956941,0.241362,0.205262,-0.956941,0.205262,0.270597,-0.92388,0.270597,0.161273,-0.956941,0.241362,0.270597,-0.92388,0.270597,0.212607,-0.92388,0.318189,0.212607,-0.92388,0.318189,0.270597,-0.92388,0.270597,0.333327,-0.881922,0.333327,0.212607,-0.92388,0.318189,0.333327,-0.881922,0.333327,0.261894,-0.881922,0.391951,0.261894,-0.881922,0.391951,0.333327,-0.881922,0.333327,0.392847,-0.83147,0.392847,0.261894,-0.881922,0.391951,0.392847,-0.83147,0.392847,0.308658,-0.83147,0.461939,0.308658,-0.83147,0.461939,0.392847,-0.83147,0.392847,0.35245,-0.773011,0.527478,0.392847,-0.83147,0.392847,0.448583,-0.773011,0.448583,0.35245,-0.773011,0.527478,0.35245,-0.773011,0.527478,0.448583,-0.773011,0.448583,0.5,-0.707107,0.499999,0.35245,-0.773011,0.527478,0.5,-0.707107,0.499999,0.392847,-0.707107,0.587937,0.392847,-0.707107,0.587937,0.5,-0.707107,0.499999,0.429461,-0.634394,0.642734,0.5,-0.707107,0.499999,0.546601,-0.634394,0.5466,0.429461,-0.634394,0.642734,0.429461,-0.634394,0.642734,0.546601,-0.634394,0.5466,0.587937,-0.555571,0.587937,0.429461,-0.634394,0.642734,0.587937,-0.555571,0.587937,0.46194,-0.555571,0.691341,0.46194,-0.555571,0.691341,0.587937,-0.555571,0.587937,0.623612,-0.471397,0.623612,0.46194,-0.555571,0.691341,0.623612,-0.471397,0.623612,0.489969,-0.471397,0.73329,0.489969,-0.471397,0.73329,0.623612,-0.471397,0.623612,0.653281,-0.382684,0.653281,0.489969,-0.471397,0.73329,0.653281,-0.382684,0.653281,0.51328,-0.382684,0.768177,0.51328,-0.382684,0.768177,0.653281,-0.382684,0.653281,0.676659,-0.290285,0.676659,0.51328,-0.382684,0.768177,0.676659,-0.290285,0.676659,0.531647,-0.290285,0.795666,0.531647,-0.290285,0.795666,0.676659,-0.290285,0.676659,0.544895,-0.195091,0.815493,0.676659,-0.290285,0.676659,0.69352,-0.195091,0.693519,0.544895,-0.195091,0.815493,0.544895,-0.195091,0.815493,0.69352,-0.195091,0.693519,0.703701,-0.098017,0.703701,0.544895,-0.195091,0.815493,0.703701,-0.098017,0.703701,0.552895,-0.098017,0.827465,0.552895,-0.098017,0.827465,0.703701,-0.098017,0.703701,0.55557,0,0.831468,0.703701,-0.098017,0.703701,0.707106,0,0.707106,0.55557,0,0.831468,0.55557,0,0.831468,0.707106,0,0.707106,0.703701,0.098017,0.703701,0.55557,0,0.831468,0.703701,0.098017,0.703701,0.552895,0.098017,0.827465,0.552895,0.098017,0.827465,0.703701,0.098017,0.703701,0.544895,0.19509,0.815493,0.703701,0.098017,0.703701,0.69352,0.19509,0.693519,0.544895,0.19509,0.815493,0.544895,0.19509,0.815493,0.69352,0.19509,0.693519,0.676659,0.290285,0.676658,0.544895,0.19509,0.815493,0.676659,0.290285,0.676658,0.531647,0.290285,0.795666,0.531647,0.290285,0.795666,0.676659,0.290285,0.676658,0.653281,0.382683,0.653281,0.531647,0.290285,0.795666,0.653281,0.382683,0.653281,0.51328,0.382683,0.768177,0.51328,0.382683,0.768177,0.653281,0.382683,0.653281,0.489969,0.471397,0.73329,0.653281,0.382683,0.653281,0.623612,0.471397,0.623612,0.489969,0.471397,0.73329,0.489969,0.471397,0.73329,0.623612,0.471397,0.623612,0.46194,0.55557,0.691341,0.623612,0.471397,0.623612,0.587938,0.55557,0.587937,0.46194,0.55557,0.691341,0.46194,0.55557,0.691341,0.587938,0.55557,0.587937,0.546601,0.634393,0.546601,0.46194,0.55557,0.691341,0.546601,0.634393,0.546601,0.429462,0.634393,0.642734,0.429462,0.634393,0.642734,0.546601,0.634393,0.546601,0.5,0.707107,0.5,0.429462,0.634393,0.642734,0.5,0.707107,0.5,0.392847,0.707107,0.587938,0.392847,0.707107,0.587938,0.5,0.707107,0.5,0.448583,0.77301,0.448583,0.392847,0.707107,0.587938,0.448583,0.77301,0.448583,0.35245,0.77301,0.527478,0.35245,0.77301,0.527478,0.448583,0.77301,0.448583,0.308658,0.83147,0.461939,0.448583,0.77301,0.448583,0.392847,0.83147,0.392847,0.308658,0.83147,0.461939,0.308658,0.83147,0.461939,0.392847,0.83147,0.392847,0.333328,0.881921,0.333327,0.308658,0.83147,0.461939,0.333328,0.881921,0.333327,0.261894,0.881921,0.391952,0.261894,0.881921,0.391952,0.333328,0.881921,0.333327,0.270598,0.92388,0.270598,0.261894,0.881921,0.391952,0.270598,0.92388,0.270598,0.212607,0.92388,0.318189,0.212607,0.92388,0.318189,0.270598,0.92388,0.270598,0.205262,0.95694,0.205262,0.212607,0.92388,0.318189,0.205262,0.95694,0.205262,0.161273,0.95694,0.241363,0.161273,0.95694,0.241363,0.205262,0.95694,0.205262,0.13795,0.980785,0.137949,0.161273,0.95694,0.241363,0.13795,0.980785,0.137949,0.108386,0.980785,0.162211,0.108386,0.980785,0.162211,0.13795,0.980785,0.137949,0.069309,0.995185,0.069308,0.108386,0.980785,0.162211,0.069309,0.995185,0.069308,0.054455,0.995185,0.081498,0.074658,0.980785,0.18024,0.108386,0.980785,0.162211,0.054455,0.995185,0.081498,0.074658,0.980785,0.18024,0.054455,0.995185,0.081498,0.03751,0.995185,0.090556,0.111087,0.95694,0.268188,0.161273,0.95694,0.241363,0.108386,0.980785,0.162211,0.111087,0.95694,0.268188,0.108386,0.980785,0.162211,0.074658,0.980785,0.18024,0.146447,0.92388,0.353553,0.212607,0.92388,0.318189,0.161273,0.95694,0.241363,0.146447,0.92388,0.353553,0.161273,0.95694,0.241363,0.111087,0.95694,0.268188,0.180396,0.881921,0.435513,0.261894,0.881921,0.391952,0.212607,0.92388,0.318189,0.180396,0.881921,0.435513,0.212607,0.92388,0.318189,0.146447,0.92388,0.353553,0.212607,0.83147,0.513279,0.308658,0.83147,0.461939,0.261894,0.881921,0.391952,0.212607,0.83147,0.513279,0.261894,0.881921,0.391952,0.180396,0.881921,0.435513,0.242772,0.77301,0.586102,0.35245,0.77301,0.527478,0.212607,0.83147,0.513279,0.35245,0.77301,0.527478,0.308658,0.83147,0.461939,0.212607,0.83147,0.513279,0.270598,0.707107,0.653281,0.392847,0.707107,0.587938,0.35245,0.77301,0.527478,0.270598,0.707107,0.653281,0.35245,0.77301,0.527478,0.242772,0.77301,0.586102,0.295818,0.634393,0.714168,0.429462,0.634393,0.642734,0.392847,0.707107,0.587938,0.295818,0.634393,0.714168,0.392847,0.707107,0.587938,0.270598,0.707107,0.653281,0.31819,0.55557,0.768177,0.46194,0.55557,0.691341,0.429462,0.634393,0.642734,0.31819,0.55557,0.768177,0.429462,0.634393,0.642734,0.295818,0.634393,0.714168,0.337496,0.471397,0.814788,0.489969,0.471397,0.73329,0.31819,0.55557,0.768177,0.489969,0.471397,0.73329,0.46194,0.55557,0.691341,0.31819,0.55557,0.768177,0.353553,0.382683,0.853553,0.51328,0.382683,0.768177,0.337496,0.471397,0.814788,0.51328,0.382683,0.768177,0.489969,0.471397,0.73329,0.337496,0.471397,0.814788,0.366205,0.290285,0.884097,0.531647,0.290285,0.795666,0.51328,0.382683,0.768177,0.366205,0.290285,0.884097,0.51328,0.382683,0.768177,0.353553,0.382683,0.853553,0.37533,0.19509,0.906127,0.544895,0.19509,0.815493,0.531647,0.290285,0.795666,0.37533,0.19509,0.906127,0.531647,0.290285,0.795666,0.366205,0.290285,0.884097,0.38084,0.098017,0.91943,0.552895,0.098017,0.827465,0.37533,0.19509,0.906127,0.552895,0.098017,0.827465,0.544895,0.19509,0.815493,0.37533,0.19509,0.906127,0.382683,0,0.923878,0.55557,0,0.831468,0.552895,0.098017,0.827465,0.382683,0,0.923878,0.552895,0.098017,0.827465,0.38084,0.098017,0.91943,0.38084,-0.098017,0.91943,0.552895,-0.098017,0.827465,0.382683,0,0.923878,0.552895,-0.098017,0.827465,0.55557,0,0.831468,0.382683,0,0.923878,0.37533,-0.19509,0.906127,0.544895,-0.195091,0.815493,0.552895,-0.098017,0.827465,0.37533,-0.19509,0.906127,0.552895,-0.098017,0.827465,0.38084,-0.098017,0.91943,0.366205,-0.290285,0.884097,0.531647,-0.290285,0.795666,0.37533,-0.19509,0.906127,0.531647,-0.290285,0.795666,0.544895,-0.195091,0.815493,0.37533,-0.19509,0.906127,0.353553,-0.382684,0.853553,0.51328,-0.382684,0.768177,0.531647,-0.290285,0.795666,0.353553,-0.382684,0.853553,0.531647,-0.290285,0.795666,0.366205,-0.290285,0.884097,0.337496,-0.471397,0.814788,0.489969,-0.471397,0.73329,0.353553,-0.382684,0.853553,0.489969,-0.471397,0.73329,0.51328,-0.382684,0.768177,0.353553,-0.382684,0.853553,0.31819,-0.555571,0.768177,0.46194,-0.555571,0.691341,0.489969,-0.471397,0.73329,0.31819,-0.555571,0.768177,0.489969,-0.471397,0.73329,0.337496,-0.471397,0.814788,0.295818,-0.634394,0.714168,0.429461,-0.634394,0.642734,0.46194,-0.555571,0.691341,0.295818,-0.634394,0.714168,0.46194,-0.555571,0.691341,0.31819,-0.555571,0.768177,0.270598,-0.707107,0.653281,0.392847,-0.707107,0.587937,0.295818,-0.634394,0.714168,0.392847,-0.707107,0.587937,0.429461,-0.634394,0.642734,0.295818,-0.634394,0.714168,0.242772,-0.773011,0.586102,0.35245,-0.773011,0.527478,0.392847,-0.707107,0.587937,0.242772,-0.773011,0.586102,0.392847,-0.707107,0.587937,0.270598,-0.707107,0.653281,0.212607,-0.83147,0.513279,0.308658,-0.83147,0.461939,0.35245,-0.773011,0.527478,0.212607,-0.83147,0.513279,0.35245,-0.773011,0.527478,0.242772,-0.773011,0.586102,0.180395,-0.881922,0.435513,0.261894,-0.881922,0.391951,0.308658,-0.83147,0.461939,0.180395,-0.881922,0.435513,0.308658,-0.83147,0.461939,0.212607,-0.83147,0.513279,0.146446,-0.92388,0.353553,0.212607,-0.92388,0.318189,0.261894,-0.881922,0.391951,0.146446,-0.92388,0.353553,0.261894,-0.881922,0.391951,0.180395,-0.881922,0.435513,0.111087,-0.956941,0.268187,0.161273,-0.956941,0.241362,0.212607,-0.92388,0.318189,0.111087,-0.956941,0.268187,0.212607,-0.92388,0.318189,0.146446,-0.92388,0.353553,0.074658,-0.980785,0.180239,0.108386,-0.980785,0.162211,0.161273,-0.956941,0.241362,0.074658,-0.980785,0.180239,0.161273,-0.956941,0.241362,0.111087,-0.956941,0.268187,0.037509,-0.995185,0.090555,0.054455,-0.995185,0.081498,0.108386,-0.980785,0.162211,0.037509,-0.995185,0.090555,0.108386,-0.980785,0.162211,0.074658,-0.980785,0.180239,0.019122,-0.995185,0.096133,0.037509,-0.995185,0.090555,0.074658,-0.980785,0.180239,0.019122,-0.995185,0.096133,0.074658,-0.980785,0.180239,0.03806,-0.980785,0.191341,0.03806,-0.980785,0.191341,0.074658,-0.980785,0.180239,0.111087,-0.956941,0.268187,0.03806,-0.980785,0.191341,0.111087,-0.956941,0.268187,0.056632,-0.956941,0.284706,0.056632,-0.956941,0.284706,0.111087,-0.956941,0.268187,0.146446,-0.92388,0.353553,0.056632,-0.956941,0.284706,0.146446,-0.92388,0.353553,0.074658,-0.92388,0.375329,0.074658,-0.92388,0.375329,0.146446,-0.92388,0.353553,0.180395,-0.881922,0.435513,0.074658,-0.92388,0.375329,0.180395,-0.881922,0.435513,0.091965,-0.881922,0.462338,0.091965,-0.881922,0.462338,0.180395,-0.881922,0.435513,0.212607,-0.83147,0.513279,0.091965,-0.881922,0.462338,0.212607,-0.83147,0.513279,0.108386,-0.83147,0.544894,0.108386,-0.83147,0.544894,0.212607,-0.83147,0.513279,0.123764,-0.773011,0.622203,0.212607,-0.83147,0.513279,0.242772,-0.773011,0.586102,0.123764,-0.773011,0.622203,0.123764,-0.773011,0.622203,0.242772,-0.773011,0.586102,0.270598,-0.707107,0.653281,0.123764,-0.773011,0.622203,0.270598,-0.707107,0.653281,0.13795,-0.707107,0.693519,0.13795,-0.707107,0.693519,0.270598,-0.707107,0.653281,0.150807,-0.634394,0.758157,0.270598,-0.707107,0.653281,0.295818,-0.634394,0.714168,0.150807,-0.634394,0.758157,0.150807,-0.634394,0.758157,0.295818,-0.634394,0.714168,0.31819,-0.555571,0.768177,0.150807,-0.634394,0.758157,0.31819,-0.555571,0.768177,0.162212,-0.555571,0.815493,0.162212,-0.555571,0.815493,0.31819,-0.555571,0.768177,0.337496,-0.471397,0.814788,0.162212,-0.555571,0.815493,0.337496,-0.471397,0.814788,0.172054,-0.471397,0.864975,0.172054,-0.471397,0.864975,0.337496,-0.471397,0.814788,0.353553,-0.382684,0.853553,0.172054,-0.471397,0.864975,0.353553,-0.382684,0.853553,0.18024,-0.382684,0.906127,0.18024,-0.382684,0.906127,0.353553,-0.382684,0.853553,0.366205,-0.290285,0.884097,0.18024,-0.382684,0.906127,0.366205,-0.290285,0.884097,0.18669,-0.290285,0.938552,0.18669,-0.290285,0.938552,0.366205,-0.290285,0.884097,0.191342,-0.19509,0.961939,0.366205,-0.290285,0.884097,0.37533,-0.19509,0.906127,0.191342,-0.19509,0.961939,0.191342,-0.19509,0.961939,0.37533,-0.19509,0.906127,0.38084,-0.098017,0.91943,0.191342,-0.19509,0.961939,0.38084,-0.098017,0.91943,0.194151,-0.098017,0.976062,0.194151,-0.098017,0.976062,0.38084,-0.098017,0.91943,0.195091,0,0.980784,0.38084,-0.098017,0.91943,0.382683,0,0.923878,0.195091,0,0.980784,0.195091,0,0.980784,0.382683,0,0.923878,0.38084,0.098017,0.91943,0.195091,0,0.980784,0.38084,0.098017,0.91943,0.194151,0.098017,0.976062,0.194151,0.098017,0.976062,0.38084,0.098017,0.91943,0.191342,0.19509,0.961939,0.38084,0.098017,0.91943,0.37533,0.19509,0.906127,0.191342,0.19509,0.961939,0.191342,0.19509,0.961939,0.37533,0.19509,0.906127,0.366205,0.290285,0.884097,0.191342,0.19509,0.961939,0.366205,0.290285,0.884097,0.18669,0.290285,0.938552,0.18669,0.290285,0.938552,0.366205,0.290285,0.884097,0.353553,0.382683,0.853553,0.18669,0.290285,0.938552,0.353553,0.382683,0.853553,0.18024,0.382683,0.906127,0.18024,0.382683,0.906127,0.353553,0.382683,0.853553,0.172054,0.471397,0.864975,0.353553,0.382683,0.853553,0.337496,0.471397,0.814788,0.172054,0.471397,0.864975,0.172054,0.471397,0.864975,0.337496,0.471397,0.814788,0.162212,0.55557,0.815493,0.337496,0.471397,0.814788,0.31819,0.55557,0.768177,0.162212,0.55557,0.815493,0.162212,0.55557,0.815493,0.31819,0.55557,0.768177,0.295818,0.634393,0.714168,0.162212,0.55557,0.815493,0.295818,0.634393,0.714168,0.150807,0.634393,0.758157,0.150807,0.634393,0.758157,0.295818,0.634393,0.714168,0.270598,0.707107,0.653281,0.150807,0.634393,0.758157,0.270598,0.707107,0.653281,0.13795,0.707107,0.69352,0.13795,0.707107,0.69352,0.270598,0.707107,0.653281,0.242772,0.77301,0.586102,0.13795,0.707107,0.69352,0.242772,0.77301,0.586102,0.123764,0.77301,0.622203,0.123764,0.77301,0.622203,0.242772,0.77301,0.586102,0.108386,0.83147,0.544895,0.242772,0.77301,0.586102,0.212607,0.83147,0.513279,0.108386,0.83147,0.544895,0.108386,0.83147,0.544895,0.212607,0.83147,0.513279,0.180396,0.881921,0.435513,0.108386,0.83147,0.544895,0.180396,0.881921,0.435513,0.091965,0.881921,0.462339,0.091965,0.881921,0.462339,0.180396,0.881921,0.435513,0.146447,0.92388,0.353553,0.091965,0.881921,0.462339,0.146447,0.92388,0.353553,0.074658,0.92388,0.37533,0.074658,0.92388,0.37533,0.146447,0.92388,0.353553,0.111087,0.95694,0.268188,0.074658,0.92388,0.37533,0.111087,0.95694,0.268188,0.056632,0.95694,0.284707,0.056632,0.95694,0.284707,0.111087,0.95694,0.268188,0.074658,0.980785,0.18024,0.056632,0.95694,0.284707,0.074658,0.980785,0.18024,0.03806,0.980785,0.191341,0.03806,0.980785,0.191341,0.074658,0.980785,0.18024,0.03751,0.995185,0.090556,0.03806,0.980785,0.191341,0.03751,0.995185,0.090556,0.019122,0.995185,0.096134,0,0.980785,0.19509,0.03806,0.980785,0.191341,0.019122,0.995185,0.096134,0,0.980785,0.19509,0.019122,0.995185,0.096134,0,0.995185,0.098017,0,0.95694,0.290284,0.056632,0.95694,0.284707,0.03806,0.980785,0.191341,0,0.95694,0.290284,0.03806,0.980785,0.191341,0,0.980785,0.19509,0,0.92388,0.382683,0.074658,0.92388,0.37533,0.056632,0.95694,0.284707,0,0.92388,0.382683,0.056632,0.95694,0.284707,0,0.95694,0.290284,0,0.881921,0.471396,0.091965,0.881921,0.462339,0.074658,0.92388,0.37533,0,0.881921,0.471396,0.074658,0.92388,0.37533,0,0.92388,0.382683,0,0.83147,0.55557,0.108386,0.83147,0.544895,0.091965,0.881921,0.462339,0,0.83147,0.55557,0.091965,0.881921,0.462339,0,0.881921,0.471396,0,0.77301,0.634393,0.123764,0.77301,0.622203,0,0.83147,0.55557,0.123764,0.77301,0.622203,0.108386,0.83147,0.544895,0,0.83147,0.55557,0,0.707107,0.707107,0.13795,0.707107,0.69352,0.123764,0.77301,0.622203,0,0.707107,0.707107,0.123764,0.77301,0.622203,0,0.77301,0.634393,0,0.634393,0.77301,0.150807,0.634393,0.758157,0.13795,0.707107,0.69352,0,0.634393,0.77301,0.13795,0.707107,0.69352,0,0.707107,0.707107,0,0.55557,0.831469,0.162212,0.55557,0.815493,0.150807,0.634393,0.758157,0,0.55557,0.831469,0.150807,0.634393,0.758157,0,0.634393,0.77301,0,0.471397,0.881921,0.172054,0.471397,0.864975,0,0.55557,0.831469,0.172054,0.471397,0.864975,0.162212,0.55557,0.815493,0,0.55557,0.831469,0,0.382683,0.923879,0.18024,0.382683,0.906127,0,0.471397,0.881921,0.18024,0.382683,0.906127,0.172054,0.471397,0.864975,0,0.471397,0.881921,0,0.290285,0.95694,0.18669,0.290285,0.938552,0.18024,0.382683,0.906127,0,0.290285,0.95694,0.18024,0.382683,0.906127,0,0.382683,0.923879,0,0.19509,0.980785,0.191342,0.19509,0.961939,0.18669,0.290285,0.938552,0,0.19509,0.980785,0.18669,0.290285,0.938552,0,0.290285,0.95694,0,0.098017,0.995184,0.194151,0.098017,0.976062,0,0.19509,0.980785,0.194151,0.098017,0.976062,0.191342,0.19509,0.961939,0,0.19509,0.980785,0,0,0.999999,0.195091,0,0.980784,0.194151,0.098017,0.976062,0,0,0.999999,0.194151,0.098017,0.976062,0,0.098017,0.995184,0,-0.098017,0.995184,0.194151,-0.098017,0.976062,0,0,0.999999,0.194151,-0.098017,0.976062,0.195091,0,0.980784,0,0,0.999999,0,-0.19509,0.980785,0.191342,-0.19509,0.961939,0.194151,-0.098017,0.976062,0,-0.19509,0.980785,0.194151,-0.098017,0.976062,0,-0.098017,0.995184,0,-0.290285,0.95694,0.18669,-0.290285,0.938552,0,-0.19509,0.980785,0.18669,-0.290285,0.938552,0.191342,-0.19509,0.961939,0,-0.19509,0.980785,0,-0.382684,0.923879,0.18024,-0.382684,0.906127,0.18669,-0.290285,0.938552,0,-0.382684,0.923879,0.18669,-0.290285,0.938552,0,-0.290285,0.95694,0,-0.471397,0.881921,0.172054,-0.471397,0.864975,0.18024,-0.382684,0.906127,0,-0.471397,0.881921,0.18024,-0.382684,0.906127,0,-0.382684,0.923879,0,-0.555571,0.831469,0.162212,-0.555571,0.815493,0.172054,-0.471397,0.864975,0,-0.555571,0.831469,0.172054,-0.471397,0.864975,0,-0.471397,0.881921,0,-0.634394,0.77301,0.150807,-0.634394,0.758157,0.162212,-0.555571,0.815493,0,-0.634394,0.77301,0.162212,-0.555571,0.815493,0,-0.555571,0.831469,0,-0.707107,0.707106,0.13795,-0.707107,0.693519,0,-0.634394,0.77301,0.13795,-0.707107,0.693519,0.150807,-0.634394,0.758157,0,-0.634394,0.77301,0,-0.773011,0.634392,0.123764,-0.773011,0.622203,0.13795,-0.707107,0.693519,0,-0.773011,0.634392,0.13795,-0.707107,0.693519,0,-0.707107,0.707106,0,-0.83147,0.555569,0.108386,-0.83147,0.544894,0.123764,-0.773011,0.622203,0,-0.83147,0.555569,0.123764,-0.773011,0.622203,0,-0.773011,0.634392,0,-0.881922,0.471396,0.091965,-0.881922,0.462338,0.108386,-0.83147,0.544894,0,-0.881922,0.471396,0.108386,-0.83147,0.544894,0,-0.83147,0.555569,0,-0.92388,0.382683,0.074658,-0.92388,0.375329,0.091965,-0.881922,0.462338,0,-0.92388,0.382683,0.091965,-0.881922,0.462338,0,-0.881922,0.471396,0,-0.956941,0.290284,0.056632,-0.956941,0.284706,0.074658,-0.92388,0.375329,0,-0.956941,0.290284,0.074658,-0.92388,0.375329,0,-0.92388,0.382683,0,-0.980785,0.19509,0.03806,-0.980785,0.191341,0.056632,-0.956941,0.284706,0,-0.980785,0.19509,0.056632,-0.956941,0.284706,0,-0.956941,0.290284,0,-0.995185,0.098016,0.019122,-0.995185,0.096133,0.03806,-0.980785,0.191341,0,-0.995185,0.098016,0.03806,-0.980785,0.191341,0,-0.980785,0.19509,-0.019122,-0.995185,0.096133,0,-0.995185,0.098016,0,-0.980785,0.19509,-0.019122,-0.995185,0.096133,0,-0.980785,0.19509,-0.03806,-0.980785,0.191341,-0.03806,-0.980785,0.191341,0,-0.980785,0.19509,0,-0.956941,0.290284,-0.03806,-0.980785,0.191341,0,-0.956941,0.290284,-0.056632,-0.956941,0.284706,-0.056632,-0.956941,0.284706,0,-0.956941,0.290284,0,-0.92388,0.382683,-0.056632,-0.956941,0.284706,0,-0.92388,0.382683,-0.074658,-0.92388,0.375329,-0.074658,-0.92388,0.375329,0,-0.92388,0.382683,0,-0.881922,0.471396,-0.074658,-0.92388,0.375329,0,-0.881922,0.471396,-0.091965,-0.881922,0.462338,-0.091965,-0.881922,0.462338,0,-0.881922,0.471396,0,-0.83147,0.555569,-0.091965,-0.881922,0.462338,0,-0.83147,0.555569,-0.108386,-0.83147,0.544894,-0.108386,-0.83147,0.544894,0,-0.83147,0.555569,0,-0.773011,0.634392,-0.108386,-0.83147,0.544894,0,-0.773011,0.634392,-0.123764,-0.773011,0.622203,-0.123764,-0.773011,0.622203,0,-0.773011,0.634392,0,-0.707107,0.707106,-0.123764,-0.773011,0.622203,0,-0.707107,0.707106,-0.137949,-0.707107,0.693519,-0.137949,-0.707107,0.693519,0,-0.707107,0.707106,-0.150807,-0.634394,0.758157,0,-0.707107,0.707106,0,-0.634394,0.77301,-0.150807,-0.634394,0.758157,-0.150807,-0.634394,0.758157,0,-0.634394,0.77301,0,-0.555571,0.831469,-0.150807,-0.634394,0.758157,0,-0.555571,0.831469,-0.162211,-0.555571,0.815493,-0.162211,-0.555571,0.815493,0,-0.555571,0.831469,0,-0.471397,0.881921,-0.162211,-0.555571,0.815493,0,-0.471397,0.881921,-0.172054,-0.471397,0.864975,-0.172054,-0.471397,0.864975,0,-0.471397,0.881921,0,-0.382684,0.923879,-0.172054,-0.471397,0.864975,0,-0.382684,0.923879,-0.18024,-0.382684,0.906127,-0.18024,-0.382684,0.906127,0,-0.382684,0.923879,0,-0.290285,0.95694,-0.18024,-0.382684,0.906127,0,-0.290285,0.95694,-0.18669,-0.290285,0.938552,-0.18669,-0.290285,0.938552,0,-0.290285,0.95694,-0.191341,-0.19509,0.961939,0,-0.290285,0.95694,0,-0.19509,0.980785,-0.191341,-0.19509,0.961939,-0.191341,-0.19509,0.961939,0,-0.19509,0.980785,0,-0.098017,0.995184,-0.191341,-0.19509,0.961939,0,-0.098017,0.995184,-0.194151,-0.098017,0.976062,-0.194151,-0.098017,0.976062,0,-0.098017,0.995184,-0.19509,0,0.980784,0,-0.098017,0.995184,0,0,0.999999,-0.19509,0,0.980784,-0.19509,0,0.980784,0,0,0.999999,0,0.098017,0.995184,-0.19509,0,0.980784,0,0.098017,0.995184,-0.194151,0.098017,0.976062,-0.194151,0.098017,0.976062,0,0.098017,0.995184,-0.191341,0.19509,0.961939,0,0.098017,0.995184,0,0.19509,0.980785,-0.191341,0.19509,0.961939,-0.191341,0.19509,0.961939,0,0.19509,0.980785,0,0.290285,0.95694,-0.191341,0.19509,0.961939,0,0.290285,0.95694,-0.18669,0.290285,0.938553,-0.18669,0.290285,0.938553,0,0.290285,0.95694,0,0.382683,0.923879,-0.18669,0.290285,0.938553,0,0.382683,0.923879,-0.18024,0.382683,0.906127,-0.18024,0.382683,0.906127,0,0.382683,0.923879,-0.172054,0.471397,0.864975,0,0.382683,0.923879,0,0.471397,0.881921,-0.172054,0.471397,0.864975,-0.172054,0.471397,0.864975,0,0.471397,0.881921,-0.162211,0.55557,0.815493,0,0.471397,0.881921,0,0.55557,0.831469,-0.162211,0.55557,0.815493,-0.162211,0.55557,0.815493,0,0.55557,0.831469,0,0.634393,0.77301,-0.162211,0.55557,0.815493,0,0.634393,0.77301,-0.150807,0.634393,0.758157,-0.150807,0.634393,0.758157,0,0.634393,0.77301,0,0.707107,0.707107,-0.150807,0.634393,0.758157,0,0.707107,0.707107,-0.13795,0.707107,0.69352,-0.13795,0.707107,0.69352,0,0.707107,0.707107,0,0.77301,0.634393,-0.13795,0.707107,0.69352,0,0.77301,0.634393,-0.123764,0.77301,0.622203,-0.123764,0.77301,0.622203,0,0.77301,0.634393,-0.108386,0.83147,0.544895,0,0.77301,0.634393,0,0.83147,0.55557,-0.108386,0.83147,0.544895,-0.108386,0.83147,0.544895,0,0.83147,0.55557,0,0.881921,0.471396,-0.108386,0.83147,0.544895,0,0.881921,0.471396,-0.091965,0.881921,0.462339,-0.091965,0.881921,0.462339,0,0.881921,0.471396,0,0.92388,0.382683,-0.091965,0.881921,0.462339,0,0.92388,0.382683,-0.074658,0.92388,0.37533,-0.074658,0.92388,0.37533,0,0.92388,0.382683,0,0.95694,0.290284,-0.074658,0.92388,0.37533,0,0.95694,0.290284,-0.056632,0.95694,0.284707,-0.056632,0.95694,0.284707,0,0.95694,0.290284,0,0.980785,0.19509,-0.056632,0.95694,0.284707,0,0.980785,0.19509,-0.03806,0.980785,0.191342,-0.03806,0.980785,0.191342,0,0.980785,0.19509,0,0.995185,0.098017,-0.03806,0.980785,0.191342,0,0.995185,0.098017,-0.019122,0.995185,0.096134,-0.074658,0.980785,0.18024,-0.03806,0.980785,0.191342,-0.019122,0.995185,0.096134,-0.074658,0.980785,0.18024,-0.019122,0.995185,0.096134,-0.03751,0.995185,0.090556,-0.111087,0.95694,0.268188,-0.056632,0.95694,0.284707,-0.03806,0.980785,0.191342,-0.111087,0.95694,0.268188,-0.03806,0.980785,0.191342,-0.074658,0.980785,0.18024,-0.146447,0.92388,0.353553,-0.074658,0.92388,0.37533,-0.056632,0.95694,0.284707,-0.146447,0.92388,0.353553,-0.056632,0.95694,0.284707,-0.111087,0.95694,0.268188,-0.180396,0.881921,0.435514,-0.091965,0.881921,0.462339,-0.074658,0.92388,0.37533,-0.180396,0.881921,0.435514,-0.074658,0.92388,0.37533,-0.146447,0.92388,0.353553,-0.212607,0.83147,0.51328,-0.108386,0.83147,0.544895,-0.091965,0.881921,0.462339,-0.212607,0.83147,0.51328,-0.091965,0.881921,0.462339,-0.180396,0.881921,0.435514,-0.242772,0.77301,0.586103,-0.123764,0.77301,0.622203,-0.212607,0.83147,0.51328,-0.123764,0.77301,0.622203,-0.108386,0.83147,0.544895,-0.212607,0.83147,0.51328,-0.270598,0.707107,0.653281,-0.13795,0.707107,0.69352,-0.123764,0.77301,0.622203,-0.270598,0.707107,0.653281,-0.123764,0.77301,0.622203,-0.242772,0.77301,0.586103,-0.295818,0.634393,0.714168,-0.150807,0.634393,0.758157,-0.13795,0.707107,0.69352,-0.295818,0.634393,0.714168,-0.13795,0.707107,0.69352,-0.270598,0.707107,0.653281,-0.318189,0.55557,0.768177,-0.162211,0.55557,0.815493,-0.150807,0.634393,0.758157,-0.318189,0.55557,0.768177,-0.150807,0.634393,0.758157,-0.295818,0.634393,0.714168,-0.337496,0.471397,0.814788,-0.172054,0.471397,0.864975,-0.318189,0.55557,0.768177,-0.172054,0.471397,0.864975,-0.162211,0.55557,0.815493,-0.318189,0.55557,0.768177,-0.353553,0.382683,0.853553,-0.18024,0.382683,0.906127,-0.337496,0.471397,0.814788,-0.18024,0.382683,0.906127,-0.172054,0.471397,0.864975,-0.337496,0.471397,0.814788,-0.366205,0.290285,0.884097,-0.18669,0.290285,0.938553,-0.18024,0.382683,0.906127,-0.366205,0.290285,0.884097,-0.18024,0.382683,0.906127,-0.353553,0.382683,0.853553,-0.37533,0.19509,0.906127,-0.191341,0.19509,0.961939,-0.18669,0.290285,0.938553,-0.37533,0.19509,0.906127,-0.18669,0.290285,0.938553,-0.366205,0.290285,0.884097,-0.38084,0.098017,0.91943,-0.194151,0.098017,0.976062,-0.37533,0.19509,0.906127,-0.194151,0.098017,0.976062,-0.191341,0.19509,0.961939,-0.37533,0.19509,0.906127,-0.382683,0,0.923879,-0.19509,0,0.980784,-0.194151,0.098017,0.976062,-0.382683,0,0.923879,-0.194151,0.098017,0.976062,-0.38084,0.098017,0.91943,-0.38084,-0.098017,0.91943,-0.194151,-0.098017,0.976062,-0.382683,0,0.923879,-0.194151,-0.098017,0.976062,-0.19509,0,0.980784,-0.382683,0,0.923879,-0.37533,-0.19509,0.906127,-0.191341,-0.19509,0.961939,-0.194151,-0.098017,0.976062,-0.37533,-0.19509,0.906127,-0.194151,-0.098017,0.976062,-0.38084,-0.098017,0.91943,-0.366205,-0.290285,0.884097,-0.18669,-0.290285,0.938552,-0.37533,-0.19509,0.906127,-0.18669,-0.290285,0.938552,-0.191341,-0.19509,0.961939,-0.37533,-0.19509,0.906127,-0.353553,-0.382684,0.853553,-0.18024,-0.382684,0.906127,-0.18669,-0.290285,0.938552,-0.353553,-0.382684,0.853553,-0.18669,-0.290285,0.938552,-0.366205,-0.290285,0.884097,-0.337496,-0.471397,0.814788,-0.172054,-0.471397,0.864975,-0.18024,-0.382684,0.906127,-0.337496,-0.471397,0.814788,-0.18024,-0.382684,0.906127,-0.353553,-0.382684,0.853553,-0.318189,-0.555571,0.768177,-0.162211,-0.555571,0.815493,-0.172054,-0.471397,0.864975,-0.318189,-0.555571,0.768177,-0.172054,-0.471397,0.864975,-0.337496,-0.471397,0.814788,-0.295818,-0.634394,0.714168,-0.150807,-0.634394,0.758157,-0.162211,-0.555571,0.815493,-0.295818,-0.634394,0.714168,-0.162211,-0.555571,0.815493,-0.318189,-0.555571,0.768177,-0.270598,-0.707107,0.653281,-0.137949,-0.707107,0.693519,-0.295818,-0.634394,0.714168,-0.137949,-0.707107,0.693519,-0.150807,-0.634394,0.758157,-0.295818,-0.634394,0.714168,-0.242771,-0.773011,0.586102,-0.123764,-0.773011,0.622203,-0.137949,-0.707107,0.693519,-0.242771,-0.773011,0.586102,-0.137949,-0.707107,0.693519,-0.270598,-0.707107,0.653281,-0.212607,-0.83147,0.513279,-0.108386,-0.83147,0.544894,-0.123764,-0.773011,0.622203,-0.212607,-0.83147,0.513279,-0.123764,-0.773011,0.622203,-0.242771,-0.773011,0.586102,-0.180395,-0.881922,0.435513,-0.091965,-0.881922,0.462338,-0.108386,-0.83147,0.544894,-0.180395,-0.881922,0.435513,-0.108386,-0.83147,0.544894,-0.212607,-0.83147,0.513279,-0.146446,-0.92388,0.353553,-0.074658,-0.92388,0.375329,-0.091965,-0.881922,0.462338,-0.146446,-0.92388,0.353553,-0.091965,-0.881922,0.462338,-0.180395,-0.881922,0.435513,-0.111087,-0.956941,0.268187,-0.056632,-0.956941,0.284706,-0.074658,-0.92388,0.375329,-0.111087,-0.956941,0.268187,-0.074658,-0.92388,0.375329,-0.146446,-0.92388,0.353553,-0.074657,-0.980785,0.180239,-0.03806,-0.980785,0.191341,-0.056632,-0.956941,0.284706,-0.074657,-0.980785,0.180239,-0.056632,-0.956941,0.284706,-0.111087,-0.956941,0.268187,-0.037509,-0.995185,0.090555,-0.019122,-0.995185,0.096133,-0.03806,-0.980785,0.191341,-0.037509,-0.995185,0.090555,-0.03806,-0.980785,0.191341,-0.074657,-0.980785,0.180239,-0.054455,-0.995185,0.081498,-0.037509,-0.995185,0.090555,-0.074657,-0.980785,0.180239,-0.054455,-0.995185,0.081498,-0.074657,-0.980785,0.180239,-0.108386,-0.980785,0.162211,-0.108386,-0.980785,0.162211,-0.074657,-0.980785,0.180239,-0.111087,-0.956941,0.268187,-0.108386,-0.980785,0.162211,-0.111087,-0.956941,0.268187,-0.161273,-0.956941,0.241362,-0.161273,-0.956941,0.241362,-0.111087,-0.956941,0.268187,-0.146446,-0.92388,0.353553,-0.161273,-0.956941,0.241362,-0.146446,-0.92388,0.353553,-0.212607,-0.92388,0.318189,-0.212607,-0.92388,0.318189,-0.146446,-0.92388,0.353553,-0.180395,-0.881922,0.435513,-0.212607,-0.92388,0.318189,-0.180395,-0.881922,0.435513,-0.261894,-0.881922,0.391951,-0.261894,-0.881922,0.391951,-0.180395,-0.881922,0.435513,-0.212607,-0.83147,0.513279,-0.261894,-0.881922,0.391951,-0.212607,-0.83147,0.513279,-0.308658,-0.83147,0.461939,-0.308658,-0.83147,0.461939,-0.212607,-0.83147,0.513279,-0.242771,-0.773011,0.586102,-0.308658,-0.83147,0.461939,-0.242771,-0.773011,0.586102,-0.352449,-0.773011,0.527478,-0.352449,-0.773011,0.527478,-0.242771,-0.773011,0.586102,-0.270598,-0.707107,0.653281,-0.352449,-0.773011,0.527478,-0.270598,-0.707107,0.653281,-0.392847,-0.707107,0.587937,-0.392847,-0.707107,0.587937,-0.270598,-0.707107,0.653281,-0.429461,-0.634394,0.642734,-0.270598,-0.707107,0.653281,-0.295818,-0.634394,0.714168,-0.429461,-0.634394,0.642734,-0.429461,-0.634394,0.642734,-0.295818,-0.634394,0.714168,-0.318189,-0.555571,0.768177,-0.429461,-0.634394,0.642734,-0.318189,-0.555571,0.768177,-0.461939,-0.555571,0.691341,-0.461939,-0.555571,0.691341,-0.318189,-0.555571,0.768177,-0.337496,-0.471397,0.814788,-0.461939,-0.555571,0.691341,-0.337496,-0.471397,0.814788,-0.489969,-0.471397,0.73329,-0.489969,-0.471397,0.73329,-0.337496,-0.471397,0.814788,-0.353553,-0.382684,0.853553,-0.489969,-0.471397,0.73329,-0.353553,-0.382684,0.853553,-0.51328,-0.382684,0.768177,-0.51328,-0.382684,0.768177,-0.353553,-0.382684,0.853553,-0.366205,-0.290285,0.884097,-0.51328,-0.382684,0.768177,-0.366205,-0.290285,0.884097,-0.531647,-0.290285,0.795666,-0.531647,-0.290285,0.795666,-0.366205,-0.290285,0.884097,-0.544895,-0.195091,0.815493,-0.366205,-0.290285,0.884097,-0.37533,-0.19509,0.906127,-0.544895,-0.195091,0.815493,-0.544895,-0.195091,0.815493,-0.37533,-0.19509,0.906127,-0.38084,-0.098017,0.91943,-0.544895,-0.195091,0.815493,-0.38084,-0.098017,0.91943,-0.552894,-0.098017,0.827465,-0.552894,-0.098017,0.827465,-0.38084,-0.098017,0.91943,-0.555569,0,0.831469,-0.38084,-0.098017,0.91943,-0.382683,0,0.923879,-0.555569,0,0.831469,-0.555569,0,0.831469,-0.382683,0,0.923879,-0.38084,0.098017,0.91943,-0.555569,0,0.831469,-0.38084,0.098017,0.91943,-0.552894,0.098017,0.827465,-0.552894,0.098017,0.827465,-0.38084,0.098017,0.91943,-0.544895,0.19509,0.815493,-0.38084,0.098017,0.91943,-0.37533,0.19509,0.906127,-0.544895,0.19509,0.815493,-0.544895,0.19509,0.815493,-0.37533,0.19509,0.906127,-0.366205,0.290285,0.884097,-0.544895,0.19509,0.815493,-0.366205,0.290285,0.884097,-0.531647,0.290285,0.795667,-0.531647,0.290285,0.795667,-0.366205,0.290285,0.884097,-0.353553,0.382683,0.853553,-0.531647,0.290285,0.795667,-0.353553,0.382683,0.853553,-0.51328,0.382683,0.768177,-0.51328,0.382683,0.768177,-0.353553,0.382683,0.853553,-0.489969,0.471397,0.73329,-0.353553,0.382683,0.853553,-0.337496,0.471397,0.814788,-0.489969,0.471397,0.73329,-0.489969,0.471397,0.73329,-0.337496,0.471397,0.814788,-0.461939,0.55557,0.691341,-0.337496,0.471397,0.814788,-0.318189,0.55557,0.768177,-0.461939,0.55557,0.691341,-0.461939,0.55557,0.691341,-0.318189,0.55557,0.768177,-0.295818,0.634393,0.714168,-0.461939,0.55557,0.691341,-0.295818,0.634393,0.714168,-0.429461,0.634393,0.642735,-0.429461,0.634393,0.642735,-0.295818,0.634393,0.714168,-0.270598,0.707107,0.653281,-0.429461,0.634393,0.642735,-0.270598,0.707107,0.653281,-0.392847,0.707107,0.587938,-0.392847,0.707107,0.587938,-0.270598,0.707107,0.653281,-0.242772,0.77301,0.586103,-0.392847,0.707107,0.587938,-0.242772,0.77301,0.586103,-0.35245,0.77301,0.527478,-0.35245,0.77301,0.527478,-0.242772,0.77301,0.586103,-0.308658,0.83147,0.461939,-0.242772,0.77301,0.586103,-0.212607,0.83147,0.51328,-0.308658,0.83147,0.461939,-0.308658,0.83147,0.461939,-0.212607,0.83147,0.51328,-0.180396,0.881921,0.435514,-0.308658,0.83147,0.461939,-0.180396,0.881921,0.435514,-0.261894,0.881921,0.391952,-0.261894,0.881921,0.391952,-0.180396,0.881921,0.435514,-0.146447,0.92388,0.353553,-0.261894,0.881921,0.391952,-0.146447,0.92388,0.353553,-0.212607,0.92388,0.31819,-0.212607,0.92388,0.31819,-0.146447,0.92388,0.353553,-0.111087,0.95694,0.268188,-0.212607,0.92388,0.31819,-0.111087,0.95694,0.268188,-0.161273,0.95694,0.241363,-0.161273,0.95694,0.241363,-0.111087,0.95694,0.268188,-0.074658,0.980785,0.18024,-0.161273,0.95694,0.241363,-0.074658,0.980785,0.18024,-0.108386,0.980785,0.162212,-0.108386,0.980785,0.162212,-0.074658,0.980785,0.18024,-0.03751,0.995185,0.090556,-0.108386,0.980785,0.162212,-0.03751,0.995185,0.090556,-0.054455,0.995185,0.081498,-0.13795,0.980785,0.13795,-0.108386,0.980785,0.162212,-0.054455,0.995185,0.081498,-0.13795,0.980785,0.13795,-0.054455,0.995185,0.081498,-0.069309,0.995185,0.069309,-0.205262,0.95694,0.205262,-0.161273,0.95694,0.241363,-0.108386,0.980785,0.162212,-0.205262,0.95694,0.205262,-0.108386,0.980785,0.162212,-0.13795,0.980785,0.13795,-0.270598,0.92388,0.270598,-0.212607,0.92388,0.31819,-0.161273,0.95694,0.241363,-0.270598,0.92388,0.270598,-0.161273,0.95694,0.241363,-0.205262,0.95694,0.205262,-0.333328,0.881921,0.333328,-0.261894,0.881921,0.391952,-0.212607,0.92388,0.31819,-0.333328,0.881921,0.333328,-0.212607,0.92388,0.31819,-0.270598,0.92388,0.270598,-0.392847,0.83147,0.392847,-0.308658,0.83147,0.461939,-0.261894,0.881921,0.391952,-0.392847,0.83147,0.392847,-0.261894,0.881921,0.391952,-0.333328,0.881921,0.333328,-0.448583,0.77301,0.448583,-0.35245,0.77301,0.527478,-0.392847,0.83147,0.392847,-0.35245,0.77301,0.527478,-0.308658,0.83147,0.461939,-0.392847,0.83147,0.392847,-0.5,0.707107,0.5,-0.392847,0.707107,0.587938,-0.35245,0.77301,0.527478,-0.5,0.707107,0.5,-0.35245,0.77301,0.527478,-0.448583,0.77301,0.448583,-0.546601,0.634393,0.546601,-0.429461,0.634393,0.642735,-0.392847,0.707107,0.587938,-0.546601,0.634393,0.546601,-0.392847,0.707107,0.587938,-0.5,0.707107,0.5,-0.587937,0.55557,0.587938,-0.461939,0.55557,0.691341,-0.429461,0.634393,0.642735,-0.587937,0.55557,0.587938,-0.429461,0.634393,0.642735,-0.546601,0.634393,0.546601,-0.623612,0.471397,0.623612,-0.489969,0.471397,0.73329,-0.587937,0.55557,0.587938,-0.489969,0.471397,0.73329,-0.461939,0.55557,0.691341,-0.587937,0.55557,0.587938,-0.653281,0.382683,0.653281,-0.51328,0.382683,0.768177,-0.623612,0.471397,0.623612,-0.51328,0.382683,0.768177,-0.489969,0.471397,0.73329,-0.623612,0.471397,0.623612,-0.676659,0.290285,0.676659,-0.531647,0.290285,0.795667,-0.51328,0.382683,0.768177,-0.676659,0.290285,0.676659,-0.51328,0.382683,0.768177,-0.653281,0.382683,0.653281,-0.69352,0.19509,0.69352,-0.544895,0.19509,0.815493,-0.531647,0.290285,0.795667,-0.69352,0.19509,0.69352,-0.531647,0.290285,0.795667,-0.676659,0.290285,0.676659,-0.703701,0.098017,0.703701,-0.552894,0.098017,0.827465,-0.69352,0.19509,0.69352,-0.552894,0.098017,0.827465,-0.544895,0.19509,0.815493,-0.69352,0.19509,0.69352,-0.707106,0,0.707106,-0.555569,0,0.831469,-0.552894,0.098017,0.827465,-0.707106,0,0.707106,-0.552894,0.098017,0.827465,-0.703701,0.098017,0.703701,-0.703701,-0.098017,0.703701,-0.552894,-0.098017,0.827465,-0.707106,0,0.707106,-0.552894,-0.098017,0.827465,-0.555569,0,0.831469,-0.707106,0,0.707106,-0.69352,-0.195091,0.69352,-0.544895,-0.195091,0.815493,-0.552894,-0.098017,0.827465,-0.69352,-0.195091,0.69352,-0.552894,-0.098017,0.827465,-0.703701,-0.098017,0.703701,-0.676659,-0.290285,0.676659,-0.531647,-0.290285,0.795666,-0.69352,-0.195091,0.69352,-0.531647,-0.290285,0.795666,-0.544895,-0.195091,0.815493,-0.69352,-0.195091,0.69352,-0.653281,-0.382684,0.653281,-0.51328,-0.382684,0.768177,-0.531647,-0.290285,0.795666,-0.653281,-0.382684,0.653281,-0.531647,-0.290285,0.795666,-0.676659,-0.290285,0.676659,-0.623612,-0.471397,0.623612,-0.489969,-0.471397,0.73329,-0.51328,-0.382684,0.768177,-0.623612,-0.471397,0.623612,-0.51328,-0.382684,0.768177,-0.653281,-0.382684,0.653281,-0.587937,-0.555571,0.587937,-0.461939,-0.555571,0.691341,-0.489969,-0.471397,0.73329,-0.587937,-0.555571,0.587937,-0.489969,-0.471397,0.73329,-0.623612,-0.471397,0.623612,-0.5466,-0.634394,0.546601,-0.429461,-0.634394,0.642734,-0.461939,-0.555571,0.691341,-0.5466,-0.634394,0.546601,-0.461939,-0.555571,0.691341,-0.587937,-0.555571,0.587937,-0.499999,-0.707107,0.5,-0.392847,-0.707107,0.587937,-0.429461,-0.634394,0.642734,-0.499999,-0.707107,0.5,-0.429461,-0.634394,0.642734,-0.5466,-0.634394,0.546601,-0.448583,-0.773011,0.448583,-0.352449,-0.773011,0.527478,-0.392847,-0.707107,0.587937,-0.448583,-0.773011,0.448583,-0.392847,-0.707107,0.587937,-0.499999,-0.707107,0.5,-0.392847,-0.83147,0.392847,-0.308658,-0.83147,0.461939,-0.352449,-0.773011,0.527478,-0.392847,-0.83147,0.392847,-0.352449,-0.773011,0.527478,-0.448583,-0.773011,0.448583,-0.333327,-0.881922,0.333327,-0.261894,-0.881922,0.391951,-0.308658,-0.83147,0.461939,-0.333327,-0.881922,0.333327,-0.308658,-0.83147,0.461939,-0.392847,-0.83147,0.392847,-0.270597,-0.92388,0.270597,-0.212607,-0.92388,0.318189,-0.261894,-0.881922,0.391951,-0.270597,-0.92388,0.270597,-0.261894,-0.881922,0.391951,-0.333327,-0.881922,0.333327,-0.205262,-0.956941,0.205262,-0.161273,-0.956941,0.241362,-0.212607,-0.92388,0.318189,-0.205262,-0.956941,0.205262,-0.212607,-0.92388,0.318189,-0.270597,-0.92388,0.270597,-0.137949,-0.980785,0.137949,-0.108386,-0.980785,0.162211,-0.161273,-0.956941,0.241362,-0.137949,-0.980785,0.137949,-0.161273,-0.956941,0.241362,-0.205262,-0.956941,0.205262,-0.069308,-0.995185,0.069308,-0.054455,-0.995185,0.081498,-0.108386,-0.980785,0.162211,-0.069308,-0.995185,0.069308,-0.108386,-0.980785,0.162211,-0.137949,-0.980785,0.137949,-0.081498,-0.995185,0.054455,-0.069308,-0.995185,0.069308,-0.137949,-0.980785,0.137949,-0.081498,-0.995185,0.054455,-0.137949,-0.980785,0.137949,-0.162211,-0.980785,0.108386,-0.162211,-0.980785,0.108386,-0.137949,-0.980785,0.137949,-0.205262,-0.956941,0.205262,-0.162211,-0.980785,0.108386,-0.205262,-0.956941,0.205262,-0.241362,-0.956941,0.161273,-0.241362,-0.956941,0.161273,-0.205262,-0.956941,0.205262,-0.270597,-0.92388,0.270597,-0.241362,-0.956941,0.161273,-0.270597,-0.92388,0.270597,-0.318189,-0.92388,0.212607,-0.318189,-0.92388,0.212607,-0.270597,-0.92388,0.270597,-0.333327,-0.881922,0.333327,-0.318189,-0.92388,0.212607,-0.333327,-0.881922,0.333327,-0.391951,-0.881922,0.261894,-0.391951,-0.881922,0.261894,-0.333327,-0.881922,0.333327,-0.392847,-0.83147,0.392847,-0.391951,-0.881922,0.261894,-0.392847,-0.83147,0.392847,-0.461939,-0.83147,0.308658,-0.461939,-0.83147,0.308658,-0.392847,-0.83147,0.392847,-0.448583,-0.773011,0.448583,-0.461939,-0.83147,0.308658,-0.448583,-0.773011,0.448583,-0.527478,-0.773011,0.35245,-0.527478,-0.773011,0.35245,-0.448583,-0.773011,0.448583,-0.499999,-0.707107,0.5,-0.527478,-0.773011,0.35245,-0.499999,-0.707107,0.5,-0.587937,-0.707107,0.392847,-0.587937,-0.707107,0.392847,-0.499999,-0.707107,0.5,-0.642734,-0.634394,0.429461,-0.499999,-0.707107,0.5,-0.5466,-0.634394,0.546601,-0.642734,-0.634394,0.429461,-0.642734,-0.634394,0.429461,-0.5466,-0.634394,0.546601,-0.587937,-0.555571,0.587937,-0.642734,-0.634394,0.429461,-0.587937,-0.555571,0.587937,-0.691341,-0.555571,0.46194,-0.691341,-0.555571,0.46194,-0.587937,-0.555571,0.587937,-0.623612,-0.471397,0.623612,-0.691341,-0.555571,0.46194,-0.623612,-0.471397,0.623612,-0.73329,-0.471397,0.489969,-0.73329,-0.471397,0.489969,-0.623612,-0.471397,0.623612,-0.653281,-0.382684,0.653281,-0.73329,-0.471397,0.489969,-0.653281,-0.382684,0.653281,-0.768177,-0.382684,0.51328,-0.768177,-0.382684,0.51328,-0.653281,-0.382684,0.653281,-0.676659,-0.290285,0.676659,-0.768177,-0.382684,0.51328,-0.676659,-0.290285,0.676659,-0.795666,-0.290285,0.531647,-0.795666,-0.290285,0.531647,-0.676659,-0.290285,0.676659,-0.815493,-0.195091,0.544895,-0.676659,-0.290285,0.676659,-0.69352,-0.195091,0.69352,-0.815493,-0.195091,0.544895,-0.815493,-0.195091,0.544895,-0.69352,-0.195091,0.69352,-0.703701,-0.098017,0.703701,-0.815493,-0.195091,0.544895,-0.703701,-0.098017,0.703701,-0.827465,-0.098017,0.552895,-0.827465,-0.098017,0.552895,-0.703701,-0.098017,0.703701,-0.831469,0,0.55557,-0.703701,-0.098017,0.703701,-0.707106,0,0.707106,-0.831469,0,0.55557,-0.831469,0,0.55557,-0.707106,0,0.707106,-0.703701,0.098017,0.703701,-0.831469,0,0.55557,-0.703701,0.098017,0.703701,-0.827465,0.098017,0.552895,-0.827465,0.098017,0.552895,-0.703701,0.098017,0.703701,-0.815493,0.19509,0.544895,-0.703701,0.098017,0.703701,-0.69352,0.19509,0.69352,-0.815493,0.19509,0.544895,-0.815493,0.19509,0.544895,-0.69352,0.19509,0.69352,-0.676659,0.290285,0.676659,-0.815493,0.19509,0.544895,-0.676659,0.290285,0.676659,-0.795666,0.290285,0.531648,-0.795666,0.290285,0.531648,-0.676659,0.290285,0.676659,-0.653281,0.382683,0.653281,-0.795666,0.290285,0.531648,-0.653281,0.382683,0.653281,-0.768178,0.382683,0.51328,-0.768178,0.382683,0.51328,-0.653281,0.382683,0.653281,-0.73329,0.471397,0.489969,-0.653281,0.382683,0.653281,-0.623612,0.471397,0.623612,-0.73329,0.471397,0.489969,-0.73329,0.471397,0.489969,-0.623612,0.471397,0.623612,-0.691341,0.55557,0.46194,-0.623612,0.471397,0.623612,-0.587937,0.55557,0.587938,-0.691341,0.55557,0.46194,-0.691341,0.55557,0.46194,-0.587937,0.55557,0.587938,-0.546601,0.634393,0.546601,-0.691341,0.55557,0.46194,-0.546601,0.634393,0.546601,-0.642734,0.634393,0.429462,-0.642734,0.634393,0.429462,-0.546601,0.634393,0.546601,-0.5,0.707107,0.5,-0.642734,0.634393,0.429462,-0.5,0.707107,0.5,-0.587938,0.707107,0.392847,-0.587938,0.707107,0.392847,-0.5,0.707107,0.5,-0.448583,0.77301,0.448583,-0.587938,0.707107,0.392847,-0.448583,0.77301,0.448583,-0.527478,0.77301,0.35245,-0.527478,0.77301,0.35245,-0.448583,0.77301,0.448583,-0.461939,0.83147,0.308658,-0.448583,0.77301,0.448583,-0.392847,0.83147,0.392847,-0.461939,0.83147,0.308658,-0.461939,0.83147,0.308658,-0.392847,0.83147,0.392847,-0.333328,0.881921,0.333328,-0.461939,0.83147,0.308658,-0.333328,0.881921,0.333328,-0.391952,0.881921,0.261894,-0.391952,0.881921,0.261894,-0.333328,0.881921,0.333328,-0.270598,0.92388,0.270598,-0.391952,0.881921,0.261894,-0.270598,0.92388,0.270598,-0.31819,0.92388,0.212607,-0.31819,0.92388,0.212607,-0.270598,0.92388,0.270598,-0.205262,0.95694,0.205262,-0.31819,0.92388,0.212607,-0.205262,0.95694,0.205262,-0.241363,0.95694,0.161273,-0.241363,0.95694,0.161273,-0.205262,0.95694,0.205262,-0.13795,0.980785,0.13795,-0.241363,0.95694,0.161273,-0.13795,0.980785,0.13795,-0.162212,0.980785,0.108386,-0.162212,0.980785,0.108386,-0.13795,0.980785,0.13795,-0.069309,0.995185,0.069309,-0.162212,0.980785,0.108386,-0.069309,0.995185,0.069309,-0.081498,0.995185,0.054455,-0.18024,0.980785,0.074658,-0.162212,0.980785,0.108386,-0.081498,0.995185,0.054455,-0.18024,0.980785,0.074658,-0.081498,0.995185,0.054455,-0.090556,0.995185,0.037509,-0.268188,0.95694,0.111087,-0.241363,0.95694,0.161273,-0.162212,0.980785,0.108386,-0.268188,0.95694,0.111087,-0.162212,0.980785,0.108386,-0.18024,0.980785,0.074658,-0.353553,0.92388,0.146447,-0.31819,0.92388,0.212607,-0.241363,0.95694,0.161273,-0.353553,0.92388,0.146447,-0.241363,0.95694,0.161273,-0.268188,0.95694,0.111087,-0.435514,0.881921,0.180396,-0.391952,0.881921,0.261894,-0.31819,0.92388,0.212607,-0.435514,0.881921,0.180396,-0.31819,0.92388,0.212607,-0.353553,0.92388,0.146447,-0.51328,0.83147,0.212607,-0.461939,0.83147,0.308658,-0.391952,0.881921,0.261894,-0.51328,0.83147,0.212607,-0.391952,0.881921,0.261894,-0.435514,0.881921,0.180396,-0.586103,0.77301,0.242772,-0.527478,0.77301,0.35245,-0.51328,0.83147,0.212607,-0.527478,0.77301,0.35245,-0.461939,0.83147,0.308658,-0.51328,0.83147,0.212607,-0.653281,0.707107,0.270598,-0.587938,0.707107,0.392847,-0.527478,0.77301,0.35245,-0.653281,0.707107,0.270598,-0.527478,0.77301,0.35245,-0.586103,0.77301,0.242772,-0.714168,0.634393,0.295818,-0.642734,0.634393,0.429462,-0.587938,0.707107,0.392847,-0.714168,0.634393,0.295818,-0.587938,0.707107,0.392847,-0.653281,0.707107,0.270598,-0.768177,0.55557,0.31819,-0.691341,0.55557,0.46194,-0.642734,0.634393,0.429462,-0.768177,0.55557,0.31819,-0.642734,0.634393,0.429462,-0.714168,0.634393,0.295818,-0.814789,0.471397,0.337496,-0.73329,0.471397,0.489969,-0.768177,0.55557,0.31819,-0.73329,0.471397,0.489969,-0.691341,0.55557,0.46194,-0.768177,0.55557,0.31819,-0.853553,0.382683,0.353553,-0.768178,0.382683,0.51328,-0.814789,0.471397,0.337496,-0.768178,0.382683,0.51328,-0.73329,0.471397,0.489969,-0.814789,0.471397,0.337496,-0.884097,0.290285,0.366205,-0.795666,0.290285,0.531648,-0.768178,0.382683,0.51328,-0.884097,0.290285,0.366205,-0.768178,0.382683,0.51328,-0.853553,0.382683,0.353553,-0.906127,0.19509,0.37533,-0.815493,0.19509,0.544895,-0.795666,0.290285,0.531648,-0.906127,0.19509,0.37533,-0.795666,0.290285,0.531648,-0.884097,0.290285,0.366205,-0.91943,0.098017,0.380841,-0.827465,0.098017,0.552895,-0.815493,0.19509,0.544895,-0.91943,0.098017,0.380841,-0.815493,0.19509,0.544895,-0.906127,0.19509,0.37533,-0.923879,0,0.382683,-0.831469,0,0.55557,-0.827465,0.098017,0.552895,-0.923879,0,0.382683,-0.827465,0.098017,0.552895,-0.91943,0.098017,0.380841,-0.91943,-0.098017,0.380841,-0.827465,-0.098017,0.552895,-0.923879,0,0.382683,-0.827465,-0.098017,0.552895,-0.831469,0,0.55557,-0.923879,0,0.382683,-0.906127,-0.195091,0.37533,-0.815493,-0.195091,0.544895,-0.827465,-0.098017,0.552895,-0.906127,-0.195091,0.37533,-0.827465,-0.098017,0.552895,-0.91943,-0.098017,0.380841,-0.884097,-0.290285,0.366205,-0.795666,-0.290285,0.531647,-0.906127,-0.195091,0.37533,-0.795666,-0.290285,0.531647,-0.815493,-0.195091,0.544895,-0.906127,-0.195091,0.37533,-0.853553,-0.382684,0.353553,-0.768177,-0.382684,0.51328,-0.795666,-0.290285,0.531647,-0.853553,-0.382684,0.353553,-0.795666,-0.290285,0.531647,-0.884097,-0.290285,0.366205,-0.814788,-0.471397,0.337497,-0.73329,-0.471397,0.489969,-0.768177,-0.382684,0.51328,-0.814788,-0.471397,0.337497,-0.768177,-0.382684,0.51328,-0.853553,-0.382684,0.353553,-0.768177,-0.555571,0.31819,-0.691341,-0.555571,0.46194,-0.73329,-0.471397,0.489969,-0.768177,-0.555571,0.31819,-0.73329,-0.471397,0.489969,-0.814788,-0.471397,0.337497,-0.714168,-0.634394,0.295818,-0.642734,-0.634394,0.429461,-0.691341,-0.555571,0.46194,-0.714168,-0.634394,0.295818,-0.691341,-0.555571,0.46194,-0.768177,-0.555571,0.31819,-0.653281,-0.707107,0.270598,-0.587937,-0.707107,0.392847,-0.714168,-0.634394,0.295818,-0.587937,-0.707107,0.392847,-0.642734,-0.634394,0.429461,-0.714168,-0.634394,0.295818,-0.586102,-0.773011,0.242772,-0.527478,-0.773011,0.35245,-0.587937,-0.707107,0.392847,-0.586102,-0.773011,0.242772,-0.587937,-0.707107,0.392847,-0.653281,-0.707107,0.270598,-0.513279,-0.83147,0.212607,-0.461939,-0.83147,0.308658,-0.527478,-0.773011,0.35245,-0.513279,-0.83147,0.212607,-0.527478,-0.773011,0.35245,-0.586102,-0.773011,0.242772,-0.435513,-0.881922,0.180396,-0.391951,-0.881922,0.261894,-0.461939,-0.83147,0.308658,-0.435513,-0.881922,0.180396,-0.461939,-0.83147,0.308658,-0.513279,-0.83147,0.212607,-0.353553,-0.92388,0.146446,-0.318189,-0.92388,0.212607,-0.391951,-0.881922,0.261894,-0.353553,-0.92388,0.146446,-0.391951,-0.881922,0.261894,-0.435513,-0.881922,0.180396,-0.268187,-0.956941,0.111087,-0.241362,-0.956941,0.161273,-0.318189,-0.92388,0.212607,-0.268187,-0.956941,0.111087,-0.318189,-0.92388,0.212607,-0.353553,-0.92388,0.146446,-0.180239,-0.980785,0.074658,-0.162211,-0.980785,0.108386,-0.241362,-0.956941,0.161273,-0.180239,-0.980785,0.074658,-0.241362,-0.956941,0.161273,-0.268187,-0.956941,0.111087,-0.090555,-0.995185,0.037509,-0.081498,-0.995185,0.054455,-0.162211,-0.980785,0.108386,-0.090555,-0.995185,0.037509,-0.162211,-0.980785,0.108386,-0.180239,-0.980785,0.074658,-0.096133,-0.995185,0.019122,-0.090555,-0.995185,0.037509,-0.180239,-0.980785,0.074658,-0.096133,-0.995185,0.019122,-0.180239,-0.980785,0.074658,-0.191341,-0.980785,0.03806,-0.191341,-0.980785,0.03806,-0.180239,-0.980785,0.074658,-0.268187,-0.956941,0.111087,-0.191341,-0.980785,0.03806,-0.268187,-0.956941,0.111087,-0.284706,-0.956941,0.056632,-0.284706,-0.956941,0.056632,-0.268187,-0.956941,0.111087,-0.353553,-0.92388,0.146446,-0.284706,-0.956941,0.056632,-0.353553,-0.92388,0.146446,-0.375329,-0.92388,0.074658,-0.375329,-0.92388,0.074658,-0.353553,-0.92388,0.146446,-0.435513,-0.881922,0.180396,-0.375329,-0.92388,0.074658,-0.435513,-0.881922,0.180396,-0.462338,-0.881922,0.091965,-0.462338,-0.881922,0.091965,-0.435513,-0.881922,0.180396,-0.513279,-0.83147,0.212607,-0.462338,-0.881922,0.091965,-0.513279,-0.83147,0.212607,-0.544894,-0.83147,0.108386,-0.544894,-0.83147,0.108386,-0.513279,-0.83147,0.212607,-0.586102,-0.773011,0.242772,-0.544894,-0.83147,0.108386,-0.586102,-0.773011,0.242772,-0.622203,-0.773011,0.123764,-0.622203,-0.773011,0.123764,-0.586102,-0.773011,0.242772,-0.653281,-0.707107,0.270598,-0.622203,-0.773011,0.123764,-0.653281,-0.707107,0.270598,-0.693519,-0.707107,0.13795,-0.693519,-0.707107,0.13795,-0.653281,-0.707107,0.270598,-0.758157,-0.634394,0.150807,-0.653281,-0.707107,0.270598,-0.714168,-0.634394,0.295818,-0.758157,-0.634394,0.150807,-0.758157,-0.634394,0.150807,-0.714168,-0.634394,0.295818,-0.768177,-0.555571,0.31819,-0.758157,-0.634394,0.150807,-0.768177,-0.555571,0.31819,-0.815493,-0.555571,0.162212,-0.815493,-0.555571,0.162212,-0.768177,-0.555571,0.31819,-0.814788,-0.471397,0.337497,-0.815493,-0.555571,0.162212,-0.814788,-0.471397,0.337497,-0.864975,-0.471397,0.172054,-0.864975,-0.471397,0.172054,-0.814788,-0.471397,0.337497,-0.853553,-0.382684,0.353553,-0.864975,-0.471397,0.172054,-0.853553,-0.382684,0.353553,-0.906127,-0.382684,0.18024,-0.906127,-0.382684,0.18024,-0.853553,-0.382684,0.353553,-0.884097,-0.290285,0.366205,-0.906127,-0.382684,0.18024,-0.884097,-0.290285,0.366205,-0.938553,-0.290285,0.18669,-0.938553,-0.290285,0.18669,-0.884097,-0.290285,0.366205,-0.961939,-0.195091,0.191342,-0.884097,-0.290285,0.366205,-0.906127,-0.195091,0.37533,-0.961939,-0.195091,0.191342,-0.961939,-0.195091,0.191342,-0.906127,-0.195091,0.37533,-0.91943,-0.098017,0.380841,-0.961939,-0.195091,0.191342,-0.91943,-0.098017,0.380841,-0.976062,-0.098017,0.194151,-0.976062,-0.098017,0.194151,-0.91943,-0.098017,0.380841,-0.980785,0,0.195091,-0.91943,-0.098017,0.380841,-0.923879,0,0.382683,-0.980785,0,0.195091,-0.980785,0,0.195091,-0.923879,0,0.382683,-0.91943,0.098017,0.380841,-0.980785,0,0.195091,-0.91943,0.098017,0.380841,-0.976062,0.098017,0.194151,-0.976062,0.098017,0.194151,-0.91943,0.098017,0.380841,-0.906127,0.19509,0.37533,-0.976062,0.098017,0.194151,-0.906127,0.19509,0.37533,-0.961939,0.19509,0.191342,-0.961939,0.19509,0.191342,-0.906127,0.19509,0.37533,-0.884097,0.290285,0.366205,-0.961939,0.19509,0.191342,-0.884097,0.290285,0.366205,-0.938553,0.290285,0.18669,-0.938553,0.290285,0.18669,-0.884097,0.290285,0.366205,-0.853553,0.382683,0.353553,-0.938553,0.290285,0.18669,-0.853553,0.382683,0.353553,-0.906127,0.382683,0.18024,-0.906127,0.382683,0.18024,-0.853553,0.382683,0.353553,-0.864975,0.471397,0.172054,-0.853553,0.382683,0.353553,-0.814789,0.471397,0.337496,-0.864975,0.471397,0.172054,-0.864975,0.471397,0.172054,-0.814789,0.471397,0.337496,-0.815493,0.55557,0.162212,-0.814789,0.471397,0.337496,-0.768177,0.55557,0.31819,-0.815493,0.55557,0.162212,-0.815493,0.55557,0.162212,-0.768177,0.55557,0.31819,-0.714168,0.634393,0.295818,-0.815493,0.55557,0.162212,-0.714168,0.634393,0.295818,-0.758157,0.634393,0.150807,-0.758157,0.634393,0.150807,-0.714168,0.634393,0.295818,-0.653281,0.707107,0.270598,-0.758157,0.634393,0.150807,-0.653281,0.707107,0.270598,-0.69352,0.707107,0.13795,-0.69352,0.707107,0.13795,-0.653281,0.707107,0.270598,-0.586103,0.77301,0.242772,-0.69352,0.707107,0.13795,-0.586103,0.77301,0.242772,-0.622203,0.77301,0.123764,-0.622203,0.77301,0.123764,-0.586103,0.77301,0.242772,-0.544895,0.83147,0.108386,-0.586103,0.77301,0.242772,-0.51328,0.83147,0.212607,-0.544895,0.83147,0.108386,-0.544895,0.83147,0.108386,-0.51328,0.83147,0.212607,-0.435514,0.881921,0.180396,-0.544895,0.83147,0.108386,-0.435514,0.881921,0.180396,-0.462339,0.881921,0.091965,-0.462339,0.881921,0.091965,-0.435514,0.881921,0.180396,-0.353553,0.92388,0.146447,-0.462339,0.881921,0.091965,-0.353553,0.92388,0.146447,-0.37533,0.92388,0.074658,-0.37533,0.92388,0.074658,-0.353553,0.92388,0.146447,-0.268188,0.95694,0.111087,-0.37533,0.92388,0.074658,-0.268188,0.95694,0.111087,-0.284707,0.95694,0.056632,-0.284707,0.95694,0.056632,-0.268188,0.95694,0.111087,-0.18024,0.980785,0.074658,-0.284707,0.95694,0.056632,-0.18024,0.980785,0.074658,-0.191342,0.980785,0.03806,-0.191342,0.980785,0.03806,-0.18024,0.980785,0.074658,-0.090556,0.995185,0.037509,-0.191342,0.980785,0.03806,-0.090556,0.995185,0.037509,-0.096134,0.995185,0.019122,-0.19509,0.980785,0,-0.191342,0.980785,0.03806,-0.096134,0.995185,0.019122,-0.19509,0.980785,0,-0.096134,0.995185,0.019122,-0.098017,0.995185,0,-0.290285,0.95694,0,-0.284707,0.95694,0.056632,-0.191342,0.980785,0.03806,-0.290285,0.95694,0,-0.191342,0.980785,0.03806,-0.19509,0.980785,0,-0.382683,0.92388,0,-0.37533,0.92388,0.074658,-0.284707,0.95694,0.056632,-0.382683,0.92388,0,-0.284707,0.95694,0.056632,-0.290285,0.95694,0,-0.471397,0.881921,0,-0.462339,0.881921,0.091965,-0.37533,0.92388,0.074658,-0.471397,0.881921,0,-0.37533,0.92388,0.074658,-0.382683,0.92388,0,-0.55557,0.83147,0,-0.544895,0.83147,0.108386,-0.462339,0.881921,0.091965,-0.55557,0.83147,0,-0.462339,0.881921,0.091965,-0.471397,0.881921,0,-0.634393,0.77301,0,-0.622203,0.77301,0.123764,-0.55557,0.83147,0,-0.622203,0.77301,0.123764,-0.544895,0.83147,0.108386,-0.55557,0.83147,0,-0.707107,0.707107,0,-0.69352,0.707107,0.13795,-0.622203,0.77301,0.123764,-0.707107,0.707107,0,-0.622203,0.77301,0.123764,-0.634393,0.77301,0,-0.77301,0.634393,0,-0.758157,0.634393,0.150807,-0.69352,0.707107,0.13795,-0.77301,0.634393,0,-0.69352,0.707107,0.13795,-0.707107,0.707107,0,-0.831469,0.55557,0,-0.815493,0.55557,0.162212,-0.758157,0.634393,0.150807,-0.831469,0.55557,0,-0.758157,0.634393,0.150807,-0.77301,0.634393,0,-0.881921,0.471397,0,-0.864975,0.471397,0.172054,-0.831469,0.55557,0,-0.864975,0.471397,0.172054,-0.815493,0.55557,0.162212,-0.831469,0.55557,0,-0.923879,0.382683,0,-0.906127,0.382683,0.18024,-0.881921,0.471397,0,-0.906127,0.382683,0.18024,-0.864975,0.471397,0.172054,-0.881921,0.471397,0,-0.95694,0.290285,0,-0.938553,0.290285,0.18669,-0.906127,0.382683,0.18024,-0.95694,0.290285,0,-0.906127,0.382683,0.18024,-0.923879,0.382683,0,-0.980785,0.19509,0,-0.961939,0.19509,0.191342,-0.938553,0.290285,0.18669,-0.980785,0.19509,0,-0.938553,0.290285,0.18669,-0.95694,0.290285,0,-0.995184,0.098017,0,-0.976062,0.098017,0.194151,-0.961939,0.19509,0.191342,-0.995184,0.098017,0,-0.961939,0.19509,0.191342,-0.980785,0.19509,0,-0.999999,0,0,-0.980785,0,0.195091,-0.976062,0.098017,0.194151,-0.999999,0,0,-0.976062,0.098017,0.194151,-0.995184,0.098017,0,-0.995184,-0.098017,0,-0.976062,-0.098017,0.194151,-0.999999,0,0,-0.976062,-0.098017,0.194151,-0.980785,0,0.195091,-0.999999,0,0,-0.980785,-0.195091,0,-0.961939,-0.195091,0.191342,-0.976062,-0.098017,0.194151,-0.980785,-0.195091,0,-0.976062,-0.098017,0.194151,-0.995184,-0.098017,0,-0.95694,-0.290285,0,-0.938553,-0.290285,0.18669,-0.980785,-0.195091,0,-0.938553,-0.290285,0.18669,-0.961939,-0.195091,0.191342,-0.980785,-0.195091,0,-0.923879,-0.382684,0,-0.906127,-0.382684,0.18024,-0.938553,-0.290285,0.18669,-0.923879,-0.382684,0,-0.938553,-0.290285,0.18669,-0.95694,-0.290285,0,-0.881921,-0.471397,0,-0.864975,-0.471397,0.172054,-0.906127,-0.382684,0.18024,-0.881921,-0.471397,0,-0.906127,-0.382684,0.18024,-0.923879,-0.382684,0,-0.831469,-0.555571,0,-0.815493,-0.555571,0.162212,-0.864975,-0.471397,0.172054,-0.831469,-0.555571,0,-0.864975,-0.471397,0.172054,-0.881921,-0.471397,0,-0.77301,-0.634394,0,-0.758157,-0.634394,0.150807,-0.815493,-0.555571,0.162212,-0.77301,-0.634394,0,-0.815493,-0.555571,0.162212,-0.831469,-0.555571,0,-0.707106,-0.707107,0,-0.693519,-0.707107,0.13795,-0.77301,-0.634394,0,-0.693519,-0.707107,0.13795,-0.758157,-0.634394,0.150807,-0.77301,-0.634394,0,-0.634393,-0.773011,0,-0.622203,-0.773011,0.123764,-0.693519,-0.707107,0.13795,-0.634393,-0.773011,0,-0.693519,-0.707107,0.13795,-0.707106,-0.707107,0,-0.555569,-0.83147,0,-0.544894,-0.83147,0.108386,-0.622203,-0.773011,0.123764,-0.555569,-0.83147,0,-0.622203,-0.773011,0.123764,-0.634393,-0.773011,0,-0.471396,-0.881922,0,-0.462338,-0.881922,0.091965,-0.544894,-0.83147,0.108386,-0.471396,-0.881922,0,-0.544894,-0.83147,0.108386,-0.555569,-0.83147,0,-0.382683,-0.92388,0,-0.375329,-0.92388,0.074658,-0.462338,-0.881922,0.091965,-0.382683,-0.92388,0,-0.462338,-0.881922,0.091965,-0.471396,-0.881922,0,-0.290284,-0.956941,0,-0.284706,-0.956941,0.056632,-0.375329,-0.92388,0.074658,-0.290284,-0.956941,0,-0.375329,-0.92388,0.074658,-0.382683,-0.92388,0,-0.19509,-0.980785,0,-0.191341,-0.980785,0.03806,-0.284706,-0.956941,0.056632,-0.19509,-0.980785,0,-0.284706,-0.956941,0.056632,-0.290284,-0.956941,0,-0.098016,-0.995185,0,-0.096133,-0.995185,0.019122,-0.191341,-0.980785,0.03806,-0.098016,-0.995185,0,-0.191341,-0.980785,0.03806,-0.19509,-0.980785,0,-0.096133,-0.995185,-0.019122,-0.098016,-0.995185,0,-0.19509,-0.980785,0,-0.096133,-0.995185,-0.019122,-0.19509,-0.980785,0,-0.191341,-0.980785,-0.03806,-0.191341,-0.980785,-0.03806,-0.19509,-0.980785,0,-0.290284,-0.956941,0,-0.191341,-0.980785,-0.03806,-0.290284,-0.956941,0,-0.284706,-0.956941,-0.056632,-0.284706,-0.956941,-0.056632,-0.290284,-0.956941,0,-0.382683,-0.92388,0,-0.284706,-0.956941,-0.056632,-0.382683,-0.92388,0,-0.37533,-0.92388,-0.074658,-0.37533,-0.92388,-0.074658,-0.382683,-0.92388,0,-0.471396,-0.881922,0,-0.37533,-0.92388,-0.074658,-0.471396,-0.881922,0,-0.462338,-0.881922,-0.091965,-0.462338,-0.881922,-0.091965,-0.471396,-0.881922,0,-0.555569,-0.83147,0,-0.462338,-0.881922,-0.091965,-0.555569,-0.83147,0,-0.544894,-0.83147,-0.108386,-0.544894,-0.83147,-0.108386,-0.555569,-0.83147,0,-0.634393,-0.773011,0,-0.544894,-0.83147,-0.108386,-0.634393,-0.773011,0,-0.622203,-0.773011,-0.123764,-0.622203,-0.773011,-0.123764,-0.634393,-0.773011,0,-0.707106,-0.707107,0,-0.622203,-0.773011,-0.123764,-0.707106,-0.707107,0,-0.693519,-0.707107,-0.13795,-0.693519,-0.707107,-0.13795,-0.707106,-0.707107,0,-0.758157,-0.634394,-0.150807,-0.707106,-0.707107,0,-0.77301,-0.634394,0,-0.758157,-0.634394,-0.150807,-0.758157,-0.634394,-0.150807,-0.77301,-0.634394,0,-0.831469,-0.555571,0,-0.758157,-0.634394,-0.150807,-0.831469,-0.555571,0,-0.815493,-0.555571,-0.162212,-0.815493,-0.555571,-0.162212,-0.831469,-0.555571,0,-0.881921,-0.471397,0,-0.815493,-0.555571,-0.162212,-0.881921,-0.471397,0,-0.864975,-0.471397,-0.172054,-0.864975,-0.471397,-0.172054,-0.881921,-0.471397,0,-0.923879,-0.382684,0,-0.864975,-0.471397,-0.172054,-0.923879,-0.382684,0,-0.906127,-0.382684,-0.18024,-0.906127,-0.382684,-0.18024,-0.923879,-0.382684,0,-0.95694,-0.290285,0,-0.906127,-0.382684,-0.18024,-0.95694,-0.290285,0,-0.938553,-0.290285,-0.18669,-0.938553,-0.290285,-0.18669,-0.95694,-0.290285,0,-0.961939,-0.195091,-0.191342,-0.95694,-0.290285,0,-0.980785,-0.195091,0,-0.961939,-0.195091,-0.191342,-0.961939,-0.195091,-0.191342,-0.980785,-0.195091,0,-0.995184,-0.098017,0,-0.961939,-0.195091,-0.191342,-0.995184,-0.098017,0,-0.976062,-0.098017,-0.194151,-0.976062,-0.098017,-0.194151,-0.995184,-0.098017,0,-0.980785,0,-0.19509,-0.995184,-0.098017,0,-0.999999,0,0,-0.980785,0,-0.19509,-0.980785,0,-0.19509,-0.999999,0,0,-0.995184,0.098017,0,-0.980785,0,-0.19509,-0.995184,0.098017,0,-0.976062,0.098017,-0.194151,-0.976062,0.098017,-0.194151,-0.995184,0.098017,0,-0.980785,0.19509,0,-0.976062,0.098017,-0.194151,-0.980785,0.19509,0,-0.961939,0.19509,-0.191342,-0.961939,0.19509,-0.191342,-0.980785,0.19509,0,-0.95694,0.290285,0,-0.961939,0.19509,-0.191342,-0.95694,0.290285,0,-0.938553,0.290285,-0.18669,-0.938553,0.290285,-0.18669,-0.95694,0.290285,0,-0.923879,0.382683,0,-0.938553,0.290285,-0.18669,-0.923879,0.382683,0,-0.906127,0.382683,-0.18024,-0.906127,0.382683,-0.18024,-0.923879,0.382683,0,-0.881921,0.471397,0,-0.906127,0.382683,-0.18024,-0.881921,0.471397,0,-0.864975,0.471397,-0.172054,-0.864975,0.471397,-0.172054,-0.881921,0.471397,0,-0.815493,0.55557,-0.162212,-0.881921,0.471397,0,-0.831469,0.55557,0,-0.815493,0.55557,-0.162212,-0.815493,0.55557,-0.162212,-0.831469,0.55557,0,-0.77301,0.634393,0,-0.815493,0.55557,-0.162212,-0.77301,0.634393,0,-0.758157,0.634393,-0.150807,-0.758157,0.634393,-0.150807,-0.77301,0.634393,0,-0.707107,0.707107,0,-0.758157,0.634393,-0.150807,-0.707107,0.707107,0,-0.69352,0.707107,-0.13795,-0.69352,0.707107,-0.13795,-0.707107,0.707107,0,-0.634393,0.77301,0,-0.69352,0.707107,-0.13795,-0.634393,0.77301,0,-0.622203,0.77301,-0.123764,-0.622203,0.77301,-0.123764,-0.634393,0.77301,0,-0.544895,0.83147,-0.108386,-0.634393,0.77301,0,-0.55557,0.83147,0,-0.544895,0.83147,-0.108386,-0.544895,0.83147,-0.108386,-0.55557,0.83147,0,-0.471397,0.881921,0,-0.544895,0.83147,-0.108386,-0.471397,0.881921,0,-0.462339,0.881921,-0.091965,-0.462339,0.881921,-0.091965,-0.471397,0.881921,0,-0.382683,0.92388,0,-0.462339,0.881921,-0.091965,-0.382683,0.92388,0,-0.37533,0.92388,-0.074658,-0.37533,0.92388,-0.074658,-0.382683,0.92388,0,-0.290285,0.95694,0,-0.37533,0.92388,-0.074658,-0.290285,0.95694,0,-0.284707,0.95694,-0.056632,-0.284707,0.95694,-0.056632,-0.290285,0.95694,0,-0.19509,0.980785,0,-0.284707,0.95694,-0.056632,-0.19509,0.980785,0,-0.191342,0.980785,-0.03806,-0.191342,0.980785,-0.03806,-0.19509,0.980785,0,-0.098017,0.995185,0,-0.191342,0.980785,-0.03806,-0.098017,0.995185,0,-0.096134,0.995185,-0.019122,-0.18024,0.980785,-0.074658,-0.191342,0.980785,-0.03806,-0.096134,0.995185,-0.019122,-0.18024,0.980785,-0.074658,-0.096134,0.995185,-0.019122,-0.090556,0.995185,-0.03751,-0.268188,0.95694,-0.111087,-0.284707,0.95694,-0.056632,-0.191342,0.980785,-0.03806,-0.268188,0.95694,-0.111087,-0.191342,0.980785,-0.03806,-0.18024,0.980785,-0.074658,-0.353553,0.92388,-0.146447,-0.37533,0.92388,-0.074658,-0.284707,0.95694,-0.056632,-0.353553,0.92388,-0.146447,-0.284707,0.95694,-0.056632,-0.268188,0.95694,-0.111087,-0.435514,0.881921,-0.180396,-0.462339,0.881921,-0.091965,-0.37533,0.92388,-0.074658,-0.435514,0.881921,-0.180396,-0.37533,0.92388,-0.074658,-0.353553,0.92388,-0.146447,-0.51328,0.83147,-0.212607,-0.544895,0.83147,-0.108386,-0.462339,0.881921,-0.091965,-0.51328,0.83147,-0.212607,-0.462339,0.881921,-0.091965,-0.435514,0.881921,-0.180396,-0.586103,0.77301,-0.242772,-0.622203,0.77301,-0.123764,-0.51328,0.83147,-0.212607,-0.622203,0.77301,-0.123764,-0.544895,0.83147,-0.108386,-0.51328,0.83147,-0.212607,-0.653281,0.707107,-0.270598,-0.69352,0.707107,-0.13795,-0.622203,0.77301,-0.123764,-0.653281,0.707107,-0.270598,-0.622203,0.77301,-0.123764,-0.586103,0.77301,-0.242772,-0.714168,0.634393,-0.295818,-0.758157,0.634393,-0.150807,-0.69352,0.707107,-0.13795,-0.714168,0.634393,-0.295818,-0.69352,0.707107,-0.13795,-0.653281,0.707107,-0.270598,-0.768178,0.55557,-0.318189,-0.815493,0.55557,-0.162212,-0.758157,0.634393,-0.150807,-0.768178,0.55557,-0.318189,-0.758157,0.634393,-0.150807,-0.714168,0.634393,-0.295818,-0.814789,0.471397,-0.337497,-0.864975,0.471397,-0.172054,-0.768178,0.55557,-0.318189,-0.864975,0.471397,-0.172054,-0.815493,0.55557,-0.162212,-0.768178,0.55557,-0.318189,-0.853553,0.382683,-0.353553,-0.906127,0.382683,-0.18024,-0.864975,0.471397,-0.172054,-0.853553,0.382683,-0.353553,-0.864975,0.471397,-0.172054,-0.814789,0.471397,-0.337497,-0.884097,0.290285,-0.366205,-0.938553,0.290285,-0.18669,-0.906127,0.382683,-0.18024,-0.884097,0.290285,-0.366205,-0.906127,0.382683,-0.18024,-0.853553,0.382683,-0.353553,-0.906127,0.19509,-0.37533,-0.961939,0.19509,-0.191342,-0.938553,0.290285,-0.18669,-0.906127,0.19509,-0.37533,-0.938553,0.290285,-0.18669,-0.884097,0.290285,-0.366205,-0.91943,0.098017,-0.38084,-0.976062,0.098017,-0.194151,-0.961939,0.19509,-0.191342,-0.91943,0.098017,-0.38084,-0.961939,0.19509,-0.191342,-0.906127,0.19509,-0.37533,-0.923879,0,-0.382683,-0.980785,0,-0.19509,-0.976062,0.098017,-0.194151,-0.923879,0,-0.382683,-0.976062,0.098017,-0.194151,-0.91943,0.098017,-0.38084,-0.91943,-0.098017,-0.38084,-0.976062,-0.098017,-0.194151,-0.923879,0,-0.382683,-0.976062,-0.098017,-0.194151,-0.980785,0,-0.19509,-0.923879,0,-0.382683,-0.906127,-0.195091,-0.37533,-0.961939,-0.195091,-0.191342,-0.976062,-0.098017,-0.194151,-0.906127,-0.195091,-0.37533,-0.976062,-0.098017,-0.194151,-0.91943,-0.098017,-0.38084,-0.884097,-0.290285,-0.366205,-0.938553,-0.290285,-0.18669,-0.906127,-0.195091,-0.37533,-0.938553,-0.290285,-0.18669,-0.961939,-0.195091,-0.191342,-0.906127,-0.195091,-0.37533,-0.853553,-0.382684,-0.353553,-0.906127,-0.382684,-0.18024,-0.938553,-0.290285,-0.18669,-0.853553,-0.382684,-0.353553,-0.938553,-0.290285,-0.18669,-0.884097,-0.290285,-0.366205,-0.814789,-0.471397,-0.337496,-0.864975,-0.471397,-0.172054,-0.906127,-0.382684,-0.18024,-0.814789,-0.471397,-0.337496,-0.906127,-0.382684,-0.18024,-0.853553,-0.382684,-0.353553,-0.768177,-0.555571,-0.318189,-0.815493,-0.555571,-0.162212,-0.864975,-0.471397,-0.172054,-0.768177,-0.555571,-0.318189,-0.864975,-0.471397,-0.172054,-0.814789,-0.471397,-0.337496,-0.714168,-0.634394,-0.295818,-0.758157,-0.634394,-0.150807,-0.815493,-0.555571,-0.162212,-0.714168,-0.634394,-0.295818,-0.815493,-0.555571,-0.162212,-0.768177,-0.555571,-0.318189,-0.653281,-0.707107,-0.270598,-0.693519,-0.707107,-0.13795,-0.714168,-0.634394,-0.295818,-0.693519,-0.707107,-0.13795,-0.758157,-0.634394,-0.150807,-0.714168,-0.634394,-0.295818,-0.586102,-0.773011,-0.242771,-0.622203,-0.773011,-0.123764,-0.693519,-0.707107,-0.13795,-0.586102,-0.773011,-0.242771,-0.693519,-0.707107,-0.13795,-0.653281,-0.707107,-0.270598,-0.513279,-0.83147,-0.212607,-0.544894,-0.83147,-0.108386,-0.622203,-0.773011,-0.123764,-0.513279,-0.83147,-0.212607,-0.622203,-0.773011,-0.123764,-0.586102,-0.773011,-0.242771,-0.435513,-0.881922,-0.180395,-0.462338,-0.881922,-0.091965,-0.544894,-0.83147,-0.108386,-0.435513,-0.881922,-0.180395,-0.544894,-0.83147,-0.108386,-0.513279,-0.83147,-0.212607,-0.353553,-0.92388,-0.146446,-0.37533,-0.92388,-0.074658,-0.462338,-0.881922,-0.091965,-0.353553,-0.92388,-0.146446,-0.462338,-0.881922,-0.091965,-0.435513,-0.881922,-0.180395,-0.268187,-0.956941,-0.111087,-0.284706,-0.956941,-0.056632,-0.37533,-0.92388,-0.074658,-0.268187,-0.956941,-0.111087,-0.37533,-0.92388,-0.074658,-0.353553,-0.92388,-0.146446,-0.180239,-0.980785,-0.074657,-0.191341,-0.980785,-0.03806,-0.284706,-0.956941,-0.056632,-0.180239,-0.980785,-0.074657,-0.284706,-0.956941,-0.056632,-0.268187,-0.956941,-0.111087,-0.090555,-0.995185,-0.037509,-0.096133,-0.995185,-0.019122,-0.191341,-0.980785,-0.03806,-0.090555,-0.995185,-0.037509,-0.191341,-0.980785,-0.03806,-0.180239,-0.980785,-0.074657,-0.081498,-0.995185,-0.054455,-0.090555,-0.995185,-0.037509,-0.180239,-0.980785,-0.074657,-0.081498,-0.995185,-0.054455,-0.180239,-0.980785,-0.074657,-0.162211,-0.980785,-0.108386,-0.162211,-0.980785,-0.108386,-0.180239,-0.980785,-0.074657,-0.268187,-0.956941,-0.111087,-0.162211,-0.980785,-0.108386,-0.268187,-0.956941,-0.111087,-0.241362,-0.956941,-0.161273,-0.241362,-0.956941,-0.161273,-0.268187,-0.956941,-0.111087,-0.353553,-0.92388,-0.146446,-0.241362,-0.956941,-0.161273,-0.353553,-0.92388,-0.146446,-0.318189,-0.92388,-0.212607,-0.318189,-0.92388,-0.212607,-0.353553,-0.92388,-0.146446,-0.435513,-0.881922,-0.180395,-0.318189,-0.92388,-0.212607,-0.435513,-0.881922,-0.180395,-0.391952,-0.881922,-0.261894,-0.391952,-0.881922,-0.261894,-0.435513,-0.881922,-0.180395,-0.513279,-0.83147,-0.212607,-0.391952,-0.881922,-0.261894,-0.513279,-0.83147,-0.212607,-0.461939,-0.83147,-0.308658,-0.461939,-0.83147,-0.308658,-0.513279,-0.83147,-0.212607,-0.586102,-0.773011,-0.242771,-0.461939,-0.83147,-0.308658,-0.586102,-0.773011,-0.242771,-0.527478,-0.773011,-0.35245,-0.527478,-0.773011,-0.35245,-0.586102,-0.773011,-0.242771,-0.653281,-0.707107,-0.270598,-0.527478,-0.773011,-0.35245,-0.653281,-0.707107,-0.270598,-0.587937,-0.707107,-0.392847,-0.587937,-0.707107,-0.392847,-0.653281,-0.707107,-0.270598,-0.642734,-0.634394,-0.429461,-0.653281,-0.707107,-0.270598,-0.714168,-0.634394,-0.295818,-0.642734,-0.634394,-0.429461,-0.642734,-0.634394,-0.429461,-0.714168,-0.634394,-0.295818,-0.768177,-0.555571,-0.318189,-0.642734,-0.634394,-0.429461,-0.768177,-0.555571,-0.318189,-0.691341,-0.555571,-0.461939,-0.691341,-0.555571,-0.461939,-0.768177,-0.555571,-0.318189,-0.814789,-0.471397,-0.337496,-0.691341,-0.555571,-0.461939,-0.814789,-0.471397,-0.337496,-0.73329,-0.471397,-0.489969,-0.73329,-0.471397,-0.489969,-0.814789,-0.471397,-0.337496,-0.853553,-0.382684,-0.353553,-0.73329,-0.471397,-0.489969,-0.853553,-0.382684,-0.353553,-0.768177,-0.382684,-0.51328,-0.768177,-0.382684,-0.51328,-0.853553,-0.382684,-0.353553,-0.884097,-0.290285,-0.366205,-0.768177,-0.382684,-0.51328,-0.884097,-0.290285,-0.366205,-0.795667,-0.290285,-0.531647,-0.795667,-0.290285,-0.531647,-0.884097,-0.290285,-0.366205,-0.815493,-0.195091,-0.544895,-0.884097,-0.290285,-0.366205,-0.906127,-0.195091,-0.37533,-0.815493,-0.195091,-0.544895,-0.815493,-0.195091,-0.544895,-0.906127,-0.195091,-0.37533,-0.91943,-0.098017,-0.38084,-0.815493,-0.195091,-0.544895,-0.91943,-0.098017,-0.38084,-0.827466,-0.098017,-0.552895,-0.827466,-0.098017,-0.552895,-0.91943,-0.098017,-0.38084,-0.831469,0,-0.55557,-0.91943,-0.098017,-0.38084,-0.923879,0,-0.382683,-0.831469,0,-0.55557,-0.831469,0,-0.55557,-0.923879,0,-0.382683,-0.91943,0.098017,-0.38084,-0.831469,0,-0.55557,-0.91943,0.098017,-0.38084,-0.827466,0.098017,-0.552895,-0.827466,0.098017,-0.552895,-0.91943,0.098017,-0.38084,-0.906127,0.19509,-0.37533,-0.827466,0.098017,-0.552895,-0.906127,0.19509,-0.37533,-0.815493,0.19509,-0.544895,-0.815493,0.19509,-0.544895,-0.906127,0.19509,-0.37533,-0.884097,0.290285,-0.366205,-0.815493,0.19509,-0.544895,-0.884097,0.290285,-0.366205,-0.795667,0.290285,-0.531647,-0.795667,0.290285,-0.531647,-0.884097,0.290285,-0.366205,-0.853553,0.382683,-0.353553,-0.795667,0.290285,-0.531647,-0.853553,0.382683,-0.353553,-0.768178,0.382683,-0.51328,-0.768178,0.382683,-0.51328,-0.853553,0.382683,-0.353553,-0.814789,0.471397,-0.337497,-0.768178,0.382683,-0.51328,-0.814789,0.471397,-0.337497,-0.73329,0.471397,-0.489969,-0.73329,0.471397,-0.489969,-0.814789,0.471397,-0.337497,-0.691342,0.55557,-0.46194,-0.814789,0.471397,-0.337497,-0.768178,0.55557,-0.318189,-0.691342,0.55557,-0.46194,-0.691342,0.55557,-0.46194,-0.768178,0.55557,-0.318189,-0.714168,0.634393,-0.295818,-0.691342,0.55557,-0.46194,-0.714168,0.634393,-0.295818,-0.642735,0.634393,-0.429461,-0.642735,0.634393,-0.429461,-0.714168,0.634393,-0.295818,-0.653281,0.707107,-0.270598,-0.642735,0.634393,-0.429461,-0.653281,0.707107,-0.270598,-0.587938,0.707107,-0.392847,-0.587938,0.707107,-0.392847,-0.653281,0.707107,-0.270598,-0.586103,0.77301,-0.242772,-0.587938,0.707107,-0.392847,-0.586103,0.77301,-0.242772,-0.527479,0.77301,-0.35245,-0.527479,0.77301,-0.35245,-0.586103,0.77301,-0.242772,-0.46194,0.83147,-0.308658,-0.586103,0.77301,-0.242772,-0.51328,0.83147,-0.212607,-0.46194,0.83147,-0.308658,-0.46194,0.83147,-0.308658,-0.51328,0.83147,-0.212607,-0.435514,0.881921,-0.180396,-0.46194,0.83147,-0.308658,-0.435514,0.881921,-0.180396,-0.391952,0.881921,-0.261894,-0.391952,0.881921,-0.261894,-0.435514,0.881921,-0.180396,-0.353553,0.92388,-0.146447,-0.391952,0.881921,-0.261894,-0.353553,0.92388,-0.146447,-0.31819,0.92388,-0.212607,-0.31819,0.92388,-0.212607,-0.353553,0.92388,-0.146447,-0.268188,0.95694,-0.111087,-0.31819,0.92388,-0.212607,-0.268188,0.95694,-0.111087,-0.241363,0.95694,-0.161273,-0.241363,0.95694,-0.161273,-0.268188,0.95694,-0.111087,-0.18024,0.980785,-0.074658,-0.241363,0.95694,-0.161273,-0.18024,0.980785,-0.074658,-0.162212,0.980785,-0.108386,-0.162212,0.980785,-0.108386,-0.18024,0.980785,-0.074658,-0.090556,0.995185,-0.03751,-0.162212,0.980785,-0.108386,-0.090556,0.995185,-0.03751,-0.081498,0.995185,-0.054455,-0.13795,0.980785,-0.13795,-0.162212,0.980785,-0.108386,-0.081498,0.995185,-0.054455,-0.13795,0.980785,-0.13795,-0.081498,0.995185,-0.054455,-0.069309,0.995185,-0.069309,-0.205262,0.95694,-0.205262,-0.241363,0.95694,-0.161273,-0.162212,0.980785,-0.108386,-0.205262,0.95694,-0.205262,-0.162212,0.980785,-0.108386,-0.13795,0.980785,-0.13795,-0.270598,0.92388,-0.270598,-0.31819,0.92388,-0.212607,-0.241363,0.95694,-0.161273,-0.270598,0.92388,-0.270598,-0.241363,0.95694,-0.161273,-0.205262,0.95694,-0.205262,-0.333328,0.881921,-0.333328,-0.391952,0.881921,-0.261894,-0.31819,0.92388,-0.212607,-0.333328,0.881921,-0.333328,-0.31819,0.92388,-0.212607,-0.270598,0.92388,-0.270598,-0.392847,0.83147,-0.392847,-0.46194,0.83147,-0.308658,-0.391952,0.881921,-0.261894,-0.392847,0.83147,-0.392847,-0.391952,0.881921,-0.261894,-0.333328,0.881921,-0.333328,-0.448584,0.77301,-0.448584,-0.527479,0.77301,-0.35245,-0.392847,0.83147,-0.392847,-0.527479,0.77301,-0.35245,-0.46194,0.83147,-0.308658,-0.392847,0.83147,-0.392847,-0.5,0.707107,-0.5,-0.587938,0.707107,-0.392847,-0.527479,0.77301,-0.35245,-0.5,0.707107,-0.5,-0.527479,0.77301,-0.35245,-0.448584,0.77301,-0.448584,-0.546601,0.634393,-0.546601,-0.642735,0.634393,-0.429461,-0.587938,0.707107,-0.392847,-0.546601,0.634393,-0.546601,-0.587938,0.707107,-0.392847,-0.5,0.707107,-0.5,-0.587938,0.55557,-0.587938,-0.691342,0.55557,-0.46194,-0.642735,0.634393,-0.429461,-0.587938,0.55557,-0.587938,-0.642735,0.634393,-0.429461,-0.546601,0.634393,-0.546601,-0.623612,0.471397,-0.623612,-0.73329,0.471397,-0.489969,-0.587938,0.55557,-0.587938,-0.73329,0.471397,-0.489969,-0.691342,0.55557,-0.46194,-0.587938,0.55557,-0.587938,-0.653281,0.382683,-0.653281,-0.768178,0.382683,-0.51328,-0.73329,0.471397,-0.489969,-0.653281,0.382683,-0.653281,-0.73329,0.471397,-0.489969,-0.623612,0.471397,-0.623612,-0.676659,0.290285,-0.676659,-0.795667,0.290285,-0.531647,-0.768178,0.382683,-0.51328,-0.676659,0.290285,-0.676659,-0.768178,0.382683,-0.51328,-0.653281,0.382683,-0.653281,-0.69352,0.19509,-0.69352,-0.815493,0.19509,-0.544895,-0.795667,0.290285,-0.531647,-0.69352,0.19509,-0.69352,-0.795667,0.290285,-0.531647,-0.676659,0.290285,-0.676659,-0.703702,0.098017,-0.703702,-0.827466,0.098017,-0.552895,-0.815493,0.19509,-0.544895,-0.703702,0.098017,-0.703702,-0.815493,0.19509,-0.544895,-0.69352,0.19509,-0.69352,-0.707107,0,-0.707106,-0.831469,0,-0.55557,-0.827466,0.098017,-0.552895,-0.707107,0,-0.707106,-0.827466,0.098017,-0.552895,-0.703702,0.098017,-0.703702,-0.703702,-0.098017,-0.703702,-0.827466,-0.098017,-0.552895,-0.707107,0,-0.707106,-0.827466,-0.098017,-0.552895,-0.831469,0,-0.55557,-0.707107,0,-0.707106,-0.69352,-0.195091,-0.69352,-0.815493,-0.195091,-0.544895,-0.827466,-0.098017,-0.552895,-0.69352,-0.195091,-0.69352,-0.827466,-0.098017,-0.552895,-0.703702,-0.098017,-0.703702,-0.676659,-0.290285,-0.676659,-0.795667,-0.290285,-0.531647,-0.69352,-0.195091,-0.69352,-0.795667,-0.290285,-0.531647,-0.815493,-0.195091,-0.544895,-0.69352,-0.195091,-0.69352,-0.653281,-0.382684,-0.653281,-0.768177,-0.382684,-0.51328,-0.795667,-0.290285,-0.531647,-0.653281,-0.382684,-0.653281,-0.795667,-0.290285,-0.531647,-0.676659,-0.290285,-0.676659,-0.623612,-0.471397,-0.623612,-0.73329,-0.471397,-0.489969,-0.768177,-0.382684,-0.51328,-0.623612,-0.471397,-0.623612,-0.768177,-0.382684,-0.51328,-0.653281,-0.382684,-0.653281,-0.587938,-0.555571,-0.587937,-0.691341,-0.555571,-0.461939,-0.73329,-0.471397,-0.489969,-0.587938,-0.555571,-0.587937,-0.73329,-0.471397,-0.489969,-0.623612,-0.471397,-0.623612,-0.546601,-0.634394,-0.546601,-0.642734,-0.634394,-0.429461,-0.691341,-0.555571,-0.461939,-0.546601,-0.634394,-0.546601,-0.691341,-0.555571,-0.461939,-0.587938,-0.555571,-0.587937,-0.5,-0.707107,-0.5,-0.587937,-0.707107,-0.392847,-0.642734,-0.634394,-0.429461,-0.5,-0.707107,-0.5,-0.642734,-0.634394,-0.429461,-0.546601,-0.634394,-0.546601,-0.448583,-0.773011,-0.448583,-0.527478,-0.773011,-0.35245,-0.587937,-0.707107,-0.392847,-0.448583,-0.773011,-0.448583,-0.587937,-0.707107,-0.392847,-0.5,-0.707107,-0.5,-0.392847,-0.83147,-0.392847,-0.461939,-0.83147,-0.308658,-0.527478,-0.773011,-0.35245,-0.392847,-0.83147,-0.392847,-0.527478,-0.773011,-0.35245,-0.448583,-0.773011,-0.448583,-0.333327,-0.881922,-0.333327,-0.391952,-0.881922,-0.261894,-0.461939,-0.83147,-0.308658,-0.333327,-0.881922,-0.333327,-0.461939,-0.83147,-0.308658,-0.392847,-0.83147,-0.392847,-0.270598,-0.92388,-0.270597,-0.318189,-0.92388,-0.212607,-0.391952,-0.881922,-0.261894,-0.270598,-0.92388,-0.270597,-0.391952,-0.881922,-0.261894,-0.333327,-0.881922,-0.333327,-0.205262,-0.956941,-0.205262,-0.241362,-0.956941,-0.161273,-0.318189,-0.92388,-0.212607,-0.205262,-0.956941,-0.205262,-0.318189,-0.92388,-0.212607,-0.270598,-0.92388,-0.270597,-0.137949,-0.980785,-0.137949,-0.162211,-0.980785,-0.108386,-0.241362,-0.956941,-0.161273,-0.137949,-0.980785,-0.137949,-0.241362,-0.956941,-0.161273,-0.205262,-0.956941,-0.205262,-0.069308,-0.995185,-0.069308,-0.081498,-0.995185,-0.054455,-0.162211,-0.980785,-0.108386,-0.069308,-0.995185,-0.069308,-0.162211,-0.980785,-0.108386,-0.137949,-0.980785,-0.137949,-0.054455,-0.995185,-0.081498,-0.069308,-0.995185,-0.069308,-0.137949,-0.980785,-0.137949,-0.054455,-0.995185,-0.081498,-0.137949,-0.980785,-0.137949,-0.108386,-0.980785,-0.162211,-0.108386,-0.980785,-0.162211,-0.137949,-0.980785,-0.137949,-0.205262,-0.956941,-0.205262,-0.108386,-0.980785,-0.162211,-0.205262,-0.956941,-0.205262,-0.161273,-0.956941,-0.241362,-0.161273,-0.956941,-0.241362,-0.205262,-0.956941,-0.205262,-0.270598,-0.92388,-0.270597,-0.161273,-0.956941,-0.241362,-0.270598,-0.92388,-0.270597,-0.212607,-0.92388,-0.318189,-0.212607,-0.92388,-0.318189,-0.270598,-0.92388,-0.270597,-0.333327,-0.881922,-0.333327,-0.212607,-0.92388,-0.318189,-0.333327,-0.881922,-0.333327,-0.261894,-0.881922,-0.391951,-0.261894,-0.881922,-0.391951,-0.333327,-0.881922,-0.333327,-0.392847,-0.83147,-0.392847,-0.261894,-0.881922,-0.391951,-0.392847,-0.83147,-0.392847,-0.308658,-0.83147,-0.461939,-0.308658,-0.83147,-0.461939,-0.392847,-0.83147,-0.392847,-0.448583,-0.773011,-0.448583,-0.308658,-0.83147,-0.461939,-0.448583,-0.773011,-0.448583,-0.35245,-0.773011,-0.527478,-0.35245,-0.773011,-0.527478,-0.448583,-0.773011,-0.448583,-0.5,-0.707107,-0.5,-0.35245,-0.773011,-0.527478,-0.5,-0.707107,-0.5,-0.392847,-0.707107,-0.587937,-0.392847,-0.707107,-0.587937,-0.5,-0.707107,-0.5,-0.546601,-0.634394,-0.546601,-0.392847,-0.707107,-0.587937,-0.546601,-0.634394,-0.546601,-0.429461,-0.634394,-0.642734,-0.429461,-0.634394,-0.642734,-0.546601,-0.634394,-0.546601,-0.587938,-0.555571,-0.587937,-0.429461,-0.634394,-0.642734,-0.587938,-0.555571,-0.587937,-0.46194,-0.555571,-0.691341,-0.46194,-0.555571,-0.691341,-0.587938,-0.555571,-0.587937,-0.623612,-0.471397,-0.623612,-0.46194,-0.555571,-0.691341,-0.623612,-0.471397,-0.623612,-0.489969,-0.471397,-0.73329,-0.489969,-0.471397,-0.73329,-0.623612,-0.471397,-0.623612,-0.653281,-0.382684,-0.653281,-0.489969,-0.471397,-0.73329,-0.653281,-0.382684,-0.653281,-0.51328,-0.382684,-0.768177,-0.51328,-0.382684,-0.768177,-0.653281,-0.382684,-0.653281,-0.676659,-0.290285,-0.676659,-0.51328,-0.382684,-0.768177,-0.676659,-0.290285,-0.676659,-0.531647,-0.290285,-0.795667,-0.531647,-0.290285,-0.795667,-0.676659,-0.290285,-0.676659,-0.544895,-0.195091,-0.815493,-0.676659,-0.290285,-0.676659,-0.69352,-0.195091,-0.69352,-0.544895,-0.195091,-0.815493,-0.544895,-0.195091,-0.815493,-0.69352,-0.195091,-0.69352,-0.703702,-0.098017,-0.703702,-0.544895,-0.195091,-0.815493,-0.703702,-0.098017,-0.703702,-0.552895,-0.098017,-0.827466,-0.552895,-0.098017,-0.827466,-0.703702,-0.098017,-0.703702,-0.55557,0,-0.831469,-0.703702,-0.098017,-0.703702,-0.707107,0,-0.707106,-0.55557,0,-0.831469,-0.55557,0,-0.831469,-0.707107,0,-0.707106,-0.703702,0.098017,-0.703702,-0.55557,0,-0.831469,-0.703702,0.098017,-0.703702,-0.552895,0.098017,-0.827466,-0.552895,0.098017,-0.827466,-0.703702,0.098017,-0.703702,-0.69352,0.19509,-0.69352,-0.552895,0.098017,-0.827466,-0.69352,0.19509,-0.69352,-0.544895,0.19509,-0.815493,-0.544895,0.19509,-0.815493,-0.69352,0.19509,-0.69352,-0.676659,0.290285,-0.676659,-0.544895,0.19509,-0.815493,-0.676659,0.290285,-0.676659,-0.531648,0.290285,-0.795667,-0.531648,0.290285,-0.795667,-0.676659,0.290285,-0.676659,-0.653281,0.382683,-0.653281,-0.531648,0.290285,-0.795667,-0.653281,0.382683,-0.653281,-0.51328,0.382683,-0.768178,-0.51328,0.382683,-0.768178,-0.653281,0.382683,-0.653281,-0.623612,0.471397,-0.623612,-0.51328,0.382683,-0.768178,-0.623612,0.471397,-0.623612,-0.489969,0.471397,-0.73329,-0.489969,0.471397,-0.73329,-0.623612,0.471397,-0.623612,-0.46194,0.55557,-0.691341,-0.623612,0.471397,-0.623612,-0.587938,0.55557,-0.587938,-0.46194,0.55557,-0.691341,-0.46194,0.55557,-0.691341,-0.587938,0.55557,-0.587938,-0.546601,0.634393,-0.546601,-0.46194,0.55557,-0.691341,-0.546601,0.634393,-0.546601,-0.429462,0.634393,-0.642735,-0.429462,0.634393,-0.642735,-0.546601,0.634393,-0.546601,-0.5,0.707107,-0.5,-0.429462,0.634393,-0.642735,-0.5,0.707107,-0.5,-0.392847,0.707107,-0.587938,-0.392847,0.707107,-0.587938,-0.5,0.707107,-0.5,-0.448584,0.77301,-0.448584,-0.392847,0.707107,-0.587938,-0.448584,0.77301,-0.448584,-0.35245,0.77301,-0.527479,-0.35245,0.77301,-0.527479,-0.448584,0.77301,-0.448584,-0.308658,0.83147,-0.46194,-0.448584,0.77301,-0.448584,-0.392847,0.83147,-0.392847,-0.308658,0.83147,-0.46194,-0.308658,0.83147,-0.46194,-0.392847,0.83147,-0.392847,-0.333328,0.881921,-0.333328,-0.308658,0.83147,-0.46194,-0.333328,0.881921,-0.333328,-0.261894,0.881921,-0.391952,-0.261894,0.881921,-0.391952,-0.333328,0.881921,-0.333328,-0.270598,0.92388,-0.270598,-0.261894,0.881921,-0.391952,-0.270598,0.92388,-0.270598,-0.212608,0.92388,-0.31819,-0.212608,0.92388,-0.31819,-0.270598,0.92388,-0.270598,-0.205262,0.95694,-0.205262,-0.212608,0.92388,-0.31819,-0.205262,0.95694,-0.205262,-0.161273,0.95694,-0.241363,-0.161273,0.95694,-0.241363,-0.205262,0.95694,-0.205262,-0.13795,0.980785,-0.13795,-0.161273,0.95694,-0.241363,-0.13795,0.980785,-0.13795,-0.108386,0.980785,-0.162212,-0.108386,0.980785,-0.162212,-0.13795,0.980785,-0.13795,-0.069309,0.995185,-0.069309,-0.108386,0.980785,-0.162212,-0.069309,0.995185,-0.069309,-0.054455,0.995185,-0.081498,-0.074658,0.980785,-0.18024,-0.108386,0.980785,-0.162212,-0.054455,0.995185,-0.081498,-0.074658,0.980785,-0.18024,-0.054455,0.995185,-0.081498,-0.03751,0.995185,-0.090556,-0.111087,0.95694,-0.268188,-0.161273,0.95694,-0.241363,-0.108386,0.980785,-0.162212,-0.111087,0.95694,-0.268188,-0.108386,0.980785,-0.162212,-0.074658,0.980785,-0.18024,-0.146447,0.92388,-0.353553,-0.212608,0.92388,-0.31819,-0.161273,0.95694,-0.241363,-0.146447,0.92388,-0.353553,-0.161273,0.95694,-0.241363,-0.111087,0.95694,-0.268188,-0.180396,0.881921,-0.435514,-0.261894,0.881921,-0.391952,-0.212608,0.92388,-0.31819,-0.180396,0.881921,-0.435514,-0.212608,0.92388,-0.31819,-0.146447,0.92388,-0.353553,-0.212608,0.83147,-0.51328,-0.308658,0.83147,-0.46194,-0.261894,0.881921,-0.391952,-0.212608,0.83147,-0.51328,-0.261894,0.881921,-0.391952,-0.180396,0.881921,-0.435514,-0.242772,0.77301,-0.586103,-0.35245,0.77301,-0.527479,-0.308658,0.83147,-0.46194,-0.242772,0.77301,-0.586103,-0.308658,0.83147,-0.46194,-0.212608,0.83147,-0.51328,-0.270598,0.707107,-0.653281,-0.392847,0.707107,-0.587938,-0.35245,0.77301,-0.527479,-0.270598,0.707107,-0.653281,-0.35245,0.77301,-0.527479,-0.242772,0.77301,-0.586103,-0.295818,0.634393,-0.714168,-0.429462,0.634393,-0.642735,-0.392847,0.707107,-0.587938,-0.295818,0.634393,-0.714168,-0.392847,0.707107,-0.587938,-0.270598,0.707107,-0.653281,-0.31819,0.55557,-0.768178,-0.46194,0.55557,-0.691341,-0.429462,0.634393,-0.642735,-0.31819,0.55557,-0.768178,-0.429462,0.634393,-0.642735,-0.295818,0.634393,-0.714168,-0.337497,0.471397,-0.814789,-0.489969,0.471397,-0.73329,-0.31819,0.55557,-0.768178,-0.489969,0.471397,-0.73329,-0.46194,0.55557,-0.691341,-0.31819,0.55557,-0.768178,-0.353553,0.382683,-0.853553,-0.51328,0.382683,-0.768178,-0.489969,0.471397,-0.73329,-0.353553,0.382683,-0.853553,-0.489969,0.471397,-0.73329,-0.337497,0.471397,-0.814789,-0.366205,0.290285,-0.884097,-0.531648,0.290285,-0.795667,-0.51328,0.382683,-0.768178,-0.366205,0.290285,-0.884097,-0.51328,0.382683,-0.768178,-0.353553,0.382683,-0.853553,-0.37533,0.19509,-0.906127,-0.544895,0.19509,-0.815493,-0.531648,0.290285,-0.795667,-0.37533,0.19509,-0.906127,-0.531648,0.290285,-0.795667,-0.366205,0.290285,-0.884097,-0.380841,0.098017,-0.91943,-0.552895,0.098017,-0.827466,-0.37533,0.19509,-0.906127,-0.552895,0.098017,-0.827466,-0.544895,0.19509,-0.815493,-0.37533,0.19509,-0.906127,-0.382683,0,-0.923879,-0.55557,0,-0.831469,-0.552895,0.098017,-0.827466,-0.382683,0,-0.923879,-0.552895,0.098017,-0.827466,-0.380841,0.098017,-0.91943,-0.380841,-0.098017,-0.91943,-0.552895,-0.098017,-0.827466,-0.382683,0,-0.923879,-0.552895,-0.098017,-0.827466,-0.55557,0,-0.831469,-0.382683,0,-0.923879,-0.37533,-0.195091,-0.906127,-0.544895,-0.195091,-0.815493,-0.552895,-0.098017,-0.827466,-0.37533,-0.195091,-0.906127,-0.552895,-0.098017,-0.827466,-0.380841,-0.098017,-0.91943,-0.366205,-0.290285,-0.884097,-0.531647,-0.290285,-0.795667,-0.37533,-0.195091,-0.906127,-0.531647,-0.290285,-0.795667,-0.544895,-0.195091,-0.815493,-0.37533,-0.195091,-0.906127,-0.353553,-0.382684,-0.853553,-0.51328,-0.382684,-0.768177,-0.531647,-0.290285,-0.795667,-0.353553,-0.382684,-0.853553,-0.531647,-0.290285,-0.795667,-0.366205,-0.290285,-0.884097,-0.337497,-0.471397,-0.814789,-0.489969,-0.471397,-0.73329,-0.51328,-0.382684,-0.768177,-0.337497,-0.471397,-0.814789,-0.51328,-0.382684,-0.768177,-0.353553,-0.382684,-0.853553,-0.31819,-0.555571,-0.768177,-0.46194,-0.555571,-0.691341,-0.489969,-0.471397,-0.73329,-0.31819,-0.555571,-0.768177,-0.489969,-0.471397,-0.73329,-0.337497,-0.471397,-0.814789,-0.295818,-0.634394,-0.714168,-0.429461,-0.634394,-0.642734,-0.46194,-0.555571,-0.691341,-0.295818,-0.634394,-0.714168,-0.46194,-0.555571,-0.691341,-0.31819,-0.555571,-0.768177,-0.270598,-0.707107,-0.653281,-0.392847,-0.707107,-0.587937,-0.429461,-0.634394,-0.642734,-0.270598,-0.707107,-0.653281,-0.429461,-0.634394,-0.642734,-0.295818,-0.634394,-0.714168,-0.242772,-0.773011,-0.586102,-0.35245,-0.773011,-0.527478,-0.392847,-0.707107,-0.587937,-0.242772,-0.773011,-0.586102,-0.392847,-0.707107,-0.587937,-0.270598,-0.707107,-0.653281,-0.212607,-0.83147,-0.513279,-0.308658,-0.83147,-0.461939,-0.35245,-0.773011,-0.527478,-0.212607,-0.83147,-0.513279,-0.35245,-0.773011,-0.527478,-0.242772,-0.773011,-0.586102,-0.180396,-0.881922,-0.435513,-0.261894,-0.881922,-0.391951,-0.308658,-0.83147,-0.461939,-0.180396,-0.881922,-0.435513,-0.308658,-0.83147,-0.461939,-0.212607,-0.83147,-0.513279,-0.146446,-0.92388,-0.353553,-0.212607,-0.92388,-0.318189,-0.261894,-0.881922,-0.391951,-0.146446,-0.92388,-0.353553,-0.261894,-0.881922,-0.391951,-0.180396,-0.881922,-0.435513,-0.111087,-0.956941,-0.268187,-0.161273,-0.956941,-0.241362,-0.212607,-0.92388,-0.318189,-0.111087,-0.956941,-0.268187,-0.212607,-0.92388,-0.318189,-0.146446,-0.92388,-0.353553,-0.074658,-0.980785,-0.180239,-0.108386,-0.980785,-0.162211,-0.161273,-0.956941,-0.241362,-0.074658,-0.980785,-0.180239,-0.161273,-0.956941,-0.241362,-0.111087,-0.956941,-0.268187,-0.037509,-0.995185,-0.090555,-0.054455,-0.995185,-0.081498,-0.108386,-0.980785,-0.162211,-0.037509,-0.995185,-0.090555,-0.108386,-0.980785,-0.162211,-0.074658,-0.980785,-0.180239,-0.019122,-0.995185,-0.096133,-0.037509,-0.995185,-0.090555,-0.074658,-0.980785,-0.180239,-0.019122,-0.995185,-0.096133,-0.074658,-0.980785,-0.180239,-0.03806,-0.980785,-0.191341,-0.03806,-0.980785,-0.191341,-0.074658,-0.980785,-0.180239,-0.111087,-0.956941,-0.268187,-0.03806,-0.980785,-0.191341,-0.111087,-0.956941,-0.268187,-0.056632,-0.956941,-0.284706,-0.056632,-0.956941,-0.284706,-0.111087,-0.956941,-0.268187,-0.146446,-0.92388,-0.353553,-0.056632,-0.956941,-0.284706,-0.146446,-0.92388,-0.353553,-0.074658,-0.92388,-0.37533,-0.074658,-0.92388,-0.37533,-0.146446,-0.92388,-0.353553,-0.180396,-0.881922,-0.435513,-0.074658,-0.92388,-0.37533,-0.180396,-0.881922,-0.435513,-0.091965,-0.881922,-0.462338,-0.091965,-0.881922,-0.462338,-0.180396,-0.881922,-0.435513,-0.212607,-0.83147,-0.513279,-0.091965,-0.881922,-0.462338,-0.212607,-0.83147,-0.513279,-0.108386,-0.83147,-0.544894,-0.108386,-0.83147,-0.544894,-0.212607,-0.83147,-0.513279,-0.242772,-0.773011,-0.586102,-0.108386,-0.83147,-0.544894,-0.242772,-0.773011,-0.586102,-0.123764,-0.773011,-0.622203,-0.123764,-0.773011,-0.622203,-0.242772,-0.773011,-0.586102,-0.270598,-0.707107,-0.653281,-0.123764,-0.773011,-0.622203,-0.270598,-0.707107,-0.653281,-0.13795,-0.707107,-0.693519,-0.13795,-0.707107,-0.693519,-0.270598,-0.707107,-0.653281,-0.295818,-0.634394,-0.714168,-0.13795,-0.707107,-0.693519,-0.295818,-0.634394,-0.714168,-0.150807,-0.634394,-0.758157,-0.150807,-0.634394,-0.758157,-0.295818,-0.634394,-0.714168,-0.31819,-0.555571,-0.768177,-0.150807,-0.634394,-0.758157,-0.31819,-0.555571,-0.768177,-0.162212,-0.555571,-0.815493,-0.162212,-0.555571,-0.815493,-0.31819,-0.555571,-0.768177,-0.337497,-0.471397,-0.814789,-0.162212,-0.555571,-0.815493,-0.337497,-0.471397,-0.814789,-0.172054,-0.471397,-0.864975,-0.172054,-0.471397,-0.864975,-0.337497,-0.471397,-0.814789,-0.353553,-0.382684,-0.853553,-0.172054,-0.471397,-0.864975,-0.353553,-0.382684,-0.853553,-0.18024,-0.382684,-0.906127,-0.18024,-0.382684,-0.906127,-0.353553,-0.382684,-0.853553,-0.366205,-0.290285,-0.884097,-0.18024,-0.382684,-0.906127,-0.366205,-0.290285,-0.884097,-0.18669,-0.290285,-0.938553,-0.18669,-0.290285,-0.938553,-0.366205,-0.290285,-0.884097,-0.191342,-0.195091,-0.96194,-0.366205,-0.290285,-0.884097,-0.37533,-0.195091,-0.906127,-0.191342,-0.195091,-0.96194,-0.191342,-0.195091,-0.96194,-0.37533,-0.195091,-0.906127,-0.380841,-0.098017,-0.91943,-0.191342,-0.195091,-0.96194,-0.380841,-0.098017,-0.91943,-0.194151,-0.098017,-0.976062,-0.194151,-0.098017,-0.976062,-0.380841,-0.098017,-0.91943,-0.19509,0,-0.980785,-0.380841,-0.098017,-0.91943,-0.382683,0,-0.923879,-0.19509,0,-0.980785,-0.19509,0,-0.980785,-0.382683,0,-0.923879,-0.380841,0.098017,-0.91943,-0.19509,0,-0.980785,-0.380841,0.098017,-0.91943,-0.194151,0.098017,-0.976062,-0.194151,0.098017,-0.976062,-0.380841,0.098017,-0.91943,-0.191342,0.19509,-0.96194,-0.380841,0.098017,-0.91943,-0.37533,0.19509,-0.906127,-0.191342,0.19509,-0.96194,-0.191342,0.19509,-0.96194,-0.37533,0.19509,-0.906127,-0.366205,0.290285,-0.884097,-0.191342,0.19509,-0.96194,-0.366205,0.290285,-0.884097,-0.18669,0.290285,-0.938553,-0.18669,0.290285,-0.938553,-0.366205,0.290285,-0.884097,-0.353553,0.382683,-0.853553,-0.18669,0.290285,-0.938553,-0.353553,0.382683,-0.853553,-0.18024,0.382683,-0.906127,-0.18024,0.382683,-0.906127,-0.353553,0.382683,-0.853553,-0.172054,0.471397,-0.864975,-0.353553,0.382683,-0.853553,-0.337497,0.471397,-0.814789,-0.172054,0.471397,-0.864975,-0.172054,0.471397,-0.864975,-0.337497,0.471397,-0.814789,-0.162212,0.55557,-0.815493,-0.337497,0.471397,-0.814789,-0.31819,0.55557,-0.768178,-0.162212,0.55557,-0.815493,-0.162212,0.55557,-0.815493,-0.31819,0.55557,-0.768178,-0.295818,0.634393,-0.714168,-0.162212,0.55557,-0.815493,-0.295818,0.634393,-0.714168,-0.150807,0.634393,-0.758157,-0.150807,0.634393,-0.758157,-0.295818,0.634393,-0.714168,-0.270598,0.707107,-0.653281,-0.150807,0.634393,-0.758157,-0.270598,0.707107,-0.653281,-0.13795,0.707107,-0.69352,-0.13795,0.707107,-0.69352,-0.270598,0.707107,-0.653281,-0.242772,0.77301,-0.586103,-0.13795,0.707107,-0.69352,-0.242772,0.77301,-0.586103,-0.123764,0.77301,-0.622203,-0.123764,0.77301,-0.622203,-0.242772,0.77301,-0.586103,-0.212608,0.83147,-0.51328,-0.123764,0.77301,-0.622203,-0.212608,0.83147,-0.51328,-0.108386,0.83147,-0.544895,-0.108386,0.83147,-0.544895,-0.212608,0.83147,-0.51328,-0.180396,0.881921,-0.435514,-0.108386,0.83147,-0.544895,-0.180396,0.881921,-0.435514,-0.091965,0.881921,-0.462339,-0.091965,0.881921,-0.462339,-0.180396,0.881921,-0.435514,-0.146447,0.92388,-0.353553,-0.091965,0.881921,-0.462339,-0.146447,0.92388,-0.353553,-0.074658,0.92388,-0.37533,-0.074658,0.92388,-0.37533,-0.146447,0.92388,-0.353553,-0.111087,0.95694,-0.268188,-0.074658,0.92388,-0.37533,-0.111087,0.95694,-0.268188,-0.056632,0.95694,-0.284707,-0.056632,0.95694,-0.284707,-0.111087,0.95694,-0.268188,-0.074658,0.980785,-0.18024,-0.056632,0.95694,-0.284707,-0.074658,0.980785,-0.18024,-0.03806,0.980785,-0.191342,-0.03806,0.980785,-0.191342,-0.074658,0.980785,-0.18024,-0.03751,0.995185,-0.090556,-0.03806,0.980785,-0.191342,-0.03751,0.995185,-0.090556,-0.019122,0.995185,-0.096134,0,0.980785,-0.19509,-0.03806,0.980785,-0.191342,-0.019122,0.995185,-0.096134,0,0.980785,-0.19509,-0.019122,0.995185,-0.096134,0,0.995185,-0.098017,0,0.95694,-0.290285,-0.056632,0.95694,-0.284707,-0.03806,0.980785,-0.191342,0,0.95694,-0.290285,-0.03806,0.980785,-0.191342,0,0.980785,-0.19509,0,0.92388,-0.382683,-0.074658,0.92388,-0.37533,-0.056632,0.95694,-0.284707,0,0.92388,-0.382683,-0.056632,0.95694,-0.284707,0,0.95694,-0.290285,0,0.881921,-0.471397,-0.091965,0.881921,-0.462339,-0.074658,0.92388,-0.37533,0,0.881921,-0.471397,-0.074658,0.92388,-0.37533,0,0.92388,-0.382683,0,0.83147,-0.55557,-0.108386,0.83147,-0.544895,-0.091965,0.881921,-0.462339,0,0.83147,-0.55557,-0.091965,0.881921,-0.462339,0,0.881921,-0.471397,0,0.77301,-0.634393,-0.123764,0.77301,-0.622203,-0.108386,0.83147,-0.544895,0,0.77301,-0.634393,-0.108386,0.83147,-0.544895,0,0.83147,-0.55557,0,0.707107,-0.707107,-0.13795,0.707107,-0.69352,-0.123764,0.77301,-0.622203,0,0.707107,-0.707107,-0.123764,0.77301,-0.622203,0,0.77301,-0.634393,0,0.634393,-0.77301,-0.150807,0.634393,-0.758157,-0.13795,0.707107,-0.69352,0,0.634393,-0.77301,-0.13795,0.707107,-0.69352,0,0.707107,-0.707107,0,0.55557,-0.831469,-0.162212,0.55557,-0.815493,-0.150807,0.634393,-0.758157,0,0.55557,-0.831469,-0.150807,0.634393,-0.758157,0,0.634393,-0.77301,0,0.471397,-0.881921,-0.172054,0.471397,-0.864975,0,0.55557,-0.831469,-0.172054,0.471397,-0.864975,-0.162212,0.55557,-0.815493,0,0.55557,-0.831469,0,0.382683,-0.923879,-0.18024,0.382683,-0.906127,0,0.471397,-0.881921,-0.18024,0.382683,-0.906127,-0.172054,0.471397,-0.864975,0,0.471397,-0.881921,0,0.290285,-0.95694,-0.18669,0.290285,-0.938553,-0.18024,0.382683,-0.906127,0,0.290285,-0.95694,-0.18024,0.382683,-0.906127,0,0.382683,-0.923879,0,0.19509,-0.980785,-0.191342,0.19509,-0.96194,-0.18669,0.290285,-0.938553,0,0.19509,-0.980785,-0.18669,0.290285,-0.938553,0,0.290285,-0.95694,0,0.098017,-0.995184,-0.194151,0.098017,-0.976062,0,0.19509,-0.980785,-0.194151,0.098017,-0.976062,-0.191342,0.19509,-0.96194,0,0.19509,-0.980785,0,0,-1,-0.19509,0,-0.980785,-0.194151,0.098017,-0.976062,0,0,-1,-0.194151,0.098017,-0.976062,0,0.098017,-0.995184,0,-0.098017,-0.995184,-0.194151,-0.098017,-0.976062,0,0,-1,-0.194151,-0.098017,-0.976062,-0.19509,0,-0.980785,0,0,-1,0,-0.195091,-0.980785,-0.191342,-0.195091,-0.96194,-0.194151,-0.098017,-0.976062,0,-0.195091,-0.980785,-0.194151,-0.098017,-0.976062,0,-0.098017,-0.995184,0,-0.290285,-0.95694,-0.18669,-0.290285,-0.938553,0,-0.195091,-0.980785,-0.18669,-0.290285,-0.938553,-0.191342,-0.195091,-0.96194,0,-0.195091,-0.980785,0,-0.382684,-0.923879,-0.18024,-0.382684,-0.906127,-0.18669,-0.290285,-0.938553,0,-0.382684,-0.923879,-0.18669,-0.290285,-0.938553,0,-0.290285,-0.95694,0,-0.471397,-0.881921,-0.172054,-0.471397,-0.864975,-0.18024,-0.382684,-0.906127,0,-0.471397,-0.881921,-0.18024,-0.382684,-0.906127,0,-0.382684,-0.923879,0,-0.555571,-0.831469,-0.162212,-0.555571,-0.815493,-0.172054,-0.471397,-0.864975,0,-0.555571,-0.831469,-0.172054,-0.471397,-0.864975,0,-0.471397,-0.881921,0,-0.634394,-0.77301,-0.150807,-0.634394,-0.758157,-0.162212,-0.555571,-0.815493,0,-0.634394,-0.77301,-0.162212,-0.555571,-0.815493,0,-0.555571,-0.831469,0,-0.707107,-0.707106,-0.13795,-0.707107,-0.693519,-0.150807,-0.634394,-0.758157,0,-0.707107,-0.707106,-0.150807,-0.634394,-0.758157,0,-0.634394,-0.77301,0,-0.773011,-0.634393,-0.123764,-0.773011,-0.622203,-0.13795,-0.707107,-0.693519,0,-0.773011,-0.634393,-0.13795,-0.707107,-0.693519,0,-0.707107,-0.707106,0,-0.83147,-0.55557,-0.108386,-0.83147,-0.544894,-0.123764,-0.773011,-0.622203,0,-0.83147,-0.55557,-0.123764,-0.773011,-0.622203,0,-0.773011,-0.634393,0,-0.881922,-0.471396,-0.091965,-0.881922,-0.462338,-0.108386,-0.83147,-0.544894,0,-0.881922,-0.471396,-0.108386,-0.83147,-0.544894,0,-0.83147,-0.55557,0,-0.92388,-0.382683,-0.074658,-0.92388,-0.37533,-0.091965,-0.881922,-0.462338,0,-0.92388,-0.382683,-0.091965,-0.881922,-0.462338,0,-0.881922,-0.471396,0,-0.956941,-0.290284,-0.056632,-0.956941,-0.284706,-0.074658,-0.92388,-0.37533,0,-0.956941,-0.290284,-0.074658,-0.92388,-0.37533,0,-0.92388,-0.382683,0,-0.980785,-0.19509,-0.03806,-0.980785,-0.191341,-0.056632,-0.956941,-0.284706,0,-0.980785,-0.19509,-0.056632,-0.956941,-0.284706,0,-0.956941,-0.290284,0,-0.995185,-0.098016,-0.019122,-0.995185,-0.096133,-0.03806,-0.980785,-0.191341,0,-0.995185,-0.098016,-0.03806,-0.980785,-0.191341,0,-0.980785,-0.19509,0.019122,-0.995185,-0.096133,0,-0.995185,-0.098016,0,-0.980785,-0.19509,0.019122,-0.995185,-0.096133,0,-0.980785,-0.19509,0.03806,-0.980785,-0.191341,0.03806,-0.980785,-0.191341,0,-0.980785,-0.19509,0,-0.956941,-0.290284,0.03806,-0.980785,-0.191341,0,-0.956941,-0.290284,0.056632,-0.956941,-0.284706,0.056632,-0.956941,-0.284706,0,-0.956941,-0.290284,0,-0.92388,-0.382683,0.056632,-0.956941,-0.284706,0,-0.92388,-0.382683,0.074658,-0.92388,-0.37533,0.074658,-0.92388,-0.37533,0,-0.92388,-0.382683,0,-0.881922,-0.471396,0.074658,-0.92388,-0.37533,0,-0.881922,-0.471396,0.091965,-0.881922,-0.462338,0.091965,-0.881922,-0.462338,0,-0.881922,-0.471396,0,-0.83147,-0.55557,0.091965,-0.881922,-0.462338,0,-0.83147,-0.55557,0.108386,-0.83147,-0.544894,0.108386,-0.83147,-0.544894,0,-0.83147,-0.55557,0,-0.773011,-0.634393,0.108386,-0.83147,-0.544894,0,-0.773011,-0.634393,0.123764,-0.773011,-0.622203,0.123764,-0.773011,-0.622203,0,-0.773011,-0.634393,0,-0.707107,-0.707106,0.123764,-0.773011,-0.622203,0,-0.707107,-0.707106,0.13795,-0.707107,-0.693519,0.13795,-0.707107,-0.693519,0,-0.707107,-0.707106,0,-0.634394,-0.77301,0.13795,-0.707107,-0.693519,0,-0.634394,-0.77301,0.150807,-0.634394,-0.758157,0.150807,-0.634394,-0.758157,0,-0.634394,-0.77301,0,-0.555571,-0.831469,0.150807,-0.634394,-0.758157,0,-0.555571,-0.831469,0.162212,-0.555571,-0.815493,0.162212,-0.555571,-0.815493,0,-0.555571,-0.831469,0,-0.471397,-0.881921,0.162212,-0.555571,-0.815493,0,-0.471397,-0.881921,0.172054,-0.471397,-0.864975,0.172054,-0.471397,-0.864975,0,-0.471397,-0.881921,0,-0.382684,-0.923879,0.172054,-0.471397,-0.864975,0,-0.382684,-0.923879,0.18024,-0.382684,-0.906127,0.18024,-0.382684,-0.906127,0,-0.382684,-0.923879,0,-0.290285,-0.95694,0.18024,-0.382684,-0.906127,0,-0.290285,-0.95694,0.18669,-0.290285,-0.938553,0.18669,-0.290285,-0.938553,0,-0.290285,-0.95694,0.191342,-0.195091,-0.96194,0,-0.290285,-0.95694,0,-0.195091,-0.980785,0.191342,-0.195091,-0.96194,0.191342,-0.195091,-0.96194,0,-0.195091,-0.980785,0,-0.098017,-0.995184,0.191342,-0.195091,-0.96194,0,-0.098017,-0.995184,0.194151,-0.098017,-0.976062,0.194151,-0.098017,-0.976062,0,-0.098017,-0.995184,0.19509,0,-0.980785,0,-0.098017,-0.995184,0,0,-1,0.19509,0,-0.980785,0.19509,0,-0.980785,0,0,-1,0,0.098017,-0.995184,0.19509,0,-0.980785,0,0.098017,-0.995184,0.194151,0.098017,-0.976062,0.194151,0.098017,-0.976062,0,0.098017,-0.995184,0.191342,0.19509,-0.96194,0,0.098017,-0.995184,0,0.19509,-0.980785,0.191342,0.19509,-0.96194,0.191342,0.19509,-0.96194,0,0.19509,-0.980785,0,0.290285,-0.95694,0.191342,0.19509,-0.96194,0,0.290285,-0.95694,0.18669,0.290285,-0.938553,0.18669,0.290285,-0.938553,0,0.290285,-0.95694,0,0.382683,-0.923879,0.18669,0.290285,-0.938553,0,0.382683,-0.923879,0.18024,0.382683,-0.906127,0.18024,0.382683,-0.906127,0,0.382683,-0.923879,0.172054,0.471397,-0.864975,0,0.382683,-0.923879,0,0.471397,-0.881921,0.172054,0.471397,-0.864975,0.172054,0.471397,-0.864975,0,0.471397,-0.881921,0,0.55557,-0.831469,0.172054,0.471397,-0.864975,0,0.55557,-0.831469,0.162212,0.55557,-0.815493,0.162212,0.55557,-0.815493,0,0.55557,-0.831469,0,0.634393,-0.77301,0.162212,0.55557,-0.815493,0,0.634393,-0.77301,0.150807,0.634393,-0.758157,0.150807,0.634393,-0.758157,0,0.634393,-0.77301,0,0.707107,-0.707107,0.150807,0.634393,-0.758157,0,0.707107,-0.707107,0.13795,0.707107,-0.69352,0.13795,0.707107,-0.69352,0,0.707107,-0.707107,0,0.77301,-0.634393,0.13795,0.707107,-0.69352,0,0.77301,-0.634393,0.123764,0.77301,-0.622204,0.123764,0.77301,-0.622204,0,0.77301,-0.634393,0,0.83147,-0.55557,0.123764,0.77301,-0.622204,0,0.83147,-0.55557,0.108386,0.83147,-0.544895,0.108386,0.83147,-0.544895,0,0.83147,-0.55557,0,0.881921,-0.471397,0.108386,0.83147,-0.544895,0,0.881921,-0.471397,0.091965,0.881921,-0.462339,0.091965,0.881921,-0.462339,0,0.881921,-0.471397,0,0.92388,-0.382683,0.091965,0.881921,-0.462339,0,0.92388,-0.382683,0.074658,0.92388,-0.37533,0.074658,0.92388,-0.37533,0,0.92388,-0.382683,0,0.95694,-0.290285,0.074658,0.92388,-0.37533,0,0.95694,-0.290285,0.056632,0.95694,-0.284707,0.056632,0.95694,-0.284707,0,0.95694,-0.290285,0,0.980785,-0.19509,0.056632,0.95694,-0.284707,0,0.980785,-0.19509,0.03806,0.980785,-0.191342,0.03806,0.980785,-0.191342,0,0.980785,-0.19509,0,0.995185,-0.098017,0.03806,0.980785,-0.191342,0,0.995185,-0.098017,0.019122,0.995185,-0.096134,0.074658,0.980785,-0.18024,0.03806,0.980785,-0.191342,0.019122,0.995185,-0.096134,0.074658,0.980785,-0.18024,0.019122,0.995185,-0.096134,0.03751,0.995185,-0.090556,0.111087,0.95694,-0.268188,0.056632,0.95694,-0.284707,0.03806,0.980785,-0.191342,0.111087,0.95694,-0.268188,0.03806,0.980785,-0.191342,0.074658,0.980785,-0.18024,0.146447,0.92388,-0.353553,0.074658,0.92388,-0.37533,0.056632,0.95694,-0.284707,0.146447,0.92388,-0.353553,0.056632,0.95694,-0.284707,0.111087,0.95694,-0.268188,0.180396,0.881921,-0.435514,0.091965,0.881921,-0.462339,0.074658,0.92388,-0.37533,0.180396,0.881921,-0.435514,0.074658,0.92388,-0.37533,0.146447,0.92388,-0.353553,0.212607,0.83147,-0.51328,0.108386,0.83147,-0.544895,0.091965,0.881921,-0.462339,0.212607,0.83147,-0.51328,0.091965,0.881921,-0.462339,0.180396,0.881921,-0.435514,0.242772,0.77301,-0.586103,0.123764,0.77301,-0.622204,0.108386,0.83147,-0.544895,0.242772,0.77301,-0.586103,0.108386,0.83147,-0.544895,0.212607,0.83147,-0.51328,0.270598,0.707107,-0.653282,0.13795,0.707107,-0.69352,0.123764,0.77301,-0.622204,0.270598,0.707107,-0.653282,0.123764,0.77301,-0.622204,0.242772,0.77301,-0.586103,0.295818,0.634393,-0.714168,0.150807,0.634393,-0.758157,0.13795,0.707107,-0.69352,0.295818,0.634393,-0.714168,0.13795,0.707107,-0.69352,0.270598,0.707107,-0.653282,0.31819,0.55557,-0.768178,0.162212,0.55557,-0.815493,0.150807,0.634393,-0.758157,0.31819,0.55557,-0.768178,0.150807,0.634393,-0.758157,0.295818,0.634393,-0.714168,0.337497,0.471397,-0.814789,0.172054,0.471397,-0.864975,0.31819,0.55557,-0.768178,0.172054,0.471397,-0.864975,0.162212,0.55557,-0.815493,0.31819,0.55557,-0.768178,0.353553,0.382683,-0.853553,0.18024,0.382683,-0.906127,0.172054,0.471397,-0.864975,0.353553,0.382683,-0.853553,0.172054,0.471397,-0.864975,0.337497,0.471397,-0.814789,0.366205,0.290285,-0.884098,0.18669,0.290285,-0.938553,0.18024,0.382683,-0.906127,0.366205,0.290285,-0.884098,0.18024,0.382683,-0.906127,0.353553,0.382683,-0.853553,0.37533,0.19509,-0.906127,0.191342,0.19509,-0.96194,0.18669,0.290285,-0.938553,0.37533,0.19509,-0.906127,0.18669,0.290285,-0.938553,0.366205,0.290285,-0.884098,0.380841,0.098017,-0.919431,0.194151,0.098017,-0.976062,0.37533,0.19509,-0.906127,0.194151,0.098017,-0.976062,0.191342,0.19509,-0.96194,0.37533,0.19509,-0.906127,0.382683,0,-0.923879,0.19509,0,-0.980785,0.194151,0.098017,-0.976062,0.382683,0,-0.923879,0.194151,0.098017,-0.976062,0.380841,0.098017,-0.919431,0.380841,-0.098017,-0.919431,0.194151,-0.098017,-0.976062,0.382683,0,-0.923879,0.194151,-0.098017,-0.976062,0.19509,0,-0.980785,0.382683,0,-0.923879,0.37533,-0.195091,-0.906127,0.191342,-0.195091,-0.96194,0.194151,-0.098017,-0.976062,0.37533,-0.195091,-0.906127,0.194151,-0.098017,-0.976062,0.380841,-0.098017,-0.919431,0.366205,-0.290285,-0.884097,0.18669,-0.290285,-0.938553,0.37533,-0.195091,-0.906127,0.18669,-0.290285,-0.938553,0.191342,-0.195091,-0.96194,0.37533,-0.195091,-0.906127,0.353553,-0.382684,-0.853553,0.18024,-0.382684,-0.906127,0.18669,-0.290285,-0.938553,0.353553,-0.382684,-0.853553,0.18669,-0.290285,-0.938553,0.366205,-0.290285,-0.884097,0.337497,-0.471397,-0.814789,0.172054,-0.471397,-0.864975,0.18024,-0.382684,-0.906127,0.337497,-0.471397,-0.814789,0.18024,-0.382684,-0.906127,0.353553,-0.382684,-0.853553,0.31819,-0.555571,-0.768177,0.162212,-0.555571,-0.815493,0.172054,-0.471397,-0.864975,0.31819,-0.555571,-0.768177,0.172054,-0.471397,-0.864975,0.337497,-0.471397,-0.814789,0.295818,-0.634394,-0.714168,0.150807,-0.634394,-0.758157,0.162212,-0.555571,-0.815493,0.295818,-0.634394,-0.714168,0.162212,-0.555571,-0.815493,0.31819,-0.555571,-0.768177,0.270598,-0.707107,-0.653281,0.13795,-0.707107,-0.693519,0.150807,-0.634394,-0.758157,0.270598,-0.707107,-0.653281,0.150807,-0.634394,-0.758157,0.295818,-0.634394,-0.714168,0.242772,-0.773011,-0.586102,0.123764,-0.773011,-0.622203,0.13795,-0.707107,-0.693519,0.242772,-0.773011,-0.586102,0.13795,-0.707107,-0.693519,0.270598,-0.707107,-0.653281,0.212607,-0.83147,-0.513279,0.108386,-0.83147,-0.544894,0.123764,-0.773011,-0.622203,0.212607,-0.83147,-0.513279,0.123764,-0.773011,-0.622203,0.242772,-0.773011,-0.586102,0.180395,-0.881922,-0.435513,0.091965,-0.881922,-0.462338,0.108386,-0.83147,-0.544894,0.180395,-0.881922,-0.435513,0.108386,-0.83147,-0.544894,0.212607,-0.83147,-0.513279,0.146446,-0.92388,-0.353553,0.074658,-0.92388,-0.37533,0.091965,-0.881922,-0.462338,0.146446,-0.92388,-0.353553,0.091965,-0.881922,-0.462338,0.180395,-0.881922,-0.435513,0.111087,-0.956941,-0.268187,0.056632,-0.956941,-0.284706,0.074658,-0.92388,-0.37533,0.111087,-0.956941,-0.268187,0.074658,-0.92388,-0.37533,0.146446,-0.92388,-0.353553,0.074658,-0.980785,-0.180239,0.03806,-0.980785,-0.191341,0.056632,-0.956941,-0.284706,0.074658,-0.980785,-0.180239,0.056632,-0.956941,-0.284706,0.111087,-0.956941,-0.268187,0.037509,-0.995185,-0.090555,0.019122,-0.995185,-0.096133,0.03806,-0.980785,-0.191341,0.037509,-0.995185,-0.090555,0.03806,-0.980785,-0.191341,0.074658,-0.980785,-0.180239,0.054455,-0.995185,-0.081498,0.037509,-0.995185,-0.090555,0.074658,-0.980785,-0.180239,0.054455,-0.995185,-0.081498,0.074658,-0.980785,-0.180239,0.108386,-0.980785,-0.162211,0.108386,-0.980785,-0.162211,0.074658,-0.980785,-0.180239,0.111087,-0.956941,-0.268187,0.108386,-0.980785,-0.162211,0.111087,-0.956941,-0.268187,0.161273,-0.956941,-0.241362,0.161273,-0.956941,-0.241362,0.111087,-0.956941,-0.268187,0.146446,-0.92388,-0.353553,0.161273,-0.956941,-0.241362,0.146446,-0.92388,-0.353553,0.212607,-0.92388,-0.318189,0.212607,-0.92388,-0.318189,0.146446,-0.92388,-0.353553,0.180395,-0.881922,-0.435513,0.212607,-0.92388,-0.318189,0.180395,-0.881922,-0.435513,0.261894,-0.881922,-0.391952,0.261894,-0.881922,-0.391952,0.180395,-0.881922,-0.435513,0.212607,-0.83147,-0.513279,0.261894,-0.881922,-0.391952,0.212607,-0.83147,-0.513279,0.308658,-0.83147,-0.461939,0.308658,-0.83147,-0.461939,0.212607,-0.83147,-0.513279,0.242772,-0.773011,-0.586102,0.308658,-0.83147,-0.461939,0.242772,-0.773011,-0.586102,0.35245,-0.773011,-0.527478,0.35245,-0.773011,-0.527478,0.242772,-0.773011,-0.586102,0.270598,-0.707107,-0.653281,0.35245,-0.773011,-0.527478,0.270598,-0.707107,-0.653281,0.392847,-0.707107,-0.587937,0.392847,-0.707107,-0.587937,0.270598,-0.707107,-0.653281,0.295818,-0.634394,-0.714168,0.392847,-0.707107,-0.587937,0.295818,-0.634394,-0.714168,0.429461,-0.634394,-0.642734,0.429461,-0.634394,-0.642734,0.295818,-0.634394,-0.714168,0.31819,-0.555571,-0.768177,0.429461,-0.634394,-0.642734,0.31819,-0.555571,-0.768177,0.46194,-0.555571,-0.691341,0.46194,-0.555571,-0.691341,0.31819,-0.555571,-0.768177,0.337497,-0.471397,-0.814789,0.46194,-0.555571,-0.691341,0.337497,-0.471397,-0.814789,0.489969,-0.471397,-0.73329,0.489969,-0.471397,-0.73329,0.337497,-0.471397,-0.814789,0.353553,-0.382684,-0.853553,0.489969,-0.471397,-0.73329,0.353553,-0.382684,-0.853553,0.51328,-0.382684,-0.768178,0.51328,-0.382684,-0.768178,0.353553,-0.382684,-0.853553,0.366205,-0.290285,-0.884097,0.51328,-0.382684,-0.768178,0.366205,-0.290285,-0.884097,0.531647,-0.290285,-0.795667,0.531647,-0.290285,-0.795667,0.366205,-0.290285,-0.884097,0.544895,-0.195091,-0.815493,0.366205,-0.290285,-0.884097,0.37533,-0.195091,-0.906127,0.544895,-0.195091,-0.815493,0.544895,-0.195091,-0.815493,0.37533,-0.195091,-0.906127,0.380841,-0.098017,-0.919431,0.544895,-0.195091,-0.815493,0.380841,-0.098017,-0.919431,0.552895,-0.098017,-0.827466,0.552895,-0.098017,-0.827466,0.380841,-0.098017,-0.919431,0.55557,0,-0.83147,0.380841,-0.098017,-0.919431,0.382683,0,-0.923879,0.55557,0,-0.83147,0.55557,0,-0.83147,0.382683,0,-0.923879,0.380841,0.098017,-0.919431,0.55557,0,-0.83147,0.380841,0.098017,-0.919431,0.552895,0.098017,-0.827466,0.552895,0.098017,-0.827466,0.380841,0.098017,-0.919431,0.544895,0.19509,-0.815493,0.380841,0.098017,-0.919431,0.37533,0.19509,-0.906127,0.544895,0.19509,-0.815493,0.544895,0.19509,-0.815493,0.37533,0.19509,-0.906127,0.366205,0.290285,-0.884098,0.544895,0.19509,-0.815493,0.366205,0.290285,-0.884098,0.531647,0.290285,-0.795667,0.531647,0.290285,-0.795667,0.366205,0.290285,-0.884098,0.353553,0.382683,-0.853553,0.531647,0.290285,-0.795667,0.353553,0.382683,-0.853553,0.51328,0.382683,-0.768178,0.51328,0.382683,-0.768178,0.353553,0.382683,-0.853553,0.489969,0.471397,-0.733291,0.353553,0.382683,-0.853553,0.337497,0.471397,-0.814789,0.489969,0.471397,-0.733291,0.489969,0.471397,-0.733291,0.337497,0.471397,-0.814789,0.46194,0.55557,-0.691342,0.337497,0.471397,-0.814789,0.31819,0.55557,-0.768178,0.46194,0.55557,-0.691342,0.46194,0.55557,-0.691342,0.31819,0.55557,-0.768178,0.295818,0.634393,-0.714168,0.46194,0.55557,-0.691342,0.295818,0.634393,-0.714168,0.429462,0.634393,-0.642735,0.429462,0.634393,-0.642735,0.295818,0.634393,-0.714168,0.270598,0.707107,-0.653282,0.429462,0.634393,-0.642735,0.270598,0.707107,-0.653282,0.392847,0.707107,-0.587938,0.392847,0.707107,-0.587938,0.270598,0.707107,-0.653282,0.242772,0.77301,-0.586103,0.392847,0.707107,-0.587938,0.242772,0.77301,-0.586103,0.35245,0.77301,-0.527479,0.35245,0.77301,-0.527479,0.242772,0.77301,-0.586103,0.212607,0.83147,-0.51328,0.35245,0.77301,-0.527479,0.212607,0.83147,-0.51328,0.308658,0.83147,-0.46194,0.308658,0.83147,-0.46194,0.212607,0.83147,-0.51328,0.180396,0.881921,-0.435514,0.308658,0.83147,-0.46194,0.180396,0.881921,-0.435514,0.261894,0.881921,-0.391952,0.261894,0.881921,-0.391952,0.180396,0.881921,-0.435514,0.146447,0.92388,-0.353553,0.261894,0.881921,-0.391952,0.146447,0.92388,-0.353553,0.212608,0.92388,-0.31819,0.212608,0.92388,-0.31819,0.146447,0.92388,-0.353553,0.111087,0.95694,-0.268188,0.212608,0.92388,-0.31819,0.111087,0.95694,-0.268188,0.161273,0.95694,-0.241363,0.161273,0.95694,-0.241363,0.111087,0.95694,-0.268188,0.074658,0.980785,-0.18024,0.161273,0.95694,-0.241363,0.074658,0.980785,-0.18024,0.108386,0.980785,-0.162212,0.108386,0.980785,-0.162212,0.074658,0.980785,-0.18024,0.03751,0.995185,-0.090556,0.108386,0.980785,-0.162212,0.03751,0.995185,-0.090556,0.054455,0.995185,-0.081498,0.13795,0.980785,-0.13795,0.108386,0.980785,-0.162212,0.054455,0.995185,-0.081498,0.13795,0.980785,-0.13795,0.054455,0.995185,-0.081498,0.069309,0.995185,-0.069309,0.205262,0.95694,-0.205262,0.161273,0.95694,-0.241363,0.108386,0.980785,-0.162212,0.205262,0.95694,-0.205262,0.108386,0.980785,-0.162212,0.13795,0.980785,-0.13795,0.270598,0.92388,-0.270598,0.212608,0.92388,-0.31819,0.161273,0.95694,-0.241363,0.270598,0.92388,-0.270598,0.161273,0.95694,-0.241363,0.205262,0.95694,-0.205262,0.333328,0.881921,-0.333328,0.261894,0.881921,-0.391952,0.212608,0.92388,-0.31819,0.333328,0.881921,-0.333328,0.212608,0.92388,-0.31819,0.270598,0.92388,-0.270598,0.392847,0.83147,-0.392847,0.308658,0.83147,-0.46194,0.261894,0.881921,-0.391952,0.392847,0.83147,-0.392847,0.261894,0.881921,-0.391952,0.333328,0.881921,-0.333328,0.448584,0.77301,-0.448584,0.35245,0.77301,-0.527479,0.308658,0.83147,-0.46194,0.448584,0.77301,-0.448584,0.308658,0.83147,-0.46194,0.392847,0.83147,-0.392847,0.5,0.707107,-0.5,0.392847,0.707107,-0.587938,0.35245,0.77301,-0.527479,0.5,0.707107,-0.5,0.35245,0.77301,-0.527479,0.448584,0.77301,-0.448584,0.546601,0.634393,-0.546601,0.429462,0.634393,-0.642735,0.392847,0.707107,-0.587938,0.546601,0.634393,-0.546601,0.392847,0.707107,-0.587938,0.5,0.707107,-0.5,0.587938,0.55557,-0.587938,0.46194,0.55557,-0.691342,0.429462,0.634393,-0.642735,0.587938,0.55557,-0.587938,0.429462,0.634393,-0.642735,0.546601,0.634393,-0.546601,0.623612,0.471397,-0.623612,0.489969,0.471397,-0.733291,0.46194,0.55557,-0.691342,0.623612,0.471397,-0.623612,0.46194,0.55557,-0.691342,0.587938,0.55557,-0.587938,0.653281,0.382683,-0.653281,0.51328,0.382683,-0.768178,0.623612,0.471397,-0.623612,0.51328,0.382683,-0.768178,0.489969,0.471397,-0.733291,0.623612,0.471397,-0.623612,0.676659,0.290285,-0.676659,0.531647,0.290285,-0.795667,0.51328,0.382683,-0.768178,0.676659,0.290285,-0.676659,0.51328,0.382683,-0.768178,0.653281,0.382683,-0.653281,0.69352,0.19509,-0.69352,0.544895,0.19509,-0.815493,0.531647,0.290285,-0.795667,0.69352,0.19509,-0.69352,0.531647,0.290285,-0.795667,0.676659,0.290285,-0.676659,0.703702,0.098017,-0.703702,0.552895,0.098017,-0.827466,0.69352,0.19509,-0.69352,0.552895,0.098017,-0.827466,0.544895,0.19509,-0.815493,0.69352,0.19509,-0.69352,0.707107,0,-0.707107,0.55557,0,-0.83147,0.552895,0.098017,-0.827466,0.707107,0,-0.707107,0.552895,0.098017,-0.827466,0.703702,0.098017,-0.703702,0.703702,-0.098017,-0.703702,0.552895,-0.098017,-0.827466,0.707107,0,-0.707107,0.552895,-0.098017,-0.827466,0.55557,0,-0.83147,0.707107,0,-0.707107,0.69352,-0.195091,-0.69352,0.544895,-0.195091,-0.815493,0.552895,-0.098017,-0.827466,0.69352,-0.195091,-0.69352,0.552895,-0.098017,-0.827466,0.703702,-0.098017,-0.703702,0.676659,-0.290285,-0.676659,0.531647,-0.290285,-0.795667,0.69352,-0.195091,-0.69352,0.531647,-0.290285,-0.795667,0.544895,-0.195091,-0.815493,0.69352,-0.195091,-0.69352,0.653281,-0.382684,-0.653281,0.51328,-0.382684,-0.768178,0.531647,-0.290285,-0.795667,0.653281,-0.382684,-0.653281,0.531647,-0.290285,-0.795667,0.676659,-0.290285,-0.676659,0.623612,-0.471397,-0.623612,0.489969,-0.471397,-0.73329,0.51328,-0.382684,-0.768178,0.623612,-0.471397,-0.623612,0.51328,-0.382684,-0.768178,0.653281,-0.382684,-0.653281,0.587938,-0.555571,-0.587938,0.46194,-0.555571,-0.691341,0.489969,-0.471397,-0.73329,0.587938,-0.555571,-0.587938,0.489969,-0.471397,-0.73329,0.623612,-0.471397,-0.623612,0.546601,-0.634394,-0.546601,0.429461,-0.634394,-0.642734,0.46194,-0.555571,-0.691341,0.546601,-0.634394,-0.546601,0.46194,-0.555571,-0.691341,0.587938,-0.555571,-0.587938,0.5,-0.707107,-0.5,0.392847,-0.707107,-0.587937,0.429461,-0.634394,-0.642734,0.5,-0.707107,-0.5,0.429461,-0.634394,-0.642734,0.546601,-0.634394,-0.546601,0.448583,-0.773011,-0.448583,0.35245,-0.773011,-0.527478,0.392847,-0.707107,-0.587937,0.448583,-0.773011,-0.448583,0.392847,-0.707107,-0.587937,0.5,-0.707107,-0.5,0.392847,-0.83147,-0.392847,0.308658,-0.83147,-0.461939,0.35245,-0.773011,-0.527478,0.392847,-0.83147,-0.392847,0.35245,-0.773011,-0.527478,0.448583,-0.773011,-0.448583,0.333327,-0.881922,-0.333327,0.261894,-0.881922,-0.391952,0.308658,-0.83147,-0.461939,0.333327,-0.881922,-0.333327,0.308658,-0.83147,-0.461939,0.392847,-0.83147,-0.392847,0.270598,-0.92388,-0.270598,0.212607,-0.92388,-0.318189,0.261894,-0.881922,-0.391952,0.270598,-0.92388,-0.270598,0.261894,-0.881922,-0.391952,0.333327,-0.881922,-0.333327,0.205262,-0.956941,-0.205262,0.161273,-0.956941,-0.241362,0.212607,-0.92388,-0.318189,0.205262,-0.956941,-0.205262,0.212607,-0.92388,-0.318189,0.270598,-0.92388,-0.270598,0.137949,-0.980785,-0.137949,0.108386,-0.980785,-0.162211,0.161273,-0.956941,-0.241362,0.137949,-0.980785,-0.137949,0.161273,-0.956941,-0.241362,0.205262,-0.956941,-0.205262,0.069308,-0.995185,-0.069308,0.054455,-0.995185,-0.081498,0.108386,-0.980785,-0.162211,0.069308,-0.995185,-0.069308,0.108386,-0.980785,-0.162211,0.137949,-0.980785,-0.137949,0.081498,-0.995185,-0.054455,0.069308,-0.995185,-0.069308,0.137949,-0.980785,-0.137949,0.081498,-0.995185,-0.054455,0.137949,-0.980785,-0.137949,0.162211,-0.980785,-0.108386,0.162211,-0.980785,-0.108386,0.137949,-0.980785,-0.137949,0.205262,-0.956941,-0.205262,0.162211,-0.980785,-0.108386,0.205262,-0.956941,-0.205262,0.241362,-0.956941,-0.161273,0.241362,-0.956941,-0.161273,0.205262,-0.956941,-0.205262,0.270598,-0.92388,-0.270598,0.241362,-0.956941,-0.161273,0.270598,-0.92388,-0.270598,0.318189,-0.92388,-0.212607,0.318189,-0.92388,-0.212607,0.270598,-0.92388,-0.270598,0.333327,-0.881922,-0.333327,0.318189,-0.92388,-0.212607,0.333327,-0.881922,-0.333327,0.391952,-0.881922,-0.261894,0.391952,-0.881922,-0.261894,0.333327,-0.881922,-0.333327,0.392847,-0.83147,-0.392847,0.391952,-0.881922,-0.261894,0.392847,-0.83147,-0.392847,0.461939,-0.83147,-0.308658,0.461939,-0.83147,-0.308658,0.392847,-0.83147,-0.392847,0.448583,-0.773011,-0.448583,0.461939,-0.83147,-0.308658,0.448583,-0.773011,-0.448583,0.527478,-0.773011,-0.35245,0.527478,-0.773011,-0.35245,0.448583,-0.773011,-0.448583,0.5,-0.707107,-0.5,0.527478,-0.773011,-0.35245,0.5,-0.707107,-0.5,0.587937,-0.707107,-0.392847,0.587937,-0.707107,-0.392847,0.5,-0.707107,-0.5,0.546601,-0.634394,-0.546601,0.587937,-0.707107,-0.392847,0.546601,-0.634394,-0.546601,0.642734,-0.634394,-0.429461,0.642734,-0.634394,-0.429461,0.546601,-0.634394,-0.546601,0.587938,-0.555571,-0.587938,0.642734,-0.634394,-0.429461,0.587938,-0.555571,-0.587938,0.691342,-0.555571,-0.46194,0.691342,-0.555571,-0.46194,0.587938,-0.555571,-0.587938,0.623612,-0.471397,-0.623612,0.691342,-0.555571,-0.46194,0.623612,-0.471397,-0.623612,0.733291,-0.471397,-0.489969,0.733291,-0.471397,-0.489969,0.623612,-0.471397,-0.623612,0.653281,-0.382684,-0.653281,0.733291,-0.471397,-0.489969,0.653281,-0.382684,-0.653281,0.768178,-0.382684,-0.51328,0.768178,-0.382684,-0.51328,0.653281,-0.382684,-0.653281,0.676659,-0.290285,-0.676659,0.768178,-0.382684,-0.51328,0.676659,-0.290285,-0.676659,0.795667,-0.290285,-0.531647,0.795667,-0.290285,-0.531647,0.676659,-0.290285,-0.676659,0.69352,-0.195091,-0.69352,0.795667,-0.290285,-0.531647,0.69352,-0.195091,-0.69352,0.815493,-0.195091,-0.544895,0.815493,-0.195091,-0.544895,0.69352,-0.195091,-0.69352,0.703702,-0.098017,-0.703702,0.815493,-0.195091,-0.544895,0.703702,-0.098017,-0.703702,0.827466,-0.098017,-0.552895,0.827466,-0.098017,-0.552895,0.703702,-0.098017,-0.703702,0.831469,0,-0.55557,0.703702,-0.098017,-0.703702,0.707107,0,-0.707107,0.831469,0,-0.55557,0.831469,0,-0.55557,0.707107,0,-0.707107,0.703702,0.098017,-0.703702,0.831469,0,-0.55557,0.703702,0.098017,-0.703702,0.827466,0.098017,-0.552895,0.827466,0.098017,-0.552895,0.703702,0.098017,-0.703702,0.69352,0.19509,-0.69352,0.827466,0.098017,-0.552895,0.69352,0.19509,-0.69352,0.815493,0.19509,-0.544895,0.815493,0.19509,-0.544895,0.69352,0.19509,-0.69352,0.676659,0.290285,-0.676659,0.815493,0.19509,-0.544895,0.676659,0.290285,-0.676659,0.795667,0.290285,-0.531648,0.795667,0.290285,-0.531648,0.676659,0.290285,-0.676659,0.653281,0.382683,-0.653281,0.795667,0.290285,-0.531648,0.653281,0.382683,-0.653281,0.768178,0.382683,-0.51328,0.768178,0.382683,-0.51328,0.653281,0.382683,-0.653281,0.623612,0.471397,-0.623612,0.768178,0.382683,-0.51328,0.623612,0.471397,-0.623612,0.733291,0.471397,-0.489969,0.733291,0.471397,-0.489969,0.623612,0.471397,-0.623612,0.587938,0.55557,-0.587938,0.733291,0.471397,-0.489969,0.587938,0.55557,-0.587938,0.691342,0.55557,-0.46194,0.691342,0.55557,-0.46194,0.587938,0.55557,-0.587938,0.546601,0.634393,-0.546601,0.691342,0.55557,-0.46194,0.546601,0.634393,-0.546601,0.642735,0.634393,-0.429462,0.642735,0.634393,-0.429462,0.546601,0.634393,-0.546601,0.5,0.707107,-0.5,0.642735,0.634393,-0.429462,0.5,0.707107,-0.5,0.587938,0.707107,-0.392848,0.587938,0.707107,-0.392848,0.5,0.707107,-0.5,0.448584,0.77301,-0.448584,0.587938,0.707107,-0.392848,0.448584,0.77301,-0.448584,0.527479,0.77301,-0.35245,0.527479,0.77301,-0.35245,0.448584,0.77301,-0.448584,0.392847,0.83147,-0.392847,0.527479,0.77301,-0.35245,0.392847,0.83147,-0.392847,0.46194,0.83147,-0.308658,0.46194,0.83147,-0.308658,0.392847,0.83147,-0.392847,0.333328,0.881921,-0.333328,0.46194,0.83147,-0.308658,0.333328,0.881921,-0.333328,0.391952,0.881921,-0.261894,0.391952,0.881921,-0.261894,0.333328,0.881921,-0.333328,0.270598,0.92388,-0.270598,0.391952,0.881921,-0.261894,0.270598,0.92388,-0.270598,0.31819,0.92388,-0.212608,0.31819,0.92388,-0.212608,0.270598,0.92388,-0.270598,0.205262,0.95694,-0.205262,0.31819,0.92388,-0.212608,0.205262,0.95694,-0.205262,0.241363,0.95694,-0.161274,0.241363,0.95694,-0.161274,0.205262,0.95694,-0.205262,0.13795,0.980785,-0.13795,0.241363,0.95694,-0.161274,0.13795,0.980785,-0.13795,0.162212,0.980785,-0.108386,0.162212,0.980785,-0.108386,0.13795,0.980785,-0.13795,0.069309,0.995185,-0.069309,0.162212,0.980785,-0.108386,0.069309,0.995185,-0.069309,0.081498,0.995185,-0.054455,0.18024,0.980785,-0.074658,0.162212,0.980785,-0.108386,0.081498,0.995185,-0.054455,0.18024,0.980785,-0.074658,0.081498,0.995185,-0.054455,0.090556,0.995185,-0.03751,0.268188,0.95694,-0.111087,0.241363,0.95694,-0.161274,0.162212,0.980785,-0.108386,0.268188,0.95694,-0.111087,0.162212,0.980785,-0.108386,0.18024,0.980785,-0.074658,0.353553,0.92388,-0.146447,0.31819,0.92388,-0.212608,0.241363,0.95694,-0.161274,0.353553,0.92388,-0.146447,0.241363,0.95694,-0.161274,0.268188,0.95694,-0.111087,0.435514,0.881921,-0.180396,0.391952,0.881921,-0.261894,0.31819,0.92388,-0.212608,0.435514,0.881921,-0.180396,0.31819,0.92388,-0.212608,0.353553,0.92388,-0.146447,0.51328,0.83147,-0.212608,0.46194,0.83147,-0.308658,0.391952,0.881921,-0.261894,0.51328,0.83147,-0.212608,0.391952,0.881921,-0.261894,0.435514,0.881921,-0.180396,0.586103,0.77301,-0.242772,0.527479,0.77301,-0.35245,0.46194,0.83147,-0.308658,0.586103,0.77301,-0.242772,0.46194,0.83147,-0.308658,0.51328,0.83147,-0.212608,0.653281,0.707107,-0.270598,0.587938,0.707107,-0.392848,0.527479,0.77301,-0.35245,0.653281,0.707107,-0.270598,0.527479,0.77301,-0.35245,0.586103,0.77301,-0.242772,0.714168,0.634393,-0.295818,0.642735,0.634393,-0.429462,0.587938,0.707107,-0.392848,0.714168,0.634393,-0.295818,0.587938,0.707107,-0.392848,0.653281,0.707107,-0.270598,0.768178,0.55557,-0.31819,0.691342,0.55557,-0.46194,0.642735,0.634393,-0.429462,0.768178,0.55557,-0.31819,0.642735,0.634393,-0.429462,0.714168,0.634393,-0.295818,0.814789,0.471397,-0.337497,0.733291,0.471397,-0.489969,0.691342,0.55557,-0.46194,0.814789,0.471397,-0.337497,0.691342,0.55557,-0.46194,0.768178,0.55557,-0.31819,0.853553,0.382683,-0.353553,0.768178,0.382683,-0.51328,0.733291,0.471397,-0.489969,0.853553,0.382683,-0.353553,0.733291,0.471397,-0.489969,0.814789,0.471397,-0.337497,0.884098,0.290285,-0.366205,0.795667,0.290285,-0.531648,0.768178,0.382683,-0.51328,0.884098,0.290285,-0.366205,0.768178,0.382683,-0.51328,0.853553,0.382683,-0.353553,0.906127,0.19509,-0.37533,0.815493,0.19509,-0.544895,0.795667,0.290285,-0.531648,0.906127,0.19509,-0.37533,0.795667,0.290285,-0.531648,0.884098,0.290285,-0.366205,0.919431,0.098017,-0.380841,0.827466,0.098017,-0.552895,0.815493,0.19509,-0.544895,0.919431,0.098017,-0.380841,0.815493,0.19509,-0.544895,0.906127,0.19509,-0.37533,0.923879,0,-0.382683,0.831469,0,-0.55557,0.827466,0.098017,-0.552895,0.923879,0,-0.382683,0.827466,0.098017,-0.552895,0.919431,0.098017,-0.380841,0.919431,-0.098017,-0.380841,0.827466,-0.098017,-0.552895,0.831469,0,-0.55557,0.919431,-0.098017,-0.380841,0.831469,0,-0.55557,0.923879,0,-0.382683,0.906127,-0.195091,-0.37533,0.815493,-0.195091,-0.544895,0.827466,-0.098017,-0.552895,0.906127,-0.195091,-0.37533,0.827466,-0.098017,-0.552895,0.919431,-0.098017,-0.380841,0.884097,-0.290285,-0.366205,0.795667,-0.290285,-0.531647,0.815493,-0.195091,-0.544895,0.884097,-0.290285,-0.366205,0.815493,-0.195091,-0.544895,0.906127,-0.195091,-0.37533,0.853553,-0.382684,-0.353553,0.768178,-0.382684,-0.51328,0.795667,-0.290285,-0.531647,0.853553,-0.382684,-0.353553,0.795667,-0.290285,-0.531647,0.884097,-0.290285,-0.366205,0.814789,-0.471397,-0.337497,0.733291,-0.471397,-0.489969,0.768178,-0.382684,-0.51328,0.814789,-0.471397,-0.337497,0.768178,-0.382684,-0.51328,0.853553,-0.382684,-0.353553,0.768178,-0.555571,-0.31819,0.691342,-0.555571,-0.46194,0.733291,-0.471397,-0.489969,0.768178,-0.555571,-0.31819,0.733291,-0.471397,-0.489969,0.814789,-0.471397,-0.337497,0.714168,-0.634394,-0.295818,0.642734,-0.634394,-0.429461,0.691342,-0.555571,-0.46194,0.714168,-0.634394,-0.295818,0.691342,-0.555571,-0.46194,0.768178,-0.555571,-0.31819,0.653281,-0.707107,-0.270598,0.587937,-0.707107,-0.392847,0.642734,-0.634394,-0.429461,0.653281,-0.707107,-0.270598,0.642734,-0.634394,-0.429461,0.714168,-0.634394,-0.295818,0.586103,-0.773011,-0.242772,0.527478,-0.773011,-0.35245,0.587937,-0.707107,-0.392847,0.586103,-0.773011,-0.242772,0.587937,-0.707107,-0.392847,0.653281,-0.707107,-0.270598,0.513279,-0.83147,-0.212607,0.461939,-0.83147,-0.308658,0.527478,-0.773011,-0.35245,0.513279,-0.83147,-0.212607,0.527478,-0.773011,-0.35245,0.586103,-0.773011,-0.242772,0.435513,-0.881922,-0.180395,0.391952,-0.881922,-0.261894,0.461939,-0.83147,-0.308658,0.435513,-0.881922,-0.180395,0.461939,-0.83147,-0.308658,0.513279,-0.83147,-0.212607,0.353553,-0.92388,-0.146446,0.318189,-0.92388,-0.212607,0.391952,-0.881922,-0.261894,0.353553,-0.92388,-0.146446,0.391952,-0.881922,-0.261894,0.435513,-0.881922,-0.180395,0.268187,-0.956941,-0.111087,0.241362,-0.956941,-0.161273,0.318189,-0.92388,-0.212607,0.268187,-0.956941,-0.111087,0.318189,-0.92388,-0.212607,0.353553,-0.92388,-0.146446,0.180239,-0.980785,-0.074658,0.162211,-0.980785,-0.108386,0.241362,-0.956941,-0.161273,0.180239,-0.980785,-0.074658,0.241362,-0.956941,-0.161273,0.268187,-0.956941,-0.111087,0.090555,-0.995185,-0.037509,0.081498,-0.995185,-0.054455,0.162211,-0.980785,-0.108386,0.090555,-0.995185,-0.037509,0.162211,-0.980785,-0.108386,0.180239,-0.980785,-0.074658,0.096133,-0.995185,-0.019122,0.090555,-0.995185,-0.037509,0.180239,-0.980785,-0.074658,0.096133,-0.995185,-0.019122,0.180239,-0.980785,-0.074658,0.191341,-0.980785,-0.03806,0.191341,-0.980785,-0.03806,0.180239,-0.980785,-0.074658,0.268187,-0.956941,-0.111087,0.191341,-0.980785,-0.03806,0.268187,-0.956941,-0.111087,0.284706,-0.956941,-0.056632,0.284706,-0.956941,-0.056632,0.268187,-0.956941,-0.111087,0.353553,-0.92388,-0.146446,0.284706,-0.956941,-0.056632,0.353553,-0.92388,-0.146446,0.37533,-0.92388,-0.074658,0.37533,-0.92388,-0.074658,0.353553,-0.92388,-0.146446,0.435513,-0.881922,-0.180395,0.37533,-0.92388,-0.074658,0.435513,-0.881922,-0.180395,0.462338,-0.881922,-0.091965,0.462338,-0.881922,-0.091965,0.435513,-0.881922,-0.180395,0.513279,-0.83147,-0.212607,0.462338,-0.881922,-0.091965,0.513279,-0.83147,-0.212607,0.544895,-0.83147,-0.108386,0.544895,-0.83147,-0.108386,0.513279,-0.83147,-0.212607,0.586103,-0.773011,-0.242772,0.544895,-0.83147,-0.108386,0.586103,-0.773011,-0.242772,0.622203,-0.773011,-0.123764,0.622203,-0.773011,-0.123764,0.586103,-0.773011,-0.242772,0.653281,-0.707107,-0.270598,0.622203,-0.773011,-0.123764,0.653281,-0.707107,-0.270598,0.69352,-0.707107,-0.13795,0.69352,-0.707107,-0.13795,0.653281,-0.707107,-0.270598,0.714168,-0.634394,-0.295818,0.69352,-0.707107,-0.13795,0.714168,-0.634394,-0.295818,0.758157,-0.634394,-0.150807,0.758157,-0.634394,-0.150807,0.714168,-0.634394,-0.295818,0.768178,-0.555571,-0.31819,0.758157,-0.634394,-0.150807,0.768178,-0.555571,-0.31819,0.815493,-0.555571,-0.162212,0.815493,-0.555571,-0.162212,0.768178,-0.555571,-0.31819,0.814789,-0.471397,-0.337497,0.815493,-0.555571,-0.162212,0.814789,-0.471397,-0.337497,0.864975,-0.471397,-0.172054,0.864975,-0.471397,-0.172054,0.814789,-0.471397,-0.337497,0.853553,-0.382684,-0.353553,0.864975,-0.471397,-0.172054,0.853553,-0.382684,-0.353553,0.906127,-0.382684,-0.18024,0.906127,-0.382684,-0.18024,0.853553,-0.382684,-0.353553,0.884097,-0.290285,-0.366205,0.906127,-0.382684,-0.18024,0.884097,-0.290285,-0.366205,0.938553,-0.290285,-0.18669,0.938553,-0.290285,-0.18669,0.884097,-0.290285,-0.366205,0.906127,-0.195091,-0.37533,0.938553,-0.290285,-0.18669,0.906127,-0.195091,-0.37533,0.96194,-0.195091,-0.191342,0.96194,-0.195091,-0.191342,0.906127,-0.195091,-0.37533,0.919431,-0.098017,-0.380841,0.96194,-0.195091,-0.191342,0.919431,-0.098017,-0.380841,0.976062,-0.098017,-0.194151,0.976062,-0.098017,-0.194151,0.919431,-0.098017,-0.380841,0.923879,0,-0.382683,0.976062,-0.098017,-0.194151,0.923879,0,-0.382683,0.980785,0,-0.19509,0.980785,0,-0.19509,0.923879,0,-0.382683,0.919431,0.098017,-0.380841,0.980785,0,-0.19509,0.919431,0.098017,-0.380841,0.976062,0.098017,-0.194151,0.976062,0.098017,-0.194151,0.919431,0.098017,-0.380841,0.906127,0.19509,-0.37533,0.976062,0.098017,-0.194151,0.906127,0.19509,-0.37533,0.96194,0.19509,-0.191342,0.96194,0.19509,-0.191342,0.906127,0.19509,-0.37533,0.884098,0.290285,-0.366205,0.96194,0.19509,-0.191342,0.884098,0.290285,-0.366205,0.938553,0.290285,-0.18669,0.938553,0.290285,-0.18669,0.884098,0.290285,-0.366205,0.853553,0.382683,-0.353553,0.938553,0.290285,-0.18669,0.853553,0.382683,-0.353553,0.906127,0.382683,-0.18024,0.906127,0.382683,-0.18024,0.853553,0.382683,-0.353553,0.814789,0.471397,-0.337497,0.906127,0.382683,-0.18024,0.814789,0.471397,-0.337497,0.864975,0.471397,-0.172054,0.864975,0.471397,-0.172054,0.814789,0.471397,-0.337497,0.768178,0.55557,-0.31819,0.864975,0.471397,-0.172054,0.768178,0.55557,-0.31819,0.815493,0.55557,-0.162212,0.815493,0.55557,-0.162212,0.768178,0.55557,-0.31819,0.714168,0.634393,-0.295818,0.815493,0.55557,-0.162212,0.714168,0.634393,-0.295818,0.758157,0.634393,-0.150807,0.758157,0.634393,-0.150807,0.714168,0.634393,-0.295818,0.653281,0.707107,-0.270598,0.758157,0.634393,-0.150807,0.653281,0.707107,-0.270598,0.69352,0.707107,-0.13795,0.69352,0.707107,-0.13795,0.653281,0.707107,-0.270598,0.586103,0.77301,-0.242772,0.69352,0.707107,-0.13795,0.586103,0.77301,-0.242772,0.622204,0.77301,-0.123764,0.622204,0.77301,-0.123764,0.586103,0.77301,-0.242772,0.51328,0.83147,-0.212608,0.622204,0.77301,-0.123764,0.51328,0.83147,-0.212608,0.544895,0.83147,-0.108386,0.544895,0.83147,-0.108386,0.51328,0.83147,-0.212608,0.435514,0.881921,-0.180396,0.544895,0.83147,-0.108386,0.435514,0.881921,-0.180396,0.462339,0.881921,-0.091965,0.462339,0.881921,-0.091965,0.435514,0.881921,-0.180396,0.353553,0.92388,-0.146447,0.462339,0.881921,-0.091965,0.353553,0.92388,-0.146447,0.37533,0.92388,-0.074658,0.37533,0.92388,-0.074658,0.353553,0.92388,-0.146447,0.268188,0.95694,-0.111087,0.37533,0.92388,-0.074658,0.268188,0.95694,-0.111087,0.284707,0.95694,-0.056632,0.284707,0.95694,-0.056632,0.268188,0.95694,-0.111087,0.18024,0.980785,-0.074658,0.284707,0.95694,-0.056632,0.18024,0.980785,-0.074658,0.191342,0.980785,-0.03806,0.191342,0.980785,-0.03806,0.18024,0.980785,-0.074658,0.090556,0.995185,-0.03751,0.191342,0.980785,-0.03806,0.090556,0.995185,-0.03751,0.096134,0.995185,-0.019122,0.096134,0.995185,-0.019122,0.098017,0.995185,0,0.19509,0.980785,0,0.096134,0.995185,-0.019122,0.19509,0.980785,0,0.191342,0.980785,-0.03806,0.290284,0.95694,0,0.284707,0.95694,-0.056632,0.191342,0.980785,-0.03806,0.290284,0.95694,0,0.191342,0.980785,-0.03806,0.19509,0.980785,0,0.382683,0.92388,0,0.37533,0.92388,-0.074658,0.284707,0.95694,-0.056632,0.382683,0.92388,0,0.284707,0.95694,-0.056632,0.290284,0.95694,0,0.471396,0.881921,0,0.462339,0.881921,-0.091965,0.37533,0.92388,-0.074658,0.471396,0.881921,0,0.37533,0.92388,-0.074658,0.382683,0.92388,0,0.55557,0.83147,0,0.544895,0.83147,-0.108386,0.462339,0.881921,-0.091965,0.55557,0.83147,0,0.462339,0.881921,-0.091965,0.471396,0.881921,0,0.634393,0.77301,0,0.622204,0.77301,-0.123764,0.544895,0.83147,-0.108386,0.634393,0.77301,0,0.544895,0.83147,-0.108386,0.55557,0.83147,0,0.707107,0.707107,0,0.69352,0.707107,-0.13795,0.622204,0.77301,-0.123764,0.707107,0.707107,0,0.622204,0.77301,-0.123764,0.634393,0.77301,0,0.77301,0.634393,0,0.758157,0.634393,-0.150807,0.69352,0.707107,-0.13795,0.77301,0.634393,0,0.69352,0.707107,-0.13795,0.707107,0.707107,0,0.831469,0.55557,0,0.815493,0.55557,-0.162212,0.758157,0.634393,-0.150807,0.831469,0.55557,0,0.758157,0.634393,-0.150807,0.77301,0.634393,0,0.88192,0.471397,0,0.864975,0.471397,-0.172054,0.815493,0.55557,-0.162212,0.88192,0.471397,0,0.815493,0.55557,-0.162212,0.831469,0.55557,0,0.923879,0.382683,0,0.906127,0.382683,-0.18024,0.864975,0.471397,-0.172054,0.923879,0.382683,0,0.864975,0.471397,-0.172054,0.88192,0.471397,0,0.95694,0.290285,0,0.938553,0.290285,-0.18669,0.906127,0.382683,-0.18024,0.95694,0.290285,0,0.906127,0.382683,-0.18024,0.923879,0.382683,0,0.980785,0.19509,0,0.96194,0.19509,-0.191342,0.938553,0.290285,-0.18669,0.980785,0.19509,0,0.938553,0.290285,-0.18669,0.95694,0.290285,0,0.995184,0.098017,0,0.976062,0.098017,-0.194151,0.96194,0.19509,-0.191342,0.995184,0.098017,0,0.96194,0.19509,-0.191342,0.980785,0.19509,0,0.999999,0,0,0.980785,0,-0.19509,0.976062,0.098017,-0.194151,0.999999,0,0,0.976062,0.098017,-0.194151,0.995184,0.098017,0,0.995184,-0.098017,0,0.976062,-0.098017,-0.194151,0.999999,0,0,0.976062,-0.098017,-0.194151,0.980785,0,-0.19509,0.999999,0,0,0.980785,-0.195091,0,0.96194,-0.195091,-0.191342,0.976062,-0.098017,-0.194151,0.980785,-0.195091,0,0.976062,-0.098017,-0.194151,0.995184,-0.098017,0,0.95694,-0.290285,0,0.938553,-0.290285,-0.18669,0.980785,-0.195091,0,0.938553,-0.290285,-0.18669,0.96194,-0.195091,-0.191342,0.980785,-0.195091,0,0.923879,-0.382684,0,0.906127,-0.382684,-0.18024,0.938553,-0.290285,-0.18669,0.923879,-0.382684,0,0.938553,-0.290285,-0.18669,0.95694,-0.290285,0,0.88192,-0.471397,0,0.864975,-0.471397,-0.172054,0.923879,-0.382684,0,0.864975,-0.471397,-0.172054,0.906127,-0.382684,-0.18024,0.923879,-0.382684,0,0.831469,-0.555571,0,0.815493,-0.555571,-0.162212,0.88192,-0.471397,0,0.815493,-0.555571,-0.162212,0.864975,-0.471397,-0.172054,0.88192,-0.471397,0,0.77301,-0.634394,0,0.758157,-0.634394,-0.150807,0.831469,-0.555571,0,0.758157,-0.634394,-0.150807,0.815493,-0.555571,-0.162212,0.831469,-0.555571,0,0.707106,-0.707107,0,0.69352,-0.707107,-0.13795,0.77301,-0.634394,0,0.69352,-0.707107,-0.13795,0.758157,-0.634394,-0.150807,0.77301,-0.634394,0,0.634392,-0.773011,0,0.622203,-0.773011,-0.123764,0.707106,-0.707107,0,0.622203,-0.773011,-0.123764,0.69352,-0.707107,-0.13795,0.707106,-0.707107,0,0.555569,-0.83147,0,0.544895,-0.83147,-0.108386,0.634392,-0.773011,0,0.544895,-0.83147,-0.108386,0.622203,-0.773011,-0.123764,0.634392,-0.773011,0,0.471396,-0.881922,0,0.462338,-0.881922,-0.091965,0.555569,-0.83147,0,0.462338,-0.881922,-0.091965,0.544895,-0.83147,-0.108386,0.555569,-0.83147,0,0.382682,-0.92388,0,0.37533,-0.92388,-0.074658,0.471396,-0.881922,0,0.37533,-0.92388,-0.074658,0.462338,-0.881922,-0.091965,0.471396,-0.881922,0,0.290284,-0.956941,0,0.284706,-0.956941,-0.056632,0.382682,-0.92388,0,0.284706,-0.956941,-0.056632,0.37533,-0.92388,-0.074658,0.382682,-0.92388,0,0.195089,-0.980785,0,0.191341,-0.980785,-0.03806,0.290284,-0.956941,0,0.191341,-0.980785,-0.03806,0.284706,-0.956941,-0.056632,0.290284,-0.956941,0,0.098016,-0.995185,0,0.096133,-0.995185,-0.019122,0.195089,-0.980785,0,0.096133,-0.995185,-0.019122,0.191341,-0.980785,-0.03806,0.195089,-0.980785,0];c3dl.POINT_VERTICES=[-0.27639,-0.85064,-0.44721,0,0,-1,0.7236,-0.52572,-0.44721,0.7236,-0.52572,-0.44721,0,0,-1,0.7236,0.52572,-0.44721,-0.89442,0,-0.44721,0,0,-1,-0.27639,-0.85064,-0.44721,-0.27639,0.85064,-0.44721,0,0,-1,-0.89442,0,-0.44721,0.7236,0.52572,-0.44721,0,0,-1,-0.27639,0.85064,-0.44721,0.7236,-0.52572,-0.44721,0.7236,0.52572,-0.44721,0.89442,0,0.44721,-0.27639,-0.85064,-0.44721,0.7236,-0.52572,-0.44721,0.27639,-0.85064,0.44721,-0.89442,0,-0.44721,-0.27639,-0.85064,-0.44721,-0.7236,-0.52572,0.44721,-0.27639,0.85064,-0.44721,-0.89442,0,-0.44721,-0.7236,0.52572,0.44721,0.7236,0.52572,-0.44721,-0.27639,0.85064,-0.44721,0.27639,0.85064,0.44721,0.89442,0,0.44721,0.27639,-0.85064,0.44721,0.7236,-0.52572,-0.44721,0.27639,-0.85064,0.44721,-0.7236,-0.52572,0.44721,-0.27639,-0.85064,-0.44721,-0.7236,-0.52572,0.44721,-0.7236,0.52572,0.44721,-0.89442,0,-0.44721,-0.7236,0.52572,0.44721,0.27639,0.85064,0.44721,-0.27639,0.85064,-0.44721,0.27639,0.85064,0.44721,0.89442,0,0.44721,0.7236,0.52572,-0.44721,0.27639,-0.85064,0.44721,0.89442,0,0.44721,0,0,1,-0.7236,-0.52572,0.44721,0.27639,-0.85064,0.44721,0,0,1,-0.7236,0.52572,0.44721,-0.7236,-0.52572,0.44721,0,0,1,0.27639,0.85064,0.44721,-0.7236,0.52572,0.44721,0,0,1,0.89442,0,0.44721,0.27639,0.85064,0.44721,0,0,1];function Frustum(frustumMatrix){this.frustumPlane=[];this.frustumPlane[0]=new Plane();this.frustumPlane[0].normal[0]=frustumMatrix[3]-frustumMatrix[0];this.frustumPlane[0].normal[1]=frustumMatrix[7]-frustumMatrix[4];this.frustumPlane[0].normal[2]=frustumMatrix[11]-frustumMatrix[8];this.frustumPlane[0].offset=frustumMatrix[15]-frustumMatrix[12];this.frustumPlane[1]=new Plane();this.frustumPlane[1].normal[0]=frustumMatrix[3]+frustumMatrix[0];this.frustumPlane[1].normal[1]=frustumMatrix[7]+frustumMatrix[4];this.frustumPlane[1].normal[2]=frustumMatrix[11]+frustumMatrix[8];this.frustumPlane[1].offset=frustumMatrix[15]+frustumMatrix[12];this.frustumPlane[2]=new Plane();this.frustumPlane[2].normal[0]=frustumMatrix[3]+frustumMatrix[1];this.frustumPlane[2].normal[1]=frustumMatrix[7]+frustumMatrix[5];this.frustumPlane[2].normal[2]=frustumMatrix[11]+frustumMatrix[9];this.frustumPlane[2].offset=frustumMatrix[15]+frustumMatrix[13];this.frustumPlane[3]=new Plane();this.frustumPlane[3].normal[0]=frustumMatrix[3]-frustumMatrix[1];this.frustumPlane[3].normal[1]=frustumMatrix[7]-frustumMatrix[5];this.frustumPlane[3].normal[2]=frustumMatrix[11]-frustumMatrix[9];this.frustumPlane[3].offset=frustumMatrix[15]-frustumMatrix[13];this.frustumPlane[4]=new Plane();this.frustumPlane[4].normal[0]=frustumMatrix[3]-frustumMatrix[2];this.frustumPlane[4].normal[1]=frustumMatrix[7]-frustumMatrix[6];this.frustumPlane[4].normal[2]=frustumMatrix[11]-frustumMatrix[10];this.frustumPlane[4].offset=frustumMatrix[15]-frustumMatrix[14];this.frustumPlane[5]=new Plane();this.frustumPlane[5].normal[0]=frustumMatrix[3]+frustumMatrix[2];this.frustumPlane[5].normal[1]=frustumMatrix[7]+frustumMatrix[6];this.frustumPlane[5].normal[2]=frustumMatrix[11]+frustumMatrix[10];this.frustumPlane[5].offset=frustumMatrix[15]+frustumMatrix[14];for(var j=0;j<6;j++){this.frustumPlane[j].normalize();}
this.sphereInFrustum=function(boundingSphere){for(var i=0;i<6;i++){var pos=boundingSphere.getPosition();var d=this.frustumPlane[i].normal[0]*pos[0]+this.frustumPlane[i].normal[1]*pos[1]+
this.frustumPlane[i].normal[2]*pos[2]+this.frustumPlane[i].offset;if(d<=-boundingSphere.getRadius()){return"OUTSIDE";}}
return"INSIDE";}
this.boundingBoxInfrustumPlane=function(pos,size)
{for(var i=0;i<6;i++)
{if(this.frustumPlane[i].normal[0]*(pos[0]-size)+this.frustumPlane[i].normal[1]*(pos[1]-size)+this.frustumPlane[i].normal[2]*(pos[2]-size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]+size)+this.frustumPlane[i].normal[1]*(pos[1]-size)+this.frustumPlane[i].normal[2]*(pos[2]-size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]-size)+this.frustumPlane[i].normal[1]*(pos[1]+size)+this.frustumPlane[i].normal[2]*(pos[2]-size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]+size)+this.frustumPlane[i].normal[1]*(pos[1]+size)+this.frustumPlane[i].normal[2]*(pos[2]-size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]-size)+this.frustumPlane[i].normal[1]*(pos[1]-size)+this.frustumPlane[i].normal[2]*(pos[2]+size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]+size)+this.frustumPlane[i].normal[1]*(pos[1]-size)+this.frustumPlane[i].normal[2]*(pos[2]+size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]-size)+this.frustumPlane[i].normal[1]*(pos[1]+size)+this.frustumPlane[i].normal[2]*(pos[2]+size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";if(this.frustumPlane[i].normal[0]*(pos[0]+size)+this.frustumPlane[i].normal[1]*(pos[1]+size)+this.frustumPlane[i].normal[2]*(pos[2]+size)+this.frustumPlane[i].offset<0)
return"OUTSIDE";}
return"INSIDE";}}function Plane(){this.normal=new C3DL_FLOAT_ARRAY(3);this.offset=null;this.init=function(normal,offset){this.normal[0]=normal[0];this.normal[1]=normal[1];this.normal[2]=normal[2];this.offset=offset;}
this.normalize=function(){var norm=Math.sqrt(this.normal[0]*this.normal[0]+this.normal[1]*this.normal[1]+
this.normal[2]*this.normal[2]);this.normal[0]/=norm;this.normal[1]/=norm;this.normal[2]/=norm;this.offset/=norm;}}
c3dl.Picking=function(scene)
{var scn=scene;var cam=scn.getCamera();this.onMouseDown=function(event)
{cam=scn.getCamera();var canvasTag=scn.getCanvas();var clickedCanvasCoords=getClickedCoords(event);var normalizedDeviceCoords=[(2*clickedCanvasCoords[0]/canvasTag.width)-1,-((2*clickedCanvasCoords[1]/canvasTag.height)-1),1,1];var iproj=c3dl.inverseMatrix(scene.getProjectionMatrix());var clipCoords=c3dl.multiplyMatrixByVector(iproj,normalizedDeviceCoords);clipCoords[0]/=clipCoords[3];clipCoords[1]/=clipCoords[3];clipCoords[2]/=clipCoords[3];clipCoords[2]=-clipCoords[2];var rayInitialPoint=cam.getPosition();var x=clipCoords[0];var y=clipCoords[1];var z=clipCoords[2];var kludge=c3dl.multiplyVector(cam.getLeft(),-1);var viewMatrix=c3dl.makePoseMatrix(kludge,cam.getUp(),cam.getDir(),cam.getPosition());var rayTerminalPoint=c3dl.multiplyMatrixByVector(viewMatrix,new C3DL_FLOAT_ARRAY([x,y,z,0]));var rayDir=c3dl.normalizeVector(rayTerminalPoint);var passedBoundsTest=new Array();for(var i=0,len=scn.getObjListSize();i<len;i++)
{var currObj=scn.getObj(i);if(currObj instanceof c3dl.Collada&&currObj.getPickable())
{if(currObj.rayIntersectsEnclosures(rayInitialPoint,rayDir))
{passedBoundsTest.push(currObj);}}}
var objectsPicked=new Array();if(scn.getPickingPrecision()==c3dl.PICK_PRECISION_BOUNDING_VOLUME)
{objectsPicked=passedBoundsTest;}
else
{for(var i=0,len=passedBoundsTest.length;i<len;i++)
{var currObject=passedBoundsTest[i];if(currObject instanceof c3dl.Collada&&currObject.getPickable())
{if(currObject.rayIntersectsTriangles(rayInitialPoint,rayDir))
{objectsPicked.push(passedBoundsTest[i]);}}}}
var projMatrix=cam.getProjectionMatrix();var viewMatrix=cam.getViewMatrix();var viewProjMatrix=c3dl.multiplyMatrixByMatrix(projMatrix,viewMatrix);if(scn.getPointRenderingMode()==c3dl.POINT_MODE_POINT)
{for(var i=0,len=scn.getObjListSize();i<len;i++)
{if(scn.getObj(i)instanceof c3dl.Point)
{var attenuation=scene.getPointAttenuation();var point=scn.getObj(i);var pointCoords=point.getPosition();var d=c3dl.vectorLength(c3dl.subtractVectors(pointCoords,cam.getPosition()));var pointPixelSize=1.0/(attenuation[0]+(attenuation[1]*d)+(attenuation[2]*d*d));var worldSpaceCoords=[pointCoords[0],pointCoords[1],pointCoords[2],1];var clipCoords=c3dl.multiplyMatrixByVector(viewProjMatrix,worldSpaceCoords);var normalizedDeviceCoords=[clipCoords[0]/clipCoords[3],clipCoords[1]/clipCoords[3],clipCoords[2]/clipCoords[3]];var viewportCoords=[(normalizedDeviceCoords[0]+1)/2*canvasTag.width,(1-normalizedDeviceCoords[1])/2*canvasTag.height];if(isPointInSquare(clickedCanvasCoords,viewportCoords,pointPixelSize))
{objectsPicked.push(point);}}}}
else if(scn.getPointRenderingMode()==c3dl.POINT_MODE_SPHERE)
{for(var i=0,len=scn.getObjListSize();i<len;i++)
{if(scn.getObj(i)instanceof c3dl.Point)
{if(c3dl.rayIntersectsSphere(rayInitialPoint,rayDir,scn.getObj(i).getPosition(),scn.getPointSize()))
{objectsPicked.push(scn.getObj(i));}}}}
c3dl.sortObjectsFromCam(scn,cam,objectsPicked);var pickingCB=scn.getPickingCallback();var pickingResult=createPickingResult(canvasTag,event.which,objectsPicked);pickingCB(pickingResult);}
function createPickingResult(cvs,btnUsed,objList)
{var pickingObj=new c3dl.PickingResult();pickingObj["canvas"]=cvs;pickingObj["getCanvas"]=function()
{return this.canvas;};pickingObj["buttonUsed"]=btnUsed;pickingObj["getButtonUsed"]=function()
{return this.buttonUsed;};pickingObj['objects']=objList;pickingObj['getObjects']=function()
{return this.objects;};return pickingObj;}
function isPointInSquare(pointCoords,squareCoords,squareSize)
{if(pointCoords[0]>=squareCoords[0]-squareSize/2&&pointCoords[0]<=squareCoords[0]+squareSize/2&&pointCoords[1]>=squareCoords[1]-squareSize/2&&pointCoords[1]<=squareCoords[1]+squareSize/2)
{return true;}
return false;}
function isPointInCircle(pointCoords,circleCoords,circleDiameter)
{var vec=[pointCoords[0]-circleCoords[0],pointCoords[1]-circleCoords[1]];var d=Math.sqrt((vec[0]*vec[0])+(vec[1]*vec[1]));return(d<circleDiameter/2?true:false);}
function getClickedCoords(event)
{var canvas=scn.getCanvas();var canvasPosition=c3dl.getObjectPosition(scn.getCanvas());var X=event.clientX-canvasPosition[0]+window.pageXOffset-1;var Y=event.clientY-canvasPosition[1]+window.pageYOffset-1;return[X,Y];}}
c3dl.sortObjectsFromCam=function(scene,camera,pickedObjects)
{var cameraPos=camera.getPosition();var objAPos,objBPos;var distA,distB;var camToObjADist,camToObjBDist;var temp;for(var i=0,len=pickedObjects.length;i<len;i++)
{for(var j=0,len2=pickedObjects.length;j<len2;j++)
{objAPos=pickedObjects[i].getPosition();objBPos=pickedObjects[j].getPosition();camToObjADist=c3dl.subtractVectors(cameraPos,objAPos);camToObjBDist=c3dl.subtractVectors(cameraPos,objBPos);distA=c3dl.vectorLength(camToObjADist);distB=c3dl.vectorLength(camToObjBDist);if(distA<distB)
{temp=pickedObjects[i];pickedObjects[i]=pickedObjects[j];pickedObjects[j]=temp;}}}
return pickedObjects;}
c3dl.rayIntersectsSphere=function(rayInitialPoint,rayD,spherePos,sphereRadius)
{var hasIntersected=false;var rayDir=c3dl.normalizeVector(rayD);var v=c3dl.subtractVectors(rayInitialPoint,spherePos);var a=c3dl.vectorDotProduct(rayDir,rayDir)
var b=2.0*c3dl.vectorDotProduct(v,rayDir);var c=c3dl.vectorDotProduct(v,v)-(sphereRadius*sphereRadius);var discriminant=(b*b)-(4.0*a*c);var q;if(discriminant>=0)
{var discriminantsqrt=Math.sqrt(discriminant);if(b<0){q=(-b-discriminantsqrt)/2;}
else{q=(-b+discriminantsqrt)/2;}
var t0=q/a;var t1=c/q;if(t0>t1)
{var temp=t0;t0=t1;t1=temp;}
if(t1<0){return false;}
if(t1>0||t0>0){hasIntersected=true;}}
return hasIntersected;}
c3dl.rayIntersectsTriangle=function(orig,dir,vert0,vert1,vert2)
{var edge1=c3dl.subtractVectors(vert1,vert0);var edge2=c3dl.subtractVectors(vert2,vert0);var area=0.5*c3dl.vectorLength(c3dl.vectorCrossProduct(edge1,edge2));var norm=c3dl.vectorCrossProduct(edge1,edge2);var normDotDir=c3dl.vectorDotProduct(norm,dir);if(normDotDir==0)
{return false;}
var d=c3dl.vectorDotProduct(norm,vert1);var normDotRayorig=c3dl.vectorDotProduct(norm,orig);var t=(d-normDotRayorig)/normDotDir;var scaledDir=c3dl.multiplyVector(dir,t);var POI=c3dl.addVectors(orig,scaledDir);edge1=c3dl.subtractVectors(vert0,POI);edge2=c3dl.subtractVectors(vert1,POI);edge3=c3dl.subtractVectors(vert2,POI);var area1=0.5*c3dl.vectorLength(c3dl.vectorCrossProduct(edge1,edge2));var area2=0.5*c3dl.vectorLength(c3dl.vectorCrossProduct(edge2,edge3));var area3=0.5*c3dl.vectorLength(c3dl.vectorCrossProduct(edge3,edge1));var diff=area-(area1+area2+area3);return(Math.abs(diff)<=0.0001);}
c3dl.PickingResult=function()
{this.getButtonUsed=function()
{}
this.getCanvas=function()
{}
this.getObjects=function()
{}}
c3dl.DirectionalLight=function()
{this.direction=c3dl.makeVector(0,0,1);this.type=c3dl.DIRECTIONAL_LIGHT;this.getDirection=function()
{return c3dl.copyVector(this.direction);}
this.setDirection=function(dir)
{this.direction=c3dl.normalizeVector(dir);}}
c3dl.DirectionalLight.prototype=new c3dl.Light;c3dl.Light=function()
{this.type=c3dl.ABSTRACT_LIGHT;this.name="unnamed";this.ambient=c3dl.makeVector(0,0,0);this.diffuse=c3dl.makeVector(0,0,0);this.specular=c3dl.makeVector(0,0,0);this.on=false;this.getName=function()
{return this.name;}
this.getAmbient=function()
{return c3dl.copyVector(this.ambient);}
this.getDiffuse=function()
{return c3dl.copyVector(this.diffuse);}
this.getSpecular=function()
{return c3dl.copyVector(this.specular);}
this.getType=function()
{return this.type;}
this.isOn=function()
{return this.on;}
this.setOn=function(isOn)
{this.on=isOn;}
this.setName=function(name)
{this.name=name;}
this.setAmbient=function(color)
{this.ambient[0]=color[0];this.ambient[1]=color[1];this.ambient[2]=color[2];}
this.setDiffuse=function(color)
{this.diffuse[0]=color[0];this.diffuse[1]=color[1];this.diffuse[2]=color[2];}
this.setSpecular=function(color)
{this.specular[0]=color[0];this.specular[1]=color[1];this.specular[2]=color[2];}}
c3dl.PositionalLight=function()
{this.position=c3dl.makeVector(0,0,0);this.attenuation=c3dl.makeVector(1,0,0);this.type=c3dl.POSITIONAL_LIGHT;this.getAttenuation=function()
{return c3dl.copyVector(this.attenuation);}
this.getPosition=function()
{return c3dl.copyVector(this.position);}
this.setAttenuation=function(attenuation)
{this.attenuation[0]=attenuation[0];this.attenuation[1]=attenuation[1];this.attenuation[2]=attenuation[2];}
this.setPosition=function(vec)
{this.position[0]=vec[0];this.position[1]=vec[1];this.position[2]=vec[2];}}
c3dl.PositionalLight.prototype=new c3dl.Light;c3dl.SpotLight=function()
{this.cutoff=180;this.type=c3dl.SPOT_LIGHT;this.direction=c3dl.makeVector(0,0,-1);this.exponent=0;this.getCutoff=function()
{return this.cutoff;}
this.getDirection=function()
{return c3dl.copyVector(this.direction);}
this.getExponent=function()
{return this.exponent;}
this.setCutoff=function(cutoff)
{if((cutoff>=0&&cutoff<=90)||cutoff==180)
{this.cutoff=cutoff;}}
this.setDirection=function(dir)
{this.direction=c3dl.normalizeVector(dir);}
this.setExponent=function(exponent)
{if(exponent>=0&&exponent<=128)
{this.exponent=exponent;}}}
c3dl.SpotLight.prototype=new c3dl.PositionalLight;c3dl.roundUpToNextPowerOfTwo=function(number)
{var i=1;while(i<number)
{i*=2;}
return i;}
c3dl.invSqrt=function(num)
{if(!isNaN(num))
{return 1/Math.sqrt(num);}
c3dl.debug.logWarning('invSqrt() caled with a parameter that\'s not a number');return 0;}
c3dl.lookAt=function(eye,center,up)
{var z=c3dl.subtractVectors(eye,center,null);var x=c3dl.vectorCrossProduct(up,z,null);var y=c3dl.vectorCrossProduct(z,x,null);c3dl.normalizeVector(z);c3dl.normalizeVector(y);c3dl.normalizeVector(x);return c3dl.makeMatrix(x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,0,0,0,1);}
c3dl.makeOrtho=function(left,right,bottom,top,znear,zfar)
{return M4x4.makeOrtho(left,right,bottom,top,znear,zfar);}
c3dl.makePerspective=function(fovy,aspect,znear,zfar)
{return M4x4.makePerspective(fovy,aspect,znear,zfar);}
c3dl.makeFrustum=function(left,right,bottom,top,znear,zfar)
{return M4x4.makeFrustum(left,right,bottom,top,znear,zfar);}
c3dl.radiansToDegrees=function(rad)
{return rad/(Math.PI*2)*360.0;}
c3dl.degreesToRadians=function(deg)
{return deg/360.0*(Math.PI*2);}
c3dl.getRandom=function(min,max)
{var norm=Math.random();return((max-min)*norm)+min;}
c3dl.findMax=function(arrayIn)
{var max=arrayIn[0];for(i=0;i<arrayIn.length;i++){if(arrayIn[i]>max){max=arrayIn[i];}}
return max;};c3dl.findMin=function(arrayIn)
{var min=arrayIn[0];for(i=0;i<arrayIn.length;i++){if(arrayIn[i]<min){min=arrayIn[i];}}
return min;};c3dl.isValidMatrix=function(mat)
{if(mat instanceof Array||mat instanceof MJS_FLOAT_ARRAY_TYPE)
{if(mat.length==16)
{for(var i=0;i<16;i++)
{if(isNaN(mat[i]))return false;}
return true;}}
return false;}
c3dl.makeIdentityMatrix=function()
{return new MJS_FLOAT_ARRAY_TYPE([1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]);}
c3dl.makeZeroMatrix=function()
{return new C3DL_FLOAT_ARRAY([0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]);}
c3dl.setMatrix=function(mat,e00,e01,e02,e03,e10,e11,e12,e13,e20,e21,e22,e23,e30,e31,e32,e33)
{mat[0]=e00;mat[1]=e01;mat[2]=e02;mat[3]=e03;mat[4]=e10;mat[5]=e11;mat[6]=e12;mat[7]=e13;mat[8]=e20;mat[9]=e21;mat[10]=e22;mat[11]=e23;mat[12]=e30;mat[13]=e31;mat[14]=e32;mat[15]=e33;}
c3dl.makeMatrix=function(e00,e01,e02,e03,e10,e11,e12,e13,e20,e21,e22,e23,e30,e31,e32,e33)
{return[!isNaN(e00)?parseFloat(e00):0.0,!isNaN(e01)?parseFloat(e01):0.0,!isNaN(e02)?parseFloat(e02):0.0,!isNaN(e03)?parseFloat(e03):0.0,!isNaN(e10)?parseFloat(e10):0.0,!isNaN(e11)?parseFloat(e11):0.0,!isNaN(e12)?parseFloat(e12):0.0,!isNaN(e13)?parseFloat(e13):0.0,!isNaN(e20)?parseFloat(e20):0.0,!isNaN(e21)?parseFloat(e21):0.0,!isNaN(e22)?parseFloat(e22):0.0,!isNaN(e23)?parseFloat(e23):0.0,!isNaN(e30)?parseFloat(e30):0.0,!isNaN(e31)?parseFloat(e31):0.0,!isNaN(e32)?parseFloat(e32):0.0,!isNaN(e33)?parseFloat(e33):0.0];}
c3dl.matricesEqual=function(matrix1,matrix2)
{var areEqual=true;for(var i=0;areEqual&&i<16;i++)
{if(Math.abs(matrix1[i]-matrix2[i])>c3dl.TOLERANCE)
{areEqual=false;}}
return areEqual;}
c3dl.makePoseMatrix=function(vecLeft,vecUp,vecFrwd,vecPos)
{var mat=new C3DL_FLOAT_ARRAY(16);mat[0]=vecLeft[0];mat[1]=vecLeft[1];mat[2]=vecLeft[2];mat[3]=0.0;mat[4]=vecUp[0];mat[5]=vecUp[1];mat[6]=vecUp[2];mat[7]=0.0;mat[8]=vecFrwd[0];mat[9]=vecFrwd[1];mat[10]=vecFrwd[2];mat[11]=0.0;mat[12]=vecPos[0];mat[13]=vecPos[1];mat[14]=vecPos[2];mat[15]=1.0;return mat;}
c3dl.transposeMatrix=function(mat)
{return M4x4.transpose(mat);}
c3dl.inverseMatrix=function(mat)
{if(!mat){return}
var kInv=new C3DL_FLOAT_ARRAY(16);var fA0=mat[0]*mat[5]-mat[1]*mat[4];var fA1=mat[0]*mat[6]-mat[2]*mat[4];var fA2=mat[0]*mat[7]-mat[3]*mat[4];var fA3=mat[1]*mat[6]-mat[2]*mat[5];var fA4=mat[1]*mat[7]-mat[3]*mat[5];var fA5=mat[2]*mat[7]-mat[3]*mat[6];var fB0=mat[8]*mat[13]-mat[9]*mat[12];var fB1=mat[8]*mat[14]-mat[10]*mat[12];var fB2=mat[8]*mat[15]-mat[11]*mat[12];var fB3=mat[9]*mat[14]-mat[10]*mat[13];var fB4=mat[9]*mat[15]-mat[11]*mat[13];var fB5=mat[10]*mat[15]-mat[11]*mat[14];var fDet=fA0*fB5-fA1*fB4+fA2*fB3+fA3*fB2-fA4*fB1+fA5*fB0;if(Math.abs(fDet)<=1e-9)
{c3dl.debug.logWarning('inverseMatrix() failed due to bad values');return null;}
kInv[0]=+mat[5]*fB5-mat[6]*fB4+mat[7]*fB3;kInv[4]=-mat[4]*fB5+mat[6]*fB2-mat[7]*fB1;kInv[8]=+mat[4]*fB4-mat[5]*fB2+mat[7]*fB0;kInv[12]=-mat[4]*fB3+mat[5]*fB1-mat[6]*fB0;kInv[1]=-mat[1]*fB5+mat[2]*fB4-mat[3]*fB3;kInv[5]=+mat[0]*fB5-mat[2]*fB2+mat[3]*fB1;kInv[9]=-mat[0]*fB4+mat[1]*fB2-mat[3]*fB0;kInv[13]=+mat[0]*fB3-mat[1]*fB1+mat[2]*fB0;kInv[2]=+mat[13]*fA5-mat[14]*fA4+mat[15]*fA3;kInv[6]=-mat[12]*fA5+mat[14]*fA2-mat[15]*fA1;kInv[10]=+mat[12]*fA4-mat[13]*fA2+mat[15]*fA0;kInv[14]=-mat[12]*fA3+mat[13]*fA1-mat[14]*fA0;kInv[3]=-mat[9]*fA5+mat[10]*fA4-mat[11]*fA3;kInv[7]=+mat[8]*fA5-mat[10]*fA2+mat[11]*fA1;kInv[11]=-mat[8]*fA4+mat[9]*fA2-mat[11]*fA0;kInv[15]=+mat[8]*fA3-mat[9]*fA1+mat[10]*fA0;var fInvDet=1.0/fDet;kInv[0]*=fInvDet;kInv[1]*=fInvDet;kInv[2]*=fInvDet;kInv[3]*=fInvDet;kInv[4]*=fInvDet;kInv[5]*=fInvDet;kInv[6]*=fInvDet;kInv[7]*=fInvDet;kInv[8]*=fInvDet;kInv[9]*=fInvDet;kInv[10]*=fInvDet;kInv[11]*=fInvDet;kInv[12]*=fInvDet;kInv[13]*=fInvDet;kInv[14]*=fInvDet;kInv[15]*=fInvDet;return kInv;}
c3dl.matrixDeterminant=function(mat)
{var fA0=mat[0]*mat[5]-mat[1]*mat[4];var fA1=mat[0]*mat[6]-mat[2]*mat[4];var fA2=mat[0]*mat[7]-mat[3]*mat[4];var fA3=mat[1]*mat[6]-mat[2]*mat[5];var fA4=mat[1]*mat[7]-mat[3]*mat[5];var fA5=mat[2]*mat[7]-mat[3]*mat[6];var fB0=mat[8]*mat[13]-mat[9]*mat[12];var fB1=mat[8]*mat[14]-mat[10]*mat[12];var fB2=mat[8]*mat[15]-mat[11]*mat[12];var fB3=mat[9]*mat[14]-mat[10]*mat[13];var fB4=mat[9]*mat[15]-mat[11]*mat[13];var fB5=mat[10]*mat[15]-mat[11]*mat[14];var fDet=fA0*fB5-fA1*fB4+fA2*fB3+fA3*fB2-fA4*fB1+fA5*fB0;return fDet;}
c3dl.matrixAdjoint=function(mat)
{var fA0=mat[0]*mat[5]-mat[1]*mat[4];var fA1=mat[0]*mat[6]-mat[2]*mat[4];var fA2=mat[0]*mat[7]-mat[3]*mat[4];var fA3=mat[1]*mat[6]-mat[2]*mat[5];var fA4=mat[1]*mat[7]-mat[3]*mat[5];var fA5=mat[2]*mat[7]-mat[3]*mat[6];var fB0=mat[8]*mat[13]-mat[9]*mat[12];var fB1=mat[8]*mat[14]-mat[10]*mat[12];var fB2=mat[8]*mat[15]-mat[11]*mat[12];var fB3=mat[9]*mat[14]-mat[10]*mat[13];var fB4=mat[9]*mat[15]-mat[11]*mat[13];var fB5=mat[10]*mat[15]-mat[11]*mat[14];var k=new C3DL_FLOAT_ARRAY([mat[5]*fB5-mat[6]*fB4+mat[7]*fB3,-mat[1]*fB5+mat[2]*fB4-mat[3]*fB3,mat[13]*fA5-mat[14]*fA4+mat[15]*fA3,-mat[9]*fA5+mat[10]*fA4-mat[11]*fA3,-mat[4]*fB5+mat[6]*fB2-mat[7]*fB1,mat[0]*fB5-mat[2]*fB2+mat[3]*fB1,-mat[12]*fA5+mat[14]*fA2-mat[15]*fA1,mat[8]*fA5-mat[10]*fA2+mat[11]*fA1,mat[4]*fB4-mat[5]*fB2+mat[7]*fB0,-mat[0]*fB4+mat[1]*fB2-mat[3]*fB0,mat[12]*fA4-mat[13]*fA2+mat[15]*fA0,-mat[8]*fA4+mat[9]*fA2-mat[11]*fA0,-mat[4]*fB3+mat[5]*fB1-mat[6]*fB0,mat[0]*fB3-mat[1]*fB1+mat[2]*fB0,-mat[12]*fA3+mat[13]*fA1-mat[14]*fA0,mat[8]*fA3-mat[9]*fA1+mat[10]*fA0]);return k;}
c3dl.multiplyMatrixByScalar=function(mat,scalar)
{return M4x4.mul(mat,scalar);}
c3dl.divideMatrixByScalar=function(mat,scalar)
{var matrix=new C3DL_FLOAT_ARRAY(16);for(var i=0;i<16;i++)
{matrix[i]=mat[i]/scalar;}
return matrix;}
c3dl.multiplyMatrixByMatrix=function(matOne,matTwo,newMat)
{return newMat=M4x4.mul(matOne,matTwo);}
c3dl.multiplyMatrixByDirection=function(mat,vec,dest)
{if(!dest)
{dest=c3dl.makeVector();dest[0]=mat[0]*vec[0]+mat[4]*vec[1]+mat[8]*vec[2];dest[1]=mat[1]*vec[0]+mat[5]*vec[1]+mat[9]*vec[2];dest[2]=mat[2]*vec[0]+mat[6]*vec[1]+mat[10]*vec[2];return dest;}
else
{var a=mat[0]*vec[0]+mat[4]*vec[1]+mat[8]*vec[2];var b=mat[1]*vec[0]+mat[5]*vec[1]+mat[9]*vec[2];var c=mat[2]*vec[0]+mat[6]*vec[1]+mat[10]*vec[2];dest[0]=a;dest[1]=b;dest[2]=c;return dest;}}
c3dl.multiplyMatrixByVector=function(mat,vec,dest)
{vec=new C3DL_FLOAT_ARRAY(vec);var w=(vec.length==3?1:vec[3]);if(!dest)
{dest=new C3DL_FLOAT_ARRAY((vec.length==3?[0,0,0]:[0,0,0,0]));dest[0]=mat[0]*vec[0]+mat[4]*vec[1]+mat[8]*vec[2]+mat[12]*w;dest[1]=mat[1]*vec[0]+mat[5]*vec[1]+mat[9]*vec[2]+mat[13]*w;dest[2]=mat[2]*vec[0]+mat[6]*vec[1]+mat[10]*vec[2]+mat[14]*w;if(dest.length==4)
{dest[3]=mat[3]*vec[0]+mat[7]*vec[1]+mat[11]*vec[2]+mat[15]*w;}
return dest;}
else
{var a=mat[0]*vec[0]+mat[4]*vec[1]+mat[8]*vec[2]+mat[12]*w;var b=mat[1]*vec[0]+mat[5]*vec[1]+mat[9]*vec[2]+mat[13]*w;var c=mat[2]*vec[0]+mat[6]*vec[1]+mat[10]*vec[2]+mat[14]*w;var d=mat[3]*vec[0]+mat[7]*vec[1]+mat[11]*vec[2]+mat[15]*w;dest[0]=a;dest[1]=b;dest[2]=c;if(dest.length==4)
{dest[3]=d}
return dest;}}
c3dl.addMatrices=function(matOne,matTwo)
{var m=new C3DL_FLOAT_ARRAY(16);for(var i=0;i<16;i++)
{m[i]=matOne[i]+matTwo[i];}
return m;}
c3dl.subtractMatrices=function(matOne,matTwo)
{var m=new C3DL_FLOAT_ARRAY(16);for(var i=0;i<16;i++)
{m[i]=matOne[i]-matTwo[i];}
return m;}
c3dl.copyMatrix=function(srcMat)
{return M4x4.clone(srcMat);}
const MJS_VERSION=0x000000;const MJS_DO_ASSERT=true;try{WebGLFloatArray;}catch(x){WebGLFloatArray=Float32Array;}
const MJS_FLOAT_ARRAY_TYPE=WebGLFloatArray;if(MJS_DO_ASSERT){function MathUtils_assert(cond,msg){if(!cond)throw"Assertion failed: "+msg;}}else{function MathUtils_assert(){}}
var V3={};V3._temp1=new MJS_FLOAT_ARRAY_TYPE(3);V3._temp2=new MJS_FLOAT_ARRAY_TYPE(3);V3._temp3=new MJS_FLOAT_ARRAY_TYPE(3);if(MJS_FLOAT_ARRAY_TYPE==Array){V3.x=[1.0,0.0,0.0];V3.y=[0.0,1.0,0.0];V3.z=[0.0,0.0,1.0];V3.$=function V3_$(x,y,z){return[x,y,z];};V3.clone=function V3_clone(a){return[a[0],a[1],a[2]];};}else{V3.x=new MJS_FLOAT_ARRAY_TYPE([1.0,0.0,0.0]);V3.y=new MJS_FLOAT_ARRAY_TYPE([0.0,1.0,0.0]);V3.z=new MJS_FLOAT_ARRAY_TYPE([0.0,0.0,1.0]);V3.$=function V3_$(x,y,z){return new MJS_FLOAT_ARRAY_TYPE([x,y,z]);};V3.clone=function V3_clone(a){return new MJS_FLOAT_ARRAY_TYPE(a);};}
V3.u=V3.x;V3.v=V3.y;V3.add=function V3_add(a,b,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);r[0]=a[0]+b[0];r[1]=a[1]+b[1];r[2]=a[2]+b[2];return r;};V3.sub=function V3_sub(a,b,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);r[0]=a[0]-b[0];r[1]=a[1]-b[1];r[2]=a[2]-b[2];return r;};V3.neg=function V3_neg(a,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);r[0]=-a[0];r[1]=-a[1];r[2]=-a[2];return r;};V3.direction=function V3_direction(a,b,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);return V3.normalize(V3.sub(a,b,r),r);};V3.length=function V3_length(a){var temp=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);return temp;};V3.lengthSquared=function V3_lengthSquared(a){return a[0]*a[0]+a[1]*a[1]+a[2]*a[2];};V3.normalize=function V3_normalize(a,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);var im=1.0/V3.length(a);r[0]=a[0]*im;r[1]=a[1]*im;r[2]=a[2]*im;return r;};V3.scale=function V3_scale(a,k,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);r[0]=a[0]*k;r[1]=a[1]*k;r[2]=a[2]*k;return r;}
V3.dot=function V3_dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];};V3.cross=function V3_cross(a,b,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(3);r[0]=a[1]*b[2]-a[2]*b[1];r[1]=a[2]*b[0]-a[0]*b[2];r[2]=a[0]*b[1]-a[1]*b[0];return r;};var M4x4={};M4x4._temp1=new MJS_FLOAT_ARRAY_TYPE(16);M4x4._temp2=new MJS_FLOAT_ARRAY_TYPE(16);if(MJS_FLOAT_ARRAY_TYPE==Array){M4x4.I=[1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];M4x4.$=function M4x4_$(m00,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,m13,m14,m15){return[m00,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,m13,m14,m15];};M4x4.clone=function M4x4_clone(m){return new[m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11]];};}else{M4x4.I=new MJS_FLOAT_ARRAY_TYPE([1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]);M4x4.$=function M4x4_$(m00,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,m13,m14,m15){return new MJS_FLOAT_ARRAY_TYPE([m00,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,m13,m14,m15]);};M4x4.clone=function M4x4_clone(m){return new MJS_FLOAT_ARRAY_TYPE(m);};}
M4x4.identity=M4x4.I;M4x4.topLeft3x3=function M4x4_topLeft3x3(m,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(9);r[0]=m[0];r[1]=m[1];r[2]=m[2];r[3]=m[4];r[4]=m[5];r[5]=m[6];r[6]=m[8];r[7]=m[9];r[8]=m[10];return r;};M4x4.inverseOrthonormal=function M4x4_inverseOrthonormal(m,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);M4x4.transpose(m,r);var t=[m[12],m[13],m[14]];r[3]=r[7]=r[11]=0;r[12]=-V3.dot([r[0],r[4],r[8]],t);r[13]=-V3.dot([r[1],r[5],r[9]],t);r[14]=-V3.dot([r[2],r[6],r[10]],t);return r;}
M4x4.inverseTo3x3=function M4x4_inverseTo3x3(m,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(9);var a11=m[10]*m[5]-m[6]*m[9],a21=-m[10]*m[1]+m[2]*m[9],a31=m[6]*m[1]-m[2]*m[5],a12=-m[10]*m[4]+m[6]*m[8],a22=m[10]*m[0]-m[2]*m[8],a32=-m[6]*m[0]+m[2]*m[4],a13=m[9]*m[4]-m[5]*m[8],a23=-m[9]*m[0]+m[1]*m[8],a33=m[5]*m[0]-m[1]*m[4];var det=m[0]*(a11)+m[1]*(a12)+m[2]*(a13);if(det==0)throw"matrix not invertible";var idet=1.0/det;r[0]=idet*a11;r[1]=idet*a21;r[2]=idet*a31;r[3]=idet*a12;r[4]=idet*a22;r[5]=idet*a32;r[6]=idet*a13;r[7]=idet*a23;r[8]=idet*a33;return r;};M4x4.makeFrustum=function M4x4_makeFrustum(left,right,bottom,top,znear,zfar,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);var X=2*znear/(right-left);var Y=2*znear/(top-bottom);var A=(right+left)/(right-left);var B=(top+bottom)/(top-bottom);var C=-(zfar+znear)/(zfar-znear);var D=-2*zfar*znear/(zfar-znear);r[0]=2*znear/(right-left);r[1]=0;r[2]=0;r[3]=0;r[4]=0;r[5]=2*znear/(top-bottom);r[6]=0;r[7]=0;r[8]=(right+left)/(right-left);r[9]=(top+bottom)/(top-bottom);r[10]=-(zfar+znear)/(zfar-znear);r[11]=-1;r[12]=0;r[13]=0;r[14]=-2*zfar*znear/(zfar-znear);r[15]=0;return r;};M4x4.makePerspective=function M4x4_makePerspective(fovy,aspect,znear,zfar,r){var ymax=znear*Math.tan(fovy*Math.PI/360.0);var ymin=-ymax;var xmin=ymin*aspect;var xmax=ymax*aspect;return M4x4.makeFrustum(xmin,xmax,ymin,ymax,znear,zfar,r);};M4x4.makeOrtho=function M4x4_makeOrtho(left,right,bottom,top,znear,zfar,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);var tX=-(right+left)/(right-left);var tY=-(top+bottom)/(top-bottom);var tZ=-(zfar+znear)/(zfar-znear);var X=2/(right-left);var Y=2/(top-bottom);var Z=-2/(zfar-znear);r[0]=2/(right-left);r[1]=0;r[2]=0;r[3]=0;r[4]=0;r[5]=2/(top-bottom);r[6]=0;r[7]=0;r[8]=0;r[9]=0;r[10]=-2/(zfar-znear);r[11]=0;r[12]=-(right+left)/(right-left);r[13]=-(top+bottom)/(top-bottom);r[14]=-(zfar+znear)/(zfar-znear);r[15]=0;return r;};M4x4.makeOrtho2D=function M4x4_makeOrtho2D(left,right,bottom,top,r){return M4x4.makeOrtho(left,right,bottom,top,-1,1,r);};M4x4.mul=function M4x4_mul(a,b,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);r[0]=b[0]*a[0]+b[0+1]*a[4]+b[0+2]*a[8]+b[0+3]*a[12];r[0+1]=b[0]*a[1]+b[0+1]*a[5]+b[0+2]*a[9]+b[0+3]*a[13];r[0+2]=b[0]*a[2]+b[0+1]*a[6]+b[0+2]*a[10]+b[0+3]*a[14];r[0+3]=b[0]*a[3]+b[0+1]*a[7]+b[0+2]*a[11]+b[0+3]*a[15];r[4]=b[4]*a[0]+b[4+1]*a[4]+b[4+2]*a[8]+b[4+3]*a[12];r[4+1]=b[4]*a[1]+b[4+1]*a[5]+b[4+2]*a[9]+b[4+3]*a[13];r[4+2]=b[4]*a[2]+b[4+1]*a[6]+b[4+2]*a[10]+b[4+3]*a[14];r[4+3]=b[4]*a[3]+b[4+1]*a[7]+b[4+2]*a[11]+b[4+3]*a[15];r[8]=b[8]*a[0]+b[8+1]*a[4]+b[8+2]*a[8]+b[8+3]*a[12];r[8+1]=b[8]*a[1]+b[8+1]*a[5]+b[8+2]*a[9]+b[8+3]*a[13];r[8+2]=b[8]*a[2]+b[8+1]*a[6]+b[8+2]*a[10]+b[8+3]*a[14];r[8+3]=b[8]*a[3]+b[8+1]*a[7]+b[8+2]*a[11]+b[8+3]*a[15];r[12]=b[12]*a[0]+b[12+1]*a[4]+b[12+2]*a[8]+b[12+3]*a[12];r[12+1]=b[12]*a[1]+b[12+1]*a[5]+b[12+2]*a[9]+b[12+3]*a[13];r[12+2]=b[12]*a[2]+b[12+1]*a[6]+b[12+2]*a[10]+b[12+3]*a[14];r[12+3]=b[12]*a[3]+b[12+1]*a[7]+b[12+2]*a[11]+b[12+3]*a[15];return r;};M4x4.makeRotate=function M4x4_makeRotate(angle,axis,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);axis=V3.normalize(axis,V3._temp1);var x=axis[0],y=axis[1],z=axis[2];var c=Math.cos(angle);var c1=1-c;var s=Math.sin(angle);r[0]=x*x*c1+c;r[1]=y*x*c1+z*s;r[2]=z*x*c1-y*s;r[3]=0;r[4]=x*y*c1-z*s;r[5]=y*y*c1+c;r[6]=y*z*c1+x*s;r[7]=0;r[8]=x*z*c1+y*s;r[9]=y*z*c1-x*s;r[10]=z*z*c1+c;r[11]=0;r[12]=0;r[13]=0;r[14]=0;r[15]=1;return r;};M4x4.rotate=function M4x4_rotate(angle,axis,m,r){M4x4.makeRotate(angle,axis,M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.makeScale3=function M4x4_makeScale3(x,y,z,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);r[0]=x;r[1]=0;r[2]=0;r[3]=0;r[4]=0;r[5]=y;r[6]=0;r[7]=0;r[8]=0;r[9]=0;r[10]=z;r[11]=0;r[12]=0;r[13]=0;r[14]=0;r[15]=1;return r;};M4x4.makeScale1=function M4x4_makeScale1(k,r){return M4x4.makeScale3(k,k,k,r);};M4x4.makeScale=function M4x4_makeScale(v,r){return M4x4.makeScale3(v[0],v[1],v[2],r);};M4x4.scale3=function M4x4_scale3(x,y,z,m,r){M4x4.makeScale3(x,y,z,M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.scale1=function M4x4_scale1(k,m,r){M4x4.makeScale3(k,k,k,M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.scale=function M4x4_scale(v,m,r){M4x4.makeScale3(v[0],v[1],v[2],M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.makeTranslate3=function M4x4_makeTranslate3(x,y,z,r){if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);r[0]=1;r[1]=0;r[2]=0;r[3]=0;r[4]=0;r[5]=1;r[6]=0;r[7]=0;r[8]=0;r[9]=0;r[10]=1;r[11]=0;r[12]=x;r[13]=y;r[14]=z;r[15]=1;return r;};M4x4.makeTranslate1=function M4x4_makeTranslate1(k,r){return M4x4.makeTranslate3(k,k,k,r);};M4x4.makeTranslate=function M4x4_makeTranslate(v,r){return M4x4.makeTranslate3(v[0],v[1],v[2],r);};M4x4.translate3=function M4x4_translate3(x,y,z,m,r){M4x4.makeTranslate3(x,y,z,M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.translate1=function M4x4_translate1(k,m,r){M4x4.makeTranslate3(k,k,k,M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.translate=function M4x4_translate(v,m,r){M4x4.makeTranslate3(v[0],v[1],v[2],M4x4._temp1);return M4x4.mul(m,M4x4._temp1,r);};M4x4.makeLookAt=function M4x4_makeLookAt(eye,center,up,r){var z=V3.direction(eye,center,V3._temp1);var x=V3.normalize(V3.cross(up,z,V3._temp2),V3._temp2);var y=V3.normalize(V3.cross(z,x,V3._temp3),V3._temp3);var tm1=M4x4._temp1;var tm2=M4x4._temp2;tm1[0]=x[0];tm1[1]=y[0];tm1[2]=z[0];tm1[3]=0;tm1[4]=x[1];tm1[5]=y[1];tm1[6]=z[1];tm1[7]=0;tm1[8]=x[2];tm1[9]=y[2];tm1[10]=z[2];tm1[11]=0;tm1[12]=0;tm1[13]=0;tm1[14]=0;tm1[15]=1;tm2[0]=1;tm2[1]=0;tm2[2]=0;tm2[3]=0;tm2[4]=0;tm2[5]=1;tm2[6]=0;tm2[7]=0;tm2[8]=0;tm2[9]=0;tm2[10]=1;tm2[3]=0;tm2[0]=-eye[0];tm2[1]=-eye[1];tm2[2]=-eye[2];tm2[3]=0;if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);return M4x4.mul(tm1,tm2,r);};M4x4.transpose=function M4x4_transpose(m,r){if(m==r){var tmp=0.0;tmp=m[1];m[1]=m[4];m[4]=tmp;tmp=m[2];m[2]=m[8];m[8]=tmp;tmp=m[3];m[3]=m[12];m[12]=tmp;tmp=m[6];m[6]=m[9];m[9]=tmp;tmp=m[7];m[7]=m[13];m[13]=tmp;tmp=m[11];m[11]=m[14];m[14]=tmp;return m;}
if(r==undefined)r=new MJS_FLOAT_ARRAY_TYPE(16);r[0]=m[0];r[1]=m[4];r[2]=m[8];r[3]=m[12];r[4]=m[1];r[5]=m[5];r[6]=m[9];r[7]=m[13];r[8]=m[2];r[9]=m[6];r[10]=m[10];r[11]=m[14];r[12]=m[3];r[13]=m[7];r[14]=m[11];r[15]=m[15];return r;};c3dl.isValidQuat=function(quat)
{if(quat instanceof Array||quat instanceof C3DL_FLOAT_ARRAY)
{if(quat.length==4)
{for(var i=0;i<4;i++)
{if(isNaN(quat[i]))return false;}
return true;}}
return false;}
c3dl.makeQuat=function(newW,newX,newY,newZ)
{var quat=new C3DL_FLOAT_ARRAY(4);quat[0]=!isNaN(newW)?parseFloat(newW):0.0;quat[1]=!isNaN(newX)?parseFloat(newX):0.0;quat[2]=!isNaN(newY)?parseFloat(newY):0.0;quat[3]=!isNaN(newZ)?parseFloat(newZ):0.0;return quat;}
c3dl.quatToMatrix=function(quat,dest)
{var quatToMatrixTx=2.0*quat[1];var quatToMatrixTy=2.0*quat[2];var quatToMatrixTz=2.0*quat[3];var quatToMatrixTwx=quatToMatrixTx*quat[0];var quatToMatrixTwy=quatToMatrixTy*quat[0];var quatToMatrixTwz=quatToMatrixTz*quat[0];var quatToMatrixTxx=quatToMatrixTx*quat[1];var quatToMatrixTxy=quatToMatrixTy*quat[1];var quatToMatrixTxz=quatToMatrixTz*quat[1];var quatToMatrixTyy=quatToMatrixTy*quat[2];var quatToMatrixTyz=quatToMatrixTz*quat[2];var quatToMatrixTzz=quatToMatrixTz*quat[3];if(dest)
{dest[0]=1.0-(quatToMatrixTyy+quatToMatrixTzz);dest[1]=quatToMatrixTxy-quatToMatrixTwz;dest[2]=quatToMatrixTxz+quatToMatrixTwy;dest[3]=0.0;dest[4]=quatToMatrixTxy+quatToMatrixTwz;dest[5]=1.0-(quatToMatrixTxx+quatToMatrixTzz);dest[6]=quatToMatrixTyz-quatToMatrixTwx;dest[7]=0.0;dest[8]=quatToMatrixTxz-quatToMatrixTwy;dest[9]=quatToMatrixTyz+quatToMatrixTwx;dest[10]=1.0-(quatToMatrixTxx+quatToMatrixTyy);dest[11]=0.0;dest[12]=0.0;dest[13]=0.0;dest[14]=0.0;dest[15]=1.0;return dest;}
else
{var newMat=new C3DL_FLOAT_ARRAY(16);newMat[0]=1.0-(quatToMatrixTyy+quatToMatrixTzz);newMat[1]=quatToMatrixTxy+quatToMatrixTwz;newMat[2]=quatToMatrixTxz-quatToMatrixTwy;newMat[3]=0.0;newMat[4]=quatToMatrixTxy-quatToMatrixTwz;newMat[5]=1.0-(quatToMatrixTxx+quatToMatrixTzz);newMat[6]=quatToMatrixTyz+quatToMatrixTwx;newMat[7]=0.0;newMat[8]=quatToMatrixTxz+quatToMatrixTwy;newMat[9]=quatToMatrixTyz-quatToMatrixTwx;newMat[10]=1.0-(quatToMatrixTxx+quatToMatrixTyy);newMat[11]=0.0;newMat[12]=0.0;newMat[13]=0.0;newMat[14]=0.0;newMat[15]=1.0;return newMat;}}
c3dl.quatToAxisAngle=function(axisVec,angleScalar)
{axisVec=makeVector();var sqLength=c3dl.quatLengthSq();if(sqLength>c3dl.TOLERANCE)
{var invLength=c3dl.invSqrt(sqLength);angleScalar=2.0*Math.acos(quat[0]);axisVec[0]=quat[1]*invLength;axisVec[1]=quat[2]*invLength;axisVec[3]=quat[3]*invLength;}
else
{angleScalar=0.0;axisVec=c3dl.makeVector(1.0,0.0,0.0);}}
c3dl.axisAngleToQuathalfAngle;c3dl.axisAngleToQuats;c3dl.axisAngleToQuat=function(axisVec,angleScalar,dest)
{c3dl.axisAngleToQuathalfAngle=0.5*angleScalar;c3dl.axisAngleToQuats=Math.sin(c3dl.axisAngleToQuathalfAngle);if(dest)
{dest[0]=Math.cos(c3dl.axisAngleToQuathalfAngle);dest[1]=c3dl.axisAngleToQuats*axisVec[0];dest[2]=c3dl.axisAngleToQuats*axisVec[1];dest[3]=c3dl.axisAngleToQuats*axisVec[2];return dest;}
else
{var quat=c3dl.makeQuat(Math.cos(c3dl.axisAngleToQuathalfAngle),c3dl.axisAngleToQuats*axisVec[0],c3dl.axisAngleToQuats*axisVec[1],c3dl.axisAngleToQuats*axisVec[2]);return quat;}}
c3dl.matrixToQuat=function(newMat)
{var quat=c3dl.makeQuat();var trace=newMat[0]+newMat[5]+newMat[10]+1;var sqTrace;var s;if(trace>0.0)
{sqTrace=Math.sqrt(trace);s=0.5/sqTrace;quat[0]=0.25/s;quat[1]=(newMat[6]-newMat[9])*s;quat[2]=(newMat[8]-newMat[2])*s;quat[3]=(newMat[1]-newMat[4])*s;}
else
{if(newMat[0]>newMat[5]&&newMat[0]>newMat[10])
{s=2.0*Math.sqrt(1.0+newMat[0]-newMat[5]-newMat[10]);quat[1]=0.25*s;quat[2]=(newMat[1]-newMat[4])/s;quat[3]=(newMat[2]-newMat[8])/s;quat[0]=(newMat[9]-newMat[6])/s;}
else if(newMat[5]>newMat[10])
{s=2.0*Math.sqrt(1.0+newMat[5]-newMat[0]-newMat[10]);quat[1]=(newMat[1]-newMat[4])/s;quat[2]=0.25*s;quat[3]=(newMat[9]-newMat[6])/s;quat[0]=(newMat[2]-newMat[8])/s;}
else
{s=2.0*Math.sqrt(1.0+newMat[10]-newMat[0]-newMat[5]);quat[1]=(newMat[2]-newMat[8])/s;quat[2]=(newMat[9]-newMat[6])/s;quat[3]=0.25*s;quat[0]=(newMat[1]-newMat[4])/s;}}
return quat;}
c3dl.quatLengthSq=function(quat)
{return quat[1]*quat[1]+quat[2]*quat[2]+quat[3]*quat[3];}
c3dl.quatLength=function(quat)
{return Math.sqrt(c3dl.quatLengthSq(quat));}
c3dl.addQuats=function(quatOne,quatTwo)
{var quat=c3dl.makeQuat();for(var i=0;i<4;i++){quat[i]=quatOne[i]+quatTwo[i];}
return quat;}
c3dl.subtractQuats=function(quatOne,quatTwo)
{var quat=c3dl.makeQuat();for(var i=0;i<4;i++){quat[i]=quatOne[i]-quatTwo[i];}
return quat;}
c3dl.multiplyQuatByScalar=function(quatOne,scalar)
{var quat=c3dl.makeQuat();for(var i=0;i<4;i++){quat[i]=quatOne[i]*scalar;}
return quat;}
c3dl.getQuatConjugate=function(quat)
{var nQt=c3dl.makeQuat();nQt[0]=quat[0];nQt[1]=-quat[1];nQt[2]=-quat[2];nQt[3]=-quat[3];return nQt;}
c3dl.quatDotProduct=function(quatOne,quatTwo)
{return quatOne[0]*quatTwo[0]+quatOne[1]*quatTwo[1]+quatOne[2]*quatTwo[2]+quatOne[3]*quatTwo[3];}
c3dl.normalizeQuat=function(quat)
{var newQuat=c3dl.makeQuat();var len=c3dl.quatLength(quat);var invLen=1.0/len;if(len>0.001)
{newQuat[0]=quat[0]*invLen;newQuat[1]=quat[1]*invLen;newQuat[2]=quat[2]*invLen;newQuat[3]=quat[3]*invLen;}
else
{newQuat[0]=0.0;newQuat[1]=0.0;newQuat[2]=0.0;newQuat[3]=0.0;}
return newQuat;}
c3dl.inverseQuat=function(quat)
{var invQuat=c3dl.makeQuat();var norm=0.0;for(var i=0;i<4;i++){norm+=quat[i]*quat[i];}
if(norm>0.0)
{var invNorm=1.0/norm;invQuat[0]=quat[0]*invNorm;invQuat[1]=-quat[1]*invNorm;invQuat[2]=-quat[2]*invNorm;invQuat[3]=-quat[3]*invNorm;}
return invQuat;}
c3dl.isValidVector=function(vecArr)
{if(vecArr instanceof Array||vecArr instanceof C3DL_FLOAT_ARRAY)
{if(vecArr.length==3||vecArr.length==4)
{for(var i=0,len=vecArr.length;i<len;i++)
{if(isNaN(vecArr[i]))return false;}
return true;}}
return false;}
c3dl.copyVector=function(srcVec)
{return V3.clone(srcVec);}
c3dl.copyVectorContents=function(srcVec,destVec)
{destVec=V3.clone(srcVec);}
c3dl.addVectorComponent=function(srcVec,newComponent)
{var newVec=new C3DL_FLOAT_ARRAY(4);newVec[0]=srcVec[0]
newVec[1]=srcVec[1]
newVec[2]=srcVec[2]
newVec[3]=newComponent
return newVec;}
c3dl.makeVector=function(newX,newY,newZ)
{return new C3DL_FLOAT_ARRAY([!isNaN(newX)?parseFloat(newX):0.0,!isNaN(newY)?parseFloat(newY):0.0,!isNaN(newZ)?parseFloat(newZ):0.0]);}
c3dl.normalizeVector=function(vec)
{if(vec.length===4){var compr=vec[0]*vec[0]+vec[1]*vec[1]+vec[2]*vec[2];var ln=Math.sqrt(compr);vec[0]=vec[0]!=0.0?vec[0]/ln:0.0;vec[1]=vec[1]!=0.0?vec[1]/ln:0.0;vec[2]=vec[2]!=0.0?vec[2]/ln:0.0;vec[3]=vec[3]!=0.0?vec[2]/ln:0.0;return new C3DL_FLOAT_ARRAY(vec);}
else{var compr=vec[0]*vec[0]+vec[1]*vec[1]+vec[2]*vec[2];var ln=Math.sqrt(compr);vec[0]=vec[0]!=0.0?vec[0]/ln:0.0;vec[1]=vec[1]!=0.0?vec[1]/ln:0.0;vec[2]=vec[2]!=0.0?vec[2]/ln:0.0;return new C3DL_FLOAT_ARRAY(vec);}}
c3dl.vectorDotProduct=function(vecOne,vecTwo)
{return V3.dot(vecOne,vecTwo);}
c3dl.vectorProject=function(vecOne,vecTwo)
{var topDot=V3.dot(vecOne,vecTwo);var bottomDot=V3.dot(vecTwo,vecTwo);return c3dl.multiplyVector(vecTwo,topDot/bottomDot);}
c3dl.vectorCrossProduct=function(vecOne,vecTwo,dest)
{return V3.cross(vecOne,vecTwo,dest);}
c3dl.vectorLength=function(vec)
{return V3.length(vec);}
c3dl.vectorLengthSq=function(vec)
{return V3.lengthSquared(vec);}
c3dl.addVectors=function(vecOne,vecTwo,dest)
{return V3.add(vecOne,vecTwo,dest);}
c3dl.subtractVectors=function(vecOne,vecTwo,dest)
{return V3.sub(vecOne,vecTwo,dest);}
c3dl.multiplyVector=function(vec,scalar,dest)
{return V3.scale(vec,scalar,dest);}
c3dl.divideVector=function(vec,scalar,dest)
{if(typeof(dest)=="undefined"||dest==null)dest=c3dl.makeVector();dest[0]=vec[0]/scalar;dest[1]=vec[1]/scalar;dest[2]=vec[2]/scalar;return dest;}
c3dl.multiplyVectorByVector=function(vecOne,vecTwo,dest)
{if(typeof(dest)=="undefined"||dest==null)dest=c3dl.makeVector();dest[0]=vecOne[0]*vecTwo[0];dest[1]=vecOne[1]*vecTwo[1];dest[2]=vecOne[2]*vecTwo[2];return dest;}
c3dl.isVectorEqual=function(vecOne,vecTwo)
{return(vecOne[0]===vecTwo[0]&&vecOne[1]===vecTwo[1]&&vecOne[2]===vecTwo[2]);}
c3dl.isVectorZero=function(vec)
{return((-c3dl.TOLERANCE<vec[0]&&vec[0]<c3dl.TOLERANCE)&&(-c3dl.TOLERANCE<vec[1]&&vec[1]<c3dl.TOLERANCE)&&(-c3dl.TOLERANCE<vec[2]&&vec[2]<c3dl.TOLERANCE));}
c3dl.getAngleBetweenVectors=function(vecOne,vecTwo)
{var dot=c3dl.vectorDotProduct(vecOne,vecTwo);return c3dl.radiansToDegrees(Math.acos(dot));}
c3dl.Particle=function()
{this.age=0;this.lifetime=0;this.alive=false;this.color=new C3DL_FLOAT_ARRAY([0,0,0,0]);this.size=0;this.position=c3dl.makeVector(0,0,0);this.velocity=c3dl.makeVector(0,0,0);this.rotation=0;this.vertices=new C3DL_FLOAT_ARRAY([1,-1,0,-1,-1,0,-1,1,0,1,1,0]);this.transform=new C3DL_FLOAT_ARRAY([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);this.getAge=function()
{return this.age;}
this.getPosition=function()
{return c3dl.copyVector(this.position);}
this.getVelocity=function()
{return c3dl.copyVector(this.velocity);}
this.getLifetime=function()
{return this.lifetime;}
this.getColor=function()
{return new C3DL_FLOAT_ARRAY(this.color);}
this.getSize=function()
{return this.size;}
this.setSize=function(s)
{this.size=s;}
this.isAlive=function()
{return this.alive;}
this.getTransform=function()
{return new C3DL_FLOAT_ARRAY(this.transform);}
this.getVertices=function()
{return new C3DL_FLOAT_ARRAY(verts);}
this.setAge=function(age)
{if(age>=0)
{this.age=age;}}
this.setColor=function(c)
{this.color[0]=c[0];this.color[1]=c[1];this.color[2]=c[2];this.color[3]=c[3];}
this.setVelocity=function(velocity)
{this.velocity[0]=velocity[0];this.velocity[1]=velocity[1];this.velocity[2]=velocity[2];}
this.setPosition=function(position)
{this.transform[12]=position[0];this.transform[13]=position[1];this.transform[14]=position[2];}
this.setLifetime=function(lifetime)
{if(this.lifetime>=0)
{this.lifetime=lifetime;}}
this.setAlive=function(alive)
{this.alive=alive;}
this.translate=function(trans)
{this.transform[12]+=trans[0];this.transform[13]+=trans[1];this.transform[14]+=trans[2];}
this.update=function(timeStep)
{}
this.render=function(glCanvas3D)
{}}
c3dl.ParticleSystem=function()
{this.particleUVs=new C3DL_FLOAT_ARRAY([1,1,1,0,0,0,0,1]);this.billboardVerts=new C3DL_FLOAT_ARRAY([1,-1,0,1,1,0,-1,1,0,-1,-1,0]);this.mat=new C3DL_FLOAT_ARRAY([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);this.particles;this.numDeadParticles;this.texture;this.minVelocity=c3dl.makeVector(0,0,0);this.maxVelocity=c3dl.makeVector(0,0,0);this.maxAngVel=0;this.minAngVel=0;this.minLifetime=0;this.maxLifetime=0;this.minColor=new C3DL_FLOAT_ARRAY([0,0,0,0]);this.maxColor=new C3DL_FLOAT_ARRAY([0,0,0,0]);this.minSize=1;this.maxSize=1;this.acceleration=new C3DL_FLOAT_ARRAY([0,0,0,0]);this.dstBlend=c3dl.ZERO;this.srcBlend=c3dl.ZERO;this.blendEq=c3dl.FUNC_ADD;this.camUp=c3dl.makeVector(0,0,0);this.camLeft=c3dl.makeVector(0,0,0);this.camDir=c3dl.makeVector(0,0,0);this.isPlaying=false;this.emitRate=0;this.timeCounter=0;this.isTimeCounterSetup=false;this.particleVerts=null;this.particleColors=null;this.particleTexCoords=null;this.VBOVertices=null;this.VBOColors=null;this.VBOTexCoords=null;this.firstTimeRender=true;this.emit=function(numToEmit)
{if(numToEmit<=0||this.numDeadParticles==0)
{return;}
numToEmit=(numToEmit>this.numDeadParticles)?this.numDeadParticles:numToEmit;for(var i=0,len=this.particles.length;i<len&&numToEmit>0;i++)
{if(this.particles[i].isAlive()==false)
{this.emitParticle(i);numToEmit--;}}}
this.emitParticle=function(index)
{if(index>=0&&index<this.particles.length)
{this.particles[index].setVelocity([c3dl.getRandom(this.minVelocity[0],this.maxVelocity[0]),c3dl.getRandom(this.minVelocity[1],this.maxVelocity[1]),c3dl.getRandom(this.minVelocity[2],this.maxVelocity[2])]);this.particles[index].setAge(0);this.particles[index].setLifetime(c3dl.getRandom(this.minLifetime,this.maxLifetime));this.particles[index].setAlive(true);this.particles[index].setPosition([this.mat[12],this.mat[13],this.mat[14]]);this.particles[index].setColor([c3dl.getRandom(this.minColor[0],this.maxColor[0]),c3dl.getRandom(this.minColor[1],this.maxColor[1]),c3dl.getRandom(this.minColor[2],this.maxColor[2]),c3dl.getRandom(this.minColor[3],this.maxColor[3]),]);this.particles[index].setSize(c3dl.getRandom(this.minSize,this.maxSize));this.numDeadParticles--;}}
this.init=function(numParticles)
{this.particles=new Array(numParticles);for(var i=0;i<numParticles;i++)
{this.particles[i]=new c3dl.Particle();}
this.particleVerts=new C3DL_FLOAT_ARRAY(this.particles.length*3*4);this.particleColors=new C3DL_FLOAT_ARRAY(this.particles.length*4*4);this.particleTexCoords=new C3DL_FLOAT_ARRAY(this.particles.length*2*4);for(var i=0,len=this.particleColors.length;i<len;i++)
{this.particleColors[i]=0.0;}
for(var i=0,len=this.particleVerts.length;i<len;i++)
{this.particleVerts[i]=0.0;}
for(var i=0,len=this.particleTexCoords.length;i<len;i++)
{this.particleTexCoords[i]=0;}
this.isPlaying=true;this.numDeadParticles=this.particles.length;}
this.isReady=function()
{return(this.particles instanceof Array);}
this.getNumParticles=function()
{return this.particles.length;}
this.getParticle=function(i)
{if(i>=0&&i<this.particles.length)
{return this.particles[i];}}
this.getVertices=function()
{return this.billboardVerts;}
this.getTexCoords=function()
{return this.particleUVs;}
this.killParticle=function(index)
{if(index>0&&index<this.particles.length)
{this.particles[index].setAlive(false);this.numDeadParticles++;}}
this.setEmitRate=function(particlesPerSecond)
{if(particlesPerSecond==0)
{this.emitRate=0;this.isTimeCounterSetup=false;}
else if(particlesPerSecond>0)
{this.emitRate=particlesPerSecond;}}
this.translate=function(vec)
{this.mat[12]+=vec[0];this.mat[13]+=vec[1];this.mat[14]+=vec[2];}
this.setPosition=function(vec)
{this.mat[12]=vec[0];this.mat[13]=vec[1];this.mat[14]=vec[2];}
this.getAcceleration=function()
{return new C3DL_FLOAT_ARRAY(this.acceleration);}
this.getBlendEquation=function()
{return this.blendEq;}
this.getDstBlend=function()
{return this.dstBlend;}
this.getMaxColor=function()
{return new C3DL_FLOAT_ARRAY(this.maxColor);}
this.getMinColor=function()
{return new C3DL_FLOAT_ARRAY(this.minColor);}
this.getMaxLifetime=function()
{return this.maxLifetime;}
this.getMinLifetime=function()
{return this.minLifetime;}
this.getMinVelocity=function()
{return new C3DL_FLOAT_ARRAY(this.minVelocity);}
this.getMaxVelocity=function()
{return new C3DL_FLOAT_ARRAY(this.maxVelocity);}
this.getTexture=function()
{return this.texture;}
this.getSrcBlend=function()
{return this.srcBlend;}
this.setAcceleration=function(acceleration)
{this.acceleration[0]=acceleration[0];this.acceleration[1]=acceleration[1];this.acceleration[2]=acceleration[2];this.acceleration[3]=acceleration[3];}
this.setDstBlend=function(dstBlend)
{switch(dstBlend)
{case c3dl.ZERO:case c3dl.ONE:case c3dl.SRC_COLOR:case c3dl.ONE_MINUS_SRC_COLOR:case c3dl.SRC_ALPHA:case c3dl.ONE_MINUS_SRC_ALPHA:case c3dl.DST_ALPHA:case c3dl.ONE_MINUS_DST_ALPHA:case c3dl.DST_COLOR:case c3dl.ONE_MINUS_DST_COLOR:case c3dl.SRC_ALPHA_SATURATE:this.dstBlend=dstBlend;break;}}
this.setMaxColor=function(maxColor)
{if(c3dl.isValidColor(maxColor))
{this.maxColor[0]=maxColor[0];this.maxColor[1]=maxColor[1];this.maxColor[2]=maxColor[2];this.maxColor[3]=maxColor[3];}}
this.setMinColor=function(minColor)
{if(c3dl.isValidColor(minColor))
{this.minColor[0]=minColor[0];this.minColor[1]=minColor[1];this.minColor[2]=minColor[2];this.minColor[3]=minColor[3];}}
this.setMaxLifetime=function(maxLifetime)
{if(maxLifetime>0)
{this.maxLifetime=maxLifetime;}}
this.setMinLifetime=function(minLifetime)
{if(minLifetime>0)
{this.minLifetime=minLifetime;}}
this.setMaxSize=function(maxSize)
{if(maxSize>0)
{this.maxSize=maxSize;}}
this.setMinSize=function(minSize)
{if(minSize>0)
{this.minSize=minSize;}}
this.setMinVelocity=function(minVelocity)
{this.minVelocity[0]=minVelocity[0];this.minVelocity[1]=minVelocity[1];this.minVelocity[2]=minVelocity[2];}
this.setMaxVelocity=function(maxVelocity)
{this.maxVelocity[0]=maxVelocity[0];this.maxVelocity[1]=maxVelocity[1];this.maxVelocity[2]=maxVelocity[2];}
this.setMaxAngularVelocity=function(maxAngVel)
{this.maxAngVel=maxAngVel;}
this.setMinAngularVelocity=function(minAngVel)
{this.minAngVel=minAngVel;}
this.setBlendEquation=function(blendEq)
{switch(blendEq)
{case c3dl.FUNC_ADD:case c3dl.FUNC_SUBTRACT:case c3dl.FUNC_REVERSE_SUBTRACT:this.blendEq=blendEq;break;}}
this.setSrcBlend=function(srcBlend)
{switch(srcBlend)
{case c3dl.ZERO:case c3dl.ONE:case c3dl.SRC_COLOR:case c3dl.ONE_MINUS_SRC_COLOR:case c3dl.SRC_ALPHA:case c3dl.ONE_MINUS_SRC_ALPHA:case c3dl.DST_ALPHA:case c3dl.ONE_MINUS_DST_ALPHA:case c3dl.DST_COLOR:case c3dl.ONE_MINUS_DST_COLOR:case c3dl.SRC_ALPHA_SATURATE:this.srcBlend=srcBlend;break;}}
this.setTexture=function(textureName)
{this.texture=textureName;}
this.update=function(timeStep)
{if(this.emitRate>0)
{if(this.isTimeCounterSetup==false)
{this.timeCounter=timeStep;this.isTimeCounterSetup=true;}
else
{this.timeCounter+=timeStep;}
var numToEmit=this.timeCounter*this.emitRate/1000.0;if(numToEmit>=1)
{this.emit(numToEmit);this.timeCounter-=numToEmit/this.emitRate*1000.0;}}
var p=0,j=0;for(var i=0,len=this.particleColors.length;i<len;i++,j++)
{if(i!=0&&i%16==0)
{p++}
if(j>3)
{j=0;}
this.particleColors[i]=this.particles[p].getColor()[j];}
for(var i=0,len=this.particles.length;i<len;i++)
{if(this.particles[i].isAlive())
{var timeInSeconds=timeStep/1000;var pos=this.particles[i].getPosition();var vel=this.particles[i].getVelocity();this.particles[i].translate([(vel[0]*timeInSeconds)+this.acceleration[0]*timeInSeconds*timeInSeconds*0.5,(vel[1]*timeInSeconds)+this.acceleration[1]*timeInSeconds*timeInSeconds*0.5,(vel[2]*timeInSeconds)+this.acceleration[2]*timeInSeconds*timeInSeconds*0.5]);for(var p=0,j=0;p<12;p++,j++)
{if(j>2)
{j=0;}
this.particleVerts[i*12+p]=this.particles[i].getPosition()[j]+this.getVertices()[p];}
this.particles[i].setVelocity([vel[0]+(this.acceleration[0]*timeInSeconds),vel[1]+(this.acceleration[1]*timeInSeconds),vel[2]+(this.acceleration[2]*timeInSeconds)]);this.particles[i].setAge(this.particles[i].getAge()+timeInSeconds);if(this.particles[i].getAge()>this.particles[i].getLifetime())
{this.killParticle(i);}}}}
this.getVBOTexCoords=function()
{return this.VBOTexCoords;}
this.getVBOVertices=function()
{return this.VBOVertices;}
this.getVBOColors=function()
{return this.VBOColors;}
this.preRender=function(glCanvas3D,scene)
{if(this.firstTimeRender===true)
{for(var i=0,j=0,len=this.particleTexCoords.length;i<len;i++,j++)
{if(j>7)
{j=0;}
this.particleTexCoords[i]=this.particleUVs[j];}
this.VBOColors=glCanvas3D.createBuffer();glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.VBOColors);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.particleColors,glCanvas3D.STREAM_DRAW);this.VBOVertices=glCanvas3D.createBuffer();glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.VBOVertices);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.particleVerts,glCanvas3D.STREAM_DRAW);this.VBOTexCoords=glCanvas3D.createBuffer();glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.VBOTexCoords);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.particleTexCoords,glCanvas3D.STREAM_DRAW);this.firstTimeRender=0;}
else
{glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.VBOColors);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.particleColors,glCanvas3D.STREAM_DRAW);glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.VBOVertices);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.particleVerts,glCanvas3D.STREAM_DRAW);glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.VBOTexCoords);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,this.particleTexCoords,glCanvas3D.STREAM_DRAW);}
glCanvas3D.depthMask(false);glCanvas3D.enable(glCanvas3D.BLEND);glCanvas3D.blendEquation(this.blendEq);glCanvas3D.blendFunc(this.getSrcBlend(),this.getDstBlend());}
this.postRender=function(glCanvas3D,scene)
{glCanvas3D.disable(glCanvas3D.BLEND);glCanvas3D.depthMask(true);}
this.render=function(glCanvas3D,scene)
{this.recalculateBillboard(glCanvas3D,scene);this.preRender(glCanvas3D,scene);scene.getRenderer().renderParticleSystem(this);this.postRender(glCanvas3D,scene);}
this.getObjectType=function()
{return c3dl.PARTICLE_SYSTEM;}
this.recalculateBillboard=function(glCanvas3D,scene)
{if(!(c3dl.isVectorEqual(this.camUp,scene.getCamera().getUp())&&c3dl.isVectorEqual(this.camLeft,scene.getCamera().getLeft())&&c3dl.isVectorEqual(this.camDir,scene.getCamera().getDir())))
{this.camUp=scene.getCamera().getUp();this.camLeft=scene.getCamera().getLeft();this.camDir=scene.getCamera().getDir();var camRight=[-this.camLeft[0],-this.camLeft[1],-this.camLeft[2]];var bottomRight=c3dl.subtractVectors(camRight,this.camUp);var bottomLeft=c3dl.subtractVectors(this.camLeft,this.camUp);var topLeft=c3dl.addVectors(this.camLeft,this.camUp);var topRight=c3dl.addVectors(camRight,this.camUp);this.billboardVerts=[bottomRight[0],bottomRight[1],bottomRight[2],topRight[0],topRight[1],topRight[2],topLeft[0],topLeft[1],topLeft[2],bottomLeft[0],bottomLeft[1],bottomLeft[2]];}}}
c3dl.ProgramObject=function()
{this.programID=-1;this.rendererID=-1;this.getProgramID=function()
{return this.programID;}
this.getRendererID=function()
{return this.rendererID;}
this.toString=function(delimiter)
{if(!delimiter||typeof(delimiter)!="string")
{delimiter=",";}
return"Program ID = "+this.getProgramID()+delimiter+"Renderer ID = "+this.getRendererID();}}
c3dl.Renderer=function()
{this.version=0.0;this.versionString="Renderer interface.";this.fillMode=c3dl.FILL;this.lightingOn=true;this.contextWidth=0;this.contextHeight=0;this.getLighting=function()
{return this.lightingOn;}
this.getMaxLineWidth=function()
{}
this.getVersion=function()
{return this.version;}
this.getVersionString=function()
{return this.versionString;}
this.getFillMode=function()
{return this.fillMode;}
this.setClearColor=function(clearColor)
{}
this.setFillMode=function(mode)
{if(mode==c3dl.FILL||mode==c3dl.WIRE_FRAME)
{this.fillMode=mode;}
else
{c3dl.debug.logWarning('Invalid value "'+mode+'" passed to setFillMode()');}}
this.setLighting=function(isOn)
{this.lightingOn=isOn;}
this.getContextWidth=function()
{return this.contextWidth;}
this.getContextHeight=function()
{return this.contextHeight;}}
c3dl.WebGL=function()
{var glCanvas3D=null;this.texManager=null;this.version=2.0;this.versionString="WebGL";this.geometryShader;this.particleSystemShader;this.pointShader;this.pointSphereShader;this.lineShader;this.boundingSphereShader;this.programsWithLights=[];this.pointVertBuffer=null;this.pointColBuffer=null;this.lineVertBuffer=null;this.lineColBuffer=null;this.ID=c3dl.getNextRendererID();this.STANDARD_PROGRAM_ID=null;this.textureQueue=[];this.pointSphereRenderReady=false;this.pointsphereVBOVert;this.addTexture=function(path)
{if(this.texManager==null)
{this.textureQueue.push(path);}
else
{this.texManager.addTexture(path);}}
this.getID=function()
{return this.ID;}
this.getTextureID=function(texturePath)
{if(this.texManager)
{return this.texManager.getID(texturePath);}
else
{return-1;}}
this.isReady=function()
{return glCanvas3D==null?false:true;}
this.getGLContext=function()
{return glCanvas3D;}
this.createProgram=function(vertexShader,fragmentShader)
{var gl=glCanvas3D;var program=gl.createProgram();if(program==null)
{c3dl.debug.logError("failed to create shader program");return null;}
var vertShader=gl.createShader(gl.VERTEX_SHADER);gl.shaderSource(vertShader,vertexShader);gl.compileShader(vertShader);if(!gl.getShaderParameter(vertShader,gl.COMPILE_STATUS))
{c3dl.debug.logError("vert shader: "+gl.getShaderInfoLog(vertShader));gl.deleteShader(vertShader);return null;}
gl.attachShader(program,vertShader);var vertShader=gl.createShader(gl.FRAGMENT_SHADER);gl.shaderSource(vertShader,fragmentShader);gl.compileShader(vertShader);if(!gl.getShaderParameter(vertShader,gl.COMPILE_STATUS))
{c3dl.debug.logError("frag shader "+gl.getShaderInfoLog(vertShader));gl.deleteShader(vertShader);return null;}
gl.attachShader(program,vertShader);gl.linkProgram(program);if(gl.getProgramParameter(program,gl.LINK_STATUS)!=1)
{c3dl.debug.logError(gl.getProgramInfoLog(program));gl.deleteProgram(program);return null;}
var programObject=new c3dl.ProgramObject();programObject.rendererID=this.ID;programObject.programID=program;return programObject;}
this.clearBuffers=function()
{glCanvas3D.clear(glCanvas3D.COLOR_BUFFER_BIT|glCanvas3D.DEPTH_BUFFER_BIT);}
this.swapBuffers=function()
{glCanvas3D.clear(glCanvas3D.COLOR_BUFFER_BIT|glCanvas3D.DEPTH_BUFFER_BIT);}
this.setClearColor=function(bgColor)
{if(bgColor.length>=3)
{glCanvas3D.clearColor(bgColor[0],bgColor[1],bgColor[2],1.0);}}
this.getMaxLineWidth=function()
{var maxLineWidth=glCanvas3D.getParameter(glCanvas3D.ALIASED_LINE_WIDTH_RANGE);return maxLineWidth[1];}
this.clearLight=function(lightID)
{if(lightID>=0&&lightID<c3dl.MAX_LIGHTS)
{for(var i=0,len=this.programsWithLights.length;i<len;i++)
{var PID=this.programsWithLights[i];var base="lights["+lightID+"].";glCanvas3D.useProgram(PID);this.setUniformf(PID,base+"position",[0,0,0]);this.setUniformf(PID,base+"ambient",[0,0,0]);this.setUniformf(PID,base+"diffuse",[0,0,0]);this.setUniformf(PID,base+"specular",[0,0,0]);this.setUniformf(PID,base+"spotDirection",[0,0,-1]);this.setUniformf(PID,base+"spotCutoff",180);this.setUniformf(PID,base+"spotExponent",0);this.setUniformf(PID,base+"attenuation1",1);this.setUniformf(PID,base+"attenuation2",0);this.setUniformf(PID,base+"attenuation3",0);this.setUniformi(PID,base+"type",0);this.setUniformi(PID,base+"isOn",0);}}}
this.updateAmbientLight=function(ambientLight)
{var prevVal=c3dl.debug.getVisible();c3dl.debug.setVisible(false);for(var i=0,len=this.programsWithLights.length;i<len;i++)
{glCanvas3D.useProgram(this.programsWithLights[i]);this.setUniformf(this.programsWithLights[i],"ambientLightColor",ambientLight);this.setUniformi(this.programsWithLights[i],"lightingOn",this.getLighting());}
if(prevVal==true)
{c3dl.debug.setVisible(true);}}
this.updateLights=function(lightList)
{for(var progObjIter=0,len=this.programsWithLights.length;progObjIter<len;progObjIter++)
{var shader=this.programsWithLights[progObjIter];glCanvas3D.useProgram(shader);for(var i=0,len2=lightList.length;i<len2;i++)
{var base="lights["+i+"].";if(lightList[i]!=null)
{if(lightList[i].isOn()==false)
{this.setUniformi(shader,base+"isOn",lightList[i].isOn());}
else
{if(lightList[i]instanceof c3dl.DirectionalLight)
{var dir=c3dl.multiplyMatrixByDirection(c3dl.peekMatrix(),lightList[i].getDirection());dir=c3dl.addVectorComponent(dir,0);this.setUniformf(shader,base+"position",dir);this.setUniformf(shader,base+"spotCutoff",180);}
else if(lightList[i]instanceof c3dl.SpotLight)
{var pos=lightList[i].getPosition();pos=c3dl.multiplyMatrixByVector(c3dl.peekMatrix(),pos);pos=c3dl.addVectorComponent(pos,1);var dir=lightList[i].getDirection();dir=c3dl.multiplyMatrixByDirection(c3dl.peekMatrix(),dir);this.setUniformf(shader,base+"position",pos);this.setUniformf(shader,base+"spotDirection",dir);this.setUniformf(shader,base+"spotCutoff",lightList[i].getCutoff());this.setUniformf(shader,base+"spotExponent",lightList[i].getExponent());}
else if(lightList[i]instanceof c3dl.PositionalLight)
{var pos=lightList[i].getPosition();pos=c3dl.multiplyMatrixByVector(c3dl.peekMatrix(),pos);pos=c3dl.addVectorComponent(pos,1);this.setUniformf(shader,base+"position",pos);this.setUniformf(shader,base+"spotCutoff",180.0);}
this.setUniformi(shader,base+"type",lightList[i].getType());this.setUniformi(shader,base+"isOn",lightList[i].isOn());this.setUniformf(shader,base+"ambient",lightList[i].getAmbient());this.setUniformf(shader,base+"diffuse",lightList[i].getDiffuse());this.setUniformf(shader,base+"specular",lightList[i].getSpecular());if(!(lightList[i]instanceof c3dl.DirectionalLight))
{var attn=lightList[i].getAttenuation();this.setUniformf(shader,base+"attenuation1",attn[0]);this.setUniformf(shader,base+"attenuation2",attn[1]);this.setUniformf(shader,base+"attenuation3",attn[2]);}}}}}}
this.pointSphereRenderSetup=function()
{this.pointSphereVBOVert=glCanvas3D.createBuffer();glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.pointSphereVBOVert);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,new WebGLFloatArray(c3dl.BOUNDING_SPHERE_VERTICES),glCanvas3D.STATIC_DRAW);this.pointSphereRenderReady=true;}
this.createRenderer=function(cvs)
{if(c3dl.debug.DUMMY)
{glCanvas3D={};glCanvas3D.__noSuchMethod__=function()
{return true;}}
else
{try
{glCanvas3D=cvs.getContext('experimental-webgl');glCanvas3D.viewport(0,0,cvs.width,cvs.height);}
catch(err)
{}}
return glCanvas3D?true:false;}
this.init=function(width,height)
{if(glCanvas3D==null)
{return false;}
this.contextWidth=width;this.contextHeight=height;glCanvas3D.enable(glCanvas3D.DEPTH_TEST);this.particleSystemShader=this.createProgram(c3dl.psys_vs,c3dl.psys_fs).getProgramID();this.pointShader=this.createProgram(c3dl.point_vs,c3dl.point_fs).getProgramID();this.lineShader=this.createProgram(c3dl.line_vs,c3dl.line_fs).getProgramID();this.pointSphereShader=this.createProgram(c3dl.point_sphere_vs,c3dl.point_sphere_fs).getProgramID();this.boundingSphereShader=this.createProgram(c3dl.bounding_sphere_vs,c3dl.bounding_sphere_fs).getProgramID();c3dl.effects.STD_EFFECT=new c3dl.EffectTemplate();c3dl.effects.STD_EFFECT.addVertexShader(c3dl.material_vs+c3dl.light_vs+c3dl.model_vs);c3dl.effects.STD_EFFECT.addFragmentShader(c3dl.model_fs);c3dl.effects.STD_EFFECT.setRenderingCallback(c3dl.std_callback);c3dl.effects.STD_EFFECT.init();c3dl.effects.STANDARD=new c3dl.Effect();c3dl.effects.STANDARD.init(c3dl.effects.STD_EFFECT);var prog=this.createProgram(c3dl.material_vs+c3dl.light_vs+c3dl.model_vs,c3dl.model_fs);c3dl.effects.STANDARD.getEffectTemplate().addProgramObject(prog);this.programsWithLights.push(c3dl.effects.STANDARD.getEffectTemplate().getProgramID(this.ID));this.STANDARD_PROGRAM_ID=prog.getProgramID();c3dl.effects.SOLID_COLOR_EFFECT_TEMP=new c3dl.EffectTemplate();c3dl.effects.SOLID_COLOR_EFFECT_TEMP.addVertexShader(c3dl.solid_color_vs);c3dl.effects.SOLID_COLOR_EFFECT_TEMP.addFragmentShader(c3dl.solid_color_fs);c3dl.effects.SOLID_COLOR_EFFECT_TEMP.setRenderingCallback(c3dl.solid_color_callback);c3dl.effects.SOLID_COLOR_EFFECT_TEMP.init();c3dl.effects.SOLID_COLOR_EFFECT=new c3dl.Effect();c3dl.effects.SOLID_COLOR_EFFECT.init(c3dl.effects.SOLID_COLOR_EFFECT_TEMP);var prog=this.createProgram(c3dl.solid_color_vs,c3dl.solid_color_fs);c3dl.effects.SOLID_COLOR_EFFECT.getEffectTemplate().addProgramObject(prog);this.SOLID_COLOR_EFFECT_ID=prog.getProgramID();c3dl.effects.GREYSCALE=new c3dl.EffectTemplate();c3dl.effects.GREYSCALE.addVertexShader(c3dl.material_vs);c3dl.effects.GREYSCALE.addVertexShader(c3dl.light_vs);c3dl.effects.GREYSCALE.addVertexShader(c3dl.greyscale_vs);c3dl.effects.GREYSCALE.addFragmentShader(c3dl.greyscale_fs);c3dl.effects.GREYSCALE.setRenderingCallback(c3dl.greyscale_callback);c3dl.effects.GREYSCALE.addParameter("color",Array,[0.3,0.6,0.1]);c3dl.effects.GREYSCALE.init();c3dl.effects.SOLID_COLOR=new c3dl.EffectTemplate();c3dl.effects.SOLID_COLOR.addVertexShader(c3dl.solid_color_vs);c3dl.effects.SOLID_COLOR.addFragmentShader(c3dl.solid_color_fs);c3dl.effects.SOLID_COLOR.setRenderingCallback(c3dl.solid_color_callback);c3dl.effects.SOLID_COLOR.addParameter("color",Array,[0.0,0.0,0.0]);c3dl.effects.SOLID_COLOR.init();c3dl.effects.SEPIA=new c3dl.EffectTemplate();c3dl.effects.SEPIA.addVertexShader(c3dl.material_vs);c3dl.effects.SEPIA.addVertexShader(c3dl.light_vs);c3dl.effects.SEPIA.addVertexShader(c3dl.sepia_vs);c3dl.effects.SEPIA.addFragmentShader(c3dl.sepia_fs);c3dl.effects.SEPIA.setRenderingCallback(c3dl.sepia_callback);c3dl.effects.SEPIA.addParameter("color",Array,[1.2,1.0,0.8]);c3dl.effects.SEPIA.init();c3dl.effects.CARTOON=new c3dl.EffectTemplate();c3dl.effects.CARTOON.addVertexShader(c3dl.cartoon_vs);c3dl.effects.CARTOON.addFragmentShader("#ifdef GL_ES \n precision highp float; \n #endif \n ");c3dl.effects.CARTOON.addFragmentShader(c3dl.light_vs);c3dl.effects.CARTOON.addFragmentShader(c3dl.cartoon_fs);c3dl.effects.CARTOON.setRenderingCallback(c3dl.cartoon_callback);c3dl.effects.CARTOON.addParameter("qMap",String);c3dl.effects.CARTOON.addParameter("outline",Boolean,true);c3dl.effects.CARTOON.init();c3dl.effects.GOOCH=new c3dl.EffectTemplate();c3dl.effects.GOOCH.addVertexShader(c3dl.gooch_vs);c3dl.effects.GOOCH.addFragmentShader("#ifdef GL_ES \n precision highp float; \n #endif \n ");c3dl.effects.GOOCH.addFragmentShader(c3dl.light_vs);c3dl.effects.GOOCH.addFragmentShader(c3dl.gooch_fs);c3dl.effects.GOOCH.setRenderingCallback(c3dl.gooch_callback);c3dl.effects.GOOCH.addParameter("coolColor",Array,[0,0,1]);c3dl.effects.GOOCH.addParameter("warmColor",Array,[0.5,0.5,0.0]);c3dl.effects.GOOCH.addParameter("surfaceColor",Array,[0.1,0.1,0.1]);c3dl.effects.GOOCH.addParameter("outline",Boolean,true);c3dl.effects.GOOCH.init();this.texManager=new c3dl.TextureManager(glCanvas3D);for(var i in this.textureQueue)
{if(this.textureQueue[i])
{this.texManager.addTexture(this.textureQueue[i]);}}
return true;}
this.renderBoundingSphere=function(boundingSphere,viewMatrix)
{var shader=this.boundingSphereShader;glCanvas3D.useProgram(shader);if(this.pointSphereRenderReady==false)
{this.pointSphereRenderSetup();}
else
{var sphereMatrix=c3dl.makeIdentityMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var pos=boundingSphere.getPosition();sphereMatrix[12]=pos[0];sphereMatrix[13]=pos[1];sphereMatrix[14]=pos[2];sphereMatrix[0]=sphereMatrix[5]=sphereMatrix[10]=boundingSphere.getRadius();var sphereViewMatrix=c3dl.multiplyMatrixByMatrix(viewMatrix,sphereMatrix);var MVPMatrix=c3dl.multiplyMatrixByMatrix(projMatrix,sphereViewMatrix);this.setUniformMatrix(shader,"modelViewProjMatrix",MVPMatrix);this.setVertexAttribArray(shader,"Vertex",3,this.pointSphereVBOVert);glCanvas3D.drawArrays(glCanvas3D.POINTS,0,c3dl.BOUNDING_SPHERE_VERTICES.length/3);}}
this.renderGeometry=function(obj)
{if(obj.getEffect())
{var effect=obj.getEffect().getEffectTemplate();var progObjID=effect.getProgramID(this.ID);if(progObjID==-1)
{var vertexShaders=effect.getVertexShaders();var fragmentShaders=effect.getFragmentShaders();var joinedVertexShaders=vertexShaders.join('');var joinedFragmentShaders=fragmentShaders.join('');var programObject=this.createProgram(joinedVertexShaders,joinedFragmentShaders);if(programObject)
{effect.addProgramObject(programObject);for(var i=0,len=vertexShaders.length;i<len;i++)
{if(vertexShaders[i]==c3dl.light_vs)
{this.programsWithLights.push(programObject.getProgramID());glCanvas3D.useProgram(programObject.getProgramID());this.setUniformi(programObject.getProgramID(),"lightingOn",true);}}
for(var i=0,len=fragmentShaders.length;i<len;i++)
{if(fragmentShaders[i]==c3dl.light_vs)
{this.programsWithLights.push(programObject.getProgramID());glCanvas3D.useProgram(programObject.getProgramID());this.setUniformi(programObject.getProgramID(),"lightingOn",true);}}}
else
{c3dl.debug.logWarning("could not compile effect shader(s).");c3dl.debug.logInfo(joinedVertexShaders);c3dl.debug.logInfo(joinedFragmentShaders);}}
else
{var renderingObj={};renderingObj["context"]=glCanvas3D;renderingObj["getContext"]=function()
{return this.context;};renderingObj["renderer"]=this;renderingObj["getRenderer"]=function()
{return this.renderer;};renderingObj['programObjectID']=progObjID;renderingObj['getProgramObjectID']=function()
{return this.programObjectID;};renderingObj['geometry']=obj;renderingObj['getGeometry']=function()
{return this.geometry;};var cb=effect.getRenderingCallback();cb(renderingObj);}}
else
{var renderingObj={};renderingObj["context"]=glCanvas3D;renderingObj["getContext"]=function()
{return this.context;};renderingObj["renderer"]=this;renderingObj["getRenderer"]=function()
{return this.renderer;};renderingObj['programObjectID']=this.STANDARD_PROGRAM_ID;renderingObj['getProgramObjectID']=function()
{return this.programObjectID;};renderingObj['geometry']=obj;renderingObj['getGeometry']=function()
{return this.geometry;};c3dl.std_callback(renderingObj);}}
this.renderParticleSystem=function(psys)
{var shader=this.particleSystemShader;glCanvas3D.useProgram(shader);var usingTexture=false;var texturePath=psys.getTexture();var texID=this.texManager.getID(texturePath);var texAttribLoc=glCanvas3D.getAttribLocation(shader,"Texture");if(texID==-1&&texturePath)
{this.texManager.addTexture(texturePath);}
if(texID!=-1&&texturePath&&psys.getTexCoords())
{glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,texID);this.setVertexAttribArray(shader,"Texture",2,psys.getVBOTexCoords());usingTexture=true;glCanvas3D.texParameteri(glCanvas3D.TEXTURE_2D,glCanvas3D.TEXTURE_WRAP_S,glCanvas3D.CLAMP_TO_EDGE);glCanvas3D.texParameteri(glCanvas3D.TEXTURE_2D,glCanvas3D.TEXTURE_WRAP_T,glCanvas3D.CLAMP_TO_EDGE);}
else
{glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);glCanvas3D.disableVertexAttribArray(texAttribLoc);}
this.setUniformi(shader,"usingTexture",usingTexture);this.setUniformMatrix(shader,"rot",[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);this.setVertexAttribArray(shader,"Vertex",3,psys.getVBOVertices());for(var i=0,numParticles=psys.getNumParticles();i<numParticles;i++)
{if(psys.getParticle(i).isAlive())
{var pSize=psys.getParticle(i).getSize();this.setUniformf(shader,"Color",psys.getParticle(i).getColor());c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var viewMatrix=c3dl.peekMatrix();var modelMatrix=psys.getParticle(i).getTransform();modelMatrix=c3dl.multiplyMatrixByMatrix(modelMatrix,[pSize,0,0,0,0,pSize,0,0,0,0,pSize,0,0,0,0,1]);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(viewMatrix,modelMatrix);modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewProjMatrix);this.setUniformMatrix(shader,"modelViewProjMatrix",modelViewProjMatrix);glCanvas3D.drawArrays(glCanvas3D.TRIANGLE_FAN,i,4);}}}
this.renderLines=function(lines)
{if(lines.length>0)
{var shader=this.lineShader;glCanvas3D.useProgram(shader);var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);this.setUniformMatrix(shader,"modelViewProjMatrix",modelViewProjMatrix);for(var l=0,len=lines.length;l<len;l++)
{glCanvas3D.lineWidth(lines[l].getWidth());var coords=[];var cols=[];for(var i=0;i<6;i++)
{coords.push(lines[l].getCoordinates()[i]);cols.push(lines[l].getColors()[i]);}
if(this.lineVertBuffer==null)
{this.lineVertBuffer={};this.lineVertBuffer.position=glCanvas3D.createBuffer();}
glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.lineVertBuffer.position);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,new WebGLFloatArray(coords),glCanvas3D.STREAM_DRAW);this.setVertexAttribArray(shader,"Vertex",3,this.lineVertBuffer.position);if(this.lineColBuffer==null)
{this.lineColBuffer={};this.lineColBuffer.position=glCanvas3D.createBuffer();}
glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.lineColBuffer.position);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,new WebGLFloatArray(cols),glCanvas3D.STREAM_DRAW);this.setVertexAttribArray(shader,"Color",3,this.lineColBuffer.position);glCanvas3D.drawArrays(glCanvas3D.LINES,0,coords.length/3);}}}
this.renderPoints=function(pointPositions,pointColors,attenuation,mode,size)
{if(pointPositions.length>0&&pointColors.length>0)
{if(mode==c3dl.POINT_MODE_POINT)
{var shader=this.pointShader;glCanvas3D.useProgram(shader);var viewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,viewMatrix);this.setUniformMatrix(shader,"viewMatrix",viewMatrix);this.setUniformMatrix(shader,"modelViewProjMatrix",modelViewProjMatrix);this.setUniformf(shader,"attenuation",attenuation);if(this.pointVertBuffer==null)
{this.pointVertBuffer={};this.pointVertBuffer.position=glCanvas3D.createBuffer();}
glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.pointVertBuffer.position);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,new WebGLFloatArray(pointPositions),glCanvas3D.STREAM_DRAW);this.setVertexAttribArray(shader,"Vertex",3,this.pointVertBuffer.position);if(this.pointColBuffer==null)
{this.pointColBuffer={};this.pointColBuffer.position=glCanvas3D.createBuffer();}
glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,this.pointColBuffer.position);glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER,new WebGLFloatArray(pointColors),glCanvas3D.STREAM_DRAW);this.setVertexAttribArray(shader,"Color",3,this.pointColBuffer.position);glCanvas3D.drawArrays(glCanvas3D.POINTS,0,pointPositions.length/3);}
else if(mode==c3dl.POINT_MODE_SPHERE)
{var shader=this.pointSphereShader;glCanvas3D.useProgram(shader);if(this.pointSphereRenderReady==false)
{this.pointSphereRenderSetup();}
else
{c3dl.pushMatrix();for(var i=0,len=pointPositions.length;i<len;i+=3)
{var mat=c3dl.makeIdentityMatrix();mat[12]=pointPositions[i];mat[13]=pointPositions[i+1];mat[14]=pointPositions[i+2];mat[0]=mat[5]=mat[10]=size;mat=c3dl.multiplyMatrixByMatrix(c3dl.peekMatrix(),mat);c3dl.matrixMode(c3dl.PROJECTION);var proj=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var MVPMatrix=c3dl.multiplyMatrixByMatrix(proj,mat);this.setUniformMatrix(shader,"modelViewProjMatrix",MVPMatrix);this.setUniformf(shader,"Color",[pointColors[i],pointColors[i+1],pointColors[i+2]]);this.setVertexAttribArray(shader,"Vertex",3,this.pointSphereVBOVert);glCanvas3D.drawArrays(glCanvas3D.TRIANGLES,0,c3dl.BOUNDING_SPHERE_VERTICES.length/3);c3dl.popMatrix();}}}}}
this.setVertexAttribArray=function(shader,varName,size,vbo)
{var attribLoc=glCanvas3D.getAttribLocation(shader,varName);if(attribLoc!=c3dl.SHADER_VAR_NOT_FOUND)
{glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER,vbo);glCanvas3D.vertexAttribPointer(attribLoc,size,glCanvas3D.FLOAT,false,0,0);glCanvas3D.enableVertexAttribArray(attribLoc);}
else
{c3dl.debug.logError("Attribute variable '"+varName+"' not found in shader with ID = "+shader);}}
this.setUniformMatrix=function(programObjectID,varName,matrix)
{var varLocation=glCanvas3D.getUniformLocation(programObjectID,varName);if(varLocation!=c3dl.SHADER_VAR_NOT_FOUND)
{glCanvas3D.uniformMatrix4fv(varLocation,false,matrix);}
else
{c3dl.debug.logError("Uniform matrix variable '"+varName+"' not found in program object.");}}
this.setUniformf=function(shader,varName,value)
{var varLocation=glCanvas3D.getUniformLocation(shader,varName);if(varLocation!=c3dl.SHADER_VAR_NOT_FOUND)
{if(value.length==4)
{glCanvas3D.uniform4fv(varLocation,value);}
else if(value.length==3)
{glCanvas3D.uniform3fv(varLocation,value);}
else if(value.length==2)
{glCanvas3D.uniform2fv(varLocation,value);}
else
{glCanvas3D.uniform1f(varLocation,value);}}
else
{c3dl.debug.logError('Uniform variable "'+varName+'" not found in program object.');}}
this.setUniformi=function(programObjectID,varName,value)
{var varLocation=glCanvas3D.getUniformLocation(programObjectID,varName);if(varLocation!=c3dl.SHADER_VAR_NOT_FOUND)
{if(value.length==4)
{glCanvas3D.uniform4iv(varLocation,value);}
else if(value.length==3)
{glCanvas3D.uniform3iv(varLocation,value);}
else if(value.length==2)
{glCanvas3D.uniform2iv(varLocation,value);}
else
{glCanvas3D.uniform1i(varLocation,value);}}
else
{c3dl.debug.logError('Uniform variable "'+varName+'" not found in program object.');}}
this.enable=function(capability)
{try
{if(capability)
{glCanvas3D.enable(capability);}
else
{c3dl.debug.logWarning("Enable command passed undefined value.");}}
catch(e)
{c3dl.debug.logException("Exception name:"+e.name+"<br />"+"Exception msg: "+e.message+"<br />"+"Capability: "+capability);}}
this.disable=function(capability)
{if(capability)
{glCanvas3D.disable(capability);}
else
{c3dl.debug.logWarning("disable command passed undefined value.");}}}
c3dl.WebGL.prototype=new c3dl.Renderer;c3dl.RenderingObject=function()
{this.getContext=function()
{}
this.getGeometry=function()
{}
this.getProgramObjectID=function()
{}
this.getRenderer=function()
{}}
c3dl.SceneNode=c3dl.inherit(c3dl.Primitive,function(){c3dl._superc(this);this.children=[];});c3dl.SceneNode.prototype.getCopy=function(){var sceneNode=new c3dl.SceneNode();sceneNode.clone(this);return sceneNode;}
c3dl.SceneNode.prototype.clone=function(other){c3dl._super(this,arguments,"clone");for(var i=0,len=other.children.length;i<len;i++){this.addChild(other.children[i].getCopy());}}
c3dl.SceneNode.prototype.addChild=function(child){this.children.push(child);}
c3dl.SceneNode.prototype.findNode=function(nodeName){var child=null;if(nodeName==this.name){child=this;}
else{for(var i=0,len=this.children.length;i<len;i++){if(this.children[i]instanceof c3dl.SceneNode){child=this.children[i].findNode(nodeName);if(child!=null){break;}}}}
return child;}
c3dl.SceneNode.prototype.update=function(timeStep,scaleVec,rotateMat){c3dl._super(this,arguments,"update");c3dl.pushMatrix();if(!scaleVec){scaleVec=this.scaleVec;}
else if(this.scaleVec){scaleVec=c3dl.multiplyVectorByVector(scaleVec,this.scaleVec);}
if(!rotateMat){rotateMat=this.getRotateMat();}
else if(this.scaleVec){rotateMat=c3dl.multiplyMatrixByMatrix(rotateMat,this.getRotateMat());}
c3dl.multMatrix(this.getTransform());var velVec=c3dl.multiplyVector(this.linVel,timeStep);c3dl.addVectors(this.pos,velVec,this.pos);totalPos=c3dl.multiplyMatrixByVector(c3dl.peekMatrix(),this.pos);for(var i=0;i<this.children.length;i++){this.children[i].update(timeStep,scaleVec,rotateMat);}
this.pitch(this.angVel[0]*timeStep);this.yaw(this.angVel[1]*timeStep);this.roll(this.angVel[2]*timeStep);c3dl.popMatrix();}
c3dl.SceneNode.prototype.render=function(glCanvas3D,scene){c3dl.pushMatrix();c3dl.multMatrix(this.getTransform());for(var i=0,len=this.children.length;i<len;i++){this.children[i].render(glCanvas3D,scene);}
c3dl.popMatrix();}
c3dl.SceneNode.prototype.setTexture=function(textureName){for(var i=0,len=this.children.length;i<len;i++){this.children[i].setTexture(textureName);}}
c3dl.SceneNode.prototype.setMaterial=function(material){for(var i=0,len=this.children.length;i<len;i++){this.children[i].setMaterial(material);}}
c3dl.SceneNode.prototype.setEffect=function(effect){for(var i=0,len=this.children.length;i<len;i++){this.children[i].setEffect(effect);}}
c3dl.SceneNode.prototype.rayIntersectsTriangles=function(rayOrigin,rayDir){c3dl.pushMatrix();c3dl.multMatrix(this.getTransform());var passed=false;for(var i=0,len=this.children.length;i<len;i++){if(this.children[i].rayIntersectsTriangles(rayOrigin,rayDir)){passed=true;break;}}
c3dl.popMatrix();return passed;}
c3dl.SceneNode.prototype.rayIntersectsEnclosures=function(rayOrigin,rayDir){var passed=false;for(var i=0,len=this.children.length;i<len;i++){if(this.children[i].rayIntersectsEnclosures(rayOrigin,rayDir)){passed=true;break;}}
return passed;}
c3dl.SceneNode.prototype.getBoundingSpheres=function(){var boundingSpheres=[];for(var i=0;i<this.children.length;i++){if(this.children[i]instanceof c3dl.SceneNode){boundingSpheres=boundingSpheres.concat(this.children[i].getBoundingSpheres());}
else if(this.children[i]instanceof c3dl.Geometry){for(var j=0;j<this.children[i].getPrimitiveSets().length;j++){if(this.children[i].getPrimitiveSets()[j].getBoundingSphere()){boundingSpheres=boundingSpheres.concat(this.children[i].getPrimitiveSets()[j].getBoundingSphere());}}}}
return boundingSpheres;}
c3dl.SceneNode.prototype.getAllVerts=function(){var allverts=[];var numverts=0;var temp2=[],temp3=[];c3dl.pushMatrix();c3dl.multMatrix(this.getTransform());for(var i=0;i<this.children.length;i++){if(this.children[i]instanceof c3dl.SceneNode){allverts=allverts.concat(this.children[i].getAllVerts());}
else if(this.children[i]instanceof c3dl.Geometry){for(var j=0;j<this.children[i].getPrimitiveSets().length;j++){if(this.children[i].getPrimitiveSets()[j].getBoundingSphere()){var temp=this.children[i].getPrimitiveSets()[j].getBoundingSphere().getMaxMins();c3dl.multiplyMatrixByVector(c3dl.peekMatrix(),[temp[0],temp[2],temp[4]],temp2);c3dl.multiplyMatrixByVector(c3dl.peekMatrix(),[temp[1],temp[3],temp[5]],temp3);allverts=allverts.concat(temp2);allverts=allverts.concat(temp3);}}}}
c3dl.popMatrix();return allverts;}
c3dl.SceneNode.prototype.center=function(newcenter){for(var i=0;i<this.children.length;i++){if(this.children[i]instanceof c3dl.SceneNode){this.children[i].center(newcenter);}
else if(this.children[i]instanceof c3dl.Geometry){var temp=new c3dl.SceneNode();for(var j=0;j<this.children.length;j++)
temp.addChild(this.children[j]);this.children=[];this.children[i]=temp;temp.setTransform(c3dl.makePoseMatrix([1,0,0],[0,1,0],[0,0,1],[-newcenter[0],-newcenter[1],-newcenter[2]]));}}}
c3dl.bounding_sphere_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"void main(void) {"+"  gl_FragColor = frontColor;"+"}";c3dl.bounding_sphere_vs="attribute vec3 Vertex;"+"varying vec4 frontColor;"+"uniform mat4 modelViewProjMatrix;"+"void main(void){"+"  frontColor = vec4(0.0, 0.0, 0.0, 1.0);"+"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+"}";c3dl.line_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"void main(void){ "+"  gl_FragColor = frontColor;"+"}";c3dl.line_vs="attribute vec3 Vertex;"+"attribute vec3 Color;"+"varying vec4 frontColor;"+"uniform mat4 modelViewProjMatrix;"+"void main(void)"+"{"+"  frontColor = vec4(Color, 1.0);"+"  gl_Position = modelViewProjMatrix * vec4(Vertex, 1.0);"+"}";c3dl.cartoon_callback=function(renderingObj)
{var renderer=renderingObj.getRenderer();var gl=renderingObj.getContext();var geometry=renderingObj.getGeometry();var effect=geometry.getEffect();var programObjID=renderingObj.getProgramObjectID();gl.useProgram(programObjID);if(effect.getParameter("qMap")==null)
{c3dl.debug.logWarning('"qMap" is a required parameter for c3dl.effects.CARTOON');return;}
var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(programObjID,"modelViewMatrix",modelViewMatrix);renderer.setUniformMatrix(programObjID,"modelViewProjMatrix",modelViewProjMatrix);if(effect.getParameter("outline")==true&&renderer.SOLID_COLOR_EFFECT_ID)
{gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(2.0,2.0);var outlineProgID=renderer.SOLID_COLOR_EFFECT_ID;gl.enable(gl.CULL_FACE);gl.cullFace(gl.FRONT);gl.useProgram(outlineProgID);renderer.setUniformf(outlineProgID,"color",[0,0,0]);var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var MVPMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(outlineProgID,"modelViewProjMatrix",MVPMatrix);var contextWidth=renderer.getContextWidth();var contextHeight=renderer.getContextHeight();for(var primSet=0;primSet<geometry.getPrimitiveSets().length;primSet++)
{var currColl=geometry.getPrimitiveSets()[primSet];var normalAttribLoc=gl.getAttribLocation(outlineProgID,"Normal");if(normalAttribLoc!=-1&&currColl.getNormals())
{renderer.setVertexAttribArray(outlineProgID,"Normal",3,currColl.getVBONormals());}
var texAttribLoc=gl.getAttribLocation(outlineProgID,"Texture");if(texAttribLoc!=-1&&currColl.getTexCoords())
{renderer.setVertexAttribArray(outlineProgID,"Texture",2,currColl.getVBOTexCoords());}
renderer.setVertexAttribArray(outlineProgID,"Vertex",3,currColl.getVBOVertices());gl.viewport(1,-1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);gl.viewport(-1,-1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);gl.viewport(-1,1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);gl.viewport(1,1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}
gl.cullFace(gl.BACK);gl.viewport(0,0,contextWidth,contextHeight);gl.disable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(0.0,0.0);gl.useProgram(programObjID);}
renderer.setUniformi(programObjID,"lightingOn",true);for(var coll=0;coll<geometry.getPrimitiveSets().length;coll++)
{var currColl=geometry.getPrimitiveSets()[coll];var normalAttribLoc=gl.getAttribLocation(programObjID,"Normal");if(currColl.getNormals())
{var NormalMatrix=c3dl.inverseMatrix(modelViewMatrix);NormalMatrix=c3dl.transposeMatrix(NormalMatrix);renderer.setUniformMatrix(programObjID,"normalMatrix",NormalMatrix);renderer.setVertexAttribArray(programObjID,"Normal",3,currColl.getVBONormals());}
else
{gl.disableVertexAttribArray(normalAttribLoc);}
var texAttribLoc=gl.getAttribLocation(programObjID,"Texture");var texID=renderer.getTextureID(currColl.getTexture());if(texID==-1&&currColl.getTexture())
{renderer.addTexture(currColl.getTexture());}
if(texID!=-1&&currColl.getTexture()&&currColl.getTexCoords()&&texAttribLoc!=-1)
{gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texID);renderer.setVertexAttribArray(programObjID,"Texture",2,currColl.getVBOTexCoords());renderer.setUniformi(programObjID,"myTex",0);renderer.setUniformi(programObjID,"usingTexture",true);}
else
{gl.disableVertexAttribArray(texAttribLoc);renderer.setUniformi(programObjID,"usingTexture",false);}
var qMap=effect.getParameter("qMap");shadesTexID=renderer.getTextureID(qMap);if(shadesTexID==-1)
{renderer.addTexture(qMap);}
gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,shadesTexID);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);renderer.setUniformi(programObjID,"celShadeTex",1);renderer.setVertexAttribArray(programObjID,"Vertex",3,currColl.getVBOVertices());gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}}
c3dl.cartoon_fs="uniform sampler2D myTex;"+"uniform sampler2D celShadeTex;"+"uniform int usingTexture;"+"varying vec4 texCoord;"+"varying vec3 norm;"+"varying vec3 pos;"+"void c3dl_celPointLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)"+"{"+"  vec3 rayDir = vec3(light.position) - fragPos;"+"  intensity += max(dot(normalize(rayDir),normal),0.0);"+"}"+"void c3dl_celDirLight(in Light light, in vec3 normal, inout float intensity)"+"{"+"  intensity += max(dot(normalize(vec3(-light.position)),normal), 0.0);"+"}"+"void c3dl_celSpotLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)"+"{"+"  vec3 rayDir = fragPos - vec3(light.position);"+"  rayDir = normalize(rayDir);"+"  float spotDot = dot(rayDir, normalize(light.spotDirection));"+"  if( dot(-normal, rayDir ) > 0.0 && spotDot > cos(radians(light.spotCutoff)) )"+"  {"+"    intensity += max(dot(-normal, rayDir), 0.0);"+"  }"+"}"+"void main(void)"+"{"+"  if(lightingOn == false)"+"  {"+"    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);"+"  }"+"  else"+"  {"+"    vec3 n = normalize(norm);"+"    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);"+"    if( usingTexture == 1 )"+"    {"+"      vec3 texel = vec3(texture2D(myTex, texCoord.xy));"+"      color = vec4(texel, 1.0);"+"    }"+"    float intensity = 0.0;"+"    for(int i = 0; i < C3DL_MAX_LIGHTS; i++)"+"    {"+"      if(lights[i].isOn == true) "+"      {"+"        if(lights[i].type == 1)"+"        {"+"          c3dl_celDirLight(lights[i], n, intensity);"+"        }"+"       else if(lights[i].type == 2)"+"       {"+"         c3dl_celPointLight(lights[i], pos, n, intensity);"+"       }"+"       else"+"       {"+"         c3dl_celSpotLight(lights[i], pos, n, intensity);"+"       }"+"     }"+"   }"+"    intensity = clamp(intensity, 0.1, 0.9);"+"    vec3 celTexel = vec3(texture2D(celShadeTex, vec2(intensity, 0.0)));"+"    gl_FragColor = color * vec4(celTexel, 1.0);"+"  }"+"}";c3dl.cartoon_vs="attribute vec3 Vertex;"+"attribute vec3 Normal;"+"attribute vec3 Texture;"+"varying vec3 norm;"+"varying vec3 pos;"+"varying vec4 texCoord;"+"uniform mat4 modelViewMatrix;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 normalMatrix;"+"void main(void)"+"{"+"  mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);"+"  norm = normalize(normalMatrix3x3 * Normal);"+"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+"  pos = vec3( modelViewMatrix * vec4(Vertex,1.0));"+"  texCoord = vec4(Texture,1.0);"+"}";c3dl.gooch_callback=function(renderingObj)
{var renderer=renderingObj.getRenderer();var gl=renderingObj.getContext();var geometry=renderingObj.getGeometry();var effect=geometry.getEffect();var programObjID=renderingObj.getProgramObjectID();gl.useProgram(programObjID);var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(programObjID,"modelViewMatrix",modelViewMatrix);renderer.setUniformMatrix(programObjID,"modelViewProjMatrix",modelViewProjMatrix);if(effect.getParameter("outline")==true&&renderer.SOLID_COLOR_EFFECT_ID)
{gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(2.0,2.0);var outlineProgID=renderer.SOLID_COLOR_EFFECT_ID;gl.enable(gl.CULL_FACE);gl.cullFace(gl.FRONT);gl.useProgram(outlineProgID);renderer.setUniformf(outlineProgID,"color",[0,0,0]);var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var MVPMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(outlineProgID,"modelViewProjMatrix",MVPMatrix);var contextWidth=renderer.getContextWidth();var contextHeight=renderer.getContextHeight();for(var primSet=0;primSet<geometry.getPrimitiveSets().length;primSet++)
{var currColl=geometry.getPrimitiveSets()[primSet];var normalAttribLoc=gl.getAttribLocation(outlineProgID,"Normal");if(normalAttribLoc!=-1&&currColl.getNormals())
{renderer.setVertexAttribArray(outlineProgID,"Normal",3,currColl.getVBONormals());}
var texAttribLoc=gl.getAttribLocation(outlineProgID,"Texture");if(texAttribLoc!=-1&&currColl.getTexCoords())
{renderer.setVertexAttribArray(outlineProgID,"Texture",2,currColl.getVBOTexCoords());}
renderer.setVertexAttribArray(outlineProgID,"Vertex",3,currColl.getVBOVertices());gl.viewport(1,-1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);gl.viewport(-1,-1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);gl.viewport(-1,1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);gl.viewport(1,1,contextWidth,contextHeight);gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}
gl.cullFace(gl.BACK);gl.viewport(0,0,contextWidth,contextHeight);gl.disable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(0.0,0.0);}
gl.useProgram(programObjID);for(var coll=0;coll<geometry.getPrimitiveSets().length;coll++)
{var currColl=geometry.getPrimitiveSets()[coll];var dummyAttribLoc=gl.getAttribLocation(programObjID,"dummyAttrib");if(dummyAttribLoc!==-1&&currColl.getNormals())
{renderer.setVertexAttribArray(programObjID,"dummyAttrib",3,currColl.getVBONormals());}
var normalAttribLoc=gl.getAttribLocation(programObjID,"Normal");if(normalAttribLoc!==-1&&currColl.getNormals())
{var NormalMatrix=c3dl.inverseMatrix(modelViewMatrix);NormalMatrix=c3dl.transposeMatrix(NormalMatrix);renderer.setUniformMatrix(programObjID,"normalMatrix",NormalMatrix);renderer.setVertexAttribArray(programObjID,"Normal",3,currColl.getVBONormals());}
else
{gl.disableVertexAttribArray(normalAttribLoc);}
renderer.setUniformf(programObjID,"warmColor",effect.getParameter("warmColor"));renderer.setUniformf(programObjID,"coolColor",effect.getParameter("coolColor"));renderer.setUniformf(programObjID,"surfaceColor",effect.getParameter("surfaceColor"));renderer.setVertexAttribArray(programObjID,"Vertex",3,currColl.getVBOVertices());gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}}
c3dl.gooch_fs="float DiffuseWarm = 0.5;"+"float DiffuseCool = 0.5; "+"uniform vec3 surfaceColor;"+"uniform vec3 warmColor;"+"uniform vec3 coolColor;"+"varying vec3 ViewVec; "+"varying vec3 ecPos; "+"varying vec3 tnorm;"+"void c3dl_goochPointLight(in Light light, in vec3 nviewVec, in vec3 ntnorm, inout float NdotL, inout float spec)"+"{"+" vec3 lightVec = normalize(vec3(light.position) - ecPos);"+" vec3 ReflectVec = normalize(reflect(lightVec, ntnorm));"+" NdotL = (dot(lightVec, ntnorm) + 1.0) * 0.5;"+" spec += max(dot(ReflectVec, -nviewVec), 0.0);"+"}"+"void c3dl_goochDirLight(in Light light, in vec3 nviewVec, in vec3 ntnorm,  inout float NdotL, inout float spec)"+"{"+" vec3 lightVec = vec3(-light.position);"+" NdotL = (dot(lightVec, ntnorm) + 1.0) * 0.5;"+" vec3 ReflectVec = normalize(reflect(lightVec, ntnorm));"+" spec += max(dot(ReflectVec, -nviewVec), 0.0);"+"}"+"void main(void) {"+" vec3 kcool = min(coolColor + DiffuseCool * surfaceColor, 1.0);"+" vec3 kwarm = min(warmColor + DiffuseWarm * surfaceColor, 1.0);"+" vec3 nviewVec = normalize(ViewVec);"+" vec3 ntnorm = normalize(tnorm);"+" float NdotL = 0.0;"+" float spec = 0.0;"+" bool appliedLight = false;"+" if(lightingOn == true)"+" {"+"  for(int i = 0; appliedLight == false && i < C3DL_MAX_LIGHTS; i++) "+"  {"+"   if( lights[i].isOn == true)"+"   {"+"    if(lights[i].type == 1)"+"    {"+"     c3dl_goochDirLight(lights[i], nviewVec, ntnorm, NdotL, spec); "+"     appliedLight = true;"+"    }"+"    else"+"    {"+"     c3dl_goochPointLight(lights[i], nviewVec, ntnorm, NdotL, spec); "+"     appliedLight = true;"+"    }"+"   }"+"  }"+" }"+" NdotL = clamp(NdotL, 0.0, 1.0);"+" vec3 kfinal = mix(kcool, kwarm, NdotL);"+" spec = pow(spec,16.0);"+" gl_FragColor = vec4(min(kfinal + spec, 1.0), 1.0);"+"}";c3dl.gooch_vs="varying vec3 ViewVec;"+"varying vec3 ecPos;"+"varying vec3 tnorm;"+"attribute vec3 Vertex;"+"attribute vec3 Normal;"+"attribute vec3 dummyAttrib;"+"uniform mat4 modelViewMatrix;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 normalMatrix;"+"void main(void){"+" vec3 dummy = dummyAttrib;"+" mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);"+" ecPos = vec3(modelViewMatrix * vec4(Vertex,1.0));"+" tnorm = normalize(normalMatrix3x3 * Normal);"+" ViewVec = normalize(-ecPos);"+" gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+"}";c3dl.greyscale_callback=function(renderingObj)
{var progObjID=renderingObj.getProgramObjectID();var renderer=renderingObj.getRenderer();var geometry=renderingObj.getGeometry();var gl=renderingObj.getContext();var effect=geometry.getEffect();gl.useProgram(progObjID);renderer.setUniformf(progObjID,"color",effect.getParameter("color"));var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewMatrix",modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewProjMatrix",modelViewProjMatrix);for(var coll=0;coll<geometry.getPrimitiveSets().length;coll++)
{var currColl=geometry.getPrimitiveSets()[coll];var mat=currColl.getMaterial();if(mat)
{renderer.setUniformf(progObjID,"material.emission",mat.getEmission());renderer.setUniformf(progObjID,"material.ambient",mat.getAmbient());renderer.setUniformf(progObjID,"material.diffuse",mat.getDiffuse());renderer.setUniformf(progObjID,"material.specular",mat.getSpecular());renderer.setUniformf(progObjID,"material.shininess",mat.getShininess());renderer.setUniformi(progObjID,"usingMaterial",true);}
else
{renderer.setUniformi(progObjID,"usingMaterial",false);}
var normalAttribLoc=gl.getAttribLocation(progObjID,"Normal");if(currColl.getNormals())
{var NormalMatrix=c3dl.inverseMatrix(modelViewMatrix);NormalMatrix=c3dl.transposeMatrix(NormalMatrix);renderer.setUniformMatrix(progObjID,"normalMatrix",NormalMatrix);renderer.setVertexAttribArray(progObjID,"Normal",3,currColl.getVBONormals());}
else
{gl.disableVertexAttribArray(normalAttribLoc);}
var usingTexture=false;var texAttribLoc=gl.getAttribLocation(progObjID,"Texture");var texID=renderer.getTextureID(currColl.getTexture());if(texID==-1&&currColl.getTexture())
{renderer.addTexture(currColl.getTexture());}
if(texID!=-1&&currColl.getTexture()&&currColl.getTexCoords()&&texAttribLoc!=-1)
{gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texID);renderer.setVertexAttribArray(progObjID,"Texture",2,currColl.getVBOTexCoords());usingTexture=true;}
else
{gl.disableVertexAttribArray(texAttribLoc);}
renderer.setUniformi(progObjID,"usingTexture",usingTexture);renderer.setVertexAttribArray(progObjID,"Vertex",3,currColl.getVBOVertices());gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}}
c3dl.greyscale_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"uniform sampler2D myTex;"+"uniform int usingTexture;"+"varying vec4 texCoord;"+"uniform vec3 color;"+"varying vec4 frontColor;"+"void main(void) {"+" vec4 col = frontColor;"+" if( usingTexture == 1 ){"+"  vec3 texel = vec3(texture2D(myTex, texCoord.xy));"+"  col *= vec4(texel,1.0);"+" }"+" float grey = dot(col.rgb, color);"+" gl_FragColor = vec4(grey, grey, grey, 1.0);"+"}";c3dl.greyscale_vs="attribute vec3 Vertex;"+"attribute vec3 Normal;"+"attribute vec3 Texture;"+"uniform mat4 modelViewMatrix;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 normalMatrix;"+"varying vec4 frontColor;"+"varying vec4 texCoord;"+"void main(void){"+" mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],"+"        normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],"+"        normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);"+" vec3 transformNormal = normalize(normalMatrix3x3 * Normal);"+" vec3 ambient  = vec3(0.0, 0.0, 0.0);"+" vec3 diffuse  = vec3(0.0, 0.0, 0.0);"+" vec3 specular = vec3(0.0, 0.0, 0.0);"+" vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);"+" vec3 ecPos = (vec3(ecPos4))/ecPos4.w;"+" vec3 eye = vec3(0.0, 0.0, 1.0);"+" float shine = 1.0;"+" if(usingMaterial)"+" {"+"  shine = material.shininess;"+" }"+" if(lightingOn == true)"+" {"+"  for(int i = 0; i < C3DL_MAX_LIGHTS; i++)"+"  {"+"   if(lights[i].isOn) "+"   {"+"    if(lights[i].type == 1)"+"    {"+"     c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);"+"    }"+"    else if(lights[i].type == 2) "+"    {"+"     c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);"+"    }"+"    else if(lights[i].type == 3)"+"    {"+"     c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular,shine);"+"    }"+"   }"+"  }"+" }"+" if( usingMaterial ){"+"  frontColor = vec4( material.emission + "+"                       ambientLightColor + "+"                       ambient * material.ambient + "+"                       diffuse * material.diffuse + "+"                       specular * material.specular,1.0); "+" }"+" else{"+"  frontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);"+" }"+" gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+" texCoord = vec4(Texture,1.0);"+"}";c3dl.light_vs="struct Light"+"{"+" bool isOn;"+" int type;"+" vec3 ambient;"+" vec3 diffuse;"+" vec3 specular;"+" vec4 position;"+" vec3 spotDirection;"+" float spotExponent;"+" float spotCutoff;"+" float attenuation1;"+" float attenuation2;"+" float attenuation3;"+"};"+"uniform vec3 ambientLightColor;"+"uniform bool lightingOn;"+"const int C3DL_MAX_LIGHTS = 7;"+"uniform Light lights[C3DL_MAX_LIGHTS];"+"void c3dl_SpotLight( in Light light, in vec3 normal, in vec3 eye, in vec3 ecPos, "+"      inout vec3 ambient, inout vec3 diffuse, inout vec3 specular, "+"      float shininess)"+"{"+" float nDotVP; "+" float nDotHV; "+" float spotDot; "+" float spotAttenuation;"+" float attenuation;"+" float d;"+" vec3 VP;"+" float pf;"+" vec3 halfVector;"+" VP = vec3(light.position) - ecPos; "+" vec3 ldir = normalize(light.spotDirection);"+" d = length(VP);"+" VP = normalize(VP);"+" attenuation = 1.0 / (light.attenuation1 + (light.attenuation2 * d) + (light.attenuation3 * d * d));"+" spotDot = dot(-VP, ldir);"+" if(spotDot > cos(radians(light.spotCutoff)))"+" {"+"  spotAttenuation = pow(spotDot, light.spotExponent);"+" }"+" else{"+"  spotAttenuation = 0.0;"+" }"+" attenuation *= spotAttenuation;"+" halfVector = normalize(VP + eye);"+" nDotVP = max(0.0, dot(normal, VP));"+" nDotHV = max(0.0, dot(normal, halfVector));"+" if(nDotVP == 0.0){"+"  pf = 0.0;"+" }"+" else{"+"  pf = pow(nDotHV, shininess);"+" }"+" ambient += light.ambient * attenuation;"+" diffuse += light.diffuse * nDotVP * attenuation; "+" specular += light.specular * pf * attenuation;"+"}"+"void c3dl_PointLight( in Light light, in vec3 normal, in vec3 eye, in vec3 ecPos, "+"      inout vec3 ambient, inout vec3 diffuse, inout vec3 specular, "+"      float shininess)"+"{"+" vec3 VP = vec3(light.position) - ecPos;"+" float pf;"+" vec3 halfVector = normalize(VP + eye);"+" float d = length(VP); "+" VP = normalize(VP);"+" float attenuation = 1.0 / (light.attenuation1 + (light.attenuation2 * d) + (light.attenuation3 * d * d));"+" float nDotVP = max(0.0, dot(normal, VP));"+" float nDotHV = max(0.0, dot(normal, halfVector));"+" if(nDotVP == 0.0){"+"  pf = 0.0;"+" }"+" else{"+"  pf = pow(nDotHV, shininess);"+" }"+" ambient += light.ambient * attenuation;"+" diffuse += light.diffuse * nDotVP * attenuation;"+" specular += light.specular * pf * attenuation;"+"}"+"void c3dl_DirectionalLight(in Light light, in vec3 normal, "+"       inout vec3 ambient, inout vec3 diffuse, inout vec3 specular,"+"       float shininess)"+"{"+" vec3 VP = normalize(vec3(-light.position));"+" float powerfactor;"+" float nDotVP = max(0.0, dot(normal, VP));"+" float nDotHV = nDotVP;"+" if(nDotVP == 0.0){"+"  powerfactor = 0.0;"+" }"+" else{"+"  powerfactor = pow(nDotHV, shininess);"+" }"+" ambient += light.ambient;"+" diffuse += light.diffuse * nDotVP;"+" specular += light.specular * powerfactor;"+"} ";c3dl.material_vs="struct Material"+"{"+" vec3 emission;"+" vec3 ambient;"+" vec3 diffuse;"+" vec3 specular;"+" float shininess;"+"};"+"uniform Material material;"+"uniform bool usingMaterial;";c3dl.sepia_callback=function(renderingObj)
{var progObjID=renderingObj.getProgramObjectID();var renderer=renderingObj.getRenderer();var geometry=renderingObj.getGeometry();var gl=renderingObj.getContext();var effect=geometry.getEffect();gl.useProgram(progObjID);renderer.setUniformf(progObjID,"color",effect.getParameter("color"));var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewMatrix",modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewProjMatrix",modelViewProjMatrix);for(var coll=0;coll<geometry.getPrimitiveSets().length;coll++)
{var currColl=geometry.getPrimitiveSets()[coll];var mat=currColl.getMaterial();if(mat)
{renderer.setUniformf(progObjID,"material.emission",mat.getEmission());renderer.setUniformf(progObjID,"material.ambient",mat.getAmbient());renderer.setUniformf(progObjID,"material.diffuse",mat.getDiffuse());renderer.setUniformf(progObjID,"material.specular",mat.getSpecular());renderer.setUniformf(progObjID,"material.shininess",mat.getShininess());renderer.setUniformi(progObjID,"usingMaterial",true);}
else
{renderer.setUniformi(progObjID,"usingMaterial",false);}
var normalAttribLoc=gl.getAttribLocation(progObjID,"Normal");if(currColl.getNormals())
{var NormalMatrix=c3dl.inverseMatrix(modelViewMatrix);NormalMatrix=c3dl.transposeMatrix(NormalMatrix);renderer.setUniformMatrix(progObjID,"normalMatrix",NormalMatrix);renderer.setVertexAttribArray(progObjID,"Normal",3,currColl.getVBONormals());}
else
{gl.disableVertexAttribArray(normalAttribLoc);}
var usingTexture=false;var texAttribLoc=gl.getAttribLocation(progObjID,"Texture");var texID=renderer.getTextureID(currColl.getTexture());if(texID==-1&&currColl.getTexture())
{renderer.addTexture(currColl.getTexture());}
if(texID!=-1&&currColl.getTexture()&&currColl.getTexCoords()&&texAttribLoc!=-1)
{gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texID);renderer.setVertexAttribArray(progObjID,"Texture",2,currColl.getVBOTexCoords());usingTexture=true;}
else
{gl.disableVertexAttribArray(texAttribLoc);}
renderer.setUniformi(progObjID,"usingTexture",usingTexture);renderer.setVertexAttribArray(progObjID,"Vertex",3,currColl.getVBOVertices());gl.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}}
c3dl.sepia_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"uniform sampler2D myTex;"+"uniform int usingTexture;"+"varying vec4 texCoord;"+"uniform vec3 color;"+"varying vec4 frontColor;"+"void main(void) {"+" vec4 col = frontColor;"+" if( usingTexture == 1 ){"+"  vec3 texel = vec3(texture2D(myTex, texCoord.xy));"+"  col *= vec4(texel,1.0);"+" }"+" float grey = dot(col.rgb, vec3(0.3, 0.6, 0.1));"+" gl_FragColor = vec4(grey * color, 1.0);"+"}";c3dl.sepia_vs="attribute vec3 Vertex;"+"attribute vec3 Normal;"+"attribute vec3 Texture;"+"varying vec4 frontColor;"+"varying vec4 texCoord;"+"uniform mat4 modelViewMatrix;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 normalMatrix;"+"void main(void){"+" mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],"+"        normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],"+"        normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);"+" vec3 transformNormal = normalize(normalMatrix3x3 * Normal);"+" vec3 ambient  = vec3(0.0, 0.0, 0.0);"+" vec3 diffuse  = vec3(0.0, 0.0, 0.0);"+" vec3 specular = vec3(0.0, 0.0, 0.0);"+" vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);"+" vec3 ecPos = (vec3(ecPos4))/ecPos4.w;"+" vec3 eye = vec3(0.0, 0.0, 1.0);"+" float shine = 1.0;"+" if(usingMaterial)"+" {"+"  shine = material.shininess;"+" }"+" if(lightingOn)"+" {"+"  for(int i = 0; i < C3DL_MAX_LIGHTS; i++)"+"  {"+"   if(lights[i].isOn) "+"   {"+"    if(lights[i].type == 1)"+"    {"+"     c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);"+"    }"+"    else if(lights[i].type == 2) "+"    {"+"     c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);"+"    }"+"    else if(lights[i].type == 3)"+"    {"+"     c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);"+"    }"+"   }"+"  }"+" }"+" if( usingMaterial ){"+"  frontColor = vec4( material.emission + "+"                       ambientLightColor + "+"                       ambient * material.ambient + "+"                       diffuse * material.diffuse + "+"                       specular * material.specular,1.0); "+" }"+" else{"+"  frontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);"+" }"+" gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+" texCoord = vec4(Texture,1.0);"+"}";c3dl.solid_color_callback=function(renderingObj)
{var progObjID=renderingObj.getProgramObjectID();var geometry=renderingObj.getGeometry();var effect=geometry.getEffect();var renderer=renderingObj.getRenderer();var glCanvas3D=renderingObj.getContext();glCanvas3D.useProgram(progObjID);var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewProjMatrix",modelViewProjMatrix);renderer.setUniformf(progObjID,"color",effect.getParameter("color"));for(var coll=0;coll<geometry.getPrimitiveSets().length;coll++)
{var currColl=geometry.getPrimitiveSets()[coll];var normalAttribLoc=glCanvas3D.getAttribLocation(progObjID,"Normal");if(normalAttribLoc!=-1&&currColl.getNormals())
{renderer.setVertexAttribArray(progObjID,"Normal",3,currColl.getVBONormals());}
var texAttribLoc=glCanvas3D.getAttribLocation(progObjID,"Texture");if(texAttribLoc!=-1&&currColl.getTexCoords())
{renderer.setVertexAttribArray(progObjID,"Texture",2,currColl.getVBOTexCoords());}
renderer.setVertexAttribArray(progObjID,"Vertex",3,currColl.getVBOVertices());glCanvas3D.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}}
c3dl.solid_color_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"void main(void) {"+"  gl_FragColor = frontColor;"+"}";c3dl.solid_color_vs="attribute vec3 Vertex;"+"attribute vec3 Normal;"+"attribute vec3 Texture;"+"uniform mat4 modelViewProjMatrix;"+"uniform vec3 color;"+"varying vec4 frontColor;"+"void main(void){"+"  vec3 dummy = Normal;"+"  frontColor = vec4(color, 1.0);"+"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+"}";c3dl.model_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"uniform sampler2D myTex;"+"uniform int usingTexture;"+"varying vec4 texCoord;"+"void main(void) {"+" if( usingTexture == 1 ){"+"  vec3 texel = vec3(texture2D(myTex, texCoord.xy));"+"  gl_FragColor = vec4(texel, 1.0) * frontColor;"+" }"+" else"+" {"+"  gl_FragColor = frontColor;"+" }"+"}";c3dl.model_vs="attribute vec3 Vertex;"+"attribute vec3 Normal;"+"attribute vec3 Texture;"+"varying vec4 frontColor;"+"varying vec4 texCoord;"+"uniform mat4 modelViewMatrix;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 normalMatrix;"+"void main(void){"+" mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],"+"                             normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],"+"                             normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);"+" vec3 transformNormal = normalize(normalMatrix3x3 * Normal);"+" vec3 ambient  = vec3(0.0, 0.0, 0.0);"+" vec3 diffuse  = vec3(0.0, 0.0, 0.0);"+" vec3 specular = vec3(0.0, 0.0, 0.0);"+" vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);"+" vec3 ecPos = (vec3(ecPos4))/ecPos4.w;"+" vec3 eye = vec3(0.0, 0.0, 1.0);"+" float shine = 1.0;"+" if(usingMaterial)"+" {"+"  shine = material.shininess;"+" }"+" if(lightingOn)"+" {"+"  for(int i = 0; i < C3DL_MAX_LIGHTS; i++)"+"  {"+"   if(lights[i].isOn) "+"   {"+"    if(lights[i].type == 1)"+"    {"+"     c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);"+"    }"+"    else if(lights[i].type == 2) "+"    {"+"     c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);"+"    }"+"    else if(lights[i].type == 3)"+"    {"+"     c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);"+"    }"+"   }"+"  }"+" }"+" if( usingMaterial ){"+"  frontColor = vec4( material.emission + "+"                       ambientLightColor + "+"                       ambient * material.ambient + "+"                       diffuse * material.diffuse + "+"                       specular * material.specular,1.0); "+" }"+" else{"+"  frontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);"+" }"+" gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);"+" texCoord = vec4(Texture,1.0);"+"}";var isDone=false;c3dl.std_callback=function(renderingObj)
{var progObjID=renderingObj.getProgramObjectID();var geometry=renderingObj.getGeometry();var renderer=renderingObj.getRenderer();var glCanvas3D=renderingObj.getContext();glCanvas3D.useProgram(progObjID);var modelViewMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.PROJECTION);var projectionMatrix=c3dl.peekMatrix();c3dl.matrixMode(c3dl.MODELVIEW);var modelViewProjMatrix=c3dl.multiplyMatrixByMatrix(projectionMatrix,modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewMatrix",modelViewMatrix);renderer.setUniformMatrix(progObjID,"modelViewProjMatrix",modelViewProjMatrix);for(var coll=0;coll<geometry.getPrimitiveSets().length;coll++)
{var currColl=geometry.getPrimitiveSets()[coll];var mat=currColl.getMaterial();if(mat)
{renderer.setUniformf(progObjID,"material.emission",mat.getEmission());renderer.setUniformf(progObjID,"material.ambient",mat.getAmbient());renderer.setUniformf(progObjID,"material.diffuse",mat.getDiffuse());renderer.setUniformf(progObjID,"material.specular",mat.getSpecular());renderer.setUniformf(progObjID,"material.shininess",mat.getShininess());renderer.setUniformi(progObjID,"usingMaterial",true);}
else
{renderer.setUniformi(progObjID,"usingMaterial",false);}
var normalAttribLoc=glCanvas3D.getAttribLocation(progObjID,"Normal");if(normalAttribLoc!=-1&&currColl.getNormals())
{var NormalMatrix=c3dl.inverseMatrix(modelViewMatrix);NormalMatrix=c3dl.transposeMatrix(NormalMatrix);renderer.setUniformMatrix(progObjID,"normalMatrix",NormalMatrix);renderer.setVertexAttribArray(progObjID,"Normal",3,currColl.getVBONormals());}
else
{glCanvas3D.disableVertexAttribArray(normalAttribLoc);}
var usingTexture=false;var texAttribLoc=glCanvas3D.getAttribLocation(progObjID,"Texture");var texID=renderer.texManager.getID(currColl.getTexture());if(texID==-1&&currColl.getTexture())
{renderer.texManager.addTexture(currColl.getTexture());}
if(texID!=-1&&currColl.getTexture()&&currColl.getTexCoords()&&texAttribLoc!=-1)
{glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,texID);renderer.setVertexAttribArray(progObjID,"Texture",2,currColl.getVBOTexCoords());usingTexture=true;}
else
{glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);glCanvas3D.disableVertexAttribArray(texAttribLoc);}
renderer.setUniformi(progObjID,"usingTexture",usingTexture);renderer.setUniformi(progObjID,"lightingOn",true);renderer.setVertexAttribArray(progObjID,"Vertex",3,currColl.getVBOVertices());glCanvas3D.drawArrays(renderer.getFillMode(),0,currColl.getVertices().length/3);}}
c3dl.psys_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"uniform sampler2D myTex;"+"uniform int usingTexture;"+"varying vec4 texCoord;"+"void main(void) {"+" if( usingTexture == 1 ){"+"  vec3 texel = vec3(texture2D(myTex, texCoord.xy));"+"  gl_FragColor = vec4(texel,1.0) * frontColor;"+" }"+" else"+" {"+"  gl_FragColor = frontColor;"+" }"+"}";c3dl.psys_vs="varying vec4 frontColor;"+"varying vec4 texCoord;"+"attribute vec3 Vertex;"+"attribute vec4 Texture;"+"uniform vec4 Color;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 rot;"+"void main(void){"+" frontColor = Color;"+" gl_Position = modelViewProjMatrix * vec4( Vertex, 1.0);"+" texCoord = rot * vec4(Texture.x - 0.5, Texture.y - 0.5, 1.0, 1.0);"+" texCoord.x += 0.5;"+" texCoord.y += 0.5;"+"}";c3dl.point_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"void main(void){ "+" gl_FragColor = frontColor;"+"}";c3dl.point_vs="attribute vec3 Vertex;"+"attribute vec3 Color;"+"varying vec4 frontColor;"+"uniform vec3 attenuation;"+"uniform mat4 modelViewProjMatrix;"+"uniform mat4 viewMatrix;"+"void main(void){"+" vec4 v = vec4(Vertex, 1.0);"+" float d = length(vec3(viewMatrix * v));"+" gl_PointSize = 1.0/(attenuation[0] + (attenuation[1] * d) + (attenuation[2] * d * d));"+" frontColor = vec4(Color, 1.0); "+" gl_Position = modelViewProjMatrix * v;"+"}";c3dl.point_sphere_fs="#ifdef GL_ES\n"+"precision highp float;\n"+"#endif\n"+"varying vec4 frontColor;"+"void main(void){ "+" gl_FragColor = frontColor;"+"}";c3dl.point_sphere_vs="attribute vec3 Vertex;"+"varying vec4 frontColor;"+"uniform vec3 Color;"+"uniform mat4 modelViewProjMatrix;"+"void main(void){"+" frontColor = vec4(Color, 1.0); "+" gl_Position = modelViewProjMatrix * vec4(Vertex, 1.0);"+"}";c3dl.Texture=function()
{var textureImage=null;var isSetup=false;this.getTextureID=function()
{return textureImage.ID;}
this.getAbsolutePath=function()
{if(textureImage!=null)
{return textureImage.src;}
else
{c3dl.debug.logError('getTexturePath() error - texture has not been setup.');return false;}}
this.getRelativePath=function()
{return textureImage.relativePath;}
this.getIsSetup=function()
{return isSetup;}
this.setup=function(glCanvas3D,source,sourceCanvas)
{var returnCode=true;if(source!=null&&glCanvas3D!=null&&this.getIsSetup()==false)
{if(sourceCanvas==null)
{textureImage=new Image();textureImage.src=source;textureImage.relativePath=source;}
else
{textureImage=document.getElementById(sourceCanvas);textureImage.relativePath=sourceCanvas;}
textureImage.glCanvas3D=glCanvas3D;textureImage.ID=glCanvas3D.createTexture();glCanvas3D.activeTexture(glCanvas3D.TEXTURE0);textureImage.setupWebGL=function()
{glCanvas3D.bindTexture(glCanvas3D.TEXTURE_2D,this.ID);}
textureImage.resizeImage=function()
{var w=c3dl.roundUpToNextPowerOfTwo(this.width);var h=c3dl.roundUpToNextPowerOfTwo(this.height);var canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;var context=canvas.getContext('2d');context.drawImage(this,0,0,w,h);this.canvas=canvas;}
textureImage.texImage2DWrapper=function(){try
{this.glCanvas3D.texImage2D(glCanvas3D.TEXTURE_2D,0,glCanvas3D.RGBA,glCanvas3D.RGBA,glCanvas3D.UNSIGNED_BYTE,this);}catch(ex){this.glCanvas3D.texImage2D(glCanvas3D.TEXTURE_2D,0,this,false);}}
textureImage.onload=function()
{this.setupWebGL();try
{this.texImage2DWrapper();this.glCanvas3D.generateMipmap(glCanvas3D.TEXTURE_2D);this.isSetup=true;}
catch(ex)
{c3dl.debug.logError('Texture exception: '+ex);}};if(sourceCanvas!=null)
{textureImage.onload();}
if(this.getIsSetup())
{returnCode=true;}}
else
{c3dl.debug.logError('null value was passed into texture load function or texture was already setup');returnCode=false;}
return returnCode;}}
c3dl.TextureManager=function(gl)
{this.currentID=1;this.keys=[];this.values=[];this.glCanvas3D=gl;this.addTexture=function(relativePath)
{if(this.getID(relativePath)==-1)
{var texture=new c3dl.Texture();if(texture.setup(this.glCanvas3D,relativePath))
{this.keys.push(texture.getTextureID());this.values.push(texture);this.currentID++;}}}
this.addTextureFromCanvas2D=function(sourceCanvas)
{if(this.getID(sourceCanvas)==-1)
{var texture=new Texture();if(texture.setup(this.glCanvas3D,'deleteme',sourceCanvas))
{this.keys.push(texture.getTextureID());this.values.push(texture);this.currentID++;}}}
this.hasTexture=function(relativePath)
{return this.getID(relativePath)==-1?false:true;}
this.removeTexture=function(relativePath)
{if(this.getID(relativePath)!=-1)
{}}
this.getID=function(relativePath)
{var id=-1;for(var i=0,len=this.values.length;i<len;i++)
{if(this.values[i].getRelativePath()==relativePath)
{id=this.keys[i];break;}}
return id;}
this.toString=function(delimiter)
{if(!delimiter||typeof(delimiter)!="string")
{delimiter=",";}
var str="";for(var i=0,len=this.values.length;i<len;i++)
{str+="ID = "+this.keys[i]+delimiter+"Path = "+this.values[i].getRelativePath();if(i+1<this.values.length)
{str+=delimiter;}}
return str;}}
c3dl.hasCorrectDimensions=function(texture)
{var isCorrect=false;if(texture.width<=1||texture.height<=1)
{c3dl.debug.logWarning('Texture '+texture.src+' is too small.'+'Dimensions are: '+
texture.width+"x"+texture.height+". "+'<br/>Texture was resized.');}
else if((texture.width&(texture.width-1))||(texture.height&(texture.height-1)))
{c3dl.debug.logWarning('Texture '+texture.src+' must have a width and height of a power of 2.'+'Dimensions are: '+texture.width+"x"+texture.height+". "+'Dimensions must be something like: 2x2, 2x4, 4x4, 4x8, 8x8, 16x8, 16x16, etc..'+'<br />Texture has been resized.');}
else
{isCorrect=true;}
return isCorrect;}
c3dl.isContextSupported=function(contextVersion)
{var isSupported=true;var dynamicCanvas;var contextString;if(contextVersion!=c3dl.GLES_CONTEXT_20)
{return false;}
try
{if(dynamicCanvas=document.createElement('canvas'))
{dynamicCanvas.getContext("moz-glweb20");}}
catch(err)
{isSupported=false;}
return isSupported;}
c3dl.copyObj=function(object)
{if(object instanceof Array)
{return object.slice();}
else
{var obj=new Object();for(i in object)
{obj[i]=object[i];}
return obj;}}
c3dl.isPathAbsolute=function(path)
{var isAbsolute=false;for(var i=0,len=path.length;i<len&&i<8;i++)
{if(path.charAt(i)==":")
{isAbsolute=true;}}
return isAbsolute;}
c3dl.getPathWithoutFilename=function(path)
{var pathWithoutFilename="";if(path!="")
{var lastForwardSlashPos=path.lastIndexOf('/');var lastBackSlashPos=path.lastIndexOf('\\');var lastSlashPos=lastForwardSlashPos>lastBackSlashPos?lastForwardSlashPos:lastBackSlashPos;for(var i=0;i<lastSlashPos+1;i++)
{pathWithoutFilename+=path[i];}}
return pathWithoutFilename;}
c3dl.getObjectPosition=function(obj)
{var currleft=0;var currtop=0;if(obj.offsetParent)
{do
{currleft+=obj.offsetLeft;currtop+=obj.offsetTop;}while(obj=obj.offsetParent);return[currleft,currtop];}}
c3dl.isValidColor=function(color)
{if(color instanceof Array)
{if(color.length==4)
{for(var i=0;i<4;i++)
{if(isNaN(color[i]))return false;}
return true;}}
else
{return false;}}