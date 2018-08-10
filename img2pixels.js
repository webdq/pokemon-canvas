const fs = require('fs');
const path = require('path');
const getPixels = require("get-pixels");

saveData(1,151);
saveData(152,251);
saveData(252,386);


function saveData(start,end){
  let promise_arr = [];
  let pokemon_all = {};

  function promisePixels(j){
    return new Promise(function(resolve,reject){
        getPixels(path.join(__dirname,'images/gif',j+'.gif'), function(err, pixels) {
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
      let img_width = pixels.shape[1];
      let img_height = pixels.shape[2];
      let arrbox = [];
      let row = [];
      let rect = [];
      let color = [];
      let json = {};

      for(let i=0; i<imageData.length; i++){
        if(i%4 === 0){
          arrbox.push('rgba('+imageData[i]+','+imageData[i+1]+','+imageData[i+2]+','+imageData[i+3]+')');
        }
      }

      for(let i=0; i<arrbox.length; i++){
        if(color.indexOf(arrbox[i]) == -1){
          color.push(arrbox[i]);
        }
      }

      for(let i=0; i<arrbox.length; i++){
        let index = color.indexOf(arrbox[i]);
        row.push(index);
        if(row.length == img_width){
          rect.push(row);
          row = [];
        }
      }

      pokemon_all[j] = {
        "width": img_width,
        "height": img_height,
        "color": color,
        "rect": rect
      }

      json[j] = {
        "width": img_width,
        "height": img_height,
        "color": color,
        "rect": rect
      }

      fs.writeFileSync(path.join(__dirname,'src/poke_modules','poke_'+j+'.js'),'module.exports = '+JSON.stringify(json));
    })

  }

  Promise.all(promise_arr).then(function(){
    let pokes = JSON.stringify(pokemon_all);
    fs.writeFileSync(path.join(__dirname,'src/poke_modules','poke_'+start+'_'+end+'.js'),'module.exports = '+JSON.stringify(pokemon_all));
  });

}