var Person = (function () {
    function Person(config) {
        this.config = config;
    }
    return Person;
}());
var p1 = new Person({
    name: 'lx',
    age: 23
});
var Sheep = (function () {
    function Sheep() {
    }
    Sheep.prototype.eat = function () {
        console.log('i am eat gear');
    };
    return Sheep;
}());
var Tiger = (function () {
    function Tiger() {
    }
    Tiger.prototype.eat = function () {
        console.log('i am eat meat');
    };
    return Tiger;
}());
var sheep = new Sheep();
sheep.eat();
var tiger = new Tiger();
tiger.eat();
//# sourceMappingURL=ts.js.map