var NodeAxis = {
    X: 1,
    Y: 2,
    Z: 3,
};

class Common3D {
    constructor() {
        console.info("当前版本号是：" + ht.Default.getVersion());

        this.dm = new ht.DataModel();
        this.g3d = new ht.graph3d.Graph3dView(this.dm);
        this.view3 = this.g3d.getView();

        this.view3.style.backgroundSize = "cover";
        this.view3.className = "view";
        document.body.appendChild(this.view3);
        window.addEventListener(
            "resize",
            function (e) {
                this.g3d.invalidate();
            }.bind(this),
            false
        );
    }

    loadScene(scenePath, callback) {
        ht.Default.xhrLoad(scenePath, function (text) {
            let json = ht.Default.parse(text);
            this.dm.deserialize(json);
            let dm = this.dm;
            let g3d = this.g3d;
            let view3 = this.view3;
            callback(dm, g3d, view3);
        }.bind(this));
    }
}