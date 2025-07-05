# Fake Logger Services

This repo contains 3 fake services `order`, `user`, and `product`. Each of these services just generate random and fake logs of various levels.

**Feel free to use this repo for any devops related activities like CICD, Containerization, K8s, Security, etc**

## Tools & Libraries

1. Faker.js
2. moment

## Usage

Build the docker image for each service using the common `Dockerfile`. Adjust the docker context to build images corresponding to each service

```bash
docker build -t <image_name>:<image_tag> ./<service_folder>

# eg.
docker build -t order_service:latest ./order-service
```

## Key Insights you can monitor

### Global Insights

| Insight                                      | Description                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------- |
| **Log Volume Over Time**                     | Are log events spiking unexpectedly? Possible issue or attack.            |
| **Error Rate by Service**                    | Visualize how many `ERROR`/`FATAL` logs are coming from each service.     |
| **Top Actions or Statuses**                  | Filter and count by `action` or `status` fields across all services.      |
| **Latency Spikes (Simulated by Timestamps)** | If you log `duration` later, plot slow operations.                        |
| **Trace ID Heatmaps**                        | Volume of unique `trace_id` per time window (more means higher activity). |

### Order Service Insights

| Insight                          | Example Query in Grafana (Loki Log Panel)  | Description                                         |                                        |                             |
| -------------------------------- | ------------------------------------------ | --------------------------------------------------- | -------------------------------------- | --------------------------- |
| **Orders per status**            | `{service="order-service", level="INFO"}`  | Show counts by `status` (e.g., `placed`, `shipped`) |                                        |                             |
| **Frequent order cancellations** | \`json                                     | status="cancelled"\`                                | Spot if users are abandoning purchases |                             |
| **Errors by error\_type**        | \`json                                     | level="ERROR"                                       | error\_type != ""\`                    | Detect DB or network issues |
| **FATAL event timeline**         | `{service="order-service", level="FATAL"}` | Used for alerts or incident correlation             |                                        |                             |

### Product Service Insights

| Insight                            | Example                                      | Description                        |
| ---------------------------------- | -------------------------------------------- | ---------------------------------- |
| **Most frequent product updates**  | `action="updated"`                           | Tracks catalog changes             |
| **Inventory health**               | `action="stock_adjusted"` with quantity info | Spot low-stock or frequent changes |
| **Pricing changes**                | `action="price_updated"`                     | Helps marketing/finance teams      |
| **Published vs unpublished count** | Bar chart of product visibility changes      | Tracks content control             |

### User Service Insights

| Insight                       | Example                                                      | Description                                           |                            |                                                       |
| ----------------------------- | ------------------------------------------------------------ | ----------------------------------------------------- | -------------------------- | ----------------------------------------------------- |
| **Most common user actions**  | \`json                                                       | level="INFO"                                          | action\`                   | Pie chart of actions: `logged_in`, `registered`, etc. |
| **Account security activity** | \`json                                                       | action="2FA\_enabled" OR action="password\_changed"\` | Security-sensitive changes |                                                       |
| **Error types**               | Group by `error_type`                                        | Spot backend or auth-related issues                   |                            |                                                       |
| **User churn risk**           | `action="unsubscribed_from_newsletter"` or `deleted_account` | Behavioral signals for churn analysis                 |                            |                                                       |

## Working

Each service will generate dummy logs in JSON stringified format which is efficient to be used with various tools like Datadog, Loki, Fluentd, ELK, etc.

```bash
# eg.
{"timestamp":"2025-07-05T05:04:49.755Z","trace_id":"2db44902-fb41-406f-a8c1-1c2b07e6f0e0","level":"INFO","service":"user-service","message":"User profile updated","user_id":"cf35b541-9113-4055-a86a-0687088b9ef9","username":"Eula27","email":"Santos.Green45@hotmail.com","action":"profile updated"}
```

Each service generates logs at fixed specific interval but varies in log level based on weigts defined in the services.

### Created and maintained by
Shoaib S. Shaikh