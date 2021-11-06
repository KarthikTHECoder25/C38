class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value")
      if(playerCountRef.exists()){
      playerCount = playerCountRef.val();
      player.getCount(); }
      form = new Form();
      form.display();
    }
    Car1 = createSprite(100,200);
    Car2 = createSprite(300,200);
    Car3 = createSprite(500,200);
    Car4 = createSprite(700,200);
    Cars = [Car1,Car2,Car3,Car4];

    Car1.addImage("car1",car1img);
    Car2.addImage("car2",car2img);
    Car3.addImage("car3",car3img);
    Car4.addImage("car4",car4img);

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100 );

    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      background("blue");
      image(track, 0 ,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0 
      var x = 275
      var y
      //var display_position = 130;
      for(var plr in allPlayers){
        index = index + 1
        x = x+275
        y = displayHeight - allPlayers[plr].distance
        Cars[index - 1].x = x;
        Cars[index -1].y = y;
        if(index === player.index){
        Cars[index - 1].shapeColor = "red"
        camera.position.x = displayWidth/2
        camera.position.y = Cars[index - 1].y
      }
    }
  }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 50;
      player.update();


    }

    if(player.distance>3860){
      gameState = 2;
    }

    drawSprites();

  }
  end(){
    console.log("game ended");
  }



}
