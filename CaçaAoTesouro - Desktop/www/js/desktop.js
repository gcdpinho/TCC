/* Animação do barco */

var ida = function() {
    var width = $(window).width();
    var widthImage = $('.imgBottom').width();
    $(".imgBottom").attr('src', "img/navio2.png");
    $(".imgBottom").animate({
        "margin-left": "+="+(width-widthImage-15)
    }, 2500, volta);
}

var volta = function(){
    var width = $(window).width();
    var widthImage = $('.imgBottom').width();
    $(".imgBottom").attr('src', "img/navio3.png");
    $(".imgBottom").animate({
        "margin-left": "-="+(width-widthImage-15)
    }, 2500, ida);
}

$(window).load(ida);

var ida1 = function() {
    var width = $(window).width();
    var widthImage = $('.imgNav').width();
    $(".imgNav").attr('src', "img/navio2.png");
    $(".imgNav").animate({
        "margin-left": "+="+(width-widthImage-5)
    }, 3500, volta1);
}

var volta1 = function(){
    var width = $(window).width();
    var widthImage = $('.imgNav').width();
    $(".imgNav").attr('src', "img/navio3.png");
    $(".imgNav").animate({
        "margin-left": "-="+(width-widthImage-5)
    }, 3500, ida1);
}

$(window).load(ida1);

/* Desativando a permição de selecionar */

function bloquear(e){
    return false;
}

function desbloquear(){
    return true;
}

document.onselectstart = new Function ("return false")

if (window.sidebar) {
    document.onmousedown = bloquear;
    document.onclick = desbloquear;
}

/* Responsável por trocar o fundo da escolha e do jogo e alterações no tabuleiro */

function trocarFundo() {
    $('body').css('background', 'url(img/azul5.jpg) no-repeat center top fixed');

    $('body').css('-webkit-background-size', "cover");
    $('body').css('-moz-background-size', "cover");
    $('body').css('-o-background-size', "cover");
    $('body').css('background-size', "cover");

    $('.tab').css('height', $(window).height()/3);

    /* Alteração nas ilhas */
    var lleft = 1.8, ileft = 0, nleft = 0.3;

    var partida = window.localStorage.getItem('partida');
    var binario = window.localStorage.getItem('binario');
    if (binario != "true") {
        if (partida == 2)
            var tab = "491,617,290,956,544,3,310,701,587,329,759,327,436,296,254,305,702,517,586,558,228,676,836,792,980,258".split(',');
        else
            if (partida == 3)
                var tab = "139,487,510,346,754,295,781,843,312,292,840,942,956,440,915,78,24,497,63,874,61,566,44,430,354,104".split(',');
            else
                if (partida == 0)
                    var tab = geraNumRand();
                else
                    var tab = "541,14,103,193,236,119,680,631,304,899,698,62,437,534,342,832,795,179,590,767,241,690,305,873,429,784".split(',');
    }
    else {
        $('.title').text("Modo Binário");
        if (partida == 2)
            var tab = "8,31,60,93,166,196,199,238,248,263,328,460,478,622,660,670,674,695,699,713,722,739,811,888,943,971".split(',');
        else
            if (partida == 3)
                var tab = "18,22,39,44,82,99,112,118,124,203,215,227,236,307,330,377,419,455,568,679,680,684,688,778,884,953".split(',');
            else
                if (partida == 0) {
                    var tab = geraNumRand();
                    var tabAux = [];
                    for (i=0; i<26; i++)
                        tabAux[i] = tab[i];
                    tab = tabAux.sort(function(a, b){return a-b});
                }
                else
                    var tab = "65,104,122,130,171,183,207,230,281,351,459,508,512,518,521,546,559,577,626,740,746,756,823,847,868,988".split(',');
    }
    var tabString = "";

    for (i=1; i<=26; i++) {
        /* Letra */
        $('#ltab'+i).css('width', '20px');
        $('#ltab'+i).css('background', 'transparent');
        $('#ltab'+i).css('border', 'none');
        $('#ltab'+i).css('margin-left', lleft+'%');
        $('#ltab'+i).css('font-size', '20px');
        $('#ltab'+i).css('color', 'black');
        $('#ltab'+i).css('position', 'absolute');
        lleft += 3.8;

        /* Ilha */
        $('#itab'+i).css('position', 'absolute');
        $('#itab'+i).css('margin-top', '3%');
        $('#itab'+i).css('margin-left', ileft+'%');
        $('#itab'+i).css('width', '4%');
        ileft += 3.8;

        /* Número */
        $('#ntab'+i).css('position', 'absolute');
        $('#ntab'+i).css('margin-top', '7%');
        $('#ntab'+i).css('width', '3%');
        $('#ntab'+i).css('margin-left', nleft+'%');
        $('#ntab'+i).attr('value', tab[i-1]);
        tabString += tab[i-1]+',';
        nleft += 3.8;
    }
    window.localStorage.setItem('meuTab', tabString);

    $('.jogo').css('display', 'block');
}

