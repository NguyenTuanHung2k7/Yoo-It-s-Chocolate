const cartIcon = document.querySelector(`.cart-icon`);
const cartContainer = document.querySelector(`.cart-container`);
const closeCart = document.querySelector(`.close-cart`);
const overlay = document.querySelector(`.overlay`);

//Trigger Cart
cartIcon.addEventListener(`click`,()=>{
    cartContainer.classList.add(`active`);
    if(overlay)overlay.classList.add(`active`);
    document.body.style.overflow = `hidden`;
})
//Close Cart
closeCart.addEventListener(`click`,()=>{
    cartContainer.classList.remove(`active`);
    if(overlay) overlay.classList.remove(`active`);
    document.body.style.overflow = `auto`;
})


//CART
const listHotStatus = document.querySelector(`.card-grid`);
const listOnSale = document.querySelector(`.card-grid.sale`);
const listofOther = document.querySelector(`.card-grid.other`);

// let myListCards = [];

let myListCards = localStorage.getItem(`myCart`) 
    ? JSON.parse(localStorage.getItem(`myCart`))
    : [];

function renderCard(){
    if (!listHotStatus || !listOnSale || !listofOther) return;
    if (!products || products.length === 0) return;

    const popular = products.filter(items => items.status == `hot`).slice(1);
    const onSale = products.filter(items => items.status === `onSale`);
    const otherProd = products.filter(items => items.status != `hot` && items.status != `onSale`).slice(0,4);

    
    popular.forEach((prod, key) =>{
        let card = document.createElement(`div`);

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
        listHotStatus.appendChild(card);
    });

    onSale.forEach((prod,key)=> {
        let card = document.createElement(`div`);
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
        listOnSale.appendChild(card);
    });

    otherProd.forEach((prod,key)=>{
        let card = document.createElement(`div`);
        card.innerHTML = `
        <div class="card seller">
            <div class="product-img">
                <img src="${prod.img}" alt="">
             </div>
            <label for="">${prod.name}</label>
            <p>$${prod.price.toLocaleString()}</p>
            <button onclick="addtoCart(${prod.id},${prod.name})">Add to cart <span><i class="fa-solid fa-bag-shopping"></i></span></button>
        </div>
        `;
        listofOther.appendChild(card);
    })
}

const quantityDisplay = document.querySelector(`.quantity span`);
const cartListContainer = document.querySelector(`.cart-list-container`);
const totalPrice = document.querySelector(`.checkout-section section label .total-price`);
const cartcount = document.querySelector(`.cartcount`);
const checkoutBtn = document.querySelector(`.checkout`);
const emptyCartMess = document.querySelector(`.empty-cart-mess`);

function addtoCart(id,prodName){
    // if(myListCards[key] == null){
    //     myListCards[key] = products[key];
    //     myListCards[key].quantity = 1;
    // };
    const findCurrentId = products.find(prod => prod.id === id);
    const existingItem = myListCards.find(prod => prod.id === id);

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
        myListCards.push({...findCurrentId, quantity:1});
    }
    reloadCard();
    triggerNotification();
}


function triggerNotification(){
    const text = document.querySelector(`.notifi-text h1`);
    const meterBar = document.querySelector(`.meter-bar`);
    const showNotifi = document.querySelector(`.item-notification`);

    meterBar.classList.remove(`active`);
    
    void meterBar.offsetWidth;
    
    meterBar.classList.add(`active`);

    showNotifi.classList.add(`active`);
    setTimeout(() => {
        showNotifi.classList.remove(`active`);      
        meterBar.classList.remove(`active`);
    }, 1500);

}

