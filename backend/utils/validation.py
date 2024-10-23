def validate_equal_split(total_amount, participants):
    """
    Validate equal split method by checking if total amount can be equally divided
    among participants.
    """
    num_participants = len(participants)
    if num_participants == 0:
        return False, "There must be at least one participant."

    expected_amount_per_person = total_amount / num_participants
    for participant in participants:
        if participant['amount'] > expected_amount_per_person:
            return False, f"Each participant must owe {expected_amount_per_person}."
        else:
            participant['amount'] = expected_amount_per_person

    return True, ""


def validate_exact_split(total_amount, participants):
    """
    Validate exact split method by checking if the sum of specified amounts equals
    the total amount.
    """
    total_split = sum([int(participant['amount'])
                      for participant in participants])
    if total_split != total_amount:
        return False, f"Sum of specified amounts ({total_split}) does not match total amount ({total_amount})."

    for participant in participants:
        participant['percentage'] = (
            int(participant['amount']) / total_amount) * 100

    return True, ""


def validate_percentage_split(total_amount, participants):
    """
    Validate percentage split method by ensuring percentages sum to 100% and
    calculated amounts match the total amount.
    """
    total_percentage = sum([int(entry['percentage'])
                           for entry in participants])
    if total_percentage != 100:
        return False, "Percentages must add up to 100%."

    total_split = 0
    for participant in participants:
        calculated_amount = (
            int(participant['percentage']) / 100) * total_amount
        participant['amount'] = calculated_amount
        total_split += round(calculated_amount, 2)

    if round(total_split, 2) != round(total_amount, 2):
        return False, f"Calculated split amount ({total_split}) does not match total amount ({total_amount})."

    return True, ""
