var onLoad = function(){
    //alert();
    bluetoothSerial.subscribeRawData(function(message){
        window.localStorage.setItem('who', null);
        if (message == "desistir"){
            location.href = "partidaBluetooth.html";
        }
        else
            if (message == "perdeu"){
                var pop = document.getElementById('pop');
                pop.innerHTML = [
                      '<br>',
                      '<br>',
                      '<center><h>Você perdeu! Seu oponente encontrou seu tesouro. Mais sorte na próxima vez!</h></center>',
                      "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='tratamentoBluetooth(-1)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                    ].join('\n');
                    pop.style.display='block';
            }
            else
                if (message == "yourturn"){
                    window.localStorage.setItem('myTurn', "true");
                    if (document.getElementById('botaoPalpite') != null)
                        document.getElementById('botaoPalpite').disabled = false;
                }
                else {
                    var split = message.split(':');
                    //alert(message);
                    if (split[0] == "moeda"){
                        var who;
                        if (split[1] == "2")
                            who = "tu";
                        else
                            who = "eu";

                        //alert(who);
                        bluetoothSerial.isConnected(function(){
                            bluetoothSerial.write("comeca:"+who, function(){
                                if (split[1] == "1"){
                                    window.localStorage.setItem('myTurn', "true");
                                    if (document.getElementById('botaoPalpite') != null)
                                        document.getElementById('botaoPalpite').disabled = false;
                                }
                            }, function(error){
                                alert(JSON.stringify(error));
                            });
                        }, function(error){
                            alert("Você foi desconectado!");
                            location.href = "index.html";
                        });
                    }
                    else
                        if (split[0] == "comeca"){
                            if (split[1] == "tu"){
                                window.localStorage.setItem('myTurn', "true");
                                if (document.getElementById('botaoPalpite') != null)
                                    document.getElementById('botaoPalpite').disabled = false;
                            }
                        }
                        else
                            if (split[0] == "palpite"){
                                var tabuleiro = window.localStorage.getItem('tabuleiro').split(',');
                                //alert(tabuleiro);
                                var pos = letraNum(split[1]);
                                //alert(tabuleiro[pos]);
                                bluetoothSerial.isConnected(function(){
                                    bluetoothSerial.write("resposta:"+tabuleiro[pos], function(){}, function(error){
                                        alert(JSON.stringify(error));
                                    });
                                }, function(error){
                                    alert("Você foi desconectado!");
                                    location.href = "index.html";
                                });
                            }
                            else
                                if (split[0] == "resposta"){
                                    var ilhaOpo = window.localStorage.getItem('ilhaOpo');
                                    var pop = document.getElementById('pop');
                                    //alert(","+ilhaOpo +","+split[1])
                                    if (ilhaOpo == split[1]){
                                        pop.innerHTML = [
                                              '<br>',
                                              '<br>',
                                              '<center><h>Parabéns, você acertou onde estava o tesouro de seu oponente! Ele estava escondido na ilha <b>' +  window.localStorage.getItem('jogoLetra') + '</b>.</h></center>',
                                              "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='tratamentoBluetooth(0)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                                            ].join('\n');
                                            pop.style.display='block';

                                    }
                                    else{
                                        pop.innerHTML = [
                                          '<br>',
                                          '<br>',
                                          '<center><h>Você não acertou onde seu oponente escondeu o tesouro! O número da ilha <b>' + window.localStorage.getItem('jogoLetra') + '</b> é <b>' + split[1] + '</b>.</h></center>',
                                          "<button type = 'submit' class = 'btn btn-primary' id = 'ok' onclick='tratamentoBluetooth(1)'><img src = 'img/confirmar.png' id = 'iconePolegar'/>Ok</button>",
                                        ].join('\n');
                                        pop.style.display='block';
                                    }

                                    var aux = letraNum(window.localStorage.getItem('jogoLetra'));
                                    var novaString = "";
                                    var auxPreencher = window.localStorage.getItem('preencher').split(',');
                                    for (i=0; i<aux; i++)
                                        novaString += auxPreencher[i]+ ',';
                                    novaString += split[1];
                                    for (i=aux; i<26; i++)
                                        novaString += auxPreencher[i] + ',';
                                    window.localStorage.setItem('preencher', novaString);
                                    window.localStorage.setItem('myTurn', "false");
                                    if (document.getElementById('botaoPalpite') != null)
                                        document.getElementById('botaoPalpite').disabled = true;
                                }

            }


    }, function(error){
        alert(JSON.stringify(error));
    });

        if (window.localStorage.getItem('who') == "eu")
            setTimeout(function(){
                //alert("tempo");
                bluetoothSerial.isConnected(function(){
                    var moeda = Math.floor((Math.random() * 2) + 1);
                    bluetoothSerial.write("moeda:"+moeda, function(){

                    }, function(error){
                        alert(JSON.stringify(error));
                    });
                }, function(error){
                    alert("Você foi desconectado!");
                    location.href = "index.html";
                });

            }, 1000);
}

$(document).on('deviceready', onLoad);
