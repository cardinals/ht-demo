<template>
  <div>
    <div v-for="(item, index) of menus"  :key="index">
      <Submenu :name="item.name" v-if="item.children && item.children.length > 0">
        <template slot="title">
          {{item.label}}
        </template>
        <div v-for="(child,index) of item.children" :key="index">
          <MenuItem v-if="!child.children || child.children.length == 0" :name="child.name" @click.stop.prevent="dd(item,child)">{{child.label}}</MenuItem>
          <ChildMenu v-if="child.children && child.children.length > 0" :menu="child"></ChildMenu>
        </div>
      </Submenu>
    </div>
  </div>
</template>

<script>
import ChildMenu from './child-menu'
import { mapMutations } from 'vuex'
export default {
  name: "Menus",
  components: {
    ChildMenu
  },
  props: {
    menus: {
      type: Array,
      require: true
    }
  },

  methods: {
    ...mapMutations("common", ["setCrumbs"]),

    dd(p, c) {
      console.log(p, c, '菜单');
    }
  }
}
</script>