function reloadCard(){

    if(!cartListContainer) return;

    cartListContainer.innerHTML = ``;
    let count = 0;
    let total = 0;

    if(myListCards.length === 0){
        emptyCartMess.classList.add(`active`);
        cartListContainer.classList.add(`hide`);
    }
    else{
        emptyCartMess.classList.remove(`active`);
        cartListContainer.classList.remove(`hide`);
    }
    
    myListCards.forEach((prod,key)=>{
        const unitPrice = prod.status === `onSale` ? prod.salePrice : prod.price;
        total += unitPrice * prod.quantity;
        count += prod.quantity;

        

        let list = document.createElement(`li`);
        if(prod.status === `onSale`){
            list.innerHTML = `
             <div class="item-info">
                    <div class="item-img">
                        <img src="${prod.img}" alt="">
                    </div>
                    <label for="">${prod.name}</label>
                    
                </div>
                <div class="item-section">
                <div class="quantity">
                         <p>${prod.quantity}</p>
                         <div class="quantity-btn">
                             <button class="plus"><i class="fa-solid fa-caret-up"></i></i></button>
                            <button class="minus"><i class="fa-solid fa-caret-down"></i></button>
                         </div>
                    </div>
                    <div class="item-price">
                        <p>$${(unitPrice * prod.quantity).toLocaleString()} <span>$${prod.price}</span></p>
                    </div>
                <div class="remove-btn">
                    <button class="remove-list">remove</button>
                </div>
                </div>

        `;
        }
        else{
            list.innerHTML = `
             <div class="item-info">
                    <div class="item-img">
                        <img src="${prod.img}" alt="">
                    </div>
                    <label for="">${prod.name}</label>
                    
                </div>
                <div class="item-section">
                <div class="quantity">
                         <p>${prod.quantity}</p>
                         <div class="quantity-btn">
                             <button class="plus"><i class="fa-solid fa-caret-up"></i></i></button>
                            <button class="minus"><i class="fa-solid fa-caret-down"></i></button>
                         </div>
                    </div>
                    <div class="item-price">
                        <p>$${(unitPrice * prod.quantity).toLocaleString()}</p>
                    </div>
                <div class="remove-btn">
                    <button class="remove-list">remove</button>
                </div>
                </div>

        `;
        }
        
        cartListContainer.appendChild(list);

        //Delete list 
        const removeItem = list.querySelector(`.remove-list`);
            removeItem.addEventListener(`click`, ()=>{
            myListCards = myListCards.filter(item => item.id != prod.id);
            reloadCard();
        });

        //
        const SubItem = list.querySelector(`.minus`);
        SubItem.addEventListener(`click`, ()=>{
            if(prod.quantity > 1){
                prod.quantity -= 1;
            }
            else{
                myListCards = myListCards.filter(item => item.id !== prod.id);
            };
            reloadCard();
        });

        const plusItem = list.querySelector(`.plus`);
        plusItem.addEventListener(`click`, ()=>{
            prod.quantity += 1;
            reloadCard();
        })
        
    });

   
    //Update count
    if(quantityDisplay) quantityDisplay.textContent = `${count}`;
    if(totalPrice)  totalPrice.textContent = `$`+ total.toLocaleString() ;
    if(cartcount)  cartcount.innerHTML = count;
   
    saveMyCart();
};

 checkoutBtn.addEventListener(`click`,()=> {
    if(myListCards.length < 1){
        alert(`You have no item Yet!!`);
        return;
    }
    else{

    myListCards =[];
    localStorage.removeItem(`myCard`);
    reloadCard();
    alert(`Thank for Purchase!!💕❤️💕`);
    cartContainer.classList.remove(`active`);
    overlay.classList.remove(`active`);
    };
 });

console.log(myListCards);

renderCard();
reloadCard();
//SAVE to Local Storage
function saveMyCart(){
    localStorage.setItem(`myCart`,JSON.stringify(myListCards));
};





//IMAGE SLIDER
let indexValue = 1;
const contentSlider = document.querySelector(`.img-slider .content`);
const img_Slider = document.querySelector(`.img-slider`);

showImg(indexValue);
function showImg(e){
    if(!img_Slider || !contentSlider) return;

    const slide = document.querySelectorAll(`.content .slide`);
    const bullets = document.querySelectorAll(`.bullets-slider span`);
    if(e > slide.length) indexValue = 1;
    if(e < 1) indexValue = slide.length;

    if(slide.length === 0) return;

    bullets.forEach(bullet => bullet.classList.remove(`active`));
    bullets[indexValue - 1].classList.add(`active`);
     contentSlider.style.transform = `translateX(-${(indexValue -1)*100}%)`;
}
function triggerTextAnimation() {
    const textAnitmating = document.querySelectorAll(`.slide .text-content`);
    
    if (textAnitmating) {
        textAnitmating.forEach(text =>{
            text.classList.remove(`fade`);
            void text.offsetWidth;
            text.classList.add(`fade`);  
        });
    };
};

function initSlide(){
    isAutoSlide = setInterval(() => {
        showImg(++indexValue);
        triggerTextAnimation();
    }, 6000);
};

