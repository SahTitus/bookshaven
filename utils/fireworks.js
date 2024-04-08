import confetti from "canvas-confetti";

export const runFireworks = () => {
    var end = Date.now() + (3 * 1000);

// go Buckeyes!
var colors = ['#bb0000', '#ffffff', '#172b35', '#df517a'];

(function frame() {
  confetti({
    particleCount: 4,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  }); 
  confetti({
    particleCount: 4,
    angle: 120,
    spread: 55,
    origin: { x: 1},
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
}