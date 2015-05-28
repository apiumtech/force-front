force-front
===========


### Add Dependencies
Make sure you have bower and npm installed, then run 

> npm install && bower install

to install all dependencies


### Add new class & its test
To generate the class and its test class, run the following command

> grunt gentest:[path_to_implementation_class]

for example:

> grunt gentest:modules/literals/custom/CustomLiteralsService

will generate the following files:

> app/modules/literals/custom/CustomLiteralsService.js

> test/src/modules/literals/custom/CustomLiteralsServiceTestSpec.js


it will generate a test class for the implement class if the test class doesn't exist. If the implement class doesn't exist it will create both files. The file will be added to GIT automatically.


### Adding new module

To generate CMVP for a module, run following command

> grunt genModule:[path_to_module]:[feature_name]

for example:

> grunt genModule:documents/filter:DocumentFilter

will generate the following files:

> app/modules/documents/filter/DocumentFilterController.js

> app/modules/documents/filter/DocumentFilterModel.js

> app/modules/documents/filter/DocumentFilterView.js

> app/modules/documents/filter/DocumentFilterPresenter.js

> test/src/modules/documents/filter/DocumentFilterControllerTestSpec.js

> test/src/modules/documents/filter/DocumentFilterModelTestSpec.js

> test/src/modules/documents/filter/DocumentFilterViewTestSpec.js

> test/src/modules/documents/filter/DocumentFilterPresenterTestSpec.js


### Adding route for a module

Run the following command to generate routes.js class:

> grunt genroute:[module_name]

for example:

> grunt genroute:literals

will generate the following file:

> app/modules/literals/routes.js

It will generate a routes.js file in /app/modules/<module_name>/ folder


### LESS files

LESS files in all modules will be compiled automatically when 

> grunt build 

or 

> grunt testAndBuild

or 

> grunt buildCss

is run


### Run project

> grunt dev-server


### Feb 09 2015
* jQuery version 1.8.x getting issue with drag and drop. The error can be fixed by the installed jquery using npm install (already in package.json)
* added jQuery Migrate to have backward compatibility.

### Feb 03 2015
* Added DatetimePicker library in 'bootstrap' template: http://angular-ui.github.io/bootstrap/
* Use npm install to install the library

### Feb 02 2015
* Single Line widget is implemented after FOR-30 (LocalStorage), so it may not working correctly with previously saved data.
  To test it accurately please restart grunt dev-server and clear LocalStorage before doing functional test.

### Jan 12 2015
* Now 'grunt dev-server' doesn't open a browser. It's really annoying if you use your browser session for other things.
* Now the force-design is compiled into a single CSS in the build folder. Use `grunt reload-design' for pulling the new design and recompile
* Added ngDragAndDrop, we must use it instead of the jquery plugin.

### Jan 05 2015
* Run 'grunt dev-server'
* grunt will automatically open the browser
* reload the browser at http://localhost:8081 to refresh the application if needed.