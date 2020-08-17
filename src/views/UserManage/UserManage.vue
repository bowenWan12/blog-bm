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
      <common-from inline :formLabel="formLabel" :form="serchFrom">
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
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别",
          width: "50px"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: "200px"
        },
        {
          prop: "addr",
          label: "地址",
          width: "300px"
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateFrom: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: ""
      },
      operateLabel: [
        {
          model: "name",
          label: "姓名"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "addr",
          label: "地址"
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        }
      ],
      serchFrom: {
        ketword: ""
      },
      formLabel: [
        {
          model: "ketword",
          label: "",
          options: []
        }
      ]
    };
  },
  methods: {
    getList(name = "") {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
            name
          }
        })
        .then(res => {
          console.log(res);
          this.tableData = res.list.map(item => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.count;
          this.config.loading = false;
        });
    },
    // changePage(val) {
    //   console.log(val)
    // }
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
        this.$http.post("/api/user/edit", this.operateFrom).then(res => {
          console.log(res.data);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/api/user/add", this.operateForm).then(res => {
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
