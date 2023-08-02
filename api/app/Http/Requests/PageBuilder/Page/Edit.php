<?php

namespace App\Http\Requests\PageBuilder\Page;

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
            'id'=>'required',
            'page_type' => 'required',
            'page_slug' => 'required|unique:page_builders',
            'page_slug' => 'required', 
            'page_title' => '',
            'page_keywords' => '',
            'page_description' => '',
        ];
    }
}
