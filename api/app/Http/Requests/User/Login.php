<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class Login extends FormRequest{

    public function authorize(){
        return true;
    }

    public function rules(){

        return [
            'email' => 'required|exists:users,email,deleted_at,NULL',
            'password' => 'required|min:6',
            'role_id' => 'required|numeric|between:1,4'
        ];
    }
}
