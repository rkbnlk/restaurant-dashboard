Basic Requirements:
    Laravel Version 12.28.1
    Node Version v22.18.0
Clone project from github:
    Place the project folder inside htdocs (e.g., C:\xampp\htdocs\restaurant-dashboard) before proceeding.

Backend (Laravel)
1. Open Terminal & Navigate to your backend folder:
    cd C:\xampp\htdocs\restaurant-dashboard\backend
2. Install dependencies:
    composer install
3. Update DB settings:
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=restaurant_dashboard
    DB_USERNAME=root
    DB_PASSWORD=  # your MySQL password
4. Run migrations and seeders OR Import restaurant_dashboard.sql:
    php artisan migrate
    php artisan seed:from-json
5. Start the Laravel server:
    php artisan serve

Frontend (React + Vite)
1. Open Terminal & Navigate to your frontend folder:
    cd C:\xampp\htdocs\restaurant-dashboard\frontend
2. Install dependencies:
    npm install
3. Start the development server:
    npm run dev

