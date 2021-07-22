let canvas = document.getElementById('canvas')
canvas.width = 900
canvas.height = 900
let ctx = canvas.getContext('2d')
let input = document.querySelector('input[type=file]')
let reader = new FileReader()

const ESCAPE_CHAR = '$'
const IMAGE_HEIGHT = 821
const IMAGE_WIDTH = 409
let prev = ''
let captions = [
    'When teacher keeps giving you assignments, but are too busy playing valorant',
    'I am fine, everything is fine',
]

function modifyCaption(caption) {
    return function updateCaptionDimensions() {
        caption.x = 0
        caption.y = IMAGE_HEIGHT * 0.7
        caption.w = IMAGE_WIDTH
        caption.h = 30
    }
}

function drawImage(img) {
    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, img.width, img.height)
    ctx.drawImage(img, 0, 0, img.width, img.height)
}

function addWhiteSpace(word) {
    return word + ' '
}

function onImageLoad(img, caption) {
    let updateCaptionDimensions = modifyCaption(caption)
    updateCaptionDimensions()
    drawImage(img)
    let cap = captions[parseInt(Math.random() * captions.length)]
    let words = cap.split(' ')
    words = words.map(addWhiteSpace)
    words.push(ESCAPE_CHAR)
    let lines = []
    let line = ''
    for (let word of words) {
        if (word === ESCAPE_CHAR) {
            lines.push(line)
            line = word
        }
        if (line.length + word.length <= 35) {
            line += word
        } else {
            lines.push(line)
            line = word
        }
    }
    for (let [idx, line] of lines.entries()) {
        ctx.fillStyle = '#00000095'
        ctx.fillRect(caption.x, caption.y + 30 * idx, caption.w, caption.h)
        ctx.font = '16px monospace'
        ctx.fillStyle = '#fff'
        let lineWidth = ctx.measureText(line).width
        ctx.fillText(
            line,
            (caption.w - lineWidth) / 2,
            13 + caption.y + (caption.h - 13) / 2 + 30 * idx,
        )
    }
}

function drawStuff() {
    let img = new Image()
    let caption = { x: 0, y: 0, w: 0, h: 0 }
    img.onload = () => onImageLoad(img, caption)
    img.src = prev
}

function main() {
    input.addEventListener('change', getLocalURLAndRenderImage)
    function getLocalURLAndRenderImage() {
        reader.readAsDataURL(input.files[0])
        reader.onloadend = function () {
            prev = reader.result
            drawStuff()
        }
    }
}

main()
