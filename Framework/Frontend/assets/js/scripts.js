// comando que salva em variavel
//window.localStorage.setItem('teste', 'peru');

// bluetooth

function envioEscolhaHashBluetooth(valor)
{
    var object = document.getElementById('name3').value;
    window.localStorage.setItem('name', object);

    if (valor == 1)
        location.href = "escolhahashBluetooth2.html";
    else
        location.href = "escolhahashBluetooth1.html";
}

function tratamentoBluetooth(mod){
    var pop = document.getElementById('pop');
    switch(mod){
        case 0:
            bluetoothSerial.isConnected(function(){
                bluetoothSerial.write("perdeu", function(){
                    pop.style.display = 'none';
                    location.href = "partidaBluetooth.html";
                }, function(error){
                    alert(JSON.stringify(error));
                });
            }, function(error){
                alert("Você foi desconectado!");
                location.href = "index.html";
            });
            break;
        case 1:
            bluetoothSerial.isConnected(function(){
                bluetoothSerial.write("yourturn", function(){
                    pop.style.display = 'none';
                    //alert(window.localStorage.getItem('preencher'));
                    location.reload();
                }, function(error){
                    alert(JSON.stringify(error));
                });
            }, function (error){
                alert("Você foi desconectado!");
                location.href = "index.html";
            });
            break;
        case -1:
            pop.style.display = 'none'
            location.href = "partidaBluetooth.html";
            break;
    }
}

function palpiteBluetooth(){

    var rep = window.localStorage.getItem('rep');

    if (rep == null || rep == 'null')
        rep = "";

    var letra = window.localStorage.getItem('jogoLetra');
    var aux = letraNum(letra);
    //alert(letra+','+aux);
    if (!haveElement(aux, rep)){
        bluetoothSerial.isConnected(function(){
            bluetoothSerial.write("palpite:"+letra, function(){
                rep += aux + ',';
                window.localStorage.setItem('rep', rep);
                //alert("palpite:"+letra);
            }, function (error){
                alert(JSON.stringify(error));
            });
        }, function(error){
            alert("Você foi desconectado!");
            location.href = "index.html";
        });
    }
    else
        alert("Você já escolheu esse antes, por favor palpite em uma ilha que não se sabe o seu número.")

}

function myTurn(){
    if (window.localStorage.getItem('myTurn') == "true")
        document.getElementById('botaoPalpite').disabled = false;
}

function envioTempoBluetooth(i)
{
    var tempo = document.contador.segundos.value;
    var tempoaux = tempo.split(":");
    window.localStorage.setItem('tempo', tempoaux[1]);

    if (i > 30)
        location.href = 'partidahashBluetooth'+(i-30)+'.html';
    else
        location.href = 'partidaBluetooth1e2-'+i+'.html';
}

function zerarBluetooth(){
    bluetooth.isConnected(function(){
        bluetoothSerial.write("zerar", function(){
            location.href = "partidaBluetooth.html";
        }, function(erro){
            alert(JSON.stringify(error));
        });
    }, function (error){
        alert("Você foi desconectado!");
        location.href = "index.html";
    });

}

function desistir(){
    bluetooth.isConnected(function(){
        bluetoothSerial.write("desistir", function(){
            location.href = "partidaBluetooth.html";
        }, function(erro){
            alert(JSON.stringify(error));
        });
    }, function (error){
        alert("Você foi desconectado!");
        location.href = "index.html";
    });
}


function newJogoBluetooth(i)
{
    window.localStorage.setItem('tempo', null);
    //window.localStorage.setItem('ilhaOpo', null);
    var name = document.getElementById('name'+i).value;
    if (name != "")
    {   window.localStorage.setItem('name', name);
        var ilha = window.localStorage.getItem('ilhaLetra');
        if ( ilha != 'null')
        {   var ilhaOpo = window.localStorage.getItem('ilhaOpo');
            //alert(ilhaOpo);
            bluetoothSerial.isConnected(function(){
                if (i != 3){
                    bluetoothSerial.write("escolha:"+window.localStorage.getItem('ilhaNum'), function(){
                        if (ilhaOpo != null && ilhaOpo != 'null' && ilhaOpo != "null"){
                            location.href = "partidaBluetooth1e2-1.html";
                        }
                        else {
                            document.getElementById('botaoSelecionar').disabled = true;
                            document.getElementById('back').onclick = "";
                            document.getElementById('prox').onclick = "";
                            var pop = document.getElementById('pop');
                            pop.innerHTML = [
                              '<br>',
                              '<br>',
                              '<center><h>Aguardando seu oponente esconder seu tesouro.</h></center>',
                            ].join('\n');
                            pop.style.display='block';

                        }
                    }, function(error){
                        alert(JSON.stringify(error));
                    });
                }
                else {
                    bluetoothSerial.write("hescolha:"+window.localStorage.getItem('ilhaNum')+":hash:"+window.localStorage.getItem('hash'), function(){
                        if (ilhaOpo != null && ilhaOpo != 'null' && ilhaOpo != "null"){
                            location.href = "partidahashBluetooth1.html";
                        }
                        else {
                            document.getElementById('botaoSelecionar').disabled = true;
                            document.getElementById('back').onclick = "";
                            document.getElementById('prox').onclick = "";
                            var pop = document.getElementById('pop');
                            pop.innerHTML = [
                              '<br>',
                              '<br>',
                              '<center><h>Aguardando seu oponente esconder seu tesouro.</h></center>',
                            ].join('\n');
                            pop.style.display='block';

                        }
                    }, function(error){
                        alert(JSON.stringify(error));
                    });
                }
            }, function(error){
                alert("Você foi desconectado!");
                location.href = "index.html";
            });
        }
    }
}

function desconectar(){
    bluetoothSerial.write("desconectar", function(){
        bluetoothSerial.disconnect(function(){
            location.href = "index.html";

        }, function(error){
            alert(JSON.stringify(error));
        });

    }, function(error){
        alert(JSON.stringify(error));
    });


}

