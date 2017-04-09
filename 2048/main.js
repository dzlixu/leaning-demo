var game = {
        data: null, //保存一个二维数组
        RN: 4, //总行数
        CN: 4, //总列数
        score: 0, //游戏得分
        state: 1, //游戏状态，1是运行中，0是结束
        RUNNING: 1, //运行中
        GAMEOVER: 0, //结束
        start: function() { //启动游戏
            this.state = this.RUNNING; //初始化游戏的运行状态
            this.score = 0; //初始化游戏得分
            this.data = [];
            for (var r = 0; r < this.RN; r++) {
                this.data.push([]);
                for (var c = 0; c < this.CN; c++) {
                    this.data[r][c] = 0;
                }
            } //(遍历结束)
            this.randomNum(); //调用randomNumd（）方法
            this.randomNum(); //调用randomNumd（）方法
            this.updateView();
            var me = this; //留住this
            // 为当前页面绑定键盘事件
            document.onkeydown = function(e) {
                console.log(e.keyCode);
                if (me.state == me.RUNNING) {
                    switch (e.keyCode) {
                        case 37:
                            me.moveLeft();
                            break;
                        case 38:
                            me.moveUp();
                            break;
                        case 39:
                            me.moveRight();
                            break;
                        case 40:
                            me.moveDown();
                            break;
                    }
                }

            }
        },
        isGameover: function() { //判断游戏是否结束
            //遍历data中的每一个元素
            for (var r = 0; r < this.RN; r++) {
                for (var c = 0; c < this.CN; c++) {
                    //如果当前元素等于0
                    if (this.data[r][c] == 0) {
                        //返回false
                        return false;
                    }
                    //如果c<CN-1而且单签元素等于右侧元素
                    if (c < this.CN - 1 && this.data[r][c] == this.data[r][c + 1]) {
                        return false //返回false
                    }
                    //如果r<RU-而且当前元素等于下方元素
                    if (r < this.RN - 1 && this.data[r][c] == this.data[r + 1][c]) {
                        return false //返回false
                    }
                }
            }
            return true;
            //遍历结束，返回true
        },
        move: function(fun) {
            var before = String(this.data);
            fun.call(this);
            var after = String(this.data);
            console.log(before);
            console.log(after);
            if (before != after) {
                this.randomNum();
                if (this.isGameover()) {
                    this.state = this.GAMEOVER;
                }
                this.updateView();
            }
        },
        moveDown: function() {
            this.move(function() {
                for (var c = 0; c < this.CN; c++) {
                    this.moveDownInCol(c);
                }
            })
        },
        moveDownInCol: function(c) {
            for (var r = this.RN - 1; r > 0; r--) {
                var prevr = this.getPrevInCol(r, c);
                if (prevr == -1) { break; } else {
                    if (this.data[r][c] == 0) {
                        this.data[r][c] = this.data[prevr][c];
                        this.data[prevr][c] = 0;
                        r++;
                    } else if (this.data[r][c] == this.data[prevr][c]) {
                        this.data[r][c] *= 2;
                        this.score += this.data[r][c];
                        this.data[prevr][c] = 0;
                    }
                }
            }
        },
        getPrevInCol: function(r, c) {
            for (var prevr = r - 1; prevr >= 0; prevr--) {
                if (this.data[prevr][c] != 0) {
                    return prevr;
                }
            }
            return -1;
        },
        moveUp: function() {
            this.move(function() {
                for (var c = 0; c < this.CN; c++) {
                    this.moveUpInCol(c);
                }
            })

        },
        moveUpInCol: function(c) {
            for (var r = 0; r < this.RN; r++) {
                var nextr = this.getNextInCol(r, c);
                if (nextr == -1) { break; } else {
                    if (this.data[r][c] == 0) {
                        this.data[r][c] = this.data[nextr][c];
                        this.data[nextr][c] = 0;
                        r--;
                    } else if (this.data[r][c] = this.data[nextr][c]) {
                        this.data[r][c] *= 2;
                        this.score = this.data[nextr][c];
                        this.data[nextr][c] = 0;
                    }
                }
            }
        },
        getNextInCol(r, c) {
            for (var nextr = r + 1; nextr < this.RN; nextr++) {
                if (this.data[nextr][c] != 0) {
                    return nextr;
                }
            }
            return -1;
        },
        moveRight: function() {
            this.move(function() {
                for (var r = 0; r < this.RN; r++) {
                    this.moveRightInRow(r);
                }
            })
        },
        moveRightInRow: function(r) {
            for (var c = this.CN - 1; c > 0; c--) {
                var prevc = this.getPrevInRow(r, c);
                if (prevc == -1) { break; } else {
                    if (this.data[r][c] == 0) {
                        this.data[r][c] = this.data[r][prevc];
                        this.data[r][prevc] = 0;
                        c++;
                    } else if (this.data[r][c] == this.data[r][prevc]) {
                        this.data[r][c] *= 2;
                        this.score += this.data[r][c];
                        this.data[r][prevc] = 0;
                    }
                }
            }
        },
        getPrevInRow: function(r, c) {
            for (var prevc = c - 1; prevc >= 0; prevc--) {
                if (this.data[r][prevc] != 0) {
                    return prevc;
                }
            }
            return -1;
        },
        moveLeft: function() { //左移所有行
            this.move(function() {
                for (var r = 0; r < this.RN; r++) {
                    this.moveLeftInRow(r);
                }
            })
        },
        moveLeftInRow: function(r) { //左移动第r行
            for (var c = 0; c < this.CN - 1; c++) {
                var nextc = this.getNextInRow(r, c);
                if (nextc == -1) { break; } else {
                    if (this.data[r][c] == 0) {
                        this.data[r][c] == this.data[r][nextc];
                        this.data[r][nextc] = 0;
                        c--;
                    } else if (this.data[r][c] == this.data[r][nextc]) {
                        this.data[r][c] *= 2;
                        this.score += this.data[r][c];
                        this.data[r][nextc] = 0;
                    }
                }
            }
        },
        getNextInRow: function(r, c) { //查找r行c列右侧下一个不为0的位置
            for (var nextc = c + 1; nextc < this.CN; nextc++) {
                if (this.data[r][nextc] != 0) {
                    return nextc;
                }
            }
            return -1;
        },
        updateView: function() { //将data中的元素，更新到页面的格子div中
            //r从0开始，到<RN结束，每次增1
            for (var r = 0; r < this.RN; r++) {
                //c从0开始，到<CN结束，每次增1
                for (var c = 0; c < this.CN; c++) {
                    //查找id为c+r+c的div元素，保存在变量div中
                    var div = document.getElementById("c" + r + c);
                    //如果data中r行c列的等于0
                    if (this.data[r][c] == 0) {
                        div.innerHTML = ""; //设置div的内容为空字符串
                        div.className = "cell"; //设置div的className为"cell"
                    } else { //否则
                        //设置div的内容为data中r行c列的值
                        div.innerHTML = this.data[r][c];
                        //设置div的className为"cell n"+data中r行c列的值
                        div.className = "cell n" + this.data[r][c];
                    }
                }
            }
        },
        randomNum: function() { //在随机位置生成一个数字
            while (true) { //反复生成数字（死循环）
                //在0~RN-1之间生成一个随机的行号，保存在r中
                var r = Math.floor(Math.random() * this.RN);
                //在0~CN-1之间生成一个随机的列号，保存在c中
                var c = Math.floor(Math.random() * this.CN);
                if (this.data[r][c] == 0) { //如果data中r行c列为0
                    //随机生成一个数字保存在变量num中
                    var num = Math.random();
                    //设置data中r行c列的元素值为:
                    //如果num<0.5,就设置2为,否则就设置为4
                    this.data[r][c] = num < 0.6 ? 2 : 4;
                    break; //退出循环
                }
            }
        }
    }
    //当页面加载后，自动启动
window.onload = function() { game.start(); }