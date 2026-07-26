from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


# Allow the Next.js frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Monument Explorer Backend is running"
    }


# Temporary monument identification function
# Later, your friend's AI model will replace this function
def identify_monument_with_ai(image: UploadFile):

    return {
        "monument_name": "Taj Mahal",

        "location": "Agra, India",

        "year_built": "1632",

        "description": (
            "The Taj Mahal is a historic monument built by "
            "Mughal Emperor Shah Jahan in memory of Mumtaz Mahal."
        ),

        "history": (
            "The monument is one of the most famous examples of "
            "Mughal architecture and combines elements of Islamic, "
            "Persian, and Indian architectural styles."
        ),

        "timeline": [
            {
                "year": "1631",

                "event": (
                    "Construction was planned after the death "
                    "of Mumtaz Mahal."
                )
            },

            {
                "year": "1632",

                "event": (
                    "Construction of the Taj Mahal began."
                )
            },

            {
                "year": "1653",

                "event": (
                    "The main construction was completed."
                )
            }
        ]
    }


@app.post("/identify-monument")
async def identify_monument(
    image: UploadFile = File(...)
):

    # Check whether the uploaded file is an image
    if (
        not image.content_type
        or not image.content_type.startswith("image/")
    ):
        return {
            "error": "Please upload a valid image file."
        }

    # Call the temporary AI function
    result = identify_monument_with_ai(image)

    return result


class QuestionRequest(BaseModel):
    question: str
    monument_name: str


@app.post("/ask-question")
async def ask_question(
    request: QuestionRequest
):

    return {
        "answer": (
            f"This is a temporary answer about "
            f"{request.monument_name}. "

            f"You asked: {request.question}. "

            "Later, the AI model and verified knowledge base "
            "will provide a grounded historical answer."
        )
    }