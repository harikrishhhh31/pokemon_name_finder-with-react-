# Pokefinder - Memory Card Game

This project is a React-based web application that tests a user's knowledge of Pokemon. The application interfaces with the public PokeAPI to dynamically fetch Pokemon data, rendering a multiple-choice guessing game with interactive UI components and WebGL backgrounds.

## Workflow

1. **Initialization**: The application mounts and displays the `LandingPage` component over a WebGL-rendered starfield background.
2. **Round Setup**: When the user initiates the game, the application queries the PokeAPI to fetch four random Pokemon. One is randomly designated as the correct answer.
3. **Active Gameplay**: The `GameArea` component displays the sprite of the correct Pokemon alongside four stylized, interactive buttons representing the choices. A countdown timer begins.
4. **User Interaction**:
   - **Correct Guess**: If the user selects the matching name, their score increments, and a new set of Pokemon is fetched.
   - **Incorrect Guess / Timeout**: If the user selects an incorrect name or the timer reaches zero, the game session terminates and transitions to the game over state.
5. **Resolution**: The `GameOverModal` component displays the user's final score and updates the best score tracking variable if a new record was achieved. The user can then restart the game.

## Components

The application is structured into the following modular React components:

- **App**: The root orchestrator. It manages the global game state (`landing`, `playing`, `gameover`), tracks scoring and timers, and handles asynchronous data fetching from the PokeAPI.
- **LandingPage**: The introductory view containing the title, instructions, and the primary call-to-action button to start the game.
- **GameArea**: The primary interactive view during gameplay. It presents the Pokemon image, the multiple-choice options, the current score, and the active countdown timer.
- **GameOverModal**: A modal overlay that interrupts the application flow when a loss condition is met, displaying the final results and a restart mechanism.
- **BorderGlow**: A decorative, interactive wrapper component applied to the multiple-choice buttons. It utilizes mouse tracking to render a glowing border effect.
- **Galaxy**: A specialized background component that utilizes the `ogl` library to render a WebGL-based, interactive 3D starfield effect on the landing page.

## Hooks

The application utilizes several standard React hooks for state and lifecycle management:

- **useState**: Employed extensively across components to manage local state primitives, such as the current game phase, active score, time remaining, and the arrays holding fetched Pokemon data.
- **useEffect**: Utilized for handling side effects. Key implementations include managing the countdown timer intervals, executing data fetching operations on component mount or round progression, and initializing the WebGL rendering context within the background components.
- **useRef**: Applied in the visual component layers (such as `BorderGlow` and `Galaxy`) to maintain persistent references to DOM elements and to track mutable values, like mouse coordinates, without triggering continuous component re-renders.