initSlide();
triggerTextAnimation();

const nextBtn = document.querySelector(`.right`);
if(nextBtn){
    nextBtn.addEventListener(`click`,()=>{
    clearInterval(isAutoSlide);
    showImg(indexValue  += 1) ;
    triggerTextAnimation();
    initSlide();
});
}

//prevbtn
const prevBtn = document.querySelector(`.left`);
if(prevBtn){
    prevBtn.addEventListener(`click`,()=>{
    clearInterval(isAutoSlide);
    showImg(indexValue -= 1);
    triggerTextAnimation();
    initSlide();
});
}

//Bullet event
const bulletsSlider = document.querySelectorAll(`.bullets-slider span`);
if(bulletsSlider){
    bulletsSlider.forEach((bullet, index) =>{
    bullet.addEventListener(`click`,()=>{
        clearInterval(isAutoSlide);
        showImg(indexValue = index +1);
        triggerTextAnimation();
        initSlide();
    });
});
}




// LOGIN FORM
const loginBtn = document.querySelector(`.login-btn`);
const closeFormBtn = document.querySelector(`.close-form`);
const overlayofLoginForm = document.querySelector(`.overlay2`);



const registerLink = document.querySelector(`.register-`);
const linkToLogin = document.querySelector(`.login-`);
const formSection = document.querySelector(`.form-section`);
const sectionForm = document.querySelector(`.form-section section`);

registerLink.addEventListener(`click`,()=>{
    sectionForm.classList.add(`active`);
    formSection.classList.add(`extended`);
});

linkToLogin.addEventListener(`click`,()=>{
    sectionForm.classList.remove(`active`);
    formSection.classList.remove(`extended`);
});


//Trigger login form
loginBtn.addEventListener(`click`,()=>{
    formSection.classList.add(`active`);
    overlayofLoginForm.classList.add(`active`);

    document.body.style.overflow = `hidden`;
});

closeFormBtn.addEventListener(`click`,()=>{
    // sectionForm.classList.remove(`active`);
    // formSection.classList.remove(`extended`);
    formSection.classList.remove(`active`);
    overlayofLoginForm.classList.remove(`active`);
     document.body.style.overflow = ``;
    setTimeout(() => {
        sectionForm.classList.remove(`active`);
        formSection.classList.remove(`extended`);
    }, 1000);
})



// LOGIN VALIDATION

// success notification
const successNotification = document.querySelector(`.success-notification`);
const loginForm = document.querySelector(`.login-form`);


const inputName = document.querySelector(`.admin`);
const inputPass = document.querySelector(`.admin-pass`);
const submitBtn = document.querySelector(`.submit-btn`);
const checkBox = document.querySelector(`#remember`);

const label = document.querySelector(`.check label `);

checkBox.addEventListener(`change`,()=>{
if(checkBox.checked) {
    checkBox.classList.remove(`error`);
    label.classList.remove(`error`);
};
});


if(submitBtn){


submitBtn.addEventListener(`click`,(e)=>{
    e.preventDefault();

    let userName = inputName.value;
    let userPassword = inputPass.value;

    const requiredValid = checkRequired([inputName,inputPass]);


    if(requiredValid){
        const isAdmin = checkAdminIsValid(inputName);
        const isAdminPass = checkAdminPass(inputPass);
        const isMark = checkPolicy(checkBox)

        const amdinValid = isAdmin && isAdminPass;

        if(isAdmin && isAdminPass && isMark){
            loginForm.classList.add(`hide`);
            successNotification.classList.add(`show`);
            setTimeout(()=>{
                window.location.href = "index.html";
            },2000);    
        };
    };
});

function showError(input,message){
    const iptContainer = input.parentElement;
    iptContainer.classList.add(`error`);
    const smallTag = iptContainer.querySelector(`small`);
    smallTag.innerHTML = message;
   
};

function showSuccess(input){
    const iptContainer = input.parentElement;
    iptContainer.classList.remove(`error`);
    const smallTag = iptContainer.querySelector(`small`);
    smallTag.innerHTML = ``;
};

function checkRequired(inpArray){
    let isValid = true;
    inpArray.forEach(ipt =>{
        if(ipt.value.trim() === ``){
            showError(ipt,`${getIptName(ipt)} is Required!`);
            return isValid;
        }
        else{
            showSuccess(ipt);
        }
    });
    return isValid;
};

function checkAdminIsValid(input){

    if(input.value.trim() !== `gialinhdo`){
        showError(input,`${getIptName(input)}'s invalid!`);
        return false;
    }    
    else{
        showSuccess(input);
        return true;
    };
};

function checkAdminPass(input){

    if(input.value.trim() !== `12345`){
        showError(input,`${getIptName(input)}'s invalid!`);
        return false;
    }
    else{
        showSuccess(input);
        return true;
    };
};


function checkPolicy(check){
    if(!check.checked){
        
        label.classList.add(`error`);
        check.classList.add(`error`);
        return false;
    }
    else{
        label.classList.remove(`error`);
        check.classList.remove(`error`);
        return true;
    };
};

function getIptName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
};

