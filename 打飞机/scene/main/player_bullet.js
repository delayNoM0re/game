class PlayerBullet extends GameImage {
    constructor(game) {
        super(game, 'playerbullet')
        this.setup()
    }
    setup() {
        this.speed = 5
    }
    update() {
        this.y -= this.speed
    }
    debug() {
        this.speed = config.bullet_speed
    }
}
