return {
  changePage(page) {
    //changePage为触发的函数名称，可自定义，page是获取的当前页码
    this.currentPage = page; //获取当前页码 //在调用接口前需要完成的操作
    getList({
      //getList为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同
      //替他字段（通常分页功能必有下面两个字段，字段名不一定一致）
      currentPage: this.currentPage, //当前页码
      pageSize: this.pageSize //每页表格显示条数
    })
      .then(res => {
        //获取到数据执行的内容
        this.data = res.data; //对表格内容进行赋值
        this.dataCount = res.recordCount; //对表格总数进行赋值 //其他操作
      })
      .catch(err => {
        //未获取到数据执行的内容
      });
  },

  submit1(name) {
    //submit1为触发的函数名称，可自定义，name为表单的model值（添加修改通常需要对表单进行校验）
    this.$refs[name].validate(valid => {
      //表单校验的方法，不用做处理
      if (valid) {
        //判断校验，不用做处理
        //校验通过执行的操作
        addType({
          //addType为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同
          //字段
          createDate: this.formTable.createDate,
          description: this.formTable.description,
          energyType: this.energyType,
          name: this.formTable.name,
          rateType: this.formTable.rateType,
          status: '1'
        })
          .then(res => {
            //获取到数据执行的内容
            this.clear1(name); //清空表单
            this.addStandard = false; //关闭添加模态框
            this.changePage4(1, this.energyType); //刷新表格页面
          })
          .catch(err => {
            //未获取到数据执行的内容
          });
      } else {
        //校验未通过执行的操作
        this.$Message.info('请完成填写');
      }
    });
  },

  getDetails() {
    //getDetails为触发的函数名称，可自定义
    //需要执行的操作
    checkDetails({
      //getList为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同
      id: this.ids //通常查看详情接口传id的字段 //其他字段
    })
      .then(res => {
        //获取到数据之后执行的操作
        this.data = res.tenantRateDateList; //对数据进行赋值
      })
      .catch(err => {
        //未获取到数据执行的内容
      });
  },

  deleteItem() {
    //deleteItem为触发的函数名称，可自定义
    //其他需要执行的内容
    deleteType({
      //deleteType为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同
      id: this.deleteId //通常删除接口一定有传id的字段 //其他字段
    })
      .then(res => {
        //获取到数据之后的操作
        this.deleteModal1 = false; //关闭删除模态框，模态框的model值自行修改
        this.changePage(1); //重新刷新表格数据，函数名自行修改
      })
      .catch(err => {
        //未获取到数据执行的内容
      });
  },

  getBuildList() {
    //getBuildList为触发的函数名称，可自定义
    getBuildList({
      //getBuildList为接口函数名称，函数名称可自定义，引入接口的方式不同函数名称写法也不同
      //可加入需要传的字段及变量
    })
      .then(res => {
        //获取到数据之后的操作
      })
      .catch(err => {
        //未获取到数据执行的内容
      });
  }
};
