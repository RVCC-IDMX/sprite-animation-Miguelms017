import Phaser from 'phaser';

/**
 * TitleScene
 * First Scene when game starts
 */
export default class TitleScene extends Phaser.Scene {
  constructor() {
    // ket to reference scene
    super({ key: 'TitleScene' });
  }

  /**
   * preload assets for game
   */
  preload() {
    //image load
    this.load.image('background', 'assets/images/background.png');

    //load sprites
    this.load.spritesheet('character', 'assets/images/character.png', {
      // dimmensions
      frameWidth: 340,
      frameHeight: 474
    });
  }

  /**
   * Create objects and set up tile screen
   */
  create() {
    //title text
    this.add.text(600, 200, 'character Animation Demo', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // instructions
    this.add.text(600, 300, 'Press any key to start', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // Listen for Keyboard Input to start the game
    this.input.keyboard.once('keydown', () => {
      console.log('key pressed - would start gameplay scene');
      this.scene.start('GameplayScene'); // starts the game here
    });
  }
}