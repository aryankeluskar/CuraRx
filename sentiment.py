import os
import asyncio
from time import sleep
import dotenv
from dotenv import load_dotenv
load_dotenv()
import json

from hume import HumeClient

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your specific requirements
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

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


# url = "https://utfs.io/f/Oc8yBlzal2A90WnaAYfGTIVRWAvzgNHFxpdrO4wy6Yb8h2EZ"

# top = await get_sentiment(url)
# print(top)