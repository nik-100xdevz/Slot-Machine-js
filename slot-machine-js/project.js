// 1. Depoisit some money 
// 2. Determine numbers of line  to bet on
// 3. Collect om a bet amount
// 4. Spin the slott machine
// 5. Check if the user winning
// 6. give the user their winning
// 7. play again

// function deposit(){
//      return 1
// }

const prompt = require("prompt-sync")();  // using the package we have installed we use this function to input   

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
     A: 2,
     B: 4,
     C: 6,
     D: 8
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

const deposit =  () => {
    while (true) { //looping forever until its true
     const depositAmount = prompt("Enter a deposit amount: ");
      const numberDepositAmount = parseFloat(depositAmount); // parseFloat is going to take string and convert into floating point

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) { // to confirm if its number or string
          console.log("Invalid deposit amount , try again. ");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberofLines = () => {
    while (true) { //looping forever until its true
        const lines = prompt("Enter the Number of Lines to bet on(1-3): ");
         const numberOfLines = parseFloat(lines); // parseFloat is going to take string and convert into floating point
   
           if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) { // to confirm if its number or string
             console.log("Invalid NUmber of lines , try again. ");
           } else {
               return numberOfLines;
           }
       }
};

const getBet = (balance , lines) => {
    while (true) { //looping forever until its true
        const bet = prompt("Enter the  bet per Line: ");
         const numberBet = parseFloat(bet); // parseFloat is going to take string and convert into floating point
   
           if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) { // to confirm if its number or string
             console.log("Invalid Bet  , try again. ");
           } else {
               return numberBet;
           }
       }
};

const spin = () =>{
    const symbols = []; //refrence data type
        for ( const [symbol,count] of Object.entries(SYMBOLS_COUNT)) {
            for(let i =0; i < count; i++){
                symbols.push(symbol);
            }
        }
   const reels =  [[], [], []];
   for(let i = 0; i < COLS; i++){
    // reels.push([]);
       const reelSymbols = [...symbols];
       for(let j = 0; j <ROWS; j++){
           const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
         reels[i].push(selectedSymbol);
         reelSymbols.splice(randomIndex, 1);
       }
   }
   return reels;
};

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++ ){
        rows.push([]);
        for(let j =0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};
//print our rows
const printRows = (rows) => {
    for ( const row of rows) {
        let rowString = "";
        for ( const [i,symbol] of row.entries()) {
            rowString +=symbol;
            if (i!= row.length - 1){
                rowString += "  |  ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };

  const game = () => {
    let balance = deposit();
  
    while (true) {
      console.log("You have a balance of $" + balance);
      const numberOfLines = getNumberofLines();
      const bet = getBet(balance, numberOfLines);
      balance -= bet * numberOfLines;
      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);
      const winnings = getWinnings(rows, bet, numberOfLines);
      balance += winnings;
      console.log("You won, $" + winnings.toString());
  
      if (balance <= 0) {
        console.log("You ran out of money!");
        break;
      }
  
      const playAgain = prompt("Do you want to play again (y/n)? ");
  
      if (playAgain != "y") break;
    }
  };
  
  game();

// let balnce = deposit();// calling the function
// const numberOfLines = getNumberofLines();
// const bet = getBet(balnce, numberOfLines);
// const reels = spin();
// const rows = transpose(reels);
// printRows(rows);
