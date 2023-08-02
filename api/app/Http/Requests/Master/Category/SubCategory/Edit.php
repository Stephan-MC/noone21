<?php

namespace App\Http\Requests\Master\Category\SubCategory;

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
            'id' => 'required|exists:sub_categories,id,deleted_at,NULL',
            'name' => 'required|max:100|unique:sub_categories,name,'.$this->request->get('id').',id,deleted_at,NULL',
            'category_id' => 'required|exists:categories,id,deleted_at,NULL',
        ];
    }
}
