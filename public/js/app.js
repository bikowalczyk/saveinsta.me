const button =  $('.form__btn');

//binding enter press to clicking a button
$('.form__input').keypress(function(e) {
    if(e.which == 13) {
        e.preventDefault();
        button[0].click();
    }
});

function download(value, item){
    $(item).attr('href', value);
    $(item).attr('target', "_blank");
    $(".form__input").val(""); 
    // button.attr('href', "");
     location.reload(false);  //to be fixed later
    // return;
   }

$(button).click(function(e){
    e.preventDefault();
    let link = $(".form__input").val();


        if(link.startsWith("https://www.instagram.com/p/") || link.startsWith("https://scontent")){
           
            $.ajax({
                type: 'GET',
                url: link,
                cache: false,
                success: function(response){
                 const regex = /<meta property="og:video".*?content="(.*?)"/;       //a bit of a hassle with correct RegExp
                 const regex1 = /<meta property="og:image".*?content="(.*?)"/;
                 
                if(regex.test(response)){
                    let src = response.match(regex)[1];
                    $(".form__btn").hide();
                    $(".download__choice").css('display','flex');
                    //user chose video
                    $('.download__choice-video').click(e=>{
                        e.preventDefault;
                        $.ajax({ 
                            type: 'GET', 
                            url: '/video', 
                            data: {url: src}, 
                            dataType: 'json',
                            success: function (res) { 
                            console.log(res);
                            }
                          });
                        
                    })


                }else{
                    let src = response.match(regex1)[1];
                    download(src, button);
                }

                }});
                
        }
        
        else{               //the error message if link isn't valid
            $(".form__input").addClass("animated flash");
            setTimeout(()=>{ 
            $("input").removeClass("animated flash");
             }, 1500);
        }
    });