<template>
    <el-container class="homecontainer">
        <el-header>
            <div>
                <img src="../assets/logo.png" style="width:60px;height:60px;" alt="">
                <span>标题</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-main>Main</el-main>
            <el-aside width="200px">
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>导航</span>
                    </template>
                    <el-menu-item index="1-1" @click="pamethod">
                        <i class="el-icon-document"></i>
                        发布文章
                    </el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            menulist:[]
        }
    },

    created(){
        this.getMenuList()
    },

    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        },

        getMenuList(){
            //网络获取菜单
        },

        pamethod(){
            this.$router.push('/publisharticle')
        }
    }
}
</script>

<style lang="less" scoped>
.homecontainer{
    height: 100%;
}

.el-header{
    background-color: #B3C0D1;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-menu{
        border-right: none;
    }
}

.el-main {
background-color: #E9EEF3;
color: #333;
text-align: center;
line-height: 160px;
}

body > .el-container {
margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}
</style>