var Senio = function(name, age) {
    this.name = name;
    this.age = age;
}

var ctx;
var counter =0 ;

Senio.container = function(name) {
    //return new User(name, age);
    return document.getElementById(name);
}

Senio.canvas = function(name) {
	if (name == 'trackSpan'){
    var track = document.getElementById("trackSpan");
    makeHighRes(track);
		return new fabric.Canvas(name);
	} else if (name == 'track'){
		var track = document.getElementById("track");
		makeHighRes(track);
    ctx = track.getContext("2d");

    this.add = function(){
      ctx.stroke();
    }
	}
}

Senio.element = function(obj) {
	var returnObject = document.getElementById(obj.name);
	var parent = document.getElementById(obj.alignBy);
	var padding = parent.getBoundingClientRect().top + obj.top;
  console.log('padding' + padding)
	returnObject.style.top = padding + 'px';
	return returnObject;
}

Senio.animation = function(fps){
	requestAnimationFrame(animate);
	function animate(t) {
	  requestAnimationFrame(animate);
	  recordFPS(t);
	  draw();
	}
	return fps;
}

var ctx;


Senio.line = function(obj){
	//ctx = track.getContext("2d");
	ctx.lineWidth=obj.lineWidth;
  this.set = function(obj){
    X = obj.x1;
    Y = obj.y1;
    X1 = obj.x2;
    Y1 = obj.y2;

    ctx.beginPath();
    ctx.moveTo(X,Y);
    ctx.lineTo(X1,Y1);
    ctx.fill();
  };
  this.fill = function(color){
    ctx.strokeStyle = color;
  };
}

Senio.circle = function(obj) {
	if (obj.originX=='center'){
    circle = new fabric.Circle({
											  radius: 15,
											  originX: 'center', 
											  originY: 'center' 
											});
    return circle;
	} else {
		circle = new fabric.Circle({
											  radius: 15,
											});
    return circle;
	}
}

Senio.speedValues = function(){
  //var speed = $('#slider').slider('value');
    var arr = [7, 9, 6, 7, 7, 8, 8, 6, 7, 9, 9];
    var speed;
  this.deque = function(){
    counter += 1;
    if (counter < 20){
        speed = $('#slider').slider('value')
    }
    if (counter % 20 == 0){
        //console.log('hi');
        speed = arr[Math.random()*10 | 0];
    }
    return speed ;
  }
}

Senio.colorSet = function(){
  var colorSet = [];
  var red  = 255,
      blue = 0,
      green = 0;
  for (var i = 0; i < 10; i++) {
    if (i < 7){
      green += 255/7 | 0;
    } else {
      red -= 255/4 | 0;
    }  
    var color = 'rgb('+ red +','+ green +','+ blue +')';
    colorSet.push(color);
  }
  return colorSet;
}

var mileage = 0;
Senio.mileage = function(){
  this.deque = function(){
    mileage +=0.00005;
    return mileage;
  }
}

makeHighRes(trackSpan);
makeHighRes(track);
function makeHighRes(c) {
    console.log(c.id);
    var ctx = c.getContext('2d');
    // finally query the various pixel ratios
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    // upscale canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {
    
        var oldWidth = c.width;
        var oldHeight = c.height;
        c.width = Math.round(oldWidth * ratio);
        c.height = Math.round(oldHeight * ratio);
        c.style.width = oldWidth + 'px';
        c.style.height = oldHeight + 'px';
        // now scale the context to counter
        // the fact that we've manually scaled
        // our canvas element
        ctx.scale(ratio, ratio);
    }
}

var startTime;
var interval = 10;
var lastCalledTime;
var fps;
function recordFPS(t){
  if (!startTime) {
    startTime = t;
  }
  if (t - startTime < interval) {
    return;
  }
  startTime = t;
  if(!lastCalledTime) {
    lastCalledTime = Date.now();
    fps = 0;
  } else {
    delta = (Date.now() - lastCalledTime)/10;
    lastCalledTime = Date.now();
    fps = 1/delta;
  }
}

Senio.prototype = {}