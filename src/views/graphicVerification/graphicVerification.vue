<template>
  <div class='loginClass'>
    <Row>
      <Col span='17'>
        <Form ref="userForm" :model="userForm" :rules="userRules" hide-required-mark :label-width="100">
          <FormItem prop="username" label="用户名">
            <Input type="text" v-model="userForm.username"/>
          </FormItem>
          <FormItem prop="password" label="密码" style="margin-top:20px">
            <Input type="password" v-model="userForm.password"/>
          </FormItem>
          <FormItem prop="checked" label="验证码" style="margin-top:20px">
            <Button style='width:240px;height:26px' @click='isChecked = true'>点击完成验证</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span='4'>
        <div class='ivu-input loginBtn pointer' @click='login("userForm")'>
          登录
        </div>
      </Col>
    </Row>
    <slide-verify :l="42" v-if='isChecked' style='top:-240px;left:100px'
      :imgs='imgs'
      :r="10"
      :w="340"
      :h="165"
      slider-text="向右滑动"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
      ></slide-verify>
  </div>
</template>
<script>
import img0 from '@/assets/images/img/1.png';
import img1 from '@/assets/images/img/2.png';
import img2 from '@/assets/images/img/3.png';
import img3 from '@/assets/images/img/4.png';
import img4 from '@/assets/images/img/5.png';
import img5 from '@/assets/images/img/6.png';

export default {
  data () {
    return {
      imgs: [
        img0,
        img1,
        img2,
        img3,
        img4,
        img5,
      ],
      isChecked: false,
      isChecked1: false,
      userForm:{
        username: '',
        password: ''
      },
      userRules:{
        username: [
          { required: true, type: "string", message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, type: "string", message: "请输入密码", trigger: "blur" }
        ],
      },
    }
  },
  methods:{
    login(name) {
      if (this.isChecked1){
        this.$refs[name].validate(valid => {
          if (valid) {
          }
        })
      }else{
        this.$Message.info('请点击完成验证')
      }
    },
    //成功操作
    onSuccess(data){
      this.isChecked1 = true
      setTimeout(()=>{
        this.isChecked = false
      },1000)
    },
    //失败操作
    onFail(){
      this.isChecked1 = false
    },
    //重载操作
    onRefresh(){
      this.isChecked1 = false
    }
  }
}
</script>
<style scoped lang='less'>
  .loginClass {
    width:500px;
    border:10px solid #ddd;
    height:400px;
    padding:80px 0px 40px;
    margin:auto
  }
  .loginBtn {
    width:90px;
    height:80px;
    line-height:80px;
    text-align:center;
    font-size:22px;
    margin:5px 0 0 10px;
  }
</style>