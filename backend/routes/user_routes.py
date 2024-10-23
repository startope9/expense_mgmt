from models import create_user, get_user
import bcrypt

# Function to hash password


def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# Function to check password


def check_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password)


def create_user_route(data):
    try:
        create_user(data['name'], data['email'],
                    data['mobile'], hash_password(data['password']))
    except:
        return 500
    return 200


def login(email, passwd):
    isPresent = get_user(email)

    if not isPresent:
        return 400
    if check_password(isPresent['passwd'], passwd):
        return 200
    return 400


def get_user_route(email):
    user = get_user(email)
    return user
