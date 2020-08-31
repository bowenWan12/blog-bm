<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-from :formLabel="operateLabel" :form="operateFrom"> </common-from>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-from inline :formLabel="formLabel" :form="searchFrom">
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-from>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonFrom from "../../components/CommonFrom";
import CommonTable from "../../components/CommonTable";
import { getUserList,createUser } from "@/api/user";
export default {
  components: {
    CommonFrom,
    CommonTable
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      tableData: [],
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
          prop: "locked",
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
      operateFrom: {
        loginName: "",
        nickName: "",
        role: "",
        email: "",
        phone: "",
        delFlag:""
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
          opts: [
            {
              label: "老司机",
              value: "test"
            },
            {
              label: "系统管理员",
              value: "admin"
            }
          ]
        },
        {
          model: "email",
          label: "邮箱"
        },
        {
          model: "phone",
          label: "手机"
        },
        {
          model: "delFlag",
          label: "是否启用",
          type: "switch"

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
    getList(name = '') {
      this.config.loading = true;
      let that = this;
      let pageParam = this.config;
      
      getUserList(pageParam, name).then(res =>{
        console.log(res.data.records)
        that.tableData = res.data.records.map(item => {
          item.locked = item.locked === false ? "正常" : "停用";
          return item;
        });
        this.config.total = res.data.total;
        this.config.loading = false;
      }).catch(err => {
          if (err !== 'err') {
            that.$message({type: 'error', message: '用户列表加载失败!', showClose: true})
          }
        }).finally(() => {
          this.config.loading = false
        })
    },


    addUser() {
      this.operateForm = {};
      this.operateType = "add";
      this.isShow = true;
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateFrom = row;
      console.log(row);
    },
    confirm() {
      if (this.operateType === "edit") {
        console.log("edit----")
        this.$http.post("/api/user/edit", this.operateFrom).then(res => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      } else {
        console.log("add----")
        createUser(this.operateFrom).then(res => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      }
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id
              }
            })
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
