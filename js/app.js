const button =  $("input[type='submit']");

  

$(button).click(function(){
const link = $("input[type='url']").val();

async function scrape(){
    console.log('pre');
 const wbpage = await $.get(link);
   console.log(wbpage);
   
    }

        if(link.startsWith("https://www.instagram.com/p/")){
            scrape();
        } 
        
        else{               //the error message if not valid link
            
        alert("The link you pasted doesn't seem to be a valid instagram post link");
        }
});