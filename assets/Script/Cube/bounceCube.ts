
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 弹跳方块脚本
@ccclass('BounceCube')
export class BounceCube extends Component {

    start () {
        // 弹跳方块
        this.node.name = String(CubeType.CUBE_BOUNCE);
    }
}