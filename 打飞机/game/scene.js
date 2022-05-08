class Scene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    deleteElement(img) {
        img.scene = this
        var index = this.elements.indexOf(img)
        if (index != -1) {
            this.elements.splice(index, 1)
        }
    }
    draw() {
        for (var e of this.elements) {
            // this.game.drawImage(e)
            e.draw()
        }
    }
    update() {
        // log('this.elements', this.elements)
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
