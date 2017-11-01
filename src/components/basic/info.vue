<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
        <el-form-item style="float: right">
          <el-button type="primary" @click="goAddPath()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-card class="box-card" >
      <el-table
        :data="tableData" v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="60">
        </el-table-column>
        <el-table-column
          prop="fk_basic_type_id"
          label="基本类型ID"
          width="100">
        </el-table-column>

        <el-table-column
          prop="name"
          label="名称" width="100">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="简介" min-width="150">
        </el-table-column>

        <el-table-column
          prop="url"
          label="地址" min-width="150">
        </el-table-column>

        <el-table-column
          prop="md5"
          label="MD5" min-width="150">
        </el-table-column>

        <el-table-column
          prop="time"
          label="时间" :formatter="setTime" min-width="150">
        </el-table-column>

        <el-table-column label="操作" min-width="150">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)"> 修改</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
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
  import {getBasicPage} from '../../assets/basic'
  import {deleteBasicById} from '../../assets/basic'
  import util from '../../assets/util'
  export default {
    data() {
      return {
        tableData: [],
        page: 1,
        total:0,
        pageSize: 10,
        loading: false,

      }
    },
    methods: {
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path:'/edit_basic', query: {id:row.id,tid: this.$route.query.bid}});
      },
      //跳转到添加页面
      goAddPath(){
        this.$router.push({path:'/add_basic',query: {tid: this.$route.query.bid}});
      },
      //列出基本脚本
      basicPageInfos(){
        var vm=this;
        let para = {
          offset:(vm.page-1)*(vm.pageSize),
          pageSize:vm.pageSize
        };
        this.loading = true;
        getBasicPage(vm.$route.query.bid,para).then(response => {
          vm.total=response.data.total;
          vm.tableData=response.data.item;
          this.loading = false;
        });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.basicPageInfos();
      },
      //删除脚本
      handleDel(row){
        var vm=this;
        this.$confirm('确认删除该基础脚本吗?', '提示', {
          type: 'warning'
        }).then(() => {
            vm.loading=true;
          deleteBasicById(row.id).then(response => {
            vm.$message({
              message: '删除基础脚本成功',
              type: 'success'
            });
            vm.loading=false
            vm.basicPageInfos();
          });
        });
      }
    },
    mounted() {
      this.basicPageInfos();
    }

  }
</script>
<style>

</style>
