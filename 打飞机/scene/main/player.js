class Player extends GameImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.alive = true
        this.speed = 5
        this.cooldown = 0
        this.bullets = []
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    debug() {
        this.speed = config.player_speed
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 4
            var y = this.y
            var b = PlayerBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
        if (this.x < 0) {
            this.x = 0
        }
    }
    moveRight() {
        this.x += this.speed
        if (this.x > 256 - this.w){
            this.x = 256 - this.w
        }
    }
    moveUp() {
        this.y -= this.speed
        if (this.y < 0) {
            this.y = 0
        }
    }
    moveDown() {
        this.y += this.speed
        if (this.y > 272 - this.h){
            this.y = 272 - this.h
        }
    }
    collide(b) {
        return this.alive && (rectIntersects(this, b) || rectIntersects(b, this))
    }
}
