pipeline {
    agent any

    environment {
        EC2_USER = 'ubuntu'
        EC2_IP = '51.21.192.6'
        SSH_CRED_ID = 'ec2-ssh-key'
        APP_NAME = 'virsa-app'
        APP_PORT = '3000'
        BRANCH = 'gallery-section'
        REPO_URL = 'https://github.com/sachinburnwal22/Virsa.git'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t virsa-app .'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {

                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '

                    # Remove old app folder if exists
                    rm -rf Virsa

                    # Clone latest code
                    git clone -b ${BRANCH} ${REPO_URL}

                    cd Virsa

                    # Stop old container
                    docker stop virsa-container || true
                    docker rm virsa-container || true

                    # Remove old image
                    docker rmi virsa-app || true

                    # Build new image
                    docker build -t virsa-app .

                    # Run new container
                    docker run -d \
                    --name virsa-container \
                    -p 3000:3000 \
                    --restart always \
                    virsa-app
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful 🚀'
        }

        failure {
            echo 'Deployment Failed ❌'
        }
    }
}