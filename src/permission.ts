import router from '@/router'
import nProgress from 'nprogress'
import { getToken } from './utils/auth'
import 'nprogress/nprogress.css'

nProgress.configure({ showSpinner: false })
const whiteList = ['/Login']
router.beforeEach((to) => {
  nProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      return {
        path: '/',
        replace: true
      }
    }
    nProgress.done()
    return true
  } else {
    if (whiteList.includes(to.path)) {
      nProgress.done()
      return true
    }
    nProgress.done()
    return {
      path: 'logon',
      query: {
        redirect: to.path,
        ...to.query
      }
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
