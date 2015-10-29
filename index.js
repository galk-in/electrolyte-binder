module.exports = new Binder();
var path = require('path');
var fs = require('fs');
var existsSync = fs.existsSync || path.existsSync; // node <=0.6

/**
 * @constructor
 */
function Binder() {
  this._binding = [];
}

/**
 * @param id {String}
 * @returns {*}
 */
Binder.prototype.loader = function (id) {
  var binding = this._binding[id];
  if (!binding) return;
  switch (binding.type) {
    case 'script':
      if (!existsSync(binding.value)) return;
      return require(binding.value);
      break;
    case 'module':
      try {
        var module = require(id);
        module['@literal'] = true;
        return module;
      } catch (e) {
        return;
      }
      break;
    case 'value':
      return binding.value;
      break;
  }
}

/**
 * @param id {String}
 * @param path {String}
 */
Binder.prototype.addScriptBinding = function (id, path) {
  if ('string' == typeof id) throw Error('Expected id\'s type is string, but id is ' + id);
  if ('string' == typeof path) throw Error('Expected path\'s type is string, but path is ' + path);
  this._binding[id] = {type: 'script', value: path};
}

/**
 *
 * @param id {String}
 * @param moduleName {String}
 */
Binder.prototype.addModuleBinding = function (id, moduleName) {
  if ('string' == typeof id) throw Error('Expected id\'s type is string, but id is ' + id);
  if ('string' == typeof moduleName) throw Error('Expected moduleName\'s type is string, but moduleName is ' + path);
  this._binding[id] = {type: 'module', value: moduleName};
}
/**
 *
 * @param id {String}
 * @param value {*}
 */
Binder.prototype.addValueBinding = function (id, value) {
  if ('string' == typeof id) throw Error('Expected id\'s type is string, but id is ' + id);
  this._binding[id] = {type: 'value', value: value};
}