<template>
  <div>
    <p class='fs18' style="fontWeight:bold">组件展示-常用UI</p>
    <p class="mt10 fs16" style="fontWeight:bold">input输入框</p>
    <Row class="mt10">
      <Col span="4">
        <p>普通输入框</p>
        <Input v-model="input1" placeholder="请输入内容" class="w200" />
      </Col>
      <Col span="4">
        <p>数字类型输入框</p>
        <Input v-model="input2" type="number" placeholder="请输入数字" class="w200" />
      </Col>
      <Col span="4">
        <p>密码类型输入框</p>
        <Input v-model="input3" type="password" password placeholder="请输入密码" class="w200" />
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">select下拉框</p>
    <Row class="mt10">
      <Col span="4">
        <p>普通下拉框</p>
        <Select v-model="select1" class="w200">
          <Option v-for="item in selectList" :value="item.value" :key="item.value" @on-change='changeSelect'>{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="4">
        <p>多选下拉框</p>
        <Select v-model="select2" multiple  class="w200">
          <Option v-for="item in selectList" :value="item.value" :key="item.value" @on-change='changeSelect'>{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="4">
        <p>可清除下拉框</p>
        <Select v-model="select1" clearable class="w200">
          <Option v-for="item in selectList" :value="item.value" :key="item.value" @on-change='changeSelect'>{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">detepicker时间选择器</p>
    <Row class="mt10">
      <Col span="4">
        <p>单日选择</p>
        <DatePicker type="date" placeholder="请选择时间" class="w200"></DatePicker>
      </Col>
      <Col span="4">
        <p>范围选择</p>
        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择时间" class="w200"></DatePicker>
      </Col>
      <Col span="4">
        <p>单日选择精确到秒</p>
        <DatePicker type="datetime" placeholder="请选择时间" class="w200"></DatePicker>
      </Col>
      <Col span="4">
        <p>范围选择精确到秒</p>
        <DatePicker type="datetimerange" placeholder="请选择时间" class="w200"></DatePicker>
      </Col>
      <Col span="4">
        <p>月份选择</p>
        <DatePicker type="month" placeholder="请选择时间" class="w200"></DatePicker>
      </Col>
      <Col span="4">
        <p>年份选择</p>
        <DatePicker type="year" placeholder="请选择时间" class="w200"></DatePicker>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">radio单选</p>
    <Row class="mt10">
      <Col span="4">
        <p>单选</p>
        <RadioGroup v-model="radio1">
          <Radio label="选项A"></Radio>
          <Radio label="选项B" class="ml10"></Radio>
          <Radio label="选项C" class="ml10"></Radio>
        </RadioGroup>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">checkbox多选框</p>
    <Row class="mt10">
      <Col span="4">
        <p>多选框</p>
        <CheckboxGroup v-model="checkbox1">
          <Checkbox label="多选A"></Checkbox>
          <Checkbox label="多选B" class="ml10"></Checkbox>
          <Checkbox label="多选C" class="ml10"></Checkbox>
        </CheckboxGroup>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">switch开关</p>
    <Row class="mt10">
      <Col span="4">
        <p>开关</p>
        <i-Switch>
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-Switch>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">inputNumber数字输入框</p>
    <Row class="mt10">
      <Col span="4">
        <p>数字输入框</p>
        <InputNumber :min="0" class="w200"></InputNumber>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">Cascader级联选择</p>
    <Row class="mt10">
      <Col span="4">
        <p>级联选择</p>
        <Cascader :data="data1" class="w200"></Cascader>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">tree树形控件</p>
    <Row class="mt10">
      <Col span="4">
        <p>单选模式</p>
        <Tree :data="treedata"></Tree>
      </Col>
      <Col span="4">
        <p>多选模式</p>
        <Tree :data="treedata" show-checkbox></Tree>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">Tabs标签页</p>
    <Row class="mt10">
      <Col span="4">
        <p>标签页</p>
        <Tabs>
          <TabPane label="标签一">标签一的内容</TabPane>
          <TabPane label="标签二">标签二的内容</TabPane>
          <TabPane label="标签三">标签三的内容</TabPane>
        </Tabs>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">Button按钮</p>
    <Row class="mt10">
      <Col span="24">
        <p>按钮</p>
        <Button type="primary" class="mr10">primary</Button>
        <Button type="info" class="mr10">Info</Button>
        <Button type="success" class="mr10">Success</Button>
        <Button type="warning" class="mr10">Warning</Button>
        <Button type="error" class="mr10">Error</Button>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">Card卡片</p>
    <Row class="mt10">
      <Col span="24">
        <p>卡片</p>
        <Card style="width: 320px">
          <div style="text-align: center">
            <h3>可以在此处添加卡片内容</h3>
          </div>
        </Card>
      </Col>
    </Row>
    <p class="mt30 fs16" style="fontWeight:bold">Split面板分割</p>
    <Row class="mt10">
      <Col span="24">
        <p>面板分割</p>
        <div class="demo-split">
          <Split v-model="split1">
            <div slot="left" class="demo-split-pane">左侧面板</div>
            <div slot="right" class="demo-split-pane">右侧面板</div>
          </Split>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input1:"",
      input2:0,
      input3:'',
      selectList:[
        {value:'value1',label:'选项一'},
        {value:'value2',label:'选项二'},
        {value:'value3',label:'选项三'}
      ],
      select1:'',
      select2:[],
      radio1:'选项A',
      checkbox1:[],
      data1:[
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, 
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }
      ],
      treedata:[
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
      split1:0.5,
    }
  },

  methods : {
    //切换下拉框
    changeSelect (val) {

    },
  },

  created () {

  },
}
</script>


<style lang="less" scoped>
.demo-split {
  height: 200px;
  border: 1px solid var(--border-color-base);
}
.demo-split-pane {
  padding: 10px;
}
</style>