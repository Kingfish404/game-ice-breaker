
import { _decorator, Component, Node, PhysicsSystem2D, PHYSICS_2D_PTM_RATIO, v2, game, director, Prefab, instantiate, CCInteger, Vec3, systemEvent, EventKeyboard, SystemEvent, macro, VideoPlayer } from 'cc';
import mapManager from './MapManager';
import { PlayerController } from './PlayerController';
const { ccclass, property, type } = _decorator;

// 方块类型
export enum CubeType {
    EMPTY,
    CUBE_GROUND,
    CUBE_WATER,     // 水方块
    CUBE_WALL,      // 墙
    CUBE_BOUNCE,    // 反弹方块
    CUBE_DISAPPEAR, // 碰到后一段时间后消失方块
    CUBE_SKIPIN,    // 跳转入口方块
    CUBE_SKIPOUT,   // 跳转出口方块
    CUBE_CLOUD,     // 云方块
    CUBE_ICE,       // 积雪方块
    CUBE_GRASS,     //草皮方块
    CUBE_MONSTER,   //自由移动方块
    CUBE_LASER_RIGHT,       //向右发射激光
    CUBE_BOX,               //可由人物移动控制的方块
    CUBE_NEXT_CAPE,         // 下一关，胜利碰撞方块
    CUBE_GROUND_FAKE,       // 无实体的地面物块
    CUBE_LASER_UP,          //向上发射激光方块
    CUBE_LASER_LEFT,        //向左发射激光方块
    TOOL_FIRE,              // 火焰道具
    TOOL_SHOSE,             // 鞋子道具
    CUBE_LASER,             // 激光
    TOOL_BOARD,             // 滑板
    TOOL_HELMET,            // 头盔
    TOOL_DRESS,             // 裙子
    TOOL_CAMERA,            // 可播放相机
    NPC_2,            // npc-2
    NPC_4,            // npc-4
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

    // 设置界面
    @property({ type: Node })
    public backMenu: Node | null = null;

    // 关卡结算
    @property({ type: [Node] })
    public endPage: Node[] | null = null;

    // 显示关卡结算
    private _isOnEndPage: boolean = false;

    // 设置当前游戏状态
    private _curState: GameState = GameState.GS_INIT;

    @property({ type: Prefab })
    public groundCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public waterCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public bounceCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public disappearCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public skipInCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public skipOutCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public cloudCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public grassCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public iceCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public monsterCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public laserCubeRightPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public boxCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public nextCubePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public groundFakePrfb: Prefab | null = null;

    @property({ type: [Node] })
    public bgImages: Node[] | null = null;

    @property({ type: Prefab })
    public laserCubeUpPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public fireToolPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public shoseToolPrfb: Prefab | null = null;

    @property({ type: Node })
    public particleNode: Node | null = null;

    @property({ type: Prefab })
    public laserPrfb: Prefab | null = null;//激光的释放

    @property({ type: Prefab })
    public laserCubeLeftPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public BoardPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public HelmetPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public DressPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public cameraPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public NPC2Prfb: Prefab | null = null;

    @property({ type: Prefab })
    public NPC4Prfb: Prefab | null = null;

    @property({ type: Prefab })
    public finalFirePrfb: Prefab | null = null;     // 最终火炬

    @property({ type: Node })
    public ToolsTipsCamera: Node | null = null;     // 播放视频的相机

    public initPos: Vec3 | null = null; //保存出生点
    public skipPos: Vec3 | null = null; //保存跳跃点

    public fireNum: Number = 0;

    start() {
        this.curState = GameState.GS_INIT;

        this.init();
        console.log('load game manager');

        if (this.playerCtrl) {
            this.playerCtrl.node.on('dead', this.onGameEnd, this);
            this.playerCtrl.node.on('next', this.onNextCape, this);
            this.playerCtrl.node.on('tips', this.onTips, this);
        }

        // 设置当前节点为常驻节点
        // https://docs.cocos.com/creator/3.0/manual/zh/scripting/scene-managing.html
        game.addPersistRootNode(this.node);
    }

