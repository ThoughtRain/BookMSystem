package models

import "github.com/astaxie/beego/orm"

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
func GetUserList() ([]*User) {
	var userList []*User
	orm.NewOrm().QueryTable("user").All(&userList)
	return userList
}
