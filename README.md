# Backbone.accessors

This plugin generates accessors from the fields of a [Backbone.js](http://documentcloud.github.com/backbone) model. For each field `XXX`, the `setXXX()`, `getXXX()`, `hasXXX()`, and `unsetXXX()` methods are added. For clarity and readability, the first letter of each `XXX` filed is converted to uppercase.

Example:

| Without accessor:    | With accessor:    |
| -------------------- | ----------------- |
| model.get('name')    | model.getName()   |
| model.set('name')    | model.setName()   |
| model.has('name')    | model.hasName()   |
| model.unset('name')  | model.unsetName() |

This plugin is compatible with AMD provided the proper shim is added.

This approach is inspired by [Propel](http://propelorm.org), an Object-Relational Mapping (ORM) for PHP.


## Getting started

1. Include Backbone in your project before including the Backbone.accessors plugin.

2. In your models, add all fields requiring accessors to the `defaults` object. Set the value to `undefined` where no default value is desired:

	```javascript
    var Model = Backbone.Model.extend({

        defaults: {
            id          : undefined,
            firstName   : 'Mary',
            lastName    : 'Poppins'
        },
    });
	```

3. Apply the accessor mixin to each model.

	```javascript
    Backbone.accessors.apply(Model);
	```

4. Use your model normally, replacing the calls to `get()`, `set()`, `has()`, `unset()` with the custom ones:

	```javascript
    var model = new Model();

	// model.set('id', 10);
    model.setId(10);
	```
Note: you can mix both types of accesors. 


## Justification

On larger projects, there is always a concern with maintaining the magic strings and numbers which are often found in JavaScript code:

```javascript
model.set('firstName', name); // 'firstName' is a magic string
```

One solution is to populate and use a constant object, an approach commonly used in strongly-typed languages such as Java and C#:

```javascript
var Constants = {
	NameModel: {
		id 			:'id',
		firstName 	: 'firstName',
		lastName 	: 'lastName'
	}
}

model.set(Constants.NameModel.firstName, name); // 'firstName' is gone
```
While intended to generate an error if there is a typo in `Constants.NameModel.firstName`, this approach will fail silently if the last identifier of the notation (in practice the most complex) has a mistake in it:

```
model.get(Constants.NameModel.firstNaame); // return 'undefined', no error
model.set(Constants.NameModel.firstNaame, name); // no error
```

On the other hand, with accessors, there is less code to type, no constant file to carry around, and the code will immediately fail (fail hard) if there is a typo in the variable name:

```
model.getFirstNaame(); // runtime error
model.setFirstNaame(name); // runtime error
```

