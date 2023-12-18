# Project Setup Guide

## Requirements

1. **XAMPP:**
   - Install [XAMPP](https://www.apachefriends.org/index.html) on your system.
   - Add `C:\xampp\php` to the PATH environment variable.

## Setting Up the Development Environment

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/azandabot/asg_screening_php.git
   cd asg_screening_php

2. **Start PHP Development Server:**
   ```
   cd project_dir
   php -S localhost:7000
   ```
3.  Database Setup:

    -   Open XAMPP and start Apache and MySQL.
    -   Open your web browser and go to http://localhost/phpmyadmin.
    -   Create a new database named "asg_screening_db".
    -   Import the SQL dump found in the `db/` directory of your project.
4.  Configure Database Connection:

    -   Locate the `dbconfig.php` file in your project.
    -   Set the appropriate values for database connection parameters like host, username, password, and database name.
5.  Run the Application:

    -   Open your web browser and go to [http://localhost:7000](http://localhost:7000/).