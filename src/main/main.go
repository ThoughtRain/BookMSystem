package main

import (
	"github.com/astaxie/beego"
	"models"
	_"routers"
)
func main()  {
	models.Init()
//	s:=models.GetBookList()
//	fmt.Println(s[0],s[1],s[2])
//models.AddSort(100001,"文史类")
	beego.Run()

}
