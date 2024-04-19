const Game =document.querySelector('.game-COntainer');
const char =document.getElementById('bird');
let interval ;
let interval1 ;
let Keydown=false ;
const Sound =new Audio('Game2Js/coin.mp3');
const MoveLeft =()=>{
    let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue('left'));
    if (leftPos>0) {
        char.style.left=leftPos-2+'px';

    }
}
const Moveright =()=>{
    let leftPos = parseInt(window.getComputedStyle(char).getPropertyValue('left'));
    if (leftPos<=370) {
        char.style.left=leftPos+2+'px';

    }
}
document.addEventListener('keydown',(event)=>{
    if (Keydown==false) {
        if (event.key=='ArrowLeft') {
            Keydown=true;
            interval=setInterval(MoveLeft,1)
        }else if(event.key=='ArrowRight'){
            Keydown=true;
            interval=setInterval(Moveright, 1);
        }
    }
})
document.addEventListener('keyup',()=>{
    clearInterval(interval);
    Keydown=false;
})


const genrateobastcalandHoles =()=>{
     let block = document.createElement('div');
     let hole = document.createElement('div');
     block.setAttribute('class','obstacle');
     hole.setAttribute('class','hole');
     let RandomPostion =Math.floor(Math.random()*341);
     hole.style.left=RandomPostion+'px';
     Game.appendChild(hole);
     Game.appendChild(block);
 $('.obstacle').bind('animationend webkitAnmatinEnd oAnmatinEnd MSAnmatinEnd',function(e){$(this).remove()});
 $('.hole').bind('animationend webkitAnmatinEnd oAnmatinEnd MSAnmatinEnd',function(e){$(this).remove()});
}

setInterval(() => {
    genrateobastcalandHoles();    
},700);

const CheckCollisions =()=>{
    const AllBlockes =document.querySelectorAll('.obstacle');
    const AllHoles =document.querySelectorAll('.hole');
    AllBlockes.forEach(block1=>{
        let hit =false;
            if (Collisions(block1,char)) {
                console.log('gg');
                hit=true;
            }
            
    AllHoles.forEach(H=>{
        if(Collisions(H,char)){
        hit =false;
                        }
                    })
            
            if (hit) {
                Sound.play();
                alert('Game Over !!')
                location.reload();
            }
        })
}

let Collisions=($div1,$div2)=>{
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;
  
    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;
  
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }
setInterval(() => {
    CheckCollisions();
}, 1);





