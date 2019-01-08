package controllers

import "models"

type UserRoleManagerController struct {
	BaseController
}

func (controller *UserRoleManagerController) UserRole() {
	var rolelist = models.GetUserRoleList()
	controller.Data["rolelist"] = rolelist
	controller.Data["title"] = "用户角色"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "用户角色"
	controller.Layout = "main.html"
	controller.TplName = "user_role.html"
}
func (controller *UserRoleManagerController) AddRole() {
	roleName := controller.GetString("roleName")
	roleDes := controller.GetString("roleDes")
	models.SaveUserRole(roleName, roleDes)
	controller.Data["json"] = ErrorBean{Code: 200, Message: "成功"}
	controller.ServeJSON()
}
