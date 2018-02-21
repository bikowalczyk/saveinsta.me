const button =  $('.link');  

//binding enter press to clicking a button
$('#addLink').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        button[0].click();
    }
});


$(button).click(function(e){
    e.preventDefault();
let link = $("input[type='url']").val();
const embed = "https://api.instagram.com/oembed?url=" + link;

//main functions

function getInstaPhoto(){
    $.ajax({
        type: 'GET',
        url: embed,
        cache: false,
        dataType: 'jsonp',
        success: function(data){
         button.attr('href', data.thumbnail_url);
         button.attr('target', "_blank");
         button.off();
         button[0].click();
         
         
         
         location.reload(false); //resets app 
        }

    }
 
 )}

        if(link.startsWith("https://www.instagram.com/p/" || link.startsWith("https://scontent"))){
           
           getInstaPhoto();
         

        }
        
        else{               //the error message if not valid link
            
        alert("The link you pasted doesn't seem to be a valid instagram post link");
        location.reload(false); //resets app 
        }

        

    });


//ajax animation:
$(document).on({
    ajaxStart: function() { $('body').addClass("loading");},
     ajaxStop: function() { $('body').removeClass("loading"); }    
});
