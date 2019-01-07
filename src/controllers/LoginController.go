package controllers

import (
	"models"
)

type LoginController struct {
	BaseController
}


/**
   用户登录界面
 */
func (controller *LoginController) LoginPage()  {
        controller.TplName="login.html"
}
/**
登录接口登录后返回登录的信息
 */
func (controller *LoginController) Login()  {
	name:=controller.GetString("name")
    password:=controller.GetString("password")
    user,err:=models.GetLoginUser(name)

    if(err!=nil){
    	controller.Data["json"]= LoginErrorBean{Code:300,Message:"没有找到该用户"}
		controller.ServeJSON()
    	return
	}
    if(password==user.UserPassword){
      //登录成功
        controller.SetSession("login","logined")
		controller.Data["json"]= LoginErrorBean{Code:200,Message:"登录成功"}
		controller.ServeJSON()
		return
	}else{
		controller.Data["json"]= LoginErrorBean{Code:300,Message:"密码错误"}
		controller.ServeJSON()
	}


}
/**
退出登录
 */
func (controller *LoginController) LoginOut()  {
	 controller.DelSession("login")
	 controller.TplName="login.html"
}








