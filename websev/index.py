from fastapi import FastAPI

app = FastAPI()

@app.get("/websev/python")
def hello_world():
    return {"message": "Hello World"}