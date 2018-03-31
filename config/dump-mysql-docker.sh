# Backup
set -xe

docker-compose exec scrollerdb /usr/bin/mysqldump -u root --password=pass Scroller_db > ../backup.sql

# Restore
# cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE
