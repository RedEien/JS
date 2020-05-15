// checkboxes hold
var check1 = false;
var check2 = false;
var check3 = false;
var check4 = false;
var check5 = false;
// checkboxes scoring top
var checkOnes = false;
// rolls
var turns = 3;
var turn = 0;
// Players
var activePlayer = "P1";
// dice
var d1 = 0;
var d2 = 0;
var d3 = 0;
var d4 = 0;
var d5 = 0;
// sum of all sice
var diceTotal = 0;
// dice array
var arr = [];
// score values
var smallStraight = false;
var bigStraight = false;
var threeOfaKind = false;
var fourOfaKind = false;
var kniffel = false;
var fullHouse = false;
var chance = false;
// scoring top
var score = false;
// scoring bottom
var logsolution = false;

function rollDice() {
    smallStraight = false;
    bigStraight = false;
    threeOfaKind = false;
    fourOfaKind = false;
    kniffel = false;
    fullHouse = false;

    checkBoxes()
    var die1 = document.getElementById("die1");
    var die2 = document.getElementById("die2");
    var die3 = document.getElementById("die3");
    var die4 = document.getElementById("die4");
    var die5 = document.getElementById("die5");

    var status = document.getElementById("status");
    
    
    if (check1 == false && turn < turns){
        var d1 = Math.floor(Math.random() * 6) + 1;
    } else { d1 = document.getElementById("die1").innerHTML;}
    if (check2 == false && turn < turns){
        var d2 = Math.floor(Math.random() * 6) + 1;
    } else { d2 = document.getElementById("die2").innerHTML;}
    if (check3 == false && turn < turns){
        var d3 = Math.floor(Math.random() * 6) + 1;
    } else { d3 = document.getElementById("die3").innerHTML;}
    if (check4 == false && turn < turns){
        var d4 = Math.floor(Math.random() * 6) + 1;
    } else { d4 = document.getElementById("die4").innerHTML;}
    if (check5 == false && turn < turns){
        var d5 = Math.floor(Math.random() * 6) + 1;
    } else { d5 = document.getElementById("die5").innerHTML;}
    diceTotal = +d1 + +d2 + +d3 + +d4 + +d5;
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    die3.innerHTML = d3;
    die4.innerHTML = d4;
    die5.innerHTML = d5;
    status.innerHTML = "Du hast "+diceTotal+" gewürfelt! ";

    arr = [d1, d2, d3, d4, d5];

    arr.sort(function(a, b){return a-b}); // sort numbers n an array in ascending order
    arr = arr.join(""); 
    bottomCheck() // https://stackoverflow.com/questions/18615867/small-straight-yahtzee-algorithm

    status.innerHTML += arr;

    if (turn < turns) {
        turn += 1;
    }else { 
        window.alert("Auswerten")
        resolve() 
    }
    status.innerHTML += " Runde "+turn+" Spieler "+activePlayer;
} 

