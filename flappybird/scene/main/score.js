class Score {
    constructor(game, score) {
        this.game = game
        this.scores = []
        for (var i = 0; i < score.length; i++) {
            var s = score[i]
            var img = GameImage.new(game, `s${s}`)
            this.scores.push(img)
        }
    }
    static new(game, score) {
        return new this(game, score)
    }
    draw() {
        var context = this.game.context
        var x = 120 - (this.scores.length - 1) * 20
        var y = 70
        for (var i = 0; i < this.scores.length; i++) {
            var s = this.scores[i]
            var sx = x + i * 30
            var sy = y
            context.drawImage(s.texture, sx, sy)
        }
    }
    update() {

    }
}