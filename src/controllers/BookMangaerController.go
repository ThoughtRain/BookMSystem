package controllers

import models "models"

/**
图书管理界面
 */
type BookManagerController struct {
	BaseController
}

func (controller *BookManagerController) ListSort() {
	list := models.GetSortList()
	controller.Data["sortJson"] = list
	controller.Data["title"] = "图书分类"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "图书分类"
	controller.Layout = "main.html"
	controller.TplName = "booksort.html"
}
func (controller *BookManagerController) ManagerBookBorrow() {
	list := models.GetSortList()
	controller.Data["sortJson"] = list
	controller.Data["title"] = "借出图书"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "借出图书"
	controller.Layout = "main.html"
	controller.TplName = "managerBook.html"
}
func (controller *BookManagerController) ManagerBookBack() {
	list := models.GetSortList()
	controller.Data["sortJson"] = list
	controller.Data["title"] = "归还图书"
	controller.Data["url"] = "http://127.1.1.1:8081"
	controller.Data["page_home"] = "归还图书"
	controller.Layout = "main.html"
	controller.TplName = "managerBook.html"
}
func (controller *BookManagerController) Update() {
	sortname := controller.GetString("sortname")
	sortdes := controller.GetString("sortdes")
	id, _ := controller.GetInt("id", 0)
	booksort := models.BookSort{Id: id, SortMessage: sortname, SortId: id, SortDescription: sortdes}
	models.UpdateSort(id, booksort);
	controller.Data["json"] = ErrorBean{Code: 200, Message: "成功"}
	controller.ServeJSON()
}

func (controller *BookManagerController) DeleteBookSort() {
	id, _ := controller.GetInt("id", 0);
	models.Delete(id)
	controller.Data["json"] = ErrorBean{Code: 200, Message: "成功"}
	controller.ServeJSON()

}

func (controller *BookManagerController) AddBookSort() {
	sortname := controller.GetString("sortname")
	sortdes := controller.GetString("sortdes")
	models.AddSort(sortname, sortdes);
	controller.Data["json"] = ErrorBean{Code: 200, Message: "成功"}
	controller.ServeJSON()
}
