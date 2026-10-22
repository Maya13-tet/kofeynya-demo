const $ = s => document.querySelector(s);
const money = n => n.toLocaleString("ru-RU").replace(/ /g, " ") + " ₽";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== меню ===== */
const MENU = {
  "Кофе": [
    ["Классический турецкий", "Türk kahvesi", "Мелкий помол, плотная пенка. Подаём со стаканом воды.", 300],
    ["Кофе на песке", "Kum kahvesi", "Варим на горячем песке: нагрев равномерный, пенка плотнее, а вкус мягче. Наш фирменный.", 380, true],
    ["С кардамоном", "Kakuleli kahve", "Кардамон кладём в джезву вместе с кофе. Пряный и согревающий.", 340],
    ["Мырра", "Mırra", "Густой, очень крепкий и горький. Варим несколько раз, подаём в крошечной чашке.", 360],
    ["Дибек", "Dibek kahvesi", "Кофе, перетёртый в каменной ступке с ядрами терпентинного дерева. Мягкий, с ореховым послевкусием.", 420],
    ["Менегич без кофеина", "Menengiç kahvesi", "Напиток из плодов терпентинного дерева, сваренный с молоком. Ореховый вкус, кофеина нет.", 390]
  ],
  "Чай и прохладное": [
    ["Чёрный чай", "Çay", "Крепкий, из двухъярусного чайника. Подаём в стаканчике-тюльпане с кубиком сахара.", 220, true],
    ["Яблочный чай", "Elma çayı", "Горячий, с яблоком и корицей. Лимон добавим по желанию.", 260],
    ["Салеп", "Sahlep", "Густой горячий напиток на молоке с корицей. Согревает после прогулки у моря.", 350],
    ["Айран", "Ayran", "Прохладный йогуртовый напиток с щепоткой соли. Освежает в жару.", 200],
    ["Шербет из шиповника", "Şerbet", "Холодный, кисло-сладкий, со льдом и мятой.", 280],
    ["Домашний лимонад", "Limonata", "Лимон, мята и немного мёда. Без газа.", 280]
  ],
  "Сладости": [
    ["Лукум фисташковый, 100 г", "Antep fıstıklı lokum", "Мягкий, тягучий, с цельными фисташками, в сахарной пудре.", 320],
    ["Лукум с розой, 100 г", "Gül lokumu", "Нежный розовый вкус. Хорошо сочетается с чёрным чаем.", 280],
    ["Пахлава с фисташкой, 2 шт.", "Baklava", "Тонкое слоёное тесто, фисташки и сироп. Печём каждое утро.", 380, true],
    ["Кадаиф с орехами", "Kadayıf", "Хрустящая тонкая вермишель из теста, грецкий орех, сироп и ложка каймака.", 420],
    ["Шекерпаре", "Şekerpare", "Мягкое печенье в сахарном сиропе с фундуком.", 300],
    ["Халва, 100 г", "Helva", "Тахинная, с фисташкой. Рассыпчатая.", 260],
    ["Инжир с грецким орехом", "İncir", "Сушёный инжир, начинённый орехом. Сладость без сиропа.", 340],
    ["Сютлач", "Sütlaç", "Запечённый рисовый пудинг с корицей. Подаём холодным.", 300]
  ]
};
const tabs = $("#tabs"), list = $("#menuList");
Object.keys(MENU).forEach((cat, i) => {
  const b = document.createElement("button");
  b.className = "tab"; b.role = "tab"; b.textContent = cat;
  b.setAttribute("aria-selected", i === 0);
  b.onclick = () => showCat(cat);
  tabs.append(b);
});
function showCat(cat) {
  [...tabs.children].forEach(t => t.setAttribute("aria-selected", t.textContent === cat));
  list.innerHTML = MENU[cat].map(([n, tr, d, p, hit]) => `
    <li class="item">
      <div class="item__top"><h3>${n}${hit ? '<span class="star">фирменный</span>' : ""}</h3><i class="item__dots"></i><span class="item__price">${money(p)}</span></div>
      <p class="tr">${tr}</p>
      <p class="d">${d}</p>
    </li>`).join("");
}
showCat("Кофе");

