# ✨ Postgres en Docker

Con el comando `docker compose up -d postgres` levantamos el servicio

Con el comando `docker compose ps` vemos en donde esta corriendo y si se levanto de forma correcta

Con el comando `docker compose down` bajamos el servicio

📌 Para conectarse al contenedor por terminal

| Comando                                                         | Descripción                    |
| --------------------------------------------------------------- | ------------------------------ |
| `docker-compose exec <nombre del contenedor> bash`              | Conexión via terminal          |
| `ls -l`                                                         | Ver todos los archivos         |
| `psql -h localhost -d <nombre de la bd> -U <nombre de usuario>` | Conexión a Postgres            |
| `\d+`                                                           | Estructura de la base de datos |
| `\q`                                                            | Salir base de datos            |
| `exit`                                                          | Salir del contenedor           |

📌 interfaz gráfica **pgadmin**

| Comando                        | Descripción                  |
| ------------------------------ | ---------------------------- |
| `docker-compose up -d pgadmin` | Levantar servicio de pgadmin |
| `docker-ps `                   | Tabla de servicios           |
| `docker-inspect <id>`          | Detalle del contenedor       |



