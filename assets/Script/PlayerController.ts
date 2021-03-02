
import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, macro, Vec3, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _isMoving = false;
    private _keydown: string | null = null;

    private _pos: Vec3 = new Vec3(0, 0, 0);

    private _xForce: number = 0;
    private _yForce: number = 0;

    @property({ type: Node })
    public player: Node | null = null;

    start() {
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
                this._xForce = -10;
                break;
            case macro.KEY.w:
                this._yForce = 10;
                break;
            case macro.KEY.s:
                this._yForce = 0;
                break;
            case macro.KEY.d:
                this._xForce = 10;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        this._isMoving = false;
        this._keydown = String(event.keyCode);
        switch (event.keyCode) {
            case macro.KEY.a:
            case macro.KEY.d:
                this._xForce = 0;
                break;
            case macro.KEY.w:
            case macro.KEY.s:
                this._yForce = 0;
                break;

        }
    }

    update(deltaTime: number) {
        if (this._isMoving) {
            console.log('IsMoving by:' + this._keydown);
            if (this.player) {
                let player = this.player;
                let rigidbody2d: RigidBody2D | null = player.getComponent(RigidBody2D);
                // 使用刚体运动
                // https://docs.cocos.com/creator/3.0/manual/zh/physics/physics-collider.html
                rigidbody2d?.applyForceToCenter(new Vec2(this._xForce,this._yForce),true);
            }
        }
    }
}
