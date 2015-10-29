module.exports = new Binder();
var path = require('path');
var fs = require('fs');
var existsSync = fs.existsSync || path.existsSync; // node <=0.6
/**
 * @constructor
 */
function Binder() {
  this._bindings = [];
}

/**
 * @returns Loader function for electrolyte
 */
Binder.prototype.makeLoader = function() {
  var bindings = this._bindings;
  return function(id) {
    var binding = bindings[id];
    if (!binding) return;
    switch (binding.type) {
      case 'script':
        var script = path.resolve(binding.value);
        if (!existsSync(script)) return;
        return require(script);
        break;
      case 'module':
        try {
          var module = require(binding.value);
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
  };
};

/**
 * @param id {String}
 * @param path {String}
 */
Binder.prototype.addScriptBinding = function(id, path) {
  if (typeof id !== 'string') throw Error('Expected id\'s type is string, but id is ' + id);
  if (typeof path !== 'string') throw Error('Expected path\'s type is string, but path is ' + path);
  if (path.substr(path.length - 3) !== '.js'
    &&  path.substr(path.length - 5) !== '.json') path = path + '.js';
  this._bindings[id] = {type: 'script', value: path};
};

/**
 *
 * @param id {String}
 * @param moduleName {String}
 */
Binder.prototype.addModuleBinding = function(id, moduleName) {
  if (typeof id !== 'string') throw Error('Expected id\'s type is string, but id is ' + id);
  if (typeof moduleName !== 'string') throw Error('Expected moduleName\'s type is string, but moduleName is ' + path);
  this._bindings[id] = {type: 'module', value: moduleName};
};
/**
 *
 * @param id {String}
 * @param value {*}
 */
Binder.prototype.addValueBinding = function(id, value) {
  if (typeof id !== 'string') throw Error('Expected id\'s type is string, but id is ' + id);
  this._bindings[id] = {type: 'value', value: value};
};
