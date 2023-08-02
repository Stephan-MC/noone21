<?php

namespace App\Http\Requests\User\Review;

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
            'id' => 'required|exists:user_reviews,id,deleted_at,NULL',
            'review' => 'required|integer|between:1,5',
            'comments' => 'required',
        ];
    }
}
