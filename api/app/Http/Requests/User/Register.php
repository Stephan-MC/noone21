<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class Register extends FormRequest{

    public function authorize(){
        return true;
    }

    public function rules(){
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|unique:users,email,NULL,id,deleted_at,NULL',
            'password' => 'required',
            'role_id' => 'required|integer|between:3,4'  // '3=patient, 4=doctor,
        ];
    }
}
