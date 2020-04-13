const going = {
  decay: 0.9,
  growth: 0.1,
  timerTop: null,
  timerBottom: null,
  top() {
    let that = this;

    cancelAnimationFrame(that.timerBottom);
    that.timerBottom = null;

    cancelAnimationFrame(that.timerTop);
    that.timerTop = requestAnimationFrame(function fn() {
      if (window.scrollY > 1) {
        window.scrollTo(0, window.scrollY * that.decay);
        that.timerTop = requestAnimationFrame(fn);
      } else {
        window.scrollTo(0, 0);
        cancelAnimationFrame(that.timerTop);
        that.timerTop = null;
      }
    });
  },
  bottom() {
    let that = this;
    let min = 1;
    let total = document.body.scrollHeight - window.innerHeight;
    let left = total;

    cancelAnimationFrame(that.timerTop);
    that.timerTop = null;

    cancelAnimationFrame(that.timerBottom);
    that.timerBottom = requestAnimationFrame(function fn() {
      if (left > 1) {
        window.scrollTo(0, window.scrollY + left * that.growth + min);
        left = total - window.scrollY;
        that.timerBottom = requestAnimationFrame(fn);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
        cancelAnimationFrame(that.timerBottom);
        that.timerBottom = null;
      }
    });
  }
}