# 🧓🏼✨ Virasa – Preserving the Legacy of Our Elders & Artisans

[![Live Site](https://img.shields.io/badge/Live_Site-Visit-green?style=for-the-badge)](https://virasa3.vercel.app/)

> *"Every wrinkle tells a story. Every hand, a heritage."*

**Virasa** is a heartfelt digital marketplace and storytelling platform dedicated to **honoring and empowering elderly individuals and artisans** across India. The platform serves as a digital gallery and market, preserving traditional crafts, showcasing lived wisdom, and connecting these master craftspeople with contemporary global markets.

---

## 🌟 Key Features

*   📜 **Story Showcase & Submission** – A space for users to discover and submit inspiring stories of traditional artisans and community elders.
*   🎨 **Interactive & Revolutionary Galleries** – Beautiful, fluid grids showcasing master-crafted works.
*   🛍️ **Artisan Marketplace** – Explore and purchase genuine handmade crafts directly from artisans.
*   🛒 **Integrated Cart & Favorites** – Seamless shopping experience powered by React Context.
*   📱 **Premium UI/UX** – Highly responsive, fluid layout designed with glassmorphism, rich color palettes (`warm-ivory`, `deep-indigo`, `terracotta`), and micro-animations.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (React 19)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Context API (Cart & Favorites)
*   **DevOps:** Docker, AWS EC2, Jenkins, Git

---

## ⚙️ DevOps & CI/CD Architecture

We implemented a robust **CI/CD pipeline** automating the deployment of the Next.js application from local development pushes to a remote production server on AWS EC2 using Docker containers.

```mermaid
graph TD
    Developer[Developer commits code] -->|git push| GitHub[GitHub Repository]
    GitHub -->|Webhook Trigger| Jenkins[Jenkins Server (Local Windows Host)]
    
    subgraph Jenkins Pipeline Steps
        Jenkins --> Step1[1. Checkout SCM]
        Step1 --> Step2[2. Set Secure Permissions via PowerShell]
        Step2 --> Step3[3. Remote SSH to EC2 via withCredentials]
    end
    
    subgraph AWS EC2 Production Host
        Step3 --> EC2_Git[Git Clone/Pull latest code]
        EC2_Git --> EC2_Docker_Clean[Stop & Remove old container/image]
        EC2_Docker_Clean --> EC2_Docker_Build[Build Docker image natively]
        EC2_Docker_Build --> EC2_Docker_Run[Run standalone Docker container on Port 3000]
    end
```

### 1. Dockerization
The application is containerized using an optimized, multi-stage `Dockerfile` based on `node:20-slim`.
*   **Standalone Build Mode:** Configured `output: 'standalone'` in [next.config.js](file:///d:/PROJECTS@/Virasa/Virsa/next.config.js) to leverage Next.js's optimized bundle capability, reducing the final Docker image footprint from ~1GB to under **150MB**.
*   **WSL2 Network Resilience:** Custom configurations (`fetch-retry-maxtimeout`, `fetch-retries`) are applied during the package installation step to handle translation timeouts common in local Docker Desktop environments.

### 2. AWS EC2 Hosting
*   **Compute:** AWS EC2 Instance running Ubuntu.
*   **Port Mapping:** The application's Docker container runs on host port `3000` (container port `3000`).
*   **Security Groups:** Port `3000` is exposed to allow external web traffic, and Port `22` is restricted to authorized SSH keys.

### 3. Jenkins Pipeline ([Jenkinsfile](file:///d:/PROJECTS@/Virasa/Virsa/Jenkinsfile))
Since Jenkins runs on a Windows local machine (`localhost:8080`), we overcame several OS-specific challenges to build a seamless pipeline:

*   **Bypassing the SSH-Agent Service (Error 1058):** Windows disables the native `ssh-agent` service by default. Instead of forcing manual service configurations, we utilized Jenkins' `withCredentials` wrapper to securely provision the SSH private key dynamically.
*   **Windows-to-Git-Bash Path Translation:** Groovy script automatically normalizes the Windows temporary key path, swapping backslashes with forward slashes (`KEY_FILE.replace('\\', '/')`) so Git Bash can parse the identity file path during `ssh` commands.
*   **Dynamic Security Descriptor Setup (OpenSSH Warning):** OpenSSH refuses connections if the private key file has permissive access lists (e.g. `BUILTIN\Users`). We resolved this using a native **PowerShell script** block in the pipeline to:
    1.  Disable ACL inheritance on the temporary key file.
    2.  Query the exact Security Identifier (SID) of the active Jenkins worker process.
    3.  Grant Full Control exclusively to that SID and the `SYSTEM` account, leaving the file completely secured.
*   **Native Remote Building:** To avoid WSL2 network bugs during local Docker builds, the local build stage was commented out. Instead, Jenkins SSHes into the EC2 instance, checks out the code, and builds the Docker image natively under the EC2 hardware environment.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v20+)
*   Docker (Optional, for containerized run)

### Local Development
1.  **Clone the Repository:**
    ```bash
    git clone -b gallery-section https://github.com/sachinburnwal22/Virsa.git
    cd Virsa
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Start Dev Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🐳 Running with Docker

### Build the Image
To build the optimized Docker container locally:
```bash
docker build -t virsa-app .
```

### Run the Container
Run the container detached on port `3000`:
```bash
docker run -d -p 3000:3000 --name virsa-container virsa-app
```

---

## 🔧 Jenkins Pipeline Configuration

To replicate this setup on your local Jenkins instance:

1.  **Install Plugins:** Ensure the `Pipeline` and `Credentials Binding` plugins are active.
2.  **Add Credentials:**
    *   Navigate to **Manage Jenkins** -> **Credentials**.
    *   Add a new credential of type **SSH User Private Key**.
    *   Set the ID as `ec2-ssh-key` and paste your AWS EC2 `.pem` key file contents.
3.  **Configure Environment Variables in Pipeline:**
    *   Ensure your `Jenkinsfile` points to your correct EC2 IP Address (`EC2_IP`) and SSH username (`ubuntu`).
4.  **Create Pipeline Job:** Point your Pipeline definition to this Git repository and branch (`gallery-section`).
