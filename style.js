const fs = require('fs');
const path = require('path');
const getPixels = require("get-pixels");

saveCss(1,386);

function saveCss(start,end){
  let promise_arr = [];
  let css = [];

  function promisePixels(j){
    return new Promise(function(resolve,reject){
        getPixels(path.join(__dirname,'images/gif100',j+'.gif'), function(err, pixels) {
          if(err) {
            reject(err);
          }
          resolve(pixels);
        });
    });
  }

  for(let j=start; j<=end; j++){
    var p = promisePixels(j);
    promise_arr.push(p);
    p.then(function(pixels){
      let imageData = pixels.data;
      css.push('.pokemon-'+j+'{ background: rgba('+imageData[imageData.length-4]+','+imageData[imageData.length-3]+','+imageData[imageData.length-2]+','+imageData[imageData.length-1]+')}');
    })

  }

  Promise.all(promise_arr).then(function(){
    let style = `body,div,canvas{ margin: 0; padding: 0; }\n.app{ display: flex; flex-wrap: wrap; width: 1080px; margin: 0 auto; }\n.pokemon{ display: flex; width: 180px; height: 150px; justify-content: center; align-items: center; position: relative; }\n.pokemon-info{position: absolute; left: 0; bottom: 0; right: 0; padding: 4px; font-size: 12px; background: rgba(0,0,0,.2); color: #fff; width: 100%; box-sizing: border-box; }\n.pokemon canvas{ position: relative; z-index: 2; }\n`;
    fs.writeFileSync(path.join(__dirname,'demo','style.css'),`${style}`+css.join('\n'));
  });

}