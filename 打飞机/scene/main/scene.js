class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 6
        this.bg = GameImage.new(game, 'background')
        this.cloud = Cloud.new(game, 'cloud')
        this.ps = []

        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addEnemies()
        // add particles
        // this.ps = ParticleSystem.new(this.game)
        // this.addElement(this.ps)
        // this.duration = 50
    }
    addEnemies() {
        var es = []
        for (var i = es.length; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
        // 回收爆炸效果，时间到了就消失
        this.recycleExplosion()
        // 回收超出界面的玩家子弹
        this.recycleBullet()
        // 回收超出界面的敌人子弹
        this.recycleEnemyBullet()
        // 玩家子弹打中敌人
        this.bulletHitEnemy()
        // 玩家子弹打中敌人子弹
        this.playerHitBullet()
        // 玩家被子弹打中
        this.bulletHitPlayer()
        // 玩家和敌人相撞
        this.playerHitEnemy()

        this.gameover()
    }
    recycleExplosion() {
        var ps = this.ps.slice(0)
        for (var i = 0; i < ps.length; i++) {
            var p = ps[i]
            if (p.duration < 0) {
                this.deleteElement(p)
                // this.ps.splice(i, 1)
            }
        }
    }
    recycleBullet() {
        var bullets = this.player.bullets
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i]
            if (b.y < 0) {
                this.deleteElement(b)
                this.player.bullets.splice(i, 1)
            }
        }
    }
    recycleEnemyBullet() {
        var enemies = this.enemies
        for (var i = 0; i < enemies.length; i++) {
            var e = enemies[i]
            var bullets = e.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (b.y > 272) {
                    this.deleteElement(b)
                    this.enemies[i].bullets.splice(j, 1)
                }
            }
        }
    }
    bulletHitEnemy() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var bullets = this.player.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (e.collide(b)) {
                    // log('打中了敌机')
                    this.deleteElement(b)
                    this.player.bullets.splice(j, 1)
                    e.alive = false
                    var p = ParticleSystem.new(this.game, b.x, b.y)
                    this.addElement(p)
                    this.ps.push(p)
                }
            }
        }
    }
    playerHitBullet() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var ebs = e.bullets
            var bullets = this.player.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                for (var k = 0; k < ebs.length; k++) {
                    var eb = ebs[k]
                    if (eb.collide(b)) {
                        // log('打中了子弹')
                        this.deleteElement(b)
                        this.player.bullets.splice(j, 1)
                        this.deleteElement(eb)
                        this.enemies[i].bullets.splice(k, 1)
                        var p = ParticleSystem.new(this.game, b.x, b.y)
                        this.addElement(p)
                        this.ps.push(p)
                    }
                }
            }
        }
    }
    bulletHitPlayer() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var bullets = e.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (this.player.collide(b)) {
                    // log('打中了玩家')
                    this.deleteElement(b)
                    this.deleteElement(this.player)
                    this.player.alive = false
                    var p = ParticleSystem.new(this.game, b.x, b.y)
                    this.addElement(p)
                    this.ps.push(p)
                }
            }
        }
    }
    enemyHitPlayer() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            var bullets = e.bullets
            for (var j = 0; j < bullets.length; j++) {
                var b = bullets[j]
                if (this.player.collide(b)) {
                    // log('打中了玩家')
                    this.deleteElement(b)
                    this.deleteElement(this.player)
                    this.player.alive = false
                    var p = ParticleSystem.new(this.game, b.x, b.y)
                    this.addElement(p)
                    this.ps.push(p)
                    this.gameover()
                }
            }
        }
    }
    playerHitEnemy() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i]
            if (this.player.collide(e)) {
                // log('敌人和玩家 boomsakalaka')
                this.deleteElement(e)
                this.deleteElement(this.player)
                this.player.alive = false
                e.alive = false
                var p = ParticleSystem.new(this.game, e.x, e.y)
                this.addElement(p)
                this.ps.push(p)
                this.gameover()
            }
        }
    }
    gameover() {
        var game = this.game
        if (this.player.alive == false) {
            setTimeout(function() {
                var s = SceneEnd.new(game)
                game.replaceScene(s)
            }, 1500)
        }
    }
}