/* ===== турка на песке: полированная медь, чёрная гравировка, точёная ручка ===== */
function cezve(uid) {
  let band = "";
  for (let x = 96; x < 330; x += 30) {
    band += `<path d="M${x} 254 C ${x + 4} 234 ${x + 22} 230 ${x + 24} 242 C ${x + 25} 252 ${x + 12} 254 ${x + 12} 246"/>`
         + `<path class="leaf" d="M${x + 14} 262 q 11 -24 28 -22 q -6 20 -28 22z"/>`
         + `<circle class="dot" cx="${x + 30}" cy="228" r="2.2"/>`;
  }
  let neck = "";
  for (let x = 140; x < 290; x += 12) neck += `<path d="M${x} 196 l6 -8 l6 8"/>`;
  let cupBand = "";
  for (let x = 44; x < 104; x += 12) cupBand += `<path d="M${x} 396 q 6 -12 12 0"/>`;
  return `<svg class="cez" viewBox="0 0 420 440" data-step="3" role="img" aria-label="Медная турка с гравировкой и чёрной деревянной ручкой на горячем песке, из неё поднимается пена и пар">
  <defs>
    <radialGradient id="gl${uid}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F2B53B" stop-opacity=".9"/><stop offset="1" stop-color="#F2B53B" stop-opacity="0"/></radialGradient>
    <linearGradient id="cu${uid}" x1="0" x2="1"><stop offset="0" stop-color="#8A421F"/><stop offset=".16" stop-color="#D9824A"/><stop offset=".32" stop-color="#F6B481"/><stop offset=".5" stop-color="#D98048"/><stop offset=".78" stop-color="#B8642F"/><stop offset="1" stop-color="#78361A"/></linearGradient>
    <linearGradient id="tin${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F2F0EA"/><stop offset=".5" stop-color="#BDBAB2"/><stop offset="1" stop-color="#8E8B84"/></linearGradient>
    <linearGradient id="sa${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDCE96"/><stop offset=".55" stop-color="#CFA262"/><stop offset="1" stop-color="#C79A57" stop-opacity="0"/></linearGradient>
    <linearGradient id="wd${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A332E"/><stop offset=".35" stop-color="#14100D"/><stop offset="1" stop-color="#0A0705"/></linearGradient>
    <linearGradient id="mk${uid}" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".16" stop-color="#fff"/><stop offset=".84" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="mm${uid}" maskUnits="userSpaceOnUse" x="-10" y="270" width="440" height="180"><rect x="-10" y="270" width="440" height="180" fill="url(#mk${uid})"/></mask><clipPath id="fc${uid}"><path d="M0 0 H420 V130 H264 A54 12 0 0 1 156 130 H0 Z"/></clipPath>
    <clipPath id="bd${uid}"><path id="bp${uid}" d="M156 130 C 160 150 170 166 168 190 C 162 240 138 280 124 312 Q 120 322 132 322 L 288 322 Q 300 322 296 312 C 282 280 258 240 252 190 C 250 166 260 150 264 130 Z"/></clipPath>
    <clipPath id="cp${uid}"><path d="M34 372 H114 L104 410 Q74 420 44 410 Z"/></clipPath>
  </defs>
  <circle class="glow" cx="210" cy="300" r="200" fill="url(#gl${uid})"/>
  <g ${uid==="h"?"":`mask="url(#mm${uid})"`}><path d="M${uid==="h"?-1600:-10} ${uid==="h"?392:440} V284 H${uid==="h"?2020:430} V${uid==="h"?392:440} Z" fill="url(#sa${uid})" opacity=".9"/></g>
  <g class="steam" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round">
    <path d="M182 92 C 164 66 198 48 180 16"/><path d="M210 96 C 192 70 228 52 208 18"/><path d="M238 92 C 220 68 254 48 236 14"/>
  </g>
  <g class="big" transform="translate(0 -10)"><g class="pot">
    <!-- ручка: латунное кольцо у горла и длинная чёрная точёная рукоять -->
    <path d="M262 134 L300 110" stroke="#C99A3E" stroke-width="10" stroke-linecap="round"/>
    <path d="M262 131 L298 108" stroke="#F2D58A" stroke-opacity=".6" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M296 112 L384 56" stroke="url(#wd${uid})" stroke-width="13" stroke-linecap="round"/>
    <g fill="#14100D" stroke="#3A332E" stroke-width="1"><circle cx="318" cy="98" r="8.5"/><circle cx="340" cy="84" r="9.5"/><circle cx="362" cy="70" r="8.5"/></g>
    <path d="M300 106 L380 55" stroke="#fff" stroke-opacity=".22" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="291" y="104" width="9" height="16" rx="3" fill="#C99A3E" transform="rotate(-32 295 112)"/>
    <circle cx="390" cy="52" r="7" fill="none" stroke="#C99A3E" stroke-width="3.5"/>
    <!-- носик-кромка -->
    <path d="M158 126 Q 148 124 143 116 Q 150 134 164 138 Z" fill="#C06E3A"/>
    <!-- корпус -->
    <use href="#bp${uid}" fill="url(#cu${uid})"/>
    <g clip-path="url(#bd${uid})">
      <g fill="none" stroke="#150A05" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M90 204 Q 210 222 330 204"/><path d="M90 212 Q 210 230 330 212"/>
        <path d="M90 270 Q 210 288 330 270"/><path d="M90 278 Q 210 296 330 278"/>
        <g transform="translate(0 -10)">${band}</g>
        <g stroke-width="1.6">${neck}</g>
        <path d="M148 168 Q 210 178 272 168" stroke-width="1.6"/>
      </g>
      <style>.leaf{fill:#150A05}.dot{fill:#150A05}</style>
      <path d="M150 190 C 138 236 118 268 108 292" fill="none" stroke="#FFEACB" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>
      <path d="M270 200 C 280 236 296 262 306 288" fill="none" stroke="#FFD8B0" stroke-opacity=".22" stroke-width="4" stroke-linecap="round"/>
      <rect x="90" y="304" width="240" height="22" fill="#2A1008" opacity=".28"/>
    </g>
    <!-- горло: луженое серебро -->
    <ellipse cx="210" cy="130" rx="58" ry="13" fill="url(#tin${uid})"/>
    <ellipse cx="210" cy="132" rx="50" ry="9.5" fill="#6E6B64"/>
    <path d="M156 130 A54 12 0 0 1 264 130" fill="none" stroke="#E9E6DF" stroke-width="3.5"/>
    <g clip-path="url(#fc${uid})"><g class="foam">
      <path d="M152 160 L152 130 C 150 92 270 92 268 130 L268 160 Z" fill="#E7B677"/>
      <path d="M152 130 C 180 142 240 142 268 130 L268 160 L152 160 Z" fill="#C98B4E"/>
      <g fill="#F6D9A8" fill-opacity=".8"><circle cx="188" cy="112" r="5"/><circle cx="214" cy="104" r="6"/><circle cx="238" cy="114" r="4"/><circle cx="204" cy="121" r="3"/></g>
    </g></g>
    <path d="M156 130 A54 12 0 0 0 264 130" fill="none" stroke="#F4D9BC" stroke-width="3.5"/>
  </g></g>
  <g ${uid==="h"?"":`mask="url(#mm${uid})"`}><path d="M${uid==="h"?-1600:-10} ${uid==="h"?392:440} V296 H${uid==="h"?2020:430} V${uid==="h"?392:440} Z" fill="url(#sa${uid})"/></g>
  <g class="cup">
    <path d="M112 382 C 138 380 138 406 106 404" fill="none" stroke="#B8642F" stroke-width="6" stroke-linecap="round"/>
    <path d="M34 372 H114 L104 410 Q74 420 44 410 Z" fill="url(#cu${uid})"/>
    <g clip-path="url(#cp${uid})"><g fill="none" stroke="#150A05" stroke-width="1.6" stroke-linecap="round">
      <path d="M34 384 Q74 392 114 384"/><path d="M36 402 Q74 410 112 402"/>${cupBand}</g>
      <path d="M42 378 C 40 392 44 402 50 410" fill="none" stroke="#FFEACB" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/></g>
    <ellipse cx="74" cy="372" rx="40" ry="8" fill="url(#tin${uid})"/>
    <ellipse class="fill" cx="74" cy="373" rx="34" ry="5.8" fill="#5A2E15"/>
    <ellipse cx="74" cy="372.5" rx="29" ry="4.4" fill="#C98B4E"/>
  </g>
</svg>`;
}
$("#heroArt").innerHTML = cezve("h");
$("#ritualArt").innerHTML = cezve("r");
const heroSvg = $("#heroArt svg"), ritSvg = $("#ritualArt svg");

