const button =  $('.link');  

$(button).click(function(e){
    e.preventDefault();

let link = $("input[type='url']").val();

        if(link.startsWith("https://www.instagram.com/p/" || link.startsWith("https://scontent"))){
           const embed = "https://api.instagram.com/oembed?url=" + link;
           
           $.ajax({
               type: 'GET',
               url: embed,
               cache: false,
               dataType: 'jsonp',
               success: function(data){
                console.log(data.thumbnail_url);
                button.attr('href', data.thumbnail_url);
                button.attr('target', "_blank");
                button.off();
                button[0].click();
                
                
                
                location.reload(false); //resets app 
               }

           }
        
        );

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
