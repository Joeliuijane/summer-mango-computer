(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
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

    
    // Main carousel
    $(".carousel .owl-carousel").owlCarousel({
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        smartSpeed: 300,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });
    
    
    // Modal Video
    $(document).ready(function () {
    var v = document.getElementById('heroVideo');

    // Modal 打開時自動播放
    $('#videoModal').on('shown.bs.modal', function () {
        v.play();
    });

    // Modal 關閉時停止並回到開頭
    $('#videoModal').on('hide.bs.modal', function () {
        v.pause();
        v.currentTime = 0;
    });
    });

    
    
    // Causes carousel
    $(".causes-carousel").owlCarousel({
        autoplay: true,
        animateIn: 'slideInDown',
        animateOut: 'slideOutDown',
        items: 1,
        smartSpeed: 450,
        dots: false,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);


/*cardwall start */
const cards = document.querySelectorAll('.card');
const overlay = document.querySelector('.overlay');

function expand(card){
  if(card.classList.contains('is-expanded')) return;

  // 1) 取得目前位置與尺寸（First）
  const rect = card.getBoundingClientRect();

  // 2) 先把卡片「固定」到原位（固定定位 + 同尺寸）避免跳動
  card.style.position = 'fixed';
  card.style.top = rect.top + 'px';
  card.style.left = rect.left + 'px';
  card.style.width = rect.width + 'px';
  card.style.height = rect.height + 'px';
  card.style.margin = 0;
  card.style.zIndex = 1000;

  // 3) 觸發重排，準備開始 transition
  card.getBoundingClientRect();

  // 4) 加上展開樣式（Last）
  card.classList.add('is-expanded');

  // 5) 顯示遮罩
  overlay.hidden = false;

  // 6) 事件：點擊卡片/遮罩/ESC 皆可關閉
  const close = (ev) => {
    if(ev && ev.type === 'keydown' && ev.key !== 'Escape') return;
    collapse(card);
    window.removeEventListener('keydown', close);
    overlay.removeEventListener('click', close);
    card.removeEventListener('click', close);
  };
  window.addEventListener('keydown', close);
  overlay.addEventListener('click', close);
  // 再次點擊卡片也關閉（僅在展開狀態下）
  card.addEventListener('click', close, { once:true });
}

function collapse(card){
  // 回到原位前，先移除 is-expanded，讀出目標位移
  card.classList.remove('is-expanded');

  // 目標是讓卡片回到原本在 grid 中的位置
  // 取新的 grid 位置（收合後的位置）
  const rect = card.parentElement.getBoundingClientRect(); // board 的位置
  // 讓瀏覽器計算回流後的位置
  requestAnimationFrame(() => {
    const target = card.getBoundingClientRect();
    // 設定為 fixed 並動畫回去
    card.style.top = target.top + 'px';
    card.style.left = target.left + 'px';
    card.style.width = target.width + 'px';
    card.style.height = target.height + 'px';

    // 動畫結束後清理內聯樣式
    const tidy = () => {
      card.style.position = '';
      card.style.top = '';
      card.style.left = '';
      card.style.width = '';
      card.style.height = '';
      card.style.margin = '';
      card.style.zIndex = '';
      card.removeEventListener('transitionend', tidy);
    };
    card.addEventListener('transitionend', tidy, { once:true });

    overlay.hidden = true;
  });
}

// 綁定：點擊或按 Enter/Space 展開
cards.forEach(card => {
  card.addEventListener('click', (e) => expand(card));
  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      expand(card);
    }
  });
});
//cardwall end

//photo wall start//
document.querySelectorAll('.marquee__track img').forEach(img=>{
  img.addEventListener('mouseenter', () => {
    img.closest('.marquee').querySelector('.marquee__track').style.animationPlayState = 'paused';
  });
  img.addEventListener('mouseleave', () => {
    img.closest('.marquee').querySelector('.marquee__track').style.animationPlayState = 'running';
  });
});

function waitForImages(imgEls){
  const promises = [...imgEls].map(img=>{
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise(res => {
      img.addEventListener('load', res, { once:true });
      img.addEventListener('error', res, { once:true }); // 失敗也放過，避免卡住
    });
  });
  return Promise.all(promises);
}

