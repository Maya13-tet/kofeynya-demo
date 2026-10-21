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

/* ===== джезва на песке ===== */
function cezve(uid) {
  return `<svg class="cez" viewBox="0 0 420 440" data-step="3" role="img" aria-label="Медная джезва на горячем песке, из неё поднимается пена и пар">
  <defs>
    <radialGradient id="gl${uid}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F2B53B" stop-opacity=".9"/><stop offset="1" stop-color="#F2B53B" stop-opacity="0"/></radialGradient>
    <linearGradient id="cu${uid}" x1="0" x2="1"><stop offset="0" stop-color="#8F4521"/><stop offset=".35" stop-color="#EBA46A"/><stop offset=".62" stop-color="#C77A43"/><stop offset="1" stop-color="#7C3A1B"/></linearGradient>
    <linearGradient id="sa${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDCE96"/><stop offset=".55" stop-color="#CFA262"/><stop offset="1" stop-color="#C79A57" stop-opacity="0"/></linearGradient>
  </defs>
  <circle class="glow" cx="210" cy="300" r="200" fill="url(#gl${uid})"/>
  <path d="M-10 440 C 20 366 120 316 210 314 C 300 316 400 366 430 440 Z" fill="url(#sa${uid})"/>
  <g class="steam" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="5" stroke-linecap="round">
    <path d="M182 92 C 164 66 198 48 180 16"/><path d="M210 96 C 192 70 228 52 208 18"/><path d="M238 92 C 220 68 254 48 236 14"/>
  </g>
  <g class="pot">
    <path d="M296 204 L400 152" stroke="#5A3418" stroke-width="11" stroke-linecap="round"/>
    <path d="M286 208 L330 186" stroke="url(#cu${uid})" stroke-width="11" stroke-linecap="round"/>
    <path d="M150 130 C 144 162 126 222 112 300 L 308 300 C 294 222 276 162 270 130 Z" fill="url(#cu${uid})"/>
    <g fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="2"><path d="M138 196 Q210 212 282 196"/><path d="M128 236 Q210 254 292 236"/><path d="M120 272 Q210 292 300 272"/></g>
    <g fill="#fff" fill-opacity=".18"><circle cx="170" cy="170" r="4"/><circle cx="196" cy="214" r="4"/><circle cx="162" cy="250" r="4"/><circle cx="230" cy="180" r="4"/><circle cx="252" cy="236" r="4"/></g>
    <ellipse cx="210" cy="130" rx="60" ry="12" fill="#4A2210"/>
    <g class="foam">
      <path d="M158 160 L158 130 C 156 94 264 94 262 130 L262 160 Z" fill="#E7B677"/>
      <path d="M158 130 C 180 140 240 140 262 130 L262 160 L158 160 Z" fill="#C98B4E"/>
      <g fill="#F6D9A8" fill-opacity=".8"><circle cx="190" cy="112" r="5"/><circle cx="214" cy="106" r="6"/><circle cx="236" cy="114" r="4"/><circle cx="204" cy="120" r="3"/></g>
    </g>
    <ellipse cx="210" cy="130" rx="60" ry="12" fill="none" stroke="#F0B27A" stroke-width="3"/>
  </g>
  <path d="M40 440 C 60 360 140 312 210 310 C 280 312 360 360 380 440 Z" fill="url(#sa${uid})"/>
  <g class="cup">
    <path d="M36 366 H112 L106 408 Q74 420 42 408 Z" fill="#F5F2EB"/>
    <path d="M38 378 H110" stroke="#1C9C9A" stroke-width="3"/>
    <path class="fill" d="M40 372 H108 L106 384 H42 Z" fill="#6B3A1E" transform="translate(0 0)"/>
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
