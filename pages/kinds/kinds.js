// pages/kinds/kinds.js
import detail from '../../libs/data/kindsdata.js';
let pageData = {
  idTops: []
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
        name: '掌柜推荐',
        id: 'tuijian'
      },
      {
        name: '民俗非遗',
        id: 'minsu'
      },
      {
        name: '彩塑之都',
        id: 'caisu'
      },
      {
        name: '民乐之乡',
        id: 'minle'
      },
      {
        name: '餐厨美食',
        id: 'canchu'
      },
      {
        name: '畅销图书',
        id: 'changxiao'
      },
      {
        name: '中医养生',
        id: 'zhongyi'
      },
      {
        name: '生活家居',
        id: 'shenghuo'
      },
      {
        name: '精美手工',
        id: 'jingmei'
      }

    ],
    curIndex: 0,
    detail,
    toView: 0,
    //scroll的值
    scrollTop: 0,
    //scrollID:
    scrollId: 'tuijian',
    isShowSroll:true,
    maskButton:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })


  },
  switchCategory(e) {
    let {
      id,
      index
    } = e.currentTarget.dataset
    console.log(e)
    this.setData({
      scrollId: id,
      curIndex: index
    })
  },
  //查询Dom元素位置
  getFields(dom) {
    wx.createSelectorQuery().select(`#${dom}`).boundingClientRect((rect) => {
      rect.id // 节点的ID
      rect.dataset // 节点的dataset
      rect.left // 节点的左边界坐标
      rect.right // 节点的右边界坐标
      rect.top // 节点的上边界坐标
      rect.bottom // 节点的下边界坐标
      rect.width // 节点的宽度
      rect.height // 节点的高度
      console.log(rect)
      pageData.idTops.push({
        id: rect.id,
        top: rect.top,
        index: rect.dataset.index
      })
    }).exec()
  },
  bindscroll(e) {
    let { scrollTop } = e.detail
    console.log(scrollTop)
    console.log(pageData.idTops)
    for(let i = 0; i<pageData.idTops.length;i++){
      let {topOne ,topTwo,id,index}  = pageData.idTops[i]

      if(scrollTop > topOne && scrollTop <topTwo ){
        // console.log(i)
        if(this.data.curIndex === index){
          return false
        }else{
          console.log('set')
          this.setData({
            curIndex: index
          })
        }
      }
      
    }

   
  },
  productDetails(e) {
    wx.navigateTo({
      url: '/pages/index/receive/receive',

    })
  },

  bannerDetails(e) {
    wx.navigateTo({
      url: '/pages/index/receive/receive',

    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {    

    //用类名选择所有标签
    let souHeight = 50
    const query = wx.createSelectorQuery()
    query.selectAll('.itemRight').boundingClientRect(resData => {
      console.log(resData)
      resData.map((res,index)=>{
        let topTwoIndex = index + 1
        if(index + 1 > resData.length - 1){
          topTwoIndex = index
        } 
        let obj = {
          topOne: res.top - souHeight,
          topTwo: resData[topTwoIndex].top - souHeight,
          id:res.id,
          index:res.dataset.index
        }
        if(index == resData.length - 1){
          obj.topTwo = resData[topTwoIndex].top - souHeight + res.top
        }
        pageData.idTops.push(obj)
      
      })
    }).exec()
    

  },
  clickIsShowSroll(){
    this.setData({
      isShowSroll:true
    })
  },
  // 拉起键盘
  bindfocus(){
    console.log('键盘')
    this.setData({
      isShowSroll:false
    })
  },
  clickShowMask(){
    this.setData({
      maskButton:!this.data.maskButton
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})