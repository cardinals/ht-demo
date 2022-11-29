<template>
  <div>
    <div class="index">
      <Row type="flex" justify="center" align="middle">
        <Col span="24">
          <Card style="width: 320px">
            <div>
              <h3>A high quality UI Toolkit based on Vue.js</h3>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoLeftGraphic",
};
</script>

<style scope lang="less">
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  h1 {
    height: 150px;
    img {
      height: 100%;
    }
  }
  h2 {
    color: #666;
    margin-bottom: 200px;
    p {
      margin: 0 0 50px;
    }
  }
  .ivu-row-flex {
    height: 100%;
  }
}
</style>