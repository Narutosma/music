import instance from './instance'
/**
 *  @method 账号登陆
 *  @params phone: 手机号码
 *          password: 密码
 */
export const loginAccount = (phone, password) => instance.post(`/login/cellphone?phone=${phone}&password=${password}`)

/**
 *  @method 退出登陆
 */
export const logoutAccount = () => instance.get('/logout')

/**
 *  @method 获取用户详情
 *  @params uid : 用户 id
 */
export const getUserDetail = uid => instance.get(`/user/detail?uid=${uid}`)

/**
 *  @method 获取用户歌单
 *  @params uid 用户id
 */
export const getUserPlayList = uid => instance.get(`/user/playlist?uid=${uid}`)

/**
 *  @method 获取用户播放记录列表
 *  @params uid : 用户 id
 *          type : type=1 时只返回 weekData, type=0 时返回 allData
 */
export const getRecord = (uid, type = 0) => instance.get(`/user/record?uid=${uid}&type=${type}`)
