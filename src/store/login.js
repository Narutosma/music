import { loginAccount, getUserDetail } from '@/axios/user'
// import md5 from 'md5'
// 登陆模块仓库
export default {
  namespaced: 'login',
  state: {
    person: {},
    userId: -1
  },
  mutations: {
    // 设置个人信息
    setPerson (state, { value }) {
      state.person = value
    },
    setUserId (state, { value }) {
      state.userId = value
    }
  },
  actions: {
    loging (content, { value }) {
      try {
        // 账号登陆
        loginAccount(value.account, value.password).then(res => {
          if (res.code === 200) {
            // 获取用户详情信息
            getUserDetail(res.account.id).then(r => {
              content.commit({
                type: 'setPerson',
                value: {
                  ...r.profile,
                  level: r.level,
                  listenSongs: r.listenSongs
                }
              })
            })
            // 登陆之后得到用户id
            content.commit({
              type: 'setUserId',
              value: res.account.id
            })
            // 登陆之后将账号密码保存在本地好直接登陆
            localStorage.setItem('account', value.account)
            localStorage.setItem('password', value.password)
          } else {
            alert(res.msg)
            // 如果没登陆上去就删除掉存储在本地的账号密码
            localStorage.removeItem('account')
            localStorage.removeItem('password')
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
