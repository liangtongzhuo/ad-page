<template>
  <div id="Admin">
    <el-input v-model="name" placeholder="input name"></el-input>
    <div class="upload">
      <label for="file">image</label>
      <input type="file" id="image-upload" accept=".jpg, .jpeg, .png" />
    </div>
    <div class="upload">
      <label for="file">spd-zip</label>
      <input type="file" id="psd" accept=".zip, .rar" />
    </div>

    <div class="content">
      <ul class="select-ul">
        <li v-for="(item, index) in selectList" :key="index">
          <a
            :class="item.tag === select.tag ? 'focus select' : 'select'"
            @click="clickSelect(item)"
          >
            {{ item.tag }}
          </a>
        </li>
      </ul>

      <ul>
        <li class="li-color" v-for="(item, index) in colorList" :key="index">
          <a
            :class="item.type === color.type ? 'focus-color color' : 'color'"
            :style="`background:${item.color}`"
            @click="clickColor(item)"
          >
            {{ item.type === 0 ? 'ALL' : '&nbsp;' }}
          </a>
        </li>
      </ul>
    </div>

    <el-button
      style="margin-left: 10px;"
      size="small"
      type="success"
      @click="save"
      >upload file server</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      selectList: [
        { tag: '最新' },
        { tag: '机械设备' },
        { tag: '教育培训' },
        { tag: '医疗美容' },
        { tag: '咨询管理' },
        { tag: 'IT 电子' },
        { tag: '化工与能源' },
        { tag: '物流运输' }
      ],
      colorList: [
        {
          type: 0,
          color: 'linear-gradient(45deg,#ef544c,#fda539,#dee64e,50%,#43c2cd)'
        },
        {
          type: 1,
          color: '#ef544c'
        },
        {
          type: 2,
          color: '#fda539'
        },
        {
          type: 3,
          color: '#dee64e'
        },
        {
          type: 4,
          color: '#36be57'
        },
        {
          type: 5,
          color: '#43c2cd'
        },
        {
          type: 6,
          color: '#3977e3'
        },
        {
          type: 7,
          color: '#8044d6'
        },
        {
          type: 8,
          color: '#cb66c4'
        },
        {
          type: 9,
          color: '#fff'
        },
        {
          type: 10,
          color: '#e6e6e6'
        },
        {
          type: 11,
          color: '#000000'
        },
        {
          type: 12,
          color: '#7a4168'
        }
      ],
      name: '',
      color: '',
      select: '',
      width: 0,
      height: 0
    }
  },
  mounted() {},
  methods: {
    async save() {
      if (this.name.length === 0) return this.$message.error('error, name null')
      const image = document.getElementById('image-upload')
      const psd = document.getElementById('psd')
      if (!image.files || !image.files.length)
        return this.$message.error('error, image null')
      if (!psd.files || !psd.files.length)
        return this.$message.error('error, spd null')

      if (!this.select) return this.$message.error('error, select null')
      if (!this.color) return this.$message.error('error, color null')

      const imageFile = image.files[0]
      const psdFile = psd.files[0]
      const sizeBody = await this.getWidthHeight(imageFile)
      this.width = sizeBody.width
      this.height = sizeBody.height
      const avImage = new this.$AV.File(imageFile.name, imageFile)
      const avPsd = new this.$AV.File(psdFile.name, psdFile)
      const ImageDB = this.$AV.Object.extend('image')
      const imageDB = new ImageDB()
      imageDB.set('name', this.name)
      imageDB.set('tag', this.select.tag)
      imageDB.set('color', this.color.type)
      const loading = this.$loading({
        lock: true,
        text: 'Loading'
      })
      try {
        imageDB.set('image', avImage)
        imageDB.set('psd', avPsd)
        await imageDB.save()
      } catch (error) {
        loading.close()
        return this.$message.error(JSON.stringify(error))
      }
      loading.close()
      window.location.reload()
    },
    getWidthHeight(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
          const img = new Image()
          img.onload = function() {
            resolve({ width: img.width, height: img.height })
          }
          img.onerror = function(e) {
            reject(e)
          }
          img.src = this.result
        }
      })
    },
    clickSelect(item) {
      this.select = item
    },
    clickColor(item) {
      this.color = item
    }
  }
}
</script>

<style lang="less">
#Admin {
  width: 1000px;
  text-align: left;
  .upload {
    padding: 10px 21px;
  }
  .upload-demo {
    width: 400px;
    margin: 0 auto;
  }
  .content {
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 4px 8px 0 rgba(0, 0, 0, 0.02);
    border-radius: 2px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    ul {
      width: 100%;
      padding: 21px;
      margin: 0;
      display: flex;
      li {
        list-style: none;
        margin-right: 40px;
        text-align: left;
        cursor: pointer;
        .select {
          text-decoration: none;
          outline: 0;
          color: #222;
        }
        .focus {
          color: #c90000;
          border: 1px #c90000 solid;
          border-radius: 2px;
          padding: 1px 3px;
        }
        .color {
          display: inline-block;
          text-decoration: none;
          color: white;
          width: 28px;
          height: 18px;
          box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.1);
          text-align: center;
          overflow: hidden;
        }
      }
      .li-color {
        margin-right: 20px;
        .focus-color:before {
          content: '\2714';
          color: white;
        }
      }
    }
  }
}
</style>
