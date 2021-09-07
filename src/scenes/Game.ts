import Phaser from 'phaser';
import Rectangle = Phaser.GameObjects.Rectangle;
import Text = Phaser.GameObjects.Text;
import config from "../config";

export default class GameScene extends Phaser.Scene {
  timer: number = 0;
  player: Rectangle | undefined;
  scoreText: Text | undefined;
  score: number = 0;
  constructor() {
    super('GameScene');
  }
  init(data: any){
    Object.assign(this.game.config,{status:'start'});
    console.log('config', this.game.config)
    console.log('data',data)
    if(data.score){
      console.log('have data')
      this.score = data.score;
    }else{
      this.score = 0;
    }
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const { width, height } = this.sys.canvas;
    const logo = this.add.image(400, 75, 'logo');
    this.scoreText = this.add.text(200,200,this.score.toString(),{fontSize:'48px'});

    this.player = this.add.rectangle(width/2,height-50/2,50,50, 0xffffff);
    this.player.setOrigin(0.5,0.5);
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
      // this.score ++;
    // console.log(time);
    this.timer += delta;
    while (this.timer > 1000) {
      this.score += 1;
      this.timer -= 1000;
    }
    const pointer = this.input.activePointer;
    if(pointer.isDown){

      this.player!.x = pointer.x;
    }

    if(pointer.x<25){
      this.player!.x = 25;
    }
    if(pointer.x>455){
      this.player!.x = 455;
    }
  }
}
