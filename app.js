const canvas = document.getElementById("jsCanvas");
/* <canvas> 요소 안에서 우리가 픽셀에 접근할 수 있는 context 작업을 하는 js 변수 지정*/
const ctx = canvas.getContext("2d"); // 2d 로 픽셀을 컨트롤 하겠다는 뜻.
/* line(선)의 color 를 변경하기 위한 js 변수 지정 */
const colors = document.getElementsByClassName("jsColor");
/* line(선)의 굵기 를 변경하기 위한 js 변수 지정 */
const range = document.getElementById("jsRange");
/* canvas 내 fill(칠하기)을 위한 js 변수 지정 */
const modeButton = document.getElementById("jsMode");
/* canvas 이미지를 저장하기 위한 js 변수 지정 */
const saveButton = document.getElementById("jsSave");

/* strokeStyle 과 fillStyle 에 대한 default 값 지정을 위한 변수 선언 */
const INITIAL_COLOR = "#121212";
/* <canvas> default 값(가로, 세로)의 지정을 위한 변수 선언 */
const CANVAS_SIZE = 500;

/* <canvas>의 Pixel manipulating 사이즈 지정하기 */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* context 작업 : canvas의 fill Style default 값 지정 */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

/* context 작업 : canvas의 strokeStyle 우리가 그릴 선의 색 지정 */
ctx.strokeStyle = INITIAL_COLOR;
/* context 작업 : canvas의 fill Style의 초기화 지정 */
ctx.fillStyle = INITIAL_COLOR;
/* context 작업 : canvas의 line width 선 굵기(default 값) 지정 */
ctx.lineWidth = 2.5;


/* painting 동작의 디폴트 값(unpainting) 설정 */
let painting = false;
/* fill 동작 버튼의 디폴트 값(unfilling) 설정 */
let filling = false;

/* painting 동작의 반대 디폴트 값(painting)을 지정하고자 하는 함수 */
function startPainting() {
    painting = true;
}
/* painting 동작의 디폴트 값(unpainting)을 지정하고자 하는 함수 */
function stopPainting() {
    painting = false;
}
/* line(선) 굵기 조절을 evnet를 위한 함수 */
function handelRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth =  size;
}
/* fill(칠하기) event 전용 함수 */
function handleModeClick(event) {
    if(filling === true) {
    // 만약 unfilling mode 상태에서 click 이벤트가 발생되면
        filling = false;
        // filling은 false를 할당받는다. (디폴트 값)
        modeButton.innerText = "FILL";
        // modeButton 안에 ‘FILL” 텍스트를 집어넣는다.
    } else {
    // 만약 filling mode 상태에서 click 이벤트가 발생되면
        filling = true;
        // filling은 true를 할당받는다.
        modeButton.innerText  = " PAINT";
        // modeButton 안에 ‘PAINT” 텍스트를 집어넣는다.
    }
}

/* 캔버스 위에서 움직이는 마우스 커서 동작을 인식하는 함수
    여기에서 모든 움직임을 감지하고 라인을 만들어야 하기 때문에 중요한 함수이다. 
    path를 만드는 건 기본적으로 선(line), 선의 시작점을 만드는 것이다.
    path를 만드는 규칙 : 
    1. painting을 할 때에는 path를 그리는게 필요하지 않다.
    2. painting을 하지 않을 때만 path가 필요하다. 즉, 클릭하지 않은 채로 캔버스 위에 커서가 떠다니는 동작일 때를 의미한다.
    3. 커서가 클릭하면 그 클릭한 위치(x, y)가 path의 끝나는 지점이 된다
        선의 시작점을 만들기 위해 if()를 사용하자 */
function onMouseMove(event){ 
    // 캔버스 위로 마우스를 움직이는 내내 동작하는 함수
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // 만약 painting을 하지 않는다면, 
        // 확인하고자 할 때 쓰기 : console.log("만들어지고 있는 path의 위치는", x, y);
        ctx.beginPath(); // context로 path(선)를 만든다.
        ctx.moveTo(x, y); // context로 (offsetX, offsetY 좌표)로 path(선)를 이동한다.
    } else {
        // 만약 painting을 한다면,
        // 확인하고자 할 때 쓰기 : console.log("만들어지고 있는 line(선)의 위치는", x, y);
        ctx.lineTo(x, y); // context로 painting이 시작한 시점(offsetX, offsetY 좌표)에서부터 끝나기까지(offsetX, offsetY 좌표)의 직선을 만든다.
        // lineTo() 마지막 지점을 특정 좌표로 연결한다.
        ctx.stroke(); // context로 선을 만든다.
    }
}

/* line(선)의 color 를 변경하기 위한 함수 */
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    /* context의 color 변경을 위한 단계 */
    // 위에서 선언한 변수의 식(event.target.style.backgroundColor)으로 변경한다.
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

/*  <canvas> 를 clicking 하는 동안의 이벤트를 위한 함수 */
function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
                // (x축, y축, width 값, height 값)
    } // if 가 아닐경우(else 나머지)는 default 상태(brush mode)
}

/* (우 클릭 저장 방지를 목적으로 만든) contextmunu 이벤트를 위한 함수 */
function handelCM(event) {
    event.preventDefault();
} 

/* 이미지 save(저장)를 위한 click 이벤트를 위한 함수 */
function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    // 기본값 .toDataURL(“image/png”); 
    // “image/png” 의 png는 원하는 이미지파일로 바꿀 수 있다. 

    /* handleSaveClick(event)를 실행할 때마다 가상의 링크("a")를 만들자 */
    const link = document.createElement("a");

    /* image 의 link를 href 형식으로 변환하기 */
    link.href = image;
    /* image dawnload 할 때 저장되는 이름 설정하기 */
    link.download = "PaintJS[🎨]";
    /* handleSaveClick(event)를 실행할 때마다 가상의 click을 만들자 */ 
    link.click();
}

/* canvas 전체 evnet */
if (canvas) {
    // mousemove 는 마우스 커서 동작 이벤트를 말한다.
    canvas.addEventListener("mousemove", onMouseMove);
    // mousedown 은 '클릭'한 상태로에만 동작하는 이벤트를 말한다.
    canvas.addEventListener("mousedown", startPainting); // mousedown 이벤트는 즉,'클릭'한 상태로에서만 동작하는 event라고 할 수 있다.
    // mouseup 은 '클릭을 그만둔' 상태에서만 동작하는 이벤트를 말한다.
    canvas.addEventListener("mouseup", stopPainting);
     // mouseleave 은 해당 범위 밖으로 커서가 이동했을 때 인식하는 이벤트를 말한다.
    canvas.addEventListener("mouseleave", stopPainting);
    // <canvas> 를 clicking 하는 event 설정
    canvas.addEventListener("click", handleCanvasClick);
    // context menu : 우 클릭 저장 방지를 위한 이벤트 
    canvas.addEventListener("contextmenu", handelCM);
}

/* color의 정보를 array로 만드는 메소드 */
Array.from(colors).forEach(bgdColor =>
    bgdColor.addEventListener("click", handleColorClick)
);

/* line(선) 굵기 조절 event 지정 */
if(range){
    range.addEventListener("input", handelRangeChange);
}

/*  fill(칠하기) event 지정 */
if(modeButton) {
    modeButton.addEventListener("click", handleModeClick);
}

/* save(저장) event 지정 */
if(saveButton) {
    saveButton.addEventListener("click", handleSaveClick);
}