var tetris={
  CSIZE:26,//每个格子的大小
  OFFSET:15,//边框需要修正的距离
  RN:20,//总行数
  CN:10,//总列数
  pg:null,//保存游戏主界面div
  shape:null,//正在下落的主角图形
  timer:null,//保存定时器序号
  interval:500,//保存下落速度
  wall:null,//保存停止下落的格子的墙数组
  lines:0,//保存消除的总行数
  score:0,//保存总得分
  SCORES:[0,10,30,60,150],
        //0 1  2  3  4
  nextShape:null,//保存下一个备胎图形
   state:1,
	GAMEOVER:0,
	RUNNING:1,
	PAUSE:2,
	IMGS:{
	GAMEOVER:"img/game-over.png",
	PAUSE:"img/pause.png"
	},
    paintState:function(){
		 var img=new Image();//创建一个img
		 if(this.state==this.PAUSE){//发百年state为PAUSE
			img.src=this.IMGS.PAUSE;
		 }else if(this.state==this.GAMEOVER){
			 img.src=this.IMGS.GAMEOVER;
			 }
		 this.pg.appendChild(img);//img追加到pg中
	},
	pause:function(){//负责暂停
		clearInterval(this.timer);//停止周期计时器
		this.timer=null;//清除timer
		this.state=this.PAUSE;//修改游戏的state为PAUSE
		this.paint();//重绘一切
	},
	myContinue:function(){
		this.state=this.RUNNING;//修改游戏的状态为RUNNING
		this.paint();//重绘一切
	    this.timer=setInterval(//重启定时器
        this.moveDown.bind(this),
        this.interval)
	},
  randomShape:function(){
	//在0-6之间调一个,保存在变量r中
	var r=parseInt(Math.random()*7);
	//判断r如果是0，返回一个O对象，如果是1就返回一个I对象
	switch(r){
		case 0:return new O();
		case 1:return new I();
		case 3:return new T();
		case 4:return new S();
		case 5:return new Z();
		case 6:return new J();
		case 7:return new L();
	}
  },
  start:function(){//启动游戏
	  //初始化游戏状态为RUNNING
	  this.state=this.RUNNING;
    //将lines和score清0
    this.lines=0;
    this.score=0;
    //将wall初始化为空数组
    this.wall=[];
    //r从0开始，到<RN结束，每次增1
    for(var r=0;r<this.RN;r++){
      //设置wall中r位置为一个CN个空元素的新数组
      this.wall[r]=new Array(this.CN);
    }
    //找到class为playground的div，保存在pg属性中
    this.pg=
      document.getElementsByClassName(
        "playground"
      )[0];
    //创建一个T图形，保存在shape属性中
	 this.shape=this.randomShape();
	 this.nextShape=this.randomShape();
    this.paint();//重绘一切
    //启动周期性定时器,传入moveDown方法提前绑定this，设置时间间隔为interval,将序号保存在timer属性中
    this.timer=setInterval(
      this.moveDown.bind(this),
      this.interval
    );
    var me=this;//留住this
    //为当前页面绑定键盘按下事件为
    document.onkeydown=
      function(e){
      //判断键盘号
		  switch(e.keyCode){
			case 40: //下 
			 me.state==me.RUNNING && me.moveDown();
			  break;
			case 37: 
			  me.state==me.RUNNING &&me.moveLeft();
			  break;
			case 39:
			  me.state==me.RUNNING &&me.moveRight();
			  break;
			case 38:
			  me.state==me.RUNNING &&me.rotateR();
			  break;
			case 90://z
			  me.state==me.RUNNING&&me.rotateL();
			  break;
			case 80://p
				me.state==me.RUNNING&&me.pause();break;//P
			case 67://C
				me.state==me.PAUSE&&me.myContinue();break;
			case 81://Q
				me.state!=me.GAMEOVER&&me.quit();break;
			case 83:
				me.state==me.GAMEOVER&&me.start();break;//S
      }
     }
  },
  canRotate:function(){//检测旋转是否成功
    //遍历主角图形中每个格子
	for(var i=0;i<this.shape.cells.length;i++){
      //将当前格子保存在变量cell中
	  var cell=this.shape.cells[i];
      //如果当前格子的r<0或r>=RN或c<0或c>=CN
		if(cell.r<0
			||cell.r>=this.RN
			||cell.c<0
			||cell.c>=this.CN
			||this.wall[cell.r+1][cell.c]
			||this.wall[cell.r][cell.c-1]
			||this.wall[cell.r][cell.c+1]){
        //返回false
		return false;
		}
    }//(遍历结束)
    return true;//返回true
  },
  rotateR:function(){//顺时针旋转
    //调用主角图形的rotateR方法
	this.shape.rotateR();
    //如果不能旋转
	if(!this.canRotate()){
      //再调用主角图形的rotateL方法
		this.shape.rotateL();
	}
  },
  rotateL:function(){//逆时针旋转
    //调用主角图形的rotateL方法
	this.shape.rotateL();
    //如果不能旋转
	if(!this.canRotate()){
      //再调用主角图形的rotateR方法
		this.shape.rotateR();
	}
  },
  canDown:function(){//判断是否可以下落
    //遍历主角图形中每个格子
    for(var i=0;
      i<this.shape.cells.length;
      i++){
      //将当前格子保存在变量cell中
      var cell=this.shape.cells[i];
      //如果当前格子的r等于RN-1
      if(cell.r==this.RN-1){
        return false;//返回false
      }
      //如果wall中，cell的下方位置不为空
      if(this.wall[cell.r+1][cell.c]){
        return false;//返回false
      }
    }//(遍历结束)
    return true;//返回true
  },
	//将停止下落的主角图形，放入墙中相同位置
  landIntoWall:function(){
    //遍历主角图形中每个cell
    for(var i=0;
        i<this.shape.cells.length;
        i++){
      //将当前cell保存在变量cell中
      var cell=this.shape.cells[i];
      //将cell保存到wall中相同r，c的位置
      this.wall[cell.r][cell.c]=cell;
    }
  },
  canLeft:function(){//用于检测能否左移
    //遍历主角图形中每个格子
    for(var i=0;
        i<this.shape.cells.length;
        i++){
      //将当前格保存在变量cell中
      var cell=this.shape.cells[i];
      //如果cell的c等于0
      if(cell.c==0){
        return false;//返回false
      }
      //如果wall中cell左侧有格
      if(this.wall[cell.r][cell.c-1]){
        return false;//返回false
      }
    }//(遍历结束)
    return true;//返回true
  },
  moveLeft:function(){//将主角左移一步
    //如果可以左移
    if(this.canLeft()){
      //调用主角图形的moveLeft方法
      this.shape.moveLeft();
      this.paint();//重绘一切
    }
  },
  canRight:function(){//用于检测能否右移
    //遍历主角图形中每个格子
    for(var i=0;
        i<this.shape.cells.length;
        i++){
      //将当前格保存在变量cell中
      var cell=this.shape.cells[i];
      //如果cell的c等于CN-1
      if(cell.c==this.CN-1){
        return false;//返回false
      }
      //如果wall中cell右侧有格
      if(this.wall[cell.r][cell.c+1]){
        return false;//返回false
      }
    }//(遍历结束)
    return true;//返回true
  },
  moveRight:function(){//将主角右移一步
    //如果可以右移
    if(this.canRight()){
      //调用主角图形的moveRight方法
      this.shape.moveRight();
      this.paint();//重绘一切
    }
  },
  moveDown:function(){
		if(this.canDown()){//如果可以下落
		  //调用主角图形shape的moveDown方法
		  this.shape.moveDown();
		}else{//否则
		  //将主角落入墙中
		  this.landIntoWall();
		  //判断并删除行
		  var ln=this.deleteRows();
		  this.lines+=ln;
		  this.score+=this.SCORES[ln];
		  //如果游戏没有结束
		  if(!this.isGameOver()){
		  this.shape=this.nextShape;
		  this.nextShape=this.randomShape();
		  }else{
		  //否则
			this.quit();//退出游戏
			}
		}
		this.paint();//重绘一切
	},
	quit:function(){//退出游戏
		this.state=this.GAMEOVER;//修改游戏状态为GAMEOVER
		clearInterval(this.timer);//停止计时器，清空timer，重绘一切
		this.timer=null;
		this.paint();
	},
  isGameOver:function(){
	//遍历备胎图形中每个cell
	for (var i=0;i<this.nextShape.cells.length;i++ ){
		//将当前cell、保存在cell中
		var cell=this.nextShape.cells[i];
		//如果wall中cell相同位置有格
		if(this.wall[cell.r][cell.c]){
			return true;//返回true
		}
	}
	return false;//遍历结束，返回false
  },
  paintScore:function(){//将行数写到页面
    //设置id为score的元素的内容为当前对象的score属性
    score.innerHTML=this.score;
    //设置id为lines的元素的内容为当前对象的lines属性
    lines.innerHTML=this.lines;
  },
  deleteRows:function(){//删除所有行
    //自底向上遍历wall中每一行，同时声明变量ln为0
    for(var r=this.RN-1,ln=0;r>=0;r--){
      //如果当前行为空,就返回ln
      if(this.wall[r].join("")==""){
        return ln;
      }
      //如果为当前行拍照后，找不到/^,|,,|,$/
      if(String(this.wall[r]).search(
          /^,|,,|,$/)==-1){
        this.deleteRow(r);//删除第r行
        r++;//r留在原地
        ln++;//ln+1
        //如果ln等于4，就返回ln
        if(ln==4){return ln;}
      }
    }
  },
  deleteRow:function(r){//删除第r行
    //从r开始，自底向上遍历wall中每一行
    for(;r>=0;r--){
      //将wall中上一行赋值给当前行
      this.wall[r]=this.wall[r-1];
      //遍历wall中当前行的每个格
      for(var c=0;c<this.CN;c++){
        //如果当前格有效，就将当前格的r+1
        if(this.wall[r][c]){
          this.wall[r][c].r++;
        }
      }//(遍历结束)
      //将上一行置为CN个空元素的新数组
      this.wall[r-1]=new Array(this.CN);
      //如果当前行的-2行为空，就退出循环
      if(this.wall[r-2].join("")==""){
        break;
      }
    }
  },
  paint:function(){//重绘一切
    //将pg的内容中和/<img[^>]+>/g匹配的内容删除，将结果再赋值回pg的内容中
    this.pg.innerHTML=
      this.pg.innerHTML.replace(
        /<img[^>]+>/g,"");
    this.paintShape();//重绘主角图形
    this.paintWall();//重绘墙
    this.paintScore();//重绘分数
	this.paintNext();
	this.paintState();
  },
  paintNext:function(){
	//创建文档片段frag
    var frag=document.createDocumentFragment();
    //自底向上遍历wall中每一行
    for(var i=0;i<this.nextShape.cells.length;i++){
       //将当前cell保存在变量cell中
       var cell=this.nextShape.cells[i];
	   var img=new Image();//创建img元素
       //设置img的src为cell的src
       img.src=cell.src;
      //设置img的top为CSIZE*cell的r+OFFSET
       img.style.top=this.CSIZE*(cell.r+1)+this.OFFSET+"px";
		//设置img的left为CSIZE*cell的c+OFFSET
	  img.style.left=this.CSIZE*(cell.c+10)+this.OFFSET+"px";
		//将img追加到frag中
		frag.appendChild(img);
	}
    //将frag追加到pg中
    this.pg.appendChild(frag);
  },
  paintWall:function(){//重绘墙
    //创建文档片段frag
    var frag=
      document.createDocumentFragment();
    //自底向上遍历wall中每一行
    for(var r=this.RN-1;r>=0;r--){
      //如果wall中当前行无缝拼接后是""
      if(this.wall[r].join("")==""){
        break;//退出循环
      }
      //遍历当前行中每一列
      for(var c=0;c<this.CN;c++){
        //将wall中当前格保存在变量cell中
        var cell=this.wall[r][c];
        if(cell){//如果cell有效
          this.paintCell(cell,frag);
        }
      }
    }//(遍历结束)
    //将frag追加到pg中
    this.pg.appendChild(frag);
  },
  paintCell:function(cell,frag){
    var img=new Image();//创建img元素
    //设置img的src为cell的src
    img.src=cell.src;
    //设置img的top为CSIZE*cell的r+OFFSET
    img.style.top=
    this.CSIZE*cell.r+this.OFFSET+"px";
    //设置img的left为CSIZE*cell的c+OFFSET
    img.style.left=
    this.CSIZE*cell.c+this.OFFSET+"px";
    //将img追加到frag中
    frag.appendChild(img);
  },
  paintShape:function(){//绘制主角图形
    //创建文档片段frag
    var frag=
      document.createDocumentFragment();
    //遍历主角图形shape中的cells数组
    for(var i=0;
        i<this.shape.cells.length;
        i++){
      //将当前cell保存在变量cell中
      var cell=this.shape.cells[i];
      this.paintCell(cell,frag);
    }//(遍历结束)
    //将frag追加到pg中
    this.pg.appendChild(frag);
  },
}
window.onload=function(){tetris.start();}