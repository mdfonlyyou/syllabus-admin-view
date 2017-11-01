<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="goAddPath()">新增日教案</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-card class="box-card" >
      <el-table :data="tableData" style="width: 100%;" v-loading="loading">
        <el-table-column prop="id" width="100" label="ID">
        </el-table-column>
        <el-table-column prop="fk_lession_id" label="学期教案ID" width="100">
        </el-table-column>
        <el-table-column  prop="days" label="日教案次序" width="200">
        </el-table-column>
        <el-table-column prop="count" label="课程数量" width="200">
        </el-table-column>

        <el-table-column prop="guide" label="教学指导" min-width="400" >
          <template scope="scope">
            <el-button size="small" type="success" @click="dialog(scope.row)">查看指导</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="time" label="时间" width="300"  :formatter="setTime">
        </el-table-column>

        <el-table-column label="操作" min-width="350" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteLessonInfo(scope.row)">删除</el-button>
            <el-button type="info" size="small" @click="goSyllabus(scope.row)">日教案下的课程</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="page"
          layout="prev, pager, next,jumper"
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
  import {getLessonDayByLidPage} from '../../assets/lesson'
  import {deleteLessonDay} from '../../assets/lesson'
  import util from '../../assets/util'
  export default {
    data() {
      return {
        total: 0,
        page: 1,
        pageSize: 10,
        tableData: [],
        dialogVisible: false,
        guide:'',
        loading:false
      }
    },
    methods: {
      dialog(row){
          this. dialogVisible=true;
          this.guide=row.guide;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //跳转到添加课程页面
      goAddPath(){
        this.$router.push({path:'/add_lesson_day',query: {lid: this.$route.query.lid}});
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path:'/edit_lesson_day', query: {lid: this.$route.query.lid,did:row.id}});
      },
      //跳转到日教案下的课程
      goSyllabus(row){
        this.$router.push({path:'/lesson_day_syllabus', query: {lid: this.$route.query.lid,did:row.id}});
      },
      //课程是否免费转换
      formatIsNoprice: function (row, column) {
        return row.is_noprice == true ? '免费' : '不是免费';
      },
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getLessonDayPageInfo();
      },
      //得到分页信息
      getLessonDayPageInfo(){
        var vm=this;
        let para = {
          offset:(vm.page-1)*(vm.pageSize),
          pageSize:vm.pageSize
        };
        vm.loading=true;
        getLessonDayByLidPage(vm.$route.query.lid,para).then(response => {
          vm.total=response.data.total;
          vm.tableData=response.data.item;
          vm.loading=false;
        });
      },
      //删除指定的日教案
      deleteLessonInfo(row){
        var vm=this;
        this.$confirm('确认删除该日教案吗?', '提示', {
          type: 'warning'
        }).then(() => {
            vm.loading=true;
          deleteLessonDay(vm.$route.query.lid,row.id).then(response => {
            vm.$message({
              message: '删除成功',
              type: 'success'
            });
            vm.loading=false;
            vm.getLessonDayPageInfo();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getLessonDayPageInfo();
    }
  }
</script>
<style>

</style>
