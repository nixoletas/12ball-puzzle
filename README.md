# The 12 Balls Puzzle

A web-based interactive version of the classic "12 Balls Puzzle" built with Next.js, React, and Tailwind CSS.

## 🧩 The Puzzle

You are presented with 12 identical-looking balls. One of them has a different weight (either heavier or lighter). Your challenge: **Find the odd ball and determine if it is heavier or lighter using only 3 weighings!**

## 🚀 Features

- **Drag & Drop Interface:** Move balls onto a virtual balance scale.
- **Weighing Mechanism:** Simulate up to 3 weighings to gather clues.
- **Guess Dialog:** After 3 weighings, make your guess about which ball is odd and whether it’s heavier or lighter.
- **Instant Feedback:** Get notified if your guess is correct or not.
- **Replayable:** Reset and play as many times as you like.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (React framework)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible UI components

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nixoletas/12ball-puzzle.git
   cd 12ball-puzzle
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🕹️ How to Play

1. **Drag balls** onto the left and right pans of the balance.
2. Click **Weigh** to see which side is heavier, lighter, or if they balance.
3. You have **3 weighings** to deduce which ball is odd and whether it’s heavier or lighter.
4. After 3 weighings, make your **final guess**.
5. Get instant feedback and try again!

## 📁 Project Structure

- `app/` – Main Next.js app directory (entry point, layout, global styles)
- `components/` – React components (game board, ball, balance, UI elements)
- `styles/` – Tailwind and custom CSS

## 📝 License

MIT
