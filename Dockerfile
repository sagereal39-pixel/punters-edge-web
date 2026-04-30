# Use a lightweight PHP-Apache image
FROM php:8.2-apache

# Install the MySQLi extension (what was breaking Railway)
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Copy your PHP files to the server's web directory
COPY *.php /var/www/html/

# Expose port 80 for Render
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]