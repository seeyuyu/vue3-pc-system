<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
      <div class="admin-logo">
        监控系统登录
      </div>
      <el-form-item prop="username">
        <span>用户名</span>
        <el-input tabindex="1" v-model="loginForm.username" ref="usernameRef"
        placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span>密码 </span>
        <el-input tabindex="2" v-model="loginForm.password" ref="passwordRef" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button :loading="loading" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, getCurrentInstance } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import uesRouteQuery from './hooks/useRouteQuery'
type IElFormInstance = InstanceType<typeof ElForm>
export default defineComponent({
  name: 'Login',
  setup () {
    // const { proxy } = getCurrentInstance()!
    const proxy = getCurrentInstance()?.proxy
    const store = useStore()
    const router = useRouter()
    const loginFormRef = ref<IElFormInstance | null>(null)
    const usernameRef = ref<IElFormInstance | null>(null)
    const passwordRef = ref<IElFormInstance | null>(null)

    const loginState = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名！'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码！'
          }
        ]
      },
      passwordType: 'password'

    })

    const loading = ref(false)
    const { redirect, otherQuery } = uesRouteQuery()

    const handleLogin = () => {
      console.log('login');
      (loginFormRef.value as IElFormInstance).validate(valid => {
        if (valid) {
          console.log(loginState.loginForm)
          loading.value = true
          store.dispatch('user/login', loginState.loginForm).then(() => {
            proxy?.$message.success('登录成功')
            router.push({
              path: redirect.value || '/',
              query: otherQuery.value
            })
          }).finally(() => {
            loading.value = false
          })
        } else {
          console.log('error submit!!')
        }
      })
    }
    return {
      loading,
      loginFormRef,
      usernameRef,
      passwordRef,
      handleLogin,
      ...toRefs(loginState)
    }
  }
})
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
.login-container {
  .el-form-item {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    padding-left: 10px;
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 40px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  // background-image: url('../../assets/logo.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    padding: 140px 35px 0;
    overflow: hidden;
    box-sizing: border-box;
    .admin-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .logo {
        width: 60px;
        height: 60px;
      }
      .name {
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
}
</style>
