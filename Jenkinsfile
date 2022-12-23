pipeline{
    agent any
    stages {
        stage('Build Maven') {
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'devopshint', url: 'https://github.com/BharathSharath/jenkins-kubernetes-example.git
]]])

             
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                  sh 'docker build -t bharathsharath/nodejsapp-1.0:latest .'
                }
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                 withCredentials([string(credentialsId: 'dockerhublogin', variable: 'dockerhubpwd')]) {
                    sh 'docker login -u bharathsharath -p ${dockerhubpwd}'
                 }  
                 sh 'docker push bharathsharath/nodejsapp-1.0:latest'
                }
            }
        }
    
    stage('Deploy App on k8s') {
      steps {
            sshagent(['k8s']) {
            sh "scp -o StrictHostKeyChecking=no nodejsapp.yaml ubuntu@Master:/home/ubuntu"
            script {
                try{
                    sh "ssh ubuntu@Master kubectl apply -f ."
                }catch(error){
                    sh "ssh ubuntu@Master kubectl create -f ."
            }
}
        }
      
    }
    }
    }
}
