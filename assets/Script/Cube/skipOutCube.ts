
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 水方块脚本
@ccclass('SkipOutCube')
export class SkipOutCube extends Component {

    start () {
        // 穿越方块穿越到的位置为skipout
        this.node.name = String(CubeType.CUBE_SKIPOUT);
    }
}