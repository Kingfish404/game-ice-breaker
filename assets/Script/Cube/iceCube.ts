
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 冰方块脚本
@ccclass('IceCube')
export class IceCube extends Component {

    start () {
        // 冰方块
        this.node.name = String(CubeType.CUBE_ICE);
    }
}