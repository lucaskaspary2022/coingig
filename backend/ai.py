import openai
import string
from bs4 import BeautifulSoup

openai.api_key = 

def classify(url, conditions):
    html = requests.get(url)  #https://hackharvard.io/#home

    messages = []
    for condition in conditions: 
        prompt = \
        f"""
        Does the html have {condition}? 

        html
        {html}
        """

        message = {
            "role": "user",
            "content": prompt
        }

        messages.extend(message)

    results = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages, max_tokens=3)

    bools = []
    for res in results:
        content = res['choice'][0]['content']
        value = str.translate('', '', string.punctuations).lower()

        bool = None
        if value == 'yes':
            bool = True
        elif value == 'no':
            bool = 0
        else:
            raise Exception("The answer is not binary")
        
        bools.extend(bool)
    
    return bools