/* первый экран: джезва сама проходит четыре шага по кругу */
let hs = 1;
const loop = () => { heroSvg.dataset.step = hs; hs = hs % 4 + 1; };
if (reduce) heroSvg.dataset.step = 3; else { loop(); setInterval(loop, 3800); }

/* ===== ритуал ===== */
const STEPS = [
  ["Холодная вода и кофе", "В джезву наливаем холодную воду, добавляем молотый кофе и сахар по вкусу. Размешиваем один раз."],
  ["Горячий песок", "Ставим джезву на раскалённый песок. Он греет со всех сторон, поэтому кофе не убегает и не пригорает."],
  ["Пенка", "Когда пенка поднимается к краю, снимаем с песка. Кипятить кофе нельзя: вкус станет резким."],
  ["В чашку", "Сначала ложкой кладём в чашку пенку, затем осторожно разливаем кофе. Подаём со стаканом воды."]
];
const rs = $("#rsteps");
rs.innerHTML = STEPS.map(([t, d], i) => `<li><button class="rstep" data-i="${i + 1}"><span class="n">${i + 1}</span><b>${t}</b><span>${d}</span></button></li>`).join("");
function setStep(n) {
  ritSvg.dataset.step = n;
  rs.querySelectorAll(".rstep").forEach(b => b.setAttribute("aria-current", +b.dataset.i === n ? "step" : "false"));
}
rs.querySelectorAll(".rstep").forEach(b => b.onclick = () => setStep(+b.dataset.i));
setStep(1);

