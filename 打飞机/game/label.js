class Label {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new Label(game, text)
    }
    draw() {
        this.game.context.fillStyle = 'black'
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}
