require('./../css/login.less');
var React = require('react');
var constant = require('./constant');
var Link = require('react-router').Link;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {email: '', password: ''};
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleClick() {
    var base_URL = constant.host;
    var data = {
       email : this.state.email,
       password : this.state.password,
     }
    $.ajax({
      type: "POST",
      url: base_URL + "/login",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(data),
      success: function (data) {
        sessionStorage.clear();
        sessionStorage.setItem("X-AUTH-TOKEN", data.auth_token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role == 9)
          window.location.href = "order-list.html";
        else
          window.location.href = "../index2.html";
      },
      error: function(e) {
       $(".errormsg").fadeIn("slow");
          setTimeout(function() {
            $(".errormsg").fadeOut("slow");
          },2500);
      }
    })
  }

  render() {
    return (
      <div className="login base_background">
        <div className="base_header am-text-center">
          <div className="am-g ">
            <h1>Quebec</h1>
          </div>
        </div>
        <div className="am-g">
          <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
            <form action="" className="am-form" data-am-validator>
              <div className="am-form am-u-md-8 am-u-sm-centered" >
                <label htmlFor="email">邮箱:</label>
                <input type="email" name="" id="email" value={this.state.email} onChange={this.handleEmail.bind(this)}/>
                <br/>
                <label htmlFor="password">密码:</label>
                <input type="password" name="" id="password" value={this.state.password} onChange={this.handlePassword.bind(this)}/>
                <br/>
                <label htmlFor="remember-me">
                  <input id="remember-me" type="checkbox"/>
                  记住密码
                </label>
                <br/>
                <div className="am-cf">
                  <button id="login" className="am-btn am-btn-success am-btn-sm " onClick={this.handleClick.bind(this)} >登 录</button>
                  <span className="errormsg am-margin" style={{display:'none'}}>邮箱或密码错误</span>
                  <button id="forget" className="am-btn am-btn-success am-btn-sm am-fr">忘记密码</button>
                  <Link to="/changePassword"><button id="change" className="am-btn am-btn-warning am-btn-sm am-fr">修改密码</button></Link>
                </div>
                 <hr/>
                 <p className="law">© 2016 Xiaomu.ren, Inc. Licensed under MIT license.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
   );
  }

}

module.exports = Login;
