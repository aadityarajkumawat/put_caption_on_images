let canvas = document.getElementById('canvas')
let input = document.querySelector('input[type=file]')

let ctx = canvas.getContext('2d')
let imageLocalURL = State('')
let reader = new FileReader()

function onImageLoad(img, captionParams) {
    drawImage(img)
    setCaptionDimensions(captionParams)

    let randIdx = getRandomCaptionIndex()
    let caption = captions[randIdx]
    let words = caption.split(' ')
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

    drawCaptionsOnImage()

    function drawCaptionsOnImage() {
        function setCaptionStyles() {
            ctx.fillStyle = '#00000095'
        }

        function setCaptionTextStyles() {
            ctx.font = '16px monospace'
            ctx.fillStyle = '#fff'
        }

        for (let [idx, line] of lines.entries()) {
            setCaptionStyles()
            ctx.fillRect(
                captionParams.x,
                captionParams.y + 30 * idx,
                captionParams.w,
                captionParams.h,
            )
            setCaptionTextStyles()
            let lineWidth = ctx.measureText(line).width
            ctx.fillText(
                line,
                (captionParams.w - lineWidth) / 2,
                13 + captionParams.y + (captionParams.h - 13) / 2 + 30 * idx,
            )
        }
    }

    function setCaptionDimensions(caption) {
        caption.x = 0
        caption.y = img.height * 0.7
        caption.w = img.width
        caption.h = 30
    }
}

function drawStuff() {
    let img = new Image()
    let caption = { x: 0, y: 0, w: 0, h: 0 }
    img.onload = () => onImageLoad(img, caption)
    img.src = imageLocalURL.getState()
}

function main() {
    input.addEventListener('change', getLocalURLAndRenderImage)
    function getLocalURLAndRenderImage() {
        reader.readAsDataURL(input.files[0])
        reader.onloadend = function () {
            imageLocalURL.setState(reader.result)
            drawStuff()
        }
    }
}

main()
