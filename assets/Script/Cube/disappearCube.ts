
import { _decorator, Component, Node, Collider2D, RigidBody2D, Contact2DType, IPhysics2DContact } from 'cc';
import { CubeType } from '../GameManager';
import { PlayerController} from '../PlayerController'
const { ccclass, property } = _decorator;

// 消失方块脚本
@ccclass('DisappearCube')
export class DisappearCube extends Component {

    private timer:number = 0;

    start () {
        // 消失方块
        this.node.name = String(CubeType.CUBE_DISAPPEAR);
    }


}