import uvicorn

if __name__ == "__main__":
    uvicorn.run("sentiment:app", reload=True)