async function readyMarquee(marquee){
  const track = marquee.querySelector('.marquee__track');
  if(!track) return;

  // 1) 等圖片載入，避免尺寸是 0
  const imgs = track.querySelectorAll('img');
  await waitForImages(imgs);

  // 2) 複製圖片直到軌道寬 >= 容器寬的 2 倍（保證無縫）
  const need = marquee.clientWidth * 2;
  while (track.scrollWidth < need) {
    imgs.forEach(img => track.appendChild(img.cloneNode(true)));
  }

  // 3) 標記就緒，啟動動畫（CSS 會套用 .is-ready 的動畫）
  marquee.classList.add('is-ready');
}

// 支援多條跑馬燈
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.marquee').forEach(readyMarquee);
});
//photo wall end//



// 滾圓 start//
/* ===== NTV scroll circle (isolated) ===== */
/* ===== NTV scroll circle: auto-snap to NEWS when filled ===== */
/* ===== NTV scroll semicircle: auto-snap to NEWS when filled ===== */
(function(){
  const portal = document.getElementById('ntv-portal');
  const pin    = portal?.querySelector('.ntv-pin');
  const arc    = portal?.querySelector('.ntv-arc');
  const news   = document.querySelector('.ntv-news');
  const newsInner = document.querySelector('.ntv-news-inner');

  if(!portal || !pin || !arc || !news || !newsInner) return;

  let start = 0, end = 0;
  let snapped = false;
  let snapLock = false;

  const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
  const lerp  = (a, b, t) => a + (b - a) * t;
  const ease  = t => 1 - Math.pow(1 - t, 3); // easeOutCubic

  function recalc(){
    const rect = portal.getBoundingClientRect();
    const pageY = window.scrollY || window.pageYOffset;
    start = pageY + rect.top;
    end   = start + portal.offsetHeight - window.innerHeight;
    onScroll();
  }

  function onScroll(){
    const y = window.scrollY || window.pageYOffset;
    const raw = (y - start) / (end - start);
    const p = clamp(raw, 0, 1);

    const root = getComputedStyle(document.documentElement);
    const sMin = parseFloat(root.getPropertyValue('--ntv-scale-min')) || 0.25;
    const sMax = parseFloat(root.getPropertyValue('--ntv-scale-max')) || 12;

    const scale = lerp(sMin, sMax, ease(p));
    arc.style.setProperty('--ntv-scale', scale);

    // 半圓填滿比例
    const ratio = Math.min(scale / sMax, 1);

    // NEWS 提前淡入（想與滿版同時出現，設為 0.98）
    const newsIn = ratio >= 0.85;
    newsInner.style.setProperty('--ntv-news-a', newsIn ? '1' : '0');
    newsInner.style.setProperty('--ntv-news-y', newsIn ? '0px' : '40px');

    // 滿版即自動捲到 NEWS
    if(!snapped && !snapLock && ratio >= 0.98){
      snapped = true;
      snapLock = true;
      news.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { snapLock = false; }, 600);
    }

    // 若想允許回頂再重觸發，保留；不想就刪掉
    if(snapped && p <= 0.05){
      snapped = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', recalc);
  window.addEventListener('load', recalc);
  recalc();
})();

//滾圓 end//

//====淡入淡出=====//
// ===== ftx：左右同步淡入淡出 =====
(function(){
  function initFTXDuo(wrapper){
    if(!wrapper || wrapper.__ftxInited) return;
    wrapper.__ftxInited = true;

    const DUR = +wrapper.getAttribute('data-duration') || 720;
    const TH  = +wrapper.getAttribute('data-threshold') || 40;
    const H   = wrapper.getAttribute('data-height') || '80vh';
    wrapper.style.setProperty('--ftx-h', H);

    const leftBox  = wrapper.querySelector('.ftx-box[data-role="text"]');
    const rightBox = wrapper.querySelector('.ftx-box[data-role="image"]');
    if(!leftBox || !rightBox) return;

    const L = Array.from(leftBox.querySelectorAll('.ftx-slide'));
    const R = Array.from(rightBox.querySelectorAll('.ftx-slide'));
    if(!L.length || !R.length) return;

    // 對齊兩側 transition 時間
    [...L, ...R].forEach(s => s.style.transitionDuration = `${DUR}ms`);

    // 乾淨初始化：僅第一張 active
    L.forEach((el,i)=> el.classList.toggle('ftx-active', i===0));
    R.forEach((el,i)=> el.classList.toggle('ftx-active', i===0));

    let i = 0, anim = false, accum = 0;
    const maxIndex = Math.min(L.length, R.length) - 1;

    function swap(arr, n){
      const cur = arr[i], nxt = arr[n];
      cur.classList.remove('ftx-active'); cur.classList.add('ftx-prev');
      nxt.classList.add('ftx-active');
      setTimeout(()=> cur.classList.remove('ftx-prev'), DUR);
    }

    function go(n){
      if (anim || n===i || n<0 || n>maxIndex) return;
      anim = true;
      swap(L, n);
      swap(R, n);
      setTimeout(()=>{ i = n; anim = false; }, DUR);
    }

    // function onWheel(e){
    //   if (anim) return;
    //   if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // 僅垂直
    //   e.preventDefault();
    //   accum += e.deltaY;
    //   if (accum >  TH){ accum = 0; go(i+1); }
    //   if (accum < -TH){ accum = 0; go(i-1); }
    // }

    // wrapper.addEventListener('wheel', onWheel, {passive:false});
    // document.addEventListener('wheel', (e)=>{
    //   if(wrapper.contains(e.target)) onWheel(e);
    // }, {passive:false});

    // 鍵盤 & 觸控（可選）
    wrapper.setAttribute('tabindex','0');
    wrapper.addEventListener('keydown', (e)=>{
      if (anim) return;
      if (['ArrowDown','PageDown',' '].includes(e.key)){ e.preventDefault(); go(i+1); }
      if (['ArrowUp','PageUp'].includes(e.key))        { e.preventDefault(); go(i-1); }
    });
    let startY=null;
    wrapper.addEventListener('touchstart', e=>{ startY = e.touches[0].clientY; }, {passive:true});
    wrapper.addEventListener('touchend', e=>{
      if (startY==null) return;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dy) > 30){ dy < 0 ? go(i+1) : go(i-1); }
      startY = null;
    }, {passive:true});

    // 對外 API（可選）
    wrapper.ftxNext = ()=> go(i+1);
    wrapper.ftxPrev = ()=> go(i-1);
    wrapper.ftxGo   = (idx)=> go(+idx);
  }

  function boot(){
    document.querySelectorAll('.ftx-wrapper').forEach(initFTXDuo);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();


// 了解更多
// ===== JR 字卡 Modal 功能 =====
const modal = document.getElementById('jr-modal');
const modalTitle = document.getElementById('jr-modal-title');
const modalContent = document.getElementById('jr-modal-content');

document.querySelectorAll('.jr-overlay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.dataset.title;
    modalContent.textContent = btn.dataset.content;
    modal.setAttribute('aria-hidden', 'false');
  });
});

// 關閉
modal.addEventListener('click', e => {
  if (
    e.target.classList.contains('jr-modal-backdrop') ||
    e.target.classList.contains('jr-modal-close')
  ) {
    modal.setAttribute('aria-hidden', 'true');
  }
});

// ESC 關閉
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modal.setAttribute('aria-hidden', 'true');
  }
});



/* 260120影片 */


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("jr-modal");
  const modalTitle = document.getElementById("jr-modal-title");
  const modalContent = document.getElementById("jr-modal-content");
  const modalImg = document.getElementById("jr-modal-img");
  const closeBtn = document.querySelector(".jr-modal-close");
  const backdrop = document.querySelector(".jr-modal-backdrop");
  const triggerBtns = document.querySelectorAll(".jr-overlay-btn");

  triggerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalTitle.textContent = btn.dataset.title || "";
      modalContent.textContent = btn.dataset.content || "";

      if (btn.dataset.img) {
        modalImg.src = btn.dataset.img;
        modalImg.style.display = "block";
      } else {
        modalImg.style.display = "none";
      }

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});