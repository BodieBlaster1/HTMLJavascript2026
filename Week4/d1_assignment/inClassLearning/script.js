//this is a normal comment
/* 
Now this is a multi-line comment
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(game, fps);

var startPoint = {x:canvas.width/2, y:canvas.height/2};
var moveDirection = {x:1,y:1};

var boxColor = "red";
var sansSprite = {image:document.getElementById("sans"),x:1,y:1,moveX:0, moveY:0};

function createStar(){
    var star = {
        x:0,
        y:0,
        radius:0,
        color:"black",
        drawCircle:function(){
            ctx.beginPath()
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        },
    }
    return star;
}


var starCount = 50;
var stars = []; //creates array

for(var i = 0; i < starCount; i++){
    stars[i] = createStar();
    stars[i].x = Math.random() * canvas.width;
    stars[i].y = Math.random() * canvas.height;
    stars[i].radius = Math.random() * 50;
}

sansSprite.x = canvas.width/2;
sansSprite.y = canvas.height/2;

var a = false;
var d = false;
var w = false;
var s = false;

//On key press
document.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = true;
    }
    if(e.key == "d"){
        d = true;
    }
      if(e.key == "w"){
        w = true;
    }
    if(e.key == "s"){
        s = true;
    }
});

//On key release
document.addEventListener("keyup", function(e){
    console.log(e.key);
    if(e.key == "a"){
        a = false;
    }
    if(e.key == "d"){
        d = false;
    }
      if(e.key == "w"){
        w = false;
    }
    if(e.key == "s"){
        s = false;
    }
});


//Game loop function
function game(){
    //clears square and moves it
    ctx.clearRect(0,0,canvas.width,canvas.height);
    startPoint.x += moveDirection.x;
    startPoint.y += moveDirection.y;
    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);
    ctx.drawImage(sansSprite.image, sansSprite.x, sansSprite.y, 25, 25);

    if(a == true){
        sansSprite.x -= 1
    }

    if(d == true){
        sansSprite.x += 1
    }

    if(w == true){
        sansSprite.y -= 1
    }

    if(s == true){
        sansSprite.y += 1
    }

    if(sansSprite.x > canvas.width){
        sansSprite.x = -25;
    }

    if(sansSprite.x < -25){
        sansSprite.x = canvas.width;
    }
    if(sansSprite.y > canvas.height){
        sansSprite.y = -25;
    }

    if(sansSprite.y < -25){
        sansSprite.y = canvas.height;
    }

    if(startPoint.y > canvas.height - 25 || startPoint.y < 0){
        //startPoint.y = -25;
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }
    if(startPoint.x > canvas.width - 25 || startPoint.x < 0){
        //startPoint.x = -25;
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }
    for(var i = 0; i<stars.length; i++){
        //draw all dem stars
        stars[i].drawCircle();
    }


}