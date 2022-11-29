<template>
  <Modal v-model="visible" draggable  :title="'删除'+title" footer-hide  class='delModal'>
    <Icon type="md-close" size="25" class="closeBtn" :color="'#119191'" slot='close' @click="cancel" />
    <Row class="mod_body" :gutter='16'>
      <Col span="6">
      <Icon type="ios-alert-outline" :color="'#f55'" size="100" class="icon" />
      </Col>
      <Col span="18">
      <p>系统将对此信息执行 <span class="cRed fw700">删除</span> 操作。</p>
      <p class="mt10">删除后该信息将<span class="cRed fw700">无法恢复</span>, 请谨慎操作!</p>
      <div class="divider"></div>
      <p class="mt10">
        <Button @click="confirm" class="confirm mod_btn">确认删除</Button>
        <Button type='primary' @click="cancel" class="cancel mod_btn">取消</Button>
      </p>
      </Col>
    </Row>
  </Modal>
</template>
<script>
  export default {
    name: 'deleteModal',
    model: {
      prop: 'visible',
      event: 'change'
    },
    props: {
      visible: {
        type: Boolean,
      },
      title: {
        type: String,
      },
    },
    data() {
      return {
      };
    },

    methods: {
      confirm() {
        this.$emit('confirm');
      },
      cancel() {
        this.$emit('change', !this.visible)
      },
    },
    watch: {
    }
  };
</script>
<style lang="less" scoped>
.closeBtn{
  float: right;
  cursor: pointer;
}
.closeBtn:hover{
  transform:scale(1.1,1.1);
}
  .mod_body {
    margin-bottom:20px
  }

  .divider {
    background: #a4a4a4;
    height: 1px;
    margin: 20px 30px 20px 0;
    opacity: 0.5;
  }

  .mod_title {
    color: #fff !important;
  }

  #imodal {
    color: #fff;
    cursor: move;
    width: 450px;
    height: 240px;
    background: #252525;
    opacity: .9;
    border: 1px solid #4c4c4c;
    box-shadow: 0px 0px 7px 2px #4c4c4c;
    border-radius: 5px;
    position: fixed;
    top: calc(100vh / 2);
    left: calc(100vw / 2);
    transform: translate(-50%, -50%);
    z-index: 1070;
    padding: 20px;
  }

  #imodal:hover {
    box-shadow: 0px 0px 5px 4px #4c4c4c;
  }

  .mod_btn {
    width: 100px;
  }

  .cancel {
    margin-right: 20px;
  }

  .mod_btn:hover {
    opacity: 0.9;
    border: 1px solid #119191;
    
  }

  .confirm {
    margin-right: 20px;
  }

  .mod-content {
    color: #999;
    font-size: 16px;
    margin-top: 20px;
  }
</style>
<style lang='less'>
  .delModal {
    .ivu-modal-wrap{
      z-index: 9999!important;
    }
    .ivu-modal-header-inner {
      font-weight:bold
    }
  }
  .cRed {
    color: #ff5555;// 报警
  }
</style>