/* ===== что к кофе ===== */
const PAIRS = [
  ["Классический турецкий", "Лукум фисташковый, 100 г", "Нежная сладость смягчает горчинку, а фисташки оттеняют вкус зёрен.", 300, 320],
  ["Кофе на песке", "Пахлава с фисташкой, 2 шт.", "Мягкий кофе и сладкая пахлава не перебивают друг друга.", 380, 380],
  ["С кардамоном", "Кадаиф с орехами", "Пряность кардамона и тёплый орех в сиропе звучат вместе.", 340, 420],
  ["Мырра", "Инжир с грецким орехом", "Горькому крепкому кофе нужна натуральная сладость, без сиропа.", 360, 340],
  ["Дибек", "Халва, 100 г", "Ореховые ноты кофе и тахинной халвы подхватывают друг друга.", 420, 260],
  ["Менегич без кофеина", "Сютлач", "Тёплое с прохладным: мягкий напиток и холодный рисовый пудинг.", 390, 300]
];
const chips = $("#chips"), pair = $("#pair");
chips.innerHTML = PAIRS.map((p, i) => `<button class="chip" data-i="${i}" aria-pressed="false">${p[0]}</button>`).join("");
function showPair(i) {
  chips.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", +c.dataset.i === i));
  const [coffee, sweet, why, pc, ps] = PAIRS[i];
  const sum = pc + ps, set = Math.round(sum * 0.9 / 10) * 10;
  pair.classList.remove("pop"); void pair.offsetWidth; pair.classList.add("pop");
  pair.innerHTML = `<h3>${sweet}</h3><p>${why}</p>
    <div class="pair__sum"><b>${money(set)}</b><s>${money(sum)}</s><small>за кофе и сладость вместе, скидка 10%</small></div>`;
}
chips.querySelectorAll(".chip").forEach(c => c.onclick = () => showPair(+c.dataset.i));
pair.innerHTML = `<p style="opacity:.75">Нажмите на кофе выше, и здесь появится пара к нему.</p>`;

