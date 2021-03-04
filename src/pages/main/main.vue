/**
Created by  lanjian   on 2021/3/3  11:23
Copyright 奥尔特云（深圳）智慧科技有限公司. All rights reserved.
*/
<template>
  <span>主页面</span>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'Main',
  setup() {
    const store = useStore()
    console.log('token', store.getters.token)
    console.log('token', store.getters.userInfo)
    return {

    }
  }
}
</script>

<style scoped>

</style>
