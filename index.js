document.addEventListener("DOMContentLoaded", () => {
  modifyDiv();

  const squares = document.querySelectorAll(".grid div");
  const displayCurentPlayer = document.getElementById("current-player");
  const scoreP1 = document.getElementById("scoreP1");
  const scoreP2 = document.getElementById("scoreP2");

  const gameSnd = new Audio("../../soundeffects/Wii Theme.mp3");
  const playSnd = new Audio("../../soundeffects/ping.mp3");
  const winSnd = new Audio("../../soundeffects/game-win-sound.mp3");

  function gamePlay() {
    let currentPlayer = 1;
    let score1 = 0;
    let score2 = 0;

    playSound(gameSnd);

    squares.forEach((square, i) => {
      square.addEventListener("click", () => {
        playSnd.play();
        if (
          squares[i + 7].classList.contains("taken") &&
          currentPlayer == 1 &&
          squares[i].classList.contains("taken") == false
        ) {
          square.classList.add("taken", "player-one");
          score1 += updateScore(i, "player-one");
          scoreP1.innerHTML = `Score:${score1}`;
          currentPlayer = 2;
          displayCurentPlayer.innerHTML = `Player ${currentPlayer}`;
          displayCurentPlayer.style.color = "var(--p2color)";
        } else if (
          squares[i + 7].classList.contains("taken") &&
          currentPlayer == 2 &&
          squares[i].classList.contains("taken") == false
        ) {
          square.classList.add("taken", "player-two");
          score2 += updateScore(i, "player-two");
          scoreP2.innerHTML = `Score:${score2}`;
          currentPlayer = 1;
          displayCurentPlayer.innerHTML = `Player ${currentPlayer}`;
          displayCurentPlayer.style.color = "var(--p1color)";
        } else alert("You can't play there");

        if (score1 > score2) {
          alertWinner(1, "var(--p1color)");

          squares.forEach((square) => square.classList.add("taken"));
        } else if (score2 > score1) {
          alertWinner(2, "var(--p2color)");

          squares.forEach((square) => square.classList.add("taken"));
        }
      });
    });

    const resetBoard = () => {
      score1 = 0;
      score2 = 0;
      currentPlayer = 1;
      scoreP1.innerHTML = `Score:${score1}`;
      displayCurentPlayer.innerHTML = `Player ${currentPlayer}`;
      displayCurentPlayer.style.color = "var(--p1color)";
      removeClass("player-one");
      removeClass("player-two");
    };

    const newEnd = document.getElementById("new-end");

    // end game or start new game
    newEnd.addEventListener("click", (e) => {
      target = e.target.id;
      switch (target) {
        case "end":
          alertconfirm("Are you sure you want to leave\n☹️");
          break;
        case "new":
          resetBoard();
          break;
      }
    });

    // confirm if user wants to end the game and end the game
    const alertconfirm = (text) => {
      let button = document.querySelector(".close-btn");
      let header = document.querySelector(".header");
      let confirmEnd = document.querySelector(".confirm-end");

      header.parentNode.classList.add("active");
      header.innerHTML = `${text}`;

      button.addEventListener("click", () => {
        header.parentNode.classList.remove("active");
      });

      confirmEnd.addEventListener("click", (e) => {
        target = e.target.id;
        switch (target) {
          case "yes":
            window.close();
            break;
          case "no":
            header.parentNode.classList.remove("active");
            break;
        }
      });
    };
  }

  //play audio
  const playSound = (audio) => {
    audio.play();
    const onBtn = document.getElementById("on");
    const offBtn = document.getElementById("off");
    onBtn.addEventListener("click", () => {
      onBtn.classList.remove("active");
      offBtn.classList.add("active");
      audio.pause();
    });
    offBtn.addEventListener("click", () => {
      offBtn.classList.remove("active");
      onBtn.classList.add("active");
      audio.play();
    });
  };

  // party.js animation to declare winner
  const alertWinner = (winner, color) => {
    let winDiv = document.querySelector(".winner");
    let button = document.querySelector("#alert-winner .close-btn");

    winDiv.parentNode.classList.add("active");

    winDiv.innerHTML = `Player ${winner} wins!`;
    winDiv.style.color = color;

    party.confetti(winDiv, {
      gravity: -5000,
      count: party.variation.range(20, 100),
    });
    party.sparkles(winDiv);
    winSnd.play();

    button.addEventListener("click", () => {
      winDiv.parentNode.classList.remove("active");
    });
  };

  // Function to remove class from an element
  function removeClass(className) {
    squares.forEach((square) => {
      if (square.classList.contains(className)) {
        square.classList.remove(className, "taken");
      }
    });
  }

  //*** Check for wins horizontally and vertcally ***/
  function updateScore(i, playerId) {
    let score = 0;
    checkHorizontalWin(i, playerId);
    checkVerticalWin(i, playerId);

    function checkHorizontalWin(i, playerId) {
      let winRow = [i, i + 1, i + 2, i + 3];
      if (
        winRow.every((index) => squares[index].classList.contains(playerId))
      ) {
        score++;
      }
    }

    function checkVerticalWin(i, playerId) {
      let winRow = [i, i + 7, i + 14, i + 21];
      if (
        winRow.every((index) => squares[index].classList.contains(playerId))
      ) {
        score++;
      }
    }

    return score;
  }

  //*** Functions to create game board ***/

  // modify divs: adding class name, appending to another div
  function modifyDiv() {
    divs = createDiv(49); // This returns a node list of divs
    for (let i = 0; i < divs.length; i++) {
      if (i >= divs.length - 7) {
        divs[i].className = "taken";
      }
      document.querySelector(".grid").appendChild(divs[i]);
    }
  }

  // Create n number of divs and store in an array
  function createDiv(n) {
    const DivArray = [];
    for (let i = 0; i < n; i++) {
      const Div = document.createElement("div");
      DivArray.push(Div);
    }
    return DivArray;
  }

  gamePlay();
});
