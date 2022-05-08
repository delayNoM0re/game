class SceneTitle extends Scene {
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
        // 加入标题
        var title = GameImage.new(game, 'title')
        title.x = 40
        title.y = 30
        this.addElement(title)
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
        // 设置是标题画面的情况
        b.isTitle = true
    }
    setupInputs() {
        var self = this
        var b = this.bird
        var game = this.game
        self.game.registerAction('j', function(keyStatus) {
            b.jump()
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
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
    }
}
