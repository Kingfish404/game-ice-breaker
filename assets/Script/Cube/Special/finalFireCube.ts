
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('FinalFireCube')
export class FinalFireCube extends Component {

    start() {
        this.node.name = String(CubeType.CUBE_FINAL_FILE);
    }
}