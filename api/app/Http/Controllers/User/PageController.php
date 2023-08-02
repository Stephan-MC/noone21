<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\PageBuilder\Page\Edit;
use App\Http\Requests\PageBuilder\Page\Add;
use App\Http\Requests\PageBuilder\Page\Delete;

use Illuminate\Http\Request;
use App\Models\PageBuilder\PageBuilder;
use App\Models\PageBuilder\PageType;
use App\Helpers\Helper;
use DB;
class PageController extends Controller
{
    public function Add(Add $request){
        try {
            $model=new PageBuilder;
            $model->fill($request->all());
            $model->created_at=now();
            $model->save();
            if($model->save()){
                return Helper::successResponse('Page has been created Successfully');
            }else{
                return Helper::serverErrorResponse($ex->getMessage());
            }
            DB::commit();
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
      
    }
    public function Edit(Edit $request){

        try {
            $ifExist=PageBuilder::where('page_slug',$request->page_slug)
            ->where('id','!=',$request->id)->get();
           
            if(isset($ifExist[0])){
                return Helper::serverErrorResponse('Slug Already Taken');
            }
            $model=PageBuilder::findOrFail($request->id);

            $data=$request->only( $model->getFillable());
            $model->fill($data);
            $model->updated_at=now();
            
            if($model->save()){
                return Helper::successResponse('Page has been updated Successfully');
            }else{
                return Helper::serverErrorResponse($ex->getMessage());
            }
            DB::commit();
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
     }
     public function Delete(Delete $request){
        try {
            $model=PageBuilder::where('id',$request->id);
            $child=PageContent::where('id',$model->id)->get();
            if(isset($child)){
                foreach ($child as $key => $val) {
                   $MC=PageContent::where('id',$val->id)->first();
                   if($MC){
                    $MC->delete();
                   }
                }


            }
            if(isset($model) && $model->delete()){
                
                return Helper::successResponse('Page has been deleted Successfully');
            }else{
                return Helper::serverErrorResponse($ex->getMessage());
            }
            DB::commit();
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
     }
     public function GetAll(Request $request){
         
        try {
            $pages = PageBuilder::search($request);
            return helper::successresponse('list pages',$pages, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    
    public function GetPageType(Request $request){
      
        try {
                $pagetype = PageType::get();
                return helper::successresponse('list pages',$pagetype);
           
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    public function getSingle(Request $request){
      
        try {
            if(isset($request->id)){
                
                $pages = PageBuilder::singlePage($request->id);
                return helper::successresponse('list pages',$pages, $request);
            }else{
                return helper::servererrorresponse('Id is required to update');
            }
            
           
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    public function GetDynamicPage(Request $request){
        try {
            if(isset($request->page_slug) && isset($request->page_type)){
                
                $pages = PageBuilder::DynamicPage($request);
                return helper::successresponse('list pages',$pages, $request);
            }else{
                return helper::servererrorresponse('Page Slug, Page type are required');
            }
            
           
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    
}
