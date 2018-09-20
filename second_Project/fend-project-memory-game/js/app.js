/*
Name: Khoi Luc
Project: Memory Card.
Course: Front End Developer Udacity Course.
*/
let seconds = 0;
let t = 0;
let move =0;
document.getElementById("timer").textContent=seconds;
window.alert("I am an alert box!");
let initial_time  = performance.now();
const cln = document.getElementsByClassName("stars")[0].cloneNode(true)
let m_open_cards = {
    'fa-diamond':0,
    'fa-paper-plane-o':0,
    'fa-anchor':0,
    'fa-bolt': 0,
    'fa-cube': 0,
    'fa-anchor': 0,
    'fa-leaf': 0,
    'fa-bicycle': 0,
    'fa-bomb': 0,
}
let m_cards = document.getElementsByClassName("card"); //this return the actual html list, not just a copy; m_cards contains dom objects
for (card of m_cards){
    
    card.addEventListener("click",function handler(e){
        displaySymbol(e);
        
        e.target.removeEventListener(e.type, handler);
    })
}
function refresh_event_listener(){
    let temp = document.getElementsByClassName("card");
    for (card of temp){
        card.addEventListener("click",displaySymbol);
    }
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function move_and_star_render(){
    document.querySelector('.moves').innerHTML = move;
    if (move % 3 ===0 && move !==0 ){ //we will one star after 3 moves.
        
        if(document.querySelector('.stars').hasChildNodes()){
           let elements = document.getElementsByClassName("fa-star");
           elements[0].parentNode.removeChild(elements[0])       
        }
    }
}
function win(){
    if(document.getElementsByClassName("match").length === 16)
        return true;
    return false;
}
function cards_shuffle(){
    const fragment = document.createDocumentFragment();
    cards = shuffle(m_cards); //shuffle the html list
    for (let card of cards){
        fragment.appendChild(card); // append the child, recall that each child has attribute of class="card"
    }
   
    document.querySelector('.deck').appendChild(fragment);
}
function reset_star(){
    let temp = cln.cloneNode(true);
    document.getElementsByClassName("stars")[0].parentNode.replaceChild(temp, document.getElementsByClassName("stars")[0])
    
}
function reset_allCard(){
    refresh_event_listener()
    clear_list();
    cards_shuffle();
    reset_star()
    seconds =0;
    document.getElementById("timer").textContent=seconds; //reset the clock
    move = 0;
    document.querySelector('.moves').innerHTML = move
    var temp_list =document.querySelectorAll('.card.open.show');  
    let temp_list_2 =document.querySelectorAll('.card.match');
    for (let card of temp_list){       
        card.className = "card";
    }
    for (let card of temp_list_2){
        
        card.className = "card";
    }
}
function scan_for_match(className){
    var temp = document.getElementsByClassName(className)
    for (elem of temp){
        elem.parentNode.classList.add("match");
    }
}
function clear_list(){
    for (key in m_open_cards){
        m_open_cards[key] = 0 ;
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function timer(){
    t = setTimeout(m_add, 1000);
}
function m_add (){
    seconds++;
    document.getElementById("timer").textContent=seconds;
    timer();
}
function displaySymbol(event){
    event.target.removeEventListener('click', displaySymbol);
    event.target.classList.add("open");
    event.target.classList.add("show");
    m_open_cards[event.target.childNodes[1].classList[1]] +=1;  
    if (m_open_cards[event.target.childNodes[1].classList[1]] >=2){ 
        scan_for_match(event.target.childNodes[1].classList[1]);
    }
    else{
        move +=1;
        move_and_star_render();
    }
    if (win()){
        clearTimeout(t)
        if (confirm(`You win,${seconds} seconds passed, ${document.querySelectorAll('.fa-star').length} stars left.Press a button to play again!`)) {
            reset_allCard();
            
        } 
        else {
            window.alert("thanks for playing")
        }
    }
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
document.querySelector('.restart').addEventListener("click",reset_allCard);
timer();
//we can pass the target event to display symbol. 