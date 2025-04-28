import Phaser from 'phaser';

/**
 * gameOverScene
 * Displyed when the game ends
 */
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  /**
   * create game objects
   */
  create() {
    // add background image
    this.add.image(600, 300, 'backgroud').setDisplaySize(1200, 600);

    //semi-transparent overlay
    this.add.rectangle(600, 300, 1200, 600, 0x000000, 0.5);

    // GameOver Text
    this.add.text(600, 250, 'Game Over', {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#ff4444',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);

    //restart instructions
    this.add.text(600, 350, 'Press any key to restart', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    //listem imput to restart
    this.input.keyboard.once('keydown', () => {
      this.scene.start('TitleScene');
    });
  }
}