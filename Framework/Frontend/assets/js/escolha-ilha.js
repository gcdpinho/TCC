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

		if($('.ilhaPalpite').length != 0)
			$('#ilha-'+localStorage.getItem("minhaLetra")).append(html);
		else
			if ($('.ilha-tabela-pirata').length != 0){
				var minhaLetra = localStorage.getItem('minhaLetra');
				for (i=0; i<10; i++)
					for (j=0; j<4; j++)
						if ($('.coluna'+i+j).children('.letra-ilha').text() == minhaLetra)
							$('.coluna'+i+j).append(html);
		}
		$(".ilha-tabela").on("click", function(){
			if ($(this).children('.numero').attr("value") == "true"){
				$(this).addClass('selecionada');
				$(this).append(html); //add bau
				$(this).children('.numero').addClass('gold');

				$('.letra-selecionada').text($(this).children('.letra-ilha').text());
				$('.numero-selecionado').text($(this).children('.numero').text());

				localStorage.setItem("minhaLetra", $(this).children('.letra-ilha').text());
				localStorage.setItem("meuNum", $(this).children('.numero').text());

				var meuTab = localStorage.getItem('meuTab').split(',');
				var coluna = localStorage.getItem('meuNum') % 10;
				var palpitesPirata = [];
				var z = 0;
				for (i=0; i<26; i++)
					if (meuTab[i] % 10 == coluna){
						palpitesPirata[z] = i;
						z++;
					}

				localStorage.setItem('palpitesHash', palpitesPirata);


				$('.bandeira').show();

				$('.title').text("");
				$('.title').append('<span style="font-size: 1.5em;">E</span>scondendo o Tesouro...');

				$(".ilha-tabela").off('click');
				$(".config").off('click');
				document.getElementById("bt-ajuda").onclick = "";

				var rep = [];
				for (i=0; i<26; i++)
					rep[i] = " ";

				localStorage.setItem("mRep", rep);
				localStorage.setItem("opoRep", rep);

				localStorage.setItem("mPalp", 0);
				localStorage.setItem("opoPalp", 0);

				setTimeout(function(){
					location.href = "transicao2.html";
				}, 2500);

			}
		});
		$('.ilha').on('click', function(){

			$(this).addClass('selecionada');
			$(this).append(html); //add bau
			$(this).children('.numero').addClass('gold');

			$('.letra-selecionada').text($(this).children('.letra-ilha').text());
			$('.numero-selecionado').text($(this).children('.numero').text());

			localStorage.setItem("minhaLetra", $(this).children('.letra-ilha').text());
			localStorage.setItem("meuNum", $(this).children('.numero').text());

			$('.bandeira').show();

			$('.title').text("");
			$('.title').append('<span style="font-size: 1.5em;">E</span>scondendo o Tesouro...');

			$(".ilha").off('click');
			$(".config").off('click');
			document.getElementById("bt-ajuda").onclick = "";

			var rep = [];
			for (i=0; i<26; i++)
				rep[i] = " ";

			localStorage.setItem("mRep", rep);
			localStorage.setItem("opoRep", rep);

			localStorage.setItem("mPalp", 0);
			localStorage.setItem("opoPalp", 0);

			setTimeout(function(){
				location.href = "transicao2.html";
			}, 2500);

		});

		$('.ilha-jogo').on('click', function(){
			var mRep = localStorage.getItem("mRep").split(',');
			var flag = false;
			var aux = letraNum($(this).children('.letra-ilha').text());
			for (i=0; i<26; i++)
				if (aux == parseInt(mRep[i]))
					flag = true;

			if (!flag){
				$(this).addClass('selecionada');

				var novoPalp = parseInt($('.qt-palpites').text())+1;
				$('.qt-palpites').text(novoPalp);
				localStorage.setItem("mPalp", novoPalp);

				$("#bt-desistir").off('click');
				$(".ilha-jogo").off('click');
				$(".config").off('click');
				$('.title').text("");
				$('.title').append('<span style="font-size: 1.5em;">V</span>erificando...');
				$(this).children('.numero').css('display','block');
				$(this).children('.numero').addClass('gold');
				var palpite = $(this).children('.numero').text();
				var auxThis = $(this);
				blink($(this));

				var novoRep = [];

				for (i=0; i<26; i++)
					if (parseInt(aux) == i)
						novoRep[i] = i;
					else
						novoRep[i] = mRep[i];

				localStorage.setItem("mRep", novoRep);
				setTimeout(function(){

					var opoIlha = localStorage.getItem("opoIlha");
					$('.title').text("");
					if (palpite == opoIlha){
						$('.title').append('<span style="font-size: 1.5em;">G</span>rr, você econtrou!');
						auxThis.append(html); //add bau
					}
					else {
						$('.title').append('<span style="font-size: 1.5em;">V</span>ocê errou! HAHAHA');
						auxThis.children('.xis').css('display', 'block');
						setTimeout(function(){
							location.href = "jogar.html";
						}, 2500);
					}
				}, 2000);
			}

		});

		$('.ilha-tabela-jogar').on('click', function(){
			if ($(this).children('.numero').attr("value") == "true"){
				var mRep = localStorage.getItem("mRep").split(',');
				var flag = false;
				var aux = letraNum($(this).children('.letra-ilha').text());
				for (i=0; i<26; i++)
					if (aux == parseInt(mRep[i]))
						flag = true;

				if (!flag){
					$(this).addClass('selecionada');

					var novoPalp = parseInt($('.qt-palpites').text())+1;
					$('.qt-palpites').text(novoPalp);
					localStorage.setItem("mPalp", novoPalp);

					$("#bt-desistir").off('click');
					$(".ilha-tabela-jogar").off('click');
					$(".config").off('click');
					$('.title').text("");
					$('.title').append('<span style="font-size: 1.5em;">V</span>erificando...');
					$(this).children('.numero').css('visibility','visible');
					$(this).children('.numero').addClass('gold');
					var palpite = $(this).children('.numero').text();
					var auxThis = $(this);
					blink($(this));

					var novoRep = [];

					for (i=0; i<26; i++)
						if (parseInt(aux) == i)
							novoRep[i] = i;
						else
							novoRep[i] = mRep[i];

					localStorage.setItem("mRep", novoRep);
					setTimeout(function(){

						var opoIlha = localStorage.getItem("opoIlha");
						$('.title').text("");
						if (palpite == opoIlha){
							$('.title').append('<span style="font-size: 1.5em;">G</span>rr, você econtrou!');
							auxThis.append(html); //add bau
						}
						else {
							$('.title').append('<span style="font-size: 1.5em;">V</span>ocê errou! HAHAHA');
							auxThis.children('.xis').css('display', 'block');
							setTimeout(function(){
								location.href = "modo-tabela-jogar.html";
							}, 2500);
						}
					}, 2000);
				}
			}

		});
	};

	return app.init();

}());
