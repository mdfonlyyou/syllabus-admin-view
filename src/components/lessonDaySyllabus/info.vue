<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="goAddPath()">新增日教案课程</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-card class="box-card" >
      <el-table :data="tableData" style="width: 100%;" v-loading="loading">
        <el-table-column prop="id" width="50" label="ID">
        </el-table-column>
        <el-table-column prop="fk_day_id" label="日教案ID" width="100">
        </el-table-column>
        <el-table-column  prop="hour" label="上课时间" width="150" :formatter="setHours" >
        </el-table-column>
        <el-table-column  prop="fk_syllabus_id" label="课程ID" width="100">
        </el-table-column>

        <el-table-column prop="syllabus.cover" label="课程封面"  min-width="200">
          <template scope="scope">
            <img :src="scope.row.syllabus.cover" style="width: 120px;height: 120px">
          </template>
        </el-table-column>

        <el-table-column prop="syllabus.remark" label="简介" min-width="150">
          <template scope="scope">
            <el-button size="small" type="success" @click="dialog(scope.row)">查看简介</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="syllabus.url" label="文件地址" width="400">
        </el-table-column>
        <el-table-column prop="syllabus.price" label="价格" width="100">
        </el-table-column>
        <el-table-column prop="syllabus.updatetime" label="更新时间" width="200" :formatter="setTime">
        </el-table-column>
        <el-table-column prop="syllabus.duration" label="课程时长" width="100">
        </el-table-column>
        <el-table-column prop="syllabus.md5" label="MD5" width="150">
        </el-table-column>
        <el-table-column prop="syllabus.count" label="播放量" width="100">
        </el-table-column>
        <el-table-column prop="syllabus.time" label="上架时间" width="200" :formatter="setTime">
        </el-table-column>
        <el-table-column prop="syllabus.is_noprice" label="是否免费" :formatter="formatIsNoprice" width="100">
        </el-table-column>

        <el-table-column prop="syllabus.score" label="综合评分" width="120">
        </el-table-column>

        <el-table-column prop="time" label="添加课程时间" width="200" :formatter="setTime">
        </el-table-column>
        <el-table-column label="操作" min-width="250" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteSyllabus(scope.row)">删除</el-button>
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
  import {getLessonDaySyllabus} from '../../assets/lesson'
  import {deleteLessonDaySyllabus} from '../../assets/lesson'
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      dialog(row){
        this. dialogVisible=true;
        this.guide=row.syllabus.remark;
      },
      //跳转到选中课程页面
      goAddPath(){
       // this.$router.push({path:'/go_syllabus_type',query: {lid: this.$route.query.lid,did:this.$route.query.did}});
        this.$router.push({path:'/go_add_syllabus',query: {lid: this.$route.query.lid,did:this.$route.query.did}});
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path:'/go_edit_syllabus', query: {lid: this.$route.query.lid,did:this.$route.query.did,sid: row.id}});
      },

      //课程是否免费转换
      formatIsNoprice: function (row, column) {
        return row.is_noprice == true ? '免费' : '不是免费';
      },
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      //拼接上课时间
      setHours(row){
          if(row.hour>9&&row.minute>9){
            return row.hour+':'+row.minute;
          }else if(row.hour<=9&&row.minute<=9){
            return '0'+ row.hour+':0'+row.minute;
          }else if (row.hour>9&&row.minute<=9){
            return row.hour+':0'+row.minute;
          }else if (row.hour<=9&&row.minute>9){
            return '0'+row.hour+':'+row.minute;
          }

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.syllabusInfo();
      },
      //得到分页信息
      syllabusInfo(){
        var vm=this;
        let para = {
          offset:(vm.page-1)*(vm.pageSize),
          pageSize:vm.pageSize
        };
        vm.loading=true;
        getLessonDaySyllabus(vm.$route.query.lid,vm.$route.query.did,para).then(response => {
          vm.total=response.data.total;
          vm.tableData=response.data.item;
          vm.loading=false;
        });
      },
      //删除指定的课程
      deleteSyllabus(row){
        var vm=this;
        this.$confirm('确认删除该课程吗?', '提示', {
          type: 'warning'
        }).then(() => {
          vm.loading=true;
          deleteLessonDaySyllabus(vm.$route.query.lid,vm.$route.query.did,row.id).then(response => {
            vm.$message({
              message: '删除课程成功',
              type: 'success'
            });
            vm.loading=false;
            vm.syllabusInfo();
          });
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.syllabusInfo();
    }
  }
</script>
<style>

</style>
