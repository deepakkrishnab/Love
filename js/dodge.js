/* ===========================================================
   dodge.js — makes a button impossible to click (mouse + touch)
   =========================================================== */

(function (global) {
  function randomPositionWithinViewport(elWidth, elHeight, margin) {
    const maxX = Math.max(margin, window.innerWidth - elWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - elHeight - margin);
    const x = margin + Math.random() * (maxX - margin);
    const y = margin + Math.random() * (maxY - margin);
    return { x, y };
  }

  function distance(ax, ay, bx, by) {
    return Math.hypot(ax - bx, ay - by);
  }

  /**
   * Makes `buttonEl` dodge the cursor/finger so it can never be clicked.
   * Works by listening for mouse movement near the button and touch
   * attempts, then teleporting the button to a new random spot.
   */
  function makeUndodgeable(buttonEl, options) {
    options = options || {};
    const dangerRadius = options.dangerRadius || 90;
    const margin = options.margin || 16;

    // Capture the button's natural position (next to the Yes button) BEFORE
    // switching it to fixed positioning, so it doesn't jump on first render.
    const startRect = buttonEl.getBoundingClientRect();

    buttonEl.style.position = 'fixed';
    buttonEl.style.margin = '0';
    buttonEl.style.left = startRect.left + 'px';
    buttonEl.style.top = startRect.top + 'px';
    buttonEl.style.transition = 'left 0.18s ease, top 0.18s ease, transform 0.18s ease';

    let placed = true;
    let frozen = false;

    function place(x, y) {
      buttonEl.style.left = x + 'px';
      buttonEl.style.top = y + 'px';
      const rotate = (Math.random() * 20 - 10).toFixed(1);
      buttonEl.style.transform = 'rotate(' + rotate + 'deg)';
    }

    function teleport() {
      if (frozen) return;
      const rect = buttonEl.getBoundingClientRect();
      const { x, y } = randomPositionWithinViewport(rect.width || 140, rect.height || 54, margin);
      place(x, y);
    }

    function onPointerMove(evt) {
      if (!placed || frozen) return;
      const rect = buttonEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const d = distance(evt.clientX, evt.clientY, cx, cy);
      if (d < dangerRadius) {
        teleport();
      }
    }

    document.addEventListener('mousemove', onPointerMove, { passive: true });

    // Touch devices: jump away the instant a touch starts anywhere near it,
    // and also on any touch on the button itself.
    function onTouchStart(evt) {
      if (frozen) return;
      const touch = evt.touches && evt.touches[0];
      if (!touch) {
        teleport();
        return;
      }
      const rect = buttonEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const d = distance(touch.clientX, touch.clientY, cx, cy);
      if (d < dangerRadius * 1.6) {
        teleport();
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true });

    // Belt-and-braces: if somehow focused/hovered, still dodge away.
    buttonEl.addEventListener('mouseenter', teleport);
    buttonEl.addEventListener('focus', teleport);
    buttonEl.addEventListener('touchstart', teleport, { passive: true });

    // Keep it in-bounds on resize
    window.addEventListener('resize', teleport);

    return {
      freeze() {
        frozen = true;
      },
      unfreeze() {
        frozen = false;
      }
    };
  }

  global.WonderDodge = { makeUndodgeable };
})(window);
