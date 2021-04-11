import { _decorator, Component, Node, Animation, Collider2D } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('LaserCubeUp2')
export class LaserCubeUp2 extends Component {

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER_UP_2);
        console.log(this.node.position);
    }

}

