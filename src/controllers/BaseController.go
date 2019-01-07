package controllers

import (
      "github.com/astaxie/beego"
      "models"
)

type BaseController struct {
      beego.Controller
}

type LoginSuccBean struct {
      Code int
      Message string
      User models.User
}
type LoginErrorBean struct {
      Code int
      Message string
}
type ErrorBean struct {
      Code int
      Message string
} 



//
//func ()  {
//
//}



