let boxes = [];
let turn = true;
let you = 0;
let comp = 0;
let comp2 = 0;
let player = 0;
let isPlayer2Computer = true
let isPlayer3 = false;
let isPlayer3Computer = true;
let playerletter = ''
let player2letter = ''
let currentGameOption =""
let currentBoardSize = ""
let p1box = ''
let p2box = ''
// let compbox = ''
// let comp2box = ''
let isComp2Playing = false
let gameStarted=false

let turnOrder=[]
/**
 * =====================================  elements =========================================*
 */

const rowInput = document.getElementById('rows-number');
const colInput = document.getElementById('cols-number');
const startGameBtn = document.getElementById('startGame');
const stopGameBtn = document.getElementById('stop');
// const btns = document.getElementsByClassName('.Grid')

/**
 * ======================================== Game option buttons  EL      ======================================*
 */
const gridOptionsBtns = document.querySelectorAll('.Grid')
const gameOptionsBtns = document.querySelectorAll('.Game')


/**
 * ======================================== Player Data El       ======================================*
 */
const playerName = document.getElementById('P1Name');
const player2Name = document.getElementById('P2Name');
const p1boxColor = document.getElementById('P1colorMenu');
const p2boxColor = document.getElementById('P2colorMenu');
// const Player3lbl=document.getElementById('P3Name');




/**
 * ======================================== Game option Event Listeners      ======================================*
 */

startGameBtn.addEventListener(('click'), (event) => {
    gameStarted=true;
    
    // startGameBtn.setAttribute("disabled","")
    disableBtn();
    
    console.log('Started',gameStarted)
    let pname = playerName.value;
    let p2name = player2Name.value;
    let p1box = p1boxColor.value
        

    
    player2letter = (getInitials(p2name));
    playerletter = (getInitials(pname));
    // console.log(playerletter, player2letter);
    $("#player1").text(`${pname} :` + you);
    if (currentGameOption == '' && currentBoardSize == '') {
        
        $("#player2").text(`Computer :` + comp);
        currentBoardSize='5x5'
        currentGameOption='PxC'
        console.log(you, comp, playerletter, currentGameOption, currentBoardSize, p1box);
        
    } else if (currentGameOption = '' || currentBoardSize == '') {

        if (currentGameOption != '') {
            currentBoardSize = '5x5'

        } else
            currentGameOption = 'PxC'
        //setBoard(5,5);
        
     
    }else {

        if (currentGameOption === 'PxC') {
            $('.P2-data').hide();
            $('#player3').hide();
            $("#player1").text(`${pname} :` + you);
            currentBoardSize
            p1box = p1boxColor.value
            console.log(you, comp, playerletter, currentGameOption, currentBoardSize, p1box);
            turnOrder=[`${pname}`,'Computer']
            
        } else if (currentGameOption === 'PxP') {
            $("#player1").text(`${pname} :` + you);    
            $("#player2").text(` ${p2name} :` + player);
            turnOrder=[`${pname}`,`${p2name}`] 
            console.log(you, playerletter, currentGameOption, currentBoardSize, p1box);
            console.log(player, player2letter, currentGameOption, currentBoardSize, p2box);
            
        }
         else if (currentGameOption === '2PxC') {
            turnOrder=[`${pname}`,`${p2name}`,'Computer']
            $("#player1").text(`${pname} :` + you);
            $("#player2").show();
            $("#player2").text(` ${p2name} :` + player);
            $("#player3").text(` Computer :` + comp);
            console.log(you, playerletter, currentGameOption, currentBoardSize, p1box);
            console.log(player, player2letter, currentGameOption, currentBoardSize, p2box);
            
         } 
         else {
            isComp2Playing=true;
            turnOrder=[`${pname}`,'Computer','Computer2']
            $('.P2-data').hide();
            $('#player1').text( `${pname} :` + you)
            $("#player2").text(` Computer :` + comp);
            
            $("#player3").text(` Computer 2 :` + comp2);
            p1box = p1boxColor.value
            

        }


       


    }
    applyEvents();
});


