'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2023-06-09T18:49:59.371Z',
    '2023-06-11T21:45:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'EUR', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Create Intl
const intlNumber = function (user, toFormat) {
  const options = {
    style: 'currency',
    currency: user.currency,
  };
  const intled = new Intl.NumberFormat(user.locale, options).format(toFormat);
  return intled;
};

/////////////////////////////////////////////////
//Creating Movements List
const displayMovements = function (user, sort = false) {
  console.log(user);
  containerMovements.innerHTML = '';

  const movs = sort
    ? user.movements.slice().sort((a, b) => a - b)
    : user.movements;

  movs.forEach((mov, ind) => {
    const movementDate = new Date(user.movementsDates[ind]);
    const movementDateStr = displayDates(movementDate, user);
    const movIntl = intlNumber(user, mov);

    const movType = mov > 0 ? `deposit` : `withdrawal`;
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${movType}">${
      ind + 1
    } ${movType}</div>
    <div class="movements__date">${movementDateStr}</div>
    <div class="movements__value">${movIntl}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//////////////////////////////////////////////////
// Movements Dates
const displayDates = function (movementDate, user) {
  let daysPassed = Math.round(
    Math.abs(Number(Date.now()) - Number(movementDate)) / (1000 * 60 * 60 * 24)
  );

  let movementDateStr;
  if (daysPassed === 0) {
    movementDateStr = `Today`;
  } else if (daysPassed === 1) {
    movementDateStr = `Yesterday`;
  } else if (daysPassed < 4) {
    movementDateStr = `${daysPassed} days ago`;
  } else {
    movementDateStr = new Intl.DateTimeFormat(user.locale).format(movementDate);
    /*
    movementDateStr = [
      `${movementDate.getDate()}`.padStart(2, '0'),
      `${movementDate.getMonth()}`.padStart(2, '0'),
      movementDate.getFullYear(),
    ].join('/');
    */
  }
  return movementDateStr;
};
//////////////////////////////////////////////////
// Creating Users
const createUsers = function (accounts) {
  accounts.forEach((account) => {
    const userName = account.owner
      .split(' ')
      .map((e) => {
        return e.at(0).toLowerCase();
      })
      .join('');
    account.userName ||= userName;
  });
};
createUsers(accounts);

///////////////////////////////////////////////////
// Showing the Balance
const createBalance = function (account) {
  const balance = account.movements
    .reduce((acc, e) => {
      return acc + e;
    }, 0)
    .toFixed(2);
  labelBalance.textContent = intlNumber(account, balance);
  account.balance = balance;
};

//////////////////////////////////////////////////
// Showing the IN`s, OUT`s and Interest
const displaySummary = function (account) {
  const IN = account.movements
    .filter((mov) => mov > 0)
    .reduce((sum, e) => sum + e, 0)
    .toFixed(2);
  labelSumIn.textContent = intlNumber(account, IN);

  const OUT = account.movements
    .filter((mov) => mov < 0)
    .reduce((sum, e) => sum + e, 0);
  labelSumOut.textContent = intlNumber(account, Math.abs(OUT));

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((e) => (e * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((sum, e, _, arr) => sum + e, 0)
    .toFixed(2);
  labelSumInterest.textContent = intlNumber(account, interest);
};

///////////////////////////////////////////////////
// Showing ALL the UI
const updateUI = function (currentUser) {
  displayMovements(currentUser);
  createBalance(currentUser);
  displaySummary(currentUser);
};

///////////////////////////////////////////////////
// Get Current Date
const newDate = function () {
  const now = new Date();
  const str = [
    `${now.getDate()}`.padStart(2, '0'),
    `${now.getMonth() + 1}`.padStart(2, '0'),
    now.getFullYear(),
  ].join('/');
  const hour = [
    `${now.getHours()}`.padStart(2, '0'),
    `${now.getMinutes()}`.padStart(2, '0'),
  ].join(':');
  return [str, hour];
};

///////////////////////////////////////////////////
// Countdown
const implementCountDown = function () {
  let counterSec = 60;
  let counterMin = 4;
  const tickTick = function () {
    if (counterMin === 0) {
      containerApp.classList.remove('opacity');
      labelWelcome.textContent = 'Log in to get started';
      clearInterval(timerLogin);
    }
    if (counterSec > 0) {
      counterSec--;
    } else {
      counterSec = 59;
      counterMin--;
    }
    labelTimer.textContent = `${counterMin
      .toString()
      .padStart(2, '0')}:${counterSec.toString().padStart(2, '0')}`;
  };
  tickTick();
  const timerLogin = setInterval(tickTick, 1000);
  return timerLogin;
};
///////////////////////////////////////////////////
// Implementing the Login
let currentUser, timer;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const user = inputLoginUsername.value;
  const pin = +inputLoginPin.value;
  if (user && pin) {
    currentUser = accounts.find((e) => e.userName === user);
    if (currentUser) {
      console.log(currentUser);
      if (currentUser.pin === pin) {
        containerApp.classList.add('opacity');
        labelWelcome.textContent = `Welcome back, ${
          currentUser.owner.split(' ')[0]
        }`;
        updateUI(currentUser);
        timer ? clearInterval(timer) : null;
        timer = implementCountDown();

        inputLoginUsername.value = '';
        inputLoginPin.value = '';
        inputLoginPin.blur();
        const now = new Date();
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          weekday: 'long',
        };
        //const [date, hour] = newDate();
        labelDate.textContent = new Intl.DateTimeFormat(
          currentUser.locale,
          options
        ).format(now);
      } else {
        console.log('Invalid Password!');
      }
    } else {
      console.log(`User not Found!`);
    }
  }
});

//////////////////////////////////////////////////
//Implementing the transfer
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const receiver = accounts.find((e) => e.userName === inputTransferTo.value);
  if (receiver && receiver.userName !== currentUser.userName) {
    if (transferAmount > 0) {
      if (transferAmount < currentUser.balance) {
        receiver?.movements.push(transferAmount);
        currentUser.movements.push(-transferAmount);
        receiver?.movementsDates.push(Date.now());
        currentUser.movementsDates.push(Date.now());
        updateUI(currentUser);
        inputTransferTo.value = '';
        inputTransferAmount.value = '';
        inputTransferAmount.blur();
        clearInterval(timer);
        timer = implementCountDown();
      } else {
        console.log('You can not transfer more than you have!');
        inputTransferAmount.value = '';
      }
    } else {
      console.log(`You can not transfer a negative amount!`);
      inputTransferAmount.value = '';
    }
  } else {
    console.log(`invalid user!`);
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }
});

