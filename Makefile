.PHONY: start stop build logs clean migrate-latest migrate-rollback reset-db

start:
	docker-compose up --build

start-prod:
	docker-compose up --build -d

stop:
	docker-compose down

build:
	docker-compose build

logs:
	docker-compose logs -f

clean:
	docker-compose down -v

migrate-latest:
	docker-compose run --rm migration npm run migrate:latest

migrate-rollback:
	docker-compose run --rm migration npm run migrate:rollback

# Reset database and run migrations fresh
reset-db:
	docker-compose down -v
	docker-compose up -d db
	@echo "Waiting for database to be ready..."
	sleep 5
	docker-compose run --rm migration npm run migrate:latest
	docker-compose up -d app 