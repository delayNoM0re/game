class Animation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.framesIndex = 0
        this.frameCount = 3
        // 
        this.filpX = false
        this.rotation = 0
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        // 标题 和 gameover 状态
        this.isTitle = false
        this.gameover = false
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        if (!this.isTitle) {
            // 更新受力
            this.y += this.vy
            this.vy += this.gy * 0.2
            var h = 415
            if (this.y > h) {
                this.y = h
            }
            // 更新角度
            if (this.rotation < 45) {
                this.rotation += 5
            }
        }
        if (!this.gameover) {
            this.frameCount--
            if (this.frameCount == 0) {
                this.frameCount = 3
                this.framesIndex = (this.framesIndex + 1) % this.frames().length
                this.texture = this.frames()[this.framesIndex]
            }
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.filpX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    move(x, keyStatus) {
        this.filpX = (x < 0)
        this.x += x
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x > 270 - this.w) {
            this.x = 270 - this.w
        }
    }
    changeAnimation(name) {
        this.animationName = name
    }
}