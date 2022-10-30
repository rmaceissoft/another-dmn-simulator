import { createStore, createLogger } from 'vuex'
import testCases from './modules/testCases'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    testCases,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})