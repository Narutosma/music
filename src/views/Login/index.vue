<!-- 登陆页面 -->
<template>
  <div class="login-container">
      <div class="login-wrapper">
          <h1>登陆</h1>
          <div class="login-item">
              <input v-model="account" @input="account = account.replace(/[^\d]/g,'')" type="text" placeholder="手机号">
          </div>
          <div class="login-item">
              <input v-model="password" type="password" placeholder="密码">
          </div>
          <div class="login-btn btn" @click="loginBtn">
              登陆
          </div>
      </div>
  </div>
</template>

<script>
// import { loginAccount } from '@/axios/api'
// import md5 from 'md5'
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  mounted () {
    // 自动填充账号密码
    if (localStorage.getItem('account')) {
      this.account = localStorage.getItem('account')
    }

    if (localStorage.getItem('password')) {
      this.password = localStorage.getItem('password')
    }
  },
  methods: {
    // 登陆按钮
    loginBtn () {
      // 必须满足11位
      if (!this.account || this.account.length !== 11) {
        alert('请输入正确的账号格式!')
        return
      }
      // 密码不能为空
      if (!this.password) {
        alert('密码不能为空!')
        return
      }
      // 登陆
      this.$store.dispatch({ type: 'login/loging', value: { account: this.account, password: this.password } })
      // 登陆成功后跳转到上一页
      this.$router.push('/')
    }
  }

}
</script>

<style lang="scss">
@import "@/common.scss";
.login-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: $white;
    z-index: 99999;

    .login-wrapper{
        width: 500px;
        height: 300px;
        border: 1px solid $gray;
        border-radius: 8px;
        position: absolute;
        left: calc(50% - 250px);
        top: calc(50% - 150px);
        padding: 25px 20px;
        box-sizing: border-box;

        .login-item{
            margin-top: 10px;
            margin-bottom: 20px;
            input{
                box-sizing: border-box;
                font-size: 14px;
                padding: 10px;
                height: 40px;
                vertical-align: middle;
                border-radius: 4px;
                outline: none;
                width: 100%;
                border: 1px solid #ddd;
            }
        }
        .login-btn{
            width: 100%;
            height: 40px;
            border-radius: 4px;
            background: $red;
            color: $white;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
        }
    }
}

</style>
