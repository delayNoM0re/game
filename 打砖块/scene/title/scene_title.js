class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function() {
            var s = SceneEditor.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillStyle = 'black'
        this.game.context.fillText('按 k 开始游戏', 100, 190)
        this.game.context.fillText('按 E 编辑并游玩关卡', 100, 230)
    }
}
