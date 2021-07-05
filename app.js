;(function main() {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')

    const IMAGE_HEIGHT = 821
    const IMAGE_WIDTH = 409

    drawStuff()

    function initializeCaptionDimensions(caption) {
        caption.x = 0
        caption.y = IMAGE_HEIGHT * 0.7
        caption.w = IMAGE_WIDTH
        caption.h = 40
    }

    function drawImage(img) {
        ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
    }

    function drawStuff() {
        let img = new Image()
        let caption = { x: 0, y: 0, w: 0, h: 0 }

        img.onload = function onImageLoad() {
            initializeCaptionDimensions(caption, img)

            drawImage(img)

            ctx.fillStyle = '#00000095'

            ctx.fillRect(caption.x, caption.y, caption.w, caption.h)
            ctx.font = '18px Arial'
            ctx.fillStyle = '#fff'
            let cap =
                'I am elmo, and you are watching disney channel, only for kids.'
            let capWidth = ctx.measureText(cap).width
            ctx.fillText(
                cap,
                (caption.w - capWidth) / 2,
                13 + caption.y + (caption.h - 13) / 2,
            )
        }

        img.src = './selfie.jpg'
    }
})()
