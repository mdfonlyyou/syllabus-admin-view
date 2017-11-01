<template>

  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm"
           style="margin:20px;width:80%;min-width:600px;" v-loading="addloading">
    <el-form-item label="名称" prop="name" label-width="80px">
      <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
    </el-form-item>

   <!-- <el-form-item label="简介">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm2.introduction"
                placeholder="请输入内容，可为空"></el-input>
    </el-form-item>-->
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

    <el-form-item label="说明">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="ruleForm2.introduction"
                placeholder="请输入内容，可为空"></el-input>
    </el-form-item>

    <el-form-item label="是否免费">
      <el-radio v-model="ruleForm2.is_noprice" :label="true" @change="addDomain">免费</el-radio>
      <el-radio v-model="ruleForm2.is_noprice" :label="false" @change="removeDomain">不免费</el-radio>
    </el-form-item>

    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      label="价格"
      :key="domain.key"
      prop="price">
      <el-input v-model.number="ruleForm2.price"></el-input>
    </el-form-item>


    <el-form-item label="课程时长" prop="duration">
      <el-input v-model.number="ruleForm2.duration" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item prop="cover_url">
      <input type="hidden" v-model="ruleForm2.cover_url" auto-complete="off"/>
    </el-form-item>

    <el-form-item label="封面">
      <el-upload
        class="avatar-uploader"
        action="http://avatarcn.oss-cn-hangzhou.aliyuncs.com"
        :data="data1"
        :on-success="handleAvatarSuccess1"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item prop="file_url">
      <input type="hidden" v-model="ruleForm2.file_url" auto-complete="off"/>
    </el-form-item>

    <el-form-item label="文件">
      <el-upload
        class="avatar-uploader"
        action="http://avatarcn.oss-cn-hangzhou.aliyuncs.com"
        :data="data2"
        :on-success="handleAvatarSuccess2"
        :before-upload=" beforeAvatarUploadFile">
        <img v-if="fileUrl" :src="fileUrl" class="avatar">
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
  import {quillEditor} from 'vue-quill-editor'
  import {postSyllabus} from '../../assets/syllabus'
  export default {
    data() {
      var validateprice = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入价格'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      var validateduration = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入时长'));
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      return {
        data1: {
          key: ''
        },
        data2: {
          key: ''
        },

        data3: {
          key: ''
        },
        addRange:[],
        fullscreenLoading : false,
        addloading:false,
        dynamicValidateForm: {
          domains: [],
        },
        editorOption :{},    // 编辑器选项
        content:'',        //编辑器内容为空
        uploadType:'',
        options: [],
        buckname: 'syllabus/tmp/',
        buckname1: 'syllabus/quillEditor/',
        imageUrl: '',
        fileUrl: '',
        ruleForm2: {
          name: '',
          introduction: '',
          remark: '',
          is_noprice: true,
          price: 0,
          duration: '',
          cover_url: '',
          file_url: ''
        },
        rules2: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          price: [
            {validator: validateprice, trigger: 'blur'}
          ],
          duration: [
            {validator: validateduration, trigger: 'blur'}
          ],
          cover_url: [
            {required: true, message: '请上传封面图片', trigger: 'blur'}
          ],
          file_url: [
            {required: true, message: '请输上传文件', trigger: 'blur'}
          ]
        },
      };
    },
    components: {
      quillEditor,
    },
    methods: {
      removeDomain(e) {
        this.dynamicValidateForm.domains = [];
        if (e == false) {
          this.dynamicValidateForm.domains.push({
            value: '',
            key: Date.now()
          });
          this.ruleForm2.price='';
        }
      },

      addDomain(e) {
        if (e == true) {
          this.dynamicValidateForm.domains = [];
        }
      },
      submitForm(formName) {
        var _this = this;
        console.log(this.ruleForm2);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = {
              name: _this.ruleForm2.name,
              introduction: _this.ruleForm2.introduction,
              remark: _this.ruleForm2.remark,
              price: _this.ruleForm2.price,
              is_noprice: _this.ruleForm2.is_noprice,
              url: _this.ruleForm2.file_url,
              cover: _this.ruleForm2.cover_url,
              fk_syllabus_type_id: _this.$route.query.type_id,
              duration: _this.ruleForm2.duration,
            };
            _this.addloading=true;
            postSyllabus(para).then(response => {
              this.options = response.data.item
              _this.addloading=false;
              _this.$router.push({path: '/syllabus', query: {id: _this.$route.query.type_id}});
            }).catch(err => {
              this.$message.error(err.toString());
            });
          } else {
            _this.$message.error('提交失败');
            return false;
          }
        });
      },

      //生成UUID文件名
      guid() {
        function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //上传封面图片之前
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';

        if (!isJPG & !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或者是PNG 格式!');
          return;
        }
        var suffix = file.name.substr(file.name.indexOf("."));
        var storeAs = this.buckname + this.guid() + suffix;
        this.data1.key = storeAs

      },
      //上传文件之前
      beforeAvatarUploadFile(file){
        var suffix = file.name.substr(file.name.indexOf("."));
        if (suffix != '.zip') {
          this.$message.error('上传文件不是zip不是文件!');
          return;
        }
        var storeAs = this.buckname + this.guid() + suffix;
        this.data2.key = storeAs
        console.log(this.data2.key)
      },

      handleAvatarSuccess1(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = 'http://avatarcn.oss-cn-hangzhou.aliyuncs.com/' + this.data1.key;
        this.ruleForm2.cover_url = 'http://avatarcn.oss-cn-hangzhou.aliyuncs.com/' + this.data1.key;
      },
      handleAvatarSuccess2(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.ruleForm2.file_url = 'http://avatarcn.oss-cn-hangzhou.aliyuncs.com/' + this.data2.key;
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
    // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
    mounted() {
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
