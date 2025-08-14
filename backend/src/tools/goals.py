from langchain.tools import tool


@tool
def create_goal(name: str, description: str, price: float) -> str:
    """
    Create a goal
    """
    return f"goal: {query}"


@tool
def get_goal(query: str) -> str:
    """
    Get a goal
    """
    return f"goal: {query}"


@tool
def update_goal(query: str) -> str:
    """
    Update a goal
    """
    return f"goal: {query}"


@tool
def delete_goal(query: str) -> str:
    """
    Delete a goal
    """
    return f"goal: {query}"
