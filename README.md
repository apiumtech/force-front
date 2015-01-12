force-front
===========

for adding the design folder just run

`grunt shell:config`

--- Jan 12 2015
* Now 'grunt dev-server' doesn't open a browser. It's really annoying if you use your browser session for other things.
* Now the force-design is compiled into a single CSS in the build folder. Use `grunt reload-design' for pulling the new design and recompile
* Added ngDragAndDrop, we must use it instead of the jquery plugin.

--- Jan 05 2015
* Run 'grunt dev-server'
* grunt will automatically open the browser
* reload the browser at http://localhost:8081 to refresh the application if needed.