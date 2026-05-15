'use strict';

const DEFAULTS = {
  companyName: 'バイク買取センター',
  phone: '0120-000-000',
  heroBadge: '全国対応 ／ 出張査定無料',
  heroLine1: 'あなたのバイクを',
  heroHighlight: '最高値',
  heroLine2: 'で買取します',
  heroSub: '国産・外車・不動車・事故車、どんなバイクでもOK！即日査定・即日現金払い可能。',
  stat1Value: '15,000台', stat1Label: '累計買取実績',
  stat2Value: '4.9 / 5.0', stat2Label: '顧客満足度',
  stat3Value: '最短30分', stat3Label: 'で査定完了',
  price1Maker: 'Honda',    price1Name: 'CB400SF',       price1Detail: '2020年式 / 走行8,000km',  price1Amount: '580,000',
  price2Maker: 'Yamaha',   price2Name: 'MT-09',          price2Detail: '2022年式 / 走行5,200km',  price2Amount: '920,000',
  price3Maker: 'Kawasaki', price3Name: 'Z900RS',         price3Detail: '2021年式 / 走行12,000km', price3Amount: '850,000',
  price4Maker: 'Suzuki',   price4Name: 'GSX-R1000',      price4Detail: '2019年式 / 走行18,000km', price4Amount: '750,000',
  price5Maker: 'BMW',      price5Name: 'R1250GS',        price5Detail: '2021年式 / 走行9,500km',  price5Amount: '1,450,000',
  price6Maker: 'Honda',    price6Name: 'スーパーカブ110', price6Detail: '2018年式 / 走行22,000km', price6Amount: '95,000',
  review1Text: '「他社より10万円以上高い査定額にびっくり！スタッフの方も感じよく、安心して任せられました。」',
  review1Name: 'T.K さん（40代・男性）', review1Bike: 'Honda CBR600RR',
  review2Text: '「不動車だったので売れないと思っていましたが、快く買い取ってもらえました。引き取りも無料で助かりました！」',
  review2Name: 'M.S さん（30代・女性）', review2Bike: 'Yamaha YZF-R3（不動車）',
  review3Text: '「当日に査定・現金受け取りまで完了。書類手続きも全部やってくれて、本当に楽でした。またお願いしたいです。」',
  review3Name: 'R.Y さん（50代・男性）', review3Bike: 'Kawasaki Ninja H2',
};

function loadConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem('bikeConfig') || '{}');
    return { ...DEFAULTS, ...saved };
  } catch {
    return { ...DEFAULTS };
  }
}

function applyConfig(config) {
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.dataset.config;
    if (config[key] !== undefined) el.textContent = config[key];
  });
  document.querySelectorAll('[data-config-phone]').forEach(el => {
    el.href = 'tel:' + config.phone.replace(/-/g, '');
  });
}

// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
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

document.querySelectorAll('.feature-card, .flow-step, .price-card, .review-card').forEach(el => {
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
      <div style="text-align:center;padding:60px 20px;">
        <div style="font-size:3rem;margin-bottom:20px;">✅</div>
        <h3 style="font-size:1.4rem;font-weight:900;margin-bottom:12px;color:#1a1a1a;">お申し込みありがとうございます！</h3>
        <p style="color:#777;line-height:1.8;">担当スタッフより24時間以内にご連絡いたします。<br>お急ぎの場合はお電話にてご連絡ください。</p>
      </div>`;
  }, 1200);
});

// ヘッダーシャドウ
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.4)'
    : '0 2px 12px rgba(0,0,0,0.3)';
}, { passive: true });

// config適用
applyConfig(loadConfig());
