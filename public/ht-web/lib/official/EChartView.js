/**
 * 包装 EChart 组件
 */

ht.ui.EChartView = function (option) {
    var self = this,
        eChartDiv = document.createElement('div');

    eChartDiv.style.width = '100%';
    eChartDiv.style.height = '100%';
    ht.ui.EChartView.superClass.constructor.call(self);
    self.setContent(eChartDiv);

    // 基于准备好的 DOM，初始化 EChart 实例
    self._echart = echarts.init(eChartDiv);

    if (option) {
        var viewEventHandler = function(e) {
            if (e.kind === 'endValidate') {
                ht.Default.callLater(function() {
                    self.setOption(option);
                });
                self.removeViewListener(viewEventHandler);
            }
        };
        self.addViewListener(viewEventHandler);
    }

    // 组件宽度和高度变化时要设置一个标记通知 EChart 更新
    self.addPropertyChangeListener(function (e) {
        var property = e.property;
        if (property === 'width' || property === 'height') {
            self._resizeEChart = true;
        }
    });
};

ht.Default.def('ht.ui.EChartView', ht.ui.HtmlView, {
    setOption: function (option) {
        if (typeof option === 'string') {
            option = eval('(' + option + ')');
        }
        this.setPropertyValue('option', option);
        this._echart.setOption(option);
    },
    getOption: function () {
        return this._option;
    },
    validateImpl: function (x, y, width, height) {
        var self = this,
            echart = self._echart;
        ht.ui.EChartView.superClass.validateImpl.call(self, x, y, width, height);
        if (self._resizeEChart) {
            echart.resize();
            delete self._resizeEChart;
        }
    },
    /**
     * 返回可序列化的属性
     */
    getSerializableProperties: function () {
        var parentProperties = ht.ui.EChartView.superClass.getSerializableProperties.call(this);
        return ht.Default.addMethod(parentProperties, {
            option: true
        });
    }
});