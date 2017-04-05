/**
 * Created by Administrator on 2017/3/29.
 */
//接口的用法一
interface IPerson {
    name:string;
    age:number;
}
class Person {
    constructor(public config:IPerson){

    }
}
var p1 = new Person({
    name:'lx',
    age:23
});

//接口的用法二
interface Animal {
    eat();
}
class Sheep implements Animal{
    eat(){
        console.log('i am eat gear');
    }
}
class Tiger implements Animal{
    eat(){
        console.log('i am eat meat');
    }
}
var sheep = new Sheep();
sheep.eat();
var tiger = new Tiger();
tiger.eat();