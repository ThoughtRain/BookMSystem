var usermanger = {
    /**
     * 添加用户操作
     */
    addUser: function () {

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
            //    showRefresh: true,//显示刷新
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
                // , {
                //     field: 'User.UserPhone',
                //     title: '电话号码'
                //     , align: 'center',
                // }
            ]
        })
    }

}