stopGameBtn.addEventListener('click', ()=>{
    gameStarted=false;
    
        //const btns = document.querySelectorAll('.Grid');
    startGameBtn.disabled=false;
    gameOptionsBtns.forEach(el => el.disabled=false);
    gridOptionsBtns.forEach(el => el.disabled=false);
    
    stopGameBtn.disabled=true;
        
        

    

})




gameOptionsBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (event.target.id === 'PxP') {
            isPlayer2Computer = false;

            // $("#player2").text("");
            $("#player2").text(`${player2Name} : 0 `);
            $('.P2-data').show();
            $("#player3").hide();
            //console.log(playerletter,player2letter);
            currentGameOption = 'PxP'

        }
        else if (event.target.id === 'PxC') {
            isPlayer2Computer = true;

            // $("#player2").text("");
            $("#player2").text("Computer: 0 ");
            $("#player3").hide()
            $('.P2-data').hide();
            
            //console.log(playerletter,player2letter);
            currentGameOption = 'PxC'

        }
        else if (event.target.id === '2PxC') {
            isPlayer2Computer = true;
            isPlayer3Computer = false;
            $('.P2-data').show()
            $("#player2").text("Player : 0 ");
            $("#player3").text("Computer : 0 ");


        }
        else if (event.target.id === 'Px2C') {
            isPlayer2Computer = true;
            isPlayer3Computer = true;
            $('.P2-data').hide()
            $("#player2").text("Computer : 0 ");
            $("#player3").text("Computer 2: 0 ");

        }
    })
});

gridOptionsBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (event.target.id ==='size2') {
            currentBoardSize = "10x10"
            
            setBoard(10,10);
            console.log(event);
        }
        else if (event.target.id === 'size3') {
            console.log('btn 15x15 ')
            clearBoard()
            setBoard(15,15);
            currentBoardSize = "15x15"
        } if (event.target.id === 'custom') {
            // to be edited to get values from dropdown
            let r = rowInput
            clearBoard();
            console.log(rowInput.value, colInput.value)
            setBoard(rowInput.value, colInput.value);
            currentBoardSize = `${rowInput}x${colInput}`

        }
        else if (event.target.id === 'size1') {
            clearBoard()
            setBoard(5, 5);

            currentBoardSize = "5x5"
        }
    });
});


// ============================================= Event Listener =====================//

// p1boxColor.addEventListener('change', (event) => {
//     // const color = document.getElementById('P1colorMenu').value;
//     const color = event.target.value;
//     event.target.style.color = color;
    
//     console.log(p1box)
// }, false);

// p2boxColor.addEventListener('change', (event) => {
//     const color = event.target.value;
//     event.target.style.color = color;
//     p2box = color;
//     const  lines=document.querySelectorAll('.line');
//     lines.forEach((l)=>{
//         l.style.color=p2box;
//     })
//     console.log(p2box)
// }, false);


