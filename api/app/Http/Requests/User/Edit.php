<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class Edit extends FormRequest
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

            'id' => 'required|exists:users,id,deleted_at,NULL',
            'email' => 'required|max:100|unique:users,email,'.$this->request->get('id').',id,deleted_at,NULL',
            'service_ids' => 'array',
            'service_ids.*' => 'exists:services,id,deleted_at,NULL',
            'condition_treated_ids' => 'array',
            'condition_treated_ids.*' => 'exists:condition_treated,id,deleted_at,NULL',

        ];
    }
}
