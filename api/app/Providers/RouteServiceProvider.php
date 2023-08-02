<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider{

    protected $namespace = 'App\Http\Controllers';
    protected $userNamespace = 'App\Http\Controllers\User';
    protected $roleNamespace = 'App\Http\Controllers\Role';
    protected $masterNamespace = 'App\Http\Controllers\Master';
    protected $mediaNamespace = 'App\Http\Controllers\Media';
    protected $classifiedNamespace = 'App\Http\Controllers\Classified';
    protected $messageNamespace = 'App\Http\Controllers\Message';
    public function boot(){
        parent::boot();
    }

    public function map(){
        $this->mapApiRoutes();
        $this->mapWebRoutes();
        $this->mapUserRoutes();
        $this->mapMasterRoutes();
        $this->mapRoleRoutes();
        $this->mapMediaRoutes();
        $this->mapClassifiedRoutes();
        $this->mapMessageRoutes();
        $this->mapAdminRoutes();
    }

    protected function mapWebRoutes(){
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    protected function mapApiRoutes(){
        Route::prefix('api')
//             ->middleware('cors')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    protected function mapUserRoutes(){
        Route::prefix('api/user')
//            ->middleware('cors')
            ->namespace($this->userNamespace)
            ->group(base_path('routes/user.php'));
    }
    protected function mapAdminRoutes(){
        Route::prefix('api/admin')
//            ->middleware('cors')
            ->namespace($this->userNamespace)
            ->group(base_path('routes/admin.php'));
    }
    
    protected function mapRoleRoutes(){
        Route::prefix('api/role')
//            ->middleware('cors')
            ->namespace($this->roleNamespace)
            ->group(base_path('routes/role.php'));
    }

    protected function mapMediaRoutes(){
        Route::prefix('api/media')
//            ->middleware('cors')
            ->namespace($this->mediaNamespace)
            ->group(base_path('routes/media.php'));
    }

    protected function mapMasterRoutes(){
        Route::prefix('api/master')
//            ->middleware('cors')
            ->namespace($this->masterNamespace)
            ->group(base_path('routes/master.php'));
    }
    protected function mapClassifiedRoutes(){
        Route::prefix('api/classified')
//            ->middleware('cors')
            ->namespace($this->classifiedNamespace)
            ->group(base_path('routes/classified.php'));
    }
    protected function mapMessageRoutes(){
        Route::prefix('api/message')
//            ->middleware('cors')
            ->namespace($this->messageNamespace)
            ->group(base_path('routes/message.php'));
    }
    
}
