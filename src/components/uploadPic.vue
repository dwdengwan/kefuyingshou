<template>
  <!-- 工程中心-上传附件 -->
  <div class="upload-pic">
    <!-- v-for="(v,i) in picList" :key='i' -->
    <!-- <div class="kr-title">{{v.title}}</div> -->
    <!-- <div class="kr-upload" v-if="!isUpload || isPhoto">
      <div class="kr-pic" v-for="(v,i) in picList" :key='i'> -->

        <!-- <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
                :on-change="addRow" 

          :auto-upload="false">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->


        <!-- <div v-if='!dialogVisible'> -->
          <!-- <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :auto-upload="false">
            <div class="kr-title">
              {{v.title}}
            </div>
            <div>
              <el-button type="primary" size="mini" @click='takePhoto(i)'>拍照<i class="el-icon-camera-solid el-icon--right"></i></el-button>
              <el-button type="success" size="mini" @click="takeUpload(i)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </div> -->
            <!-- <i slot="default" class="el-icon-plus"></i> -->
            <!-- <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div> -->
          <!-- </el-upload> -->
        <!-- </div> -->
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div> -->
    <!-- </div> -->
    <div class="kr-photo">
      <div class="children" v-for="(v,i) in picList" :key='i'>
        <div class='title1' v-if='i !== 3'><span>{{v.title}}</span></div>
        <div class='title2' v-else><span>{{v.title}}</span></div>
        <div class="btn-group">
          <el-button type="primary" @click='takePhoto(i)'>拍照<i class="el-icon-camera-solid el-icon--right"></i></el-button>
          <el-button type="success" @click="takeUpload(i)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <el-dialog
          :title="v.title"
          :visible.sync="isTakePhoto"
          width="50%"
          :before-close="handleClose">
          <div class="kr-img">
            <img src="../assets/images/jmcxl.png" alt="这是一张帅帅的照片">
            <span></span>
          </div>
          <el-progress :percentage="50"></el-progress>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="doPhoto(ruleTitle)" size="mini">{{ruleTitle}}</el-button>
            <el-button @click="callBack(ruleTitle1)" size="mini">{{ruleTitle1}}</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :title="v.title"
          :visible.sync="isUpload"
          width="50%"
          :before-close="handleClose">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit()" size="mini">确定</el-button>
            <el-button @click="callBackOut()" size="mini">取消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- <div class="kr-takePhoto" v-else>
      <div class="photo"></div>
      <div>
        <el-button @click="doPhoto(ruleTitle)">{{ruleTitle}}</el-button>
        <el-button @click="callBack(ruleTitle1)">{{ruleTitle1}}</el-button>
      </div>
    </div> -->
   
  </div>
