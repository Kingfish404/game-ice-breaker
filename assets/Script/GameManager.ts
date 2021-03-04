
import { _decorator, Component, Node, PhysicsSystem2D, PHYSICS_2D_PTM_RATIO, v2 } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END,
};

// 游戏控制脚本
@ccclass('GameManager')
export class GameManager extends Component {
    // 控制的玩家对象
    @property({ type: PlayerController })
    public playerCtrl: PlayerController | null = null;

    // 游戏绘制区域对象
    @property({ type: Node })
    public playground: Node | null = null;

    // 开始菜单界面对象
    @property({ type: Node })
    public startMenu: Node | null = null;

    // 设置当前游戏状态
    private _curState: GameState = GameState.GS_INIT;

    start() {
        this.curState = GameState.GS_INIT;
        if (this.playerCtrl){
            this.playerCtrl.setInputActive(true);
        }
    }

    init() {
        if (this.startMenu) {
            this.startMenu.active = true;
        }
        

        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);

        // enable debug for Physics
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb;
    }

    set curState(value: GameState) {
        switch (value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if(this.startMenu){
                    this.startMenu.active = false;
                }
                break;
            case GameState.GS_END:
                break;
        }
        this._curState = value;
    }

    onStartButtonClicked() {
        this.curState = GameState.GS_PLAYING;
    }

    onBackButtonClicked(){
        this.curState = GameState.GS_INIT;
    }

    update(deltaTime: number) {
    }
}