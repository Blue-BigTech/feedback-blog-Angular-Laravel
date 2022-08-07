@component('mail::message')
# Change password request

click on the button bellow to change your password.

@component('mail::button', ['url' => 'https://lionfish-app-qnsk2.ondigitalocean.app/#/reset-password-response?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
Gorm Startup
@endcomponent
