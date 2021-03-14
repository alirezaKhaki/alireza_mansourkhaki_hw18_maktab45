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

                if (data.msg === 'sucsses') {
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
    $('body').on('click', '#pass_save', function() {
        const id = $('#id').val();
        const pass = $('#old_pass').val();
        const new_password = $('#new_pass').val();

        const new_pass = {
            _id: id,
            password: pass,
            new_password: new_password
        }
        $.ajax({
            type: "POST",
            url: "/api/dashboard/password",
            data: new_pass,
            success: function(data) {

                if (data.msg === 'sucsses') {
                    alert('your password sucssesfully changed you need to login again')

                    window.location.href = '/api/login'


                } else if (data.msg === 'wrong password') {
                    alert('wrong password')
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(textStatus);
                console.log(XMLHttpRequest);

            }
        })
    });
    $('body').on('click', '#pass_close', function() {
        $('.password').css({ 'display': 'none' })
    });
});