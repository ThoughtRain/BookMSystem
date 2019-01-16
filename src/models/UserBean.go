package models

import (
	"github.com/astaxie/beego/orm"
	"fmt"
)

/**
   TODO UserName用户的姓名 UserBirthday 用户生日 UserId用户id
     UserRole 用户权限 UserSex 用户性别 UserPro 用户专业 UserDegree用户学位
     UserIntegrity 用户诚信等级
 */
type User struct {
	Id            int
	UserId        string
	UserName      string
	UserPassword  string
	UserEmile     string
	UserPhone     string
	UserBirthday  string
	UserRole      int
	UserSex       int
	UserPro       string
	UserDegree    string
	UserIntegrity int
	UserPic       string
}
type UserQuery struct {
	User            User
	RoleName        string
	RoleDescription string
}

func GetLoginUser(name string) (user User, er error) {
	err := orm.NewOrm().QueryTable("user").Filter("user_id", name).One(&user)
	return user, err
}
func SaveUserData(user *User) (int64, error) {
	num, err := orm.NewOrm().QueryTable("user").Filter("user_id", "15708498417").Update(orm.Params{
		"user_name": user.UserName, "user_emile": user.UserEmile, "user_sex": user.UserSex, "user_birthday": user.UserBirthday, "user_phone": user.UserPhone,
	})
	return num, err
}
func GetUserList() ([]UserQuery) {
	var orm = orm.NewOrm()
	var users []*User
	orm.QueryTable("user").All(&users)
	var userList = make([]UserQuery, 0, len(users))
	for _, user := range users {
		var userQuery UserQuery
		var userRole UserRole
		orm.QueryTable("user_role").Filter("id", user.UserRole).One(&userRole)
		fmt.Print("Id:开始了, RoleName: %d, RoleDescription: %s\n", userRole.Id, userRole.RoleName, userRole.RoleDescription)
		userQuery.User.UserName = user.UserName
		userQuery.User.UserPhone = user.UserPhone
		userQuery.User.UserSex = user.UserSex
		userQuery.RoleName = userRole.RoleName
		userQuery.RoleDescription = userRole.RoleDescription
		userList = append(userList, userQuery)
	}

	return userList
}
