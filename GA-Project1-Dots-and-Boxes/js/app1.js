
// elements 
const rows = document.getElementById("rows-number");
const cols = document.getElementById("cols-number");

const buildCustomBtn = document.getElementById('custom');

const playerName = document.getElementById('P1Name');
const player2Name = document.getElementById('P2Name');

const p1box = document.getElementById("P1colorMenu");
const p2box = document.getElementById("P2colorMenu");

const startGameBtn = document.getElementById('startGame');
const stopGameBtn = document.getElementById('stop');


const players =[]

let turn=true
let currentBoardSize="5x5"
let currentGameOption="PxC"
const gridOptionsBtns = document.querySelectorAll('.Grid')
const gameOptionsBtns = document.querySelectorAll('.Game')
let letter= "A"
let you=0
let comp=0
let playerletter;
let player2letter;
let anotherRound=false;
let StartNewGame=false;
let sizeOptionClicked=false;
let gameOptionClicked=false;
let player1 =0
let comp2=0




// buildCustomBtn.addEventListener('click',(event)=>{
//     //buildCustomBtn.disabled=true;
//     const rows = document.getElementById("rows-number").value;
//     const cols = document.getElementById("cols-number").value;
//     const p1box = document.getElementById("P1colorMenu").value;
//     const p2box = document.getElementById("P2colorMenu").value;
//     const playerName = document.getElementById('P1Name').value; 
//     const player2Name = document.getElementById('P2Name').value;
//     players[0]=playerName
//     players[1]=player2Name
//     setBoard(cols,rows,p1box);
//     applyEvents();
// });


gridOptionsBtns.forEach(btn => {

    btn.addEventListener('click', (event) => {
        
        
        
        if (event.target.id ==='size2') {
            currentBoardSize = "10x10"
            rows.value="10";
            cols.value="10";
            sizeOptionClicked=true;
            setBoard(10,10,p1box.value);
            console.log(event);
        }
        else if (event.target.id === 'size3') {
            console.log('btn 15x15 ')
            
            rows.value="15";
            cols.value="15";
            sizeOptionClicked=true;
            setBoard(15,15,p1box.value);
            currentBoardSize = "15x15"
        } if (event.target.id === 'custom') {
            // players[0]=playerName.value
            // players[1]=player2Name.value
            sizeOptionClicked=true;
            setBoard(cols.value,rows.value,p1box.value); 
            

        }
        else if (event.target.id === 'size1') {
            
            rows.value="5";
            cols.value="5";
            sizeOptionClicked=true;
            setBoard(5, 5,p1box.value);
            currentBoardSize = "5x5"
        }
    });
});

gameOptionsBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (event.target.id === 'PxP') {
            isPlayer2Computer = false;
            gameOptionClicked=true

            $("#player").text(`${playerName.value} : 0 `);
            $("#player2").text(`${player2Name.value} : 0 `);
            $('.P2-data').show();
            $("#player3").hide();
            //console.log(playerletter,player2letter);
            currentGameOption = 'PxP'

        }
        else if (event.target.id === '2PxC' ) {
            isPlayer2Computer = false;
            
            gameOptionClicked=true

            $("#player").text(`${playerName.value} : 0 `);
            $("#player2").text(`${player2Name.value} : 0 `);
            $('.P2-data').show();
            $("#player3").text(` Computer : 0 `);
            $("#player3").show();
            //console.log(playerletter,player2letter);
            currentGameOption = '2PxC'

        }else if (event.target.id === 'Px2C' ) {
            isPlayer2Computer = true;
            
            gameOptionClicked=true

            $("#player").text(`${playerName.value} : 0 `);
            $("#player2").text(`Computer : 0 `);
            $('.P2-data').hide();
            $("#player3").text(` Computer2 : 0 `);
            $("#player3").show();
            //console.log(playerletter,player2letter);
            currentGameOption = 'Px2C'

        }
        else {
            isPlayer2Computer = false;
            gameOptionClicked=true

            $("#player").text(`${playerName.value} : 0 `);
            $("#player2").text(`Computer: 0 `);
            $('.P2-data').hide();
            $("#player3").hide();
            //console.log(playerletter,player2letter);
            currentGameOption = 'PxC'
        }
    })
});


startGameBtn.addEventListener('click',()=>{

    gameStarted=true;
    if (sizeOptionClicked==false){
        currentBoardSize="5x5"
        setBoard(5,5);

    }else {
        setBoard(cols.value,rows.value,p1box.value);
    }
    if(gameOptionClicked==false){
        currentGameOption='PxC'
    }
    // startGameBtn.setAttribute("disabled","")
    disableBtn();
    players.push(playerName.value)
    players.push(player2Name.value)
    console.log(currentGameOption,currentBoardSize)
    applyEvents();
})


