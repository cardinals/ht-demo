<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangying
 * @Date: 2020-10-12 13:51:04
 * @LastEditors: zhangying
 * @LastEditTime: 2021-07-01 14:10:51
-->
<template>
  <div style="padding:0 50px">
    <div class='mb10'>
      <p v-text="$t('international.TITLE')" class='mr20' style="font-size:24px"></p>
      <p v-text="$t('international.DESCRIPTION')" class='mr20 mt10' style="font-size:20px;text-align:center"></p>
    </div>
    <div class='mb10'>
      <Table :columns="columns" :data="data"></Table>
    </div>
    <div style="width:500px">
      <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
          <Input v-model="formItem.input" :placeholder="$t('international.FORM.INPUT')"></Input>
        </FormItem>
        <FormItem label="Select">
          <Select v-model="formItem.select" :placeholder="$t('international.FORM.SELECT')">
            <Option value="beijing">{{$t('international.New York')}}</Option>
            <Option value="shanghai">{{$t('international.London')}}</Option>
            <Option value="shenzhen">{{$t('international.Sydney')}}</Option>
          </Select>
        </FormItem>
        <FormItem label="DatePicker">
          <Row>
            <Col span="11">
              <DatePicker type="date" :placeholder="$t('international.FORM.DATE')" v-model="formItem.date"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" :placeholder="$t('international.FORM.TIME')" v-model="formItem.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Radio">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">{{$t('international.FORM.MALE')}}</Radio>
            <Radio label="female">{{$t('international.FORM.FEMALE')}}</Radio>
          </RadioGroup>

          <!-- <el-radio class="radio" v-model="formItem.radio" label="male">{{$t('international.FORM.MALE')}}</el-radio> -->
        </FormItem>
        <FormItem label="Switch">
          <i-switch v-model="formItem.switch" size="large">
            <span slot="open">{{$t('international.FORM.ON')}}</span>
            <span slot="close">{{$t('international.FORM.OFF')}}</span>
          </i-switch>
        </FormItem>
        <FormItem>
          <Button type="primary">{{$t('international.FORM.SUBMIT')}}</Button>
          <Button style="margin-left: 8px">{{$t('international.FORM.CANCEL')}}</Button>
        </FormItem>
      </Form>
    </div>
    <div class='mt20' style="text-align:center">
      <Button @click='changeLanguage' type='primary'>中文/EN</Button>
    </div>
  </div>
</template>
<script>
import 'view-design/dist/styles/iview.css'
export default {
  data() {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      columns1: [
        {
          title: this.$t('international.COLUMNS.NAME'),
          key: 'name'
        },
        {
          title:  this.$t('international.COLUMNS.AGE'),
          key: 'age'
        },
        {
          title:  this.$t('international.COLUMNS.ADDRESS'),
          key: 'address'
        }
      ],
      data1: [
        {
          name: this.$t('international.DATA[0].NAME'),
          age: 18,
          address:  this.$t('international.DATA[0].ADDRESS'),
        },
        {
          name: this.$t('international.DATA[1].NAME'),
          age: 24,
          address: this.$t('international.DATA[1].ADDRESS'),
        },
        {
          name: this.$t('international.DATA[2].NAME'),
          age: 30,
          address: this.$t('international.DATA[2].ADDRESS'),
        },
        {
          name: this.$t('international.DATA[3].NAME'),
          age: 26,
          address: this.$t('international.DATA[3].ADDRESS'),
        }
      ]
    }
  },
  methods: {
    changeLanguage() {
      if (this.$i18n.locale == "zh-CN") {
        this.$i18n.locale = "en-US";
        // this.addCookie("lang", this.language);
      } else {
        this.$i18n.locale = "zh-CN";
        // this.$i18n.locale = this.language; //关键语句
        // this.addCookie("lang", this.language);
      }
      // location.reload();
      sessionStorage.setItem("locale",this.$i18n.locale);
      // this.reload()
    },
  },
  computed: {
    columns: function () {
      this.columns1.forEach((item,index)=>{
        index===0?
        item.title = this.$t('international.COLUMNS.NAME')
        :
        index===1?
        item.title = this.$t('international.COLUMNS.AGE')
        :
        item.title = this.$t('international.COLUMNS.ADDRESS')
      })
      return this.columns1
    },
    data: function () {
      this.data1.forEach((item,index)=>{
        if(index==0) {
          item.name = this.$t('international.DATA[0].NAME')
          item.address = this.$t('international.DATA[0].ADDRESS')
        } else if (index==1) {
          item.name = this.$t('international.DATA[1].NAME')
          item.address = this.$t('international.DATA[1].ADDRESS')
        } else if (index==2) {
          item.name = this.$t('international.DATA[2].NAME')
          item.address = this.$t('international.DATA[2].ADDRESS')
        } else {
          item.name = this.$t('international.DATA[3].NAME')
          item.address = this.$t('international.DATA[3].ADDRESS')
        }
        // switch (index) {
        //   case 0:
        //   item.name = this.$t('international.DATA[0].NAME')
        //   item.address = this.$t('international.DATA[0].ADDRESS')
        //   case 1:
        //   item.name = this.$t('international.DATA[1].NAME')
        //   item.address = this.$t('international.DATA[1].ADDRESS')
        //   case 2:
        //   item.name = this.$t('international.DATA[2].NAME')
        //   item.address = this.$t('international.DATA[2].ADDRESS')
        //   case 3:
        //   item.name = this.$t('international.DATA[3].NAME')
        //   item.address = this.$t('international.DATA[3].ADDRESS')
        // }
      })
      return this.data1
    },
  },
  mounted () {
  
  }
}
</script>