(function () {
    "use strict";

    var treeviewMenu = $('.app-menu');

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
        event.preventDefault();
        $('.app').toggleClass('sidenav-toggled');
    });

    // Activate sidebar treeview toggle
    $("[data-toggle='treeview']").click(function (event) {
        event.preventDefault();
        if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
        }
        $(this).parent().toggleClass('is-expanded');
    });

    // Set initial active toggle
    $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

    //Activate bootstrip tooltips
    $("[data-toggle='tooltip']").tooltip();

})();
var comm = {
    /**
     * 登录
     * @param url
     * @param name
     * @param password
     * @param success
     * @param error
     * @returns {boolean}
     * @constructor
     */
    Login: function (url, name, password) {
        // String
        if (name == "" || name == null || name == undefined) { // "",null,undefined
            errorAlert("消息提示！", "姓名不能为空")
            return false
        }
        if (password == "" || name == null || password == undefined) { // "",null,undefined
            errorAlert("消息提示！", "密码不能为空")
            return false
        }
        $.ajax({
            type: 'Post',
            url: url,
            data: {
                "name": name,
                "password": password
            },
            async: false,
            success: function (res) {
                if (res.Code == 200) {
                    goPage("http://192.168.2.11:8081/home")
                }
                Toast(res.Message)
            },
            error: function (res) {
                Toast(res.Message)
            }
        });

    },
    /**
     * 退出登录
     * @param url
     * @param token
     * @param success
     * @param error
     * @constructor
     */
    LoginOut: function (url, token, success, error) {

        $.ajax({
            type: 'Post',
            url: u,
            data: {"token": name},
            success: function (res) {
                // success(res)
                Toast(res.message)
            },
            error: function (res) {
                //error(res);
                Toast(res.message)
            }
        });

    }, error: function (title, message) {
        errorAlert(title, message)
    }, success: function (title, message) {
        successAlert(title, message)
    }, showToastMessage: function (message) {
        Toast(message)
    }, setDefaultsSex(sex) {
        $("select").val(sex);
    }

}

function errorAlert(title, message) {
    swal(
        title,
        message,
        'error'
    )
}

function successAlert(title, message) {
    swal(
        title,
        message,
        'success'
    )
}

function goPage(url) {
    $(window).attr('location', url);
}

/**
 * 类似与Android上的Toast
 * @param message
 * @constructor
 */
function Toast(message) {
    $.notify({
        title: "提示 : ",
        message: message,
        icon: 'glyphicon glyphicon-warning-sign'
    }, {
        type: "warning"
    });
    setTimeout(function () {
        $.notifyClose();
    }, 2000);
}

var user = {
    initSetting: function () {
        /**
         * user page
         */
        $("#btn_save").hide();
        $("#btn_sex").hide();
        var sex = $("#btn_sex").val();
        comm.setDefaultsSex(sex)
        $("#btn_update").click(function () {
            $("#btn_save").show();
            $("#btn_update").hide();
            $(".form-control").attr('disabled', false);
            return false
        })

        $("#birthday").datepicker({
            language: 'zh-CN',
            format: "yy/mm/dd",
            autoclose: true,
            todayHighlight: true
        });
    }, saveUser: function (u) {
        $("#btn_save").click(function () {
            var name = $("#username").val();
            var emile = $("#emile").val();
            var phone = $("#phone").val();
            var birthday = $("#birthday").val();
            var sex = $('#exampleSelect1 option:selected').val();//选中的值
            $.ajax({
                type: 'Post',
                url: u,
                data: {
                    "name": name,
                    "emile": emile, "phone": phone, "birthday": birthday, "sex": sex
                },
                async: false
                , success: function (res) {
                    // success(res)
                    successAlert("提示", "保存成功")
                    $("#btn_save").hide();
                    $("#btn_update").show();
                    $(".form-control").attr('disabled', true);
                },
                error: function (res) {
                    //error(res);
                    errorAlert("提示", "上传失败")
                }
            });

            return false
        });


    }

}


