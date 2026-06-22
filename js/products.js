const products = [

{
id:1,
name:"حنيذ",
price:4500,
category:"وجبات رئيسية",
image:"images/haneeth.jpg"
},

{
id:2,
name:"مضغوط",
price:4000,
category:"وجبات رئيسية",
image:"images/Madawt.jpg"
},

{
id:3,
name:"زربيان",
price:4500,
category:"وجبات رئيسية",
image:"images/Zurbian.jpg"
},

{
id:4,
name:"برجر لحم",
price:1800,
category:"وجبات رئيسية",
image:"images/burger.jpg"
},

{
id:5,
name:"شاورما",
price:1500,
category:"وجبات رئيسية",
image:"images/shawarma.jpg"
},

{
id:6,
name:"فحسة",
price:2500,
category:"مقبلات",
image:"images/Fahsah.jpg"
},

{
id:7,
name:"حمص",
price:1000,
category:"مقبلات",
image:"images/hummus.jpg"
},

{
id:8,
name:"عريكة",
price:1200,
category:"مقبلات",
image:"images/Areekah.jpg"
},

{
id:9,
name:"كباب",
price:2200,
category:"مشويات",
image:"images/kebab.jpg"
},

{
id:10,
name:"مشويات مشكلة",
price:5500,
category:"مشويات",
image:"images/grill.jpg"
},

{
id:11,
name:"بيتزا",
price:3000,
category:"بيتزا",
image:"images/Pizza.jpg"
},

{
id:12,
name:"مشروبات متنوعة",
price:700,
category:"مشروبات",
image:"images/drinks.jpg"
},

{
id:13,
name:"بيبسي",
price:500,
category:"مشروبات",
image:"images/pepsi.jpg"
}

];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem(
"cart",
JSON.stringify(cart)
);
updateCartCount();
}

function updateCartCount(){

const count =
cart.reduce(
(sum,item)=>sum+item.qty,
0
);

const badge =
document.getElementById("cartCount");

if(badge){
badge.innerText=count;
}

}

function addToCart(id){

const product =
products.find(p=>p.id===id);

const existing =
cart.find(item=>item.id===id);

if(existing){

existing.qty++;

}else{

cart.push({
...product,
qty:1
});

}

saveCart();

alert("تمت الإضافة للسلة");

}

function renderProducts(){

const container =
document.getElementById("products");

if(!container) return;

container.innerHTML="";

products.forEach(product=>{

container.innerHTML += `

<div class="product-card"
data-category="${product.category}">

<img
src="${product.image}"
class="product-image">

<div class="product-content">

<div class="category-tag">
${product.category}
</div>

<h3 class="product-name">
${product.name}
</h3>

<div class="price">
${product.price} ريال
</div>

<button
class="add-btn"
onclick="addToCart(${product.id})">
إضافة للسلة
</button>

</div>

</div>

`;

});

}

renderProducts();
updateCartCount();
