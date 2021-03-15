$(function() {

    $('body').on('click', '#register', function() {
        const username = $('#username').val();
        const password = $('#password').val();
        const email = $('#email').val();
        const number = $('#number').val();


        if (username.length < 3 || username.length > 20) {

            return $('.modal-body').html(''), $('.modal-body').html('username length must be between 3-20'), $("#triger").click();
        }
        if (password.length < 3 || password.length > 20) {
            return $('.modal-body').html(''), $('.modal-body').html('password length must be between 3-20'), $("#triger").click();
        }
        const newUser = {
            username: username,
            password: password,
            email: email,
            phone: number
        }


        $.ajax({
            type: "POST",
            url: "/api/register",
            data: newUser,
            success: function(data) {

                if (data.msg === 'success') {
                    $('.modal-body').html(''), $('.modal-body').html('signup successfull you will now redirect to login page'), $("#triger").click();
                    setTimeout(function() { window.location.href = '/api/login' }, 3000);

                }
            },
            error: function(err) {

                return $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();
            }

        });
    })
});