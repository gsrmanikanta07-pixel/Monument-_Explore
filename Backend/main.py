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


# Temporary monument data
# Later, your friend's AI model will replace
# the temporary identification logic.

MONUMENTS = {

    "taj_mahal": {
        "monument_name": "Taj Mahal",
        "location": "Agra, India",
        "year_built": "1632",
        "description": (
            "The Taj Mahal is a historic monument built by "
            "Mughal Emperor Shah Jahan in memory of Mumtaz Mahal."
        ),
        "history": (
            "The Taj Mahal is one of the most famous examples "
            "of Mughal architecture. It combines elements of "
            "Islamic, Persian, and Indian architectural styles."
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
    },


    "charminar": {
        "monument_name": "Charminar",
        "location": "Hyderabad, India",
        "year_built": "1591",
        "description": (
            "Charminar is a historic monument and mosque "
            "located in the heart of Hyderabad."
        ),
        "history": (
            "Charminar was built by Muhammad Quli Qutb Shah. "
            "The monument is known for its four grand minarets "
            "and is one of the most famous landmarks of Hyderabad."
        ),
        "timeline": [
            {
                "year": "1591",
                "event": (
                    "Charminar was constructed by "
                    "Muhammad Quli Qutb Shah."
                )
            },
            {
                "year": "17th Century",
                "event": (
                    "The monument became an important landmark "
                    "of Hyderabad."
                )
            },
            {
                "year": "Present",
                "event": (
                    "Charminar remains one of the most visited "
                    "historical monuments in Hyderabad."
                )
            }
        ]
    },


    "red_fort": {
        "monument_name": "Red Fort",
        "location": "Delhi, India",
        "year_built": "1639",
        "description": (
            "The Red Fort is a historic fort complex in Delhi "
            "built during the Mughal period."
        ),
        "history": (
            "The Red Fort was commissioned by Mughal Emperor "
            "Shah Jahan when he shifted his capital from Agra "
            "to Delhi."
        ),
        "timeline": [
            {
                "year": "1638",
                "event": (
                    "Construction of the Red Fort began."
                )
            },
            {
                "year": "1639",
                "event": (
                    "The fort became the main residence "
                    "of the Mughal emperor."
                )
            },
            {
                "year": "1947",
                "event": (
                    "India's first Prime Minister delivered "
                    "the Independence Day speech from the Red Fort."
                )
            }
        ]
    },


    "qutub_minar": {
        "monument_name": "Qutub Minar",
        "location": "Delhi, India",
        "year_built": "1199",
        "description": (
            "Qutub Minar is a historic minaret and UNESCO "
            "World Heritage Site located in Delhi."
        ),
        "history": (
            "Construction of Qutub Minar was started by "
            "Qutb-ud-din Aibak and later completed by "
            "his successors."
        ),
        "timeline": [
            {
                "year": "1199",
                "event": (
                    "Construction was started by "
                    "Qutb-ud-din Aibak."
                )
            },
            {
                "year": "13th Century",
                "event": (
                    "Later rulers continued and expanded "
                    "the construction."
                )
            },
            {
                "year": "1993",
                "event": (
                    "Qutub Minar was declared a UNESCO "
                    "World Heritage Site."
                )
            }
        ]
    }

}


# Temporary identification function
# This will later be replaced by your friend's AI model.

def identify_monument_with_ai(image: UploadFile):

    filename = (image.filename or "").lower()

    if "charminar" in filename:

        return MONUMENTS["charminar"]

    elif (
        "redfort" in filename
        or "red_fort" in filename
        or "red-fort" in filename
    ):

        return MONUMENTS["red_fort"]

    elif (
        "qutub" in filename
        or "qutb" in filename
    ):

        return MONUMENTS["qutub_minar"]

    else:

        return MONUMENTS["taj_mahal"]


@app.post("/identify-monument")
async def identify_monument(
    image: UploadFile = File(...)
):

    # Validate uploaded file
    if (
        not image.content_type
        or not image.content_type.startswith("image/")
    ):

        return {
            "error": "Please upload a valid image file."
        }

    # Temporary monument identification
    result = identify_monument_with_ai(image)

    return result


class QuestionRequest(BaseModel):

    question: str
    monument_name: str


@app.post("/ask-question")
async def ask_question(
    request: QuestionRequest
):

    monument = request.monument_name.lower()
    question = request.question.lower()


    if "taj mahal" in monument:

        if "who" in question or "built" in question:

            answer = (
                "The Taj Mahal was built by Mughal Emperor "
                "Shah Jahan in memory of Mumtaz Mahal."
            )

        elif "when" in question:

            answer = (
                "Construction of the Taj Mahal began in 1632 "
                "and was completed around 1653."
            )

        elif "where" in question:

            answer = (
                "The Taj Mahal is located in Agra, India."
            )

        else:

            answer = (
                "The Taj Mahal is a famous Mughal monument "
                "built by Shah Jahan in memory of Mumtaz Mahal."
            )


    elif "charminar" in monument:

        if "who" in question or "built" in question:

            answer = (
                "Charminar was built in 1591 by "
                "Muhammad Quli Qutb Shah."
            )

        elif "when" in question:

            answer = (
                "Charminar was built in 1591."
            )

        elif "where" in question:

            answer = (
                "Charminar is located in Hyderabad, India."
            )

        else:

            answer = (
                "Charminar is a historic monument in Hyderabad "
                "known for its four grand minarets."
            )


    elif "red fort" in monument:

        if "who" in question or "built" in question:

            answer = (
                "The Red Fort was commissioned by Mughal Emperor "
                "Shah Jahan."
            )

        elif "when" in question:

            answer = (
                "Construction of the Red Fort began in 1638."
            )

        elif "where" in question:

            answer = (
                "The Red Fort is located in Delhi, India."
            )

        else:

            answer = (
                "The Red Fort is a historic Mughal fort complex "
                "located in Delhi."
            )


    elif "qutub minar" in monument:

        if "who" in question or "built" in question:

            answer = (
                "Construction of Qutub Minar was started by "
                "Qutb-ud-din Aibak."
            )

        elif "when" in question:

            answer = (
                "Construction of Qutub Minar began around 1199."
            )

        elif "where" in question:

            answer = (
                "Qutub Minar is located in Delhi, India."
            )

        else:

            answer = (
                "Qutub Minar is a historic minaret and UNESCO "
                "World Heritage Site in Delhi."
            )


    else:

        answer = (
            f"This is a temporary answer about "
            f"{request.monument_name}."
        )


    return {
        "answer": answer
    }