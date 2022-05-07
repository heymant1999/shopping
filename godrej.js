const currentPeriod = document.querySelector(
  "body > div > div.main > div.nav_content > div:nth-child(1) > div > div.parity > table > tbody > tr:nth-child(1) > td:nth-child(1)"
);

const currentResult = document.querySelector(
  "body > div > div.main > div.nav_content > div:nth-child(1) > div > div.parity > table > tbody > tr:nth-child(1) > td:nth-child(3)"
);

const previousResult = document.querySelector(
  "body > div > div.main > div.nav_content > div:nth-child(1) > div > div.parity > table > tbody > tr:nth-child(2) > td:nth-child(3)"
);

const joinGreen = document.querySelector(
  "body > div > div.main > div.center_text > div > button.back_one"
);

const joinRed = document.querySelector(
  "body > div > div.main > div.center_text > div > button.back_three"
);

const confirm = document.querySelector(
  "body > div > div.branch > div:nth-child(1) > div > div > div.close_btn > button:nth-child(2)"
);

const contractNumber = document.querySelector(
  "body > div > div.branch > div:nth-child(1) > div > div > div:nth-child(3) > div > div > input"
);

const refresh = document.querySelector(
  "body > div > div.mine_top > div > div > div.refresh > img"
);

function firstBet() {
  if (currentResult.style.color === "green") {
    joinRed.click();
    confirm.click();
    console.log("Joined red");
  } else {
    joinGreen.click();
    confirm.click();
    console.log("Green joined");
  }
}

function refreshClick() {
  refresh.click();
  setTimeout(betAgain, 10000);
}

function betAgain() {
  let winCount = 0;

  let win;

  if (currentResult.style.color != previousResult.style.color) {
    win = true;
    winCount++;
  } else {
    win = false;
    winCount = 0;
  }
  console.log(win);
  console.log(winCount);

  if (win === true && currentResult.style.color === "green" && winCount <= 3) {
    contractNumber.value = contractNumber.value * 2;
    joinRed.click();
    confirm.click();
    console.log("Red joined" + contractNumber.value);
  } else if (
    win === true &&
    currentResult.style.color === "red" &&
    winCount <= 3
  ) {
    contractNumber.value = contractNumber.value * 2;
    joinGreen.click();
    confirm.click();
    console.log("Green joined" + contractNumber.value);
  } else {
    firstBet();
    contractNumber.value = 1;
  }
  console.log("contract amount" + contractNumber.value);
  console.log("winCount" + winCount);
}

setInterval(refreshClick, 180000);

let currentBalance = parseInt(
  document
    .querySelector("body > div > div.mine_top > div > p")
    .textContent.slice(20)
);

const initialBalance = currentBalance;

let profit = setInterval(() => currentBalance - initialBalance, 18000);

let count = 0;

setInterval(() => {
count  =  count+1;
  console.log(count);
}, 1000);

console.log(count);
