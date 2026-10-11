/* ===========================================================
   nameloop.js — fades between name variants on a loop
   =========================================================== */

(function (global) {
  function startNameLoop(elId, names, intervalMs) {
    const el = document.getElementById(elId);
    if (!el) return;
    let idx = 0;
    setInterval(() => {
      el.style.opacity = '0';
      setTimeout(() => {
        idx = (idx + 1) % names.length;
        el.textContent = names[idx];
        el.style.opacity = '1';
      }, 450);
    }, intervalMs || 2200);
  }

  global.WonderNameLoop = { startNameLoop };
})(window);