stopGameBtn.addEventListener('click', ()=>{
    gameStarted=false;
    
    enableBtn();    
    if(anotherRound){
        console.log('Another Game:')
    }else {
        clearBoard();
    }     

    

})

function setBoard(cols,rows,p1box){
    boxes=[];
    let html = "";
    $("#board").html(html);
    let c=0
    let sx 
    
    let offset = 100;
    let i
    sx = sx = window.innerWidth / 2 - (rows * offset) / 2,
        sy = offset * 5 ;
        
    for (let dot=0; dot<rows;dot++){
        for (let col=0;col<cols;col++){
            let x = sx + dot * offset;
            y = sy + col * offset;
        html += `
        <div class="box" data-id="${c}" style="z-index=${dot - 1};left:${x+2.5}px ; top:${y+2.5}px; background-color:${p1box};"><h2 class="letter" style="text-align:center;z-index=${dot - 1};top:${-20}px;color:Black;"></h2></div>
        <div class="dot" style="z-index=${col}; left:${x - 5}px; top:${y - 5}px; background-color:${p1box};" data-box="${c}"></div>
        <div class="line lineh" data-line-1="${c}" data-line-2="${c - cols}" style="z-index=${col}; left:${x}px; top:${y}px; " data-active="false"></div>
        <div class="line linev" data-line-1="${c}" data-line-2="${c - 1}" style="z-index=${col}; left:${x}px; top:${y}px; " data-active="false"></div>`;
        boxes.push(0);
        c++;
        }
        
        for ( i = 0; i < cols; i++) {
            let x = sx + rows * offset,
                y = sy + i * offset;
            html += `				
                    <div class="dot" style="z-index=${i}; left:${x - 5}px; top:${y - 5}px; background-color:${p1box}" data-box="${c}"></div>
                    <div class="line linev" data-line-1="${cols * (i + 1) - 1}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px;" data-active="false"></div>
                    `;
        }
        if (cols == rows){
            for (i = 0; i < cols; i++) {
                let x = sx + i * offset,
                    y = sy + cols * offset;
                html += `				
                        <div class="dot" style="z-index=${i}; left:${x - 5}px; top:${y - 5}px; background-color:${p1box}" data-box="${c}"></div>
                        <div class="line lineh" data-line-1="${((cols - 1) * rows) + i}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px;" data-active="false"></div>
                        `;
            }    
        }else {
            for (i = 0; i < rows; i++) {
                let x = sx + i * offset,
                    y = sy + cols * offset;
                html += `				
                        <div class="dot" style="z-index=${i}; left:${x - 5}px; top:${y - 5}px; background-color:${p1box}" data-box="${c}"></div>
                        <div class="line lineh" data-line-1="${((cols - 1) * rows) - i}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px;" data-active="false"></div>
                        `;
            } 
        }
        // last dot bottom right 
        html += `<div class="dot" style="z-index=${i}; left:${sx + rows * offset - 5}px; top:${sy + cols * offset - 5}px;background-color:${p1box}" data-active="false"></div>`
    }
    $("#board").html(html); 
    
    console.log(rows, cols,letter,p1box,boxes);
}

function clearBoard() {
    board.innerHTML = "";
}


function applyEvents() {
    playerletter = getInitials(playerName.value)
    player2letter = getInitials(player2Name.value)

    // players.push(playerName)
    console.log(players);
    $('#Turn').text('Turn :' + players[0]);
    $("div.line").unbind('click').bind('click', function () {
        console.log(this)
        let id1 = parseInt($(this).attr("data-line-1"));
        let id2 = parseInt($(this).attr("data-line-2"));

        if (checkValid(this) && turn) {
            let a = false, b = false;

            if (id1 >= 0) {let a = addValue(id1)};
            if (id2 >= 0) {let b = addValue(id2)};
            $(this).addClass("line-active");
            $(this).attr("data-active", "true");
            
            if(a === false && b === false){
                switchPlayer('Computer');
                // if (currentGameOption ==='PxC')
                //     player = player === 'Computer'? playerName.value : 'Computer';
                //     $('#Turn').text('Turn :' + player)
                //     if(turn === 'Computer')
                //         computer()
                    
                // else if (currentGameOption ==='PxP'){
                //     player = player === player2Name.value ? playerName.value : player2Name.value;
                //     $('#Turn').text('Turn :' + player)
                //     PlayerSelect()
                // }else if (currentGameOption ==='2PxC'){

                //     player = player === player2Name.value ? 'Computer' : (player === 'Computer' ? playerName.value : player2Name.value);
                //     $('#Turn').text('Turn :' + player)
                
                // }else if (currentGameOption ==='Px2C'){
                    
                //     player = player === 'Computer' ?  playerName.value : 'Computer';
                //     $('#Turn').text('Turn :' + player)
                //     if (player ==='Computer'){
                //         isComp2Playing=true
                //         computer()
                        
                //     }
                //     else
                //         console.log('player',player)
                    
                // }
            }
        }
    });

    
}


