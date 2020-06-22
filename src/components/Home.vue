<template>
  <div>
    <el-container class="home_box">
      <el-header>
        电商后台管理系统
        <el-button @click="loginOut" plain>退出系统</el-button>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :router="true"
              :unique-opened="true"
            >
            <!-- 一级菜单循环 -->
              <el-submenu  :index="item.id+''" v-for="item in menuList" :key="item.id">
                <template slot="title">
                  <i :class="iconObj[item.id]"></i>
                  <span>{{item.authName}}</span>
                </template>
                 <!--二级菜单循环 -->
                <el-menu-item  :index="subItem.path+''" v-for="subItem in item.children" :key="subItem.id">{{subItem.authName}}</el-menu-item>
              </el-submenu>
             
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        //侧边栏菜单
        menuList:[],
        // 图标对象
        iconObj:{
            125:'el-icon-s-custom',
            103:'el-icon-unlock',
            101:'el-icon-goods',
            102:'el-icon-s-management',
            145:'el-icon-setting'
        }
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
       let {data:res} = await this.$http.get('menus');
    //    console.log(res.data)
       if(res.meta.status !=200) return this.$message({type:'error',message:'获取数据失败'});; 
       this.menuList = res.data;
    //    console.log(res.data)
      
       
    }
  },
  created() {
      this.getMenuList();
  },
};
</script>

<style lang="" scoped>
.el-header {
  height: 60px;
  background-color: rgb(84, 92, 100);
  color: #fff;
  /* text-align: center; */
  line-height: 60px;
  position: relative;
  font-size: 20px;
  font-weight: 700;
}
.el-button {
  position: absolute;
  right: 30px;
  top: 10px;
}
.el-aside {
  background-color: rgb(84, 92, 100);
  min-height: 600px;
  height: 100%;
}
.home_box {
  height: 100%;
}
</style>