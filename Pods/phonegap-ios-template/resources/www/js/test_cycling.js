var scene,
		camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container, clock;

var stats = new Stats();

var clock = new THREE.Clock();
var keyboard = new KeyboardState();
var xposition;

window.addEventListener('load', init, false);

var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
};

function init() {
	createScene();
	createLights();
	createPlayer();
	createH();
	setXInitialPosition();
	animate();
}

function setXInitialPosition(){
	var pt = spline.getPoint( 0.00005);
	xposition = -100;
}

function createH(){
	points =  [new THREE.Vector3(0, 0, 0),
	  new THREE.Vector3(100, 0, 75),
	  new THREE.Vector3(0, 0, 150),
	  new THREE.Vector3(50, 0, 225),
	  new THREE.Vector3(0, 0, 300),
	  new THREE.Vector3(100, 0, 375),
	  new THREE.Vector3(0, 0, 450),
	  new THREE.Vector3(50, 0, 525),
		new THREE.Vector3(0, 0, 600),
		new THREE.Vector3(100, 0, 675),
		new THREE.Vector3(0, 0, 750)
	  ];

  for (var i = 0; i < points.length; i++){
      var axis = new THREE.Vector3( 1, 0, 0 );
      var angle = Math.PI / 2;
      points[i].applyAxisAngle( axis, angle );
      points[i].multiplyScalar(30); 
  }
  spline = new THREE.SplineCurve3(points);

  var splineObject = new THREE.Line( geometry, material );
  var extrudeSettings = {
                      steps           : 1000,
                      bevelEnabled    : false,
                      extrudePath     : spline
                  };
  var sqLength = 20;
  var squareShape = new THREE.Shape();
  squareShape.moveTo( 0,0 );
  squareShape.lineTo( -20,sqLength);
  squareShape.lineTo( 0,sqLength);
  
  squareShape.lineTo( 1,0);
  squareShape.lineTo( 1,sqLength*9);
  squareShape.lineTo( 0,sqLength*9);

  squareShape.lineTo( -20,sqLength*9);
  squareShape.lineTo( 0, sqLength *11 );

  var geometry = new THREE.ExtrudeGeometry( squareShape, extrudeSettings );
  var material = new THREE.MeshLambertMaterial( { color: 0x8A2BE2, wireframe: false } );

  var vertices = geometry.vertices;


  var pyramid = new THREE.OctahedronGeometry(500, 0);

  var pyramidMesh = new THREE.Mesh(pyramid, material);
  pyramidMesh.x = 0;
  pyramidMesh.y = 0;
  pyramidMesh.z = 1000;
  scene.add(pyramidMesh);

  var anotherShape = new THREE.Shape();

  var splinePoints = spline.getPoints(1000);

	//
	var coneMasterGeometry = new THREE.Geometry();
	for (var j = 0; j < 1000; j += 1){
  	if (typeof(splinePoints[j]) == 'undefined') {
  		break;
		}
  	
		var mat = new THREE.MeshPhongMaterial({
			color:Colors.blue,
			transparent:true,
			opacity:1,
			shading:THREE.FlatShading,
		});

		var r = Math.random();
		var geom = new THREE.ConeGeometry( r* 300, r * 250, 3 );
		if (j%2 ==0 ){
			geom.translate(sqLength*46, 0 ,0);
		} 

		var newMesh = new THREE.Mesh(geom, mat);

		newMesh.receiveShadow = true; 

		newMesh.rotation.x = 90 * Math.PI/180;

		newMesh.position.set(splinePoints[j].x -250, splinePoints[j].y, splinePoints[j].z);

		scene.add(newMesh);
	}

	var splinePoints = spline.getPoints(10000);

  var up = new THREE.Vector3(0, 1, 0);
	var axis = new THREE.Vector3( );
	var radians;
  for (var j = 0; j < 10000; j += 100){
  	if (typeof(splinePoints[j]) == 'undefined') {
  		break;
		}
  	var geom = new THREE.DodecahedronGeometry(20, 0 );

		var mat = new THREE.MeshPhongMaterial({
			color:Colors.red,
			transparent:true,
			opacity:1,
			shading:THREE.FlatShading,
		});

		var newMesh = new THREE.Mesh(geom, mat);

		newMesh.receiveShadow = true; 

		newMesh.position.set(splinePoints[j].x, splinePoints[j].y, splinePoints[j].z);

		scene.add(newMesh);
		
		tangent = spline.getTangent( j/10000 ).normalize();
    
    // calculate the axis to rotate around
    axis.crossVectors( up, tangent ).normalize();

    // calcluate the angle between the up vector and the tangent
    radians = Math.acos( up.dot( tangent ) ); 

    newMesh.quaternion.setFromAxisAngle( axis, radians );

    newMesh.rotation.x = Math.random()  * 3 * Math.PI / 180;

    var rnd =  Math.random() * 100;
		newMesh.translateX( - rnd - 50);
  }

  var meshSpline = new THREE.Mesh( geometry, material );

  var material = new THREE.LineBasicMaterial({
      color: 0xff00f0,
  });
  var geometry = new THREE.Geometry();
  for(var i = 0; i < spline.getPoints(200).length; i++){
      geometry.vertices.push(spline.getPoints(200)[i]);  
  }
  var line = new THREE.Line(geometry, material);

  scene.add( meshSpline );
}

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xcccccc, 100, 950);
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 120;
	nearPlane = 1;
	farPlane = 20000;
	
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 70;
  camera.position.y = -65;
  camera.rotation.x = 60 * Math.PI / 180;

	renderer = new THREE.WebGLRenderer({ 
		alpha: true, 
		antialias: true 
	});

	renderer.setSize(WIDTH, HEIGHT);

	renderer.shadowMap.enabled = true;
	
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	// framerate stats
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
	// Listen to the screen: if the user resizes it
	// we have to update the camera and the renderer size
	window.addEventListener('resize', handleWindowResize, false);
}

	function handleWindowResize() {
		// update height and width of the renderer and the camera
		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	}

