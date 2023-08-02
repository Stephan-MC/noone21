<?php

namespace App\Http\Requests\User\Review;

use Illuminate\Foundation\Http\FormRequest;

class Approve extends FormRequest
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
            'ids' => 'required|array',
            'ids.*' => 'required|exists:user_reviews,id,deleted_at,NULL',
            'is_approved' => 'required|integer|between:0,1',
        ];
    }
}
