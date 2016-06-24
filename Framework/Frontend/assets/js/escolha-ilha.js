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

			$('.title').text("Dialogo com o pirata!")
		});
	};

	return app.init();

}());