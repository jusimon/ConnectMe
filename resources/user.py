from flask_restful import Resource, reqparse
from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
import common.settings as cfg
from common.logging_module import get_logger
import models.user
import sys
import datetime
import uuid

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
            return jsonify(msg="Task Failed",retcode=400)
        cursor = db.cursor()
        tenancy_uid=str(uuid.uuid4())
        user_uid=str(uuid.uuid4())
        try:
           tenancy_query = 'insert into corp_tenancy_tab values(%s,%s,%s,%s)'
           cursor.execute(tenancy_query, (tenancy_uid,data['tenancy_name'],datetime.datetime.now(),data['company_name'],))
       #    logger.error('Error : Unexpected error: Error during the user tenancy creation!')
           db.commit()
           tenancy_user_query = 'insert into corp_tenancy_user_tab values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
           encrypted_password=hashed_password = generate_password_hash(data['password'])
           cursor.execute(tenancy_user_query, (user_uid,data['firstname'],data['lastname'],data['email_address'],encrypted_password,data['role_name'],datetime.datetime.now(),datetime.datetime.now(),data['designation'],tenancy_uid,data['mobile_num'],))
    #      logger.error('Error : Unexpected error: Error during the user registeration during tenancy creation!')
           db.commit();
           db.close()
        except:
           return jsonify(msg="Task Failed",retcode=400)
   
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
    parser.add_argument('password',
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

    def post(self):
        data = UserRegister.parser.parse_args()
        try:
            db = pymysql.connect(cfg.MYSQL_HOSTNAME, user=cfg.MYSQL_USERNAME, passwd=cfg.MYSQLDB_PASSWORD, db=cfg.MYSQL_DB_NAME, connect_timeout=5)
        except:
            logger.error("Error : Unexpected error: Could not connect to MySql instance")
            sys.exit()
        cursor = db.cursor()
        query = 'insert into corp_tenancy_user_tab values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        encrypted_password=hashed_password = generate_password_hash(data['password'])
        cursor.execute(query, (str(uuid.uuid4()),data['firstname'],data['lastname'],data['email_address'],encrypted_password,data['role_name'],datetime.datetime.now(),datetime.datetime.now(),data['designation'],data['tenancy_id'],data['mobile_num'],))
        logger.error('Error : Unexpected error: Error during the user registeration!')
        db.commit()
        db.close()
        return("message", "User created Sucessfully"), 201
