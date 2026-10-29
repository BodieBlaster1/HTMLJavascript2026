var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "yellow";
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.fillRect(85, 302, 100, 100);
ctx.strokeRect(85, 302, 100, 100);

ctx.fillStyle = "#ffff00";
ctx.strokeStyle = "red";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(385, 440, 65, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

ctx.strokeStyle = "rgb(255, 0, 0)";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(85, 680);
ctx.lineTo(280, 550);
ctx.stroke();

ctx.fillStyle = "#ff00ff";
ctx.strokeStyle = "#00ffff";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(555, 310);
ctx.lineTo(670, 285);
ctx.lineTo(725, 380);
ctx.lineTo(650, 465);
ctx.lineTo(548, 420);
ctx.lineTo(555, 310);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.fillStyle = "#ffff00";
ctx.strokeStyle = "rgb(32, 32, 32)";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(635, 495);
ctx.lineTo(665, 555);
ctx.lineTo(735, 565);
ctx.lineTo(690, 615);
ctx.lineTo(698, 682);
ctx.lineTo(635, 655);
ctx.lineTo(575, 682);
ctx.lineTo(585, 615);
ctx.lineTo(540, 565);
ctx.lineTo(605, 555);
ctx.lineTo(635, 495);
ctx.fill();
ctx.stroke();