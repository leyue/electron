/**
 * Created by hasee on 2017/1/18.
 */
import * as types from './mutations.types'

export default {
  enableQuery({commit}, projects) {
    commit(types.ENABLE_QUERY, projects);
  },
  flushProjects({commit}, projects) {
    commit(types.FLUSH_PROJECTS, projects);
  }
}
