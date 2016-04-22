$.fn.extend({
	enable: function() {
		this.removeAttr('disabled');
	},
	disable: function() {
		this.attr('disabled', 'disabled');
	}
});

var BluetoothState = Backbone.Model.extend({}, {
	Off:       1,
	Busy:      2,
	Ready:     3,
	Connected: 4
});

var Bluetooth = new BluetoothState({
	state: BluetoothState.Busy
});

var Device = Backbone.Model.extend({
	defaults: {
		name:        'name',
		address:     'address',
		isConnected: false
	}
});

var DeviceCollection = Backbone.Collection.extend({
	model: Device
});

var DeviceView = Backbone.View.extend({
	template: templates.device,

	events: {
		'click .btn-bt-connect':    'connect',
		'click .btn-bt-disconnect': 'write'
		//'click .btn-bt-receber': 'read'
	},

	initialize: function() {
		this.model.on('change', this.render, this);
	},

	render: function() {
		this.$el.html(_.template(this.template, {
			name: this.model.get('name'),
			isConnected: this.model.get('isConnected')
		}));
		return this;
	},


	connect: function() {

		var self = this;

		Bluetooth.set({
			state: BluetoothState.Busy
		});

		self.$('.btn-bt-connect').button('loading');

		var onFail = function(error) {
			alert(JSON.stringify(error))
			Bluetooth.set({
				state: BluetoothState.Ready
			});
			self.$('.btn-bt-connect').button('reset');
		}

		var gotUuids = function(device) {

			var onConnection = function() {
				//alert('got connection');
				self.model.set({
					isConnected: true
				});

				var onConnectionLost = function() {
					alert('lost connection');
					self.model.set({
						isConnected: false
					});
					onFail();
				}

				window.localStorage.setItem('sendMessage', null);
				window.localStorage.setItem('reciveMessage', null);



				setTimeout(
				bluetoothSerial.write("oi", function(){
					location.href = "partidaBluetooth.html";
				}, function(error){
					alert(JSON.stringify(error));
				}), 2000);


			}

			bluetoothSerial.connect(self.model.get('address'), onConnection, onFail);
		}

		window.bluetooth.getUuids(gotUuids, onFail, self.model.get('address'));
	},

	disconnect: function() {
		var self = this;

		var onDisconnected = function() {
			//alert('disconnected');
			self.model.set({
				isConnected: false
			});
			Bluetooth.set({
				state: BluetoothState.Ready
			});
		}

		var onFail = function (error){
			alert(JSON.stringify(error));
		}

		Bluetooth.set({
			state: BluetoothState.Busy
		});

		bluetoothSerial.disconnect(onDisconnected);
	},

	write: function(){


		var onSucessWrite = function(){
			//alert("foi");
		}

		var onFail = function(error){
			alert(JSON.stringify(error));

		}

		var message = "teste";

		bluetoothSerial.write(message, onSucessWrite, onFail);
	}


});


var DeviceListView = Backbone.View.extend({
	el: '#list-devices',

	initialize: function() {
		this.collection.on('reset add', this.render, this);
	},

	render: function() {
		this.$el.html("");

		var self = this;
		self.collection.each(function(device) {
			self.$el.append(
				new DeviceView({ model: device }).render().el);
		});
	}
});

