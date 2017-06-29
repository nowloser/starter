/**
 * @param a means b
 * Created by Administrator on 2016/11/11.
 * lastUser: Administrator
 * Date: 2016/11/11
 * Time: 9:49
 */
class OcxMixin {
    constructor(callBack){
        this.callBack = callBack;
        this.Sys = {};
        this.initOcx();
    }
    initOcx(){
        let ua = navigator.userAgent.toLowerCase();
        let s;
        (s = ua.match(/msie ([\d.]+)/)) ? this.Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? this.Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? this.Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? this.Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? this.Sys.safari = s[1] : 0;
        this.initPlugin();
    }
    initPlugin(){
        let pluginHtml = '';
        if(this.Sys.ie){
            pluginHtml = '<OBJECT id="WebOcx" name="WebOcx" classid="clsid:A3F076BD-A96C-4565-A326-0B6A2A3E8E9A" width="540" height="405">';
        }else{
            pluginHtml = '<object id="WebOcx" name="WebOcx" width="540" height="405" type="application/npmegaeyes-plugin"></object>';
        }
        document.getElementById('videoPanel').innerHTML = pluginHtml;
        this.$el = document.getElementById("WebOcx");
    }
}
export default  OcxMixin