function resolve() {
    
    checkScoringTop()
    checkChance()
    scoringBottom()
    smallStraight = false;
    bigStraight = false;
    threeOfaKind = false;
    fourOfaKind = false;
    kniffel = false;
    fullHouse = false;
    scoringTop()
    var chanceP = document.getElementById("tdChance"+activePlayer).innerHTML;

    if (chance == true) {
        if (chanceP == 0 ) {
            document.getElementById("tdChance"+activePlayer).innerHTML = diceTotal;
            turn = 0;
            clearHold()
            clearCheckTop()
            nextPlayer()
        } else {info.innerHTML = "Du hast die Chance schon eingetragen ";}
    }
    document.getElementById("tdSolutionBottomP1").innerHTML = +document.getElementById("tdthreeOfaKindP1").innerHTML + +document.getElementById("tdfourOfaKindP1").innerHTML + +document.getElementById("tdfullHouseP1").innerHTML + +document.getElementById("tdSmallStraightP1").innerHTML + +document.getElementById("tdbigStraightP1").innerHTML + +document.getElementById("tdkniffelP1").innerHTML + +document.getElementById("tdChanceP1").innerHTML;
    document.getElementById("tdSumTopP1").innerHTML = +document.getElementById("td1erP1").innerHTML + +document.getElementById("td2erP1").innerHTML + +document.getElementById("td3erP1").innerHTML + +document.getElementById("td4erP1").innerHTML + +document.getElementById("td5erP1").innerHTML + +document.getElementById("td6erP1").innerHTML;
    if (document.getElementById("td1erP1").innerHTML != 0 && document.getElementById("td2erP1").innerHTML != 0 && document.getElementById("td3erP1").innerHTML != 0 && document.getElementById("td4erP1").innerHTML != 0 && document.getElementById("td5erP1").innerHTML != 0 && document.getElementById("td6erP1").innerHTML != 0) {
        var sum = +document.getElementById("td1erP1").innerHTML + +document.getElementById("td2erP1").innerHTML + +document.getElementById("td3erP1").innerHTML + +document.getElementById("td4erP1").innerHTML + +document.getElementById("td5erP1").innerHTML + +document.getElementById("td6erP1").innerHTML;
        if ( sum >= 63 ) {
            var bonus = 35;
            var sumTop = +sum + +bonus;
            document.getElementById("tdBonusP1").innerHTML = 35;
            document.getElementById("tdTotalTopP1").innerHTML = sumTop;
            document.getElementById("tdSolutionTopP1").innerHTML = sumTop;
        } else {
            document.getElementById("tdTotalTopP1").innerHTML = sum;
            document.getElementById("tdSolutionTopP1").innerHTML = sum;
        }
    }
    if (document.getElementById("tdSolutionBottomP1").innerHTML != 0 && document.getElementById("tdSolutionTopP1").innerHTML != 0) {
        document.getElementById("tdSumTotalP1").innerHTML = +document.getElementById("tdSolutionBottomP1").innerHTML + +document.getElementById("tdSolutionTopP1").innerHTML;        
    }
    document.getElementById("tdSolutionBottomP2").innerHTML = +document.getElementById("tdthreeOfaKindP2").innerHTML + +document.getElementById("tdfourOfaKindP2").innerHTML + +document.getElementById("tdfullHouseP2").innerHTML + +document.getElementById("tdSmallStraightP2").innerHTML + +document.getElementById("tdbigStraightP2").innerHTML + +document.getElementById("tdkniffelP2").innerHTML + +document.getElementById("tdChanceP2").innerHTML;
    document.getElementById("tdSumTopP2").innerHTML = +document.getElementById("td1erP2").innerHTML + +document.getElementById("td2erP2").innerHTML + +document.getElementById("td3erP2").innerHTML + +document.getElementById("td4erP2").innerHTML + +document.getElementById("td5erP2").innerHTML + +document.getElementById("td6erP2").innerHTML;
    if (document.getElementById("td1erP2").innerHTML != 0 && document.getElementById("td2erP2").innerHTML != 0 && document.getElementById("td3erP2").innerHTML != 0 && document.getElementById("td4erP2").innerHTML != 0 && document.getElementById("td5erP2").innerHTML != 0 && document.getElementById("td6erP2").innerHTML != 0) {
        var sum = +document.getElementById("td1erP2").innerHTML + +document.getElementById("td2erP2").innerHTML + +document.getElementById("td3erP2").innerHTML + +document.getElementById("td4erP2").innerHTML + +document.getElementById("td5erP2").innerHTML + +document.getElementById("td6erP2").innerHTML;
        if ( sum >= 63 ) {
            var bonus = 35;
            var sumTop = +sum + +bonus;
            document.getElementById("tdBonusP2").innerHTML = 35;
            document.getElementById("tdTotalTopP2").innerHTML = sumTop;
            document.getElementById("tdSolutionTopP2").innerHTML = sumTop;
        } else {
            document.getElementById("tdTotalTopP2").innerHTML = sum;
            document.getElementById("tdSolutionTopP2").innerHTML = sum;
        }
    }
    if (document.getElementById("tdSolutionBottomP2").innerHTML != 0 && document.getElementById("tdSolutionTopP2").innerHTML != 0) {
        document.getElementById("tdSumTotalP2").innerHTML = +document.getElementById("tdSolutionBottomP2").innerHTML + +document.getElementById("tdSolutionTopP2").innerHTML;        
    }

    if (document.getElementById("tdSumTotalP1").innerHTML != 0 && document.getElementById("tdSumTotalP2").innerHTML != 0) {
        if (document.getElementById("tdSumTotalP1").innerHTML < document.getElementById("tdSumTotalP2").innerHTML){
            window.alert("Spieler 2 hat gewonnen!");
        } else if(document.getElementById("tdSumTotalP1").innerHTML > document.getElementById("tdSumTotalP2").innerHTML) {
            window.alert("Spieler 1 hat gewonnen!");
        } else {window.alert("Unentschieden");}
    }
}

