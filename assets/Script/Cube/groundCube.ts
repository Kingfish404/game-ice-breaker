
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GroundCube')
export class GroundCube extends Component {
    start() {
        this.node.name = String(CubeType.CUBE_GROUND);
    }

}