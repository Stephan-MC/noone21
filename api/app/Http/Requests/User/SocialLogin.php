<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class SocialLogin extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'social_id' => 'required',
            'social_type' => 'required|integer|between:1,2', // 1=facebook , 2=google
            'first_name' => 'required',
            'email' => 'email',
            'role_id' => 'required|integer|between:3,4'  // '3=patient, 4=doctor,
        ];
    }
}
