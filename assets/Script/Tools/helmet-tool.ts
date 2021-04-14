
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 鞋子道具脚本
@ccclass('HelmetTool')
export class HelmetTool extends Component {

    start () {
        // 鞋子道具
        this.node.name = String(CubeType.TOOL_HELMET);
    }
}