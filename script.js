const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

cartClose.onclick = () => {
    cart.classList.remove("active");
};


const productContent = document.querySelector("#product-content");


// Load products from JSON

fetch("./shop-item/data.json")
.then(response => response.json())
.then(products => {

    products.forEach(product => {

        let productBox = document.createElement("div");

        productBox.classList.add("product-box");

        productBox.innerHTML = `

        <div class="img-box">
            <img src="${product.image}">
        </div>

        <h2 class="product-title">
            ${product.title}
        </h2>

        <div class="price-and-cart">

            <span class="price">
                ${product.price}
            </span>

            <i class="fa fa-shopping-bag add-cart"></i>

        </div>

        `;

        productContent.appendChild(productBox);


        productBox
        .querySelector(".add-cart")
        .addEventListener("click",()=>{

            addToCart(productBox);

        });


    });

});



const cartContent = document.querySelector(".cart-content");


function addToCart(productBox){


const img =
productBox.querySelector("img").src;


const title =
productBox.querySelector(".product-title").textContent;


const price =
productBox.querySelector(".price").textContent;



const cartTitles =
cartContent.querySelectorAll(".cart-product-title");


for(let item of cartTitles){

    if(item.textContent === title){

        alert("Already added to cart");
        return;

    }

}



const cartBox=document.createElement("div");

cartBox.classList.add("cart-box");


cartBox.innerHTML=`

<img src="${img}" class="cart-img">


<div class="cart-detail">

<h2 class="cart-product-title">
${title}
</h2>


<span class="cart-price">
${price}
</span>


<div class="cart-quantity">

<button class="decrement">
-</button>


<span class="number">
1
</span>


<button class="increment">
+</button>


</div>

</div>


<i class="fa fa-trash cart-remove"></i>

`;



cartContent.appendChild(cartBox);



cartBox.querySelector(".cart-remove")
.onclick=()=>{

cartBox.remove();

updateCartCount(-1);

updateTotalPrice();

};



cartBox.querySelector(".increment")
.onclick=()=>{

let number =
cartBox.querySelector(".number");


number.textContent++;

updateTotalPrice();

};



cartBox.querySelector(".decrement")
.onclick=()=>{


let number =
cartBox.querySelector(".number");


if(number.textContent>1){

number.textContent--;

}


updateTotalPrice();


};



updateCartCount(1);

updateTotalPrice();


}





function updateTotalPrice(){


let total=0;


const boxes =
cartContent.querySelectorAll(".cart-box");



boxes.forEach(box=>{


let price =
box.querySelector(".cart-price")
.textContent.replace("$","");


let qty =
box.querySelector(".number")
.textContent;


total += price * qty;


});


document.querySelector(".total-price")
.textContent="$"+total;


}




let cartItemCount=0;


function updateCartCount(change){


cartItemCount+=change;


const badge =
document.querySelector(".cart-item-count");


if(cartItemCount>0){

badge.style.visibility="visible";

badge.textContent=cartItemCount;


}else{

badge.style.visibility="hidden";

badge.textContent="";

}


}



document.querySelector(".btn-buy")
.onclick=()=>{


if(cartContent.children.length===0){

alert("Your cart is empty");
return;

}


cartContent.innerHTML="";


cartItemCount=0;

updateCartCount(0);

updateTotalPrice();


alert("Thank you for your purchase!");

};