(function () {
	var app = app || {};
	app.category = [];
	app.questions = [];
	app.templates = {
		tpl_option :'{{#each this}}<option value="{{id}}">{{title}}</option>{{/each}}',

		tpl_content_questions : '<div class="row {{this}}"></div>',

		tpl_question :'<div class="col-xs-12 question clearfix">\
						<h6 class="col-xs-7">{{question}}</h6>\
						<div class="col-xs-5">\
							<span class="text-uppercase right" style="color: #5f5f5f; font-size: 0.688em; float: right;">{{category.LookupValue}}</span>\
						</div>\
						</div>',

		tpl_question_open : '<div class="row question-open clearfix">\
							<div class="row">\
								<h6 class="col-xs-7 left">\
									<strong>{{question}}</strong>\
								</h6>\
								<div class="col-xs-5">\
									<button type="button" class="icons-sprite close-box right" aria-label="Close"></button>\
									<span class="text-uppercase right">{{category.LookupValue}}</span>\
								</div>\
							</div>\
							<div class="col-xs-12">\
								<h6 class="left">\
									{{response}}\
								</h6>\
								<button type="button" class="close-box-down left" aria-label="Close">Fechar</button>\
							</div>\
						</div>',

		tpl_button_pagination : '<button class="paginacao" id={{this}}>\
		{{this}}\
		</button>'
	};

	app.amountQuestionsCategory = [];
	app.page = [];
	app.countPages = 0;
	app.sizePage = 5; //quantidade de perguntas em cada página
	app.idAtual;
	app.bandPages = app.sizePage;
	app.init = function() {
		app.getData();
		app.eventsPage();
	};

	app.getData = function(){
		$.getJSON("Content/FAQCategory.json", function(data){
			for(var i=0, size=data.length; i<size; i++){
				app.category[i] = {
					id: data[i].ID,
					title: data[i].Title
				};

			}
		}).done(function(){
			for(var i=0,size = app.category.length+1; i<size; i++)
				app.amountQuestionsCategory[i] = 0;

			$.getJSON("Content/FAQList.json", function(data){
				var sizeCategory = app.category.length;
				var j = 1;
				var flag = 0;
				for(var i=0, size=data.length; i<size; i++){

					app.questions[i] = {
						question: data[i].Title,
						response: data[i].Response,
						category: data[i].FAQListCategory 
					};
					j=1;
					while(j <= sizeCategory || flag ==  0){
						if(app.questions[i].category.LookupId == j) {
							app.amountQuestionsCategory[j] += 1;
							flag = 1;
						}
						j++;
					}
					j = 1;
				}
			}).done(function(){
				function compare(a, b){
					if(a.question < b.question) 
						return -1;
					if(a.question > b.question)
						return 1;
					return 0;
				}
				app.questions.sort(compare);
				app.populateDropDown();
				app.renderButtonsPagination();
				app.buttonActive();
			});
		});
	};

	app.populateDropDown = function(){
		var template = Handlebars.compile(app.templates.tpl_option);
		var html = template(app.category);
		$("#category").append(html);
		$('#category').selectric('refresh');

		$('.selectric-select-default .selectric-items .selectric-scroll ul li').on("click",function(){

			$('.selectric-select-default .selectric div').toggle();
			$('.selectric-select-default .arrow-select-open').toggle();

		});
	    app.getQuestions(1); //option default para iniciar já carregado
	    
	    app.getIdCategory();

	};

	app.getIdCategory = function(){
		$('#category').on('change', function(){
			$('#questions').children().remove();
			app.countPages = 0;
			app.bandPages = app.sizePage;

			app.getQuestions($('#category option:selected').val());
		});
	};

	app.getQuestions = function(id){
		app.page = [];
		var j = 0; 
		app.idAtual = id;
		app.renderButtonsPagination();

		for(var i=0, size = app.questions.length; i<size; i++) {
			if(app.questions[i].category.LookupId == id) {
				app.page[j] = {
					question: app.questions[i].question,
					response: app.questions[i].response,
					category: app.questions[i].category
				};
				j++;
			}
		}
		app.pagination();


	};
	app.clickQuestions = function(){
		$('.question').on('click', function(){
			$(this).toggle('slow');
			$(this).next().toggle('slow');
		});
		$('.close-box-down').on('click', function(){
			$(this).parent().parent().toggle('slow');
			$(this).parent().parent().prev().toggle('slow');
		});

		$('.close-box').on('click', function(){
			$(this).parent().parent().parent().toggle('slow');
			$(this).parent().parent().parent().prev().toggle('slow');
		});

	};
	app.eventsPage = function(){
		$('.seta-direita').on('click', function(){

			if(app.bandPages < app.page.length){
				app.bandPages += app.sizePage;
				$('#questions').children().remove();
				app.pagination();

			}
		});
		$('.seta-esquerda').on('click', function(){
			if(app.bandPages-app.sizePage != 0){
				app.bandPages -= app.sizePage;
				$('#questions').children().remove();
				app.pagination();
			}
		});

	};

	app.pagination = function(){

		var templateModel = Handlebars.compile(app.templates.tpl_content_questions);
		var template = Handlebars.compile(app.templates.tpl_question);
		var templateResponse = Handlebars.compile(app.templates.tpl_question_open);
		var html;
		app.controlBandPages(); 

		for(var i= app.bandPages-app.sizePage , size = app.bandPages; i < size; i++){
			if(app.page[i] == undefined)
				break;
			var questionCurrentNoSpace = app.page[i].question.replace(/[\s?,)(.]/g, '').replace(/[áàâã]/g,'a').replace(/[éèê]/g,'e').replace(/[óòôõ]/g,'o').replace(/[úùû]/g,'u');
			html = templateModel(questionCurrentNoSpace);
			$("#questions").append(html);
			html = template(app.page[i]);
			$('.'+questionCurrentNoSpace).append(html);
			html = templateResponse(app.page[i]);
			$('.'+questionCurrentNoSpace).append(html);

		}

		app.clickQuestions();
		app.buttonActive();
	};


	app.controlBandPages = function(){
		$('.index').text('');
		$('.total-pages').text('');
		if(app.page[0] == undefined ||
			app.amountQuestionsCategory[app.page[0].category.LookupId] == 0) {

			$('.index').text(0);
		$('.total-pages').text(0);

	}
	else if(app.amountQuestionsCategory[app.page[0].category.LookupId] == 1) { 

		$('.index').text(1);
		$('.total-pages').text(1);
	}

	else{
		if((app.bandPages-app.sizePage)+ 1 === app.amountQuestionsCategory[app.page[0].category.LookupId])
			$('.index').text(app.amountQuestionsCategory[app.page[0].category.LookupId]);

		else if(app.bandPages > app.amountQuestionsCategory[app.page[0].category.LookupId]){

			$('.index').text((app.bandPages-app.sizePage)+ 1 +'-'+app.amountQuestionsCategory[app.page[0].category.LookupId]);
		}

		else
			$('.index').text((app.bandPages-app.sizePage)+ 1 +'-'+app.bandPages);

		$('.total-pages').text(app.amountQuestionsCategory[app.page[0].category.LookupId]);

	}
};

	app.renderButtonsPagination = function(){
		$('#button-pagination').children().remove();
		var templateButtons = Handlebars.compile(app.templates.tpl_button_pagination);
		var html;
		var amountButtons = app.amountQuestionsCategory[app.idAtual]/app.sizePage;

		if(amountButtons > 10)
		     buttons = 10; // no máximo 10 botões
		else
		 	buttons = amountButtons;

		    var sizeEM = (buttons * 2.25) + 1; //deixa no meio de acordo com o numero de perguntas na página

		    $("#button-pagination").attr('style', 'width: '+sizeEM+'em ;margin: 0 auto;');
		    var i = 1;
		    while(i < buttons + 1){
			    	html = templateButtons(i);
			    	$("#button-pagination").append(html);
			    	i++;
		    }
		    app.buttonSelectPage();
	};

	app.buttonActive = function(){ 
		$('#button-pagination').children().removeClass('pg-active');
		$('#button-pagination').children('#'+app.bandPages/app.sizePage).addClass('pg-active');

	};

	app.buttonSelectPage = function(){
		$('.paginacao').on('click', function(){
			$('#questions').children().remove();
			app.bandPages = app.sizePage * $(this).attr('id'); 
			app.pagination();
		});
	};
	return app.init();
}());