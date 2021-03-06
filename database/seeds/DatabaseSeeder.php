<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([PermissionsTableSeeder::class]);
        $this->call([UsersTableSeeder::class]);
        $this->call([BrandsTableSeeder::class]);
        $this->call([CategoriesTableSeeder::class]);
        $this->call([ProductsTableSeeder::class]);
        $this->call([ProviderTableSeeder::class]);
    }
}
