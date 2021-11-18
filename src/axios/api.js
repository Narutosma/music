import instance from './instance'
// api 调用

/**
 *  @method 推荐歌单
 *  @params limit: 取出数量 默认 30
 */

export const getRecommendSongSheet = (limit = 30) => instance.get(`/personalized?limit=${limit}`)

/**
 *  @method 推荐新音乐
 *  @params limit: 取出数量 默认 10
 */

export const getRecommendNewSongs = (limit = 10) => instance.get(`/personalized/newsong?limit=${limit}`)

/**
 *  @method 热门歌手
 *  @params limit: 取出数量 , 默认为 30
 *          offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */

export const getRecommendSinger = (limit = 30) => instance.get(`/top/artists?offset=0&limit=${limit}`)

/**
 *  @method 歌单详情
 *  @params id: 歌单id(必填)
 *          s: 歌单最近的 s 个收藏者,默认 s为8
 */

export const getSongSheetDetail = (id, s = 8) => instance.get(`/playlist/detail?id=${id}&s=${s}`)

/**
 *  @method 获取所有榜单
 */

export const getTopList = () => instance.get('/toplist')

/**
 *  @method 获取热门歌单分类
 */

export const getHotSongsCategory = () => instance.get('/playlist/hot')

/**
 *  @method 歌单 说明 : 调用此接口 , 可获取网友精选碟歌单
 *  @params 可选参数: order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 *                   cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 *                   limit: 取出歌单数量 , 默认为 50
 *                   offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */

export const getSongsSheetCategory = (order = 'hot', cat = '全部', offset, limit) => instance.get(`/top/playlist?order=${order}&cat=${cat}&offset=${offset}&limit=${limit}`)

/**
 *  @method 所有分类
 */

export const getAllCategory = () => instance.get('/playlist/catlist')

/**
 *  @method 歌手分类
 *  @params 参数： type： -1 全部  1 男歌手  2 女歌手  3 乐队
 *                area： -1 全部  7华语  96欧美  8:日本  16韩国  0:其他
 *                initial: 按首字母索引查找参数
 *                offset : 偏移数量，用于分页
 *                limit : 返回数量 , 默认为 30
 */

export const getSingerCategory = (type = -1, area = -1, inital = -1, offset = 1, limit) => instance.get(`/artist/list?type=${type}&area=${area}&initial=${inital}&offset=${offset}&limit=${limit}`)

/**
 *  @method 全部MV
 *  @params area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 *          type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 *          order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 *          limit: 取出数量 , 默认为 30
 *          offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */

export const getAllMV = (area, type, order, offset, limit = 30) => instance.get(`/mv/all/list?type=${type}&area=${area}&initial=${order}&offset=${offset}&limit=${limit}`)

/**
 *  @method 获取歌手单曲
 *  @params 必选参数 : id: 歌手 id, 可由搜索接口获得
 */

export const getSingerSongs = id => instance.get(`/artists?id=${id}`)

/**
 *  @method 获取歌手专辑
 *  @params 必选参数 : id: 歌手 id
 *          可选参数 : limit: 取出数量 , 默认为 50
 */

export const getSingerAlubms = id => instance.get(`/artist/album?id=${id}`)

/**
 *  @method 获取歌手MV
 *  @params 必选参数 : id: 歌手 id, 可由搜索接口获得
*/

export const getSingerMV = id => instance.get(`/artist/mv?id=${id}`)

/**
 *  @method 获取歌手描述 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
 *  @params 必选参数 : id: 歌手 id
*/

export const getSingerDetail = id => instance.get(`/artist/desc?id=${id}`)

/**
 *  @method 获取相似歌手
 *  @params 必选参数 : id: 歌手 id
 */

export const getSameSinger = id => instance.get(`/simi/artist?id=${id}`)

/**
 *  @method 获取专辑信息
 *  @params 必选参数 : id: 歌手 id
 */

export const getAlbumDetail = id => instance.get(`/album?id=${id}`)

/**
 *  @method 获取相似MV
 *  @params mvid 必选参数 : mvid: mv id
 */

export const getSimiMv = mvid => instance.get(`/simi/mv?mvid=${mvid}`)

/**
 *  @method 获取MV数据
 *  @params mvid 必选参数 : mvid: mv id
 */

export const getMvDetail = mvid => instance.get(`/mv/detail?mvid=${mvid}`)

/**
 *  @method 获取mv点赞转发评论数数据
 *  @params mvid 必选参数 : mvid: mv id
 */

export const getMvDetailInfo = mvid => instance.get(`/mv/detail/info?mvid=${mvid}`)

/**
 *  @method 获取音乐url
 *  @params id 必选参数 : id: mv id
 */

export const getSongUrl = id => instance.get(`/song/url?id=${id}`)

/**
 *  @method 获取歌曲歌词
 *  @params id 必选参数 : id: 歌曲 id
 */
export const getSongLyric = id => instance.get(`/lyric?id=${id}`)

/**
 *  @method 歌曲是否可用
 *  @params id : 歌曲 id
 */
export const getCheckMusic = id => instance.get(`/check/music?id=${id}`)

/**
 *  @method 获取视频播放地址
 *  @params id: mv id
 */
export const getMvUrl = id => instance.get(`/mv/url?id=${id}`)

/**
 *  @method 获取热搜列表(简略)
 */
export const getHotSearch = () => instance.get('/search/hot')

/**
 *  @method 关键字搜索
 *  @params keywords : 关键词
 */
export const getSearchResult = (keyword, type = 1) => instance.get(`/search?keywords=${keyword}&type=${type}`)

/**
 *  @method 歌单搜索
 *  @params t : 类型,1:收藏,2:取消收藏
 *          id : 歌单 id
 */
export const collectionSheet = ({ t, id }) => instance.get(`/playlist/subscribe?t=${t}&id=${id}`)
