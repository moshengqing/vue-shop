<template>
    <div>
        <h1>我是主页</h1>
         <el-button @click="loginOut" type="primary">注销</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        loginOut(){
            window.sessionStorage.clear();
           this.$router.push('/login')
        }
    },
}
</script>

<style lang="" scoped>
    
</style>