function checkBoxes() {
    var checkBox1 = document.getElementById("check1");
    var checkBox2 = document.getElementById("check2");
    var checkBox3 = document.getElementById("check3");
    var checkBox4 = document.getElementById("check4");
    var checkBox5 = document.getElementById("check5");

    if (checkBox1.checked == true) {
        check1 = true;
    } else {check1 = false;}
    
    if (checkBox2.checked == true) {
        check2 = true;
    } else {check2 = false;}
    
    if (checkBox3.checked == true) {
        check3 = true;
    } else {check3 = false;}
    
    if (checkBox4.checked == true) {
        check4 = true;
    } else {check4 = false;}
    
    if (checkBox5.checked == true) {
        check5 = true;
    } else {check5 = false;}
    return check1, check2, check3, check4, check5;    
}

function bottomCheck(){
    var status = document.getElementById("status");
    if (/(.)\1{4}/.test(arr)) {// by nnnnnn
        status.innerHTML += " Du hast einen Kniffel! ";
        kniffel = true;
    } else if (/(.)\1{3}/.test(arr)) {
        status.innerHTML += " Du hast einen 4er! ";
        fourOfaKind = true;
    } else if (/(.)\1{2}(.)\2|(.)\3(.)\4{2}/.test(arr)) {
        status.innerHTML += " Du hast ein Full House! ";
        fullHouse = true;
    } else if (/(.)\1{2}/.test(arr)) {
        status.innerHTML += " Du hast einen 3er! ";
        threeOfaKind = true;
    } else if (/12345|23456/.test( arr.replace(/(.)\1/,"$1") ) ) {
        status.innerHTML += " Du hast eine große Straße! ";
        bigStraight = true;
    } else if (/1234|2345|3456/.test( arr.replace(/(.)\1/,"$1") ) ) {
        status.innerHTML += " Du hast eine kleine Straße! ";
        smallStraight = true;
    }
}

function scoringBottom() {
    var smallStraightP = document.getElementById("tdSmallStraight"+activePlayer).innerHTML;
    var bigStraightP = document.getElementById("tdbigStraight"+activePlayer).innerHTML;
    var threeOfaKindP = document.getElementById("tdthreeOfaKind"+activePlayer).innerHTML;
    var fourOfaKindP = document.getElementById("tdfourOfaKind"+activePlayer).innerHTML;
    var kniffelP = document.getElementById("tdkniffel"+activePlayer).innerHTML;
    var fullHouseP = document.getElementById("tdfullHouse"+activePlayer).innerHTML;

    var info = document.getElementById("info");

    logsolution = false;

    if (smallStraight == true) {
        if (smallStraightP !=30 ) {
            logsolution = confirm("Wollen Sie die kleine Straße eintragen?")
            if (logsolution == true) {
                document.getElementById("tdSmallStraight"+activePlayer).innerHTML ="30";
                smallStraight = false;
                turn = 0;
                clearHold()
                clearCheckTop()
                nextPlayer()
            } return logsolution;
        } else {info.innerHTML = "Du hast die kleine Straße schon eingetragen ";}
    }
    if (bigStraight == true) {
        if (bigStraightP !=40 ) {
            logsolution = confirm("Wollen Sie die große Straße eintragen?")
            if (logsolution == true) {
                document.getElementById("tdbigStraight"+activePlayer).innerHTML ="40";
                bigStraight = false;
                turn = 0;
                clearHold()
                clearCheckTop()
                nextPlayer()
            } return logsolution;
        } else {info.innerHTML = "Du hast die große Straße schon eingetragen ";}
    }
    if (threeOfaKind == true) {
        if (threeOfaKindP == 0 ) {
            logsolution = confirm("Wollen Sie den Dreierpasch eintragen?")
            if (logsolution == true) {
                document.getElementById("tdthreeOfaKind"+activePlayer).innerHTML = diceTotal;
                threeOfaKind = false;
                turn = 0;
                clearHold()
                clearCheckTop()
                nextPlayer()
            } return logsolution;
        } else {info.innerHTML = "Du hast den Dreierpasch schon eingetragen ";}
    }
    if (fourOfaKind == true) {
        if (fourOfaKindP == 0 ) {
            logsolution = confirm("Wollen Sie den Viererpasch eintragen?")
            if (logsolution == true) {
                document.getElementById("tdfourOfaKind"+activePlayer).innerHTML = diceTotal;
                fourOfaKind = false;
                threeOfaKind == false;
                turn = 0;
                clearHold()
                clearCheckTop()
                nextPlayer()
            } return logsolution;
        } else {info.innerHTML = "Du hast den Viererpasch schon eingetragen ";}
    }
    if (kniffel == true) {
        if (kniffelP !=50 ) {
            logsolution = confirm("Wollen Sie den kniffel eintragen?")
            if (logsolution == true) {
                document.getElementById("tdkniffel"+activePlayer).innerHTML ="50";
                kniffel = false;
                fourOfaKind = false;
                turn = 0;
                clearHold()
                clearCheckTop()
                nextPlayer()
            } return logsolution;  
        } else {info.innerHTML = "Du hast den Kniffel schon eingetragen ";}
    }
    if (fullHouse == true) {
        if (fullHouseP !=25 ) {
            logsolution = confirm("Wollen Sie das Full House eintragen?")
            if (logsolution == true) {
                document.getElementById("tdfullHouse"+activePlayer).innerHTML ="25";
                fullHouse = false;
                turn = 0;
                clearHold()
                clearCheckTop()
                nextPlayer()
            } return logsolution; 
        } else {info.innerHTML = "Du hast das Full House schon eingetragen ";}
    }
}

