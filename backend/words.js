const w2v = require("word2vec");

var model;

console.log("Loading model");
w2v.loadModel('../vectors.bin', function( error, loadedModel ) {
    console.log("Model loaded");
    model = loadedModel;
    console.log(mergeWords("king", "woman"));
});

/// Returns a word which is the sum of the two input words.
/// Returns null if either word is not in the model.
function mergeWords(word1, word2) {
    let vec1 = model.getVector(word1);
    let vec2 = model.getVector(word2);
    let result = vec1.add(vec2);
    return model.getNearestWord(result);
}
