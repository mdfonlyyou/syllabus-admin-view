<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm"
             style="margin:30px;width:80%;min-width:600px;" v-loading="addloading">

      <el-form-item label="上课具体时间" prop="value2" label-width="120px">
        <el-time-select
          v-model="ruleForm2.value2"
          :picker-options="{
              start: '08:30',
              step: '00:01',
              end: '17:30'}"
          placeholder="任意时间点">
        </el-time-select>
      </el-form-item>

      <el-form-item label="选中课程" prop="syllabus_id" :rules="[
      { required: true, message: '课程不能为空'},
      { type: 'number', message: '课程ID必须为数字值'}
    ]">
      <el-input v-model.number="ruleForm2.syllabus_id" auto-complete="off" placeholder="请输入内容" @focus="dialogVisible = true"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <span>
          <new-syllabus :is_type_show="is_type_show" :is_syllabus_show="is_syllabus_show" v-on:getSyllabus="getSyllabus1"></new-syllabus>
        </span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
      </el-dialog>
    </el-form>


</template>

<script>
  import {postLessonDaySyllabus} from '../../assets/lesson'
  import NewSyllabus  from '../../components/lessonDaySyllabus/newSyllabus.vue'
  export default {
    data() {

      return {
        dialogVisible:false,
        is_type_show:true,
        is_syllabus_show:false,
        addloading:false,

        ruleForm2: {
          value2: '',
          syllabus_id:'',
        },
        rules2: {
          value2: [
            {required: true, message: '上课具体时间不能为空', trigger: 'blur'}
          ],
        },
      };
    },
    components: {
      NewSyllabus,
    },
    methods: {
        //从子组件传过来的值
      getSyllabus1(data){
          this.ruleForm2.syllabus_id=data;
          this.dialogVisible=false;
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var hours=_this.ruleForm2.value2.split(":");
            let para = {
              syllabus_id: _this.ruleForm2.syllabus_id,
              hour:hours[0],
              minute:hours[1]
            };
            _this.addloading=true;
            postLessonDaySyllabus(_this.$route.query.lid,_this.$route.query.did,para).then(response => {
              _this.addloading=false;
              _this.$router.push({path:'/lesson_day_syllabus', query: {lid: this.$route.query.lid,did:this.$route.query.did}});
           });
          } else {
            _this.$message.error('提交失败');
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.is_type_show=true
            this.is_syllabus_show=false
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style>
  .el-form-item__content {
    line-height: 50px;
    position: relative;
    font-size: 14px;
  }
  .el-breadcrumb, .el-form-item__label {
    line-height: 2;
    font-size: 14px;
  }
</style>
