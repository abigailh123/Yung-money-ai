import openai
import os
import json
apikey= os.getenv("OPENAI_API_KEY")
if not apikey:
    raise ValueError("API key not found. Please set OPENAI_API_KEY in your environment variables.")