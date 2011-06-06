/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

// functions for initialization
c3dl.mainCallBacks = [];
c3dl.preloadModels = [];

//Function to call the various versions of requestAnimationFrame
//To be updated when this is properly standardized.
window.requestAnimFrame = (function(callback){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

/**
 @private
 Add a progress bar for each canvas on the page.  Place them in the
 middle of each canvas.  The progress bar is an animated gif placed 
 in the center of the screen.  
 
 The primary purpose of using a progress bar is to notify users
 that collada model files are being parsed.   When the collada
 Queue becomes empty, it will automatically call removeProgressBars().
 */
c3dl.addProgressBars = function ()
{
  // get all the canvases in the DOM.
  var canvases = document.getElementsByTagName('canvas');

  // add a progress bar for each of the canvases.
  for (var i = 0, len = canvases.length; i < len; i++)
  {
    // to place the loading gif in the center of the canvas, we'll need to
    // get the absolute position of the canvas.
    var pos = c3dl.getObjectPosition(canvases[i]);
    var xOffset = pos[0];
    var yOffset = pos[1];
    var progressBar = document.createElement("img");
    progressBar.src = "data:image/gif,GIF89ad%00d%00%F4%00%00%ACp%BF%00%00%00%60%3EjF-N%24%17((%1A-%3E(E%12%0C%15%0C%07%0D%1D%13!8%25%3F3!9U7%5EZ%3Bd%18%0F%1B%00%00%00O4X.%1D3%06%04%07%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%1ACreated%20with%20ajaxload.info%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%DF2%0A%03%C3G%2C%02%04%84%87%F2A%10%18%9F%B9%C4r%99%80Zi%8C%E9tx%ED%BA%16%DA%E5%C2K%5E%81%C3%8Fq%D9%07)%24%22%90%D6%00%FD%18%AC%7B%03%89%5E_h%1D%C2%07w%3C%10%7B%85v%2B%0D%0ES%07N.%0D%10%8D%82'%05%85%7B%04.%03%0BA0%02%0AA%91%92%24%09%95zUF%10%06%9E%5C%A1%24%11%A4%12%A6E%0D%9E%06%0D%AC%25%84%A4%87F%8F%A0%B7%22%94%85%7D%BF%82%03%09%0E%09%BB%C4%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%2B%02%03%9F%D6E%0C%07%08%DF%07%CA%DB9%02%DE%DF%E0%B6%E3%0CB7%03%E7%EF%0A%E3%10%0B%F4%AB3%0A%EF%E7%97%DB%06%F4%9B5%EE%F2!%88%B7-S%3D%1B%E5%04%A6%B3%26%00U%9C%1B%0D%F2%89%1BG.%95%82%85%143j%DC%C8%B1%A3%C7%8F%20C%8A%1CI%B2%A4%C9%93(%25%FF%090P%80%C0%02_)M%209%40%F3%80%03%98%1E!%3C%5C1%80%26%82%9AjP(9%B1%C4DQ%12SJ%0C%15%B1t%E9%88%A4)%04%2C%88%A0%89%05%81%9A5%1D%A8p%FA%F4%01%00%AEC%C1z%15%DBu%AC%D7%AE-%20P%8D%10%C1%DE%A4%9F%3Emn%3D%8B%D4l%DD%A3L%ED%A2%CD%0B5%EFW%BA'%D4%AE%C5x%C2%00V%9AA%89%02%F6K%B61%60%A7a%1D%AB%90%3A%95%E0%8A%04Xo%CE%E5%FAwq%E4%BB%9E%E96%0D%BD%18%05%04%B7QY%BA%C4%19%B3%B5%EB%D7%B0c%CB%9EM%BB%B6%ED%DB%B8s%AFAM%DB%80%83%DF%96%C7%09%E0-%C3%F7o%E0%14%D5%16%80s%E3%D8o%9B%9A%19%16X%BE%FC%C6%F3%E3%0E%88%3Fk0%9D%3Ak%17%CE%B1%7Fw%26%20%02%F5%08%ED%8E%DB%0C%5EM%F9%02%C23%8C!3%B0q%BC%EE%FB%F8%F3%EB%DF%CF%BF%FF%0E%06n%14%B0%D3%13%10%0C%A0%9D%24%0C%24p%8Cv%82%03%12%B1%00%01%10%D2%C7%CC%02%C8%2C8L%11%10%10%D0%12%84%F0%85%12%C1%82%0B%3E1%00%84%246%C8%CA%02%0AV%98%98%0F%0D%40%B8a%87%924%A0%E0%82%07%9A%C0%40%8D%26%18%40%E2D%B7%CCB%15%8E%23p%97%80%860%A2%D0%40%03%F6%8D%D3%D2%90%09%5C8%9B%8C%040I%40%911!!e%02I%A2%F4%20%93%EC%C9%26U%94%2F%F9'%E6%98d%96i%A6%08!%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%DF2%10%08%C3G%2C%02%04%03%84D%82%18%08%8C%D0%DC%E0%B1%AC%0E%A2X%1ACY%5D%22%86%D9%B0%0B%D2%EDB%C4%E8%15%B9%BC%3C%A7%7DH%85%B3%25%60%2F%9F%2B%C1%02%F18%2C%DE%2B%0C%07%08%84%07%60%2B%0Bl%7Fy%0E%0F%8E%8E%07%80(%02%83%84%85%0D%2C%0D%89U%0Bx*%11%8F%A1%8B%92%24I%96%96%06.H%10%98-%12%A1%8F%08%A4%25%0A%A7%96%0AE%B0%A1%B3%24%06%B6%84%B8D%BA%8E%B2%BC%22%94%BF%9E%3D%05%C3%A3%C6%03%95%84WEu%B0%0E%CA%C6%0D%0A%04%0A%D8p%CCT%05%DE%C6%E4%E5%E6%E7%E8%E9%EA%EB%EC%ED%E4%02%02%AC%E3%EE%3C%02%11%07%F8%04%F3%F48%F6%F8%FF%04Z%F1%13%D1%80%C1%3EU%FF%12%1E%E2%D7%C0%80%82n6%20%24%FC%97j%20%00%06%0F%15%2C%94%D1%60%22%3E7%03%B5)0%20p%86%00%02%13%13%FF%94%A4'%A0%E0J%93(%F1%A9%B4H%A4%A5%01%06%2Fi%EA%DC%C9%B3%A7%CF%9F%40%83%0A%1DJ%B4%A8%D1%A3H%93%BA%13%C0%C0%E1%1C%A5y%0C8%98%EA%A0%93Qx-%1A88%40%D5%C14%14%8EN%3C21%96%C4.%B3%0FF%84%05%B0Vm%D9I%06%16%2C%00%99B%EAT%AE%0E%22%A8h%EB%96m%DA%BE%7C%C3%06%FE%EB7%ED%E0%AC%0A%E4ZUa%B7%AB%DE%14%7CE%08%26%5C%F8%F0a%C9%B0%D0%FAU%A1I%F1A%00Z%B7R%FD*%962%E6%CD%80)O%D6%7C%FA%ED%E6%C8%25%04%C4%9D%DB%A2q%D5%83g%DD%9A%5E%AD%7B7%E1%B5%91%5D%A7%C0J%A7%A9%81%A7P%93%2B_%CE%BC%B9%F3%E7%D0%A3K%9FN%BD%3A%BF%8D%D2%19%2CHP%80%AEE%A69%18%24p%90%A0%BCw%96%0A%22%188%1Fc%01%F9%F1%DC%3F%9F%13%90%3E%C2%82%8A5%22%C0%87%8F%9D%5D%83%08%F6%01(%9F%0A%0A%94%F7%9E8%DF%19%00%E0%A0%7D74P%1E%7F%3A!%11%C1%009%C5%A0%89%7D%FD%F13%A0u%1Cv%E8%E1%87%20%86(%225qA%84EK%19%CEr%12%01%09%10%A0O%14%10DP%40%04%EC%CD2%00%8B8%E2W%93%8C3FP%A1%24%06%B4(%A43%3E4P%C0%8CG%FE%08%C8%8DB%12%40Z%91%3C%CE%A8%E4%1B%FF%09%19%C1%86%220%90%22%0A%0C%C8%E8c%3AL%0D0%C0%96%254%E4%22rY5%80%25%3D%06%14%E0%A2%93%D3%19%E9%A2%9B%05L%A9%94%3Do%12p%E5t7%BA%09%E7t%F1%24%06%C1%9A%23%16j%E8%A1%88%82%18%02%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%19%A3%80%40%14%18%C1%A4%8Eq(%16%0FH%A5%94Fp%3A%09%D3l%CCj%D5z%5B%5C%E77(%604%5E%89p%C2%05)%10%0A%90%F1J%109%D8%0B%82%16%84%2B%89%B3%0A%12%81%81%03r)u%08v%07XzM%08%0E~%2B%03%82%93%90%85%23%0D%89%89%08g.%02%9C-%04%93%82%05%96%25L%9Av%06%40%09%A2%81k%A5%97%99%89Q%3E%AC%AD%11%B0%24D%99%AF%3F%92%AD%95%B0%02%04%89%0E%9F%3F%80%93%A4%B9%A6%0A%C1%40%03%09%0E%09%84%CC%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%E0%DA%02%0B%08%0F%08%0B8%03%04%0E%0E%AA%E1%22%02%0E%0F%F3%F3%076%03%0E%07%EC%0E%0A%EF%00%05%F4%02%A2%A3!m%1F%BB%3C%E1%24%04%A4%E7%A0%86%C1%7C%0Eh%7D%5B%18%B0FA%7D%07%DFQ%9C%87%A0%86%81%87%FD%DE%01%A48%90%86%81%82!%DF%FF%09P%18%D0%1E%0E%89%FE%04%8C%94%10%01%A1%BF%9B8s%EA%DC%C9%B3%A7%CF%9F%40%83%0A%1DJ%B4%A8%D1%14%02%20%408vtE%83u%D2%9E5%3D%91%A0%EA4%076O%CC%D3%BA%B5%04%3D%AF_It%05%D0u%AC%88%8A*%18(0%C0%F4%04%03iV%A9%A90%7B%F6%01Y%BB%23%B6%9A%D5%8B%B7n%5E%BEb%FB%AEP%40%D8%5D%DA%B8%D2%AA%A1%A0%7B%B7%F1%DF%B0~%F7%F6%A5%18%D8q%8A%B5kAM%83%9B%D5%04c%C0%7F-7%96%1C%1A%F2h%C1'%1A%AC%ED%8C%E2%E9f%A9%81%E9%9A%3E%1D%1B%F5%D8%B2%B6%19%E3H%0A%81%F5%D4%DF%C0%83%0B%1FN%BC%B8%F1%E3%C8%93%2B_%CE%1C%9C%80%01%0B%0C%F8%1E%3E.%01%81%04xr%0E0%00%1B%86%3A%EB%D6S%BE%83%AE%60Aw%17%D1%AE_%2F%F9%CE%C0%82%F7%8Ai%40Po%DD%F0%3B%08%EF%17%C0%94AG%FD%22%9C%10%0C%B0%1F%0D%DB%F5%D6%DC%81%08%26%A8%E0r%82%0C6%E8%A0%08%0C%0Cp%9Ep%06%10%60!%7B%40%08%A0%40%04%D2e%F3%94%1B%16N%88%C3%86%11p%98M%1B%16%BA%11%DF%0F%11%2C%D0%22.%D8%3Ce%A1%85m%F5%60%C0%8B%F6Y%A3%8E%1B9%FE%20%80%01%0A%ACxM%195%A6E%D8%80%C4%0DQ%40%04G(g%C0%92%05%14%D0%23q7Fibrt%2CY%D3r%0D%04X%E4%83%60%86)%E6%98%09%86%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%19%C3P%20%0C%04%C1%A4N%4088%0F%04%A4rJ3%3C%9F%06%AA6V%40%5C%11%85%AD%B8%D5%BC%1E%C2c%A0%80%D1x-%9E%DEC%C4%25%18(%8E%E9U%3D%E1H%18%A4%2B%10f%0E%80*%0C%07%08%89%07%0Cy)%03%0E%90%90Y-%02%0B%90%0B%85)%0D%88%89%8A%99%8D%00%0D%7C%0E%07%90%09mt%A8-%06%9D%AD%03%A0%25%0C%91%B3%8C%3F%0A%AD%9D%0A%B0%24%A2%A4%90%A5%B5%3E%B7%B8%08%93%BB%22%06%B3%0E%BAj%C4%07%9F%A0%02%0A%91%0A%AA%3F%03%AD%07%AF%C7%25k%D0%3E%0D%0A%04%D5%DC%E5%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%EA%02%10%11%09%05%108%0D%0B%11%0B%C1%F0%02%05%12%02%06%DCFCT%02%3E%09%FA%B9%1B%20%B0%E1%3D%1A%0A%10%F2)%F0-%5D%82%86%02%D1%CC%A0%87%B0%8FBv%0E0%06LP%C3%D2%C1%3E%14%E1%FF%01%B8(r%0E%0D%06'%0F%3E%84%C7P%E4L!%0B%EA%DD%7C%F7%0F%A3F%1B%1F%FD%0D8X%00%8F%CA%A3H%93*%5D%CA%B4%A9%D3%A7P%A3J%9DJ%B5%AAUG%0B%F8%D1%11%D0%C0%1A%D4%06%0E%1E%88%7D%90%A0%A2%88J%04%EAyuz%60%ECX%02%2Br%A6%25%902%85%D8%13cM%E4%25%E1%B6%C4%5D%11%7F%FF%8E%E8%7B%C2%80%04%B7c%83%8A%8097%01%01%C5%80%1F%E8%95%2C%18%C0%DD%CA%97%25%0F%D6l93_%CE(%14%20%1E%CB%EC%04%83%C6i%D7~%9E%DC%F9%F3%DE%C8%AD7o%26%0C%BB2%89%05%A3%C5%1A%3B%11%A1q%5D%14%B6%5Bc%A6%0C%DA%B3%EC%DA%C3c%9B0%90%FB%01%E4P%BD%D5%AE%A0%1D%19%B4%F0%E2%AFak%B7%9D%DDD%5B%C4p%F5p5%ABT%C0w%B1e%AF%BE%B0%A3U%BD%FB%F7%F0%E3%CB%9FO%BF%BE%FD%FB%F8%F3%EB%3F%C1u%00%04%F2%F0%09%60%00%01%04b%A2T%03%FF%E1C%20%A4%5D%04%EC%F4N8%0A%90cC%03%0B%12H%90J%10D%A8%C0s%94%10X%C4cII%13!%80z%0C%B0%E0nG5%C0%00%89-%20%D8%00%8B%FB%C5(%E3%8C4%D6h%E3%8D8%BE%C0%C0%8A2%CES%40%04%0E%FA%20%8F%01%09%9E%D3%40%04%3F%FE%08%23%0D%03d%B5%40%90%B04%90d%01%05%A8%C6C%93%0B(%80%E21G%26%19%81%95%3B%40%90e%7B%E7%08%80%24%90S%ACa%00%87%D1t%15%03%03%FE%B1%19%60V%FB%2Ci%D5%3C%FB%A0%A9%DF%3C%FA%E8%99%9F4%11D%F0G%8C*%BA%99%E3%A1%88%26%AA%E8%A2.%84%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40Z%C3%60h%04%8F%3C%83cy0%20%9F6%06s%E9%60%40%AF1%25%D5%D1%C4z%5B%86%C3%D4%A1%F8%9AS%83%EDr%F0j%40%04gVC%11YX%5D%0B%EEr%E1%12%10%0E%80%11pq'%0D%09%87%0E%09w-%03%0B%11l.%7F%80%81%84'%0B%88%87%7C%40%0C%93%9D%83%95%23%11%09%89%A3%09Aa%9D%80%10%A0%24y%98%05A%9C%A9%07F%AC%22%0C%98%09%ABA%09%A9%04%B6%24%0C%05%09%05%BBA%86%93%04%9F%C0f%10%06%8B%CC%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%3E%02%06%0A%03%CB4%02%CE%90%DC%00%03%07%08%EB%07%D03%A2%09%04%CA%DC%0D%EA%EB%EC%E20%10%F1%FCN%DB%0A%F7%02%9A%931%80%1F%81%04%9A%B4%11%08x%AF%0C%8D%01%07%23%3A%D4%06%90!%82%812%22D%9C%B7%AD%81%C5%03%F9%60%08hd%20%E4%B5%01%01%DB%FF%9D%EB%A6%40A%91%950c%CA%9CI%B3%A6%CD%9B8s%EA%DC%C9%B3%A7%CF%2F%E4%8C%FDd%B1%40%82%D1%8B%8C%22%14%F0%87%B3%A8Q%A3%0F0%9A%80%20O%9E%D4%12%0F%1E%9C%C8%AA%15kV%AF_I%84%05%10v%AC%08%AE%5DM4x%CA%16%C1%0A%05%F2%0A%C8%5Ba%F6%ACV%B3_%F1%DEMK6-%D7%BEb%F9%9E%80%C0%96%ADP%13%0B%E4V%A5%2B%18%B0%DE%BF%23%F2%F2%1D%8BV%2F%E0%13%03%0A%3F%3D%5C%82j%D5%AB%81MH%0Em%D9%B2%DD%BE%93%F7%A2%10%A0Y%82%DB%15%03%94%86c%5C%17rd%D5%B7k%FB%ED%AA%BBq%2B%CD%A0%87%8Ep%EA%3A%B8%F0%11%02%18p%3E%CE%BC%B9%F3%E7%D0%A3K%9FN%BD%BA%F5%EB%7D%0Ad%95%20(G%03%93%D6XWv%00%BE%05%04%A5%11%96%5B%D3%5E%F9A%C2wJ%0Bt%DF%D6%3E%EB%EB%19%0D%0A%C8%D7_K%5B%FD%BA1D%10%DF%7C%DAHP%DF%0164%90Xvz%E7%B0W%D9%7B%E3%C0%24%C0%01%95!8%9D%00%00%3D%80%00%84%D8u%E8%E1%87%20%86(%E2%88%DD%18%10%81%02%E5%ED%D0%00%03%FDEc%A2%23%13%1D%D3%12%8A%D38RG%04O0%D0%92%01%EAUb%80%8DL%C9%E8R%8Aq42%DB%13%2B%12%B9R%03-R%D7%C8%02%C61'%C0%02%0B(%B0%80%92%3FMI%E5%95%D6A%40e%8F%CFaI%E2%98d%96i%26%88!%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%40Z%83%C1h%04%8F%BCFb%990%22%9F5%06%D3%91%20%08%A0%D8%18dIM8%18%D9pkK-C%C4%E8%94%A0%EBM%5C%5D%0D%C8%3B%AD%12%40%0C%F2%17%D9%7Bn%09%0Cm%03st%25%02%0BU%09%11%60.%02%03%82%2F%06%0E%92%92%03%84'%5B%04%88%95%40R%0E%07%92%07V%96%25%06%99%A6%0BA%0C%93%AB%7D%A3%22%03%A6U%06%A9%9F%9E%93N%AE%00%0C%04%A6%A2A%0A%AB%0E%B3%B9%23%0C%06%0B%0A%83%3F%0D%06%B5%C9%C4%84%10%10%8B%D0%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%3F%02C%02%CA3%E2%10%B8%E0%02%05%07%ED%11%E51%B0%BC%06%F0%D9%0D%04%ED%F9%EF5%02%04%05%BC%04%A8uc%D0%0EA%BE%03%E9b%DC%E3%F5o%937%05%07%0D%1E%10%A8%10%20%AFV%DD%20%1C%CC%970%86%81%7F%04%16%D4%C3%D6%C0S%3E%04%05F%FF%FAa0%20%0F8%00%25%F3%F9z%C9C%00%03%05%0D%3A%D2%DC%C9%B3%A7%CF%9F%40%83%0A%1DJ%B4%A8%D1%A3H%93%22%B1%83Q%E9%8A-%08%10%04%F4c%C0%80N%9F%10%A2j%9D%B8%A2A%84%02%60)%9Ax%F0%E0%04%D9%B2%25%CE%A6UK%82%EC%08%B7%00%E0%BEek%A2%A4%04%ADQ%0B%AC%18P%E0k%04%05%2B%E4%CE%8D%8BV%84%5B%C1%87%0B%13%9E%5B%16%B1%E2%13%0D%F0%E2mZ%02%02%D8%AF%80U%086%DCX%F1Y%C7%8B%07s%FE%DC%B63%0A%01%92%B5R%26%D1%00l%D8%C0%8F%17%83%9E%ED%B9p%E2%DA%A1M%ACI%AD%B7%EB%00%AB*%09o%A6%CB9%B7%F0%C7r%E1%0E%DF%5C%F9%EEV%B1N%2B'%88J%E0jt%126W_%DF%CE%BD%BB%F7%EF%E0%C3%8B%1FO%BE%BCy%3F%03%96%10x%84%A3A%F0k%EB%24%C8%97%9F%D2%C6%9D%BF%EF%AB%0D%98%CF_%BB%0B%03%11%2C%80%1F8%09%F07_o3x%25%60%A4%04%11Xw%8D%03%06%CA%97%80%0D%030%88L~%C4%14%18a%0464P!%1E%2F%ED%17%A1%7F%2F%60XM%7C%FC9%04%9E%1D%11%24B%E2y0%C6(%E3%8C4%06%B5%0EY%12%D4%17%1Ej%9F%3D%E0%80%89P%D8%E1%08%902%14%D0%23Y%A8%40%03%C1%02L%AA%E8%C3%91d!P%CD1%C8%0C%03%04%94%CCY%C2%00%93%0B%BCx%83%04PJY%0DK.%01%11%01%94I%06%95S%89%0E%F4x%C0P%0D(%A0%00t%A7-%80%80%8Fi%02%25%80%9C%06%3C3%DE%1F%7C%12y%143V%9D'h%8D%88%26%AA%E8%A2%8B%86%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%A0p%18%13%2C%12%84%85%80%C8%AC-%08%C8%C4%A2I%85%09%A2P%C2%B2%CAU5%B2%D1Fw%8C*%80%0B%E4%9F%A0!~5%0A%C8B%BB%C5XD%14%F3%B4i%40%E8%1Bb%0D%0C0%0C%09%0E%85%04yz%22_f%7D%89%3D%0B%86%09%93S%8A%24%10%7D%04f%03B%93%85%85%11%96%24_%99%04%10Bp%86%86%95%A2%22%06%9AIC%10%93%92%82%AD%23%0C%03%A7D%10p%05%B6%B7%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CC%CDB%5B%CE%00%06%9F%BB6%0D%0B%05%11%D5%CB%0A%0E%07%0E%DE%9C6%11%D9%D9%D0%C9%02%E0%EA%86%D6%E4%05%EF%8F%C6%0C%DE%E0%DF%0E7%E4%EE%E7%C8%E9%EB%E07%0C%F2mS%D6%8D%9E%83%3F8%1A%EC%E3%06.%01%C2h%3D%80A%9CH%B1%A2%C5%8B%183j%DC%C8%B1%A3%C7%8F%20C%8A%C4a%C4%8C%81%85(%18%FF%0C%BC%98%EE%80%CB%03ZX(%88%10A%C9%8A%07%0FN%E0%CCYbgO%9F%24p%8E%10%0A%80%E8P%A0'%16%BC%3C%80%E0%80%B8%14%01%EDh%BB%C93hN%A3E%AFV%CD%CA%F5%E8Q%ADVYx%5B%0AsE%03%9AvV%FE4!%14%EBN%B7%60%BD%8Ax%0B%B7%EB%89%B1M%5D%A2Y%A1%C0%8EM%15X%E7%C6%15l%97k%5D%C2H%0Do-%11%81%2C%82%A7*%20%A8e%9B8%EB%E2%B6%5B%DF%AE%25%5C%D8%B2%8A%96%2Fc%8EDaD%D3%C9%D1%A8S%AB%5E%CD%BA%B5%EB%D7%B0c%CB%9EM%1BE%03%05%0AN%BF%1E%80%A0wS%894%20%18%80%AC%AC%81o%DF%07P%BE%80%B0%A0%2Fqd%0A%8E%FB~%0E%C3%40%DF%05%0F%95%11%90%DE%5B%81%8D%3A%0B%16L.%16%9D%3B%F5A%06%80'k%C0%F4xr%D7%03%DA7%8D%97Z%80%F5%01%CAk%EB%DF%CF%BF%BF%7Ff%03%7Cr%1Ej%05H%60%A0%81%7B%05%23%00%7C%04%F4%ED0%C0%81%10%8E7%C6m%B85%98C%02%10%1E%98%A0(%0C%E0%A6%80%848%60%98%A1%04%09(h%9D%01%16%9A%60%1Dv.%100%A2%04%A1(%C8%40%8A%A3%1C%F0%96%034B%F0%22%88%C9%D8H%D7%01-%14%08%E1%80%CB%0C%40%D7ND%8E%00A%04%09Le%D1%02G%E2%C4JjPF9%25j%0CD%F9%80z%A3%25pd%89%AD%09%40%C0%5B%A2%B9%D6az%FF%A5%A9%E6%9A6%84%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%A0p%18%13%40%16%0B%88%80%C8%AC%0D%08P%C2%A0I%85%09%22QBdY%ED%AA%1A%05h%B8%D0%F0%9AQ%CF%E8%F4%EC%134%CA%AF%86!%3C%E0%B6%18%83%81%92%9DjD%0A%11%101%0D%0CVX%09Zv%7C%23~%80%80p%40O%88%88k%8B%8C%8E%8FB%0B%93%04%09%95%96%00%8D%8E%8A%3E%06%9D%A7%9F%A0G%05%05%85B%02P%88%04%AE%A0%23%0C%0D%A4%40%02%0A%0B%06%B9%B5%C0%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CCg%BF%CA%0C%0B%11%0B%905%0D%03%BD%CF%C6%0C%09%0E%09%DF%D53%06%11%D3%0A%DA%C3%02%05%DF%DE%09%0A6%0D%D2%D2%11%E1%C7%DC%EC%DE%117%06%F2%E6%CC%E9%DD%EB%16%DC%600%AE_3%08%EB%BE%D1zw%CE%18%04u%0B%166%EB!q%A2%C5%8B%183j%DC%C8%B1%A3%C7%8F%20C%8A%1CI%B2d1%01%03%0C%FF%18%60%D0p%84%80%96%13%05%2Cpp%C0%81%03_%2C%8Ed%5B%F1%E0%C1%89%9E%3EK%00%15%3A%94D%CF%11G%01%24EZ%F4%C4%00%9BP%1D%D0%2B!%13%89%82%A9F%83fU%AA%95%ABW%A6_E%2C%1D%BA4l%8A%08Pk%DE%5C%B1%0B%095%9E%5D%C5%FA%2C%0B%94%EE%DC%AEc%EB%E2%BD%7B6%AAM%039%17(%C0%A9%A2%AC%5C%B3G%ED%22%D6%9AX%B1a%12Oi%DA%3C%80%95*%CC%BAD%E36%CEj8%EFa%CE*dF%25l2%05%CA%C1%2CK%AB%5E%CD%BA%B5%EB%D7%B0c%CB%9EM%BB%B6m%22%84V%C2%2C%D9%20%C1%81%DF%04v%7F%81P%B9X%EF%DF%C8%0B%08%3F!G%C1%D5%83%BF%11%20GP%9C%05%03%E7%0A*%1E3%20%3D%FAo%ED%2Fv9%AF.%8C%01%F2%F3%E4%D9%DE%9A%D8%80%40%F7%DF%5Bd%A7C%1E%7F%B6%1B%25%CBo%EB%DF%CF%BF%BF%FF%1C%E9H%D0%93rC%ECB%C0s%C0%08%E0%80%99%5E%12%E4%07%C3%00%08D(%5D*%7C%2C%A0%D7%80%404%20%A1%84%078%08%04%02%17%3E%A6%83%02%1BJ%08%18(!%8A%98%03%89%25%22%E0%0E(%20%5E(%81%0B%D7%10%E7%02w-Rx%86%85%17%E6%B3%02%3C%12%04)%C1%5B%3F%1EPb%87%C0%1C%A0%17%92%2B%2C%20%A4%90%02%B1%A0!%87%E0%B1%A1%80%92.%B6%24%C0%93O%C2tZ%1D%1CA%C0%A5%90%82%BC%26%E6%98%12%94%E9%1A%03%08%8C%89%40%95%26%0D0%A6%8E%AB%A1%D4%A6%04%08%809%1B%03%10%40%00%E7%7F%80%06*(%0D!%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%A0p(k%40%06%0D%A2%D2%26%88%14%0A%8B%E4r%0A38%9F%03%AA%B6ex%3A%0D%DBp%8AQ%B82%C4h%13C%A18%C3%1A%0DAZeP%18%E4C%03a%9F%9D%9B%AC%0B%11%60B%0D%7B%04%05%04R~%23%11%81%8DC%03%87%86%10%8B%24V%11%11%0AC%10%86%7B%8A%95%02V%0A%9F%40%0B%7B%05%83%95bGn%AA%AE%AF%B0%B1%B2%B3%B4%B5%B6%B7%B8%B9%BA%BBS%02%03%06%7D8%0C%03%94%BB%02%7B%09%04%11x5%0C%0B%CF%C5%B9z%C9%C9%D14%06%CFv%BB%0B%D4%04%09%C14%CE%CF%E0%B7%0A%DE%E7%E43%10%C0%BC%C7%E7%05%BC%3D%A1%0B%03%CC%F1%F7%F8%F9%FA%FB%FC%FD%FE%FF%00%03%0A%1CH%B0%A0%C1%83%BD%20%40%B0%87%D0%04%04%07%09%1C%24j%D1%A0%0E%A9%13%0F%1E%60%CCh%22%A3F%12%1E%3F%8E%E0(%82%24%C9%91%1ES%FF%08%80%C8%92%00%176%9AV%9CD%09%60%26G%9B%1Aq%A2%CC)%B2fO%14%03%12%08%1D%DA*E%1D6%2Cf%96%E4%092dS%9FO%97%3A%A5%A9%94DP%96%11%2F%9A%08e%A0(%8A%AA7%7B%86%7D%AAs%A9O%B1LQ%08%88(Tb%8F%A9%3BK%8C%DD%F9%F3%A4%C9%BAUK%3C%8C8%B1%A1Z%08%0C%18%FA%1DL%B8%B0%E1%C3%88%13%2B%5E%CC%B8%B1c%12M%24d%2C%20%F8%96%D7%19%2BC%3E%40Py%96%02%07%10S%CDX%A0yr%AE%CF%0E%0E%80%16%1D%03A%E9%BC%B1V%82%06%7D%20A%8D%D7%B0a1H%3D%1Bt%8D%03%AF%25%E0%92%CD%1Bb%0D%D2%A5%E1%E1B%3D%3B%1D%0C%E0!%1Dt%96e%80%AF%F3%18%0B%5C%23X0%FD%B1%F7%EF%E0%C3%8BGx%F5%9B%92u%97%FD%14%90%C0%9E%BDr%20%0D%12%1C%40p%80%40w-%10%DA%EB%BF%9EC%FE%81%FF%07%BC%A7%9E~%ED%D9%F6%03%03%00%FEG%9FsVa%24%40%20%7B%06%FA%A0%40%82%00%A6%17F%04%0FJ%E0%92%0Bq%BC%D0%00%80%F4%FD%C7%E0%16%F9%3DhM%0A%0F!%40%DF%89)%F8%07%60%04%AE%0C%40%A0%80(J%A0%E2%8D%2C%9E%20%40%01%00R%F6%0A%04%11%24%10A%8E'%24p%E3%8D%11%B2%D0%40%60%FD%1Cy%E4aN%DEx%18%01QnX%18%82G%1E0%E2A%0D%14%A0b%01%5B%8E'%E6%98d%8A%19%02%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%A0p(k0%1A%0D%A2%D2%26P%2C%22%8A%E4r%0A%83D%AE%11%08u%DB%82%3C%9FZ%AE%18%25xF%16%82%B1%DA%C4%80%40%181dz%9Db%18%18s%A1%B5%10%91%D2K%0C%0BNaA%0D%11%7C%7C~%7F%22%06%0B%8E%06C%0D%88%89%8B%24%5E%82%03C%02%05%88%7D%95%23%02%10%06%10%8A%40%0C%9C%11p%9Fc%02F%AB%AF%B0%B1%B2%B3%B4%B5%B6%B7%B8%B9%BA%BB%BC%3A%AD%A4%BEG%BC%02%06%04%C6%03y4%C4%0A%0A%C9%B7%0C%04%05%C6%04%CE2%0C%CC%A3%BB%03%D3%C6%A5E%06%CC%DE%B5%10%C6%D2%04%E21%A1%E8%B4e%D3%90%BD%3B%A1%03%0D%D5%F0%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF%00%03%0A%1CH%10%90%A3L%05S%08H%F0%A0%E1%83%03%EBz%B5%12P%AF%04%01%87%0E%0F%F0%93D%20%01%1A%15%0C0b%7Cw%A2aI%93%25%1C%FF%A6TI%02%25%00%94.E%60TX%20AG%02%0BT(%10%E9PA%8A%982%1F%BC%14%3A%C2dL%A3D%83%16E%DA2i%9D%9B6%13%A8%3Aa%80g%C3%9C(%80%0E%DD%BA%94%A5%D2%A3Iy6%E5z%A2A%D4%9B%EBBZ%25iB%2B%D3%A5d%B7%82%85%EBU%AE%D3%12%9B%CEbMqQ%A4%C6%9Fu%87%DE%7D%1B%14%A8K%98%83%B5%96%90d%D3%93%8A%85%18%1DD%1CF%AF%22%9B%83%093k%DE%CC%B9%B3%E7%CF%A0C%8B%1EM%3A%DD%80%9A%09%90%F5%9AZc%93%84%D7%AF%0BX%8E%05%A1%E6%02%D62%20%C0%DE%8D%F0%16%84%04%09%1C%04%C7%0D%A3%C0n%D8%09p%E5%15.%7C%AF%8C%04%C7_%3B%C0%C5%208p%E0%11jD%88.!%F9%AD%BC%D6%1D%F8%A4%A1%3Bzo%5B%D5%85%03%9F%BCb%C0q%D9%BA%02%9Da%CF%C2J%82%2C%B3K%EB%DF%CF%BF%BF%FF%D1M%10%10%85%12%02%E0%01%CB%00%07%20%A0%20%A4%02%E7%F9%D0%80%02%0ED%D8%CC'%02%24%B8%A0%82%F4%D1%00%A1%03%07D%C8%16%1D%06%5C%B8%E0x%3E0%C0a%84%11%26%90!%11%0A%88%A8%20%89%3D%98%88%E2%89%C4%8D1%80%8B%08%7C%A8%02%3D%2F%98%15a%87%C2%AD%A8%89%85%0B%1E%90%9F%08VD%F8Q%0B%06%CC%E8%40%83t4%40%E4%015%9A%20%00%87%07d%E9%C0%91%00%10c%9Dj%AB%080%80%02%60%B2%B0%40%96h%1E%E0%DC%0AFpyK%01h%22%90%25%01%9F%11%90f%96%05%7Cf%40%82q%EA%98YuiR%03%9A%98%D1%18%20%E4%7F%88%26%AA%E8%A2%00%84%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%A0pH%13%10%8F8%C8b%01A%3Ae%82%E5%D2%F8%AC%B2%A2R%AAu%8B%1A%2C%14%03%AE%18%D5h%8C%7F%02%86%99(0%80%CF%A8%B6%C2%B0%16%1A%16%91%88%01nb(%FE%0CDyx%0B%7C%25%0D%7F%0AuA%0Axz%86%87jGQzZ%90%97%98%99%9A%9B%9C%9D%9E%9F%A0%A1%A2%A3%3F%0B%08%0F%08%0B%96%A48%07%0F%AF%AF%0E%AB%A0%B32%0B%B0%B8%05%A3%10%11%05%0B%8B2%0E%B8%B0%12%A2%02%BD%C86%C3%B8%A2%0D%05%CF%05%11%C00%A7%CB%0F%C6%D1%D1%116%B7%CB%BA%A2%0C%CF%11M5%02%C2%B8%12%B5%9D%02%D33%C7%12%AF%05%EA%AC%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF%00%03%0A4%01%01%C2%BC%81%24%06%20%90%C0%B0%10%C2%14%03%18J%94%E0P%9F%80%01%D1%C2%ACX8%91a%3B%11%AFN%C021%92%043%93%D7%40%FF%A6%0C%89%92e%17%020%09%90C%01%A1%A3%C4%99%24S%A2%04%E0%92%E7%B5%9E!%81%EA%1C)%B4%05%CC%02%04%7C%A9%A8iS%82F%91%3AG%04%8D%3AlgQ%95'U%FAT%11%13%A6%82%8DM%E7%F5%D4Z%B4%2C%D5%A1%3F%CD%AA0%80%14%26%CE%13%11%3BV%84%3A%B6%A4%D4%B4-%A3n%D5%BA%F7%AE%DE%13l%23%3CU%A1P%E2%DC%874%0D%22%5E%CC%B8%B1%E3%C7%90%23K%9EL%B9%B2e%19%0D%DC(8%F8%90%C1%01%04%A0%11%0C%A6ug%00%E7%15%02%3E%87%06%FDQ%93%00%02%09%60o%AB%A1p5%E8%AF%A1%14%C0%DE%3D%1A%86%02%DB%A0%09%88Z%10%BBx%EF%17%B5m%E3%06e%A08%EC%B70R%DB%3E%D0Z%D3%EE%04%AAlx%0E%7D%E0%B8%A7%01%06%14%DF%B88%E7%F4%E5%F3%E8%D3%AB__%99Ax%CA%AF%0F%7CNP%3D%07%84%02%09%0A%04%BAT%40%BE%FF%04B%40%90%C0%80%0E%24%B0%1F%1F%0D%C8%87%80%7C%7F%08%1C%E8%03~%05%26%E0%C0ac%40%E0%DF%85%7B%00!!%81%09%CC%C6%87%00%0B*(%9F%83%3D%10%17%E1%84%97Dp%E1%01%C2%B90%40%04%0Bxw%02%03%03JH%40%7DU%1C%E3%1F%01%E6%01%B0%80%03%40%A2%E8%02%03x(%E2%1A%048%8E0%40%90%07%00)%23B%0A%04%19%E4r%8E%19%00d%93%40f%F8%18%03R6Ibc%06%60%E9%80%96%91eF%07%7Bh%A6%A9%E6%9A2%84%00%00!%F9%04%09%07%00%00%00%2C%00%00%00%00d%00d%00%00%05%FF%20%20%8Edi%9Eh%AA%AEl%EB%BEp%2C%CFtm%DFx%AE%EF%7C%EF%FF%C0%A0pH%13%10%8F8%81%C1%D0%40%3AeJ%85%C2%60%7CZY%02%A9%B4z%F5-%1C%0F%C4%82%CBbL%19%DD%DF%E1%C1f%3B%C8%ABF3%DD%5B%B4%EF%11%A1%00b%40%D3O%08wm%12B%10%0A%0B%0B~%7F%24%82wB%06%88%0B%06%8B%25%81%8D%0FB%03%91%10%94%24v%8D%05z%03%03%10p%94kw%12%A6%9DG%02%05%12l%05%AB%AC%B4%B5%B6%B7%B8%B9%BA%BB%BC%BD%BE%26%10%11%09%05%A5%BF%3F%03%12%C9%C9%B2%C6%23%B30%10%CA%D2%03%CDJ%11%03s4%AF%D2%C9%09%C6Y%0B%11%11%935%09%DC%C9%0E%C6%0D%E1%11%E1%D92%11%E7%12%DE%BFY%ED%E36%D1%E7%D4%EA%0A%E3%9C5%5CqcV%ED%5D%C0%01%04%12%24%18%F0%AC%99%C3%87%10%23J%9CH%B1%A2%C5%8B%183j%DC%C8%F1%08%84b%1D%5D0%20%80%00A%02%80!U%FF08P%B2%A4%04%94%15%054P%80%8DE%81%96-%1D%18d%84%C9D%1B%9FlJ8%E29%22(%00%A3E%7F%A6%60P%20B%01%82(%20%E0%C4%B93)%D0%A3%3DE%04E%8A%B5%ABU%AD%5B%B3z%5D%A1%E0iS~Q%A7%B6%7C%C6%15%ECX%ACJ%DDrE%DA%88h%DB%12%FE%9A%12%5Bqs%EA%9B%14w%C3%DA%15%2B%F8k%D7%B8%87%C5%9A%60%FA4BU%12%0DX%E2%84%09%B4-%E2%C4%3C-g5%AAY%F1%89%06K%1A%8Eh%40%D2%24%E5%94)%3E%8AF%CD%BA%B5%EB%D7%B0c%CB%9EM%BB%B6%ED%DBA%E4(%60%B0%3A%25%83%04%07%82%EBt%B8%07%5B%EF%14%02%08%04_%9E%E01.%01%0B%08H'G%23%F2%F2%E5%A7uA%90%5E%40%BA%F32%CB%11%2CW%60%0C%A1t%02%05%14%C9%B0~%FD%80z%5E%23%BBK%3F~B%40%04%F1%C1%11%10%F8~%CB%C0y%866%D8%B7%1CT%EA%40%D0%00%7D%C8%EDq%20%9Cn%0C6%E8%E0%83%10F%08%05o%B7e%E1%C0%85%0A%F0%97%C4!%7D%D8b%C0%85%07%60%A8G%01%09%24D%00%82C4%00%DC%85%2C%BE%C7%83%01%25%C6%98%5D%1A%10%B0%08%A2%03.%EE%10%5D%8C%04PG%89%00%09%DC%E8%40%029%EA0%00%8F'%D52%80%8D%0E%F8%B8%82%00%A3%D0g%9F%89%11%A08%04%94A%26%40%85%0B5f9%E3%09%0C%8C%02%92-%0A%BE%20%C0%90C%06i%E5E%5Df%99%E4l%10%B89%E4%97%A8%25%E7%26%91%B5%A9%A8Ps%B75%C0%00%03%1AJ(%E8%A0%84%16%BAB%08%00%3B%00%00%00%00%00%00%00%00%00";
    progressBar.style.position = 'absolute';
    // place the center of the gif in the center of the canvas
    // First get the middle of the canvas then add the offset from the 
    // top or left corner of the screen, then move the image left 
    // (by subtracting) since positioning the image is relative to 
    // the top left corner of the image.
    progressBar.style.left = (canvases[i].width / 2) + xOffset - (50); //progressBar.width/2); progressbar is not yet loaded
    progressBar.style.top = (canvases[i].height / 2) + yOffset - (50); // so its width and height is zero.
    // make it translucent as to not annoy the user too much.
    progressBar.style.opacity = 0.5;

    // try to force this image above all others.
    progressBar.style.zIndex = 100;

    // make sure the id of each progress bar is unique so we 
    // can remove them all later.
    progressBar.id = 'c3dl_progress_bar_' + i;
    document.body.appendChild(progressBar);
  }
}

/**
 @private
 Remove all the progress bars from the page.  Each canvas will have
 a progress bar if the user of the library used addModel() to add
 a model to be parsed. 
 */
c3dl.removeProgressBars = function ()
{
  // To remove all the loading bars, we just need to get the number of
  // canvases on the page.  Since every canvas will have their own loading
  // bar, we know how many bars there will be.  This will allow us to 
  // create the id's of each individual loading bar.
  var numProgressBars = document.getElementsByTagName('canvas').length;
  for (var i = 0; i < numProgressBars; i++)
  {
    // generate the id's of the progress bars
    var progressBarID = 'c3dl_progress_bar_' + i;
    var progressBar = document.getElementById(progressBarID);
    if (progressBar!=undefined){
      document.body.removeChild(progressBar);
    }
  }
}

/**
 @private
 This is a function which the browser will call once the loading of the 
 page is done.
 
 Once the page is done loading, this function will place all the models 
 the user will use in the course of the script into the ColladaQueue.  
 Once the Queue detects it is empty, it will call all the 'main' 
 functions the user wants to start automatically.
 
 If the user did not provide the library with main functions, it will be
 up to the user to call those main functions.  If the user did not 
 provide the models they will use in their script, references to models 
 may not exit yet when the main funciton is executed.
 */
c3dl.init = function ()
{
  // if the user does not want to parse any collada models,
  // we don't put anything in the queue and go right ahead and 
  // call the main methods.
  if (c3dl.preloadModels.length == 0)
  {
    for (var i = 0, len = c3dl.mainCallBacks.length; i < len; i++)
    {
      // Each element is an object which holds a function 
      // and a tag.  They were both placed in a wrapper
      // object so we can stick to using arrays for simplicity.
      var func = c3dl.mainCallBacks[i].f;
      var tag = c3dl.mainCallBacks[i].t;
      func(tag);
    }
  }
  // otherwise we will let the collada queue call the main methods
  // once all the models have been parsed.
  // By creating collada objects, they will be placed in the queue.
  // Once the queue is empty, the main methods will be called by
  // the Queue.
  else
  {
    // This will add an animated gif to the DOM, letting
    // the user know that there is loading occuring.
    c3dl.addProgressBars();

    for (var i = 0, len = c3dl.preloadModels.length; i < len; i++)
    {
      var preloadColadda = new c3dl.Collada();
      preloadColadda.init(c3dl.preloadModels[i]);
    }
  }
}

/**
 Add a model to the collada queue to be parsed
 before the main funciton is run. Call this function
 once for each collada file your script will use.
 
 @param {string} model - path to a .dae file.
 */
c3dl.addModel = function (model)
{
  c3dl.preloadModels.push(model);
}

/**
 Add a function to a list of functions to call once the
 page is finished loading.
 
 @param {Function} func - the function to call once the web page
 is finished loading.
 
 @param {String} tagName - the tag name of the canvas associated 
 with the function.
 */
c3dl.addMainCallBack = function (func, tagName)
{
  // put both objects into a wrapper object so later
  // we can access the couple as an array access.
  var obj =
  {
    f: func,
    t: tagName
  };

  c3dl.mainCallBacks.push(obj);
}

// This will make sure the c3dl.init() funciton is called once the web page
// is done loading.
if (document.addEventListener)
{
  document.addEventListener("DOMContentLoaded", c3dl.init, false);
}