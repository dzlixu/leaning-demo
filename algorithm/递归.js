/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-30 19:30:05
 * @version $Id$
 */
function test(n) {
    if (n > 1) { 
        return n * test(n-1);
    } else {
        return 1;
    }

}

test(5);