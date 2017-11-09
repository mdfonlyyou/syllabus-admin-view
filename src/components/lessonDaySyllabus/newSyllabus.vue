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
      <el-table :data="tableData" style="width: 100%;" v-show="is_type_show">
        <el-table-column prop="id" width="60" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100" sortable>
        </el-table-column>
        <el-table-column prop="cover" label="封面" min-width="200"  sortable>
          <template scope="scope">
            <img :src="scope.row.cover" style="width: 120px;height: 120px">
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="说明" min-width="600" sortable>
        </el-table-column>

        <el-table-column prop="remark" label="简介"  min-width="150" sortable>
          <template scope="scope">
            <el-button size="small" type="success" @click="dialog(scope.row)">查看指导</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="count" label="课程数量" width="100" sortable>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="200"  :formatter="setTime" sortable>
        </el-table-column>
        <el-table-column label="操作" min-width="250" sortable  fixed="right">
          <template scope="scope">
            <el-button type="info" size="small"  @click="look(scope.row)">查看课程</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-table :data="tableData1" style="width: 100%;" v-show=" is_syllabus_show">
        <el-table-column prop="id" width="50" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="100">
        </el-table-column>
        <el-table-column prop="fk_syllabus_type_id" label="课程类型ID" width="90">
        </el-table-column>

        <el-table-column prop="cover" label="课程封面" min-width="200">
          <template scope="scope">
            <img :src="scope.row.cover" style="width: 120px;height: 120px">
          </template>
        </el-table-column>

        <el-table-column  prop="introduction" label="说明" min-width="600">
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
        <el-table-column prop="updatetime" label="更新时间" width="150" :formatter="setTime">
        </el-table-column>
        <el-table-column prop="duration" label="课程时长" width="100">
        </el-table-column>
        <el-table-column prop="md5" label="MD5" width="100">
        </el-table-column>
        <el-table-column prop="count" label="播放量" width="100">
        </el-table-column>
        <el-table-column prop="time" label="上架时间" width="100" :formatter="setTime">
        </el-table-column>
        <el-table-column prop="is_noprice" label="是否免费" :formatter="formatIsNoprice" width="100">
        </el-table-column>

        <el-table-column prop="score" label="综合评分" width="120">
        </el-table-column>
        <el-table-column label="操作" min-width="250" fixed="right">
          <template scope="scope">
            <el-button type="danger" size="small" @click="choose(scope.row)">选中课程</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" v-show=" is_syllabus_show">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="page1"
          layout="prev, pager, next,jumper"
          :total="total1" style="float:right;">
        </el-pagination>
      </div>

      <div class="block" v-show="is_type_show">
        <el-pagination
          @current-change="handleCurrentUpdate"
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
  import {syllabusPage} from '../../assets/syllabus'
  import {getTypePage} from '../../assets/syllabus'
  export default {
    props: {
      is_syllabus_show:{type: Boolean},
      is_type_show:{type: Boolean},
    },
    data() {
      return {
        total: 0,
        page: 1,
        total1: 0,
        page1: 1,
        pageSize:10,
        tableData: [],
        tableData1: [],
        dialogVisible: false,
        guide:'',
        syllabus_id:'',
      }
    },

    methods: {
        //选中课程
      choose(row){
          //子组件向父组件通信
       this.$emit('getSyllabus', row.id);
      },
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

      //课程是否免费转换
      formatIsNoprice: function (row, column) {
        return row.is_noprice == true ? '免费' : '不是免费';
      },

      //查看课程信息
      look(row){
        //this.$router.push({path:'/go_syllabus', query: {lid: this.$route.query.lid,did:this.$route.query.did,type_id:row.id}});
        this.is_syllabus_show=true;
        this.is_type_show=false;
        this.syllabus_id=row.id;
        this.syllabusInfo();
      },
      //获取所有的课程类别
      getSyllabusTypes() {
        //定义变量访问外部的data
        var vm=this;
        let para = {
          offset:(vm.page-1)*(vm.pageSize),
          pageSize:vm.pageSize
        };
        getTypePage(para).then(response => {
          vm.total=response.data.total;
          vm.tableData=response.data.item;
        });
      },

      //得到课程分页信息
      syllabusInfo(){
        var vm=this;
        let para = {
          offset:(vm.page1-1)*(vm.pageSize),
          pageSize:vm.pageSize
        };
        syllabusPage(vm.syllabus_id,para).then(response => {
          vm.total1=response.data.total;
          vm.tableData1=response.data.item;
        });
      },

      handleCurrentUpdate(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getSyllabusTypes();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page1 = val;
        this.syllabusInfo();
      }
    },

    mounted() {
      this.getSyllabusTypes();
    }
  }

</script>
<style >

</style>
