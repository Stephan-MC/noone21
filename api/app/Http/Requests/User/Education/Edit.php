<?php

namespace App\Http\Requests\User\Education;

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
            'id' => 'required|exists:user_educations,id,deleted_at,NULL',
            'education_type_id' => 'required|exists:education_types,id,deleted_at,NULL',
            'user_id' => 'required|exists:users,id,deleted_at,NULL',
            'title' => 'required'
        ];
    }
}
