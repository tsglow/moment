/*
스크립트 구조
init()
 loadCoords()
   null 이면 
   askforCoords() - 위치정보 비허용 -> handleGeoError() "현재위치를 확인할 수 없습니다" -> 종료
                            허용 -> handleGeoSuccsess() 로 좌표 상수화 
                                    -> saveCords() 로 저장
                                       -> getWeather() 에 넘겨줘서 날씨 api 에 호출, index.html의 js-weather class에 출력 -> 종료
   값이 있으면 saveCords()로 textstring으로 저장된 좌표값을 parse 해서 getWeather()에 넘겨줘서 종료
*/

/* 
기본상수
index.html에서 내용을 변경할 js-weather class를 선택해서 weatherInfo 에 할당
날씨정보 API에 사용할 키 값을 API_KEY 에 할당
날씨정보 API에 넘겨줄 좌표값 coords를 COORDS에 할당
*/

const weatherInfo = document.querySelector(".js-weather");
const wIconUrl = "https://openweathermap.org/img/w/"
const API_KEY = "7944e27660b7a3a2bd2bf04140fb1226";
const COORDS = 'coords';

/*
실행순서 05 : getWeather 함수
Part. A : handleGeoSuccess에서 받어온 두개의 값을 fetch로 openweather api에 lat 과 lng으로 넘겨주고, 받게 되는 response 중 json 항목을 반환
Part. B : json 항목중에서 최종적으로 유저에게 표시해줄 값을 상수로 지정하고, weatherInfo.innerHTML 으로 표시
*/


function getWeather(lat, lng){
 fetch( //Part. A
       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
     //`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
     ).then(function(response){
        return response.json()
        }      
        ).then(function(json){ //Part. B
            console.log(json)
          const loc = json.name
          const temp = json.main.temp;
          const hum = json.main.humidity;
          //const cWeather = json.weather[0].description
          const image = new Image();
          image.src = `${wIconUrl}${json.weather[0].icon}.png`
          image.classList.add("weather");
          
          // const weatherDis = cWeather.description          
          weatherInfo.innerHTML = `현재 위치 : ${loc}  현재 온도 : ${temp}℃, 현재 습도 : ${hum}℃`;
          weatherInfo.appendChild(image);
        }
    )
}

/*
실행순서 04 : saveCoords 함수
오브젝트화해서 넘어온 위도와 경도를 textstring화 해서 localstorage에 COORDS 항목으로 저장
*/

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


/*
실행순서 03 : HandleGeoSuccess 함수
Part. A : success 일 경우 좌표값을 받아옴. console.log로 하위 api확인 해서 latitude와 longitude를 각각 상수에 할당
part. B : 상수화 한 위도와 경도를 오브젝트한 coordsObj를 saveCoords() 함수에 넘겨주고
part. C : 상수화 한 위도와 경도를 getWeather 함수에 넘겨줌
*/

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;   //Part.A 
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    //console.log(coordsObj)
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
      
}

/*
실행순서 조건부 : handleGeoError()
위치확인 메세지에 허용안함을 할 경우 '위치 정보를 확인할 수 없습니다' 라는 메세지 출력
*/

function handleGeoError(){
    weatherInfo.innerHTML = "현재 위치를 확인할 수 없습니다"
   }

   
/*
실행순서 02 : askForCoords () 함수
현재 위치확인을 묻는데, '허용'하면 handleGeoSuccess를, 그렇지 않으면 'handleGeoError를 실행한다.
*/

function askForCoords (){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);    
}


/*
실행순서 01 : loadCoords () 함수
Part. A : locals storage 에서 COORDS 값을 읽어와서 그게 null 이면 askForcooords() 함수를 호출한다.
Part. B : 값이 있는 경우, textstring이기 때문에 parse하고, parse된 것에서 latitude longitude 값을 getWeather에 넘겨준다
*/

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS); // Part. A
    if(loadedCoords === null){
        askForCoords();
    } else { // Part. B
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }

}

function init(){
    loadCoords();
       
}

init();
  