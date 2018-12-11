# ConnectMe
CPME – 281 - PROJECT 2  - ConnectMe
Introduction
Project 2: ConnectMe
University Name: http://www.sjsu.edu/
Course: Cloud Technologies
Professor:Sanjay Garje


ISA: Anushri Srinath Aithal

Student:
Julian Simon
Paramdeep Saini
Sandhya Gadgoli
Viswa Kambam

Githublink: https://github.com/jusimon/ConnectMe
Demo
ConnectMe Demo
Project Problem Statement:
Often we see that hiring the right candidate for a job require is too complicated process this is happens because of various reasons like unstructured interviews process, inefficient resume screenings and pre-interview calls. Recruitment professionals and hiring managers often pick candidates dependent on abstract, instead of employment related, criteria.
	Recruitment Management tool is important to have a state of art recruitment system that assists the companies in initial screening of the candidates based on the profiles provided by the different companies.
	This tool will provide a list of trusted resources that has in depth knowledge about the technical skills that companies are actually looking forward to and at the same time initial screening of the candidates will be done based on the inputs/questionnaires provided by the company.
	Performance of each individual candidate will be recorded and provided the same to the candidate and Recruiter.
Proposed Solution/Project Idea:
Our easy-to-use pre-employment tests improve the new-hire screening process by identifying the most qualified candidates that accurately represent themselves. Leveraging the AWS cloud services, we have implemented our application to be highly available and scalable solution.

It's a smart to utilize an structured interview that can alleviate the risk bad hiring of a resource. However, that choice must incorporate different types of assessments. By keeping the face to face interview as a final step in hiring process and evaluate initially based on online tests for various subjects/technologies, can improve candidate sourcing, interviewing and applicant tracking for a streamlined hiring process.
Features List 
1.	Applicants register under our portal which enables them to take the test. A new user record is created in RDS. If an already existing user tries to sign up, he is displayed alert message “Already Registered”.
2.	Username and password are validated and Authorized users can only successfully login which will be indicated by alert message. 
3.	We have role based login which controls the access to different pages.
1.	ConnectMe Admin
1.	Manages Entire Portal and has Super admin access
2.	Add and Delete Tenancy
3.	Add and Delete Candidates
4.	Manage Questionnaire
5.	Publish Questionnaire 
6.	Evaluate Tests
7.	View and Publish results 
2.	Recruiter
1.	Manage Questionnaire
2.	Publish the results
3.	Candidate
1.	Login
2.	Update Profile
3.	Take test
4.	View results

4.	Myproject Page acts as main activity area and Different users can perform the activities described above as per their respective roles. 
5.	Amazon Machine Learning with RDS is used to display predictive test performance pattern by the candidates on the question set.
6.	Route 53: The IP address of the application will be resolved by this Domain Name Server. Used route-53 to resolve IP address of our domain to the elastic beanstalk /EC2
7.	Autoscaling Group: Auto-scaling group provisioned to scale up EC2 during peak demand or higher availability and scalability. 
8.	CloudWatch: To set up monitoring on the Autoscaling group instances.
9.	S3:
10.	IAM:  
11.	SNS: Notification any failure in autoscaling group detected by CloudWatch.















Architecture Diagram
 








UML diagram:
 




 









Application Screenshots
•	Home Screen 
 










Login Screen 
 











SignUp Screen
 
 
  
 
 
Logged In User Home screen:
  
MyProjects Screen
 
Manage Questionnaire










Create Question Set
 
 
 
Published Quiz
 
 
Publish Questionnaire

Manage Results















Administration
 






Add User Under My Tenancy
 
 
Send Invite to client
 
CPME – 281 - PROJECT 2  - ConnectMe
Introduction
Project 2: ConnectMe
University Name: http://www.sjsu.edu/
Course: Cloud Technologies
Professor: Sanjay Garje
ISA: Anushri Srinath Aithal

Student:
Julian Simon
Paramdeep Saini
Sandhya Gadgoli
Viswa Kambam

