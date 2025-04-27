import GameBoard from "@/components/game-board";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm">
        <h1 className="mb-4 text-center text-3xl font-bold">
          The 12 Balls Puzzle
        </h1>
        <p className="mb-8 text-center">
          One of these 12 balls has a different weight. Your goal is to find
          that ball with only 3 weighings?
        </p>
        <GameBoard />
      </div>
    </main>
  );
}
