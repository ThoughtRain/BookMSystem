var usermanger = {
    /**
     * 添加用户操作
     */
    addUser: function () {
        $("#btn_user_add").on("click", function () {
            swal({
                title: '增加权限',
                html:
                '<div class="row user">\n' +
                '<div class="col-md">\n' +
                '  <div class="tab-content">\n' +
                '    <div class="tab-pane active" id="user-settings">\n' +
                '      <div class="tile user-settings">\n' +
                '        <form>\n' +
                '          <div class="row mb-4">\n' +
                '            <div class="col-md">\n' +
                '              <label style="float: left">添加权限</label>\n' +
                '              <input id="booksrot" class="form-control" autofocus="autofocus" placeholder="添加添加权限" type="text" >\n' +
                '            </div>\n' +
                '          </div>\n' +
                '          <div class="form-group">\n' +
                '            <label style="float: left"  for="exampleTextarea">权限说明</label>\n' +
                '            <textarea class="form-control" id="srotdes" placeholder="权限说明" rows="3"></textarea>\n' +
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


            })
            $("#btn_dialog_save").click(function () {
                var booksrot = $("#booksrot").val();
                var srotdes = $("#srotdes").val();
                if (isEmptyRole(booksrot)) {
                    Toast("请输入类名")
                    swal.close()
                    return false
                }
                if (isEmptyRole(srotdes)) {
                    Toast("请输简介")
                    swal.close()
                    return false
                }

                $.ajax({
                    type: 'Post',
                    url: '/userRole/addRole',
                    data: {
                        "roleName": booksrot,
                        "roleDes": srotdes
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

        })


    }, queryUserList: function (userList) {
        /**
         * 显示uerlist
         */


        $("#role_table").bootstrapTable({ // 对应table标签的id
            striped: true,//隔行变色
            showColumns: false,// 列
            pagination: true, //分页
            paginationPreText: '上一页',
            paginationNextText: '下一页',
            pageList: [5, 10, 25, 50, 100],
            search: false, //显示搜索框
            data: userList,
            columns: [{
                field: 'no',
                title: '编号',
                align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'User.UserName',
                title: '角色',
                align: 'center',
            }, {
                field: 'User.UserPhone',
                title: '电话号码'
                , align: 'center',
            }, {
                field: 'RoleName',
                title: '角色'
                , align: 'center',
            }
                , {
                    field: 'User.UserPhone',
                    title: '电话号码'
                    , align: 'center',
                }
            ]
        })
    }

}