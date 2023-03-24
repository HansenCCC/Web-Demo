// 设备信息
const yptools_uniqueIdentification_key = 'yptools_uniqueIdentification_key'
var yptools_uniqueIdentification = localStorage.getItem(yptools_uniqueIdentification_key);
if (!yptools_uniqueIdentification) {
    yptools_uniqueIdentification = generateUniqueId(32)
    localStorage.setItem(yptools_uniqueIdentification_key, yptools_uniqueIdentification);
}
const yptools_username_key = 'yptools_username_key'
var yptools_username = localStorage.getItem(yptools_username_key)
if (!yptools_username) {
    yptools_username = "用户" + generateUniqueId(8)
    localStorage.setItem(yptools_username_key, yptools_username);
}

var isMobile = false;
var isAndroid = false;
var userAgent = navigator.userAgent;
var system = ""
if (userAgent.indexOf("Win") != -1) {
    // 用户的操作系统是 Windows
    isMobile = false;
    isAndroid = false;
    system = "Windows"
} else if (userAgent.indexOf("Mac") != -1) {
    // 用户的操作系统是 Mac OS
    isMobile = false;
    isAndroid = false;
    system = "Mac"
    if (userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1) {
        isMobile = true;
        system = "iPhone"
    }
} else if (userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1) {
    // 用户的操作系统是 iOS
    isMobile = true;
    isAndroid = false;
    system = "iPhone"
} else if (userAgent.indexOf("Android") != -1) {
    // 用户的操作系统是 Android
    isMobile = true;
    isAndroid = true;
    system = "Android"
} else {
    // 未能识别用户的操作系统
    isMobile = false;
    isAndroid = false;
    system = "Unknown"
}

console.log("用户唯一标识：" + yptools_uniqueIdentification);
console.log("用户操作设备：" + system);
console.log("用户操作系统：" + userAgent);
console.log("用户游戏昵称：" + yptools_username);

// 设置网络请求头
// $.ajaxSetup({
//     headers: {
//         // 'Content-Type': 'application/json'
//         "uuid": yptools_uniqueIdentification
//     }
// });
const baseURL = "https://121.43.188.78:8081"


// 游戏信息
const yptools_playcount_key = 'yptools_playcount_key'
const yptools_besttime_key = 'yptools_besttime_key'
const yptools_bestmove_key = 'yptools_bestmove_key'
var yptools_playcount = parseInt(localStorage.getItem(yptools_playcount_key));
var yptools_besttime = parseFloat(localStorage.getItem(yptools_besttime_key));
var yptools_bestmove = parseInt(localStorage.getItem(yptools_bestmove_key));
yptools_playcount = isNaN(yptools_playcount) ? 0 : yptools_playcount;


// 生成随机字符串
function generateUniqueId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function formatDate(date, format) {
    const o = {
        "M+": date.getMonth() + 1, // month
        "d+": date.getDate(), // day
        "H+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        "S+": date.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}