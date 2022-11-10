import {setChecks, setText, getRadio, sendRequest, radio} from "./main.js";
import {saved} from "./cookies.js";

// const canvas = document.getElementById("graph")
//     const ctx = canvas.getContext("2d");
//     const height = canvas.height
//     const width = canvas.width
//
// $(function () {
//     draw()
// })

$("#graph").click(function (event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const r = getRadio()
    setChecks([(x/width * 2*r)-r])
    setText(-((y/height * 2*r)-r))
    if (sendRequest()) drawHit(x, y, false)
})

export function draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)"
    ctx.fillRect(0, 0, width, height)

    //draw figures
    ctx.strokeStyle = "rgba(30,107,195,0.9)"
    ctx.fillStyle = "rgba(73,158,255,0.9)"
    drawTriangle(0, height/2, width/2, height/2, width/2, height * 0.75)
    ctx.stroke()
    drawRectangle(width/2, height/2, width, height/2, width, height * 0.75, width/2, height * 0.75)
    ctx.stroke()
    ctx.arc(width/2, height/2, height/4, -Math.PI/2, Math.PI, true)
    ctx.stroke()
    ctx.fill()

    //draw axis
    ctx.strokeStyle = "rgba(0, 0, 0, 1)"
    ctx.lineWidth = 2
    drawLine(width/2, 0, width/2, height)
    drawLine(0, height/2, width, height/2)

    //draw axis keys
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    const off = 5
    drawTriangle(width/2, 0, width/2 + off, off, width/2 - off, off)
    drawTriangle(width, height/2, width - off, height/2 + off, width - off, height/2 - off)

    //draw axis
    new FontFace("miratrix", "url(../fonts/miratrix.otf)")
    ctx.font = "17px miratrix"
    ctx.fillText("R", width/2 + 5, 15)
    ctx.fillText("R", width - 17, height/2 + 15)
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.lineTo(x1, y1)
    ctx.fill()
}

function drawRectangle(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.lineTo(x4, y4)
    ctx.lineTo(x1, y1)
    ctx.fill()
}

export function drawHit(x, y, transfrom ) {
    ctx.beginPath()
    ctx.strokeStyle = "rgba(0, 0, 0, 1)"
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    const x1 = transfrom?(x/radio*width/2+width/2):x
    const y1 = transfrom?height-(y/radio*height/2+height/2):y
    ctx.moveTo(x1, y1)
    ctx.arc(x1, y1, 2, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()
}

export function draw_hits_for_r() {
    draw()
    for (let i in saved) {
        if (saved[i][2] === radio) {
            drawHit(saved[i][0], saved[i][1], true)
        }
    }
}