var bookSort = {
    selectAllBox: function (json) {

        for (var index = 0; index < json.length; index++) {
            var sort = json[index]
            $("#book_sort_list").append(
                "" +
                "<tr>\n" +
                "<td>\n" +
                "<input  class=\"form-check-input\" type=\"checkbox\">\n" +
                "</td>\n" +
                "<td>" + sort.Id + "</td>\n" +
                "<td>" + sort.SortMessage + "</td>\n" +
                "<td>" + sort.SortDescription + "</td>\n" +
                "<td>\n" +
                "\n" +
                "<button id='" + sort.Id + "' class=\"btn btn-danger btn-sm\"><i class=\"fa fa-fw fa-lg fa-check-circle\"></i>修改</button>\n" +
                "<button id='" + sort.Id + "' class=\"btn btn-secondary btn-sm\" type=\"submit\"><i class=\"fa fa-fw fa-lg fa-times-circle\"></i>删除</button>\n" +
                "</td>\n" +
                "</tr>"
            );

        }

        $('button.btn-danger').on("click", function () {      //只需要找到你点击的是哪个ul里面的就行
            var id = $(this).attr('id');
            var sort = json[id - 1];

            swal({
                title: '修改分类',
                html:
                '<div class="row user">\n' +
                '<div class="col-md">\n' +
                '  <div class="tab-content">\n' +
                '    <div class="tab-pane active" id="user-settings">\n' +
                '      <div class="tile user-settings">\n' +
                '        <form>\n' +
                '          <div class="row mb-4">\n' +
                '            <div class="col-md">\n' +
                '              <label style="float: left">图书分类</label>\n' +
                '              <input id="book_srot" class="form-control" autofocus="autofocus" placeholder="添加图书分类" type="text" >\n' +
                '            </div>\n' +
                '          </div>\n' +
                '          <div class="form-group">\n' +
                '            <label style="float: left"  for="exampleTextarea">分类说明</label>\n' +
                '            <textarea  id="srot_des_book" class="form-control" placeholder="分类说明" rows="3" ></textarea>\n' +
                '          </div>\n' +
                '        </form>\n' +
                ' <div class="row mb-10">\n' +
                '                            <div class="col-md-12">\n' +
                '                                <button id="btn_dialog_update" class="btn btn-primary btn-sm" type="button "><i class="fa fa-fw fa-lg fa-check-circle"></i> 确定修改</button>\n' +
                '                                <button id="btn_dialog_cancel" class="btn btn-secondary btn-sm" type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i> 取消</button>\n' +
                '                            </div>\n' +
                '                        </div>' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>',
                showCloseButton: false,
                showConfirmButton: false,
                showCancelButton: false,
                focusCancel: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> 确定修改',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>取消',
                allowOutsideClick: false,
            })
            $("#srot_des_book").val(sort.SortDescription);
            $("#book_srot").val(sort.SortMessage);
            $("#btn_dialog_cancel").click(function () {
                swal.close()
            })
            $("#btn_dialog_update").click(function () {
                var booksrot = $("#book_srot").val();
                var srotdes = $("#srot_des_book").val();
                if (isEmpty(booksrot)) {
                    Toast("请输入类名")
                    return false
                }
                if (isEmpty(srotdes)) {
                    Toast("请输简介")
                    return false
                }
                var map = new Map({
                    "id": id,
                    "sortname": booksrot,
                    "sortdes": srotdes
                });
                http.httpPostRequest('/book/update', map, function (success) {
                    swal.close()
                    window.location.reload()
                    successAlert("提示", "修改成功")
                }, function (err) {
                    swal.close()
                    errorAlert("提示", "上传失败")
                })
            })


        });
        $('#btn_dialog_cancel').on("click", function () {
            var id = $(this).attr('id');
            var sort = json[id - 1];
            Swal({
                title: '提示',
                text: "是否删除这条数据",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        type: 'Post',
                        url: '/book/delete',
                        data: {
                            "id": id,
                        },
                        async: false
                        , success: function (res) {

                            swal.close()
                            window.location.reload()
                            successAlert("提示", "删除成功")

                        },
                        error: function (res) {
                            //error(res);
                            swal.close()
                            errorAlert("提示", "上传失败")
                        }
                    });

                }
            })

        })

        /* $("#book_sort_list").on("click",function(){      //只需要找到你点击的是哪个ul里面的就行

             Toast("点击了");
         });*/
        $("#checkbox_all").change(function () {
            var t = $("#checkbox_all").is(':checked')
            if (t) {
                $(".form-check-input").prop("checked", "checked");
            } else {
                $(".form-check-input").prop("checked", "");
            }
        });
        var mapObj = new Map()
        $(".formcheck--input").change(function (e) {

            for (var index = 1; index <= json.length; index++) {
                t = $("#" + index).is(':checked')
                mapObj.set(index, t)
            }
            var xx = true;
            console.log(mapObj);
            try {

                mapObj.forEach(function (value, key, map) {
                    console.log(value);
                    if (!value) {
                        throw  new Error();
                    } else {
                        xx = true;
                    }
                });

            } catch (e) {
                xx = false;
            }

            if (!xx) {
                $("#checkbox_all").prop("checked", "");
            } else {
                $("#checkbox_all").prop("checked", "checked");
            }
        })
        $("#btn_add").click(function () {
            swal({
                title: '图书分类',
                html:
                '<div class="row user">\n' +
                '<div class="col-md">\n' +
                '  <div class="tab-content">\n' +
                '    <div class="tab-pane active" id="user-settings">\n' +
                '      <div class="tile user-settings">\n' +
                '        <form>\n' +
                '          <div class="row mb-4">\n' +
                '            <div class="col-md">\n' +
                '              <label style="float: left">图书分类</label>\n' +
                '              <input id="booksrot" class="form-control" autofocus="autofocus" placeholder="添加图书分类" type="text" >\n' +
                '            </div>\n' +
                '          </div>\n' +
                '          <div class="form-group">\n' +
                '            <label style="float: left"  for="exampleTextarea">分类说明</label>\n' +
                '            <textarea class="form-control" id="srotdes" placeholder="分类说明" rows="3"></textarea>\n' +
                '          </div>\n' +
                '        </form>\n' +
                ' <div class="row mb-10">\n' +
                '                            <div class="col-md-12">\n' +
                '                                <button id="btn_dialog_save" class="btn btn-primary btn-sm" type="button "><i class="fa fa-fw fa-lg fa-check-circle"></i> 保存</button>\n' +
                '                                <button id="btn_dialog_cancel" class="btn btn-secondary btn-sm" type="button"><i class="fa fa-fw fa-lg fa-check-circle"></i> 取消</button>\n' +
                '                            </div>\n' +
                '                        </div>' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>',
                showCloseButton: false,
                showConfirmButton: false,
                showCancelButton: false,
                focusCancel: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> 确定',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>取消',
                allowOutsideClick: false,
            })
            $("#btn_dialog_save").click(function () {
                var booksrot = $("#booksrot").val();
                var srotdes = $("#srotdes").val();
                if (isEmpty(booksrot)) {
                    Toast("请输入类名")
                    return false
                }
                if (isEmpty(srotdes)) {
                    Toast("请输简介")
                    return false
                }
                $.ajax({
                    type: 'Post',
                    url: '/book/addsort',
                    data: {
                        "sortname": booksrot,
                        "sortdes": srotdes
                    },
                    async: false
                    , success: function (res) {
                        // success(res)
                        swal.close()
                        window.location.reload()
                        successAlert("提示", "保存成功")

                    },
                    error: function (res) {
                        //error(res);
                        swal.close()
                        errorAlert("提示", "上传失败")
                    }
                });

            })
            $("#btn_dialog_cancel").click(function () {
                swal.close()
            })

            return false
        })
        $("#btn_delete").click(function () {
            if (mapObj != null && mapObj.size == 0) {
                Toast("没有选中数据")
                return;
            }
            Swal({
                title: '提示：',
                text: "是否删除选中数据",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '删除',
                cancelButtonText: '取消'
            }).then((result) => {
                if (result.value) {
                    Swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
            return false
        })
    }
    ,

}

function isEmpty(text) {
    if (text !== null || text !== undefined || text !== '') {
        return false;
    }
    return true;
}

function showAddWindow() {
    sweetAlert();
}
