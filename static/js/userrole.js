var userRole = {

    addUserRole: function (url, mapObj, callBack, callError) {
        $("#btn_role_add").on("click", function () {
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
    }

    ,
    queryUserRole: function (url, mapObj, callBack, callError) {

    }

}

function isEmptyRole(obj) {
    if (obj == null || obj == undefined || obj == "" || obj.length == 0) {
        return true
    } else {
        return false;
    }
}