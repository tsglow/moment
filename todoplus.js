const toDoForm = document.querySelector("#js-ToDoForm");
const toDoInput = toDoForm.querySelector("#jsInput");
const pendingList = document.querySelector("#jsPending");
    let pending = [];
    const PENDING_LS = "pending";

const finishedList = document.querySelector("#jsFinished");
    let finished = [];
    const FINISHED_LS = "finished";

function handlePenBtn(event) {
  const liToDel = event.target.parentNode;
  const makeItAlone = finished.filter(function (obj) {
    return obj.id === parseInt(liToDel.id);
  });
  const objToMove = makeItAlone[0];
  const objToMoveText = objToMove.text;
  paintPending(objToMoveText);
  finishedList.removeChild(liToDel);
  const filteredfinished = finished.filter(function (obj) {
    return obj.id !== parseInt(liToDel.id);
  });
  finished = filteredfinished;
  saveFinished();
}

function handleFinDelBtn(event) {
  const liToDel = event.target.parentNode;
  finishedList.removeChild(liToDel);
  const filteredfinished = finished.filter(function (obj) {
    return obj.id !== parseInt(liToDel.id);
  });
  finished = filteredfinished;
  saveFinished();
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function paintFinished(text) {
  const finishedId = finished.length + 1;

  const finishedLi = document.createElement("li");
  finishedLi.id = finishedId;
  const finishedText = document.createElement("span");
  finishedText.innerText = text;
  finishedLi.appendChild(finishedText);
  const finishedDelBtn = document.createElement("button");
  finishedDelBtn.id = finishedId;
  finishedDelBtn.innerHTML = "❌";
  finishedDelBtn.addEventListener("click", handleFinDelBtn);
  finishedLi.appendChild(finishedDelBtn);
  const penBtn = document.createElement("button");
  penBtn.id = finishedId;
  penBtn.innerHTML = "⏪";
  penBtn.addEventListener("click", handlePenBtn);
  finishedLi.appendChild(penBtn);

  finishedList.appendChild(finishedLi);
  const finishedObj = {
    text: text,
    id: finishedId
  };
  finished.push(finishedObj);
  saveFinished();
}

function loadFinishedList() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (parsedFinishedObj) {
      paintFinished(parsedFinishedObj.text);
    });
  }
}

function handleFinBtn(event) {
  const liToDel = event.target.parentNode;
  const makeItAlone = pending.filter(function (obj) {
    return obj.id === parseInt(liToDel.id);
  });
  const objToMove = makeItAlone[0];
  const objToMoveText = objToMove.text;
  paintFinished(objToMoveText);
  pendingList.removeChild(liToDel);
  const filteredPending = pending.filter(function (obj) {
    return obj.id !== parseInt(liToDel.id);
  });
  pending = filteredPending;
  savePending();
}

function handlePendingDelBtn(event) {
  const liToDel = event.target.parentNode;
  pendingList.removeChild(liToDel);
  const filteredPending = pending.filter(function (obj) {
    return obj.id !== parseInt(liToDel.id);
  });
  pending = filteredPending;
  savePending();
}

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function paintPending(text) {
  const pendingId = pending.length + 1;
  const pendingLi = document.createElement("li");
  pendingLi.id = pendingId;
  const pendingText = document.createElement("span");
  pendingText.innerText = text;
  pendingLi.appendChild(pendingText);
  const pendingDelBtn = document.createElement("button");
  pendingDelBtn.id = pendingId;
  pendingDelBtn.innerHTML = "❌";
  pendingDelBtn.addEventListener("click", handlePendingDelBtn);
  pendingLi.appendChild(pendingDelBtn);
  const finBtn = document.createElement("button");
  finBtn.id = pendingId;
  finBtn.innerHTML = "✅";
  finBtn.addEventListener("click", handleFinBtn);
  pendingLi.appendChild(finBtn);
  pendingList.appendChild(pendingLi);
  const pendingObj = {
    text: text,
    id: pendingId
  };
  pending.push(pendingObj);
  savePending();
}

function loadPendingList() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (parsedPendingObj) {
      paintPending(parsedPendingObj.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = toDoInput.value;
  if (inputValue == ""){
      toDoInput.placeholder = "enter after write a to do"
  } else {
    paintPending(inputValue);
    toDoInput.value = "";
    toDoInput.placeholder = ""
  }
  
}

function init() {
  loadPendingList();
  loadFinishedList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();



/*

<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <h1>Tasks</h1>
    <form id="jsForm">
      <input id="jsInput" type="text" placeholder="Add Task" />
    </form>
    <h2>Pending</h2>
    <ul id="jsPending"></ul>
    <h2>Finished</h2>
    <ul id="jsFinished"></ul>
    <script src="src/index.js"></script>
  </body>
</html>


*/