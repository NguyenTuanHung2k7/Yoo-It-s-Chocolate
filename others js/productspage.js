const prodContainer = document.querySelector(`.prod-grid-container`);
const emptyContainer = document.querySelector(`.error-Messenger`);


function renderProdCard(products){
    prodContainer.innerHTML  = ``; 
    if(products.length === 0){
        emptyContainer.style.display = `flex`;
        return;
    }
    else emptyContainer.style.display = `none`;


    products.forEach(prod =>{
        let card = document.createElement(`li`);
        if(prod.status === `onSale`){
            card.innerHTML = `
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
        }
        else{
            card.innerHTML = `
            <div class="card seller">
                <div class="product-img">
                    <img src="${prod.img}" alt="">
                </div>
                <label for="">${prod.name}</label>
                <p>$${prod.price.toLocaleString()}</p>
                <button onclick="addtoCart(${prod.id})">Add to cart <span><i class="fa-solid fa-bag-shopping"></i></span></button>
          </div>
        `;
        };
        prodContainer.appendChild(card);
    });
};

// Shuffle Item
function shuffleArray(products) {
    let shuffleProd = [...products];
    for (let i = shuffleProd.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleProd[i], shuffleProd[j]] = [shuffleProd[j], shuffleProd[i]]; 
    }
    return shuffleProd;
};


// Prevent random item when user f5
let shuffleItem = shuffleArray(products);
const savedProducts = sessionStorage.getItem('myShuffledProducts');

if (savedProducts) {
    shuffleItem = JSON.parse(savedProducts);
}
 else {
    shuffleItem = shuffleArray(products);
    sessionStorage.setItem('myShuffledProducts', JSON.stringify(shuffleItem));
};

renderProdCard(shuffleItem);



// MULTIPLE FILTER
const currentStatus = {
    status:`all`,
    type:`all`,
    keyName:``
};

function multipleFilter(){
    const multipfil = shuffleItem.filter(prod => {
        const matchStatus  = currentStatus.status === `all` || prod.status === currentStatus.status;
        const matchType = currentStatus.type === `all`|| prod.type === currentStatus.type;
        const matchName = currentStatus.keyName === `` || prod.name.toLowerCase().includes(currentStatus.keyName);

        return matchStatus && matchType && matchName;
    });

    renderProdCard(multipfil);
}


// Filter Chocolate btn
const typeBtn = document.querySelectorAll(`.type-container span`);
typeBtn.forEach(btn => {
    btn.addEventListener(`click`,b =>{
       typeBtn.forEach(b => b.classList.remove(`active`));
       btn.classList.add(`active`);

        const getChocoType = btn.getAttribute(`data-type`);

        currentStatus.type = getChocoType;
        multipleFilter();
        // if(getChocoType ===  `all`)
        //     renderProdCard(shuffleItem);
        // else{
        //     const filterChoco = products.filter(prod => prod.type === getChocoType);
        //     renderProdCard(filterChoco);
        // }
    });
    
});




//MENU DROPDOWN
const category = [
    {status:`all`},
    {status:`onSale`},
    {status:`hot`},
];

const dropdownWrapper = document.querySelector(`.dropdown-wrapper`);
const dropdownContainer = document.querySelector(`.dropdown-wrapper ul`);
const pTag = document.querySelector(`.dropdown-wrapper p`);
const dropdownIcon = document.querySelector(`.dropdown-wrapper i`);

dropdownWrapper.addEventListener(`click`,()=>{
    dropdownWrapper.classList.toggle(`active`);
     dropdownIcon.classList.toggle(`open`);
});

function renderList(category){
    category.forEach(cat => {
        let list = document.createElement(`li`);
        list.innerHTML = `${cat.status}`;
        if(list.innerHTML == `All`){
            list.classList.add(`active`);
        };

        let listName = list.innerHTML;

        if (listName === `all`) list.innerHTML = `All`;
        if(listName === `onSale`) list.innerHTML = `On Sale`;
        if(listName === `hot`) list.innerHTML = `Popular`;

        list.setAttribute(`data-status`,cat.status.trim());

        dropdownContainer.appendChild(list);
    });
};

renderList(category);

const listCategory = document.querySelectorAll(`.dropdown-wrapper ul li`);
listCategory.forEach(list =>{
    list.addEventListener(`click`,()=>{
       

        pTag.innerHTML = list.textContent;
        listCategory.forEach(li => li.classList.remove(`active`));
        list.classList.add(`active`);
        
        const getCategory = list.getAttribute(`data-status`);

        currentStatus.status = getCategory;
        multipleFilter();
    });
});

// SEARCH ITEMS
const searchInput = document.querySelector(`.search-input`);
searchInput.addEventListener(`input`,()=>{
    currentStatus.keyName = searchInput.value.toLowerCase().trim();
    multipleFilter();
});