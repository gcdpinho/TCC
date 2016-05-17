$(document).ready(function(){
	
	setTimeout(function(){ 
		$('#control-progress-bar').attr("style", 'width:40%');
		setTimeout(function(){ 
			q	$('#control-progress-bar').attr("style", 'width:85%');
		}, 3000);
	}, 5000);
	
		
});
