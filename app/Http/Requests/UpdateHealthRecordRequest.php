<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHealthRecordRequest extends FormRequest
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
            'name'         => 'required|string|max:255',
            'record_type'  => 'required|string|in:file,text,image',
            'record_details' => 'required|string|max:2000',
            'record_file'  => $this->hasFile('record_file') ? 'file|mimes:jpeg,png,jpg|max:2048' : '',
            'visibility'   => 'required|in:public_all,friends,private',
            'value'        => 'nullable|numeric',
        ];
    }
}
