class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        var label = Label.new(game, '按 k 开始游戏')
        this.addElement(label)
        game.registerAction('k', function(){
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
    }
    // draw() {
    //     // draw labels
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}
