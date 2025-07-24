import requests
def get_definition(word):
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        # Get the first definition from the first meaning
        try:
            definition = data[0]["meanings"][0]["definitions"][0]["definition"]
            return definition
        except:
            return "Sorry, I couldn't find a clear definition."
    else:
        return "Word not found in dictionary."

 # hc fghbj

while True:
    user_input = input("You🫵🏾: ")

    if user_input.lower().startswith("define "):
        word = user_input.split("define ")[1]
        meaning = get_definition(word)
        print("Wordie 😺 :", meaning)
    
    elif user_input.lower() in ["bye", "exit", "quit"]:
        print("Wordie😺 : Goodbye!")
        break

    else:
        print("Wordie: Hey there, im Wordie 😺 ask me about any word📚!I can define words! Just type 'define'and your desired word!")
