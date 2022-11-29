<!--
 * @Descripttion: 
 * @Author: zhangxiaoran
 * @Date: 2021-06-22 09:46:55
 * @LastEditors: zhangxiaoran
 * @LastEditTime: 2021-07-16 08:52:41
-->
<template>
  <div>
    <p class='fs18' style="fontWeight:bold">组件展示-全能列表</p>
    <!-- 头部删选 -->
    <Row>
      <Col span="24" class="right">
        <Input v-model="keyWord" placeholder="请输入关键字" class="w200 mr10" />
        <DatePicker type="date" placeholder="请选择时间"  class="w200 mr10"></DatePicker>
        <Select v-model="sex" class="w200 mr10">
          <Option value="0">男性</Option>
          <Option value="1">女性</Option>
        </Select>
        <Button type='primary' class="mr10" @click="$Message.success('查询成功')">查询</Button>
        <Button type='primary' class="mr10" @click="addTitle='添加用户',addModal=true">添加</Button>
      </Col>
    </Row>
    <!-- 表格 -->
    <TablePage class="mt10" :columns="columns" :data="tableData" :dataCount="dataCount" :pageSize.sync="pageSize" @on-change="changePage"
      :currentPage="currentPage"  :loading='loading1' tableHeight='row10'></TablePage>
    <!-- 查看模态框 -->
    <Modal v-model="checkModal" footer-hide draggable scrollable title="查看用户详细信息" width="500">
      <Form ref="checkForm" :model="checkForm" :label-width="120">
        <FormItem label="姓名：" prop="name">
          <p>{{checkForm.name}}</p>
        </FormItem>
        <FormItem label="年龄：" prop="age">
          <p>{{checkForm.age}}</p>
        </FormItem>
        <FormItem label="性别：" prop="sex">
          <p>{{checkForm.sex}}</p>
        </FormItem>
        <FormItem label="编号：" prop="code">
          <p>{{checkForm.code}}</p>
        </FormItem>
        <FormItem label="邮箱：" prop="email">
          <p>{{checkForm.email}}</p>
        </FormItem>
        <FormItem label="职称：" prop="title">
          <p>{{checkForm.title}}</p>
        </FormItem>
        <FormItem label="出生日期：" prop="date">
          <p>{{checkForm.date}}</p>
        </FormItem>
        <FormItem label="描述：" prop="desc">
          <p>{{checkForm.desc}}</p>
        </FormItem>
      </Form>
    </Modal>

    <!-- 添加 -->
    <Modal v-model="addModal" footer-hide draggable scrollable :title="addTitle" width="500">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <InputNumber :max="150" :min="18" v-model="formValidate.age" placeholder="请输入年龄"></InputNumber>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <Select v-model="formValidate.sex" placeholder="请选择性别">
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
        </FormItem>
        <FormItem label="编号" prop="code">
          <Input v-model="formValidate.code" placeholder="请输入编号"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="职称" prop="title">
          <RadioGroup v-model="formValidate.title">
            <Radio label="0">初级</Radio>
            <Radio label="1" class="ml10">中级</Radio>
            <Radio label="2" class="ml10">高级</Radio>
            <Radio label="3" class="ml10">无职称</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="出生日期" prop="date">
          <DatePicker type="date" placeholder="请选择日期" v-model="formValidate.date"></DatePicker>
        </FormItem>
        <FormItem label="描述" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
        </FormItem>
        <div style="textAlign:center">
          <Button v-if="addTitle=='添加用户'" type="primary" @click="handleSubmit('formValidate')" class="mr10">提交</Button>
          <Button v-else type="primary" @click="changeSubmit('formValidate')" class="mr10">修改</Button>
          <Button v-if="addTitle=='添加用户'" @click="handleReset('formValidate')">重置</Button>
        </div>
      </Form>
    </Modal>

    <!-- 删除 -->
    <deleteModal v-model="deleteModal" title='' @confirm="confirm"></deleteModal>
  </div>
