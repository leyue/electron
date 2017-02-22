/**
 * Created by hasee on 2017/1/18.
 */
import * as types from './mutations.types'

export default {
  flushRootDir({commit}, dir) {
    commit(types.FLUSH_ROOT_DIR, dir);
  }
}
