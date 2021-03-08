
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 水方块脚本
@ccclass('SkipCube')
export class SkipCube extends Component {

    start () {
        // 穿越方块的name均为skip，玩家会穿越
        this.node.name = String(CubeType.CUBE_SKIP);
    }
}