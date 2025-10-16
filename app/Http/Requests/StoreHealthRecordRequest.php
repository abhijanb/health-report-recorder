<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class StoreHealthRecordRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'record_type' => 'required|in:file,text,image,json',
            'record_details' => 'nullable|string',
            'record_file' => 'nullable|file',
            'priority' => 'required|in:low,normal,high',
            'status' => 'required|in:active,archived,pending',
            'value' => 'nullable|numeric',
            'unit' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'source' => 'nullable|string',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (in_array($this->record_type, ['file', 'image'])) {
                if (!$this->hasFile('record_file')) {
                    $validator->errors()->add('record_file', 'Record file is required when record type is file or image.');
                }
                if (empty($this->record_details)) {
                    $validator->errors()->add('record_details', 'Record details are required when record type is file or image.');
                }
            }
        });
    }
}
