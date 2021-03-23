
import { _decorator, Component, Node, PhysicsSystem2D, PHYSICS_2D_PTM_RATIO, v2, game, director, Prefab, instantiate, CCInteger, Vec3 } from 'cc';
import { GroundCube } from './Cube/groundCube';
import mapManager from './MapManager';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

// 方块类型
export enum CubeType {
    EMPTY,
    CUBE_GROUND,
    CUBE_WATER,
    CUBE_WALL,
    CUBE_BOUNCE,
    CUBE_DISAPPEAR,
    CUBE_SKIPIN,
    CUBE_SKIPOUT,
    CUBE_CLOUD,
    CUBE_ICE,
    CUBE_GRASS,
    CUBE_MONSTER,
    CUBE_LASER,
    CUBE_BOX
}

// 游戏状态
export enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END
};

// 游戏控制脚本
@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: CCInteger })
    public captureNum: number = 0;

    // 控制的玩家对象
    @property({ type: PlayerController })
    public playerCtrl: PlayerController | null = null;

    // 游戏绘制区域对象
    @property({ type: Node })
    public playground: Node | null = null;

    // 开始菜单界面对象
    @property({ type: Node })
    public startMenu: Node | null = null;

    @property({ type: Node })
    public tipsMenu: Node | null = null;

    @property({ type: Node })
    public map: Node | null = null;

    // 设置当前游戏状态
    private _curState: GameState = GameState.GS_INIT;

    @property({ type: Prefab })
    public groundCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public waterCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public bounceCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public disappearCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public skipInCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public skipOutCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public cloudCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public grassCubePrfb: Prefab | null = null;

    @property({ type: Prefab})
    public iceCubePrfb: Prefab | null = null;

    @property({ type:Prefab})
    public monsterCubePrfb: Prefab | null = null;

    @property({ type:Prefab})
    public laserCubePrfb: Prefab | null = null;

    @property({ type:Prefab})
    public boxCubePrfb: Prefab | null = null;

    public initPos: Vec3 | null = null;//保存出生点
    public skipPos: Vec3 | null = null;//保存跳跃点

    start() {
        this.curState = GameState.GS_INIT;

        this.init();
        console.log('load game manager');

        if (this.playerCtrl) {
            this.playerCtrl.node.on('dead', this.onGameEnd, this);
        }

        // 设置当前节点为常驻节点
        // https://docs.cocos.com/creator/3.0/manual/zh/scripting/scene-managing.html
        game.addPersistRootNode(this.node);
    }

    init() {
        this.captureNum = 0;//将关卡初始化为0
        if (this.startMenu) {
            this.startMenu.active = true;
        }
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(true);
        }

        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);

        // enable debug for Physics
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb;
    }

    generateRoad(captureNum: number) {
        if (this.map) {
            this.map.removeAllChildren();
            const road = mapManager.generate(captureNum);

            if (road) {
                // 根据数组生成地图
                for (let i = 0; i < road.length; i++) {
                    for (let j = 0; j < road[0].length; j++) {
                        let block: Node | null = this.spawnCubeByType(road[i][j]);
                        if (block) {
                            this.map.addChild(block);
                            block.setPosition(j * 40, i * 40, 0);
                        }
                    }
                }
            }
        }
    }

    // 根据类型返回方块
    spawnCubeByType(type: CubeType) {
        if (!this.groundCubePrfb || !this.waterCubePrfb || !this.bounceCubePrfb || !this.disappearCubePrfb || !this.skipInCubePrfb || !this.skipOutCubePrfb|| !this.cloudCubePrfb || !this.iceCubePrfb || !this.grassCubePrfb || !this.boxCubePrfb || !this.monsterCubePrfb || !this.laserCubePrfb) {
            return null;
        } else {
            let block: Node | null = null;
            switch (type) {
                case CubeType.CUBE_GROUND:
                    block = instantiate(this.groundCubePrfb);
                    break;
                case CubeType.CUBE_WATER:
                    block = instantiate(this.waterCubePrfb);
                    break;
                case CubeType.CUBE_BOUNCE:
                    block = instantiate(this.bounceCubePrfb);
                    break;
                case CubeType.CUBE_DISAPPEAR:
                    block = instantiate(this.disappearCubePrfb);
                    break;
                case CubeType.CUBE_SKIPIN:
                    block = instantiate(this.skipInCubePrfb);
                    break;
                case CubeType.CUBE_SKIPOUT:
                    block = instantiate(this.skipOutCubePrfb);
                    break;
                case CubeType.CUBE_CLOUD:
                    block = instantiate(this.cloudCubePrfb);
                    break;
                case CubeType.CUBE_ICE:
                    block = instantiate(this.iceCubePrfb);
                    break;
                case CubeType.CUBE_GRASS:
                    block = instantiate(this.grassCubePrfb);
                    break;
                case CubeType.CUBE_LASER:
                    block = instantiate(this.laserCubePrfb);
                    break;
                case CubeType.CUBE_MONSTER:
                    block = instantiate(this.monsterCubePrfb);
                    break;
                case CubeType.CUBE_BOX:
                    block = instantiate(this.boxCubePrfb);
                    break;
            }

            return block;
        }
    }

    set curState(value: GameState) {
        switch (value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if (this.startMenu) {
                    this.startMenu.active = false;
                }
                if (this.playerCtrl) {
                    this.playerCtrl.init(this.captureNum);
                    this.playerCtrl.setInputActive(true);
                }
                this.generateRoad(this.captureNum);
                //设置初始位置和跳转位置
                this.skipPos = mapManager.skipPos[this.captureNum];
                this.initPos = mapManager.initPos[this.captureNum];
                break;
            case GameState.GS_END:
                /*this.init();
                if (this.playerCtrl) {
                    this.playerCtrl.setInputActive(false);
                    this.playerCtrl.init();
                }*/
                if(this.playerCtrl){
                    if(this.playerCtrl.player){
                        this.playerCtrl.setInputActive(true);
                        this.playerCtrl.player.setWorldPosition(this.initPos);
                    }
                }
                break;
        }
        this._curState = value;
    }

    onGameEnd() {
        this.curState = GameState.GS_END;
    }

    onStartButtonClicked() {
        this.curState = GameState.GS_PLAYING;
    }

    onTipsButtonClicked() {
        if (this.tipsMenu) {
            this.tipsMenu.active = this.tipsMenu.active ? false : true;
        }
    }

    onBackButtonClicked() {
        this.curState = GameState.GS_INIT;
    }

    onNextButtonClicked() {
        this.captureNum = 1;//修改关卡值
        this.curState = GameState.GS_PLAYING;//重新设置游戏地图
        //director.loadScene('caption-1');
    }

    update(deltaTime: number) {
        if(this.playerCtrl?.skipJudge){
            this.playerCtrl.player?.setWorldPosition(this.skipPos);//根据当前关卡跳转位置
            this.playerCtrl.skipJudge = false;
        }
    }
}
