import { _decorator, Component, Node, Animation, Collider2D, Vec3 } from 'cc';
import { CubeType } from '../../GameManager';
import MapManager from '../../MapManager'
const { ccclass, property } = _decorator;

@ccclass('Laser1')
export class Laser1 extends Component {

    @property({ type: Animation })
    public laser: Animation | null = null;

    public currentPos: Vec3 | null = null

    start() {
        this.node.name = String(CubeType.CUBE_LASER);
        this.currentPos = this.node.position;
        // console.log('laser>start:', this.currentPos);
        let laserAnim: string = "laser-";

        for (var i = 0; i < MapManager.laserPos.length; i++) {
            if (this.currentPos.equals(MapManager.laserPos[i])) {
                laserAnim = laserAnim + String(i + 1);
                console.log('laser>start:', laserAnim);
                break;
            }
        }//根据laser所在位置判断播放哪个Animation

        if (this.laser) {
            this.laser.play(laserAnim);
        }
        const collider: Collider2D | null = this.node.getComponent(Collider2D);
        if (collider) {
            // console.log('apply conllider');
            collider.apply();
            collider.apply();
            collider.apply();
            collider.apply();
        }
    }
}
