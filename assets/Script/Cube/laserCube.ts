
import { _decorator, Component, Node, Animation, Collider2D } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 激光方块脚本
@ccclass('LaserCube')
export class LaserCube extends Component {

    @property({type : Animation})
    public laserAnim: Animation | null = null;

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER);
        if(this.laserAnim){
            this.laserAnim.play("laser");
        }
    }

    update(){
        const collider : Collider2D | null = this.node.getComponent(Collider2D);
        if(collider){
            collider.apply();
        }
        //使用apply函数动态修改刚体
    }

}