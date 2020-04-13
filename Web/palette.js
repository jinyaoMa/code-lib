/**
 * Palette
 * 
 * Example: 
 * 
 * @author jinyaoMa 2020-04-09
 * 
 */

class Palette {
  constructor(imgDom) {
    this.canvas = document.createElement('canvas');
    this.setImage(imgDom);
  }
  setImage(imgDom) {
    this.canvas.width = imgDom.naturalWidth;
    this.canvas.height = imgDom.naturalHeight;

    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(imgDom, 0, 0);

    let imgDataObj = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let imageData = imgDataObj.data;

    this.colors = [];
    for (let i = 0; i < imageData.length; i += 1) {
      // every 3 r/g/b values are filled into colors and every alpha value was skiped by the loop
      let r = imageData[i++];
      let g = imageData[i++];
      let b = imageData[i++];
      let a = imageData[i];
      if (a > 0) { // remove transparent colors
        this.colors.push(new Palette.Color(r, g, b));
      }
    }
  }
  __extractColors(colors) {
    if (colors.length < 16) {
      return colors.sort();
    } else {
      let newColors = [];
      for (let i = 0; i < colors.length; i += 1) {
        // get average for every pair of colors
        let left = colors[i];
        let right = colors[++i];
        if (right) {
          newColors.push(new Color(
            (left.R + right.R) / 2,
            (left.G + right.G) / 2,
            (left.B + right.B) / 2
          ));
        } else {
          newColors.push(left);
        }
      }
      return findTargetColors(newColors);
    }
  }
  extractColors(callback) {
    typeof callback === 'function' && callback(this.__extractColors(this.colors.concat()));
  }
}

Palette.Color = class {
  constructor(r, g, b) {
    this.R = Math.floor(Math.abs(r % 256));
    this.G = Math.floor(Math.abs(g % 256));
    this.B = Math.floor(Math.abs(b % 256));
  }
  setAlpha(a) {
    if (a > 1) {
      this.A = Math.abs(a % 256 / 255);
    } else {
      this.A = Math.abs(a);
    }
  }
  localeCompare(that) {
    return this.toString().localeCompare(that.toString());
  }
  toString() {
    let r = (this.R < 16 ? '0' : '') + this.R.toString(16);
    let g = (this.G < 16 ? '0' : '') + this.G.toString(16);
    let b = (this.B < 16 ? '0' : '') + this.B.toString(16);
    return `#${r}${g}${b}`;
  }
}