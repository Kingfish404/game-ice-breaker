
import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, macro, Vec3, RigidBody2D, Vec2, Collider2D, Contact2DType, Camera, IPhysics2DContact, Tween, Game } from 'cc';
import { CubeType, GameManager, GameState} from './GameManager';
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
    private _initPos: Vec3 | null = null;
    public maxspeed: number = 10;

    public disappearTime: number = 500;//碰到消失方块消失前的间隔时间
    public recoverTime: number = 8500;//消失方块复原的时间

    public _skipPos: Vec3 = new Vec3(10 * 40, 29 * 40, 0);
    public _cloudPos: Vec3 | null = null;
    public _playerPos: Vec3 | null = null;

    @property({ type: Node })
    public player: Node | null = null;

    @property({ type: Camera })
    public playerCamera: Camera | null = null;

    @property({ type: GameManager})
    public gameCtrl: GameManager | null = null;

    start() {
        if (this.player) {
            this._initPos = this.player.getPosition();
        }
        this.init();
    }

    init() {
        if (this.player) {
            const collider: Collider2D | null = this.player.getComponent(Collider2D);
            const rigidBody2d: RigidBody2D | null = this.player.getComponent(RigidBody2D);
            if (this._initPos) {
                this.player.setPosition(this._initPos);
            }
            if (collider) {
                // 设定碰撞事件
                let that = this;
                collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
                collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            }
            if (rigidBody2d) {
                // 禁止主角旋转
                rigidBody2d.fixedRotation = true;
            }
            if (this.playerCamera) {
                const pos: Vec3 = this.playerCamera.node.getPosition();
                console.log(pos);
                // this.playerCamera.node.setPosition(new Vec3(0, 0, 0));
            }
        }
    }

    skip(){
        if (this.player) {
            const collider: Collider2D | null = this.player.getComponent(Collider2D);
            const rigidBody2d: RigidBody2D | null = this.player.getComponent(RigidBody2D);
            if (this._initPos) {
                this.player.setPosition(this._skipPos);
            }
            if (collider) {
                // 设定碰撞事件
                let that = this;
                collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
                collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            }
            if (rigidBody2d) {
                // 禁止主角旋转
                rigidBody2d.fixedRotation = true;
            }
            if (this.playerCamera) {
                const pos: Vec3 = this.playerCamera.node.getPosition();
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
                this.node.emit('dead');
            }, 500)
        }
        // 碰到穿越方块
        if (otherCollider.node.name == String(CubeType.CUBE_SKIP)) {
            console.log('skipcube');
            console.log(this.player?.position);
            if(this.gameCtrl){
                this.gameCtrl.curState = GameState.GS_SKIP;
            }
        }
        // 碰到弹跳方块
        if (otherCollider.node.name == String(CubeType.CUBE_BOUNCE)) {
            console.log('bouncecube');
            console.log(this.player?.position);
            if (!this.isUping) {
                this.isUping = true;
                this._yForce = 2 * this._force;
                let that = this;
                setTimeout(() => {
                    that._yForce = 0;
                }, 150)
            }
        }
        // 碰到消失方块
        if (otherCollider.node.name == String(CubeType.CUBE_DISAPPEAR)) {
            console.log('disappearcube');
            setTimeout(() => {
                otherCollider.node.active = false;
            }, this.disappearTime);//延时0.5s消失
            setTimeout(() => {
                otherCollider.node.active = true;
            }, this.recoverTime)//再8秒后将active再设置为true
        }
    }

    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | any | null) {
        // 碰到云方块
        if (otherCollider.node.name == String(CubeType.CUBE_CLOUD)) {
            this._cloudPos = otherCollider.node.getWorldPosition();
            this._playerPos = selfCollider.node.getWorldPosition();
            /*console.log(this._cloudPos);
            console.log(this._playerPos);*/
            // 接触位置在云块下方
            if (this._cloudPos.y > this._playerPos.y) {
                contact.disabled = true; // 禁用contact使玩家穿过云块,禁用contact仅在本次有效
                // 禁用contact
                // https://docs.cocos.com/creator/3.0/manual/zh/physics-2d/physics-2d-contact-callback.html
            }
        }
    }

    setInputActive(active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        } else {
            systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
    }

    onKeyDown(event: EventKeyboard) {
        this._isMoving = true;
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
                this._xForce = -this._force / 2;
                this._yForce = 0;
                break;
            case macro.KEY.d:
            case macro.KEY.right:
                this._xForce = this._force / 2;
                this._yForce = 0;
                break;
            case macro.KEY.w:
            case macro.KEY.up:
                if (!this.isUping) {
                    this.isUping = true;
                    this._yForce = this._force;
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
                // this._yForce = 0;
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
