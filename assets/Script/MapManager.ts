import { CubeType } from "./GameManager";
import { Vec3 } from 'cc';

class MapManager {

    public skipPos: Array<Vec3> =
        [
            new Vec3(22 * 40 + 200, 12 * 40 + 70, 0),//new Vec3(1087, 550, 0),// 22 * 40  12 *40
            new Vec3(15 * 40 + 200, 6 * 40 + 70),//new Vec3(820, 300, 0),//15 6
            new Vec3(27 * 40 + 220, 3 * 40 + 120, 0),//new Vec3(1290, 240, 0),//27 3
            new Vec3(820, 300, 0),
        ];  //跳转位置

    public initPos: Array<Vec3> =
        [
            new Vec3(500, 250, 0),
            new Vec3(1700, 300, 0),
            new Vec3(580, 300, 0),
            // new Vec3(1480, 600, 0), //dd test camera in capt 3
            new Vec3(1600, 200, 0),
            new Vec3(300, 300, 0),
            new Vec3(300, 300, 0),
        ]  //初始位置

    public laserPos: Array<Vec3> =
        [
            new Vec3(440, 440, 0),
            new Vec3(760, 760, 0),
            new Vec3(840, 760, 0),
            new Vec3(360, 400, 0),
            new Vec3(1000, 960, 0),
            new Vec3(1440, 640, 0),
            new Vec3(1440, 680, 0),
            new Vec3(960, 680, 0),
            new Vec3(960, 440, 0),
            new Vec3(960, 320, 0),
            new Vec3(960, 240, 0),
            new Vec3(960, 520, 0),
            new Vec3(1360, 120, 0),
            new Vec3(1280, 320, 0),
            new Vec3(1360, 320, 0)
        ]//保存laser位置

    generate(captureNum: number): Array<Array<CubeType>> | null {
        let road = null;
        if (captureNum == 0) {
            // 第一关的地图
            road = new Array(21);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(39).fill(CubeType.EMPTY);
            }

            // 填充地图数组
            const tofill = [[
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 2, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 9, 10, 10, 10, 10, 10, 10, 10, 10, 9, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 9, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 18, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 9, 0, 9, 9, 9, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 1, 1, 1, 0, 0, 9, 1, 1, 4, 9, 2, 2, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 1], [
                9, 2, 2, 2, 1, 1, 1, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 8, 8, 8, 0, 0, 0, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 5, 5, 5, 5, 5, 5], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 1], [
                9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 1, 1, 1, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4], [
                1, 9, 9, 9, 9, 0, 0, 0, 0, 1, 1, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 2, 2, 9, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];

            for (let i = 0; i < road.length; i++) {
                for (let j = 0; j < road[0].length; j++) {
                    if (tofill[road.length - 1 - i][j] != 0) {
                        road[i][j] = tofill[road.length - 1 - i][j];
                    }
                }
            }
        }

        else if (captureNum == 1) {
            // 第二关的地图
            road = new Array(25);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(41).fill(CubeType.EMPTY);
                road[i][0] = CubeType.CUBE_GROUND;
            }

