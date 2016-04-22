$('#btn-bt-discover').on('click', discovery);


var discovery = function(){

    var device_names = {};
    var updateDeviceName = function (device) {
        device_names[device.address] = device.name;
    };

    // Add listener to receive newly found devices
    networking.bluetooth.onDeviceAdded.addListener(updateDeviceName);

    /*
    // With the listener in place, get the list of known devices
    networking.bluetooth.getDevices(function (devices) {
        for (var i = 0; i < devices.length; i++) {
            updateDeviceName(devices[i]);
        }
    });
    */
    // Now begin the discovery process.

    var onFail = function(){
        alert("fail");
    }

    alert("start");
    networking.bluetooth.startDiscovery(function () {
        // Stop discovery after 30 seconds.
        setTimeout(function () {
            alert("end");
            networking.bluetooth.stopDiscovery();
        }, 30000);
    }, onFail);
}
