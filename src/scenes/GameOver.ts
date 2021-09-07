import Phaser from 'phaser';
import Rectangle = Phaser.GameObjects.Rectangle;


export default class GameOverScene extends Phaser.Scene {
    title: Rectangle | undefined;
    constructor() {
        super('GameOverScene');
    }

    preload() {

    }

    create() {
        // @ts-ignore
        console.log(this.game.config.status);
        this.title = this.add.rectangle(140,240,50,50,0xffffff);
        this.title.setInteractive().on('pointerdown',()=> {
            console.log('point2')
            this.scene.start('GameScene',{score:0});
        });
    }
    update(time: number, delta: number) {

    }
}
