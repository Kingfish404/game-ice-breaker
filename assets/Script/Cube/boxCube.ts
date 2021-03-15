
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 箱子方块脚本
@ccclass('BoxCube')
export class BoxCube extends Component {

    start () {
        // 箱子方块
        this.node.name = String(CubeType.CUBE_BOX);
    }
}