<template>
  <div class="overflow-auto">
    <p class='fs18' style="fontWeight:bold">组件展示-特殊组件</p>
    <Row class="mt10">
      <Col span="8">
        <p style="fontSize:20px;fontWeight:bold">特殊数据结构1</p>
        <Dropdown trigger="click" class="mt10">
          <Button class="left" style="width:300px">
            <span v-if="buildName == ''">选择地址</span>
            <p class="mt5" v-else style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:300px">{{this.buildName}}</p>
          </Button>
          <DropdownMenu slot="list" class="left" style="width:300px">
            <div class="overflow-auto" style="height:250px">
              <lineTree :pd="treeData" @location="location" class="ml10"></lineTree>
            </div>
          </DropdownMenu>
        </Dropdown>
        <p style="fontSize:16px;fontWeight:bold" class="mt10">代码</p>
        <p>{{code1}}</p>
      </Col>
      <Col span="8">
        <p style="fontSize:20px;fontWeight:bold">特殊数据结构2</p>
        <treeCustom class="mt10" ref="treeCustom" :treeWidth='treeWidth' :areaList="areaList" @on-check-change="areaChange" :backIds="backIds"></treeCustom>
        <p style="fontSize:16px;fontWeight:bold" class="mt10">代码</p>
        <p>{{code2}}</p>
      </Col>
      <Col span="8">
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buildName:'',
      treeData:[],
      treeWidth:'300px',
      areaList:[
        {
          title: '中国',
          name: '中国',
          id:'1',
          expand: true,
          checked: false,
          parentIds:[],
          children: [
            {
              title: '北京',
              name: '北京',
              expand: true,
              id:'11',
              checked: false,
              parentIds:[1],
              children: []
            },
            {
              title: '湖北',
              name: '湖北',
              expand: true,
              id:'21',
              checked: false,
              parentIds:[1],
              children: [
                {
                  title: '武汉',
                  name: '武汉',
                  id:'211',
                  checked: false,
                  children:[],
                  parentIds:[21,1]
                },
                {
                  title: '随州',
                  name: '随州',
                  id:'112',
                  checked: false,
                  children:[],
                  parentIds:[21,1]
                }
              ]
            }
          ]
        }
      ],
      backIds:'',
      code1:'<lineTree :pd="treeData" @location="location"></lineTree>',
      code2:"<treeCustom ref='treeCustom' :treeWidth='treeWidth' :areaList='areaList' @on-check-change='areaChange' :backIds='backIds'></treeCustom>",
    }
  },

  methods : {
    //定位
    location (val) {
      this.buildName = val.name
    },
    //获取id
    areaChange () {},
  },

  created () {
    setTimeout(() => {
      this.treeData = [
        {
          title: '北京市',
          name: '北京市',
          label: '北京市',
          id:'1',
          expand: true,
          checked: false,
          open: true,
          disabled: false,
          parentIds:[],
          children: [
            {
              title: '海淀区',
              name: '海淀区',
              label: '海淀区',
              expand: true,
              disabled: false,
              id:'11',
              open: true,
              checked: false,
              parentIds:[1],
              children: [
                {
                  title: '航天桥',
                  name: '航天桥',
                  label: '航天桥',
                  disabled: false,
                  id:'111',
                  open: true,
                  checked: false,
                  expand: true,
                  children:[],
                  parentIds:[11,1]
                },
                {
                  title: '学院桥',
                  name: '学院桥',
                  label: '学院桥',
                  id:'112',
                  open: true,
                  disabled: false,
                  checked: false,
                  children:[],
                  expand: true,
                  parentIds:[11,1]
                }
              ]
            }
          ]
        }
      ]
    },1000)
  },
}
</script>

<style scoped>

</style>