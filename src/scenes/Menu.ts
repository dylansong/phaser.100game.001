import Phaser from 'phaser';
import Text = Phaser.GameObjects.Text;
import Tween = Phaser.Tweens.Tween;


export default class Menu extends Phaser.Scene {
    title: string = 'Speed Spike g';
    startText: Text | undefined;
    constructor() {
        super('MenuScene');
    }

    preload() {
    }

    create() {
        let {width,height } = this.sys.canvas;
        const titleText = this.add.text(width/2,height/2-20,this.title, { fontSize:'64px'});
        titleText.setOrigin(0.5,0.5)
        this.initStartText();
        this.startTextTween();

    }


    initStartText(){
        let {width,height } = this.sys.canvas;
        this.startText = this.add.text(width/2,height/2+100,'start', { fontSize:'36px',color:'#33A5E7',backgroundColor:'#fff',padding:{x:6,y:2}});
        this.startText.setOrigin(0.5,0.5)
        this.startText.setInteractive().on('pointerdown',()=>this.scene.start('GameScene'));

    }

    startTextTween():Tween{
        const startTween = this.tweens.add({
            targets:this.startText,
            scale:1.3,
            rotation: 0.1,
            duration: 1000,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
        return startTween
    }

    update(time: number, delta: number) {

    }
}
