<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float: right">
          <el-button type="primary" @click="goAddPath()">上架课程</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-card class="box-card" >
    <el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column prop="id" width="50" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="100">
      </el-table-column>
      <el-table-column prop="fk_syllabus_type_id" label="课程类型ID" width="120">
      </el-table-column>

      <el-table-column prop="cover" label="课程封面"  min-width="200">
        <template scope="scope">
          <img :src="scope.row.cover" style="width: 120px;height: 120px">
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="简介" min-width="150">
        <template scope="scope">
          <el-button size="small" type="success" @click="dialog(scope.row)">查看简介</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="文件地址" width="300">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100">
      </el-table-column>

      <el-table-column  prop="introduction" label="说明" min-width="600">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间" width="150" :formatter="setUpdateTime">
      </el-table-column>
      <el-table-column prop="duration" label="课程时长" width="100">
      </el-table-column>
      <el-table-column prop="md5" label="MD5" width="200">
      </el-table-column>
      <el-table-column prop="count" label="播放量" width="100">
      </el-table-column>
      <el-table-column prop="time" label="上架时间" width="150" :formatter="setTime">
      </el-table-column>
      <el-table-column prop="is_noprice" label="是否免费" :formatter="formatIsNoprice" width="100">
      </el-table-column>

      <el-table-column prop="score" label="综合评分" width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="250" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteSyllabus(scope.row)">下架</el-button>
          <el-button type="info" size="small" @click="assessInfo(scope.row)">查看评论</el-button>
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
  import {syllabusPage} from '../../assets/syllabus'
  import {deleteSyllabusById} from '../../assets/syllabus'
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
        this.guide=row.remark;
      },
      //跳转到添加课程页面
      goAddPath(){
        this.$router.push({path:'/add_syllabus',query: {type_id: this.$route.query.id}});
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path:'/edit_syllabus', query: {id: row.id}});
      },
      //跳转到课程评价页面
      assessInfo(row){
        this.$router.push({path:'/assess', query: {sid: row.id}});
      },
      //课程是否免费转换
      formatIsNoprice: function (row, column) {
        return row.is_noprice == true ? '免费' : '不是免费';
      },
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      //时间显示更新时间转换
      setUpdateTime(row, column){
        return util.formatDate.setTime(row.updatetime);
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
        syllabusPage(vm.$route.query.id,para).then(response => {
          vm.total=response.data.total;
          vm.tableData=response.data.item;
          vm.loading=false;
        });
      },
      //下架指定的课程
      deleteSyllabus(row){
        var vm=this;
        this.$confirm('确认下架该课程吗?', '提示', {
          type: 'warning'
        }).then(() => {
          vm.loading=true;
          deleteSyllabusById(row.id).then(response => {
            vm.$message({
              message: '下架课程成功',
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
