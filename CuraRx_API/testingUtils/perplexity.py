import requests
import os

def get_drug_info_response(question, patient_id):
    # Set up API key and endpoint
    #API_KEY = os.environ.get("PLEX_API_KEY")

        #drug data 
    patientdrugs = requests.get(f"https://cura-rx.vercel.app/patients/{patient_id}")
    patientdrugs = patientdrugs.json()
    drug_names = [med['drugName'] for med in patientdrugs['data'][0]['medication_schedule']]
    print(drug_names)
    context = ""

    for drug in drug_names:
        context += f"Drug: {drug}\n"
        context += "Description: " + str(requests.get(f"https://cura-rx.vercel.app/drugs/getAllInfo/{drug}").json()) + "\n\n"

    PLEX_API_KEY = "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"
    PLEX_API_URL = "https://api.perplexity.ai/chat/completions"

  

    headers = {
        "Authorization": f"Bearer {PLEX_API_KEY}",
        "Content-Type": "application/json"
    }

    messages = [
        {"role": "system", "content": "You are a helpful assitant who has been given infomration on the list of prescribed medicines a user is actively taking. All responses assume that the user is asking questions specifically in relation to thier medications."},
        {"role": "user", "content": f"The following is context on the drugs I am currently taking, I am taking all of them: {context}\n\nQuestion: {question}. This question is in relation to the medications I am currently taking. Please use the provided infomration to answer the question, alongside any other online sources you would like."},
    ]

    data = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": messages,
        "max_tokens": len(drug_names) * 145,
        "temperature": 0.5,
    }

    response = requests.post(PLEX_API_URL, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.status_code}. {response.text}"

# Example usage
user_question = input("What would you like to know about your medications? ")
response = get_drug_info_response(user_question, "faac91c6-63e7-4a0f-954f-ee1bc997d27c")
print("\nResponse:", response)



