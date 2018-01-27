const button =  $("input[type='submit']");

  

$(button).click(function(e){
    e.preventDefault();

const link = $("input[type='url']").val();

        if(link.startsWith("https://www.instagram.com/p/")){
           const embed = "https://api.instagram.com/oembed?url=" + link;
           
           $.ajax({
               type: 'GET',
               url: embed,
               cache: false,
               dataType: 'jsonp',
               success: function(data){
                   console.log(data.thumbnail_url);
                   
               }

           }
        
        );

        }
        
        else{               //the error message if not valid link
            
        alert("The link you pasted doesn't seem to be a valid instagram post link");
        }});
