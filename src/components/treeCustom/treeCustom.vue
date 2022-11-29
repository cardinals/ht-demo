<template>
  <div>
    <Dropdown trigger="click" class="mr10">
      <Button class="left" :style="{width:treeWidth}">
        <span v-if="areaName == ''">选择计量区域</span>
        <p class="mt5" v-else :style="{width:wordWidth}" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{this.areaName}}</p>
      </Button>
      <DropdownMenu slot="list" class="left" :style="{width:treeWidth}">
        <div class="overflow-auto" style="height:250px">
          <Tree :check-strictly='true' :data="areaList" show-checkbox @on-check-change="getAreaIds" :style="{width:treeWidth}" class="pl10 mt5"></Tree>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'treeCustom',
  props: {
    areaList:{
      type:Array,
    },
    backIds:{
      type:String,
      default:''
    },
    treeWidth:{
      type:String,
      default:'300px'
    },
    wordWidth:{
      type:String,
      default:'270px'
    },
  },

  data () {
    return {
      areaIds: '',
      areaName:'',
      backArr:[],
    }
  },

  watch:{
    backIds:function (val) {
      if (val != '') {
        this.backArr = []
        val.split(',').forEach((item,index) => {
          this.areaList = this.findTrue(this.areaList,item)
        })
        this.getAreaIds(this.backArr)
      }
    }
  },

  methods: {
    getAreaIds (val) {
      this.areaIds = ''
      this.areaName = ''
      val.forEach((item) => {
        this.areaName = item.name + ',' + this.areaName
        this.areaIds = item.id + ',' + this.areaIds
      })
      let arr = this.areaName.split(',')
      this.areaName = ''
      arr = Array.from(new Set(arr))
      arr.forEach((item) => {
        if (item != '') {
          this.areaName = item + ',' + this.areaName
        }
      })
      let arr1 = this.areaIds.split(',')
      arr1 = Array.from(new Set(arr1))
      this.areaIds = ''
      arr1.forEach((item) => {
        if (item != '') {
          this.areaIds = item + ',' + this.areaIds
        }
      })
      this.areaName = this.areaName.substring(0, this.areaName.lastIndexOf(','))
      this.areaIds = this.areaIds.substring(0, this.areaIds.lastIndexOf(','))
      this.areaList = this.handlerTreeF(this.areaList)
      this.areaList = this.handlerTreeT(this.areaList)
      this.areaList = this.expandTree(this.areaList)
      // this.areaList = this.expandTreeT(this.areaList)
      this.$emit('on-check-change', this.areaIds,this.areaName)
    },
    handlerTreeF (list) {
      for (let item of list) {
        if (item.checked == false) {
          item.disabled = false
          if (item.children && item.children.length) {
            this.childChange(item.children,'1')
          }
          if (item.parentIds != [] && item.parentIds != null) {
            item.parentIds.forEach((i) => {
              this.findTree(this.areaList,i,'1')
            })
          }
        }
        if (item.children && item.children.length) {
          this.handlerTreeF(item.children)
        }
      }
      return list
    }, 
    handlerTreeT (list) {
      for (let item of list) {
        if (item.checked == true) {
          if (item.children && item.children.length) {
            this.childChange(item.children,'0')
          }
          if (item.parentIds != [] && item.parentIds != null) {
            item.parentIds.forEach((i) => {
              this.findTree(this.areaList,i,'0')
            })
          }
          item.disabled = false
        }
        if (item.children && item.children.length) {
          this.handlerTreeT(item.children)
        }
      }
      return list
    },

    childChange (list,val) {
      if (val == '0') {
        list.forEach((item) => {
          item.disabled = true
          if (item.children && item.children.length) {
            this.childChange(item.children,'0')
          }
        })
      } else if (val == '1') {
        list.forEach((item) => {
          item.disabled = false
          if (item.children && item.children.length) {
            this.childChange(item.children,'1')
          }
        })
      }
    },
    findTree (list = [],id,val) {
      if (val == '0') {
        list.forEach((item) => {
          if (item.id == id) {
            item.disabled = true
          } else {
            if (item.children && item.children.length) {
              this.findTree(item.children,id,'0')
            }
          }
        })
      } else if (val == '1') {
        list.forEach((item) => {
          if (item.id == id) {
            item.disabled = false
          } else {
            if (item.children && item.children.length) {
              this.findTree(item.children,id,'1')
            }
          }
        })
      }
    },
    expandTree (list = []) {
      list.forEach((item) => {
        item.expand = false
        if (item.children && item.children.length) {
          this.expandTree(item.children)
        }
      })
      return list
    },
    expandTreeT (list = []) {
      list.forEach((item) => {
        item.expand = true
        if (item.children && item.children.length) {
          this.expandTreeT(item.children)
        }
      })
      return list
    },

    findTrue (list = [],id) {
      for (let item of list) {
        if (item.id == id) {
          item.checked = true
          this.backArr.push({id:item.id,name:item.title})
        }
        if (item.children && item.children.length) {
          this.findTrue(item.children,id)
        }
      }
      return list
    },
  }
}
</script>