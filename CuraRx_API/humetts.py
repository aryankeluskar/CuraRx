import json
from hume import HumeClient
from hume.empathic_voice import (
    PostedConfigPromptSpec,
    PostedEventMessageSpec,
    PostedEventMessageSpecs,
    PostedLanguageModel,
    PostedVoice,
)
import os

from dotenv import load_dotenv
load_dotenv()

from hume import HumeClient

client = HumeClient(
    api_key=os.getenv("HUME_API_KEY"),
)
out = client.empathic_voice.configs.list_configs(
    page_number=0,
    page_size=1,
)

out = out.json()
out = json.loads(out)

# save to a file named configs.json
with open("configs.json", "w") as f:
    json.dump(out, f)

client = HumeClient(
    api_key=os.getenv("HUME_API_KEY"),
)
out = client.empathic_voice.configs.create_config(
    name="10/18/2024, 11:19:07 PM",
    prompt=PostedConfigPromptSpec(
        id="72410f55-b19b-4439-9f0e-4bfcb239cae2",
    ),
    evi_version="2",
)

print(out)