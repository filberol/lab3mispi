//Rendering watches
const canvas = document.getElementById("graph")
const ctx = canvas.getContext("2d");
ctx.imageSmoothingQuality = "high"
const height = canvas.height
const width = canvas.width
new FontFace("miratrix", "url(../fonts/miratrix.otf)")
ctx.font = "30px miratrix"

renderWatch()
setInterval(() => {renderWatch()}, 1000)

function renderWatch() {
    ctx.lineWidth = 1
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = "rgb(0, 0, 0)"
    //Draw numbers
    for (let i = 1; i <= 12; i++) {
        ctx.strokeText(i.toString(), xFromHour(i, 0.9) - 10, yFromHour(i, 0.9) + 10)
    }
    //Draw dots
    for (let i = 0.5; i < 12; i++) {
        ctx.beginPath()
        ctx.arc(xFromHour(i, 0.9), yFromHour(i, 0.9), 2, 0, Math.PI*2)
        ctx.stroke()
    }
    //Draw Circle
    ctx.beginPath()
    ctx.arc(width/2, height/2, 10, 0, Math.PI*2)
    ctx.stroke()

    const stamp = new Date()
    //Draw Hours
    ctx.lineWidth = 7
    ctx.beginPath()
    ctx.moveTo(width/2, height/2)
    const hours = stamp.getHours() + stamp.getMinutes() * 60
    ctx.lineTo(xFromHour(hours, 0.7), yFromHour(hours, 0.7))
    ctx.stroke()
    //Draw Minutes
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(width/2, height/2)
    const minutesH = stamp.getMinutes() * 12 / 60
    ctx.lineTo(xFromHour(minutesH, 0.8),yFromHour(minutesH, 0.8))
    ctx.stroke()
    //Draw Seconds
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width/2, height/2)
    const secondsH = stamp.getSeconds() * 12 / 60
    ctx.lineTo(xFromHour(secondsH, 0.8),yFromHour(secondsH, 0.8))
    ctx.stroke()
}

function xFromHour(hour, mul) { return Math.cos(hour/12 * 2 * Math.PI - Math.PI/2) * width * mul * 0.5 + width/2}
function yFromHour(hour, mul) { return Math.sin(hour/12 * 2 * Math.PI - Math.PI/2) * height * mul * 0.5 + height/2}