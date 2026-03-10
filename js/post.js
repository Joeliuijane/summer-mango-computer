// header



/* =========================
   post.js (FULL REPLACE)
   - FTX 左右同步：按鈕切換（含下一段殘影）
   - 更多文章：可選左右按鈕（安全判斷，不會報錯）
   - Navbar：桌機 hover 展開 dropdown（Bootstrap 4 + jQuery）
   ========================= */


/* ============ FTX：按鈕切換 ============ */
(function(){
  const wrapper = document.getElementById('ftx-duo');
  if(!wrapper) return;

  const leftBox  = wrapper.querySelector('[data-role="text"]');
  const rightBox = wrapper.querySelector('[data-role="image"]');
  if(!leftBox || !rightBox) return;

  const L = Array.from(leftBox.querySelectorAll('.ftx-slide'));
  const R = Array.from(rightBox.querySelectorAll('.ftx-slide'));
  if(!L.length || !R.length) return;

  let i = 0;
  let anim = false;

  const DUR = 720; // 轉場時間（要和 CSS transition 一致）
  const maxIndex = Math.min(L.length, R.length) - 1;

  // 只創一次「下一段殘影」節點（避免重複 append）
  let nextGhost = leftBox.querySelector('.ftx-next-ghost');
  if(!nextGhost){
    nextGhost = document.createElement('div');
    nextGhost.className = 'ftx-next-ghost';
    leftBox.appendChild(nextGhost);
  }

  function updateNextGhost(idx){
    const nextIdx = idx + 1;
    if(nextIdx <= maxIndex){
      const titleEl = L[nextIdx].querySelector('.ftx-title');
      nextGhost.textContent = titleEl ? titleEl.textContent : '';
      nextGhost.classList.add('is-show');
    }else{
      nextGhost.textContent = '';
      nextGhost.classList.remove('is-show');
    }
  }

  // 取得按鈕
  const btnPrev = document.getElementById('ftxPrev');
  const btnNext = document.getElementById('ftxNext');

 function updateButtons(idx){
  // 上一段
  if (btnPrev) {
    if (idx <= 0) {
      btnPrev.disabled = true;
      btnPrev.textContent = '';
    } else {
      const prevTitle =
        L[idx - 1].querySelector('.ftx-title')?.textContent || '';
      btnPrev.disabled = false;
      btnPrev.textContent = `‹ 上一段：${prevTitle}`;
    }
  }

  // 下一段
  if (btnNext) {
    if (idx >= maxIndex) {
      btnNext.disabled = true;
      btnNext.textContent = '';
    } else {
      const nextTitle =
        L[idx + 1].querySelector('.ftx-title')?.textContent || '';
      btnNext.disabled = false;
      btnNext.textContent = `下一段：${nextTitle} ›`;
    }
  }
}


  function swap(arr, n){
    const cur = arr[i];
    const nxt = arr[n];
    if(!cur || !nxt) return;

    cur.classList.remove('ftx-active');
    cur.classList.add('ftx-prev');
    nxt.classList.add('ftx-active');

    window.setTimeout(()=> cur.classList.remove('ftx-prev'), DUR);
  }

  function go(n){
    if(anim || n === i || n < 0 || n > maxIndex) return;

    anim = true;
    swap(L, n);
    swap(R, n);

    window.setTimeout(()=>{
      i = n;
      anim = false;
      updateNextGhost(i);
      updateButtons(i);
    }, DUR);
  }

  // 初始化：只讓第一張 active
  L.forEach((el, idx)=> el.classList.toggle('ftx-active', idx === 0));
  R.forEach((el, idx)=> el.classList.toggle('ftx-active', idx === 0));
  updateNextGhost(0);
  updateButtons(0);

  // 綁按鈕事件
  if(btnPrev) btnPrev.addEventListener('click', ()=> go(i - 1));
  if(btnNext) btnNext.addEventListener('click', ()=> go(i + 1));

  
})();


