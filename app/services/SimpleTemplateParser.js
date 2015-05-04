/**
 * Created by justin on 3/6/15.
 */

app.registerService(function () {

    function SimpleTemplateParser() {

    }

    SimpleTemplateParser.prototype = Object.create(Object.prototype, {});

    SimpleTemplateParser.prototype.getKeysFromTemplate = function (templateString) {
        var regex = /\{\{|\}\}|\{((\w|\.)+)\}/g;
        var keys = [];
        var myArray;
        while ((myArray = regex.exec(templateString)) !== null) {
            keys.push(myArray[0].replace(/\{|\}/g, ""));
        }
        return keys;
    };

    SimpleTemplateParser.prototype.parseTemplate = function (templateString, obj) {
        var self = this;
        var cloned = templateString;
        var regex = /\{\{|\}\}|\{((\w|\.)+)\}/g;
        var foundKey;

        while ((foundKey = regex.exec(templateString)) !== null) {
            var key = foundKey[0].replace(/\{|\}/g, "");
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

    SimpleTemplateParser.newInstance = function () {
        return Some(new SimpleTemplateParser());
    };

    return SimpleTemplateParser;
});