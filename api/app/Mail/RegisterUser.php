<?php

namespace App\Mail;

use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RegisterUser extends Mailable
{
    use Queueable, SerializesModels;

    protected $user = null;

    public function __construct(User $user){
        $this->$user = $user;
    }

    public function build(){
        $this->markdown('emails.user.register')
            ->subject('NoOne 21 Registration Confirmation')
            ->with([
                'user_object' => $this->user
            ]);
    }
}
