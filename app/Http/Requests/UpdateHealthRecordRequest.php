<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="UpdateHealthRecordRequest",
 *     type="object",
 *     title="Update Health Record Request",
 *     required={"name", "record_type", "visibility"},
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The name of the health record"
 *     ),
 *     @OA\Property(
 *         property="record_type",
 *         type="string",
 *         description="The type of the health record",
 *         enum={"file", "text", "image"}
 *     ),
 *     @OA\Property(
 *         property="record_details",
 *         type="string",
 *         description="The details of the health record"
 *     ),
 *     @OA\Property(
 *         property="record_file",
 *         type="string",
 *         format="binary",
 *         description="The file of the health record"
 *     ),
 *     @OA\Property(
 *         property="visibility",
 *         type="string",
 *         description="The visibility of the health record",
 *         enum={"public_all", "friends", "private"}
 *     ),
 *     @OA\Property(
 *         property="value",
 *         type="number",
 *         description="The value of the health record"
 *     )
 * )
 */
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
