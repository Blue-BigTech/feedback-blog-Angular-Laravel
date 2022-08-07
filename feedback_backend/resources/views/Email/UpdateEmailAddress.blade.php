@component('mail::message')
# Introduction

The body of your message.

<h2>Your verification code is</h2>

{{$token}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
