import { _decorator, Component, Node ,Animation, Collider2D } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('LaserCubeRight')
export class LaserCubeRight extends Component {

    @property({type : Animation})
    public laserAnim: Animation | null = null;

    start () {
        // 激光方块
        this.node.name = String(CubeType.CUBE_LASER_RIGHT);
        if(this.laserAnim){
            this.laserAnim.play("laserRight");
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

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
