<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-from :formLabel="operateLabel" :form="operateForm"></common-from>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-from inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
      </common-from>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUserRow"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CommonFrom from "../../components/CommonFrom";
import CommonTable from "../../components/CommonTable";
import { getUserList, createUser, editUser, deleteUser } from "@/api/user";
export default {
  components: {
    CommonFrom,
    CommonTable
  },
  computed: {
    ...mapState({
      currentRole: state => state.tab.role
    })
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      tableData: [],
      roles: [],
      editParam: {},
      tableLabel: [
        {
          prop: "loginName",
          label: "用户名"
        },
        {
          prop: "nickName",
          label: "昵称"
        },
        {
          prop: "email",
          label: "邮箱"
        },
        {
          prop: "tel",
          label: "联系方式"
        },
        {
          prop: "delFlag",
          label: "状态"
        },
        {
          prop: "createDate",
          label: "创建时间",
          width: "200px"
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        loginName: "",
        nickName: "",
        roles: [],
        email: "",
        tel: "",
        delFlag: false
      },
      operateLabel: [
        {
          model: "loginName",
          label: "登录名"
        },
        {
          model: "nickName",
          label: "昵称"
        },
        {
          model: "roles",
          type: "checkbox",
          label: "角色",
          opts: [
            {
              label: "老司机",
              value: "1"
            },
            {
              label: "系统管理员",
              value: "2"
            }
          ]
        },
        {
          model: "email",
          label: "邮箱"
        },
        {
          model: "tel",
          label: "手机"
        },
        {
          model: "delFlag",
          label: "是否启用",
          type: "switch",
          activeValue: "停用",
          inactiveValue: "正常"
        }
      ],
      searchFrom: {
        keyword: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          options: []
        }
      ]
    };
  },
  methods: {
    getList(name = "") {
      this.config.loading = true;
      let that = this;
      let pageParam = this.config;

      getUserList(pageParam, name)
        .then(res => {
          that.tableData = res.data.records.map(item => {
            item.delFlag = item.delFlag === false ? "正常" : "停用";
            return item;
          });
          that.config.total = res.data.total;
          that.config.loading = false;
        })
        .catch(err => {
          if (err !== "err") {
            that.$message({
              type: "error",
              message: "用户列表加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          that.config.loading = false;
        });
    },

    addUser() {
      this.operateForm = {
        loginName: "",
        nickName: "",
        roles: [],
        email: "",
        tel: "",
        delFlag: false
      };
      this.operateType = "add";
      this.isShow = true;
    },
    editUserRow(row) {
      // console.log(JSON.stringify(row));
      let rowStr = JSON.stringify(row)
      let jsonRow = JSON.parse(rowStr)
      // this.operateForm = row;
      this.operateForm = {
        loginName: "",
        nickName: "",
        roles: [],
        email: "",
        tel: "",
        delFlag: false
      };

      Object.keys(this.operateForm).forEach(key => { 
        this.operateForm[key] = jsonRow[key];
      });

      this.operateForm.roles=[];
      this.operateType = "edit";

      this.editParam.id=jsonRow.id;
      

      // console.log("=======================================");
      // console.log(this.operateForm);
      this.isShow = true;
    },
    confirm() {
      this.operateForm.delFlag = this.operateForm.delFlag === "正常" ? false : true;
      let newForm = {};
      let selectRole = [];
      this.operateForm.roles.forEach(element => {
        selectRole.push({ id: element });
      });
      newForm = { roleLists: selectRole };
      Object.assign(this.operateForm, newForm);

      if (this.operateType === "edit") {
        console.log("edit----");

        //
        Object.assign(this.operateForm, this.editParam);

        editUser(this.operateForm).then(res => {
          this.isShow = false;
          this.getList();
          // this.$store.commit("setUserRole", res.data.userRole);
        });
      } else {
        console.log("add----");
        createUser(this.operateForm).then(res => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      }
    },
    cancle() {
      this.isShow = false;
      this.operateForm = {
        loginName: "",
        nickName: "",
        roles: [],
        email: "",
        tel: "",
        delFlag: false
      };
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
         deleteUser({
                id
              }
            )
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getList();
    this.roles = this.currentRole;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
