<template>
  <div class="login-container">
    <!-- 背景图 -->
    <img class="bgone" src="~assets/img/login/1.jpg" />
    <img class="pic" src="~assets/img/login/a.png" />

    <div class="table">
      <div class="wel">电商系统后台登录</div>
      <div class="wel1">DIAN SHANG XI TONG HOU TAI DENG LU</div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        :rules="loginFormRules"
        :model="loginForm"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item class="user" prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="password" prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postLogin } from "network/login.js";

export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置按钮事件
    resetLoginForm() {
      // 重置表单
      this.$refs.loginFormRef.resetFields();
    },
    // 登录按钮校验事件
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // 登录信息校验成功，发送请求
        const { data } = await postLogin(this.loginForm);
        // 判断响应体的状态码
        if (data.meta.status !== 200) {
          return this.$message.error("登录失败")
        }
        this.$message.success("登录成功")
        // 登录成功后保存token到客户端
        window.sessionStorage.setItem('token', data.data.token)
        // 跳转页面
        this.$router.push('/home')
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pic {
  width: 492px;
  height: auto;
  position: absolute;
  top: 173px;
  right: 453px;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 99999;
}
.bgone {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
.table {
  background-color: #ffffff;
  width: 960px;
  height: 465px;
  position: absolute;
  top: 20%;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
.wel {
  width: 960px;
  height: 35px;
  color: #fff;
  font-size: 30px;
  position: absolute;
  top: -7rem;
  text-align: center;
}
.wel1 {
  width: 960px;
  height: 35px;
  color: #fff;
  font-size: 12.38px;
  position: absolute;
  top: -4rem;
  text-align: center;
}
.login-form {
  position: absolute;
  top: 7.8rem;
  right: 4rem;
  padding: 0 40px;
  box-sizing: border-box;
  .user,
  .password {
    height: 55px;
    width: 373px;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>