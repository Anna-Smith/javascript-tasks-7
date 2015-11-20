'use strict';

exports.init = function () {
    Object.prototype.isNull = function () {
        return false;
    };

    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            return getObjectProperties(this);
        }
    });

    Object.defineProperty(String.prototype, 'check', {
        get: function () {
            var _this = this;
            return {
                hasLength: function (length) {
                    return _this.length === length;
                },

                hasWordsCount: function (count) {
                    return _this.match(/[^\s]+/g).length === count;
                }
            };
        }
    });

    Object.defineProperty(Function.prototype, 'check', {
        get: function () {
            var _this = this;
            return {
                hasParamsCount: function (count) {
                    return _this.length === count;
                }
            };
        }
    });

    Object.defineProperty(Array.prototype, 'check', {
        get: function () {
            var _this = this;
            var properties = getObjectProperties(this);
            properties.hasLength = function (length) {
                return _this.length === length;
            };
            return properties;
        }
    });
};

function getObjectProperties(_this) {
    return {
        containsKeys: function (keys) {
            var objKeys = Object.keys(_this);
            return keys.every(function (key) {
                return objKeys.indexOf(key) != -1;
            });
        },

        hasKeys: function (keys) {
            var objKeys = Object.keys(_this);
            return keys.every(function (key) {
                    return objKeys.indexOf(key) != -1;
                }) && keys.length === objKeys.length;
        },

        containsValues: function (values) {
            var objKeys = Object.keys(_this);
            var objValues = objKeys.map(function (key) {
                return _this[key];
            });
            return values.every(function (value) {
                return objValues.some(function (objValue, index) {
                    return objValue === value && delete objValues[index];
                });
            });
        },

        hasValues: function (values) {
            var objKeys = Object.keys(_this);
            return objKeys.every(function (key) {
                return values.indexOf(_this[key]) !== -1 && objKeys.length === values.length;
            });
        },

        hasValueType: function (key, type) {
            if (_this.hasOwnProperty(key)) {
                return typeof _this[key] === typeof type();
            }
            return false;
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
