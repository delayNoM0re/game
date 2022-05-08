class SceneEnd extends Scene {
    constructor(game, pipe, bird, score) {
        super(game)
        this.setup(pipe, bird, score)
        this.setupInputs()
    }
    static new(game, pipe, bird, score) {
        return new this(game, pipe, bird, score)
    }
    setup(pipe, bird, score) {
        var game = this.game
        // cave bg
        var bg = GameImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = pipe
        // 设置 gameover 状态
        pipe.gameover = true
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
        this.bird = bird
        this.bird.gameover = true
        this.addElement(this.bird)
        // 添加 gameover 图片
        var end = GameImage.new(game, 'end')
        end.x = 40
        end.y = 170
        this.addElement(end)
        // 添加分数图片
        var s = score.toString()
        var img = Score.new(game, s)
        this.scoreImage = img
        this.addElement(img)
    }
    setupInputs() {
        var self = this
        var game = this.game
        // var b = this.bird
        self.game.registerAction('r', function(keyStatus) {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    update() {
        super.update()
    }
}
