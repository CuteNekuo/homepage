'use strict';

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// スクロールアニメーション
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('fade-visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.feature-card, .flow-step, .price-card, .review-card'
).forEach(el => {
  el.classList.add('fade-hidden');
  observer.observe(el);
});

// フォーム送信
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = '送信中...';

  setTimeout(() => {
    form.innerHTML = `
      <div style="text-align:center; padding: 60px 20px;">
        <div style="font-size:3rem; margin-bottom:20px;">✅</div>
        <h3 style="font-size:1.4rem; font-weight:900; margin-bottom:12px; color:#1a1a1a;">お申し込みありがとうございます！</h3>
        <p style="color:#777; line-height:1.8;">担当スタッフより24時間以内にご連絡いたします。<br>お急ぎの場合はお電話（0120-000-000）にてご連絡ください。</p>
      </div>
    `;
  }, 1200);
});

// ヘッダー背景のスクロール制御
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.4)'
    : '0 2px 12px rgba(0,0,0,0.3)';
}, { passive: true });
