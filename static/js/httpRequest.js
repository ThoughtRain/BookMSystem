var http = {

    httpPostRequest: function (url, mapObj, callBack,callError) {
        $.ajax({
            type: 'Post',
            url: url,
            data: mapObj,
            async: false
            , success: function (res) {
                callBack.success(res);

            },
            error: function (res) {
                callError.error(res)
            }
        });
    },
    httpGetRequest: function (url, mapObj, callBack,callError) {
        $.ajax({
            type: 'Get',
            url: url,
            data: mapObj,
            async: false
            , success: function (res) {
                callBack.success(res);

            },
            error: function (res) {
                callError.error(res)
            }
        });
    }
}