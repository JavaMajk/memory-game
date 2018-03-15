// Create all necessary variables
const deck = $(".deck");
const modal = $(".modal");
let card = $(".card");
let cards = [...card];
let openCards = [];
let counter = 0;
let moves = 0;
let matches = 0;
let timerInterval = null;
let seconds = 0;

cards = shuffle(cards); //use shuffle function to shuffle cards array
deck.append(cards); //append shuffled array to the DOM

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Listen for clicks in deck area
deck.on('click', (e) => {
    let selected = $(e.target);
    if (selected.hasClass("deck")) {
        return false;
    }
    displaySymbol(selected);
    addToOpenCards(selected);
    increment();
    finito();
    start();
});
// Function to diaplay the card
const displaySymbol = (selected) => selected.addClass("flipInY open show noClick");

// Function to add cards that are open to the 'selected' array
const addToOpenCards = (selected) => {
    if (openCards.length < 2) {
        openCards.unshift(selected);
    }
    if (openCards.length === 2) {
        deck.addClass("noClick");
        if (openCards[0].html() === openCards[1].html()) {
            matchLock();
        } else {
            reHide();
        }
    }
}
// Function to lock cards if they were a match
const matchLock = () => {
    $("ul.deck li.show").addClass("bounce match noClick");
    $("ul.deck li.show").removeClass("flipInY show open");
    deck.removeClass("noClick");
    openCards = [];
    matches++;
}
// Function to hide cards back if they did not match
const reHide = () => { 
    setTimeout(() => {
        $("ul.deck li.show").removeClass("flipInY show open noClick");
        deck.removeClass("noClick");
        openCards = [];
    }, 1000);
}
// Function to increment moves
const increment = () => {
    counter++;
    if (counter % 2 === 0) {
        moves = counter / 2;
    }
    if (counter > 20) {
        $("#starThree").removeClass("fa").addClass("far");
    } 
    if (counter > 30) {
        $("#starTwo").removeClass("fa").addClass("far");
    }
    if (counter > 40) {
        $("#starOne").removeClass("fa fa-star").addClass("fas fa-star-half");
    }
    $(".moves").html(moves);
}
// Function to run when all cards matched
const finito = () => {
    if (matches === 8) {setTimeout(() => {
        console.log("Thass itt!");
        modal.css('display', 'block');
        $(".total").html(moves);
        $(".ttime").html(seconds);
        $(".rating").html($(".stars"));
        stop();
    }, 1300);
}
}
// Simple restart implementation to reload page from cache
const restart = () => {
    window.location.reload(false);
}
// Timing functions
let countSeconds = () => $("#seconds").html(++seconds);
function start() {
  timerInterval = setInterval(countSeconds, 1000);
  start = function() {};  
}
const stop = () => {
  clearInterval(timerInterval);
}

//Hide Welcoming modal
const hideWelcome = () => {
    $(".welcome").css("display", "none");
}