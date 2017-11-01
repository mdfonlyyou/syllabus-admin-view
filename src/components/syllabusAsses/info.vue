<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
        <el-form-item style="float: right">
          <el-input placeholder="课程评价" ></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <el-card class="box-card" >
        <el-table
          :data="tableData"
          style="width: 100%" v-loading="loading">
          <el-table-column
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="fk_to_id"
            label="课程ID"
            width="100">
          </el-table-column>

          <el-table-column
            prop="assess"
            label="评价"  width="500">
          </el-table-column>

          <el-table-column
            prop="score"
            label="分数">
          </el-table-column>

          <el-table-column
            prop="type"
            label="所属类型">
          </el-table-column>

          <el-table-column
            prop="time"
            label="时间" :formatter="setTime">
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
  import {getSyllabusAssessPage} from '../../assets/syllabus'
  import {deleteSyllabusAssess} from '../../assets/syllabus'
  import util from '../../assets/util'
  export default {
    data() {
      return {
        tableData: [],
        page: 1,
        total:0,
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
        this.$router.push({path:'/edit_assess', query: {sid: row.fk_to_id,aid:row.id}});
      },
       //列出评论列表
        assessPageInfos(){
          var vm=this;
          let para = {
            offset:(vm.page-1)*(vm.pageSize),
            pageSize:vm.pageSize
          };
          vm.loading=true;
          getSyllabusAssessPage(vm.$route.query.sid,para).then(response => {
            vm.total=response.data.total;
            vm.tableData=response.data.item;
            vm.loading=false;
          });
        },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.assessPageInfos();
      },
      //删除评价
      handleDel(row){
        var vm=this;
        this.$confirm('确认删除该课程吗?', '提示', {
          type: 'warning'
        }).then(() => {
          vm.loading=true;
          deleteSyllabusAssess(row.fk_to_id,row.id).then(response => {
            vm.$message({
              message: '删除课程评价成功',
              type: 'success'
            });
            vm.loading=false;
            vm.assessPageInfos();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.assessPageInfos();
    }

  }
</script>
<style >
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;

  }
</style>
