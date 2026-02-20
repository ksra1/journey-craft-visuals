# Akamai Overview: Delivery, Security, Compute

This README summarizes how classic Akamai products map into the modern **Delivery / Security / Compute** pillars, and provides examples for EdgeWorkers, Terraform, and Jenkins.

---

## 1. Product mapping tables

### 1.1 Delivery

| Classic name                | Current pillar / family                              | Purpose (short)                                                                 |
|----------------------------|------------------------------------------------------|---------------------------------------------------------------------------------|
| Ion                        | Delivery → Web Performance / CDN                     | Property‑based web/app delivery and performance optimizations at the edge.      |
| Image & Video Manager (IVM)| Delivery → Web Perf / Media Optimization             | Dynamic image/video optimization (resize, format, quality) at the edge.         |
| Adaptive Media Delivery    | Delivery → Media & Gaming                            | Streaming/media CDN for live and VOD with adaptive bitrate.                     |
| Edge DNS                   | Delivery → DNS / Core Network Services               | Authoritative DNS hosted on Akamai’s edge network.                              |
| mPulse (RUM)               | Delivery → Performance / Observability               | Real User Monitoring and performance analytics dashboards.                      |

### 1.2 Security

| Classic name                  | Current pillar / family                                | Purpose (short)                                                                 |
|------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------------|
| Kona Site Defender (KSD/WAF) | Security → Web App & API Protection (WAAP)             | Core WAF; effectively part of App & API Protector / WAAP offerings.             |
| Bot Manager                  | Security → Application & API Security (within WAAP)    | Bot detection and mitigation for scraping, credential stuffing, fraud, etc.     |
| Prolexic Routed              | Security → DDoS Protection (Prolexic family)           | Routed DDoS scrubbing and protection for networks/apps.                         |
| API Security stack           | Security → API Security & Posture Management           | API discovery, posture, and runtime protection (Noname/Apiiro integrations).    |

### 1.3 Compute

| Name                      | Pillar / family                          | Purpose (short)                                                       |
|---------------------------|-------------------------------------------|------------------------------------------------------------------------|
| Akamai Connected Cloud    | Compute (Linode‑based distributed cloud) | VMs, Kubernetes, storage, DBs on Akamai’s global infrastructure.      |
| EdgeWorkers               | Compute → Edge Compute                    | Serverless JavaScript at the edge on HTTP request/response events.    |
| Inference Cloud           | Compute → AI / Edge Inference             | GPU‑backed AI inference platform at or near edge PoPs.                |

---

## 2. EdgeWorkers example

### 2.1 Concept

EdgeWorkers let you run JavaScript on the Akamai edge, reacting to HTTP lifecycle events like `onClientRequest` and `onClientResponse`. You attach an EdgeWorker ID to a property (e.g., an Ion config) and it executes for matching traffic.

Typical use cases:

- Custom routing, header manipulation, and redirects.
- Simple personalization or A/B logic at the edge.
- Generating synthetic responses without going to origin.

### 2.2 Sample EdgeWorker (`src/main.js`)

```javascript
// src/main.js

import { logger } from 'log';

// Called when a client request hits the edge.
export function onClientRequest(request) {
  // Log the incoming path for debugging.
  logger.log('EdgeWorker handling path: %s', request.path);

  // Generate a synthetic response directly from the edge.
  request.respondWith(
    200,
    { 'Content-Type': 'text/html; charset=UTF-8' },
    '<html><body><h1>Hello from Akamai EdgeWorkers</h1></body></html>'
  );
}

// Called before the response is sent back to the client.
export function onClientResponse(request, response) {
  // Add a custom header to the response.
  response.setHeader('X-EdgeWorker-Demo', 'HelloWorld');
}
```

---

## 3. Terraform Example

### 3.1 Deploying a Spring Boot Application to GCP Cloud Run
This example demonstrates a simple Terraform configuration to deploy a Spring Boot application (packaged as a container) to Google Cloud Run.

```hcl
provider "google" {
  project = "your-project-id"
  region  = "us-central1"
}

// https://developer.hashicorp.com/terraform/language/resources
// 'resource' defines a piece of infrastructure (like a server or a cloud service)
resource "google_cloud_run_service" "springboot_app" {
  name     = "springboot-service"
  location = "us-central1"

  # 'template' describes the container image and configuration to deploy
  template {
    spec {
      containers {
        image = "gcr.io/your-project-id/springboot-app:latest"
        ports {
          container_port = 8080
        }
      }
    }
  }

  # 'traffic' defines how incoming requests are distributed (e.g., 100% to latest)
  traffic {
    percent         = 100
    latest_revision = true
  }
}

// Another 'resource' block to set IAM permissions (e.g., making the service public)
resource "google_cloud_run_service_iam_member" "public_access" {
  service  = google_cloud_run_service.springboot_app.name
  location = google_cloud_run_service.springboot_app.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
```

---

## 4. Jenkins Example

### 4.1 Maven Build and Deploy
Example `Jenkinsfile` for a Maven-based Spring Boot application build and deployment pipeline.

```groovy
pipeline {
    agent any

    tools {
        maven 'Maven 3.9.x'
        jdk 'Java 17'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/springboot-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to GCP...'
                // Integration with Terraform or gcloud CLI
                // sh 'terraform apply -auto-approve'
            }
        }
    }
}
```

