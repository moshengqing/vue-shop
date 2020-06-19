<template>
    <div class="login_box">
         <div class="login_form">
             <div class="logo">
                 <img src="../assets/logo.png" alt="">
             </div>
             <form action=""  class="form" :model="loginForm">
                 <input type="text" v-model.trim="loginForm.username" placeholder="用户名">
                 <input type="password" v-model.trim="loginForm.password" placeholder="密码">
                 <input @click="login" class="btn" type="button" value="登 录">
             </form>
         </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
           loginForm:{
               username:'admin',
               password:'123456'
           } 
        }
    },
    methods: {
        async login(){
            // console.log(this.loginForm)
            if(this.loginForm.username !='' || this.loginForm.password !=''){
                const {data:res,config:config} =  await this.$http.post('login',this.loginForm)
                console.log(res)
                if(res.meta.status ==200){
                  this.$message({type:'success',message:'登录成功'});
                  //保存token值，用户验证
                  window.sessionStorage.setItem('token',res.data.token);
                  //跳转至
                  console.log(this.$router);
                  this.$router.push('/home')
                  
                }else{
                    this.$message({
                      type:'error',
                      message:'登录失败'
                  })
                    
                }
            } else{
                 this.$message({
                      type:'error',
                      message:'用户名密码不能为空'
                  })
            }
        }
    },
}
</script>

<style  scoped>
    .login_box{ 
        height: 100%;
        background-color:#498795;
        
    }
    .login_form{
        position: fixed;
        top:50%;
        left: 50%;
        max-width: 500px;
        min-width: 320px;
        height: 300px;
        transform: translate(-50%,-50%);
        background-color:#fff;
        position: relative;
        border-radius: 10px;
    }
    .login_form .logo{
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: cadetblue;
        border-radius: 50%;
        top:-20%;
        left: 50%;
        transform: translate(-50%);
        box-shadow: 0 0 8px #ccc;
    }
    .login_form  img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        position: absolute;
        top:20%;
        left: 50%;
        transform: translate(-50%);
        
    }
    .form{
        width: 90%;
        padding-top: 40px;
        margin: 0 auto;
        
    }
    input{
       
        display: block;
        height: 40px;
        width: 100%;
        border: 1px solid #ccc;
        margin-top: 20px;
        padding-left: 10px;
        font-size: 16px;
        border-radius: 10px;
        cursor: pointer;
       
    }
    .btn{
        font-weight: 700;
        background-color: cadetblue;
        color: #fff;
        
    }
</style>