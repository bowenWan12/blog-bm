<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        type="primary"
        icon="el-icon-menu"
        size="mini"
        @click="collapseMenu"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImage" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImage: require("../assets/image/user.png")
    };
  },
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut() {


      
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$store.commit("clearUserRole");

      // let that = this
      // this.$store.dispatch('logout').then(() => {
      //   this.$router.push({path: '/login/login'})
      // }).catch((error) => {
      //   if (error !== 'error') {
      //     that.$message({message: error, type: 'error', showClose: true});
      //   }
      // })

      location.reload();
    }
  }
  
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }
}
</style>
<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #666;
}

.el-breadcrumb__item {
  &:last-child {
    .el-breadcrumb__inner {
      color: #fff;
    }
  }
}
</style>
