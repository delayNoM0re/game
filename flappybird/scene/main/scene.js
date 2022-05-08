class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        // cave bg
        var bg = GameImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GameImage.new(game, 'ground')
            g.x = i * 18
            g.y = 440
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        this.birdSpeed = 2
        var b = Animation.new(game)
        b.x = 110
        b.y = 200
        this.bird = b
        this.addElement(b)
        // score
        this.score = 0
        this.updateScore()
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function(keyStatus) {
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 20; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        // 鸟撞了水管
        this.birdCollidePipe()
        // 通过了一个管道
        this.throughPipe()
        // log('score', this.score, this.pipe.bethrough)
    }
    birdCollidePipe() {
        var game = this.game
        var pipes = this.pipe.pipes
        for (var p of pipes) {
            if (p.collide(this.bird)) {
                // log('凉了')
                // 把当前管道、小鸟的位置信息传到 sceneEnd
                var s = SceneEnd.new(game, this.pipe, this.bird, this.score)
                game.replaceScene(s)
            }
        }
    }
    throughPipe() {
        var pipes = this.pipe.pipes
        for (var p of pipes) {
            var pipeX = p.x
            var birdX = this.bird.x
            if ((birdX > pipeX) && (this.pipe.bethrough == false)) {
                this.pipe.bethrough = true
                this.score++
                this.updateScore()
            }
        }
    }
    updateScore() {
        if (this.scoreImage) {
            this.deleteElement(this.scoreImage)
        }
        var s = this.score.toString()
        var img = Score.new(this.game, s)
        this.scoreImage = img
        this.addElement(img)
    }
}
