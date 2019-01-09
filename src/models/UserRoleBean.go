package models

import "github.com/astaxie/beego/orm"

type UserRole struct {
	Id              int
	RoleName        string
	RoleDescription string
}

func SaveUserRole(roleName string, roleDescription string) (int64, error) {
	role := UserRole{RoleName: roleName, RoleDescription: roleDescription}
	num, err := orm.NewOrm().Insert(&role)
	return num, err
}
func GetUserRoleList() ([]*UserRole) {
	var userRole []*UserRole
	orm.NewOrm().QueryTable("user_role").All(&userRole);
	return userRole;
}

func UpdateById(id int, role UserRole) (int64, error) {
	return orm.NewOrm().QueryTable("user_role").Filter("id", id).Update(orm.Params{
		"id":               role.Id,
		"role_name":        role.RoleName,
		"role_description": role.RoleDescription,
	})
}
func DeleteById(id int) (int64, error) {
	return orm.NewOrm().QueryTable("user_role").Filter("id", id).Delete()
}
