<?php

namespace App\Http\Controllers\User;
use App\Helpers\Helper;
use App\Http\Requests\User\ChangePassword;
use App\Http\Requests\User\Edit;
use App\Http\Requests\User\ForgotPassword;
use App\Http\Requests\User\PasswordReset;
use App\Http\Requests\User\Login;
use App\Http\Requests\User\Logout;
use App\Http\Requests\User\Register;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\ResetPasswordByAdmin;
use App\Http\Requests\User\SocialLogin;
use App\Http\Requests\User\Delete;
use App\Models\User\User;
use App\Models\User\UserCategory;
use App\Models\User\UserConsultation;
use App\Models\User\UserEducation;
use App\Models\User\UserFaqView;
use App\Models\User\UserConditionTreated;
use App\Models\User\EducationType;
use App\Models\User\UserApproval;
use App\Models\User\ProfileApproval;
use App\Models\User\UserFaq;
use App\Models\User\UserService;
use App\Models\UserImage;
use App\Models\UserVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Media\Media;
use App\Mail\RegisterUser as WelcomeMail;
use App\Mail\VerifyMail as mailVerify;
use App\Mail\NewContact as NewUserReg;
use App\Mail\Welcome as WelcomMsg;
use Tymon\JWTAuth\JWT;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\PasswordBroker;
class UserController extends Controller{
    protected $userObject = null;
    public function __construct(User $userObject){
        $this->userObject = $userObject;
    }

