<template>
    <div class="login_container">
        <div class="login_box">
          <!--头像-->
          <div class="icon_box">
            <img src="../assets/logo.png" alt="">
          </div>
          <!--表单-->
          <el-form ref="loginref" :model="loginform" :rules="loginformRules" laubel-width="80px" class="form_box">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginform.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="loginform.password" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>

            <el-form-item class="loginbtn_box">
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>

          </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
      return {
        loginform:{
          username:'',
          password:''
        },
        loginformRules:{
          //验证合规
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      login(){
        this.$refs.loginref.validate(async valid =>{
          if(!valid) return;
          const {data:res} = await this.$http.get('GetTeacherCourseALL');
          console.log(res);
        })
      }
    }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .icon_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.form_box{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.loginbtn_box{
  display: flex;
  justify-content: flex-end;
}
</style>