</template>

<script>
import fun from '@/apis/api/test.js'
import { deepCopy } from '@/utils/util'
export default {
  data () {
    return {
      buildName:'',
      keyWord:'',
      date:'',
      sex:'',
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
          title: '姓名',
          key: 'name',
          align:'center',
          width:160
        },
        {
          title: '年龄',
          key: 'age',
          align:'center',
          width:80
        },
        {
          title: '性别',
          key: 'sex',
          align:'center',
          width:80,
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
          title: '编号',
          key: 'code',
          align:'center',
          width:200
        },
        {
          title: '出生日期',
          key: 'date',
          align:'center',
          width:200
        },
        {
          title: '邮箱',
          key: 'email',
          align:'left',
          width:280
        },
        {
          title: '地址',
          key: 'place',
          align:'left',
          width:450
        },
        {
          title: '职称',
          key: 'title',
          align:'center',
          width:130,
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
              str = '没有'
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
          title: '描述',
          key: 'desc',
          align:'left',
          width:300
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
                    this.addModal = true
                    // this.checkShow1(params.row)
                    // this.changeId = params.row.id
                    this.addTitle = '修改用户'
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
                    // this.checkDetails(params.row.id)
                    // this.checkShow(params.row)
                    this.checkModal = true
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
                    this.deleteModal = true
                    // this.deleteId = params.row.id
                  }
                }
              })
            ]);
          }
        }
      ],
      tableData:[
        {
          name:'张初春',
          age:29,
          sex:'0',
          code:'fxcs001001',
          date:'1992-01-09',
          title:'1',
          email:'1233211234567@qq.com',
          desc:'无',
          place:'河北省承德市丰宁满族自治县城建嘉园3号楼2门1901室内'
        },
        {
          name:'胡盛夏',
          age:26,
          sex:'1',
          code:'fxcs001002',
          date:'1995-09-04',
          title:'0',
          email:'hushengxia@qq.com',
          desc:'无',
          place:'山西省忻州市代县幸福小区13号楼403'
        },
        {
          name:'李金秋',
          age:26,
          sex:'1',
          code:'fxcs001003',
          date:'1995-10-29',
          title:'0',
          email:'19951029@qq.com',
          desc:'无',
          place:'甘肃省兰州市云祥小区20号楼2门506'
        },
        {
          name:'王寒冬',
          age:22,
          sex:'0',
          code:'fxcs001004',
          date:'1999-10-18',
          title:'3',
          email:'456@qq.com',
          desc:'无',
          place:'山东省烟台市蓬莱市光明小区1号楼2003'
        }
      ],
      copyData:[
        {
          name:'张初春',
          age:29,
          sex:'0',
          code:'fxcs001001',
          date:'1992-01-09',
          title:'1',
          email:'1233211234567@qq.com',
          desc:'无',
          place:'河北省承德市丰宁满族自治县城建嘉园3号楼2门1901室内'
        },
        {
          name:'胡盛夏',
          age:26,
          sex:'1',
          code:'fxcs001002',
          date:'1995-09-04',
          title:'0',
          email:'hushengxia@qq.com',
          desc:'无',
          place:'山西省忻州市代县幸福小区13号楼403'
        },
        {
          name:'李金秋',
          age:26,
          sex:'1',
          code:'fxcs001003',
          date:'1995-10-29',
          title:'0',
          email:'19951029@qq.com',
          desc:'无',
          place:'甘肃省兰州市云祥小区20号楼2门506'
        },
        {
          name:'王寒冬',
          age:22,
          sex:'0',
          code:'fxcs001004',
          date:'1999-10-18',
          title:'3',
          email:'456@qq.com',
          desc:'无',
          place:'山东省烟台市蓬莱市光明小区1号楼2003'
        }
      ],
      dataCount:4,
      pageSize:10,
      currentPage:1,
      loading1:false,
      //树结构线
      treeData:[],
      treeWidth:'150px',
      //特殊树结构
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
      //详情模态框
      checkModal:false,
      checkForm:{
        name: '',
        age:'',
        sex:'',
        code:'',
        mail: '',
        title:'',
        date: '',
        desc: ''
      },
      //删除
      deleteModal:false,
      deleteId:'',
      //添加
      addModal:false,
      addTitle:'',
      formValidate: {
        name: '',
        age:18,
        sex:'0',
        code:'',
        email: '',
        title:'0',
        date: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true,type:'number', message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请选择职称', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
        ],
      },
      changeId:'',
    }
  },

  methods : {
    changePage (page) {
      this.currentPage = page
      // fun.getTableData({
      //   pageSize:this.pageSize,
      //   currentPage:this.currentPage
      // })
      // .then((res) => {
      //   this.data = res.data
      //   this.dataCount = res.dataCount
      // })
    },

    //添加
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 仅在展示时使用-开始
          this.addModal = false
          this.handleReset(name)
          this.$Message.success('添加成功')
          // 仅在展示时使用-结束

          // fun.addUser({
          //   name:this.formValidate.name,
          //   age:this.formValidate.age,
          //   sex:this.formValidate.sex,
          //   code:this.formValidate.code,
          //   email:this.formValidate.email,
          //   title:this.formValidate.title,
          //   date:this.formValidate.code,
          //   desc:this.formValidate.desc
          // })
          // .then((res) => {
          //   this.addModal = false
          //   this.handleReset(name)
          //   this.changePage(1)
          // })
        } else {
          this.$Message.error('请完成填写')
        }
      })
    },
    //修改
    changeSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 仅在展示时使用-开始
          this.addModal = false
          this.handleReset(name)
          this.$Message.success('修改成功')
          this.tableData = deepCopy(this.copyData)
          // 仅在展示时使用-结束

          // fun.changeUser({
          //   id:this.changeId,
          //   name:this.formValidate.name,
          //   age:this.formValidate.age,
          //   sex:this.formValidate.sex,
          //   code:this.formValidate.code,
          //   email:this.formValidate.email,
          //   title:this.formValidate.title,
          //   date:this.formValidate.code,
          //   desc:this.formValidate.desc
          // })
          // .then((res) => {
          //   //
          //   this.addModal = false
          //   this.handleReset(name)
          //   this.changePage(1)
          // })
        } else {
          this.$Message.error('请完成填写')
        }
      })
    },
    //添加重置
    handleReset (name) {
      this.$refs[name].resetFields();
    },

    //删除
    confirm () {
      // 展示使用-开始
      this.deleteModal = false
      this.$Message.success('删除成功')
      //展示使用-结束
                                       //删除前可以自行添加必要的操作，没有就不添加
      // fun.deleteUser({              //fun.deleteUser为接口函数名称，可以根据自己的引入方式和函数名称自行修改
      //   id:this.deleteId            //deleteId为删除的id可以自定义名称
      // })
      // .then((res) => {              
      //   this.deleteModal = false    //成功删除后执行的操作，必要的两步为关闭模态框，重新获取表格数据，其余其他操作可自行填充
      //   this.changePage(1)
      // })
    },

    //查看详情
    checkDetails (id) {
      fun.checkDetails({
        id:id
      })
      .then((res) => {
        this.checkForm = res
      })
    },

    //仅为展示提供的方法
    checkShow (val) {
      this.checkForm = val
    },
    checkShow1 (val) {
      let arr = deepCopy(val)
      this.formValidate = deepCopy(arr)
    }
  },

  created () {
    this.changePage(1)
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

  watch : {
    addModal:function () {
      this.addModal ? '' : this.handleReset('formValidate')
    }
  }
}
</script>

<style scoped>
.closeIcon {
  position: absolute;
  font-size: 31px;
  top: 8px;
  right: 16px;
  cursor: pointer;
}
.closeIcon:hover {
  color: #4d74ff;
}
</style>
