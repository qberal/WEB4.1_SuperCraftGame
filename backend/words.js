const w2v = require("word2vec");

console.log("Loading model");

w2v.loadModel('../vectors.bin', function( error, model ) {
    console.log("Model loaded");
});
