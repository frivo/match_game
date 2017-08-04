var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready( function() {
	var cards = MatchGame.generateCardValues();
	var $game = $( '#game .row' );
	MatchGame.renderCards(cards, $game);
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var numbers = [];

	for (var i = 1; i <= 8; i++) {
		numbers.push(i);
		numbers.push(i);
	}

	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	};

	numbers = shuffleArray(numbers);
	return numbers;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	var hslValues = [25, 55, 90, 160, 220, 265, 310, 360];
	$game.empty();
	$game.data('flippedCards', []);

	for (var i = 0; i < cardValues.length; i++) {
		var $card = $( '<div class="card col-xs-3"></div>' );

		var cardValue = cardValues[i];
		var cardColor = 'hsl('+ hslValues[cardValue-1] +', 85%, 65%)';
		var data = {
			value: cardValue,
			isFlipped: false,
			color: cardColor,
		};

		$card.data(data);
		$game.append($card);
	}

	$('.card').click(function() {
		MatchGame.flipCard($(this), $game);
	});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	if ($card.data("isFlipped")) {
		return;
	}

	$card.css('background-color', $card.data("color"))
		.text($card.data("value"))
		.data('isFlipped', true)
	;

	var flippedCards = $game.data("flippedCards");
	flippedCards.push($card);

	var matchColor = {
		"background-color": 'rgb(153, 153, 153)',
		"color": 'rgb(204, 204, 204)'
	};

	function resetCard(card) {
		card.css("background-color", 'rgb(32, 64, 86)')
			.text('')
			.data("isFlipped", false);
	};

	if (flippedCards.length === 2) {		
		var card1 = flippedCards[0];
		var card2 = flippedCards[1];

		if (card1.data("value") === card2.data("value")) {
			card1.css(matchColor);
			card2.css(matchColor);
		} else {
			window.setTimeout( function() {
				resetCard(card1);
				resetCard(card2);
			}, 500);
		}

		$game.data('flippedCards', []);
	}
};