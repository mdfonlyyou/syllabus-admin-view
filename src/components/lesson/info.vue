<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;" v-loading="loading">
      <el-form :inline="true" >
        <el-form-item style="float: right">
          <el-input placeholder="学期教案"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <el-card class="box-card" >
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="60">
        </el-table-column>

        <el-table-column
          prop="name"
          label="名称" width="150">
        </el-table-column>

        <el-table-column
          prop="cover"
          label="地址" min-width="150">
          <template scope="scope">
            <img :src="scope.row.cover" style="width: 120px;height: 120px">
          </template>
        </el-table-column>

        <el-table-column
          prop="remark"
          label="简介" min-width="150">
          <template scope="scope">
            <el-button size="small" type="success" @click="dialog(scope.row)">查看简介</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="introduction"
          label="说明" min-width="600">
        </el-table-column>

        <el-table-column  width="100"
          prop="count_day"
          label="日教案数量" >
        </el-table-column>

        <el-table-column width="100"
          prop="count_syllabus"
          label="课程总数" >
        </el-table-column>

        <el-table-column width="100"
          prop="score"
          label="综合评分" >
        </el-table-column>

        <el-table-column
          prop="time"
          label="时间" :formatter="setTime" width="160">
        </el-table-column>

        <el-table-column label="操作" min-width="400" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)"> 修改</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
            <el-button type="info" size="small" @click="goAssess(scope.row)">查看学期教案评价</el-button>
            <el-button type="info" size="small" @click="goLessonDay(scope.row)">查看日教案</el-button>
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

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <span v-html="guide"></span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </section>
</template>

<script>
  import {getLessonPage} from '../../assets/lesson'
  import {deleteLessonById} from '../../assets/lesson'
  import util from '../../assets/util'
  export default {
    data() {
      return {
        tableData: [],
        page: 1,
        total:0,
        pageSize: 10,
        dialogVisible: false,
        guide:'',
        loading:false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      dialog(row){
        this. dialogVisible=true;
        this.guide=row.remark;
      },
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path:'/edit_lesson', query: {id:row.id}});
      },
      //跳转到查看学期教案评论页面
      goAssess(row){
        this.$router.push({path:'/lesson_assess', query: {lid:row.id}});
      },
      //跳转到日教案的页面
      goLessonDay(row){
        this.$router.push({path:'/lesson_day', query: {lid:row.id}});
      },
      //列出学期教案信息
      lessonPageInfos(){
        var vm=this;
        let para = {
          offset:(vm.page-1)*(vm.pageSize),
          pageSize:vm.pageSize
        };
        vm.loading=true;
        getLessonPage(para).then(response => {
          vm.total=response.data.total;
          vm.tableData=response.data.item;
          vm.loading=false;
        });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.lessonPageInfos();
      },
      //删除学期教案
      handleDel(row){
        var vm=this;
        this.$confirm('确认删除该学期教案吗?', '提示', {
          type: 'warning'
        }).then(() => {
            vm.loading=true;
          deleteLessonById(row.id).then(response => {
            vm.$message({
              message: '删除成功',
              type: 'success'
            });
            vm.loading=false;
            vm.lessonPageInfos();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.lessonPageInfos();
    }
  }
</script>
<style>

</style>
