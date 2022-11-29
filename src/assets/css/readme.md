@import "color/colors";  // delete

// Prefix
@css-prefix             : ivu-;  // delete
@css-prefix-iconfont    : ivu-icon;  // delete

// Color
@primary-color          : #2d8cf0;
@info-color             : #2db7f5;
@success-color          : #19be6b;
@processing-color       : @primary-color;  // change to #2d8cf0;未保留联动
@warning-color          : #ff9900;
@error-color            : #ed4014;
@normal-color           : #e6ebf1;
@link-color             : #2D8cF0;
@link-hover-color       : tint(@link-color, 20%);  // change to tint(#2D8cF0, 20%);未保留联动
@link-active-color      : shade(@link-color, 5%);  // change to shade(#2D8cF0, 5%);未保留联动
@selected-color         : fade(@primary-color, 90%);  // change to fade(#2d8cf0, 90%);未保留联动
@tooltip-color          : #fff;
@subsidiary-color       : #808695;
@rate-star-color        : #f5a623;
@white: #fff;
@black: #000;

// Base
@body-background        : #fff;
@component-background   : #fff;
@font-family            : "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;  // delete
@code-family            : Consolas,Menlo,Courier,monospace;  // delete
@title-color            : #17233d;
@text-color             : #515a6e;
@text-color-secondary: fade(@black, 45%);  // change to fade(#000, 45%);未保留联动
@heading-color: fade(#000, 85%);
@heading-color-dark: fade(@white, 100%);  // change to fade(#fff, 100%);未保留联动
@table-thead-color      : #515a6e;  // add
@table-tbody-color      : #515a6e;  // add
@font-size-base         : 14px;  // delete
@font-size-small        : 12px;  // delete
@font-size-large        : @font-size-base + 2px;  // delete
@line-height-base       : 1.5;  // delete
@line-height-computed   : floor((@font-size-base * @line-height-base));  // delete
@border-radius-base     : 6px;  // delete
@border-radius-small    : 4px;  // delete
@cursor-disabled        : not-allowed;  // delete

// vertical paddings
@padding-lg: 24px; // containers  // delete
@padding-md: 16px; // small containers and buttons  // delete
@padding-sm: 12px; // Form controls and items  // delete
@padding-xs: 8px; // small items  // delete

// Border color
@border-color-base      : #dcdee2; // outside
@border-color-split     : #e8eaec; // inside
@border-color-table     : #e8eaec;  // add
@border-width-base      : 1px;            // width of the border for a component  // delete
@border-style-base      : solid;          // style of a components border  // delete

// Background color
@background-color-base        : #f7f7f7;  // base
@background-color-select-hover: @input-disabled-bg;  // change to #f3f3f3;未保留联动
@tooltip-bg                   : rgba(70, 76, 91, .9);
@head-bg                      : #f9fafc;
@table-bg                     : #F0F1F2; // add;新增table底色
@table-thead-bg               : #f8f8f9;
@table-tbody-bg               : #fff;  // add;新增单数行底色
@table-td-stripe-bg           : #f8f8f9;
@table-td-hover-bg            : #ebf7ff;
@table-td-highlight-bg        : #ebf7ff;
@menu-dark-title              : #515a6e;
@menu-dark-active-bg          : #363e4f;
@menu-dark-subsidiary-color   : rgba(255,255,255,.7);
@menu-dark-group-title-color  : rgba(255,255,255,.36);
@date-picker-cell-hover-bg    : #e1f0fe;

// Shadow
@shadow-color           : rgba(0, 0, 0, .2);
@shadow-base            : @shadow-down;  // change to 0 1px 6px rgba(0, 0, 0, .2)
@shadow-card            : 0 1px 1px 0 rgba(0,0,0,.1);
@shadow-up              : 0 -1px 6px rgba(0, 0, 0, .2);  // change to 0 -1px 6px rgba(0, 0, 0, .2)
@shadow-down            : 0 1px 6px rgba(0, 0, 0, .2);  // change to 0 1px 6px rgba(0, 0, 0, .2)
@shadow-left            : -1px 0 6px rgba(0, 0, 0, .2);  // change to -1px 0 6px rgba(0, 0, 0, .2)
@shadow-right           : 1px 0 6px rgba(0, 0, 0, .2);  // change to 1px 0 6px rgba(0, 0, 0, .2)

// Button
@btn-height-base        : 32px;  // delete
@btn-height-large       : 40px;  // delete
@btn-height-small       : 24px;  // delete

@btn-padding-base       : 0 @padding-md - 1px;  // delete
@btn-padding-large      : @btn-padding-base;  // delete
@btn-padding-small      : 0 @padding-xs - 1px;  // delete

@btn-font-weight        : normal;  // delete
@btn-padding-base-icon  : 5px 15px 6px;  // delete
@btn-padding-large-icon : 6px 15px 6px 15px;  // delete
@btn-padding-small-icon : 1px 7px 2px;  // delete
@btn-font-size          : @font-size-base;  // delete
@btn-font-size-large    : @font-size-large;  // delete
@btn-font-size-small    : @font-size-base;  // delete
@btn-border-radius      : 4px;  // delete
@btn-border-radius-small: 3px;  // delete
@btn-group-border       : shade(@primary-color, 5%);  // change to shade(#2d8cf0, 5%);未保留联动

@btn-disable-color      : #c5c8ce;
@btn-disable-bg         : @background-color-base;  // change to #f7f7f7;未保留联动
@btn-disable-border     : @border-color-base;  // change to #dcdee2;未保留联动

@btn-default-color      : @text-color;  // change to #515a6e;未保留联动
@btn-default-bg         : #fff;
@btn-default-border     : @border-color-base;  // change to #dcdee2;未保留联动

@btn-primary-color      : #fff;
@btn-primary-bg         : @primary-color;  // change to #2d8cf0;未保留联动
@btn-primary-border     : @primary-color;  // add

@btn-ghost-color        : @text-color;  // change to #515a6e;未保留联动
@btn-ghost-bg           : #fff;
@btn-ghost-border       : @border-color-base;  // change to #dcdee2;未保留联动

@btn-circle-size        : @btn-height-base;  // delete
@btn-circle-size-large  : @btn-height-large;  // delete
@btn-circle-size-small  : @btn-height-small;  // delete

@btn-square-size        : @btn-height-base;  // delete
@btn-square-size-large  : @btn-height-large;  // delete
@btn-square-size-small  : @btn-height-small;  // delete

// Layout and Grid
@grid-columns                : 24;  // delete
@grid-gutter-width           : 0;  // delete
@layout-body-background      : #f5f7f9;
@layout-header-background    : #515a6e;
@layout-header-height        : 64px;  // delete
@layout-header-padding       : 0 50px;  // delete
@layout-footer-padding       : 24px 50px;  // delete
@layout-footer-background    : @layout-body-background;  // change to #f5f7f9;未保留联动
@layout-sider-background     : @layout-header-background;  // change to #515a6e;未保留联动
@layout-trigger-height       : 48px;  // delete
@layout-trigger-color        : #fff;
@layout-zero-trigger-width   : 36px;  // delete
@layout-zero-trigger-height  : 42px;  // delete

// Legend
@legend-color           : #999;

// Input
@input-height-base           : 32px;  // delete
@input-height-large          : 40px;  // delete
@input-height-small          : 24px;  // delete

@input-padding-horizontal    : 7px;  // delete
@input-padding-vertical-base : 4px;  // delete
@input-padding-vertical-small: 1px;  // delete
@input-padding-vertical-large: 6px;  // delete

@input-placeholder-color     : @btn-disable-color;  // change to #c5c8ce;未保留联动
@input-color                 : @text-color;  // change to #515a6e;未保留联动
@input-border-color          : @border-color-base;  // change to #dcdee2;未保留联动
@input-bg                    : #fff;
@input-group-bg              : #f8f8f9;

@input-hover-border-color    : @primary-color;  // change to #2d8cf0;未保留联动
@input-focus-border-color    : @primary-color;  // change to #2d8cf0;未保留联动
@input-disabled-bg           : #f3f3f3;

// Select
@select-item-color            : #515a6e;  // add
@select-placeholder-color     : @btn-disable-color;  // add
@select-color                 : @text-color;  // add
@select-border-color          : @border-color-base;  // add
@select-bg                    : #fff;  // add
@select-group-bg              : #f8f8f9;  // add

@select-hover-border-color    : @primary-color;  // add
@select-focus-border-color    : @primary-color;  // add
@select-focus-shadow-color    : rgba(45, 140, 240, .2);  // add
@select-disabled-bg           : #f3f3f3;  // add

// Tag
@tag-font-size          : 12px;  // delete

// Media queries breakpoints
// Extra small screen / phone
@screen-xs              : 480px;  // delete
@screen-xs-min          : @screen-xs;  // delete
@screen-xs-max          : (@screen-xs-min - 1);  // delete

// Small screen / tablet
@screen-sm              : 576px;  // delete
@screen-sm-min          : @screen-sm;  // delete
@screen-sm-max          : (@screen-sm-min - 1);  // delete

// Medium screen / desktop
@screen-md              : 768px;  // delete
@screen-md-min          : @screen-md;  // delete
@screen-md-max          : (@screen-md-min - 1);  // delete

// Large screen / wide desktop
@screen-lg              : 992px;  // delete
@screen-lg-min          : @screen-lg;  // delete
@screen-lg-max          : (@screen-lg-min - 1);  // delete

// Extra large screen / full hd
@screen-xl              : 1200px;  // delete
@screen-xl-min          : @screen-xl;  // delete
@screen-xl-max          : (@screen-xl-min - 1);  // delete

// Extra extra large screen / large descktop
@screen-xxl             : 1600px;  // delete
@screen-xxl-min         : @screen-xxl;  // delete
@screen-xxl-max         : (@screen-xxl-min - 1);  // delete

// Z-index
@zindex-spin            : 8;  // delete
@zindex-affix           : 10;  // delete
@zindex-back-top        : 10;  // delete
@zindex-select          : 900;  // delete
@zindex-modal           : 1000;  // delete
@zindex-drawer          : 1000;  // delete
@zindex-message         : 1010;  // delete
@zindex-notification    : 1010;  // delete
@zindex-tooltip         : 1060;  // delete
@zindex-transfer        : 1060;  // delete
@zindex-loading-bar     : 2000;  // delete
@zindex-spin-fullscreen : 2010;  // delete

// Animation
@animation-time         : .3s;  // delete
@animation-time-quick   : .15s;  // delete
@transition-time        : .2s;  // delete
@ease-in-out            : ease-in-out;  // delete

// Slider
@slider-color              : tint(@primary-color, 20%);  // change to tint(#2d8cf0, 20%);未保留联动
@slider-height             : 4px;  // delete
@slider-margin             : 16px 0;  // delete
@slider-button-wrap-size   : 18px;  // delete
@slider-button-wrap-offset : -5px;  // delete
@slider-disabled-color     : #ccc;

// Avatar
@avatar-size-base: 32px;  // delete
@avatar-size-lg: 40px;  // delete
@avatar-size-sm: 24px;  // delete
@avatar-font-size-base: 18px;  // delete
@avatar-font-size-lg: 24px;  // delete
@avatar-font-size-sm: 14px;  // delete
@avatar-bg: #ccc;
@avatar-color: #fff;
@avatar-border-radius: @border-radius-small;  // delete

// Anchor
@anchor-border-width: 2px;  // delete

// List
// ---  // delete
@list-header-background: transparent;
@list-footer-background: transparent;
@list-empty-text-padding: @padding-md;  // delete
@list-item-padding: @padding-sm 0;  // delete
@list-item-meta-margin-bottom: @padding-md;  // delete
@list-item-meta-avatar-margin-right: @padding-md;  // delete
@list-item-meta-title-margin-bottom: @padding-sm;  // delete