<?php

namespace App\Models\User;

use App\Helpers\Helper;
use App\Models\Master\Category\Category;
use App\Models\Master\ConditionTreated\ConditionTreated;
use App\Models\Master\Service\Service;
use App\Models\Media\Media;
use App\Models\UserImageApproval;
use App\Models\UserVideoApproval;
use App\Models\User\ProfileApproval;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class User extends Authenticatable implements JWTSubject{

    use Notifiable;
   
    protected $fillable = [
        'availability', 'price', 'avg_wait_time', 'avg_consultation_time', 'category_id', 
        'pinterest_link', 'twitter_link', 'google_link', 'facebook_link', 'social_id', 'social_type',
         'is_email_verified', 'u_uid', 'about_me', 'first_name', 'role_id', 'last_name', 'middle_name', 
         'date_of_birth', 'profile_media_id', 'mobile_no', 'phone_no', 'email', 'password', 'address', 
         'country', 'city', 'state', 'zip', 'lat', 'lng', 'is_block', 'remember_token', 'active_jwt_token', 
         'gender', 'device_type', 'created_at', 'update_at', 'created_by', 'updated_by','avg_consultation_price'
    ];

    protected $hidden = [
        'password', 'remember_token', 'updated_by', 'created_by', 'updated_at', 'deleted_at', 'email_verified_at'
    ];

    protected $appends = array('avg_rating');

    // add appended key value
    public function getAvgRatingAttribute(){
        return UserReview::where('user_id', $this->id)->avg('review');
    }

    // jwt Identifier
    public function getJWTIdentifier(){
        return $this->getKey();
    }

    // jwt custom claims
    public function getJWTCustomClaims(){
        return [];
    }

    // add these columns while adding new user
    protected static function boot(){
        parent::boot();
        static::created(function (User $item) {
            $item->u_uid = Helper::mak_user_unique_id($item->id, $item->first_name, $item->last_name);
            $item->password = Hash::make($item->password);
            $item->created_by = Auth::id();
            $item->created_at = now();
            $item->save();
        });
    }

    // get profile_media object of user
    public function profile_media(){
        return $this->hasOne(Media::class, 'id', 'profile_media_id');
    }

    // get role object of user
    public function role(){
        return $this->hasOne(Role::class, 'id', 'role_id');
    }

    // get user education
    public function education() {
        return $this->hasMany(UserEducation::class, 'user_id', 'id');
    }
      // get approve education
    public function eduAprval() {
        return $this->hasMany(UserEducationApproval::class, 'user_id', 'id');
    }
    // get approve education
    public function proAprval() {
        return $this->hasMany(ProfileApproval::class, 'id', 'id');
      }
      // get approve education
    public function UImgApproval() {
        return $this->hasMany(UserImageApproval::class, 'user_id', 'id');
      }
      public function UVidApproval() {
        return $this->hasMany(UserVideoApproval::class, 'user_id', 'id');
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
 
    // get all user consultation with filters
    public static function search($request){
        $users = User::with('role', 'profile_media',
        'education.type', 'education.media',
        'eduAprval','proAprval','UImgApproval','UVidApproval'
        );
      
        $users=$users->select('users.id as vendor_id','users.*');
        if (!empty($request->input('category_slug'))){
            $users=$users->join('user_categories', 'users.id', '=', 'user_categories.user_id');
            $users=$users->join('categories', 'categories.id', '=', 'user_categories.category_id');
            $users=$users->where('categories.slug', $request->input('category_slug'));
        }
        if (!empty($request->input('sub_category_slug'))){
            $users=$users->join('sub_categories', 'sub_categories.id', '=', 'user_categories.sub_category_id');
            $users=$users->where('sub_categories.name', $request->input('sub_category_slug'));
        }
        if (!empty($request->input('status_id'))){
            $statusId = $request->input('status_id');
            if($statusId==-1){
                $users=$users->orHas('proAprval');
                $users=$users->orHas('eduAprval');
                $users=$users->orHas('UImgApproval');
                $users=$users->orHas('UVidApproval');
            }else{
                $users = $users->when($statusId, function ($query, $statusId) {
                    return $query->where('status_id', $statusId);
                }); 
            }
                
        }
        if (!empty($request->input('role_id'))){
            $roleId = $request->input('role_id');
            $users = $users->when($roleId, function ($query, $roleId) {
                return $query->where('role_id', $roleId);
            });
        }

      
       
        if (!empty($request->input('lat') && $request->input('lng')) && $request->input('radius')) {

            $selectDistance =
                '( 3959 * acos( cos( radians(' . $request->input('lat') . ') ) ' .
                '* cos( radians( lat ) ) ' .
                '* cos( radians( lng ) - radians(' . $request->input('lng') . ') ) ' .
                '+ sin( radians(' . $request->input('lat') . ') ) ' .
                '* sin( radians( lat ) ) ) )';

            $users = $users->select(DB::raw('users.*'))->selectRaw("{$selectDistance} AS distance")->whereRaw("{$selectDistance} < ?", $request->input('radius'));
        }

        if ($request->input('search')){
        
        $search = $request->input('search');
        $users->leftJoin('user_search_view', 'users.id', '=', 'user_search_view.user_id')
                ->where('users.first_name', 'like', '%' . $search   . '%')
                ->orWhere('users.last_name', 'LIKE', '%' . $search . '%')
                ->orWhere(DB::raw("CONCAT(users.first_name,' ',users.last_name)"), 'LIKE', '%'. $search . '%')
                ->orWhere('user_search_view.category_name', 'LIKE', '%' . $search . '%')
                ->orWhere('user_search_view.service_name', 'LIKE', '%' . $search . '%')
                ->orWhere('user_search_view.condition_treated_name', 'LIKE', '%' . $search . '%')
                ->orWhere('user_search_view.consultation_name', 'LIKE', '%' . $search . '%')
                ->select('users.*')
                ->groupBy('users.id');


        }
        if($request->input('city')){
            $city = $request->input('city');
            $users = $users->when($city, function ($query, $city) {
                return $query->where('city', 'LIKE', '%' . $city . '%');
            });
        }
        
        if($request->input('address')){
            $city = $request->input('address');
            $users = $users->when($city, function ($query, $city) {
                 $query=$query->where('address', 'LIKE', '%' . $city.'%');
                 return $query;
            });
        }
       
        
        
        if($request->input('availability')){
            $availability = $request->input('availability');
            $users = $users->when($availability, function ($query, $availability) {
                return $query->where('availability', $availability);
            });
    
        }
        if($request->input('gender')){
            $gender = $request->input('gender');
            $users = $users->when($gender, function ($query, $gender) {
                return $query->Orwhere('gender', $gender);
            });
        }
       
        if ($request->input('from_price') && $request->input('to_price')){
            $price = [ $request->input('from_price'), $request->input('to_price') ];
            $users = $users->when($price, function ($query, $price) {
                return $query->whereBetween('price', $price);
            });
        }
        if ($request->input('state')){
            $state = $request->input('state');
            $users = $users->when($state, function ($query, $state) {
                return $query->Orwhere('state', $state);
            });
        }
      

        $zip = $request->input('zip');
        $users = $users->when($zip, function ($query, $zip) {
            return $query->Orwhere('zip', $zip);
        });

        $email = $request->input('email');
        $users = $users->when($email, function ($query, $email) {
            return $query->where('email', $email);
        });
        $sort='asc';
        if($request->input('sort_order')==1){
            $sort = 'asc';
        }
        if($request->input('sort_order')==2){
            $sort = 'desc';
        }
     
        return $users->orderby('users.id',$sort)->groupBy('users.id');
    }

    // social login of user
    public static function socialLogin($email, $password, $userId){

        $customClaims = ['exp' => mktime(0, 0, 0, date("m"), date("d")+ 1, date("Y"))];
        try {

            $credentials = [ 'email' => $email, 'password' => $password ];
            if (!$token = JWTAuth::attempt($credentials, $customClaims))
                return Helper::unAuthResponse('Invalid Credentials');

        } catch (JWTException $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }

        if (!$token)
            return Helper::notFoundResponse('Invalid username or password');

        $user = User::find($userId);
        $user->active_jwt_token = $token;
        $user->expires_in=$customClaims['exp'];
        $user->save();

        // get user object
        $user = User::SingleUser($user->id);
        return $user;

    }
  
    public static function UnAuthorized(){
        return Helper::unAuthResponse('You Are Not Authorized User ');
    }
   
    // check user is approved or not
    public static function isApproved($userId = null, $role = null){

        if ($role == 4){ // 4 role for doctor
            $count = DB::table('users')->where(['id' => $userId, 'deleted_at' => null, 'is_block' => 0, 'role_id' => 4])->count();
        }elseif ($role == 3){ // 3 role for patient
            $count = DB::table('users')->where(['id' => $userId, 'deleted_at' => null, 'is_block' => 0, 'role_id' => 3 ])->count();
        }elseif ($role == 1){ // 1 role for super admin
            $count = DB::table('users')->where(['id' => $userId, 'deleted_at' => null, 'is_block' => 0, 'role_id' => 1 ])->count();
        }

        if ($count > 0){
            return true;
        }

        return  false;
    }
    public static function isVerfyMail($userId = null, $role = null){
        $count = DB::table('users')->where(['id' => $userId,  'is_email_verified' => 1 ])->count();
        if ($count > 0){
            return true;
        }
        return  false;
    
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

    // add or update relationship data
    public static function updateUserRelations($request = null,  $user = null){

        try {

            if (!Helper::isEmpty($request['service_ids'])){
                UserService::where('user_id', $user->id)->delete();
                $user->services()->sync($request['service_ids'], true); // if empty array true will detach
            }

            if (!Helper::isEmpty($request['condition_treated_ids'])){
                UserConditionTreated::where('user_id', $user)->delete();
                $user->conditionTreated()->sync($request['condition_treated_ids'], true); // if empty array true will detach
            }

            return $user;

        }catch (\Exception $exception){
            DB::rollBack();
            die($exception->getMessage());
        }
    }

    // get single user profile
   public static function SingleUser($userId = null ){

        $user = User::with('role', 'profile_media', 'education.type', 'education.media', 'services', 'conditionTreated')->where('id', $userId)->first();
        $user->consultations = UserConsultation::getUserConsultation($user->id);
        $user->categories = UserCategory::getUserCategories($user->id);
        $faq= DB::table('faqs as f')->select('f.*')->join('user_faqs as uf','uf.faq_id', '=', 'f.id')->where('uf.user_id',$user->id)->get();
        $user->faqs=$faq;
        $user->no_of_reviews = UserReview::where('user_id', $user->id)->count();
        $user->related_doctors = User::orderby('id', 'desc')->limit(2)->select('first_name', 'last_name', 'id')->get();
        return $user;

    }
  
    public static function getMsgSingle($id){

    }

}