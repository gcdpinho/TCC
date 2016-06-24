$(document).ready(function(){
	
	$('#ilha-O').on('click', function () {
  		$('#vitoria').focus();
	});
	setTimeout(function(){ 
		$('#control-progress-bar').attr("style", 'padding-right: 20%;');
		setTimeout(function(){ 
			$('#control-progress-bar').attr("style", 'padding-right: 70%;');
			setTimeout(function(){ 
				$('#control-progress-bar').attr("style", 'padding-right: 90%;');
			}, 3000);
		}, 3000);
	}, 5000);
	
});