var onDeviceReady = function() {
	var devices = new DeviceListView({
		collection: new DeviceCollection()
	});

	var onBluetoothStateChanged = function() {

		//alert('state changed', Bluetooth.get('state'));

		switch(Bluetooth.get('state')) {
			case BluetoothState.Off:
				$('#btn-bt-on').enable();
				$('#btn-bt-off').disable();
				$('#btn-bt-discover').disable();
				$('.btn-bt-connect').disable();
				$('.btn-bt-disconnect').disable();
				$('#btn-bt-pair').disable();
				break;

			case BluetoothState.Busy:
				$('#btn-bt-on').disable();
				$('#btn-bt-off').disable();
				$('#btn-bt-discover').disable();
				$('.btn-bt-connect').disable();
				$('.btn-bt-disconnect').disable();
				$('#btn-bt-pair').disable();
				break;

			case BluetoothState.Ready:
				$('#btn-bt-on').disable();
				$('#btn-bt-off').enable();
				$('#btn-bt-discover').enable();
				$('.btn-bt-connect').enable();
				$('.btn-bt-disconnect').enable();
				$('#btn-bt-pair').enable();
				break;

			case BluetoothState.Connected:
				$('#btn-bt-on').disable();
				$('#btn-bt-off').disable();
				$('#btn-bt-discover').disable();
				$('.btn-bt-connect').disable();
				$('.btn-bt-disconnect').enable();
				$('#btn-bt-pair').disable();
				break;
		}
	}

	var onToggleOn = function() {
		Bluetooth.set({
			state: BluetoothState.Busy
		});

		var onBluetoothEnabled = function() {
			//alert('bluetooth enabled');

			bluetoothSerial.subscribeRawData(function(message){
				if (message == "oi")
				{	window.localStorage.setItem('sendMessage', null);
					window.localStorage.setItem('reciveMessage', null);

					location.href = "partidaBluetooth.html";
				}

			}, function(error){
				alert(JSON.stringify(error));
			});


			Bluetooth.set({
				state: BluetoothState.Ready
			});
		}

		var onFail = function(error){
			alert(JSON.stringify(error));
		}

		bluetoothSerial.enable(onBluetoothEnabled, onFail);
	}

	var onToggleOff = function() {
		Bluetooth.set({
			state: BluetoothState.Busy
		});

		var onBluetoothDisabled = function() {
			//alert('bluetooth disabled');
			Bluetooth.set({
				state: BluetoothState.Off
			});
		}
		document.getElementById('list-devices').innerHTML = [];
		window.bluetooth.disable(onBluetoothDisabled);
	}


	var onDiscover = function() {
		//alert('starting discovery...');

		Bluetooth.set({
			state: BluetoothState.Busy
		});

		var onDeviceDiscovered = function(device) {
			//alert('found device ' + JSON.stringify(device));
			devices.collection.add(new Device(device));
		}

		var onDiscoveryFinished = function() {
			//alert('discovery finished');
			Bluetooth.set({
				state: BluetoothState.Ready
			});
			$('#btn-bt-discover').button('reset');
		}

		$('#btn-bt-discover').button('loading');

		devices.collection.reset();


		window.bluetooth.startDiscovery(onDeviceDiscovered, onDiscoveryFinished, onDiscoveryFinished);


	}

	var boundDevices = function(){

		Bluetooth.set({
			state: BluetoothState.Busy
		});

		var onSuccess = function(list){
			var lista = JSON.stringify(list);

			var split = lista.split('}');

			for (i=0; i<split.length-2; i++){
				var temp = split[i].split('\"');
				var indexName = "", indexAdd = "";
				var flag = 0;
				for (j=0; j<temp.length; j++){
					if (temp[j] == "name"){
						indexName = j;
						flag++;
					}
					if (temp[j] == "address"){
						indexAdd = j;
						flag++;
					}
					if (flag == 2)
						break;
				}
				if (flag == 2){
					Device = Backbone.Model.extend({
						defaults: {
							name:        temp[indexName+2],
							address:     temp[indexAdd+2],
							isConnected: false
						}
					});
					devices.collection.add(new Device(Device));
				}
				else
					alert("Falha na listagem dos dispositivos pareados.");

			}


			Bluetooth.set({
				state: BluetoothState.Ready
			});

		}

		var onFail = function(error){
			alert(JSON.stringify(error));

			Bluetooth.set({
				state: BluetoothState.Ready
			});

		}

		devices.collection.reset();

		bluetoothSerial.list(onSuccess, onFail);
	}


	$('#btn-bt-on').on('click', onToggleOn);
	$('#btn-bt-off').on('click', onToggleOff);
	$('#btn-bt-discover').on('click', onDiscover);
	$('#btn-bt-pair').on('click', boundDevices);

	Bluetooth.on('change', onBluetoothStateChanged);

	bluetoothSerial.isConnected(function(){
		location.href = "partidaBluetooth.html";
	},function(error){
		window.bluetooth.isEnabled(function(isEnabled) {
			if (isEnabled)
			{
				bluetoothSerial.subscribeRawData(function(message){
					if (message == "oi")
					{	window.localStorage.setItem('sendMessage', null);
						window.localStorage.setItem('reciveMessage', null);

						location.href = "partidaBluetooth.html";
					}

				}, function(error){
					alert(JSON.stringify(error));
				});
			}

			Bluetooth.set({
				state: isEnabled ? BluetoothState.Ready : BluetoothState.Off
			});
		});
	});

}

$(document).on('deviceready', onDeviceReady);
