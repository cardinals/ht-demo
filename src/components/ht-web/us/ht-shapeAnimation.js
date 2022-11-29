let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
String.prototype.colorRgb = function () {
    var sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};
// function (){
//     var sColor = this.toLowerCase();
//     if(sColor && reg.test(sColor)){
//          if(sColor.length === 4){
//               var sColorNew = "#";
//               for(var i=1; i<4; i+=1){
//                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));    
//               }
//               sColor = sColorNew;
//          }
//          //处理六位的颜色值
//          var sColorChange = [];
//          for(var i=1; i<7; i+=2){
//               sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
//          }
//          return "RGB(" + sColorChange.join(",") + ")";
//     }else{
//          return sColor;    
//     }
// }

/**
 * 颜色闪烁效果
 * @param {data} data 数据节点
 * @param {number} duration 持续时间
 * @param {color} color 初始颜色
 * @param {color} targetColor 目标颜色
 * @param {boolean} log 显示日志 
 * @returns 提示信息
 */
function colorFlash(data, duration, color, targetColor, log = true) {
    if (duration < 0) {
        console.info("duration 需要大于零");
        return;
    }

    let rgb = color.colorRgb();
    let targetRgb = targetColor.colorRgb();

    console.info(rgb);
    console.info(targetRgb);

    data.setAnimation({
        flashRed: {
            property: "shape3d.color",
            accessType: "style",
            from: rgb[0],
            to: targetRgb[0],
            duration: duration,
            easing: "Linear",
            next: "flashYellow",
            onUpdate: function (value) {
                data.s("shape3d.color", "rgb(" + value + "," + rgb[1] + ", " + rgb[2] + ")");
            },
        },
        flashYellow: {
            property: "shape3d.color",
            accessType: "style",
            from: targetRgb[0],
            to: rgb[0],
            duration: duration,
            easing: "Linear",
            next: "flashRed",
            onUpdate: function (value) {
                data.s("shape3d.color", "rgb(" + value + "," + rgb[1] + ", " + rgb[2] + ")");
            },
        },
        start: ["flashRed"],
    });
}