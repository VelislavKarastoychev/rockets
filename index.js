'use strict'
const express = require('express'),
    euriklis = require('euriklis'),
    fs = require("fs"),
    app = express()
let router = require('./router')
console.log(`the library euriklis version ${euriklis.version} was runned.`)

const rocket = require('./rocketModel'),
    rocketData = euriklis.data.getJSON("https://api.spacexdata.com/v2/rockets")
        .then(response => {
            return response
        }, error => {
            console.log(error)
            return error
        })
function drawThrustImg (k) {
    return `thrustImg = new Image();
    thrustImg.src = "/rockets/thrust.png";
    thrustImg.onload = function () {
        ctx.drawImage(thrustImg, coords[${k}][4] 
        , coords[${k}][5], coords[${k}][6], coords[${k}][7])
    };
    `
}
function drawBackgroundInit () {
    return `let w = +canvas.property("width").split("px")[0],` +
    `l = +canvas.property("height").split("px")[0],rh, rd,` +
    `background = new Image(), coords = [], rocketImg = new Image(), thrustImg = new Image();` +
    `background.src = "/rockets/bg.jpg";` +
    `background.onload = function(){` +
    `ctx.drawImage(background, 0, 0, w, l);`
}
function drawBtn (opt) {
    return `ctx.moveTo(0.8*w, l - 90);` +
    `ctx.fillStyle = ' 	#FF7F50';` +
    `ctx.globalAlpha = ${opt.opacity};` +
    `ctx.shadowBlur=10;` +  
    `ctx.shadowColor='#000';`+
    `ctx.shadowOffsetX=5;`+
    `ctx.shadowOffsetY=5;` +
    `ctx.fillRect(0.88*w, l - 90, 130, 70);` +
    `ctx.fillStyle = "#e65c00";` +
    `ctx.font = "50px Arial";` +
    `ctx.save();` +
    `ctx.globalAlpha = 1;` + 
    `ctx.shadowBlur=0;` +  
    `ctx.shadowColor='';`+
    `ctx.shadowOffsetX=0;`+
    `ctx.shadowOffsetY=0;` +
    `ctx.fillText('${opt.text}',0.89*w, l - 30);`
}
function moveRocketsBtnEvent () {
    return `function moveRocketsBtn(e){
        let x = e.clientX,
           y = e.clientY;
        let ml = +canvas.getCss("marginLeft").split("px")[0];
        console.log(ml)
           if (x >= 0.88*w + ml && x <= 0.88*w + 130 + ml&& y >= l - 90 && y <= l - 20) {
               status = 1;
               requestInfo(url, status)
                  .then(response => {
                      eval(response.response);
                  },error => {
                      console.log(error)
                  })
           }
           //canvas.currentNode.removeEventListener("click", moveRocketsBtn);
    }
    canvas.on("click", moveRocketsBtn);`
}
function drawSuccess () {
    return `ctx.clearRect(0, 0, (canvas.currentNode.width), (canvas.currentNode.height - 100));
    ctx.drawImage(background, 0, 0, w, l);
    ctx.fillStyle = "green";
    ctx.font ="100px Arial";
    ctx.globalAlpha = 0.8;
    ctx.shadowBlur=10;  
    ctx.shadowColor='#000';
    ctx.shadowOffsetX=5;
    ctx.shadowOffsetY=5;
    ctx.fillText("Success", 0.35 * w, 0.45 * l);
    ctx.save();
    ctx.globalAlpha = 1; 
    ctx.shadowBlur=0;
    ctx.shadowColor='';
    ctx.shadowOffsetX=0
    ctx.shadowOffsetY=0;
    ${drawBtn({text : "Start", opacity : 1})}
    canvas.on("click", moveRocketsBtn);`
}
function createCanvasBackground() {
    return rocketData.then(rocketsArray => {
        let rocketsModelArray = [], rocketViz = ``,
            k, rocketsCount = rocketsArray.length, c1, c2
        for (let rocket_i of rocketsArray) {
            rocketsModelArray.push(new rocket(rocket_i))
        }
        for (let rocket_i of rocketsModelArray) {
            // get the index:
            k = rocketsModelArray.indexOf(rocket_i)
            // size of the rocket:
            if (k === 0) {
                c1 = rocket_i.height
                c2 = rocket_i.diameter
            }
            // visualize every rocket
            rocketViz += `rocketImg = new Image();` +
                `rocketImg.src = "/rockets/rocket.png";` +
                `rocketImg.onload = function () {` +
                // get the weight and the width of
                // the rockets
                `imgH = rocketImg.naturalHeight, imgW = rocketImg.naturalWidth;` +
                // w(ax + b), a = k / r, b = 1 / 4r
                // rd = imgw * min(roc.diam / c2, 1.2 * max(rd_list))
                `rd = 0.8*Math.min(imgW * (${rocket_i.diameter} / ${c2}), 1.1 * Math.max(...rdl));` +
                `rh = 0.8*Math.min(imgH * (${rocket_i.height} / ${c1}), 1.1 * Math.max(...rhl));` +
                `rdl.push(rd);rhl.push(rh);` + 
                //`console.log("k = " + ${k});`+
                `coords[${k}] = [(w) * ((0.25 + ${k}) / ${rocketsCount}), l - rh - 140, rd, rh, 20 + (w) * ((0.23 + 1.001 *${k}) / ${rocketsCount}), l - 0*rh - 146, 1.5*rd/(rd + rh) * 44, 0.8*rh/ (rd + rh) * 100];` + 
                `ctx.drawImage(rocketImg, (w) * ((0.25 + ${k}) / ${rocketsCount}) , l - rh - 140,` +
                // the height and width of every rocket
                // are proportional to the rocket.height
                // and rocket.diameter respectively...
                `rd, rh);` +
                `};` +
                drawThrustImg(k)
        }
        return drawBackgroundInit() +
            drawBtn({text: 'Start', opacity : 1}) +
            `};` +
            //`ctx.fillStyle = '#6E7FE7';` +
            //`ctx.fillRect(0, l - 100, w, l);` +
            // make button
            //+
            // initialize the rockets:
            `let imgH, imgW, 
            rdl = [0.02 * background.naturalWidth], 
            rhl = [0.06 * background.naturalHeight]
            ` +
            rocketViz +
            // make click event listener:
            moveRocketsBtnEvent();

    },
        error => {
            console.log(error)
            return error
        })
}
function moveRockets() {
    return rocketData.then((rocketsArray) => {
        let rocketsModelArray = [];
        for (let rocketi of rocketsArray) {
            rocketsModelArray.push(new rocket(rocketi))
        }
        let k, rocket_i, rocketViz = ``,
            response = `
           let velocity = [0, 0, 0, 0],
           iconvelocity = [0, 0, 0, 0],
           rocketTopImg = new Image(),
           rocketBottomImg = new Image(),
           opacity = [1, 1, 1, 1],
           fuelAmountsFirstStage = [${rocketsModelArray[0].fuelAmount.firstStage},
              ${rocketsModelArray[1].fuelAmount.firstStage},
              ${rocketsModelArray[2].fuelAmount.firstStage},
              ${rocketsModelArray[3].fuelAmount.firstStage}
           ],
           fuelAmountsSecondStage = [
            ${rocketsModelArray[0].fuelAmount.secondStage},
            ${rocketsModelArray[1].fuelAmount.secondStage},
            ${rocketsModelArray[2].fuelAmount.secondStage},
            ${rocketsModelArray[3].fuelAmount.secondStage}
           ], step = 2;
           let draw = setInterval(mv, 0.5);
           canvas.currentNode.removeEventListener("click", moveRocketsBtn);
           rocketTopImg.src = "/rockets/rocket_top.png";
           rocketBottomImg.src = "/rockets/rocket_bottom.png";
           rocketTopImg.onload = function () {
               console.log("rocket top loaded!")
           }
           rocketBottomImg.onload = function () {
               console.log("rocket bottom loaded!")
           }
           function mv () {
              ctx.clearRect(0, 0, (canvas.currentNode.width), (canvas.currentNode.height - 100));
              ctx.drawImage(background, 0, 0, w, l);
              ${drawBtn({text : "Wait", opacity : 0.5})}
        `
        for (rocket_i of rocketsModelArray) {
            k = rocketsModelArray.indexOf(rocket_i)
            rocketViz += `
            console.log(step);
            if (fuelAmountsFirstStage[${k}] > 0){
                ctx.globalAlpha = 1;
                velocity[${k}] +=  ((1000 * ${rocket_i.thrust.sea_level} - 9.8 * ${rocket_i.mass}) / ${rocket_i.mass})
                iconvelocity[${k}] += 0.05*step*(velocity[${k}]/Math.max(...velocity)); 
                ctx.drawImage(rocketImg, coords[${k}][0] , coords[${k}][1] - iconvelocity[${k}], coords[${k}][2], coords[${k}][3]);
                ctx.drawImage(thrustImg, coords[${k}][4], coords[${k}][5] - iconvelocity[${k}], coords[${k}][6], coords[${k}][7]);
                Particle.makeSmoke(ctx, coords[${k}][4] + 5, coords[${k}][5] - iconvelocity[${k}] + 5)
                fuelAmountsFirstStage[${k}] -= 1*step
                ctx.fillStyle = "white";
                ctx.rect(coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}], 150, 80);
                ctx.fillStyle = "#e65c00";
                ctx.font = "15px Arial";
                ctx.fillText("First stage", coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 15);
                ctx.fillText("Velocity:", coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 30);
                ctx.fillText(velocity[${k}].toPrecision(4), coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 45);
                ctx.fillText("Fuel amount:", coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 60);
                ctx.fillText(fuelAmountsFirstStage[${k}].toPrecision(4), coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 75);               
                if (fuelAmountsFirstStage[${k}] < 0) fuelAmountsFirstStage[${k}] === 0

            } else {
                if (fuelAmountsSecondStage[${k}] > 0){
                   velocity[${k}] += ((1000 * ${rocket_i.thrust.space}) / ${rocket_i.mass});
                   iconvelocity[${k}] += 0.05*step*(velocity[${k}]/Math.max(...velocity))
                   ctx.drawImage(rocketTopImg, coords[${k}][0] , coords[${k}][1] - iconvelocity[${k}], coords[${k}][2], coords[${k}][3]);
                   opacity[${k}] *= 0.8;
                   ctx.globalAlpha = opacity[${k}];
                   ctx.drawImage(rocketBottomImg, coords[${k}][0] , coords[${k}][5] - iconvelocity[${k}], coords[${k}][2], 0.4*coords[${k}][3]);
                   ctx.globalAlpha = 1
                   ctx.drawImage(thrustImg, coords[${k}][4], coords[${k}][5] - iconvelocity[${k}] + 15*opacity[${k}], coords[${k}][6], coords[${k}][7]);
                   Particle.makeSmoke(ctx, coords[${k}][4] + 5, coords[${k}][5] - iconvelocity[${k}] + 5);
                   ctx.fillStyle = "white";
                   ctx.rect(coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}], 150, 80);
                   
                   ctx.fillStyle = "";
                   fuelAmountsSecondStage[${k}] -= 1 * step;
                   ctx.fillStyle = "#e65c00";
                   ctx.font = "15px Arial";
                   ctx.fillText("Second stage", coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 15);
                   ctx.fillText("Velocity:", coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 30);
                   ctx.fillText(velocity[${k}].toPrecision(4), coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 45);
                   ctx.fillText("Fuel amount:", coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 60);
                   ctx.fillText(fuelAmountsSecondStage[${k}].toPrecision(4), coords[${k}][0] + coords[${k}][2], coords[${k}][1] - iconvelocity[${k}] + 75);
                   if (fuelAmountsSecondStage[${k}] < 0) fuelAmountsSecondStage[${k}] = 0;
                }
            }         
            `
        }
        rocketViz += `
        if (fuelAmountsSecondStage.every(amount => {
            return amount === 0
        })) {
            console.log("stoped")
            clearInterval(draw);
            status = 2;
            requestInfo(url, status)
            .then(response => {
                eval(response.response)
            }, error => {
                console.log(error)
            })

        }
    };
        `
        response += rocketViz
        return response
    })
}
function createResponse(status) {
    return new euriklis.promise((resolve, reject) => {
        switch (status) {
            case "0":
                // set the background of the
                // canvas element
                resolve(createCanvasBackground())
                break
            case "1":
                // move the rockets towards the top
                resolve(moveRockets())
                break
            case "2":
               resolve(drawSuccess())
               break
        }
    })
}
app.get('/client/*', function (req, res) {
    let specificPath = req.path.split('/client/')[1]
    res.sendFile(__dirname + '/client/' + specificPath)
})
app.get('/rockets/*', (req, res) => {
    let specificPath = req.path.split('/rockets/')[1]
    res.sendFile(__dirname + '/rockets/' + specificPath)
})
app.get('/requestInfo', (req, res) => {
    let status = req.query.status
    return createResponse(status)
        .then(response => {
            res.send(response)
        }, error => {
            console.log(error)
        })
})

app.use('/', router)



app.listen(3000, () => console.log('Rockets app listening on port 3000!'))

