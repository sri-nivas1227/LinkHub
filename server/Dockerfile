FROM python:3.14-slim

WORKDIR /server

COPY ./requirements.txt .
RUN pip install --no-cache-dir gunicorn -r requirements.txt
RUN pip

COPY . .

CMD [ "gunicorn", "app:app" ]