function setBoard(rowNum, colNum) {
    boxes = [];
    turn = true;
    you = 0;
    comp = 0;
    comp2 = 0
    let dotsNum = rowNum;
    let colsNum = colNum;
    let offset = 50;
    let letter = ""
    let sx 
    sx = sx = window.innerWidth / 2 - (dotsNum * offset) / 2,
        sy = offset * 10;
    let html = "";
    $("#board").html(html);
    
   
    let c = 0;
    let i;

    for (let j = 0; j < dotsNum; j++) {
        for ( i = 0; i < colsNum; i++) {

            let x = sx + i * offset,
                y = sy + j * offset;

            html += `
				<div class="box" data-id="${c}" style="z-index=${i - 1}; left:${x + 2.5}px; top:${y + 2.5}px"><h2 class="letter" style="text-align:center;z-index=${i - 1}; top:${-20}px;"></h2></div>
				<div class="dot" style="z-index=${i}; left:${x - 5}px; top:${y - 5}px" data-box="${c}"></div>						
				<div class="line lineh" data-line-1="${c}" data-line-2="${c - colsNum}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				<div class="line linev" data-line-1="${c}" data-line-2="${c - 1}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				`;
            boxes.push(0);
            c++;
        }
    }
    i=0
    //right boxes
    for (let i = 0; i < colsNum; i++) {
        let x = sx + dotsNum * offset,
            y = sy + i * offset;
        html += `				
				<div class="dot" style="z-index=${i}; left:${x - 5}px; top:${y - 5}px" data-box="${c}"></div>
				<div class="line linev" data-line-1="${colsNum * (i + 1) - 1}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				`;
    }
    
    //bottom boxes
    for (let i = 0; i < colsNum; i++) {
        let x = sx + i * offset,
            y = sy + colsNum * offset;
        html += `				
				<div class="dot" style="z-index=${i}; left:${x - 5}px; top:${y - 5}px" data-box="${c}"></div>
				<div class="line lineh" data-line-1="${((colsNum - 1) * dotsNum) + i}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				`;
    }

    //right-bottom most dot

    html += `<div class="dot" style="z-index=${i}; left:${sx + dotsNum * offset - 5}px; top:${sy + colsNum * offset - 5}px" data-active="false"></div>`

    //append to dom
    $("#board").html(html);

}

function load() {

    setBoard(5, 5);
   // applyEvents();


}

function applyEvents() {

    $("div.line").unbind('click').bind('click', function () {

        let id1 = parseInt($(this).attr("data-line-1"));
        let id2 = parseInt($(this).attr("data-line-2"));

        if (checkValid(this) && turn) {
            let a = false, b = false;

            if (id1 >= 0) {let a = addValue(id1)};
            if (id2 >= 0) {let b = addValue(id2)};
            $(this).addClass("line-active");
            $(this).attr("data-active", "true");
            // if (a === false && b === false) {
            //     if (currentGameOption=='PxP'){
            //         console.log('PxP');
            //     }else if (currentGameOption=='Px2C'){
            //         computer()
            //         computer()
            //     }	

            // }
            if(a === false && b === false){
				
				if(isComp2Playing==true){
					computer('Computer1');	
					computer('Computer2');
				}else{
					computer('Computer');	
				}
			}		
        }
    });
}

function switchPlay(){

    console.log('switch player !!')
}

function acquire(id) {
  
    let letter ;
    color =p1box
    if (turn ) {

        // color = `${p1box}`;
        letter = `${playerletter}`
        you++;
        }
    else if( turn==false && isPlayer2Computer){
        letter = `C2`
        comp2++;

    }else if (turn && isPlayer2Computer==false){
        letter = `${player2letter}`
    }
    else {
        letter = 'C'
        comp++;
    }


    // Update the letter inside the box
    $("div.box[data-id='" + id + "'] h2.letter").text(letter);

    boxes[id] = "full";
    
    $("#player2").text(` ${player2Name} : ` + you);
    $("#player1").text(`${playerName} : ` + comp);

    let full = true;
    for (let i = boxes.length - 1; i >= 0; i--) {
        if (boxes[i] != full) {
            full = false;
            break;
        }
    }

    if (full) alert(((you > comp) ? "You" : "Computer") + " won");
}


function addValue(id, turn) {
    boxes[id]++;

    if (boxes[id] === 4) {
        acquire(id);
        return true;
    }
    return false;
}


function checkValid(t) {
    return ($(t).attr("data-active") === "false");
}
// function getCurrentPlayer() {
//     let currentPlayer = $('#turn').text

//     console.log(currentPlayer);
// }
function computer(comp) {

    turn = false;
    $("#Turn").text("Turn : " + comp);

    setTimeout(function () {

        //play
        let length = boxes.length;

        let arr3 = [], arr2 = [], arr1 = [], arr0 = [];

        for (let i = length - 1; i >= 0; i--) {
            if (boxes[i] === 3) arr3.push(i);
            else if (boxes[i] === 2) arr2.push(i);
            else if (boxes[i] === 1) arr1.push(i);
            else arr0.push(i);
        }

        //best case
        if (arr3.length > 0) {
            computerSelect(arr3[random(0, arr3.length - 1)]);
        }

        //better case
        else if (arr1.length > 0) {
            computerSelect(arr1[random(0, arr1.length - 1)]);
        }

        //normal case
        else if (arr0.length > 0) {
            computerSelect(arr0[random(0, arr0.length - 1)]);
        }

        //worst case
        else if (arr2.length > 0) {
            computerSelect(arr2[random(0, arr2.length - 1)]);
        }

    }, 500);

}



