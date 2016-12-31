require('./../css/change.less');
var React = require('react');
var constant = require('./constant');
var Link = require('react-router').Link;

class Change extends React.Component {

  constructor() {
    super();
    this.state = {email: '', passwordOld: '',passwordNew:'',passwordConfirm:'',unameHelp: "",upwdHelp: "",unewHelp:"",comHelp:""};
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleOld(event) {
    this.setState({
      passwordOld: event.target.value
    });
  }

  handleNew(event) {
    this.setState({
      passwordNew: event.target.value
    });
  }

  handleConfirm(event) {
    this.setState({
      passwordConfirm: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var base_URL = constant.host;
    var data = {
      email : this.state.email,
      password_old : this.state.passwordOld,
      password_new : this.state.passwordNew,
      password_confirm : this.state.passwordConfirm,
    }

    var status = true;

    if(this.state.email === ""||this.state.email === null){
      this.setState({
        unameHelp: "* 用户名不能为空"
      })
      status = false;
    }else if(this.state.passwordOld === ""||this.state.passwordOld === null){
      this.setState({
        unameHelp: "",
        upwdHelp: "* 密码不能为空"
      })
       status = false;
    }
    else if(this.state.passwordNew === ""||this.state.passwordNew=== null){
      this.setState({
        unameHelp:"",
        upwdHelp: "",
        unewHelp:"新密码不能为空"
      });
       status = false;
    }else if(this.state.passwordConfirm != this.state.passwordNew){
      this.setState({
        unameHelp:"",
        upwdHelp: "",
        unewHelp:"",
        comHelp:"两次密码不一致"
      });
       status = false;
    }
    else{
      this.setState({ //清除help-block提示文字
        unameHelp: "",
        upwdHelp: "",
        unewHelp:"",
        comHelp:""
      });
    }

    if(status) {
      $.ajax({
        type: "POST",
        url: base_URL + "/password/change",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
          window.location.href = "/";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#errormsg').text('用户名或密码错误!');
        }
      })
    }
  }

  render() {
    return (
      <div className="change ">
        <div className="base_header am-text-center">
          <div className="am-g">
            <h1>Quebec<span className="base_span">| 修改密码</span></h1>
          </div>
        </div>
        <div id="errormsg" className="am-g-fixed am-center am-text-center errormsg">
        </div>
        <div className="am-g-fixed am-center ">
          <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
            <form onSubmit={this.handleSubmit.bind(this)} className="am-form" data-am-validator>
                <p className="info">请输入用户名<span></span></p>
                <div className="acc-wrapper"><input className="account am-form-field am-radius" placeholder="请您输入用户名/手机/邮箱" defaultValue={this.state.email} pattern='^([a-zA-Z0-9_][\w/.]+@\w+(\.[a-z]{2,3}){1,2}|[a-z][a-z0-9_]{3,11})$' onChange={this.handleEmail.bind(this)} required/></div>
                <span className="am-g-fixed am-center errormsg">{this.state.unameHelp}</span>
                <p className="info">旧密码<span></span></p>
                <div className="acc-wrapper"><input type="password" className="account" placeholder="请您输入旧密码" pattern='^[\w]{2,10}$' defaultValue={this.state.passwordOld} onChange={this.handleOld.bind(this)}/></div>
                <span  className="am-g-fixed am-center errormsg">{this.state.upwdHelp}</span>
                <p className="infoNew">请输入新密码<span></span> </p>
                <div className="acc-wrapper"><input type="password" className="account" placeholder="请您输入新密码" defaultValue={this.state.passwordNew} onChange={this.handleNew.bind(this)}/></div>
                <span className="am-g-fixed am-center errormsg">{this.state.unewHelp}</span>
                <p className="info">请再次输入新密码<span></span> </p>
                <div className="acc-wrapper"><input type="password" className="account" placeholder="确定新密码" defaultValue={this.state.passwordConfirm} onChange={this.handleConfirm.bind(this)}/></div>
                <span className="am-g-fixed am-center errormsg">{this.state.comHelp}</span>
                <br/>
                <div className="submit"><button className="am-btn am-btn-success am-btn-block">修改密码</button></div> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Change;
