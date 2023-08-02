<?php

namespace App\Http\Requests\Master\Faq;

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
            'id' => 'required|exists:faqs,id,deleted_at,NULL',
            'question' => 'required|max:100|unique:faqs,question,'.$this->request->get('id').',id,deleted_at,NULL',
            'answer' => 'required',
            'description' => 'required',
        ];
    }
}
