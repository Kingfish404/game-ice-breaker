
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('NextCapCube')
export class NextCapCube extends Component {

    start() {
        this.node.name = String(CubeType.CUBE_NEXT_CAPE);
    }
}