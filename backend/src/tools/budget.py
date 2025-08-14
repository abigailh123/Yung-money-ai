import datetime
from langchain.tools import tool
from utils.db import budgets


@tool
def create_budget_tool(
    income: float, frequency: str, categories: dict, user_id="default_user"
) -> str:
    """
    Create a budget with income, category breakdown, and frequency.

    Args:
        income (float): The user's income.
        frequency (str): The frequency of the budget (e.g., "monthly").
        categories (dict): A dictionary of category names and amounts.
    """
    budgets.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "user_id": user_id,
                "income": income,
                "frequency": frequency,
                "categories": categories,
            }
        },
        upsert=True,
    )

    return {
        "status": "success",
        "message": f"Budget created: {categories} per {frequency}",
    }
