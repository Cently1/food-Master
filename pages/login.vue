<template>
  <div class="page-login">
    <div class="header1">
      <div class="login-header">
        <a href="/" class="logo" />
      </div>
    </div>
    <div class="login-panel">
      <div class="banner">
        <a href="/" class="logo" />
        <img
          src="https://halen-blog-1252760404.cos.ap-chengdu.myqcloud.com/img/20200326225744.png"
          width="500"
          height="370"
          alt="食达人"
          class="img-logo"
        />
      </div>
      <!-- 登录 -->
      <!-- 登录为1，忘记密码为2 -->
      <div class="form" v-if="type == 1">
        <h4 v-if="error" class="tips"><i />{{ error }}</h4>
        <p>
          <span
            >账号登录<span class="sep-line">|</span
            ><span class="scan">扫码登录</span></span
          >
        </p>
        <el-input
          v-model="username"
          prefix-icon="profile"
          placeholder="请输入用户名"
        />
        <el-input
          v-model="password"
          type="password"
          prefix-icon="profile"
          placeholder="请输入密码"
        />
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b @click="type = 2" class="forget">忘记密码？</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login"
          >登录</el-button
        >
        <a href="/register" class="account">还没有账号?去注册</a>
      </div>

      <!--忘记密码-->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-if="type == 2"
      >
        <span class="userRegister">忘记密码</span>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" class="el-input1"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" class="el-input1" />
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword">修改密码</el-button>
          <div class="error">{{ error }}</div>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/4"
            target="_blank"
            ><input
              type="checkbox"
              checked="checked"
            />《食达人点评用户服务协议》</a
          >
          <a href="/login" class="account1">去登录</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { Message, Pagination } from "element-ui";
export default {
  data(){
    return {
      type: "1", //登录1 忘记密码2
      username: "",
      password: "",
      checked: "",
      error: "",
      status: true,
      statusMsg: "",
      ruleForm: {
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        email: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "再次确认新密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  layout: "blank",
  methods: {
    //登录
    login: function() {
      let self = this;
      self.$axios
        .post("/users/signin", {
          //encodeURIComponent避免传到服务端的时候出现乱码的情况(中文在服务端是乱码的)
          username: window.encodeURIComponent(self.username),
          password: CryptoJS.MD5(self.password).toString()
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = "/";
            } else {
              self.error = data.msg;
            }
          } else {
            self.error = `服务器出错，错误码:${status}`;
          }
          //定时清空错误的信息
          setInterval(() => {
            self.error = "";
          }, 1500);
        });
    },
    //发送验证码
    sendMsg: function() {
      const self = this;
      let namePass;
      let emailPass;
      if (self.timerid) {
        return false;
      }
      this.$refs["ruleForm"].validateField("name", valid => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["ruleForm"].validateField("email", valid => {
        emailPass = valid;
      });
      //只有验证才通过，这里的API是反着的
      if (!namePass && !emailPass) {
        self.$axios
          .post("/users/verify", {
            username: encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              self.statusMsg = `验证码已发送，剩余${--count}秒`;
              self.timerid = setInterval(function() {
                self.statusMsg = `验证码已发送,剩余${--count}秒`;
                if (count === 0) {
                  clearInterval(self.timerid);
                  self.statusMsg = "";
                }
              }, 1000);
            } else {
              self.statusMsg = data.msg;
            }
          });
      }
    },
    //更新密码(只需要更新用户表里面的数据)
    updatePassword: function() {
      let self = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.$axios
            .post("/users/updatePwd", {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  Message.success("密码修改成功", {
                    customClass: "message-logout"
                  });
                  location.href = "/login";
                } else {
                  self.error = data.msg;
                }
              } else {
                self.error = `服务器出错，错误码:${status}`;
              }
              //定时清空错误的信息
              setInterval(() => {
                self.error = "";
              }, 1500);
            });
        }
      });
    },

  }
};
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss";
</style>
