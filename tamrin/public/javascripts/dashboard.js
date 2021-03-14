$(function() {
    $('body').on('click', '#edit', function() {
        $('.edit').css({ 'display': 'block' })
    });
    $('body').on('click', '#close', function() {
        $('.edit').css({ 'display': 'none' })
    });
    $('body').on('click', '#save', function() {
        const id = $('#id').val();
        const username = $('#username').val();
        const email = $('#email').val();
        const number = $('#number').val();

        const user_edit = {
            _id: id,
            username: username,
            email: email,
            phone: number
        }
        $.ajax({
            type: "POST",
            url: "/api/dashboard/edit",
            data: user_edit,
            success: function(data) {

                if (data.msg === 'success') {
                    alert('your information edited sucssesfully you need to login again')

                    window.location.href = '/api/login'


                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
                console.log(XMLHttpRequest);

            }
        })
    });
    $('body').on('click', '#change', function() {
        $('.password').css({ 'display': 'block' })
    });
    $('body').on('click', '#pass_close', function() {
        $('.password').css({ 'display': 'none' })
    });
});