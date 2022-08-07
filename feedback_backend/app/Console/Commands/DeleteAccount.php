<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\AccountToDelete;

class DeleteAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:delete_account';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'delete user account after 7 days';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        //$accounts = AccountToDelete::all()->get();

        $users = User::where('email_verif_status', false)->get();
        foreach($users as $user) {
            $user->update(['email_verif_status' => true]);
        }
    }
}
