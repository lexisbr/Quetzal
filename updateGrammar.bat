tsc
cd .\Gramatica\
jison .\grammar.jison
cd ..

browserify index.js > bundle.js