/* ===== кофейная гуща ===== */
const FORTUNES = [
  "Скоро вам напишет человек, о котором вы давно не вспоминали.",
  "Дело, которое вы откладывали, закончится быстрее, чем вы думаете.",
  "На выходных вас ждёт приятная встреча у моря.",
  "Небольшая покупка принесёт вам больше радости, чем большая.",
  "Лучшее решение недели вы примете после второй чашки.",
  "Дорога, которую вы выберете, окажется короче, чем кажется.",
  "Скоро придёт хорошая новость, скорее всего в обеденное время.",
  "Не торопитесь: нужный ответ уже рядом.",
  "Вас ждёт неожиданное приглашение. Соглашайтесь.",
  "Старая идея вернётся, и на этот раз у неё получится."
];
const box = $("#cupbox"), saucer = $("#saucer"), flip = $("#flip");
let last = -1, flipped = false;
function grounds() {
  let s = '<svg class="grounds" viewBox="0 0 100 100" aria-hidden="true" fill="#4A2A18" fill-opacity=".55">';
  for (let i = 0; i < 22; i++) {
    const a = Math.random() * Math.PI * 2, r = 33 + Math.random() * 14;
    s += `<ellipse cx="${50 + Math.cos(a) * r}" cy="${50 + Math.sin(a) * r}" rx="${1 + Math.random() * 4}" ry="${1 + Math.random() * 3}" transform="rotate(${Math.random() * 180} ${50 + Math.cos(a) * r} ${50 + Math.sin(a) * r})"/>`;
  }
  return s + "</svg>";
}
flip.onclick = () => {
  if (!flipped) { flipped = true; box.classList.add("flipped"); flip.textContent = "Погадать ещё раз"; }
  let i; do { i = Math.floor(Math.random() * FORTUNES.length); } while (i === last);
  last = i;
  saucer.innerHTML = grounds() + `<p>${FORTUNES[i]}</p>`;
  const p = saucer.querySelector("p"); p.style.animation = "none"; void p.offsetWidth; p.style.animation = "";
};

/* ===== бронь ===== */
const form = $("#form"), err = $("#err");
const sel = { guests: 2, place: "Где свободно" };
function seg(id, key, values) {
  const fs = $(id), box = document.createElement("div");
  values.forEach(v => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = v;
    b.setAttribute("aria-pressed", v === sel[key]);
    b.onclick = () => { sel[key] = v; box.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); };
    box.append(b);
  });
  fs.append(box);
}
seg("#guests", "guests", [1, 2, 3, 4, 5, 6]);
seg("#place", "place", ["Где свободно", "У окна", "В глубине зала"]);
const dayEl = $("#day"), timeEl = $("#time");
const today = new Date(); today.setHours(0, 0, 0, 0);
for (let i = 0; i < 10; i++) {
  const d = new Date(today); d.setDate(d.getDate() + i);
  const o = document.createElement("option"); o.value = i;
  o.textContent = (i === 0 ? "Сегодня, " : i === 1 ? "Завтра, " : "") + d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", weekday: "long" });
  dayEl.append(o);
}
for (let h = 8; h <= 22; h++) for (const m of ["00", "30"]) {
  if (h === 22 && m === "30") continue;
  const o = document.createElement("option"); o.value = o.textContent = `${h}:${m}`; timeEl.append(o);
}
timeEl.value = "18:00";
form.onsubmit = e => {
  e.preventDefault();
  const n = $("#name").value.trim(), p = $("#phone").value.replace(/\D/g, "");
  if (!n) return err.textContent = "Напишите, как к вам обращаться.";
  if (p.length < 10) return err.textContent = "Проверьте телефон: нужно минимум 10 цифр.";
  const g = sel.guests, word = g === 1 ? "гость" : g < 5 ? "гостя" : "гостей";
  form.innerHTML = `<div class="ok"><h3>${n}, стол ждёт вас</h3>
    <p>${dayEl.options[dayEl.selectedIndex].textContent}, в ${timeEl.value}. ${g} ${word}. ${sel.place === "Где свободно" ? "" : sel.place + "."}</p>
    <p class="note">Это демо: бронь нигде не сохранена.</p>
    <button type="button" class="btn" onclick="location.reload()" style="margin-top:.6rem">Забронировать ещё</button></div>`;
};
