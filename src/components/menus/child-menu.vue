<template>
  <div v-if="menu">
    <Dropdown :transfer="true" placement="right-start" @on-click="selectMenu">
      <DropdownItem>
        {{menu.label}}
        <Icon type="ios-arrow-forward"></Icon>
      </DropdownItem>
      <DropdownMenu slot="list">
        <div v-for="(item, index) of menu.children" :key="index">
          <DropdownItem :name="item.name">{{item.label}}</DropdownItem>
          <ChildMenu v-if="item.children && item.children.length > 0" :menu="item"></ChildMenu>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>


<script>
import ChildMenu from '../menus/child-menu'
export default {
  name: "ChildMenu",
  components: {
    ChildMenu
  },
  props: {
    menu: {
      type: Object,
      require: true
    }
  },

  methods: {
    selectMenu(name) {
      this.$router.push({name: name})
    }
  }
}
</script>