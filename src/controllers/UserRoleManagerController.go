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
func (controller *UserRoleManagerController) UpdateRole() {
	Id, _ := controller.GetInt("Id")
	roleName := controller.GetString("RoleName")
	roleDes := controller.GetString("RoleDes")
	println("修改数据", Id, roleDes, roleDes)
	models.UpdateById(Id, models.UserRole{RoleName: roleName, RoleDescription: roleDes})
	controller.Data["json"] = ErrorBean{Code: 200, Message: "成功"}
	controller.ServeJSON()
}
func (controller *UserRoleManagerController) DeleteRole() {
	Id, _ := controller.GetInt("Id")
	println("ID的是", Id);
	models.DeleteById(Id)
	controller.Data["json"] = ErrorBean{Code: 200, Message: "成功"}
	controller.ServeJSON()
}
