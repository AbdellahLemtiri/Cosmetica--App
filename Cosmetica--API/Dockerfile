FROM php:8.2-fpm

# Set working directory inside the container
WORKDIR /var/www

# Install dependencies (added libpq-dev for PostgreSQL)
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    curl

# Install PHP extensions (using pdo_pgsql instead of pdo_mysql)
RUN docker-php-ext-install pdo_pgsql zip exif pcntl gd

# Install Composer from the official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project files into the container
COPY . .

# Set permissions for Laravel folders
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port 9000
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]