'use strict';

function SimpleTemplateParser() {
    this.regex = /\$\$((\w|\.)+)\$\$/g;
    this.regexKey = /\$\$/g;
}

SimpleTemplateParser.prototype.getKeysFromTemplate = function (templateString) {
    var regex = this.regex;
    var keys = [];
    var myArray;
    while ((myArray = regex.exec(templateString)) !== null) {
        keys.push(myArray[0].replace(this.regexKey, ""));
    }
    return keys;
};

SimpleTemplateParser.prototype.parseTemplate = function (templateString, obj) {
    var self = this;
    var cloned = templateString;
    var regex = this.regex;
    var foundKey;

    while ((foundKey = regex.exec(templateString)) !== null) {
        var key = foundKey[0].replace(this.regexKey, "");
        cloned = cloned.replace(foundKey[0], self.getValueFromKey(obj, key));
    }
    return cloned;
};

SimpleTemplateParser.prototype.getValueFromKey = function (obj, keyString) {
    var keys = keyString.split('.');
    if (keys.length === 1)
        return obj.hasOwnProperty(keys[0]) ? obj[keys[0]] : "";

    var result = obj;
    keys.forEach(function (key) {
        if (!result.hasOwnProperty(key)) return "";
        result = result[key];
    });

    return result;
};

module.exports = SimpleTemplateParser;