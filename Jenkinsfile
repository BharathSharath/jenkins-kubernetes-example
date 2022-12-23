pipeline{
    agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhublogin')
	}

	stages {
	    
	    stage('gitclone') {

			steps {
				git branch: 'main', url: 'https://github.com/BharathSharath/jenkins-kubernetes-example.git'
			}
		}

		stage('Build') {

			steps {
				sh 'docker build -t bharathsharath/nodejsapp-1.0:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}
		stage('Push') {

			steps {
				sh 'docker push bharathsharath/nodejsapp-1.0:latest'
			}
		}
           
    
        stage('Deploy App on k8s') {
            steps {
                sshagent(['k8s']) {
                sh "scp -o StrictHostKeyChecking=no nodejsapp.yaml ubuntu@172.31.5.125:/home/ubuntu"
                script {
                      try{
                          sh "ssh ubuntu@172.31.5.125 kubectl apply -f ."
                        }catch(error){
                          sh "ssh ubuntu@172.31.5.125 kubectl create -f ."
                        }
                    }
                }
      
            }
        }
    }
}
