<!-- OUTLINE MATERI HARI INI -->

<!-- APA ITU SEQUELIZE -->

Sequelize adalah sebuah ORM (Object-Relational Mapping) untuk Node.js yang memudahkan penggunaan dan interaksi dengan database SQL melalui JavaScript. Dengan Sequelize, pengguna dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada database menggunakan model dan query yang lebih mudah dipahami dan ditulis.

<!-- BAGAIMANA CARA GUNANYA? -->
- untuk cek fitur dari sequelize bisa gunakan sequelize --help
- npm init -y
- npm i pg express ejs sequelize sequelize-cli nodemon
- bikin .gitignore (node_modules)

- initialize sequelize dengan sequelize init
- setting konfigurasi database pada file config.json di dalam folder config
- buat database nya jika belum dibuat dengan cara sequelize db:create

- untuk membuat model dan migration bisa gunakan sequelize model:generate
- Pastikan buat model yang tidak ada foreign key nya terlebih dulu, kalo salah hapus semua file di migrations dan models tanpa menghapus index.js
- umumnya untuk membuat model dan migration kita bisa gunakan sequelize model:generate --name nama_model --attributes nama_kolom:string ex(sequelize model:generate --name User --attributes name:string,age:integer) source : https://sequelize.org/docs/v6/other-topics/migrations/
- langsung check filenya di migration dan sesuaikan bila ada penambahan constraint
- setelah di cek, lsng jalankan sequelize db:migrate

- untuk menambahkan atau memanipulasi column bisa gunakan sequelize migration:generate --name nama_migration lalu pada file migration bisa gunakan method queryInterface.addColumn pada up dan pada down queryInterface.removeColumn
- jangan lupa untuk langkah pertama sebelum menambah / memanipulasi kolom baru, di npx sequelize db:seed:undo:all
- jangan lupa untuk menambahkan juga di model
- untuk menjalankan migration bisa gunakan sequelize db:migrate
- langkah terakhir adalah dengan menjalankan sequelize db:seed:all

- untuk membuat seeder bisa gunakan sequelize seed:generate --name nama_seeder dan langsung jalankan
- jalankan test data dengan menggunakan npx sequelize db:seed:all
- pastikan data yang akan di seeding kalian required dan olah sblm di seed, perhatikan column id dalam data tidak perlu diinput dan pastikan kalian menambahkan createdAt dan updatedAt pada tiap data yang akan diseed.
- buat utk up dan down nya
- untuk menjalankan seeder bisa gunakan sequelize db:seed:all

catatan : agar id kembali dari angka 1, 
-jalankan sequelize db:migrate:undo:all
-jalankan sequelize db:migrate
-jalankan sequelize db:seed:all

- untuk mengambil semua data kalian bisa menggunakan method findAll
- jika perlu menggunakan where bisa gunakan method findAll({where: {nama_kolom: value}}) dan jika hanya beberapa column attributes saja yang ingin ditampilkan bisa menggunakan method findAll({attributes: ['nama_column', ..]}) source : https://sequelize.org/master/manual/model-querying-basics.html

- untuk mengambil satu data bisa menggunakan method findOne({where: {nama_kolom: value}}) atau kalian bisa menggunakan method findByPk(id)

- sequelize juga menyediakan operator dengan menggunakan method Op pada sequelize, source : https://sequelize.org/master/manual/model-querying-basics.html#operators ex: like, ilike, not null.

- untuk update dan delete kalian juga bisa menggunakan method update dan destroy, source : https://sequelize.org/master/manual/model-querying-basics.html#updating-and-destroying

- dalam sequelize clause tidak ada urutannya, seperti order, group, where, limit, offset bisa diletakan dimana saja.

- untuk insert data bisa menggunakan method create, source : https://sequelize.org/master/manual/model-querying-basics.html#creating-and-updating
