<?php

namespace App\Http\Requests\Master\Faq;

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
            'question' => 'required|unique:faqs,question,NULL,id,deleted_at,NULL',
            'answer' => 'required',
            'description' => 'required',
        ];
    }
}
