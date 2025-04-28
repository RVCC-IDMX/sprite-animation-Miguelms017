import Phaser from 'phaser';

/**
 * GameplayScene
 * Main scene with character
 */

export default class GameplayScene extends Phaser.Scene {
  constructor() {
    //Scene Key
    super({ key: 'GameplayScene' });

    //initialize properties
    this.player = null;
    this.cursor = null;
  }

  /**
   * create game projects and set up gameplay
   */
  create() {
    // add background image
    this.add.image(600, 300, 'background').setDisplaySize(1200, 600);

    // animated Character
    this.createAnimations();

    // create player
    this.createPlayer();

    //create keys for input
    this.cursors = this.input.keyboard.createCursorKeys();

    // ESC to pause
    this.input.keyboard.on('keydown-ESC', () => {
      console.log('ESC pressed - would go to game over scene');
      this.scene.start('GameOverScene'); // Goes To GameOver here
    });

    // play animation
    this.player.anims.play('walk', true);

    // add instructions text
    this.add.text(600, 50, 'Use Arrow Keys to Move • Press ESC to End', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);
  }

  /**
   * create Animations from stylesheet
   */
  createAnimations() {
    //walking animation
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('character', {
        start: 0,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    });

    // idle animation wit only first frame
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('character', {
        frames: [0]
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  /**
   * player creation/config
   */
  createPlayer() {
    // add sprite at the left of screen
    this.player = this.physics.add.sprite(170, 450, 'character');

    // scale player
    this.player.setScale(0.5);

    // physics
    this.player.setCollideWorldBounds(true);

    // Adjust physics bofy for better collisions
    this.player.body.setSize(
      this.player.width * 0.6,
      this.player.height * 0.8,
    );

    // center physics body
    this.player.body.setOffset(
      this.player.width * 0.2,
      this.player.height * 0.2
    );
  }

  /**
   * update frame by frame
   */
  update() {
    const speed = 160; //movement speed (px/s)
    const halfWidth = this.player.width * 0.5 * this.player.scale;
    const worldWidth = this.scale.width;

    // reset horizontal Velocity
    this.player.setVelocityX(0);

    // handle left movement
    if (this.cursors.left.isDown && this.player.x > halfWidth) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true); //flip sprite
      this.player.anims.play('walk', true);
    }

    // handle right movement
    else if (this.cursors.right.isDown && this.player.x < worldWidth - halfWidth) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false); //original orientation
      this.player.anims.play('walk', true);
    }

    // no movements || at edge
    else {
      // play idle animation
      this.player.anims.play('idle', true);
    }
  }
}