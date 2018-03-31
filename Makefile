DC=docker-compose
BUILD=build
DOWN=down
UP=up -d

# down build and start
all: down_build_up

### basic make ###
down_build_up: down build up

buid_up: build up

build:
	$(DC) $(BUILD)

up:
	$(DC) $(UP)

down:
	$(DC) $(DOWN)

### utils ###
ps:
	$(DC) ps

logs:
	$(DC) logs -f

dumps:
	docker-compose exec scrollerdb /usr/bin/mysqldump -u root --password=pass Scroller_db > backup.sql

set_config:
	python3 config/set_markets_configuration/getMarket.py
