
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 鞋子道具脚本
@ccclass('BoardTool')
export class BoardTool extends Component {

    start() {
        // 鞋子道具
        this.node.name = String(CubeType.TOOL_BOARD);
    }
}