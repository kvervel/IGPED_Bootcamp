//Declaring variables in the global namespace:
var pieces =[];
var turn = ["O","X"];
var numPieces = 3;
var gameState = "play_game";
var winner;
var winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/*GamePiece() is a function for making GamePiece objects, or tic-tac-toe tiles.
It takes arguments and stores them as variables in the object:*/
function GamePiece(name, position, size, id) {
    this.name = name;
    this.position = position;//make sure to pass in width as x and height as y
    this.size = size;
    this.id = id;
}

/*display() is a member function of the GamePiece objects.
Prototype means that this function is tied to the GamePiece object "type", and not the individual objects.
Thus, it will be the same for all GamePiece objects.
display() is called in draw and deals with determining the  drawing the tiles*/
GamePiece.prototype.display = function(c){

  //If the mouse is hovering over this GamePiece and is pressed...
  if(mouseX > this.position.x && mouseX < this.position.x+this.size.x && mouseY > this.position.y && mouseY< this.position.y+this.size.y && mouseIsPressed)
  {
    //and if this GamePiece is currently a blank tile...
    if(this.name===" ")
    {
      /*then, with the array called turn, take out the second element and concatenate it to the beginning of the array.
      This is how the game keeps track of whose turn it is, and therefore also whether the tile should display "x" or "o":*/
      turn = turn.splice(1).concat(turn);
      //Also set the name of the tile to the first element in the array:
      this.name = turn[0];
    }
  }

  /*Set the fill colour to the colour passed into the function and draw a rectangle in that colour.
  Use the position and size variables stored in this GamePiece object:*/
  fill(c);
  rect(this.position.x,this.position.y,this.size.x,this.size.y);

  //Set the fill colour to white and draw the "name" of the tile (blank, "x" or "o") in the middle of the tile:
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(this.name,this.position.x,this.position.y, this.size.x, this.size.y);
};

//Setup runs once at the start of the program:
function setup(){

  //Create a canvas that fills the window:
  createCanvas(windowWidth,windowHeight);

  //Here comes two nested for loops for creating the nine GamePiece objects. Iterate through this loop three times (one for each column):
  for(var j = 0; j < numPieces; j++)
  {

    //Iterate though this loop three times (one for each row) each time the for loop above runs:
    for(var i = 0; i < numPieces; i++)
    {

        /*Set the position of the GamePiece object depending on the row (the first loop, variable j) and column (the nested loop, variable i).
         The size of the object is found by dividing the size of the canvas by the number of tiles. Position and size are stored in vectors:*/
        var position = createVector((width/numPieces)*i,(height/numPieces)*j);
        var size = createVector((width/3),(height/3));

        //Set the id of the object to the length of the pieces array. As the loop loops, the objects are added to the array and it gets longer:
        var id = pieces.length;

        /*Create a new GamePiece object called piece every loop with a blank character to be "displayed" on the tile.
        Pass in the position and size vectors and the tile id as well:*/
        var piece = new GamePiece(" ",position,size,id);

        //Push the new GamePiece object into the pieces array:
        pieces.push(piece);
    }
  }
}

//The function draw is called every frame:
function draw(){

  //If the current game state is "play_game"...
  if(gameState==="play_game")
  {

    //Set the variable "c" to a red colour:
    var c = color(255,0,0);

    //Loop this for as many times as there are GamePiece objects (the length of the pieces array):
    for(var i = 0; i < pieces.length; i++)
    {
      //Call the display() funtion of each GamePiece object in the pieces array, which draws the tile on the canvas:
      pieces[i].display(c);
    }

    //This loop iterates through the possible win states for the game and checks if someone has won:
    for(i = 0; i <winStates.length; i++)
    {
      //If the tiles of the current win state all have the name "x" then the winner is "x" and the game ends:
      if(pieces[winStates[i][0]].name==="X" && pieces[winStates[i][1]].name==="X" && pieces[winStates[i][2]].name==="X")
      {
        winner = "X";
        gameState = "end_game";

        //If not, but the same tiles all have the name "o", then the winner is "o" and the game ends:
      } else if(pieces[winStates[i][0]].name==="O" &&  pieces[winStates[i][1]].name==="O" && pieces[winStates[i][2]].name==="O")
        {
          winner = "O";
          gameState = "end_game";
        }
      }

  //If the current state is not "play_game", but "end_game"...
  } else if(gameState==="end_game")
    {

      //Make the background black, set the fill colour to white and display the winner of the game at the middle of the canvas:
      background(0);
      fill(255);
      textSize(24);
      text( winner + " is the winner", width/2,height/2);
    }
}
