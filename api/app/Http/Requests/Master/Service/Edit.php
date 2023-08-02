<?php

namespace App\Http\Requests\Master\Service;

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
            'id' => 'required|exists:services,id,deleted_at,NULL',
            'name' => 'required|max:100|unique:services,name,'.$this->request->get('id').',id,deleted_at,NULL',
        ];
    }
}