    // register new user @222333
    protected function register(Register $request){
        try {
            DB::beginTransaction();
            $requestData = $request->only($this->userObject->getFillable());
            // echo "<pre>";
            $media_object = [
                'system_name' =>'defualt.png',
                'real_name' => 'defualt.png',
                'base_path' => url('/public/media/'),
                'alt_name' => null,
                'extension' => 'png',
                'size' =>'2322',
                'description' => null
               
            ];
            $Mid=Media::create($media_object)->id;
            $data=array_merge($requestData,['is_email_verified'=>0]);
            $data=array_merge($requestData,['profile_media_id'=>$Mid]);
            $returnUrl=$request->only('returnUrl')['returnUrl'];
       
            $user = User::create($data);
            // get user token after successfully registration
            $credentials = $request->only('email', 'password');
            $customClaims = ['exp' => mktime(0, 0, 0, date("m"), date("d"), date("Y") + 1)];
            try {
                if (!$token = JWTAuth::attempt($credentials, $customClaims))
                    return Helper::unAuthResponse('Invalid Credentials');
            } catch (JWTException $ex) {
                return Helper::serverErrorResponse($ex->getMessage());
            }
            if($token){
                $user->active_jwt_token = $token;
                $user->save();
            }
            $data=[];
            $data['token']=$token;
            $data['returnUrl']=$returnUrl;
            // send welcome email to user
            $adminMail=env('MAIL_FROM');
            $ownMail=env('OWN_MAIL');
            Mail::to($request->input('email'))->send(new mailVerify($data));
            Mail::to($adminMail)->send(new NewUserReg($request->all()));
            Mail::to($ownMail)->send(new NewUserReg($request->all()));
            $userObject = User::with('role', 'profile_media')->find($user->id);
            db::commit();
            return Helper::successResponse('Verification email has been sent, verify your account', $userObject);

        } catch (\Exception $ex) {
            DB::rollback();
            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // login user
    public function login(Login $request) {
    
        try {
          
            $credentials = $request->only('email', 'password');
            $customClaims = ['exp' => mktime(0, 0, 0, date("m"), date("d")+3, date("Y"))];
            $expireIn=$customClaims['exp'];
            $expireIn=date('Y-m-d H:i:s',$expireIn);
            try {
                if (!$token = JWTAuth::attempt($credentials, $customClaims))
                    return Helper::unAuthResponse('Invalid Credentials');

            } catch (JWTException $ex) {
                return Helper::serverErrorResponse($ex->getMessage());
            }
            $user_id = Auth::id();
            $user = User::with('profile_media', 'role')->find($user_id);

            // check this user is correct with role or not
            if ($user->role_id != $request->input('role_id')){
                return Helper::serverErrorResponse('Your role is not correct. Please login with correct role');
            }
            // check if user is approved or not
            if (!User::isApproved($user->id, $user->role_id)){
                return Helper::serverErrorResponse('Your Account is Blocked due to some reasons, Please contact our Technical Support');
            }
            if (!User::isVerfyMail($user->id, $user->role_id)){
                return Helper::serverErrorResponse('!Sorry Account Is Inactive, 
                Please Verify Your Account.');
            }
            if (!$token)
                return Helper::notFoundResponse('Invalid username or password');
                
            $user->active_jwt_token = $token;
            $user->expires_in=$expireIn;
            $user->save();
            return Helper::successResponse('User Login successfully', $user);
        } catch (\Exception $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }
    }

    // logout any user
    public function logout(Logout $request){

        try {

            JWTAuth::parseToken()->invalidate($request->token);
            return Helper::successResponse('Signed out successfully');

        } catch (JWTException $ex) {
            return Helper::serverErrorResponse($ex->getMessage());
        }

    }

    // edit user profile
    public function edit(Edit $request){
      
        $ifU=User::find($request->input('id'));
        if(isset($ifU) && $ifU->status_id=='4'){
            return profileApproval::profileApporval($request);
        }
       
        DB::begintransaction();
        try {

            $userProfile = User::find($request->input('id'));
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

            User::updateUserRelations($request, $userProfile);

            $user = User::SingleUser($userProfile->id);

            db::commit();
            return helper::successresponse('user updated successfully', $user);

        } catch (\exception $ex) {

            db::rollback();
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // send forgot password link
    public function forgotPassword(ForgotPassword $request){
        try{
           
            $resetUrl= $request->only('redirectUrl')['redirectUrl'];
            $to_mail=$request->only('email')['email'];
            $user = User::where('email', $to_mail)->first();
            $password_broker = app(PasswordBroker::class);
            $token = $password_broker->createToken($user); 
           $data=[$to_mail,$resetUrl,$token];
           $testMe = array('name'=>$user->first_name.' '.$user->last_name,'resetUrl'=>$resetUrl,'token'=>$token);
          $response= Mail::send('emails.reset-password',$testMe,
                  function($message) use($data){
                               $message->subject('Reset Password ');
                               $message->to($data[0]);
                           });
            DB::table('password_resets')->insert(['email' => $to_mail, 'token' => $token, 'created_at' => new Carbon]);
            return Helper::successResponse('Email sent successfully', $response);

        }catch (\Exception $exception){
            return Helper::serverErrorResponse($exception->getMessage());
        }
    }

    // get all users
    public function index(Request $request){
 
        try {
            $users = User::search($request);
            
            return helper::successresponse('user searched list.',$users, $request);

        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }

    // get single user
    public function single($id){
        
        try {
                $user = User::SingleUser($id);
                return helper::successresponse('single user information.',$user);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    public function getUserApproval(Request $request){
      $id=$request->id;
     
    // //   $PA=ProfileApproval::find($id);
    //   $PA=User::find($id);
    //   $user = ProfileApproval::SingleUserApproval($id);
    //    return helper::successresponse('single user information.',$user);
    //  return $PA;
    //           die();      
        try {
                $ifU =User::find($id);
                if(isset($ifU)){
                    if($ifU->status_id==4){
                    $PA=ProfileApproval::find($id);
                        if(isset($PA)){
                            $user = ProfileApproval::SingleUserApproval($id);
                        }else{
                            $user =User::SingleUser($id);
                        }

                    }else{
                        $user =User::SingleUser($id);
                    }

                }
                return helper::successresponse('single user information.',$user);
        } catch (\exception $ex) {
            return helper::servererrorresponse($ex->getmessage());
        }
    }
    // social login
    public function socialLogin(SocialLogin $request){
        // check if user is already added or not
        $userObject = User::where('social_id', $request->input('social_id'))->first();

        // if already added login and send the token
        if (!is_null($userObject) || !empty($userObject)){

            // check if user is approved or not
            if (!User::isApproved($userObject->id, $userObject->role_id)){
                return Helper::serverErrorResponse('Your Account is Blocked due to some reasons, Please contact our Technical Support');
            }

            $updatedUserObject = User::socialLogin($userObject->email, $request->input('social_id'), $userObject->id);
            return Helper::successResponse('Already social login user', $updatedUserObject);
        }

        // if not added, add new user and login and send the token to user
        $userObject = new User();
        $request['password'] = $request->input('social_id');
        if (empty($request->input('email'))){
            $request['email'] = $request->input('social_id').'@afiye.com';
        }
        $userData = $request->only( $userObject->getFillable());

        // check if email lis already added or not
        $counter = User::where('email', $request->input('email'))->count();
        if ($counter > 0 ){
            return Helper::validationResponse(['User already exists. Please login using username and password.']);
        }
        $media_object = [
            'system_name' =>'defualt.png',
            'real_name' => 'defualt.png',
            'base_path' => url('/public/media/'),
            'alt_name' => null,
            'extension' => 'png',
            'size' =>'2322',
            'description' => null
           
        ];
        $Mid=Media::create($media_object)->id;
        $data=array_merge($userData,['is_email_verified'=>1]);
        $data=array_merge($userData,['profile_media_id'=>$Mid]);
         // send welcome email to user
         $adminMail=env('MAIL_FROM');
         $ownMail=env('OWN_MAIL');
         Mail::to($adminMail)->send(new NewUserReg($request->all()));
         Mail::to($ownMail)->send(new NewUserReg($request->all()));
         Mail::to($request->input('email'))->send(new WelcomMsg($request->all()));
        $user = User::create($data);
        $user->is_email_verified=1;
        $user->save();
        // check if user is approved or not
        if (!User::isApproved($user->id, $user->role_id)){
            return Helper::serverErrorResponse('Your Account is Blocked due to some reasons, Please contact our Technical Support');
        }

        $updatedUserObject = User::socialLogin($user->email, $request->input('social_id'), $user->id);
        return Helper::successResponse('First Time login successfully', $updatedUserObject);
    }

    // reset user password by admin
    public function resetPasswordByAdmin(ResetPasswordByAdmin $request){
        try {

            DB::table('users')->where('id', $request->input('id'))->update([
                'password' => Hash::make($request->input('password'))
            ]);

            return helper::successresponse('Password updated Successfully',null);

        }catch (\Exception $exception){

            return helper::servererrorresponse($exception->getmessage());
        }
    }

    // reset user password by user
    public function UserController(ChangePassword $request){
        try {

            DB::table('users')->where('id', $request->input('id'))->update([
                'password' => Hash::make($request->input('password'))
            ]);

            return helper::successresponse('Password updated Successfully',null);

        }catch (\Exception $exception){

            return helper::servererrorresponse($exception->getmessage());
        }
    }
    public function verifyUserAccount($token){
        try {
            $Model = User::where('active_jwt_token',$token)->first();
            if($Model){
             $Model->email_verified_at=Carbon::now();
             $Model->is_email_verified=1;
                $Model->save();
                Mail::to($Model->email)->send(new WelcomMsg('k'));
                return helper::successresponse('Congratulations, your account has been activated.',['role_id'=>$Model->role_id]);
            }else{
                return helper::servererrorresponse("Sorry, your Token is Expired or Invalid.");
            }

        }catch (\Exception $exception){

            return helper::servererrorresponse($exception->getmessage());
        }
    }
    
    public function passwordReset(Request $request){
        //return view('emails.reset-password', ['name'=>'akdda','resetUrl' => 'pakistan is /','token'=>'sadfkkasdfasdfasdf']);
        try {
            $password=$request->password;
            $Email=DB::table('password_resets')->where('token',$request->token)->first();
            if(isset($Email)){
                $user = User::where('email',$Email->email)->first();
                $user->password=Hash::make($password);
                $user->save();
                return helper::successresponse('Congratulations, your Password has been changed.',['role_id'=>$user->role_id]);
            }else{
                return helper::servererrorresponse("Sorry, your Token is Expired or Invalid.");
            }

        }catch (\Exception $exception){

            return helper::servererrorresponse($exception->getmessage());
        }
    }
    public function delete(Delete $request){
       
        //return view('emails.reset-password', ['name'=>'akdda','resetUrl' => 'pakistan is /','token'=>'sadfkkasdfasdfasdf']);
        try {
            $id=$request->id;
            $user = User::where('id', $id)->first();
            if(isset($user)){
                $UCT=UserConditionTreated::where('id', $id)->first();
                if(isset($UCT)){$UCT->delete();}
                $ET=EducationType::where('id', $id)->first();
                if(isset($ET)){$ET->delete();}
                $UA=UserApproval::where('id', $id)->first();
                if(isset($UA)){$UA->delete();}
                $UC= UserCategory::where('id', $id)->first();
                if(isset($UC)){$UC->delete();}
                $UCon= UserConsultation::where('id', $id)->first();
                if(isset($UCon)){$UCon->delete();}
                $UEd= UserEducation::where('id', $id)->first();
                if(isset($UEd)){$UEd->delete();}
                $UsFq=UserFaq::where('id', $id)->first();
                if(isset($UsFq)){$UsFq->delete();}
                $UsFqV=UserFaqView::where('id', $id)->first();
                if(isset($UsFqV)){$UsFqV->delete();}
                $US=UserService::where('id', $id)->first();
                if(isset($US)){$US->delete();}
                $Uimg=UserImage::where('id', $id)->first();
                if(isset($Uimg)){$Uimg->delete();}
                $UVid=UserVideo::where('id', $id)->first();
                if(isset($UVid)){$UVid->delete();}
                if($user->delete()){
                    return helper::successresponse('Congratulations, user has been deleted.',null); 
                }else{
                    return helper::successresponse('Congratulations, user has been deleted.',null); 
                }
               
            }else{
                return helper::servererrorresponse("Sorry, try again later.");
            }

        }catch (\Exception $exception){

            return helper::servererrorresponse($exception->getmessage());
        }
    }
    public function UploadProfileImg(Request $request){
        if($request->file('upload')){
            $request->file('upload')->storeAs('media','mytestCroptImg.png');
        }else{
            die('not image file');
            $request->file('media')->storeAs('media',$media_object['system_name']);
        }
       
    }
    public function MsgSingle(Request $request){
        $res = User::getMsgSingle($request->id);
    }
    
}
