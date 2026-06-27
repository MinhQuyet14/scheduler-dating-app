const yesBtn         = document.getElementById("yesBtn");
const noBtn          = document.getElementById("noBtn");
const buttonsEl      = document.querySelector(".buttons");
const heartContainer = document.getElementById("heart-container");

const SAFE_DISTANCE = 100;
const RADIUS        = 80;

let escaped     = false;
let canMove     = true;
let escapeCount = 0;
let originX     = 0;
let originY     = 0;

/* ===========================================
   Khởi tạo sau khi layout đã render xong
=========================================== */

function initNoBtn() {

    // Đọc vị trí no-btn khi nó vẫn còn trong flex flow
    const btnRect       = noBtn.getBoundingClientRect();
    const containerRect = buttonsEl.getBoundingClientRect();

    // Tọa độ tương đối so với .buttons
    originX = btnRect.left - containerRect.left;
    originY = btnRect.top  - containerRect.top;

    // Cố định kích thước container trước khi no-btn ra khỏi flow
    buttonsEl.style.width     = buttonsEl.offsetWidth  + "px";
    buttonsEl.style.height    = buttonsEl.offsetHeight + "px";
    buttonsEl.style.position  = "relative";

    // Giữ yes-btn đứng yên tại đúng vị trí hiện tại bằng absolute
    const yesBtnRect = yesBtn.getBoundingClientRect();
    yesBtn.style.position = "absolute";
    yesBtn.style.left     = (yesBtnRect.left - containerRect.left) + "px";
    yesBtn.style.top      = (yesBtnRect.top  - containerRect.top)  + "px";

    // Chuyển no-btn sang absolute tại đúng vị trí ban đầu
    noBtn.style.position = "absolute";
    noBtn.style.left     = originX + "px";
    noBtn.style.top      = originY + "px";

}

window.addEventListener("load", initNoBtn);


/* ===========================================
   Hover → chạy trốn
=========================================== */

noBtn.addEventListener("mouseenter", () => {

    if (!canMove) return;

    escaped = true;
    moveButton();

});

document.addEventListener("mousemove", (e) => {

    if (!escaped || !canMove) return;

    const rect    = noBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    if (Math.sqrt(dx * dx + dy * dy) < SAFE_DISTANCE) {
        moveButton();
    }

});


/* ===========================================
   Di chuyển trong bán kính RADIUS quanh origin
=========================================== */

function moveButton() {

    if (!canMove) return;
    canMove = false;

    noBtn.classList.add("escape");

    const containerW = buttonsEl.offsetWidth;
    const containerH = buttonsEl.offsetHeight;
    const btnW       = noBtn.offsetWidth;
    const btnH       = noBtn.offsetHeight;

    const curX = parseFloat(noBtn.style.left) || originX;
    const curY = parseFloat(noBtn.style.top)  || originY;

    let x, y, attempts = 0;

    do {

        const angle = Math.random() * 2 * Math.PI;
        const dist  = (0.4 + Math.random() * 0.6) * RADIUS;

        x = originX + Math.cos(angle) * dist;
        y = originY + Math.sin(angle) * dist;

        // Clamp trong .buttons
        x = Math.min(Math.max(x, 0), containerW - btnW);
        y = Math.min(Math.max(y, 0), containerH - btnH);

        attempts++;

    } while (
        attempts < 20 &&
        Math.abs(x - curX) < 40 &&
        Math.abs(y - curY) < 40
        );

    noBtn.style.left = `${x}px`;
    noBtn.style.top  = `${y}px`;

    updateText();

    setTimeout(() => {
        noBtn.classList.remove("escape");
        canMove = true;
    }, 220);

}


/* ===========================================
   Đổi text
=========================================== */

function updateText() {

    escapeCount++;

    if      (escapeCount < 3)  noBtn.innerHTML = "Không đâu 🙈";
    else if (escapeCount < 6)  noBtn.innerHTML = "Ơ kìa 🥺";
    else if (escapeCount < 9)  noBtn.innerHTML = "Đừng mà 😭";
    else if (escapeCount < 12) noBtn.innerHTML = "🥹 Xin đó";
    else                       noBtn.innerHTML = "Pleaseeeeeeee 🥹";

}


/* ===========================================
   Click đồng ý
=========================================== */

yesBtn.addEventListener("click", () => {

    createExplosion();
    setTimeout(() => { location.href = "booking.html"; }, 1200);

});


/* ===========================================
   Tim bay
=========================================== */

function createExplosion() {
    for (let i = 0; i < 60; i++) createHeart();
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

setInterval(() => createHeart(), 800);