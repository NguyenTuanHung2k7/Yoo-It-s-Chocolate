const sumbitBtn = document.querySelector(`.sumbit-btn`);
const nameSender = document.querySelector(`.username`);
const email = document.querySelector(`.email`);
const textArea = document.querySelector(`.urtext`);
const contactForm = document.querySelector(`.contact-form`);

const allnput = document.querySelectorAll(`.input-select input,.input-select textarea`);

allnput.forEach(input => {
    input.addEventListener(`input`,()=>{
        showSuccess(input);
    })
})

sumbitBtn.addEventListener(`click`,(e)=>{
    e.preventDefault();

    const allIsValid = checkAllValid([nameSender,email,textArea]);

    if(allIsValid){
        const isSender = checkSender(nameSender,3);
        const isEmail = checkEmail(email);
        const ishasMessage = checkMessNotEmpty(textArea);

        if(isSender && isEmail && ishasMessage){
            showApprove();
            setTimeout(() => {
                window.location.href = `contact.html`;
            }, 2000);
        }
    }
});

function checkAllValid(iptArr){
    let isValid = true;
    
    iptArr.forEach(input => {
        if(input.value.trim() === ``){
            showError(input);
            isValid = false;
        };
    });
    return isValid;
}


function showError(input){
    const inputContainer = input.parentElement;
    const pTag = inputContainer.querySelector(`p`);
    pTag.classList.add(`error`);
    input.classList.add(`error`);
};

function showSuccess(input){
    const inputContainer = input.parentElement;
    const pTag = inputContainer.querySelector(`p`);
    pTag.classList.remove(`error`);
    input.classList.remove(`error`);
};

function showApprove(){
    contactForm.innerHTML = `
        <i class="fa-regular fa-face-grin-wink" style="font-size: 10rem;"></i>
        <h1 style="margin: 0; font-size: 2.5rem;">Thank for your Feedback!</h1>
    `;
}

function checkSender(input,min){
    let isValid = true
    if(input.value.length < min){
        showError(input);
        isValid= false;
    }
    else{
        isValid = true;
        showSuccess(input);
    }
    return isValid;
};

function checkEmail(input){
    const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let isValid = true
    if(!mailRegex.test(input.value)){
        showError(input);
        isValid = false;
    }
    else{
        showSuccess(input);
        isValid = true;
    };
    return isValid;
}

function checkMessNotEmpty(input){
    let isValid = true;
    if(input.value.trim() == ``){
        showError(input)
        isValid = false;
        alert(`pls write ur thought before sumbit`);
    }
    else{
        showSuccess(input)
        isValid = true;
    }
    return isValid;
}