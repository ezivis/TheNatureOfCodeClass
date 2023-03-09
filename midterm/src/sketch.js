
///////////////////////////////////matter.js cloth example 
   var  Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Vector = Matter.Vector;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 800
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // see cloth function defined later in this file
    var cloth = clothes(200, 200, 20, 12, 5, 5, false, 8);
    for (var i = 0; i < 20; i++) {
        cloth.bodies[i].isStatic = true;
    }

    let circBody=Bodies.circle(300, 500, 80, { isStatic: true, render: { fillStyle: '#060a19' }});
    function sampleClick() {
        varbtnX = document.getElementById("btn");
        btnX.disabled = true;
        }

    Composite.add(world, [
        cloth,
        //circBody,
        Bodies.rectangle(400, 609, 800, 50, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.98,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 800 }
    });

    function clothes(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
        var Body = Matter.Body,
            Bodies = Matter.Bodies,
            Common = Matter.Common,
            Composites = Matter.Composites;
    
        var group = Body.nextGroup(true);
        particleOptions = Common.extend({ inertia: Infinity, friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }}, particleOptions);
        constraintOptions = Common.extend({ stiffness: 0.06, render: { type: 'line', anchors: false } }, constraintOptions);
    
        var cloth = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
            return Bodies.circle(x, y, particleRadius, particleOptions);
        });
    
        Composites.mesh(cloth, columns, rows, crossBrace, constraintOptions);
    
        cloth.label = 'Cloth Body';
    
        return cloth;
    };

/////////////////////////////////////////////////////////p5 Start
let video;
let poseNet;
let pose;
let posX = 0;
let posY = 0;
let oldposX =0;
let oldposY =0;
let time=0;
let timeArray = [];
let mouseArug = 0;
function setup(){
        createCanvas(640,480);
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video,modelLoaded);
        poseNet.on('pose',gotPoses);
    }
    
function modelLoaded(){
    // console.log("poseNet ready");
}

function gotPoses(poses){
    // console.log(poses);
    if(poses.length>0){
        pose = poses[0].pose;
    }
}

    function draw() {
        if(pose&&pose.nose.confidence>0.95){
            posX = pose.nose.x;
            posY = pose.nose.y;
            time++;
        } else{
            posX = 0;
            posY = 0;
            time=0;   
        }


        let mappedPos = map(posX,0,700,1,-1)
        let mouseArug = mappedPos/200;
        console.log(mouseArug)
        let second = ((sin(millis()/1000)/1000)+0.001)*mouseArug
        //console.log(mouseArug)
        for(let i =100;i<200;i = i+Math.floor(Math.random() * 4) + 1){
            Matter.Body.applyForce(cloth.bodies[i], cloth.bodies[i].position, Vector.create(mouseArug,0))
        }
      }

      function mouseClicked() {
        mouseArug++;
      }

      console.log(cloth.bodies[1])
//////////////////////////////////////////////
// const app = new PIXI.Application();
// document.body.appendChild(app.view);

// let count = 0;

// // build a rope!
// const ropeLength = 918 / 10;

// const points = [];

// for (let i = 0; i < 20; i++) {
//     points.push(new PIXI.Point(i * ropeLength, 0));
// }

// const strip = new PIXI.SimpleRope(PIXI.Texture.from('duck.png'), points);

// strip.x = -559;

// const snakeContainer = new PIXI.Container();
// snakeContainer.x = 300;
// snakeContainer.y = 300;

// snakeContainer.scale.set(800 / 2600);
// app.stage.addChild(snakeContainer);

// snakeContainer.addChild(strip);

// app.ticker.add(() => {
//     count += 0.1;

//     // make the snake
//     for (let i = 0; i < points.length; i++) {
//         points[i].y = Math.sin((i * 0.5) + count) * 30;
//         points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
//     }
// });

      
