<!-- 
<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
-->

<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="form.password"
            @keyup.enter.native="login()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 请输入用户名和密码。</p>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$http
        .post("api/permission/getMenu", this.form)
        .then(res => {
          console.log(res);
          // res = res.data
          if (res.code === 20000) {
            console.log("succ");
            this.$store.commit("clearMenu");
            this.$store.commit("setMenu", res.data.menu);
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("addMenu", this.$router);
            this.$router.push({ name: "home" });
          } else {
            console.log("fail");
            this.$message.warning(res.data.message);
          }
        })
        .catch(error => {
          console.log("error");
          if (error !== "error") {
            this.$message({ message: error, type: "error", showClose: true });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// .el-form {
//   width: 50%;
//   margin: auto;
//   padding: 45px;
//   height: 450px;
//   background-color: #fff;
// }
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
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
