var CustomPlugin = {
    start: function (success, fail) {
        console.log("javascript::inside");
        return cordova.exec(success, fail, "CustomPlugin", "start",        []);
    }
};