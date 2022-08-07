@component('mail::message')
# Change password request

click on the button bellow to verify your email address.

@component('mail::button', ['url' => 'https://lionfish-app-qnsk2.ondigitalocean.app/#/email-verified?token='.$token])
Click Here
@endcomponent

Thanks,<br>
Gorm Startup
@endcomponent
