<!--
 * @Descripttion: 
 * @Author: zhangxiaoran
 * @Date: 2020-11-23 17:17:09
 * @LastEditors: zhangxiaoran
 * @LastEditTime: 2020-12-10 13:40:23
-->
<template>
  <div
    class="content column-start-center reTree_box"
    :style="{fontSize: (size||14) +'px',lineHeight:(size||14) +'px'}"
  >
    <div class="column-start-center basic_layer" v-for="(item,index) in formatData" :key="index">
      <div
        class="row-flex-start basic_banner"
        :class="{
          'active_color': item.expand && item.children.length>0,
        }"
      >
        <div
          class="reTree_icon"
          style="height:18px;width:18px"
          @click="itemClick(item)"
          :class="{
            'reTree_default_icon': item.children.length===0,
            'reTree_collapse_icon': item.expand && item.children.length>0,
            'reTree_expand_icon': !item.expand && item.children.length>0,
          }"
        ></div>
        <div class="layer_text nowrap" style="fontSize:15px" @click="backMainBuild"><Icon type="md-pin" size="18" style="marginRight:10px;color:#515a6e" />{{item.label}}</div>
      </div>
  
      <lineItem v-if="item.expand&&item.children!=[]" v-on="$listeners" :list="item.children" :size="size"></lineItem>
    </div>
  </div>
</template>
<script>
import lineItem from "./lineItem.vue";
export default {
  name: 'lineTree',
  inheritAttrs: false,
  props: {
    pd: {},
    size: {
      type: Number,
      default: 20
    }
  },
  components: { lineItem },
  data() {
    return {
      selectedDetail: {},
      timer: {},
      formatData: []
    };
  },
  watch: {
    pd(n, o) {
      this.formatData = this.preDealData(n);
    }
  },
  created() {
    this.preDealData(this.pd);
  },

  methods: {
    backMainBuild () {
      var showLayers = [
        {
        scenesName: 'C区@建筑',
        heading:4.648413199318433,
        pitch:-0.38798075460907366,
        roll:6.283185306979867,
        latitude:22.1408370280641,
        longitude:113.55090723218517,
        altitude:378.41016426097667
        },
        {
        scenesName: 'B区@建筑'
        },
        {
        scenesName: 'A区@建筑'
        },
        {
        scenesName: '地面@地面'
        },
      ]
      //返回主模型
      this.$emit('location',showLayers)
    },
    preDealData(list) {
      list.forEach(x => {
        if (!x.expand) this.$set(x, "expand", false);
        if (x.children && x.children.length > 0) this.preDealData(x.children);
      });
      return list;
    },
    // 根据id展开树的具体项
    expandTreeItemById(idList) {
      let _this = this;
      function loopTree(list) {
        list.forEach(x => {
          if (idList.includes(x.id)) {
            _this.$set(x, "expand", true);
          } else {
            _this.$set(x, "expand", false);
          }
          if (x.children && x.children.length > 0) loopTree(x.children);
        });
        return list;
      }
      this.formatData = loopTree(this.pd);
    },
    itemClick(item){
      console.log(item,'item')
      item.expand=!item.expand
      this.$emit('itemClick',item)
    },
    // 详情点击
    detailClick(data) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.selectedDetail = data;
        this.$emit("detailClick", data);
      }, 300);
    },
    detailDoubleClick(data) {
      clearTimeout(this.timer);
      this.selectedDetail = data;
      this.$emit("detailDoubleClick", data);
    }
  }
};
</script>

<style scoped>
.active_color{
  color: #515a6e ;
}
.reTree_box {
  overflow-y: auto;
}
.reTree_icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.basic_layer {
  width: 100%;
  font-size: 15px;
  position: relative;
  color: #515a6e;
  cursor: pointer;
}
.first_vertical_line {
  content: "";
  position: absolute;
  width: 1px;
  left: 6px;
  top: 17px;
  background: #c3c5c8;
}
.basic_banner {
  position: relative;
  width: 100%;
  padding-bottom: 13px;
}
.second_layer {
  position: relative;
  width: 100%;
  cursor: pointer;
  padding-left: 25px;
}
.third_layer {
  position: relative;
  padding-bottom: 15px;
  width: 100%;
  padding-left: 40px;
  color: #999999;
}

.second_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 16px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}
.third_layer::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 20px;
  left: 9px;
  top: 9px;
  background: #c3c5c8;
}

.linkLine_default::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
.linkLine_first::after {
  content: "";
  position: absolute;
  /* 为了触顶 */
  top: -14px;
  height: calc(100% + 14px);
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
/* // 上半截 */
.linkLine_half_top::after {
  content: "";
  position: absolute;
  height: 24px;
  top: -14px;
  width: 1px;
  left: 9px;
  background: #c3c5c8;
}
.linkLine_last::after {
  content: "";
  position: absolute;
  height: 9px;
  width: 1px;
  left: 9px;
  top: 0px;
  background: #c3c5c8;
}
.reTree_collapse_icon {
  background: url("../../assets/images/hide.png") no-repeat center center;
  background-size: contain;
  float: left;
}

.reTree_default_icon {
  background: url("../../assets/images/show.png") no-repeat center center;
  background-size: contain;
  float: left;
}

.reTree_expand_icon {
  background: url("../../assets/images/show.png") no-repeat center center;
  background-size: contain;
  float: left;
}

.reTree_focus_icon {
  background: url("../../assets/images/hide.png") no-repeat center center;
  background-size: contain;
  float: left;
}
</style>