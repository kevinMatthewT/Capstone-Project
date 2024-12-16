# this is a file to generate dummy data for testing the application on mongodb
# will not be used for the actual system once deployed

import json
from datetime import datetime, timedelta
import random

def random_date(start_year=2010, end_year=2023):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    random_days = random.randint(0, (end_date - start_date).days)
    return (start_date + timedelta(days=random_days)).strftime('%Y-%m-%d')

companies = [
    "Pear",
    "Master Builders",
    "Finance Helpers",
    "Central Hospital",
    "Foodies Restaurant"
]

investors = ["Global Ventures", "Green Capital", "Venture Builders","Great Investors","Beverage Lovers"]
businesses = ["Technology", "Construction", "Finance", "Healthcare", "F&B"]
domiciles = ["Jakarta", "Bali", "Semarang", "Tangerang","Bekasi","Singapore"]

def generate_financial_data():
    revenue = random.randint(500000, 5000000)
    expense = random.randint(300000, int(revenue * 0.9))  # Expenses < Revenue
    cogs = random.randint(50000, 200000)  # COGS is smaller scale
    ebida = revenue - expense - cogs  # Basic EBIDA calculation
    tax_investment = int(ebida * 0.2) if ebida > 0 else 0  # Tax is 20% of EBIDA
    price_asset = random.randint(1000000, 10000000)
    price_liability = random.randint(500000, int(price_asset * 0.7))  # Liability < Asset
    equity = price_asset - price_liability  # Equity calculation
    return revenue, expense, cogs, ebida, tax_investment, price_asset, price_liability, equity

# Create 50 JSON entries
data = []
for _ in range(50):
    id= random.randint(0,4)
    company = companies[id]
    investor = random.choice(investors)
    domicile = random.choice(domiciles)
    year_of_operation = random.randint(2000, 2022)
    business = businesses[id]
    percentage_ownership = random.randint(10, 100)
    revenue, expense, cogs, ebida, tax_investment, price_asset, price_liability, equity = generate_financial_data()
    date_of_ownership = random_date()

    data.append({
        "Company": company,
        "Company_Investor": investor,
        "Domicile": domicile,
        "Year_Of_Operation": year_of_operation,
        "Business": business,
        "Percentage_Ownership": percentage_ownership,
        "Revenue": revenue,
        "Expense": expense,
        "Ebida": ebida,
        "Tax_Investment": tax_investment,
        "Price_Asset": price_asset,
        "Price_Liability": price_liability,
        "Equity": equity,
        "COGS": cogs,
        "Date_Of_Ownership": date_of_ownership
    })

file_path = "data/DummyData.json"
with open(file_path, "w") as file:
    json.dump(data, file, indent=2)

#after confirming the data exists in this directory, 