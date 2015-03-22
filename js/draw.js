var content;

var width = 300;
var height = 300;

var iSize = 10;
var snakeL = 3;

var snakeX = [1, 1 ,1];
var snakeY = [0, 0 ,0];

var bodyX =[100+iSize,100,100- iSize];
var bodyY =[100,100,100];


var ratX;
var ratY;

var eaten=true;//吃老鼠

var gameover = false;

var timer = setTimeout(gPro,100);
window.onload = function(){ 
	init();
}
window.onkeydown = keydown;
function init(){ 
	content = document.getElementById('myCanvas').getContext('2d');
	gameDesk();
	snake(); 
	
	
	
	
	
}


function gPro(){ 
	timer = setTimeout(gPro,100);
		iClear();
		gameDesk();
		iRat();
		snake(); 
		snakeMove();
		 ifCollision();

}



//蛇的长度
function snake(){ 
	for(var i =0;i < snakeL; i++){
		drawShape(bodyX[i],bodyY[i]);
	}
}
//随机生成的老鼠
function iRat()
{ 
	if(eaten){
 	ratX = Math.floor(width*Math.random()/iSize)*iSize;
	ratY = Math.floor(height*Math.random()/iSize)*iSize;
	if(sCollision(ratX, ratY)){ 
		iRat();
	}
	else{ 
		eaten = false;
	}
	}
	drawShape(ratX,ratY);
}
//游戏区域
function gameDesk(){ 
	content.fillStyle="#fff";
	content.fillRect(0,0,width,height);
	content.fill();
	content.strokeStyle="red";
	content.strokeRect(0,0,width,height);
}
//清除游戏区
function iClear(){ 
	content.clearRect(0,0,width,height);

}
//画蛇和老鼠
function drawShape(x,y){ 
	content.fillStyle ="black";
	content.fillRect(x,y,iSize,iSize);
	content.fill();
	content.strokeStyle="#fff";
	content.strokeRect(x,y,iSize,iSize);
}

//蛇的移动判定
function snakeMove(){ 
	for(var i=0;i<snakeL;i++ ){ 
		 bodyX[i] += (snakeX[i]*iSize);
		 bodyY[i] += (snakeY[i]*iSize);
 	}  
 	for(var i=snakeL;i>0; i-- ){ 
 		snakeX[i] = snakeX[i-1];
 		snakeY[i] = snakeY[i-1];
 	}
 	eatRat();
}



//方向控制
function keydown(e){ 
     
     switch(e.keyCode ){ 


      	
      	case 37 : //方向键“左”
      	snakeX[0] = -1;
    	snakeY[0] = 0;
    	break;

    	case 38 : //方向键“上”
    	snakeY[0] = -1;
    	snakeX[0] = 0;
    	break;

    	case 39 : //方向键“右”
    	snakeX[0] = 1;
    	snakeY[0] = 0;
    	break;

    	case 40 : //方向键“下”
    	snakeY[0] = 1;
    	snakeX[0] = 0;
    	break;
	
	default:
	
	restart();
     }

}



//吃老鼠
function eatRat(){ 
	if(bodyX[0] ==ratX && bodyY[0] == ratY)
  {
    eaten = true;
    
    // 新尾巴的位置
    var newX = bodyX[snakeL-1]-snakeX[snakeL]*iSize;
    var newY = bodyY[snakeL-1]-snakeY[snakeL]*iSize;
   
    // 添加新尾巴到蛇身数组里
    bodyX.push(newX);
    bodyY.push(newY);
   
    snakeX.push(snakeX[snakeL-1]);
    snakeY.push(snakeY[snakeL-1]);
    snakeL++;  
    //速度
   
  }

}
function SelfCollision(x, y)
{
  for (var i = 4; i < snakeL; i++)
    if(x == bodyX[i] && y == bodyY[i])
    {
      return true;
    }
  return false;
}

function ifCollision()
{
  if(bodyX[0] >= width || bodyX[0] < 0 || bodyY[0] < 0 || bodyY[0] >= height)
  {
    
    gameover = true;
    clearTimeout(timer);
  }
  else if(snakeL >  4)
    {
      if(SelfCollision(bodyX[0],bodyY[0]))
      {
        
        gameover = true;
        clearTimeout(timer);
      }
    }
}



//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
function sCollision(x, y)
{
      for (var i = 0;i<snakeL; i++)
        if(x == bodyX[i]&& y == bodyY[i])
        {
          return true;
        }
      return false;
}


function restart()
{
   clearTimeout(timer);
   bodyX =[100+iSize,100,100- iSize];
   bodyY =[100,100,100];

    snakeX = [1, 1 ,1];
    snakeY = [0, 0 ,0];

    snakeL = 3;

     eaten = true;

 timer = setTimeout(gPro, 100);
  
    }