    init() {
        this.captureNum = 0;    // 将关卡初始化为0
        this.fireNum = 0;
        if (this.startMenu) {
            this.startMenu.active = true;
        }
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(true);
        }

        if (this.backMenu) {
            this.backMenu.active = false;
        }

        this.setInput()

        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);

        // enable debug for Physics
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb;
    }

    setInput() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.escape:
                // 绑定设置界面的快捷键
                if (this.backMenu) {
                    this.backMenu.active = this.backMenu.active ? false : true;
                    if (this.backMenu.active) {
                        this.playerCtrl?.setInputActive(false);
                    } else {
                        this.playerCtrl?.setInputActive(true);
                    }
                }
                break;
        }
    }

    onContiune() {
        if (this.backMenu) {
            this.backMenu.active = false;
        }
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
        if (!this.groundCubePrfb || !this.waterCubePrfb || !this.bounceCubePrfb || !this.disappearCubePrfb || !this.skipInCubePrfb || !this.skipOutCubePrfb || !this.cloudCubePrfb || !this.iceCubePrfb || !this.grassCubePrfb || !this.boxCubePrfb || !this.monsterCubePrfb || !this.laserCubeRightPrfb || !this.laserCubeUpPrfb || !this.laserCubeLeftPrfb || !this.nextCubePrfb || !this.groundFakePrfb || !this.fireToolPrfb || !this.shoseToolPrfb || !this.laserPrfb || !this.BoardPrfb || !this.DressPrfb || !this.HelmetPrfb) {
            return null;
        } else {
            let block: Node | any | null = null;
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
                case CubeType.CUBE_LASER_RIGHT:
                    block = instantiate(this.laserCubeRightPrfb);
                    break;
                case CubeType.CUBE_MONSTER:
                    block = instantiate(this.monsterCubePrfb);
                    break;
                case CubeType.CUBE_BOX:
                    block = instantiate(this.boxCubePrfb);
                    break;
                case CubeType.CUBE_NEXT_CAPE:
                    block = instantiate(this.nextCubePrfb);
                    break;
                case CubeType.CUBE_GROUND_FAKE:
                    block = instantiate(this.groundFakePrfb);
                    break;
                case CubeType.CUBE_LASER_UP:
                    block = instantiate(this.laserCubeUpPrfb);
                    break;
                case CubeType.CUBE_LASER_LEFT:
                    block = instantiate(this.laserCubeLeftPrfb);
                    break;
                case CubeType.TOOL_FIRE:
                    block = instantiate(this.fireToolPrfb);
                    break;
                case CubeType.CUBE_LASER:
                    block = instantiate(this.laserPrfb);
                    break;
                case CubeType.TOOL_SHOSE:
                    block = instantiate(this.shoseToolPrfb);
                    break;
                case CubeType.TOOL_HELMET:
                    block = instantiate(this.BoardPrfb);
                    break;
                case CubeType.TOOL_BOARD:
                    block = instantiate(this.BoardPrfb);
                    break;
                case CubeType.TOOL_DRESS:
                    block = instantiate(this.BoardPrfb);
                    break;
                case CubeType.TOOL_CAMERA:
                    block = instantiate(this.cameraPrfb);
                    break;
                case CubeType.NPC_2:
                    block = instantiate(this.NPC2Prfb);
                    break;
                case CubeType.NPC_4:
                    block = instantiate(this.NPC4Prfb);
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
                this.fireNum = 0;
                if (this.startMenu) {
                    this.startMenu.active = false;
                }
                if (this.playerCtrl) {
                    this.playerCtrl.init(this.captureNum);
                    this.playerCtrl.setInputActive(true);
                }
                this.setBGImage();
                this.generateRoad(this.captureNum);
                //设置初始位置和跳转位置
                this.skipPos = mapManager.skipPos[this.captureNum];
                this.initPos = mapManager.initPos[this.captureNum];
                break;
            case GameState.GS_END:
                // this.init();
                /*if (this.playerCtrl) {
                    this.playerCtrl.setInputActive(false);
                    this.playerCtrl.init();
                }*/
                /*if(this.playerCtrl){
                    if(this.playerCtrl.player){
                        this.playerCtrl.setInputActive(true);
                        this.playerCtrl.player.setWorldPosition(this.initPos);
                    }
                }*/
                this.curState = GameState.GS_PLAYING;
                break;
        }
        this._curState = value;
    }

    setBGImage() {
        if (this.bgImages) {
            for (let i = 0; i < this.bgImages.length; i++) {
                this.bgImages[i].active = false;
            }
            switch (this.captureNum) {
                case 0:
                    this.bgImages[4].active = true;
                    this.bgImages[0].active = true;
                    break;
                case 1:
                    this.bgImages[5].active = true;
                    this.bgImages[0].active = true;
                    break;
                case 2:
                    this.bgImages[6].active = true;
                    this.bgImages[1].active = true;
                    break;
                case 3:
                    this.bgImages[7].active = true;
                    this.bgImages[2].active = true;
                    break;
                case 4:
                    this.bgImages[5].active = true;
                    this.bgImages[3].active = true;
                    break;
                default:
                    this.bgImages[5].active = true;
                    this.bgImages[0].active = true;
                    break;
            }
        }
    }

    onGameEnd() {
        this.curState = GameState.GS_END;
    }

    onNextCape() {
        if (!this._isOnEndPage) {
            this._isOnEndPage = true;
            this.playerCtrl?.setInputActive(false);
            if (this.endPage && this.captureNum < this.endPage.length) {
                this.endPage[this.captureNum].active = true;
                return;
            }
        }
        if (this.captureNum == mapManager.initPos.length - 1) {
            // 已经到最后一关
            return;
        }
        this.captureNum = this.captureNum + 1;  //修改关卡值
        this.curState = GameState.GS_PLAYING;   //重新设置游戏地图
        this._isOnEndPage = false;
    }

    onTips(args: number) {
        // 处理道具的提示
        console.log(args);
        if (args == CubeType.TOOL_CAMERA) {
            if (this.ToolsTipsCamera) {
                this.ToolsTipsCamera.active = true;
                let video = this.ToolsTipsCamera.getChildByName('VideoPlayer');
                if (video) {
                    video.getComponent(VideoPlayer)?.play();
                }
                this.playerCtrl?.setInputActive(false);
                setTimeout(() => {
                    if (this.ToolsTipsCamera) {
                        this.ToolsTipsCamera.active = false;
                        let video = this.ToolsTipsCamera.getChildByName('VideoPlayer');
                        if (video) {
                            video.getComponent(VideoPlayer)?.stop();
                        }
                    }
                    this.playerCtrl?.setInputActive(true);
                }, 20000);
            }
        } else {

        }
    }

    onEndPageClick() {
        if (this.endPage && this.captureNum < this.endPage.length) {
            this.endPage[this.captureNum].active = false;
        }
        if (this.captureNum == mapManager.initPos.length - 1) {
            // 已经到最后一关
            return;
        }
        this.captureNum = this.captureNum + 1;  //修改关卡值
        this.curState = GameState.GS_PLAYING;   //重新设置游戏地图
        this._isOnEndPage = false;
    }

    onStartButtonClicked() {
        this.curState = GameState.GS_PLAYING;
    }

    onParticleButtonClicked() {
        if (this.particleNode) {
            this.particleNode.active = this.particleNode.active ? false : true;
        }
    }

    onTipsButtonClicked() {
        if (this.tipsMenu) {
            this.tipsMenu.active = this.tipsMenu.active ? false : true;
        }
    }

    onBackButtonClicked() {
        this.curState = GameState.GS_INIT;
    }

    update(deltaTime: number) {
        if (this.playerCtrl?.skipJudge && this.skipPos) {
            this.playerCtrl.player?.setWorldPosition(this.skipPos);//根据当前关卡跳转位置
            this.playerCtrl.skipJudge = false;
        }
    }
}
