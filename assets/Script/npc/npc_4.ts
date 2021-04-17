
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass } = _decorator;

// 鞋子道具脚本
@ccclass('NPC_4')
export class NPC_4 extends Component {

    start() {
        // NPC_4
        this.node.name = String(CubeType.NPC_4);
    }
}