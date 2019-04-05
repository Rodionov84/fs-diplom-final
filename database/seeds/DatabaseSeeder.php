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
        DB::table('movies')->insert([
            'name' => 'Звёздные войны III: Атака клоунов',
            'duration' => 121,
            'country' => 'Бангладеш',
            'description' => 'Три сотни лет назад средиземные хутора разоряла шайка хреновых-лохов во главе с могущественным колдуном.',
            'poster' => 'i/poster1.jpg',
        ]);
        DB::table('movies')->insert([
            'name' => 'Альфач',
            'duration' => 112,
            'country' => 'Мьянма',
            'description' => '20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.',
            'poster' => 'i/poster1.jpg',
        ]);
        DB::table('movies')->insert([
            'name' => 'Хищник',
            'duration' => 93,
            'country' => 'Канада, США',
            'description' => 'Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.',
            'poster' => 'i/poster1.jpg',
        ]);
    }
}
