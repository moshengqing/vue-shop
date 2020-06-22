<template lang="">
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
      
    <el-card class="box-card">
       <div >
           <!-- 搜索添加区域 -->
           <el-row :gutter="20">
             <el-col :span="8">
                 <el-input clearable @clear="clear" placeholder="请输入内容" v-model="queryInfo.query"  class="input-with-select"> 
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>
                 <el-col :span="4">
                <el-button @click="dialogVisible=true" type="primary">添加用户</el-button>
               </el-col>
           </el-row>
<!-- 添加用户对话框 -->
<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">

    <el-form :model="addForm" :rules="addRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
       <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
       </el-form-item>
       <el-form-item label="邮件" prop="email">
          <el-input v-model="addForm.email"></el-input>
       </el-form-item>
       <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
       </el-form-item>
    </el-form>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

           <!-- 用户列表区域 -->
            <el-table :data="UsersList" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="180"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role_name"
        width="180"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        width="180"
        label="状态">
          <template slot-scope='scope'>
                <!-- {{scope.row}} 具名插槽 -->
            <el-switch @change="change(scope.row)" v-model="scope.row.mg_state"  ></el-switch>
          </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope='scope'>
             <div>
                 <el-tooltip :enterable="false"  class="item" effect="dark" content="编辑" placement="top">
                     <el-button type="primary" @click="editShow(scope.row.id)" icon="el-icon-edit" size='mini' circle></el-button>
                 </el-tooltip>
                 
                 <el-tooltip :enterable="false" class="item" effect="dark" content="删除" placement="top">
                     <el-button @click="deleteUser(scope.row.id)" type="danger" icon="el-icon-delete" size='mini' circle></el-button>
                 </el-tooltip>
                 <el-tooltip :enterable="false" class="item" effect="dark" content="分配权限" placement="top">
                     <el-button type="primary" icon="el-icon-setting" size='mini' circle></el-button>
                 </el-tooltip>
                 
             </div>
        </template>
      </el-table-column>
    </el-table>
   <!-- 编辑区域 -->
  <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  
  <el-form :model="editForm" :rules="editRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
       <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="editForm.username"></el-input>
       </el-form-item>
       <el-form-item label="邮件" prop="email">
          <el-input v-model="editForm.email"></el-input>
       </el-form-item>
       <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
       </el-form-item>
    </el-form>


    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
  <!-- 分页功能 -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[1, 2, 3, 4,5,6]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>



       </div>
    </el-card>
    </div>
</template>

<script>
export default {
  data() {
    //验证手机号  自定义规则
    const check = (rule,value,callback)=>{
        let regM = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if(regM.test(value)){
            return callback();
        }
        callback(new Error("请输入合法手机号"))
    }
    
    return {
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        // 每页显示的条目数
        pagesize: 4 
      },
      UsersList: [],
      total: 0,
      dialogVisible:false,
      addForm:{
          username:'',
          password:'',
          email:'',
          mobile:''
      },
      addRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 9, message: '长度在 4 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮件', trigger: 'blur' },
            
          ],
           mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator:check,trigger:'blur'}
          ],
      },
      centerDialogVisible:false,
      editForm:{},
      editRules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 9, message: '长度在 4 到 9 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮件', trigger: 'blur' },
            
          ],
           mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator:check,trigger:'blur'}
          ],
      },
    };
  },
  methods: {
    async getUsersList() {
      let { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if (res.meta.status != 200)
        return this.$message({ type: "error", message: "获取数据失败" });
      this.UsersList = res.data.users;
    //   console.log(this.UsersList);
      this.total = res.data.total;
    //   console.log(res);
    },
    handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize;
        this.getUsersList();
        
    },
    // 监听页码值
    handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage;
        this.getUsersList();
    },
    // 监听状态改变
    async change(userInfo){
       let {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
       if(res.meta.status !=200) {
           userInfo.mg_state = !userInfo.mg_state;
           return this.$message({ type: "error", message: "状态更新失败" });
       }
       else{
           return this.$message({ type: "succuse", message: "状态更新成功" });
       }
       
       console.log(res);
    },
    // 搜索
    search(){
        this.getUsersList();
    },
    clear(){
        this.getUsersList();
    },
    handleClose(){

    },
    //添加用户
    addUser(){
        this.$refs.ruleForm.validate(async valid=>{
            if(!valid) return;
            //预验证通过

            console.log(this.addForm)
            const {data:res} = await this.$http.post('users',this.addForm);
            console.log(res);
            if(res.meta.status === !201) return this.$message({ type: "error", message: res.meta.msg });
            this.$message({ type: "succuse", message: res.meta.msg });
            this.dialogVisible = false;
            this.addForm = {}
            this.getUsersList();
            
        })
    },
    //显示修改区域
    async editShow(id){
      this.centerDialogVisible= true
      let {data:res} = await this.$http.get(`users/${id}`);
      console.log(res)
      if(res.meta.status !==200) return this.$message({ type: "error", message: "获取数据失败" });
      this.editForm = res.data;
    },
    //编辑用户
    editUser(){
      this.$refs.ruleForm.validate(async valid=>{
        if(!valid) return;
        const {data:res} = await this.$http.put(`users/${this.editForm.id}`,{
        email:this.editForm.email,
        mobile:this.editForm.mobile
        })
        if(res.meta.status !==200){
          return this.$message({ type: "error", message: "更新失败" });
        }
        this.$message({ type: "succese", message: "更新成功" });
        this.centerDialogVisible = false;

        this.getUsersList();
      })
    },
    //删除用户
    async deleteUser(id){
       const result= await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);
        console.log(result)
        if(result ==='cancel'){
          return this.$message({ type: "succese", message: "取消删除" });
        }
        else if(result ==='confirm'){
          // 发送删除请求
           const {data:res}  = await this.$http.delete(`users/${id}`);
           console.log(res)
           if(res.meta.status !==200){
               return this.$message({ type: "error", message: "删除失败" });
            }
          this.$message({ type: "succese", message: "删除成功" });
          this.queryInfo.pagenum = 1 ;
          this.getUsersList();    
          
           
        }

      } 
  },
  created() {
    this.getUsersList();
  }
};
</script>

<style lang="" scoped>
.el-breadcrumb {
  margin-bottom: 16px;
  font-size: 14px;
}
.el-card {
}
.el-table{
    margin-top: 10px;
    text-align: center;
}
.el-pagination{
    margin-top: 10px;
}
</style>