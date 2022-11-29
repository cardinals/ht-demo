import Mock from 'mockjs';

const demoData = () => {
  let allData = {
    status: "success",
    description: "这是一个学习vue框架测试案例",
    data: {
      indicatorDataList: [
        { word1: "2.30", word2: "0-180", word3: "主机房风扇功率" },
        { word1: "7.89", word2: "0-180", word3: "主机房风扇功率" },
        { word1: "4.91", word2: "0-180", word3: "主机房风扇功率" },
        { word1: "3.82", word2: "0-180", word3: "主机房风扇功率" },
        { word1: "2.47", word2: "0-180", word3: "主机房风扇功率" },
        { word1: "7.49", word2: "0-180", word3: "主机房风扇功率" }
      ]
    }
  };

  // for (let index = 0; index < 10; index++) {
  //   allData.rows.push(Mock.mock({
  //     versionId: '@natural',
  //     versionName: '@ctitle',
  //     versionNum:'@ctitle',
  //     sotaAppName: '@ctitle',
  //     versionStatus:'2',
  //     updateTime: '@datetime'
  //   }))
  // }

  setTimeout(function(){

  }.bind(this), 5000);
  return allData;
}

export  {demoData}
