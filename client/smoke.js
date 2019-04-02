'use strict';
const rand = function (min, max) {
    return Math.random() * (max - min);
}
let particles = []
class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velY = 2
        this.velX = 0.1 * (rand(1, 10) - 5)
        this.size = 0.1 * rand(3, 5)
        this.alpha = 1
        this.src = 'http://oi41.tinypic.com/4i2aso.jpg'
        this.img = new Image()
        this.img.src = this.src
    }
    update(ctx) {
        this.x += this.velX
        this.y += this.velY
        this.velY *= 0.99
        if (this.alpha < 0) this.alpha = 0
        ctx.globalAlpha = this.alpha
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2)
        ctx.restore()
        this.alpha *= 0.96
        this.size += 0.02
    }
    static makeSmoke(ctx, x, y) {
        let p = new Particle(x, y)
        for (let j = 0; j < particles.length; j++) particles[j].update(ctx)
        while (particles.length > 500) particles.shift()
        particles.push(p)
    }

}