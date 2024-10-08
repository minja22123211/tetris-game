
$(document).ready(function(){

    $("#level").text("Level: " + JSON.parse(localStorage.getItem("level")));

    let selectedBlocks = JSON.parse(localStorage.getItem("blocks"));

    var blocks = [
    
        [

            [
            
            [1,1,1,1]
            
            ],
            
            [
            
            [1],
            
            [1],
            
            [1],
            
            [1]
            
            ],
            
            [
            
            [1,1,1,1]
            
            ],
            
            [
            
            [1],
            
            [1],
            
            [1],
            
            [1]
            
            ]
            
            ],
            
            
            
            [
            
            [
            
            [1, 0, 0],
            
            [1, 1, 1]
            
            ],
            
            [
            
            [1, 1],
            
            [1, 0],
            
            [1, 0]
            
            ],
            
            [
            
            [1, 1, 1],
            
            [0, 0, 1]
            
            ],
            
            [
            
            [0, 1],
            
            [0, 1],
            
            [1, 1]
            
            ]
            
            ],
            
            
            
            [
            
            [
            
            [0, 0, 1],
            
            [1, 1, 1]
            
            ],
            
            [
            
            [1, 0],
            
            [1, 0],
            
            [1, 1]
            
            ],
            
            [
            
            [1, 1, 1],
            
            [1, 0, 0]
            
            ],
            
            [
            
            [1, 1],
            
            [0, 1],
            
            [0, 1]
            
            ]
            
            ],
            
            
            
            [
            
            [
            
            [1, 1],
            
            [1, 1]
            
            ],
            
            [
            
            [1, 1],
            
            [1, 1]
            
            ],
            
            [
            
            [1, 1],
            
            [1, 1]
            
            ],
            
            [
            
            [1, 1],
            
            [1, 1]
            
            ]
            
            ],
            
            
            
            [
            
            [
            
            [0, 1, 1],
            
            [1, 1, 0]
            
            ],
            
            [
            
            [1, 0],
            
            [1, 1],
            
            [0, 1]
            
            ],
            
            [
            
            [0, 1, 1],
            
            [1, 1, 0]
             
            ],
            
            [
            
            [1, 0],
            
            [1, 1],
            
            [0, 1]
            
            ],
            
            ],
            
            
            
            [
            
            [
            
            [0, 1, 0],
            
            [1, 1, 1]
            
            ],
            
            [
            
            [1, 0],
            
            [1, 1],
            
            [1, 0]
            
            ],
            
            [
            
            [1, 1, 1],
            
            [0, 1, 0]
            
            ],
            
            [
            
            [0, 1],
            
            [1, 1],
            
            [0, 1]
            
            ]
            
            ],
            
            
            
            [
            
            [
            
            [1, 1, 0],
            
            [0, 1, 1]
            
            ],
            
            [
            
            [0, 1],
            
            [1, 1],
            
            [1, 0]
            
            ],
            
            [
            
            [1, 1, 0],
            
            [0, 1, 1]
            
            ],
            
            [
            
            [0, 1],
            
            [1, 1],
            
            [1, 0]
            
            ]
            
            ]
        
        ];

    var blockColors = ["rgb(0, 240, 240)", "rgb(0, 0, 240)", "rgb(240, 160, 0)", "rgb(240, 240, 0)", "rgb(0, 240, 0)", "rgb(160, 0, 240)", "rgb(240, 0, 0)"];

    var currentBlock = {row: 0, column: 0, i: -1, j: 0, name: 0};

    let nameCounter = 1;

    let nextIndex = -1;

    let timeout = 1000;
    let level = JSON.parse(localStorage.getItem("level"));
    if(level == 'srednji')timeout = 800;
    else if(level == 'tezak')timeout = 600;
    console.log(timeout);



    let finished = false;

    let results = [];
    if(localStorage.getItem("results")!= null){
        results = JSON.parse(localStorage.getItem("results"));
    }
    else localStorage.setItem("results",JSON.stringify(results));

    var rotationFunctions = [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15,
     r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27];

    var score = 0;

    initializeGrid();
    setNewBlock();
    setTimeout(moveDownWrapper,timeout);
    $(document).keydown(function(event) {
        if (event.which == 37)
            moveLeft();
        else if (event.which == 39)
            moveRight();
        else if(event.which == 38)
            rotateBlock();
        else if(event.which == 40)
            moveDown(false);
        
    });
    

    function initializeGrid(){
        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 10; j++){
                let gridCell = $('<div></div>').addClass('grid-cell').attr('id', (i*10+j).toString()).attr('name', 'none');
                $('.grid').append((gridCell));
            }
        }
    }

    function setNewBlock(){

        currentBlock.i = nextIndex == -1?parseInt(selectedBlocks[Math.floor(Math.random() * selectedBlocks.length)]):nextIndex;
        currentBlock.j = 0;
        currentBlock.name = nameCounter++;
        
   
        var currBlockWidth = blocks[currentBlock.i][currentBlock.j][0].length;
        var middle = Math.floor((10 - currBlockWidth) / 2);
        currentBlock.row = 0;
        currentBlock.column = middle;

        var index = currentBlock.i;
        var rotation = currentBlock.j;

        if(!canMove(currentBlock.row, currentBlock.column, blocks[currentBlock.i][0],currentBlock.name)){
            return false;
        }


    
        for (let i = 0; i < (blocks[index][rotation]).length; i++) {
            for (let j = 0; j < (blocks[index][rotation][0]).length; j++) {
                if (blocks[index][rotation][i][j] === 1) {
                    let id = i * 10 + middle + j; 
                    $('#' + id).css('background-image', 'url(./tetris-dodatno/b'+(index+1).toString()+'.PNG)').attr("name", currentBlock.name.toString());
                }
            }
        }

        do{
            nextIndex= parseInt(selectedBlocks[Math.floor(Math.random() * selectedBlocks.length)]);
        }
        while(nextIndex == currentBlock.i)
        drawNext(nextIndex);

        return true;
        
    }

    function drawNext(index){

        let block = blocks[index][0];

        let nextBlockGrid = $('#next-block-grid');
        nextBlockGrid.empty();

        for (let i = 0; i < block.length; i++) {
            let row = $('<div class="next-row"></div>');
            for (let j = 0; j < block[0].length; j++) {

                let image= block[i][j]==1? 'url(./tetris-dodatno/b'+(index+1).toString()+'.PNG)': 'none';
                row.append($("<div></div>").addClass('next-cell').css('background-image', image));
            }
            nextBlockGrid.append(row);
        }

    }

    function moveDownWrapper(){
        moveDown(true);
    }

    function moveDown(set){

        if (canMove(currentBlock.row+1, currentBlock.column, blocks[currentBlock.i][currentBlock.j], currentBlock.name)) {
            updateGrid(blocks[currentBlock.i][currentBlock.j], currentBlock.name, currentBlock.i,
                currentBlock.row+1, currentBlock.column, blocks[currentBlock.i][currentBlock.j]);
            if(set == false){
                score += 1;
                $("#score label").text(score);
            }      
        }
        else {            
            updateScore();
            if(!setNewBlock()){
                finishGame();
                return;
            }
            console.log("timeout = " + timeout);
            if(timeout > 400)
                timeout-=10;
        }
        if(set)
            setTimeout(moveDownWrapper,timeout);
        

    }

    function canMove(rowStart,columnStart, block, blockName) {

        for (let i = 0; i < block.length; i++) {
            for (let j = 0; j < block[0].length; j++) {
                if (block[i][j] === 1) {
                    
                    let row = rowStart + i;
                    let column = columnStart + j;

    
                    let name = $('#' + (row * 10 + column)).attr("name");

                    if (row >= 20 || column >= 10 || column < 0 ||  !(name == 'none' || name == blockName.toString())) {

                        return false;
                    }
                }
            }
        }
        return true;
    }

    function updateGrid(block, blockName, index, newRowStart, newColumnStart, newBlock){


        for (let i = 0; i < block.length; i++) {
            for (let j = 0; j < block[0].length; j++) {
                if (block[i][j] === 1) {
                    let row = currentBlock.row + i;
                    let column = currentBlock.column + j;
                    $('#' + (row * 10 + column)).css('background-image', 'none').css('background-color', 'rgb(91, 89, 89)').attr('name', 'none');
                }
            }
        }

        currentBlock.row = newRowStart;
        currentBlock.column = newColumnStart;

        for (let i = 0; i < newBlock.length; i++) {
            for (let j = 0; j < newBlock[0].length; j++) {
                if (newBlock[i][j] === 1) {

                    let row = newRowStart + i;
                    let column = newColumnStart + j;

                    $('#' + (row * 10 + column)).css('background-image', 'url(./tetris-dodatno/b'+(index+1).toString()+'.PNG)').attr('name', blockName.toString());
                }
            }
        }
        

    }

    function updateScore(){

        let m = (blocks[currentBlock.i][currentBlock.j]).length;
        let lastRow = currentBlock.row + m - 1;
        

        for(let i = 0; i < m ; i++){

            let clear = true;

            for(let j = 0; j < 10; j++){
                let id = lastRow*10 + j;
                if($("#" + (id).toString()).attr('name') == 'none'){
                    clear = false;
                    break;
                }
            }

            if(clear){
                score += 100;
                $("#score label").text(score);

                let clearRow = lastRow - 1;
                while(clearRow >= 0){
                    for(let j = 0; j < 10; j++){
                        let id = (clearRow+1)*10 + j;
                        let name = $("#" + (id-10).toString()).attr('name');
                        let color = $("#" + (id-10).toString()).css('background-color');
                        let image = $("#" + (id-10).toString()).css('background-image');

                        $("#" + (id).toString()).attr('name', name).css('background-image', image).css('background-color', color);

                    }
                    clearRow--;
                }
                for(let j = 0; j < 10; j++){
                    let id = j;
                    $("#" + (id).toString()).attr('name', 'none').css('background-image', 'none').css('background-color', 'rgb(91, 89, 89)');
                }
            }
            else{
                lastRow--;
            }
            
        }
    }

    function moveRight(){
        if (canMove(currentBlock.row, currentBlock.column+1, blocks[currentBlock.i][currentBlock.j], currentBlock.name))
            updateGrid(blocks[currentBlock.i][currentBlock.j], currentBlock.name, currentBlock.i,
                currentBlock.row, currentBlock.column + 1, blocks[currentBlock.i][currentBlock.j]); 
        
    }

    function moveLeft(){
        if (canMove(currentBlock.row, currentBlock.column - 1, blocks[currentBlock.i][currentBlock.j], currentBlock.name))
            updateGrid(blocks[currentBlock.i][currentBlock.j], currentBlock.name, currentBlock.i,
                currentBlock.row, currentBlock.column - 1, blocks[currentBlock.i][currentBlock.j]);  
    }

    function rotateBlock(){
        
        let dimensions = rotationFunctions[currentBlock.i*4 + currentBlock.j]();
        
        let row = dimensions[0];
        let column = dimensions[1];

        let block = blocks[currentBlock.i][(currentBlock.j+1)%4];
        let blockName = currentBlock.name;

        if(canMove(row,column,block,blockName)){

            let oldBlockJ = currentBlock.j;
            currentBlock.j = (currentBlock.j+1)%4;

            updateGrid(blocks[currentBlock.i][oldBlockJ], currentBlock.name, currentBlock.i,
                row, column, blocks[currentBlock.i][currentBlock.j]
            );
        }
    }

    function finishGame(){
        if(finished)return;
        finished = true;
        let name = prompt("Vas rezultat je " + score + "!\n" + "Upisite ime: ");
        if(name == '' || name == null)
            name='Anonymous';
        let result = {"name": name, "score": score};

        results.push(result);

        localStorage.setItem("results",JSON.stringify(results));
        localStorage.setItem("lastResult", JSON.stringify(result));

        window.location.href = "tetris-rezultati.html";
    }


    function r0(){
        return [currentBlock.row - 1, currentBlock.column + 2];
    }

    function r1(){

        return [currentBlock.row + 2, currentBlock.column - 2];
    }
    

    function r2(){

        return [currentBlock.row - 2, currentBlock.column + 1];
    }

    function r3(){

        return [currentBlock.row + 1, currentBlock.column - 1];
    }

    function r4(){
        return [currentBlock.row + 0, currentBlock.column + 1];
    }

    function r5(){
        return [currentBlock.row + 1, currentBlock.column - 1];
    }

    function r6(){
        return [currentBlock.row - 1, currentBlock.column + 0];
    }

    function r7(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r8(){
        return [currentBlock.row + 0, currentBlock.column + 1];
    }

    function r9(){
        return [currentBlock.row + 1, currentBlock.column - 1];
    }

    function r10(){
        return [currentBlock.row - 1, currentBlock.column + 0];
    }

    function r11(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r12(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r13(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r14(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r15(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r16(){
        return [currentBlock.row + 0, currentBlock.column + 1];
    }

    function r17(){
        return [currentBlock.row + 1, currentBlock.column - 1];
    }

    function r18(){
        return [currentBlock.row - 1, currentBlock.column + 0];
    }

    function r19(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r20(){
        return [currentBlock.row + 0, currentBlock.column + 1];
    }

    function r21(){
        return [currentBlock.row + 1, currentBlock.column - 1];
    }

    function r22(){
        return [currentBlock.row - 1, currentBlock.column + 0];
    }

    function r23(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }

    function r24(){
        return [currentBlock.row + 0, currentBlock.column + 1];
    }

    function r25(){
        return [currentBlock.row + 1, currentBlock.column - 1];
    }

    function r26(){
        return [currentBlock.row - 1, currentBlock.column + 0];
    }

    function r27(){
        return [currentBlock.row + 0, currentBlock.column + 0];
    }
 
});
