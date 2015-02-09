force-front
===========

for adding the design folder just run

`grunt reload-design`

--- Feb 09 2015
* jQuery version 1.8.x getting issue with drag and drop. The error can be fixed by the installed jquery using npm install (already in package.json)
* added jQuery Migrate to have backward compatibility.

--- Feb 03 2015
* Added DatetimePicker library in 'bootstrap' template: http://angular-ui.github.io/bootstrap/
* Use npm install to install the library

--- Feb 02 2015
* Single Line widget is implemented after FOR-30 (LocalStorage), so it may not working correctly with previously saved data.
  To test it accurately please restart grunt dev-server and clear LocalStorage before doing functional test.

--- Jan 12 2015
* Now 'grunt dev-server' doesn't open a browser. It's really annoying if you use your browser session for other things.
* Now the force-design is compiled into a single CSS in the build folder. Use `grunt reload-design' for pulling the new design and recompile
* Added ngDragAndDrop, we must use it instead of the jquery plugin.

--- Jan 05 2015
* Run 'grunt dev-server'
* grunt will automatically open the browser
* reload the browser at http://localhost:8081 to refresh the application if needed.