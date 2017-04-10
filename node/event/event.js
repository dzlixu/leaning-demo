var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();
life.setMaxListeners(3);
life.on('myevent', function(who) {
    console.log('给' + who + "倒水！");
})
life.on('myevent', function(who) {
    console.log('给' + who + "揉肩！");
})
life.on('myevent', function(who) {
    console.log('给' + who + "2");
})
life.on('myevent', function(who) {
    console.log('给' + who + "3");
})


life.emit('myevent', '汉子');