class Enemy extends GameImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.alive = true
        this.bullets = []
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 256)
        this.y = -randomBetween(0, 200)
        this.cooldown = randomBetween(40, 50)
    }
    update() {
        this.y += this.speed
        if (this.y > 272 || this.alive == false) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
        this.fire()
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = randomBetween(40, 50)
            var x = this.x + this.w / 3
            var y = this.y + this.h
            var b = EnemyBullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.bullets.push(b)
        }
    }
}
