'use client';
// Importing necessary hooks and components from React and custom components
import { useState,useEffect,ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Type definition for the NumberGuessingComponent's state
interface NumberGuessingState {
    gameStarted : boolean,
    gameOver : boolean,
    paused : boolean,
    targetNumber : number,
    userGuess : number | string,
    attempts : number
}

const NumberGuessGame = () => {
    const [gameStarted,setGameStarted] = useState<boolean>(false);
    const [gameOver,setGameOver] = useState<boolean>(false);
    const [paused,setPaused] = useState<boolean>(false);
    const [targetNumber,setTargetNumber] = useState<number>(0);
    const [userGuess,setUserGuess] = useState<number|string>("");
    const [attempts,setAttempts] = useState<number>(0);

    // Function to handle the start of the game
    const handleStartGame = ():void =>{
        setGameStarted(true); // Start the game
        setGameOver(false); // Reset the game over state
        setAttempts(0); // Reset the attempts counter
        setPaused(false); // Ensure the game is not paused
    }

    // useEffect to generate a new target number when the game starts or resumes
    useEffect(()=>{
        if(gameStarted && !paused){
            const randomNumber : number = Math.floor(Math.random() * 100) + 1;
            setTargetNumber(randomNumber);
        }
    },[gameStarted,paused])

    // Function to handle resuming the game
    const handleResumeGame = ():void =>{
        setPaused(false); // Resume the game
    }

    // Function to handle pausing the game
    const handlePauseGame = ():void =>{
        setPaused(true); // Pause the game
    }

    // Function to handle the user's guess
    const handleGuess = () : void =>{
        if(typeof userGuess === "number" && userGuess === targetNumber){
            setGameOver(true); // If the guess is correct, end the game
        }else{
            setAttempts(attempts + 1); // Increment the attempts counter
        }
    }

     // Function to handle input change for user's guess
    const handleUserGuessChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        setUserGuess(parseInt(e.target.value));
    }

    // Function to handle restarting the game
    const handleTryAgain = () : void =>{
        setGameStarted(false); // Reset the game state
        setGameOver(false); // Reset the game over state
        setAttempts(0); // Reset the attempts counter
        setUserGuess(""); // Clear the user's guess
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-emerald-600 to-emerald-950">
         {/* Main container for the game */}
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        {/* Title of the game */}
        <h1 className="text-center text-3xl font-bold mb-2 text-black">
            Number Guessing Game
        </h1>
        {/* Description of the game */}
        <p className=" text-center text-black mb-4">
            Try to guess the number between 1 and 100!
        </p>
        {/* Conditional rendering: show start button if game hasn't started */}
        {!gameStarted && (
            <div className="flex justify-center mb-4">
                <Button
                onClick={handleStartGame}
                className="bg-black hover:bg-gray-700 font-bold "
                >
                    Start Game
                </Button>
            </div>
        )}
         {/* Conditional rendering: show game controls if game started and not over */}
         {gameStarted && !gameOver && (
            <div>
                <div className="flex justify-center mb-4">
                    {/* Button to resume the game if paused */}
                    {paused ? (
                        <Button
                        onClick={handleResumeGame}
                        className="font-bold bg-gray-700 hover:bg-gray-800"
                        >
                            Resume
                        </Button>
                    ):(
                        /* Button to pause the game */
                        <Button
                        onClick={handlePauseGame}
                        className="font-bold bg-gray-700 hover:bg-gray-800"
                        >
                            Pause
                        </Button>

                    )}
                </div>

                <div className="flex justify-center mb-4 gap-2">
                    <Input
                    type="number"
                    value={userGuess}
                    onChange={handleUserGuessChange}
                    placeholder="Enter your Guess"
                    />
                    {/* Button to submit the guess */}
                    <Button
                    onClick={handleGuess}
                    className="bg-gray-700 hover:bg-gray-800"
                    >
                        Guess
                    </Button>
                </div>
                <div className="text-center text-black">
                    {/* Display number of attempts */}
                    <p className="font-bold">Attempts : {attempts}</p>
                </div>
            </div>
         )}
          {/* Conditional rendering: show game over message if game is over */}
          {gameOver && (
            <div>
                <div className="text-center mb-4 text-black">
                    {/* Game over message */}
                    <h2 className="text-2xl font-bold">Game Over</h2>
                    <p>You guessed the number in {attempts} attempts.</p>
                </div>
                <div className="flex justify-center">
                    {/* Button to try the game again */}
                    <Button
                    onClick={handleTryAgain}
                    className="bg-red-500 hover:bg-red-600 font-bold"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default NumberGuessGame
