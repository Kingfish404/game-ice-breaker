import { _decorator, Component, Node, Collider2D, RigidBody2D, Contact2DType, IPhysics2DContact, Vec3, Vec2 } from 'cc';
import { CubeType } from '../GameManager';
const { ccclass, property } = _decorator;

// 怪物方块脚本
@ccclass('MonsterCube')
export class MonsterCube extends Component {

    public isLeft: boolean = true;//判断运动的方向
    public speed: number = 2;//方块移动的距离

    start () {
        // 怪物方块
        this.node.name = String(CubeType.CUBE_MONSTER);
        this.init();
    }

    init(){
        if (this.node) {
            const collider: Collider2D | null = this.node.getComponent(Collider2D);
            const rigidBody2d: RigidBody2D | null = this.node.getComponent(RigidBody2D);
            if (collider) {
                // 设定碰撞事件
                let that = this;
                collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            }
            if (rigidBody2d) {
                rigidBody2d.fixedRotation = true;
            }
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | any | null) {
        if(otherCollider.node.name == String(CubeType.CUBE_GROUND)){
            this.isLeft = !this.isLeft;
        }
    }

    update(){
        if (this.node) {
            const player = this.node;
            const rigidbody2d: RigidBody2D | null = player.getComponent(RigidBody2D);
            if (rigidbody2d) {
                const velocity = rigidbody2d.linearVelocity;
                if(this.isLeft){
                    velocity.x = -this.speed;
                }
                else{
                    velocity.x = this.speed;
                }
                rigidbody2d.linearVelocity = velocity;
            }
        }
    }
}