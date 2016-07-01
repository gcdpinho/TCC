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

function nJogadores(n){
	if (n == 1)
		location.href = "modoDeJogo.html";
	else
		location.href = "bluetooth.html";
}

function modoJogo(modo){
	var multi = localStorage.getItem('multi');
	if (!multi){
		localStorage.setItem('modo', modo);
		switch (modo) {
			case 1:
				//gera meu tabuleiro
				var tab = geraTabuleiro();
				var tabAux = [];

				for (i=0; i<26; i++)
					tabAux[i] = tab[i];

				localStorage.setItem("meuTab", tabAux);

				//gera tabuleiro adversário
				tab = geraTabuleiro();
				tabAux = [];

				for (i=0; i<26; i++)
					tabAux[i] = tab[i];

				localStorage.setItem("opoTab", tabAux);

				var ilha = Math.floor((Math.random() * 26));

				localStorage.setItem("opoIlha", tabAux[ilha]);
				location.href = "escolhaIlha.html";
				break;
			case 2:
				var tab = geraTabuleiro();
				var tabAux = [];

				for (i=0; i<26; i++)
					tabAux[i] = tab[i];

				tabAux.sort(function(a, b){return a-b});

				localStorage.setItem("meuTab", tabAux);

				//gera tabuleiro adversário
				tab = geraTabuleiro();
				tabAux = [];

				for (i=0; i<26; i++)
					tabAux[i] = tab[i];

				tabAux.sort(function(a, b){return a-b});

				localStorage.setItem("opoTab", tabAux);

				var ilha = Math.floor((Math.random() * 26));

				localStorage.setItem("opoIlha", tabAux[ilha]);

				var novoTab = [];
				for (i=0; i<26; i++)
					novoTab[i] = i;

				localStorage.setItem('novoTab', novoTab);

				location.href = "escolhaIlha.html";
				break;
			case 3:
				//gera meu tabuleiro
				var arr = geraTabuleiro();
			    var arraux = [], arrOpoaux = [];
			    var string = "", i, j, stringOpo = "";
			    var arrMod = [];

			    for (i=0; i<10; i++)
			        arrMod[i] = 0;

			    for (i=0; i<26; i++)
			        arraux[i] = arr[i];

			    var total = 0;
			    var count = [];
			    var aux0 = [], aux1 = [], aux2 = [], aux3 = [], aux4 = [],
			    aux5 = [], aux6 = [], aux7 = [], aux8 = [], aux9 = [];

			    for (i=0; i<10; i++)
			        count[i] = 0;
			    for (i=0; i<arr.length; i++)
			    {   var mod = arr[i] % 10;

			        if (total <26)
			            switch (mod)
			            {   case 0:
			                    if (count[0] < 4)
			                    {   aux0[count[0]] = arr[i];
			                        count[0]++;
			                        total++;
			                    }
			                    break;
			                case 1:
			                    if (count[1] < 4)
			                    {   aux1[count[1]] = arr[i];
			                        count[1]++;
			                        total++;
			                    }
			                    break;
			                case 2:
			                    if (count[2] < 4)
			                    {   aux2[count[2]] = arr[i];
			                        count[2]++;
			                        total++;
			                    }
			                    break;
			                case 3:
			                    if (count[3] < 4)
			                    {   aux3[count[3]] = arr[i];
			                        count[3]++;
			                        total++;
			                    }
			                    break;
			                case 4:
			                    if (count[4] < 4)
			                    {   aux4[count[4]] = arr[i];
			                        count[4]++;
			                        total++;
			                    }
			                    break;
			                case 5:
			                    if (count[5] < 4)
			                    {   aux5[count[5]] = arr[i];
			                        count[5]++;
			                        total++;
			                    }
			                    break;
			                case 6:
			                    if (count[6] < 4)
			                    {   aux6[count[6]] = arr[i];
			                        count[6]++;
			                        total++;
			                    }
			                    break;
			                case 7:
			                    if (count[7] < 4)
			                    {   aux7[count[7]] = arr[i];
			                        count[7]++;
			                        total++;
			                    }
			                    break;
			                case 8:
			                    if (count[8] < 4)
			                    {   aux8[count[8]] = arr[i];
			                        count[8]++;
			                        total++;
			                    }
			                    break;
			                case 9:
			                    if (count[9] < 4)
			                    {   aux9[count[9]] = arr[i];
			                        count[9]++;
			                        total++;
			                    }
			                    break;
			            }
			        else
			            break;
			    }

			    aux0.sort(function(a, b){return a-b});
			    aux1.sort(function(a, b){return a-b});
			    aux2.sort(function(a, b){return a-b});
			    aux3.sort(function(a, b){return a-b});
			    aux4.sort(function(a, b){return a-b});
			    aux5.sort(function(a, b){return a-b});
			    aux6.sort(function(a, b){return a-b});
			    aux7.sort(function(a, b){return a-b});
			    aux8.sort(function(a, b){return a-b});
			    aux9.sort(function(a, b){return a-b});

			    for (i=0; i<aux0.length; i++)
			        string += aux0[i] + ',';
			    for (i=0; i<aux1.length; i++)
			        string += aux1[i] + ',';
			    for (i=0; i<aux2.length; i++)
			        string += aux2[i] + ',';
			    for (i=0; i<aux3.length; i++)
			        string += aux3[i] + ',';
			    for (i=0; i<aux4.length; i++)
			        string += aux4[i] + ',';
			    for (i=0; i<aux5.length; i++)
			        string += aux5[i] + ',';
			    for (i=0; i<aux6.length; i++)
			        string += aux6[i] + ',';
			    for (i=0; i<aux7.length; i++)
			        string += aux7[i] + ',';
			    for (i=0; i<aux8.length; i++)
			        string += aux8[i] + ',';
			    for (i=0; i<aux9.length; i++)
			        string += aux9[i] + ',';

			    var stringMod = "";

			    for (i=0; i<10; i++)
			        stringMod += count[i] + ',';

				string = string.substring(0, string.length-1);
				stringMod = stringMod.substring(0, stringMod.length-1);

			    localStorage.setItem('meuHash', stringMod);
			    localStorage.setItem('meuTab', string);


				//gera tabuleiro oponente
				var arr = geraTabuleiro();
			    var arraux = [], arrOpoaux = [];
			    var string = "", i, j, stringOpo = "";
			    var arrMod = [];

			    for (i=0; i<10; i++)
			        arrMod[i] = 0;

			    for (i=0; i<26; i++)
			        arraux[i] = arr[i];

			    var total = 0;
			    var count = [];
			    var aux0 = [], aux1 = [], aux2 = [], aux3 = [], aux4 = [],
			    aux5 = [], aux6 = [], aux7 = [], aux8 = [], aux9 = [];

			    for (i=0; i<10; i++)
			        count[i] = 0;
			    for (i=0; i<arr.length; i++)
			    {   var mod = arr[i] % 10;

			        if (total <26)
			            switch (mod)
			            {   case 0:
			                    if (count[0] < 4)
			                    {   aux0[count[0]] = arr[i];
			                        count[0]++;
			                        total++;
			                    }
			                    break;
			                case 1:
			                    if (count[1] < 4)
			                    {   aux1[count[1]] = arr[i];
			                        count[1]++;
			                        total++;
			                    }
			                    break;
			                case 2:
			                    if (count[2] < 4)
			                    {   aux2[count[2]] = arr[i];
			                        count[2]++;
			                        total++;
			                    }
			                    break;
			                case 3:
			                    if (count[3] < 4)
			                    {   aux3[count[3]] = arr[i];
			                        count[3]++;
			                        total++;
			                    }
			                    break;
			                case 4:
			                    if (count[4] < 4)
			                    {   aux4[count[4]] = arr[i];
			                        count[4]++;
			                        total++;
			                    }
			                    break;
			                case 5:
			                    if (count[5] < 4)
			                    {   aux5[count[5]] = arr[i];
			                        count[5]++;
			                        total++;
			                    }
			                    break;
			                case 6:
			                    if (count[6] < 4)
			                    {   aux6[count[6]] = arr[i];
			                        count[6]++;
			                        total++;
			                    }
			                    break;
			                case 7:
			                    if (count[7] < 4)
			                    {   aux7[count[7]] = arr[i];
			                        count[7]++;
			                        total++;
			                    }
			                    break;
			                case 8:
			                    if (count[8] < 4)
			                    {   aux8[count[8]] = arr[i];
			                        count[8]++;
			                        total++;
			                    }
			                    break;
			                case 9:
			                    if (count[9] < 4)
			                    {   aux9[count[9]] = arr[i];
			                        count[9]++;
			                        total++;
			                    }
			                    break;
			            }
			        else
			            break;
			    }

			    aux0.sort(function(a, b){return a-b});
			    aux1.sort(function(a, b){return a-b});
			    aux2.sort(function(a, b){return a-b});
			    aux3.sort(function(a, b){return a-b});
			    aux4.sort(function(a, b){return a-b});
			    aux5.sort(function(a, b){return a-b});
			    aux6.sort(function(a, b){return a-b});
			    aux7.sort(function(a, b){return a-b});
			    aux8.sort(function(a, b){return a-b});
			    aux9.sort(function(a, b){return a-b});

			    for (i=0; i<aux0.length; i++)
			        string += aux0[i] + ',';
			    for (i=0; i<aux1.length; i++)
			        string += aux1[i] + ',';
			    for (i=0; i<aux2.length; i++)
			        string += aux2[i] + ',';
			    for (i=0; i<aux3.length; i++)
			        string += aux3[i] + ',';
			    for (i=0; i<aux4.length; i++)
			        string += aux4[i] + ',';
			    for (i=0; i<aux5.length; i++)
			        string += aux5[i] + ',';
			    for (i=0; i<aux6.length; i++)
			        string += aux6[i] + ',';
			    for (i=0; i<aux7.length; i++)
			        string += aux7[i] + ',';
			    for (i=0; i<aux8.length; i++)
			        string += aux8[i] + ',';
			    for (i=0; i<aux9.length; i++)
			        string += aux9[i] + ',';

			    var stringMod = "";

			    for (i=0; i<10; i++)
			        stringMod += count[i] + ',';

				string = string.substring(0, string.length-1);
				stringMod = stringMod.substring(0, stringMod.length-1);

			    localStorage.setItem('opoHash', stringMod);
			    localStorage.setItem('opoTab', string);

				var ilha = Math.floor((Math.random() * 26));

				localStorage.setItem('opoIlha', string.split(',')[ilha]);

				location.href = "modo-tabela.html";
				break;
		}
	}
}

