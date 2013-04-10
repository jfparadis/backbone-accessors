// Backbone Accessors plugin
// http://github.com/jfparadis/backbone-accessors
//
// Adds named accessors to backbone models.
//
// Released under the MIT license.
//
// Usage:
// var Model = Backbone.Model.extend({
//     defaults: {
//         firstName   : 'Jack',
//         lastName    : 'Monoly'
//     },
// });
// Backbone.accessors.apply(Model);
// var model = new Model();
//
// Get:
// model.getFirstName();
// model.getLastName();
//
// Set:
// model.setFirstName('Mary');
// model.setFirstName('Poppins');
//
// Has:
// model.hasFirstName();
// model.hasLastName();
//
// Unset:
// model.unsetFirstName();
// model.unsetLastName();
//
Backbone.accessors = function () {
    'use strict';

    var that = this;

    function capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _.each(this.prototype.defaults, function (unused, field) {
        var key = capitalise(field);

        if (!that['get' + key]) {
            that.prototype['get' + key] = function () {
                return this.get(field);
            };
        }

        if (!that['set' + key]) {
            that.prototype['set' + key] = function (value) {
                return this.set(field, value);
            };
        }

        if (!that['has' + key]) {
            that.prototype['has' + key] = function () {
                return this.has(field);
            };
        }

        if (!that['unset' + key]) {
            that.prototype['unset' + key] = function () {
                return this.unset(field);
            };
        }
    });
};
