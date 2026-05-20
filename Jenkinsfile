pipeline {
    agent any

    environment {
        // AWS and Registry Config (Update these with your values or define them in Jenkins)
        AWS_REGION      = 'us-east-1'
        AWS_ACCOUNT_ID  = '123456789012' // Replace with your AWS Account ID
        ECR_REPOSITORY  = 'virsa-marketplace'
        IMAGE_TAG       = "${env.BUILD_NUMBER}"
        ECR_REGISTRY    = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        
        // Target Deployment Server Config
        EC2_USER        = 'ubuntu' // or 'ec2-user' depending on your AMI
        EC2_IP          = '54.xxx.xxx.xxx' // Replace with your EC2 public IP
        APP_PORT        = '3000'
        
        // Jenkins Credentials IDs
        AWS_CRED_ID     = 'aws-credentials' // Jenkins AWS credentials ID
        SSH_CRED_ID     = 'ec2-ssh-key'     // Jenkins SSH Private Key credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker Image: ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
                    sh "docker build -t ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG} ."
                    sh "docker tag ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest"
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                // Use Jenkins AWS Steps plugin to authenticate or use aws-cli credentials
                withCredentials([usernamePassword(credentialsId: AWS_CRED_ID, usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    script {
                        echo "Logging into AWS ECR..."
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                        
                        echo "Pushing Docker Image to ECR..."
                        sh "docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
                        sh "docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest"
                    }
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                // Use SSH Agent plugin to authenticate with the EC2 private key
                sshagent([SSH_CRED_ID]) {
                    script {
                        echo "Deploying to EC2 instance: ${EC2_IP}"
                        
                        // Commands to run on the remote EC2 instance
                        def deployCmds = """
                            # Log in to ECR on remote EC2 instance
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                            
                            # Pull the latest image
                            docker pull ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                            
                            # Stop and remove the existing container if it is running
                            docker stop virsa-container || true
                            docker rm virsa-container || true
                            
                            # Run the new container
                            docker run -d --name virsa-container -p ${APP_PORT}:${APP_PORT} --restart always ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                            
                            # Clean up old unused images
                            docker image prune -f
                        """
                        
                        sh "ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} '${deployCmds}'"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Changes are live on AWS."
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