function jogar(){
	var moeda = Math.floor((Math.random() * 2));
	var modo = localStorage.getItem("modo");

	if (modo == 3){
		if (moeda == 0)
			location.href = "modo-tabela-barba-cinza.html";

		//barba cinza começa
		else
			location.href = "modo-tabela-jogar.html";
	}
	else {
		//voce começa
		if (moeda == 0)
			location.href = "escolhaIlha-barba-cinza.html";

		//barba cinza começa
		else
			location.href = "jogar.html";
	}
}

$("#mLetra").text(localStorage.getItem('minhaLetra')+" ");
$("#mNum").text(localStorage.getItem('meuNum'));
$("#opoNum").text(localStorage.getItem('opoIlha'));

var mTab = [];
mTab = localStorage.getItem("meuTab").split(',');
for (i=0; i<26; i++)
	$('.'+(i+1)).text(mTab[i]);

var opoTab = [];
opoTab = localStorage.getItem("opoTab").split(',');
var rep = [];
rep = localStorage.getItem("mRep").split(',');

for (i=0; i<26; i++){
	$('.opo-'+(i+1)).text(opoTab[i]);
	if ($('.opo-'+(i+1)).length == 1)
		if (rep[i] != ' '){
			$('.opo-'+(i+1)).css('display', 'block');
			$('#ilha-'+letraOpo(i)).css('-webkit-filter', 'grayscale(100%)');
			$(".ilha-jogo").off('click');
		}
}

