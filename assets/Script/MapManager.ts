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
            road[0].fill(CubeType.CUBE_GROUND, 0, 1);
            road[0].fill(CubeType.CUBE_ICE, 1, 5);
            road[0].fill(CubeType.CUBE_GROUND, 9, 11);
            road[0].fill(CubeType.CUBE_ICE, 11, 13);
            road[0].fill(CubeType.CUBE_GROUND, 13, 21);
            road[0].fill(CubeType.CUBE_ICE, 21, 28);
            road[0].fill(CubeType.CUBE_WATER, 28, 30);
            road[0].fill(CubeType.CUBE_ICE, 30, 31);
            road[0].fill(CubeType.CUBE_GROUND, 31, 39);

            road[1].fill(CubeType.CUBE_ICE, 0, 1);
            road[1].fill(CubeType.CUBE_ICE, 9, 11);
            road[1].fill(CubeType.CUBE_GROUND, 13, 16);
            road[1].fill(CubeType.CUBE_ICE, 16, 21);
            road[1].fill(CubeType.CUBE_GROUND, 31, 33);
            road[1].fill(CubeType.CUBE_BOUNCE, 33, 39);//弹跳方块

            road[2].fill(CubeType.CUBE_GROUND, 13, 16);
            road[2].fill(CubeType.CUBE_ICE, 31, 32);
            road[2].fill(CubeType.CUBE_GROUND, 32, 33);

            road[3].fill(CubeType.CUBE_ICE, 13, 16);
            road[3].fill(CubeType.CUBE_ICE, 32, 33);
            road[3].fill(CubeType.CUBE_DISAPPEAR, 33, 39);

            road[6].fill(CubeType.CUBE_CLOUD, 36, 39);


            road[7].fill(CubeType.CUBE_GROUND, 0, 11);

            road[8].fill(CubeType.CUBE_ICE, 0, 1);
            road[8].fill(CubeType.CUBE_WATER, 1, 4);
            road[8].fill(CubeType.CUBE_GROUND, 4, 7);
            road[8].fill(CubeType.CUBE_ICE, 7, 9);
            road[8].fill(CubeType.CUBE_GROUND, 9, 30);
            road[8].fill(CubeType.CUBE_CLOUD, 32, 35);

            road[9].fill(CubeType.CUBE_GROUND, 4, 7);
            road[9].fill(CubeType.CUBE_ICE, 9, 10);
            road[9].fill(CubeType.CUBE_GROUND, 10, 12);
            road[9].fill(CubeType.CUBE_BOUNCE, 12, 13);
            road[9].fill(CubeType.CUBE_ICE, 13, 14);
            road[9].fill(CubeType.CUBE_WATER, 14, 17);
            road[9].fill(CubeType.CUBE_ICE, 17, 31);

            road[10].fill(CubeType.CUBE_ICE, 2, 3);
            road[10].fill(CubeType.CUBE_ICE, 4, 7);
            road[10].fill(CubeType.CUBE_GROUND, 10, 12);
            road[10].fill(CubeType.CUBE_SKIPOUT, 22, 23);
            road[10].fill(CubeType.CUBE_SKIPIN, 29, 30);

            road[11].fill(CubeType.CUBE_GROUND, 10, 12);
            road[11].fill(CubeType.CUBE_GROUND, 22, 30);

            road[12].fill(CubeType.CUBE_ICE, 10, 11);
            road[12].fill(CubeType.CUBE_GROUND, 11, 12);
            road[12].fill(CubeType.CUBE_GROUND, 21, 31);

            road[13].fill(CubeType.CUBE_ICE, 11, 12);
            road[13].fill(CubeType.CUBE_CLOUD, 15, 16);
            road[13].fill(CubeType.CUBE_GROUND, 21, 31);

            road[14].fill(CubeType.CUBE_CLOUD, 18, 19);
            road[14].fill(CubeType.CUBE_ICE, 21, 22);
            road[14].fill(CubeType.CUBE_GRASS, 22, 30);
            road[14].fill(CubeType.CUBE_ICE, 30, 31);

            road[15].fill(CubeType.CUBE_ICE, 22, 23);
            road[15].fill(CubeType.CUBE_GROUND, 23, 29);
            road[15].fill(CubeType.CUBE_ICE, 29, 30);

            road[16].fill(CubeType.CUBE_ICE, 23, 25);
            road[16].fill(CubeType.CUBE_WATER, 25, 26);
            road[16].fill(CubeType.CUBE_ICE, 26, 29);


        }

        else if(captureNum == 1){
            // 第二关的地图
            road = new Array(25);
            for (let i = 0; i < road.length; i++) {
                road[i] = new Array(40).fill(CubeType.EMPTY);
            }

            road[0].fill(CubeType.CUBE_GROUND, 0, 25);
            road[0].fill(CubeType.CUBE_BOUNCE, 25, 27);
            road[0].fill(CubeType.CUBE_GROUND, 27, 40);

            road[1].fill(CubeType.CUBE_GROUND, 0, 2);
            road[1].fill(CubeType.CUBE_WATER, 2, 5);
            road[1].fill(CubeType.CUBE_GROUND, 5, 6);
            road[1].fill(CubeType.CUBE_WATER, 6, 9);
            road[1].fill(CubeType.CUBE_GROUND, 9, 10);
            road[1].fill(CubeType.CUBE_WATER, 10, 13);
            road[1].fill(CubeType.CUBE_ICE, 13, 15);
            road[1].fill(CubeType.CUBE_GROUND, 15, 16);
            road[1].fill(CubeType.CUBE_WATER, 16, 24);
            road[1].fill(CubeType.CUBE_GROUND, 24, 25);
            road[1].fill(CubeType.CUBE_ICE, 27, 28);
            road[1].fill(CubeType.CUBE_GROUND, 28, 31);
            road[1].fill(CubeType.CUBE_ICE, 31, 34);
            road[1].fill(CubeType.CUBE_GRASS, 34, 37);
            road[1].fill(CubeType.CUBE_GROUND, 37, 40);

            road[2].fill(CubeType.CUBE_GROUND, 0, 2);
            road[2].fill(CubeType.CUBE_DISAPPEAR, 2, 5);
            road[2].fill(CubeType.CUBE_GROUND, 5, 6);
            road[2].fill(CubeType.CUBE_MONSTER, 8, 9);
            road[2].fill(CubeType.CUBE_GROUND, 9, 10);
            road[2].fill(CubeType.CUBE_DISAPPEAR, 10, 11);
            road[2].fill(CubeType.CUBE_GROUND, 15, 16);
            road[2].fill(CubeType.CUBE_CLOUD, 24, 25);
            road[2].fill(CubeType.CUBE_BOX, 28, 29);
            road[2].fill(CubeType.CUBE_MONSTER, 29, 30);
            road[2].fill(CubeType.CUBE_GROUND, 30, 31);
            road[2].fill(CubeType.CUBE_BOX, 33, 34);
            road[2].fill(CubeType.CUBE_GRASS, 37, 40);

            road[3].fill(CubeType.CUBE_GROUND, 0, 1);
            road[3].fill(CubeType.CUBE_ICE, 1, 2);
            road[3].fill(CubeType.CUBE_GROUND, 5, 6);
            road[3].fill(CubeType.CUBE_ICE, 9, 10);
            road[3].fill(CubeType.CUBE_GROUND, 15, 16);
            road[3].fill(CubeType.CUBE_GROUND, 24, 25);
            road[3].fill(CubeType.CUBE_GROUND, 29, 31);
            road[3].fill(CubeType.CUBE_GROUND, 33, 34);

            road[4].fill(CubeType.CUBE_GROUND, 0, 1);
            road[4].fill(CubeType.CUBE_ICE, 5, 6);
            road[4].fill(CubeType.CUBE_GROUND, 15, 16);
            road[4].fill(CubeType.CUBE_CLOUD, 18, 19);
            road[4].fill(CubeType.CUBE_ICE, 19, 20);
            road[4].fill(CubeType.CUBE_GROUND, 20, 23);
            road[4].fill(CubeType.CUBE_ICE, 24, 25);
            road[4].fill(CubeType.CUBE_GROUND, 29, 31);
            road[4].fill(CubeType.CUBE_GROUND, 33, 34);

            road[5].fill(CubeType.CUBE_GROUND, 0, 1);
            road[5].fill(CubeType.CUBE_GROUND, 13, 14);
            road[5].fill(CubeType.CUBE_SKIPOUT, 14, 15);
            road[5].fill(CubeType.CUBE_GROUND, 15, 16);
            road[5].fill(CubeType.CUBE_SKIPIN, 20, 21);
            road[5].fill(CubeType.CUBE_GROUND, 21, 23);
            road[5].fill(CubeType.CUBE_ICE, 29, 31);
            road[5].fill(CubeType.CUBE_CLOUD, 31, 33);
            road[5].fill(CubeType.CUBE_GROUND, 33, 34);
            road[5].fill(CubeType.CUBE_GROUND, 38, 40);

            road[6].fill(CubeType.CUBE_GROUND, 0, 1);
            road[6].fill(CubeType.CUBE_GROUND, 13, 16);
            road[6].fill(CubeType.CUBE_GROUND, 20, 23);
            road[6].fill(CubeType.CUBE_GROUND, 33, 35);
            road[6].fill(CubeType.CUBE_GROUND, 38, 40);

            road[7].fill(CubeType.CUBE_GROUND, 0, 1);
            road[7].fill(CubeType.CUBE_GROUND, 13, 16);
            road[7].fill(CubeType.CUBE_GROUND, 33, 40);

            road[8].fill(CubeType.CUBE_GROUND, 0, 1);
            road[8].fill(CubeType.CUBE_GROUND, 8, 16);
            road[8].fill(CubeType.CUBE_GROUND, 20, 40);

            road[9].fill(CubeType.CUBE_BOUNCE, 0, 1);
            road[9].fill(CubeType.CUBE_BOUNCE, 8, 9);
            road[9].fill(CubeType.CUBE_GROUND, 9, 11);
            road[9].fill(CubeType.CUBE_WATER, 11, 13);
            road[9].fill(CubeType.CUBE_GROUND, 13, 20);
            road[9].fill(CubeType.CUBE_WATER, 20, 31);
            road[9].fill(CubeType.CUBE_GROUND, 31, 32);
            road[9].fill(CubeType.CUBE_BOUNCE, 32, 33);
            road[9].fill(CubeType.CUBE_ICE, 33, 40);

            road[10].fill(CubeType.CUBE_BOUNCE, 0, 1);
            road[10].fill(CubeType.CUBE_GROUND, 9, 11);
            road[10].fill(CubeType.CUBE_ICE, 13, 20);
            road[10].fill(CubeType.CUBE_GROUND, 31, 32);
            road[10].fill(CubeType.CUBE_BOX, 35, 36);
            road[10].fill(CubeType.CUBE_BOX, 37, 38);

            road[11].fill(CubeType.CUBE_GROUND, 0, 1);
            road[11].fill(CubeType.CUBE_GROUND, 9, 10);
            road[11].fill(CubeType.CUBE_LASER, 10, 11);
            road[11].fill(CubeType.CUBE_DISAPPEAR, 24, 31);
            road[11].fill(CubeType.CUBE_GROUND, 31, 32);
            road[11].fill(CubeType.CUBE_BOX, 35, 36);
            road[11].fill(CubeType.CUBE_BOX, 37, 38);

            road[12].fill(CubeType.CUBE_GROUND, 0, 1);
            road[12].fill(CubeType.CUBE_GROUND, 9, 10);
            road[12].fill(CubeType.CUBE_ICE, 11, 13);
            road[12].fill(CubeType.CUBE_GROUND, 31, 32);
            road[12].fill(CubeType.CUBE_BOX, 35, 36);
            road[12].fill(CubeType.CUBE_BOX, 37, 38);

            road[13].fill(CubeType.CUBE_GROUND, 0, 1);
            road[13].fill(CubeType.CUBE_CLOUD, 7, 9);
            road[13].fill(CubeType.CUBE_ICE, 9, 10);
            road[13].fill(CubeType.CUBE_ICE, 31, 32);
            road[13].fill(CubeType.CUBE_CLOUD, 32, 34);
            road[13].fill(CubeType.CUBE_GROUND, 34, 39);

            road[14].fill(CubeType.CUBE_GROUND, 0, 4);
            road[14].fill(CubeType.CUBE_DISAPPEAR, 4, 5);
            road[14].fill(CubeType.CUBE_ICE, 34, 36);
            road[14].fill(CubeType.CUBE_WATER, 36, 38);
            road[14].fill(CubeType.CUBE_ICE, 38, 39);

            road[15].fill(CubeType.CUBE_GROUND, 0, 4);

            road[16].fill(CubeType.CUBE_GROUND, 0, 4);
            road[16].fill(CubeType.CUBE_GROUND, 15, 30);
            road[16].fill(CubeType.CUBE_GROUND, 37, 38);

            road[17].fill(CubeType.CUBE_GROUND, 0, 4);
            road[17].fill(CubeType.CUBE_GROUND, 10, 17);
            road[17].fill(CubeType.CUBE_WATER, 17, 19);
            road[17].fill(CubeType.CUBE_GROUND, 19, 20);
            road[17].fill(CubeType.CUBE_WATER, 20, 21);
            road[17].fill(CubeType.CUBE_GROUND, 21, 22);
            road[17].fill(CubeType.CUBE_WATER, 22, 23);
            road[17].fill(CubeType.CUBE_ICE, 23, 26);
            road[17].fill(CubeType.CUBE_GROUND, 26, 30);
            road[17].fill(CubeType.CUBE_GROUND, 30, 36);

            road[18].fill(CubeType.CUBE_GROUND, 0, 4);
            road[18].fill(CubeType.CUBE_GRASS, 4, 8);
            road[18].fill(CubeType.CUBE_ICE, 8, 11);
            road[18].fill(CubeType.CUBE_WATER, 11, 14);
            road[18].fill(CubeType.CUBE_ICE, 14, 15);
            road[18].fill(CubeType.CUBE_GROUND, 15, 17);
            road[18].fill(CubeType.CUBE_DISAPPEAR, 18, 19);
            road[18].fill(CubeType.CUBE_LASER, 19, 20);
            road[18].fill(CubeType.CUBE_DISAPPEAR, 20, 21);
            road[18].fill(CubeType.CUBE_LASER, 21, 22);
            road[18].fill(CubeType.CUBE_DISAPPEAR, 22, 23);
            road[18].fill(CubeType.CUBE_GROUND, 26, 30);
            road[18].fill(CubeType.CUBE_ICE, 30, 36);

            road[19].fill(CubeType.CUBE_GROUND, 0, 1);
            road[19].fill(CubeType.CUBE_GRASS, 1, 4);
            road[19].fill(CubeType.CUBE_ICE, 15, 17);
            road[19].fill(CubeType.CUBE_DISAPPEAR, 20, 21);
            road[19].fill(CubeType.CUBE_GRASS, 26, 27);
            road[19].fill(CubeType.CUBE_GROUND, 27, 29);
            road[19].fill(CubeType.CUBE_GRASS, 29, 30);
            road[19].fill(CubeType.CUBE_BOX, 31, 32);

            road[20].fill(CubeType.CUBE_GROUND, 0, 1);
            road[20].fill(CubeType.CUBE_GROUND, 27, 28);
            road[20].fill(CubeType.CUBE_GRASS, 28, 29);
            road[20].fill(CubeType.CUBE_GROUND, 31, 32);

            road[21].fill(CubeType.CUBE_GROUND, 0, 1);
            road[21].fill(CubeType.CUBE_GRASS, 27, 28);
            road[21].fill(CubeType.CUBE_GROUND, 31, 32);

            road[22].fill(CubeType.CUBE_GROUND, 0, 1);
            road[22].fill(CubeType.CUBE_GROUND, 31, 40);

            road[23].fill(CubeType.CUBE_GROUND, 0, 1);
            road[23].fill(CubeType.CUBE_GROUND, 30, 40);

            road[24].fill(CubeType.CUBE_GROUND, 0, 40);

        }

        return road;
    }
}

export default new MapManager();