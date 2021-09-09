import Phaser from "phaser";
import Rectangle = Phaser.GameObjects.Rectangle;
import Text = Phaser.GameObjects.Text;
import config, { GV } from "../config";
import TimerEvent = Phaser.Time.TimerEvent;
import Sprite = Phaser.GameObjects.Sprite;
import Body = Phaser.Physics.Arcade.Body;

export default class GameScene extends Phaser.Scene {
  timer: number = 0;
  player: Rectangle | undefined;
  enemies: Sprite[];
  scoreText: Text | undefined;
  score: number = 0;
  scoreTimer: TimerEvent | undefined;
  constructor() {
    super("GameScene");
  }
  init(data: any) {
    Object.assign(this.game.config, { status: "start" });
    console.log("config", this.game.config);
    console.log("data", data);
    if (data.score) {
      console.log("have data");
      this.score = data.score;
    } else {
      this.score = 0;
    }
  }

  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    // this.game.
    this.createScoreText();
    this.createPlayer();
    this.createScoreTimer();

    this.createEnemy();
  }

  createScoreText() {
    this.scoreText = this.add.text(200, 200, this.score.toString(), {
      fontSize: "48px",
    });
  }

  createPlayer() {
    const { width, height } = this.sys.canvas;
    this.player = this.add.rectangle(
      width / 2,
      height - 50 / 2,
      GV.playerSize,
      GV.playerSize,
      0xffffff
    );
    this.player.setOrigin(0.5, 0.5);
  }

  createEnemy() {
    const { width, height } = this.sys.canvas;
    const enemy = this.add.rectangle(
      width / 2,
      0,
      GV.enemyWidth,
      GV.enemyHeight,
      0xffffff
    );

    enemy.setOrigin(0.5, 0.5);
    this.physics.world.enable(enemy);
    enemy.body.velocity.x = 2;
    // @ts-ignore
    enemy.body.setCollideWorldBounds(true);

    this.physics.world.on("worldbounds", function () {
      console.log("bounds");
    });
  }

  playerControl() {
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      if (pointer.x - this.player!.x > GV.playerSize / 2) {
        this.player!.x += GV.playerSpeed * GV.playerAccelaration;
      } else if (this.player!.x - pointer.x > GV.playerSize / 2) {
        this.player!.x -= GV.playerSpeed * GV.playerAccelaration;
      } else {
        this.player!.x = pointer.x;
      }
    }
    if (pointer.x < GV.playerSize / 2) {
      this.player!.x = GV.playerSize / 2;
    }
    if (pointer.x > this.sys.canvas.width - GV.playerSize / 2) {
      this.player!.x = this.sys.canvas.width - GV.playerSize / 2;
    }
  }

  scoreAction() {
    console.log("score");
    this.score++;
  }

  createScoreTimer() {
    this.scoreTimer = this.time.addEvent({
      callback: this.scoreAction,
      callbackScope: this,
      delay: 1000,
      loop: true,
    });
  }
  update(time: number, delta: number) {
    this.playerControl();
    this.scoreText?.setText(this.score.toString());
  }
}
