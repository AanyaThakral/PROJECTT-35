var dog;
var food;
var foodS = 20;
var gameState = 1;

function preload(){

   dogImg = loadImage("images/dogImg.png");
   dogImg2 = loadImage("images/dogImg1.png");
  
}

function setup() {
createCanvas(1200,600);
  dataBase = firebase.database();
 readGameState=dataBase.ref('gameState');
readGameState.on("value",function(data){
gameState=data.val();
});


 
 food=new Food();

  dog = createSprite(600,300,20,20);
  dog.scale = 0.5;
  dog.addImage(dogImg);

 

  addFoodButton = createButton("ADD FOOD");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFood);
  feed = createButton("FEED DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}


function draw() {  

  background(46, 139, 87);

  food.display();

fedTime=dataBase.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
})


  drawSprites();

  textSize(30)
  fill("red");
  text("Food remaining : " + foodS, 600, 50);
  fill("black");
  textSize(20);
  if(this.lastFed >= 12){

        text("Last Fed : " + this.lastFed % 12 + "PM", 350, 30);

     }else if(this.lastFed === 0){

        text("Last Fed : 12AM", 350, 30);

     }else{

        text("Last Fed : " + this.lastFed + "AM", 350, 30);

     }

}


function feedDog(){
 

dog.addImage(dogImg2)
 // foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  foodS--;
  dataBase.ref('/').update({
  Food:food.getFoodStock(),
  FeedTime:hour()
  })

}

function addFood(){
    foodS++;
    dataBase.ref('/').update({
    Food:foodS
  })

}
