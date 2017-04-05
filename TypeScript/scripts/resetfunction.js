/**
 * Created by Administrator on 2017/3/30.
 */
function test() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (value) {
        console.log(value);
    });
}
test(1, 2);
