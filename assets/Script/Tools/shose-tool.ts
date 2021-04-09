
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 鞋子道具脚本
@ccclass('ShoseCube')
export class ShoseTool extends Component {

    start () {
        // 鞋子道具
        this.node.name = String(CubeType.TOOL_SHOSE);
    }
}