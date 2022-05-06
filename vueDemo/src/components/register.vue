<template>
<div>
  <div id="register" class="box" >
    <h3>注册页面</h3>
    <el-form ref="registerForm" :rules="rules" :model="loginForm" label-width="20%">
    <el-form-item label="用户名:" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密  码:">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="password2" label="确认密码:">
            <el-input v-model="loginForm.password2" type="password" placeholder="请再次输入密码"></el-input>
    </el-form-item>
    </el-form>
    <el-button type="primary" round @click="submitForm('registerForm')" class="btn">注册</el-button>
    <router-link to="/">返回登录</router-link>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名长度需在3-10', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '密码长度需在3-10', trigger: 'blur'}
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '密码长度需在3-10', trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('http://127.0.0.1/register', {
              name: this.loginForm.username,
              password: this.loginForm.password
            })
            .then(res => {
              if (res.data == 2) {
                console.log(res.data)
                this.$alert('注册成功')
              } else {
                console.log(res.data)
                this.$alert('用户名重复', '注册失败', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.loginForm.username = '',
                    this.loginForm.password = '',
                    this.loginForm.password2 = ''
                  }
                })
              }
            })
        }
      })
    }
  }
}
</script>

<style>
.box{
    width:500px;
    height:400px;
    margin:100px auto;
    padding:20px;
    border:1px solid;
    border-radius:8px;
    box-shadow:0 0 5px;
}
h3{
  text-align: center;
}
.el-input{
  width:92%;
}
.btn{
  text-align: center;
}
</style>
