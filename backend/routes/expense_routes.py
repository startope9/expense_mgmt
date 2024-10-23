

from models import add_expense, get_user_expenses, get_all_expenses
from utils.validation import validate_equal_split, validate_exact_split, validate_percentage_split
from utils.balance_sheet import generate_balance_sheet


def add_expense_route(data):
    split_method = data['split_method']
    total_amount = int(data['amount'])
    participants = data['split_data']

    # Perform validation based on the split method
    if split_method == "equal":
        valid, msg = validate_equal_split(total_amount, participants)
        if not valid:
            return 400

    elif split_method == "exact":
        valid, msg = validate_exact_split(total_amount, participants)
        if not valid:
            return 400
    elif split_method == "percentage":
        valid, msg = validate_percentage_split(total_amount, participants)
        if not valid:
            return 400

    # If valid, proceed to add the expense
    add_expense(data['payer_email'], total_amount, split_method, participants)
    return 200


def serialize_expense(expense):
    # Convert ObjectId to string for JSON serialization
    if "_id" in expense:
        expense["_id"] = str(expense["_id"])
    return expense


def get_expenses_user(email):
    try:
        expenses = [serialize_expense(expense)
                    for expense in get_user_expenses(email)]
        return expenses
    except:
        return 400


def get_all_expenses():

    try:
        expenses = get_all_expenses()
        return list(expenses), 200

    except:
        return []


def download_balance_sheet_route(email):
    user_expenses = get_user_expenses(email)
    filepath = generate_balance_sheet(list(user_expenses))
    # return send_file(filepath, as_attachment=True)
    return filepath
