/**
 * LinearGradient Drawable
 */

ht.ui.drawable.GradientDrawable = function(color1, color2) {
    var self = this;
    ht.ui.drawable.GradientDrawable.superClass.constructor.call(self);
    if (color1 != null) self.setColor1(color1);
    if (color2 != null) self.setColor2(color2);
};
ht.Default.def('ht.ui.drawable.GradientDrawable', ht.ui.drawable.Drawable, {
    ms_ac: ['color1', 'color2'],
    draw: function(x, y, width, height, data, view, dom) {
        var self = this,
            g = view.getRootContext(dom),
            color1 = self.getColor1(),
            color2 = self.getColor2();
        // draw gradient
        g.beginPath();
        var gradient = g.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        g.rect(x, y, width, height);
        g.fillStyle = gradient;
        g.fill();
    },
    getSerializableProperties: function() {
        var parentProperties = ht.ui.drawable.GradientDrawable.superClass.getSerializableProperties.call(this);
        return ht.Default.addMethod(parentProperties, {
            color1: 1, color2: 1
        });
    }
});