// function selectBox(id) {
    
//     console.log('box' + id)
//     $("div.line[data-line-1='" + id + "'], div.line[data-line-2='" + id + "']").each(function (i, v) {
//         if (!$(v).hasClass("line-active")){

//             let id1 = parseInt($(v).attr("data-line-1"));
//             let id2 = parseInt($(v).attr("data-line-2"));
//             console.log(`${player}+ turn`);
//             if (checkValid(v) && turn === true) {
//                 let a = false, b = false;
//                 if (id1 >= 0) a = addValue(id1);
//                 if (id2 >= 0) b = addValue(id2);

//                 $(v).addClass("line-active");
//                 $(v).attr("data-active", "true");

//                 if (currentGameOption === '2PxC') {
//                     turn = true
                    
//                     if (a === true || b === true) {
//                         playerSelect(player);
//                         playerSelect(player2Name);
                        
//                     }
//                      else {
//                         turn = false;
//                         if (a === true || b === true && currentGameOption === 'PxP' ) {
                            
//                         } else {
//                             turn = false
//                             $("#turn").text("Turn : " + "You");
//                         }
//                     }

//                 } 
//             }
//         }
//     });


//     $("#turn").text("Turn : " + player2);

    


// }



function computerSelect(id) {
    console.log("Box " + id);

    $("div.line[data-line-1='" + id + "'], div.line[data-line-2='" + id + "']").each(function (i, v) {
        if (!$(v).hasClass("line-active")) {
            let id1 = parseInt($(v).attr("data-line-1"));
            let id2 = parseInt($(v).attr("data-line-2"));

            console.log("----- " + turn);

            if (checkValid(v) && turn === false) {
                console.log("-----");
                let a = false, b = false;
                if (id1 >= 0) { a= addValue(id1)};
                if (id2 >= 0) { b = addValue(id2)};

                $(v).addClass("line-active");
                $(v).attr("data-active", "true");

                if (currentGameOption === 'Px2C' || 'PxC') {
                    turn = false
                    if (currentGameOption === 'Px2C') {
                        if (a === true || b === true) {
                            computer('Computer1');
                            computer('Computer2');
                        }
                    } else {
                        turn = false;
                        if (a === true || b === true) {
                            computer('Computer');
                        } else {
                            turn = true;
                            $("#turn").text("Turn : " + "You");
                        }
                    }

                } else {
                    if (currentGameOption === 'PXP') {

                        if (a === true || a === true) {
                            turn = false;
                            $('#turn').text(`Turn :${player2Name}`);
                        } else {
                            turn = true;
                            $("#turn").text("Turn : " + "You");
                        }


                    } else {

                        if (a === true || a === true) {
                            turn = false;

                            $('#turn').text(player2Name);

                            computer('computer')
                        } else {
                            turn = true;
                            $("#turn").text("Turn : " + "You");
                        }

                    }


                }
            }
        }
    });
}

function clearBoard() {
    board.innerHTML = "";
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInitials(name) {

    return name.substring(0,1)


}


function disableBtn() {

    if(gameStarted==true){
        //const btns = document.querySelectorAll('.Grid');
        stopGameBtn.disabled=false
        gameOptionsBtns.forEach(el => el.disabled=true);
        gridOptionsBtns.forEach(el => el.disabled=true);
        startGameBtn.disabled=true;
        
    }
    

}

function enableBtn(){
    startGameBtn.disabled=false;
    gameOptionsBtns.forEach(el => el.disabled=false);
    gridOptionsBtns.forEach(el => el.disabled=false);
    stopGameBtn.disable=true;

}


load();
// loadPage();