if ($('.ilha-jogo').length != 0)
	$('.qt-palpites').text(localStorage.getItem("mPalp"));
else
	if($('.ilhaPalpite').length != 0){
		$('.bandeira').show();
		$('.qt-palpites').text(localStorage.getItem("opoPalp"));
	}

function blink(selector) {
	$(selector).fadeOut(300,function() {
	    $(this).fadeIn(300,function() {
			$(selector).fadeOut(300,function() {
			    $(this).fadeIn(300,function() {
					$(selector).fadeOut(300,function() {
					    $(this).fadeIn(300,function() {
					    });
					});
			    });
			});
	    });
	});
}

if ($('.jogar').length != 0){
	var modo = localStorage.getItem('modo');
	$('.qt-palpites').text(localStorage.getItem("opoPalp"));
	var repString = localStorage.getItem('opoRep');
	var rep = repString.split(',');
	for (i=0; i<26; i++){
		if (rep[i] != ' '){
			$('#ilha-'+letraOpo(i)).css('-webkit-filter', 'grayscale(100%)');
		}
	}
	var palpite;
	var minhaIlha = letraNum(localStorage.getItem("minhaLetra"));
	var auxThis;
	if (modo == "1"){
		palpite = Math.floor((Math.random() * 26));
		while (haveElement(palpite, repString))
			palpite = Math.floor((Math.random() * 26));

		auxThis = $('#ilha-'+letraOpo(palpite));
	}
	else
		if (modo == "2"){
			var novoTab = localStorage.getItem('novoTab').split(',');

			var len = novoTab.length;
	        var meio = len / 2 | 0;
			if (len % 2 == 0)
				meio -= Math.random() * 2 | 0;

			palpite = novoTab[meio];
			var novoTabAux = [];
			var z = 0;
			if (parseInt(palpite) > parseInt(minhaIlha))
				for (i=0; i<parseInt(meio); i++)
					novoTabAux[i] = novoTab[i];
			else
				for (i=parseInt(meio)+1; i<novoTab.length; i++){
					novoTabAux[z] = novoTab[i];
					z++;
				}
			localStorage.setItem('novoTab', novoTabAux);
			auxThis = $('#ilha-'+letraOpo(palpite));
		}
		else {
			var palpitesHash = localStorage.getItem('palpitesHash').split(',');

			var palpite = Math.random() * palpitesHash.length | 0;

			var novoPalpiteHash = [];
			var z = 0;

			for (i=0; i<parseInt(palpite); i++)
				novoPalpiteHash[i] = palpitesHash[i];

			for (i=parseInt(palpite)+1; i<palpitesHash.length; i++)
				novoPalpiteHash[i-parseInt(palpite)-1] = palpitesHash[i];

			localStorage.setItem('palpitesHash', novoPalpiteHash);
			palpite = palpitesHash[palpite];
		}



	setTimeout(function(){

		if (modo == 3){
			var letra = letraOpo(palpite);
			//alert(palpitesHash[palpite]);
			for (i=0; i<10; i++)
				for (j=0; j<4; j++)
					if ($('.coluna'+i+j).children('.letra-ilha').text() == letra)
						auxThis = $('.coluna'+i+j);
		}
		var novoRep = [];

		for (i=0; i<26; i++)
			if (parseInt(palpite) == i)
				novoRep[i] = i;
			else
				novoRep[i] = rep[i];

		localStorage.setItem('opoRep', novoRep);

		var novoPalp = parseInt($('.qt-palpites').text())+1;
		$('.qt-palpites').text(novoPalp);
		localStorage.setItem("opoPalp", novoPalp);
		$(".config").off('click');
		$('.title').text("");
		$('.title').append('<span style="font-size: 1.5em;">V</span>erificando...');
		auxThis.children('.numero').addClass('gold');
		auxThis.addClass('selecionada');
		var nPalpite = auxThis.children('.numero').text();
		blink(auxThis);

		setTimeout(function(){
			$('.title').text("");
			if (palpite == minhaIlha){
				$('.title').append('<span style="font-size: 1.5em;">H</span>ahaha, encontrei o tesouro!');

			}
			else {
				$('.title').append('<span style="font-size: 1.5em;">A</span>hhh, eu errei! <span style="font-size: 1.5em;">S</span>orte a sua!');
				auxThis.children('.xis').css('display', 'block');
				setTimeout(function(){
					if (modo != 3)
						location.href = "escolhaIlha-barba-cinza.html";
					else
						location.href = "modo-tabela-barba-cinza.html";
				}, 2500);
			}
		}, 2000);
	}, 1500);
}

