<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use DB;

class Kernel extends ConsoleKernel
{

    protected $commands = [
        \App\Console\Commands\DeleteAccount::class,
    ];
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        if ( ! strstr(shell_exec('ps xf'), 'php artisan queue:work'))
        {
            $schedule->command('command:delete_account')->everyMinute();
        }

        //$schedule->command('cron:delete_account')->daily();

        /*$schedule->call(function () {
            //DB::table('account_to_deletes')->whereDate(now()'created_at', '>', now()->addDays(7)->toDateTimeString())

        })->daily();*/
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
