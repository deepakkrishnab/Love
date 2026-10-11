/* ===========================================================
   confetti.js — lightweight vanilla JS confetti burst, no deps
   =========================================================== */

(function (global) {
  const COLORS = ['#ff6fb5', '#a66bff', '#6fc3ff', '#4ad7d1', '#ffd166', '#ff7a66'];
  const EMOJI = ['🎉', '✨', '💖', '🌈', '🎈', '⭐'];

  function burstConfetti(options) {
    options = options || {};
    const count = options.count || 60;
    const useEmoji = options.emoji !== false;
    const container = options.container || document.body;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';

      const left = Math.random() * 100;
      const duration = 2.4 + Math.random() * 1.8;
      const delay = Math.random() * 0.4;
      const size = 14 + Math.random() * 14;

      piece.style.left = left + 'vw';
      piece.style.animationDuration = duration + 's';
      piece.style.animationDelay = delay + 's';
      piece.style.fontSize = size + 'px';

      if (useEmoji && Math.random() > 0.35) {
        piece.textContent = EMOJI[Math.floor(Math.random() * EMOJI.length)];
      } else {
        piece.style.width = size + 'px';
        piece.style.height = size * 0.6 + 'px';
        piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '4px';
      }

      container.appendChild(piece);

      // Clean up after the animation completes
      setTimeout(() => {
        piece.remove();
      }, (duration + delay) * 1000 + 200);
    }
  }

  global.WonderConfetti = { burstConfetti };
})(window);
