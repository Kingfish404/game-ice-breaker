
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 火焰道具脚本
@ccclass('FireTool')
export class FireTool extends Component {

    start () {
        // 火焰道具
        this.node.name = String(CubeType.TOOL_FIRE);
    }
}