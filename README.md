# Install project

### Склонируйте проект

git clone <project link>

### Поменяйте настройки .env файла на ваши, пример в проекте 


 ##### Также необходимо поменять данные в docker-compose.yml на свои возможно еще и context

  environment:
      APP_PORT: 8000
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: edo515
      DB_NAME: todos
 
 DB_HOST должен остаться db и в env тоже , если запускаться через докер

#####  POST /tasks - Добавить категорию
 - req.body: {name : string} 

 Обязательно перед созданием задачи необходимо добавить несколько категорий, чтобы проект не упал в контейнере так как без категории не создается задача 

#####  POST /tasks - Добавить задачу
 - req.body: {title : string, body: string, category: categories.id (id категории), completed: boolean}

 
##### GET /categories - все категории
 
##### get /tasks - все задачи

##### GET /tasks/:id - задача  по id

##### PUT /tracks/:id - редактирование
 - req.body: {title : string, body: string, category: categories.id (id категории), completed: boolean}


для локального запуска в env файле нужно поменять DB_HOST с db на localhost


