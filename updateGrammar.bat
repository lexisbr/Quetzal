cd .\Gramatica\
jison .\grammar.jison
cd ..
tsc
browserify index.js > bundle.js

