<template>
    <el-container class="publishArticlecontainer">
        <el-header>
            <div>
                <img src="../assets/logo.png" style="width:60px;height:60px;" alt="">
                <span>标题</span>
            </div>
            <div>
                <el-button type="primary" plain @click="publish">提交</el-button>
                <el-button type="info" @click="logout">返回</el-button>
            </div>
        </el-header>
        <el-container>
            <el-main>
                <el-button icon="el-icon-camera-solid" style="width:100%;height:200px;margin:0;padding:0;">
                    添加图片（下个版本）
                </el-button>
                <el-input placeholder="请输入标题" v-model="titletext"></el-input>
                <div >
                    文本工具（下个版本）
                </div>
                <el-input placeholder="请输入正文" type="textarea" v-model="textarea" autosize></el-input>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            titletext:'',
            textarea:''
        }
    },

    methods:{
        logout(){
                this.$router.push('/home')
        },

        publish()
        {
            this.$message.success("发布成功");
            this.$router.push('/home')
        }
    }

}
</script>

<style lang="less" scoped>
.publishArticlecontainer{
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
background-color: #D3DCE6;
color: #333;
text-align: center;
line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    padding-left:20%;
    padding-right:20%;
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