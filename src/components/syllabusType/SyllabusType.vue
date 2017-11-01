<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-input placeholder="课程类型"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-card class="box-card" >
    <el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column prop="id" width="60" label="ID">
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="100" sortable>
      </el-table-column>

      <el-table-column prop="cover" label="封面" min-width="200"  sortable>
        <template scope="scope">
          <img :src="scope.row.cover" style="width: 120px;height: 120px">
      </template>
      </el-table-column>

      <el-table-column prop="introduction" label="说明" min-width="550" sortable>
      </el-table-column>

      <el-table-column prop="remark" label="简介"  min-width="150" sortable>
        <template scope="scope">
          <el-button size="small" type="success" @click="dialog(scope.row)">查看指导</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="count" label="课程数量" width="100" sortable>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="160"  :formatter="setTime" sortable>
      </el-table-column>
      <el-table-column label="操作" min-width="380" sortable   fixed="right">
        <template scope="scope">
          <el-button size="small" @click="edit(scope.row)"> 修改</el-button>
          <el-button type="danger" size="small"  :disabled="scope.row.count!=0" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="info" size="small"  @click="look(scope.row)">查看课程</el-button>
          <el-button type="warning" size="small"  @click="goOutSyllabus(scope.row)">查看下架课程</el-button>
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
  import util from '../../assets/util'
  export default {
    data() {
      return {
        total: 0,
        page: 1,
        pageSize:10,
        url:'http://118.31.165.67:8500/manager/v1/syllabus/types/page',
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
      //时间显示转换
      setTime(row, column){
        return util.formatDate.setTime(row.time);
      },
      //跳转到修改页面
      edit(row){
        this.$router.push({path:'/edit_syllabus_type', query: {id: row.id}});
      },
      //查看课程信息
      look(row){
        this.$router.push({path:'/syllabus', query: {id: row.id}});
      },
     //查看指定类型下架的课程页面
      goOutSyllabus(row){
        this.$router.push({path:'/syllabus_out', query: {tid: row.id}});
      },
      //获取所有的课程类别
      getSyllabusTypes() {
          //定义变量访问外部的data
        var vm=this;
        vm.loading=true;
        this.$http.get(this.url, {params: {offset: (vm.page-1)*(vm.pageSize), pageSize:vm.pageSize}}).then(function (response) {
            console.log(response.data.data);
            vm.total=response.data.data.total;
            vm.tableData=response.data.data.item;
             vm.loading=false;
        }).catch(function (error) {
          console.log(error);
        });
      },

      handleDel(row){
        var vm=this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          vm.loading=true;
          this.$http.delete('http://118.31.165.67:8500/manager/v1/syllabus/types/'+row.id)
            .then(function (response) {
              console.log(response.data);
              vm.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.loading=false;
              vm.getSyllabusTypes();
            })
            .catch(function (error) {
              console.log(error);
            });
        }).catch(() => {

        });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getSyllabusTypes();
      }
    },
    mounted() {
      this.getSyllabusTypes();
    }
  }

</script>
<style >

</style>
