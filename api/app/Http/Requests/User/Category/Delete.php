<?php

namespace App\Http\Requests\User\Category;

use Illuminate\Foundation\Http\FormRequest;

class Delete extends FormRequest
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
            'user_id' => 'required|exists:users,id,deleted_at,NULL',
            'category_id' => 'required|exists:categories,id,deleted_at,NULL',
        ];
    }
}
