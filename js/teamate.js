
const slides = document.querySelectorAll('.slide');
let current = 0;

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

setInterval(nextSlide, 6000); // 每 4 秒換圖


(function(){
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('siteNav');
  const spacer = document.getElementById('nav-spacer');
  if(!header || !nav || !spacer) return;

  const THRESHOLD = 50; // 往下 50px 才顯示

  function setSpacer(){
    if(header.classList.contains('visible')){
      spacer.style.height = nav.offsetHeight + 'px';
    } else {
      spacer.style.height = '0px';
    }
  }

  function onScroll(){
    const y = window.scrollY || window.pageYOffset;
    if(y > THRESHOLD){
      header.classList.remove('hidden');
      header.classList.add('visible');
      nav.classList.add('nav-sticky'); // 保留你原 sticky
    } else {
      header.classList.add('hidden');
      header.classList.remove('visible');
      nav.classList.remove('nav-sticky');
    }
    setSpacer();
  }

  // 初始化
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', setSpacer);
})();



// ----------------------------


 (function () {
    const avatarButtons = document.querySelectorAll('.avatar-btn');
    const modal = document.getElementById('memberModal');
    const backdrop = modal.querySelector('.member-modal-backdrop');
    const closeBtn = modal.querySelector('.member-modal-close');

    const modalFullPhoto = document.getElementById('modalFullPhoto');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');

    function openModal(btn) {
      const name = btn.dataset.name || '';
      const role = btn.dataset.role || '';
      const description = btn.dataset.description || '';
      const tags = (btn.dataset.tags || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      // 全身照路徑：優先用 data-full，沒有就退回頭貼
      const fullSrc =
        btn.dataset.full ||
        (btn.querySelector('.avatar-img') &&
          btn.querySelector('.avatar-img').getAttribute('src')) ||
        '';
      const fullAlt =
        (btn.querySelector('.avatar-img') &&
          btn.querySelector('.avatar-img').getAttribute('alt')) ||
        name ||
        '';

      modalFullPhoto.src = fullSrc;
      modalFullPhoto.alt = fullAlt;
      modalName.textContent = name;
      modalRole.textContent = role;
      modalDescription.textContent = description;

      modalTags.innerHTML = '';
      tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        modalTags.appendChild(span);
      });

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    avatarButtons.forEach(btn => {
      btn.addEventListener('click', () => openModal(btn));
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  })();

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


// 260126 header
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


// ***************************
(() => {
  const items = document.querySelectorAll(".js-stretch img");
  if (!items.length) return;

  let lastY = window.scrollY;
  let velocity = 0;      // 滾動速度
  let current = 0;       // 目前套用的強度（會回彈）
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function raf() {
    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;

    // 速度估計（越大代表滾更快）
    velocity = clamp(dy * 0.08, -1.2, 1.2);

    // 讓效果更柔順：current 追著 velocity，並帶回彈
    current += (velocity - current) * 0.12;
    current *= 0.92; // 回彈阻尼

    // 變形量：越滾越拉（你可調 0.18 / 0.12）
    const stretchY = 1 + Math.abs(current) * 0.18;
    const squashX  = 1 - Math.abs(current) * 0.12;

    items.forEach(img => {
      img.style.transform = `scaleX(${squashX}) scaleY(${stretchY})`;
    });

    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
})();


// ----------------------------------0119
(() => {
  const stage = document.querySelector(".page-stage");
  const svg = document.querySelector(".page-curve .curve-svg");
  const path = document.querySelector(".page-curve .curve-path");
  if (!stage || !svg || !path) return;

  // 元素在 stage 內的錨點（center / left / right）
  function anchorInStage(el, mode = "center") {
    const r = el.getBoundingClientRect();
    const s = stage.getBoundingClientRect();

    let x = r.left + r.width / 2;
    let y = r.top + r.height / 2;

    if (mode === "right") x = r.right;
    if (mode === "left") x = r.left;

    return { x: x - s.left, y: y - s.top };
  }

  // Catmull-Rom -> Bezier：穿過所有點且曲率連續（不尖刺）
  function catmullRomToBezier(pts, tension = 1) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const t = tension;
      const c1x = p1.x + ((p2.x - p0.x) / 6) * t;
      const c1y = p1.y + ((p2.y - p0.y) / 6) * t;
      const c2x = p2.x - ((p3.x - p1.x) / 6) * t;
      const c2y = p2.y - ((p3.y - p1.y) / 6) * t;

      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function buildPath() {
    const stageW = stage.clientWidth;
    const stageH = Math.max(stage.scrollHeight, stage.offsetHeight);

    // ✅ 用真實座標系當 viewBox：對齊最準
    svg.setAttribute("viewBox", `0 0 ${stageW} ${stageH}`);

    // 抓所有圖片容器（每張圖都會連到）
    const medias = Array.from(stage.querySelectorAll(".workflow-grid .wf-media"));
    if (!medias.length) return;

    // ✅ 左欄圖 -> 取右邊緣；右欄圖 -> 取左邊緣（看起來像「連到圖」）
    const anchors = medias
      .map(el => {
        const isLeft = !!el.closest(".wf-left");
        return anchorInStage(el, isLeft ? "right" : "left");
      })
      .sort((a, b) => a.y - b.y);

    // 起點：從第一張圖上方垂落一小段再接上（更像風箏線）
    const start = { x: anchors[0].x, y: Math.max(0, anchors[0].y - 160) };

    // ===== 你要的效果主要調這兩個 =====
    const bend = 130;      // ✅ 彎幅更大（弧更寬）
    const tension = 0.90;  // ✅ 更柔順，不尖刺

    const pts = [start, anchors[0]];

    // ✅ 每兩張圖之間只插 1 個大彎點 → 彎的次數少
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i];
      const b = anchors[i + 1];

      const dy = b.y - a.y;
      const dx = b.x - a.x;

      // 彎幅：依左右距離稍微加成，但限制上下限避免太誇張
      const amp = clamp(bend + Math.abs(dx) * 0.25, 80, 190);
      const sign = (i % 2 === 0) ? 1 : -1; // S / 反S 交替

      // 單一大彎點：放在中段，形成漂亮大弧
      const mid = {
        x: (a.x + b.x) / 2 + sign * amp,
        y: a.y + dy * 0.55
      };

      pts.push(mid, b);
    }

    path.setAttribute("d", catmullRomToBezier(pts, tension));
  }

  buildPath();
  window.addEventListener("resize", buildPath);
  window.addEventListener("load", buildPath);

  // 圖片載入後高度會變，逐張重算一次
  stage.querySelectorAll(".wf-media img").forEach(img => {
    if (!img.complete) img.addEventListener("load", buildPath, { once: true });
  });
})();

