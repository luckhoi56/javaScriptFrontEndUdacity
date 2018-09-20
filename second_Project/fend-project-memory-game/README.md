# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions how to play game
-This is a memory game with 4x4 layout. You win when you match all the pairs.
-One click is counted as one move. After 3 moves, you will lose one star. The lowest score is one star.
-If you match a pair, that move will not be counted.

## Contributing
-function explanation:
%move_and_star_render(): this function will render the star and take one away after every 3 moves.
win(): check for win condition. The player win when all cards has "match" in the class

%card_shuffle(): randomize the order of the card.


%refresh_event_listener(): add event listener to each card.

%clear_list(): the card uses the dictionary structure to keep track if the card finds the match or not. For example: 
*fa-diamond has initial value of 0, if the user clicks on the card that has the diamond. It will add 1 to the value. clear_list will set the value of the card back to 0

%reset_star(): the three stars is saved in the const cln. cln clones the three stars html portion. After a few moves, the dom's will be re-rendered. reset_star will replace the post-rerenderd three star version with the original one.

%reset_allCard(): this function is invoked when the user clicked on the rewind symbol. this function invokes back the refresh_event_listener(), clear_list(), cards_shuffle(), and reset_star()

%scan_for_match(): the function scan for the value of cards. The passed in parameter is the one who got nominated to be a match.