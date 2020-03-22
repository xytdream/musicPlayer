/**
 *  1.歌曲搜索接口：
 *      请求地址：https://autumnfish.cn/search
 *      请求方法：get
 *      请求参数：keywords(查询关键字)
 *      响应内容：歌曲搜索结果
 *  2.歌曲url获取接口
 *      请求地址：https://autumnfish.cn/song/url
 *      请求方法：get
 *      请求参数：id(歌曲id)
 *      响应内容：歌曲url地址
 *  3.歌曲详情获取接口
 *      请求地址：https://autumnfish.cn/song/detail
 *      请求方法：get
 *      请求参数：ids(歌曲id)
 *      响应内容：歌曲详情，包含封面信息
 * 
 *  4.歌曲热门评论获取接口
 *      请求地址：https://autumnfish.cn/comment/hot?type=0
 *      请求方法：get
 *      请求参数：id(歌曲id，type固定为0)
 *      响应内容：歌曲的热门评论
 *  5.mv地址获取接口
 *      请求地址：https://autumnfish.cn/mv/url
 *      请求方法：get
 *      请求参数：id(mvid,为0说明没有mv)
 *      响应内容：mv的url
 */


 var app = new Vue({
     el: "#musicApp",
     data:{
        query:"",
        musicList:[],
        musicUrl:"",
        coverUrl:"./images/cover.png",
        commentList:[],
        isPlay:false,
        mvUrl:"",
        isShowVideo:false,
        isShowMusic:true
     },
     methods:{
        //搜索歌曲
        searchMusic:function(){
            var that = this
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                // console.log(response)
                // console.log(response.data.result.songs)
                that.musicList = response.data.result.songs
                // console.log(that.musicList)
                that.query = ""
            },function(err){})
        },
        playMusic:function(musicId){
            //保存当前this
            var that = this
            // 获取歌曲链接地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                // console.log(response.data.data[0].url)
                that.musicUrl = response.data.data[0].url
            },function(err){})

            //获取歌曲专辑封面
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                // console.log(response)
                // console.log(response.data.songs[0].al.picUrl)
                that.coverUrl = response.data.songs[0].al.picUrl
            },function(err){})

            //获取热门评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                // console.log(response)
                that.commentList = response.data.hotComments
                // console.log(that.commentList)
            },function(err){})
        },
        play:function(){
            // console.log("play")
            this.isPlay = true
        },
        pause:function(){
            // console.log("pause")
            this.isPlay = false
        },
        playMV:function(mvid){
            var that = this
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                // console.log(response)
                that.mvUrl = response.data.data.url
                that.isShowVideo = true
                that.isShowMusic = false
                that.$refs.video.play()
                that.$refs.audio.pause()
            },function(err){})
        },
        close:function(){
            this.isShowVideo = false
            this.isShowMusic = true
            this.$refs.video.pause()
        }
     }
 })

 var audio = document.getElementsByClassName("myAudio")[0]
 audio.volume = 0.3
 var mv = document.getElementsByClassName("mv")[0]
 mv.volume = 0.3