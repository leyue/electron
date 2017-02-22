/**
 * Created by hasee on 2017/1/18.
 */
import * as types from './mutations.types'

export default {
  [types.ENABLE_QUERY](state, enable) {
    state.DBTrd.enable = enable;
  },
  //刷新打开后数据样本之后获取的项目
  [types.FLUSH_PROJECTS](state, projects) {
    state.DBTrd.projects = projects;
  },
}
