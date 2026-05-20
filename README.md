# 🧓🏼✨ Virasa – Preserving the Legacy of Our Elders & Artisans

[![Live Site](https://img.shields.io/badge/Live_Site-Visit-green?style=for-the-badge)](https://virasa3.vercel.app/)

> *"Every wrinkle tells a story. Every hand, a heritage."*

**Virasa** is a heartfelt digital marketplace and storytelling platform dedicated to **honoring and empowering elderly individuals and artisans** across India. The platform serves as a digital gallery and marketplace preserving traditional crafts, showcasing lived wisdom, and connecting master craftspeople with contemporary global audiences.

---

# 🌟 Key Features

- 📜 **Story Showcase & Submission** – Discover and submit inspiring stories of artisans and elders.
- 🎨 **Interactive Galleries** – Beautiful handcrafted product showcases with immersive UI.
- 🛍️ **Artisan Marketplace** – Explore and purchase authentic handmade crafts.
- 🛒 **Integrated Cart & Favorites** – Shopping functionality powered by React Context API.
- 📱 **Premium UI/UX** – Responsive glassmorphism-inspired modern interface with animations.

---

# 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (React 19) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| State Management | React Context API |
| DevOps | Docker, Jenkins, AWS EC2 |
| Version Control | Git & GitHub |

---

# ⚙️ DevOps & CI/CD Architecture

We implemented a complete CI/CD pipeline that automatically deploys the application from GitHub to AWS EC2 using Jenkins and Docker.

---

## 🔄 CI/CD Workflow

```text
Developer commits code
        │
        ▼
Git Push to GitHub Repository
        │
        ▼
Webhook triggers Jenkins Pipeline
        │
        ▼
Jenkins Server (Windows Host)
        │
        ├── Checkout SCM
        ├── Configure Secure SSH Key Permissions
        ├── SSH into AWS EC2
        │
        ▼
AWS EC2 Production Server
        │
        ├── Pull Latest Code
        ├── Stop & Remove Old Container
        ├── Remove Old Docker Image
        ├── Build New Docker Image
        ├── Run New Container on Port 3000
        │
        ▼
Application Live on Public EC2 IP
```

---

# 🐳 Dockerization

The application was containerized using an optimized multi-stage Docker build.

## Highlights

- Used `node:20-slim`
- Multi-stage Docker build
- Production optimized image
- Reduced image size significantly
- Configured standalone Next.js output

### Docker Build Command

```bash
docker build -t virsa-app .
```

### Run Container

```bash
docker run -d -p 3000:3000 --name virsa-container virsa-app
```

---

# ☁️ AWS EC2 Deployment

## EC2 Configuration

- Ubuntu EC2 Instance
- Docker installed on server
- Git installed on server
- Port 3000 exposed publicly
- SSH access configured using `.pem` key

## Deployment Flow

Jenkins connects remotely to EC2 using SSH and executes deployment commands automatically.

---

# 🔧 Jenkins CI/CD Pipeline

The Jenkins pipeline is fully automated using a `Jenkinsfile`.

## Pipeline Stages

### 1. Checkout SCM
Fetch latest source code from GitHub.

### 2. Configure SSH Security
Secure temporary SSH private key permissions using PowerShell.

### 3. Deploy to EC2
Remote deployment using SSH commands.

---

# 🧩 Real DevOps Challenges Solved

This project involved solving multiple real-world DevOps problems.

---

## ✅ Issue 1 — npm Installation Failure

### Error

```bash
npm error Exit handler never called!
```

### Solution

- Switched to `node:20-slim`
- Used `npm ci`
- Added npm retry configurations

---

## ✅ Issue 2 — Next.js Build Failure

### Error

```bash
sh: 1: next: not found
```

### Solution

Fixed dependency installation stage and Docker layering.

---

## ✅ Issue 3 — Windows ssh-agent Failure

### Error

```bash
Failed to run ssh-agent service
```

### Solution

Replaced:

```groovy
sshagent
```

with:

```groovy
withCredentials
```

This avoided dependency on Windows SSH Agent service.

---

## ✅ Issue 4 — SSH Private Key Permission Error

### Error

```bash
UNPROTECTED PRIVATE KEY FILE!
```

### Solution

Used native PowerShell ACL commands to securely restrict temporary SSH key permissions during Jenkins execution.

---

## ✅ Issue 5 — Docker Build Issues on Jenkins Host

### Problem

WSL2 and local Docker builds caused networking and dependency resolution issues.

### Solution

Moved Docker image building directly to AWS EC2 server instead of local Jenkins host.

---

# 🚀 Live Deployment

The application is successfully deployed and accessible publicly.

## Live URL

```text
http://51.21.192.6:3000
```

---

# 📂 Project Setup

## Clone Repository

```bash
git clone -b gallery-section https://github.com/sachinburnwal22/Virsa.git
cd Virsa
```

---

# 📦 Install Dependencies

```bash
npm install
```

---

# ▶️ Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🐳 Run Using Docker

## Build Docker Image

```bash
docker build -t virsa-app .
```

## Run Container

```bash
docker run -d -p 3000:3000 --name virsa-container virsa-app
```

---

# 🔐 Jenkins Credentials Setup

## Add EC2 SSH Key

Navigate to:

```text
Manage Jenkins → Credentials
```

Add:

- Type: SSH Username with Private Key
- ID: `ec2-ssh-key`

Paste your AWS `.pem` file contents.

---

# 📜 Jenkinsfile Responsibilities

The Jenkins pipeline automatically:

- Pulls latest code from GitHub
- Secures SSH key permissions
- Connects to EC2
- Pulls latest code on EC2
- Stops old container
- Removes old image
- Builds new Docker image
- Runs latest container

---

# 💡 DevOps Concepts Demonstrated

- CI/CD Pipeline Automation
- Infrastructure as Code
- Docker Containerization
- Cloud Deployment on AWS
- SSH Authentication
- Jenkins Pipeline Automation
- Linux Server Management
- Production Deployment Debugging

---

# 📸 Project Demonstration

## Successfully Demonstrated

- Jenkins automated pipeline execution
- GitHub integration
- Docker container deployment
- EC2 remote deployment
- Live application hosting

---

# 👨‍💻 Author

**Sachin Burnwal**

---

# ❤️ Vision Behind Virasa

Virasa is more than just a marketplace.

It is an initiative to digitally preserve India's cultural heritage, empower elderly artisans, and connect timeless craftsmanship with modern audiences worldwide.

> “Technology should not replace tradition — it should preserve and amplify it.”
