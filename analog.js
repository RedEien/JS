function draw() {
    var canvas = document.getElementById("canvasClock");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius)
    radius = radius * 0.90
    setInterval(function() {drawClock(ctx, radius)}, 1000);
}

function drawClock(ctx, radius) {
    drawFace(ctx,  radius)
    drawNumbers(ctx, radius)
    drawTime(ctx, radius)
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.05, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}

function drawNumbers(ctx, radius) {
    ctx.beginPath();
    ctx.arc(200, 200, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#c0c0c0";
    var num;
    var ang;
    var bars = 60;

    for ( num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
    for(var i = 0; i < bars; i++){
        var x = 0.99*radius*Math.cos(degrees_to_radians(i*6));
        var y = 0.99*radius*Math.sin(degrees_to_radians(i*6));
        if ( i % 5 === 0) {
            drawRectangle(x,y,1,15,i*6, ctx );
        }else {drawRectangle(x,y,1,5,i*6, ctx );}
        
    }
}
function drawRectangle(x,y,w,h,deg, ctx){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees_to_radians(deg+90));
    ctx.fillStyle = "white";
    ctx.fillRect(-1*(w/2), -1*(h/2), w, h);
    ctx.restore();
  }
function degrees_to_radians(degrees){
    return degrees * Math.PI / 180;
}

function drawTime(ctx, radius) {
    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var lHour = 0.38;
    var lMinute = 0.58;
    var lSecond = 0.78;
    ctx.arc(0, 0, radius * 0.025, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    // hour
    hour = hour%12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, radius, hour, lHour, radius * 0.01)
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI /(30 * 60));
    drawHand(ctx, radius, minute, lMinute, radius * 0.02)
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, radius, second, lSecond, radius * 0.005)
}

function drawHand(ctx, radius, time, lHand, lwidth) {
    var x = lHand * radius * Math.cos(time - Math.PI/2)
    var y = lHand * radius * Math.sin(time - Math.PI/2)
    ctx.beginPath();
    ctx.lineWidth = lwidth;
    ctx.moveTo(0, 0)
    ctx.lineTo(x, y);
    ctx.strokeStyle = "white";
    ctx.stroke();
}
draw()
setInterval(function() {drawClock(ctx, radius)}, 1000);
