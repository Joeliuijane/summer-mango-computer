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


















// ✅ 強制關掉 Pre Loader（避免一直轉圈圈）
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("show");
});




// ====== 你只需要改這個陣列：圖片/標題/日期/摘要/連結 ======
const POSTS = [
  {
    title: "在陽光下扎根的人生",
    date: "2025.12.07",
    tag: "關於蔡金松",
    excerpt: "從童年果園到一生務農，記錄蔡金松在土地上慢慢扎根的人生歷程。",
    image: "img/一畝田的時光.JPG",
    href: "post1.html"
  },
  {
    title: "一畝田裡的時光足跡",
    date: "2025.12.01",
    tag: "關於蔡金松",
    excerpt: "天未亮就下田，在風雨與收成之間，走過一輩子的果園日常。",
    image: "img/TSA00220.jpg",
    href: "post2.html"
  },
  {
    title: "土地的傳承與心願",
    date: "2025.11.20",
    tag: "關於蔡金松",
    excerpt: "從務農退下後，對家族、土地與下一代的深切期望與叮嚀。",
    image: "img/TSA00207.jpg",
    href: "post3.html"
  },
  {
    title: "從柳丁到芒果──果園轉作的時代見證",
    date: "2025.11.10",
    tag: "芒果的開始",
    excerpt: "從滿山柳丁到愛文芒果，見證玉井果園轉作與產業誕生的關鍵時代。",
    image: "img/DSCF0109.jpg",
    href: "post4.html"
  },
  {
    title: "果園裡的日常──從勞動經驗看農業變化",
    date: "2025.10.28",
    tag: "玉井的變化",
    excerpt: "從童年苦力到機具輔助，果園日常映照出農業與時代的轉變。",
    image: "img/玉井的轉變.jpg",
    href: "post5.html"
  },
 {
    title: "歲月中的守護者",
    date: "2025.10.28",
    tag: "關於吳榮秀",
    excerpt: "從年輕勞動到撐起家庭，用一生的辛勞守護家與孩子。",
    image: "img/DSCF0152.jpg",
    href: "post6.html"
  },
 {
    title: "芒果香裡的生活",
    date: "2025.10.28",
    tag: "關於吳榮秀",
    excerpt: "在果園與灶腳之間，用雙手創造屬於自己的芒果與生活智慧。",
    image: "img/1751375860743.jpg",
    href: "post7.html"
  },
 {
    title: "家庭與傳承",
    date: "2025.10.28",
    tag: "關於吳榮秀",
    excerpt: "將「做工不怕苦」的人生態度，化為留給孩子的溫柔叮嚀。",
    image: "img/家庭傳承.jpg",
    href: "post8.html"
  },
 {
    title: "嚴厲背後的深情：蔡耀煌的成長記憶",
    date: "2025.10.28",
    tag: "關於蔡耀煌",
    excerpt: "在嚴格家教與辛勞背後，看見父母用一生教會孩子承擔與愛的方式。",
    image: "img/蔡耀煌.JPG",
    href: "post9.html"
  }
];

function createCard(post) {
  const card = document.createElement("article");
  card.className = "hp-card";
  card.tabIndex = 0;               // 讓卡片可被鍵盤選到
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `${post.title}，前往文章頁`);

  card.innerHTML = `
    <div class="hp-media">
      <img src="${post.image}" alt="${post.title}">
    </div>

    <div class="hp-body">
      <div class="hp-meta">
        <div class="hp-date">${post.date}</div>
        <div class="hp-pill">${post.tag}</div>
      </div>

      <div class="hp-title-row">
        <h2 class="hp-h2">${post.title}</h2>
        <div class="hp-arrow">→</div>
      </div>

      <p class="hp-excerpt">${post.excerpt}</p>
    </div>
  `;

  const go = () => window.location.href = post.href;

  // 滑鼠點擊
  card.addEventListener("click", go);

  // 鍵盤 Enter / Space
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  });

  return card;
}

function renderHomePosts() {
  const list = document.getElementById("hpList");
  if (!list) return;

  list.innerHTML = "";
  POSTS.forEach(p => list.appendChild(createCard(p)));
}

document.addEventListener("DOMContentLoaded", renderHomePosts);
