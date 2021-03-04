/**
Created by  lanjian   on 2021/3/3  11:02
Copyright 奥尔特云（深圳）智慧科技有限公司. All rights reserved.
*/
<template>
  <div @click="gotoMain">
    点击登录
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    store.commit('index/SET_TOKEN', '12344567888')
    store.commit('user/SET_USER_INFO', 'userInfo1111')
    return {
      gotoMain: () => {
        router.push('main')
      }
    }
  }
}
</script>

<style scoped>

</style>
