package routers

/**
http://www.17sucai.com/pins/29921.html 书籍的展示网页
 */
import (
	"github.com/astaxie/beego"
	"controllers"
)

func init() {
	beego.Router("/main.html", &controllers.MainController{}, "Get:Home")
	beego.Router("/home", &controllers.MainController{}, "Get:Home")
	beego.Router("/home/main", &controllers.MainController{}, "Get:Book")
	beego.Router("/user/register", &controllers.ManagerUserController{}, "*:RegisterUser")
	beego.Router("/user/user.html", &controllers.ManagerUserController{}, "*:UserPage")
	beego.Router("/user/update", &controllers.ManagerUserController{}, "Post:UpdateUser")
	beego.Router("/user/userdate", &controllers.ManagerUserController{}, "Post:GetUserDate")
	beego.Router("/user/login", &controllers.LoginController{}, "Post:Login")
	beego.Router("/user/login", &controllers.LoginController{}, "Get:LoginPage")
	beego.Router("/user/loginout", &controllers.LoginController{}, "*:LoginOut")
	/**
	获取书籍分类
	 */
	beego.Router("/book/sort", &controllers.BookManagerController{}, "Get:ListSort")
	beego.Router("/book/addsort", &controllers.BookManagerController{}, "Post:AddBookSort")
	beego.Router("/book/delete", &controllers.BookManagerController{}, "Post:DeleteBookSort")
	beego.Router("/book/update", &controllers.BookManagerController{}, "Post:Update")
	beego.Router("/book/manager", &controllers.BookManagerController{}, "Get:ManagerBookBorrow")
	beego.Router("/book/giveback", &controllers.BookManagerController{}, "Get:ManagerBookBack")
	/**
	用户管理
	 */
	beego.Router("/userRole", &controllers.UserRoleManagerController{}, "Get:UserRole")
	beego.Router("/userRole/addRole", &controllers.UserRoleManagerController{}, "Post:AddRole")
}