function checkScoringTop() {
    var checkBoxOnes = document.getElementById("checkOnes");
    var checkBoxTwos = document.getElementById("checkTwos");
    var checkBoxThrees = document.getElementById("checkThrees");
    var checkBoxFours = document.getElementById("checkFours");
    var checkBoxFives = document.getElementById("checkFives");
    var checkBoxSixes = document.getElementById("checkSixes");

    if (checkBoxOnes.checked == true) {
        checkOnes = true;
    } else {checkOnes = false;}
    
    if (checkBoxTwos.checked == true) {
        checkTwos = true;
    } else {checkTwos = false;}

    if (checkBoxThrees.checked == true) {
        checkThrees = true;
    } else {checkThrees = false;}

    if (checkBoxFours.checked == true) {
        checkFours = true;
    } else {checkFours = false;}

    if (checkBoxFives.checked == true) {
        checkFives = true;
    } else {checkFives = false;}

    if (checkBoxSixes.checked == true) {
        checkSixes = true;
    } else {checkSixes = false;}
    
    return checkOnes, checkTwos, checkThrees, checkFours, checkFives, checkSixes;    
}

function scoringTop() {
    var status = document.getElementById("status");
    var topscore = 0;
    // check 1
    if (checkOnes == true && document.getElementById("td1er"+activePlayer).innerHTML == 0) {
        for (i = 0; i < arr.length; i++) {
            if ( arr[i] == 1) {
                topscore += 1;
            }
        }
        document.getElementById("td1er"+activePlayer).innerHTML = topscore;
        turn = 0;
        clearHold()
        clearCheckTop()
        nextPlayer()
    }else if ( checkOnes == true && document.getElementById("td1er"+activePlayer).innerHTML != 0) {
        info.innerHTML = "Du hast die 1er schon eingetragen ";
    }else if ( checkOnes == true) {info.innerHTML = "Du hast die 1er schon eingetragen ";}
    // check 2
    if (checkTwos == true && document.getElementById("td2er"+activePlayer).innerHTML == 0) {
        for (i = 0; i < arr.length; i++) {
            if ( arr[i] == 2) {
                topscore += 2;
            }
        }
        document.getElementById("td2er"+activePlayer).innerHTML = topscore;
        turn = 0;
        clearHold()
        clearCheckTop()
        nextPlayer()
    }else if ( checkTwos == true && document.getElementById("td2er"+activePlayer).innerHTML != 0) {
        info.innerHTML = "Du hast die 2er schon eingetragen ";
    }else if ( checkTwos == true) {info.innerHTML = "Du hast die 2er schon eingetragen ";}
    // check 3
    if (checkThrees == true && document.getElementById("td3er"+activePlayer).innerHTML == 0) {
        for (i = 0; i < arr.length; i++) {
            if ( arr[i] == 3) {
                topscore += 3;
            }
        }
        document.getElementById("td3er"+activePlayer).innerHTML = topscore;
        turn = 0;
        clearHold()
        clearCheckTop()
        nextPlayer()
    }else if ( checkThrees == true && document.getElementById("td3er"+activePlayer).innerHTML != 0) {
        info.innerHTML = "Du hast die 3er schon eingetragen ";
    }else if ( checkThrees == true) {info.innerHTML = "Du hast die 3er schon eingetragen ";}
    // check 4
    if (checkFours == true && document.getElementById("td4er"+activePlayer).innerHTML == 0) {
        for (i = 0; i < arr.length; i++) {
            if ( arr[i] == 4) {
                topscore += 4;
            }
        }
        document.getElementById("td4er"+activePlayer).innerHTML = topscore;
        turn = 0;
        clearHold()
        clearCheckTop()
        nextPlayer()
    }else if ( checkFours == true && document.getElementById("td4er"+activePlayer).innerHTML != 0) {
        info.innerHTML = "Du hast die 4er schon eingetragen ";
    }else if ( checkFours == true) {info.innerHTML = "Du hast die 4er schon eingetragen ";}
    // check 5
    if (checkFives == true && document.getElementById("td5er"+activePlayer).innerHTML == 0) {
        for (i = 0; i < arr.length; i++) {
            if ( arr[i] == 5) {
                topscore += 5;
            }
        }
        document.getElementById("td5er"+activePlayer).innerHTML = topscore;
        turn = 0;
        clearHold()
        clearCheckTop()
        nextPlayer()
    }else if ( checkFives == true && document.getElementById("td5er"+activePlayer).innerHTML != 0) {
        info.innerHTML = "Du hast die 5er schon eingetragen ";
    }else if ( checkFives == true) {info.innerHTML = "Du hast die 5er schon eingetragen ";}
    // check 6
    if (checkSixes == true && document.getElementById("td6er"+activePlayer).innerHTML == 0) {
        for (i = 0; i < arr.length; i++) {
            if ( arr[i] == 6) {
                topscore += 6;
            }
        }
        document.getElementById("td6er"+activePlayer).innerHTML = topscore;
        turn = 0;
        clearHold()
        clearCheckTop()
        nextPlayer()
    }else if ( checkSixes == true && document.getElementById("td6er"+activePlayer).innerHTML != 0) {
        info.innerHTML = "Du hast die 6er schon eingetragen ";
    }else if ( checkSixes == true) {info.innerHTML = "Du hast die 6er schon eingetragen ";}
    // check logsolution
    else if ( logsolution == false && chance == false && checkOnes == false && checkTwos == false ) { status.innerHTML += " Du hast keine Angaben zur Auswertung gemacht!" }
    
}

