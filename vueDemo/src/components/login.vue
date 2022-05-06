
<template>
    <div id="login" class="box">
      <h3>登录页面</h3>
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="20%">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密  码:">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="submitForm('loginForm')" class="btn">登录</el-button>
      <router-link to="/register">用户注册</router-link>
    </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "用户名长度需在3-10", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "密码长度需在3-10", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .get("http://127.0.0.1/login", {
              params: {
                // 传递参数
                name: this.loginForm.username,
                password: this.loginForm.password,
              },
            })
            .then((res) => {
              if (res.data.length) {
                console.log(res.data);
                this.$alert("登录成功"); // 获取返回数组长度，判断数据库中是否有对应用户名和密码，用于判断是否登录成功
                this.$router.push({                                      
                  path: "/home"          // 登录成功，路由跳转至/home页面（提前写好home页面），并携带用户名
                });
              } else {
                this.$alert("用户名或密码错误", "登录失败", {
                  // 登录失败，出现提示框，并清空输入框
                  confirmButtonText: "确定",
                  callback: (action) => {
                    (this.loginForm.username = ""),
                      (this.loginForm.password = "");
                  },
                });
              }
            })
            .catch((error) => {
              console.log("登录失败" + err);
            });
        }
      });
    },
  },
};
</script>
<style>
.box {
  width: 500px;
  height: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid;
  border-radius: 8px;
  box-shadow: 0 0 5px;
}
h3 {
  text-align: center;
}
.el-input {
  width: 92%;
}
.btn {
  text-align: center;
}
</style>
