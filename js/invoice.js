const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const customerName =
localStorage.getItem("customerName")
|| "عميل";

function generateInvoiceNumber(){

const now = new Date();

const year =
String(now.getFullYear()).slice(-2);

const month =
String(now.getMonth()+1)
.padStart(2,"0");

const day =
String(now.getDate())
.padStart(2,"0");

const random =
Math.floor(
1000 + Math.random()*9000
);

return `INV-${year}${month}${day}-${random}`;

}

const invoiceNumber =
generateInvoiceNumber();

document.getElementById(
"invoiceNumber"
).innerText = invoiceNumber;

document.getElementById(
"invoiceDate"
).innerText =
new Date().toLocaleDateString("ar-YE");

document.getElementById(
"customerName"
).innerText =
customerName;

let html = "";

let total = 0;

cart.forEach(item=>{

const itemTotal =
item.price * item.qty;

total += itemTotal;

html += `

<tr>

<td>${item.name}</td>

<td>${item.qty}</td>

<td>${item.price}</td>

<td>${itemTotal}</td>

</tr>

`;

});

document.getElementById(
"invoiceItems"
).innerHTML = html;

document.getElementById(
"invoiceTotal"
).innerHTML =
`الإجمالي النهائي: ${total} ريال`;

function sendInvoiceWhatsApp(){

let message =
`طلب جديد من مطاعم النخلة

رقم الفاتورة:
${invoiceNumber}

اسم العميل:
${customerName}

`;

cart.forEach(item=>{

message +=
`${item.name} × ${item.qty}
`;

});

message +=
`\nالإجمالي:
${total} ريال`;

window.open(
`https://wa.me/967730244894?text=${encodeURIComponent(message)}`
);

}
