function drawImage(img) {
    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, img.width, img.height)
    ctx.drawImage(img, 0, 0, img.width, img.height)
}

function addWhiteSpace(word) {
    return word + ' '
}

function getRandomCaptionIndex() {
    return parseInt(Math.random() * captions.length)
}
