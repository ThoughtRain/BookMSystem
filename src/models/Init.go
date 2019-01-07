package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_"github.com/go-sql-driver/mysql"
	"github.com/astaxie/beego/plugins/cors"
)

func Init()  {
	dbhost := beego.AppConfig.String("db.host")
	dbport := beego.AppConfig.String("db.port")
	dbuser := beego.AppConfig.String("db.user")
	dbpassword := beego.AppConfig.String("db.password")
	dbname := beego.AppConfig.String("db.name")
//	timezone := beego.AppConfig.String("db.timezone")
	if dbport == "" {
		dbport = "3306"
	}
	dsn := dbuser + ":" + dbpassword + "@tcp(" + dbhost + ":" + dbport + ")/" + dbname + "?charset=utf8"
	// fmt.Println(dsn)

	//if timezone != "" {
	//	dsn = dsn + "&loc=" + url.QueryEscape(timezone)
	//}
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", dsn)
	orm.RegisterModel(new (User),new (Book),new (BorrowBean),new(ReturnTable),new(BookSort),new(UserRole))
	orm.RunSyncdb("default", false, true)
	orm.RunCommand()
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin"},
		AllowCredentials: true,
	}))
	if beego.AppConfig.String("runmode") == "dev" {
		orm.Debug = true
	}
	beego.BConfig.WebConfig.Session.SessionOn = true
	setSessionCookieTime(2*1000*60)
	}
func TableName(name string) string {
	return beego.AppConfig.String("db.prefix") + name
}
/**
  TODO  设置session 超时时间
 */
func setSessionCookieTime(time int){
	beego.BConfig.WebConfig.Session.SessionCookieLifeTime=time
}


