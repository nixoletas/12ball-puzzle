"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Ball from "./ball";
import Balance from "./balance";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

type BallType = {
  id: number;
  weight: "normal" | "heavy" | "light";
  location: "tray" | "left" | "right";
};

export default function GameBoard() {
  const [balls, setBalls] = useState<BallType[]>([]);
  const [weighings, setWeighings] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [showGuessDialog, setShowGuessDialog] = useState<boolean>(false);
  const [selectedBall, setSelectedBall] = useState<number | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<
    "heavy" | "light" | null
  >(null);
  const [result, setResult] = useState<
    "" | "left-heavy" | "right-heavy" | "equal"
  >("");
  const [oddBall, setOddBall] = useState<{
    id: number;
    weight: "heavy" | "light";
  }>({ id: 0, weight: "heavy" });

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Create 12 balls with normal weight
    const newBalls: BallType[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      weight: "normal",
      location: "tray",
    }));

    // Randomly select one ball to have different weight
    const oddBallIndex = Math.floor(Math.random() * 12);
    const isHeavy = Math.random() > 0.5;

    // Set the odd ball
    const oddBallId = oddBallIndex + 1;
    setOddBall({ id: oddBallId, weight: isHeavy ? "heavy" : "light" });

    // Update the ball's weight
    newBalls[oddBallIndex].weight = isHeavy ? "heavy" : "light";

    setBalls(newBalls);
    setWeighings(0);
    setGameOver(false);
    setResult("");
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("ballId", id.toString());
  };

  const handleDrop = (
    e: React.DragEvent,
    target: "left" | "right" | "tray"
  ) => {
    e.preventDefault();
    const ballId = Number.parseInt(e.dataTransfer.getData("ballId"));

    // Update the ball's location
    setBalls(
      balls.map((ball) =>
        ball.id === ballId ? { ...ball, location: target } : ball
      )
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const weighBalls = () => {
    if (weighings >= 3) {
      toast({
        title: "Maximum weighings reached",
        description: "You've used all 3 weighings. Make your guess now!",
        variant: "destructive",
      });
      return;
    }

    const leftBalls = balls.filter((ball) => ball.location === "left");
    const rightBalls = balls.filter((ball) => ball.location === "right");

    // Check if both sides have balls
    if (leftBalls.length === 0 || rightBalls.length === 0) {
      toast({
        title: "Invalid weighing",
        description:
          "You need to place at least one ball on each side of the balance.",
        variant: "destructive",
      });
      return;
    }

    // Calculate the weight difference
    const leftWeight = leftBalls.reduce((sum, ball) => {
      if (ball.weight === "heavy") return sum + 1;
      if (ball.weight === "light") return sum - 1;
      return sum;
    }, 0);

    const rightWeight = rightBalls.reduce((sum, ball) => {
      if (ball.weight === "heavy") return sum + 1;
      if (ball.weight === "light") return sum - 1;
      return sum;
    }, 0);

    // Determine the result
    let newResult: "" | "left-heavy" | "right-heavy" | "equal" = "";
    if (leftWeight > rightWeight) {
      newResult = "left-heavy";
    } else if (rightWeight > leftWeight) {
      newResult = "right-heavy";
    } else {
      newResult = "equal";
    }

    setResult(newResult);
    setWeighings((prev) => prev + 1);

    // Check if game is over
    if (weighings === 2) {
      setTimeout(() => {
        toast({
          title: "Final weighing used",
          description: "You've used all 3 weighings. Make your guess now!",
        });
      }, 1000);
    }
  };

  const resetWeighing = () => {
    // Return all balls to the tray
    setBalls(balls.map((ball) => ({ ...ball, location: "tray" })));
    setResult("");
  };

  const makeGuess = () => {
    setShowGuessDialog(true);
  };

  const submitGuess = () => {
    if (selectedBall === null || selectedWeight === null) {
      toast({
        title: "Incomplete guess",
        description:
          "Please select both a ball and whether it's heavier or lighter.",
        variant: "destructive",
      });
      console.log("Incomplete guess");
      return;
    }

    const isCorrectBall = selectedBall === oddBall.id;
    const isCorrectWeight = selectedWeight === oddBall.weight;
    const isCorrect = isCorrectBall && isCorrectWeight;

    setGameOver(true);
    setShowGuessDialog(false);

    if (isCorrect) {
      console.log("Correct guess");
      toast({
        title: "Congratulations!",
        description: `You correctly identified ball #${oddBall.id} as the ${oddBall.weight} ball in ${weighings} weighings!`,
      });
    } else {
      console.log("Incorrect guess");
      toast({
        title: "Incorrect guess",
        description: `The odd ball was #${oddBall.id} and it was ${oddBall.weight}. Try again!`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
        <h2 className="text-xl font-semibold">Weighings Used: {weighings}/3</h2>

        {result && (
          <div className="mb-2 text-center">
            <p className="text-lg font-medium">
              Result:{" "}
              {result === "left-heavy"
                ? "Left side is heavier"
                : result === "right-heavy"
                ? "Right side is heavier"
                : "Both sides are equal"}
            </p>
          </div>
        )}

        <Balance
          result={result}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          balls={balls}
        />

        <div className="mt-4 flex gap-4">
          <Button onClick={weighBalls} disabled={gameOver || weighings >= 3}>
            Weigh Balls
          </Button>
          <Button variant="outline" onClick={resetWeighing} disabled={gameOver}>
            Reset Balance
          </Button>
          <Button variant="secondary" onClick={makeGuess} disabled={gameOver}>
            Make Guess
          </Button>
        </div>
      </div>

      <div
        className="grid w-full grid-cols-6 gap-4 rounded-lg bg-slate-200 p-4 dark:bg-slate-700 sm:grid-cols-12"
        onDrop={(e) => handleDrop(e, "tray")}
        onDragOver={handleDragOver}
      >
        <h3 className="col-span-full mb-2 text-center text-lg font-medium">
          Ball Tray
        </h3>
        {balls.map(
          (ball) =>
            ball.location === "tray" && (
              <Ball key={ball.id} id={ball.id} onDragStart={handleDragStart} />
            )
        )}
      </div>

      {gameOver && (
        <div className="mt-4 flex gap-4">
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How to Play: The 12 Balls Puzzle</DialogTitle>
            <DialogDescription>
              One of the 12 identical-looking balls has a different weight
              (either heavier or lighter). Your goal is to identify which ball
              is different and whether it's heavier or lighter in just 3
              weighings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>1. Drag and drop balls onto either side of the balance scale.</p>
            <p>2. Click "Weigh Balls" to see which side is heavier.</p>
            <p>
              3. Use the results to deduce which ball has a different weight.
            </p>
            <p>
              4. After figuring it out (or using all 3 weighings), make your
              guess.
            </p>
            <p className="font-medium">
              Hint: This puzzle can always be solved in exactly 3 weighings!
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowInstructions(false)}>
              Start Playing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGuessDialog} onOpenChange={setShowGuessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Make Your Guess</DialogTitle>
            <DialogDescription>
              Which ball has a different weight, and is it heavier or lighter?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full ${
                    selectedBall === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                  onClick={() => setSelectedBall(i + 1)}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <RadioGroup
              value={selectedWeight || ""}
              onValueChange={(value) =>
                setSelectedWeight(value as "heavy" | "light")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="heavy" id="heavy" />
                <Label htmlFor="heavy">Heavier</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Lighter</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button onClick={submitGuess}>Submit Guess</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        onClick={() => setShowInstructions(true)}
        className="mt-4"
      >
        Show Instructions
      </Button>

      <Toaster />
    </div>
  );
}
