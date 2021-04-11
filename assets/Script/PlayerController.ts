
import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, macro, Vec3, RigidBody2D, Vec2, Collider2D, Contact2DType, Camera, IPhysics2DContact, Animation, Sprite, SpriteFrame, BoxCollider2D } from 'cc';
import { CubeType } from './GameManager';
import MapManager from './MapManager'
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _isMoving = false;
    private _keydown: string | null = null;

    private _pos: Vec3 = new Vec3(0, 0, 0);

    private _xForce: number = 0;
    private _yForce: number = 0;
    private _force: number = 100;
    private isUping: boolean = false;
    public _initPos: Vec3 | null = null;
    public _startPos: Vec3 = new Vec3(1500, 300, 0);
    public maxspeed: number = 10;

    public skipJudge: boolean = false;

    public disappearTime: number = 500;//碰到消失方块消失前的间隔时间
    public recoverTime: number = 8500;//消失方块复原的时间

    public _cloudPos: Vec3 | null = null;
    public _playerPos: Vec3 | null = null;

    // 当前角色正在朝右
    public _playerFaceRigth: boolean = true;

    // 角色节点组件
    @property({ type: Node })
    public player: Node | null = null;

    // 角色动画组件
    @property({ type: Animation })
    public playAnim: Animation | null = null;

    // 玩家摄像头
    @property({ type: Camera })
    public playerCamera: Camera | null = null;

    public cameraPos: Vec3 = new Vec3(-20, 70, 1000);//摄像头初始位置

    public boxIsMoving: boolean = false;//判断j键是否按下

    start() {
        if (this.player) {
            this._initPos = MapManager.initPos[0];
        }
        this.init(0);
    }

    init(captureNum: number) {
        this._initPos = MapManager.initPos[captureNum];
        if (this.player) {
            const collider: Collider2D | null = this.player.getComponent(Collider2D);
            const rigidBody2d: RigidBody2D | null = this.player.getComponent(RigidBody2D);
            if (this._initPos) {
                this.player.setWorldPosition(this._initPos);
            }
            // 设定玩家高度
            const box: BoxCollider2D | null = this.player.getComponent(BoxCollider2D);
            console.log('player:start>box', box);

            if (collider) {
                // 设定碰撞事件
                let that = this;
                collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
                collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
                collider.on(Contact2DType.END_CONTACT, this.onEndSolve, this);
            }
            if (rigidBody2d) {
                // 禁止主角旋转
                rigidBody2d.fixedRotation = true;
            }
            if (this.playerCamera) {
                const pos: Vec3 = this.playerCamera.node.getPosition();
                this.playerCamera.node.setPosition(this.cameraPos);//控制初始化时相机的位置
                console.log(pos);
                // this.playerCamera.node.setPosition(new Vec3(0, 0, 0));
            }
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | any | null) {
        // 只在两个碰撞体开始接触时被调用一次的碰撞函数
        this.isUping = false;

        // 判断是否碰到了水
        if (otherCollider.node.name == String(CubeType.CUBE_WATER)) {
            console.log('dead!');
            // 发送死亡事件
            this.setInputActive(false);
            this._xForce = 0;
            this._yForce = 0;
            setTimeout(() => {
                this.onDead();
            }, 500)
        }
        // 碰到穿越方块
        if (otherCollider.node.name == String(CubeType.CUBE_SKIPIN)) {
            if (!this.skipJudge) {
                this.skipJudge = true;
            }
        }
        // 碰到弹跳方块
        if (otherCollider.node.name == String(CubeType.CUBE_BOUNCE)) {
            if (!this.isUping) {
                this.isUping = true;
                this._yForce = 1.5 * this._force;
                let that = this;
                setTimeout(() => {
                    that._yForce = 0;
                }, 150)
            }
        }
        // 碰到暂时消失方块
        if (otherCollider.node.name == String(CubeType.CUBE_DISAPPEAR)) {
            setTimeout(() => {
                otherCollider.node.active = false;
            }, this.disappearTime);//延时0.5s消失
            setTimeout(() => {
                otherCollider.node.active = true;
            }, this.recoverTime)//再8秒后将active再设置为true
        }

        // 碰到永久消失方块
        if (otherCollider.node.name == String(CubeType.TOOL_FIRE) ||
            otherCollider.node.name == String(CubeType.TOOL_SHOSE)
        ) {
            setTimeout(() => {
                otherCollider.node.active = false;
            }, 0);//延时0.5s消失
        }

        // 碰到下一关方块
        if (otherCollider.node.name == String(CubeType.CUBE_NEXT_CAPE)) {
            console.log('next cape!');
            // 下一关
            this.setInputActive(false);
            this._xForce = 0;
            this._yForce = 0;
            setTimeout(() => {
                this.node.emit('next');
            }, 100)
        }

        //碰到激光方块
        if (otherCollider.node.name == String(CubeType.CUBE_LASER_1)) {
            console.log("dead!");
            // 发送死亡事件
            this.setInputActive(false);
            this._xForce = 0;
            this._yForce = 0;
            setTimeout(() => {
                this.onDead();
            }, 100)
        }
    }

    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | any | null) {
        // 碰到云方块
        if (otherCollider.node.name == String(CubeType.CUBE_CLOUD)) {
            this._cloudPos = otherCollider.node.getWorldPosition();
            this._playerPos = selfCollider.node.getWorldPosition();
            // 接触位置在云块下方
            if (this._cloudPos.y > this._playerPos.y) {
                contact.disabled = true; // 禁用contact使玩家穿过云块,禁用contact仅在本次有效
                // 禁用contact
                // https://docs.cocos.com/creator/3.0/manual/zh/physics-2d/physics-2d-contact-callback.html
            }
        }
        //碰到箱子方块通过按键j来移动
        if (otherCollider.node.name == String(CubeType.CUBE_BOX) && this.boxIsMoving) {
            const box = otherCollider.node;
            const rigidbody2d: RigidBody2D | null = box.getComponent(RigidBody2D);
            if (rigidbody2d) {
                const velocity = rigidbody2d.linearVelocity;
                velocity.x = this._xForce / 10;
                velocity.y = this._yForce / 10;
                rigidbody2d.linearVelocity = velocity;
            }
        }
    }

    onEndSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | any | null) {
        if (otherCollider.node.name == String(CubeType.CUBE_BOX)) {
            const box = otherCollider.node;
            const rigidbody2d: RigidBody2D | null = box.getComponent(RigidBody2D);
            if (rigidbody2d) {
                const velocity = rigidbody2d.linearVelocity;
                velocity.x = 0;
                velocity.y = 0;
                rigidbody2d.linearVelocity = velocity;
            }
        }
    }

    onDead() {
        this.node.emit('dead');
    }

    setInputActive(active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        } else {
            systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
            // 立即结束当前的所有运动
            this._yForce = 0;
            this._xForce = 0;
            this.isUping = false;
            this.playAnim?.stop();
        }
    }

    onKeyDown(event: EventKeyboard) {
        this._isMoving = true;
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:

                if (this.playAnim && !this.playAnim.getState('playmove-left').isPlaying) {
                    this.playAnim.play('playmove-left');
                }
                this._playerFaceRigth = false;
                this._xForce = -this._force / 2;
                this._yForce = 0;
                break;
            case macro.KEY.d:
            case macro.KEY.right:

                if (this.playAnim && !this.playAnim.getState('playmove-right').isPlaying) {
                    this.playAnim.play('playmove-right');
                }
                this._playerFaceRigth = true;
                this._xForce = this._force / 2.5;
                this._yForce = 0;
                break;
            case macro.KEY.w:
            case macro.KEY.up:
            case macro.KEY.space:
                if (!this.isUping) {
                    if (this.playAnim) {
                        if (this._playerFaceRigth) {
                            this.playAnim.play('playmove-right-jump');
                        } else {
                            this.playAnim.play('playmove-left-jump');
                        }
                    }
                    this.isUping = true;
                    this._yForce = this._force * 0.9;
                    let that = this;
                    setTimeout(() => {
                        that._yForce = 0;
                    }, 200)
                }
                break;
            case macro.KEY.s:
            case macro.KEY.down:
                this._yForce = 0;
                break;
            case macro.KEY.j:
                this.boxIsMoving = true;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        this._isMoving = false;
        this._keydown = String(event.keyCode);
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
            case macro.KEY.d:
            case macro.KEY.right:
                this._xForce = 0;
                break;
            case macro.KEY.w:
            case macro.KEY.s:
            case macro.KEY.space:
                this._yForce = 0;
                break;
            case macro.KEY.j:
                this.boxIsMoving = false;
                break;
        }
    }

    update(deltaTime: number) {
        if (this.player) {
            const player = this.player;
            const rigidbody2d: RigidBody2D | null = player.getComponent(RigidBody2D);
            if (rigidbody2d) {
                // 使用刚体运动
                // https://docs.cocos.com/creator/3.0/manual/zh/physics/physics-collider.html
                rigidbody2d?.applyForceToCenter(new Vec2(this._xForce, this._yForce), true);
                const velocity: Vec2 = rigidbody2d?.linearVelocity;
                if (velocity) {
                    // 限制刚体速度
                    if (Math.abs(velocity.x) > this.maxspeed) {
                        velocity.x = velocity.x > 0 ? this.maxspeed : -this.maxspeed;
                    }
                    if (this._xForce == 0) {
                        velocity.x /= 1.1;
                    }
                    rigidbody2d.linearVelocity = velocity;
                }
            }
        }
    }
}
