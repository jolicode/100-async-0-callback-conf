# Demo of a Symfony App under the Fiber extension

## Requirements

 * docker
 * php + composer

## Installation

 * ``docker build -t asyncconfdemo .``
 * ``docker run -d -p 8088:80 -v `pwd`/app:/var/www/symfony asyncconfdemo``
 * ``cd app && composer update --ignore-platform-reqs``

## Usage

 * Go to http://localhost:8088
 
## Pull request explanation

 * Master = Legacy application with some calls to an http service
 * [Pull request 1](https://github.com/jolicode/100-async-0-callback-conf/pull/2) = First migration, inject your Symfony App into an event Loop
 * [Pull request 2](https://github.com/jolicode/100-async-0-callback-conf/pull/3) = Second migration, replace existing implementation with async one
 * [Pull request 3](https://github.com/jolicode/100-async-0-callback-conf/pull/4) = Third migration, use the power of async to make things speed up
