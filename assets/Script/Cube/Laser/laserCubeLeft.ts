import { _decorator, Component, Node, Animation, Collider2D } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('LaserCubeLeft')
export class LaserCubeLeft extends Component {

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER_LEFT);
        this.node.setRotationFromEuler(0, 0, 180);
    }

}