function bloquear(e){
    return false;
}

function desbloquear(){
    return true;
}

document.onselectstart = new Function ("return false");
document.ondragstart= new Function ('return false');

if (window.sidebar) {
    document.onmousedown = bloquear;
    document.onclick = desbloquear;
}

if ($('.escolha-tabela').length != 0){
	var meuTab = localStorage.getItem('meuTab').split(',');
	var meuHash = localStorage.getItem('meuHash').split(',');
	var z = 0;

	for (i=0; i<10; i++){
		for (j=0, size=parseInt(meuHash[i]); j<size; j++){
			$('.coluna'+i+j).children('.letra-ilha').text(letraOpo(z));
			$('.coluna'+i+j).children('.letra-ilha').css('visibility', 'visible');
			$('.coluna'+i+j).children('.img-ilha').css('visibility', 'visible');
			$('.coluna'+i+j).children('.numero').css('visibility','visible');
			$('.coluna'+i+j).children('.numero').text(meuTab[z]);
			$('.coluna'+i+j).children('.numero').attr('value', 'true');
			z++;
		}
	}
}

if ($('.jogar-tabela').length != 0){
	$('.qt-palpites').text(localStorage.getItem("mPalp"));
	var opoTab = localStorage.getItem('opoTab').split(',');
	var opoHash = localStorage.getItem('opoHash').split(',');
	var rep = localStorage.getItem("mRep").split(',');
	var z = 0;
	//alert(rep);
	for (i=0; i<10; i++){
		for (j=0, size=parseInt(opoHash[i]); j<size; j++){
			$('.coluna'+i+j).children('.letra-ilha').text(letraOpo(z));
			$('.coluna'+i+j).children('.letra-ilha').css('visibility', 'visible');
			$('.coluna'+i+j).children('.img-ilha').css('visibility', 'visible');
			$('.coluna'+i+j).children('.numero').text(opoTab[z]);
			$('.coluna'+i+j).children('.numero').attr('value', 'true');
			if (rep[z] != ' '){
				$('.coluna'+i+j).children('.numero').css('visibility', 'visible');
				$('.coluna'+i+j).css('-webkit-filter', 'grayscale(100%)');
			}
			z++;
		}
	}
}

if ($('.ilha-tabela-pirata').length != 0){
	var rep = localStorage.getItem("opoRep").split(',');
	var z = 0;
	//alert(rep);
	for (i=0; i<10; i++)
		for (j=0; j<4; j++){
			if ($('.coluna'+i+j).children('.numero').attr('value') == "true"){
				if (rep[z] != ' ')
					$('.coluna'+i+j).css('-webkit-filter', 'grayscale(100%)');
				z++;
			}

		}
}
