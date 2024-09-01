document.addEventListener("DOMContentLoaded",function(){

    const gameArena=document.getElementById('game-arena');
    const arenasize=600;
    const cellsize=20;
    let score=0;
    let gamestarted=false;
    let food={x:300,y:200};
    let snake=[{x:160,y:200},{x:140,y:200},{x:120,y:200}];

    let dx=cellsize;
    let dy=0;
    let speed=200;

    function ChangeDirection(event){
        const isGoingDown= dy===cellsize;
        const isGoingUp= dy===-cellsize;
        const isGoingLeft= dx===-cellsize;
        const isGoingRight= dx===cellsize;

        if(event.key==='ArrowUp' && !isGoingDown){
            dx=0;
            dy=-cellsize;
        }

        else if(event.key==='ArrowDown' && !isGoingUp){
            dx=0;
            dy=cellsize;
        }

        else if(event.key==='ArrowLeft' && !isGoingRight){
            dx=-cellsize;
            dy=0;
        }

        else if(event.key==='ArrowRight' && !isGoingLeft){
            dx=cellsize;
            dy=0;
        }
    }
    function foodposupdate(){
        food.x=Math.floor(Math.random()*30)*20;
        food.y=Math.floor(Math.random()*30)*20;
        console.log(food.x,food.y);
    }
    function UpdateSnake(){
        const newHead={x:snake[0].x+dx,y:snake[0].y+dy};

        snake.unshift(newHead);
        if(newHead.x>=600 || newHead.y>=600){
            //gameover();
            //loopbreak();
        }
        if(newHead.x==food.x && newHead.y==food.y){
            score+=10; 
            foodposupdate();

            if(speed>50){
                clearInterval(intervalid);
                speed-=10;
                gameloop();
            }
        }
        else{
            snake.pop();
        }

    }
    function drawdiv(x,y,className){
        const divelement=document.createElement("div");
        divelement.classList.add(className);
        divelement.style.top=`${y}px`;
        divelement.style.left=`${x}px`;
        return divelement;
        
    }
    function DrawSnakeandFood(){
        gameArena.innerHTML='';

        snake.forEach((snakecell)=>{
            const snakeELement=drawdiv(snakecell.x,snakecell.y,"snake");
            gameArena.appendChild(snakeELement);
        })

        const fooditem=drawdiv(food.x,food.y,"food");
        gameArena.appendChild(fooditem);
    }

    function isGameOver(){

        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        // wall collision checks
        const hitLeftWall = snake[0].x < 0; // snake[0] -> head
        const hitRightWall = snake[0].x > arenasize - cellsize;
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > arenasize - cellsize;
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;


    }

    function gameloop(){
        intervalid=setInterval(()=>{
            if(isGameOver()){
                clearInterval(intervalid);
                gamestarted=false;
                alert(`GAME OVER SCORE IS ${score}`);
                return;
            }
            UpdateSnake();
            drawScoreBoard();
            DrawSnakeandFood();
        },speed);
    }

    function drawScoreBoard(){
        const scoreBoard=document.getElementById('score-board');
        scoreBoard.textContent=`SCORE : ${score}`;
    }
    function runGame(){
        if(!gamestarted){

            gamestarted=true;
            document.addEventListener("keydown",ChangeDirection);
            gameloop();

        }
    }

    function initialGame(){
        let scoreboard=document.createElement("div");
        scoreboard.id='score-board';

        document.body.insertBefore(scoreboard,gameArena);

        let starButton=document.createElement("button");
        starButton.textContent="START";
        
        starButton.classList.add("startbtn");
        starButton.addEventListener("click",function start(){
            starButton.style.display='none';
            runGame();
        });
        document.body.appendChild(starButton);
    }
    initialGame();
})