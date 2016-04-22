// Templates of our example BT app, uses underscore.js templating
var templates = {

    // Single BluetoothDevice using Bootstrap components to
    // display nicely
    device:
            "<li class='list-group-item' style = 'color:black; border: 1px solid black; width:96%; height:20%; margin-left:2%'><b><%= name %></b>" +
                    "<button style = 'width:40%; margin-left: 63%; margin-top: -10%;' type='button' class='btn btn-success btn-block btn-bt btn-bt-connect' data-loading-text='Conectando...' disabled>" +
                    "Conectar</button>" +
            "</li>"



}
