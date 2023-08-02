<?php

namespace App\Http\Controllers\Master\Service;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Service\Add;
use App\Http\Requests\Master\Service\Delete;
use App\Http\Requests\Master\Service\Edit;
use App\Models\Master\Service\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller{

    protected $service = null;

    public function __construct(Service $service){

        $this->service = $service;
    }

    // get all services
    public function index(Request $request){

        try {

            $services = Service::query();
            $search = $request->input('search'); // general search on all fields
            $services = $services->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search   . '%')
                    ->orWhere('slug', 'LIKE', '%' . $search . '%')
                    ->orWhere('description', 'LIKE', '%' . $search . '%');
            });
            return Helper::successResponse('Services list', $services, $request);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // add new service
    public function add(Add $request){

        try {

            $dataArr = $request->only($this->service->getFillable());
            $service = $this->service->create($dataArr);

            DB::commit();
            return Helper::successResponse('Service added successfully', $service);
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // get any single service
    public function single($id){

        try {
            $service = $this->service->find($id);
            if(!$service){
                return Helper::notFoundResponse('We can\'t find a Service with that id.');
            }
            return Helper::successResponse('Single Service Information.', $service);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // edit any service
    public function edit(Edit $request){

        try {
            $updateService = Service::find($request->input('id'));
            $updateService->name = $request->input('name') ? $request->input('name') : $updateService->name;
            $updateService->description = $request->input('description') ? $request->input('description') : $updateService->description;
            $updateService->updated_by = Auth::id();
            $updateService->save();

            return Helper::successResponse('Category updated successfully', $updateService);

        } catch (\Exception $ex) {

            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // delete multiple services
    public function delete(Delete $request){

        try {

            $this->service->whereIn('id', $request->input('ids'))->delete();
            return Helper::successResponse('Services deleted Successfully.');

        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

}
