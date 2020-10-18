const clockContainer = document.querySelector(".js-clock"), 
 clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();  // new Date()함수를 실행해서 그 값을 date에 할당하고
     const minutes = date.getMinutes(); //date 값에서 분
     const hours = date.getHours(); //date 값에서 시간;
     const seconds = date.getSeconds(); //date 값에서 초를 가져다가, 아랫줄에서 h1 태그안의 내용을 이 시분초로 바꿔 쓸건데
     clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${ //hours 값이 10 미만이면(?) 앞에 0을 붙여 반환하고  아니면(:) 그냥 hours를 반환하라
        minutes < 10 ? `0${minutes}` : minutes} : ${
        seconds <10 ? `0${seconds}` : seconds}`;
}

setInterval(getTime, 1000) // getime 함수를 실행하는데 1000밀리초마다 갱신해라



