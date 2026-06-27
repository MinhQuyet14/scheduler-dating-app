const dateInput      = document.getElementById("date");
const submitBtn      = document.getElementById("submitBtn");
const popup          = document.getElementById("popup");
const popupMessage   = document.getElementById("popupMessage");
const closePopup     = document.getElementById("closePopup");
const heartContainer = document.getElementById("heart-container");

/* ===========================================
   EmailJS config
=========================================== */

const EMAILJS_SERVICE_ID  = "service_xi54xza";
const EMAILJS_TEMPLATE_ID = "template_ugctv6k";
const EMAILJS_PUBLIC_KEY  = "PE0PgIv6_dv65SEAx";

/* ===========================================
=========================================== */

const today = new Date();
const yyyy  = today.getFullYear();
const mm    = String(today.getMonth() + 1).padStart(2, "0");
const dd    = String(today.getDate()).padStart(2, "0");

dateInput.min = `${yyyy}-${mm}-${dd}`;


/* ===========================================
   Button Okay
=========================================== */

submitBtn.addEventListener("click", () => {

    const date = dateInput.value;

    if (!date) {
        alert("💕 Em chọn giúp tớ ngày mình đi chơi nhé!");
        return;
    }

    const foods = [];

    document.querySelectorAll(".food-item input:checked").forEach(item => {
        foods.push(item.value);
    });

    const otherFood = document.getElementById("otherFood").value.trim();
    if (otherFood !== "") {
        foods.push(otherFood);
    }

    sendEmail(date, foods);

    createExplosion();

    popupMessage.innerHTML = buildMessage(date, foods);

    popup.classList.add("show");

});


/* ===========================================
   EmailJS
=========================================== */

function sendEmail(date, foods) {

    const foodText = foods.length > 0
        ? foods.join(", ")
        : "Chưa chọn món (để tớ bất ngờ 🍴)";

    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
            date:  formatDate(date),
            foods: foodText,
        },
        EMAILJS_PUBLIC_KEY
    ).then(() => {
        console.log("Email đã gửi thành công!");
    }).catch((error) => {
        console.error("Gửi email thất bại:", error);
    });

}


/* ===========================================
   Build popup message
=========================================== */

function buildMessage(date, foods) {

    const foodSection = foods.length > 0
        ? `<p>🍣 <b>Món em muốn ăn</b><br>${foods.join("<br>")}</p><br>`
        : `<p>🍴 Tớ sẽ chọn món bất ngờ cho em nhé~</p><br>`;

    return `
        <p>💖 Tớ rất vui vì em đã đồng ý!</p>
        <br>
        <p>📅 <b>Ngày mình đi chơi</b><br>${formatDate(date)}</p>
        <br>
        ${foodSection}
        <p>❤️ Tớ sẽ chuẩn bị và qua đón em nhaaaa!</p>
    `;

}


/* ===========================================
   Format Date
=========================================== */

function formatDate(date) {

    const d     = new Date(date);
    const day   = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year  = d.getFullYear();

    return `${day}/${month}/${year}`;

}


/* ===========================================
   Close popup
=========================================== */

closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
});

popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.remove("show");
    }
});


/* ===========================================
   Heart Explosion
=========================================== */

function createExplosion() {
    for (let i = 0; i < 80; i++) createHeart();
}

function createHeart() {

    const heart = document.createElement("div");
    heart.className = "heart";

    const icons = ["💖","💕","❤️","💗","🌸","✨"];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    heart.style.left              = Math.random() * window.innerWidth + "px";
    heart.style.top               = window.innerHeight + "px";
    heart.style.fontSize          = (18 + Math.random() * 20) + "px";
    heart.style.animationDuration = (3  + Math.random() * 2)  + "s";

    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);

}


/* ===========================================
   Background Hearts
=========================================== */

setInterval(() => {

    const heart = document.createElement("div");
    heart.className = "heart";

    const icons = ["💖","💕","✨"];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    heart.style.left              = Math.random() * window.innerWidth + "px";
    heart.style.top               = window.innerHeight + "px";
    heart.style.fontSize          = "18px";
    heart.style.opacity           = ".45";
    heart.style.animationDuration = "5s";

    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);

}, 900);