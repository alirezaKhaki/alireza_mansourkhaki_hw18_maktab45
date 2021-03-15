$(function() {
    $('body').on('click', '#signup', function() {
        window.location.href = '/api/register'
    })
    $('body').on('click', '#register', function() {
        const username = $('#username').val()
        const password = $('#password').val()
        if (username.length === 0 || password.length === 0) {
            return $('.modal-body').html(''), $('.modal-body').html('please fill the inputs'), $("#triger").click();
        }

        const newUser = {
            username: username,
            password: password
        }


        $.ajax({
            type: "POST",
            url: "/api/login",
            data: newUser,
            success: function(data) {
                console.log(data.msg);
                if (data.msg === 'login sucssesfull') {

                    $('.modal-body').html(''), $('.modal-body').html('login successfull you will now redirect to your dashboard'), $("#triger").click();
                    setTimeout(function() { window.location.href = '/api/login' }, 3000);



                } else if (data.msg === 'incorrect username or password') {
                    $('.modal-body').html('')
                    $('.modal-body').html('incorrect username or password')
                    $("#triger").click();
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