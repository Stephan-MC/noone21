<?php
/**
 * Created by PhpStorm.
 * User: Rameez Raja
 * Date: 6/27/2018
 * Time: 8:21 PM
 */

namespace App\Helpers;


class Base64
{
    public static function decode($base64url) {

        return base64_decode(strtr($base64url, '-_', '+/'));
    }

    public static function encode($base64url) {

        return strtr($base64url, '+/', '-_');
    }
}