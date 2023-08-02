<?php
/**
 * Created for httpstatuscodes.
 * help: https://www.restapitutorial.com/httpstatuscodes.html
 */

return[
    // 2xx Success
    'ok_status' => 200,
    'created_status' => 201,
    'validation' => 422,

    // 3xx Redirection


    // 4xx Client Error

    'bad_request_status' => 400,
    'unauthorized_status' => 401,
    'forbidden_status' => 403,
    'not_found_status' => 404,
    'not_acceptable_status' => 406,	// use for validation
    'conflict_status' => 409,

    // 5xx Server Error

    'internal_server_error' => 500,


];
?>