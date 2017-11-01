<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2"   v-loading="addloading" ref="ruleForm2" label-width="80px" class="demo-ruleForm"
           style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="名称" prop="name" label-width="80px">
      <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="UUID" prop="uuid" label-width="80px" :rules="[
      { required: true, message: 'UUID不能为空'},
      { type: 'number', message: 'UUID必须为数字值'}
    ]">
      <el-input v-model.number="ruleForm2.uuid" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')" >提交</el-button>
      <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button>-->
    </el-form-item>
  </el-form>

</template>
<script>
  import {addBasicType} from '../../assets/basic'
  export default {
    data() {
      return {
        ruleForm2: {
          name: '',
          uuid:''
        },
        rules2: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
        },
        addloading:false
      };
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              name: this.ruleForm2.name,
              uuid:this.ruleForm2.uuid
            };
            _this.addloading=true;
            addBasicType(para).then(response => {
                _this.addloading=false
              _this.$router.push('/basic_type');
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
    }

  }
</script>
<style>
  .el-form-item__content {
    line-height: 50px;
    position: relative;
    font-size: 14px;
  }
</style>
