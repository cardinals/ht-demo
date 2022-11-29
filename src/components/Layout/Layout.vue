<template>
  <MainLayout :side="side" :foot="foot"></MainLayout>
</template>

<script>
import MainLayout from './MainLayout'
export default {
  name: "Layout",
  components: {
    MainLayout
  },
  data () {
    return {
      side: this.$store.state.common.showSide,
      foot: false
    }
  },
  methods: {
    
  }
}
</script>