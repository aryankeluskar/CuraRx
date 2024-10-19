import os
from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
import requests


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
        if len(response.data) == 0:
            raise HTTPException(status_code=404, detail="User not found")

        return {"data": response.data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@app.get("/drugs/getAllInfo/{drug_name}")
async def get_drug_info(drug_name: str):
    try:
        url = f'https://api.fda.gov/drug/label.json?search=openfda.brand_name:{drug_name}&limit=1'
        response = requests.get(url)
        data = response.json()

        if "results" not in data or len(data["results"]) == 0:
            raise HTTPException(status_code=404, detail="Drug not found")

        result = data["results"][0]

        # Get the list of spl_product_data_elements for each result
        openfda = result.get("openfda", {})

        brand_name = openfda.get("brand_name", ["N/A"])[0]
        warnings = result.get("warnings", ["N/A"])[0]
        adverse_reactions = result.get("adverse_reactions", ["N/A"])[0]
        drug_interactions = result.get("drug_interactions", ["N/A"])[0]
        general_precautions = result.get("general_precautions", ["N/A"])[0]
        precautions = result.get("precautions", ["N/A"])[0]
        indications_and_usage = result.get("indications_and_usage", ["N/A"])[0]
        description = result.get("description", ["N/A"])[0]

        return {
            "brand_name": brand_name,
            "warnings": warnings,
            "adverse_reactions": adverse_reactions,
            "drug_interactions": drug_interactions,
            "general_precautions": general_precautions,
            "precautions": precautions,
            "indications_and_usage": indications_and_usage,
            "description": description
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))