/**
 * 快速排序
 */
function quickSort(arr) {
    var len;
    len = arr.length;
    if (len <= 1) {
        return arr; //如果数组只有一个数，就直接返回；
    }
    midlen = Math.floor(len / 2);
    // mid = arr[midlen];
    var mid = arr.splice(midlen, 1)[0];
    // console.log(mid);
    var left = [];
    var right = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] < mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // console.log(left.concat([mid],right));
    return quickSort(left).concat([mid], quickSort(right));
}
//test
console.log(quickSort([9, 2, 8, 5, 1]));

/**
 * 数组API
 */
//String()
var arr = [3, 4, 8, 1, 9, 6];
console.log(String(arr));
//join();
console.log(arr.join(";"));
//链接获取子字符串 
var arr1 = [10, 10];
var newArr = arr.concat(0, 0, arr1);
console.log(newArr);
console.log(arr.slice(1, 3));
//数组的删除插入和替换
var spArr1 = arr.splice(1, 2, 6, 3);
console.log(spArr1);
console.log(arr);

/**
 * 冒泡排序
 * 冒泡排序的思想是，比较相邻两个数，如果前者大于后者，就把两个数交换位置；
 * 这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过n-1轮，就完成了所有数的排序
 */
function bubble(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
var n = 10;

function fun() {
    n++;
    console.log(n);
}
fun(n);
console.log(n);

/**
 * 斐波那契数列
 */
//递归
function Fib(n) {
    if (n < 2) {
        return 1;
    } else {
        return Fib(n - 2) + Fib(n - 1);
    }
}
console.log(Fib(10)); // 55

// 动态规划来实现
function Fib(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr[i] = 0;
    }
    if (n == 1 || n == 2) {
        return 1;
    } else {
        arr[1] = 1;
        arr[2] = 1;
        for (var i = 3; i <= n; i++) {
            arr[i] = arr[i - 2] + arr[i - 1];
        }
        return arr[n - 1];
    }
}

console.log(Fib(10)); // 55

