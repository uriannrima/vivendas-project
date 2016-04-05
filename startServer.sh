# Reiniciar servidor do MySQL.
mysql-ctl restart
# mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"

# Echo da URL da aplicação.
echo "Projeto executando na URL: https://vivendas-project-uriannrima.c9users.io."

# Iniciar servidor do NodeJS.
nodemon "backend/server.js"