cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-ble-central/www/ble.js",
        "id": "cordova-plugin-ble-central.ble",
        "pluginId": "cordova-plugin-ble-central",
        "clobbers": [
            "ble"
        ]
    },
    {
        "file": "plugins/cordova-plugin-bluetoothle/www/bluetoothle.js",
        "id": "cordova-plugin-bluetoothle.BluetoothLe",
        "pluginId": "cordova-plugin-bluetoothle",
        "clobbers": [
            "window.bluetoothle"
        ]
    },
    {
        "file": "plugins/org.bcsphere.bluetooth/www/org.underscorejs.underscore/underscore.js",
        "id": "org.bcsphere.bluetooth.underscorejs.underscore",
        "pluginId": "org.bcsphere.bluetooth"
    },
    {
        "file": "plugins/org.bcsphere.bluetooth/www/org.bcsphere/bc.js",
        "id": "org.bcsphere.bluetooth.bcjs",
        "pluginId": "org.bcsphere.bluetooth",
        "merges": [
            "BC"
        ]
    },
    {
        "file": "plugins/org.bcsphere.bluetooth/www/org.bcsphere.bluetooth/bluetoothapi.js",
        "id": "org.bcsphere.bluetooth.bluetoothapi",
        "pluginId": "org.bcsphere.bluetooth",
        "merges": [
            "navigator.bluetooth"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.bluetooth/www/bluetooth.js",
        "id": "com.phonegap.plugins.bluetooth.bluetooth",
        "pluginId": "com.phonegap.plugins.bluetooth",
        "clobbers": [
            "bluetooth"
        ]
    },
    {
        "file": "plugins/cordova-plugin-networking-bluetooth/www/event.js",
        "id": "cordova-plugin-networking-bluetooth.event",
        "pluginId": "cordova-plugin-networking-bluetooth"
    },
    {
        "file": "plugins/cordova-plugin-networking-bluetooth/www/NetworkingBluetooth.js",
        "id": "cordova-plugin-networking-bluetooth.NetworkingBluetooth",
        "pluginId": "cordova-plugin-networking-bluetooth",
        "clobbers": [
            "networking.bluetooth"
        ]
    },
    {
        "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
        "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-ble-central": "1.0.3",
    "cordova-plugin-bluetoothle": "2.4.0",
    "org.bcsphere.bluetooth": "0.5.1",
    "com.phonegap.plugins.bluetooth": "0.9",
    "cordova-plugin-networking-bluetooth": "1.0.1",
    "cordova-plugin-bluetooth-serial": "0.4.5"
};
// BOTTOM OF METADATA
});