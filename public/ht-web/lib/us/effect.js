class Effect {
    constructor() {
        if (new.target === Effect) {
            throw new Error("Effect!");
        }
        console.info("创建效果基类！");
    }
}

/**
 * 3d流动效果
 */
class FlowEffect extends Effect {
    constructor() {
        super();
        console.info('创建了一个3DFlowEffect!');
    }

    /**
     * 纹理流动效果
     * @param {ht.Data} data 
     * @param {number} flowAmount 
     * @param {number} interval 
     * @returns 
     */
    flow(data, flowAmount, interval, flowAxis) {
        if (interval < 0) {
            console.info('设置的时间间隔不能为负');
            return;
        }
        if (!data) {
            console.info('数据对象不正确');
            return;
        }
        let offset = 0;
        setInterval(() => {
            offset += flowAmount;
            switch (flowAxis) {
                case NodeAxis.X:
                    data.s("shape3d.uv.offset", [offset, 0, 0]);
                    break;
                case NodeAxis.Y:
                    data.s("shape3d.uv.offset", [0, offset, 0]);
                    break;
                case NodeAxis.Z:
                    data.s("shape3d.uv.offset", [0, 0, offset]);
                    break;
            }
        }, interval);
    }
}