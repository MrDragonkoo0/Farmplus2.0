const tg=window.Telegram?.WebApp;
if(tg){tg.ready();tg.expand();}
const content=document.getElementById("content");
const state={money:125430,coins:20,level:4,xp:65};

const sections={
fields:{icon:"🌱",title:"Поля",items:[
["🟫","Поле №1","🌾 Пшениця · 8 га"],["🟩","Поле №2","🌻 Соняшник · 12 га"],["🟫","Поле №3","🥔 Картопля · 5 га"],["🌿","Луг №1","Трава · готовий до косіння"],["🌳","Ділянка дерев №1","10 дерев"],["🫐","Ягідна ділянка №1","20 кущів"]]},
garage:{icon:"🚜",title:"Гараж",items:[
["🚜","ЮМЗ-6","100% · 78 л пального"],["🚜","МТЗ-82","87% · 54 л пального"],["🚛","Вантажівка","94% · готова до роботи"],["🛠️","Обладнання","Косарки · плуги · сівалки"]]},
warehouse:{icon:"📦",title:"Склад",items:[
["🌾","Пшениця","2 450 кг"],["🌿","Трава","780 кг"],["🌻","Соняшник","1 200 кг"],["🥔","Картопля","640 кг"],["🌾","Насіння","320 кг"],["⛽","Пальне","420 л"]]},
animals:{icon:"🐄",title:"Тварини",items:[
["🐄","Корови","12 голів"],["🐖","Свині","8 голів"],["🐑","Вівці","15 голів"],["🥚","Продукція","Молоко · м'ясо · шерсть"]]},
workers:{icon:"👷",title:"Працівники",items:[
["🔧","Механік","Рівень 3 · бонус до зносу"],["🚜","Механізатор","Рівень 4 · бонус до часу"],["📦","Комірник","Рівень 2 · склад"],["💰","Економіст","Рівень 2 · витрати"]]},
orders:{icon:"📋",title:"Замовлення",items:[
["🌾","Пшениця → Млин","18 500 ₴ · 240 XP"],["🥔","Картопля → Магазин","12 800 ₴ · 180 XP"],["🌻","Соняшник → Олійниця","24 600 ₴ · 310 XP"]]},
production:{icon:"🏭",title:"Виробництво",items:[
["🌾","Млин","Пшениця → Борошно"],["🥖","Пекарня","Борошно → Хліб"],["🥛","Молочний цех","Молоко → Продукти"],["🏭","Інші фабрики","Рецепти та черга виробництва"]]},
market:{icon:"🛒",title:"Ринок",items:[
["💰","Ринок ресурсів","Купівля та продаж"],["🤝","Ринок гравців","Обмін між фермерами"],["📦","Мої оголошення","Ваші товари"]]},
quests:{icon:"🎯",title:"Завдання",items:[
["📋","Основні квести","80 завдань"],["📅","Щоденні квести","Нові завдання щодня"],["🏆","Досягнення","Нагороди та прогрес"]]},
profile:{icon:"👤",title:"Профіль",items:[
["⭐","Рівень ферми","4 · XP 65%"],["💰","Баланс",`${state.money.toLocaleString("uk-UA")} ₴`],["🪙","FarmCoins",`${state.coins} FC`],["📊","Статистика","Доходи · врожаї · техніка"],["📖","Журнал ферми","Історія подій"]]}
};

function home(){
content.innerHTML=`<section class="hero"><div class="avatar">👨‍🌾</div><div class="info">
<small>Моя ферма</small><h1>Фермер</h1>
<div class="stats money">💰 <b>${state.money.toLocaleString("uk-UA")}</b> ₴ <span>🪙 <b>${state.coins}</b> FC</span></div>
<div class="stats muted">⭐ Рівень <b>${state.level}</b> · XP <b>${state.xp}%</b></div>
<div class="xp"><i></i></div></div></section>
<section><div class="title"><h2>🌱 ПОЛЯ</h2><button class="link" data-page="fields">Усі →</button></div>
<div class="fields">${sections.fields.items.slice(0,3).map(x=>`<button class="field" data-page="fields"><span class="ico">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div>›</button>`).join("")}</div></section>
<section><h2>⚡ РОЗДІЛИ</h2><div class="tiles">${[
["🏭","Виробництво","production"],["🚜","Техніка","garage"],["📦","Склад","warehouse"],["🐄","Тварини","animals"],["👷","Працівники","workers"],["📋","Замовлення","orders"]
].map(x=>`<button class="tile" data-page="${x[2]}"><span class="ico">${x[0]}</span><b>${x[1]}</b></button>`).join("")}</div></section>
<section class="quick"><div class="q">🌦️ <b>Погода</b><small>☀️ Ясно · +24°C</small></div><div class="q">🍂 <b>Сезон</b><small>Літо · місяць 6</small></div></section>
<section><div class="tiles"><button class="tile" data-page="market">🛒<b>Ринок</b></button><button class="tile" data-page="quests">🎯<b>Завдання</b></button></div></section>`;
bind();
}

function page(key){
const s=sections[key]||sections.profile;
content.innerHTML=`<div class="page-head"><button class="back" data-page="home">← Назад</button><h1>${s.icon} ${s.title}</h1><small>Farm+ Mini App</small></div>
<div class="list">${s.items.map(x=>`<div class="row"><span class="ico">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div><span>›</span></div>`).join("")}</div>`;
bind();
}

function bind(){
document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>{const p=b.dataset.page;p==="home"?home():page(p);});
document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===state.page));
}
document.getElementById("settings").onclick=()=>tg?.showPopup?tg.showPopup({title:"Farm+",message:"Налаштування Farm+ Mini App"}):alert("Налаштування Farm+");
state.page="home";home();
