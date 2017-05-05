[![Build Status](https://travis-ci.org/armagames/eruditor-next-api.svg?branch=master)](https://travis-ci.org/armagames/eruditor-next-api)

# Установка

npm install

# Конфигурирование

Для работы приложения требуется база данных (MongoDb) с коллекцией записей необходимых типов.  
Параметры подключения к базе данных передаются приложению через параметры.  
Например, для запуска с помощью vscode нужно что бы секция arsv в файле .vscode/launch.json должна содержать следующие параметры:  
`arsv: [ "-cs", "mongodb://localhost:27017/eruditor" ]`  

# Использование

Приложение доступно по адресу  
`http://localhost:27099/api`