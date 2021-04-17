
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass } = _decorator;

// 鞋子道具脚本
@ccclass('NPC_2')
export class NPC_2 extends Component {

    start() {
        // NPC_2
        this.node.name = String(CubeType.NPC_2);
    }
}