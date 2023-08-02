<?php

namespace App\models\User;

use App\Helpers\Helper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use DB;
use App\Models\Master\Category\Category;
use App\Models\Master\ConditionTreated\ConditionTreated;
use App\Models\Master\Service\Service;
use App\Models\Media\Media;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
class profileApproval extends Model
{
        // get profile_media object of user
        public function profile_media(){
            return $this->hasOne(Media::class, 'id', 'profile_media_id');
        }
         // get profile_media object of user
   
    
        // get role object of user
        public function role(){
            return $this->hasOne(Role::class, 'id', 'role_id');
        }
    
        // get user education
        public function education() {
            return $this->hasMany(UserEducation::class, 'user_id', 'id');
        }
    
        // relation skills
        public function skill(): BelongsToMany {
            return $this->belongsToMany(
                Skill::class,
                UserSkill::class,
                'user_id',
                'skill_id'
            )->wherePivot('deleted_at', null);
        }
    
        // relation consultations
        public function consultation(): BelongsToMany {
            return $this->belongsToMany(
                Consultation::class,
                UserConsultation::class,
                'user_id',
                'consultation_id'
            )->wherePivot('deleted_at', null);
        }
     // relation with service
     public function services(): BelongsToMany {
        return $this->belongsToMany(
            Service::class,
            UserService::class,
            'user_id',
            'service_id'
        )->wherePivot('deleted_at', null);
    }