Demo
ConnectMe Demo
Project Problem Statement:
Often we see that hiring the right candidate for a job require is too complicated process this is happens because of various reasons like unstructured interviews process, inefficient resume screenings and pre-interview calls. Recruitment professionals and hiring managers often pick candidates dependent on abstract, instead of employment related, criteria.
	Recruitment Management tool is important to have a state of art recruitment system that assists the companies in initial screening of the candidates based on the profiles provided by the different companies.
	This tool will provide a list of trusted resources that has in depth knowledge about the technical skills that companies are actually looking forward to and at the same time initial screening of the candidates will be done based on the inputs/questionnaires provided by the company.
	Performance of each individual candidate will be recorded and provided the same to the candidate and Recruiter.
Proposed Solution/Project Idea:
Our easy-to-use pre-employment tests improve the new-hire screening process by identifying the most qualified candidates that accurately represent themselves. Leveraging the AWS cloud services, we have implemented our application to be highly available and scalable solution.

It's a smart to utilize an structured interview that can alleviate the risk bad hiring of a resource. However, that choice must incorporate different types of assessments. By keeping the face to face interview as a final step in hiring process and evaluate initially based on online tests for various subjects/technologies, can improve candidate sourcing, interviewing and applicant tracking for a streamlined hiring process.
Features List 
12.	Applicants register under our portal which enables them to take the test. A new user record is created in RDS. If an already existing user tries to sign up, he is displayed alert message “Already Registered”.
13.	Username and password are validated and Authorized users can only successfully login which will be indicated by alert message. 
14.	We have role based login which controls the access to different pages.
1.	ConnectMe Admin
1.	Manages Entire Portal and has Super admin access
2.	Add and Delete Tenancy
3.	Add and Delete Candidates
4.	Manage Questionnaire
5.	Publish Questionnaire 
6.	Evaluate Tests
7.	View and Publish results 
2.	Recruiter
1.	Manage Questionnaire
2.	Publish the results
3.	Candidate
1.	Login
2.	Update Profile
3.	Take test
4.	View results

15.	Myproject Page acts as main activity area and Different users can perform the activities described above as per their respective roles. 
16.	Amazon Machine Learning with RDS is used to display predictive test performance pattern by the candidates on the question set.
17.	Route 53: The IP address of the application will be resolved by this Domain Name Server. Used route-53 to resolve IP address of our domain to the elastic beanstalk /EC2
18.	Autoscaling Group: Auto-scaling group provisioned to scale up EC2 during peak demand or higher availability and scalability. 
19.	CloudWatch: To set up monitoring on the Autoscaling group instances.
20.	S3:
21.	IAM:  
22.	SNS: Notification any failure in autoscaling group detected by CloudWatch.















Architecture Diagram
 








UML diagram:
 




 









Application Screenshots
•	Home Screen 
 










Login Screen 
 











SignUp Screen
 
 
  
 
 
Logged In User Home screen:
  
MyProjects Screen
 
Manage Questionnaire










Create Question Set
 
 
 
Published Quiz
 
 
Publish Questionnaire

Manage Results















Administration
 






Add User Under My Tenancy
 
 
Send Invite to client

 
AWS Machine learning:
 
 

 

Quiz sent to client and client logged in to take the test
 

 
 



