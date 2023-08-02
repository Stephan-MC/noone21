<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyMail extends Mailable
{
    use Queueable, SerializesModels;
    public $token;
    public $mailData;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data){

        $this->mailData = $data;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->markdown('emails.user.verify_email')
            ->subject('NoOne 21 Registration Confirmation')
            ->with([
                'mailData' => $this->mailData
            ]);
    }
}