            const tofill = [[
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 10, 10, 10, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 20, 5, 20, 0, 0, 0, 0, 10, 1, 1, 10, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 1, 1, 1, 10, 10, 10, 10, 9, 9, 9, 2, 2, 2, 9, 1, 1, 0, 5, 16, 5, 17, 5, 0, 0, 0, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 1], [
                1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], [
                1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], [
                1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 2, 2, 9, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8, 8, 1, 1, 1, 1, 0, 0, 1], [
                1, 18, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 1, 0, 0, 0, 13, 0, 13, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 12, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 1, 22, 0, 0, 13, 0, 13, 0, 0, 1], [
                4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 13, 0, 13, 0, 0, 1], [
                4, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 4, 9, 9, 9, 9, 9, 9, 9, 9], [
                1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 7, 1, 0, 0, 0, 18, 6, 1, 1, 0, 0, 0, 0, 0, 0, 9, 9, 8, 8, 1, 0, 0, 0, 0, 1, 1, 1], [
                1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 8, 9, 1, 1, 1, 0, 9, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [
                1, 9, 0, 0, 0, 1, 0, 0, 0, 9, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 13, 0, 0, 0, 0, 0, 0, 1], [
                1, 1, 5, 5, 5, 1, 0, 11, 0, 10, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 13, 11, 1, 0, 0, 13, 0, 0, 0, 10, 10, 10, 10], [
                1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 9, 9, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 9, 9, 1, 1, 1, 1, 1, 10, 10, 10, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];//laser right :11 10 ; laser up1:18 19; laser up2: 18 21

            for (let i = 0; i < road.length; i++) {
                for (let j = 0; j < road[0].length; j++) {
                    if (tofill[road.length - 1 - i][j] != 0) {
                        road[i][j] = tofill[road.length - 1 - i][j];
                    }
                }
            }
        }

        else if (captureNum == 2) {
            // 第三关的地图
            road = new Array(26);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(38).fill(CubeType.EMPTY);
            }

            const tofill = [[
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 20, 17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 9, 0, 0, 1, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 18, 1, 0, 1, 0], [
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 20, 17, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 20, 17], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 1, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 17], [
                1, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 1, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [
                1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0], [
                1, 0, 0, 0, 11, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 20, 17, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 9, 5, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 2, 2, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 20, 17, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 1, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 1, 4, 16, 0, 0, 1, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 9, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 20, 17, 0, 0, 0, 0, 4, 24, 0, 0, 0, 0, 1, 0], [
                1, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 4, 1, 0, 0, 0, 0, 1, 0], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 1, 0, 6, 0], [
                1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], [
                1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0], [
                1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
            ]
            for (let i = 0; i < road.length; i++) {
                for (let j = 0; j < road[0].length; j++) {
                    if (tofill[road.length - 1 - i][j] != 0) {
                        road[i][j] = tofill[road.length - 1 - i][j];
                    }
                }
            }
        }
        else if (captureNum == 3) {
            // 第四关的地图
            road = new Array(17);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(36).fill(CubeType.EMPTY);
            }

            const tofill = [[
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1, 0, 0, 0, 1, 0, 18, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 18, 0, 0, 0, 15, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 5, 0, 0, 4, 0, 0, 0, 1], [
                1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 4, 0, 0, 0, 1], [
                1, 1, 2, 2, 2, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 5, 0, 0, 4, 0, 0, 0, 1], [
                1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 15, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 1, 0, 0, 0, 1, 1, 1, 20, 0, 20, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 15, 1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 4, 1, 0, 0, 0, 1, 1, 1, 16, 14, 16, 1], [
                1, 0, 0, 0, 0, 1, 8, 8, 8, 1, 1, 8, 1, 15, 1, 1, 1, 0, 0, 18, 0, 0, 0, 5, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 15, 0, 18, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 15, 4, 4, 1, 1, 4, 4, 4, 1, 1, 0, 0, 0, 1, 1, 1, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 1, 4, 4, 4, 1, 1, 1], [
                1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 0, 0, 1, 1, 1, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 17], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 23, 0, 0, 26, 0, 0, 1, 1, 4, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 0, 0, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]

            for (let i = 0; i < road.length; i++) {
                for (let j = 0; j < road[0].length; j++) {
                    if (tofill[road.length - 1 - i][j] != 0) {
                        road[i][j] = tofill[road.length - 1 - i][j];
                    }
                }
            }
        }
        else if (captureNum == 4) {
            // 第五关的地图
            road = new Array(20);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(33).fill(CubeType.EMPTY);
            }

            const tofill = [[
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 9, 9, 9, 9, 9, 15, 15, 9, 15, 15, 9, 9, 15, 9, 15, 9, 9, 15, 15, 15, 9, 9, 15, 15, 15, 9, 15, 15, 9, 9, 4, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [
                1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]

            for (let i = 0; i < road.length; i++) {
                for (let j = 0; j < road[0].length; j++) {
                    if (tofill[road.length - 1 - i][j] != 0) {
                        road[i][j] = tofill[road.length - 1 - i][j];
                    }
                }
            }
        }
        else if (captureNum == 5) {
            // 第六关的地图
            road = new Array(20);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(36).fill(CubeType.EMPTY);
            }

            const tofill: Array<Array<number>> = [[
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]

            for (let i = 0; i < road.length; i++) {
                for (let j = 0; j < road[0].length; j++) {
                    if (tofill[road.length - 1 - i][j] != 0) {
                        road[i][j] = tofill[road.length - 1 - i][j];
                    }
                }
            }
        }
        return road;
    }
}

export default new MapManager();