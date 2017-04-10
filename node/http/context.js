var pet = {

}

function Pet(words) {
    this.words = words;
    this.speak = function() {
        console.log(this.words);
    }
}
var cat = new Pet('miao');
// cat.speak();
