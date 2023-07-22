function Player(id,marker,score) {
   return {id, marker, score};
}

gameBoardController = (function (){
   let board = [];
   let rows = 3;
   let columns = 3;
   const playerOne = Player(1,'X',0);
   const playerTwo = Player(2,"O", 0);
   let currentPlayer = playerOne.id;
   let gameOver = false;

   function checkTie() {
      let squareValue = [];
      for (let r = 0; r < rows; r++) {
          for (let c = 0; c < columns; c++) {
             if(board[r][c] === ' '){
                squareValue.push(board[r][c]);
             }      
          }         
      }
        
      if(squareValue.length === 0) {
         document.querySelector('.current').innerText = null;
         document.querySelector('.winner').innerText = 'Tie';
         // alert('tie')
      }
   }

   function checkWinner() {
      //horizontally
      for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 2; c++) {
            if(board[r][c] !== ' ') {
               if(board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2]){
                  setWinner(r,c);
                  return;
               }
            } 
         }
      }

      // vertically
      for (let c = 0; c < columns; c++) {
          for (let r = 0; r < rows -2; r++) {
            if(board[r][c] !== ' ') {
               if(board[r][c] === board[r+1][c] && board[r+1][c] === board[r+2][c]) {
                  setWinner(r,c); 
                  return;
               }
            }
          }         
      }

      //anti diagonally 
      for (let r = 0; r < rows - 2; r++) {
          for (let c = 0; c < columns - 2; c++) {
             if(board[r][c] !== ' ') {
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2]) {
                  setWinner(r,c);
                  return;
                }
             }
          }
      }
      
      //diagonally
      for (let r = 2; r < rows; r++) {
        for (let c = 0; c < columns -2; c++) {
           if(board[r][c] !== ' ') {
              if(board[r][c] === board[r-1][c+1] && board[r-1][c+1] === board[r-2][c+2]) {
                 setWinner(r,c);
                 return;
              }
           }
        }         
      }
   }

   function playAgain() {
     gameOver = false;
     board = [];
     document.querySelector('section.board').innerHTML = null;
     currentPlayer = playerOne.id;
     document.querySelector('.current').innerText = `Current Player is ${playerOne.name}`
     document.querySelector('.winner').innerText = null;
     setBoard();
   }

   function setWinner(r,c) {
      if(board[r][c] === 1){
          document.querySelector('.winner').innerHTML = `Winner is ${playerOne.name}`;
         //  updateScore(playerOne)
         document.querySelector('.left .score').innerText = `${++playerOne.score}`

         } else{ 
          document.querySelector('.winner').innerHTML = `Winner is ${playerTwo.name}`;
         //  updateScore(playerTwo);
          document.querySelector('.right .score').innerText = `${++playerTwo.score}`
         }
         document.querySelector('.current').innerText = null;
         gameOver = true;
   }

   function setMarker() {
      if(gameOver) return;

      const square = this;
      const coordinates = square.id.split('-');
      const rC = parseInt(coordinates[0]);
      const cC = parseInt(coordinates[1]);
      if(board[rC][cC] !== " ") {
         return;
      }
      board[rC][cC] = currentPlayer;

      if(currentPlayer === playerOne.id) {
         currentPlayer = playerTwo.id;
         const image = document.createElement('img');
         image.src = './assets/close.svg';
         square.append(image);
         document.querySelector('.current').innerText = `Current Player is ${playerTwo.name}(O)`
      } else {
         currentPlayer = playerOne.id;
         const image = document.createElement('img');
         image.src = './assets/circle-outline.svg';
         square.append(image);
         document.querySelector('.current').innerText = `Current Player is ${playerOne.name}(X)`

      }
      checkWinner();
      checkTie();
      //  console.log(board)
   }

   function setBoard() {
      for (let r = 0; r < rows; r++) {
          let row = [];
          for (let c = 0; c < columns; c++) {
            row.push(' ');
            const div = document.createElement('div');
            div.id = r.toString() + '-' + c.toString();
            div.classList.add('marker');
            div.addEventListener('click', setMarker); 
            document.querySelector('section.board').append(div);           
          }     
          board.push(row);    
      }

      document.querySelector('.again').addEventListener('click', playAgain);
   }

   function setSkeleton() {
   const p1Name = document.querySelector('input#p1-name').value;
   const p2Name =  document.querySelector('input#p2-name').value;
   console.log(typeof p2Name)
   if(p1Name === '' || p2Name === '') {
      alert('please enter names for both players');
      return;
   }
   
     playerOne.name = p1Name;
     playerTwo.name = p2Name;
     document.querySelector('body').innerHTML =` <h3 class="current">Current Player is ${playerOne.name}</h3>
     <h3 class="winner"></h3>
     <button class="again">Play Again</button>
     <div class="bottom">
         <div class="left">
             <h3>${playerOne.name}(X)</h3>
             <p class="score">0</p>
         </div>
         <section class="board">
         
         </section>
         <div class="right">
             <h3>${playerTwo.name}(O)</h3>
             <p class="score">0</p>
         </div>
     </div>`;
     setBoard();
   }

   return { setBoard, setSkeleton};
})()

// gameBoardController.setBoard();
function initiate() {
   document.querySelector('.start').addEventListener('click',gameBoardController.setSkeleton)
}

initiate()