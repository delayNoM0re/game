class Cloud extends GameImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = 0
        this.y = -randomBetween(103, 300)
    }
    update() {
        this.y += this.speed
        if (this.y > 272) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}