</template>
<script>
export default {
  // props:['uploadPic'],
  data(){
    return {
      isTakePhoto:false,
      ruleTitle:"确认",
      ruleTitle1:"取消",
      isUpload:false,
      isPhoto:false,
      uploadTitle:'',
      title:'title1',
      picList:[
        {
          title:'经办人照片',
        },
        {
          title:'业主身份证-正面',
        },
        {
          title:'业主身份证-反面'
        },
        {
          title:'房产证/用地、房产的相关证明文件/镇街以上政府部门证明（该项提供任一证明文件即可）',
        },
        {
          title:'银行卡',
        },
        {
          title:'经办人身份证-正面',
        },
        {
          title:'经办人身份证-反面'
        },
        
        
        {
          title:'银行卡账户持卡人-正面',
        },
        {
          title:'银行卡账户持卡人-反面'
        },
        {
          title:'其他',
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList:[],
    };
  },
  mounted(){},
  methods:{
    handleClose(){},
    addRow() {
      let file = $(".uploading .el-upload__input").eq(0)[0].files[0];
      let name = $(".uploading .el-upload__input").eq(0)[0].files[0].name

      console.log(file);
      console.log(name);
      
      
      // this.addList.push(
      //   {
      //     "id": this.fatherId,
      //     "type": this.type,
      //     // "title": "",
      //     "file": file,
      //     "name": name
      //   }
      // )
      // this.selectRow = this.addList;

    },
    handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
       console.log(111);
       
        // this.imageUrl = URL.createObjectURL(file.raw);
    },
    // closeDialog(){
      // console.log(this.uploadPic);
      // this.crumbsData.titleList.splice(3,1);
      // this.uploadPic = false;
    // },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      console.log(111);
      console.log(file.url);
      debugger
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      // console.log(file);
    },
    takeUpload(i){
      // console.log(i);
      if(i== 0){
        this.$set(this,'uploadTitle','申请表')
      }else if(i == 1){
        this.$set(this,'uploadTitle','身份证-正面')
      }else if(i == 2){
        this.$set(this,'uploadTitle','身份证-反面')
      }else if(i == 3){
        this.$set(this,'uploadTitle','房产证(缩略图)')
      }
      this.isUpload = true;
      // console.log(this);

    },
    takePhoto(i){
      // console.log(i);
      window.addEventListener("DOMContentLoaded", function() {
        var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
        };
        if(navigator.getUserMedia) { // Standarda
          navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
          }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
          navigator.webkitGetUserMedia(videoObj, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
        }, errBack);
			  }else if(navigator.mozGetUserMedia) { // Firefox-prefixed
          navigator.mozGetUserMedia(videoObj, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
          }, errBack);
        }
        document.getElementById("snap").addEventListener("click", function() {
          context.drawImage(video, 0, 0, 640, 480);
        });
      }, false);
      this.isTakePhoto = true;
    },
    callBack(name){//取消
      console.log(name);
      if(name == '取消'){
        this.isTakePhoto = false;
      }else{
        this.ruleTitle = "确定";
        this.ruleTitle1 = "取消";
      }
    },
    doPhoto(name){
      console.log(name);
      this.ruleTitle = "提交";
      this.ruleTitle1 = "重拍";
      if(name == '提交'){
        this.isTakePhoto = false;
        this.ruleTitle = '确定';
        this.ruleTitle1 = '取消';
      }
    },
    submit(){//确认
      this.isUpload = false;
    },
    callBackOut(){
      this.isUpload = false;
    }
  },
  watch:{
     dialogVisible(val) {
       console.log(val);
      }
  },
}
</script>
<style lang="scss">
  .upload-pic{
    .kr-upload{
      display: flex;
      .kr-pic{
        margin-left:1rem;
        .el-button{
          padding: 0;
        }
        .kr-title{
          // padding-left:3rem;
          width: 10rem;
          text-align: center;
          // display: inline;
          font-size:1rem;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .kr-photo{
      display: flex;
      flex-wrap:wrap;
      .children{
        margin-left:1rem;
        margin-top:1rem;
        border: 1px solid #aaa;
        width: 14rem;
        height: 14rem;
        .title2{
          color:#000;
          font-size:1rem;
          text-align: center;
          height: 6rem;
          margin-top:4rem; 
        }
        .title1{
          color:#000;
          font-size:1rem;
          text-align: center;
          height: 10rem;
          line-height: 10rem;
        }

        .btn-group{
          text-align: center;
        }
      }
      .kr-img{
        width: 100%;
        height: 95%;
        text-align: center;
        margin:0 auto;
        img{
          vertical-align:middle;
        }
        span{
          height:100%;
          width:0px;
          overflow:hidden;
          display:inline-block;
          vertical-align:middle;
        }
      }
      .upload-demo{
        width: 100%;
        height: 99%;
        text-align: center;
        .el-upload{
          margin-top:15%;
        }
      }
    }
    .kr-takePhoto{
      .photo{
        width: 100px;
        height: 100px;
        border: 1px solid red;
      }
    }
  }
  
</style>