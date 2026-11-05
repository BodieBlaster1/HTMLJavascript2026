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

var acceleration = 0.3;
var friction = 0.9;

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
    stars[i].radius = Math.random() * 10;
}

sansSprite.x = canvas.width/2;
sansSprite.y = canvas.height/2;

var a = false;
var d = false;
var w = false;
var s = false;
var space = false;

//Variable for bullets
var bullets = [];
var shootCooldown = 0;

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
    if(e.code === "Space"){
        space = true;
        e.preventDefault();
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
    if(e.code === "Space"){
        space = false;
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

    var hitBox = sansSprite.x < startPoint.x + 25 &&
                sansSprite.x + 25 > startPoint.x &&
                sansSprite.y < startPoint.y &&
                sansSprite.y + 25 > startPoint.y;

    if(hitBox == true){
        //Startpoint hits player
        sansSprite.x = canvas.width/2
        sansSprite.y = canvas.height/2 + 100;

        sansSprite.moveX = 0;
        sansSprite.moveY = 0;
        score = 0;
    }

    if(a == true){
        //sansSprite.x -= 1
        sansSprite.moveX -= acceleration;
    }

    if(d == true){
        //sansSprite.x += 1
        sansSprite.moveX += acceleration;
    }

    if(w == true){
        //sansSprite.y -= 1
        sansSprite.moveY -= acceleration;
    }

    if(s == true){
        //sansSprite.y += 1
        sansSprite.moveY += acceleration;
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

    //Multiply by friction
    sansSprite.moveX *= friction;
    sansSprite.moveY *= friction;

    //Update X and Y position values
    sansSprite.x += sansSprite.moveX
    sansSprite.y += sansSprite.moveY

    //Bullet firing stuff
    if(shootCooldown > 0){
        shootCooldown--;
    }

    if(space && shootCooldown === 0){
        bullets.push({
            x: sansSprite.x + 25 /2 -2,
            y: sansSprite.y - 10,
            width: 4,
            height: 10,
            speed: 8,
            color: "white"
        });
        shootCooldown = 10;
    }

    //Background stuff
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //nemesisStars.mp3
    for(var i = 0; i<stars.length; i++){
        //draw all dem stars

        if(sansToStarCollision(sansSprite, stars[i])){
                //Stars now hits player
                sansSprite.x = canvas.width/2
                sansSprite.y = canvas.height/2 + 100;

                sansSprite.moveX = 0;
                sansSprite.moveY = 0;
                score = 0;
            }

        stars[i].drawCircle();
        stars[i].y++;
        if(stars[i].y > canvas.height + stars[i].radius * 2){
            stars[i].x = Math.random() * canvas.width;
            stars[i].y = -(Math.random() * canvas.height);
            score += 10;
        }
    }
    //Draw and check bullet
    for(var i = bullets.length - 1; i >= 0; i--){
        var bullet = bullets[i];

        bullet.y -= bullet.speed;

        //Check for offscreen bullet
        if(bullet.y + bullet.height < 0){
            bullets.splice(i,1);
            continue;
        }

        var hitBox = bullet.x < startPoint.x + 25 &&
                    bullet.x + bullet.width > startPoint.x &&
                    bullet.y < startPoint.y + 25 &&
                    bullet.y + bullet.height > startPoint.y;
        if(hitBox){
            //remove bullet
            bullets.splice(i, 1);
            startPoint.x = 100000000000;
            moveDirection.x = 0;
            moveDirection.y = 0;
            continue;
        }
        
        for(var j = 0; j<stars.length; j++){
            if(sansToStarCollision(bullet, stars[j])){
                bullets.splice(i, j);
                stars[j].x = Math.random() * canvas.width;
                stars[j].y = -(Math.random() * canvas.height);
                continue;
            }
        }

        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    }

    ctx.fillStyle = boxColor;
    ctx.fillRect(startPoint.x, startPoint.y, 25, 25);
    ctx.drawImage(sansSprite.image, sansSprite.x, sansSprite.y, 25, 25);

    ctx.fillStyle = "white";
    //Draw HUD element
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 30, 80);
}

function sansToStarCollision(obj, star){
    var closestX = Math.max(obj.x, Math.min(star.x, obj.x + 25));
    var closestY = Math.max(obj.y, Math.min(star.y, obj.y + 25));

    var dx = star.x - closestX;
    var dy = star.y - closestY;

    var dist = dx * dx + dy * dy;
    return dist <= star.radius * star.radius;
}