package controllers

import (
	"github.com/astaxie/beego"
	"fmt"
	"models"
)

type MainController struct {
	beego.Controller
}

/**

 */

func (controller *MainController) Home() {
	sc := controller.GetSession("login")
	fmt.Println(sc)
	if (sc != "") {
		controller.Data["title"] = "我的title"
		controller.Data["url"] = "http://127.1.1.1:8081"
		controller.Data["page_home"] = "我的主页"
		controller.Layout = "main.html"
		controller.TplName = "main_index.html"
	} else {
		controller.TplName = "login.html"
	}

}
func (controller *MainController) Book() {
	bookList := models.GetBookList()
	controller.Data["booklist"] = bookList
	controller.Data["title"] = "我的新的体贴了"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "书本管理"
	controller.Layout = "main.html"
	controller.TplName = "addbook.html"
}
