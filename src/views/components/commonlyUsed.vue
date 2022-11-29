<template>
  <div>
    <p class='fs18' style="fontWeight:bold">组件展示-常用组件</p>
    <Row class="mt10">
      <Col span="24">
        <p style="fontSize:20px;fontWeight:bold">表格及分页</p>
        <TablePage class="mt10" :columns="columns" :data="tableData" :dataCount="dataCount" :pageSize.sync="pageSize" @on-change="changePage"
          :currentPage="currentPage"  :loading='loading1' tableHeight='row5'></TablePage>
        <p style="fontSize:16px;fontWeight:bold" class="mt10">代码</p>
        <p class="mt10">{{code1}}</p>
      </Col>
    </Row>
    <Row class="mt30">
      <Col span="24">
        <p style="fontSize:20px;fontWeight:bold">常用icon按钮</p>
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-xiugai' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-shanchu' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-shengyin' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-shouye' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-chakan' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-bianbei-' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-bianbei' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-tianjia' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-tianjia-01' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-fanhui-01' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-location' />
        <Icon size='20' class='ml10 mt10 pointer' custom='iconfont icon-xiangshang-01' />
        <p style="fontSize:16px;fontWeight:bold" class="mt10">代码</p>
        <p class="mt10">{{code2}}</p>
      </Col>
    </Row>
    <Row class="mt30">
      <Col span="24">
        <p style="fontSize:20px;fontWeight:bold">删除模态框</p>
        <Button @click="deleteModal=true" class="mt10">展示删除模态框</Button>
        <deleteModal v-model="deleteModal" title='' @confirm="confirm"></deleteModal>
        <p style="fontSize:16px;fontWeight:bold" class="mt10">代码</p>
        <p class="mt10">{{code3}}</p>
      </Col>
    </Row>
    <!-- <Row class="mt30">
      <Col span="24">
        <p style="fontSize:20px;fontWeight:bold">逐时，日，月，年联动</p>
        <Select v-model="model6" style="width:200px">
          <Option value="hour">注释</Option>
          <Option value="day" disabled>逐日</Option>
          <Option value="month">逐月</Option>
          <Option value="year">逐年</Option>
        </Select>
        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        <p style="fontSize:16px;fontWeight:bold" class="mt10">代码</p>
        <p class="mt10">{{code4}}</p>
      </Col>
    </Row> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
					title: "序号",
					width: 80,
					align: "center",
					render: (h, params) => {
						return h(
							"span", params.index + (this.currentPage - 1) * this.pageSize + 1
						);
					},
          fixed: 'left'
				},
        {
          title: '表头内容1',
          key: 'name',
          align:'center',
          width:160
        },
        {
          title: '表头内容2',
          key: 'age',
          align:'center',
          width:200
        },
        {
          title: '表头内容3',
          key: 'sex',
          align:'center',
          width:140,
          render:(h,params) => {
            let str 
            if (params.row.sex == '0') {
              str = '男'
            } else if (params.row.sex == '1') {
              str = '女'
            }
            return h('p',str)
          }
        },
        {
          title: '表头内容4',
          key: 'code',
          align:'center',
          width:200
        },
        {
          title: '表头内容5',
          key: 'date',
          align:'center',
          width:200
        },
        {
          title: '表头内容6',
          key: 'email',
          align:'left',
          width:450
        },
        {
          title: '表头内容7',
          key: 'title',
          align:'left',
          width:300,
          render:(h,params) => {
            let str = ''
            let color = ''
            if (params.row.title == '0') {
              str = '初级'
              color = '#3377FF'
            } else if (params.row.title == '1') {
              str = '中级'
              color = '#FF9F40'
            } else if (params.row.title == '2') {
              str = '高级'
              color = '#FF666E'
            } else if (params.row.title == '3') {
              str = '无职称'
              color = '#A1A7B3'
            } else if (params.row.title == '') {
              str = '暂无数据'
              color = '#A1A7B3'
            }
            return h('Tag',{
              props: {
                color: color,
              }
            },str)
          }
        },
        {
          title: '操作',
          key: 'move',
          width: 220,
          align:'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  custom: 'iconfont icon-xiugai',
                  size:'25'
                },
                class:['pointer','mr20'],
                on: {
                  click: (params) => {
                    
                  }
                }
              }),
              h('Icon', {
                props: {
                  custom: 'iconfont icon-chakan',
                  size:'25'
                },
                class:['pointer','mr20'],
                on: {
                  click: (params) => {
                    
                  }
                }
              }),
              h('Icon', {
                props: {
                  custom: 'iconfont icon-shanchu',
                  size:'25'
                },
                class:['pointer'],
                on: {
                  click: (params) => {
                    
                  }
                }
              })
            ]);
          }
        }
      ],
      tableData:[{title:''}],
      dataCount:4,
      pageSize:10,
      currentPage:1,
      loading1:false,
      code1:"<TablePage class='mt10' :columns='columns' :data='tableData' :dataCount='dataCount' :pageSize.sync='pageSize' @on-change='changePage' :currentPage='currentPage' :loading='loading1' tableHeight='row5'></TablePage>",
      code2:"<Icon size='20' class='ml10 mt10' custom='iconfont icon-xiugai' />",
      deleteModal:false,
      code3:"<deleteModal v-model='deleteModal' title='' @confirm='confirm'></deleteModal>",
      code4:'',
    }
  },

  methods : {
    //定位
    location (val) {
      this.buildName = val.name
    },
    //获取id
    areaChange () {},

    changePage (page) {}
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