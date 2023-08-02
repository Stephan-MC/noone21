<?php

namespace App\Models\PageBuilder;

use Illuminate\Database\Eloquent\Model;

class PageBuilder extends Model
        {
            protected $fillable = [
                'page_type' ,
                'page_slug' ,
                'page_name', 
                'page_title' ,
                'page_keywords' ,
                'page_description' ,
                'page_content' ,
                'page_content1' ,
                'page_content2' ,
                'page_content3' ,
                
             ];
// get user education
        public function content() {
            return $this->hasMany(PageContent::class, 'page_id', 'id');
        }
        public function pageType() {
            return $this->hasOne(PageType::class, 'id', 'page_type');
        }
    public static function singlePage($id){
        $page = PageBuilder::where('page_builders.id',$id);
        $page=$page->select('page_builders.*');
        $sort='asc';
        return $page;
    }
 //================================================ get all user consultation with filters
    public static function search($request){
        $page = PageBuilder::with('content','pageType');
        $page=$page->select('page_builders.id as pageId','page_builders.*');
        if (!empty($request->input('page_type'))){
            $page=$page->where('page_builders.page_type', $request->input('page_type'));
        }
        if ($request->input('search')){
                $search = $request->input('search');
                $page=$page->orWhere('page_type', 'LIKE', '%' . $search . '%');
                $page=$page->orWhere('page_description', 'LIKE', '%' . $search . '%');
                $page=$page->orWhere('page_slug', 'LIKE', '%' . $search . '%');
                $page=$page->orWhere('page_name', 'LIKE', '%' . $search . '%');
        }
        $sort='asc';
        if($request->input('sort_order')==1){
            $sort = 'asc';
        }
        if($request->input('sort_order')==2){
            $sort = 'desc';
        }
     
        return $page->orderby('page_builders.id',$sort);
    }
    //========================================= get page content
    public static function DynamicPage($request){
        // $page = PageBuilder::where('page_builders.page_type',$request->input('page_type'));
        // $page=$page->where('page_builders.page_slug', $request->input('page_slug'))->first();
        // $pageContent=PageContent::where('page_id',$page->id);
        // // $page=$page->select('page_builders.*');
        // // $sort='asc';
        // return $pageContent;
        $page = PageBuilder::with('content','pageType');
        if (!empty($request->input('page_type'))){
            $page=$page->where('page_builders.page_type', $request->input('page_type'));
        }
        if (!empty($request->input('page_slug'))){
            $page=$page->where('page_builders.page_slug', $request->input('page_slug'));
        }
        return $page;
    }
}
