const w2v = require("word2vec");

var model;

console.log("Loading model");
w2v.loadModel('../vectors.bin', function( error, loadedModel ) {
    console.log("Model loaded");
    model = loadedModel;
});

/// Returns a word which is the sum of the two input words.
/// Returns null if either word is not in the model.
function mergeWords(word1, word2) {
    let word1Lower = word1.toLowerCase();
    let word2Lower = word2.toLowerCase();
    let vec1 = model.getVector(word1Lower);
    let vec2 = model.getVector(word2Lower);
    if (vec1 == null || vec2 == null) {
        return null;
    }
    let result = vec1.add(vec2);
    let nearestWords = model.getNearestWords(result, 5);
    let nearestStrings = nearestWords.map(item => item.word.toLowerCase());

    for (let nearestString of nearestStrings) {
        if (nearestString != word1Lower && nearestString != word1Lower + 's' && nearestString != word2Lower && nearestString != word2Lower + 's') {
            console.log(`{${word1}, ${word2}} -> ${nearestString}`);
            return nearestString;
        }
    }
    return null;
}

module.exports = mergeWords;
