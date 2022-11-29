# 为了更方便使用table分页，本组件基于iview的Table/Page组件进行的二次封装，使用方法如下：

<TablePage :columns="columns" :data="data" :dataCount="dataCount" :pageSize.sync="pageSize" @on-change="changePage"
  :currentPage="currentPage"  :loading='loading' tableHeight='row10'></TablePage>

# columns/data/dataCount/pageSize/currentPage/loading
同iview Table/Page组件中使用方法

# changePage
分页方法:同iview Page组件使用方法

# tableHeight
表格高度 系统高度有row5/6/7/8/9/10/11/12
        子系统高度 childRow5/6/7/8/9/10

# 如表格涉及到多选框的使用方法如下
<TablePage :columns="columns" :data="data" :dataCount="dataCount" :pageSize.sync="pageSize" @on-change="changePage"
  :currentPage="currentPage"  :loading='loading' tableHeight='row10' @on-select="tableSelect" ref="selection" @on-allSelect="allSelect"></TablePage>

# @on-select="tableSelect
选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。
# @on-allSelect="allSelect"
点击全选时触发，返回值为 selection，已选项。

