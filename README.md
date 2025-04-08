# Raffle Management System

A complete web application for organizations, businesses, non-profits, cooperatives, and communities to create, manage and run online raffles. Built with Laravel and React.

## 🎯 Features

This system is versatile and can be used by various types of organizations including:
- Businesses running promotional raffles
- Non-profit organizations fundraising through raffles
- Cooperatives organizing member-exclusive draws
- Communities hosting social events
- Schools and universities for campus events
- Clubs and associations for member engagement

The platform includes:

- **Multi-tenant system**: Each organization has its own isolated environment
- **Raffle Management**: Create, edit, and manage multiple raffles
- **Participant Management**: Track and manage raffle participants
- **Prize Management**: Set up multiple prizes for each raffle
- **Flexible Entry System**: Support for manual entry, CSV import, and online entry
- **Interactive Draw System**: Live drawing interface with animation and visual effects
- **Winner Management**: Track winners and prize claim status
- **Public & Private Raffles**: Control access with access codes for private raffles
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🚀 Technology Stack

- **Backend**: Laravel 10+
- **Frontend**: React with Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL/PostgreSQL/SQLite
- **Authentication**: Laravel Fortify
- **UI Components**: Custom components with React Icons

## 📋 Requirements

- PHP 8.1+
- Node.js 16+
- Composer
- npm or yarn
- MySQL, PostgreSQL, or SQLite

## ⚙️ Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/raffle-management-system.git
   cd raffle-management-system
   ```

2. Install PHP dependencies:
   ```
   composer install
   ```

3. Install NPM dependencies:
   ```
   npm install
   ```

4. Create environment file:
   ```
   cp .env.example .env
   ```

5. Generate application key:
   ```
   php artisan key:generate
   ```

6. Configure your database in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=raffle_system
   DB_USERNAME=root
   DB_PASSWORD=
   ```

7. Run migrations:
   ```
   php artisan migrate
   ```

8. Create storage link:
   ```
   php artisan storage:link
   ```

9. Build frontend assets:
   ```
   npm run dev
   ```

10. Start the development server:
    ```
    php artisan serve
    ```

Visit `http://localhost:8000` to access the application.

## 🧑‍💻 Usage

### Setting Up Your Organization

After registration, you'll be prompted to set up your organization with:
- Organization name
- Description
- Primary and secondary colors (for branding)

### Managing Raffles

1. **Create a Raffle**: Define title, description, date range, and entry limits
2. **Add Prizes**: Create prizes with names, descriptions, images, and quantities
3. **Gather Entries**: Add entries manually, import via CSV, or share the public entry link
4. **Conduct the Draw**: Use the interactive draw interface to select winners
5. **Manage Winners**: Track prize claims and communicate with winners

## 📊 Data Model

The system consists of the following primary models:

- **User**: System user accounts
- **Organization**: Entity running raffles (business, non-profit, cooperative, etc.)
- **Raffle**: Individual raffle events
- **Prize**: Prizes available in a raffle
- **Participant**: Individuals entering raffles
- **RaffleEntry**: Individual entries in a raffle
- **Winner**: Records of prize winners

## 🔒 Security

- Private raffles are protected with access codes
- All user data is validated and sanitized
- CSRF protection for all forms
- Authentication required for administrative functions
- Input validation on all endpoints

## 🛠 Configuration Options

Various system behaviors can be configured through environment variables:

- `APP_NAME`: Application title
- `MAIL_*`: Email configuration for notifications
- `DB_CONNECTION`: Database type (mysql, pgsql, sqlite)
- `FILESYSTEM_DISK`: Storage system for images

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or support, please open an issue on this repository or contact the maintainers.

---

Made with ❤️ for organizations of all types