function envioEscolhaBluetooth(valor)
{
    var object = document.getElementById('name'+valor).value;
    window.localStorage.setItem('name', object);

    if (valor == 1)
        location.href = "escolhaBluetooth2.html";
    else
        location.href = "escolhaBluetooth1.html";
}

function jogarBluetooth(num){

    window.localStorage.setItem('ilhaOpo', null);
    bluetoothSerial.isConnected(function(){

        window.localStorage.setItem('sendMessage', num);
        geraTabBluetooth(num);

        var rMessage = window.localStorage.getItem('reciveMessage');
        if (rMessage == null || rMessage == "null" || rMessage == 'null'){
            bluetoothSerial.write(num.toString(), function(){}, function(error){
                alert(JSON.stringify(error));
            });
        }
        else
            if (rMessage == num.toString()){
                bluetoothSerial.write("iguais", function(){
                    if (num != 3)
                        location.href = "escolhaBluetooth1.html";
                    else
                        location.href = "escolhahashBluetooth1.html";
                }, function(error){
                    alert(JSON.stringify(error));
                });
            }

    }, function(error){
        alert("Você foi desconectado!");
        location.href = "index.html";
    });
}

function geraTabBluetooth(num){
    window.localStorage.setItem('ilhaLetra', null);
    window.localStorage.setItem('ilhaNum', null);
    window.localStorage.setItem('name', "");
    window.localStorage.setItem('modoBin', null);

    var arr = geraTabuleiro();
    var arraux = [];
    var string = "", i, j;
    var arrMod = [];

    for (i=0; i<10; i++)
        arrMod[i] = 0;

    for (i=0; i<26; i++)
    {   arraux[i] = arr[i];
    }

    switch (num)
    {   case 1:
            for (i=0; i<26; i++)
            {   string += arraux[i] + ',';
            }
            break;
        case 2:
            window.localStorage.setItem('modoBin', 2);
            arraux.sort(function(a, b){return a-b});
            for (i=0; i<26; i++)
            {   string += arraux[i] + ',';
            }
            break;
        case 3:
            window.localStorage.setItem('modoBin', 3);
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

            window.localStorage.setItem('hash', stringMod);
            break;
    }

    window.localStorage.setItem('tabuleiro', string);

}

// fim_bluetooth

