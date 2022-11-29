<template>
  <div id='gridLayout'>
    <grid-layout
      :layout.sync="layoutData"
      :col-num="3"
      :row-height="rowHeight"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :maxRows='3'
      :autoSize="true" 
      @layout-updated="layoutUpdatedEvent"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
    >
      <grid-item v-for="(item,index) in layoutData"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="index"
        @resize="resizeEvent"
        @resized="resizedEvent"
      >
    <Card style="height:100%" class='cardTable' v-for='(col,index) in colData' v-if='col.i == item.i'>
        <p class='ml5 pTitle mb10'> ▚ 
          <span class='ml10 bold'>{{col.title}}</span>
          <span class='fr more pointer'>更多 <span class='ft12'>>></span></span>
        </p>
        <Table :columns="col.columns" :data="col.data" :height='tbHeight' class='table' v-if='col.columns' :row-class-name="rowClassName">
        </Table>
        <el-calendar v-model="value" v-else-if="col.title=='值班台历'" :style="`height:${tbHeight}px`">
        </el-calendar>
        <List  v-else class='list'>
          <div class="overflow-auto" :style="`height:${tbHeight}px`">
            <ListItem class='listItemBorder' v-for='list in col.data' :class='list.title=="上报通知"?"red":""'  v-if='col.title=="消息"'>
              <span class='ft12'>▶</span>
              <span class='ml5 mr5'>【{{list.title}}】</span>
              <span :class='list.title=="上报通知"?"red":"black"'>{{list.content}}</span>
            </ListItem>
            <ListItem v-else >
              <span class='mr10 width20'>{{list.team}}</span>
              <span class='mr20 avatar'>
                <Avatar :src="list.monitorUrl"/>
                <p class='mt10'>{{list.monitor}}</p>
              </span>
              <span class='avatar' v-for='child in list.children'>
                <Avatar :src="child.url" />
                <p class='mt10'>{{child.name}}</p>
              </span>
            </ListItem>
          </div>
        </List>
      </Card>

      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
// import { elCalendar } from 'element-ui'
// Vue.use(elCalendar)
import VueGridLayout from 'vue-grid-layout'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem

