<?php

namespace App\Http\Controllers\User;
use App\Http\Requests\PageBuilder\Content\Edit;
use App\Http\Requests\PageBuilder\Content\Add;
use App\Http\Requests\PageBuilder\Content\Delete;
use App\Models\PageBuilder\PageContent;
use App\Models\PageBuilder\PageBuilder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\Helper;
use DB;
class ContentController extends Controller
{
    public function Add(Add $request){
        try {
            if(isset($request->page_id)){
                $old=PageContent::where('page_id',$request->page_id)->get();
                foreach ($old as $key => $m) {
                  if(isset($m->id)){
                    $m->delete();
                  }
                }
           
                foreach ($request['display_name'] as $key => $data) {
                   
                    if(isset($request['display_name'][$key]) && isset($request['content'][$key])){
                        $model=new PageContent;
                        $model->page_id=$request->page_id;
                        $model->display_name=$request['display_name'][$key];
                        $model->content=$request['content'][$key];
                        $model->save();
                      
                    }
                    
               
                }
                return Helper::successResponse('Page has been created Successfully');
            }
        } catch (\Exception $ex) {

            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }
      
    }
    public function Edit(Edit $request){

        try {
            $ifExist=PageContent::where('page_slug',$request->page_slug)
            ->where('id','!=',$request->id)->get();
           
            if(isset($ifExist[0])){
                return Helper::serverErrorResponse('Slug Already Taken');
            }
            $model=PageContent::findOrFail($request->id);

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
            $model=PageContent::where('id',$request->id);
            if(isset($model) && $model->delete()){
                return Helper::successResponse('Page has been deleted Successfully');
            }else{
                return Helper::serverErrorResponse($ex->getMessage());
            }
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
    public function GetSingle(Request $request){
      
        try {
            if(isset($request->id)){
                
                $pages = PageContent::where('page_id',$request->id);
                return helper::successresponse('list pages',$pages, $request);
            }else{
                return helper::servererrorresponse('Id is required to update');
            }
            
           
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
}
