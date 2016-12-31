var SERVER_DOMAIN = "http://xiaomu.ren:9000";


var user;

$(document).ready(function(){
    user = JSON.parse(sessionStorage.getItem("user"));
    $("#sp_username").text(user.nickname);

    // 权限管理

    // 设计师
    if (user.role == 1) {
      $("#li_dashboard").hide();
    }

    // 设计师主管
    if (user.role == 2) {

    }

    // 工厂
    if (user.role == 9) {
      $("#li_customer").hide();
      $("#li_price").hide();
      $("#li_dashboard").hide();
      $("#create").attr("disabled", true);
      $("#meta-li").hide();
      $("#fast_create").hide();
      $("#index_content").hide();
      $("#index_welcome").show();
    }
});

var authToken = sessionStorage.getItem("X-AUTH-TOKEN");
function logout(){
    var dataObj = {};
    $.ajax({
      type: 'POST',
      url: SERVER_DOMAIN + "/logout",
      contentType: "application/json",
      dataType: "json",
      headers: {'X-AUTH-TOKEN': authToken},                          
      data: JSON.stringify(dataObj),    
      success: function(r) {
        window.location.href = "/";
        console.log(r);
      },
      error: function(r) { 
        window.location.href = "/";
         console.log(r);
      }
    });
  }
