package controllers

import (
	"models"
	"fmt"
)

type ManagerUserController struct {
	BaseController
}

func (controller *ManagerUserController) UserPage() {
	//models.GetLoginUser()
	user, er := models.GetLoginUser("15708498417")
	if (er != nil) {

	}
	fmt.Println(user)
	controller.Data["username"] = user.UserName
	controller.Data["emile"] = user.UserEmile
	controller.Data["phone"] = user.UserPhone
	controller.Data["birthday"] = user.UserBirthday
	controller.Data["sex"] = user.UserSex
	controller.Data["title"] = "我的title"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "我的资料"
	controller.Layout = "main.html"
	controller.TplName = "page_user.html"
}

/**
注册新的用户
 */

func (controller *ManagerUserController) RegisterUser() {

}

/**
 修改用户信息
 */
func (controller *ManagerUserController) UpdateUser() {
	/**
	name,emile,phone,birthday,sex
	 */
	name := controller.GetString("name")
	emile := controller.GetString("emile")
	phone := controller.GetString("phone")
	birthday := controller.GetString("birthday")
	sex, err := controller.GetInt("sex")
	if (err != nil) {

	}
	fmt.Print("姓名："+name, "邮箱："+emile, "电话"+phone, "生日："+birthday, sex)
	user := new(models.User)
	user.Id = 1
	user.UserName = name
	user.UserBirthday = birthday
	user.UserEmile = emile
	user.UserPhone = phone
	user.UserSex = sex
	fmt.Print("打印参数：", user)
	code, err := models.SaveUserData(user)
	if (err != nil) {
		controller.Data["json"] = ErrorBean{Code: 300, Message: err.Error()}
		controller.ServeJSON()
		return
	}
	if (code != 0) {

	}
	controller.Data["json"] = ErrorBean{Code: 200, Message: "保存成功"}
	controller.ServeJSON()

}
func (controller *ManagerUserController) UserList() {
	var rolelist = models.GetUserRoleList()
	controller.Data["rolelist"] = rolelist
	controller.Data["title"] = "用户列表"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "用户角色"
	controller.Layout = "main.html"
	controller.TplName = "user_list.html"
}
func (controller *ManagerUserController) CreateUser() {

}
func (controller *ManagerUserController) GetUserDate() {

}
