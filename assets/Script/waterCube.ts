
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 水方块脚本
@ccclass('WaterCube')
export class WaterCube extends Component {

    type: number = 10086;

    start () {
        // 水方块的name均为water，玩家碰到了会死
        this.node.name = "water";
    }
}