const { setMaxListeners } = require('node:events');
const { exit } = require('node:process');
const readline = require('node:readline');

// interface for reading and writing to console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



let secretNumber;
let numAttempts;

function checkGuess(num)
{
    if (num > secretNumber)
    {
        console.log("Too high");
        return false;
    }
    if (num < secretNumber)
    {
        console.log("Too low");
        return false;
    }
    else
    {
        console.log("Correct!");
        return true;
    }
}


function randomInRange(min, max)
{
    return Math.floor(Math.random() * (max - (min+1)));
}

function askLimit()
{
    rl.question("How many number of tries do you want: ", numTries =>
    {
        if (isNaN(numTries))
        {
            console.log("Please enter valid numbers");
            exit();
        }
        numAttempts = numTries;
        askRange();
    });
}



function askRange()
{
    rl.question("Enter a minimum number: ", minimum =>
    {
        let min = Number(minimum);
        if (isNaN(min))
        {
            console.log(" ");
            console.log("Please enter valid numbers");
            exit();
        }


        rl.question("Enter a maximum number: ", maximum =>
        {
            let max = Number(maximum);
            if (isNaN(max))
            {
                console.log(" ");
                console.log("Please enter a valid number");
                exit();
            }
            secretNumber = randomInRange(min, max);
            console.log("I'm thinking of a number between " + min.toString() + " and " + max.toString() + "...");
            askGuess(min, max);

        });
    });

}



function askGuess(min, max)
{
    //console.log(secretNumber);

    // keep asking user for a guess and indicate whether the guess was higher or lower
    rl.question("Enter a guess: ", (answer) =>
    {
        if (isNaN(answer))
        {
            console.log(" ");
            console.log("Please enter valid numbers");
            exit();

        }
        if (checkGuess(Number(answer)) === true )
        {
            console.log("You Win!");
            rl.close();
            return;
        }
        if (numAttempts > 0)
        {
            //console.log("I reached this part");
            console.log(" ");
            askGuess(min, max);
            numAttempts --;
        }
        if (numAttempts === 0)
        {
            console.log("Lol just joking, You lose!!");
            console.log("The answer was "+ secretNumber.toString());

        }

    });
}


askLimit();

