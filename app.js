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

/* ===== джезва на песке: старая медь, чеканка, патина ===== */
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function cezve(uid) {
  const r = rng(7 + uid.charCodeAt(0));
  let dents = "";
  for (let i = 0; i < 90; i++) {
    const y = 150 + r() * 146, t = (y - 150) / 146;
    const half = 52 + Math.sin(Math.min(1, t * 1.15) * Math.PI * .62) * 62;
    const x = 210 + (r() * 2 - 1) * half, rad = 3.5 + r() * 4.5;
    dents += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="url(#dn${uid})"/>`;
  }
  let zig = "";
  for (let x = 98; x < 326; x += 16) zig += `<path d="M${x} 244 l8 -13 l8 13" />`;
  let tul = "";
  for (let x = 106; x < 322; x += 32) tul += `<path d="M${x + 8} 266 q-6 -8 0 -16 q6 8 0 16 M${x + 8} 266 q-9 -3 -9 -11 M${x + 8} 266 q9 -3 9 -11"/>`;
  return `<svg class="cez" viewBox="0 0 420 440" data-step="3" role="img" aria-label="Старинная медная джезва на горячем песке, из неё поднимается пена и пар">
  <defs>
    <radialGradient id="gl${uid}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F2B53B" stop-opacity=".9"/><stop offset="1" stop-color="#F2B53B" stop-opacity="0"/></radialGradient>
    <linearGradient id="cu${uid}" x1="0" x2="1"><stop offset="0" stop-color="#4A2210"/><stop offset=".22" stop-color="#8E4B26"/><stop offset=".4" stop-color="#C0804A"/><stop offset=".62" stop-color="#8A4A25"/><stop offset="1" stop-color="#3F1D0E"/></linearGradient>
    <linearGradient id="sa${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDCE96"/><stop offset=".55" stop-color="#CFA262"/><stop offset="1" stop-color="#C79A57" stop-opacity="0"/></linearGradient>
    <linearGradient id="soot${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B0A04" stop-opacity="0"/><stop offset="1" stop-color="#1B0A04" stop-opacity=".7"/></linearGradient>
    <radialGradient id="dn${uid}" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#FFD9A8" stop-opacity=".42"/><stop offset=".55" stop-color="#7A3D1C" stop-opacity=".05"/><stop offset="1" stop-color="#2A0F05" stop-opacity=".42"/></radialGradient>
    <clipPath id="fc${uid}"><path d="M0 0 H420 V130 H274 A64 13 0 0 1 146 130 H0 Z"/></clipPath>
    <clipPath id="bd${uid}"><path id="bp${uid}" d="M146 130 C 158 150 166 166 160 186 C 118 208 96 252 104 298 L316 298 C 324 252 302 208 260 186 C 254 166 262 150 274 130 Z"/></clipPath>
  </defs>
  <circle class="glow" cx="210" cy="300" r="200" fill="url(#gl${uid})"/>
  <path d="M-20 440 C 0 340 90 276 210 272 C 330 276 420 340 440 440 Z" fill="url(#sa${uid})"/>
  <g class="steam" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round">
    <path d="M182 92 C 164 66 198 48 180 16"/><path d="M210 96 C 192 70 228 52 208 18"/><path d="M238 92 C 220 68 254 48 236 14"/>
  </g>
  <g transform="translate(0 22)"><g class="pot">
    <!-- ручка: латунь на заклёпках, тёмный стержень с кольцом -->
    <path d="M286 208 C 326 200 366 172 392 124" fill="none" stroke="#4A2C12" stroke-width="9" stroke-linecap="round"/>
    <path d="M290 206 L336 190" stroke="#B58A3C" stroke-width="12" stroke-linecap="round"/>
    <path d="M290 206 L336 190" stroke="#E6C679" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" transform="translate(0 -3)"/>
    <circle cx="396" cy="116" r="8" fill="none" stroke="#4A2C12" stroke-width="4"/>
    <g fill="#6D4B1B"><circle cx="300" cy="203" r="2.6"/><circle cx="314" cy="198" r="2.6"/><circle cx="328" cy="193" r="2.6"/></g>
    <!-- носик -->
    <path d="M152 126 Q 134 118 124 108 Q 138 138 158 142 Z" fill="#8A4A25"/>
    <!-- корпус -->
    <use href="#bp${uid}" fill="url(#cu${uid})"/>
    <g clip-path="url(#bd${uid})">
      ${dents}
      <rect x="90" y="150" width="240" height="150" fill="url(#soot${uid})" opacity=".0"/>
      <rect x="90" y="236" width="240" height="64" fill="url(#soot${uid})"/>
      <!-- чеканный пояс -->
      <g fill="none" stroke="#2E1408" stroke-opacity=".55" stroke-width="1.6" stroke-linejoin="round">
        <path d="M96 226 Q 210 240 324 226"/><path d="M96 232 Q 210 246 324 232"/>
        <g transform="translate(0 4)">${zig}</g>
        <path d="M96 252 Q 210 266 324 252"/>
        <g transform="translate(0 6)">${tul}</g>
      </g>
      <!-- зелёная патина -->
      <g fill="#58B39A" fill-opacity=".38">
        <path d="M152 176 q-6 8 -2 20 q6 -6 8 -14 z"/><path d="M262 178 q4 12 10 18 q4 -10 -2 -18 z"/>
        <ellipse cx="128" cy="266" rx="9" ry="5"/><ellipse cx="296" cy="272" rx="11" ry="6"/><ellipse cx="204" cy="290" rx="14" ry="4"/>
        <path d="M118 286 q-3 6 0 12 h8 q2 -6 -2 -12 z"/>
      </g>
      <!-- блик -->
      <path d="M142 214 C 124 238 118 266 122 292" fill="none" stroke="#FFE7C2" stroke-opacity=".28" stroke-width="7" stroke-linecap="round"/>
    </g>
    <!-- горловина: луженая внутри -->
    <ellipse cx="210" cy="130" rx="64" ry="13" fill="#2A1008"/>
    <ellipse cx="210" cy="131" rx="58" ry="10" fill="#1A0A04"/>
    <path d="M146 130 A64 13 0 0 1 274 130" fill="none" stroke="#B9B2A4" stroke-width="4"/>
    <g clip-path="url(#fc${uid})"><g class="foam">
      <path d="M154 160 L154 130 C 152 92 268 92 266 130 L266 160 Z" fill="#E7B677"/>
      <path d="M154 130 C 180 142 240 142 266 130 L266 160 L154 160 Z" fill="#C98B4E"/>
      <g fill="#F6D9A8" fill-opacity=".8"><circle cx="188" cy="112" r="5"/><circle cx="214" cy="104" r="6"/><circle cx="238" cy="114" r="4"/><circle cx="204" cy="121" r="3"/></g>
    </g></g>
    <path d="M146 130 A64 13 0 0 0 274 130" fill="none" stroke="#B9B2A4" stroke-width="4"/>
    <path d="M146 130 A64 13 0 0 0 274 130" fill="none" stroke="#6B2F14" stroke-width="1.4" transform="translate(0 2.5)"/>
  </g></g>
  <path d="M20 440 C 40 346 120 290 210 286 C 300 290 380 346 400 440 Z" fill="url(#sa${uid})"/>
  <g class="cup">
    <path d="M36 366 H112 L106 408 Q74 420 42 408 Z" fill="#F1E9D8"/>
    <path d="M38 378 H110" stroke="#C9A24A" stroke-width="3"/>
    <path d="M40 388 H108" stroke="#8E4B26" stroke-width="1.5"/>
    <path d="M112 374 C 130 374 130 396 108 398" fill="none" stroke="#C9A24A" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="74" cy="366" rx="38" ry="7" fill="#5A2E15"/>
    <ellipse cx="74" cy="365" rx="32" ry="5" fill="#C98B4E"/>
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
