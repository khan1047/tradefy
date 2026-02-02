FROM python:3.11-slim

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y gcc python3-dev libpq-dev

RUN pip install fastapi uvicorn sqlalchemy psycopg2-binary passlib[argon2] python-jose[cryptography] python-multipart
 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

