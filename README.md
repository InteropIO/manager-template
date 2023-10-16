**Table of Contents**

- [🔍 Overview](#-overview)
- [📂 Repository Structure](#-repository-structure)
- [🚀 Getting Started](#-getting-started)
  - [💻 Local Development](#-local-development)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [🌐 Local Kubernetes with minikube](#-local-kubernetes-with-minikube)
    - [Prerequisites](#prerequisites-1)
    - [Deployment Steps](#deployment-steps)
    - [Reloading Cluster](#reloading-cluster)
  - [🌐 Deployment to Production Kubernetes](#-deployment-to-production-kubernetes)
- [🔧 Modifying the Template](#-modifying-the-template)
  - [Databases](#databases)
    - [Switching to PostgreSQL](#switching-to-postgresql)
  - [Authentication](#authentication)

# 🔍 Overview
  
[io.Manager](https://interop.io/products/io-manager/) is a server-side application that provides a simple, yet scalable, storage mechanism and monitoring service for [io.Connect platforms](https://interop.io/products/io-connect/). For more information, please visit the [official io.Manager documentation](https://docs.interop.io/manager/overview/index.html).

This repository is a template for building and deploying io.Manager to your own infrastructure. It provides a Docker Compose configuration for local development and testing, as well as Kubernetes configurations for deployment to a production environment.

# 📂 Repository Structure

The repository is structured to contain three primary services:

1. **Server**: The core server implementation using NodeJS.
2. **Admin**: A user interface for administration purposes developed in React.
3. **Proxy**: A proxy service to manage and route incoming requests, built with nginx.

Each of these services resides under the `services` directory in its own dedicated folder.

The kubernetes-minikube configurations are under the `kubernetes-minikube` folder.

```
repo-root/
│
├── kubernetes-minikube/
│
├── services/
│   ├── server/
│   ├── admin/
│   └── proxy/
│
├── docker-compose.yml
└── README.md
```

# 🚀 Getting Started

## 💻 Local Development

You can clone the repository, make modifications to any of the service implementations, and then use Docker Compose to test your changes locally.

### Prerequisites

- Docker

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/InteropIO/manager-template
   cd manager-template
   ```

2. Use Docker Compose to build and start the services:
   ```bash
   docker-compose -p io-manager up --build
   ```

You can also use the `npm start` command to run the above Docker Compose command.

After running the command, the services will be started at `http://localhost:8080/server` and `http://localhost:8080/admin`.

## 🌐 Local Kubernetes with minikube

This repository provides Kubernetes configurations tailored for local testing using Minikube. If you wish to deploy the services using Minikube, follow the steps below.

### Prerequisites

- Docker
- Minikube
- `kubectl` configured to communicate with your Minikube cluster

Use [this article](https://minikube.sigs.k8s.io/docs/start/) to setup minikube.

### Deployment Steps

1. Setup the minikube cluster (this will build the images, load them into minikube and aplly the kubernetes configurations)
   ```bash
   npm run setup:mini
   ```

2. Run the following to tunnel the services to your local machine:
   ```bash
   npm run tunnel:mini
   ```

This should make the services available at `http://localhost:8080/server` and `http://localhost:8080/admin`.


### Reloading Cluster

1. Use the following command to delete the cluster configurations, build new images, load the new images into minikube and apply the kubernetes configuration again
    ```bash
   npm run reload:mini
   ```

## 🌐 Deployment to Production Kubernetes

If you plan to deploy the services to a production Kubernetes cluster on a cloud provider like Azure or AWS, you'll need to make some changes to the provided configurations:

1. **Volumes**: Modify the volume configurations to suit your cloud provider's storage solution. Update the configurations in `kubernetes-minikube/volumes.yaml`.
2. **Reverse Proxy Configuration**: Adjust the reverse proxy settings based on your deployment environment. Modify the configurations in `kubernetes-minikube/reverse-proxy.yaml`.

After making these changes, you can then deploy to your chosen Kubernetes service. Ensure you thoroughly test all configurations in a staging environment before deploying to production to ensure optimal performance and security.

# 🔧 Modifying the Template

## Databases

By default, this package is integrated with a **MongoDB** database. However, io.Manager supports a variety of databases, granting flexibility based on your requirements and deployment environment.

### Switching to PostgreSQL

*PLACEHOLDER*: Instructions on how to switch to PostgreSQL will be provided here.

## Authentication

*PLACEHOLDER*: Instructions on how to implement different authentication flows will be provided here.