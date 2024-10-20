import os
from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
import requests

from dotenv import load_dotenv
load_dotenv()

import json
from hume import HumeClient
from time import sleep

app = FastAPI()
# Get Supabase credentials from environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/testing/{user_id}")
async def get_user_data(user_id: str):
    try:
        # Query the Supabase table named 'testing' where 'id' matches the user_id
        response = supabase.from_("testing").select("*").eq("id", user_id).execute()
        
        # If no records found, return a 404
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=404, detail="User not found")

        return {"data": response.data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/drugs/getAllInfo/{drug_names}")
async def get_drug_info(drug_names: str):
    try:
        drug_list = [drug.strip() for drug in drug_names.split(";")]
        all_drug_info = []

        for drug_name in drug_list:
            url = f'https://api.fda.gov/drug/label.json?search=openfda.brand_name:{drug_name}&limit=1'
            response = requests.get(url)
            data = response.json()

            if "results" not in data or len(data["results"]) == 0:
                # Append a "not found" message for this drug instead of raising an exception
                all_drug_info.append({
                    "drug_name": drug_name,
                    "error": "Drug not found"
                })
                continue

            result = data["results"][0]
            openfda = result.get("openfda", {})

            brand_name = openfda.get("brand_name", ["N/A"])[0]
            warnings = result.get("warnings", ["N/A"])[0]
            adverse_reactions = result.get("adverse_reactions", ["N/A"])[0]
            drug_interactions = result.get("drug_interactions", ["N/A"])[0]
            general_precautions = result.get("general_precautions", ["N/A"])[0]
            precautions = result.get("precautions", ["N/A"])[0]
            indications_and_usage = result.get("indications_and_usage", ["N/A"])[0]
            description = result.get("description", ["N/A"])[0]

            drug_info = {
                "drug_name": drug_name,
                "brand_name": brand_name,
                "warnings": warnings,
                "adverse_reactions": adverse_reactions,
                "drug_interactions": drug_interactions,
                "general_precautions": general_precautions,
                "precautions": precautions,
                "indications_and_usage": indications_and_usage,
                "description": description
            }

            all_drug_info.append(drug_info)

        return all_drug_info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/sentiment")
async def get_sentiment(audio_url):
    def process_prosody(prosody_data):
        for group in prosody_data["grouped_predictions"]:
            for pred in group["predictions"]:
                time = pred["time"]
                emotions = pred["emotions"]
                for emotion in emotions:
                    print(f"Time: {time['begin']} - {time['end']}, Emotion: {emotion['name']}, Score: {emotion['score']}")

    def process_language(language_data):
        for group in language_data["grouped_predictions"]:
            for pred in group["predictions"]:
                text = pred["text"]
                sentiment = pred["sentiment"]
                print(f"Text: {text}")
                for sent in sentiment:
                    print(f"Sentiment: {sent['name']}, Score: {sent['score']}")

    client = HumeClient(api_key=os.getenv("HUME_API_KEY"))
    job = client.expression_measurement.batch.start_inference_job(
        urls=[audio_url],
        models={
            "prosody": {},
        },
        notify=True
    )

    print(job)

    while True:
        status = client.expression_measurement.batch.get_job_details(id=job)
        if "COMPLETE" in str(status):
            print("Job is complete")
            break
        sleep(0.5)

    predictions = client.expression_measurement.batch.get_job_predictions(job)

    print(len(predictions))

    source = predictions[0].json()
    source = json.loads(source)
     
    init = source["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][0]["predictions"][0]["emotions"]

    # calulate the average of one emotion across all the predictions
    for i in range(len(source["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"])):
        for j in range(len(source["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][i]["predictions"])):
            for k in range(len(source["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][i]["predictions"][j]["emotions"])):
                init[k]["score"] += source["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][i]["predictions"][j]["emotions"][k]["score"]

    for i in range(len(init)):
        init[i]["score"] /= len(source["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"])

    print(init)

    # store init in a json file named final.json
    with open('final.json', 'w') as f:
        json.dump(init, f)

    # get top 3 emotions
    top3 = sorted(init, key=lambda x: x['score'], reverse=True)[:3]
    print(top3)

    # store top3 in a string separated by commas
    top3_str = ""
    for i in range(len(top3)):
        top3_str += top3[i]["name"]
        if i < len(top3) - 1:
            top3_str += ","

    return top3_str
