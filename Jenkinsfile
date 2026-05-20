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

        // This local build stage is redundant and can be skipped because the EC2 instance 
        // clones the repository and builds the Docker image directly on the remote host.
        // Uncomment if you want to verify builds locally on the Jenkins machine.
        /*
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t virsa-app .'
            }
        }
        */

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'KEY_FILE', usernameVariable: 'SSH_USER')]) {
                    script {
                        // Replace backslashes with forward slashes for Windows compatibility in Git Bash
                        def keyPath = KEY_FILE.replace('\\', '/')

                        // Restrict file permissions in Windows to satisfy OpenSSH private key restrictions.
                        // We use native PowerShell Get-Acl/Set-Acl to set the key file's permissions to be accessible
                        // only by the current Jenkins process owner and SYSTEM.
                        powershell """
                            \$path = "${KEY_FILE}"
                            \$acl = Get-Acl \$path
                            \$acl.SetAccessRuleProtection(\$true, \$false)
                            \$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent()
                            \$userRule = New-Object System.Security.AccessControl.FileSystemAccessRule(\$currentUser.User, "FullControl", "Allow")
                            \$acl.AddAccessRule(\$userRule)
                            \$systemSID = New-Object System.Security.Principal.SecurityIdentifier("S-1-5-18")
                            \$systemRule = New-Object System.Security.AccessControl.FileSystemAccessRule(\$systemSID, "FullControl", "Allow")
                            \$acl.AddAccessRule(\$systemRule)
                            Set-Acl \$path \$acl
                        """

                        sh """
                        ssh -i "${keyPath}" -o StrictHostKeyChecking=no ${SSH_USER}@${EC2_IP} '
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