from fpdf import FPDF


def generate_balance_sheet(user_expenses, filepath="balance_sheet.pdf"):
    pdf = FPDF()
    pdf.add_page()

    # Add title
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Balance Sheet", ln=True, align="C")

    # Add each expense
    for expense in user_expenses:
        pdf.set_font("Arial", size=10)

        # Print payer and amount details with indentation
        pdf.cell(10)  # Indentation for the expense section
        pdf.cell(200, 10, txt=f"Email: {expense['payer']}", ln=True)
        pdf.cell(20)  # Indentation for the total amount
        pdf.cell(200, 10, txt=f"Total Amount: {expense['amount']}", ln=True)
        pdf.cell(20)  # Indentation for split data header
        pdf.cell(200, 10, txt="Split Data:", ln=True)

        # Create table for split data
        pdf.set_font("Arial", size=10)
        pdf.cell(30)  # Indentation for the table header
        pdf.cell(60, 10, "Email", 1)
        pdf.cell(30, 10, "Amount", 1)
        pdf.cell(30, 10, "Percentage", 1)
        pdf.ln()

        # Print split details in table format with indentation
        for split in expense['split_data']:
            pdf.cell(30)  # Indentation for each row
            pdf.cell(60, 10, split['email'], 1)
            pdf.cell(30, 10, str(split['amount']), 1)
            pdf.cell(30, 10, str(split['percentage']) + "%", 1)
            pdf.ln()

        # Add some spacing between different expenses
        pdf.ln(5)

    # Output the PDF to the file
    pdf.output(filepath)
    return filepath