function desativaVoltar()
{
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady()
{
    document.addEventListener("backbutton", function (e)
    {
        e.preventDefault();
    }, false );
}

function getNome()
{
    var barra = document.getElementById("barraSuperior");
    var nome = document.createElement("h3");

    nome.innerText = window.localStorage.getItem("name");
    nome.style.color = "black";
    nome.style.marginLeft = "70%";
    nome.style.marginTop = "-10%";
    nome.style.fontSize = "140%";

    barra.appendChild(nome);
}


// troca imagem do autofalante
function changeSrc(id)
{
    var imagem = document.getElementById(id);

    if(imagem.alt == "on")
    {   imagem.src = "img/autoFalanteOff.png";
        imagem.alt = "off";
    }
    else
    {   imagem.src = "img/autoFalanteOn.png";
        imagem.alt = "on";
    }
}

// botão jogar enable
function changeButtonJogar()
{
    location.href = "index.html?object=true";
}

// função auxiliar, que verifica se ja foi conectado
function testaJogar()
{
    var url = window.location.href;
    var params = urlDecode(url.substring(url.indexOf("?")+1));

    if (params['object'] == 'true')
        document.getElementById("jogar").disabled = false;
}

// ir para a página jogar
function goJogar()
{
    location.href = "jogar.html";
}

function choiceIlha()
{
    var arr = window.localStorage.getItem('tabOpo');
    var straux = arr.split(',');
    var n = straux.length;
    var choice = Math.random() * (n-1) | 0;
    if (choice >= 26)
        choice = Math.random() * (n-1) | 0;
    var teste = letraOpo(choice);
    window.localStorage.setItem('letraOpo', teste);


    return straux[choice];
}

function letraOpo(num)
{
    switch(num)
    {   case 0:
        case '0':
            return 'A';
        case 1:
        case '1':
            return 'B';
        case 2:
        case '2':
            return 'C';
        case 3:
        case '3':
            return 'D';
        case 4:
        case '4':
            return 'E';
        case 5:
        case '5':
            return 'F';
        case 6:
        case '6':
            return 'G';
        case 7:
        case '7':
            return 'H';
        case 8:
        case '8':
            return 'I';
        case 9:
        case '9':
            return 'J';
        case 10:
        case '10':
            return 'K';
        case 11:
        case '11':
            return 'L';
        case 12:
        case '12':
            return 'M';
        case 13:
        case '13':
            return 'N';
        case 14:
        case '14':
            return 'O';
        case 15:
        case '15':
            return 'P';
        case 16:
        case '16':
            return 'Q';
        case 17:
        case '17':
            return 'R';
        case 18:
        case '18':
            return 'S';
        case 19:
        case '19':
            return 'T';
        case 20:
        case '20':
            return 'U';
        case 21:
        case '21':
            return 'V';
        case 22:
        case '22':
            return 'W';
        case 23:
        case '23':
            return 'X';
        case 24:
        case '24':
            return 'Y';
        case 25:
        case '25':
            return 'Z';
        default:
            alert(num);
            break;
    }
}

// ir para escolha de nome e ilha parte 1
function goEscolha1(num)
{
    window.localStorage.setItem('ilhaLetra', null);
    window.localStorage.setItem('ilhaNum', null);
    window.localStorage.setItem('name', "");

    var arr = geraTabuleiro();
    var opo = geraTabuleiro();
    var arraux = [], arrOpoaux = [];
    var string = "", i, j, stringOpo = "";
    var arrMod = [];

    for (i=0; i<10; i++)
        arrMod[i] = 0;

    for (i=0; i<26; i++)
    {   arrOpoaux[i] = opo[i];
        arraux[i] = arr[i];
    }

    switch (num)
    {   case 1:
            for (i=0; i<26; i++)
            {   string += arraux[i] + ',';
                stringOpo += arrOpoaux[i] + ',';
            }
            break;
        case 2:
            window.localStorage.setItem('modoBin', 2);
            arraux.sort(function(a, b){return a-b});
            arrOpoaux.sort(function(a,b){return a-b});
            for (i=0; i<26; i++)
            {   string += arraux[i] + ',';
                stringOpo += arrOpoaux[i] + ',';
            }
            break;
        case 3:
            window.localStorage.setItem('modoBin', 3);
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

            window.localStorage.setItem('hash', stringMod);
            break;
    }

    window.localStorage.setItem('tabuleiro', string);
    window.localStorage.setItem('tabOpo', stringOpo);

    if (num == 3)
        geraTabHashOpo();

    window.localStorage.setItem('ilhaOpo', choiceIlha());

    if (num == 3)
        location.href = "escolhahash1.html";
    else
        location.href = "escolha1.html";
}

function geraTabHashOpo()
{
    var arr = geraTabuleiro();
    var opo = geraTabuleiro();
    var arraux = [], arrOpoaux = [];
    var string = "", i, j, stringOpo = "";
    var arrMod = [];

    for (i=0; i<10; i++)
        arrMod[i] = 0;

    for (i=0; i<26; i++)
    {   arrOpoaux[i] = opo[i];
        arraux[i] = arr[i];
    }

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

    window.localStorage.setItem('hashOpo', stringMod);
    window.localStorage.setItem('tabOpo', string);
}

// ir para escolha de nome e ilha parte 2
function envioEscolha(valor)
{
    var object = document.getElementById('name'+valor).value;
    window.localStorage.setItem('name', object);

    if (valor == 1)
        location.href = "escolha2.html";
    else
        location.href = "escolha1.html";
}

function envioEscolhaHash(valor)
{
    var object = document.getElementById('name3').value;
    window.localStorage.setItem('name', object);

    if (valor == 1)
        location.href = "escolhahash2.html";
    else
        location.href = "escolhahash1.html";
}

// envia o tempo para a outra pagina
function envioTempo(i)
{
    var tempo = document.contador.segundos.value;
    var tempoaux = tempo.split(":");
    window.localStorage.setItem('tempo', tempoaux[1]);

    if (i > 30)
        location.href = 'partidahash'+(i-30)+'.html';
    else
        location.href = 'partida1e2-'+i+'.html';
}

function zera()
{
    var string = "";

    for (i=0; i<26; i++)
        string += ' ,';

    window.localStorage.setItem('preencher', string);
    window.localStorage.setItem('repOpo', null);
    window.localStorage.setItem('rep', null);
    window.localStorage.setItem('modoBin', null);
    window.localStorage.setItem('novoTab', null);
    window.localStorage.setItem('ilhaOpo', null);
    window.localStorage.setItem('firstTime', null);
    window.localStorage.setItem('who', null);
    window.localStorage.setItem('myTurn', null);
    window.localStorage.setItem('sendMessage', null);
    window.localStorage.setItem('reciveMessage', null);
}

function preencher(i)
{
    var string = window.localStorage.getItem('preencher');
    var aux = string.split(',');

    if (aux.length > 0)
        if (i == 1)
            for (i=0 ; i<13; i++)
              document.getElementById('ontab'+(i+1)).value = aux[i];
        else
            for (i=0; i<13; i++)
              document.getElementById('ontab'+(i+1)).value = aux[i+13];
}

function preencherHash(j)
{
    var string = window.localStorage.getItem('preencher');
    var aux = string.split(',');

    if (aux.length > 0)
        for (i=0 ; i<26; i++)
          if(aux[i] != ' ')
          {   //alert(i +" "+aux[i]);
                if (document.getElementById('ntab'+(i+1)) != null)
                    document.getElementById('ntab'+(i+1)).value = aux[i];

                /*if (j == 1){
                    alert(document.getElementById('ntab'+(i+1)).value);
                    document.getElementById('ntab'+(i+1)).value = aux[i];
                }
                else{
                    alert(document.getElementById('ntab'+(i)).value);
                    document.getElementById('ntab'+(i)).value = aux[i];
                }
                */
          }

}

// recebe o tempo da pagina do lado
function recebeTempo(valor)
{
    var ilhaLetra = window.localStorage.getItem('ilhaLetra');
    var ilhaNum = window.localStorage.getItem('ilhaNum');
    //var opoLetra = window.localStorage.getItem('letraOpo');
    var opoLetra = "?";
    var opoNum = window.localStorage.getItem('ilhaOpo');


    document.getElementById('letra1').value = ilhaLetra;
    document.getElementById('num1').value = ilhaNum;
    document.getElementById('letra2').value = opoLetra;
    document.getElementById('num2').value = '  ' + opoNum;


    var string = window.localStorage.getItem('tabuleiro');
    var aux = string.split(','), i;

    if (valor == 1)
        for (i=0; i<13; i++)
            document.getElementById('ntab'+(i+1)).value = aux[i];
    else
        if (valor == 2)
            for (i=0; i<13; i++)
                document.getElementById('ntab'+(i+1)).value = aux[i+13];
        else
            if (valor == 31)
                geraHash(2);
            else
                if (valor == 32)
                    geraHash2(2);
                else
                    if (valor == 33)
                        geraHashOpo(3);
                    else
                        geraHashOpo2(3);


    var tempo = window.localStorage.getItem('tempo');

    if (tempo == "null")
        contagem_tempo(40);
    else
        if (tempo > 0)
            contagem_tempo(tempo-1);
        else
            document.contador.segundos.value = "00:00";
}

// gera tabuleiro aleatorio
function geraTabuleiro()
{
    var maximo = 999;
    var i, arr = [];
    var p, n, tmp;

    for (i = 0; i <= maximo; i++)
        arr[i] = i;

    for (p = arr.length; p;)
    {   n = Math.random() * p-- | 0;
        tmp = arr[n];
        arr[n] = arr[p];
        arr[p] = tmp;
    }

    return arr;
}

// funcao que seta o tempo para o inicio
function newJogo(i)
{
    window.localStorage.setItem('tempo', null);
    var name = document.getElementById('name'+i).value;
    if (name != "")
    {   window.localStorage.setItem('name', name);
        if (window.localStorage.getItem('ilhaLetra') != 'null')
        {   if (i == 3)
                location.href = "partidahash1.html";
            else
                location.href = "partida1e2-1.html";
        }
    }
}

function letraNum(letra)
{
    switch(letra)
    {   case 'A':
          return 0;
        case 'B':
          return 1;
        case 'C':
          return 2;
        case 'D':
          return 3;
        case 'E':
          return 4;
        case 'F':
          return 5;
        case 'G':
          return 6;
        case 'H':
          return 7;
        case 'I':
          return 8;
        case 'J':
          return 9;
        case 'K':
          return 10;
        case 'L':
          return 11;
        case 'M':
          return 12;
        case 'N':
          return 13;
        case 'O':
          return 14;
        case 'P':
          return 15;
        case 'Q':
          return 16;
        case 'R':
          return 17;
        case 'S':
          return 18;
        case 'T':
          return 19;
        case 'U':
          return 20;
        case 'V':
          return 21;
        case 'W':
          return 22;
        case 'X':
          return 23;
        case 'Y':
          return 24;
        case 'Z':
          return 25;
        default:
          alert('???');
          break;
    }
}

function palpite()
{
    var letra = window.localStorage.getItem('jogoLetra');
    var aux = letraNum(letra);
    var string = window.localStorage.getItem('tabOpo');
    var tabOpo = string.split(',');
    var rep = window.localStorage.getItem('rep');

    if (rep == null || rep == 'null')
        rep = "";

    if (!haveElement(aux, rep))
    {   if (tabOpo[aux] == window.localStorage.getItem('ilhaOpo'))
        {   pop.innerHTML = [
              '<br>',
              '<br>',
              '<center><h>Parabéns, você acertou onde estava meu tesouro! Escondi ele na ilha <b>' + window.localStorage.getItem('letraOpo') + '</b>.</h></center>',
              "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega(-10)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
            ].join('\n');
            pop.style.display='block';
            var novaString = "";
            var auxPreencher = window.localStorage.getItem('preencher');
            var testeAux = auxPreencher.split(',');
            for (i=0; i<aux; i++)
                  novaString += testeAux[i]+ ',';
            novaString += tabOpo[aux];
            for (i=aux; i<26; i++)
                novaString += testeAux[i] + ',';
            window.localStorage.setItem('preencher', novaString);

        }
        else
        {   var novaString = "";
            var auxPreencher = window.localStorage.getItem('preencher');
            var testeAux = auxPreencher.split(',');
            for (i=0; i<aux; i++)
                  novaString += testeAux[i]+ ',';
            novaString += tabOpo[aux];
            for (i=aux; i<26; i++)
                novaString += testeAux[i] + ',';
            window.localStorage.setItem('preencher', novaString);
            window.localStorage.setItem('aux', aux);
            var modo;
            var bin = window.localStorage.getItem('modoBin');
            if (bin == 2)
                modo = -21;
            else
                if (bin == 3)
                    modo = -31;
                else
                    modo = -1;
            pop.innerHTML = [
              '<br>',
              '<br>',
              '<center><h>Você não acertou onde meu tesouro está escondido! O número da ilha <b>' + window.localStorage.getItem('jogoLetra') + '</b> é <b>' + tabOpo[aux] + '</b>.</h></center>',
              "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega("+modo+")'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
            ].join('\n');
            pop.style.display='block';
        }

        rep += aux + ',';
        window.localStorage.setItem('rep', rep);
    }
    else
        alert("Você já escolheu esse antes, por favor palpite em uma ilha que não se sabe o seu número.")
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

function onLoadFirstTime()
{
    var teste = window.localStorage.getItem('firstTime');
    var modo, bin = window.localStorage.getItem('modoBin');
    if (teste == 'null' || teste == null)
    {
        var pop = document.getElementById('pop');

        if (bin == 2)
            modo = "binário";
        else
            if (bin == 3)
                modo = "hashing";
            else
                modo = "linear";

        pop.innerHTML = [
            '<br>',
            '<center><h>Marujo ' + window.localStorage.getItem('name') +', bem vindo ao modo '+modo+'!</h></center>',
            '<center><h>Eu sou o capitão Barba Cinza e escondi meu tesouro na ilha de número <b>' + window.localStorage.getItem('ilhaOpo') + '</b>.</h></center>',
            '<center><h>Boa sorte e bom jogo!</h></center>',
            "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockTeste()'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
        ].join('\n');
        pop.style.display='block';
        window.localStorage.setItem('firstTime', 1);
    }
}

function blockTeste()
{
    document.getElementById('pop').style.display='none';
}

function blockCarrega(i)
{
    document.getElementById('pop').style.display='none';

    if (i == -1 || i == -21 || i == -31)
    {   var string = window.localStorage.getItem('tabuleiro');
        var aux = string.split(',');
        var n = aux.length;
        var arr = window.localStorage.getItem('repOpo');
        var modo;

        if (arr == null || arr == 'null')
            arr = "";
        if (i == -1)
        {   var choice = Math.random() * (n-1) | 0;
            while (choice >= 26)
                choice = Math.random() * (n-1) | 0;

            while (haveElement(choice, arr))
            {   choice = Math.random() * (n-1) | 0;
                while (choice >= 26)
                  choice = Math.random() * (n-1) | 0;
            }

            modo = -2;
            var ok = letraOpo(choice);
        }
        else
            if (i == -21)
            {   var flag = false;
                string = window.localStorage.getItem('novoTab');
                if (string == null || string == 'null')
                    string = window.localStorage.getItem('tabuleiro');
                else
                    flag = true;

                aux = string.split(',');
                var choice = aux.length / 2 | 0;
                if (aux % 2 != 0)
                    choice -= 1;
                modo = -22;
                if (flag)
                  var ok = letraOpo(aux[choice]);
                else
                  var ok = letraOpo(choice);
              }
              else
              {     var opo = window.localStorage.getItem('ilhaNum');
                    var stringNTab = window.localStorage.getItem('tabuleiro');
                    aux = stringNTab.split(',');
                    n = opo[opo.length-1];
                    var flag = false;
                    string = window.localStorage.getItem('novoTab');

                    if (string == null || string == 'null')
                    {
                        string = "";

                        for (j=0; j<aux.length; j++)
                        {   if (aux[j][aux[j].length-1] == n)
                            {   string += j + ',';
                                for (t=j+1; t<aux.length; t++)
                                {   if (aux[t][aux[t].length-1] != n)
                                    {   flag = true;
                                        break;
                                    }
                                    string += t + ',';
                                }
                            }
                            if (flag)
                                break;
                        }

                        window.localStorage.setItem('novoTab', string);
                    }
                    //alert(string);
                    var auxAux = string.split(',');
                    n = auxAux.length-1;

                    var choice = Math.random() * (n-1) | 0;

                    modo = -32;
                    var ok = letraOpo(auxAux[choice]);

              }

        window.localStorage.setItem('repOpo', arr);

        window.localStorage.setItem('choice', choice);
        pop.innerHTML = [
            '<br>',
            '<br>',
            '<center><h>Minha vez de fazer meu palpite. Eu acho que seu tesouro está na ilha <b>' + ok + '</b>.</h></center>',
            "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega("+modo+")'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
        ].join('\n');
        pop.style.display='block';

    }
    else
        if (i == -2 || i == -22 || i == -32)
        {   var string = window.localStorage.getItem('tabuleiro');
            var aux = string.split(',');
            var choice = window.localStorage.getItem('choice');
            if (i == -2)
            {   if (parseInt(aux[choice]) == window.localStorage.getItem('ilhaNum'))
                {   pop.innerHTML = [
                      '<br>',
                      '<br>',
                      '<center><h>Você perdeu!Eu encontrei seu tesouro, na ilha <b>' + window.localStorage.getItem('ilhaLetra') + '</b>.</h></center>',
                      "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega(-10)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                    ].join('\n');
                    pop.style.display='block';
                }
                else
                {   var tab = window.localStorage.getItem('tabuleiro');
                    var stringSplit = tab.split(',');

                    pop.innerHTML = [
                      '<br>',
                      '<br>',
                      '<center><h>Ah, eu errei! Pelo que eu posso ver o número da ilha <b>' + letraOpo(choice) + '</b> é <b>' + stringSplit[choice] + '</b>.</h></center>',
                      "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega("+window.localStorage.getItem('aux')+")'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                    ].join('\n');
                    pop.style.display='block';
                }
             }
             else
                if (i == -22)
                {   var aux2 = window.localStorage.getItem('novoTab');
                    var splitAux2 = aux2.split(',');
                    if(window.localStorage.getItem('ilhaLetra') == "M")
                        var tt = parseInt(aux[choice]);
                    else
                        var tt = parseInt(aux[splitAux2[choice]]);
                    //alert(aux2);
                    if (tt == window.localStorage.getItem('ilhaNum'))
                     {   pop.innerHTML = [
                           '<br>',
                           '<br>',
                           '<center><h>Você perdeu!Eu encontrei seu tesouro, na ilha <b>' + window.localStorage.getItem('ilhaLetra') + '</b>.</h></center>',
                           "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega(-10)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                         ].join('\n');
                         pop.style.display='block';
                     }
                     else
                     {    var novoTab = "";
                          var flag = false;
                          var string2 = window.localStorage.getItem('novoTab');
                          if (string2 == null || string2 == 'null')
                              string2 = string;
                         var aux2 = string2.split(',');
                         var aux3 = aux[aux2[choice]];
                         if (aux3 == undefined || aux3 == 'undefined')
                         {   aux3 = aux2[choice];
                             var hmm = 0;
                         }
                         else
                         {   flag = true;
                             hmm = aux2[0];
                         }

                          if (parseInt(aux3) < window.localStorage.getItem('ilhaNum'))
                          {   for (i=parseInt(choice)+1+parseInt(hmm); i<aux2.length-1+parseInt(hmm); i++)
                                  novoTab += i + ',';
                              // alert('<');
                          }
                          else
                          {
                              for (i=hmm; i<parseInt(choice)+parseInt(hmm); i++)
                                  novoTab += i + ',';
                              // alert('>');
                          }
                          var tab = window.localStorage.getItem('tabuleiro');
                          var stringSplit = tab.split(',');
                          if (flag)
                              choice = aux2[choice];

                          pop.innerHTML = [
                                '<br>',
                                '<br>',
                                '<center><h>Ah, eu errei! Pelo que eu posso ver o número da ilha <b>' + letraOpo(choice) + '</b> é <b>' + stringSplit[choice] + '</b>.</h></center>',
                                "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega("+window.localStorage.getItem('aux')+")'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                          ].join('\n');
                          pop.style.display='block';

                          window.localStorage.setItem('novoTab', novoTab);
                     }
                  }
                  else
                  {     var aux2 = window.localStorage.getItem('novoTab');
                        var splitAux2 = aux2.split(',');
                        if (parseInt(aux[splitAux2[choice]]) == window.localStorage.getItem('ilhaNum'))
                        {   pop.innerHTML = [
                                '<br>',
                                '<br>',
                                '<center><h>Você perdeu!Eu encontrei seu tesouro, na ilha <b>' + window.localStorage.getItem('ilhaLetra') + '</b>.</h></center>',
                                "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega(-10)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                            ].join('\n');
                            pop.style.display='block';
                        }
                        else
                        {   var tab = window.localStorage.getItem('tabuleiro');
                            var stringSplit = tab.split(',');
                            var novoTab = "";


                            for (j=0; j<choice; j++)
                                novoTab += splitAux2[j] + ',';
                            //alert(novoTab);
                            //alert(choice+1 + " " + splitAux2.length);
                            for (j=parseInt(choice)+1; j<splitAux2.length; j++)
                                novoTab += splitAux2[j] + ',';

                            novoTab = novoTab.substring(0, novoTab.length-1);
                            window.localStorage.setItem('novoTab', novoTab);

                            pop.innerHTML = [
                                  '<br>',
                                  '<br>',
                                  '<center><h>Ah, eu errei! Pelo que eu posso ver o número da ilha <b>' + letraOpo(splitAux2[choice]) + '</b> é <b>' + stringSplit[splitAux2[choice]] + '</b>.</h></center>',
                                  "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='blockCarrega(-100)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                            ].join('\n');
                            pop.style.display='block';
                        }
                  }
        }
        else
            if (i == -10)
                location.href = "index.html";
            else
                if (i == -100)
                    location.reload();
                    else
                        if (i > 12)
                            location.href = "partida1e2-2.html";
                        else
                            location.href = "partida1e2-1.html";
}

// função responsável por receber o dado
function recebe(valor)
{
    var string = window.localStorage.getItem('tabuleiro');
    var aux = string.split(','), i;

    if (valor == 1)
        for (i=0; i<13; i++)
            document.getElementById('ntab'+(i+1)).value = aux[i];
    else
        if (valor == 2)
            for (i=0; i<13; i++)
                document.getElementById('ntab'+(i+1)).value = aux[i+13];
        else
            if (valor == 31)
                geraHash(1);
            else
                geraHash2(1);

    if (valor > 30)
        document.getElementById('name'+3).value = window.localStorage.getItem('name');
    else
        document.getElementById('name'+valor).value = window.localStorage.getItem('name');
}

// função auxiliar no envio do nome entre páginas
function urlDecode(string, overwrite)
{
	if(!string || !string.length)
		return {};

	var obj = {};
	var pairs = string.split('&');
	var pair, name, value;
	var lsRegExp = /\+/g;
	for(var i = 0, len = pairs.length; i < len; i++)
    {   pair = pairs[i].split('=');
		name = unescape(pair[0]);
		value = unescape(pair[1]).replace(lsRegExp, " ");
		if (overwrite !== true)
		{   if (typeof obj[name] == "undefined")
				obj[name] = value;
			else
                if (typeof obj[name] == "string")
                {   obj[name] = [obj[name]];
				    obj[name].push(value);
                }
                else
				    obj[name].push(value);
		}
        else
			obj[name] = value;
	}

	return obj;
}

// poe na variavel o valor da ilha clicada
function clicaIlha(i)
{
    window.localStorage.setItem('ilhaLetra', document.getElementById('ltab'+i).value);
    window.localStorage.setItem('ilhaNum', document.getElementById('ntab'+i).value);
}

function clicaIlhaJogo(i)
{
    window.localStorage.setItem('jogoLetra', document.getElementById('oltab'+i).value);
}

function clicaIlhaJogoHash(i)
{
    window.localStorage.setItem('jogoLetra', document.getElementById('ltab'+i).value);
    //alert(i);
}


function geraHashOpo(fator)
{
    var table = document.getElementById('table');
    var stringMod = window.localStorage.getItem('hashOpo');
    //var tabuleiro = window.localStorage.getItem('tabOpo');
    //var auxtab = tabuleiro.split(',');
    var aux = stringMod.split(','), i;
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
    var count = 0;
    var top = 0, left = 4, j;
    var outrapag = "";

    for (j=0; j<10; j++)
    {   tds[j] = document.createElement("td");
        var pag = 0;
        for (i=0; i<aux[j]; i++)
        {   if (pag < 2)
            {   var ltab = document.createElement("input");
                ltab.name = 'ltab'+(count+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = getLetra(count);
                ltab.readOnly = true;
                ltab.style.background = "transparent";
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.border = "none";
                ltab.style.color = "black";
                ltab.style.position = "absolute";
                top += 3.5;

                var a = document.createElement("a");
                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = 'itab'+(count+1);
                window.localStorage.setItem('auxiliar', count+1);
                if (fator == 3)
                    img.onclick = geraScriptOpo(count+1);
                img.style.width = "7%";
                img.style.marginLeft = "1%";
                img.style.marginTop = top + '%';
                img.style.position = "absolute";
                a.appendChild(img);
                top += 6.5;

                var ntab = document.createElement("input");
                ntab.name = 'ntab'+(count+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = "";
                ntab.readOnly = true;
                ntab.style.width = "7%";
                ntab.style.marginLeft = "1%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                top += 5;

                tds[j].appendChild(ltab);
                tds[j].appendChild(a);
                tds[j].appendChild(ntab);
                pag++;
            }
            else
            {   outrapag += j+':'+count + ',';
            }
            count++;
        }
        top = 0;
    }

    for (i=0; i<10; i++)
        tr.appendChild(tds[i]);

    tbody.appendChild(tr);
    table.appendChild(tbody);
    //alert(outrapag);
    window.localStorage.setItem('hash2Opo', outrapag);
}

function geraHash(fator)
{
    var table = document.getElementById('table');
    var stringMod = window.localStorage.getItem('hash');
    var tabuleiro = window.localStorage.getItem('tabuleiro');
    var auxtab = tabuleiro.split(',');
    var aux = stringMod.split(','), i;
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
    var count = 0;
    var top = 0, left = 4, j;
    var outrapag = "";

    for (j=0; j<10; j++)
    {   tds[j] = document.createElement("td");
        var pag = 0;
        for (i=0; i<aux[j]; i++)
        {   if (pag < 2)
            {   var ltab = document.createElement("input");
                ltab.name = 'ltab'+(count+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = getLetra(count);
                ltab.readOnly = true;
                ltab.style.background = "transparent";
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.border = "none";
                ltab.style.color = "black";
                ltab.style.position = "absolute";
                top += 3.5;

                var a = document.createElement("a");
                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = 'itab'+(count+1);
                window.localStorage.setItem('auxiliar', count+1);
                if (fator == 1)
                    img.onclick = geraScript(count+1);
                img.style.width = "7%";
                img.style.marginLeft = "1%";
                img.style.marginTop = top + '%';
                img.style.position = "absolute";
                a.appendChild(img);
                top += 6.5;

                var ntab = document.createElement("input");
                ntab.name = 'ntab'+(count+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = auxtab[count];
                ntab.readOnly = true;
                ntab.style.width = "7%";
                ntab.style.marginLeft = "1%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                top += 5;

                tds[j].appendChild(ltab);
                tds[j].appendChild(a);
                tds[j].appendChild(ntab);
                pag++;
            }
            else
            {   outrapag += j+':'+count + ',';
            }
            count++;
        }
        top = 0;
    }

    for (i=0; i<10; i++)
        tr.appendChild(tds[i]);

    tbody.appendChild(tr);
    table.appendChild(tbody);
    //alert(outrapag);
    window.localStorage.setItem('hash2', outrapag);
}

function geraScriptOpo(count)
{
    switch (count)
    {   case 1:
        case '1':
            return nteste1;
            break;
        case 2:
        case '2':
            return nteste2;
            break;
        case 3:
        case '3':
            return nteste3;
            break;
        case 4:
        case '4':
            return nteste4;
            break;
        case 5:
        case '5':
            return nteste5;
            break;
        case 6:
        case '6':
            return nteste6;
            break;
        case 7:
        case '7':
            return nteste7;
            break;
        case 8:
        case '8':
            return nteste8;
            break;
        case 9:
        case '9':
            return nteste9;
            break;
        case 10:
        case '10':
            return nteste10;
            break;
        case 11:
        case '11':
            return nteste11;
            break;
        case 12:
        case '12':
            return nteste12;
            break;
        case 13:
        case '13':
            return nteste13;
            break;
        case 14:
        case '14':
            return nteste14;
            break;
        case 15:
        case '15':
            return nteste15;
            break;
        case 16:
        case '16':
            return nteste16;
            break;
        case 17:
        case '17':
            return nteste17;
            break;
        case 18:
        case '18':
            return nteste18;
            break;
        case 19:
        case '19':
            return nteste19;
            break;
        case 20:
        case '20':
            return nteste20;
            break;
        case 21:
        case '21':
            return nteste21;
            break;
        case 22:
        case '22':
            return nteste22;
            break;
        case 23:
        case '23':
            return nteste23;
            break;
        case 24:
        case '24':
            return nteste24;
            break;
        case 25:
        case '25':
            return nteste25;
            break;
        case 26:
        case '26':
            return nteste26;
            break;

    }
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
    clicaIlha(1);
}
function teste2()
{
    clicaIlha(2);
}
function teste3()
{
    clicaIlha(3);
}
function teste4()
{
    clicaIlha(4);
}
function teste5()
{
    clicaIlha(5);
}
function teste6()
{
    clicaIlha(6);
}
function teste7()
{
    clicaIlha(7);
}
function teste8()
{
    clicaIlha(8);
}
function teste9()
{
    clicaIlha(9);
}
function teste10()
{
    clicaIlha(10);
}
function teste11()
{
    clicaIlha(11);
}
function teste12()
{
    clicaIlha(12);
}
function teste13()
{
    clicaIlha(13);
}
function teste14()
{
    clicaIlha(14);
}
function teste15()
{
    clicaIlha(15);
}
function teste16()
{
    clicaIlha(16);
}
function teste17()
{
    clicaIlha(17);
}
function teste18()
{
    clicaIlha(18);
}
function teste19()
{
    clicaIlha(19);
}
function teste20()
{
    clicaIlha(20);
}
function teste21()
{
    clicaIlha(21);
}
function teste22()
{
    clicaIlha(22);
}
function teste23()
{
    clicaIlha(23);
}
function teste24()
{
    clicaIlha(24);
}
function teste25()
{
    clicaIlha(25);
}
function teste26()
{
    clicaIlha(26);
}


function nteste1()
{
    clicaIlhaJogoHash(1);
}
function nteste2()
{
    clicaIlhaJogoHash(2);
}
function nteste3()
{
    clicaIlhaJogoHash(3);
}
function nteste4()
{
    clicaIlhaJogoHash(4);
}
function nteste5()
{
    clicaIlhaJogoHash(5);
}
function nteste6()
{
    clicaIlhaJogoHash(6);
}
function nteste7()
{
    clicaIlhaJogoHash(7);
}
function nteste8()
{
    clicaIlhaJogoHash(8);
}
function nteste9()
{
    clicaIlhaJogoHash(9);
}
function nteste10()
{
    clicaIlhaJogoHash(10);
}
function nteste11()
{
    clicaIlhaJogoHash(11);
}
function nteste12()
{
    clicaIlhaJogoHash(12);
}
function nteste13()
{
    clicaIlhaJogoHash(13);
}
function nteste14()
{
    clicaIlhaJogoHash(14);
}
function nteste15()
{
    clicaIlhaJogoHash(15);
}
function nteste16()
{
    clicaIlhaJogoHash(16);
}
function nteste17()
{
    clicaIlhaJogoHash(17);
}
function nteste18()
{
    clicaIlhaJogoHash(18);
}
function nteste19()
{
    clicaIlhaJogoHash(19);
}
function nteste20()
{
    clicaIlhaJogoHash(20);
}
function nteste21()
{
    clicaIlhaJogoHash(21);
}
function nteste22()
{
    clicaIlhaJogoHash(22);
}
function nteste23()
{
    clicaIlhaJogoHash(23);
}
function nteste24()
{
    clicaIlhaJogoHash(24);
}
function nteste25()
{
    clicaIlhaJogoHash(25);
}
function nteste26()
{
    clicaIlhaJogoHash(26);
}


function geraHash2(fator)
{
    var table = document.getElementById('table');
    var hash2 = window.localStorage.getItem('hash2');
    var aux1 = hash2.split(',');
    var tabuleiro = window.localStorage.getItem('tabuleiro');
    var auxtab = tabuleiro.split(',');

    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var tds = [];
    var top = 0, left = 4, j;
    var indice = 0, count = 0;

    var thead = document.createElement("tfoot");

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

    for (j=0; j<10; j++)
    {   tds[j] = document.createElement("td");
        for (i=0; i<aux1.length-1; i++)
        {   var aux = aux1[i].split(':');
            if (aux[0] == j)
            {   var ltab = document.createElement("input");
                ltab.name = 'ltab'+(parseInt(aux[1])+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = getLetra(aux[1]);
                ltab.readOnly = true;
                ltab.style.background = "transparent";
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.border = "none";
                ltab.style.color = "black";
                ltab.style.position = "absolute";
                top += 3.5;

                var a = document.createElement("a");
                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = 'itab'+(parseInt(aux[1])+1);
                if (fator == 1)
                    img.onclick = geraScript(parseInt(aux[1])+1);
                img.style.width = "7%";
                img.style.marginLeft = "1%";
                img.style.marginTop = top + '%';
                img.style.position = "absolute";
                a.appendChild(img);
                top += 6.5;

                var ntab = document.createElement("input");
                ntab.name = 'ntab'+(parseInt(aux[1])+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = auxtab[aux[1]];
                ntab.readOnly = true;
                ntab.style.width = "7%";
                ntab.style.marginLeft = "1%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                top += 5;

                tds[j].appendChild(ltab);
                tds[j].appendChild(a);
                tds[j].appendChild(ntab);
            }
        }
        top = 0;
    }

    for (i=0; i<10; i++)
        tr.appendChild(tds[i]);




    tbody.appendChild(tr);
    table.appendChild(tbody);

}

function geraHashOpo2(fator)
{
    var table = document.getElementById('table');
    var hash2 = window.localStorage.getItem('hash2Opo');
    var aux1 = hash2.split(',');
    //var tabuleiro = window.localStorage.getItem('tabOpo');
    //var auxtab = tabuleiro.split(',');

    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var tds = [];
    var top = 0, left = 4, j;
    var indice = 0, count = 0;

    var thead = document.createElement("tfoot");

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

    for (j=0; j<10; j++)
    {   tds[j] = document.createElement("td");
        for (i=0; i<aux1.length-1; i++)
        {   var aux = aux1[i].split(':');
            if (aux[0] == j)
            {   var ltab = document.createElement("input");
                ltab.name = 'ltab'+(parseInt(aux[1])+1);
                ltab.id = ltab.name;
                ltab.type = "text";
                ltab.value = getLetra(aux[1]);
                ltab.readOnly = true;
                ltab.style.background = "transparent";
                ltab.style.width = "3%";
                ltab.style.marginLeft = left + '%';
                ltab.style.marginTop = top + '%';
                ltab.style.border = "none";
                ltab.style.color = "black";
                ltab.style.position = "absolute";
                top += 3.5;

                var a = document.createElement("a");
                var img = document.createElement("img");
                img.src = "img/ilha.png";
                img.id = 'itab'+(parseInt(aux[1])+1);
                if (fator == 3)
                    img.onclick = geraScriptOpo(parseInt(aux[1])+1);
                img.style.width = "7%";
                img.style.marginLeft = "1%";
                img.style.marginTop = top + '%';
                img.style.position = "absolute";
                a.appendChild(img);
                top += 6.5;

                var ntab = document.createElement("input");
                ntab.name = 'ntab'+(parseInt(aux[1])+1);
                ntab.id = ntab.name;
                ntab.type = "text";
                ntab.value = "";
                ntab.readOnly = true;
                ntab.style.width = "7%";
                ntab.style.marginLeft = "1%";
                ntab.style.marginTop = top + '%';
                ntab.style.position = "absolute";
                top += 5;

                tds[j].appendChild(ltab);
                tds[j].appendChild(a);
                tds[j].appendChild(ntab);
            }
        }
        top = 0;
    }

    for (i=0; i<10; i++)
        tr.appendChild(tds[i]);




    tbody.appendChild(tr);
    table.appendChild(tbody);

}


function getLetra(count)
{
    var result = "";

    switch (count)
    {   case 0:
        case '0':
            result = "A";
            break;
        case 1:
        case '1':
            result = "B";
            break;
        case 2:
        case '2':
            result = "C";
            break;
        case 3:
        case '3':
            result = "D";
            break;
        case 4:
        case '4':
            result = "E";
            break;
        case 5:
        case '5':
            result = "F";
            break;
        case 6:
        case '6':
            result = "G";
            break;
        case 7:
        case '7':
            result = "H";
            break;
        case 8:
        case '8':
            result = "I";
            break;
        case 9:
        case '9':
            result = "J";
            break;
        case 10:
        case '10':
            result = "K";
            break;
        case 11:
        case '11':
            result = "L";
            break;
        case 12:
        case '12':
            result = "M";
            break;
        case 13:
        case '13':
            result = "N";
            break;
        case 14:
        case '14':
            result = "O";
            break;
        case 15:
        case '15':
            result = "P";
            break;
        case 16:
        case '16':
            result = "Q";
            break;
        case 17:
        case '17':
            result = "R";
            break;
        case 18:
        case '18':
            result = "S";
            break;
        case 19:
        case '19':
            result = "T";
            break;
        case 20:
        case '20':
            result = "U";
            break;
        case 21:
        case '21':
            result = "V";
            break;
        case 22:
        case '22':
            result = "W";
            break;
        case 23:
        case '23':
            result = "X";
            break;
        case 24:
        case '24':
            result = "Y";
            break;
        case 25:
        case '25':
            result = "Z";
            break;
    }

    return result;
}

// cronômetro
function contagem_tempo(segundos)
{
    if (segundos < 10)
        document.contador.segundos.value = '00:0'+segundos;
    else
        document.contador.segundos.value = '00:'+segundos;

    segundos = segundos - 1;
    if (segundos == -1)
        segundos = 0;
    else
        timerID = setTimeout('contagem_tempo('+segundos+')',1000);
}

// menu dropdown

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction()
{
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event)
{
    if (!event.target.matches('.dropbtn'))
    {   var dropdowns = document.getElementsByClassName("dropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++)
        {   var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show'))
                openDropdown.classList.remove('show');
        }
    }
}
