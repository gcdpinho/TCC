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

    /* Alteração nas ilhas */
    var lleft = 1.8, ileft = 0, nleft = 0.3;

    var partida = window.localStorage.getItem('partida');
    var binario = window.localStorage.getItem('binario');
    var hash = window.localStorage.getItem('hash');

    if (hash == "true")
        $('.tab').css('height', $(window).height()/1.8);
    else
        $('.tab').css('height', $(window).height()/3);

    if (binario != "true") {
        if (hash != "true") {
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
            $('.title').text("Modo Hashing");
            $('.tab').css('margin-top', "0%");
            $('.btSelec').css('margin-top', "40%");

            if (partida == 2)
                var tab = "930,281,551,751,771,2,622,672,692,503,533,294,314,614,924,75,925,986,377,467,88,478,818,828,259,319".split(',');
            else
                if (partida == 3)
                    var tab = "70,360,151,301,861,112,422,432,842,283,293,254,944,145,225,515,705,116,626,636,706,807,698,748,599,969".split(',');
                else
                    if (partida == 0){
                        var tab = geraHash().split(',');
                        window.localStorage.setItem('opoTab', geraHash());
                    }
                    else
                        var tab = "140,740,960,1,701,821,861,442,223,154,684,964,695,895,975,456,646,766,976,547,847,118,128,358,988,629".split(',');
        }
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
    if (hash != "true")
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
    else {
        var tabString = "";
        var table = document.getElementById('table');

        var thead = document.createElement("thead");

        thead.innerHTML = [
                  '<tr>',
                    '<th><center>0</center></th>',
                    '<th><center>1</center></th>',
                    '<th><center>2</center></th>',
                    '<th><center>3</center></th>',
                    '<th><center>4</center></th>',
                    '<th><center>5</center></th>',
                    '<th><center>6</center></th>',
                    '<th><center>7</center></th>',
                    '<th><center>8</center></th>',
                    '<th><center>9</center></th>',
                  '</tr>',
        ].join("\n");

        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var tds = [];
        var count = 0, coluna = 0;
        var top = 0, left = 4;
        tds[coluna] = document.createElement("td");

        for (i=0; i<26; i++){
            if (tab[i] % 10 == coluna) {
                var ltab = document.createElement("input");
                ltab.name = "ltab"+(count+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = geraLetra(count+1);
                ltab.readOnly = true;
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.position = "absolute"
                ltab.style.background = "transparent";
                ltab.style.border = "none";
                ltab.style.color = "black";
                tds[coluna].appendChild(ltab);
                top += 2.3;

                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = "itab"+(count+1);
                img.style.width = "5%";
                img.style.marginLeft = "2%";
                img.style.marginTop = top + '%';
                img.onclick = geraScript(count+1);
                img.style.position = "absolute";
                tds[coluna].appendChild(img);
                top += 4.5;

                var ntab = document.createElement("input");
                ntab.name = 'ntab'+(count+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = tab[i];
                ntab.readOnly = true;
                ntab.style.width = "4%";
                ntab.style.marginLeft = "2.3%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                tds[coluna].appendChild(ntab);

                tabString += tab[i]+',';

                top += 3.2;

                count++;
            }
            else {
                coluna ++;
                tds[coluna] = document.createElement("td");
                top = 0;
                i--;
            }
        }

        if (coluna == 8)
            tds[9] = document.createElement("td");

            for (i=0; i<10; i++) {
                tr.appendChild(tds[i]);
            }

        tbody.appendChild(tr);
        table.appendChild(tbody);

    }
    window.localStorage.setItem('meuTab', tabString);

    $('.jogo').css('display', 'block');
}

function geraHash(){
    var vetNum = geraNumRand();
    var vet0 = [], vet1 = [], vet2 = [], vet3 = [], vet4 = [], vet5 = [], vet6 = [], vet7 = [], vet8 = [], vet9 = [];
    var i0 = 0, i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0, i8 = 0, i9 = 0;
    var i = 0, count = 0;
    var regra;

    while (count < 26) {
        regra = vetNum[i] % 10;
        switch (regra) {
            case 0:
                if (i0 < 4) {
                vet0[i0] = vetNum[i];
                i0++;
                count++;
                }
                i++;
            break;
            case 1:
                if (i1 < 4) {
                vet1[i1] = vetNum[i];
                i1++;
                count++;
                }
                i++;
            break;
            case 2:
                if (i2 < 4) {
                vet2[i2] = vetNum[i];
                i2++;
                count++;
                }
                i++;
            break;
            case 3:
                if (i3 < 4) {
                vet3[i3] = vetNum[i];
                i3++;
                count++;
                }
                i++;
            break;
            case 4:
                if (i4 < 4) {
                vet4[i4] = vetNum[i];
                i4++;
                count++;
                }
                i++;
            break;
            case 5:
                if (i5 < 4) {
                vet5[i5] = vetNum[i];
                i5++;
                count++;
                }
                i++;
            break;
            case 6:
                if (i6 < 4) {
                vet6[i6] = vetNum[i];
                i6++;
                count++;
                }
                i++;
            break;
            case 7:
                if (i7 < 4) {
                vet7[i7] = vetNum[i];
                i7++;
                count++;
                }
                i++;
            break;
            case 8:
                if (i8 < 4) {
                vet8[i8] = vetNum[i];
                i8++;
                count++;
                }
                i++;
            break;
            case 9:
                if (i9 < 4) {
                vet9[i9] = vetNum[i];
                i9++;
                count++;
                }
                i++;
            break;
        }
    }
    var tabString = "";

    for (i=0; i<vet0.length; i++)
        tabString += vet0[i] + ',';
    for (i=0; i<vet1.length; i++)
        tabString += vet1[i] + ',';
    for (i=0; i<vet2.length; i++)
        tabString += vet2[i] + ',';
    for (i=0; i<vet3.length; i++)
        tabString += vet3[i] + ',';
    for (i=0; i<vet4.length; i++)
        tabString += vet4[i] + ',';
    for (i=0; i<vet5.length; i++)
        tabString += vet5[i] + ',';
    for (i=0; i<vet6.length; i++)
        tabString += vet6[i] + ',';
    for (i=0; i<vet7.length; i++)
        tabString += vet7[i] + ',';
    for (i=0; i<vet8.length; i++)
        tabString += vet8[i] + ',';
    for (i=0; i<vet9.length; i++)
        tabString += vet9[i] + ',';

    return tabString.substring(0, tabString.length-1);
}

function geraScript(count)
{
    switch (count)
    {   case 1:
        case '1':
            return teste1;
            break;
        case 2:
        case '2':
            return teste2;
            break;
        case 3:
        case '3':
            return teste3;
            break;
        case 4:
        case '4':
            return teste4;
            break;
        case 5:
        case '5':
            return teste5;
            break;
        case 6:
        case '6':
            return teste6;
            break;
        case 7:
        case '7':
            return teste7;
            break;
        case 8:
        case '8':
            return teste8;
            break;
        case 9:
        case '9':
            return teste9;
            break;
        case 10:
        case '10':
            return teste10;
            break;
        case 11:
        case '11':
            return teste11;
            break;
        case 12:
        case '12':
            return teste12;
            break;
        case 13:
        case '13':
            return teste13;
            break;
        case 14:
        case '14':
            return teste14;
            break;
        case 15:
        case '15':
            return teste15;
            break;
        case 16:
        case '16':
            return teste16;
            break;
        case 17:
        case '17':
            return teste17;
            break;
        case 18:
        case '18':
            return teste18;
            break;
        case 19:
        case '19':
            return teste19;
            break;
        case 20:
        case '20':
            return teste20;
            break;
        case 21:
        case '21':
            return teste21;
            break;
        case 22:
        case '22':
            return teste22;
            break;
        case 23:
        case '23':
            return teste23;
            break;
        case 24:
        case '24':
            return teste24;
            break;
        case 25:
        case '25':
            return teste25;
            break;
        case 26:
        case '26':
            return teste26;
            break;

    }
}

function teste1()
{
    escolheIlha(1);
}
function teste2()
{
    escolheIlha(2);
}
function teste3()
{
    escolheIlha(3);
}
function teste4()
{
    escolheIlha(4);
}
function teste5()
{
    escolheIlha(5);
}
function teste6()
{
    escolheIlha(6);
}
function teste7()
{
    escolheIlha(7);
}
function teste8()
{
    escolheIlha(8);
}
function teste9()
{
    escolheIlha(9);
}
function teste10()
{
    escolheIlha(10);
}
function teste11()
{
    escolheIlha(11);
}
function teste12()
{
    escolheIlha(12);
}
function teste13()
{
    escolheIlha(13);
}
function teste14()
{
    escolheIlha(14);
}
function teste15()
{
    escolheIlha(15);
}
function teste16()
{
    escolheIlha(16);
}
function teste17()
{
    escolheIlha(17);
}
function teste18()
{
    escolheIlha(18);
}
function teste19()
{
    escolheIlha(19);
}
function teste20()
{
    escolheIlha(20);
}
function teste21()
{
    escolheIlha(21);
}
function teste22()
{
    escolheIlha(22);
}
function teste23()
{
    escolheIlha(23);
}
function teste24()
{
    escolheIlha(24);
}
function teste25()
{
    escolheIlha(25);
}
function teste26()
{
    escolheIlha(26);
}

function geraLetra(num) {
    switch(num) {
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
        case 4:
            return "D";
        case 5:
            return "E";
        case 6:
            return "F";
        case 7:
            return "G";
        case 8:
            return "H";
        case 9:
            return "I";
        case 10:
            return "J";
        case 11:
            return "K";
        case 12:
            return "L";
        case 13:
            return "M";
        case 14:
            return "N";
        case 15:
            return "O";
        case 16:
            return "P";
        case 17:
            return "Q";
        case 18:
            return "R";
        case 19:
            return "S";
        case 20:
            return "T";
        case 21:
            return "U";
        case 22:
            return "V";
        case 23:
            return "W";
        case 24:
            return "X";
        case 25:
            return "Y";
        case 26:
            return "Z";
    }
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
        if (window.localStorage.getItem('hash') == "true")
            location.href = "modoHash.html";
        else
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

    var hash = window.localStorage.getItem('hash');

    if (hash == "true") {
        $('.tabuleiro').css('height', $(window).height()/1.8);
        $('.tabuleiroOponente').css('height', $(window).height()/1.8);
    }
    else {
        $('.tabuleiro').css('height', $(window).height()/4);
        $('.tabuleiroOponente').css('height', $(window).height()/4);
        $('.tabuleiro').css('border', "2px solid black");
        $('.tabuleiroOponente').css('border', "2px solid black");
    }

    var tab = window.localStorage.getItem('meuTab').split(',');
    var partida = window.localStorage.getItem('partida');
    var ref = window.localStorage.getItem('refresh').split(',');
    var binario = window.localStorage.getItem('binario');
    if (hash != "true") {
        var lleft = 1.8, ileft = 0, nleft = 0.3, top = 2;



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
    }
    else {
        var table = document.getElementById('myTab');

        var thead = document.createElement("thead");

        thead.innerHTML = [
                  '<tr>',
                    '<th><center>0</center></th>',
                    '<th><center>1</center></th>',
                    '<th><center>2</center></th>',
                    '<th><center>3</center></th>',
                    '<th><center>4</center></th>',
                    '<th><center>5</center></th>',
                    '<th><center>6</center></th>',
                    '<th><center>7</center></th>',
                    '<th><center>8</center></th>',
                    '<th><center>9</center></th>',
                  '</tr>',
        ].join("\n");

        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var tds = [];
        var count = 0, coluna = 0;
        var top = 0, left = 4;
        tds[coluna] = document.createElement("td");

        for (i=0; i<26; i++){
            if (tab[i] % 10 == coluna) {
                var ltab = document.createElement("input");
                ltab.name = "mltab"+(count+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = geraLetra(count+1);
                ltab.readOnly = true;
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.position = "absolute"
                ltab.style.background = "transparent";
                ltab.style.border = "none";
                ltab.style.color = "black";
                tds[coluna].appendChild(ltab);
                top += 3.5;

                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = "mitab"+(count+1);
                img.style.width = "6%";
                img.style.marginLeft = "2%";
                img.style.marginTop = top + '%';
                img.onclick = geraScript(count+1);
                img.style.position = "absolute";
                tds[coluna].appendChild(img);
                top += 5.5;

                var ntab = document.createElement("input");
                ntab.name = 'mntab'+(count+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = tab[i];
                ntab.readOnly = true;
                ntab.style.width = "5%";
                ntab.style.marginLeft = "2%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                tds[coluna].appendChild(ntab);

                top += 4;

                count++;
            }
            else {
                coluna ++;
                tds[coluna] = document.createElement("td");
                top = 0;
                i--;
            }
        }

        if (coluna == 8)
            tds[9] = document.createElement("td");

        for (i=0; i<10; i++) {
            tr.appendChild(tds[i]);
            $(tds[i]).css("padding-bottom", "57%");
        }

        tbody.appendChild(tr);
        table.appendChild(tbody);

        //oponente

        if (partida == 2)
            var opoTab = "20,240,740,371,701,901,182,702,812,613,873,24,34,54,125,285,415,845,406,907,18,118,568,698,219,249".split(',');
        else
            if (partida == 3)
                var opoTab = "730,770,201,252,272,632,922,113,663,713,214,274,344,834,115,745,696,327,707,937,58,568,219,509,609,629".split(',');
            else
                if (partida == 0)
                    var opoTab = window.localStorage.getItem('opoTab').split(',');
                else
                    var opoTab = "70,200,730,141,271,511,192,962,193,243,234,624,764,814,95,195,265,925,396,87,297,347,507,259,809,319".split(',');

        var table = document.getElementById('opoTab');

        var thead = document.createElement("thead");

        thead.innerHTML = [
                  '<tr>',
                    '<th><center>0</center></th>',
                    '<th><center>1</center></th>',
                    '<th><center>2</center></th>',
                    '<th><center>3</center></th>',
                    '<th><center>4</center></th>',
                    '<th><center>5</center></th>',
                    '<th><center>6</center></th>',
                    '<th><center>7</center></th>',
                    '<th><center>8</center></th>',
                    '<th><center>9</center></th>',
                  '</tr>',
        ].join("\n");

        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var tds = [];
        var count = 0, coluna = 0;
        var top = 0, left = 4;
        tds[coluna] = document.createElement("td");

        for (i=0; i<26; i++){
            if (opoTab[i] % 10 == coluna) {
                var ltab = document.createElement("input");
                ltab.name = "oltab"+(count+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = geraLetra(count+1);
                ltab.readOnly = true;
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.position = "absolute"
                ltab.style.background = "transparent";
                ltab.style.border = "none";
                ltab.style.color = "black";
                tds[coluna].appendChild(ltab);
                top += 3.5;

                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = "oitab"+(count+1);
                img.style.width = "6%";
                img.style.marginLeft = "2%";
                img.style.marginTop = top + '%';
                img.onclick = geraScript(count+1);
                img.style.position = "absolute";
                tds[coluna].appendChild(img);
                top += 5.5;

                var ntab = document.createElement("input");
                ntab.name = 'ontab'+(count+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = "";
                if (ref[i] != ' ')
                    ntab.value = ref[i].substring(0, ref[i].length-1);
                if (partida == 0)
                    ntab.readOnly = true;
                ntab.style.width = "5%";
                ntab.style.marginLeft = "2%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                tds[coluna].appendChild(ntab);

                top += 4;

                count++;
            }
            else {
                coluna ++;
                tds[coluna] = document.createElement("td");
                top = 0;
                i--;
            }
        }

        if (coluna == 8)
            tds[9] = document.createElement("td");


        for (i=0; i<10; i++) {
            tr.appendChild(tds[i]);
            $(tds[i]).css("padding-bottom", "57%");
        }

        tbody.appendChild(tr);
        table.appendChild(tbody);

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
                        if (hash != "true") {
                            var tabOpo = geraNumRand();
                            var tabOpoString = "";
                            for (i=0; i<26; i++)
                                tabOpoString += tabOpo[i] + ',';
                        }
                        else {
                            var tabOpoString = window.localStorage.getItem('opoTab');
                            var alvo = tab[minhaIlha-1] % 10;
                            var tabHash = "";
                            for (i=0; i<26; i++)
                                if (tab[i] % 10 == alvo)
                                    tabHash += i + ',';
                            window.localStorage.setItem('tabHash', tabHash);
                        }

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

function inicioJogo1(index) {
    $('body').css('background', 'url(img/azul5.jpg) no-repeat center top fixed');

    $('body').css('-webkit-background-size', "cover");
    $('body').css('-moz-background-size', "cover");
    $('body').css('-o-background-size', "cover");
    $('body').css('background-size', "cover");
    if (index == 0) {
        $('.tabuleiro').css('height', $(window).height()/4);
        $('.tabuleiro').css('border', "2px solid black");
        $('.tabuleiroOponente').css('height', $(window).height()/4);
        $('.tabuleiroOponente').css('border', "2px solid black");
    }
    else {
        $('.tabuleiro').css('height', $(window).height()/1.8);
        $('.tabuleiroOponente').css('height', $(window).height()/1.8);
    }



    var lleft = 1.8, ileft = 0, nleft = 0.3, top = 2;
    var tab = window.localStorage.getItem('meuTab').split(',');
    var ref = window.localStorage.getItem('refresh').split(',');

    if (index == 0) {
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
    }
    else {
        var partida = prompt("Digite o número da partida Hashuing", "");
        while (partida != 1 && partida != 2 && partida != 3)
            partida = prompt("Digite o número da partida Hashuing", "");


        if (partida == 1) {
            var opoTab = "140,740,960,1,701,821,861,442,223,154,684,964,695,895,975,456,646,766,976,547,847,118,128,358,988,629".split(',');
            var tab = "70,200,730,141,271,511,192,962,193,243,234,624,764,814,95,195,265,925,396,87,297,347,507,259,809,319".split(',');
        }
        else
            if (partida == 2) {
                var opoTab = "930,281,551,751,771,2,622,672,692,503,533,294,314,614,924,75,925,986,377,467,88,478,818,828,259,319".split(',');
                var tab = "20,240,740,371,701,901,182,702,812,613,873,24,34,54,125,285,415,845,406,907,18,118,568,698,219,249".split(',');
            }
            else
                if (partida == 3) {
                    var opoTab = "70,360,151,301,861,112,422,432,842,283,293,254,944,145,225,515,705,116,626,636,706,807,698,748,599,969".split(',');
                    var tab = "730,770,201,252,272,632,922,113,663,713,214,274,344,834,115,745,696,327,707,937,58,568,219,509,609,629".split(',');
                }

            var table = document.getElementById('myTab');

            var thead = document.createElement("thead");

            thead.innerHTML = [
                      '<tr>',
                        '<th><center>0</center></th>',
                        '<th><center>1</center></th>',
                        '<th><center>2</center></th>',
                        '<th><center>3</center></th>',
                        '<th><center>4</center></th>',
                        '<th><center>5</center></th>',
                        '<th><center>6</center></th>',
                        '<th><center>7</center></th>',
                        '<th><center>8</center></th>',
                        '<th><center>9</center></th>',
                      '</tr>',
            ].join("\n");

            table.appendChild(thead);

            var tbody = document.createElement("tbody");
            var tr = document.createElement("tr");
            var tds = [];
            var count = 0, coluna = 0;
            var top = 0, left = 4;
            tds[coluna] = document.createElement("td");

            for (i=0; i<26; i++){
                if (tab[i] % 10 == coluna) {
                    var ltab = document.createElement("input");
                    ltab.name = "mltab"+(count+1);
                    ltab.id = ltab.name;
                    ltab.type = "text";
                    ltab.value = geraLetra(count+1);
                    ltab.readOnly = true;
                    ltab.style.width = "3%";
                    ltab.style.marginLeft = left + '%';
                    ltab.style.marginTop = top + '%';
                    ltab.style.position = "absolute"
                    ltab.style.background = "transparent";
                    ltab.style.border = "none";
                    ltab.style.color = "black";
                    tds[coluna].appendChild(ltab);
                    top += 3.5;

                    var img = document.createElement("img");
                    img.src = "img/ilha.png";
                    img.id = "mitab"+(count+1);
                    img.style.width = "6%";
                    img.style.marginLeft = "2%";
                    img.style.marginTop = top + '%';
                    img.onclick = geraScript(count+1);
                    img.style.position = "absolute";
                    tds[coluna].appendChild(img);
                    top += 5.5;

                    var ntab = document.createElement("input");
                    ntab.name = 'mntab'+(count+1);
                    ntab.id = ntab.name;
                    ntab.type = "text";
                    ntab.value = "";
                    ntab.readOnly = true;
                    ntab.style.width = "5%";
                    ntab.style.marginLeft = "2%";
                    ntab.style.marginTop = top + '%';
                    ntab.style.position = "absolute";
                    tds[coluna].appendChild(ntab);

                    top += 4;

                    count++;
                }
                else {
                    coluna ++;
                    tds[coluna] = document.createElement("td");
                    top = 0;
                    i--;
                }
            }

            if (coluna == 8)
                tds[9] = document.createElement("td");

            for (i=0; i<10; i++) {
                tr.appendChild(tds[i]);
                $(tds[i]).css("padding-bottom", "57%");
            }

            tbody.appendChild(tr);
            table.appendChild(tbody);

            var table = document.getElementById('opoTab');

            var thead = document.createElement("thead");

            thead.innerHTML = [
                      '<tr>',
                        '<th><center>0</center></th>',
                        '<th><center>1</center></th>',
                        '<th><center>2</center></th>',
                        '<th><center>3</center></th>',
                        '<th><center>4</center></th>',
                        '<th><center>5</center></th>',
                        '<th><center>6</center></th>',
                        '<th><center>7</center></th>',
                        '<th><center>8</center></th>',
                        '<th><center>9</center></th>',
                      '</tr>',
            ].join("\n");

            table.appendChild(thead);

            var tbody = document.createElement("tbody");
            var tr = document.createElement("tr");
            var tds = [];
            var count = 0, coluna = 0;
            var top = 0, left = 4;
            tds[coluna] = document.createElement("td");

            for (i=0; i<26; i++){
                if (opoTab[i] % 10 == coluna) {
                    var ltab = document.createElement("input");
                    ltab.name = "oltab"+(count+1);
                    ltab.id = ltab.name;
                    ltab.type = "text";
                    ltab.value = geraLetra(count+1);
                    ltab.readOnly = true;
                    ltab.style.width = "3%";
                    ltab.style.marginLeft = left + '%';
                    ltab.style.marginTop = top + '%';
                    ltab.style.position = "absolute"
                    ltab.style.background = "transparent";
                    ltab.style.border = "none";
                    ltab.style.color = "black";
                    tds[coluna].appendChild(ltab);
                    top += 3.5;

                    var img = document.createElement("img");
                    img.src = "img/ilha.png";
                    img.id = "oitab"+(count+1);
                    img.style.width = "6%";
                    img.style.marginLeft = "2%";
                    img.style.marginTop = top + '%';
                    img.onclick = geraScript(count+1);
                    img.style.position = "absolute";
                    tds[coluna].appendChild(img);
                    top += 5.5;

                    var ntab = document.createElement("input");
                    ntab.name = 'ontab'+(count+1);
                    ntab.id = ntab.name;
                    ntab.type = "text";
                    ntab.value = "";
                    if (partida == 0)
                        ntab.readOnly = true;
                    ntab.style.width = "5%";
                    ntab.style.marginLeft = "2%";
                    ntab.style.marginTop = top + '%';
                    ntab.style.position = "absolute";
                    tds[coluna].appendChild(ntab);

                    top += 4;

                    count++;
                }
                else {
                    coluna ++;
                    tds[coluna] = document.createElement("td");
                    top = 0;
                    i--;
                }
            }

            if (coluna == 8)
                tds[9] = document.createElement("td");


            for (i=0; i<10; i++) {
                tr.appendChild(tds[i]);
                $(tds[i]).css("padding-bottom", "57%");
            }

            tbody.appendChild(tr);
            table.appendChild(tbody);

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
    var hash = window.localStorage.getItem('hash');

    if (binario != "true") {
        if (hash != "true") {
            var repOpo = window.localStorage.getItem('repOpo');
            var escolha = Math.random() * 25 | 0;
            while (haveElement(escolha, repOpo))
                escolha = Math.random() * 25 | 0;
            window.localStorage.setItem('escolha', escolha+1);
            repOpo += escolha + ',';
            window.localStorage.setItem('repOpo', repOpo);
            $('.modalText').html("É a minha vez de encontrar seu tesouro!<br>Eu acho que ele está na ilha de letra <b>"+$('#oltab'+(escolha+1)).val()+"</b>.");
        }
        else {
            var tabHash = window.localStorage.getItem("tabHash").split(',');
            var escolha = Math.random() * tabHash.length-1 | 0;
            window.localStorage.setItem('escolhaHash', escolha);
            window.localStorage.setItem('escolha', parseInt(tabHash[escolha])+1);
            $('.modalText').html("É a minha vez de encontrar seu tesouro!<br>Eu acho que ele está na ilha de letra <b>"+$('#oltab'+(parseInt(tabHash[escolha])+1)).val()+"</b>.");
        }
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
    var hash = window.localStorage.getItem('hash');
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
        else
            if (hash == "true") {
                var tabHash = window.localStorage.getItem('tabHash').split(',');
                var escolhaHash = window.localStorage.getItem('escolhaHash');
                var tabHashString = "";

                for (i=0; i<parseInt(escolhaHash); i++)
                    tabHashString += tabHash[i] + ',';
                for (i=parseInt(escolhaHash)+1; i<tabHash.length; i++)
                    tabHashString += tabHash[i] + ',';

                window.localStorage.setItem('tabHash', tabHashString.substring(0, tabHashString.length-1));
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

function goHash() {
    window.localStorage.setItem("hash", "true");
    location.href = "escolhaDesktopHash.html";
}

function zerarModo() {
    window.localStorage.setItem("binario", "false");
    window.localStorage.setItem("hash", "false");
}