    // relation with condition treated
    public function conditionTreated(): BelongsToMany {
        return $this->belongsToMany(
            ConditionTreated::class,
            UserConditionTreated::class,
            'user_id',
            'condition_treated_id'
        )->wherePivot('deleted_at', null);
    }    
    public static function SingleUserApproval($userId = null ){

        $user = ProfileApproval::with('role','profile_media', 'education.type', 'education.media', 'services', 'conditionTreated')->where('id', $userId)->first();
        $user->consultations = UserConsultation::getUserConsultation($user->id);
        $user->categories = UserCategory::getUserCategories($user->id);
        $faq= DB::table('faqs as f')->select('f.*')->join('user_faqs as uf','uf.faq_id', '=', 'f.id')->where('uf.user_id',$user->id)->get();
        $user->faqs=$faq;
        $user->no_of_reviews = UserReview::where('user_id', $user->id)->count();
        $user->related_doctors = User::orderby('id', 'desc')->limit(2)->select('first_name', 'last_name', 'id')->get();
        return $user;

    }
    public static function profileApporvalPublished($request){
        DB::begintransaction();
        try {
            $userProfile = User::find($request->id);
            $userProfile->first_name = $request->first_name ? $request->first_name : $userProfile->first_name;
            $userProfile->last_name = $request->last_name ? $request->last_name : $userProfile->last_name;
            $userProfile->email = $request->email ? $request->email : $userProfile->email;
            $userProfile->address = $request->address ? $request->address : $userProfile->address;
            $userProfile->city = $request->city ? $request->city : $userProfile->city;
            $userProfile->zip = $request->zip ? $request->zip : $userProfile->zip;
            $userProfile->country = $request->country ? $request->country : $userProfile->country;
            $userProfile->facebook_link = $request->facebook_link ? $request->facebook_link : $userProfile->facebook_link;
            $userProfile->google_link = $request->google_link ? $request->google_link : $userProfile->google_link;
            $userProfile->twitter_link = $request->twitter_link ? $request->twitter_link : $userProfile->twitter_link;
            $userProfile->pinterest_link = $request->pinterest_link ? $request->pinterest_link : $userProfile->pinterest_link;
            $userProfile->profile_media_id = $request->profile_media_id ? $request->profile_media_id : $userProfile->profile_media_id;
            $userProfile->about_me = $request->about_me ? $request->about_me : $userProfile->about_me;
            $userProfile->phone_no = $request->phone_no ? $request->phone_no : $userProfile->phone_no;
            $userProfile->lat = $request->lat ? $request->lat : $userProfile->lat;
            $userProfile->lng = $request->lng ? $request->lng : $userProfile->lng;
            $userProfile->city = $request->city ? $request->city : $userProfile->city;
            $userProfile->state = $request->state ? $request->state : $userProfile->state;
            $userProfile->zip = $request->zip ? $request->zip : $userProfile->zip;
            $userProfile->availability = $request->availability ? $request->availability : $userProfile->availability;
            $userProfile->price = $request->price ? $request->price : $userProfile->price;
            $userProfile->avg_wait_time = $request->avg_wait_time ? $request->avg_wait_time : $userProfile->avg_wait_time;
            $userProfile->avg_consultation_time = $request->avg_consultation_time ? $request->avg_consultation_time : $userProfile->avg_consultation_time;
            $userProfile->avg_consultation_price=$request->avg_consultation_price ? $request->avg_consultation_price : $userProfile->avg_consultation_price;
            $userProfile->updated_by = auth::id();
            $userProfile->updated_at = now();
            $userProfile->save();
            db::commit();
            return 1;
            return helper::successresponse('Profile has been Published', $userProfile);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    public static function profileApporval($request){
     
        DB::begintransaction();
        try {
            $PA=new profileApproval;
            $userProfile = profileApproval::find($request->input('id'));
            if(isset($userProfile)){

            }else{
                $userProfile =new profileApproval;
            }
            $userProfile->id=$request->input('id');
            $userProfile->first_name = $request->input('first_name') ? $request->input('first_name') : $userProfile->first_name;
            $userProfile->last_name = $request->input('last_name') ? $request->input('last_name') : $userProfile->last_name;
            $userProfile->email = $request->input('email') ? $request->input('email') : $userProfile->email;
            $userProfile->address = $request->input('address') ? $request->input('address') : $userProfile->address;
            $userProfile->city = $request->input('city') ? $request->input('city') : $userProfile->city;
            $userProfile->zip = $request->input('zip') ? $request->input('zip') : $userProfile->zip;
            $userProfile->country = $request->input('country') ? $request->input('country') : $userProfile->country;
            $userProfile->facebook_link = $request->input('facebook_link') ? $request->input('facebook_link') : $userProfile->facebook_link;
            $userProfile->google_link = $request->input('google_link') ? $request->input('google_link') : $userProfile->google_link;
            $userProfile->twitter_link = $request->input('twitter_link') ? $request->input('twitter_link') : $userProfile->twitter_link;
            $userProfile->pinterest_link = $request->input('pinterest_link') ? $request->input('pinterest_link') : $userProfile->pinterest_link;
            $userProfile->profile_media_id = $request->input('profile_media_id') ? $request->input('profile_media_id') : $userProfile->profile_media_id;
            $userProfile->about_me = $request->input('about_me') ? $request->input('about_me') : $userProfile->about_me;
            $userProfile->phone_no = $request->input('phone_no') ? $request->input('phone_no') : $userProfile->phone_no;
            $userProfile->lat = $request->input('lat') ? $request->input('lat') : $userProfile->lat;
            $userProfile->lng = $request->input('lng') ? $request->input('lng') : $userProfile->lng;
            $userProfile->city = $request->input('city') ? $request->input('city') : $userProfile->city;
            $userProfile->state = $request->input('state') ? $request->input('state') : $userProfile->state;
            $userProfile->zip = $request->input('zip') ? $request->input('zip') : $userProfile->zip;
            $userProfile->availability = $request->input('availability') ? $request->input('availability') : $userProfile->availability;
            $userProfile->price = $request->input('price') ? $request->input('price') : $userProfile->price;
            $userProfile->avg_wait_time = $request->input('avg_wait_time') ? $request->input('avg_wait_time') : $userProfile->avg_wait_time;
            $userProfile->avg_consultation_time = $request->input('avg_consultation_time') ? $request->input('avg_consultation_time') : $userProfile->avg_consultation_time;
            $userProfile->avg_consultation_price=$request->input('avg_consultation_price') ? $request->input('avg_consultation_price') : $userProfile->avg_consultation_price;
            $userProfile->updated_by = auth::id();
            $userProfile->updated_at = now();
            $userProfile->save();
            db::commit();
            return helper::successresponse('Your Changes Sent To Review-Team', $userProfile);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }
}
