const specialList = document.querySelector(`.prod-grid-container`);

renderSpecialList(products);


function renderSpecialList(products){
    specialList.innerHTML = ``;

    const ItemSpecial = products.filter(prod => prod.status == `onSale` );

    ItemSpecial.forEach(prod =>{
        let list = document.createElement(`li`);

        list.innerHTML = `
        <div class="card sale">
            <div class="discount-wrapper">-${prod.salePercentage}%</div>
            <div class="product-img">
                <img src="${prod.img}" alt="">
            </div>
            <label for="">${prod.name}</label>
            <p>$${prod.salePrice} <span>$${prod.price}</span></p>
            <button onclick="addtoCart(${prod.id})">Add to cart <span><i class="fa-solid fa-bag-shopping"></i></span></button>
        </div>
        `;

        specialList.appendChild(list);
    })
}