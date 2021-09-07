import Phaser from 'phaser';
import Graphics = Phaser.GameObjects.Graphics;
import Rectangle = Phaser.GameObjects.Rectangle;
import Pointer = Phaser.Input.Pointer;

export default class Demo extends Phaser.Scene {
  player: Rectangle | undefined;
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const logo = this.add.image(400, 75, 'logo');


    this.player = this.add.rectangle(30,30,50,50, 0xffffff);
    const logoTween = this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
    console.log(logoTween);


  }
  update(time: number, delta: number) {
    const pointer = this.input.activePointer;
    if(pointer.isDown){
      this.player!.x = pointer.x;

    }
  }
}
