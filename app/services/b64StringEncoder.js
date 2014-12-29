/**
 * Created by justin on 12/23/14.
 */
app.registerService(function (container) {

    function Base64Encoder(base64String) {
        if (base64String && this._validateInput(base64String)) {
            this.isBase64 = true;
            this.base64String = base64String;
        }
    }

    var b64array = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    Base64Encoder.prototype._validateInput = function (input) {
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            throw new Error("input base64string is not valid");
        }
        return true;
    };

    Base64Encoder.prototype.encode = function (input) {
        var base64 = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            base64 = base64 +
            b64array.charAt(enc1) +
            b64array.charAt(enc2) +
            b64array.charAt(enc3) +
            b64array.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return base64;
    };

    Base64Encoder.prototype.decode = function (input) {
        if (!input && this.isBase64)
            input = this.base64String;

        if (!this._validateInput(input)) return;

        var output = "";

        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            enc1 = b64array.indexOf(input.charAt(i++));
            enc2 = b64array.indexOf(input.charAt(i++));
            enc3 = b64array.indexOf(input.charAt(i++));
            enc4 = b64array.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    };

    var _instance;

    Base64Encoder.instance = function () {
        return _instance || (_instance = new Base64Encoder());
    };

    Base64Encoder.fromBase64 = function (base64String) {
        return new Base64Encoder(base64String);
    };

    return Base64Encoder;
});