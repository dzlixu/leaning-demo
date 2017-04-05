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
            // this.randomView(); //更新页面
            var me = this; //留住this
            // 为当前页面绑定键盘事件
            document.onkeydown = function(e) {
                if (me.state == me.RUNNING) {
                    switch (e.keyCode) {
                        case 37:
                            this.moveLeft();
                            break;
                        case 38:
                            this.moveUp();
                            break;
                        case 39:
                            this.moveRight();
                            break;
                        case 40:
                            this.moveDown();
                            break;
                        case 100:
                            this.moveUp();
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
            //遍历结束，返回true
        },
        moveLeft: function() { //左移所有行

        },
        moveLeftInRow: function(r) { //左移动第r行

        },
        getNextInRow: function() { //查找r行c列右侧下一个不为0的位置

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
                    this.data[r][c] = num < 0.5 ? 2 : 4;
                    break; //退出循环
                }
            }
        },
    }
    //当页面加载后，自动启动
window.onload = function() { game.start(); }