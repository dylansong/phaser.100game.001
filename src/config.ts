import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  backgroundColor: "#33A5E7",
  scale: {
    width: 480,
    height: 854,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

export const GV = {
  playerSize: 50,
  playerSpeed: 10,
  playerAccelaration: 1.7,

  enemyWidth: 20,
  enemyHeight: 200,
  enemySpeed: 40,
  enemyAccelaration: 1.5,
};
