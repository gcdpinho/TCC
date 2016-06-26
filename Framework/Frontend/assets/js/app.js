$("#slider-volume").slider();
$("#slider-musica").slider();
$("#slider-brilho").slider();

/*slide menu de configurações*/
$(".config").on("click", function(){
	$(".square-config").slideToggle("slow");
});

$("#bt-desistir").on("click", function(){
  	$('#modal-desistir').fadeIn("slow");
});

$("#continuar").on("click", function(){
  	$('#modal-desistir').fadeOut("fast");
});

$(document).ready(function(){
	setTimeout(function(){ 
		$('#control-progress-bar').attr("style", 'padding-right: 20%;');
		setTimeout(function(){ 
			$('#control-progress-bar').attr("style", 'padding-right: 70%;');
		
		}, 3000);
	}, 5000);
	
});
