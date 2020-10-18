const userForm = document.querySelector(".js-form");
const input = userForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", SHOWING_CN = "showing"; 


/*
시행 순서 02 loadName()

*/
function loadName(){
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null){
        askForName(); 
    } else {  
        paintGreeting(currentUser); 

    }

}


function askForName(){
    userForm.classList.add(SHOWING_CN); 
    userForm.addEventListener("submit", handleSubmit) 
}

function handleSubmit(event){      
    event.preventDefault();        
    const currentValue = input.value; 
    paintGreeting(currentValue); 
    saveName(currentValue); 
}



function paintGreeting(text){   // handleSubmit 함수에서 text 형태로 던져준 값을 아래와 같이 처리한다.
    userForm.classList.remove(SHOWING_CN); // 먼저 form의 class에서 다시 showing(SHOWING_CN의 값)을 제거해서 js-form form showing을 js-form form으로 돌려놓고 (즉 css에 의해 표시되지 않게 하고)
    greeting.classList.add(SHOWING_CN); // 다음에 h4의 class에 showing을 추가한다(css에 의해 표시on). css에 의해 showing 클래스가 붙으면 display:block처리된다
    greeting.innerText = `hello ${text}`; // js-greetings의 내용물을 'hello + handleSubmit이 던져준 text'로 바꾼다
}

function saveName(text){
    localStorage.setItem(USER_LS, text); //ㅣlocalStorage의 USER_LS(=currentUSer)키의 값을 text로 저장한다
}


/*
실행 순서 01 init()
역할은 loadName()을 호출하는 것
*/

function init(){
    loadName();
}

init() //init 함수 호출


