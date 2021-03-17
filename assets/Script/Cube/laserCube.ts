
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 激光方块脚本
@ccclass('LaserCube')
export class LaserCube extends Component {

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER);
    }
}