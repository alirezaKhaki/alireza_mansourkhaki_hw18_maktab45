$(function() {

    $('body').on('click', '#register', function() {
        const username = $('#username').val()
        const password = $('#password').val()
        if (username.length < 3 || username.length > 20) {
            return alert("username length must be between 3-20")
        }
        if (password.length < 3 || password.length > 20) {
            return alert("password length must be between 3-20")
        }
        const newUser = {
            username: username,
            password: password
        }


        $.ajax({
            type: "POST",
            url: "/api/register",
            data: newUser,
            success: function(data) {

                if (data.msg === 'success') {
                    alert('register successfull you will now redirect to login page')

                    window.location.href = '/api/login'


                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (errorThrown) {
                    alert('user already exist')
                }

            }

        });
    })
});