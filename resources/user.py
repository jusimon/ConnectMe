from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt import JWT, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
import common.settings as cfg
from common.logging_module import get_logger
import models.user
import sys
import datetime
import uuid
import json

logger = get_logger('user')

class UserTenancy(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('firstname',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('lastname',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('password',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('role_name',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('email_address',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('company_name',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('designation',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('tenancy_name',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('mobile_num',
        type=str,
        required=False,
        help="This field can be blank."
    )

    def post(self):
        data = UserTenancy.parser.parse_args()
        try:
            db = pymysql.connect(cfg.MYSQL_HOSTNAME, user=cfg.MYSQL_USERNAME, passwd=cfg.MYSQLDB_PASSWORD, db=cfg.MYSQL_DB_NAME, connect_timeout=5)
        except:
            logger.error("Error : Unexpected error: Could not connect to MySql instance")
            return("message", "unable to connect to DB"), 400
        cursor = db.cursor()
        tenancy_uid=str(uuid.uuid4())
        user_uid=str(uuid.uuid4())
        try:
           tenancy_query = 'insert into corp_tenancy_tab values(%s,%s,%s,%s)'
           cursor.execute(tenancy_query, (tenancy_uid,data['tenancy_name'],datetime.datetime.now(),data['company_name'],))
           db.commit()
           tenancy_user_query = 'insert into corp_tenancy_user_tab values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
           encrypted_password=hashed_password = generate_password_hash(data['password'])
           cursor.execute(tenancy_user_query, (user_uid,data['firstname'],data['lastname'],data['email_address'],encrypted_password,data['role_name'],datetime.datetime.now(),datetime.datetime.now(),data['designation'],tenancy_uid,data['mobile_num'],))
           db.commit();
           db.close()
        except:
           return("message", "Unable to Create user!, Please try Again"), 400

#        return jsonify(msg="Task Completed",retcode=201)
        return("message", "Tenancy Craeted  and User registerted sucessfully"), 201
#        return Response("{'message':'Passed'}", status=201, mimetype='application/json')

class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('firstname',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('lastname',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('email_address',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('designation',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('role_name',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    parser.add_argument('mobile_num',
        type=str,
        required=False,
        help="This field can be blank."
    )
    parser.add_argument('tenancy_id',
        type=str,
        required=True,
        help="This field cannot be blank."
    )
    @jwt_required()
    def post(self):
        print("I am in userregisteration class")
        data = UserRegister.parser.parse_args()
        try:
            db = pymysql.connect(cfg.MYSQL_HOSTNAME, user=cfg.MYSQL_USERNAME, passwd=cfg.MYSQLDB_PASSWORD, db=cfg.MYSQL_DB_NAME, connect_timeout=5)
        except:
            logger.error("Error : Unexpected error: Could not connect to MySql instance")
            return("message", "unable to connect to DB"), 400
        cursor = db.cursor()
        print(data);
        try:
            query = 'insert into corp_tenancy_user_tab values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
            encrypted_password=hashed_password = generate_password_hash('welcome1')
            cursor.execute(query, (str(uuid.uuid4()),data['firstname'],data['lastname'],data['email_address'],encrypted_password,data['role_name'],datetime.datetime.now(),datetime.datetime.now(),data['designation'],data['tenancy_id'],data['mobile_num'],))
            db.commit()
        except:
            logger.error('Error : Unexpected error: Error during the user registeration!')
            return("message", "Unable to Register user! Erro Occurred"), 400
        db.close()
        return("message", "User created Sucessfully"), 201

    @jwt_required()
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=False)
        parser.add_argument('tenancy_id', type=str, required=False)
        parser.add_argument('querytype', type=str, required=True)
        data = parser.parse_args();
        print(data);
        try:
            db = pymysql.connect(cfg.MYSQL_HOSTNAME, user=cfg.MYSQL_USERNAME, passwd=cfg.MYSQLDB_PASSWORD, db=cfg.MYSQL_DB_NAME, connect_timeout=5)
        except:
            logger.error("Error : Unexpected error: Could not connect to MySql instance")
            return("message", "Unable to connect to DB"), 400
        cursor = db.cursor()
        if data['querytype'] == 'cookie':
            query = "select designation,first_name,last_name,email_id,role,tenancy_id from corp_tenancy_user_tab where upper(email_id)=%s";
            argument = data['username'].upper();
            print(argument)
        elif data['querytype'] == 'userreport':
            query = "select user_uid,designation,first_name,last_name,email_id,role,mobile_num from corp_tenancy_user_tab where tenancy_id=%s";
            argument = data['tenancy_id']
        else:
           query = "select a.user_uid,a.designation,a.first_name,a.last_name,a.email_id,a.role,b.tenancy_name from corp_tenancy_user_tab a, corp_tenancy_tab b where a.tenancy_id=b.tenancy_id and b.tenancy_id=%s";
        cursor.execute(query,argument)
        row_headers = [x[0] for x in cursor.description]
        userdata = cursor.fetchall()
        json_data=[]
        for result in userdata:
            json_data.append(dict(zip(row_headers,result)))
        db.close();
        print(json.dumps(json_data))
        return json.dumps(json_data)
