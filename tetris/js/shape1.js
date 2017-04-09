//描述图形中一个格式的统一类型
function Cell(r,c,src){
  this.r=r; this.c=c; this.src=src;
}
//所有图形的公共父类型
function Shape(cells,src,orgi,states){
  this.cells=cells;
  //遍历cells中每个cell
  for(var i=0;i<this.cells.length;i++){
    //设置当前cell的src属性为src
    this.cells[i].src=src;
  }
  this.orgi=orgi;
  this.states=states;
  //保存图形当前正在使用的状态的下标
  this.statei=0;
}
Shape.prototype.IMGS={//集中保存图片路径
 T:"img/T.png",O:"img/O.png",I:"img/I.png",S:"img/S.png",Z:"img/Z.png",L:"img/L.png",J:"img/J.png"
}
Shape.prototype.moveDown=function(){
  //遍历当前图形的cells数组中每个格子
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].r++;//将当前格子的r+1
  }
}
Shape.prototype.moveLeft=function(){
  //遍历当前图形的cells数组中每个格子
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c--;//将当前格子的c-1
  }
}
Shape.prototype.moveRight=function(){
  //遍历当前图形的cells数组中每个格子
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c++;//将当前格子的c+1
  }
}
Shape.prototype.rotateR=function(){
  //将当前对象的statei+1
  this.statei++;
  //如果statei等于当前对象的states数组中状态的个数，就将statei变回0
   if(this.statei==this.states.length) { this.statei=0;}
	
	this.rotate();
}
Shape.prototype.rotate=function(){
   //获取当前对象的states数组中statei位置的状态，保存在变量state中
	var state=this.states[this.statei];
  //获得当前图形的cells中orgi位置的格子，保存在变量oCell中
		var oCell=this.cells[this.orgi];
  //遍历当前图形中每个cell
	for(var i=0;i<this.cells.length;i++){
    //如果i!=orgi时
	 if(i!=this.orgi){
      //设置当前格子的r为oCell的r+state对象的ri属性值
		this.cells[i].r=oCell.r+state["r"+i];
      //设置当前格子的c为oCell的c+state对象的ci属性值
		this.cells[i].c=oCell.c+state["c"+i];
	 }
	}
}
Shape.prototype.rotateL=function(){
  //将当前对象的statei-1
	this.statei--;
  //如果statei等于-1，就将states数组的length减1
  if(this.statei===-1){
	this.statei=this.states.length-1;
  }
  this.rotate();
}
//定义图形的某种状态对象
function State(r0,c0,r1,c1,r2,c2,r3,c3){
  this.r0=r0; this.c0=c0;
  this.r1=r1; this.c1=c1;
  this.r2=r2; this.c2=c2;
  this.r3=r3; this.c3=c3;
}
function T(){//定义专门描述T图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,3),new Cell(0,4),
     new Cell(0,5),new Cell(1,4)],
    this.IMGS.T,
    1,//参照格的下标
    [         //r0c0r1c1 r2c2 r3c3
      new State(0,-1,0,0,0,+1,+1,0),
      new State(-1,0,0,0,+1,0,0,-1),
      new State(0,+1,0,0,0,-1,-1,0),
      new State(+1,0,0,0,-1,0,0,+1),
    ]
  )
}
Object.setPrototypeOf(
  T.prototype, Shape.prototype
);
function O(){//定义专门描述O图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,4),new Cell(0,5),
     new Cell(1,4),new Cell(1,5)],
    this.IMGS.O,
    0,
    [new State(0,0,0,+1,+1,0,+1,+1)]
  )
}
Object.setPrototypeOf(
  O.prototype, Shape.prototype
);
function I(){//定义专门描述I图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,3),new Cell(0,4),
     new Cell(0,5),new Cell(0,6)],
    this.IMGS.I,
    1,
    [
      new State(0,-1,0,0,0,+1,0,+2),
      new State(-1,0,0,0,1,0,2,0)
    ]
  )
}
Object.setPrototypeOf(
  I.prototype, Shape.prototype
);
function S(){//定义专门描述S图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,4),new Cell(0,5),
     new Cell(1,3),new Cell(1,4)],
    this.IMGS.S,
    3,
    [
      new State(-1,0,1,-1,0,-1,0,0),
      new State(0,1,1,1,-1,0,0,0)
    ]
  )
}
Object.setPrototypeOf(
  S.prototype, Shape.prototype
);
function Z(){//定义专门描述Z图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,3),new Cell(0,4),
     new Cell(1,4),new Cell(1,5)],
    this.IMGS.Z,
    2,
    [
      new State(-1,-1,-1,0,0,0,0,1),
      new State(-1,1,0,1,0,0,1,0)
    ]
  )
}
Object.setPrototypeOf(
  Z.prototype, Shape.prototype
);
function L(){//定义专门描述L图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,3),new Cell(0,4),
     new Cell(0,5),new Cell(1,3)],
    this.IMGS.L,
    1,
    [
      new State(0,-1,0,0,0,1,1,-1),
      new State(-1,0,0,0,1,0,-1,-1),
	  new State(0,1,0,0,0,-1,-1,1),
	  new State(1,0,0,0,-1,0,1,1)
    ]
  )
}
Object.setPrototypeOf(
  L.prototype, Shape.prototype
);
function J(){//定义专门描述J图形的类型
  Shape.call(this,//借用父类型构造函数
    [new Cell(0,3),new Cell(0,4),
     new Cell(0,5),new Cell(1,5)],
    this.IMGS.J,
    1,
    [
      new State(0,-1,0,0,0,1,1,1),
      new State(-1,0,0,0,1,0,1,-1),
	  new State(0,1,0,0,0,-1,-1,-1),
	  new State(1,0,0,0,-1,0,-1,1)
    ]
  )
}
Object.setPrototypeOf(
  J.prototype, Shape.prototype
);