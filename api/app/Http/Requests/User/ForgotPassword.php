<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPassword extends FormRequest{

    public function authorize(){
        return true;
    }

    public function rules(){
        return [
            'email' => 'required|exists:users,email,deleted_at,NULL',
        ];
    }
}