var hemisphereLight, shadowLight;
function createLights() {
	hemisphereLight = new THREE.HemisphereLight(0xcccccc,0x000000, .9)
	shadowLight = new THREE.DirectionalLight(0xdddddd, .6);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
}

// Making the road
Road = function(color, width){

	// create container
	//this.mesh = new THREE.Object3D();
	
	// create geometry
	var geom = new THREE.BoxGeometry(width,1,590,40,10);
	
	// create the material 
	var mat = new THREE.MeshPhongMaterial({
		color:color,
		transparent:true,
		opacity:1,
		shading:THREE.FlatShading,
	});

	var base = new THREE.Mesh(geom, mat);
	this.mesh = base;

	//generateObstacles(this.mesh, width);

	// Allow the road to receive shadows
	this.mesh.receiveShadow = true; 
}
var roadArray = [];
var obstArray = [];
function createRoad(){

	var colors = [Colors.blue, Colors.red,  Colors.brown, Colors.pink, Colors.white]

	for (var i = 0; i < 5; i++) {
		var temp = new Road(colors[i], 800);
		

		// push it a little bit at the bottom of the scene
		temp.mesh.position.z = -600 * i;

		roadArray.push(temp);

		// add the mesh of the road to the scene
		scene.add(temp.mesh);
		

	}
}

// Making a player
Player = function(){
	var geom = new THREE.BoxGeometry(20,20,20,40,10);

	var mat = new THREE.MeshPhongMaterial({
		color:Colors.brown,
		transparent:true,
		opacity:1,
		shading:THREE.FlatShading,
	});

	this.mesh = new THREE.Mesh(geom, mat);

	// Allow the road to receive shadows
	this.mesh.receiveShadow = true; 
}
var player;
function createPlayer(){
	player = new Player();
	player.mesh.position.y = 10;
	player.mesh.position.z = 180;
	player.mesh.add(camera);
	scene.add(player.mesh);
}

// Animation stuff
function animate() {
    requestAnimationFrame(animate);
    render();
}   
var t = 0;
var camPosIndex = 0;
var up = new THREE.Vector3(0, 1, 0);
var straight = new THREE.Vector3(-1, 0, 0);
var axis = new THREE.Vector3( );
var axis2 = new THREE.Vector3( );

function render() {

		stats.update();

		keyboard.update();
		var moveDistance = 50 * clock.getDelta(); 
		if ( keyboard.pressed("A") ) {
			xposition = xposition-moveDistance ;		
		}
    if ( keyboard.pressed("D") ) {
			xposition = xposition+moveDistance ;
		}
    
    // set the marker position
    pt = spline.getPoint( t );
    player.mesh.position.set( pt.x, pt.y, pt.z);
    player.mesh.translateX(xposition);
    
    // get the tangent to the curve
    tangent = spline.getTangent( t ).normalize();
    
    // calculate the axis to rotate around
    axis.crossVectors( up, tangent ).normalize();
    axis2.crossVectors( straight, tangent ).normalize();
    
    // calcluate the angle between the up vector and the tangent
    radians = Math.acos( up.dot( tangent ) );
        
    // set the quaternion
    player.mesh.quaternion.setFromAxisAngle( axis, radians );
    
    radians = Math.asin(straight.dot(tangent));
    player.mesh.rotation.x = radians * Math.PI / 180;
    //player.mesh.quaternion.setFromAxisAngle( axis2, radians );

    if (radians > 0) {
    	player.mesh.translateZ(Math.sin(radians) * 20);

    } else  {
    	player.mesh.translateZ(Math.cos(radians) * 20);
    }
        
    t = (t >= 1) ? 0 : t += 0.0004;

    renderer.render(scene, camera); 
}

function update(radians)
{
	keyboard.update();
	var moveDistance = 50 * clock.getDelta(); 
	if ( keyboard.down("left") ) 
		mesh.translateX( -50 );
	if ( keyboard.down("right") ) 
		mesh.translateX(  50 );
	if ( keyboard.pressed("A") ) {
		console.log('hi');
		player.mesh.translateX( -moveDistance );
	}	
	if ( keyboard.pressed("D") )
		player.mesh.translateX(  moveDistance );
	if ( keyboard.down("R") )
		mesh.material.color = new THREE.Color(0xff0000);
	if ( keyboard.up("R") )
		mesh.material.color = new THREE.Color(0x0000ff);
}


