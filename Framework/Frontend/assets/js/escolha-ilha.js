(function(){
	var app = app || {};
	
	app.template = {
		tpl_bau: "<div class='sprite bau'></div>"
	};

	app.init = function(){
		app.eventsPage();
	};

	app.eventsPage = function(){
		var template = Handlebars.compile(app.template.tpl_bau);
		var html = template();
		$(".ilha-tabela").on("click", function(){
			$(".ilha-tabela").removeClass('selecionada');
			$(this).addClass('selecionada');

		});
		$('.ilha').on('click', function(){
			$('.ilha').children('.bau').remove();
			$('.ilha').removeClass('selecionada');
			$('.ilha').children('.numero').removeClass('gold');


			$(this).addClass('selecionada');
			$(this).append(html); //add bau
			$(this).children('.numero').addClass('gold');
			
			$('.letra-selecionada').text($(this).children('.letra-ilha').text());
			$('.numero-selecionado').text($(this).children('.numero').text());

			$('.bandeira').show();

			$('.title').text("");
			$('.title').append('<span style="font-size: 1.5em;">D</span>ialogo com o Pirata');
			
		});
	};

	return app.init();

}());