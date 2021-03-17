
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 草块脚本
@ccclass('GrassCube')
export class GrassCube extends Component {

    start () {
        // 草块
        this.node.name = String(CubeType.CUBE_GRASS);
    }
}