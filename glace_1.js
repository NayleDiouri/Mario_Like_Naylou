class glace_1 extends Phaser.Scene {
    constructor() {
        super("glace_1"); // mettre le meme nom que le nom de la classe
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("fond_1", "assets/fond_1.png")
        this.load.image("fond_2", "assets/fond_2.png")
        this.load.image("Phaser_assets", "assets/biome_glace.png");
        this.load.image("cristaux", "assets/cristaux_glace.png")
        this.load.image("SpriteHitBox", "assets/SpriteHitBox.png")
        this.load.tilemapTiledJSON("map_glace", "map_glace.json");
        this.load.spritesheet('perso', 'assets/perso.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('perso_feu', 'assets/perso_feu.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('perso_nature', 'assets/perso_nature.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('perso_eau', 'assets/perso_eau.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.image("SpriteFireBall", "assets/SpriteFireBall.png")
        this.load.image("plante", "assets/plante.png")
        this.load.image("plante_mine", "assets/plante_mine.png")
        this.load.image("cascade", "assets/cascade.png")
        this.load.image("enemyShoot", "assets/enemyShoot.png")
        this.load.image("Bdg", "assets/BDG.png")
        this.load.image("pilier_glace", "assets/pilier_glace.png")
        this.load.image("feu","assets/feu.png")
        this.load.image("enemyRL", "assets/enemyRL.png")
        this.load.image("enemyFollow", "assets/enemyFollow.png")
        this.load.image("eau_surface","assets/eau_surface.png")
        this.load.image("eau_profondeur","assets/eau_profondeur.png")
        this.load.image("piques", "assets/piques.png")
        this.load.image("lumieres", "assets/lumieres.png")
        this.load.image("stalactite","assets/stalactite.png")
        this.load.image("bloc_cassable","assets/bloc_cassable.png")
    }

    create() {
        this.fond_1 = this.add.image(448, 224, "fond_1");
        this.fond_2 = this.add.image(1000,250, "fond_2");

        this.cameraY1 = 0
        this.cameraY2 = 20*32
        this.cameraX1 = 0
        this.cameraX2 = 70*32
        this.changeCam = false
        
        //mageFeu
        this.canMageFeu = false;
        this.mageFeu = false;
        this.IsGoingRight = false;
        this.dashCD1 = true;
        this.cristalBreak = false;
        this.CanBDF = true;
        this.vieCristal = 3;
        //mageFeu

        //enemyRL
        this.enemyRLHp = 2;
        this.goL1 = true;
        this.enemyDead1 = false;
        //enemyRL

        //enemyShoot
        this.enemyShootHp = 3;
        this.CanBdg = 1;
        this.nombreEnemy = 0;
        //enemyShoot

        const carteDuNiveau = this.add.tilemap("map_glace");
        const tileset = carteDuNiveau.addTilesetImage(
            "assets_glace",
            "Phaser_assets"
        );
        const fond = carteDuNiveau.createLayer(
            "fond",
            tileset
        );
        this.eau_surface = this.physics.add.group();
        this.calque_eau_surface = carteDuNiveau.getObjectLayer('eau_surface');
        this.calque_eau_surface.objects.forEach(calque_eau_surface => {
            const POP = this.eau_surface.create(calque_eau_surface.x + 16, calque_eau_surface.y - 16, "eau_surface").body.setAllowGravity(false).setImmovable(true);
        });
        this.eau_profondeur = this.physics.add.group();
        this.calque_eau_profondeur = carteDuNiveau.getObjectLayer('eau_profondeur');
        this.calque_eau_profondeur.objects.forEach(calque_eau_profondeur => {
            const POP = this.eau_profondeur.create(calque_eau_profondeur.x + 16, calque_eau_profondeur.y - 16, "eau_profondeur").body.setAllowGravity(false).setImmovable(true);
        });
        this.piques = this.physics.add.group();
        this.calque_piques = carteDuNiveau.getObjectLayer('piques');
        this.calque_piques.objects.forEach(calque_piques => {
            const POP = this.piques.create(calque_piques.x +16 , calque_piques.y -3, "piques").body.setAllowGravity(false).setImmovable(true);
        });
        this.lumieres = this.physics.add.group();
        this.calque_lumieres = carteDuNiveau.getObjectLayer('lumieres');
        this.calque_lumieres.objects.forEach(calque_lumieres => {
            const POP = this.lumieres.create(calque_lumieres.x +16 , calque_lumieres.y -6, "lumieres").body.setAllowGravity(false).setImmovable(true);
        });
        this.stalactite = this.physics.add.group();
        this.calque_stalactite = carteDuNiveau.getObjectLayer('stalactite');
        this.calque_stalactite.objects.forEach(calque_stalactite => {
            const POP = this.stalactite.create(calque_stalactite.x +16 , calque_stalactite.y -16, "stalactite").body.setAllowGravity(false);
        });
        this.stalactite2 = this.physics.add.group();
        this.calque_stalactite2 = carteDuNiveau.getObjectLayer('stalactite2');
        this.calque_stalactite2.objects.forEach(calque_stalactite2 => {
            const POP = this.stalactite2.create(calque_stalactite2.x +16 , calque_stalactite2.y -16, "stalactite").body.setAllowGravity(false);
        });

        this.pilier_glace = this.physics.add.group();
        this.calque_pilier_glace = carteDuNiveau.getObjectLayer('pilier');
        this.calque_pilier_glace.objects.forEach(calque_pilier_glace => {
            const POP = this.pilier_glace.create(calque_pilier_glace.x +16 , calque_pilier_glace.y -24, "pilier_glace").body.setAllowGravity(false).setImmovable(true);
        });
        this.feu = this.physics.add.group();
        this.calque_feu = carteDuNiveau.getObjectLayer('feu');
        this.calque_feu.objects.forEach(calque_feu => {
            const POP = this.feu.create(calque_feu.x +16 , calque_feu.y -22, "feu").body.setAllowGravity(false);
        });
        this.bloc_cassable = this.physics.add.group();
        this.calque_bloc_cassable = carteDuNiveau.getObjectLayer('solCassable');
        this.calque_bloc_cassable.objects.forEach(calque_bloc_cassable => {
            const POP = this.bloc_cassable.create(calque_bloc_cassable.x +16 , calque_bloc_cassable.y -16, "bloc_cassable").body.setAllowGravity(false).setImmovable(true);
        });

       this.cristaux = this.physics.add.group();
       this.calque_cristaux = carteDuNiveau.getObjectLayer('cristaux');
       this.calque_cristaux.objects.forEach(calque_cristaux => {
           const POP = this.cristaux.create(calque_cristaux.x + 0, calque_cristaux.y - 48, "cristaux").setScale(2).body.setAllowGravity(false).setImmovable(true);
       });

        this.enemyRL = this.physics.add.group();
        this.calque_enemyRL = carteDuNiveau.getObjectLayer('enemyRL');
        this.calque_enemyRL.objects.forEach(calque_enemyRL => {
            const POP = this.enemyRL.create(calque_enemyRL.x + 16, calque_enemyRL.y - 16, "enemyRL").body.setAllowGravity(false).setImmovable(true);
        });
        this.hitBoxL = this.physics.add.group();
        this.physics.add.collider(this.enemyRL, this.hitBoxL)
        this.calque_hitBoxL = carteDuNiveau.getObjectLayer('hitBoxL');
        this.calque_hitBoxL.objects.forEach(calque_hitBoxL => {
            const POP = this.hitBoxL.create(calque_hitBoxL.x + 16, calque_hitBoxL.y - 16, "SpriteHitBox").setSize(32, 64).body.setAllowGravity(false).setImmovable(true);
        });
        this.hitBoxR = this.physics.add.group();
        this.calque_hitBoxR = carteDuNiveau.getObjectLayer('hitBoxR');
        this.calque_hitBoxR.objects.forEach(calque_hitBoxR => {
            const POP = this.hitBoxR.create(calque_hitBoxR.x + 16, calque_hitBoxR.y - 16, "SpriteHitBox").setSize(32, 64).body.setAllowGravity(false).setImmovable(true);
        });
        this.enemyShoot = this.physics.add.group();

        this.calque_enemyShoot = carteDuNiveau.getObjectLayer('enemyShoot');    
        this.calque_enemyShoot.objects.forEach(calque_enemyShoot => {
            this.nombreEnemy += 1
            const POP = this.enemyShoot.create(calque_enemyShoot.x + 16, calque_enemyShoot.y - 16, "enemyShoot").body.setAllowGravity(false).setImmovable(true);
        });
        const neige = carteDuNiveau.createLayer(
            "neige",
            tileset
        );
        const sols = carteDuNiveau.createLayer(
            "sols",
            tileset
        );
        this.player = this.physics.add.sprite(66*32, 4*32, 'perso');
        this.player.setCollideWorldBounds(true);
        this.player.setSize(32,48).setOffset(10,8)

        neige.setCollisionByExclusion(-1, true);
        sols.setCollisionByExclusion(-1, true);

        this.CameraHitBox1 = this.physics.add.sprite(69.5*32, 96, "SpriteHitBox").setSize(32, 128)//.body.setAllowGravity(false)//.setImmovable(true)
        this.CameraHitBox2 = this.physics.add.sprite(133.5*32, 19*32, "SpriteHitBox").setSize(160, 32)//.body.setAllowGravity(false)//.setImmovable(true)
        this.feuHitBox = this.physics.add.sprite(135*32,16*32, "SpriteHitBox").setSize(64,64)
        this.SpriteFireBall = this.physics.add.group();
        this.Bdg = this.physics.add.group();
        this.physics.add.collider(this.CameraHitBox1, sols);
        this.physics.add.collider(this.CameraHitBox2, sols);
        this.physics.add.collider(this.feuHitBox, this.bloc_cassable);
        this.physics.add.collider(this.player, sols);
        this.physics.add.collider(this.player, neige);
        this.physics.add.collider(this.player, this.bloc_cassable);
        this.physics.add.collider(this.player, this.piques, this.piquesKill, null, this)
        this.physics.add.overlap(this.player, this.eau_surface, this.waterKill, null, this)
        this.physics.add.overlap(this.player, this.CameraHitBox1, this.cameraChange1, null, this)
        this.physics.add.overlap(this.player, this.CameraHitBox2, this.cameraChange2, null, this)
        this.physics.add.collider(this.stalactite, sols, this.casseStala, null, this)
        this.physics.add.collider(this.stalactite2, sols, this.casseStala, null, this)
        this.physics.add.collider(this.player, this.stalactite, this.stalaKill, null, this)
        this.physics.add.collider(this.player, this.stalactite2, this.stalaKill, null, this)
        this.physics.add.collider(this.player, this.cristaux, this.BreakDash, null, this)
        this.physics.add.collider(this.SpriteFireBall, this.cristaux, this.BreakBDF, null, this);
        this.physics.add.collider(this.player, this.enemyRL)
        this.physics.add.collider(this.SpriteFireBall, this.enemyRL, this.enemyRLKill, null, this)
        this.physics.add.collider(this.player, this.pilier_glace)
        this.physics.add.collider(this.player, this.enemyShoot)
        this.physics.add.collider(this.SpriteFireBall, this.enemyShoot, this.enemyShootKill, null, this);
        this.physics.add.collider(this.player,this.Bdg,this.breakBDG, null, this);
        this.physics.add.collider(sols,this.Bdg,this.breakBDG, null, this);
        this.physics.add.collider(this.cristaux, this.Bdg, this.breakBDG, null, this);





        this.physics.world.setBounds(0, 0, 140*32, 30*32);
        this.cameras.main.setBounds(this.cameraX1, this.cameraY1, this.cameraX2, this.cameraY2);
        this.cameras.main.zoom = 1.2;
        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('A,D,SPACE,SHIFT,E,X,I,O,P');


        this.anims.create({
            key: 'perso',
            frames: [{ key: 'perso', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'perso_feu',
            frames: [{ key: 'perso_feu', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'perso_nature',
            frames: [{ key: 'perso_nature', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'perso_eau',
            frames: [{ key: 'perso_eau', frame: 0 }],
            frameRate: 20
        });

        this.fond_1.setScrollFactor(0).setDepth(-3)
        this.fond_2.setScrollFactor(0.25).setDepth(-2)

    }

    update() {
        //camera
        this.cameras.main.setBounds(this.cameraX1, this.cameraY1, this.cameraX2, this.cameraY2);
        //camera


        
        if (this.clavier.I.isDown && this.mageFeu == false && this.canMageFeu ==true && this.appuyer == false) {
            this.mageFeu = true;
            this.player.anims.play("perso_feu", true)
        }

        if (this.clavier.E.isDown && this.CanBDF == true && this.mageFeu == true && this.IsGoingRight == false) {
            this.SpriteFireBall.create(this.player.x - 50, this.player.y, "SpriteFireBall").setVelocityX(-600).body.setAllowGravity(false);

            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
        }

        else if (this.clavier.E.isDown && this.CanBDF == true && this.mageFeu == true && this.IsGoingRight == true) {
            this.SpriteFireBall.create(this.player.x + 50, this.player.y, "SpriteFireBall").setVelocityX(600).body.setAllowGravity(false);
            this.CanBDF = false;
            setTimeout(() => {
                this.CanBDF = true;
            }, 500);
        }



        if (this.clavier.A.isDown && this.IsGoingRight == false && this.dashCD1 == true && this.mageFeu == true) {
            this.IsGoingRight = false;
            this.player.setVelocityX(-900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            this.cristalBreak = true;
            setTimeout(() => {
                this.dashCD1 = false
                this.player.body.setAllowGravity(true)
                this.cristalBreak = false
            }, 200);

            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                },
            })
        }

        else if (this.clavier.A.isDown && this.IsGoingRight == true && this.dashCD1 == true && this.mageFeu == true) {
            this.IsGoingRight = true;
            this.player.setVelocityX(900);
            this.player.setVelocityY(0);
            this.player.body.setAllowGravity(false)
            this.cristalBreak = true;
            setTimeout(() => {
                this.dashCD1 = false
                this.player.body.setAllowGravity(true)
                this.cristalBreak = false
            }, 200);
            this.time.addEvent({
                delay: 1000, callback: () => {
                    this.dashCD1 = true
                },
            })
        }



        else if (this.cursors.left.isDown) {
            this.IsGoingRight = false;
            this.player.setVelocityX(-200);
        }

        else if (this.cursors.right.isDown) {
            this.IsGoingRight = true;
            this.player.setVelocityX(200);
        }

        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {

            this.player.setVelocityY(-380);

        }


        if(this.clavier.I.isDown && this.physics.overlap(this.player, this.feuHitBox) && this.appuyer == false) {
            this.canMageFeu = true
            this.feu.getChildren()[0].setVisible(false)
            setTimeout(() => {
                this.bloc_cassable.getChildren()[0].destroy()
            }, 200);
        }

                this.stalactite.getChildren().forEach(stala => {
            if(this.player.x >= stala.x && this.player.y >= stala.y){
                stala.body.setAllowGravity(true)
            }});

            this.stalactite2.getChildren().forEach(stala2 => {
                if(this.player.x <= stala2.x && this.player.y >= stala2.y){
                    stala2.body.setAllowGravity(true)
                }});

        
            if (this.clavier.I.isDown) {
                this.appuyer = true
            }
            else {
                this.appuyer = false
            }


            //enemyRL

            if(this.enemyDead1 == false){
                if(this.enemyRL.getChildren()[0] == undefined){
                    this.enemyDead1 = true;
                }
                if (this.goL1 == true && this.enemyRL.getChildren()[0]) {
                    this.enemyRL.getChildren()[0].setVelocityX(-50)
                }
                else if(this.goL1 == false && this.enemyRL.getChildren()[0]) {
                    this.enemyRL.getChildren()[0].setVelocityX(50)
                }
                if (this.enemyRL.getChildren()[0] && this.physics.overlap(this.enemyRL.getChildren()[0], this.hitBoxL)) {
                    this.goL1 = false
                }
                if (this.enemyRL.getChildren()[0] && this.physics.overlap(this.enemyRL.getChildren()[0], this.hitBoxR)) {
                    this.goL1 = true
                }
            }

            //enemyRL

            //enemyShoot
            this.enemyShoot.getChildren().forEach(enemy => {
                if (this.CanBdg > 0) {
    
                    if (this.player.x > enemy.x) {
                        this.Bdg.create(enemy.x, enemy.y, "Bdg").setVelocityX(400).body.setAllowGravity(false)
                        this.CanBdg -= 1;
                    }
                    else if (this.player.x < enemy.x) {
                        this.Bdg.create(enemy.x, enemy.y, "Bdg").setVelocityX(-400).body.setAllowGravity(false)
                        this.CanBdg -= 1;
                    }
                    if (this.CanBdg == 0) {
                        setTimeout(() => {
                            this.CanBdg = this.nombreEnemy
    
                        }, 2000);
                    }
                }
            });
            //enemyShoot



    }
    waterKill(player, water){
        player.setDepth(-1);
        this.player.setVelocityY(20)
        this.time.addEvent({
            delay: 1500, callback: () => {
                player.setVelocityY(200)
                this.scene.restart();
            },
        })

    }

    piquesKill(player, spikes){
        this.cameras.main.shake(200, 0.02)
        this.cameras.main.flash()
        setTimeout(() => {
            this.scene.restart();
        }, 200);

    }

    stalaKill(player, stala){
        this.cameras.main.shake(200, 0.02)
        this.cameras.main.flash()
        setTimeout(() => {
            this.scene.restart();
        }, 200);

    }

    cameraChange1(player,camerahitbox){
        if(this.changeCam == false){
            console.log(this.cameraX1)
            this.cameraX1 = 69*32
            this.cameraX2 = 71  *32
            this.cameraY1 = 0
            this.cameraY2 = 20*32

            player.x = 71*32
            this.changeCam = true
        }

        else if(this.changeCam == true){
            console.log(this.cameraX1)
            this.cameraX1 = 0
            this.cameraX2 = 70*32
            this.cameraY1 = 0
            this.cameraY2 = 20*32
            player.x = 68*32
            this.changeCam = false
        }
    }
    cameraChange2(player,camerahitbox){
            console.log(this.cameraX1)
            this.cameraX1 = 0
            this.cameraX2 = 140*32
            this.cameraY1 = 20*32
            this.cameraY2 = 10*32
    }

    casseStala(stala, sols){
        stala.destroy()
    }

    BreakDash(player, cristal) {
        if (this.cristalBreak == true) {
            cristal.destroy()
        }


    }

    BreakBDF(SpriteFireBall, cristal) {
        this.vieCristal -= 1;
        if (this.vieCristal == 0) {
            cristal.destroy()
            this.vieCristal = 3
        }
        SpriteFireBall.destroy()
    }

    enemyRLKill(SpriteFireBall, enemy) {
        this.enemyRLHp -= 1;
        if (this.enemyRLHp == 0) {
            enemy.destroy()
            this.enemyRLHp = 2
        }
        SpriteFireBall.destroy()
    }
    enemyShootKill(SpriteFireBall, enemy) {
        this.enemyShootHp -= 1;
        if (this.enemyShootHp == 0) {
            enemy.destroy()
            this.enemyShootHp = 3
            this.nombreEnemy -= 1
        }
        SpriteFireBall.destroy()
    }
    breakBDG(collider, bdg){
        bdg.destroy()
    }


}