<template>
  <div>
    <div>
      <h1>vuex 测试</h1>
      Clicked: {{ getCount }} times
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-menu"></i>今日投放概览</span>
        <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'List item ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      "getCount"
      // ...
    ])
  },
  methods: {
    ...mapActions([
      "increment", // 映射 this.increment() 为 this.$store.dispatch('increment')
      "decrement"
    ])
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
};
</script>