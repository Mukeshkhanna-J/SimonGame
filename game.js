var colors=["green","red","yellow","blue"];
var sequence=[];
var choosenColorList=[];
k=true;
var level=1;

//when we press key to start
document.addEventListener("keypress",keyListen);

function keyListen(){
    if(k){
        $("h1").text("level "+level);
        $("h2").css("visibility","hidden");
        nextSequence();
        k=false;
    }
};

//create list of clicked colors
$(".btn").click(clickedColor);
function clickedColor(){
    choosenColorList.push(this.id);
    animatePress(this.id);
    playSound(this.id);
    checkAnswer(choosenColorList.length-1);
    }

//check answer
function checkAnswer(currentLevel){
    if(sequence[currentLevel]==choosenColorList[currentLevel]){
        console.log("success");
        if(choosenColorList.length==sequence.length){
            setTimeout(function(){nextSequence()},1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){$("body").removeClass("game-over")},500);
        $("h1").text("Game-Over, press any key to restart the game");
        $("h2").css("visibility","visible")
        $("h2").text("the sequence is "+sequence);
        sequence=[];
        k=true;
        document.addEventListener("keypress",keyListen);
        level=1;
    }
}

//random color selection
function nextSequence(){
    choosenColorList=[];
    var n =Math.random(n);
    n=Math.floor(n*4);
    randomColor=colors[n];
    sequence.push(randomColor);
    playSound(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("h1").text("level "+level);
    level=level+1;
    }


//animation of clicked button
function animatePress(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){$("#"+key).removeClass("pressed")},100)
}

//play sound
function playSound(name){
    var aud=new Audio("./sounds/"+name+".mp3");
        aud.play();
}
    