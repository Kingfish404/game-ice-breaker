import { CubeType } from "./GameManager";

class MapManager {
    generate(captureNum: number): Array<Array<CubeType>> | null {
        let road = null;
        if (captureNum == 0) {
            // 第一关的地图
            road = new Array(20);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(38).fill(CubeType.EMPTY);
            }

            // 填充地图数组
            // 第一行
            road[0].fill(CubeType.CUBE_GROUND, 0, 5);
            road[0].fill(CubeType.CUBE_GROUND, 9, 28);
            road[0].fill(CubeType.CUBE_WATER, 28, 30);
            road[0].fill(CubeType.CUBE_GROUND, 30, 39);

            road[1].fill(CubeType.CUBE_GROUND, 0, 1);
            road[1].fill(CubeType.CUBE_GROUND, 9, 11);
            road[1].fill(CubeType.CUBE_GROUND, 13, 21);
            road[1].fill(CubeType.CUBE_GROUND, 31, 33);
            road[1].fill(CubeType.CUBE_BOUNCE, 33, 39);//弹跳方块

            road[2].fill(CubeType.CUBE_GROUND, 13, 16);
            road[2].fill(CubeType.CUBE_GROUND, 31, 33);

            road[3].fill(CubeType.CUBE_GROUND, 13, 16);
            road[3].fill(CubeType.CUBE_GROUND, 32, 33);
            road[3].fill(CubeType.CUBE_GROUND, 33, 34);
            road[3].fill(CubeType.CUBE_DISAPPEAR, 33, 39);

            road[6].fill(CubeType.CUBE_CLOUD, 36, 39);


            road[7].fill(CubeType.CUBE_GROUND, 0, 11);

            road[8].fill(CubeType.CUBE_GROUND, 0, 1);
            road[8].fill(CubeType.CUBE_WATER, 1, 4);
            road[8].fill(CubeType.CUBE_GROUND, 4, 30);
            road[8].fill(CubeType.CUBE_CLOUD, 32, 35);

            road[9].fill(CubeType.CUBE_GROUND, 4, 7);
            road[9].fill(CubeType.CUBE_GROUND, 9, 12);
            road[9].fill(CubeType.CUBE_BOUNCE, 12, 13);
            road[9].fill(CubeType.CUBE_GROUND, 13, 14);
            road[9].fill(CubeType.CUBE_WATER, 14, 17);
            road[9].fill(CubeType.CUBE_GROUND, 17, 31);

            road[10].fill(CubeType.CUBE_GROUND, 2, 3);
            road[10].fill(CubeType.CUBE_GROUND, 4, 7);
            road[10].fill(CubeType.CUBE_GROUND, 10, 12);
            road[10].fill(CubeType.CUBE_SKIP, 22, 23);
            road[10].fill(CubeType.CUBE_SKIP, 30, 31);

            road[11].fill(CubeType.CUBE_GROUND, 10, 12);
            road[11].fill(CubeType.CUBE_GROUND, 22, 30);

            road[12].fill(CubeType.CUBE_GROUND, 10, 12);
            road[12].fill(CubeType.CUBE_GROUND, 21, 31);

            road[13].fill(CubeType.CUBE_GROUND, 11, 12);
            road[13].fill(CubeType.CUBE_CLOUD, 15, 16);
            road[13].fill(CubeType.CUBE_GROUND, 21, 31);

            road[14].fill(CubeType.CUBE_CLOUD, 18, 19);
            road[14].fill(CubeType.CUBE_GROUND, 21, 31);

            road[15].fill(CubeType.CUBE_GROUND, 22, 30);

            road[16].fill(CubeType.CUBE_GROUND, 23, 25);
            road[16].fill(CubeType.CUBE_WATER, 25, 26);
            road[16].fill(CubeType.CUBE_GROUND, 26, 29);


        }

        return road;
    }
}

export default new MapManager();