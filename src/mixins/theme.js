import { getJson, deepCopy } from '@/utils/util'
import { mapMutations } from "vuex"
const themeChange = {
  data () {
    return {
      theme: "",
      themeList: [],
      server: "",
      serverList: [],
      develop: null,
      custom: false,
      colorList: [],
      colorListCopy: [],
      layoutType:'one',
      layoutList:[
        {type:'one',name:'上+下'},
        {type:'two',name:'上+中+下'},
      ]
    }
  },

  created () {
    this.getThemeList()
    this.getServerList()
  },

  watch: {
    "$store.state.common.develop": {
      immediate: true,
      handler: function (val) {
        this.develop = val
      }
    },

    theme: function (val) {
      if (val) {
        getJson(`${cfg.theme}/${val}/color.json`)
        .then(res => {
          this.colorList = deepCopy(res.data)
          this.colorListCopy = deepCopy(res.data)
        })
      }
    }
  },

  mounted () {
    this.initTheme()
  },

  methods: {
    ...mapMutations("common", ["setThemeUrl", "setBaseUrl", "setDevelop", "setCurrentTheme"]),

    // 初始化主题
    initTheme() {
      let theme = "default"
      if (!this._getTheme()) {
        this._setTheme(theme)
      } else {
        theme = this._getTheme()
      }
      this._setColors(theme)
    },

    // 获取主题列表
    getThemeList() {
      getJson(`${cfg.theme}/theme.json`)
      .then(res => {
        this.themeList = res.data
      })
    },

    // 更改主题
    changeLess(theme) {
      this.setThemeUrl(`${cfg.theme}/${theme}/`)
      this._setTheme(theme)
      this._setColors(theme)
    },

    // 获取主题
    _getTheme() {
      return localStorage.getItem("_theme")
    },

    // 设置主题
    _setTheme(name) {
      localStorage.setItem("_theme", name)
    },

    // 改变全局色值
    _setColors(name) {
      let data
      getJson(`${cfg.theme}/${name}/color.json`)
      .then(res => {
        data = res.data
        if (data && data.length) {
          data.forEach(i => {
            document.body.style.setProperty(i.name, i.value);
          });
          this.setCurrentTheme(name)
        }
      })
    },

    // 获取后台
    getServerList() {
      getJson(`${cfg.resource}lib/serverPort.json`)
      .then(res => {
        this.serverList = res.data
      })
    },

    changeURL() {
      this.custom = !this.custom
    },

    // 切换后台
    changeServer(url) {
      this.setBaseUrl(url);
    },

    changeDevelop(bool) {
      this.develop = bool
      this.setDevelop(bool)
    },

    resetColor() {
      this.colorList = deepCopy(this.colorListCopy)
      this.changeColor()
    },

    changeColor() {
      this.colorList.forEach(i => {
        document.body.style.setProperty(i.name, i.value);
      });
    },

    exportColor() {
      
    },

    //切换布局
    changeLayout (val) {
      if (val == 'one') {
        this.$store.state.common.showSide = false
      } else {
        this.$store.state.common.showSide = true
      }
    }
  }
}
export default themeChange