<?php

namespace App\Http\Requests\User\Review;

use Illuminate\Foundation\Http\FormRequest;

class Add extends FormRequest
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
            'review' => 'required|integer|between:1,5',
            'review_by_id' => 'required|exists:users,id,deleted_at,NULL',
            'user_id' => 'required|exists:users,id,deleted_at,NULL',
            'comments' => 'required',
        ];
    }
}
