<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">小轩窗后台管理系统</div>
      <el-form
        :model="userForm"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="userForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="userForm.password"
            @keyup.enter.native="login()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="identifybox">
            <div @click="refreshCode">
              <common-identify :identifyCode="identifyCode"></common-identify>
            </div>
            <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
          </div>
        </el-form-item>
        <el-checkbox v-model="rememberMe">记住账号</el-checkbox>
        <div class="login-btn">
          <el-button type="primary" @click="login()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 请输入用户名和密码。</p>
      </el-form>
    </div>
  </div>
</template>
<script>
import CommonIdentify from "../../components/CommonIdentify";
import { refreshCode } from '@/api/login'
export default {
  components: {
    CommonIdentify,
  },
  created () {
    this.refreshCode();
  },
  data() {
    return {
      rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      userForm: {
        username: "",
        password: "",
        verifycode: ''
      },
      rememberMe: false,
      identifyCodes: '1234567890',
      identifyCode: ''
    };
  },
  methods: {
    // login() {
    //   this.$http
    //     .post("api/permission/getMenu", this.form)
    //     .then(res => {
    //       console.log(res);
    //       // res = res.data
    //       if (res.code === 20000) {
    //         console.log("succ");
    //         this.$store.commit("clearMenu");
    //         this.$store.commit("setMenu", res.data.menu);
    //         this.$store.commit("setToken", res.data.token);
    //         this.$store.commit("addMenu", this.$router);
    //         this.$router.push({ name: "home" });
    //       } else {
    //         console.log("fail");
    //         this.$message.warning(res.data.message);
    //       }
    //     })
    //     .catch(error => {
    //       console.log("error");
    //       if (error !== "error") {
    //         this.$message({ message: error, type: "error", showClose: true });
    //       }
    //     });
    // },
  
    // 切换验证码
    refreshCode() {
      let that = this
      refreshCode().then(res => {
        console.log("------------"+res)
        that.identifyCode = res.data
      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '验证码加载失败!', showClose: true})
        }
      })
    },
    login(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$store.dispatch('login', that.userForm).then(() => {
            this.$router.push({ name: "home" });
          }).catch((error) => {
            if (error !== 'error') {
              that.$message({message: error, type: 'error', showClose: true});
            }
          })
        } else {
          return false;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/image/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.identifybox{
  display: flex;
  justify-content: space-between;
  margin-top:7px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
