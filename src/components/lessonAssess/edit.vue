<template>


  <el-form :model="ruleForm2" status-icon :rules="rules2"  v-loading="editloading" ref="ruleForm2" label-width="80px" style="margin:20px;width:60%;min-width:600px;" class="demo-ruleForm">
    <el-form-item label="评价" prop="assess">
      <el-input  type="textarea"   :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm2.assess" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="评分" prop="score" >
      <el-rate
        v-model="ruleForm2.score"
        show-score
        :allow-half="true"
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {EditLessonAssessByLidAndAid} from '../../assets/lesson'
  import {getLessonAssessByLidAndAid} from '../../assets/lesson'
  export default {
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请评价'));
        }
        callback();
      };
      var validateScore=(rule, value, callback) => {
        if (value === 0) {
          callback(new Error('请评分'));
        }
        callback();
      };

      return {
        ruleForm2: {
          assess: '',
          score:0
        },
        rules2: {
          assess: [
            { validator: validatePass, trigger: 'blur' }
          ],
          score: [
            { validator: validateScore, trigger: 'blur' }
          ],
        },
        editloading:false
      };
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              assess:this.ruleForm2.assess,
              score:this.ruleForm2.score,
            };
            _this.editloading=true;
            EditLessonAssessByLidAndAid(_this.$route.query.lid,_this.$route.query.aid,para).then(response => {
              _this.editloading=false;
              _this.$router.push({path: '/lesson_assess', query: {lid: _this.$route.query.lid}});
            });
          } else {
            _this.$message.error('提交失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getLessonAssessInfos(){
         this.editloading=true;
        getLessonAssessByLidAndAid(this.$route.query.lid,this.$route.query.aid).then(response => {
          this.ruleForm2.assess=response.data.assess;
          this.ruleForm2.score=response.data.score;
          this.editloading=false;
        });
      }

    },
    mounted() {
      this.getLessonAssessInfos();
    }

  }

</script>
<style>
  .el-form-item__content {
    line-height: 50px;
    position: relative;
    font-size: 14px;
  }
  .el-rate__item {
    padding-top: 6px;
  }
</style>
