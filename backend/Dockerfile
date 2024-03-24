FROM python:3.9-slim

WORKDIR /app

COPY . /app
RUN pip install -r requirements.txt

# Loading the data.xlsx file
RUN chmod +x entrypoint.sh

# Port Number
EXPOSE 5001

ENV FLASK_APP=app.py
ENTRYPOINT ["./entrypoint.sh"]
CMD ["flask", "run"]
