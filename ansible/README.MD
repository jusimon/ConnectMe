 Install Ansible Virtual Env
 ` virtualenv myansible`
  source myansible/bin/activate

  Install ansible
  pip install ansible

  Installl boto boto3
  pip install  boto boto3

  ansible version
  ansible --version
  ansible 2.7.10
  
  run the ansible playbook to automate the app provisioning on AWS 
  ansible-playbook ec2_instance.yaml

Important parameters to create EC2 need to be changed in ec2_instance.yaml

    vars:
      instance_type: t2.micro
      security_group: connectme_sg
      image: ami-0019ef04ac50be30f
      region: us-west-1
      keypair: drifters
      aws_access_key: 
      aws_secret_key: <PASTE your SECRET KEY>
      count: 2
      hosts_file: /tmp/hosts


