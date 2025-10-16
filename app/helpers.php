<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if (! function_exists('uploadFile')) {
    /**
     * Automatically handles file uploads using Laravel’s Storage facade.
     *
     * @param  \Illuminate\Http\UploadedFile  $file
     * @param  string  $location
     * @param  string  $disk
     * @param  string  $visibility
     * @return string|null
     */
    function uploadFile(UploadedFile $file, $location = 'uploads', $disk = 'local', $visibility = 'public', $username = null)
    {
        $location = $username ? $username . '/' . $location : $location;
        $path = $file->store($location, [
            'disk' => $disk,
            'visibility' => $visibility,
        ]);

        return $path;
    }
}

if (! function_exists('formatDate')) {
    /**
     * Uses Carbon to format any date.
     *
     * @param  string  $date
     * @param  string  $format
     * @return string
     */
    function formatDate($date, $format = 'd-m-Y')
    {
        return \Carbon\Carbon::parse($date)->format($format);
    }
}

if (! function_exists('generateUuid')) {
    /**
     * Returns a unique UUID string.
     *
     * @return string
     */
    function generateUuid()
    {
        return (string) Str::uuid();
    }
}

if (! function_exists('slugify')) {
    /**
     * Converts any string into a URL-friendly slug.
     *
     * @param  string  $string
     * @return string
     */
    function slugify($string)
    {
        return Str::slug($string);
    }
}

if (! function_exists('bytesToHuman')) {
    /**
     * Converts file size in bytes to KB/MB/GB string format.
     *
     * @param  int  $bytes
     * @return string
     */
    function bytesToHuman($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $i = 0;
        while ($bytes >= 1024 && $i < 4) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }
}

if (! function_exists('appVersion')) {
    /**
     * Returns the application version from `config/app.php`.
     *
     * @return string
     */
    function appVersion()
    {
        return config('app.version', '1.0.0');
    }
}
