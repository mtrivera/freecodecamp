# Simon Game
### Miguel T Rivera

![Render of my Simon Game](https://s26.postimg.org/ru43caryx/simon-render.png)

## Description
The classic game that you can now play in your browser. No need for batteries! A sequence of random colors will be played and you must match, get 20 correct and you win! Watch out though, the difficulty of the game increases as you near 20. 

Last front-end project for the Front-End Development Certificate of the freeCodeCamp currciculm.

## User Stories

* I am presented with a random series of button presses.
* Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
* I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
* If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
* I can see how many steps are in the current series of button presses.
* If I want to restart, I can hit a button to do so, and the game will return to a single step.
* I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
* I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

## Problems

1. Sequence playback
2. TypeScript issues
3. playSound() handling error sound 

## Solutions

1. Use recursion for the sequence playback
2. Redo the project in JavaScript and use Babel transpiler
3. Create new function playErrorSound()

## Things I Learned (TIL)

* Babel
  * Ensure compatibility across all major supported browsers
* TypeScript
  * Not ideal for all projects 
* .gitignore file
  * To prevent node_modules & the file itself being monitored

## Technology

* HTML5
* CSS3
* JavaScript
* Babel
* Git
* npm
* VSCode
* ~~Atom~~
  * VSCode has most of the functionality I require built in
* ~~TypeScript~~
  * Caused too many issues

## Known Issues

* User input is valid while sequence playback occurs 
* User input clicks can extend beyond the sequence length 

## TODO

* Add Sass styling
* Make responsive
* Solve [Known Issues](##known-issues)
  * Maybe someone will like to pair program with me on these issues :)
* Combine playErrorSound() and playSound()
  * Should not need two functions to play a sound.