//////////////////////////////////////////////////////////
//Implementing Loans
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const requestedLoan = Math.floor(inputLoanAmount.value);
  if (requestedLoan && requestedLoan > 0) {
    if (currentUser.movements.some((e) => e > requestedLoan * 0.1)) {
      inputLoanAmount.value = '';
      inputLoanAmount.blur();
      const loanTimer = setTimeout(() => {
        currentUser.movements.push(requestedLoan);
        currentUser.movementsDates.push(Date.now());
        updateUI(currentUser);
      }, 5000);
      clearInterval(timer);
      timer = implementCountDown();
    } else {
      console.log(
        `Sorry! You can't request a loan of ${requestedLoan}. First, you need to make at least one deposit that is 10% above than the requested Loan (${
          requestedLoan * 0.1
        })`
      );
      inputLoanAmount.value = '';
    }
  } else {
    console.log(`invalid Loan`);
  }
});

/////////////////////////////////////////////////////
// Implementing the Delete Account
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const pin = +inputClosePin.value;
  const toDeleteUser = accounts.findIndex(
    (e) => e.userName === inputCloseUsername.value
  );
  if (accounts[toDeleteUser].userName === currentUser.userName) {
    if (accounts[toDeleteUser].pin === pin) {
      accounts.splice(toDeleteUser, 1);
      console.log(accounts);
      containerApp.classList.remove('opacity');
      labelWelcome.textContent = 'Log in to get started';
      inputCloseUsername.value = '';
      inputClosePin.value = '';
    } else {
      console.log(`Invalid PIN`);
      inputClosePin.value = '';
    }
  } else {
    console.log(`Invalid User`);
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
});

/////////////////////////////////////////////////////
// Sorting movements
let sorted = false;

btnSort.addEventListener('click', () => {
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////////////////////
// Using Array.from()
labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (e) => +e.textContent.replace('€', '')
  ).reduce((sum, e, _, arr) => {
    return sum + e;
  }, 0);
});
