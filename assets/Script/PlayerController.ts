
import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, macro, Vec3, RigidBody2D, Vec2, Collider2D, Contact2DType, Camera, IPhysics2DContact } from 'cc';
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

    @property({ type: Node })
    public player: Node | null = null;

    @property({ type: Camera })
    public playerCamera: Camera | null = null;

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
        if (otherCollider.node.name == 'water') {
            console.log('dead!');
            // 发送死亡事件
            this.setInputActive(false);
            this._xForce = 0;
            this._yForce = 0;
            setTimeout(() =>{
                this.node.emit('dead');
            },500)
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
