**Table of Contents**

- [🔍 Overview](#-overview)
- [📂 Repository Structure](#-repository-structure)
  - [Before you start](#before-you-start)
    - [Access to interop.io JFrog](#access-to-interopio-jfrog)
    - [Change the default username](#change-the-default-username)
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
  
This repository is a template for building and deploying io.Manager to your own infrastructure. It provides a Docker Compose configuration for local development and testing, as well as Kubernetes configurations for deployment to a production environment.

# 📂 Repository Structure

The repository is structured to contain three primary services:

1. **Server**: The core server implementation using NodeJS.
2. **Admin**: A user interface for administration purposes developed in React.
3. **Proxy**: A proxy service to manage and route incoming requests, built with nginx.

Each of these services resides under the `services` directory in its own dedicated folder.

The kubernetes configurations are under the `kubernetes` folder.

```
advanced/
│
├── kubernetes/
│
├── services/
│   ├── server/
│   ├── admin/
│   └── proxy/
│
├── docker-compose.yml
└── README.md
```

## Before you start

### Access to interop.io JFrog
The NPM packages exposing io.Manager and the Admin UI are hosted in a private NPM repository. To obtain access, [contact us](https://interop.io/contact/).

Once you have access to JFROG you need to generate an .npmrc file that will authenticate you to the repository. To do so:

1. Login to JFROG.
2. Expand the menu in top right and click "Setup"
3. Select "NPM".
4. From the dropdown menu select _default-npm-virtual_.
5. Copy the snippet.
6. Create an .npmrc file with the copied contents and add it to the services/server and services/admin folders.

### Change the default username

By default the server is configured with none authentication, which means it trust the username provided by the client and does no verifications. When connecting to the server the desktop platform will send the username of the current user. With that configuration any client can fetch data from the server, however to access the administrative UI he will need to be granted an extra role. The default set of users that have that role is hardcoded in the server. 

To change the list you need to modify the file `services/server/src/config.ts` and change the value of the `auth_exclusive_users` var.

If you want to switch to another authentication check the [Authentication](#authentication) section in our docs.

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

If you want to experiment with the Kubernetes configurations locally, you can use minikube to deploy the application to a local cluster.

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

1. **Volumes**: Modify the volume configurations to suit your cloud provider's storage solution. Update the configurations in `kubernetes/volumes.yaml`.
2. **Reverse Proxy Configuration**: Adjust the reverse proxy settings based on your deployment environment. Modify the configurations in `kubernetes/reverse-proxy.yaml`.

After making these changes, you can then deploy to your chosen Kubernetes service. Ensure you thoroughly test all configurations in a staging environment before deploying to production to ensure optimal performance and security.

# 🔧 Modifying the Template

## Databases

By default, this package is integrated with a **MongoDB** database. However, io.Manager supports a variety of databases, granting flexibility based on your requirements and deployment environment.

### Switching to PostgreSQL

*PLACEHOLDER*: Instructions on how to switch to PostgreSQL will be provided here.

## Authentication

*PLACEHOLDER*: Instructions on how to implement different authentication flows will be provided here.