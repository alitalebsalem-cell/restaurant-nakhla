let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

function renderCart(){

const container =
document.getElementById("cartContainer");

if(!container) return;

let html = "";
let total = 0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

html += `

<div class="cart-item">

<img src="${item.image}">

<div class="item-name">
${item.name}
</div>

<div class="item-price">
${item.price} ريال
</div>

<div class="qty-box">

<button
class="qty-btn"
onclick="decreaseQty(${index})">
-
</button>

<span>
${item.qty}
</span>

<button
class="qty-btn"
onclick="increaseQty(${index})">
+
</button>

</div>

</div>

`;

});

container.innerHTML = html;

document.getElementById(
"totalPrice"
).innerText =
total + " ريال";

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

function increaseQty(index){

cart[index].qty++;

renderCart();

}

function decreaseQty(index){

cart[index].qty--;

if(cart[index].qty <= 0){

cart.splice(index,1);

}

renderCart();

}

function sendWhatsApp(){

let name =
document.getElementById(
"customerName"
).value;

if(name===""){

alert("اكتب اسم العميل");

return;

}

localStorage.setItem(
"customerName",
name
);

window.location.href =
"invoice.html";

}

renderCart();