Pre-requisite Set Up
Resources to be configured on AWS:
1.	EC2, Auto Scale Group, 
2.	ELB
3.	Route 53
4.	S3, IA, Glacier
5.	Amazon Machine Learning
6.	RDS
7.	Lambda 
8.	CloudWatch
9.	CloudTrail
10.	SNS
Softwares to download locally:
1.	Server Side: Python, Flask, AWS Python SDK, 
2.	Client Side: HTML5, CSS,Ajax, Bootstrap, Java Script
3.	Database: RDS MySQL
4.	Web Server: NGINX
Deployment Instructions on Local
1.Install CentOS and NGINX 
2. Clone the git repository
a.	Copy the NGINX config to /etc/nginx/ngix.conf file from template/ngix
b.	Create symbolic like to /usr/share/nginx/html to <user ws>/template/html
3. Create python virtual environment for python 2.7
3.Install Docker : Check and make sure docker service is running.
4. Create SQL docker image
a.	docker pull mysql
b.	mkdir -p /u01/mysql-db
5. Create the users and MySql database 
a.	docker run --name mysql-inst -e MYSQL_DATABASE=mysql_prod -e
b.	MYSQL_USER=prod -e MYSQL_PASSWORD=welcome1 -e
c.	MYSQL_ROOT_PASSWORD=welcome1 -p 3306:3306 -v /u01/mysqldb:/var/lib/mysql -d mysql:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
5.	Jump into docker and allow permission for the users
a.	docker exec -i -t mysql-inst /bin/bash
b.	ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'welcome1';
c.	ALTER USER 'prod' IDENTIFIED WITH mysql_native_password BY 'welcome1';
7. Connect with the user to the sql
mysql -uroot -p -h 127.0.0.1
8. Create SQL tables. Copy past the commands from sql/create_tables.py file.
9. Run python application
  	python run.py
10. start browsing 127.0.0.1 and create admin user and recruiter user.
Pre-requisite Set Up
Resources to be configured on AWS:
11.	EC2, Auto Scale Group, 
12.	ELB
13.	Route 53
14.	S3, IA, Glacier
15.	Amazon Machine Learning
16.	RDS
17.	Lambda 
18.	CloudWatch
19.	CloudTrail
20.	SNS
Softwares to download locally:
6.	Server Side: Python, Flask, AWS Python SDK, 
7.	Client Side: HTML5, CSS,Ajax, Bootstrap, Java Script
8.	Database: RDS MySQL
9.	Web Server: NGINX
Deployment Instructions on Local
1.Install CentOS and NGINX 
2. Clone the git repository
c.	Copy the NGINX config to /etc/nginx/ngix.conf file from template/ngix
d.	Create symbolic like to /usr/share/nginx/html to <user ws>/template/html
3. Create python virtual environment for python 2.7
3.Install Docker : Check and make sure docker service is running.
4. Create SQL docker image
c.	docker pull mysql
d.	mkdir -p /u01/mysql-db
5. Create the users and MySql database 
d.	docker run --name mysql-inst -e MYSQL_DATABASE=mysql_prod -e
e.	MYSQL_USER=prod -e MYSQL_PASSWORD=welcome1 -e
f.	MYSQL_ROOT_PASSWORD=welcome1 -p 3306:3306 -v /u01/mysqldb:/var/lib/mysql -d mysql:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
10.	Jump into docker and allow permission for the users
d.	docker exec -i -t mysql-inst /bin/bash
e.	ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'welcome1';
f.	ALTER USER 'prod' IDENTIFIED WITH mysql_native_password BY 'welcome1';
7. Connect with the user to the sql
mysql -uroot -p -h 127.0.0.1
8. Create SQL tables. Copy past the commands from sql/create_tables.py file.
9. Run python application
  	python run.py
10. start browsing 127.0.0.1 and create admin user and recruiter user.

Technologies Used:
	Pyhton 2.7 + and Jwt
	Nginx Container (reverse proxy)
	JavaScript, AJAX, CSS and HTML5
	RDS
	AWS Codepipeline Integration
	GitHub

Individual contribution breakdown
	Html Pages (Home Page, Registration page, Login Page), JWT token management, CI/CD pipeline, SNS and CloudWatch, Architecture diagram , testing, documentation,PPT - Sandhya
	Ajax Call and Java Script ,Machine Learning ,RDS,Use Case Diagram - Viswa Kambam
	Rest and python code, DB handling, Autoscaling and HTTPS - Paramdeep Saini and Julian Simon
	Nginx and uwsgi setup, DB handling, CI/CD Pipeline, CloudTrail- Paramdeep Saini and Julian Simon


Test account credentials: 
Username: julian.simon.sjsu.com
Password: welcome1

Public URL to the application
https://theconnectme.club


Githublink: 
https://github.com/jusimon/ConnectMe






