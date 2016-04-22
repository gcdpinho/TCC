var onLoad = function(){
    //alert();
    bluetoothSerial.subscribeRawData(function(message){

            if (message.length == 1){
                window.localStorage.setItem('reciveMessage', message);

                var sMessage = window.localStorage.getItem('sendMessage');

                if (message == sMessage.toString()){
                    bluetoothSerial.write("iguais", function(){
                        if (message != "3")
                            location.href = "escolhaBluetooth1.html";
                        else
                            location.href = "escolhahashBluetooth1.html";
                    }, function(error){
                        alert(JSON.stringify(error));
                    });
                }
            }
            else
                if (message == "iguais"){
                    if (window.localStorage.getItem('modoBin') != "3")
                        location.href = "escolhaBluetooth1.html";
                    else
                        location.href = "escolhahashBluetooth1.html";
                }
                else
                    if (message == "zerar"){
                        window.localStorage.setItem('ilhaOpo', null);
    					window.localStorage.setItem('sendMessage', null);
    					window.localStorage.setItem('reciveMessage', null);
                        location.href = "partidaBluetooth.html";
                    }
                    else
                        if (message == "desconectar"){
                            alert("Seu oponente se desconectou!");
                            window.localStorage.setItem('ilhaOpo', null);
                            window.localStorage.setItem('sendMessage', null);
                            window.localStorage.setItem('reciveMessage', null);
                            location.href = "index.html";
                        }
                            else {
                                var split = message.split(':');
                                //alert(split[1]);

                                if (split[0] == "escolha"){
                                    window.localStorage.setItem('ilhaOpo', split[1]);

                                    if (document.getElementById('pop').style.display == 'block'){
                                            window.localStorage.setItem('who', "eu");
                                            location.href = "partidaBluetooth1e2-1.html";
                                    }
                                }
                                else
                                    if (split[0] == "hescolha"){
                                        window.localStorage.setItem('ilhaOpo', split[1]);
                                        window.localStorage.setItem('hashOpo', split[3]);
                                        if (document.getElementById('pop').style.display == 'block'){
                                                window.localStorage.setItem('who', "eu");
                                                location.href = "partidahashBluetooth1.html";
                                        }
                                    }
                            }


    }, function(error){
        alert(JSON.stringify(error));
    });
}

$(document).on('deviceready', onLoad);