/* ============ 更多文章：左右按鈕（可選） ============ */
(function(){
  const track = document.getElementById('crTrack');
  const prevBtn = document.getElementById('crPrev');
  const nextBtn = document.getElementById('crNext');

  if (track && prevBtn) {
    prevBtn.onclick = () => track.scrollBy({ left: -320, behavior: 'smooth' });
  }
  if (track && nextBtn) {
    nextBtn.onclick = () => track.scrollBy({ left: 320, behavior: 'smooth' });
  }
})();


/* ============ Navbar：桌機 hover 展開 dropdown（Bootstrap 4） ============ */
$(document).ready(function () {
  function toggleNavbarMethod() {
    if ($(window).width() > 992) {
      $('.navbar .dropdown').off('mouseenter mouseleave');

      $('.navbar .dropdown').on('mouseenter', function () {
        $(this).addClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'true');
        $(this).find('.dropdown-menu').addClass('show');
      });

      $('.navbar .dropdown').on('mouseleave', function () {
        $(this).removeClass('show');
        $(this).find('.dropdown-toggle').attr('aria-expanded', 'false');
        $(this).find('.dropdown-menu').removeClass('show');
      });

    } else {
      // 手機就交給 Bootstrap 點擊展開
      $('.navbar .dropdown').off('mouseenter mouseleave');
    }
  }

  toggleNavbarMethod();
  $(window).resize(toggleNavbarMethod);
});


// ===== 更多報導：左右按鈕 + 滑鼠拖曳 =====
(() => {
  const rail = document.querySelector('[data-news-rail]');
  if (!rail) return;

  const prev = document.querySelector('[data-news-prev]');
  const next = document.querySelector('[data-news-next]');

  const getStep = () => {
    const card = rail.querySelector('.news-card');
    if (!card) return 320;
    const gap = parseFloat(getComputedStyle(rail).gap || '18');
    return card.getBoundingClientRect().width + gap;
  };

  if (prev) prev.addEventListener('click', () => rail.scrollBy({ left: -getStep(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => rail.scrollBy({ left:  getStep(), behavior: 'smooth' }));

  // 拖曳滑動（桌機超重要）
  let isDown = false, startX = 0, startLeft = 0;

  rail.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    startLeft = rail.scrollLeft;
  });

  window.addEventListener('mouseup', () => { isDown = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    rail.scrollLeft = startLeft - dx;
  });
})();
// =================================
// ===== 更多報導：高級版左右浮動箭頭 + 拖曳 =====
(() => {
  const rail = document.querySelector('[data-news-rail]');
  if (!rail) return;

  const prev = document.querySelector('[data-news-prev]');
  const next = document.querySelector('[data-news-next]');

  const getStep = () => {
    const card = rail.querySelector('.news-card');
    if (!card) return 320;
    const gap = parseFloat(getComputedStyle(rail).gap || '20');
    return card.getBoundingClientRect().width + gap;
  };

  const updateArrows = () => {
    if (!prev || !next) return;

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    const current = rail.scrollLeft;

    if (current <= 8) {
      prev.classList.add('is-hidden');
    } else {
      prev.classList.remove('is-hidden');
    }

    if (current >= maxScrollLeft - 8) {
      next.classList.add('is-hidden');
    } else {
      next.classList.remove('is-hidden');
    }
  };

  if (prev) {
    prev.addEventListener('click', () => {
      rail.scrollBy({
        left: -getStep() * 1.2,
        behavior: 'smooth'
      });
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      rail.scrollBy({
        left: getStep() * 1.2,
        behavior: 'smooth'
      });
    });
  }

  let isDown = false;
  let startX = 0;
  let startLeft = 0;

  rail.addEventListener('mousedown', (e) => {
    isDown = true;
    rail.classList.add('is-dragging');
    startX = e.pageX;
    startLeft = rail.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    rail.classList.remove('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    rail.scrollLeft = startLeft - dx;
  });

  rail.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  updateArrows();
})();