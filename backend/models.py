from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["expenses_app"]

users_collection = db["users"]


def create_user(name, email, mobile, passwd):
    user = {
        "name": name,
        "email": email,
        "mobile": mobile,
        "passwd": passwd
    }
    users_collection.insert_one(user)


def get_user(email):
    return users_collection.find_one({"email": email})


expenses_collection = db["expenses"]


def add_expense(payer_email, amount, split_method, split_data):
    expense = {
        "payer": payer_email,
        "amount": amount,
        "split_method": split_method,
        "split_data": split_data
    }
    expenses_collection.insert_one(expense)


def get_user_expenses(email):
    print(email)
    return expenses_collection.find({"payer": email})


def get_all_expenses():
    return expenses_collection.find({})
