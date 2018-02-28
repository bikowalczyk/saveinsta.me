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

function download(value){
    button.attr('href', value);
         button.attr('target', "_blank");
         button.off();
         button[0].click();
         location.reload(false); //resets app 
   }

        if(link.startsWith("https://www.instagram.com/p/" || link.startsWith("https://scontent"))){
           
            $.ajax({
                type: 'GET',
                url: link,
                cache: false,
                success: function(response){
                 const regex = /<meta property="og:video".*?content="(.*?)"/;       //a bit of a hassle with correct RegExp
                 const regex1 = /<meta property="og:image".*?content="(.*?)"/;
                 
                if(regex.test(response)){
                    let src = response.match(regex)[1]; 
                    download(src);

                }else{
                    let src = response.match(regex1)[1];
                    download(src);
                }

                }});
         

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
