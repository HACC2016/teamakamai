<?php
     namespace telecare\Repositories;

     use telecare\Interfaces\UserRepositoryInterface;
     use telecare\User;

     class UserRepository implements UserRepositoryInterface{

         public function doSelectUsers(){
            return User::all();
         }

     }
?>