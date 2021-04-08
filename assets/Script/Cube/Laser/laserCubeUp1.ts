
import { _decorator, Component, Node, Animation, Collider2D } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('LaserCubeUp1')
export class LaserCubeUp1 extends Component {
    
    @property({type : Animation})
    public laserAnim: Animation | null = null;

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER_UP_1);
        if(this.laserAnim){
            this.laserAnim.play("laserUp-1");
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
