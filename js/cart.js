const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbxboKf6vqFvM7DALgDGGDnea7TY_9_tlMBAVtqLrzjBSmepBivvOqMohquzJfK4xhFokA/exec";

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
}

function renderCart() {

const container =
document.getElementById("cartItems");

if(!container) return;

container.innerHTML = "";

if(cart.length === 0){

container.innerHTML = `
<p style="text-align:center">
السلة فارغة
</p>
`;

document.getElementById("totalPrice").innerText = "0";
return;
}

let total = 0;

cart.forEach(item=>{

total += item.price * item.qty;

container.innerHTML += `

<div class="cart-card">

<img
src="${item.image}"
style="
width:100%;
height:220px;
object-fit:cover;
border-radius:20px;
">

<h3>${item.name}</h3>

<p>${item.price} ريال</p>

<div
style="
display:flex;
justify-content:center;
gap:15px;
align-items:center;
">

<button
onclick="increaseQty(${item.id})">
+
</button>

<span>${item.qty}</span>

<button
onclick="decreaseQty(${item.id})">
-
</button>

</div>

</div>

`;
});

document.getElementById("totalPrice")
.innerText = total;

}

function increaseQty(id){

const item =
cart.find(i=>i.id===id);

if(item){
item.qty++;
saveCart();
}

}

function decreaseQty(id){

const item =
cart.find(i=>i.id===id);

if(!item) return;

item.qty--;

if(item.qty <= 0){

cart =
cart.filter(i=>i.id!==id);

}

saveCart();

}

async function sendOrder(){

const customerName =
document.getElementById("customerName").value;

if(!customerName){

alert("اكتب اسم العميل");
return;

}

let orderText = "";

cart.forEach(item=>{

orderText +=
`${item.name} × ${item.qty}\n`;

});

const total =
cart.reduce(
(sum,item)=>
sum+(item.price*item.qty),
0
);

const data = {

customer: customerName,
orders: orderText,
total: total,
phone: "+967730244894"

};

try{

await fetch(
WEB_APP_URL,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(data)
}
);

}catch(error){

console.log(error);

}

const message =

`طلب جديد من مطاعم النخلة

اسم العميل:
${customerName}

${orderText}

الإجمالي:
${total} ريال`;

window.open(

`https://wa.me/967730244894?text=${encodeURIComponent(message)}`,

"_blank"

);

}

renderCart();
