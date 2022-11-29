<!--
 * @Descripttion: 
 * @Author: zhangxiaoran
 * @Date: 2021-06-24 09:11:51
 * @LastEditors: zhangxiaoran
 * @LastEditTime: 2021-06-30 10:38:28
-->
<template>
  <div>
    <p class='fs18' style="fontWeight:bold">组件展示-标准代码</p>
    <Row class="mt10">
      <Col span="12">
        <p style="fontSize:20px;fontWeight:bold">获取表格数据及分页</p>
        <div class="mt10">
          changePage (page) {//changePage为触发的函数名称，可自定义，page是获取的当前页码<br />
            this.currentPage = page //获取当前页码<br />
            //在调用接口前需要完成的操作<br />
            getList({ //getList为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同<br />
              //替他字段（通常分页功能必有下面两个字段，字段名不一定一致）<br />
              currentPage:this.currentPage, //当前页码<br />
              pageSize:this.pageSize  //每页表格显示条数<br />
            })<br />
            .then((res) => { <br />
              //获取到数据执行的内容<br />
              this.data = res.data //对表格内容进行赋值<br />
              this.dataCount = res.recordCount //对表格总数进行赋值<br />
              //其他操作<br />
            })<br />
            .catch((err) => {<br />
              //未获取到数据执行的内容<br />
            });<br />
          },<br />
        </div>
      </Col>
      <Col span="12">
        <p style="fontSize:20px;fontWeight:bold">添加、修改</p>
        <div class="mt10">
          submit1 (name) { //submit1为触发的函数名称，可自定义，name为表单的model值（添加修改通常需要对表单进行校验）<br />
            this.$refs[name].validate((valid) => { //表单校验的方法，不用做处理<br />
              if (valid) {  //判断校验，不用做处理<br />
                //校验通过执行的操作<br />
                addType({ //addType为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同<br />
                  //字段<br />
                  createDate:this.formTable.createDate,<br />
                  description:this.formTable.description,<br />
                  energyType:this.energyType,<br />
                  name:this.formTable.name,<br />
                  rateType:this.formTable.rateType,<br />
                  status:'1',<br />
                })<br />
                .then((res) => {<br />
                  //获取到数据执行的内容<br />
                  this.clear1(name) //清空表单<br />
                  this.addStandard = false //关闭添加模态框<br />
                  this.changePage4(1,this.energyType) //刷新表格页面<br />
                })<br />
                .catch((err) => {<br />
                  //未获取到数据执行的内容<br />
                });<br />
              } else {<br />
                //校验未通过执行的操作<br />
                this.$Message.info('请完成填写')<br />
              }<br />
            })<br />
          },<br />
        </div>
      </Col>
    </Row>
    <Row class="mt30">
      <Col span="12">
        <p style="fontSize:20px;fontWeight:bold">查看</p>
        <div class="mt10">
          getDetails () { //getDetails为触发的函数名称，可自定义<br />
            //需要执行的操作<br />
            checkDetails({ //getList为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同<br />
              id:this.ids,  //通常查看详情接口传id的字段<br />
              //其他字段<br />
            })<br />
            .then((res) => {<br />
              //获取到数据之后执行的操作<br />
              this.data = res.tenantRateDateList //对数据进行赋值<br />
            })<br />
            .catch((err) => {<br />
              //未获取到数据执行的内容<br />
            });<br />
          },<br />
        </div>
      </Col>
      <Col span="12">
        <p style="fontSize:20px;fontWeight:bold">删除</p>
        <div class="mt10">
          deleteItem () { //deleteItem为触发的函数名称，可自定义<br />
      //其他需要执行的内容<br />
      deleteType({ //deleteType为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同<br />
        id:this.deleteId //通常删除接口一定有传id的字段<br />
        //其他字段<br />
      })<br />
      .then((res) => {<br />
        //获取到数据之后的操作<br />
        this.deleteModal1 = false //关闭删除模态框，模态框的model值自行修改<br />
        this.changePage(1)  //重新刷新表格数据，函数名自行修改<br />
      })<br />
      .catch((err) => {<br />
        //未获取到数据执行的内容<br />
      });<br />
    },<br />
        </div>
      </Col>
    </Row>
    <Row class="mt30">
      <Col span="12">
        <p style="fontSize:20px;fontWeight:bold">获取列表</p>
        <div class="mt10">
          getList () { //getList为触发的函数名称，可自定义<br />
      getList({ //getList为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同<br />
        //可加入需要传的字段及变量<br />
      }) <br />
      .then((res) => {<br />
        //获取到数据之后的操作<br />
      })<br />
      .catch((err) => {<br />
        //未获取到数据执行的内容<br />
      });<br />
    },<br />
        </div>
      </Col>
      <Col span="12">
        <!-- <p style="fontSize:20px;fontWeight:bold">常用icon图标</p>
        <p>添加：<Icon type="md-add" class="ml10" /></p>
        <p>删除：<Icon type="md-close"  class="ml10" /></p>
        <p>向上：<Icon type="md-arrow-dropup" class="ml10" /></p>
        <p>向下：<Icon type="md-arrow-dropdown" class="ml10" /></p>
        <p>备注：icon可以通过size属性调整大小单位为px，可以接受字符串或者数字类型的数据，可以通过color属性调整颜色。</p>
        <p>例如：{{iconStr}}<Icon type="md-arrow-dropdown" color='red' size='30' class="ml10" /></p> -->
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconStr:"<Icon type='md-arrow-dropdown' color='red' size='30' />"
    }
  }
}
</script>

<style scoped>

</style>