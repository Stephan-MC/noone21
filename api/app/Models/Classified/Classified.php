<?php

namespace App\Models\Classified;

use App\Models\Classified\ClsicCategory;
use App\Models\Classified\ClsicMedia as CM;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\Helper;
class Classified extends Model
{
    protected $fillable = [
        'user_id','category_id','media_id','type_id','title','description','tags'    
        ,'location','region','city','contactName','email'   
        ,'phone','prefence_id','status','approval'   
    ];
   public function testMe(){
       return 111;
   }
   public function users() {
    return $this->hasOne(User::class, 'id', 'user_id');
   }
   public function Classified() {
    return $this->hasMany(User::class, 'user_id', 'id');
   }
   public function media() {
    return $this->hasMany(CM::class, 'classified_id');
   }
    public static function search($request){
      $data=[];
     
$userId=User::where('active_jwt_token', $request->active_jwt_token)->first();
if(!isset($userId->id)){return 0;}
    
        if(isset($request->id) && isset($request->active_jwt_token)){
        
                $classified = DB::table('classifieds as cls');
                $classified = $classified->where('id',$request->id)->first();
                $media = DB::table('clsic_media as cm');
                $media =$media->where('cm.classified_id',$request->id)->get();
                $classified->media=$media;
               
                return $classified;
        
        }
        $classified = Classified::with('media')->where('user_id',$userId->id);
        // $classified = DB::table('classifieds as cls');
        // $classified = $classified->where('u.active_jwt_token',$request->active_jwt_token); 
        // $classified = $classified->orderBy('created_at','desc'); 
        // $classified =$classified->join('users as u', 'u.id', '=', 'user_id');
        // $classified =$classified->join('clsic_categories as clsCat', 'clsCat.id', '=', 'category_id');
        // $classified =$classified->select(
        //                 'u.id as userId','u.first_name','u.last_name'
        //                 ,'u.email as userEmail','title','phone'
        //                 ,'region','location','contactName','id as clsId',
        //                 'clsCat.id as catId','clsCat.title as category','email','created_at'
        //               )->paginate(1);
      
       
       if(isset($request->search)){
     
        //  $classified =$classified->where('title', 'like', '%'.$request->search.'%');
        $classified =$classified->Orwhere('tags', 'like', '%'.$request->search.'%');
         $classified =$classified->Orwhere('location', 'like', '%'.$request->search.'%');
         $classified =$classified->Orwhere('region', 'like', '%'.$request->search.'%');
         $classified =$classified->Orwhere('contactName', 'like','%'.$request->search.'%');
         $classified =$classified->Orwhere('email', 'like', '%'.$request->search.'%');
         $classified =$classified->Orwhere('phone', 'like', '%'.$request->search.'%');
       }
       if(isset($request->categoryId)){
        $classified =$classified->where('category_id',$request->categoryId);
     
      }
       if(isset($request->status_id)){
        $classified =$classified->where('approval',$request->status_id);
       }
       return $classified;
    }
    public static function getSingleCls($token,$id){
            $classified = DB::table('classifieds as cls');
            $classified = $classified->where('u.active_jwt_token',$request->active_jwt_token); 
            $classified =$classified->join('clsic_categories as clsCat', 'clsCat.id', '=', 'category_id');
            $media = DB::table('clsic_media as cm');
            $media->join('users as u', 'u.id', '=', 'cm.user_id');
            $media =$media->where('u.active_jwt_token',$token);
            $media =$media->where('cm.classified_id',$id);
            $classified =$classified->select('*', 'clsCat.id as catId','u.first_name','u.last_name')->get();
        
            
    }
    public static function searchAll($request){
      $serachSort='desc';
      $classified = DB::table('classifieds as cls');
      $classified =$classified->join('clsic_categories as clsCat', 'clsCat.id', '=', 'category_id');
      $classified =$classified->join('clsic_media as cm','cm.classified_id','=','cls.id');
      $classified =$classified->select(
                                      'cls.id as cls_id','cls.description as cls_description',
                                      'cls.title as cls_title','cls.tags','cls.location','cls.region', 'cls.city'
                                      ,'cls.contactName','cls.email','cls.status as cls_status' ,'cls.approval','cls.phone' ,
                                      'prefence_id','cls.created_at as cls_cdate','clsCat.id as catId','cm.id as cmId','cm.system_name','cm.base_path'
                                    )->groupby('cm.classified_id');

if(isset($request->sort)){
           $serachSort=$request->sort;
      }else{
        $classified=$classified->orderBy('cls.id', 'desc');
      }
      if(isset($request->categoryId)){
        $classified=$classified->where('clsCat.id', $request->categoryId);
      }if(isset($request->location)){
        $classified=$classified->Where('location','LIKE', $request->location.'%');
        $classified=$classified->orWhere('location','LIKE', '%'.$request->location);
        $classified=$classified->orWhere('location','LIKE', '%'.$request->location.'%');

  }
  $classified=$classified->orderBy('cls.id', $serachSort);
      return $classified;
      die($classified->count());
      return
       $model=new Classified;
       $model=$attachM;
       return $model;
       return Classified::all();
    }

public static function GetSingleData($request){
  $classified = DB::table('classifieds as cls')->where('cls.id',$request->id);
  $classified=$classified->join('users as u','cls.user_id','=','u.id');
  $classified=$classified->select('cls.*','u.first_name','u.last_name','u.phone_no','u.mobile_no'
                                  ,'u.address','u.country','u.zip','u.lng','u.lat'
                                )->first();        
  $medias=CM::where('classified_id',$request->id)->get();
  $classified->media=$medias;
  return $classified;

}

}
