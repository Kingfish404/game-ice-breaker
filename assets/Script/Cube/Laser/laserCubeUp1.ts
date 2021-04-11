
import { _decorator, Component, Node, Animation, Collider2D } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('LaserCubeUp1')
export class LaserCubeUp1 extends Component {

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER_UP_1);
    }

}
