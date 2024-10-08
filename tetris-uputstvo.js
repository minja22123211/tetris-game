$(document).ready(function(){

    $('#showUputstvo').click(function() {
        $('#logo').hide();
        $('#naslov').hide();
        $('#podesavanje').removeClass('visible');
        $('#uputstvo').addClass('visible');
    });

    $('#showPodesavanje').click(function() {
        $('#logo').hide();
        $('#naslov').hide();
        $('#uputstvo').removeClass('visible');
        $('#podesavanje').addClass('visible');
    });


    $("#play").click(function(){



        let level = $('input[name="nivo"]:checked').attr('id');
        console.log('Level: '+ level);
        

        let blocks = [];
        $("input[type='checkbox']:checked").each(function(){
            blocks.push($(this).attr('id'));
        });

        if(blocks.length <= 1){
            alert("Morate izabrati barem 2 bloka!");
            return;
        }
        localStorage.setItem("blocks", JSON.stringify(blocks));

        localStorage.setItem("level",JSON.stringify(level));

        window.location.href = "tetris-igra.html";
    });





});
