class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        var label = Label.new(game, '游戏结束, 按 r 返回标题界面')
        this.addElement(label)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    // draw() {
    //     // draw labels
    //     this.game.context.fillStyle = 'black'
    //     this.game.context.fillText('游戏结束, 按 r 返回标题界面', 100, 290)
    // }
}
