# Food Delivery Microservices (NestJS)

A small NestJS-based microservices workspace that models a food delivery workflow with three services (orders, kitchen, rider), RabbitMQ for events, and Postgres + Drizzle for persistence.

![Architecture diagram](./public/docs/architecture.png)

## Services

| Service | Role | Transport | Database |
| --- | --- | --- | --- |
| [apps/orders-service](apps/orders-service) | HTTP API for creating orders; emits `order_created` | HTTP + RMQ | Postgres (orders) |
| [apps/kitchen-service](apps/kitchen-service) | Consumes `order_created`, creates a ticket, emits `order_ready` | RMQ | Postgres (kitchen) |
| [apps/rider-service](apps/rider-service) | Consumes `order_ready` and dispatches a rider | RMQ | Postgres (rider) |

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker (for RabbitMQ + Postgres)

## Quickstart

1) Start RabbitMQ + databases:

```bash
docker compose up -d
```

2) Install dependencies:

```bash
pnpm install
```

3) Set environment variables (one per service):

```bash
# orders-service
DATABASE_URL=postgresql://order:order@localhost:5432/orders

# kitchen-service
DATABASE_URL=postgresql://kitchen:kitchen@localhost:5433/kitchen

# rider-service
DATABASE_URL=postgresql://rider:rider@localhost:5434/rider
```

4) Run the services (separate terminals):

```bash
pnpm -C apps/orders-service start:dev
pnpm -C apps/kitchen-service start:dev
pnpm -C apps/rider-service start:dev
```

> [!TIP]
> RabbitMQ management UI is available at http://localhost:15672 (default user/pass: admin/admin).

## API

- `POST /orders` (Orders Service, default port 3000)

Example request:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Ava","item":"Burger","quantity":2}'
```

## Migrations (Drizzle)

Run per service as needed:

```bash
pnpm -C apps/orders-service db:generate
pnpm -C apps/orders-service db:migrate

pnpm -C apps/kitchen-service db:generate
pnpm -C apps/kitchen-service db:migrate

pnpm -C apps/rider-service db:generate
pnpm -C apps/rider-service db:migrate
```

> [!NOTE]
> Each service has its own database and Drizzle schema; migrations are isolated per service.

## Tests

```bash
pnpm -C apps/orders-service test
pnpm -C apps/kitchen-service test
pnpm -C apps/rider-service test
```

## Local Ports

- Orders API: 3000 (default)
- RabbitMQ: 5672 (AMQP), 15672 (management UI)
- Orders DB: 5432
- Kitchen DB: 5433
- Rider DB: 5434
