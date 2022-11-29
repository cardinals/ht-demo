<template>
  <div>
    <!-- 查看表单 -->
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
    <!-- 添加修改 -->
    <Modal v-model="openMoadl" footer-hide draggable scrollable :title="addTitle" width="600">
      <div class="overflow-auto" style="height:600px;">
        <div style="width:98%;">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
            <FormItem label="用户编号" prop="code" v-show="addTitle != '开户'">
              <p>{{formValidate.code}}</p>
            </FormItem>
            <FormItem label="用户名称" prop="name">
              <Input v-model="formValidate.name" placeholder="用户名称" class="w200 left"></Input>
            </FormItem>
            <FormItem label="用户性质" prop="nature">
              <RadioGroup v-model="formValidate.nature">
                <Radio label="0" class="mr10">企业</Radio>
                <Radio label="1">个人</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem v-if="formValidate.nature == '0'" label="公司性质及行业类型" prop="companyNature">
              <Select v-model="formValidate.companyNature" placeholder="公司性质" class="w200 mr10 left" clearable>
                <Option v-for="item in companyList" :value="item.basicCode" :key="item.basicCode">{{ item.basicName }}</Option>
              </Select>
              <Select v-model="industry" placeholder="所属行业" class="w200 left" clearable>
                <Option v-for="item in companyTypeList" :value="item.basicCode" :key="item.basicCode">{{ item.basicName }}</Option>
              </Select>
            </FormItem>
            <FormItem label="证件上传" prop="certificatesType">
              <Row>
                <Col span="6">
                  <Select v-model="formValidate.certificatesType" placeholder="证件类型" class="w200 left mr10 fl">
                    <Option v-for="item in certificatesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="4" v-if="formValidate.certificatesType=='0'||formValidate.certificatesType=='1'||formValidate.certificatesType=='6'">
                  <Upload multiple :format="['jpg','jpeg','png']" :before-upload="beforeUpload" action="">
                    <Button icon="ios-cloud-upload-outline">正面上传</Button>
                  </Upload>
                </Col>
                <Col span="4" v-if="formValidate.certificatesType=='0'||formValidate.certificatesType=='1'">
                  <Upload multiple :format="['jpg','jpeg','png']" :before-upload="beforeUpload1" action="">
                    <Button icon="ios-cloud-upload-outline" class="ml10">反面上传</Button>
                  </Upload>
                </Col>
                <Col span="4" v-if="formValidate.certificatesType!='0'&&formValidate.certificatesType!='1'&&formValidate.certificatesType!='6'">
                  <Upload multiple :format="['jpg','jpeg','png']" :before-upload="beforeUpload1" action="">
                    <Button icon="ios-cloud-upload-outline" class="ml10">主要信息</Button>
                  </Upload>
                </Col>
              </Row>
              <Row>
                <Col span="4" offset='6'>
                  <Tag v-if="files && files.name" :name="files ? files.name : ''" closable @on-close="files=[]">{{files ? files.name : ''}}</Tag>
                  <p v-else><img :src="formValidate.backUrl" /></p>
                </Col>
                <Col span="4">
                  <Tag v-if="files1 && files1.name" :name="files1 ? files1.name : ''" closable @on-close="files1=''">{{files1 ? files1.name : ''}}</Tag>
                  <p v-else><img :src="formValidate.positiveUrl" /></p>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="入住房间" prop="room">
              <Select v-if="addTitle == '开户'" v-model="formValidate.room" placeholder="建筑" class="w200 mr10 left" clearable @on-change='getRoomList'>
                <Option v-for="item in buildList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-if="addTitle == '开户'" v-model="house" placeholder="房间" class="w200 mr10 left" clearable>
                <Option v-for="item in houseList" :value="item.id" :key="item.id">{{ item.code }}</Option>
              </Select>
              <Avatar v-if="addTitle == '开户'" icon="md-add" class="pointer ml10" title="添加" size="22" @click.native="addRoom" />
              <Row>
                <Col span="12" v-for="(item,index) of enteringRoomList">{{item}}
                  <Icon v-if="addTitle == '开户'" type="md-close-circle" size="16" class="ml10 pointer cRed" @click.native="deleteRoom(index,item)" />
                </Col>
              </Row>
            </FormItem>
            <FormItem label="总使用面积" prop="totalAre">
              <p>{{formValidate.totalArea}}</p>
            </FormItem>
            <FormItem label="常驻人数" prop="residentNumber">
              <InputNumber :min="1" v-model="formValidate.residentNumber" placeholder="常驻人数" class="w200 left"></InputNumber>
            </FormItem>
            <FormItem label="指定联系人" prop="appointPerson">
              <Row v-for="(item,index) of formValidate.appointPerson" :class="index>0?'mt10':''">
                <Input v-model="item.name" placeholder="姓名" class="w200 left"></Input>
                <Input v-model="item.phone" placeholder="手机号码" class="w200 left ml10"></Input>
                <Input v-model="item.email" placeholder="邮箱" class="w200 left ml10"></Input>
                <Avatar v-show="index == 0" icon="md-add" class="pointer ml10" title="添加" size="22" @click.native="addContact" />
                <Icon v-show="index != 0" type="md-close-circle" size="22" class="ml10 pointer cRed" @click.native="deleteContact(index)" />
              </Row>
            </FormItem>
            <FormItem label="业务办理人" prop="handleName">
              <Row>
                <Input v-model="formValidate.handleName" placeholder="姓名" class="w200 left"></Input>
                <Input v-model="handlePhone" placeholder="手机号码" class="w200 left ml10"></Input>
                <Select v-model="handleCertificates" placeholder="证件类型" class="w200 left ml10" clearable>
                  <Option v-for="item in certificatesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input v-model="handleNumber" placeholder="证件号码" class="w200 left ml10"></Input>
              </Row>
            </FormItem>
            <FormItem label="开户（入驻）日期" prop="openTime">
              <DatePicker v-if="addTitle == '开户'" v-model="formValidate.openTime" type="datetime" placeholder="开户时间" class="w200"></DatePicker>
              <p v-else>{{formValidate.openTime}}</p>
            </FormItem>
            <FormItem label="截止时间" prop="endTime">
              <DatePicker v-model="formValidate.endTime" type="datetime" placeholder="截止时间" class="w200"></DatePicker>
            </FormItem>
            <FormItem label="受理客服" prop="userName">
              <p>{{$store.state.user.userName}}</p>
            </FormItem>
            <div class="center">
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button @click="handleReset('formValidate')" class="ml10">重置</Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
    <!--  -->
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  methods : {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          //校验通过执行这里的内容
        } else {
          //校验未通过执行这里的内容
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    //添加内容
    addContact () {
      let obj = {name:'',phone:'',email:''}
      this.formValidate.appointPerson.push(obj)
    },
    //删除内容
    deleteContact (index) {
      this.formValidate.appointPerson.splice(index,1)
    },
  }
}
</script>
