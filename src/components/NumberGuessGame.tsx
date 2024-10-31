'use client';
import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const NumberGuessGame = () => {
   const [gameStarted,setGameStarted] = useState<boolean>(false);
   const [gameOver,setGameOver] = useState<boolean>(false);
   const [attempts,setAttempts] = useState<number>(0);
   const [paused,setPaused] = useState<boolean>(false);
   const [userGuess,setUserGuess] = useState<number | string>('');
   const [targetNumber,setTargetNumber] = useState<number>(0);

   useEffect(()=>{
      if(gameStarted && !paused){
        const randomNumber:number = Math.floor(Math.random() * 100) + 1;
        setTargetNumber(randomNumber);
      }
   },[gameStarted,paused])

   const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
   }

   const handlePauseGame = () => {
     setPaused(true);
   }

   const handleResumeGame = () => {
    setPaused(false);
   }

   const handleGuess = () => {
     if(typeof userGuess === "number" && userGuess === targetNumber){
        setGameOver(true);
     }else{
        setAttempts(attempts + 1);
     }
   }

   const handleTryAgain = () => {
    setGameStarted(false);
    setGameOver(false);
    setAttempts(0);
    setUserGuess("");
   }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-white p-8 rounded-md shadow-lg mx-auto w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Number Guessing Game</h1>
        <p className="py-2 text-center mb-2">Try to guess the number between 1 and 100!</p>
        {!gameStarted && (
            <div className="flex items-center justify-center mb-4 mt-1">
                <Button
                onClick={handleStartGame}
                >Game Start</Button>
            </div>
        )}

        {gameStarted && !gameOver && (
            <div>
                <div className="flex justify-center mb-4">
                    {paused ? (
                        <Button
                        onClick={handleResumeGame}
                        >
                            Resume
                        </Button>
                    ) : (
                        <Button
                        onClick={handlePauseGame}
                        >
                            Pause
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-5 mb-4">
                    <Input
                    type="number"
                    id="num"
                    value={userGuess}
                    onChange={(e)=>{
                        setUserGuess(parseInt(e.target.value))
                    }}
                    placeholder="Enter your Guess"
                    className="bg-gray-100 rounded-[50px] shadow-sm"
                    />
                    <Button
                    onClick={handleGuess}
                    >
                        Guess
                    </Button>
                </div>

                <div className="text-center font-bold">
                    <p>Attempts: {attempts}</p>
                </div>
            </div>
        )}

        {gameOver && (
            <div className="flex items-center flex-col text-black">
               <h2 className="text-2xl font-bold">Game Over!</h2>
               <p className="mb-4 ">You Guessed the number in {attempts} attempts.</p>
               <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2"
               onClick={handleTryAgain}
               >
                Try Again
               </Button>
            </div>
        )}
      </div>
    </div>
  )
}

export default NumberGuessGame
