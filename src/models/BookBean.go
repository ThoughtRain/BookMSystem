package models

import "github.com/astaxie/beego/orm"

/** TODO BookPub 出版社 BookSort 书籍分类 BookRecord 登记时间 BookPic封面 BookNum 书籍是否在书架上
 */
type Book struct {
	Id          int
	BookId      string
	BookName    string
	BookAuthor  string
	BookPub     string
	BookSort    int
	BookRecord  string
	BookPic     string
	BookNum     int
	BookAddress string
	BookStatus  string
}

func GetBookList() ([]*Book) {
	var book []*Book
	orm.NewOrm().QueryTable("book").All(&book)
	return book
}

/**
书本分类
 */
type BookSort struct {
	Id              int
	SortId          int
	SortMessage     string
	SortDescription string
}

func GetSortList() ([]*BookSort) {
	var sort []*BookSort
	orm.NewOrm().QueryTable("book_sort").All(&sort)
	return sort
}
func sortList(page int, row int) ([]*BookSort) {
	var sort []*BookSort
	///**分页的逻辑；
	// */
	//orm.NewOrm().QueryTable("book_sort").Offset()
	return sort

}

func AddSort(sortMessage string, sortDes string) (int64, error) {
	sort := BookSort{SortDescription: sortDes, SortMessage: sortMessage}
	return orm.NewOrm().Insert(&sort)
}
func UpdateSort(id int, sort BookSort) (int64, error) {
	return orm.NewOrm().QueryTable("book_sort").Filter("id", id).Update(orm.Params{
		"sort_id":          sort.Id,
		"sort_message":     sort.SortMessage,
		"sort_description": sort.SortDescription,
	})
}

func Delete(id int) (int64, error) {
	return orm.NewOrm().QueryTable("book_sort").Filter("id", id).Delete()
}
