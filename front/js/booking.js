const dateInput = document.getElementById("date");
const submitBtn = document.getElementById("submitBtn");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");
const heartContainer = document.getElementById("heart-container");

/* ===========================================
   Không cho chọn ngày quá khứ
=========================================== */

const today = new Date();

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

dateInput.min = `${yyyy}-${mm}-${dd}`;


/* ===========================================
   Button Okay
=========================================== */

submitBtn.addEventListener("click", () => {

    const date = dateInput.value;

    if (!date) {
        alert("💕 Em chọn giúp tớ ngày mình đi chơi nhaaaa!");
        return;
    }

    const checkedFoods = document.querySelectorAll(
        ".food-item input:checked"
    );

    const foods = [];

    checkedFoods.forEach(item => {
        foods.push(item.value);
    });

    const otherFood = document
        .getElementById("otherFood")
        .value
        .trim();

    if (otherFood !== "") {
        foods.push(otherFood);
    }

    if (foods.length === 0) {
        alert("🍜 Em chọn ít nhất một món nha ❤️");
        return;
    }

    createExplosion();

    popupMessage.innerHTML = buildMessage(date, foods);

    popup.classList.add("show");

});


/* ===========================================
   Build popup message
=========================================== */

function buildMessage(date, foods){

    return `
        <p>
            💖 Tớ nhận được thông tin rùi
        </p>

        <br>

        <p>

            📅 <b>Ngày mình đi chơi</b>

            <br>

            ${formatDate(date)}

        </p>

        <br>

        <p>

            🍣 <b>Món em muốn ăn</b>

        </p>

        <p>

            ${foods.join("<br>")}

        </p>

        <br>

        <p>

            ❤️ Tớ sẽ chuẩn bị và tới đón em nhaaa!

        </p>
    `;

}


/* ===========================================
   Format Date
=========================================== */

function formatDate(date){

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2,"0");
    const month = String(d.getMonth()+1).padStart(2,"0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;

}


/* ===========================================
   Close popup
=========================================== */

closePopup.addEventListener("click",()=>{

    popup.classList.remove("show");

});

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.classList.remove("show");

    }

});


/* ===========================================
   Heart Explosion
=========================================== */

function createExplosion(){

    for(let i=0;i<80;i++){

        createHeart();

    }

}


function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    const icons=[
        "💖",
        "💕",
        "❤️",
        "💗",
        "🌸",
        "✨"
    ];

    heart.innerHTML=
        icons[Math.floor(Math.random()*icons.length)];

    heart.style.left=
        Math.random()*window.innerWidth+"px";

    heart.style.top=
        window.innerHeight+"px";

    heart.style.fontSize=
        (18+Math.random()*20)+"px";

    heart.style.animationDuration=
        (3+Math.random()*2)+"s";

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },5000);

}


/* ===========================================
   Background Hearts
=========================================== */

setInterval(()=>{

    const heart=document.createElement("div");

    heart.className="heart";

    const icons=["💖","💕","✨"];

    heart.innerHTML=
        icons[Math.floor(Math.random()*icons.length)];

    heart.style.left=
        Math.random()*window.innerWidth+"px";

    heart.style.top=
        window.innerHeight+"px";

    heart.style.fontSize="18px";

    heart.style.opacity=".45";

    heart.style.animationDuration="5s";

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },5000);

},900);