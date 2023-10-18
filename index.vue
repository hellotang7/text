<template>

  <div class="main-container">
      <div class="wrapper">
    <div class="login-box">


        <div class="box-left"></div>

        <div class="box-right">
            <div class="welcome zh">管理员登录</div>
            <div class="welcome">Welcome</div>

            <Form ref="form" :model="formCustom"  :rules="ruleInline"  >

                <FormItem  prop="username">
                    <Input type="text" v-model="formCustom.username" placeholder="Username">
                        <template #prepend>
                            <Icon type="ios-person-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>

                <FormItem prop="password">
                    <Input type="password" v-model="formCustom.password" placeholder="Password">
                        <template #prepend>
                            <Icon type="ios-lock-outline"></Icon>
                        </template>
                    </Input>
                </FormItem>


                <FormItem >
                    <Button long type="primary" @click="login">登录</Button>
                </FormItem>
            </Form>
        </div>

    </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {authStore} from '@/stores/authStore';
import {getCurrentInstance, ref} from 'vue';
import {Message} from 'view-ui-plus';
import request from '@/api/request';
import {loginUserByUsernameAndPassword} from '@/api/auth';
const router = useRouter();
const { appContext : { config: { globalProperties } } } = getCurrentInstance();


const formCustom = ref({
    username: 'test',
    password: 'test'
    })

const  ruleInline = {
    username: [
        { required: true, message: '请填写用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请填写密码', trigger: 'blur' },
        // { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ]
}

// const autoLogin = ref(false)



const form = ref()
const login = async () => {
    //校验
   await form.value.validate()

    await loginUserByUsernameAndPassword({
        username:formCustom.value.username,
        password:formCustom.value.password
    }).then((res)=>{

             if(res.data.code === 200){
                 authStore().token = res.data.data.token
                 localStorage.setItem('token',res.data.data.token)




                 Message.success(res.data.msg)
                 router.push({ name: "desktop" });
                 console.log(res.data);
             }else {
                 Message.error(res.data.msg)
             }
         }).catch((err)=>{
            Message.error(err.msg);
         })

}

</script>

<style scoped lang="scss">
  .wrapper{
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity 0.3s ease;

    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
.main-container {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/img/bmg.jpg");
  background-size: cover;
  background-repeat: no-repeat;


  .login-box{
    padding: 40px;
    display: flex;
    width: 800px;
    height: 460px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);

    .box-left{
      background-image: url("@/assets/img/login.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;

      width: 50%;
      height: 100%;
      color: #F5F5F5;

    }
    .box-right{
      padding: 40px;
      width: 50%;
      height: 100%;
      color: #F5F5F5;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;

      .welcome{
        text-align: center;
        color: black;
      }
      .zh{
        font-size: 30px;
        font-weight: 400;
      }

      .ivu-form{
        padding-top: 30px;
        width: 340px;
        .ivu-form-item{
          &:nth-child(4){
          margin-top: 40px;
          }
        }
      }

    }

  }
}
</style>