export default {
  name: 'vuegridLayout',
  components: {
    GridLayout,
    GridItem
  },
  data () {
    return {
      value: new Date(),
      layoutData:[
        {
          "x": 0,
          "y": 0,
          "w": 1,
          "h": 1,
          "i":"0"
        },
        {
          "x": 1,
          "y": 0,
          "w": 1,
          "h": 1,
          "i":"1"
        },
        {
          "x": 2,
          "y": 0,
          "w": 1,
          "h": 2,
          "i":"2"
        },
        {
          "x": 0,
          "y": 1,
          "w": 1,
          "h": 1,
          "i":"3"
        },
        {
          "x": 1,
          "y": 1,
          "w": 1,
          "h": 1,
          "i":"4"
        },
        {
          "x": 0,
          "y": 2,
          "w": 1,
          "h": 1,
          "i":"5"
        },
        {
          "x": 1,
          "y": 2,
          "w": 1,
          "h": 1,
          "i":"6"
        },
        {
          "x": 2,
          "y": 2,
          "w": 1,
          "h": 1,
          "i":"7"
        }
      ],
      rowHeight:275,
      colData:[
        {
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i:'0',
          title:'新报故障',
          columns: [],
          data:[{
            num:'WX20201231001',
            level:1,
            time:'12:37 07:26',
            itemId: '6-16 上 PSD-1',
            description:'PSD冒烟',
            people: '石明'

          },
          {
            num:'WX20201231001',
            level:1,
            time:'12:37 07:26',
            itemId: '6-16 上 PSD-1',
            description:'PSD冒烟',
            people: '易军'

          },
          {
            num:'WX20201231001',
            level:2,
            time:'12:37 07:26',
            itemId: '6-16 上 PSD-1',
            description:'PSD冒烟',
            people: '江刚'

          },
          {
            num:'WX20201231001',
            level:3,
            time:'12:37 07:26',
            itemId: '6-16 上 PSD-1',
            description:'PSD冒烟',
            people: '江刚'

          },]
        },
        {
          "x": 1,
          "y": 0,
          "w": 1,
          "h": 1,
          i:'1',
          title:'消息',
          // columns: [],
          data:[
            {
              title:'交班信息',
              content: '班组1说：后续任务交给你们了，辛苦，谢谢'
            },
            {
              title:'抄送通知',
              content: '6-12 下 滑动门L06-06ASD102 玻璃裂纹'
            },
            {
              title:'上报通知',
              content: '6-12 下 滑动门L06-06ASD102 Ⅰ级故障'
            },
            {
              title:'抄送通知',
              content: '6-12 下 滑动门L06-06ASD102 玻璃裂纹'
            },
            {
              title:'抄送通知',
              content: '6-12 下 滑动门L06-06ASD102 玻璃裂纹'
            },
            {
              title:'抄送通知',
              content: '6-12 下 滑动门L06-06ASD102 玻璃裂纹'
            },
          ]
        },
        {
          "x": 2,
          "y": 0,
          "w": 1,
          "h": 2,
          i:'2',
          title:'值班台历',
          // columns: [],
          data:[
          ]
        },
        {
          "x": 0,
          "y": 1,
          "w": 1,
          "h": 1,
          i:'3',
          title:'故障工单',
          columns: [],
          data:[{
            num:'WX20201231001',
            level:1,
            itemId: '6-16 上 PSD-1',
            status:'代派发',
            people: '班组1'

          },
          {
            num:'WX20201231002',
            level:1,
            itemId: '6-16  下 滑动门L0',
            status:'临时修复',
            people: '班组1'

          },
          {
            num:'WX20201231003',
            level:2,
            itemId: '6-16 上 PSD-1',
            status:'后续跟进',
            people: '班组2'

          },
          {
            num:'WX20201231004',
            level:3,
            itemId: '6-16 上 PSD-1',
            status:'已移交',
            people: '班组2'

          },
          {
            num:'WX20201231005',
            level:3,
            itemId: '6-16 上 PSD-1',
            status:'完成',
            people: '班组3'

          },]
        },
        {
          "x": 1,
          "y": 1,
          "w": 1,
          "h": 1,
          i:'4',
          title:'库存审批',
          columns: [],
          data:[{
            num:'C20SHF93',
            name:'应急门',
            count: '1',
            time:'2020-08-09'
            },
            {
            num:'C20SHF43',
            name:'应急门',
            count: '2',
            time:'2020-08-09'
            },
            {
            num:'C20SHF94',
            name:'应急门',
            count: '3',
            time:'2020-08-09'
            },
            {
            num:'C20SHF95',
            name:'应急门',
            count: '1',
            time:'2020-08-09'
            },
            {
            num:'C20SHF96',
            name:'应急门',
            count: '1',
            time:'2020-08-09'
            },
            
          ]
        },
        {
          "x": 0,
          "y": 2,
          "w": 1,
          "h": 1,
          i:'5',
          title:'巡检工单',
          columns: [],
          data:[
            {
            num:'WX20201231001',
            cycle:'3日',
            time:'2020-12-30',
            itemId:'6-16  上 PSD-1',
            status: '代派发',
            people:'班组1'
            },
            {
            num:'WX20201231002',
            cycle:'月度',
            time:'2020-12-30',
            itemId:'6-16  上 PSD-1',
            status: '临时修复',
            people:'班组2'
            },
            {
            num:'WX20201231001',
            cycle:'月度',
            time:'2020-12-30',
            itemId:'6-16  上 PSD-1',
            status: '后续跟进',
            people:'班组1'
            },
            {
            num:'WX20201231001',
            cycle:'年度',
            time:'2020-12-30',
            itemId:'6-16  上 PSD-1',
            status: '已移交',
            people:'班组3'
            },
          ]
        },
        {
          "x": 1,
          "y": 2,
          "w": 1,
          "h": 1,
          i:'6',
          title:'故障诊断',
          columns: [],
          data:[
            {
            station:'06光明路',
            itemCode:'应急门 L6-12-ASD-101',
            remark:'C'
            },
            {
            station:'06光明路',
            itemCode:'滑动门 L6-12-ASD-101',
            remark:'A'
            },
            {
            station:'06光明路',
            itemCode:'门控单元（DUC）',
            remark:'B'
            },
          ]
        },
        {
          "x": 2,
          "y": 2,
          "w": 1,
          "h": 1,
          i:'7',
          title:'当值班组',
          // columns: [],
          data:[
            {
              team:'班组一',
              monitor:'王晓波',
              monitorUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',
              children:[
                {
                  name:'苏涛',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'周勇',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'秦丽',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'雷娜',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'郭秀英',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'曾勇',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'秦娟',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                }
              ]
            },
            {
              team:'班组二',
              monitor:'王晓波',
              monitorUrl:'https://i.loli.net/2017/08/21/599a521472424.jpg',
              children:[
                {
                  name:'苏涛',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'周勇',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'秦丽',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'雷娜',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'郭秀英',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'曾勇',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                },
                {
                  name:'秦娟',
                  url:'https://i.loli.net/2017/08/21/599a521472424.jpg'
                }
              ]
            },
          ]
        },

      ],
      tbHeight:'',
      columns:[],
      columns1:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "申报单号",
          key: "num",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "故障等级",
          key: "level",
          minWidth:100,
          align: "center",
          tooltip:true,
          render: (h, params) => {
            return h('div', [
              h("Tag", {
                props: {
                  type:'border',
                  color: params.row.level==1?"#FF666E":params.row.level==2?'#FF9F40':'#2E6BE6',
                },
                style:{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  lineHeight:'20px',
                  padding:0,
                  background:params.row.level==1?'rgba(255, 102, 110, 0.4)!important':params.row.level==2?'rgba(255, 159, 64, 0.4)!important':'rgba(102, 153, 255, 0.4)!important'
                }
              },params.row.level==1?'I':params.row.level==2?'II':'III')
            ])
          }
        },
        {
          title: "上报时间",
          key: "time",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "车站&设备编号",
          key: "itemId",
          align: "center",
          minWidth:140,
          tooltip:true,
        },
        {
          title: "事件描述",
          key: "description",
          align: "center",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "上报人员",
          key: "people",
          align: "center",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "操作",
          align: "center",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
      columns2:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "工单编号",
          key: "num",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "故障等级",
          key: "level",
          minWidth:100,
          align: "center",
          tooltip:true,
          render: (h, params) => {
            return h('div', [
              h("Tag", {
                props: {
                  type:'border',
                  color: params.row.level==1?"#FF666E":params.row.level==2?'#FF9F40':'#2E6BE6',
                },
                style:{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  lineHeight:'20px',
                  padding:0,
                  background:params.row.level==1?'rgba(255, 102, 110, 0.4)!important':params.row.level==2?'rgba(255, 159, 64, 0.4)!important':'rgba(102, 153, 255, 0.4)!important'
                }
              },params.row.level==1?'I':params.row.level==2?'II':'III')
            ])
          }
        },
        {
          title: "车站&设备编号",
          key: "itemId",
          align: "left",
          minWidth:140,
          tooltip:true,
        },
        {
          title: "工单状态",
          key: "status",
          align: "left",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "维修班组",
          key: "people",
          align: "center",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "操作",
          align: "center",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
      columns3:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "任务单号",
          key: "num",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "巡检周期",
          key: "cycle",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "执行日期",
          key: "time",
          align: "center",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "车站&设备编号",
          key: "itemId",
          align: "center",
          minWidth:140,
          tooltip:true,
        },
        {
          title: "任务状态",
          key: "status",
          align: "center",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "巡检班组",
          key: "people",
          align: "center",
          tooltip:true,
          minWidth:100,
        },
        {
          title: "操作",
          align: "center",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
      columns4:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "物资领用单",
          key: "num",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "物资名称",
          key: "name",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "数量",
          key: "count",
          align: "center",
          tooltip:true,
          minWidth:70,
        },
        {
          title: "申请日期",
          key: "time",
          align: "center",
          minWidth:100,
          tooltip:true,
        },
        {
          title: "操作",
          align: "center",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
      columns5:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "车站",
          key: "station",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "设备编号",
          key: "itemCode",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "评价等级",
          key: "remark",
          align: "center",
          minWidth:100,
          tooltip:true,
        },
        {
          title: "操作",
          align: "center",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
      columns6:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "物资领用单",
          key: "name",
          minWidth:100,
          align: "left",
          tooltip:true,
        },
        {
          title: "元件",
          key: "editor",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "数量",
          key: "updateTime",
          align: "center",
          tooltip:true,
          minWidth:70,
        },
        {
          title: "申请日期",
          key: "createTime",
          align: "center",
          minWidth:100,
          tooltip:true,
        },
        {
          title: "操作",
          align: "left",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
      columns7:[
        {
          title: "序号",
          align: "center",
          type: 'index',
          minWidth:70,
          fixed:'left'
        },
        {
          title: "计划名称",
          key: "name",
          minWidth:100,
          align: "left",
          tooltip:true,
        },
        {
          title: "巡检周期",
          key: "editor",
          minWidth:100,
          align: "center",
          tooltip:true,
        },
        {
          title: "上次发布日期",
          key: "createTime",
          align: "center",
          minWidth:120,
          tooltip:true,
        },
        {
          title: "操作",
          align: "left",
          minWidth:70,
          fixed:'right',
          key: "location",
          render: (h, params) => {
          return h('div', [
            h("Icon", {
              props: {
                custom:'iconfont icon-chakan',
                size: "22",
                color: '#2d8cf0'
              },
              domProps: {
                title: "查看",
              },
              style: {
                cursor: "pointer",
              },
              nativeOn: {
                click: () => {
                },
              },
            })
          ])
          }
        }
      ],
    }
  },
  methods:{
    rowClassName (row, index) {
      if (row.level == 1) {
        return 'demo-table-info-row';
      }
      return '';
    },

    ////格子位置 大小更新
    layoutUpdatedEvent() {

    },
    //布局创建时间
    layoutCreatedEvent() {

    },
    //布局安装以前事件
    layoutBeforeMountEvent() {

    },
    //布局安装时间
    layoutMountedEvent() {

    },
    //布局准备活动
    layoutReadyEvent() {

    },
     //当该元素 被放大缩小触发的事件 
    resizeEvent (a,b,c,d,e,f,g,h,i,j,k) {
      // console.log(a,b,c,d,e,f,g,h,i,j,k,'item')
    },
    //放大缩小结束 触发事件 注意:必须当大小相对上一次发生改变结束时才会触发
    resizedEvent (end) {
      // console.log(end,'end')
    },
  },
  mounted () {
    this.rowHeight = document.getElementById('gridLayout').offsetHeight /3 - 16
    this.tbHeight = this.rowHeight -60
    var dayList = []
    dayList = document.getElementsByClassName('el-calendar-day')
    dayList.forEach((item) =>{
      item.style.height = (this.tbHeight*2/7)+'px'
    })

  },
  created () {
    this.colData.forEach((item) =>{
      if(item.title =='新报故障'){
        item.columns = this.columns1
      } else if (item.title =='故障工单') {
        item.columns = this.columns2
      } else if (item.title =='库存审批') {
        item.columns = this.columns4
      } else if (item.title =='巡检工单') {
        item.columns = this.columns3
      } else if (item.title =='故障诊断') {
        item.columns = this.columns5
      }
    })
  }
}
</script>
<style lang='less'>
#gridLayout {
  height:calc(100vh - 110px);
  .ivu-table {
    font-size: 12px;
  }
  .ivu-card-body{
    height: 100%;
  }
  .ml5{
    margin-left: 5px;
  }
  .mr5{
    margin-right: 5px;
  }
  .ivu-table td, .ivu-table th{
    height: 34px;
  }
  .ivu-list-item{
    padding:8px 0
  }
  .ivu-table-cell{
    padding-left:0px;
    padding-right:0px
  }
  .ivu-table .demo-table-info-row td{
    color: #FF666E;
  }
  .ivu-list-split .ivu-list-item {
    border:none
  }
  .ivu-avatar{
    width:40px;
    height: 40px;
    line-height: 40px;
  }
  .el-calendar-table .el-calendar-day{
    height:60px
  }
  .pTitle {
    color: #2E3033;
  }
  .bold{
    font-weight: bold;
    font-size: 16px;
  }
  .more {
    color:#3377FF;
  }
  .ft12 {
    font-size:12px
  }
  .red {
    color: #FF666E
  }
  .black {
    color:#2E3033
  }
  .pb10 {
    padding-bottom:10px
  }
  .list {
    color:#8A8F99;
    padding:0 10px
  }
  .listItemBorder {
    border-bottom:1px dashed #DBDFE6;
  }
  .width20 {
    width:20px
  }
  .avatar{
    font-size:12px;
    text-align:center
  }

}

</style>
