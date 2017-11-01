<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-input placeholder="课程评价"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <el-card class="box-card">
      <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>

        <el-table-column
          prop="uuid"
          label="uuid"
          width="180">
        </el-table-column>


        <el-table-column
          prop="count"
          label="数量">
        </el-table-column>

        <el-table-column
          prop="time"
          label="时间" :formatter="setTime">
        </el-table-column>

        <el-table-column label="操作" min-width="150">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)"> 修改</el-button>
            <el-button type="danger" size="small" :disabled="scope.row.count!=0" @click="handleDel(scope.row)">删除
            </el-button>
            <el-button type="info" size="small" @click="look(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="page"
          layout="prev, pager, next, jumper"
          :total="total" style="float:right;">
        </el-pagination>
      </div>
    </el-card>
  </section>
</template>
<script>
  import {getBasicTypePage} from '../../assets/basic'
  import {deleteBasicType} from '../../assets/basic'
  import util from '../../assets/util'
  export default {
    data() {
      return {
        tableData: [],
        page: 1,
        total: 0,
        pageSize: 10,
        loading:false
      }
    },
    methods: {
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path: '/edit_basic_type', query: {id: row.id}});
      },
      //跳转到查看页面
      look(row){
        this.$router.push({path: '/basic', query: {bid: row.id}});
      },
      getBasicTypeInfos(){
        var vm = this;
        let para = {
          offset: (vm.page - 1) * (vm.pageSize),
          pageSize: vm.pageSize
        };
        this.loading=true
        getBasicTypePage(para).then(response => {
          vm.total = response.data.total;
          vm.tableData = response.data.item;
          this.loading=false
        });
      },

      //删除
      handleDel(row){
        var vm = this;
        this.$confirm('确认删除该数据吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteBasicType(row.id).then(response => {
            vm.$message({
              message: '删除基本脚本成功',
              type: 'success'
            });
            vm.getBasicTypeInfos();
          });
        }).catch(() => {

        });
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getBasicTypeInfos();
      },
    },
    mounted(){
      this.getBasicTypeInfos();
    }
  }

</script>
<style>

</style>
