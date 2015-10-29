# Electrolyte-binder

This package custom loader for electrolyte package. It implements easy binding. You can bind your script, node module or value.

Also you can overwrite electrolyte loading binds. It is usefull for testing.
**Remember** in electrolyte, if two loaders know same entity, then electrolyte use last loader binding.

## Example
```javascript
var IoC = require('electrolyte');
var Binder = require('@galkin/electrolyte-binder');

Binder.addScriptBinding('userRepository', './my_repository');
Binder.addModuleBinding('mongo', 'mysql');
Binder.addValueBinding('port', process.env.ENV_PORT || 3000);
IoC.use(Binder.makeLoader());

console.log(IoC.create('port'));
```