"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("./service-worker.js").then(function(o){console.log("ServiceWorker registration successful with scope: ")},function(o){console.log("ServiceWorker registration failed: ",o)})});const iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;iOS&&alert("Dear User, \ndownloading clips on iOS device is currently unsupported, due to Apple's closed filesystem policy.\nYou can still download pictures and use our app on PC/Android to download videos./nThank You");const button=$(".form__btn");function download(o,e,t){$(e).attr("href",`${t}?url=${o}`),$(".form__input").val(""),(e="#pic")&&setTimeout(()=>{button[0].click(),$(".form__input").prop("disabled",!1),button.attr("href","#")},500)}$(".form__input").keypress(function(o){13==o.which&&(o.preventDefault(),button[0].click())}),$(button).click(function(o){let e=$(".form__input").val();e.startsWith("https://www.instagram.com/p/")||e.startsWith("https://scontent")?($(".form__input").prop("disabled",!0),$.ajax({type:"GET",url:e,cache:!1,success:function(o){const e=/<meta property="og:video".*?content="(.*?)"/,t=/<meta property="og:image".*?content="(.*?)"/;if(e.test(o)){let t=o.match(e)[1];$(".form__btn").hide(),$(".download__choice").css("display","flex"),$(".download__choice-video").click(()=>{download(encodeURIComponent(t),"#video","/down"),$(".download__choice").hide(),$(".form__btn").css("display","block")}),$(".download__choice-gif").click(()=>{download(encodeURIComponent(t),"#gif","/gif")})}else{let e=o.match(t)[1];console.log(e),download(encodeURIComponent(e),"#pic","/down")}}})):($(".form__input").val(""),$(".form__input").addClass("animated flash"),setTimeout(()=>{$("input").removeClass("animated flash")},1500))});