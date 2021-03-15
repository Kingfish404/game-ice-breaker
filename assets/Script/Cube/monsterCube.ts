
import { _decorator, Component, Node } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 怪物方块脚本
@ccclass('MonsterCube')
export class MonsterCube extends Component {

    start () {
        // 怪物方块
        this.node.name = String(CubeType.CUBE_MONSTER);
    }
}