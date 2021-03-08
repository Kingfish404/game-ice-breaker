
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 云方块脚本
@ccclass('CloudCube')
export class CloudCube extends Component {

    start () {
        // 云方块的name均为water，玩家碰到了会死
        this.node.name = String(CubeType.CUBE_CLOUD);
    }
}