function checkChance() {
    var checkBoxChance = document.getElementById("checkChance");
    var status = document.getElementById("status");
    if ( checkBoxChance.checked == true && document.getElementById("tdChance"+activePlayer).innerHTML == 0 ) {
        chance = true;
        status.innerHTML = "Du hast "+diceTotal+" bei Chance aufgeschrieben!"
    } else if ( checkBoxChance.checked == true && document.getElementById("tdChance"+activePlayer).innerHTML != 0 ) {
        chance = true;
    }else {chance = false;}

    return chance;
}
function clearCheckTop() {
    document.getElementById("checkChance").checked = false;
    document.getElementById("checkOnes").checked = false;
    document.getElementById("checkTwos").checked = false;
    document.getElementById("checkThrees").checked = false;
    document.getElementById("checkFours").checked = false;
    document.getElementById("checkFives").checked = false;
    document.getElementById("checkSixes").checked = false;
}
function clearHold() {
    document.getElementById("check1").checked = false;
    document.getElementById("check2").checked = false;
    document.getElementById("check3").checked = false;
    document.getElementById("check4").checked = false;
    document.getElementById("check5").checked = false;
}
function nextPlayer() {
    if (activePlayer = "P1"){
        activePlayer = "P2";
    }else if (activePlayer = "P2"){
        activePlayer = "P1";
    }
}