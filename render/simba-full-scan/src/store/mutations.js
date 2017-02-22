/**
 * Created by hasee on 2017/1/18.
 */
import * as types from './mutations.types'

export default {
  [types.FLUSH_ROOT_DIR](state, rootDir) {
    state.fullScan.rootDir = rootDir;
  },
}
