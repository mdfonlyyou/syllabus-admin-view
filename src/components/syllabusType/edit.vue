<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm" style="margin:20px;width:80%;min-width:600px;">
    <el-form-item label="名称" prop="name" label-width="80px" v-loading="editloading">
      <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="说明">
      <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm2.introduction"></el-input>
    </el-form-item>

   <!-- <el-form-item label="说明">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm2.remark"></el-input>
    </el-form-item> -->

    <!--富文本编辑器-->
    <el-form-item label="简介">
      <!-- quill-editor插件标签 分别绑定各个事件-->
      <quill-editor v-model="ruleForm2.remark" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      >
      </quill-editor>

      <!-- 文件上传input 将它隐藏-->
      <el-upload class="upload-demo" action="http://avatarcn.oss-cn-hangzhou.aliyuncs.com" :before-upload='beforeUpload' :data="data3" :on-success='upScuccess'
                 ref="upload" style="display:none">
        <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item prop="dialogImageUrl">
      <input type="hidden" v-model="ruleForm2.dialogImageUrl"  auto-complete="off"/>
    </el-form-item>

    <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="http://avatarcn.oss-cn-hangzhou.aliyuncs.com"
          :data="data1"
          :file-list="fileList"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePreview"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
     <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>
<script>
  import {getSyllabusTypeById} from '../../assets/syllabus';
  import {editSyllabusTypeById} from '../../assets/syllabus';
  import {quillEditor} from 'vue-quill-editor'
  export default {
    data() {
      return {
        data1: {
          key: ''
        },
        data3: {
          key: ''
        },
        fileList: [{name: '', url: ""}],
        addRange:[],
        fullscreenLoading : false,
        editloading:false,
        editorOption :{},    // 编辑器选项
        content:'',        //编辑器内容为空
        imageUrl: '',
        buckname: 'syllabus/tmp/',
        buckname1: 'syllabus/quillEditor/',
        ruleForm2: {
          name: '',
          introduction: '',
          remark: '',
          dialogImageUrl: '',
        },
        rules2: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
      };
    },
    components: {
      quillEditor,
    },
    methods: {
      //提交修改
      submitForm(formName) {
        var _this = this;
        console.log(this.ruleForm2);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              name:this.ruleForm2.name,
              introduction:this.ruleForm2.introduction,
              remark:this.ruleForm2.remark,
              cover:this.ruleForm2.dialogImageUrl
            };
            _this.editloading=true;
            editSyllabusTypeById(_this.$route.query.id,para).then(response => {
              _this.editloading=false;
              _this.$router.push('/type');
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
      //上传之前
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if(!isJPG&!isPNG){
          this.$message.error('上传头像图片只能是 JPG或者是PNG 格式!');
          return;
        }
        var suffix = file.name.substr(file.name.indexOf("."));
        var storeAs = this.buckname + this.guid() + suffix;
        this.data1.key= storeAs

      },
      //生成UUID文件名
      guid() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },
      handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl='http://avatarcn.oss-cn-hangzhou.aliyuncs.com/'+this.data1.key;
        this. ruleForm2.dialogImageUrl='http://avatarcn.oss-cn-hangzhou.aliyuncs.com/'+this.data1.key;

      },
      handlePreview(file) {
        console.log(file);
      },
      getSyllabusTypeInfos(){
        this.editloading=true;
        getSyllabusTypeById(this.$route.query.id).then(response => {
          this.ruleForm2.name=response.data.name;
          this.ruleForm2.introduction=response.data.introduction;
          this.ruleForm2.remark=response.data.remark;
          this.ruleForm2.dialogImageUrl=response.data.cover;
          this.imageUrl=response.data.cover;
          //显示修改的封面名称
          this.fileList[0].name = response.data.cover,
            this.fileList[0].url = response.data.cover;
          this.editloading=false;
        });
      },
      // 点击图片ICON触发事件
      imgHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      // 图片上传之前调取的函数
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if (!isJPG & !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或者是PNG 格式!');
          return;
        }
        var suffix = file.name.substr(file.name.indexOf("."));
        var storeAs = this.buckname1 + this.guid() + suffix;
        this.data3.key = storeAs
      },

      // 图片上传成功回调   插入到编辑器中
      upScuccess(e, file, fileList) {
        this.fullscreenLoading = false
        let vm = this
        let url = 'http://avatarcn.oss-cn-hangzhou.aliyuncs.com/' + this.data3.key;
        let value = url
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        value = value.indexOf('http') !== -1 ? value : 'http:' + value
        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
        this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
      },
      // 编辑器光标离开 将编辑器内容发射给父组件
      onEditorBlur(editor) {
        this.$emit('getValue', this.content)
      },
      // 编辑器获得光标
      onEditorFocus(editor) {
        editor.enable(true)   // 实现达到上限字符可删除

      }
    },
    mounted() {
      this.getSyllabusTypeInfos();
      // 为图片ICON绑定事件  getModule 为编辑器的内部属性
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    }

  }
</script>
<style>
  .el-form-item__content {
    line-height: 50px;
    position: relative;
    font-size: 14px;

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;

  }
</style>
