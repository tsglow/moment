 /* 
기본 상수
to do list 입력폼, 그 안의 input 태그, 폼에 입력한 것을 list 로 만들어줄 ul 태그를 상수화 
*/
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");



 /*
폼에 입력한 것을 저장할 array toDos를 만들고 상수 TODOS_LS를 부여
 */
const TODOS_LS = 'toDos'; // 
let toDos = []; // 나중에 clenaToDos로 대치하기 위해 const가 아닌 let으로 선언한다



/*
실행 순서 : 04 saveToDos()
JS는 localstorage에는 오직 text string만 저장하기 때문에 json.stringify를 써서 string화 한다
*/
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)) 
}


/*
실행 순서 Last : deleteToDo
Part A : delBtn을 클릭한 이벤트가 감지되면 클릭된 버튼을 event.target으로 설정하고, 그 특정 버튼의 parentNode를 liToDel로 지정한다.
Part B : liTodel을 지운다
Part C : toDos array에 array.filter(필터를 건 결과물을 cleanToDos로 만들어 덮어쓴다.
*/
function deleteToDo(event){
 const btn = event.target, liToDel = btn.parentNode; // Part A
 
 toDoList.removeChild(liToDel); // Part B
 
 const cleanToDos = toDos.filter(function(fuck){ // Part C : 필터에 function(fuck){} 이란 함수를 건다. 여기서 function은 항상 function으로 쓸것
     return fuck.id !== parseInt(liToDel.id);}  // 그 함수는 모든 toDos array 의 모든 값하나 하나를 fuck로 삼아, liToDel과  id가 다른 것들(!==에 대하여 true) 인 것만 반환한다
    );               
  toDos = cleanToDos; // 위에서 반환된 값들인 cleanToDos를 toDos의 값으로 한다. 단 이렇게 하려면  toDos가 상수가 아니어야 하므로 선언할때 let toDos로 한다
  saveToDos();
}

/* 
실행 순서 03 : paintToDo 함수 
 text 값이 들어오면
 part A : "<li id = newID)> <button>x</button><span>text</span> </li> "를 만든다
 part B : 그걸 " <ul class="js-toDoList"></ul>" 에 넣는다 
 part C : " <li id = newID> " 와 id가 동일한 "{text : text, id: newID} " 객체를 만들어 toDos array에 넣는다... saveToDos()가 있는데 이 부분이 왜 필요한거지?
*/
function paintToDo(text){    
    const newId = toDos.length + 1; //part A
    const li = document.createElement("li");    
     li.id = newId; 
    const delBtn = document.createElement("button"); 
     delBtn.innerHTML = "X"; 
     delBtn.addEventListener("click", deleteToDo); 
     li.appendChild(delBtn); 
    const span = document.createElement("span");
     span.innerText = text;  
     li.appendChild(span); 
         
    toDoList.appendChild(li)  // part B
    
     const toDoObj = {  // part c
        text: text,  
        id: newId}
    toDos.push(toDoObj); 

    saveToDos(); // 추가한 값을 saveToDos 함수로 localStorage에 저장
    
}

/*
실행 순서 02 : handleSubmit 함수
event가 들어오면, 페이지 refresh를 하지 않고, 
toDoInput에 들어온 value 를 currentValue상수의 값으로 할당, 할당된 값을 인자로 해서 paintToDo 함수에 넘겨준다
그리고 toDoInput칸을 빈칸으로 되돌림
*/

function handleSubmit(event){        
    event.preventDefault();            
    const currentValue = toDoInput.value; 
    paintToDo(currentValue); // 
    toDoInput.value=""; 
    
}


/*
실행 순서 02 : loadToDos() 함수
Part A : localstorage 에서 toDos array(=상수TODOS_LS)의  값을 가져와서 loadedtoDos 상수의 값으로 삼아라
Part B : loadedToDos에 내용이 있으면 textstring의 형태이므로 JSON.parse로 parse하고 parsedToDos 상수의 값으로 한다.
*/
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS) ; // Part A

    if(loadedToDos !== null) {   // Part B
        const parsedToDos = JSON.parse(loadedToDos); 
        parsedToDos.forEach(function(shit){    // array의  forEach 는 array의 원소 하나를 shit이란 대상으로 삼아 처리한다
            paintToDo(shit.text);  // shit의 text를 paintTodo에 넘겨준다.
            }
        ) 
    }
}


/*
실행 순서 01 : init() 함수
Part A : loadToDos()함수를 실행 
PArt B : toDoForm 에 submit 이벤트가 발생하면 handleSubmit 함수를 호출
*/
 function init(){ 
     loadToDos(); // Part A

     toDoForm.addEventListener("submit", handleSubmit) 

 }

 init() // init 함수를 실행하라
  


 /*
흐름
toDoForm(js-toDoForm class를 가진 form tag)에 데이터가 submit되면 handleSubmit 함수를 호출

handleSubmit 함수에서 입력된 데이터를 currentValue로 해서 paintToDo 함수에 text로 던져주고, form을 다시 입력 가능한 상태로 변경

paintTodo 함수에 text가 들어오면 먼저 toDos array의 항목 개수를 세어서 개수를 id로 만든다
 ul(js-toDolist)아래에 목록 li를 만들고, 그 자식으로 delBtn span 태그 두개를 넣음
 delBtm을 만들되 click 이벤트를 감지(addEventListener) 하면 deleteToDo함수를 호출하게 함
 span
*/