;(function main() {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')

    const ESCAPE_CHAR = '$'
    const IMAGE_HEIGHT = 821
    const IMAGE_WIDTH = 409

    drawStuff()

    function modifyCaption(caption) {
        return function updateCaptionDimensions(_dimensions) {
            caption.x = 0
            caption.y = IMAGE_HEIGHT * 0.7
            caption.w = IMAGE_WIDTH
            caption.h = 30
        }
    }

    function drawImage(img) {
        ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
    }

    function drawStuff() {
        let img = new Image()
        let caption = { x: 0, y: 0, w: 0, h: 0 }

        img.onload = function onImageLoad() {
            let updateCaptionDimensions = modifyCaption(caption)
            updateCaptionDimensions()

            drawImage(img)

            let cap = `lorem ipsum, I really wanted to get third line and finally I got it`
            let capWidth = ctx.measureText(cap).width

            /**
             * -> x characters -> y px
             * => 1 char -> (y/x) px
             */
            let widthOfACharacter = capWidth / cap.length
            console.log(widthOfACharacter) // 4.6645

            let words = cap.split(' ')
            words = words.map((word) => word + ' ')
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

            lines.unshift(ESCAPE_CHAR)

            for (let [idx, line] of lines.entries()) {
                if (line !== ESCAPE_CHAR) {
                    ctx.fillStyle = '#00000095'
                    ctx.fillRect(
                        caption.x,
                        caption.y + 30 * idx,
                        caption.w,
                        caption.h,
                    )
                }

                let lineWidth = ctx.measureText(line).width

                ctx.font = '16px monospace'
                ctx.fillStyle = '#fff'
                if (line !== ESCAPE_CHAR) {
                    ctx.fillText(
                        line,
                        (caption.w - lineWidth) / 2,
                        13 + caption.y + (caption.h - 13) / 2 + 30 * idx,
                    )
                }
            }
        }

        img.src = './selfie.jpg'
    }
})()
