<template>
  <Card class="login-card" style="width: 630px; height: 380px">
    <div class="center">
      <img src="./logo-ys.png" alt="" />
    </div>
    <Row>
      <Col span="18">
        <Form
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          hide-required-mark
          :label-width="100"
        >
          <FormItem prop="username" label="用户名" class="mt6">
            <Input type="text" v-model="formInline.username" />
          </FormItem>
          <FormItem prop="password" label="密码" class="mt22">
            <Input type="password" v-model="formInline.password" />
          </FormItem>
        </Form>
      </Col>
      <Col span="6">
        <div
          class="ivu-input loginBtn pointer"
          @click="handleSubmit('formInline')"
        >
          登录
        </div>
      </Col>
    </Row>
    <div class="center">
      <ConfigMenu class="config-menu"></ConfigMenu>
    </div>
  </Card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      formInline: {
        username: "admin",
        password: "password",
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            type: "string",
            min: 8,
            message: "密码长度最低不能少于8位",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    ...mapActions("user", ["handleLogin"]),

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 重置路由
          window.sessionStorage.setItem("routers", null);
          let username = this.formInline.username;
          let password = this.formInline.password;
          this.handleLogin({ username, password }).then((res) => {
            if (res) {
              this.$router
                .replace({ name: cfg.HomePage["demo"] })
                .catch(() => {});
            }
          });
        } else {
          this.$Message.error("请输入登录信息!");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
// /deep/.ivu-btn-default {
//   color: white;
// }
// /deep/.ivu-form-item-label {
//   color: white;
// }
/deep/.ivu-input {
  border: 1px solid #106fa6;
  // background-color:rgba(0,0,0,0.2);
  border-radius: 5px;
  box-shadow: rgba(43, 63, 241, 0.4) 0px 0px 10px inset;
  color: #d4d4d4;
}
.loginBtn {
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 22px;
  color: #d4d4d4;
  margin: 5px 0 0 30px;
  box-shadow: rgba(43, 63, 241, 0.4) 0px 0px 20px inset;
}
</style>