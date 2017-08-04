$(document).ready( function() {
	MatchGame.renderCards(MatchGame.generateCardValues(), $( '#game .row' ));
});

var MatchGame = {};

	/*
	  Sets up a new game after HTML document has loaded.
	  Renders a 4x4 board of cards.
	*/

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

	for (var i = 0; i < cardValues.length; i++) {
		var $card = $( '<div class="card col-xs-3"></div>' );
		var cardValue = cardValues[i];
		var cardColor = 'hsl('+ hslValues[cardValue-1] +', 85%, 65%)';

		$card.data("value", cardValue);
		$card.data("flipped", false);
		$card.data("color", cardColor);

		$game.append($card);
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};