//REGISTEER VALIDATOR
const registerForm = document.querySelector(`.register-form`);

const userName = document.querySelector(`#userName`);
const userEmail = document.querySelector(`#userEmail`);
const userPassword = document.querySelector(`#userPass`);
const userPasswordMatch = document.querySelector(`#userMatch`);
const userConsent = document.querySelector(`.accept input`);
const labelTag = document.querySelector(`.accept label`);

const registerBtn = document.querySelector(`.register-btn`);

if(registerBtn){


registerBtn.addEventListener(`click`,()=>{
    const checkIsValid = checkUserRequired([userName,userEmail,userPassword,userPasswordMatch]);

    if(checkIsValid){
        const isUserName = checkUsername(userName,3,15);
        const isEmail = checkEmail(userEmail);
        const isPassword = checkPassword(userPassword,8,18);
        const isPasswordMatch = checkIsMatch(userPassword,userPasswordMatch);
        const isConsent = checkIsConsent(userConsent);

        const getAllValid = isUserName && isEmail && isPassword && isPasswordMatch && isConsent;

        if(getAllValid){
            registerForm.classList.add(`hide`);
            successNotification.classList.add(`show`);
            const h1Tage = document.querySelector(`.success-notification h1`);
            h1Tage.innerHTML = `Registered!`;
            setTimeout(() => {
                window.location.href = `index.html`;
            }, 2000);
        }
    }
});


function checkUserRequired(inputArr){
    let isValid = true;
    inputArr.forEach(inpt => {
        if(inpt.value.trim() == ``){
            showError_2(inpt,`${getNames(inpt)} is required!`);
            isValid = false;
        }
        else{
            showSuccess_2(inpt);
        }
    });
    return isValid;
};


function showError_2(input,message){
    const inputContainer = input.parentElement;
    input.classList.add(`error`);
    const small = inputContainer.querySelector(`small`);
    small.innerHTML = message;
};

function showSuccess_2(input){
    const inputContainer = input.parentElement;
    input.classList.remove(`error`);
    const small = inputContainer.querySelector(`small`);
    small.innerHTML = ``;
}

function getNames(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkUsername(input,min,max){
    if(input.value.length < min){
        showError_2(input,`Username must be at least 3 characters!`);
        return false;
    }
    else if(input.value.length > max){
        showError_2(input,`Usernam must be less than ${max} character!`);
        return false;
    }
    else{
        showSuccess_2(input);
        return true;
    };
};

function checkEmail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(input.value.trim())){
        showSuccess_2(input);
        return true;
    }
    else{
        showError_2(input,`Email is not valid`);
        return false;
    };
};

function checkPassword(input,min,max){
    if(input.value.length < min){
        showError_2(input,`Password must be at least ${min} characters`);
        return false;
    }
    else if(input.value.length > max){
        showError_2(input,`Password must less than ${max} characters`);
        return false;
    }
    else{
        showSuccess_2(input);
        return true;
    };
};

function checkIsMatch(input1,input2){
    if(input2.value !== input1.value){
        showError_2(input2,`Password do not match!`);
        return false;
    }
    else{
        showSuccess_2(input2);
        return true;
    };
};

function checkIsConsent(input){
    if(!input.checked){
        input.classList.add(`error`);
        labelTag.classList.add(`error`);
        return false;
    }
    else{
        return true;
    }
}

userConsent.addEventListener(`change`,()=>{
    if(userConsent.checked){
        userConsent.classList.remove(`error`);
        labelTag.classList.remove(`error`);
    };
});

};