FROM php:8.1
ARG USER_ID
ARG GROUP_ID

RUN apt-get update && apt-get install -y \
        git \
        curl \
        wget \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev zlib1g-dev libicu-dev g++ libmagickwand-dev --no-install-recommends libxml2-dev \
        libonig-dev \
        libzip-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-install mbstring zip xml gd pdo_mysql \
    && pecl install imagick \
    && docker-php-ext-enable imagick

RUN wget https://getcomposer.org/installer -O - -q \
    | php -- --install-dir=/bin --filename=composer --quiet


RUN usermod -u ${USER_ID} www-data && groupmod -g ${GROUP_ID} www-data

WORKDIR /var/www

USER "${USER_ID}:${GROUP_ID}"

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000"]