function switchPlayer(){
    if (currentGameOption ==='PxC'){
        player = player === 'Computer'? playerName.value : 'Computer';
        $('#Turn').text('Turn :' + player)
        if(turn === 'Computer')
            computer()
        else
            PlayerSelect()
    }   
    else if (currentGameOption ==='PxP'){
        player = player === player2Name.value ? playerName.value : player2Name.value;
        $('#Turn').text('Turn :' + player)
        PlayerSelect(player)
    }else if (currentGameOption ==='2PxC'){

        player = player === player2Name.value ? 'Computer' : (player === 'Computer' ? playerName.value : player2Name.value);
        $('#Turn').text('Turn :' + player)
    
    }else if (currentGameOption ==='Px2C'){
        
        player = player === 'Computer' ?  playerName.value : 'Computer';
        $('#Turn').text('Turn :' + player)
        if (player ==='Computer'){
            isComp2Playing=true
            computer()
            
        }
        else
            console.log('player',player)
        
    }
}

function computer() {

    turn = false;

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

function computerSelect(id) {
	console.log("Box " + id);

	$("div.line[data-line-1='"+id+"'], div.line[data-line-2='"+id+"']").each(function(i, v){		
		if(!$(v).hasClass("line-active")){
			let id1 = parseInt($(v).attr("data-line-1"));
			let id2 = parseInt($(v).attr("data-line-2"));  

			console.log("----- " + turn);
            let a = false, b = false;
			if(checkValid(v) && turn === false){
				console.log("-----");
				if(id1 >= 0)  a = addValue(id1);
				if(id2 >= 0)  b = addValue(id2);
				$(v).addClass("line-active");
				$(v).attr("data-active", "true");

				if(a === true || b === true){
					computer();	
				}else{
					turn = true;
					// $("#turn").text("Turn : " + "You");
				}					
			}
		}
	});
}

function PlayerSelect(){
    console.log()
    

    $("div.line[data-line-1='" + id + "'], div.line[data-line-2='" + id + "']").each(function (i, v) {
        if (!$(v).hasClass("line-active")) {
            let id1 = parseInt($(v).attr("data-line-1"));
            let id2 = parseInt($(v).attr("data-line-2"));

            console.log("----- " + turn);
            console.log('Valid',checkValid(v))
            if (checkValid(v) && turn === false) {
                console.log("-----");
                let a = false, b = false;
                if (id1 >= 0) { a= addValue(id1)};
                if (id2 >= 0) { b = addValue(id2)};

                $(v).addClass("line-active");
                $(v).attr("data-active", "true");
                console.log('Player Select', id)
                if(a === true || b === true){
					turn = false;
				}	
            
                                    
            }
        }
    });

}


function checkValid(t) {
    return ($(t).attr("data-active") === "false");
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
        rows.disabled=true;
        cols.disabled=true;
        $('.players').hide();
        $('#board').show();
        
    }

    

}

function enableBtn(){
    startGameBtn.disabled=false;
    gameOptionsBtns.forEach(el => el.disabled=false);
    gridOptionsBtns.forEach(el => el.disabled=false);
    rows.disabled=false;
    cols.disabled=false;
    stopGameBtn.disable=true;
    $('.players').show();
}


function acquire(id) {

    letter =""
    if(currentGameOption==="PxC"){

    
    if (turn && letter !== 'C') {
        color = `${p1box}`;
        letter = `${playerletter}`
        console.log(letter)
        you++;
    }
    else {
        letter = 'C'
        comp++;
    }
    }
    if(currentGameOption==="PxP"){

    
    if (turn && letter !== getInitials(playerName.value)) {
        you++;        
    }
    else {
        letter = getInitials(player2Name.value)
        player1++;
    }
    }
    // Update the letter inside the box
    $("div.box[data-id='" + id + "'] h2.letter").text(letter);

    boxes[id] = "full";
    
    $("#player").text(` ${playerName.value} : ` + you);
    if (currentGameOption ==="PxC")
        $("#player2").text(`Computer : ` + comp);
    if (currentGameOption ==="PxP")
        $("#player2").text(`${player2Name.value} : ` + player1);
    else if (currentGameOption ==="2PxC")    
        $("#player3").text(`Computer : ` + comp);
        $("#player2").text(`${player2Name.value} : ` + player1);

    let full = true;
    for (let i = boxes.length-1 ;i >= 0; i--) {
        if (boxes[i] != full) {
            full = false;
            break;
        }
    }

    if (full && currentGameOption==="PxC") alert(((you > comp) ? "You" : "Computer") + " won");
    if (full && currentGameOption==="PxP") console.log(((you > player1) ? playerName.value : player2Name.value) + " won!");
}

 


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addValue(id) {
    boxes[id]++;

    if (boxes[id] === 4) {
        acquire(id);
        return true;
    }
    return false;
}