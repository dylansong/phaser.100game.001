import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import GameOverScene from "./scenes/GameOver";
import Menu from "./scenes/Menu";



new Phaser.Game(
  Object.assign(config, {
    scene: [Menu,GameScene,GameOverScene]
  })
);
