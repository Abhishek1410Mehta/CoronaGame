function init()
{
canvas=document.getElementById("mycanvas");
console.log(canvas);
W=700
H=400
canvas.height=H
canvas.width=W
pen=canvas.getContext('2d');
console.log(pen);
score=0;
game_over=false;
e1={
x:150,
y:50,
w:60,
h:60,
speed:20,
};
e2={
x:300,
y:150,
w:60,
h:60,
speed:30,
};
e3={
x:450,
y:20,
w:60,
h:60,
speed:40,
};
enemy=[e1,e2,e3];
player={
x:20,
y:H/2,
w:60,
h:60,
speed:20,
moving:"false",
};
gem={
x:W-100,
y:H/2,
w:60,
h:60,
};
canvas.addEventListener('mousedown',function(){
console.log("You pressed the  mouse");
player.moving=true;
});
canvas.addEventListener('mouseup',function(){
console.log("You released the mouse");
player.moving=false;
});
}
function load_images(){
virus_image=new Image;
virus_image.src="corona_505_150220041149.webp";
player_img=new Image;
player_img.src="spider.jpg";
gem_image=new Image;
gem_image.src="gem.png";
}
function draw()
{
pen.clearRect(0,0,W,H);
pen.fillStyle="red";
pen.drawImage(player_img,player.x,player.y,player.h,player.w);
pen.drawImage(gem_image,gem.x,gem.y,gem.h,gem.w);
for(let i=0;i<enemy.length;i++)
{
pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].h,enemy[i].w);
}
pen.fillStyle="white";
pen.fillText("SCORE=:" +score,10,10);
}
function isColliding(b1,b2){
if(Math.abs(b1.x-b2.x)<=b1.h && Math.abs(b1.y-b2.y)<=b1.y){
return true;
}
else
return false;
}
function update()
{
if(player.moving==true)
{
player.x+=player.speed;
score+=20;
}
for(let i=0;i<enemy.length;i++)
{
if(isColliding(enemy[i],player)){
score-=i*100;
if(score<0)
game_over=true;
alert("Game Over");
}
}
if(isColliding(gem,player)){
game_over=true;
draw();
alert("YOU WON"+score);
}
for(let i=0;i<enemy.length;i++)
{
enemy[i].y+=enemy[i].speed;
if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
enemy[i].speed *=-1;
}	
}
}
function gameloop(){
if(game_over==true){
clearInterval(f);
}
console.log("in game loop");
draw();
update();
}
load_images();
init();
var f=setInterval(gameloop,100);
