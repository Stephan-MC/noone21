<?php

namespace App\Http\Requests\User\Approval;

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
            'user_id' => 'required|exists:users,id,deleted_at,NULL',
            'rejection_reason_id' => 'exists:rejection_reasons,id,deleted_at,NULL',
            'status_id' => 'required|numeric|between:2,4',
            'comments' => 'nullable',
        ];
    }
}
