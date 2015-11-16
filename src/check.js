'use strict';

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            return getExtendedProperties(this);
        }
    });
};

function getExtendedProperties(_this) {
    var prototype = Object.getPrototypeOf(_this);
    function isCorrectPrototype(prototypes) {
        return prototypes.some(function (proto) {
            return proto === prototype;
        });
    }
    return {
        containsKeys: function (keys) {
            if (isCorrectPrototype([Object.prototype, Array.prototype])) {
                var objKeys = Object.keys(_this);
                return keys.every(function (key) {
                    return objKeys.indexOf(key) != -1;
                });
            }
            throw new TypeError('containsKeys cannot be applied to ' + _this);
        },

        hasKeys: function (keys) {
            if (isCorrectPrototype([Object.prototype, Array.prototype])) {
                var objKeys = Object.keys(_this);
                return keys.every(function (key) {
                    return objKeys.indexOf(key) != -1;
                }) && keys.length === objKeys.length;
            }
            throw new TypeError('hasKeys cannot be applied to ' + _this);
        },

        containsValues: function (values) {
            if (isCorrectPrototype([Object.prototype, Array.prototype])) {
                var objKeys = Object.keys(_this);
                var objValues = objKeys.map(function (key) {
                    return _this[key];
                });
                return values.every(function (value) {
                    return objValues.some(function (objValue, index) {
                        return objValue === value && delete objValues[index];
                    });
                });
            }
            throw new TypeError('containsValues cannot be applied to ' + _this);
        },

        hasValues: function (values) {
            if (isCorrectPrototype([Object.prototype, Array.prototype])) {
                var objKeys = Object.keys(_this);
                return objKeys.every(function (key) {
                    return values.indexOf(_this[key]) !== -1 && objKeys.length === values.length;
                });
            }
            throw new TypeError('hasValues cannot be applied to ' + _this);
        },

        hasValueType: function (key, type) {
            if (isCorrectPrototype([Object.prototype, Array.prototype])) {
                if (_this.hasOwnProperty(key)) {
                    return typeof _this[key] === typeof type();
                }
                return false;
            }
            throw new TypeError('hasValueType cannot be applied to ' + _this);
        },

        hasLength: function (length) {
            if (isCorrectPrototype([Array.prototype, String.prototype])) {
                return _this.length === length;
            }
            throw new TypeError('hasLength cannot be applied to ' + _this);
        },

        hasParamsCount: function (count) {
            if (isCorrectPrototype([Function.prototype])) {
                return _this.length === count;
            }
            throw new TypeError('hasParamsCount cannot be applied to ' + _this);
        },

        hasWordsCount: function (count) {
            if (isCorrectPrototype([String.prototype])) {
                return _this.split(' ').length === count;
            }
            throw new TypeError('hasWordsCount cannot be applied to ' + _this);
        }
    };
}

exports.wrap = function (obj) {
    if (obj !== null) {
        return obj;
    }
    return {isNull: function () {
            return true;
        }
    };
};
