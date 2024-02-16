const roadarea = document.querySelector(".road");
const music = new Audio('AUD-20230504-WA0032.mp3')
const container = document.querySelector(".container")
const btn = document.createElement('button')
btn.setAttribute('class','btn')
btn.innerText = 'use the Arrow key for movement press the enter button or click here to start the game'
container.appendChild(btn)
btn.addEventListener('click',()=>{
    roadarea.style.display ='block'
    init()
    btn.style.display='none'
})
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        roadarea.style.display = 'block'
        init()
        btn.style.display='none'
    }
});
setInterval(music.play())
let player = {step : 5} ;
let keys ={ArrowUp: false,ArrowDown: false,ArrowLeft:false,ArrowRight:false}
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(ev){
    keys[ev.key] = true;
}
function keyUp(ev) {
    keys[ev.key] = false;
}
function moveLines(){
    let roadlines = document.querySelectorAll('.line');
    roadlines.forEach(function(item){
        if(item.y >= 700){
            item.y = item.y -750;
        }
        item.y = item.y + player.step;
        item.style.top = item.y +'px'
    })
}
function movevehicle(playercar){
    let vehicle = document.querySelectorAll('.vehicle');
    let playercarb =playercar.getBoundingClientRect()
    //let playercarboun = playercar.getBoundingClientRect();
    vehicle.forEach(function(item){
         othercarboun = item.getBoundingClientRect();
        if (!(playercarb.top < othercarboun.top)||
        (playercarb.top > othercarboun.bottom)||
        (playercarb.left > othercarboun.right)||
        (playercarb.right < othercarboun.left)) {
           console.log('abner')
            // player.start = false
            
        }

        if(item.y > 750){
            item.y = - 300
            item.style.left = Math.floor(Math.random()* 350) + 'px';
        }
        item.y =item.y + player.step;
        item.style.top =item.y + 'px';
    })
}
function playarea(){
    let playercar = document.querySelector('.car')
    let road  = roadarea.getBoundingClientRect();
    setInterval(music.play())
    if (player.start){
        moveLines();
        movevehicle(playercar);
        if(keys.ArrowUp && player.y > (road.top + 80)){
            player.y = player.y - player.step;
        }
        if (keys.ArrowDown && player.y <(road.bottom - 80)) {
            player.y = player.y + player.step;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x = player.x - player.step;
        }
        if (keys.ArrowRight && player.x < (road.width-64)) {
            player.x = player.x + player.step;
        }
        playercar.style.top = player.y +'px';
        playercar.style.left = player.x + 'px';
        window.requestAnimationFrame(playarea);
    }
}
function init(){

    player.start =true;
    window.requestAnimationFrame(playarea);
    let playercar = document.createElement('div')
    playercar.setAttribute('class','car')
    roadarea.appendChild(playercar)
    player.x = playercar.offsetLeft;
    player.y = playercar.offsetTop;  
      
    for(x =0 ;x<5;x++){
        let roadLines = document.createElement('div')
        roadLines.setAttribute('class', 'line')
        roadLines.y = x*150;
        roadLines.style.top = roadLines.y + 'px';
        roadarea.appendChild(roadLines) 
    }
    //vehicles in road
    for(x =0; x < 5; x++){
        let vehicle =document.createElement('div')
        vehicle.setAttribute('class','vehicle');
        vehicle.y =((x+1) * 300) * -1;
        vehicle.style.top = vehicle.y + 'px';
        //roadwidth =400,vehicle width =50
        vehicle.style.left = Math.floor(Math.random()* 350) +'px';
        roadarea.appendChild(vehicle)
    }
}



 