/* Responsável por gerar os números aleatórios */

function geraNumRand() {
    var maximo = 999;
    var i, arr = [];
    var p, n, tmp;

    for (i=0; i<=maximo; i++)
        arr[i] = i;

    for (p = arr.length; p;)
    {   n = Math.random() * p-- | 0;
        tmp = arr[n];
        arr[n] = arr[p];
        arr[p] = tmp;
    }

    return arr;
}

/* Função responsável por salvar a ilha escolhida */

function escolheIlha(num) {
    $.minhaIlha = num;
    for (i=1; i<=26; i++){
        $('#itab'+i).css('background-color', "transparent");
        $('#oitab'+i).css('background-color', "transparent");
    }
    $('#itab'+num).css('background-color', "#f1f1f1");
    $('#oitab'+num).css('background-color', "#f1f1f1");
}

/* Responsável por levar a tela de jogo */

function modoLinear() {
    var ilha = $.minhaIlha;

    if (ilha == undefined) {
        $('.modal-title').html("<center>Atenção</center>");
        $('.modalText').html("Você precisa escolher uma ilha antes de clicar em Selecionar!");
        $('.modal-footer').html("<button type='button' class='btn btn-success btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
        $('#modal').modal('show');
    }
    else{
        window.localStorage.setItem('minhaIlha', ilha);
        location.href = "modoLinear.html";
    }

}

$('.btSelec').click(modoLinear);

/* Função responsável por mostrar o modal na escolha de ilha */

function modalFirstTime() {
    if (window.localStorage.getItem('partida') != 0)
        $('#modal').modal('show');
}

/* Função responsável por não mostrar mais o modal no início da escolha */


/* Responsável pelo modal no início da partida */

function inicioJogo() {
    $('body').css('background', 'url(img/azul5.jpg) no-repeat center top fixed');

    $('body').css('-webkit-background-size', "cover");
    $('body').css('-moz-background-size', "cover");
    $('body').css('-o-background-size', "cover");
    $('body').css('background-size', "cover");

    $('.tabuleiro').css('height', $(window).height()/4);
    $('.tabuleiro').css('border', "2px solid black");

    $('.tabuleiroOponente').css('height', $(window).height()/4);
    $('.tabuleiroOponente').css('border', "2px solid black");

    var lleft = 1.8, ileft = 0, nleft = 0.3, top = 2;
    var tab = window.localStorage.getItem('meuTab').split(',');
    var ref = window.localStorage.getItem('refresh').split(',');

    /* Meu tabuleiro */
    for (i=1; i<=26; i++) {
        /* Letra */
        $('#mltab'+i).css('width', '20px');
        $('#mltab'+i).css('background', 'transparent');
        $('#mltab'+i).css('border', 'none');
        $('#mltab'+i).css('margin-left', lleft+'%');
        $('#mltab'+i).css('margin-top', '1%');
        $('#mltab'+i).css('font-size', '20px');
        $('#mltab'+i).css('color', 'black');
        $('#mltab'+i).css('position', 'absolute');
        lleft += 3.8;

        /* Ilha */
        $('#mitab'+i).css('position', 'absolute');
        $('#mitab'+i).css('margin-top', '4%');
        $('#mitab'+i).css('margin-left', ileft+'%');
        $('#mitab'+i).css('width', '4%');
        ileft += 3.8;

        /* Número */
        $('#mntab'+i).css('position', 'absolute');
        $('#mntab'+i).css('margin-top', '8%');
        $('#mntab'+i).css('width', '3%');
        $('#mntab'+i).css('margin-left', nleft+'%');
        $('#mntab'+i).attr('value', tab[i-1]);
        nleft += 3.8;
    }

    var lleft = 1.8, ileft = 0, nleft = 0.3;
    var partida = window.localStorage.getItem('partida');
    var binario = window.localStorage.getItem('binario');
    /* Tabuleiro do oponente */
    for (i=1; i<=26; i++) {
        /* Letra */
        $('#oltab'+i).css('width', '20px');
        $('#oltab'+i).css('background', 'transparent');
        $('#oltab'+i).css('border', 'none');
        $('#oltab'+i).css('margin-left', lleft+'%');
        $('#oltab'+i).css('margin-top', '1%');
        $('#oltab'+i).css('font-size', '20px');
        $('#oltab'+i).css('color', 'black');
        $('#oltab'+i).css('position', 'absolute');
        lleft += 3.8;

        /* Ilha */
        $('#oitab'+i).css('position', 'absolute');
        $('#oitab'+i).css('margin-top', '4%');
        $('#oitab'+i).css('margin-left', ileft+'%');
        $('#oitab'+i).css('width', '4%');
        ileft += 3.8;

        /* Número */
        $('#ontab'+i).css('position', 'absolute');
        $('#ontab'+i).css('margin-top', '8%');
        $('#ontab'+i).css('width', '3%');
        $('#ontab'+i).css('margin-left', nleft+'%');
        if (ref[i-1] != ' ')
            $('#ontab'+i).attr('value', ref[i-1].substring(0, ref[i-1].length-1));
        if (partida == 0)
            $('#ontab'+i).attr('readonly', 'readonly');
        nleft += 3.8;
    }
    var minhaIlha = window.localStorage.getItem('minhaIlha');
    $('#mltesouro').attr('value', $('#mltab'+minhaIlha).val());
    $('#mntesouro').attr('value', tab[parseInt(minhaIlha)-1]);

    if (binario == "true")
        $('.titleNav').text("Modo Binário");

    if (partida == 0)
        $('#ontesouro').attr('readonly', 'readonly');

    var opoIlha = window.localStorage.getItem('oponenteNum');
    if (opoIlha != "")
        $('#ontesouro').attr('value', opoIlha);

    if (partida != 0)
        $('.btPalpite').remove();

    if (partida == 2){
        $('.titlePartida').text("Partida 2");
        $('.goPartida').html("<center><img class = 'imgOp' src = 'img/partida3.png'/>"+"<b>Partida 3</b></center>");
    }
    else
        if (partida == 3){
            $('.titlePartida').text("Partida 3");
            $('.goPartida').html("<center><img class = 'imgOp' src = 'img/jogar2.png'/>"+"<b>Jogar</b></center>");
        }
        else
            if (partida == 0){
                $('.titlePartida').text("");
                $('.goPartida').html("<center><img class = 'imgOp' src = 'img/giveUp.png'/>"+"<b>DESISTIR</b></center>");
                if (window.localStorage.getItem('firstTime') == "false"){

                    if (binario != "true") {
                            var tabOpo = geraNumRand();
                            var tabOpoString = "";
                            for (i=0; i<26; i++)
                                tabOpoString += tabOpo[i] + ',';
                            window.localStorage.setItem('tabOpo', tabOpoString);
                            tabOpoString = tabOpoString.split(',');
                            var escolha = Math.random() * 25 | 0;
                            $('#ontesouro').attr('value', tabOpoString[escolha]);
                            window.localStorage.setItem('oponenteNum', tabOpoString[escolha]);
                            window.localStorage.setItem('oponenteIlha', escolha+1);
                            window.localStorage.setItem('firstTime', "true");
                    }
                    else {
                        var tabOpo = geraNumRand();
                        var tabOpoString = "";
                        var tabOpoAux = [];

                        for (i=0; i<26; i++)
                            tabOpoAux[i] = tabOpo[i];

                        tabOpoAux = tabOpoAux.sort(function(a, b){return a-b});
                        for (i=0; i<26; i++)
                            tabOpoString += tabOpoAux[i] + ',';

                        window.localStorage.setItem('tabOpo', tabOpoString);
                        tabOpoString = tabOpoString.split(',');
                        var escolha = Math.random() * 25 | 0;
                        $('#ontesouro').attr('value', tabOpoString[escolha]);
                        window.localStorage.setItem('oponenteNum', tabOpoString[escolha]);
                        window.localStorage.setItem('oponenteIlha', escolha+1);

                        var tabBin = "";
                        for (i=0; i<26; i++)
                            tabBin += i + ',';

                        window.localStorage.setItem('tabBinario', tabBin);
                        window.localStorage.setItem('firstTime', "true");
                    }
                    $('.modal-title').html("<center>Bem vindo!</center>");
                    $('.modalText').html("Marujo(a), prepare-se para enfrentar o grande capitão Barba Cinza! Eu escondi meu tesouro na ilha de número <b>"+tabOpoString[escolha]+"</b>.<br>Boa sorte e bom jogo!");
                    $('.modal-footer').html("<button type='button' class='btn btn-success btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
                    $('#modal').modal('show');
                }
            }
        $('.jogo').css('display', 'block');
}

function inicioJogo1() {
    $('body').css('background', 'url(img/azul5.jpg) no-repeat center top fixed');

    $('body').css('-webkit-background-size', "cover");
    $('body').css('-moz-background-size', "cover");
    $('body').css('-o-background-size', "cover");
    $('body').css('background-size', "cover");

    $('.tabuleiro').css('height', $(window).height()/4);
    $('.tabuleiro').css('border', "2px solid black");

    $('.tabuleiroOponente').css('height', $(window).height()/4);
    $('.tabuleiroOponente').css('border', "2px solid black");

    var lleft = 1.8, ileft = 0, nleft = 0.3, top = 2;
    var tab = window.localStorage.getItem('meuTab').split(',');
    var ref = window.localStorage.getItem('refresh').split(',');

    /* Meu tabuleiro */
    for (i=1; i<=26; i++) {
        /* Letra */
        $('#mltab'+i).css('width', '20px');
        $('#mltab'+i).css('background', 'transparent');
        $('#mltab'+i).css('border', 'none');
        $('#mltab'+i).css('margin-left', lleft+'%');
        $('#mltab'+i).css('margin-top', '1%');
        $('#mltab'+i).css('font-size', '20px');
        $('#mltab'+i).css('color', 'black');
        $('#mltab'+i).css('position', 'absolute');
        lleft += 3.8;

        /* Ilha */
        $('#mitab'+i).css('position', 'absolute');
        $('#mitab'+i).css('margin-top', '4%');
        $('#mitab'+i).css('margin-left', ileft+'%');
        $('#mitab'+i).css('width', '4%');
        ileft += 3.8;

        /* Número */
        $('#mntab'+i).css('position', 'absolute');
        $('#mntab'+i).css('margin-top', '8%');
        $('#mntab'+i).css('width', '3%');
        $('#mntab'+i).css('margin-left', nleft+'%');
        $('#mntab'+i).attr('value', tab[i-1]);
        nleft += 3.8;
    }

    var lleft = 1.8, ileft = 0, nleft = 0.3;
    var partida = window.localStorage.getItem('partida');
    /* Tabuleiro do oponente */
    for (i=1; i<=26; i++) {
        /* Letra */
        $('#oltab'+i).css('width', '20px');
        $('#oltab'+i).css('background', 'transparent');
        $('#oltab'+i).css('border', 'none');
        $('#oltab'+i).css('margin-left', lleft+'%');
        $('#oltab'+i).css('margin-top', '1%');
        $('#oltab'+i).css('font-size', '20px');
        $('#oltab'+i).css('color', 'black');
        $('#oltab'+i).css('position', 'absolute');
        lleft += 3.8;

        /* Ilha */
        $('#oitab'+i).css('position', 'absolute');
        $('#oitab'+i).css('margin-top', '4%');
        $('#oitab'+i).css('margin-left', ileft+'%');
        $('#oitab'+i).css('width', '4%');
        ileft += 3.8;

        /* Número */
        $('#ontab'+i).css('position', 'absolute');
        $('#ontab'+i).css('margin-top', '8%');
        $('#ontab'+i).css('width', '3%');
        $('#ontab'+i).css('margin-left', nleft+'%');

        nleft += 3.8;
    }


        $('.jogo').css('display', 'block');
}
/* Função que bloqueia f5 */

function blocAtt() {
    document.onkeydown = checkKeycode
    function checkKeycode(e) {

        var keycode;
        if (window.event)
            keycode = window.event.keyCode;
        else if (e)
            keycode = e.which;
        if (keycode == 122 || keycode == 116) {
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
	}
}

/* Responsável por varrer o tabuleiro inimigo e armazenar os valores para um possível f5 */

function varreTab(){
    if (window.localStorage.getItem('partida') != 0){
        var varre = function() {
            var string = "";
            for (i=1; i<=26; i++) {
                string += $('#ontab'+i).val() + ' ,';
            }
            window.localStorage.setItem('refresh',string);
            window.localStorage.setItem('oponenteIlha', $('#ontesouro').val());
            varreTab();
        }
        setTimeout(varre, 500);
    }
}

/* Função responsável por zerar os cookies */

function zeraCookie() {
    var string = "";
    for (i=0; i<26; i++)
        string += ' ,';
    window.localStorage.setItem('refresh', string);
    window.localStorage.setItem('oponenteIlha', "");
    window.localStorage.setItem('firstTime', "false");
    window.localStorage.setItem('count', 0);
    window.localStorage.setItem('rep', "");
    window.localStorage.setItem('repOpo', "");
    window.localStorage.setItem('escolha', "");
    window.localStorage.setItem('oponenteNum', "");
    window.localStorage.setItem('escolhaBin', "");
}

/* Função responsável pela ida à partida 2 */

function goPartida() {

    if (window.localStorage.getItem('partida') == 0)
        var string = "<b>desistir</b>?";
    else
        var string = "ir para a próxima partida?<br>É aconselhável ir <b>SOMENTE</b> se a partida anterior terminou!";

    $('.modal-title').html("<center>Atenção</center>");
    $('.modalText').html("Você tem certeza que deseja "+string);
    $('.modal-footer').html("<button type='button' class='btn btn-success btOk' id = 'btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>"+
                            "<button type='button' class='btn btn-danger btNo' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span> Voltar</button>");
    $('#btOk').click(go);
    $('#modal').modal('show');
}

$('.goPartida').click(goPartida);

function go() {
    var partida = window.localStorage.getItem('partida');

    if (partida == 2){
        window.localStorage.setItem('partida', 3);
    }
    else
        if (partida == 3){
            window.localStorage.setItem('partida', 0);
        }
        else
            if (partida == 0)
                location.href = "indexDesktop.html";
            else {
                window.localStorage.setItem('partida', 2);
            }
    location.href = "indexDesktop.html";
}

/* Responsável por habilitar o botão jogar quando as 3 partidas de aula acabarem */

function testJogar(){

    if(window.localStorage.getItem('partida') == 0)
        $('#btMain').removeAttr('disabled');
}

/* Responsável por reinicar a aula caso o jogar esteja habilitado */

function aula(){

    if (window.localStorage.getItem('partida') == 0)
        window.localStorage.setItem('partida', 1);
    location.href = 'jogarDesktop.html';
}

/* Função responsável por fazer o palpite */

function palpite() {
    var ilha = $.minhaIlha;
    var rep = window.localStorage.getItem('rep');

    if (ilha == undefined) {
        $('.modal-title').html("<center>Atenção</center>");
        $('.modalText').html("Você precisa escolher uma ilha antes de clicar em Palpite!");
        $('.modal-footer').html("<button type='button' class='btn btn-success btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
        $('#modal').modal('show');
    }
    else
        if (haveElement(ilha, rep)){
            $('.modal-title').html("<center>Atenção</center>");
            $('.modalText').html("Você já escolheu essa ilha! Selecione outra ilha antes de clicar em Palpite!");
            $('.modal-footer').html("<button type='button' class='btn btn-success btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
            $('#modal').modal('show');
        }
        else {
            rep += ilha +',';
            window.localStorage.setItem('rep', rep);
            window.localStorage.setItem('count', parseInt(window.localStorage.getItem('count'))+1);
            var opoIlha = window.localStorage.getItem('oponenteIlha');
            //alert(opoIlha + " " + ilha);
            if (opoIlha == ilha){
                $('.modal-title').css('color', "#3EC53E");
                $('.modal-title').html("<center><b>Você ganhou!</b></center>");
                $('.modalText').html("Você descobriu onde estava meu tesouro, na ilha <b>"+$('#oltab'+opoIlha).val()+"</b>.<br>Você precisou de <b>"+window.localStorage.getItem('count')+"</b> palpites.");
                $('.modal-footer').html("<button type='button' class='btn btn-success btOk' id = 'btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
                $('#btOk').click(go);
                $('#modal').modal('show');
            }
            else {
                var numIlha = window.localStorage.getItem('tabOpo').split(',')[ilha-1];
                $('.modal-title').html("<center>Você errou!</center>");
                $('.modalText').html("HAHAHA, você errou a localização do meu tesouro. O número da ilha <b>"+$('#oltab'+ilha).val()+"</b> é <b>"+numIlha+"</b>.");
                $('.modal-footer').html("<button type='button' class='btn btn-success btOk' id = 'btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
                $('#btOk').click(barbaCinza);
                var string = "";
                var ref = window.localStorage.getItem('refresh').split(',');
                for (i=0; i<ilha-1; i++)
                    string += ref[i] + ',';
                string += numIlha + ' ,';
                for(i=ilha; i<26; i++)
                    string += ref[i] + ',';
                window.localStorage.setItem('refresh', string);
                $('#modal').modal('show');
            }
        }
}

function barbaCinza(){
    var binario = window.localStorage.getItem('binario');

    if (binario != "true") {
        var repOpo = window.localStorage.getItem('repOpo');
        var escolha = Math.random() * 25 | 0;
        while (haveElement(escolha, repOpo))
            escolha = Math.random() * 25 | 0;
        window.localStorage.setItem('escolha', escolha+1);
        repOpo += escolha + ',';
        window.localStorage.setItem('repOpo', repOpo);
        $('.modalText').html("É a minha vez de encontrar seu tesouro!<br>Eu acho que ele está na ilha de letra <b>"+$('#oltab'+(escolha+1)).val()+"</b>.");
    }
    else{
        var tabBin = window.localStorage.getItem("tabBinario").split(',');
        var tabBinLen = tabBin.length - 1;
        var escolha = tabBinLen / 2 | 0;
        if (tabBinLen % 2 == 0)
            escolha -= Math.random() * 2 | 0;
        window.localStorage.setItem('escolhaBin', escolha);
        window.localStorage.setItem('escolha', parseInt(tabBin[escolha])+1);
        $('.modalText').html("É a minha vez de encontrar seu tesouro!<br>Eu acho que ele está na ilha de letra <b>"+$('#oltab'+(parseInt(tabBin[escolha])+1)).val()+"</b>.");
    }
    $('.modal-title').html("<center><b>Minha vez!</b></center>");
    $('.modal-footer').html("<button type='button' class='btn btn-success btOk' id = 'btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
    $('#btOk').click(resultadoBarbaCinza);
    $('#modal').modal('show');
}

function resultadoBarbaCinza(){
    var escolha = window.localStorage.getItem('escolha');
    var minhaIlha = window.localStorage.getItem('minhaIlha');
    var binario = window.localStorage.getItem('binario');
    //alert(minhaIlha + " " + escolha);

    if (escolha == minhaIlha){
        $('.modal-title').css('color', "#c9302c");
        $('.modal-title').html("<center><b>Você Perdeu!</b></center>");
        $('.modalText').html("Você não é capaz de derrotar o grande Barba Cinza, HAHAHA! Eu encontrei o seu tesouro, ele estava na ilha de letra <b>"+$('#oltab'+escolha).val()+"</b>. Eu precisei de <b>"+window.localStorage.getItem('count')+"</b> palpites.");
        $('.modal-footer').html("<button type='button' class='btn btn-success btOk' id = 'btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
        $('#btOk').click(go);
        $('#modal').modal('show');
    }
    else {
        if (binario == "true") {
            var tabBin = window.localStorage.getItem("tabBinario").split(',');
            var escolhaBin = window.localStorage.getItem("escolhaBin");
            var tabBinString = "";
            //alert(escolha + " " + minhaIlha);
            if (parseInt(escolha) > parseInt(minhaIlha))
                for (i=0; i<parseInt(escolhaBin); i++)
                    tabBinString += tabBin[i] + ',';
            else
                for (i=parseInt(escolhaBin)+1; i<tabBin.length-1; i++)
                    tabBinString += tabBin[i] + ',';

            //alert(tabBinString);
            window.localStorage.setItem('tabBinario', tabBinString);
        }
        $('.modal-title').html("<center><b>Eu errei!</b></center>");
        $('.modalText').html("Sorte sua que eu errei! Então o número da ilha de letra <b>"+$('#oltab'+escolha).val()+"</b> é <b>"+window.localStorage.getItem('meuTab').split(',')[escolha-1]+"</b>.<br>Vamos ver por quanto tempo sua sorte continua!");
        $('.modal-footer').html("<button type='button' class='btn btn-success btOk' id = 'btOk' data-dismiss='modal'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span> Ok</button>")
        $('#btOk').click(f5);
        $('#modal').modal('show');
    }
}

function haveElement(element, vector)
{
    if (vector != null && vector != 'null')
    {   var aux = vector.split(',');
        for (i=0; i<aux.length; i++)
            if (aux[i] == element.toString())
                return true;
    }

    return false;
}

function f5(){
    location.reload();
}

function goBinario() {
    window.localStorage.setItem("binario", "true");
    location.href = "escolhaDesktop.html";
}

function goJogar() {
    window.localStorage.setItem("partida", 0);
    location.href = "jogarDesktop.html";
}
